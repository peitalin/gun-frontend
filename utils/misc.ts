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