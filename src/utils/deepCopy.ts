export function deepCopy<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) return obj;

  const copy: any = Array.isArray(obj) ? [] : {};

  Object.entries(obj).forEach(([key, value]) => {
    copy[key] = deepCopy(value);
  });

  Object.setPrototypeOf(copy, Object.getPrototypeOf(obj));

  return copy;
}
