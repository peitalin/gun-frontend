import {
  Product,
  ID,
  CartItem,
  Price,
  ProductCategory,
  ProductProductVariantId,
  CartItemPurchasableStatus,
  PriceDetails,
  ProductPreviewItem,
  ProductFile,
  ProductEditInput,
  ProductVariantEditInput,
  VariantsLabel,
  QuantityLabel,
} from "typings/gqlTypes";
import { v4 as uuidv4 } from "uuid";
// import * as uuidv4 from 'uuid/v4';
import { oc as option } from "ts-optchain";



export const fromProductToCartItem = ({
  product,
  chosenVariantId,
  cartId,
}: { product: Product, chosenVariantId: ID, cartId: ID }): CartItem => {
  product.chosenVariant = product.currentVariants.find(variant => variant.variantId === chosenVariantId);
  return {
    id: uuidv4(),
    cartId: cartId,
    userId: "",
    createdAt: new Date(),
    product: product,
    priceDetails: product.chosenVariant.priceDetails,
    purchasableStatus: CartItemPurchasableStatus.AVAILABLE,
    quantity: 1,
    storeId: product.storeId
  }
}

export const toProductProductVariantId = (
  c: CartItem
): ProductProductVariantId => {
  return {
    productId: c.product.id,
    variantId: c.product.chosenVariant.variantId,
    quantity: c.quantity
  }
}

export interface UserDB {
  id: ID;
  email: string;
  emailVerified: boolean;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  stripeCustomerId: string;
  paypalCustomerId: string;
  cartId: ID;
  storeId: ID;
  discounts: string[];
  downloads: ID[];
  isSuspended: boolean;
  isDeleted?: boolean;
  isExcludedFromAutomaticLists?: boolean;
  passwordHash: string;
  referredUsers: ID[];
  subscribedNewsletters: string[];
  userRole: string;
  wishlist: string;
  defaultPaymentMethod: string;
  paymentMethods: string[];
  payoutMethod: string;
}


export const productToProductEditInput = (product: Product): ProductEditInput => {
  if (!product) {
    return {
      productId: "",
      name: "",
      tagline: "",
      categoryId: "",
      description: "",
      currentVariants: [],
      tags: [],
      isPublished: false,
      variantsLabel: VariantsLabel.VARIANT,
      isQuantityEnabled: false,
      quantityLabel: QuantityLabel.QUANTITY
    }
  }
  return {
    productId: product.id,
    name: product.name,
    tagline: product.tagline,
    categoryId: product.category.id,
    description: product.description,
    currentVariants: product.currentVariants.map(variant => {
      return {
        variantId: variant.variantId,
        variantName: variant.variantName,
        variantDescription: variant.variantDescription,
        priceWas: variant.priceWas,
        price: variant.price,
        isDefault: variant.isDefault,
        specialDeal:
          variant.specialDeal
          ? {
              ...variant.specialDeal,
              discountedPrice: variant.specialDeal && variant.specialDeal.discountedPrice,
              stockLimitCondition: variant.specialDeal && variant.specialDeal.stockLimitCondition && {
                quantityAvailable: variant.specialDeal.stockLimitCondition.stockLevel.quantityAvailable,
                supplyExhaustionRule: variant.specialDeal.stockLimitCondition.supplyExhaustionRule
              }
            }
          : null,
        fileIds: variant.files.map(f => f.id),
        previewItems: variant.previewItems.map((p, index) => ({
          // id: p.id,
          // position: index,
          imageId: option(p).image.id(),
          youTubeEmbedLink: p.youTubeEmbedLink,
        })),
        quantityAvailable: variant.baseStockLevel && variant.baseStockLevel.quantityAvailable
      } as ProductVariantEditInput
    }),
    tags: product.tags,
    isPublished: product.isPublished,
    variantsLabel: product.variantsLabel,
    isQuantityEnabled: product.isQuantityEnabled,
    quantityLabel: product.quantityLabel
  };
}
