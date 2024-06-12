import type { Callback } from '../types/shared.js';

export function wait<T>(ms: number, callback: Callback<T>): Promise<T>;
export function wait(ms: number): Promise<void>;

export function wait<T>(ms: number, callback?: Callback<T>) {
  return new Promise<T | void>((resolve, reject) =>
    setTimeout(async () => {
      try {
        let maybe;
        if (callback) {
          maybe = await callback();
          resolve(maybe);
        } else {
          resolve();
        }
      } catch (err) {
        reject(err);
      }
    }, ms),
  );
}

export type Wait = typeof wait;
