import type { ESearchboxCommand } from './types';

export class SearchboxWorker {
  worker: Worker | null;

  messageId: number = 0;

  pendingReplies: Map<
    number,
    { resolve: (result: unknown) => void; reject: (reason?: unknown) => void }
  > = new Map();

  constructor(readonly scriptUrl: string) {
    this.worker = new Worker(this.scriptUrl);
    this.worker.onmessage = this.onMessage.bind(this);
  }

  destroy() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  async command<T>(command: ESearchboxCommand, params?: unknown): Promise<T> {
    if (!this.worker) {
      throw new Error('Worker destroyed');
    }
    this.messageId++;
    const id = this.messageId;
    const promise = new Promise<T>((resolve, reject) => {
      this.pendingReplies.set(id, {
        resolve,
        reject,
      });
      this.worker.postMessage({
        command,
        id,
        params,
      });
    });
    return promise;
  }

  onMessage(ev: MessageEvent) {
    const message = ev.data;
    if (message && message.id) {
      const promise = this.pendingReplies.get(message.id);
      if (promise) {
        if (message.error) {
          promise.reject(message.error);
        } else {
          promise.resolve(message.result);
        }
        this.pendingReplies.delete(message.id);
      }
    }
  }
}
