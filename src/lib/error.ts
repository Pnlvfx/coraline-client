export const errToString = (err: unknown, ...args: string[]) => {
  let error = '';
  if (err instanceof Error) {
    error += err.message;
  }
  if (typeof err === 'string') {
    error += err;
  }
  if (typeof err === 'object' && err !== null && 'description' in err) {
    const des = err.description;
    if (typeof des === 'string') {
      error += des;
    }
  }
  for (const value of args) {
    error += ' ' + value;
  }
  return error || 'API ERROR';
};
