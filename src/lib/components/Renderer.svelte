<script lang="ts">
	import { afterUpdate } from "svelte";

	export let args: any[];
	export let renderer: (...args: any[]) => HTMLElement | string;

	let el: HTMLElement;

	$: content = renderer(...args);

	afterUpdate(() => {
		if (content instanceof Element) {
			el.replaceWith(content);
		} else if (content) {
			el.innerHTML = content;
		}
	});
</script>

<div bind:this={el}></div>