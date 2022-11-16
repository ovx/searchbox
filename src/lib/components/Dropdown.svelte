<script lang="ts">
	import { onDestroy } from 'svelte';

	export let align: 'left' | 'right' = 'left';
	export let anchor: HTMLElement;
	export let offset: [ number, number ] = [ 0, -1 ];
	export let animationDuration: number = 350;
	export let pageOffset: number = 20;
	export let width: number = null;

	let el: HTMLElement;

	$: computedStyles = el && getComputedStyle(el);

	onDestroy(() => {
		if (anchor) {
			anchor.classList.remove('searchbox-dropdown-visible');
		}
	});

	function onMouseDown(ev: MouseEvent) {
		// @ts-ignore
		if (ev.currentTarget.tagName !== 'A') {
			ev.preventDefault();
		}
	}

	export function position() {
		if (anchor && el) {
			const boundry = anchor.getBoundingClientRect();
			const docHeight = document.documentElement.clientHeight;
			const docWidth = document.documentElement.clientWidth;
			const borderSize = parseInt(computedStyles.borderTopWidth, 10) + parseInt(computedStyles.borderBottomWidth, 10);
			const maxHeight = Math.min(docHeight - (pageOffset * 2), docHeight - pageOffset - boundry.bottom);
			el.style.width = `${width || boundry.width}px`;
			el.style.top = `${boundry.bottom + offset[1]}px`;
			if (align === 'right') {
				el.style.left = `auto`;
				el.style.right = `${docWidth - (boundry.right + offset[0])}px`;
			} else {
				el.style.left = `${boundry.left + offset[0]}px`;
				el.style.right = `auto`;
			}
			el.style.maxHeight = `${maxHeight}px`;
			const height = [...el.childNodes].reduce((acc, node) => {
				if (node instanceof Element) {
					return acc + Math.max(node.getBoundingClientRect().height, node.scrollHeight);
				}
				return acc;
			}, borderSize);
			el.style.height = `${Math.min(maxHeight, height)}px`;
			anchor.classList.add('searchbox-dropdown-visible');
			setTimeout(() => {
				if (el) {
					el.style.height = `auto`;
				}
			}, animationDuration);
		}
	}
</script>

<div bind:this={el} class="searchbox-dropdown" on:mousedown={onMouseDown}>
	<slot></slot>
</div>