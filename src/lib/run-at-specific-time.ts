import type { Callback } from '../types/shared.js';

export const runAtSpecificTime = (hour: number, minute: number, fn: Callback<void>) => {
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(0);

  if (date < new Date()) throw new Error('This time is already gone.');

  const timeUntilFunction = date.getTime() - Date.now();
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  setTimeout(fn, timeUntilFunction);
};
