export type TTransformFunc = (
  doc: IResultItemDoc,
  item: IResultItem,
  result: IResult
) => IResultItemDoc;

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
