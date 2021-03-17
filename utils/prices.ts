import { SubtotalDisplay } from "typings";
import currency from "currency.js";


export const asCurrency = (s) => currency(s/100, { formatWithSymbol: false }).format()


export const centsToDollars = (totalCents: any): SubtotalDisplay => {

  if (!parseInt(totalCents)) {
    return {
      subtotalCents: 0,
      subtotalDisplay: "$0.00",
      subtotalPaypal: "0.00",
    }
  }

  let cents = (totalCents % 100 < 10)
    ? `0${totalCents % 100}`
    : `${totalCents % 100}`;
  // prepend a zero if less than 10cents

  // substract remainder cents, then convert to dollars.
  let dollars = (totalCents - (totalCents % 100)) / 100;

  return {
    subtotalCents: totalCents,
    subtotalDisplay: "$" + `${dollars}.${cents}`,
    subtotalPaypal: `${dollars}.${cents}`
  }
}

export const splitPlatformFee = (subtotal: number) => {
  const platformTakeRate = 0.2;
  const affiliateTakeRate = 0;
  return {
    sellerPayment: (1 - platformTakeRate) * subtotal,
    platformFee: platformTakeRate * subtotal,
    affiliateFee: affiliateTakeRate * subtotal,
  }
}




