import type { Callback } from '../types/shared.js';
import { wait } from './wait.js';

export const runAtSpecificTime = (hour: number, minute: number, fn: Callback<void>, repeat: boolean) => {
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
      await wait(1 * 60 * 1000);
      runAtSpecificTime(hour, minute, fn, true);
    }
  }, timeUntilFunction);
};
