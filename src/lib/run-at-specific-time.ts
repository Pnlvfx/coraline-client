import type { Callback } from '../types/shared.js';

export const runAtSpecificTime = (hour: number, minute: number, fn: Callback<void>) => {
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(0);

  if (date < new Date()) {
    date.setDate(date.getDate() + 1);
  }

  const timeUntilFunction = date.getTime() - Date.now();
  if (timeUntilFunction < 0) throw new Error('Internal time error.');
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  setTimeout(fn, timeUntilFunction);
};
