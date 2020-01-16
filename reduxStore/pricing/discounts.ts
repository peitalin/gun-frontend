import {
  ProductVariant,
  Discount,
  DiscountScope,
  Price,
  Product,
  ID
} from "./imports";
import { calculatePriceDetails } from "./priceCalculator";
import {
  productVariantIsCurrentlySoldOut,
  determineCurrentStockLevel
} from "./stockLevels";

export const MAX_PLATFORM_DISCOUNT = 0.2;

export const platformDiscountIsRelevantToProductVariant = (
  discount: Discount,
  variant: ProductVariant
): boolean => {
  // Sanity check
  const scopeInfo = discount.platformScopeInfo;
  if (discount.scope !== DiscountScope.PLATFORM || !scopeInfo) {
    return false;
  }

  // NOTE: In future there may be category conditions or other filters to control applicability
  return scopeInfo.isApplicableToAnyProduct;
};

export const storeDiscountIsRelevantToProductVariant = (
  discount: Discount,
  variant: ProductVariant
): boolean => {
  // Sanity check
  const scopeInfo = discount.storeScopeInfo;
  if (discount.scope !== DiscountScope.STORE || !scopeInfo) {
    return false;
  }

  // Store discounts can target anything within the store or specific items
  if (scopeInfo.variantId) {
    return scopeInfo.variantId === variant.variantId;
  } else if (scopeInfo.productId) {
    return scopeInfo.productId === variant.productId;
  } else {
    return scopeInfo.storeId === variant.storeId;
  }
};

export const productDiscountIsRelevantToProductVariant = (
  discount: Discount,
  variant: ProductVariant
): boolean => {
  // Sanity check
  const scopeInfo = discount.productScopeInfo;
  if (discount.scope !== DiscountScope.PRODUCT || !scopeInfo) {
    return false;
  }

  // Product discounts have to match the variant snapshot specifically
  return scopeInfo.variantSnapshotId === variant.variantSnapshotId;
};

// Returns any product owned discounts on the variant in an array form
export const extractProductOwnedDiscounts = (
  variant: ProductVariant
): Discount[] => {
  let toReturn: Discount[] = [];
  if (variant.permanentDiscountedPriceDiscount) {
    toReturn.push(variant.permanentDiscountedPriceDiscount);
  }
  if (variant.specialDealDiscount) {
    toReturn.push(variant.specialDealDiscount);
  }
  return toReturn;
};

/*
 * Returns a subset of the provided discounts that are relevant to the provided product variant.
 *
 * This is intended for use when you've already gathered a set of STORE or PLATFORM scoped discounts that
 * are relevant to one or more product variants (eg a cart or a list of recommended products) and you
 * need to sort out which ones are actually about a specific product variant. This will also look at PRODUCT
 * scoped discounts but you probably already know whether it is relevant.
 *
 * @param variant The variant to consider.
 * @param discounts The set of discounts that may or may not be relevant to the variant.
 */
export const filterDiscountsRelevantToProductVariant = (
  variant: ProductVariant,
  discounts: Discount[]
): Discount[] => {
  // Define helper that determines relevancy for a single discount
  const isRelevant = (d: Discount): boolean => {
    if (d.scope === DiscountScope.PLATFORM) {
      return platformDiscountIsRelevantToProductVariant(d, variant);
    } else if (d.scope === DiscountScope.STORE) {
      return storeDiscountIsRelevantToProductVariant(d, variant);
    } else if (d.scope === DiscountScope.PRODUCT) {
      return productDiscountIsRelevantToProductVariant(d, variant);
    } else {
      return false;
    }
  };

  // Iterate through the discounts to consider, only adding it to our set
  // if it is both unique and relevant.
  let toReturn: Discount[] = [];
  const seen = new Map<ID, boolean>();
  for (const discount of discounts) {
    // Unique check
    if (seen.has(discount.id)) {
      continue;
    }

    // Relevance check
    seen.set(discount.id, true);
    if (isRelevant(discount)) {
      toReturn.push(discount);
    }
  }
  return toReturn;
};

// Returns true if a discount should currently apply, based on criteria that is independent of cart/product conditions.
export const discountIsApplicableInIsolation = (
  discount: Discount
): boolean => {
  // Discount may simply be disabled by whoever owns it
  if (discount.isDisabled) {
    return false;
  }

  // Sanity check against empty discounts
  if (
    discount.valueFixed === 0 ||
    discount.valueDollarsOff === 0 ||
    discount.valuePercentageOff === 0
  ) {
    return false;
  }

  // Prevent platform discounts that violate the value limit
  if (
    discount.scope === DiscountScope.PLATFORM &&
    discount.valuePercentageOff > MAX_PLATFORM_DISCOUNT
  ) {
    return false;
  }

  // Discount may only be applicable within a certain time range
  if (discount.timeCondition) {
    const now = new Date().getTime();

    // Detect when it hasn't started yet
    if (
      discount.timeCondition.start &&
      new Date(discount.timeCondition.start).getTime() > now
    ) {
      return false;
    }

    // Detect when it has expired
    const hasExpired = now > new Date(discount.timeCondition.end).getTime();
    if (hasExpired) {
      return false;
    }
  }

  // Discount may only be applicable up to a certain number of sales (stock limit)
  if (
    discount.productScopeInfo &&
    discount.productScopeInfo.stockLimitCondition
  ) {
    const hasDepleted =
      discount.productScopeInfo.stockLimitCondition.stockLevel
        .quantityAvailable < 1;
    if (hasDepleted) {
      return false;
    }
  }

  return true;
};

