<svelte:options customElement={{
  tag: 'search-box',
  shadow: 'none',
}} />

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Dropdown from './lib/components/Dropdown.svelte';
	import Results from './lib/components/Results.svelte';
	import defaultStrings from './lib/strings';
	import { debounce } from './lib/helpers';
	import type { IResult, IResultItem, IResultItemDoc, IRenderers, TTransformFunc } from './types';

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

	const _onTermChange = debounce(onTermChange, 150);
	const _positionDropdown = debounce(positionDropdown, 10);

	let selectedCategory: string = '*';
	let dropdown: Dropdown;
	let dropdownResults: Results;
	let el: HTMLElement;
	let elResults: HTMLElement;
	let error: string | null = null;
	let focused: boolean = false;
	let form: HTMLFormElement;
	let i18n: Record<string, string> = Object.assign({}, defaultStrings, strings || {});
	let input: HTMLInputElement;
	let loading: boolean = false;
	let pagefindInstance: any;
	let result: IResult;
	let selectedItem: IResultItem = null;
	let showDropdown: boolean = false;
	let suggestionsResult: IResult;
	let resultsCmp: Results;

	$: showDropdown && _positionDropdown();

	onDestroy(() => {
		document.removeEventListener('scroll', onDocumentScroll);
		input.removeEventListener('focus', onInputFocus);
		input.removeEventListener('blur', onInputBlur);
		input.removeEventListener('input', onInputUpdate);
		input.removeEventListener('keydown', onInputKeydown);
		if (form) {
			form.removeEventListener('submit', onFormSubmit);
		}
		if (resultsCmp) {
			resultsCmp.$destroy();
		}
	});

	onMount(() => {
		if (pagefind) {
			import(/* @vite-ignore */pagefind).then((pf) => {
				if (!pf || typeof pf.search !== 'function') {
					throw new Error(`Imported module ${pagefind} is not a recognizable Pagefind module.`);
				}
				pagefindInstance = pf;
			}).catch((err) => {
				logError(err);
			});
		} else {
			logError(`Parameter 'pagefind' is empty.`);
		}
		ensureInput();
		form = input.closest('form');

		document.addEventListener('scroll', onDocumentScroll);
		input.addEventListener('focus', onInputFocus);
		input.addEventListener('blur', onInputBlur);
		input.addEventListener('input', onInputUpdate);
		input.addEventListener('keydown', onInputKeydown);

		if (form) {
			form.addEventListener('submit', onFormSubmit);
		}

		if (results) {
			elResults = document.querySelector(results);
			elResults.innerHTML = '';
			resultsCmp = new Results({
				target: elResults,
				props: {
					category: selectedCategory,
					i18n,
				},
			});
			resultsCmp.$on('category', (ev) => {
				onCategoryChange(ev.detail);
			});
		}
	});

	function logError(err: Error | string) {
		error = String(err);
		console.log(err)
	}

	function positionDropdown() {
		requestAnimationFrame(() => {
			if (dropdown && showDropdown) {
				dropdown.position();	
			}
		});
	}

	function ensureInput() {
		input = el.parentElement.querySelector('input');
		if (!input) {
			input = document.createElement('input');
			input.type = 'search';
			el.parentElement.appendChild(input);
		}
	}

	async function getSuggestions(term: string) {
		loading = true;
		selectedItem = null;
		const promise = customSearch(term, true);
		return promise.then((resp) => {
			suggestionsResult = transformResult(resp);
		}).finally(() => {
			loading = false;
		});
	}

	async function getResults(term: string) {
		loading = true;
		selectedItem = null;
		const promise = customSearch
			? customSearch(term, false)
			: pagefindSearch(term);
		return promise.then((resp) => {
			selectedCategory = '*';
			result = transformResult(resp);
			if (resultsCmp) {
				resultsCmp.$set({
					category: selectedCategory,
					result,
				});

			} else {
				requestAnimationFrame(() => {
					if (dropdownResults && showDropdown) {
						dropdownResults.scrollToTop();	
					}
					_positionDropdown();
				});
			}
		}).finally(() => {
			loading = false;
		});

	}

	function onCategoryChange(newCategory: string) {
		selectedCategory = newCategory;
		if (dropdownResults && showDropdown) {
			dropdownResults.scrollToTop();	
		}
		if (resultsCmp) {
			resultsCmp.$set({
				category: selectedCategory,
			});
		}
	}

	function onDocumentScroll() {
		if (showDropdown) {
			_positionDropdown();
		}
	}

	function onFormSubmit(ev: SubmitEvent) {
		ev.preventDefault();
		getResults(input.value.trim());
	}

	function onInputBlur() {
		focused = false;
		requestAnimationFrame(() => {
			if (!focused) {
				showDropdown = false;
			}
		});
	}

	function onInputFocus() {
		focused = true;	
		if (loading || result?.items) {
			setTimeout(() => {
				if (focused) {
					showDropdown = true;
				}
			}, dropdownDelay || 0);
		}
	}

	function onInputKeydown(ev: KeyboardEvent) {
		if (ev.key === 'Enter') {
			if (selectedItem?.doc?.link) {
				location.assign(selectedItem?.doc?.link);

			} else {
				getResults(input.value.trim());
				input.blur();
			}
		} else if (ev.key === 'Escape') {
			if (focused) {
				ev.preventDefault();
				input.blur();
			}
		} else if (ev.key === 'ArrowUp' || (ev.key === 'Tab' && ev.shiftKey)) {
			ev.preventDefault();
			dropdownResults?.navigateItems(-1);	

		} else if (ev.key === 'ArrowDown' || ev.key === 'Tab') {
			ev.preventDefault();
			dropdownResults?.navigateItems(1);	
	
		} else if (ev.key === 'Shift') {
			ev.preventDefault();

		} else {
			_onTermChange(input.value.trim());
		}
	}

	function onInputUpdate() {
		_onTermChange(input.value.trim());
	}

	function onSelection(item: IResultItem) {
		if (suggestions) {
			input.value = item.doc.suggestion || item.doc.title;
			input.setSelectionRange(input.value.length, input.value.length);

		} else {
			selectedItem = item;
		}
	}

	function onTermChange(term: string) {
		if (term) {
			if (focused && !showDropdown) {
				showDropdown = true;
			}
			if (suggestions) {
				getSuggestions(term);
			} else {
				getResults(term);
			}
		} else {
			result = null;
			if (showDropdown) {
				showDropdown = false;
			}
		}
	}

	async function pagefindSearch(term: string): Promise<IResult> {
		let items: IResultItem[] = [];
		if (pagefind) {
			const result = await pagefindInstance.search(term, {
				filters,
				sort,
			})
			const data = await Promise.all(result.results.slice(0, limit).map(async (item: any) => {
				return {
					id: item.id,
					data: await item.data(),
				};
			}));
			items = data.map((item) => {
				return {
					ref: item.id,
					doc: {
						category: category ? item.data.filters[category]?.[0] : void 0,
						image: image ? item.data.meta?.[image] : void 0,
						link: item.data.url,
						title: item.data.meta?.title,
						excerpt: item.data.excerpt,
					},
				};
			});
		}
		return {
			items,
		};
	}

	function transformResult(result: IResult) {
		if (transform) {
			result.items = result.items.map((item) => {
				item.doc = transform(item.doc, item, result);
				return item;
			});
		}
		if (groupBy) {
			result = groupResult(result);
		}
		return result;
	}

	function groupResult(result: IResult) {
		const grouped = result.items.reduce((acc, item) => {
			const groupByParam = typeof groupBy === 'function' ? groupBy(item.doc) : item.doc[groupBy];
			acc.set(groupByParam, [...acc.get(groupByParam) || [], item]);
			return acc;
		}, new Map<string, IResultItem[]>());
		result.items = [...grouped.values()].reduce((acc: IResultItem[], items: IResultItem[]) => {
			acc.push({
				...items[0],
				children: items.slice(1),
			});
			return acc;
		}, [] as IResultItem[]).sort((a, b) => {
			return a.children?.length > b.children?.length ? -1 : 1;
		});
		return result;
	}
