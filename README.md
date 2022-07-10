<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/privian/searchbox/master/public/searchbox.svg" alt="Searchbox" width="200">
  <br>
  Searchbox
  <br>
</h1>

<h4 align="center">A backend-less website search built on top of lunr.js.</h4>

<p align="center">
  <a href="#what">What</a> •
  <a href="#demo">Demo</a> •
  <a href="#features">Features</a> •
  <a href="#install">Install</a> •
  <a href="#create-manifest">Create Manifest</a> •
  <a href="#related">Related</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

## Status

Searchbox is currently in Beta.

Your help and contributions are very much appreciated.

## What

Searchbox is an open-source alternative to Algolia for websites, blogs and documentation pages. It's fully backend-less - meaning it doesn't require any database or server to perform search (it's just ✨magic✨).

We also created a CLI tool that crawls and builds an index for Searchbox from your live website or your build files.

<div align="center">
  <img src="https://raw.githubusercontent.com/privian/searchbox/master/public/searchbox.png" alt="Searchbox" height="250">
</div>

## Demo

Play with the [demo](https://privian.github.io/searchbox/demo/)

## Features

- Backend-less, runs in the browser from pre-built JSON data
- Ideal for websites, documentations and blogs
- Runs on top of lunr.js and supports multiple languages
- Supports suggestions
- Runs in a Web Worker
- Highly customizable

## Install

Download a [release](https://github.com/privian/searchbox/releases) or use a CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/privian/searchbox@0.1.2/dist/searchbox.min.css" />
<script defer src="https://cdn.jsdelivr.net/gh/privian/searchbox@0.1.2/dist/searchbox.min.js"></script>
```

```js
const searchbox = new SearchboxComponent({
  target: document.body,
  props: {
    options: {
      // configuration options
      input: document.querySelector('#searchbox-input'),
      manifest: '/searchbox.manifest.json',
      worker: '/searchbox.worker.min.js',
    },
  },
});
```

## Create Manifest

1. Create your `searchbox.manifest.json`
2. Build your index with [Searchbox CLI](https://github.com/privian/searchbox-cli)
3. Configure the path to your `searchbox.manifest.json` in the component

### Manifest example

```json
{
  "baseUrl": "https://example.com/",
  "data": "searchbox.index.json",
  "fields": [
    {
      "name": "id",
      "ref": true
    },
    {
      "name": "title",
      "suggestions": true
    },
    {
      "name": "snippet"
    },
    {
      "name": "category",
      "suggestions": true
    },
    {
      "name": "link",
      "search": false
    }
  ]
}
```

## Configuration options

```ts
export interface IOptions {
  /**
   * Dropdown alignment relative to the `anchor`.
   */
  align?: 'left' | 'right';

  /**
   * Dropdown anchor element for positioning and alignment. If not specified, the `input` will be used.
   */
  anchor?: HTMLElement;

  /**
   * A custom search function. Can be used to request external API.
   */
  customSearch?: (term: string, suggestions: boolean) => Promise<IResult>;

  /**
   * Grouping function or a parameter name. The function should return group identifier as string.
   */
  groupBy?: string | ((doc: IResultItemDoc) => string);

  /**
   * Whether to highight terms with <mark> tags.
   */
  highlight?: boolean;

  /**
   * Scripts to inject into the Worker. Use this for lunr.js languages or extensions.
   */
  injectScripts?: string[];

  /**
   * (Required) Input element
   */
  input: HTMLInputElement;

  /**
   * A list of languages to load into lunr.js instance (language scripts must be loaded with `injectScripts`).
   */
  languages?: string[];

  /**
   * Max. number of results to return (default: 100)
   */
  limit?: number;

  /**
   * Manifest URL or relative path.
   */
  manifest?: string;

  /**
   * A custom Lunr.js separator (RegExp)
   */
  separator?: string;

  /**
   * Whether to use suggestions
   */
  suggestions?: boolean;

  /**
   * A custom delay (in milliseconds) between the input focus and when the dropdown is shown.
   */
  dropdownDelay?: number;

  /**
   * A custom HTML element where the results will be rendered instead of the dropdown. Is specified, the dropdown won't be shown.
   */
  results?: HTMLElement;

  /**
   * Custom renderer functions. Supported functions: `header`, `footer`, `item`.
   */
  renderers?: IRenderers;

  /**
   * I18n strings override. See `src/strings.ts`.
   */
  strings?: Record<string, string>;

  /**
   * A custom function that transforms the result (each item).
   */
  transform?: TTransformFunc;

  /**
   * Worker URL or a relative path.
   */
  worker?: string;

  /**
   * Dropdown width (default: 100%)
   */
  width?: number;
}
```

## Related

- [Searchbox CLI](https://github.com/privian/searchbox-cli) - Crawl your website and build an index.
- [lunr.js](https://github.com/olivernn/lunr.js) - full-text search library for use in the browser.

## Credits

- Inspired by [mkdocs-material](https://github.com/squidfunk/mkdocs-material)'s search.
- Built on top of [lunr.js](https://github.com/olivernn/lunr.js).

## License

MIT
