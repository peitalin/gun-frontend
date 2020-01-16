import {
  PriceDetails,
  Cart,
  ID,
  Discount,
  Price,
  DiscountModifier,
  DiscountScope,
  CartItem,
  PriceDetailsDiscountBreakdown,
  CartWithoutPricing,
  CartItemPurchasableStatus,
  PaymentProcessor,
  filterUnique
} from "./imports";
import { calculateFeesAndTaxes } from "./feesAndTaxes";
import {
  discountIsApplicableInCart,
  filterDiscountsRelevantToProductVariant
} from "./discounts";

export const MINIMUM_PRODUCT_PRICE = 100;

// Takes a cart and determines which relevant discounts attached to the products within it should be applicable,
// combines with relevant promo codes, then generates pricing for the items and the cart as a whole.
export const calculateCartPrice = (cart: CartWithoutPricing): Cart => {
  // Filter out any items that cannot be purchased for various reasons
  let purchasableCartItems: CartItem[] = [];
  let outputCartItems: CartItem[] = [];
  cart.items.forEach(item => {
    // Determine the purchasability status
    if (
      item.product.isSuspended ||
      !item.product.isPublished ||
      item.product.isDeleted
    ) {
      item.purchasableStatus = CartItemPurchasableStatus.PRODUCT_UNAVAILABLE;
    } else if (!item.product.chosenVariant) {
      item.purchasableStatus = CartItemPurchasableStatus.VARIANT_UNAVAILABLE;
    } else if (item.product.chosenVariant.isSoldOut) {
      item.purchasableStatus = CartItemPurchasableStatus.SOLD_OUT;
    } else if (
      item.product.chosenVariant.currentStockLevel &&
      item.product.chosenVariant.currentStockLevel.quantityAvailable <
        item.quantity
    ) {
      item.purchasableStatus = CartItemPurchasableStatus.QUANTITY_TOO_HIGH;
    } else {
      item.purchasableStatus = CartItemPurchasableStatus.AVAILABLE;
    }

    // Only put it in the bucket for price determination if it's purchasable
    // otherwise it will be sent straight to output so user can see it isn't purchasable
    if (item.purchasableStatus !== CartItemPurchasableStatus.AVAILABLE) {
      outputCartItems.push(item);
    } else {
      purchasableCartItems.push(item);
    }
  });

  // Group these items by the store the product belongs to.
  // Also aggregate the spend per store before any discounts are applied (base prices).
  interface StoreGroup {
    subtotal: Price;
    items: CartItem[];
    totalQuantity: number; // (because some items have quantity > 1, so you can't look at items.length)
  }
  let groupedByStore = new Map<ID, StoreGroup>();
  purchasableCartItems.forEach(item => {
    const itemQuantity = item.quantity;
    const basePrice =
      item.product.chosenVariant.priceDetails.basePrice * itemQuantity;
    let group = groupedByStore.get(item.product.storeId);
    group = {
      subtotal: group ? group.subtotal + basePrice : basePrice,
      items: group ? [...group.items, item] : [item],
      totalQuantity: group ? group.totalQuantity + itemQuantity : itemQuantity
    };
    groupedByStore.set(item.product.storeId, group);
  });

  // Now determine which discounts are applicable at this moment (and considering the current cart).
  let subtotalBeforeDiscounts = 0;
  let totalAutomaticSavings = 0;
  let totalPromoCodeSavings = 0;
  let actualSubtotal = 0;
  groupedByStore.forEach((group, storeId) => {
    group.items.forEach(item => {
      const variant = item.product.chosenVariant;

      // Gather any of the promo codes in the cart that are relevant to this variant
      const alreadyRelevant = variant.relevantDiscounts;
      const relevantPromoCodes = filterDiscountsRelevantToProductVariant(
        variant,
        cart.relevantPromoCodes
      );
      const relevantDiscounts = alreadyRelevant.concat(relevantPromoCodes);

      // Filter out discounts that aren't currently applicable.
      const applicableDiscounts = relevantDiscounts.filter(d =>
        discountIsApplicableInCart(d, group.subtotal, group.totalQuantity)
      );

      // Determine the winning price (process the applicable discounts)
      const details = calculatePriceDetails(
        variant.priceDetails.basePrice,
        applicableDiscounts,
        item.quantity
      );
      item.priceDetails = details;
      subtotalBeforeDiscounts += details.basePrice;
      actualSubtotal += details.actualPrice;
      const savings = details.basePrice - details.actualPrice;
      if (details.discountBreakdown) {
        totalPromoCodeSavings += details.discountBreakdown.promoCodeComponent;
        totalAutomaticSavings +=
          savings - details.discountBreakdown.promoCodeComponent;
      }
      outputCartItems.push(item);
    });
  });

  // Sort the output cart items to match up with how they came in
  outputCartItems.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // Calculate the total with any fees and taxes
  // TODO: Consider rounding various numbers for niceness? (and make sure excess goes to platform share)
  const gstApplies = false;
  let { total, taxes, paymentFee } = calculateFeesAndTaxes(
    PaymentProcessor.STRIPE
  )(actualSubtotal, gstApplies);

  // Return a modified cart
  // TODO: store the subtotal before discounts? I was going to replace "subtotal" with it but it may create confusion
  //       and break other things. Frontend can instead do own calculation to disply the before discount subtotal.
  return {
    ...cart,
    items: outputCartItems,
    subtotal: actualSubtotal,
    automaticSavings: totalAutomaticSavings,
    promoCodeSavings: totalPromoCodeSavings,
    paymentProcessingFee: paymentFee,
    taxes: taxes,
    total: total
  };
};

