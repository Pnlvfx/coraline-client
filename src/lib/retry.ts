import type { Callback } from '../types/shared.js';
import { isProduction } from '../config.js';
import { errToString } from './error.js';

export interface RetryOptions {
  maxAttempts?: number;
  retryIntervalMs?: number;
  failMessage?: (err: string, attempt: number) => string;
  signal?: AbortController['signal'];
}

/** Run a function for the the desired amount of times, if it fails the last retry, it will throw an error. */
export const withRetry = <T>(callback: Callback<T>, { maxAttempts, retryIntervalMs = 1000, failMessage, signal }: RetryOptions = {}) => {
  return new Promise<T>((resolve, reject) => {
    let attempt = 0;
    const handle = async () => {
      try {
        const maybe = await callback();
        resolve(maybe);
      } catch (err) {
        if (signal?.aborted) {
          reject('Aborted');
          return;
        }
        if (attempt === maxAttempts) {
          reject(err);
          return;
        }
        if (!isProduction) {
          // eslint-disable-next-line no-console
          console.log(
            failMessage
              ? failMessage(errToString(err), attempt)
              : `Function fail, try again, error: ${errToString(err)}, attempt: ${attempt}, maxAttempts: ${maxAttempts || 'Infinity'}`,
          );
        }
        setTimeout(handle, retryIntervalMs);
        attempt++;
      }
    };
    handle();
  });
};
