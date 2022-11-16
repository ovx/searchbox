<script lang="ts">
	import { afterUpdate, createEventDispatcher, onMount } from 'svelte';
	import Renderer from './Renderer.svelte';
	import ResultItem from './ResultItem.svelte';
	import type { IRenderers, IResult, IResultItem } from '../../types';

	export let category: string = null;
	export let i18n: Record<string, string>;
	export let loading: boolean = false;
	export let message: string | null = null;
	export let renderers: IRenderers = null;
	export let result: IResult = null;

	const dispatch = createEventDispatcher();

	let el: HTMLElement;
	let scrolled: boolean = false;
	let pageSize: number = 10;
	let maxItems: number = pageSize;
	let expandedItems: string[] = [];
	let forceExpanded: boolean = false;

	$: categories = result?.items?.reduce((acc, item) => {
		if (item.doc.category && !acc.includes(item.doc.category)) {
			acc.push(item.doc.category);
		}
		return acc;
	}, ['*']);

	$: onCategoriesUpdate(categories);

	$: filteredItems = getFilteredItems(result?.items, category, expandedItems);

	$: slicedFilteredItems = filteredItems?.slice(0, maxItems);

	onMount(() => {
		requestAnimationFrame(() => {
			onScroll();
		});
	});

	function getFilteredItems(items: IResultItem[], _category: string, _expandedItems: string[]) {
		const filtered = category === '*' ? items : items?.filter((item) => {
				return item.doc.category === category;
		});
		forceExpanded = filtered?.length === 1;
		return filtered?.reduce((acc, item) => {
			acc.push(item);
			if (item.children?.length && (forceExpanded || expandedItems.includes(item.ref))) {
				acc.push(...item.children);
			}
			return acc;
		}, []);
	}

	function onCategoriesUpdate(_categories: string[]) {
		if (categories?.length === 2) {
			category = categories[1];
		} else if (categories?.length === 1 || !categories?.includes(category)) {
			category = '*';
		}
	}

	function onCategoryClick(category: string) {
		dispatch('category', category);
	}

	function onItemClick(item: IResultItem) {
		dispatch('selection', item);
	}

	function onItemExpand(item: IResultItem) {
		if (expandedItems.includes(item.ref)) {
			expandedItems = expandedItems.filter((ref) => ref !== item.ref);
		} else {
			expandedItems = [...expandedItems, item.ref];
		}
	}

	function onScroll() {
		const _scrolled = el?.scrollTop > 5;
		if (_scrolled !== scrolled) {
			scrolled = _scrolled;
		}
		if ((el?.scrollTop + el?.clientHeight) >= (el?.scrollHeight - 50)) {
			loadMore();
		}
	}

	function loadMore() {
		maxItems = maxItems + pageSize;
	}

	export function scrollToTop() {
		if (el) {
			el.scrollTop = 0;
		}
	}

	export function navigateItems(dir: number, cls: string = 'focus') {
		const els: Element[] = [].slice.call(el.querySelectorAll('a[tabindex]'));
		let activeItem = el.querySelector('a:hover, a.' + cls);
		if (!activeItem) {
			dir = 0;
			activeItem = els[0];
		}
		const idx = Math.max(0, Math.min(els.length - 1, els.indexOf(activeItem) + dir));
		const targetItem = els[idx];
		activeItem?.classList.remove(cls);
		targetItem.classList.add(cls);
		const ref = targetItem.getAttribute('data-ref');
		const item = ref && result.items.find((item) => item.ref === ref);
		if (item) {
			dispatch('selection', item);
		}
		targetItem.scrollIntoView({
			behavior: 'smooth',
		});
	}
</script>

{#if renderers?.header}
<div class="searchbox-results-header">
	<Renderer renderer={renderers.header} args={[result]} />
</div>
{/if}

{#if categories?.length > 1}
<div class="searchbox-results-categories">
	<div class="searchbox-results-categories-wrap">
		<ul>
			{#if categories.length > 2}
			<li>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span role="button" class:active={category === '*'} on:click={() => onCategoryClick('*')}>{i18n.all}</span>
			</li>
			{/if}
			{#each categories.slice(1) as cat}
			<li>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span role="button" class:active={category === cat} on:click={() => onCategoryClick(cat)}>{cat}</span>
			</li>
			{/each}
		</ul>
	</div>
</div>
{/if}

<div bind:this={el} class="searchbox-results-items" on:scroll={() => onScroll()}>
	<ul>
		{#if loading}
		<li class="searchbox-results-text">
			{i18n.loading}
		</li>

		{:else if message}
		<li class="searchbox-results-text">
			{message}
		</li>

		{:else if !filteredItems?.length}
		<li class="searchbox-results-text">
			{i18n.no_results}
		</li>

		{:else if slicedFilteredItems}
			{#each slicedFilteredItems as item}
			<ResultItem
				{item}
				{i18n}
				{forceExpanded}
				renderer={renderers?.item}
				expanded={expandedItems.includes(item.ref)}
				on:click={(ev) => onItemClick(ev.detail)}
				on:expand={(ev) => onItemExpand(ev.detail)}
			/>
			{/each}
		{/if}

		{#if filteredItems?.length > maxItems}
		<li class="searchbox-results-load-more">
			<button type="button" on:click|preventDefault={() => loadMore()}>{i18n.load_more}</button>
		</li>
		{/if}
	</ul>
</div>

{#if renderers?.footer}
<div class="searchbox-results-footer">
	<Renderer renderer={renderers.footer} args={[result]} />
</div>
{/if}