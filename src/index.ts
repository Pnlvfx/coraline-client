import type { Callback } from './types/shared.js';
import regex from './lib/regex.js';
import coralineDate from './lib/date.js';
import coralineColors from './lib/colors.js';
import { wait } from './lib/wait.js';
import { isProduction } from './config.js';

const coraline = {
  arrayMove: (arr: [], fromIndex: number, toIndex: number) => {
    const element = arr.at(fromIndex);
    if (!element) throw new Error('Invalid values provided');
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  },
  getRandomInt: (max: number) => {
    return Math.floor(Math.random() * max);
  },
  year: (options?: { min?: number; max?: number }) => {
    const min = options?.min || 0;
    const max = options?.max || new Date().getFullYear();
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getUniqueArray: <T extends Record<K, string>, K extends keyof T>(arr: T[], key: K): T[] => {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  },
  shuffleArray: <T>(array: T[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      const newVal = array.at(j);
      if (!temp || !newVal) throw new Error('Something went wrong');
      array[i] = newVal;
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
      perma.slice(-1);
    }
    return perma;
  },
  runAtSpecificTime: (hour: number, minute: number, fn: Callback<void>, repeat: boolean) => {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(0);

    if (date < new Date()) {
      if (repeat) {
        date.setDate(date.getDate() + 1);
      } else {
        return;
      }
    }

    const timeUntilFunction = date.getTime() - Date.now();
    setTimeout(async () => {
      await fn();
      if (repeat) {
        await coraline.wait(1 * 60 * 1000);
        coraline.runAtSpecificTime(hour, minute, fn, true);
      }
    }, timeUntilFunction);
  },
  performanceEnd: (start: number, api: string) => {
    if (isProduction) throw new Error('Do not use coraline.performanceEnd in production as it is used only for debugging purposes.');
    const end = performance.now();
    const time = `Api: ${api} took ${end - start} milliseconds`;
    // eslint-disable-next-line no-console
    return console.log(time);
  },
  memoryUsage: () => {
    if (isProduction) throw new Error('Do not use coraline.memoryUsage in production as it is used only for debugging purposes.');
    const used = process.memoryUsage().heapUsed;
    const total = process.memoryUsage().heapTotal;
    const percentage = Math.round((used / total) * 10_000) / 100;
    // eslint-disable-next-line no-console
    console.log(`Heap usage: ${percentage}%`);
    return { heapUsage: percentage };
  },
  isJson: (res: Response) => res.headers.get('Content-Type')?.includes('application/json'),
  wait,
  date: coralineDate,
  regex,
  colors: coralineColors,
};

export default coraline;

export { consoleColor } from './lib/console-color.js';
export { errToString } from './lib/error.js';
export const TG_GROUP_LOG = Number('-914836534');

export { withRetry, type RetryOptions } from './lib/retry.js';

export { backOff } from './lib/exponential-backoff.js';

export { parseSetCookieHeader } from './lib/cookie-parser.js';

export type { Cookie } from './lib/cookie-parser.js';

export type { ConsoleColor } from './lib/console-color.js';

export type { Callback } from './types/shared.js';

export { default as regex } from './lib/regex.js';
