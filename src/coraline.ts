import coralineDate from './lib/date.js';
import coralineColors from './lib/colors.js';
import { isProduction } from './config.js';
import { runAtSpecificTime } from './lib/run-at-specific-time.js';
import { wait } from './lib/wait.js';
import { parseSetCookieHeader } from './lib/cookie-parser.js';
import { backOff } from './lib/exponential-backoff.js';
import { withRetry } from './lib/retry.js';

const coraline = {
  toNumber: (str: string) => {
    const num = Number(str);
    if (Number.isNaN(num)) throw new Error(`"${str}" is not a valid number.`);
    return num;
  },
  arrayMove: <T>(arr: T[], fromIndex: number, toIndex: number) => {
    const el = arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, ...el);
  },
  getUniqueArray: <T extends Record<K, string>, K extends keyof T>(arr: T[], key: K): T[] => {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  },
  shuffleArray: <T>(array: T[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      // eslint-disable-next-line sonarjs/pseudo-random
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      const val = array.at(j);
      if (!temp || !val) throw new Error('Something went wrong');
      array[i] = val;
      array[j] = temp;
    }
  },
  findDuplicates: <T>(arr: T[]) => {
    const duplicates: T[] = [];
    for (const [index, item] of arr.entries()) {
      if (arr.includes(item, index + 1) && !duplicates.includes(item)) {
        // If the item appears again later in the array and is not already in the duplicates array
        duplicates.push(item);
      }
    }
    return duplicates;
  },
  createPermalink: (text: string) => {
    const perma = text.trim().replaceAll(' ', '_').replaceAll(/\W/g, '').toLowerCase().replaceAll('__', '_').slice(0, 50).trimEnd();
    if (perma.endsWith('_')) {
      // eslint-disable-next-line sonarjs/no-ignored-return
      perma.slice(-1);
    }
    return perma;
  },
  memoryUsage: () => {
    if (isProduction) throw new Error('Do not use coraline.memoryUsage in production as it is used only for debugging purposes.');
    const used = process.memoryUsage().heapUsed;
    const total = process.memoryUsage().heapTotal;
    const percentage = Math.round((used / total) * 10_000) / 100;
    // eslint-disable-next-line no-console
    console.log(`Heap usage: ${percentage.toString()}%`);
    return { heapUsage: percentage };
  },
  isJson: (res: Response) => res.headers.get('Content-Type')?.includes('application/json'),
  runAtSpecificTime,
  parseSetCookieHeader,
  backOff,
  wait,
  withRetry,
  date: coralineDate,
  colors: coralineColors,
};

export default coraline;

export { consoleColor } from './lib/console-color.js';

export { errToString } from './lib/error.js';

export { getEntries, getKeys } from './lib/typed-object.js';

export type { RetryOptions } from './lib/retry.js';

export type { Cookie } from './lib/cookie-parser.js';

export type { ConsoleColor } from './lib/console-color.js';

export type { Callback } from './types/shared.js';

export { default as regex } from './lib/regex.js';