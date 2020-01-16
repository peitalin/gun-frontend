import { SubtotalDisplay } from "typings";
import currency from "currency.js";
import { PriceDetails, Discount } from "typings/gqlTypes";


export const asCurrency = (s) => currency(s/100, { formatWithSymbol: true }).format()


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


export const findSoonestDiscountExpiry = (
  priceDetails: PriceDetails
): Date | null => {
  // Collect all the expiries of discounts if they're there and have time conditions
  if (!priceDetails || !priceDetails.discountBreakdown) {
    return null;
  }

  let expiries: Date[] = [
    discountExpiry(priceDetails.discountBreakdown.fixedPriceDiscount),
    discountExpiry(priceDetails.discountBreakdown.percentOffDiscount),
    ...priceDetails.discountBreakdown.dollarsOffDiscounts.map(d => discountExpiry(d))
  ].filter(x => x)

  if (expiries.length === 0) {
    return null;
  }
  // Return the one that's soonest
  return expiries.reduce((currentSoonest, thisDate) => {
    return currentSoonest < thisDate ? currentSoonest : thisDate;
  }, expiries[0]);
};

const discountExpiry = (discount: Discount | null): Date | null => {
  if (!discount) {
    return null;
  }
  if (discount.timeCondition) {
    const now = new Date();
    const start = discount.timeCondition.start;
    if (!start || start < now) {
      return discount.timeCondition.end;
    }
  }
  return null;
};


