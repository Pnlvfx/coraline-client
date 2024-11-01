export type Callback<T> = (() => Promise<T>) | (() => T);

export type OneOf<T, K extends keyof T = keyof T> = K extends keyof T ? { [P in K]: T[P] } & Record<Exclude<keyof T, K>, never> : never;
