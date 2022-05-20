export type TTransformFunc = (
  doc: IResultItemDoc,
  item: IResultItem,
  result: IResult
) => IResultItemDoc;

export interface IManifestField {
  boost?: number;
  name: string;
  search?: boolean;
  suggestions?: boolean;
}

export interface IManifest {
  baseUrl?: string;
  fields: IManifestField[];
  data: string;
  version?: string;
}

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

export interface IResultItemDoc {
  category?: string;
  icon?: string;
  labels?: string;
  link?: string;
  title: string;
  snippet?: string;
  suggestion?: string;
}

export interface IResultItem {
  children?: IResultItem[];
  doc: IResultItemDoc;
  matchData: Record<string, any>;
  ref: string;
  score: number;
}

export interface IResult {
  manifest?: IManifest;
  items?: IResultItem[];
  time?: number;
}

export interface IRenderers {
  footer?: (result: IResult) => string | HTMLElement;
  header?: (result: IResult) => string | HTMLElement;
  item?: (item: IResultItem, result: IResult) => string | HTMLElement;
}

export interface ISearchboxSearchOptions {
  fields?: string[];
  limit?: number;
}

export enum ESearchboxCommand {
  ENSURE_INDEX = 'ensureIndex',
  SUGGESTIONS = 'suggestions',
  SEARCH = 'search',
}

export interface IMessage<T = any> {
  command: ESearchboxCommand;
  id: number;
  params: T;
}

export interface IMessageInitParams {
  highlight?: boolean;
  injectScripts?: string[];
  languages?: string[];
  name: string;
  url: string;
}

export interface IMessageSuggestionsParams {
  index: string;
  term: string;
}

export interface IMessageSearchParams {
  index: string;
  options?: {
    fields?: string[];
    max?: number;
  };
  term: string;
}

export interface ISearchboxIndexOptionsTokenizer {
  separator?: string | RegExp;
}

export interface ISearchboxIndexOptions {
  b?: number;
  highlight?: boolean;
  injectScripts?: string[];
  k1?: number;
  languages?: string[];
  separator?: string;
  suggestions?: boolean;
  tokenizer?: ISearchboxIndexOptionsTokenizer;
  url: string;
}
