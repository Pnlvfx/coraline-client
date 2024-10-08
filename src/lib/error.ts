export const errToString = (err: unknown, ...args: string[]) => {
  let error = '';
  if (err instanceof Error) {
    error += err.message;
  } else if (typeof err === 'string') {
    error += err;
  } else if (typeof err === 'object' && err !== null && 'description' in err) {
    const des = err.description;
    if (typeof des === 'string') {
      error += des;
    }
  } else {
    try {
      error = `UNHANDLED API ERROR: ${JSON.stringify(err)}`;
    } catch {
      error = 'UNHANDLED API ERROR';
    }
  }

  for (const value of args) {
    error += ' ' + value;
  }

  return error;
};
