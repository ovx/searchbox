import { SearchboxIndex } from '../searchbox-index';
import {
  ESearchboxCommand,
  IMessage,
  IMessageInitParams,
  IMessageSearchParams,
  IMessageSuggestionsParams,
} from '../types';

const indices: Map<
  string,
  Promise<{ idx: SearchboxIndex; metadata: any }>
> = new Map();

async function ensureIndex(params: IMessageInitParams) {
  if (!indices.has(params.name)) {
    const idx = new SearchboxIndex({
      highlight: params.highlight,
      injectScripts: params.injectScripts,
      languages: params.languages,
      url: params.url,
    });
    const promise = idx.load().then((metadata) => {
      return {
        idx,
        metadata,
      };
    });
    indices.set(params.name, promise);
    return promise.then(({ metadata }) => metadata);
  }
  return indices.get(params.name).then(({ metadata }) => metadata);
}

async function search(params: IMessageSearchParams) {
  return (await indices.get(params.index)).idx.search(
    params.term,
    params.options
  );
}

async function suggestions(params: IMessageSuggestionsParams) {
  return (await indices.get(params.index)).idx.suggestions(params.term);
}

async function handleMessage(message: IMessage) {
  switch (message.command) {
    case ESearchboxCommand.ENSURE_INDEX:
      return ensureIndex(message.params);
    case ESearchboxCommand.SEARCH:
      return search(message.params);
    case ESearchboxCommand.SUGGESTIONS:
      return suggestions(message.params);
    default:
      throw new Error(`Unsupported message command '${message.command}'.`);
  }
}

onmessage = (e) => {
  const message = e.data;
  if (message && typeof message === 'object' && message.id && message.command) {
    handleMessage(message)
      .catch((err) => {
        postMessage({
          id: message.id,
          error: err,
        });
      })
      .then((result) => {
        postMessage({
          id: message.id,
          result,
        });
      });
  } else {
    postMessage({
      error: `Invalid message format.`,
    });
  }
};
