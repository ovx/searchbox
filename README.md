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

- Backend-less, runs in the browser from a pre-built index (see [Pagefind](https://pagefind.app/))
- Ideal for small websites, documentation pages and blogs
- Highly customizable

## Usage

Download a [release](https://github.com/bausw-com/searchbox/releases) or use a CDN:

```html
<!-- 1. Include the script -->
<script async defer type="module" src="https://cdn.jsdelivr.net/gh/bausw-com/searchbox/dist/searchbox.min.js"></script>

<!-- 2. use <search-box> tag around your search input -->
<search-box pagefind="https://pagefind.app/_pagefind/pagefind.js">
  <input type="search" placeholder="Search..." />
</search-box>
```

## Configuration options

```ts
/**
 * Dropdown alignment relative to the `anchor`.
 */
export let align: 'left' | 'right' | undefined = undefined;

/**
 * Dropdown anchor element for positioning and alignment. If not specified, the `input` will be used.
 */
export let anchor: string | undefined = undefined;

/**
 * The name of the Pagefind's "filter" property to be used as a category for grouping results. Use one of the properties returned by `pagefind.filters();`.
 * https://pagefind.app/docs/api/#filtering
*/
export let category: string | undefined = undefined;

/**
 * A custom search function. Can be used to request external API.
 */
export let customSearch: ((term: string, suggestions: boolean) => Promise<IResult>) | undefined = undefined;

/**
 * A custom delay (in milliseconds) between the input focus and when the dropdown is shown.
 */
export let dropdownDelay: number | undefined = undefined;

/**
 * Grouping function or a parameter name. The function should return group identifier as string.
 */
export let groupBy: string | ((doc: IResultItemDoc) => string) | undefined = undefined;

/**
 * Pagefind filters
 * https://pagefind.app/docs/api/#filtering
 */
export let filters: Record<string, any> | undefined = undefined;

/**
 * The name of the "meta" property to be used as an image in the search results (typically, this would be "image").
*/
export let image: string | undefined = undefined;

/**
 * Max. number of results to return (default: 100)
 */
export let limit: number = 100;

/**
 * Path to `pagefind.js` script
 */
export let pagefind: string;

/**
 * Custom renderer functions. Supported functions: `header`, `footer`, `item`.
 */
export let renderers: IRenderers | undefined = undefined;

/**
 * A custom HTML element where the results will be rendered instead of the dropdown. Is specified, the dropdown won't be shown.
 */
export let results: string | undefined = undefined;

/**
 * Pagefind sorting
 * https://pagefind.app/docs/api/#sorting-results
 */
export let sort: Record<string, 'asc' | 'desc'> | undefined = undefined;

/**
 * I18n strings override. See `src/strings.ts`.
 */
export let strings: Record<string, string> | undefined = undefined;

/**
 * Whether to use suggestions
 */
export let suggestions: boolean = false;

/**
 * A custom function that transforms the result (each item).
 */
export let transform: TTransformFunc | undefined = undefined;

/**
 * Dropdown width (default: 100%)
 */
export let width: string | undefined = undefined;
```

## Credits

- [Pagefind](https://pagefind.app/) - A fully static search library that aims to perform well on large sites, while using as little of your users’ bandwidth as possible, and without hosting any infrastructure

## Sponsor

This project is sponsored by [BAUSW](https://bausw.com "Construction site diary and other digital solutions for engineers.") - Construction site diary and other digital solutions for engineers.

## License

MIT