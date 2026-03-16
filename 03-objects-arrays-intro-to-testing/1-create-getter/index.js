/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  return (obj) => {
    if (!Object.entries(obj).length) {
      return undefined;
    }

    const splitPath = path.split(".");
    // let nestedProperty = obj[splitPath.pop()];
    // while (splitPath.length !== 0) {
    //   nestedProperty = nestedProperty[splitPath.pop()];
    // }
    let nestedProperty = obj;
    for (const prop of splitPath) {
      nestedProperty = nestedProperty[prop];
    }

    return nestedProperty;
  };
}
