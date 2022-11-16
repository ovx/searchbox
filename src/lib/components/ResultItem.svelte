<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Renderer from './Renderer.svelte';
	import type { IResultItem, IRenderers } from '../../types';

	export let expanded: boolean = false;
	export let forceExpanded: boolean = false;
	export let i18n: Record<string, string>;
	export let item: IResultItem;
	export let renderer: IRenderers['item'] = null;

	const dispatch = createEventDispatcher();

	$: labels = Array.isArray(item?.doc?.labels) ? item.doc.labels : item?.doc?.labels?.split(/[\,\;]/).filter((label) => !!label);

	function onClick(ev: Event) {
		if (!item.doc.link) {
			ev.stopPropagation();
			ev.preventDefault();
			dispatch('click', item);
		}
	}

	function onExpandChildrenClick() {
		dispatch('expand', item);
	}
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<li class="searchbox-results-item" on:click={onClick} class:searchbox-results-item-expanded={expanded}>
	{#if renderer}
		<Renderer {renderer} args={[item]} />

	{:else}
	<a href={item.doc.link} class="searchbox-results-link" tabindex="-1" data-ref={item.ref} on:click={onClick}>
		{#if item.doc.image}
		<div class="searchbox-results-image">
			<img src={item.doc.image} alt="" width="48" />
		</div>
		{/if}

		<div>
			<div class="searchbox-results-title">
				{@html item.doc.title}
				{#if labels?.length}
					{#each labels as label}
					<span class="searchbox-results-label">{label}</span>
					{/each}
				{/if}
			</div>
			{#if item.doc.excerpt}
			<div class="searchbox-results-excerpt">{@html item.doc.excerpt}</div>
			{/if}

		</div>
	</a>
	{#if !forceExpanded && item.children?.length}
	<div class="searchbox-results-expand">
		<button type="button" on:click={() => onExpandChildrenClick()}>{i18n.more_on_this_page.replace('{count}', String(item.children.length))}</button>
	</div>
	{/if}
	{/if}
</li>