export const automaticSavingsFromPriceDetails = (
  details: PriceDetails
): Price => {
  if (details.discountBreakdown) {
    const savings = details.basePrice - details.actualPrice;
    return savings - details.discountBreakdown.promoCodeComponent;
  } else {
    return 0;
  }
};

export const promoCodeSavingsFromPriceDetails = (
  details: PriceDetails
): Price => {
  if (details.discountBreakdown) {
    return details.discountBreakdown.promoCodeComponent;
  } else {
    return 0;
  }
};

// Determine discounted pricing and breakdown information from a given competing set of applicable discounts
export function calculatePriceDetails(
  baseAmount: Price,
  applicableDiscounts: Discount[],
  quantity: number
): PriceDetails {
  if (baseAmount === undefined || baseAmount === null) {
    throw Error("Base price cannot be undefined or null!");
  }
  if (baseAmount < 0) {
    throw Error("Base price cannot be negative");
  }

  let discountedAmount = baseAmount;
  let promoCodeContributions = 0;

  // Make sure that applicableDiscounts only contains unique discounts (likely already the case, but just to be sure)
  applicableDiscounts = filterUnique(applicableDiscounts, d => d.id);

  // Find out if there is a fixed price adjustment to use as a new base (whatever makes the price the cheapest)
  let fixedPriceComponent = 0;
  const fixedPriceDiscount = findBestFixedPriceDiscount(applicableDiscounts);
  if (
    fixedPriceDiscount &&
    fixedPriceDiscount.valueFixed &&
    fixedPriceDiscount.valueFixed < baseAmount
  ) {
    discountedAmount = Math.max(0, fixedPriceDiscount.valueFixed); // Negative price prevention check
    fixedPriceComponent = baseAmount - discountedAmount;

    // Record this contribution if it was a promo code
    if (!fixedPriceDiscount.isAutomatic) {
      promoCodeContributions += fixedPriceComponent;
    }
  }

  // Add up any $ off amounts
  const dollarsOffDiscounts = applicableDiscounts.filter(
    d => d.modifier == DiscountModifier.DOLLARS_OFF
  );
  let dollarsOffComponent = 0;
  dollarsOffDiscounts.forEach(discount => {
    dollarsOffComponent += discount.valueDollarsOff;

    // Record this contribution if it was a promo code
    if (!discount.isAutomatic) {
      promoCodeContributions += discount.valueDollarsOff;
    }
  });
  dollarsOffComponent = Math.max(0, dollarsOffComponent); // Make sure the discount can only bring the price DOWN
  dollarsOffComponent = Math.min(discountedAmount, dollarsOffComponent); // Negative price prevention check
  discountedAmount -= dollarsOffComponent;

  // Find out if there's a % off to use (the largest one)
  let percentOffComponent = 0;
  const percentOffDiscount = findBestPercentOffDiscount(applicableDiscounts);
  if (percentOffDiscount && percentOffDiscount.valuePercentageOff) {
    percentOffComponent = Math.round(
      percentOffDiscount.valuePercentageOff * discountedAmount
    ); // (no fractional cents)
    percentOffComponent = Math.min(discountedAmount, percentOffComponent); // Negative price prevention check (eg 110% off)
    discountedAmount -= percentOffComponent;

    // Record this contribution if it was a promo code
    if (!percentOffDiscount.isAutomatic) {
      promoCodeContributions += percentOffComponent;
    }
  }

  // Account for quantity by simply multiplying everything up
  // NOTE: This gives the total amount for N of the item that are all getting the same deal, and gives the total dollar value savings broken up by modifier
  baseAmount *= quantity;
  discountedAmount *= quantity;
  fixedPriceComponent *= quantity;
  dollarsOffComponent *= quantity;
  percentOffComponent *= quantity;
  promoCodeContributions *= quantity;

  // Return a new price and the breakdown that explains it
  let discountBreakdown: PriceDetailsDiscountBreakdown | null = null;
  if (discountedAmount !== baseAmount) {
    discountBreakdown = {
      fixedPriceDiscount: fixedPriceDiscount,
      dollarsOffDiscounts: dollarsOffDiscounts,
      percentOffDiscount: percentOffDiscount,
      fixedPriceComponent: fixedPriceComponent,
      dollarsOffComponent: dollarsOffComponent,
      percentOffComponent: percentOffComponent,
      promoCodeComponent: promoCodeContributions
    };
  }
  return {
    basePrice: baseAmount,
    actualPrice: discountedAmount,
    discountBreakdown: discountBreakdown
  };
}