// Returns true if a discount should currently apply, taking into account information about the cart context.
export const discountIsApplicableInCart = (
  discount: Discount,
  storeSpend: Price,
  storeQuantity: number
): boolean => {
  // Check the isolated case first
  if (!discountIsApplicableInIsolation(discount)) {
    return false;
  }

  // Extra conditions only apply to store scoped discounts with special rules
  if (discount.scope === DiscountScope.STORE) {
    if (storeSpend < discount.storeScopeInfo.minimumSpend) {
      return false; // Not spending enough
    }
    if (storeQuantity < discount.storeScopeInfo.minimumQuantity) {
      return false; // Not buying enough items from the store
    }
  }
  return true;
};

// Accumulates discounts that are relevant to each variant on a set of products, and uses them to produce priceDetails.
// This returns a new set of Products that has relevantDiscounts and priceDetails filled out.
export const attachRelevantDiscountsAndCalculateCurrentPricing = async (
  products: Product[],
  relevantAutomaticPlatformDiscountProvider: (
    productIds: ID[],
    variantIds: ID[],
    storeIds: ID[]
  ) => Promise<Discount[]>,
  relevantAutomaticStoreDiscountProvider: (
    productIds: ID[],
    variantIds: ID[],
    storeIds: ID[]
  ) => Promise<Discount[]>
): Promise<Product[]> => {
  // Collect automatic non-product-owned discounts that are relevant to one or more products in the set.
  let variantIds: ID[] = [];
  let uniqueProductIds: Set<ID> = new Set();
  let uniqueStoreIds: Set<ID> = new Set();
  products.forEach(product => {
    variantIds.push(...product.currentVariants.map(v => v.variantId));
    uniqueProductIds.add(product.id);
    uniqueStoreIds.add(product.storeId);
  });
  const productIds = Array.from(uniqueProductIds);
  const storeIds = Array.from(uniqueStoreIds);
  const relevantAutomaticPlatformDiscounts = await relevantAutomaticPlatformDiscountProvider(
    productIds,
    variantIds,
    storeIds
  );
  const relevantAutomaticStoreDiscounts = await relevantAutomaticStoreDiscountProvider(
    productIds,
    variantIds,
    storeIds
  );
  const allExternalDiscounts = relevantAutomaticPlatformDiscounts.concat(
    relevantAutomaticStoreDiscounts
  );

  // Filter out any that aren't currently applicable (eg they may have expired)
  const externalDiscounts = allExternalDiscounts.filter(d =>
    discountIsApplicableInIsolation(d)
  );

  // Process each variant
  return products.map(product => {
    const variants = product.currentVariants.map(variant => {
      // Build out the set of relevant discounts for this variant, from all scopes
      const productOwned = extractProductOwnedDiscounts(variant);
      const relevantExternal = filterDiscountsRelevantToProductVariant(
        variant,
        externalDiscounts
      );
      const relevantDiscounts = productOwned.concat(relevantExternal);

      // Now filter any that aren't currently applicable.
      // The result is a set of discounts that are applicable to the price calculation.
      const applicableDiscounts = relevantDiscounts.filter(d =>
        discountIsApplicableInIsolation(d)
      );

      // Find out if the variant should be marked as sold out
      // (depending on main stock level and/or product-owned special deal)
      const isSoldOut = productVariantIsCurrentlySoldOut(variant);

      // Find out what the current stock level should be for the current price offering
      const currentStockLevel = determineCurrentStockLevel(
        variant.baseStockLevel,
        variant.specialDealDiscount
      );

      // Use that set to calculate the price info for the variant.
      const quantity = 1;
      return {
        ...variant,
        relevantDiscounts: relevantDiscounts,
        priceDetails: calculatePriceDetails(
          variant.priceDetails.basePrice,
          applicableDiscounts,
          quantity
        ),
        isSoldOut: isSoldOut,
        stockLevel: currentStockLevel
      };
    });
    return {
      ...product,
      currentVariants: variants,
      featuredVariant: variants.find(
        v => v.variantSnapshotId === product.featuredVariant.variantSnapshotId
      ),
      chosenVariant:
        product.chosenVariant &&
        variants.find(
          v => v.variantSnapshotId === product.chosenVariant.variantSnapshotId
        )
    };
  });
};
