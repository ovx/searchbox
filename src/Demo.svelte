<script lang="ts">
	import { onMount } from 'svelte';
	import Searchbox from './Searchbox.svelte';

	let manifestId: string = 'wiki';
	let demo1: any;
	let demo2: any;

	$: manifest = `/searchbox/demo/sample/${manifestId}.manifest.json`; // `https://privian.github.io/searchbox/demo/sample/${manifestId}.manifest.json`;

	onMount(() => {
		onManifestChange();
	});

	function onManifestChange() {
		setupDemo1();
		setupDemo2();
	}

	function setupDemo1() {
		if (demo1) {
			demo1.$destroy();
		}
		const input = document.querySelector('#input1') as HTMLInputElement;
		input.value = '';
		demo1 = new Searchbox({
			target: document.querySelector('.search1'),
			props: {
				options: {
					anchor: input.parentElement,
					groupBy: (doc) => {
						return doc?.link?.replace(/[\#\?].*$/g, '');
					},
					input,
					manifest,
					suggestions: false,
					dropdownDelay: 400,
					renderers: {
						footer(result) {
							const count = result?.items.reduce((acc, item) => acc + (item.children?.length || 0), result.items.length);
							return (result ? `<div class="search1-poweredby"><div>${count} results &bull; ${result.time / 1000}s</div>` : '')
								+`<div>Powered by <a href="https://github.com/privian/searchbox">Searchbox</a></div></div>`;
						},
					},
					worker: 'dist/searchbox.worker.min.js',
				},
			}
		});

	}

	function setupDemo2() {
		if (demo2) {
			demo2.$destroy();
		}
		const input = document.querySelector('#input2') as HTMLInputElement;
		input.value = '';
		demo2 = new Searchbox({
			target: document.querySelector('.search2'),
			props: {
				options: {
					input,
					manifest,
					results: document.querySelector('#results2'),
					suggestions: true,
					worker: 'dist/searchbox.worker.min.js',
				},
			}
		});
	}
</script>

<div class="demo">
	<div>
		<h1><a href="https://github.com/privian/searchbox">Searchbox</a> demo</h1>
		<p>Open-source alternative to Algolia search.</p>
	</div>

	<div class="dataset">
		<p>Select dataset:</p>

		<select bind:value={manifestId} on:change={() => onManifestChange()}>
			<option value="wiki">Wikipedia 1,000 articles (0.72MB)</option>
			<option value="nodejs">NodeJS Full Docs (5.2MB)</option>
		</select>

		{#if manifestId === 'wiki'}
		<p>A sample of 1,000 summarized wikipedia pages related to Steve Jobs. Try searching for <b>steve, apple, iphone, california</b>.</p>
		{:else if manifestId === 'nodejs'}
		<p>Full Node.js documentation, including code examples. Try searching for <b>crypto, http request, fs write</b>.</p>
		{/if}
	</div>

	<div class="flex">
		<div>
			<h1>Demo 1</h1>
			<h3>Floating search box</h3>

			<div class="search1">
				<div class="search1-input">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
						<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
					</svg>

					<input type="search" id="input1" autocomplete="off" placeholder="Search..." />
				</div>
			</div>
		</div>

		<div>
			<h1>Demo 2</h1>
			<h3>Suggestions with custom results element</h3>

			<div class="search2">
				<form>
					<input type="search" id="input2" autocomplete="off" placeholder="Search..." />
					<button type="submit">Search</button>
				</form>

				<div class="search2-results">
					<div id="results2"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.demo {
		color: #333;
		margin: 0;
		padding: 8px;
		box-sizing: border-box;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
	}
	.demo :global(*) {
		box-sizing: border-box;
	}
	.demo :global(h1) {
		font-size: 150%;
	}
	.demo :global(p) {
		margin: 0.5rem 0;
	}
	.demo :global(code) {
		color: rgb(129, 85, 138);
		font-size: 0.85rem;
	}
	.demo :global(pre) {
		border: 1px solid lightgrey;
		border-radius: 5px;
		padding: 0.5rem;
	}
	.demo :global(blockquote) {
		border-left: 1px solid lightgray;
		margin: 0;
		padding-left: 0.5rem;
	}
	.demo :global(input),
	.demo :global(select),
	.demo :global(textarea) {
		font-family: inherit;
		font-size: inherit;
		-webkit-padding: 0.4em 0;
		padding: 0.4em;
		margin: 0 0 0.5em 0;
		box-sizing: border-box;
		border: 1px solid #ccc;
		border-radius: 2px;
	}
	.flex {
		display: flex;
		flex-wrap: wrap;
	}
	.flex > * {
		width: 50%;
	}
	.dataset {
		background-color: lightgray;
		padding: 0.5rem;
	}
	.search2 input {
		width: 250px;
	}
	.search2-results {
		overflow-x: auto;
		max-width: 100%;
	}
	:global(.search1-poweredby) {
		justify-content: space-between;
		display: flex;
	}
	.search1-input {
		align-items: center;
		background: white;
		border: 1px solid lightgray;
		border-radius: 10px;
		display: inline-flex;
		padding: 2px 0.5rem;
	}
	.search1-input input {
		background: transparent;
		border: none;
		outline: none;
		margin: 0 0 0 0.5rem;
		transition: all 0.3s;
		width: 200px;
	}
	.search1-input input:focus {
		width: 450px;
	}
	.search1-input:global(.searchbox-dropdown-visible) {
		border-radius: 10px 10px 0 0;
		box-shadow: 4px 4px 2px rgb(240, 240, 240);
	}
	:global(.search1 .searchbox-dropdown) {
		box-shadow: 4px 4px 2px rgb(240, 240, 240);
		border-radius: 0 0 10px 10px;
	}
	:global(.search1 .searchbox-results-snippet) {
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 6;
		-webkit-box-orient: vertical;
	}
	:global(.search1 .searchbox-results-snippet pre) {
		max-height: 100px;
		overflow: hidden;
	}
	:global(.searchbox-results-footer) {
		font-size: 12px;
		text-align: right;
	}

	@media screen and (max-width: 600px) {
		.flex > * {
			width: 100%;
		}
		.search1-input {
			width: 100%;
		}
		.search1-input input,
		.search1-input input:focus {
			width: 100%;
		}
	}
</style>
