import { SoldOutStatus } from "typings/gqlTypes";


export const sortAlphabetical = (list: any[]) => {
  return list.sort((a, b) => compareAlphabetical(a, b))
}

export const compareAlphabetical = (a: string, b: string) => {
  return a.localeCompare(b)
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
      return "Pending Sale"
    }
    case SoldOutStatus.SOLD_OUT: {
      return "Sold Out"
    }
  }
}
