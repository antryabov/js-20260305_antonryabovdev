/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const splitPath = path.split(".");
  return (obj) => {
    if (!obj) {
      return undefined;
    }

    let result = obj;
    for (const prop of splitPath) {
      if (Object.hasOwn(result, prop)) {
        result = result[prop];
      } else {
        return undefined;
      }
    }

    return result;
  };
}
