/**
 * Leaflet options may declare a `[key: string]: unknown` index signature, which makes
 * `Omit` (used by React's `PropsWithoutRef`) drop all known keys.
 */
export type WithoutIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : K]: T[K]
}
