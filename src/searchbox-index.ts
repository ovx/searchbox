import lunr, { Index } from 'lunr';
import type {
  IManifest,
  ISearchboxIndexOptions,
  ISearchboxSearchOptions,
} from './types';

lunr.tokenizer.separator = new RegExp(
  /[\s\.\-#,:;!=\[\]()"/]+|(?!\b)(?=[A-Z][a-z])|\.(?!\d)|&[lg]t;/
);

self.lunr = lunr;

export class SearchboxIndex {
  data: unknown[][] = [];

  idx: Index;

  idxSuggestions?: Index;

  manifest: IManifest;

  constructor(readonly options: ISearchboxIndexOptions) {
    if (this.options.injectScripts?.length) {
      importScripts(...this.options?.injectScripts);
    }
    if (this.options.separator) {
      lunr.tokenizer.separator = new RegExp(this.options.separator);
    }
  }

  async request(url: string) {
    return fetch(url).then((res) => {
      if (res.status !== 200) {
        throw new Error(`Invalid response status code ${res.status}.`);
      }
      return res.json();
    });
  }

  async load() {
    const self = this;
    this.manifest = await this.request(this.options.url);
    const data = await this.request(
      this.relativeToManifest(this.manifest.data)
    );
    if (!Array.isArray(data)) {
      throw new Error(`Data response must be an array.`);
    }
    this.data.push(...data);
    const start = Date.now();
    this.idx = lunr(function () {
      if (self.options?.tokenizer?.separator) {
        this.tokenizer.separator = new RegExp(
          self.options?.tokenizer?.separator
        );
      }

      if (self.options?.languages?.length > 1) {
        // @ts-ignore
        this.use(lunr.multiLanguage(...self.options?.languages));
      } else if (self.options?.languages?.length) {
        const lang = self.options?.languages[0];
        if (lang in lunr) {
          this.use(lunr[lang]);
        } else {
          throw new Error(
            `Unable to load language '${lang}'. Include the language script first.`
          );
        }
      }

      this.ref('id');
      this.k1(self.options.k1 !== void 0 ? self.options.k1 : 1.2);
      this.b(self.options.b !== void 0 ? self.options.b : 0.1);

      for (const field of self.manifest.fields) {
        if (field.search !== false) {
          this.field(field.name, {
            boost: field.boost,
          });
        }
      }

      for (const doc of self.data) {
        this.add(
          self.manifest.fields.reduce((acc, field, i) => {
            if (field.name === 'id' || field.search !== false) {
              acc[field.name] = doc[i];
            }
            return acc;
          }, {})
        );
      }
    });
    if (this.options.suggestions !== false) {
      this.idxSuggestions = lunr(function () {
        this.ref('id');
        for (const field of self.manifest.fields) {
          if (field.name === 'id' || field.suggestions) {
            this.field(field.name, {
              boost: field.boost,
            });
          }
        }
        this.pipeline.remove(lunr.trimmer);
        this.pipeline.remove(lunr.stemmer);
        for (const doc of self.data) {
          this.add(
            self.manifest.fields.reduce((acc, field, i) => {
              if (field.suggestions) {
                acc[field.name] = doc[i];
              }
              return acc;
            }, {})
          );
        }
      });
    }
    return {
      manifest: this.manifest,
      size: self.data.length,
      time: Date.now() - start,
    };
  }

  suggestions(term: string) {
    if (!this.idxSuggestions) {
      throw new Error(`Suggestions index not initialized.`);
    }
    const parts = term
      .trim()
      .split(lunr.tokenizer.separator)
      .filter((part) => !!part);
    if (!parts?.length) {
      return {
        manifest: this.manifest,
        results: [],
        time: 0,
      };
    }
    const start = Date.now();
    const termLastPart = parts[parts.length - 1].toLowerCase();
    const results = this.idxSuggestions.query((builder) => {
      builder.term(termLastPart, {
        boost: 5,
        presence: lunr.Query.presence.REQUIRED,
        wildcard: lunr.Query.wildcard.TRAILING,
      });
      builder.term(termLastPart, {
        editDistance: 1,
        wildcard: lunr.Query.wildcard.TRAILING,
      });
    });
    return {
      manifest: this.manifest,
      items: results
        .slice(0, 20)
        .reduce((acc, item) => {
          Object.keys(item.matchData.metadata).forEach((key) => {
            const prefixParts = parts.slice(0, parts.length - 1);
            if (key.startsWith(termLastPart[0])) {
              // filter-out results that don't start with the same letter
              const word = [...prefixParts, key].join(' ');
              if (!acc.includes(word) && !prefixParts.includes(key)) {
                acc.push(word);
              }
            }
          });
          return acc;
        }, [])
        .slice(0, 10)
        .map((word) => {
          return {
            ref: word,
            doc: {
              title: word,
              suggestion: word,
            },
          };
        }),
      time: Date.now() - start,
    };
  }

  search(term: string, options?: ISearchboxSearchOptions) {
    if (!this.idx) {
      throw new Error(`Index not initialized.`);
    }
    term = term.trim();
    if (!term) {
      return {
        manifest: this.manifest,
        results: [],
        time: 0,
      };
    }
    const start = Date.now();
    const max = options?.limit || 100;
    const refFieldIndex =
      this.manifest.fields.findIndex(({ name }) => name === 'id') || 0;
    let results = this.idx.search(term);
    if (results.length === 0) {
      results = this.idx.search(term + '*');
    }
    const highlight =
      this.options?.highlight !== false && this.createHighlighter(term);
    return {
      manifest: this.manifest,
      items: results.slice(0, max).map((result) => {
        const data = this.data.find(
          (item) => String(item[refFieldIndex]) === result.ref
        );
        const doc = this.docToObject(data, options?.fields);
        if (this.options.highlight !== false) {
          doc.title = doc.title && highlight(doc.title as string);
          doc.snippet = doc.snippet && highlight(doc.snippet as string);
        }
        doc.link = doc.link && this.normalizeLink(doc.link as string);
        return {
          ...result,
          doc,
        };
      }),
      time: Date.now() - start,
    };
  }

  relativeToManifest(url: string) {
    const baseUrl = this.options.url.replace(/\/[^\/]+$/, '');
    if (!url.match(/^(https\?\:\/\/|\/)/)) {
      return `${baseUrl}/${url}`;
    }
    return url;
  }

  normalizeLink(link: string) {
    if (link && this.manifest.baseUrl && !link.match(/^https?\:/)) {
      return this.manifest.baseUrl + link;
    }
    return link;
  }

  docToObject(doc: unknown[], fields?: string[]) {
    return doc?.reduce<Record<string, unknown>>(
      (acc: Record<string, string>, field: string, i: number) => {
        if (!fields || fields.includes(this.manifest.fields[i].name)) {
          acc[this.manifest.fields[i].name] = field;
        }
        return acc;
      },
      {}
    );
  }

  createHighlighter(term: string, separator: string = '[^\\w]+') {
    term = term.replace(/[\s*+\-:~^]+/g, ' ').trim();
    const rx = new RegExp(separator, 'img');
    const match = new RegExp(
      `(^|${separator})(${term
        .replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&')
        .replace(rx, '|')})`,
      'img'
    );
    const highlight = (_: unknown, data: string, term: string) => {
      return `${data}<mark>${term}</mark>`;
    };
    return (value: string) =>
      value
        .replace(match, highlight)
        .replace(/<\/mark>(\s+)<mark[^>]*>/gim, '$1');
  }
}
