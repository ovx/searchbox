import './searchbox.scss'
import Searchbox from './Searchbox.svelte'

if (typeof 'window' !== void 0) {
  Object.assign(window, {
    Searchbox,
  });
}

export default Searchbox;
