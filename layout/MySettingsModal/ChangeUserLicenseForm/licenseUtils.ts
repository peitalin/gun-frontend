
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
    "ACT",
    "NSW",
    "NT",
    "QLD",
    "SA",
    "TAS",
    "VIC",
    "WA",
  ].map(c => {
    return {
      label: c,
      value: c,
    }
  })
}
