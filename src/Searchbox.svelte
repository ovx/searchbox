<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Searchbox } from './searchbox';
	import Dropdown from './components/Dropdown.svelte';
	import Results from './components/Results.svelte';
	import strings from './strings';
	import { debounce } from './helpers';
	import type { IOptions, IResult, IResultItem } from './types';
	
	export let options: IOptions;

	const _onTermChange = debounce(onTermChange, 150);
	const _positionDropdown = debounce(positionDropdown, 10);
	const indexName: string = 'index';
	const baseUrl = document.currentScript?.getAttribute('src')?.replace(/\/[^\/]$/, '') || '';
	const workerScriptUrl = options.worker || `${baseUrl}/searchbox.worker.min.js`;

	let category: string = '*';
	let dropdown: Dropdown;
	let dropdownResults: Results;
	let focused: boolean = false;
	let form: HTMLFormElement;
	let i18n: Record<string, string> = Object.assign({}, strings, options.strings || {});
	let input: HTMLInputElement;
	let loading: boolean = false;
	let result: IResult;
	let search: Searchbox = new Searchbox(workerScriptUrl);
	let selectedItem: IResultItem = null;
	let showDropdown: boolean = false;
	let suggestionsResult: IResult;
	let results: Results;

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
		if (results) {
			results.$destroy();
		}
		search.destroyIndex(indexName);
	});

	onMount(() => {
		input = options.input;
		form = input.closest('form');

		document.addEventListener('scroll', onDocumentScroll);
		input.addEventListener('focus', onInputFocus);
		input.addEventListener('blur', onInputBlur);
		input.addEventListener('input', onInputUpdate);
		input.addEventListener('keydown', onInputKeydown);

		if (form) {
			form.addEventListener('submit', onFormSubmit);
		}

		if (options.results) {
			options.results.innerHTML = '';
			results = new Results({
				target: options.results,
				props: {
					category,
					i18n,
				},
			});
			results.$on('category', (ev) => {
				onCategoryChange(ev.detail);
			});
		}
	});

	function positionDropdown() {
		requestAnimationFrame(() => {
			if (dropdown && showDropdown) {
				dropdown.position();	
			}
		});
	}

	async function getSuggestions(term: string) {
		loading = true;
		selectedItem = null;
		const promise = options.customSearch
			? options.customSearch(term, true)
			: loadIndex().then(() => search.suggestions(indexName, term));
		return promise.then((resp) => {
			suggestionsResult = transformResult(resp);
		}).finally(() => {
			loading = false;
		});
	}

	async function getResults(term: string) {
		loading = true;
		selectedItem = null;
		const promise = options.customSearch
			? options.customSearch(term, false)
			: loadIndex().then(() => search.search(indexName, term, {
				limit: options.limit,
			}));
		return promise.then((resp) => {
			category = '*';
			result = transformResult(resp);
			if (results) {
				results.$set({
					category,
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

	async function loadIndex() {
		if (!options.manifest) {
			throw new Error(`Manifest URL is not configured.`);
		}
		return search.ensureIndex(indexName, {
			highlight: options.highlight,
			injectScripts: options.injectScripts,
			languages: options.languages,
			separator: options.separator,
			url: options.manifest,
		});
	}

	function onCategoryChange(newCategory: string) {
		category = newCategory;
		if (dropdownResults && showDropdown) {
			dropdownResults.scrollToTop();	
		}
		if (results) {
			results.$set({
				category,
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
		loadIndex();
		if (loading || result?.items) {
			setTimeout(() => {
				if (focused) {
					showDropdown = true;
				}
			}, options.dropdownDelay || 0);
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
		if (options.suggestions) {
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
			if (options.suggestions) {
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

	function transformResult(result: IResult) {
		if (options.transform) {
			result.items = result.items.map((item) => {
				item.doc = options.transform(item.doc, item, result);
				return item;
			});
		}
		if (options.groupBy) {
			result = groupResult(result);
		}
		return result;
	}

	function groupResult(result: IResult) {
		const grouped = result.items.reduce((acc, item) => {
			const groupBy = typeof options.groupBy === 'function' ? options.groupBy(item.doc) : item.doc[options.groupBy];
			acc.set(groupBy, [...acc.get(groupBy) || [], item]);
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

{#if showDropdown}
<Dropdown bind:this={dropdown} anchor={options.anchor || input} align={options.align} width={options.width}>
	<Results
		bind:this={dropdownResults}
		bind:category={category}
		renderers={options.renderers}
		{i18n}
		{loading}
		result={options.suggestions ? suggestionsResult : result}
		on:category={(ev) => onCategoryChange(ev.detail)}
		on:selection={(ev) => onSelection(ev.detail)}
	/>
</Dropdown>
{/if}