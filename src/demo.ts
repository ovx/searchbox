import './searchbox.scss'
import Searchbox from './Searchbox.svelte'

const searchbox = new Searchbox({
	props: {
		options: {
			anchor: document.querySelector('#search .search-input'),
			category: 'section',
			pagefind: 'https://pagefind.app/_pagefind/pagefind.js',
			renderers: {
				footer: () => `<div class="footer"><a href="https://github.com/privian/searchbox">Powered by Searchbox</a></div>`,
			},
			groupBy: 'title',
		},
	},
	target: document.querySelector('#search')
})

export default searchbox;
