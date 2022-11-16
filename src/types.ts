export type TTransformFunc = (
  doc: IResultItemDoc,
  item: IResultItem,
  result: IResult
) => IResultItemDoc;

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
   * The name of the Pagefind's "filter" property to be used as a category for grouping results. Use one of the properties returned by `pagefind.filters();`.
   * https://pagefind.app/docs/api/#filtering
  */
  category?: string;

  /**
   * A custom search function. Can be used to request external API.
   */
  customSearch?: (term: string, suggestions: boolean) => Promise<IResult>;

  /**
   * A custom delay (in milliseconds) between the input focus and when the dropdown is shown.
   */
  dropdownDelay?: number;

  /**
   * Grouping function or a parameter name. The function should return group identifier as string.
   */
  groupBy?: string | ((doc: IResultItemDoc) => string);

  /**
   * Pagefind filters
   * https://pagefind.app/docs/api/#filtering
   */
  filters?: Record<string, any>;

  /**
   * The name of the "meta" property to be used as an image in the search results (typically, this would be "image").
  */
  image?: string;

  /**
   * Max. number of results to return (default: 100)
   */
  limit?: number;

  /**
   * Path to `pagefind.js` script
   */
  pagefind: string;

  /**
   * A custom HTML element where the results will be rendered instead of the dropdown. Is specified, the dropdown won't be shown.
   */
  results?: HTMLElement;

  /**
   * Custom renderer functions. Supported functions: `header`, `footer`, `item`.
   */
  renderers?: IRenderers;

  /**
   * Pagefind sorting
   * https://pagefind.app/docs/api/#sorting-results
   */
  sort?: Record<string, 'asc' | 'desc'>;

  /**
   * I18n strings override. See `src/strings.ts`.
   */
  strings?: Record<string, string>;

  /**
   * Whether to use suggestions
   */
  suggestions?: boolean;

  /**
   * A custom function that transforms the result (each item).
   */
  transform?: TTransformFunc;

  /**
   * Dropdown width (default: 100%)
   */
  width?: number;
}

export interface IResultItemDoc {
  category?: string;
  excerpt?: string;
  image?: string;
  labels?: string;
  link?: string;
  title: string;
  suggestion?: string;
}

export interface IResultItem {
  children?: IResultItem[];
  doc: IResultItemDoc;
  ref: string;
}

export interface IResult {
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
