export const filterUnique = <T>(someArray: T[], idProvider: (item: T) => string): T[] => {
  let toReturn: T[] = [];
  const seen = new Map<string, boolean>();
  for (const item of someArray) {
    const id = idProvider(item);
    if (seen.has(id)) {
      continue;
    }
    seen.set(id, true);
    toReturn.push(item);
  }
  return toReturn;
}

// Fisher-Yates algorithm Shuffles array in place.
export const shuffle = (arr) => {

  let j;
  let x;
  let i;

  for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
  }

  return arr;
}

export const roundTo2Decimals = (num: string) => {
  return parseFloat(num).toFixed(2)
}