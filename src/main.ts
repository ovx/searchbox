import './styles/main.scss';

import SearchboxComponent from './Searchbox.svelte';
import { Searchbox } from './searchbox';

if (typeof 'window' !== void 0) {
  Object.assign(window, {
    SearchboxComponent,
    Searchbox,
  });
}

export default Searchbox;
