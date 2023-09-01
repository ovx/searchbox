<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/bausw-com/searchbox/master/assets/searchbox.svg" alt="Searchbox" width="200">
  <br>
  Searchbox
  <br>
</h1>

<h4 align="center">Fast, backend-less search to any website.</h4>

<p align="center">
  <a href="#what">What</a> •
  <a href="#demo">Demo</a> •
  <a href="#features">Features</a> •
  <a href="#usage">Usage</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

## Status

Searchbox is currently in Beta.

Your help and contributions are very much appreciated.

## What

Searchbox is an UI component built on top of Pagefind providing fast, backend-less search to any website using pre-built data files.

It is an open-source alternative to Algolia for small websites, blogs and documentation pages.

<div align="center">
  <img src="https://raw.githubusercontent.com/bausw-com/searchbox/master/assets/screenshot.png" alt="Searchbox" height="250">
</div>

## Demo

Play with the [demo](https://bausw-com.github.io/searchbox/demo.html)

## Features

- Backend-less, runs in the browser from pre-built index (see [Pagefind](https://pagefind.app/))
- Ideal for small websites, documentation pages and blogs
- Highly customizable

## Usage

Download a [release](https://github.com/bausw-com/searchbox/releases) or use a CDN:

1. Create `<input />` element:

```html
<!-- 1. Create input element -->
<div id="search">
  <input type="search" />
</div>

<!-- 2. Include Searchbox into your website -->
<script type="module" src="https://cdn.jsdelivr.net/gh/bausw-com/searchbox@0.2.4/dist/searchbox.min.js"></script>

<!-- 3. Configure Searchbox instance -->
<script>
window.addEventListener('DOMContentLoaded', () => {
  const searchbox = new Searchbox({
    props: {
      options: {
        // Place your options here (see Configuration options below)
        // ...
        // Replace this with your Pagefind's build path
        pagefind: '/_pagefind/pagefind.js',
      },
    },
    target: document.querySelector('#search')
  });
});
</script>
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
```

## Credits

- [Pagefind](https://pagefind.app/) - A fully static search library that aims to perform well on large sites, while using as little of your users’ bandwidth as possible, and without hosting any infrastructure

## Sponspor

This project is sponsored by [BAUSW](https://bausw.com) - no-code business apps for the construction industry.

## License

MIT