export const findBestFixedPriceDiscount = (
  discounts: Discount[]
): Discount | null => {
  // NOTE: The best fixed discount is the one with the lowest value
  // (because it is the fixed price, not a value to take away)
  let bestDiscount = null;
  discounts.forEach(discount => {
    if (
      discount.modifier !== DiscountModifier.FIXED_PRICE ||
      !discount.valueFixed
    ) {
      return;
    }
    if (!bestDiscount) {
      bestDiscount = discount;
      return;
    }
    if (discount.valueFixed < bestDiscount.valueFixed) {
      bestDiscount = discount;
    }
  });
  return bestDiscount;
};

export const findBestPercentOffDiscount = (
  discounts: Discount[]
): Discount | null => {
  // The best discount is always the largest %, however if there is a tie between a platform scoped
  // discount and something else, we'll want to avoid using the platform discount.
  let bestDiscount = null;
  discounts.forEach(discount => {
    if (
      discount.modifier !== DiscountModifier.PERCENTAGE_OFF ||
      !discount.valuePercentageOff
    ) {
      return;
    }
    if (!bestDiscount) {
      bestDiscount = discount;
      return;
    }
    const discountIsBigger =
      discount.valuePercentageOff > bestDiscount.valuePercentageOff;
    const discountIsEqual =
      discount.valuePercentageOff === bestDiscount.valuePercentageOff;
    if (
      discountIsBigger ||
      (discountIsEqual && discount.scope !== DiscountScope.PLATFORM)
    ) {
      bestDiscount = discount;
    }
  });
  return bestDiscount;
};

// Given a set of promo code discounts, return the one that results in the cheapest overall cart price.
export const findBestPromoCodeForCart = (
  cart: CartWithoutPricing,
  relevantDiscounts: Discount[]
): Discount | null => {
  // Handle base cases
  relevantDiscounts = relevantDiscounts.filter(d => !d.isAutomatic);
  if (relevantDiscounts.length === 0) {
    return null;
  } else if (relevantDiscounts.length === 1) {
    return relevantDiscounts[0];
  }

  // Find the "best" one using brute force price testing
  let bestDiscount: Discount | null = null;
  let bestPrice: Price | null = null;
  relevantDiscounts.forEach(thisDiscount => {
    const updated: CartWithoutPricing = {
      ...cart,
      relevantPromoCodes: [thisDiscount]
    };
    const pricing = calculateCartPrice(updated);
    const priceIsEqual = !bestPrice || pricing.total === bestPrice;
    const priceIsBetter = !bestPrice || pricing.total < bestPrice;
    if (priceIsBetter) {
      bestPrice = pricing.total;
      bestDiscount = thisDiscount;
    } else if (priceIsEqual) {
      // Take this discount if the current best one is a platform discount and this one isn't (saves us money)
      if (
        bestDiscount.scope === DiscountScope.PLATFORM &&
        thisDiscount.scope !== DiscountScope.PLATFORM
      ) {
        bestPrice = pricing.total;
        bestDiscount = thisDiscount;
      }
    }
  });
  return bestDiscount;
};

export const roundUpToNearestFive = (amount: number): number => {
  return roundUpToNearestMultipleOf(5)(amount);
};
export const roundUpToNearestMultipleOf = (m: number) => (n: number) =>
  Math.ceil(n / m) * m;

// Creates a blank price details object using just the provided basePrice
export const basePriceDetailsFactory = (basePrice: Price): PriceDetails => {
  return {
    basePrice: basePrice,
    actualPrice: basePrice,
    discountBreakdown: null
  };
};