</script>

<div {...$$restProps} bind:this={el}>
	<slot></slot>

	{#if showDropdown}
	<Dropdown bind:this={dropdown} {anchor} {align} {input} {width}>
		<Results
			bind:this={dropdownResults}
			bind:category={selectedCategory}
			{renderers}
			{i18n}
			{loading}
			message={error}
			result={suggestions ? suggestionsResult : result}
			on:category={(ev) => onCategoryChange(ev.detail)}
			on:selection={(ev) => onSelection(ev.detail)}
		/>
	</Dropdown>
	{/if}
</div>

<style global lang="scss">
:root {
  --searchbox-border-color: rgb(219, 219, 219);
  --searchbox-active-color: rgb(19, 58, 165);
  --searchbox-active-bg-color: rgb(233, 238, 250);
  --searchbox-muted-color: rgb(119, 119, 119);
  --searchbox-muted-bg-color: rgb(247, 247, 247);
  --searchbox-mark-bg: rgb(250, 248, 205);
  --searchbox-spacer: 0.5rem;
  --searchbox-spacer-lg: 1rem;
}

.searchbox {
  &-results {
    &-categories {
      background-color: var(--searchbox-muted-bg-color);
      border-bottom: 1px solid var(--searchbox-border-color);
      font-size: 0.8rem;
      padding: 0 var(--searchbox-spacer);

      &-wrap {
        overflow-y: visible;
        overflow-x: auto;
        margin: 0 0 -1px 0;
      }

      ul {
        display: flex;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      li {
        margin-right: var(--searchbox-spacer-lg);
      }

      a,
      [role='button'] {
        border-bottom: 1px solid transparent;
        color: var(--searchbox-muted-color);
        cursor: pointer;
        display: inline-block;
        padding: var(--searchbox-spacer) 0;
        white-space: nowrap;

        &.active {
          border-bottom-color: var(--searchbox-active-color);
          color: var(--searchbox-active-color);
        }
      }
    }

    &-items {
      flex-grow: 1;
      overflow-y: auto;
      overflow-x: hidden;

      mark {
        background-color: var(--searchbox-mark-bg);
        color: currentColor;
        padding: 0;
      }

      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      a {
        color: var(--searchbox-active-color);
      }
    }

    &-header {
      background-color: var(--searchbox-muted-bg-color);
      border-bottom: 1px solid var(--searchbox-border-color);
      padding: var(--searchbox-spacer);
    }

    &-footer {
      background-color: var(--searchbox-muted-bg-color);
      border-top: 1px solid var(--searchbox-border-color);
      padding: var(--searchbox-spacer);
    }

    &:not(.compact) &-item:not(:last-child) {
      border-bottom: 1px solid var(--searchbox-border-color);
    }

    &-text {
      color: var(--searchbox-muted-color);
      padding: var(--searchbox-spacer);
    }

    &-load-more {
      color: var(--searchbox-muted-color);

      button {
        background: transparent;
        border: none;
        box-shadow: none;
        color: currentColor;
        cursor: pointer;
        font-size: 0.8rem;
        outline: none;
        margin: 0;
        padding: var(--searchbox-spacer);
        width: 100%;
      }
    }

    &-item:not(:last-child) {
      border-bottom: 1px solid var(--searchbox-border-color);
    }

    &-link {
      display: flex;
      padding: var(--searchbox-spacer);
      text-decoration: none;

      &:hover {
        text-decoration: none;
      }

      &.focus,
      &:hover {
        background-color: var(--searchbox-active-bg-color);
      }
    }

    &-image {
      color: var(--searchbox-muted-color);
      margin-right: var(--searchbox-spacer);
    }

    &-excerpt {
      color: var(--searchbox-muted-color);
      font-size: 0.8rem;
      margin-top: var(--searchbox-spacer);

      code {
        font-size: 0.8rem;
      }

			h1, h2, h3, h4, h5, h6 {
				font-size: 0.8rem;
			}

      p {
        margin-top: 0;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    &-expand {
      background-color: var(--searchbox-muted-bg-color);
      color: var(--searchbox-active-color);

      button {
        background: transparent;
        border: none;
        box-shadow: none;
        color: currentColor;
        cursor: pointer;
        font-size: 0.8rem;
        outline: none;
        margin: 0;
        padding: var(--searchbox-spacer);
      }
    }

    &-item-expanded &-expand {
      color: var(--searchbox-muted-color);
    }

    &-label {
      border: 1px solid var(--searchbox-border-color);
      border-radius: 1rem;
      color: var(--searchbox-muted-color);
      font-size: 0.8rem;
      margin-left: var(--searchbox-spacer);
      padding: 2px 6px;
    }
  }

  &-dropdown {
    background: white;
    border: 1px solid var(--searchbox-border-color);
    display: flex;
    flex-direction: column;
    height: 0;
    overflow: hidden;
    position: fixed;
    transition: height 0.3s;
    z-index: 10000;
  }
}
</style>
