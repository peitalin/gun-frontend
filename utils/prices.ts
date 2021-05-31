import currency from "currency.js";


export const asCurrency = (s) =>  {
  if (!s) {
    return "$0.00"
  }
  return currency(s/100, { formatWithSymbol: true }).format()
}


