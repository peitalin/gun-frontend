import { DealerState } from "typings/gqlTypes";

export interface SelectOption {
  label: string;
  value: string | any;
}


export const createLicenseCategorySuggestions = (): SelectOption[] => {
  return [
    "Category A",
    "Category B",
    "Category C",
    "Category D",
    "Category E",
    "Category H",
  ].map(c => {
    return {
      label: c,
      value: c,
    }
  })
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
