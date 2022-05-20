import { SearchboxWorker } from './searchbox-worker';
import {
  ESearchboxCommand,
  IResult,
  ISearchboxIndexOptions,
  ISearchboxSearchOptions,
} from './types';

export class Searchbox {
  readonly workers: Map<string, SearchboxWorker> = new Map();

  constructor(readonly workerScriptUrl: string) {}

  destroyIndex(index: string) {
    try {
      this.getWorker(index, false).destroy();
    } catch (err) {
      // noop
    }
  }

  getWorker(index: string, create: boolean = false) {
    const workerName = this.getWorkerName(index);
    let worker = this.workers.get(workerName);
    if (!worker && create) {
      worker = new SearchboxWorker(this.workerScriptUrl);
      this.workers.set(workerName, worker);
    } else if (!worker) {
      throw new Error(
        `Worker for index '${index}' does not exist. Call ensureIndex() first.`
      );
    }
    return worker;
  }

  getWorkerName(index: string) {
    return index;
  }

  async ensureIndex(
    index: string,
    options: ISearchboxIndexOptions
  ): Promise<unknown> {
    return this.getWorker(index, true).command(
      ESearchboxCommand.ENSURE_INDEX,
      options
    );
  }

  async suggestions(index: string, term: string): Promise<IResult> {
    return this.getWorker(index).command(ESearchboxCommand.SUGGESTIONS, {
      term,
    });
  }

  async search(
    index: string,
    term: string,
    options?: ISearchboxSearchOptions
  ): Promise<IResult> {
    return this.getWorker(index).command(ESearchboxCommand.SEARCH, {
      options,
      term,
    });
  }
}
