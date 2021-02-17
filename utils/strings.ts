import { SoldOutStatus } from "typings/gqlTypes";

export const toCamelCase = (s: string): string => {
  return s.replace(/(\_\w)/g, (w) => w[1].toUpperCase())
}

export const objectToCamelCase = <T>(row: T): T => {
  // Mutates keys to camelCase keys
  Object.keys(row).map(key => {
    let camelKey = toCamelCase(key);
    if (camelKey !== key) {
      row[camelKey] = row[key];
      delete row[key];
    }
  });
  return row;
}

export const rowsToCamelCase = <T>(rows: T[]): T[] => {
  // Renames all keys in an array of objects as camelCase
  return rows.map(row => objectToCamelCase(row));
}

export const setEquals = <T>(set1: Set<T>, set2: Set<T>): boolean => {
  if (set1.size !== set2.size) {
    return false
  }
  for (var a of set1) {
    if (!set2.has(a)) {
      return false;
    }
  }
  return true
}


export const trimTitle = (title: string, maxLength?: number) => {
  if (!title) {
    return ""
  }
  const mlength = maxLength || 48;
  return title.length > mlength
    ? title.slice(0, mlength) + '...'
    : title
}


export const convertSoldOutStatus = (s: string) => {
  switch (s) {
    case SoldOutStatus.ABANDONED: {
      return "Abandoned"
    }
    case SoldOutStatus.AVAILABLE: {
      return "Available"
    }
    case SoldOutStatus.RESERVED: {
      return "Reserved"
    }
    case SoldOutStatus.SOLD_OUT: {
      return "Sold Out"
    }
  }
}
