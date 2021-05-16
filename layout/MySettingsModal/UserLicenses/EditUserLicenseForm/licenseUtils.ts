import { DealerState, User_Licenses } from "typings/gqlTypes";

export interface SelectOption {
  label: string;
  value: string | any;
}


export const createLicenseCategorySuggestions = (
  dealerState: DealerState | string
): SelectOption[] => {
  switch (dealerState) {
    case DealerState.QLD: {
      return [
        "A",
        "B",
        "C",
        "D",
        "H",
        "M", // QLD
      ].map(c => ({ label: c, value: c }))
    }
    case DealerState.VIC: {
      return [
        "A",
        "B",
        "C",
        "D",
        "H",
        "E", // VIC & WA
      ].map(c => ({ label: c, value: c }))
    }
    case DealerState.WA: {
      return [
        "A",
        "B",
        "C",
        "D",
        "H",
        "E", // VIC & WA
      ].map(c => ({ label: c, value: c }))
    }
    case DealerState.WA: {
      return [
        "A",
        "B",
        "C",
        "D",
        "H",
        "E", // VIC & WA
      ].map(c => ({ label: c, value: c }))
    }
    default: {
      return [
        "A",
        "B",
        "C",
        "D",
        "H",
      ].map(c => ({ label: c, value: c }))
    }
  }
}

export const createLicenseStateSuggestions = (): SelectOption[] => {
  return [
    DealerState.ACT,
    DealerState.NSW,
    DealerState.NT,
    DealerState.QLD,
    DealerState.SA,
    DealerState.TAS,
    DealerState.VIC,
    DealerState.WA,
  ].map(c => {
    return {
      label: c,
      value: c,
    }
  })
}
