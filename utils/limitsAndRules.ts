/// Limits that users may or may not bump into:
export const minLengthUsername = 2;
export const minLengthPassword = 6;
export const minPrice = 100;
export const promoCodeMaxLength = 20;
export const promoCodeMinLength = 3;
export const minLengthStoreName = 3;
export const maxLengthStoreName = 60;
export const minLengthStoreBio = 1;
export const maxLengthStoreBio = 200;
export const minStockQuantity = 0;
export const minLengthVariantName = 1;
export const maxLengthVariantName = 250;
export const minLengthVariantDescription = 1;
export const maxLengthVariantDescription = 250;
export const maxCountVariants = 2;
export const minCountFiles = 1;
export const maxCountFiles = 20;
export const minCountPreviews = 1;
export const maxCountPreviews = 8;
export const minCountTags = 0;
export const maxCountTags = 10;
export const minLengthTag = 1;
export const maxLengthTag = 50;
export const minLengthTitle = 1;
export const maxLengthTitle = 50;
export const minLengthProductName = 1;
export const maxLengthProductName = 50;
export const minLengthProductTagline = 1;
export const maxLengthProductTagline = 60;
export const minLengthProductDescription = 1;
export const maxLengthProductDescription = 4000;
export const maxItemsPerOrder = 30;
export const maxPromoCodesPerOrder = 1;
export const maxCountPromotedListItems = 30;
export const maxStockQuantity = 100;
export const maxSizePerFile = 5000 * 1000 * 1000; // 5000 MB
export const maxImageFileSize = 20 * 1000 * 1000; // 20 MB
export const maxPaymentMethods = 10;
export const maxPreviewImages = 10;

/// Unlikely limits (just here to keep the system bounded):

export const maxProductsPerStore = 1000;
export const idMaxLength = 250;
export const promoCodesMaxBulkAdd = 1; //50;
export const searchTermMaxLength = 1000;
export const websiteMaxLength = 2000;
export const maxPrice = 1000001; // $10,000.01
export const minCountVariants = 1;
export const maxLengthListName = 250;

/// ID prefixes:

export const userIdPrefix = "user_";
export const cartIdPrefix = "cart_";
export const cartItemIdPrefix = "citem_";
export const discountIdPrefix = "discount_";
export const orderIdPrefix = "o";
export const orderItemIdPrefix = "oitem_";
export const orderSnapshotIdPrefix = "osnapshot_";
export const productIdPrefix = "p";
export const productSnapshotIdPrefix = "prodsnapshot_";
export const productVariantIdPrefix = "prodvariant_";
export const productVariantSnapshotIdPrefix = "prodvariantsnapshot_";
export const previewItemIdPrefix = "preview_item_";
export const storeIdPrefix = "s";
export const transactionIdPrefix = "txn_";
export const refundIdPrefix = "ref_";
export const productCategoryIdPrefix = "pcategory_";
export const imageIdPrefix = "image_";
export const fileIdPrefix = "form_file_";
export const productListIdPrefix = "prodlist_";
export const productListItemIdPrefix = "prodlistitem_";

// ID prefix regexes:

export const userIdRegex = new RegExp(`^${userIdPrefix}`);
export const cartIdRegex = new RegExp(`^${cartIdPrefix}`);
export const cartItemIdRegex = new RegExp(`^${cartItemIdPrefix}`);
export const discountIdRegex = new RegExp(`^${discountIdPrefix}`);
export const orderIdRegex = new RegExp(`^${orderIdPrefix}`);
export const orderItemIdRegex = new RegExp(`^${orderItemIdPrefix}`);
export const orderSnapshotIdRegex = new RegExp(`^${orderSnapshotIdPrefix}`);
export const productIdRegex = new RegExp(`^${productIdPrefix}`);
export const productSnapshotIdRegex = new RegExp(`^${productSnapshotIdPrefix}`);
export const productVariantIdRegex = new RegExp(`^${productVariantIdPrefix}`);
export const productVariantSnapshotIdRegex = new RegExp(
  `^${productVariantSnapshotIdPrefix}`
);
export const previewItemIdRegex = new RegExp(`^${previewItemIdPrefix}`);
export const storeIdRegex = new RegExp(`^${storeIdPrefix}`);
export const transactionIdRegex = new RegExp(`^${transactionIdPrefix}`);
export const refundIdRegex = new RegExp(`^${refundIdPrefix}`);
export const productCategoryIdRegex = new RegExp(`^${productCategoryIdPrefix}`);
export const imageIdRegex = new RegExp(`^${imageIdPrefix}`);
export const fileIdRegex = new RegExp(`^${fileIdPrefix}`);
export const productListIdRegex = new RegExp(`^${productListIdPrefix}`);
export const productListItemIdRegex = new RegExp(`^${productListItemIdPrefix}`);

// Other based regex rules
export const promoCodeRegex = new RegExp(`^[a-zA-Z0-9-]{${promoCodeMinLength},${promoCodeMaxLength}}$`); // only english alphanumeric and dashes
export const tagRegex = new RegExp(`^[a-zA-Z0-9-]{${minLengthTag},${maxLengthTag}}$`); // only english alphanumeric and dashes