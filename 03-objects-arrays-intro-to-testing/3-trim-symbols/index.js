/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {
    return "";
  }
  if (!size) {
    return string;
  }

  let result = "";
  let lastSymbol = null;
  let counter = 0;

  for (const char of string) {
    if (lastSymbol === char) {
      counter++;
    } else {
      counter = 0;
    }
    if (counter < size) {
      result += char;
    }
    lastSymbol = char;
  }
  return result;
}
