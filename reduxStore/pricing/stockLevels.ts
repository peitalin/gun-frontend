import {
  ProductVariant,
  DiscountUnavailableRule,
  StockLevel,
  Discount
} from "./imports";

// Find out if a particular product variant is currently sold out due to a stock limit discount
export const productVariantIsCurrentlySoldOut = (
  variant: ProductVariant
): boolean => {
  // Consider a main stock level limit first
  if (variant.baseStockLevel && variant.baseStockLevel.quantityAvailable < 1) {
    return true;
  }

  // If there's no active special deal it definitely isn't sold out
  const specialDeal = variant.specialDealDiscount;
  if (!specialDeal || specialDeal.isDisabled) {
    return false;
  }

  // Stock bound discounts may sell out after exhaustion
  if (
    specialDeal.productScopeInfo &&
    specialDeal.productScopeInfo.stockLimitCondition &&
    specialDeal.productScopeInfo.stockLimitCondition.supplyExhaustionRule ===
      DiscountUnavailableRule.MARK_AS_SOLD_OUT &&
    specialDeal.productScopeInfo.stockLimitCondition.stockLevel
      .quantityAvailable < 1
  ) {
    return true;
  }

  // Time bound discounts may sell out after expiry
  if (
    specialDeal.timeCondition &&
    specialDeal.timeCondition.timeExpiryRule ===
      DiscountUnavailableRule.MARK_AS_SOLD_OUT
  ) {
    const now = new Date().getTime();
    const hasExpired = now > new Date(specialDeal.timeCondition.end).getTime();
    if (hasExpired) {
      return true;
    }
  }

  // Otherwise it's availabe
  return false;
};

/// Figures out what the stock level should be for the currently offered price, if applicable.
export const determineCurrentStockLevel = (
  baseStockLevel: StockLevel | null,
  specialDealDiscount: Discount | null
): StockLevel | null => {
  // If there's a special deal it may take precedence
  if (
    specialDealDiscount &&
    !specialDealDiscount.isDisabled &&
    specialDealDiscount.productScopeInfo &&
    specialDealDiscount.productScopeInfo.stockLimitCondition
  ) {
    const specialDealStockCondition =
      specialDealDiscount.productScopeInfo.stockLimitCondition;

    // If there's a time condition it will only prevent the applicable stock level from being
    // the special deal if it has expired and becomes disabled (rather than sold out)
    if (
      specialDealDiscount.timeCondition &&
      specialDealDiscount.timeCondition.timeExpiryRule ===
        DiscountUnavailableRule.DISABLE_DISCOUNT
    ) {
      const now = new Date().getTime();
      const hasExpired =
        now > new Date(specialDealDiscount.timeCondition.end).getTime();
      if (hasExpired) {
        return baseStockLevel; // (the special deal's stock level isn't applicable)
      }
    }

    // If the stock is exhausted and the rule is to disable the discount instead of becoming sold out,
    // then it should fall back to whatever the main stock level is
    if (
      specialDealStockCondition.stockLevel.quantityAvailable < 1 &&
      specialDealStockCondition.supplyExhaustionRule ===
        DiscountUnavailableRule.DISABLE_DISCOUNT
    ) {
      return baseStockLevel;
    }

    // Special deal's level is applicable
    return specialDealStockCondition.stockLevel;
  }

  // Fallback to the main stock level (if applicable)
  return baseStockLevel;
};
