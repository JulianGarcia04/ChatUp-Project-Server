import type { TypeChecking } from '../interfaces';

function isNull<T>(obj: T, exempt: string[] = []): TypeChecking {
  if (typeof obj !== 'object') {
    return { success: true };
  }
  for (const key in obj) {
    if (!Object.hasOwn(obj, key)) {
      return { success: false, key };
    }
    const value = obj[key];

    if (exempt.includes(key)) {
      continue;
    }

    if (value == null) {
      return { success: false, key };
    }

    continue;
  }
  return { success: true };
}
export default isNull;
