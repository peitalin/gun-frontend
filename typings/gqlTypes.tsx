import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: Date,
  ProductCategoryGroup: any,
  PageCursor: any,
  Price: number,
};

export type AddRemovePaymentMethodResponse = {
   __typename?: 'AddRemovePaymentMethodResponse',
  user: UserPrivate,
};

export type AdminInsight = {
   __typename?: 'AdminInsight',
  name: Scalars['String'],
  value: Scalars['String'],
};

export type ApprovePayoutsResult = {
   __typename?: 'ApprovePayoutsResult',
  approvedPayouts?: Maybe<Array<Maybe<Payout>>>,
  payoutsAlreadyApprovedIds?: Maybe<Array<Maybe<Scalars['ID']>>>,
  payoutsAlreadyApproved?: Maybe<Array<Maybe<Payout>>>,
};

export type BlankMutationResponse = {
   __typename?: 'BlankMutationResponse',
  success: Scalars['Boolean'],
};

export type Cart = {
   __typename?: 'Cart',
  id: Scalars['ID'],
  userId: Scalars['ID'],
  updatedAt: Scalars['Date'],
  items: Array<CartItem>,
  relevantPromoCodes: Array<Discount>,
  subtotal: Scalars['Price'],
  automaticSavings: Scalars['Price'],
  promoCodeSavings: Scalars['Price'],
  taxes: Scalars['Price'],
  paymentProcessingFee: Scalars['Price'],
  total: Scalars['Price'],
};

export type CartItem = {
   __typename?: 'CartItem',
  id: Scalars['ID'],
  cartId: Scalars['ID'],
  userId: Scalars['ID'],
  storeId: Scalars['ID'],
  createdAt: Scalars['Date'],
  product: Product,
  priceDetails: PriceDetails,
  purchasableStatus: CartItemPurchasableStatus,
  quantity: Scalars['Int'],
};

export enum CartItemPurchasableStatus {
  AVAILABLE = 'AVAILABLE',
  QUANTITY_TOO_HIGH = 'QUANTITY_TOO_HIGH',
  SOLD_OUT = 'SOLD_OUT',
  VARIANT_UNAVAILABLE = 'VARIANT_UNAVAILABLE',
  PRODUCT_UNAVAILABLE = 'PRODUCT_UNAVAILABLE'
}

export type CartMutationResponse = {
   __typename?: 'CartMutationResponse',
  cart: Cart,
};

export type Connection = {
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
};

export type ConnectionQuery = {
  sortAscending?: Maybe<Scalars['Boolean']>,
  cursor?: Maybe<Scalars['PageCursor']>,
  pageBackwards?: Maybe<Scalars['Boolean']>,
  count?: Maybe<Scalars['Int']>,
};

export type ConnectionWithMetrics = {
  totalCount?: Maybe<Scalars['Int']>,
  totalAmount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
};

export type CreatePlatformDiscountInput = {
  promoCode?: Maybe<Scalars['String']>,
  valuePercentageOff: Scalars['Float'],
  start?: Maybe<Scalars['Date']>,
  end?: Maybe<Scalars['Date']>,
  isDisabled: Scalars['Boolean'],
};

export type CreateRefundInput = {
  orderId: Scalars['ID'],
  refundOrderItems: Array<Maybe<RefundOrderItem>>,
  chargeId: Scalars['ID'],
  taxes?: Maybe<Scalars['Int']>,
  paymentProcessingFee?: Maybe<Scalars['Int']>,
  reason?: Maybe<Scalars['String']>,
  reasonDetail?: Maybe<Scalars['String']>,
  paymentIntentId?: Maybe<Scalars['ID']>,
  paypalInvoiceNumber?: Maybe<Scalars['ID']>,
  paymentProcessor?: Maybe<PaymentProcessor>,
};

export type CreateRefundMutationResponse = {
   __typename?: 'CreateRefundMutationResponse',
  transaction: Transaction,
};

export type CreateStorePromoCodeInput = {
  promoCode: Scalars['String'],
  valuePercentageOff?: Maybe<Scalars['Float']>,
  valueDollarsOff?: Maybe<Scalars['Price']>,
  specificProductId?: Maybe<Scalars['ID']>,
  specificProductVariantId?: Maybe<Scalars['ID']>,
  minimumPurchaseAmount?: Maybe<Scalars['Price']>,
  minimumQuantity?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Date']>,
  end?: Maybe<Scalars['Date']>,
  isDisabled: Scalars['Boolean'],
};

export type CuratedList = {
   __typename?: 'CuratedList',
  id: Scalars['ID'],
  createdAt: Scalars['Date'],
  updatedAt?: Maybe<Scalars['Date']>,
  name: Scalars['String'],
};

export type CuratedListItem = {
   __typename?: 'CuratedListItem',
  id: Scalars['ID'],
  addedAt: Scalars['Date'],
  listId: Scalars['ID'],
  product: Product,
};

export type CuratedListItemMutationResponse = {
   __typename?: 'CuratedListItemMutationResponse',
  item: CuratedListItem,
};

export type CuratedListItemsConnection = Connection & {
   __typename?: 'CuratedListItemsConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges: Array<CuratedListItemsEdge>,
};

export type CuratedListItemsEdge = Edge & {
   __typename?: 'CuratedListItemsEdge',
  cursor: Scalars['PageCursor'],
  node: CuratedListItem,
};

export type CuratedListMutationResponse = {
   __typename?: 'CuratedListMutationResponse',
  list: CuratedList,
};

export type CuratedListsConnection = Connection & {
   __typename?: 'CuratedListsConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges: Array<CuratedListsEdge>,
};

export type CuratedListsEdge = Edge & {
   __typename?: 'CuratedListsEdge',
  cursor: Scalars['PageCursor'],
  node: CuratedList,
};


export type Discount = {
   __typename?: 'Discount',
  id: Scalars['ID'],
  createdAt: Scalars['Date'],
  modifier: DiscountModifier,
  scope: DiscountScope,
  isDisabled: Scalars['Boolean'],
  timeCondition?: Maybe<DiscountTimeCondition>,
  isAutomatic: Scalars['Boolean'],
  promoCode?: Maybe<Scalars['String']>,
  valueFixed?: Maybe<Scalars['Price']>,
  valueDollarsOff?: Maybe<Scalars['Price']>,
  valuePercentageOff?: Maybe<Scalars['Float']>,
  productScopeInfo?: Maybe<ProductScopedDiscountInfo>,
  storeScopeInfo?: Maybe<StoreScopedDiscountInfo>,
  platformScopeInfo?: Maybe<PlatformScopedDiscountInfo>,
};

export enum DiscountModifier {
  FIXED_PRICE = 'FIXED_PRICE',
  DOLLARS_OFF = 'DOLLARS_OFF',
  PERCENTAGE_OFF = 'PERCENTAGE_OFF'
}

export type DiscountMutationResponse = {
   __typename?: 'DiscountMutationResponse',
  discount: Discount,
};

export type DiscountsConnection = Connection & {
   __typename?: 'DiscountsConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges: Array<DiscountsEdge>,
};

export enum DiscountScope {
  PRODUCT = 'PRODUCT',
  STORE = 'STORE',
  PLATFORM = 'PLATFORM'
}

export type DiscountsEdge = Edge & {
   __typename?: 'DiscountsEdge',
  cursor: Scalars['PageCursor'],
  node: Discount,
};

export type DiscountStockLimitCondition = {
   __typename?: 'DiscountStockLimitCondition',
  stockLevel: StockLevel,
  supplyExhaustionRule: DiscountUnavailableRule,
};

export type DiscountStockLimitConditionInput = {
  quantityAvailable: Scalars['Int'],
  supplyExhaustionRule: DiscountUnavailableRule,
};

export type DiscountTimeCondition = {
   __typename?: 'DiscountTimeCondition',
  start?: Maybe<Scalars['Date']>,
  end: Scalars['Date'],
  timeExpiryRule: DiscountUnavailableRule,
};

export type DiscountTimeConditionInput = {
  start?: Maybe<Scalars['Date']>,
  end: Scalars['Date'],
  timeExpiryRule: DiscountUnavailableRule,
};

export enum DiscountUnavailableRule {
  DISABLE_DISCOUNT = 'DISABLE_DISCOUNT',
  MARK_AS_SOLD_OUT = 'MARK_AS_SOLD_OUT'
}

export type Download = {
   __typename?: 'Download',
  product: Product,
  orderId: Scalars['ID'],
  order: Order,
};

export type DownloadsConnection = Connection & {
   __typename?: 'DownloadsConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges: Array<DownloadsEdge>,
};

export type DownloadsEdge = Edge & {
   __typename?: 'DownloadsEdge',
  cursor: Scalars['PageCursor'],
  node: Download,
};

export type Edge = {
  cursor: Scalars['PageCursor'],
};

export type EditPlatformDiscountInput = {
  discountId: Scalars['ID'],
  isDisabled?: Maybe<Scalars['Boolean']>,
};

export type EditStorePromoCodeInput = {
  discountId: Scalars['ID'],
  isDisabled?: Maybe<Scalars['Boolean']>,
};

export type Image = {
   __typename?: 'Image',
  id: Scalars['ID'],
  createdAt: Scalars['Date'],
  original: ImageVariant,
  variants: Array<ImageVariant>,
  tags?: Maybe<Array<Scalars['String']>>,
  description?: Maybe<Scalars['String']>,
};

export type ImageVariant = {
   __typename?: 'ImageVariant',
  id: Scalars['ID'],
  url: Scalars['String'],
  mimeType: Scalars['String'],
  widthInPixels: Scalars['Int'],
  heightInPixels: Scalars['Int'],
  sizeInBytes: Scalars['Int'],
};

export type LoginMutationResponse = {
   __typename?: 'LoginMutationResponse',
  user: UserPrivate,
  jwt?: Maybe<Scalars['String']>,
  setCookie?: Maybe<Scalars['String']>,
};

export type MostRecentDownloadRecord = {
   __typename?: 'MostRecentDownloadRecord',
  fileId: Scalars['ID'],
  fileName?: Maybe<Scalars['String']>,
  downloadedAt?: Maybe<Scalars['Date']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  signUpUsingEmail: SignUpMutationResponse,
  logInUsingEmail: LoginMutationResponse,
  logOut: BlankMutationResponse,
  sendResetPasswordEmail: SendResetPasswordResponse,
  confirmResetPassword: ResetPasswordResponse,
  changePassword: UserMutationResponse,
  setPayoutMethod: UserMutationResponse,
  sendVerifyEmail: UserMutationResponse,
  editUserProfile: UserMutationResponse,
  deleteAccount: BlankMutationResponse,
  adminDeleteAccount: BlankMutationResponse,
  uploadRegister: UploadRegisterMutationResponse,
  uploadSaveImage: UploadSaveImageMutationResponse,
  uploadSaveProductFile: UploadSaveProductFileMutationResponse,
  followStore: BlankMutationResponse,
  unfollowStore: BlankMutationResponse,
  addProductToWishlist: BlankMutationResponse,
  removeProductFromWishlist: BlankMutationResponse,
  addProductsToCart: Cart,
  removeProductsFromCart: Cart,
  adjustCartItemQuantity: Cart,
  addPromoCodeToCart: CartMutationResponse,
  removePromoCodeFromCart: CartMutationResponse,
  checkoutCart: OrderCreateMutationResponse,
  checkoutConfirmCart: OrderMutationResponse,
  checkoutProducts: OrderCreateMutationResponse,
  checkoutConfirmProducts: OrderMutationResponse,
  checkoutCartForFrontendPayment: OrderMutationResponse,
  checkoutProductsForFrontendPayment: OrderMutationResponse,
  confirmOrderAfterFrontendPayment: OrderMutationResponse,
  adminManuallyConfirmOrderAfterFrontendPayment: OrderMutationResponse,
  claimUnclaimedOrderOwnership: OrderMutationResponse,
  reassignOrderOwnership: OrderMutationResponse,
  refreshCart: CartMutationResponse,
  createStore: StoreMutationResponse,
  editStoreProfile?: Maybe<StoreMutationResponse>,
  deleteStore: StoreMutationResponse,
  adminDeleteStore: StoreMutationResponse,
  createProduct: ProductMutationResponse,
  editProduct: ProductMutationResponse,
  deleteProduct?: Maybe<ProductMutationResponse>,
  adminDeleteProduct?: Maybe<ProductMutationResponse>,
  suspendUser: BlankMutationResponse,
  unsuspendUser: BlankMutationResponse,
  suspendProduct?: Maybe<ProductMutationResponse>,
  unsuspendProduct?: Maybe<ProductMutationResponse>,
  excludeProductFromAutomaticLists?: Maybe<ProductMutationResponse>,
  includeProductInAutomaticLists?: Maybe<ProductMutationResponse>,
  excludeProductFromSearch?: Maybe<ProductMutationResponse>,
  includeProductInSearch?: Maybe<ProductMutationResponse>,
  suspendStore?: Maybe<StoreMutationResponse>,
  unsuspendStore?: Maybe<StoreMutationResponse>,
  createStorePromoCode: DiscountMutationResponse,
  editStorePromoCode: DiscountMutationResponse,
  createPlatformDiscount: DiscountMutationResponse,
  editPlatformDiscount: DiscountMutationResponse,
  generateProductFileDownloadLink: ProductFileLinkMutationResponse,
  adminGenerateProductFileDownloadLink: ProductFileLinkMutationResponse,
  setDefaultPaymentMethod: AddRemovePaymentMethodResponse,
  addPaymentMethod: AddRemovePaymentMethodResponse,
  removePaymentMethod: AddRemovePaymentMethodResponse,
  createPayouts: Array<Payout>,
  approvePayouts: ApprovePayoutsResult,
  createPayoutSplit: PayoutSplit,
  createCuratedList: CuratedListMutationResponse,
  deleteCuratedList: BlankMutationResponse,
  addProductToCuratedList: CuratedListItemMutationResponse,
  removeItemFromCuratedList: CuratedListMutationResponse,
  rearrangeCuratedListItems: CuratedListMutationResponse,
  createRefund: CreateRefundMutationResponse,
  reserveStoreLinkSlug?: Maybe<PrimaryLinkSlugs>,
  removeStoreLinkSlug: BlankMutationResponse,
};


export type MutationSignUpUsingEmailArgs = {
  username?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  password: Scalars['String'],
  productProductVariantIds?: Maybe<Array<Maybe<ProductProductVariantId>>>,
  subscribedNewsletters?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type MutationLogInUsingEmailArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
  productProductVariantIds?: Maybe<Array<Maybe<ProductProductVariantId>>>
};


export type MutationSendResetPasswordEmailArgs = {
  email: Scalars['String']
};


export type MutationConfirmResetPasswordArgs = {
  email: Scalars['String'],
  expiresAt: Scalars['Date'],
  resetId: Scalars['String'],
  newPassword?: Maybe<Scalars['String']>
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'],
  newPassword: Scalars['String']
};


export type MutationSetPayoutMethodArgs = {
  payoutType?: Maybe<Scalars['String']>,
  payoutEmail?: Maybe<Scalars['String']>,
  payoutProcessor?: Maybe<Scalars['String']>,
  payoutProcessorId?: Maybe<Scalars['String']>
};


export type MutationSendVerifyEmailArgs = {
  ref: Scalars['String']
};


export type MutationEditUserProfileArgs = {
  email?: Maybe<Scalars['String']>,
  username?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  subscribedNewsletterIds?: Maybe<Array<Maybe<Scalars['ID']>>>,
  payoutMethod?: Maybe<Scalars['String']>
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String']
};


export type MutationAdminDeleteAccountArgs = {
  userId: Scalars['ID']
};


export type MutationUploadRegisterArgs = {
  uploadType: UploadType,
  mimeType: Scalars['String'],
  fileSize: Scalars['Int']
};


export type MutationUploadSaveImageArgs = {
  uploadId: Scalars['ID'],
  description?: Maybe<Scalars['String']>,
  tags?: Maybe<Array<Maybe<Scalars['String']>>>,
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type MutationUploadSaveProductFileArgs = {
  uploadId: Scalars['ID'],
  fileName: Scalars['String'],
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type MutationFollowStoreArgs = {
  storeId: Scalars['ID']
};


export type MutationUnfollowStoreArgs = {
  storeId: Scalars['ID']
};


export type MutationAddProductToWishlistArgs = {
  productId: Scalars['ID'],
  variantId: Scalars['ID']
};


export type MutationRemoveProductFromWishlistArgs = {
  productId: Scalars['ID'],
  variantId: Scalars['ID']
};


export type MutationAddProductsToCartArgs = {
  cartId: Scalars['ID'],
  productProductVariantIds: Array<ProductProductVariantId>
};


export type MutationRemoveProductsFromCartArgs = {
  cartId: Scalars['ID'],
  productProductVariantIds: Array<ProductProductVariantId>
};


export type MutationAdjustCartItemQuantityArgs = {
  cartId: Scalars['ID'],
  itemId: Scalars['ID'],
  quantity?: Maybe<Scalars['Int']>
};


export type MutationAddPromoCodeToCartArgs = {
  code: Scalars['String']
};


export type MutationRemovePromoCodeFromCartArgs = {
  discountId: Scalars['ID']
};


export type MutationCheckoutCartArgs = {
  quotedPrice: Scalars['Price'],
  paymentProcessorData: Scalars['String']
};


export type MutationCheckoutConfirmCartArgs = {
  unconfirmedOrderId: Scalars['ID'],
  paymentProcessorData: Scalars['String']
};


export type MutationCheckoutProductsArgs = {
  productsInfo: Array<ProductProductVariantId>,
  promoCodesToAdd?: Maybe<Array<Scalars['String']>>,
  quotedPrice: Scalars['Price'],
  paymentProcessorData: Scalars['String']
};


export type MutationCheckoutConfirmProductsArgs = {
  unconfirmedOrderId: Scalars['ID'],
  paymentProcessorData: Scalars['String'],
  anonOrderEmailAddress?: Maybe<Scalars['String']>
};


export type MutationCheckoutCartForFrontendPaymentArgs = {
  quotedPrice: Scalars['Price']
};


export type MutationCheckoutProductsForFrontendPaymentArgs = {
  productsInfo: Array<ProductProductVariantId>,
  promoCodesToAdd?: Maybe<Array<Scalars['String']>>,
  quotedPrice: Scalars['Price']
};


export type MutationConfirmOrderAfterFrontendPaymentArgs = {
  orderId: Scalars['ID'],
  paymentProcessorData: Scalars['String'],
  anonOrderEmailAddress?: Maybe<Scalars['String']>
};


export type MutationAdminManuallyConfirmOrderAfterFrontendPaymentArgs = {
  orderId: Scalars['ID'],
  cartIdToEmpty?: Maybe<Scalars['ID']>,
  paymentProcessorData: Scalars['String'],
  anonOrderEmailAddress?: Maybe<Scalars['String']>
};


export type MutationClaimUnclaimedOrderOwnershipArgs = {
  orderId: Scalars['ID']
};


export type MutationReassignOrderOwnershipArgs = {
  orderId: Scalars['ID'],
  userIdOrEmail: Scalars['String']
};


export type MutationCreateStoreArgs = {
  name: Scalars['String'],
  profileId?: Maybe<Scalars['ID']>,
  coverId?: Maybe<Scalars['ID']>,
  bio?: Maybe<Scalars['String']>,
  website?: Maybe<Scalars['String']>
};


export type MutationEditStoreProfileArgs = {
  name?: Maybe<Scalars['String']>,
  profileId?: Maybe<Scalars['ID']>,
  coverId?: Maybe<Scalars['ID']>,
  bio?: Maybe<Scalars['String']>,
  website?: Maybe<Scalars['String']>
};


export type MutationDeleteStoreArgs = {
  password: Scalars['String']
};


export type MutationAdminDeleteStoreArgs = {
  storeId: Scalars['ID']
};


export type MutationCreateProductArgs = {
  productCreateInput?: Maybe<ProductCreateInput>
};


export type MutationEditProductArgs = {
  productEditInput?: Maybe<ProductEditInput>
};


export type MutationDeleteProductArgs = {
  productId: Scalars['ID']
};


export type MutationAdminDeleteProductArgs = {
  productId: Scalars['ID']
};


export type MutationSuspendUserArgs = {
  userId: Scalars['ID']
};


export type MutationUnsuspendUserArgs = {
  userId: Scalars['ID']
};


export type MutationSuspendProductArgs = {
  productId: Scalars['ID']
};


export type MutationUnsuspendProductArgs = {
  productId: Scalars['ID']
};


export type MutationExcludeProductFromAutomaticListsArgs = {
  productId: Scalars['ID']
};


export type MutationIncludeProductInAutomaticListsArgs = {
  productId: Scalars['ID']
};


export type MutationExcludeProductFromSearchArgs = {
  productId: Scalars['ID']
};


export type MutationIncludeProductInSearchArgs = {
  productId: Scalars['ID']
};


export type MutationSuspendStoreArgs = {
  storeId: Scalars['ID']
};


export type MutationUnsuspendStoreArgs = {
  storeId: Scalars['ID']
};


export type MutationCreateStorePromoCodeArgs = {
  input: CreateStorePromoCodeInput
};


export type MutationEditStorePromoCodeArgs = {
  input: EditStorePromoCodeInput
};


export type MutationCreatePlatformDiscountArgs = {
  input: CreatePlatformDiscountInput
};


export type MutationEditPlatformDiscountArgs = {
  input: EditPlatformDiscountInput
};


export type MutationGenerateProductFileDownloadLinkArgs = {
  id: Scalars['ID'],
  orderItemId: Scalars['ID']
};


export type MutationAdminGenerateProductFileDownloadLinkArgs = {
  id: Scalars['ID']
};


export type MutationSetDefaultPaymentMethodArgs = {
  paymentMethodId: Scalars['ID'],
  customerId: Scalars['ID']
};


export type MutationAddPaymentMethodArgs = {
  paymentMethodId: Scalars['ID'],
  customerId: Scalars['ID']
};


export type MutationRemovePaymentMethodArgs = {
  paymentMethodId: Scalars['ID'],
  customerId: Scalars['ID']
};


export type MutationCreatePayoutsArgs = {
  month: Scalars['Int'],
  year: Scalars['Int']
};


export type MutationApprovePayoutsArgs = {
  payoutIds: Array<Scalars['String']>
};


export type MutationCreatePayoutSplitArgs = {
  storeOrUserId: Scalars['String'],
  dealType: PayoutDealType,
  rate: Scalars['Float'],
  expiresAt?: Maybe<Scalars['Date']>,
  referrerId?: Maybe<Scalars['String']>
};


export type MutationCreateCuratedListArgs = {
  name: Scalars['String']
};


export type MutationDeleteCuratedListArgs = {
  listId: Scalars['ID']
};


export type MutationAddProductToCuratedListArgs = {
  listId: Scalars['ID'],
  productId: Scalars['ID'],
  variantId?: Maybe<Scalars['ID']>
};


export type MutationRemoveItemFromCuratedListArgs = {
  listId: Scalars['ID'],
  itemId: Scalars['ID']
};


export type MutationRearrangeCuratedListItemsArgs = {
  listId: Scalars['ID'],
  itemIdsInOrder: Array<Scalars['ID']>
};


export type MutationCreateRefundArgs = {
  input: CreateRefundInput
};


export type MutationReserveStoreLinkSlugArgs = {
  slug: Scalars['String']
};

export type MutationError = {
   __typename?: 'MutationError',
  code: Scalars['String'],
  debugMessage?: Maybe<Scalars['String']>,
  error?: Maybe<Scalars['String']>,
};

export type MutationErrorSummary = {
   __typename?: 'MutationErrorSummary',
  errors?: Maybe<Array<Maybe<MutationError>>>,
  shouldRetry?: Maybe<Scalars['Boolean']>,
};

export type Order = {
   __typename?: 'Order',
  id: Scalars['ID'],
  currentSnapshot: OrderSnapshot,
  items: Array<OrderItem>,
  createdAt: Scalars['Date'],
  updatedAt?: Maybe<Scalars['Date']>,
  userId?: Maybe<Scalars['ID']>,
  user?: Maybe<User>,
  attachedPromoCodes: Array<Discount>,
  isLoggedOutPurchase: Scalars['Boolean'],
  isCartlessPurchase: Scalars['Boolean'],
  isMobilePurchase: Scalars['Boolean'],
};

export type OrderCreateMutationResponse = {
   __typename?: 'OrderCreateMutationResponse',
  unconfirmedOrder: Order,
  paymentProcessorResponse: Scalars['String'],
};

export type OrderItem = {
   __typename?: 'OrderItem',
  id: Scalars['ID'],
  orderId: Scalars['ID'],
  userId?: Maybe<Scalars['ID']>,
  createdAt: Scalars['Date'],
  updatedAt?: Maybe<Scalars['Date']>,
  priceDetails: PriceDetails,
  productId: Scalars['ID'],
  productSnapshotId: Scalars['ID'],
  variantId: Scalars['ID'],
  variantSnapshotId: Scalars['ID'],
  product: Product,
  orderStatus: OrderStatus,
  quantity?: Maybe<Scalars['Int']>,
  mostRecentDownloadRecords: Array<MostRecentDownloadRecord>,
};

export type OrderMutationResponse = {
   __typename?: 'OrderMutationResponse',
  order: Order,
};

export type OrdersConnection = Connection & {
   __typename?: 'OrdersConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges: Array<OrdersEdge>,
};

export type OrdersEdge = Edge & {
   __typename?: 'OrdersEdge',
  cursor: Scalars['PageCursor'],
  node: Order,
};

export type OrderSnapshot = {
   __typename?: 'OrderSnapshot',
  id: Scalars['ID'],
  orderId: Scalars['ID'],
  orderStatus: OrderStatus,
  createdAt: Scalars['Date'],
  currency?: Maybe<Scalars['String']>,
  subtotal: Scalars['Price'],
  automaticSavings: Scalars['Price'],
  promoCodeSavings: Scalars['Price'],
  taxes: Scalars['Price'],
  paymentProcessingFee: Scalars['Price'],
  total: Scalars['Price'],
  transactionId?: Maybe<Scalars['ID']>,
  transaction?: Maybe<Transaction>,
  paymentProcessor?: Maybe<PaymentProcessor>,
};

export enum OrderStatus {
  CREATED = 'CREATED',
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
  REFUNDED = 'REFUNDED'
}

export type PageBasedConnection = {
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageBasedConnectionPageInfo,
};

export type PageBasedConnectionEdge = {
  pageNumber: Scalars['Int'],
};

export type PageBasedConnectionPageInfo = {
   __typename?: 'PageBasedConnectionPageInfo',
  pageNumber: Scalars['Int'],
  isLastPage: Scalars['Boolean'],
  totalPages?: Maybe<Scalars['Int']>,
};

export type PageBasedConnectionQuery = {
  sortAscending?: Maybe<Scalars['Boolean']>,
  pageNumber?: Maybe<Scalars['Int']>,
  count?: Maybe<Scalars['Int']>,
};

export type PageBasedConnectionWithMetrics = {
  totalCount?: Maybe<Scalars['Int']>,
  totalAmount?: Maybe<Scalars['Int']>,
  pageInfo: PageBasedConnectionPageInfo,
};


export type PageInfo = {
   __typename?: 'PageInfo',
  endCursor?: Maybe<Scalars['PageCursor']>,
  isLastPage: Scalars['Boolean'],
  totalPages?: Maybe<Scalars['Int']>,
};

export enum PayeeType {
  STORE = 'STORE',
  AFFILIATE = 'AFFILIATE',
  PLATFORM = 'PLATFORM'
}

export type PaymentMethod = {
   __typename?: 'PaymentMethod',
  id: Scalars['ID'],
  userId: Scalars['ID'],
  createdAt: Scalars['Date'],
  updatedAt?: Maybe<Scalars['Date']>,
  customerId?: Maybe<Scalars['ID']>,
  paymentProcessor?: Maybe<PaymentProcessor>,
  paymentMethodTypes?: Maybe<Array<Maybe<Scalars['String']>>>,
  last4?: Maybe<Scalars['String']>,
  expMonth?: Maybe<Scalars['String']>,
  expYear?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  details?: Maybe<Scalars['String']>,
};

export enum PaymentProcessor {
  STRIPE = 'Stripe',
  STRIPEDOMESTIC = 'StripeDomestic',
  PAYPAL = 'Paypal',
  APPLEPAY = 'ApplePay',
  GOOGLEPAY = 'GooglePay',
  NOPAYMENTFEES = 'NoPaymentFees'
}

export type Payout = {
   __typename?: 'Payout',
  id: Scalars['ID'],
  createdAt: Scalars['Date'],
  payeeId: Scalars['ID'],
  payeeType: PayeeType,
  amount: Scalars['Price'],
  startPeriod: Scalars['Date'],
  endPeriod: Scalars['Date'],
  payoutDate: Scalars['Date'],
  payoutStatus: PayoutStatus,
  payoutEmail: Scalars['String'],
  currency: Scalars['String'],
  payoutItemIds: Array<Scalars['ID']>,
  approvedByIds: Array<Scalars['ID']>,
  details?: Maybe<Scalars['String']>,
  approvedByAdmins: Array<UserWithRole>,
  payoutItems?: Maybe<Array<Maybe<PayoutItem>>>,
  productsBreakdownConnection: ProductsSoldPeriodSummaryConnection,
};


export type PayoutProductsBreakdownConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};

export enum PayoutDealType {
  SELLER = 'SELLER',
  SELLER_AFFILIATE = 'SELLER_AFFILIATE',
  REFERRED_SELLER = 'REFERRED_SELLER',
  BUYER_AFFILIATE = 'BUYER_AFFILIATE'
}

export type PayoutEdge = Edge & {
   __typename?: 'PayoutEdge',
  cursor: Scalars['PageCursor'],
  node: Payout,
};

export type PayoutHistorySummaries = {
   __typename?: 'PayoutHistorySummaries',
  today: SummaryStatistics,
  last7Days: SummaryStatistics,
  last30Days: SummaryStatistics,
  lastPeriod: SummaryStatistics,
  currentPeriod: SummaryStatistics,
  allTime: SummaryStatistics,
};

export type PayoutInput = {
  id?: Maybe<Scalars['ID']>,
  createdAt?: Maybe<Scalars['Date']>,
  storeId?: Maybe<Scalars['ID']>,
  sellerPayment?: Maybe<Scalars['Price']>,
  platformFee?: Maybe<Scalars['Price']>,
  startPeriod?: Maybe<Scalars['Date']>,
  endPeriod?: Maybe<Scalars['Date']>,
  payoutDate?: Maybe<Scalars['Date']>,
  payoutStatus?: Maybe<PayoutStatus>,
  payoutEmail?: Maybe<Scalars['String']>,
  currency?: Maybe<Scalars['String']>,
  payoutItemIds?: Maybe<Array<Maybe<Scalars['ID']>>>,
  approvedByIds?: Maybe<Array<Maybe<Scalars['ID']>>>,
  details?: Maybe<Scalars['String']>,
};

export type PayoutItem = {
   __typename?: 'PayoutItem',
  id: Scalars['ID'],
  payeeId: Scalars['ID'],
  payeeType: PayeeType,
  store?: Maybe<StorePrivate>,
  amount: Scalars['Price'],
  paymentProcessingFee: Scalars['Price'],
  createdAt: Scalars['Date'],
  payoutStatus: PayoutStatus,
  currency?: Maybe<Scalars['String']>,
  orderItemId: Scalars['ID'],
  orderItem?: Maybe<OrderItem>,
  txnId: Scalars['ID'],
  transaction?: Maybe<Transaction>,
  payoutId?: Maybe<Scalars['ID']>,
};

export type PayoutItemsConnection = ConnectionWithMetrics & {
   __typename?: 'PayoutItemsConnection',
  totalCount?: Maybe<Scalars['Int']>,
  totalAmount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges: Array<PayoutItemsEdge>,
};

export type PayoutItemsEdge = Edge & {
   __typename?: 'PayoutItemsEdge',
  cursor: Scalars['PageCursor'],
  node: PayoutItem,
};

export type PayoutItemsPagedConnection = PageBasedConnectionWithMetrics & {
   __typename?: 'PayoutItemsPagedConnection',
  totalCount?: Maybe<Scalars['Int']>,
  totalAmount?: Maybe<Scalars['Int']>,
  pageInfo: PageBasedConnectionPageInfo,
  edges: Array<PayoutItemsPagedEdge>,
};

export type PayoutItemsPagedEdge = PageBasedConnectionEdge & {
   __typename?: 'PayoutItemsPagedEdge',
  pageNumber: Scalars['Int'],
  node: PayoutItem,
};

export type PayoutMethod = {
   __typename?: 'PayoutMethod',
  id: Scalars['ID'],
  userId: Scalars['ID'],
  createdAt: Scalars['Date'],
  updatedAt?: Maybe<Scalars['Date']>,
  payoutType?: Maybe<Scalars['String']>,
  payoutEmail?: Maybe<Scalars['String']>,
  payoutProcessor?: Maybe<Scalars['String']>,
  payoutProcessorId?: Maybe<Scalars['String']>,
};

export type PayoutMethodMutationResponse = {
   __typename?: 'PayoutMethodMutationResponse',
  payoutMethod: PayoutMethod,
};

export type PayoutsConnection = ConnectionWithMetrics & {
   __typename?: 'PayoutsConnection',
  totalCount?: Maybe<Scalars['Int']>,
  totalAmount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges: Array<PayoutEdge>,
};

export type PayoutSplit = {
   __typename?: 'PayoutSplit',
  id: Scalars['ID'],
  storeOrUserId: Scalars['ID'],
  createdAt: Scalars['Date'],
  dealType: PayoutDealType,
  expiresAt?: Maybe<Scalars['Date']>,
  rate: Scalars['Float'],
  referrerId?: Maybe<Scalars['ID']>,
};

export enum PayoutStatus {
  UNPAID = 'UNPAID',
  MISSING_PAYOUT_METHOD = 'MISSING_PAYOUT_METHOD',
  RETAINED = 'RETAINED',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  PROCESSING = 'PROCESSING',
  PAID = 'PAID',
  REFUNDING = 'REFUNDING',
  PENDING_REFUND = 'PENDING_REFUND',
  REFUNDED = 'REFUNDED'
}

export type PlatformScopedDiscountInfo = {
   __typename?: 'PlatformScopedDiscountInfo',
  isApplicableToAnyProduct: Scalars['Boolean'],
};


export type PriceDetails = {
   __typename?: 'PriceDetails',
  basePrice: Scalars['Price'],
  actualPrice: Scalars['Price'],
  discountBreakdown?: Maybe<PriceDetailsDiscountBreakdown>,
};

export type PriceDetailsDiscountBreakdown = {
   __typename?: 'PriceDetailsDiscountBreakdown',
  fixedPriceDiscount?: Maybe<Discount>,
  dollarsOffDiscounts: Array<Discount>,
  percentOffDiscount?: Maybe<Discount>,
  fixedPriceComponent: Scalars['Price'],
  dollarsOffComponent: Scalars['Price'],
  percentOffComponent: Scalars['Price'],
  promoCodeComponent: Scalars['Price'],
};

export type PrimaryLinkSlugs = {
   __typename?: 'PrimaryLinkSlugs',
  ownerId: Scalars['ID'],
  auto: Scalars['String'],
  manual?: Maybe<Scalars['String']>,
};

export type Product = {
  id: Scalars['ID'],
  createdAt: Scalars['Date'],
  updatedAt?: Maybe<Scalars['Date']>,
  categoryId: Scalars['ID'],
  category: ProductCategory,
  tags: Array<Scalars['String']>,
  storeId: Scalars['ID'],
  store: Store,
  isPublished: Scalars['Boolean'],
  isSuspended: Scalars['Boolean'],
  isDeleted: Scalars['Boolean'],
  isExcludedFromAutomaticLists: Scalars['Boolean'],
  isExcludedFromSearch: Scalars['Boolean'],
  chosenVariant?: Maybe<ProductVariant>,
  linkSlugs?: Maybe<PrimaryLinkSlugs>,
  snapshotId: Scalars['ID'],
  snapshotCreatedAt: Scalars['Date'],
  name: Scalars['String'],
  tagline: Scalars['String'],
  description: Scalars['String'],
  currentVariants: Array<ProductVariant>,
  featuredVariant?: Maybe<ProductVariant>,
  variantsLabel: VariantsLabel,
  isQuantityEnabled: Scalars['Boolean'],
  quantityLabel: QuantityLabel,
};

export type ProductCategory = {
   __typename?: 'ProductCategory',
  id: Scalars['ID'],
  createdAt: Scalars['Date'],
  updatedAt?: Maybe<Scalars['Date']>,
  name: Scalars['String'],
  categoryGroup?: Maybe<Scalars['ProductCategoryGroup']>,
};


export type ProductCreateInput = {
  categoryId: Scalars['ID'],
  name: Scalars['String'],
  tagline: Scalars['String'],
  description: Scalars['String'],
  currentVariants: Array<ProductVariantInput>,
  tags: Array<Scalars['String']>,
  isPublished: Scalars['Boolean'],
  variantsLabel?: Maybe<VariantsLabel>,
  isQuantityEnabled: Scalars['Boolean'],
  quantityLabel?: Maybe<QuantityLabel>,
};

export type ProductEditInput = {
  productId: Scalars['ID'],
  categoryId: Scalars['ID'],
  name: Scalars['String'],
  tagline: Scalars['String'],
  description: Scalars['String'],
  currentVariants: Array<ProductVariantEditInput>,
  tags: Array<Scalars['String']>,
  isPublished: Scalars['Boolean'],
  variantsLabel?: Maybe<VariantsLabel>,
  isQuantityEnabled: Scalars['Boolean'],
  quantityLabel?: Maybe<QuantityLabel>,
};

export type ProductFile = {
   __typename?: 'ProductFile',
  id: Scalars['ID'],
  fileName?: Maybe<Scalars['String']>,
  createdAt: Scalars['Date'],
  mimeType: Scalars['String'],
  sizeInBytes: Scalars['Int'],
};

export type ProductFileDownloadLink = {
   __typename?: 'ProductFileDownloadLink',
  productFileId: Scalars['ID'],
  url: Scalars['String'],
  expiresAt: Scalars['Date'],
};

export type ProductFileLinkMutationResponse = {
   __typename?: 'ProductFileLinkMutationResponse',
  downloadLink: ProductFileDownloadLink,
};

export type ProductFileLinksMutationResponse = {
   __typename?: 'ProductFileLinksMutationResponse',
  downloadLinks: Array<ProductFileDownloadLink>,
};

export type ProductMutationResponse = {
   __typename?: 'ProductMutationResponse',
  product: Product,
};

export type ProductPreviewItem = {
   __typename?: 'ProductPreviewItem',
  id: Scalars['ID'],
  imageId?: Maybe<Scalars['ID']>,
  image?: Maybe<Image>,
  youTubeEmbedLink?: Maybe<Scalars['String']>,
};

export type ProductPreviewItemInput = {
  imageId?: Maybe<Scalars['ID']>,
  youTubeEmbedLink?: Maybe<Scalars['String']>,
};

export type ProductPrivate = Product & {
   __typename?: 'ProductPrivate',
  id: Scalars['ID'],
  createdAt: Scalars['Date'],
  updatedAt?: Maybe<Scalars['Date']>,
  categoryId: Scalars['ID'],
  category: ProductCategory,
  tags: Array<Scalars['String']>,
  storeId: Scalars['ID'],
  store: Store,
  isPublished: Scalars['Boolean'],
  isSuspended: Scalars['Boolean'],
  isDeleted: Scalars['Boolean'],
  isExcludedFromAutomaticLists: Scalars['Boolean'],
  isExcludedFromSearch: Scalars['Boolean'],
  chosenVariant?: Maybe<ProductVariant>,
  linkSlugs?: Maybe<PrimaryLinkSlugs>,
  snapshotId: Scalars['ID'],
  snapshotCreatedAt: Scalars['Date'],
  name: Scalars['String'],
  tagline: Scalars['String'],
  description: Scalars['String'],
  currentVariants: Array<ProductVariant>,
  featuredVariant?: Maybe<ProductVariant>,
  variantsLabel: VariantsLabel,
  isQuantityEnabled: Scalars['Boolean'],
  quantityLabel: QuantityLabel,
  historicalSnapshotsConnection: ProductsConnection,
};


export type ProductPrivateHistoricalSnapshotsConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};

export type ProductProductVariantId = {
  productId: Scalars['ID'],
  variantId: Scalars['ID'],
  quantity?: Maybe<Scalars['Int']>,
};

export type ProductPublic = Product & {
   __typename?: 'ProductPublic',
  id: Scalars['ID'],
  createdAt: Scalars['Date'],
  updatedAt?: Maybe<Scalars['Date']>,
  categoryId: Scalars['ID'],
  category: ProductCategory,
  tags: Array<Scalars['String']>,
  storeId: Scalars['ID'],
  store: Store,
  isPublished: Scalars['Boolean'],
  isSuspended: Scalars['Boolean'],
  isDeleted: Scalars['Boolean'],
  isExcludedFromAutomaticLists: Scalars['Boolean'],
  isExcludedFromSearch: Scalars['Boolean'],
  chosenVariant?: Maybe<ProductVariant>,
  linkSlugs?: Maybe<PrimaryLinkSlugs>,
  snapshotId: Scalars['ID'],
  snapshotCreatedAt: Scalars['Date'],
  name: Scalars['String'],
  tagline: Scalars['String'],
  description: Scalars['String'],
  currentVariants: Array<ProductVariant>,
  featuredVariant?: Maybe<ProductVariant>,
  variantsLabel: VariantsLabel,
  isQuantityEnabled: Scalars['Boolean'],
  quantityLabel: QuantityLabel,
};

export type ProductSale = {
   __typename?: 'ProductSale',
  orderItem: OrderItem,
  user?: Maybe<UserPublic>,
  userId?: Maybe<Scalars['ID']>,
  payoutItems?: Maybe<Array<Maybe<PayoutItem>>>,
};

export type ProductSalesEdge = Edge & {
   __typename?: 'ProductSalesEdge',
  cursor: Scalars['PageCursor'],
  node: ProductSale,
};

export type ProductsConnection = Connection & {
   __typename?: 'ProductsConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges: Array<ProductsEdge>,
};

export type ProductScopedDiscountInfo = {
   __typename?: 'ProductScopedDiscountInfo',
  variantSnapshotId?: Maybe<Scalars['ID']>,
  stockLimitCondition?: Maybe<DiscountStockLimitCondition>,
};

export type ProductsEdge = Edge & {
   __typename?: 'ProductsEdge',
  cursor: Scalars['PageCursor'],
  node: Product,
};

export type ProductSoldPeriodSummary = {
   __typename?: 'ProductSoldPeriodSummary',
  product: Product,
  numberOfSalesMade: Scalars['Int'],
  grossAmount: Scalars['Price'],
};

export type ProductSpecialDeal = {
   __typename?: 'ProductSpecialDeal',
  discountedPrice: Scalars['Price'],
  timeCondition?: Maybe<DiscountTimeCondition>,
  stockLimitCondition?: Maybe<DiscountStockLimitCondition>,
};

export type ProductSpecialDealInput = {
  discountedPrice: Scalars['Price'],
  timeCondition?: Maybe<DiscountTimeConditionInput>,
  stockLimitCondition?: Maybe<DiscountStockLimitConditionInput>,
};

export type ProductsSoldPeriodSummaryConnection = Connection & {
   __typename?: 'ProductsSoldPeriodSummaryConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges: Array<ProductsSoldPeriodSummaryEdge>,
};

export type ProductsSoldPeriodSummaryEdge = Edge & {
   __typename?: 'ProductsSoldPeriodSummaryEdge',
  cursor: Scalars['PageCursor'],
  node: ProductSoldPeriodSummary,
};

export type ProductVariant = {
   __typename?: 'ProductVariant',
  variantId: Scalars['ID'],
  productId: Scalars['ID'],
  productSnapshotId: Scalars['ID'],
  variantSnapshotId: Scalars['ID'],
  storeId: Scalars['ID'],
  createdAt: Scalars['Date'],
  variantName: Scalars['String'],
  variantDescription?: Maybe<Scalars['String']>,
  isDefault: Scalars['Boolean'],
  priceWas?: Maybe<Scalars['Price']>,
  price: Scalars['Price'],
  priceDetails: PriceDetails,
  previewItems: Array<ProductPreviewItem>,
  fileIds: Array<Scalars['ID']>,
  files: Array<ProductFile>,
  specialDeal?: Maybe<ProductSpecialDeal>,
  isSoldOut: Scalars['Boolean'],
  baseStockLevel?: Maybe<StockLevel>,
  currentStockLevel?: Maybe<StockLevel>,
  relevantDiscounts?: Maybe<Array<Maybe<Discount>>>,
  specialDealDiscount?: Maybe<Discount>,
  permanentDiscountedPriceDiscount?: Maybe<Discount>,
};

export type ProductVariantEditInput = {
  variantId?: Maybe<Scalars['ID']>,
  variantName: Scalars['String'],
  variantDescription: Scalars['String'],
  isDefault: Scalars['Boolean'],
  price: Scalars['Price'],
  priceWas?: Maybe<Scalars['Price']>,
  specialDeal?: Maybe<ProductSpecialDealInput>,
  previewItems: Array<ProductPreviewItemInput>,
  fileIds: Array<Scalars['ID']>,
  quantityAvailable?: Maybe<Scalars['Int']>,
};

export type ProductVariantInput = {
  variantName: Scalars['String'],
  variantDescription: Scalars['String'],
  isDefault: Scalars['Boolean'],
  price: Scalars['Price'],
  priceWas?: Maybe<Scalars['Price']>,
  specialDeal?: Maybe<ProductSpecialDealInput>,
  previewItems: Array<ProductPreviewItemInput>,
  fileIds: Array<Scalars['ID']>,
  quantityAvailable?: Maybe<Scalars['Int']>,
};

export enum QuantityLabel {
  QUANTITY = 'QUANTITY',
  SEATS = 'SEATS'
}

export type Query = {
   __typename?: 'Query',
  loggedInUser: UserPrivate,
  user?: Maybe<User>,
  userByEmailOrId?: Maybe<User>,
  productsRecommendedConnection: ProductsConnection,
  productsDealsEndingSoonConnection: ProductsConnection,
  productsLimitedReleasesConnection: ProductsConnection,
  search: SearchResultsConnection,
  productsAllConnection: ProductsConnection,
  productsByCategoryConnection?: Maybe<ProductsConnection>,
  product?: Maybe<Product>,
  store?: Maybe<Store>,
  categories: Array<ProductCategory>,
  category?: Maybe<ProductCategory>,
  platformDiscounts: DiscountsConnection,
  storeDiscounts: DiscountsConnection,
  productsAdminConnection: ProductsConnection,
  storesAdminConnection: StoresConnection,
  listPaymentMethods?: Maybe<Array<PaymentMethod>>,
  getPaymentMethod?: Maybe<PaymentMethod>,
  getTransaction?: Maybe<Transaction>,
  getOrderAsAdmin?: Maybe<Order>,
  getOrder?: Maybe<Order>,
  getOrderItem?: Maybe<OrderItem>,
  getProductSale?: Maybe<ProductSale>,
  getPayoutItemsInPeriodAdmin: PayoutItemsConnection,
  getPayoutItemsInPeriodAdminPaged: PayoutItemsPagedConnection,
  getPayoutsInPeriodAdmin: PayoutsConnection,
  getPayouts: PayoutsConnection,
  getPayoutById: Payout,
  getPayoutSplitByStoreId: PayoutSplit,
  getTransactionsInPeriodAdmin: TransactionsConnection,
  getRecentTransactions: Array<Transaction>,
  getStoreSalesInPeriodAdmin: StoreSalesInPeriodConnection,
  unclaimedOrdersConnection: OrdersConnection,
  unclaimedOrder?: Maybe<Order>,
  wishlistItemsConnection: WishlistItemsConnection,
  listOfCuratedListsConnection: CuratedListsConnection,
  curatedList?: Maybe<CuratedList>,
  curatedListItemsConnection?: Maybe<CuratedListItemsConnection>,
  curatedListItemsAdminConnection?: Maybe<CuratedListItemsConnection>,
  tryPromoCode?: Maybe<Discount>,
  basicInsights: Array<AdminInsight>,
  lookupProductLinkSlug?: Maybe<PrimaryLinkSlugs>,
  lookupStoreLinkSlug?: Maybe<PrimaryLinkSlugs>,
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryUserByEmailOrIdArgs = {
  userIdOrEmail: Scalars['String']
};


export type QueryProductsRecommendedConnectionArgs = {
  query?: Maybe<ConnectionQuery>,
  currentlyViewingProductId?: Maybe<Scalars['ID']>
};


export type QueryProductsDealsEndingSoonConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};


export type QueryProductsLimitedReleasesConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};


export type QuerySearchArgs = {
  searchTerm: Scalars['String'],
  query?: Maybe<PageBasedConnectionQuery>
};


export type QueryProductsAllConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};


export type QueryProductsByCategoryConnectionArgs = {
  categoryId?: Maybe<Scalars['ID']>,
  categoryName?: Maybe<Scalars['String']>,
  query?: Maybe<ConnectionQuery>
};


export type QueryProductArgs = {
  id: Scalars['ID']
};


export type QueryStoreArgs = {
  id: Scalars['ID']
};


export type QueryCategoryArgs = {
  id: Scalars['ID']
};


export type QueryPlatformDiscountsArgs = {
  query?: Maybe<ConnectionQuery>
};


export type QueryStoreDiscountsArgs = {
  query?: Maybe<ConnectionQuery>
};


export type QueryProductsAdminConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};


export type QueryStoresAdminConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};


export type QueryListPaymentMethodsArgs = {
  customerId: Scalars['ID']
};


export type QueryGetPaymentMethodArgs = {
  paymentMethodId: Scalars['ID']
};


export type QueryGetTransactionArgs = {
  transactionId: Scalars['ID']
};


export type QueryGetOrderAsAdminArgs = {
  orderId: Scalars['ID']
};


export type QueryGetOrderArgs = {
  orderId: Scalars['ID']
};


export type QueryGetOrderItemArgs = {
  orderItemId: Scalars['ID']
};


export type QueryGetProductSaleArgs = {
  orderItemId: Scalars['ID']
};


export type QueryGetPayoutItemsInPeriodAdminArgs = {
  month?: Maybe<Scalars['Int']>,
  year?: Maybe<Scalars['Int']>,
  payoutStatus?: Maybe<PayoutStatus>,
  query: ConnectionQuery
};


export type QueryGetPayoutItemsInPeriodAdminPagedArgs = {
  month?: Maybe<Scalars['Int']>,
  year?: Maybe<Scalars['Int']>,
  payoutStatus?: Maybe<PayoutStatus>,
  query: PageBasedConnectionQuery
};


export type QueryGetPayoutsInPeriodAdminArgs = {
  month: Scalars['Int'],
  year: Scalars['Int'],
  payoutStatus?: Maybe<PayoutStatus>,
  query: ConnectionQuery
};


export type QueryGetPayoutsArgs = {
  storeId: Scalars['ID'],
  query: ConnectionQuery
};


export type QueryGetPayoutByIdArgs = {
  payoutId: Scalars['ID']
};


export type QueryGetPayoutSplitByStoreIdArgs = {
  storeOrUserId: Scalars['ID']
};


export type QueryGetTransactionsInPeriodAdminArgs = {
  month?: Maybe<Scalars['Int']>,
  year?: Maybe<Scalars['Int']>,
  query?: Maybe<ConnectionQuery>
};


export type QueryGetRecentTransactionsArgs = {
  count: Scalars['Int']
};


export type QueryGetStoreSalesInPeriodAdminArgs = {
  startDate: Scalars['Date'],
  endDate: Scalars['Date'],
  query?: Maybe<ConnectionQuery>
};


export type QueryUnclaimedOrdersConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};


export type QueryUnclaimedOrderArgs = {
  id: Scalars['ID']
};


export type QueryWishlistItemsConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};


export type QueryListOfCuratedListsConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};


export type QueryCuratedListArgs = {
  listId: Scalars['ID']
};


export type QueryCuratedListItemsConnectionArgs = {
  listId: Scalars['ID'],
  query?: Maybe<ConnectionQuery>
};


export type QueryCuratedListItemsAdminConnectionArgs = {
  listId: Scalars['ID'],
  query?: Maybe<ConnectionQuery>
};


export type QueryTryPromoCodeArgs = {
  code: Scalars['String'],
  cartProductsInfo: Array<ProductProductVariantId>
};


export type QueryLookupProductLinkSlugArgs = {
  slug: Scalars['String']
};


export type QueryLookupStoreLinkSlugArgs = {
  slug: Scalars['String']
};

export type Refund = {
   __typename?: 'Refund',
  id: Scalars['ID'],
  transactionId: Scalars['ID'],
  orderId: Scalars['ID'],
  orderItemIds: Array<Scalars['ID']>,
  createdAt: Scalars['ID'],
  reason: Scalars['String'],
  reasonDetails?: Maybe<Scalars['String']>,
};

export type RefundOrderItem = {
  orderItemId?: Maybe<Scalars['ID']>,
  disableItem?: Maybe<Scalars['Boolean']>,
  refundPayoutItems?: Maybe<Array<Maybe<RefundPayoutItem>>>,
};

export type RefundPayoutItem = {
  payeeId?: Maybe<Scalars['ID']>,
  payeeType?: Maybe<PayeeType>,
  amount?: Maybe<Scalars['Int']>,
};

export type ResetPasswordResponse = {
   __typename?: 'ResetPasswordResponse',
  email?: Maybe<Scalars['String']>,
  expiresAt?: Maybe<Scalars['Date']>,
  resetId?: Maybe<Scalars['String']>,
};

export enum Role {
  ANON = 'ANON',
  USER = 'USER',
  PLATFORM_ADMIN = 'PLATFORM_ADMIN',
  SYSTEM = 'SYSTEM'
}

export type SalesBreakdown = {
   __typename?: 'SalesBreakdown',
  id: Scalars['ID'],
  actualPrice: Scalars['Int'],
};

export type SearchResultItem = ProductPublic | ProductPrivate;

export type SearchResultsConnection = PageBasedConnection & {
   __typename?: 'SearchResultsConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageBasedConnectionPageInfo,
  edges: Array<SearchResultsEdge>,
};

export type SearchResultsEdge = PageBasedConnectionEdge & {
   __typename?: 'SearchResultsEdge',
  pageNumber: Scalars['Int'],
  node: SearchResultItem,
};

export type SendgridResponse = {
   __typename?: 'SendgridResponse',
  verified?: Maybe<SendgridVerified>,
  status?: Maybe<SendgridStatus>,
};

export type SendgridStatus = {
   __typename?: 'SendgridStatus',
  message?: Maybe<Scalars['String']>,
};

export type SendgridVerified = {
   __typename?: 'SendgridVerified',
  id?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  username?: Maybe<Scalars['String']>,
  expiresAt?: Maybe<Scalars['Date']>,
};

export type SendResetPasswordResponse = {
   __typename?: 'SendResetPasswordResponse',
  resetId?: Maybe<Scalars['String']>,
  emailSentTo?: Maybe<Scalars['String']>,
  status?: Maybe<SendgridStatus>,
};

export type SignUpMutationResponse = {
   __typename?: 'SignUpMutationResponse',
  user: UserPrivate,
  sendgridResponse?: Maybe<SendgridResponse>,
  stripeCustomerCreationResponse?: Maybe<StripeCustomerCreationResponse>,
};

export type StockLevel = {
   __typename?: 'StockLevel',
  quantityAvailable: Scalars['Int'],
  restockedAt?: Maybe<Scalars['Date']>,
  quantityRestocked?: Maybe<Scalars['Int']>,
};

export type Store = {
  id: Scalars['ID'],
  createdAt: Scalars['Date'],
  updatedAt?: Maybe<Scalars['Date']>,
  userId: Scalars['ID'],
  name: Scalars['String'],
  profileId?: Maybe<Scalars['ID']>,
  profile?: Maybe<Image>,
  coverId?: Maybe<Scalars['ID']>,
  cover?: Maybe<Image>,
  bio?: Maybe<Scalars['String']>,
  website?: Maybe<Scalars['String']>,
  isSuspended: Scalars['Boolean'],
  isDeleted: Scalars['Boolean'],
  productsForSaleConnection: ProductsConnection,
  linkSlugs?: Maybe<PrimaryLinkSlugs>,
};


export type StoreProductsForSaleConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};

export type StoreAnalytics = {
   __typename?: 'StoreAnalytics',
  storeId: Scalars['ID'],
  payoutHistorySummaries: PayoutHistorySummaries,
  salesHistoryConnection: StoreSalesHistoryConnection,
};


export type StoreAnalyticsSalesHistoryConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};

export type StoreMutationResponse = {
   __typename?: 'StoreMutationResponse',
  store: StorePrivate,
};

export type StorePrivate = Store & {
   __typename?: 'StorePrivate',
  id: Scalars['ID'],
  createdAt: Scalars['Date'],
  updatedAt?: Maybe<Scalars['Date']>,
  userId: Scalars['ID'],
  name: Scalars['String'],
  profileId?: Maybe<Scalars['ID']>,
  profile?: Maybe<Image>,
  coverId?: Maybe<Scalars['ID']>,
  cover?: Maybe<Image>,
  bio?: Maybe<Scalars['String']>,
  website?: Maybe<Scalars['String']>,
  isSuspended: Scalars['Boolean'],
  isDeleted: Scalars['Boolean'],
  productsForSaleConnection: ProductsConnection,
  linkSlugs?: Maybe<PrimaryLinkSlugs>,
  dashboardPublishedProductsConnection: ProductsConnection,
  dashboardUnpublishedProductsConnection?: Maybe<ProductsConnection>,
  promoCodeDiscounts: DiscountsConnection,
  analytics: StoreAnalytics,
  user: UserPrivate,
  payoutSplit?: Maybe<PayoutSplit>,
};


export type StorePrivateProductsForSaleConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};


export type StorePrivateDashboardPublishedProductsConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};


export type StorePrivateDashboardUnpublishedProductsConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};


export type StorePrivatePromoCodeDiscountsArgs = {
  query?: Maybe<ConnectionQuery>
};

export type StorePublic = Store & {
   __typename?: 'StorePublic',
  id: Scalars['ID'],
  createdAt: Scalars['Date'],
  updatedAt?: Maybe<Scalars['Date']>,
  userId: Scalars['ID'],
  name: Scalars['String'],
  profileId?: Maybe<Scalars['ID']>,
  profile?: Maybe<Image>,
  coverId?: Maybe<Scalars['ID']>,
  cover?: Maybe<Image>,
  bio?: Maybe<Scalars['String']>,
  website?: Maybe<Scalars['String']>,
  isSuspended: Scalars['Boolean'],
  isDeleted: Scalars['Boolean'],
  productsForSaleConnection: ProductsConnection,
  user: UserPublic,
  linkSlugs?: Maybe<PrimaryLinkSlugs>,
};


export type StorePublicProductsForSaleConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};

export type StoreSales = {
   __typename?: 'StoreSales',
  storeId: Scalars['ID'],
  itemCount: Scalars['Int'],
  totalSalesRevenue: Scalars['Int'],
  salesBreakdown: Array<SalesBreakdown>,
  salesItems: Array<OrderItem>,
};

export type StoreSalesEdge = Edge & {
   __typename?: 'StoreSalesEdge',
  cursor: Scalars['PageCursor'],
  node: StoreSales,
};

export type StoreSalesHistoryConnection = Connection & {
   __typename?: 'StoreSalesHistoryConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges: Array<ProductSalesEdge>,
};

export type StoreSalesInPeriodConnection = Connection & {
   __typename?: 'StoreSalesInPeriodConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges: Array<StoreSalesEdge>,
};

export type StoresConnection = Connection & {
   __typename?: 'StoresConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges: Array<StoresEdge>,
};

export type StoreScopedDiscountInfo = {
   __typename?: 'StoreScopedDiscountInfo',
  storeId: Scalars['ID'],
  productId?: Maybe<Scalars['ID']>,
  variantId?: Maybe<Scalars['ID']>,
  minimumSpend?: Maybe<Scalars['Price']>,
  minimumQuantity?: Maybe<Scalars['Int']>,
};

export type StoresEdge = Edge & {
   __typename?: 'StoresEdge',
  cursor: Scalars['PageCursor'],
  node: Store,
};

export type StripeCustomerCreationResponse = {
   __typename?: 'StripeCustomerCreationResponse',
  status?: Maybe<Scalars['String']>,
  response?: Maybe<StripeCustomerProfile>,
  endpoint?: Maybe<Scalars['String']>,
};

export type StripeCustomerProfile = {
   __typename?: 'StripeCustomerProfile',
  id?: Maybe<Scalars['String']>,
  balance?: Maybe<Scalars['Int']>,
  created?: Maybe<Scalars['Date']>,
  currency?: Maybe<Scalars['String']>,
  defaultSource?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type SummaryStatistics = {
   __typename?: 'SummaryStatistics',
  amountSum: Scalars['Int'],
  count: Scalars['Int'],
};

export type Transaction = {
   __typename?: 'Transaction',
  id: Scalars['ID'],
  orderId: Scalars['ID'],
  subtotal: Scalars['Price'],
  taxes: Scalars['Price'],
  paymentProcessingFee: Scalars['Price'],
  currency?: Maybe<Scalars['String']>,
  customerId?: Maybe<Scalars['ID']>,
  createdAt: Scalars['Date'],
  paymentProcessor: PaymentProcessor,
  paymentMethodId: Scalars['ID'],
  paymentMethod?: Maybe<PaymentMethod>,
  paymentIntentId?: Maybe<Scalars['ID']>,
  chargeId: Scalars['ID'],
  details?: Maybe<Scalars['String']>,
  refundId?: Maybe<Scalars['ID']>,
  refund?: Maybe<Refund>,
};

export type TransactionsConnection = Connection & {
   __typename?: 'TransactionsConnection',
  totalCount?: Maybe<Scalars['Int']>,
  totalAmount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges: Array<TransactionsEdge>,
};

export type TransactionsEdge = Edge & {
   __typename?: 'TransactionsEdge',
  cursor: Scalars['PageCursor'],
  node: Transaction,
};

export type UploadRegisterMutationResponse = {
   __typename?: 'UploadRegisterMutationResponse',
  uploadId: Scalars['ID'],
  putUrl: Scalars['String'],
};

export type UploadSaveImageMutationResponse = {
   __typename?: 'UploadSaveImageMutationResponse',
  image: Image,
};

export type UploadSaveProductFileMutationResponse = {
   __typename?: 'UploadSaveProductFileMutationResponse',
  fileId: Scalars['ID'],
};

export enum UploadType {
  IMAGE = 'IMAGE',
  PRODUCT_FILE = 'PRODUCT_FILE'
}

export type User = {
  id: Scalars['ID'],
  createdAt: Scalars['Date'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  email: Scalars['String'],
};

export type UserMutationResponse = {
   __typename?: 'UserMutationResponse',
  user: UserPrivate,
};

export type UserPrivate = User & {
   __typename?: 'UserPrivate',
  id: Scalars['ID'],
  createdAt: Scalars['Date'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  username?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['Date']>,
  email: Scalars['String'],
  emailVerified?: Maybe<Scalars['Boolean']>,
  stripeCustomerId: Scalars['String'],
  paypalCustomerId?: Maybe<Scalars['String']>,
  userRole: Role,
  subscribedNewsletters?: Maybe<Array<Maybe<Scalars['ID']>>>,
  cartId: Scalars['ID'],
  cart: Cart,
  orderHistoryConnection: OrdersConnection,
  downloadsConnection: DownloadsConnection,
  paymentMethodIds: Array<Scalars['ID']>,
  paymentMethods: Array<PaymentMethod>,
  defaultPaymentMethodId?: Maybe<Scalars['ID']>,
  defaultPaymentMethod?: Maybe<PaymentMethod>,
  isSuspended: Scalars['Boolean'],
  storeId?: Maybe<Scalars['ID']>,
  store?: Maybe<StorePrivate>,
  payoutMethodId?: Maybe<Scalars['ID']>,
  payoutMethod?: Maybe<PayoutMethod>,
  payoutHistoryConnection: PayoutsConnection,
  wishlistItemsConnection: WishlistItemsConnection,
  followingStoresIds: Array<Scalars['ID']>,
  followingStores: Array<StorePublic>,
};


export type UserPrivateOrderHistoryConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};


export type UserPrivateDownloadsConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};


export type UserPrivatePayoutHistoryConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};


export type UserPrivateWishlistItemsConnectionArgs = {
  query?: Maybe<ConnectionQuery>
};

export type UserPublic = User & {
   __typename?: 'UserPublic',
  id: Scalars['ID'],
  createdAt: Scalars['Date'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  email: Scalars['String'],
};

export type UserWithRole = User & {
   __typename?: 'UserWithRole',
  id: Scalars['ID'],
  createdAt: Scalars['Date'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  userRole: Role,
};

export enum VariantsLabel {
  VARIANT = 'VARIANT',
  LICENSE = 'LICENSE'
}

export type WishlistItem = {
   __typename?: 'WishlistItem',
  ownerUserId: Scalars['ID'],
  addedAt: Scalars['Date'],
  product: Product,
};

export type WishlistItemsConnection = Connection & {
   __typename?: 'WishlistItemsConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges: Array<WishlistItemsEdge>,
};

export type WishlistItemsEdge = Edge & {
   __typename?: 'WishlistItemsEdge',
  cursor: Scalars['PageCursor'],
  node: WishlistItem,
};





export type AddProductsToCartMutationVariables = {
  cartId: Scalars['ID'],
  productProductVariantIds: Array<ProductProductVariantId>
};


export type AddProductsToCartMutation = { __typename?: 'Mutation', addProductsToCart: (
    { __typename?: 'Cart' }
    & CartFragment
  ) };

export type RemoveProductsFromCartMutationVariables = {
  cartId: Scalars['ID'],
  productProductVariantIds: Array<ProductProductVariantId>
};


export type RemoveProductsFromCartMutation = { __typename?: 'Mutation', removeProductsFromCart: (
    { __typename?: 'Cart' }
    & CartFragment
  ) };

export type AddPromoCodeToCartMutationVariables = {
  code: Scalars['String']
};


export type AddPromoCodeToCartMutation = { __typename?: 'Mutation', addPromoCodeToCart: { __typename?: 'CartMutationResponse', cart: (
      { __typename?: 'Cart' }
      & CartFragment
    ) } };

export type RemovePromoCodeFromCartMutationVariables = {
  discountId: Scalars['ID']
};


export type RemovePromoCodeFromCartMutation = { __typename?: 'Mutation', removePromoCodeFromCart: { __typename?: 'CartMutationResponse', cart: (
      { __typename?: 'Cart' }
      & CartFragment
    ) } };

export type GetUserCartQueryVariables = {};


export type GetUserCartQuery = { __typename?: 'Query', user: Maybe<{ __typename?: 'UserPrivate', id: string, cart: (
      { __typename?: 'Cart' }
      & CartFragment
    ) } | { __typename?: 'UserPublic', id: string } | { __typename?: 'UserWithRole', id: string }> };

export type TryPromoCodeQueryVariables = {
  code: Scalars['String'],
  cartProductsInfo: Array<ProductProductVariantId>
};


export type TryPromoCodeQuery = { __typename?: 'Query', tryPromoCode: Maybe<(
    { __typename?: 'Discount' }
    & DiscountFragment
  )> };

export type GetProductCategoriesQueryVariables = {};


export type GetProductCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'ProductCategory', id: string, name: string, createdAt: any, updatedAt: Maybe<any>, categoryGroup: Maybe<any> }> };

export type RegisterUploadMutationVariables = {
  uploadType: UploadType,
  mimeType: Scalars['String'],
  fileSize: Scalars['Int']
};


export type RegisterUploadMutation = { __typename?: 'Mutation', uploadRegister: { __typename?: 'UploadRegisterMutationResponse', uploadId: string, putUrl: string } };

export type SaveImageUploadMutationVariables = {
  uploadId: Scalars['ID'],
  description?: Maybe<Scalars['String']>,
  tags?: Maybe<Array<Maybe<Scalars['String']>>>,
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type SaveImageUploadMutation = { __typename?: 'Mutation', uploadSaveImage: { __typename?: 'UploadSaveImageMutationResponse', image: (
      { __typename?: 'Image' }
      & ImageFragment
    ) } };

export type SaveProductFileUploadMutationVariables = {
  uploadId: Scalars['ID'],
  fileName: Scalars['String'],
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type SaveProductFileUploadMutation = { __typename?: 'Mutation', uploadSaveProductFile: { __typename?: 'UploadSaveProductFileMutationResponse', fileId: string } };

export type GetProductFileDownloadLinkMutationVariables = {
  id: Scalars['ID'],
  orderItemId: Scalars['ID']
};


export type GetProductFileDownloadLinkMutation = { __typename?: 'Mutation', generateProductFileDownloadLink: { __typename?: 'ProductFileLinkMutationResponse', downloadLink: { __typename?: 'ProductFileDownloadLink', productFileId: string, expiresAt: any, url: string } } };

export type GetDownloadsQueryVariables = {
  query?: Maybe<ConnectionQuery>
};


export type GetDownloadsQuery = { __typename?: 'Query', user: Maybe<{ __typename?: 'UserPrivate', id: string, downloadsConnection: { __typename?: 'DownloadsConnection', totalCount: Maybe<number>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor: Maybe<any> }, edges: Array<{ __typename?: 'DownloadsEdge', cursor: any, node: { __typename?: 'Download', product: (
            { __typename?: 'ProductPublic' }
            & ProductFragment_ProductPublic_
          ) | (
            { __typename?: 'ProductPrivate' }
            & ProductFragment_ProductPrivate_
          ), order: (
            { __typename?: 'Order', currentSnapshot: { __typename?: 'OrderSnapshot', transaction: Maybe<{ __typename?: 'Transaction', id: string, createdAt: any, subtotal: any, paymentProcessingFee: any, taxes: any, paymentProcessor: PaymentProcessor, customerId: Maybe<string>, currency: Maybe<string>, paymentMethodId: string, paymentIntentId: Maybe<string>, chargeId: string, paymentMethod: Maybe<(
                  { __typename?: 'PaymentMethod' }
                  & PaymentMethodFragment
                )> }> } }
            & OrderFragment
          ) } }> } } | { __typename?: 'UserPublic', id: string } | { __typename?: 'UserWithRole', id: string }> };

export type StockLevelFragment = { __typename?: 'StockLevel', quantityAvailable: number, restockedAt: Maybe<any>, quantityRestocked: Maybe<number> };

export type StockLimitConditionFragment = { __typename?: 'DiscountStockLimitCondition', supplyExhaustionRule: DiscountUnavailableRule, stockLevel: (
    { __typename?: 'StockLevel' }
    & StockLevelFragment
  ) };

export type TimeConditionFragment = { __typename?: 'DiscountTimeCondition', start: Maybe<any>, end: any, timeExpiryRule: DiscountUnavailableRule };

export type DiscountFragment = { __typename?: 'Discount', id: string, createdAt: any, scope: DiscountScope, modifier: DiscountModifier, isAutomatic: boolean, promoCode: Maybe<string>, valueFixed: Maybe<any>, valueDollarsOff: Maybe<any>, valuePercentageOff: Maybe<number>, isDisabled: boolean, timeCondition: Maybe<(
    { __typename?: 'DiscountTimeCondition' }
    & TimeConditionFragment
  )>, productScopeInfo: Maybe<{ __typename?: 'ProductScopedDiscountInfo', variantSnapshotId: Maybe<string>, stockLimitCondition: Maybe<(
      { __typename?: 'DiscountStockLimitCondition' }
      & StockLimitConditionFragment
    )> }>, storeScopeInfo: Maybe<{ __typename?: 'StoreScopedDiscountInfo', storeId: string, productId: Maybe<string>, variantId: Maybe<string>, minimumSpend: Maybe<any>, minimumQuantity: Maybe<number> }>, platformScopeInfo: Maybe<{ __typename?: 'PlatformScopedDiscountInfo', isApplicableToAnyProduct: boolean }> };

export type PriceDetailsFragment = { __typename?: 'PriceDetails', basePrice: any, actualPrice: any, discountBreakdown: Maybe<{ __typename?: 'PriceDetailsDiscountBreakdown', fixedPriceComponent: any, dollarsOffComponent: any, percentOffComponent: any, promoCodeComponent: any, fixedPriceDiscount: Maybe<(
      { __typename?: 'Discount' }
      & DiscountFragment
    )>, dollarsOffDiscounts: Array<(
      { __typename?: 'Discount' }
      & DiscountFragment
    )>, percentOffDiscount: Maybe<(
      { __typename?: 'Discount' }
      & DiscountFragment
    )> }> };

export type ImageFragment = { __typename?: 'Image', id: string, createdAt: any, tags: Maybe<Array<string>>, description: Maybe<string>, original: { __typename?: 'ImageVariant', id: string, url: string, mimeType: string, heightInPixels: number, widthInPixels: number, sizeInBytes: number }, variants: Array<{ __typename?: 'ImageVariant', id: string, mimeType: string, sizeInBytes: number, widthInPixels: number, heightInPixels: number }> };

export type ProductVariantFragment = { __typename?: 'ProductVariant', variantId: string, variantSnapshotId: string, createdAt: any, variantName: string, variantDescription: Maybe<string>, isDefault: boolean, price: any, priceWas: Maybe<any>, isSoldOut: boolean, priceDetails: (
    { __typename?: 'PriceDetails' }
    & PriceDetailsFragment
  ), relevantDiscounts: Maybe<Array<Maybe<(
    { __typename?: 'Discount' }
    & DiscountFragment
  )>>>, files: Array<{ __typename?: 'ProductFile', id: string, fileName: Maybe<string>, createdAt: any, mimeType: string, sizeInBytes: number }>, previewItems: Array<{ __typename?: 'ProductPreviewItem', id: string, youTubeEmbedLink: Maybe<string>, image: Maybe<(
      { __typename?: 'Image' }
      & ImageFragment
    )> }>, baseStockLevel: Maybe<(
    { __typename?: 'StockLevel' }
    & StockLevelFragment
  )>, currentStockLevel: Maybe<(
    { __typename?: 'StockLevel' }
    & StockLevelFragment
  )>, specialDeal: Maybe<{ __typename?: 'ProductSpecialDeal', discountedPrice: any, timeCondition: Maybe<(
      { __typename?: 'DiscountTimeCondition' }
      & TimeConditionFragment
    )>, stockLimitCondition: Maybe<(
      { __typename?: 'DiscountStockLimitCondition' }
      & StockLimitConditionFragment
    )> }> };

type ProductFragment_ProductPublic_ = { __typename?: 'ProductPublic', id: string, createdAt: any, updatedAt: Maybe<any>, tags: Array<string>, isPublished: boolean, isSuspended: boolean, isDeleted: boolean, isExcludedFromAutomaticLists: boolean, name: string, tagline: string, description: string, variantsLabel: VariantsLabel, isQuantityEnabled: boolean, quantityLabel: QuantityLabel, currentVariants: Array<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )>, featuredVariant: Maybe<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )>, chosenVariant: Maybe<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )>, store: { __typename?: 'StorePrivate', id: string, name: string } | { __typename?: 'StorePublic', id: string, name: string }, category: { __typename?: 'ProductCategory', id: string, name: string, categoryGroup: Maybe<any> } };

type ProductFragment_ProductPrivate_ = { __typename?: 'ProductPrivate', id: string, createdAt: any, updatedAt: Maybe<any>, tags: Array<string>, isPublished: boolean, isSuspended: boolean, isDeleted: boolean, isExcludedFromAutomaticLists: boolean, name: string, tagline: string, description: string, variantsLabel: VariantsLabel, isQuantityEnabled: boolean, quantityLabel: QuantityLabel, currentVariants: Array<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )>, featuredVariant: Maybe<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )>, chosenVariant: Maybe<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )>, store: { __typename?: 'StorePrivate', id: string, name: string } | { __typename?: 'StorePublic', id: string, name: string }, category: { __typename?: 'ProductCategory', id: string, name: string, categoryGroup: Maybe<any> } };

export type ProductFragment = ProductFragment_ProductPublic_ | ProductFragment_ProductPrivate_;

export type CartFragment = { __typename?: 'Cart', id: string, userId: string, updatedAt: any, subtotal: any, automaticSavings: any, promoCodeSavings: any, taxes: any, paymentProcessingFee: any, total: any, items: Array<{ __typename?: 'CartItem', id: string, createdAt: any, cartId: string, storeId: string, purchasableStatus: CartItemPurchasableStatus, quantity: number, priceDetails: (
      { __typename?: 'PriceDetails' }
      & PriceDetailsFragment
    ), product: (
      { __typename?: 'ProductPublic' }
      & ProductFragment_ProductPublic_
    ) | (
      { __typename?: 'ProductPrivate' }
      & ProductFragment_ProductPrivate_
    ) }>, relevantPromoCodes: Array<(
    { __typename?: 'Discount' }
    & DiscountFragment
  )> };

export type OrderFragment = { __typename?: 'Order', id: string, createdAt: any, updatedAt: Maybe<any>, userId: Maybe<string>, items: Array<{ __typename?: 'OrderItem', id: string, orderId: string, orderStatus: OrderStatus, createdAt: any, updatedAt: Maybe<any>, quantity: Maybe<number>, priceDetails: (
      { __typename?: 'PriceDetails' }
      & PriceDetailsFragment
    ), product: { __typename?: 'ProductPublic', id: string, name: string, tagline: string, store: { __typename?: 'StorePrivate', id: string, name: string, website: Maybe<string> } | { __typename?: 'StorePublic', id: string, name: string, website: Maybe<string> }, chosenVariant: Maybe<(
        { __typename?: 'ProductVariant' }
        & ProductVariantFragment
      )> } | { __typename?: 'ProductPrivate', id: string, name: string, tagline: string, store: { __typename?: 'StorePrivate', id: string, name: string, website: Maybe<string> } | { __typename?: 'StorePublic', id: string, name: string, website: Maybe<string> }, chosenVariant: Maybe<(
        { __typename?: 'ProductVariant' }
        & ProductVariantFragment
      )> } }>, currentSnapshot: { __typename?: 'OrderSnapshot', id: string, orderStatus: OrderStatus, subtotal: any, automaticSavings: any, promoCodeSavings: any, paymentProcessingFee: any, taxes: any, total: any, paymentProcessor: Maybe<PaymentProcessor>, transaction: Maybe<{ __typename?: 'Transaction', id: string, createdAt: any, subtotal: any, paymentProcessingFee: any, taxes: any, paymentProcessor: PaymentProcessor, customerId: Maybe<string>, currency: Maybe<string>, paymentMethodId: string, paymentIntentId: Maybe<string>, chargeId: string }> }, attachedPromoCodes: Array<(
    { __typename?: 'Discount' }
    & DiscountFragment
  )> };

export type ProductSalesFragment = { __typename?: 'ProductSale', orderItem: { __typename?: 'OrderItem', id: string, orderId: string, orderStatus: OrderStatus, createdAt: any, product: { __typename?: 'ProductPublic', id: string, name: string, tagline: string, chosenVariant: Maybe<{ __typename?: 'ProductVariant', variantId: string, variantSnapshotId: string, variantName: string, variantDescription: Maybe<string> }> } | { __typename?: 'ProductPrivate', id: string, name: string, tagline: string, chosenVariant: Maybe<{ __typename?: 'ProductVariant', variantId: string, variantSnapshotId: string, variantName: string, variantDescription: Maybe<string> }> }, priceDetails: (
      { __typename?: 'PriceDetails' }
      & PriceDetailsFragment
    ) }, user: Maybe<{ __typename?: 'UserPublic', firstName: Maybe<string>, lastName: Maybe<string>, email: string }> };

type StorePublicFragment_StorePrivate_ = { __typename?: 'StorePrivate', id: string, createdAt: any, updatedAt: Maybe<any>, name: string, bio: Maybe<string>, website: Maybe<string>, cover: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )>, profile: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )>, productsForSaleConnection: { __typename?: 'ProductsConnection', totalCount: Maybe<number>, edges: Array<{ __typename?: 'ProductsEdge', node: (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) | (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) }>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor: Maybe<any> } } };

type StorePublicFragment_StorePublic_ = { __typename?: 'StorePublic', id: string, createdAt: any, updatedAt: Maybe<any>, name: string, bio: Maybe<string>, website: Maybe<string>, cover: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )>, profile: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )>, productsForSaleConnection: { __typename?: 'ProductsConnection', totalCount: Maybe<number>, edges: Array<{ __typename?: 'ProductsEdge', node: (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) | (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) }>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor: Maybe<any> } } };

export type StorePublicFragment = StorePublicFragment_StorePrivate_ | StorePublicFragment_StorePublic_;

export type StorePrivateFragment = { __typename?: 'StorePrivate', id: string, name: string, createdAt: any, updatedAt: Maybe<any>, website: Maybe<string>, bio: Maybe<string>, cover: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )>, profile: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )>, dashboardPublishedProductsConnection: { __typename?: 'ProductsConnection', totalCount: Maybe<number>, edges: Array<{ __typename?: 'ProductsEdge', node: (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) | (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) }>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor: Maybe<any> } }, dashboardUnpublishedProductsConnection: Maybe<{ __typename?: 'ProductsConnection', totalCount: Maybe<number>, edges: Array<{ __typename?: 'ProductsEdge', node: (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) | (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) }>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor: Maybe<any> } }>, productsForSaleConnection: { __typename?: 'ProductsConnection', totalCount: Maybe<number>, edges: Array<{ __typename?: 'ProductsEdge', node: (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) | (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) }>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor: Maybe<any> } }, promoCodeDiscounts: { __typename?: 'DiscountsConnection', edges: Array<{ __typename?: 'DiscountsEdge', node: (
        { __typename?: 'Discount' }
        & DiscountFragment
      ) }> } };

export type PaymentMethodFragment = { __typename?: 'PaymentMethod', id: string, userId: string, createdAt: any, updatedAt: Maybe<any>, customerId: Maybe<string>, paymentProcessor: Maybe<PaymentProcessor>, paymentMethodTypes: Maybe<Array<Maybe<string>>>, last4: Maybe<string>, expMonth: Maybe<string>, expYear: Maybe<string>, email: Maybe<string>, name: Maybe<string>, details: Maybe<string> };

export type UserPrivateFragment = { __typename?: 'UserPrivate', id: string, isSuspended: boolean, firstName: Maybe<string>, lastName: Maybe<string>, email: string, stripeCustomerId: string, paypalCustomerId: Maybe<string>, subscribedNewsletters: Maybe<Array<Maybe<string>>>, emailVerified: Maybe<boolean>, userRole: Role, payoutMethod: Maybe<{ __typename?: 'PayoutMethod', id: string, payoutType: Maybe<string>, payoutEmail: Maybe<string>, payoutProcessor: Maybe<string>, payoutProcessorId: Maybe<string> }>, wishlistItemsConnection: { __typename?: 'WishlistItemsConnection', edges: Array<{ __typename?: 'WishlistItemsEdge', node: { __typename?: 'WishlistItem', addedAt: any, product: (
          { __typename?: 'ProductPublic' }
          & ProductFragment_ProductPublic_
        ) | (
          { __typename?: 'ProductPrivate' }
          & ProductFragment_ProductPrivate_
        ) } }> } };

export type CheckoutProductsMutationVariables = {
  productsInfo: Array<ProductProductVariantId>,
  promoCodesToAdd?: Maybe<Array<Scalars['String']>>,
  quotedPrice: Scalars['Price'],
  paymentProcessorData: Scalars['String']
};


export type CheckoutProductsMutation = { __typename?: 'Mutation', checkoutProducts: { __typename?: 'OrderCreateMutationResponse', unconfirmedOrder: (
      { __typename?: 'Order' }
      & OrderFragment
    ) } };

export type CheckoutCartForFrontendPaymentMutationVariables = {
  quotedPrice: Scalars['Price']
};


export type CheckoutCartForFrontendPaymentMutation = { __typename?: 'Mutation', checkoutCartForFrontendPayment: { __typename?: 'OrderMutationResponse', order: (
      { __typename?: 'Order' }
      & OrderFragment
    ) } };

export type CheckoutProductsForFrontendPaymentMutationVariables = {
  productsInfo: Array<ProductProductVariantId>,
  promoCodesToAdd?: Maybe<Array<Scalars['String']>>,
  quotedPrice: Scalars['Price']
};


export type CheckoutProductsForFrontendPaymentMutation = { __typename?: 'Mutation', checkoutProductsForFrontendPayment: { __typename?: 'OrderMutationResponse', order: (
      { __typename?: 'Order' }
      & OrderFragment
    ) } };

export type ConfirmOrderAfterFrontendPaymentMutationVariables = {
  orderId: Scalars['ID'],
  paymentProcessorData: Scalars['String']
};


export type ConfirmOrderAfterFrontendPaymentMutation = { __typename?: 'Mutation', confirmOrderAfterFrontendPayment: { __typename?: 'OrderMutationResponse', order: (
      { __typename?: 'Order' }
      & OrderFragment
    ) } };

export type GetOrderAsAdminQueryVariables = {
  orderId: Scalars['ID']
};


export type GetOrderAsAdminQuery = { __typename?: 'Query', getOrderAsAdmin: Maybe<(
    { __typename?: 'Order' }
    & OrderFragment
  )> };

export type GetRecentTransactionsQueryVariables = {
  count: Scalars['Int']
};


export type GetRecentTransactionsQuery = { __typename?: 'Query', getRecentTransactions: Array<{ __typename?: 'Transaction', id: string, orderId: string, chargeId: string, createdAt: any, subtotal: any, paymentProcessingFee: any, currency: Maybe<string> }> };

export type AddPaymentMethodMutationVariables = {
  paymentMethodId: Scalars['ID'],
  customerId: Scalars['ID']
};


export type AddPaymentMethodMutation = { __typename?: 'Mutation', addPaymentMethod: { __typename?: 'AddRemovePaymentMethodResponse', user: (
      { __typename?: 'UserPrivate' }
      & UserPrivateFragment
    ) } };

export type RemovePaymentMethodMutationVariables = {
  paymentMethodId: Scalars['ID'],
  customerId: Scalars['ID']
};


export type RemovePaymentMethodMutation = { __typename?: 'Mutation', removePaymentMethod: { __typename?: 'AddRemovePaymentMethodResponse', user: (
      { __typename?: 'UserPrivate' }
      & UserPrivateFragment
    ) } };

export type SetDefaultPaymentMethodMutationVariables = {
  paymentMethodId: Scalars['ID'],
  customerId: Scalars['ID']
};


export type SetDefaultPaymentMethodMutation = { __typename?: 'Mutation', setDefaultPaymentMethod: { __typename?: 'AddRemovePaymentMethodResponse', user: (
      { __typename?: 'UserPrivate' }
      & UserPrivateFragment
    ) } };

export type GetUserPaymentMethodsQueryVariables = {};


export type GetUserPaymentMethodsQuery = { __typename?: 'Query', user: Maybe<{ __typename?: 'UserPrivate', id: string, paymentMethods: Array<(
      { __typename?: 'PaymentMethod' }
      & PaymentMethodFragment
    )>, defaultPaymentMethod: Maybe<(
      { __typename?: 'PaymentMethod' }
      & PaymentMethodFragment
    )> } | { __typename?: 'UserPublic' } | { __typename?: 'UserWithRole' }> };

export type CreateProductMutationVariables = {
  productCreateInput?: Maybe<ProductCreateInput>
};


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'ProductMutationResponse', product: { __typename?: 'ProductPublic', id: string, isSuspended: boolean, isPublished: boolean, isDeleted: boolean, isExcludedFromAutomaticLists: boolean, tags: Array<string>, name: string, tagline: string, description: string, createdAt: any, updatedAt: Maybe<any>, category: { __typename?: 'ProductCategory', id: string, name: string, categoryGroup: Maybe<any> }, currentVariants: Array<{ __typename?: 'ProductVariant', variantId: string, variantName: string, variantDescription: Maybe<string>, isDefault: boolean, previewItems: Array<{ __typename?: 'ProductPreviewItem', id: string, youTubeEmbedLink: Maybe<string>, image: Maybe<(
            { __typename?: 'Image' }
            & ImageFragment
          )> }>, files: Array<{ __typename?: 'ProductFile', id: string, fileName: Maybe<string>, mimeType: string, sizeInBytes: number, createdAt: any }> }> } | { __typename?: 'ProductPrivate', id: string, isSuspended: boolean, isPublished: boolean, isDeleted: boolean, isExcludedFromAutomaticLists: boolean, tags: Array<string>, name: string, tagline: string, description: string, createdAt: any, updatedAt: Maybe<any>, category: { __typename?: 'ProductCategory', id: string, name: string, categoryGroup: Maybe<any> }, currentVariants: Array<{ __typename?: 'ProductVariant', variantId: string, variantName: string, variantDescription: Maybe<string>, isDefault: boolean, previewItems: Array<{ __typename?: 'ProductPreviewItem', id: string, youTubeEmbedLink: Maybe<string>, image: Maybe<(
            { __typename?: 'Image' }
            & ImageFragment
          )> }>, files: Array<{ __typename?: 'ProductFile', id: string, fileName: Maybe<string>, mimeType: string, sizeInBytes: number, createdAt: any }> }> } } };

export type EditProductMutationVariables = {
  productEditInput?: Maybe<ProductEditInput>
};


export type EditProductMutation = { __typename?: 'Mutation', editProduct: { __typename?: 'ProductMutationResponse', product: { __typename?: 'ProductPublic', id: string, isSuspended: boolean, isPublished: boolean, isDeleted: boolean, isExcludedFromAutomaticLists: boolean, tags: Array<string>, name: string, tagline: string, description: string, createdAt: any, updatedAt: Maybe<any>, category: { __typename?: 'ProductCategory', id: string, name: string, categoryGroup: Maybe<any> }, currentVariants: Array<{ __typename?: 'ProductVariant', variantId: string, variantName: string, variantDescription: Maybe<string>, isDefault: boolean, previewItems: Array<{ __typename?: 'ProductPreviewItem', id: string, youTubeEmbedLink: Maybe<string>, image: Maybe<(
            { __typename?: 'Image' }
            & ImageFragment
          )> }>, files: Array<{ __typename?: 'ProductFile', id: string, fileName: Maybe<string>, mimeType: string, sizeInBytes: number, createdAt: any }> }> } | { __typename?: 'ProductPrivate', id: string, isSuspended: boolean, isPublished: boolean, isDeleted: boolean, isExcludedFromAutomaticLists: boolean, tags: Array<string>, name: string, tagline: string, description: string, createdAt: any, updatedAt: Maybe<any>, category: { __typename?: 'ProductCategory', id: string, name: string, categoryGroup: Maybe<any> }, currentVariants: Array<{ __typename?: 'ProductVariant', variantId: string, variantName: string, variantDescription: Maybe<string>, isDefault: boolean, previewItems: Array<{ __typename?: 'ProductPreviewItem', id: string, youTubeEmbedLink: Maybe<string>, image: Maybe<(
            { __typename?: 'Image' }
            & ImageFragment
          )> }>, files: Array<{ __typename?: 'ProductFile', id: string, fileName: Maybe<string>, mimeType: string, sizeInBytes: number, createdAt: any }> }> } } };

export type GetRecommendedProductsQueryVariables = {
  query?: Maybe<ConnectionQuery>
};


export type GetRecommendedProductsQuery = { __typename?: 'Query', productsRecommendedConnection: { __typename?: 'ProductsConnection', totalCount: Maybe<number>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor: Maybe<any> }, edges: Array<{ __typename?: 'ProductsEdge', cursor: any, node: (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) | (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) }> } };

export type ProductsAllConnectionQueryVariables = {
  query?: Maybe<ConnectionQuery>
};


export type ProductsAllConnectionQuery = { __typename?: 'Query', productsAllConnection: { __typename?: 'ProductsConnection', totalCount: Maybe<number>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor: Maybe<any> }, edges: Array<{ __typename?: 'ProductsEdge', cursor: any, node: (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) | (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) }> } };

export type GetProductQueryVariables = {
  productId: Scalars['ID']
};


export type GetProductQuery = { __typename?: 'Query', product: Maybe<(
    { __typename?: 'ProductPublic', store: (
      { __typename?: 'StorePrivate' }
      & StorePublicFragment_StorePrivate_
    ) | (
      { __typename?: 'StorePublic' }
      & StorePublicFragment_StorePublic_
    ) }
    & ProductFragment_ProductPublic_
  ) | (
    { __typename?: 'ProductPrivate', store: (
      { __typename?: 'StorePrivate' }
      & StorePublicFragment_StorePrivate_
    ) | (
      { __typename?: 'StorePublic' }
      & StorePublicFragment_StorePublic_
    ) }
    & ProductFragment_ProductPrivate_
  )> };

export type ProductsDealsEndingSoonConnectionQueryVariables = {
  query?: Maybe<ConnectionQuery>
};


export type ProductsDealsEndingSoonConnectionQuery = { __typename?: 'Query', productsDealsEndingSoonConnection: { __typename?: 'ProductsConnection', totalCount: Maybe<number>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor: Maybe<any> }, edges: Array<{ __typename?: 'ProductsEdge', cursor: any, node: (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) | (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) }> } };

export type ProductsLimitedReleasesConnectionQueryVariables = {
  query?: Maybe<ConnectionQuery>
};


export type ProductsLimitedReleasesConnectionQuery = { __typename?: 'Query', productsLimitedReleasesConnection: { __typename?: 'ProductsConnection', totalCount: Maybe<number>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor: Maybe<any> }, edges: Array<{ __typename?: 'ProductsEdge', cursor: any, node: (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) | (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) }> } };

export type ProductsByCategoryConnectionQueryVariables = {
  categoryId?: Maybe<Scalars['ID']>,
  categoryName?: Maybe<Scalars['String']>,
  query?: Maybe<ConnectionQuery>
};


export type ProductsByCategoryConnectionQuery = { __typename?: 'Query', productsByCategoryConnection: Maybe<{ __typename?: 'ProductsConnection', totalCount: Maybe<number>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor: Maybe<any> }, edges: Array<{ __typename?: 'ProductsEdge', cursor: any, node: (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) | (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) }> }> };

export type SignUpUsingEmailMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String'],
  username?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  productProductVariantIds?: Maybe<Array<Maybe<ProductProductVariantId>>>,
  subscribedNewsletters?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type SignUpUsingEmailMutation = { __typename?: 'Mutation', signUpUsingEmail: { __typename?: 'SignUpMutationResponse', user: (
      { __typename?: 'UserPrivate' }
      & UserPrivateFragment
    ), sendgridResponse: Maybe<{ __typename?: 'SendgridResponse', verified: Maybe<{ __typename?: 'SendgridVerified', email: Maybe<string>, username: Maybe<string>, expiresAt: Maybe<any>, id: Maybe<string> }>, status: Maybe<{ __typename?: 'SendgridStatus', message: Maybe<string> }> }>, stripeCustomerCreationResponse: Maybe<{ __typename?: 'StripeCustomerCreationResponse', endpoint: Maybe<string>, status: Maybe<string>, response: Maybe<{ __typename?: 'StripeCustomerProfile', id: Maybe<string>, email: Maybe<string>, currency: Maybe<string>, created: Maybe<any>, balance: Maybe<number>, description: Maybe<string>, defaultSource: Maybe<string> }> }> } };

export type EditUserProfileMutationVariables = {
  username?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  subscribedNewsletterIds?: Maybe<Array<Maybe<Scalars['ID']>>>,
  payoutMethod?: Maybe<Scalars['String']>
};


export type EditUserProfileMutation = { __typename?: 'Mutation', editUserProfile: { __typename?: 'UserMutationResponse', user: (
      { __typename?: 'UserPrivate', id: string, lastName: Maybe<string>, firstName: Maybe<string>, username: Maybe<string>, email: string }
      & UserPrivateFragment
    ) } };

export type ChangePasswordMutationVariables = {
  currentPassword: Scalars['String'],
  newPassword: Scalars['String']
};


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserMutationResponse', user: { __typename?: 'UserPrivate', id: string, email: string } } };

export type SetPayoutMethodMutationVariables = {
  payoutType?: Maybe<Scalars['String']>,
  payoutEmail?: Maybe<Scalars['String']>,
  payoutProcessor?: Maybe<Scalars['String']>,
  payoutProcessorId?: Maybe<Scalars['String']>
};


export type SetPayoutMethodMutation = { __typename?: 'Mutation', setPayoutMethod: { __typename?: 'UserMutationResponse', user: (
      { __typename?: 'UserPrivate' }
      & UserPrivateFragment
    ) } };

export type LogOutMutationVariables = {};


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'BlankMutationResponse', success: boolean } };

export type LogInUsingEmailMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String'],
  productProductVariantIds?: Maybe<Array<Maybe<ProductProductVariantId>>>
};


export type LogInUsingEmailMutation = { __typename?: 'Mutation', logInUsingEmail: { __typename?: 'LoginMutationResponse', jwt: Maybe<string>, user: (
      { __typename?: 'UserPrivate' }
      & UserPrivateFragment
    ) } };

export type GetUserQueryVariables = {};


export type GetUserQuery = { __typename?: 'Query', user: Maybe<(
    { __typename?: 'UserPrivate', id: string, firstName: Maybe<string>, lastName: Maybe<string>, email: string }
    & UserPrivateFragment
  ) | { __typename?: 'UserPublic', id: string, firstName: Maybe<string>, lastName: Maybe<string>, email: string } | { __typename?: 'UserWithRole', id: string, firstName: Maybe<string>, lastName: Maybe<string>, email: string }> };

export type SendResetPasswordEmailMutationVariables = {
  email: Scalars['String']
};


export type SendResetPasswordEmailMutation = { __typename?: 'Mutation', sendResetPasswordEmail: { __typename?: 'SendResetPasswordResponse', resetId: Maybe<string>, emailSentTo: Maybe<string>, status: Maybe<{ __typename?: 'SendgridStatus', message: Maybe<string> }> } };

export type AddProductToWishlistMutationVariables = {
  productId: Scalars['ID'],
  variantId: Scalars['ID']
};


export type AddProductToWishlistMutation = { __typename?: 'Mutation', addProductToWishlist: { __typename: 'BlankMutationResponse' } };

export type RemoveProductFromWishlistMutationVariables = {
  productId: Scalars['ID'],
  variantId: Scalars['ID']
};


export type RemoveProductFromWishlistMutation = { __typename?: 'Mutation', removeProductFromWishlist: { __typename: 'BlankMutationResponse' } };

export type WishlistItemsConnectionQueryVariables = {
  query: ConnectionQuery
};


export type WishlistItemsConnectionQuery = { __typename?: 'Query', wishlistItemsConnection: { __typename?: 'WishlistItemsConnection', totalCount: Maybe<number>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor: Maybe<any> }, edges: Array<{ __typename?: 'WishlistItemsEdge', cursor: any, node: { __typename?: 'WishlistItem', addedAt: any, product: (
          { __typename?: 'ProductPublic' }
          & ProductFragment_ProductPublic_
        ) | (
          { __typename?: 'ProductPrivate' }
          & ProductFragment_ProductPrivate_
        ) } }> } };

export const TimeConditionFragmentFragmentDoc = gql`
    fragment TimeConditionFragment on DiscountTimeCondition {
  start
  end
  timeExpiryRule
}
    `;
export const StockLevelFragmentFragmentDoc = gql`
    fragment StockLevelFragment on StockLevel {
  quantityAvailable
  restockedAt
  quantityRestocked
}
    `;
export const StockLimitConditionFragmentFragmentDoc = gql`
    fragment StockLimitConditionFragment on DiscountStockLimitCondition {
  stockLevel {
    ...StockLevelFragment
  }
  supplyExhaustionRule
}
    ${StockLevelFragmentFragmentDoc}`;
export const DiscountFragmentFragmentDoc = gql`
    fragment DiscountFragment on Discount {
  id
  createdAt
  scope
  modifier
  isAutomatic
  promoCode
  valueFixed
  valueDollarsOff
  valuePercentageOff
  isDisabled
  timeCondition {
    ...TimeConditionFragment
  }
  productScopeInfo {
    variantSnapshotId
    stockLimitCondition {
      ...StockLimitConditionFragment
    }
  }
  storeScopeInfo {
    storeId
    productId
    variantId
    minimumSpend
    minimumQuantity
  }
  platformScopeInfo {
    isApplicableToAnyProduct
  }
}
    ${TimeConditionFragmentFragmentDoc}
${StockLimitConditionFragmentFragmentDoc}`;
export const PriceDetailsFragmentFragmentDoc = gql`
    fragment PriceDetailsFragment on PriceDetails {
  basePrice
  actualPrice
  discountBreakdown {
    fixedPriceDiscount {
      ...DiscountFragment
    }
    dollarsOffDiscounts {
      ...DiscountFragment
    }
    percentOffDiscount {
      ...DiscountFragment
    }
    fixedPriceComponent
    dollarsOffComponent
    percentOffComponent
    promoCodeComponent
  }
}
    ${DiscountFragmentFragmentDoc}`;
export const ImageFragmentFragmentDoc = gql`
    fragment ImageFragment on Image {
  id
  original {
    id
    url
    mimeType
    heightInPixels
    widthInPixels
    sizeInBytes
  }
  variants {
    id
    mimeType
    sizeInBytes
    widthInPixels
    heightInPixels
  }
  createdAt
  tags
  description
}
    `;
export const ProductVariantFragmentFragmentDoc = gql`
    fragment ProductVariantFragment on ProductVariant {
  variantId
  variantSnapshotId
  createdAt
  variantName
  variantDescription
  isDefault
  price
  priceWas
  priceDetails {
    ...PriceDetailsFragment
  }
  relevantDiscounts {
    ...DiscountFragment
  }
  files {
    id
    fileName
    createdAt
    mimeType
    sizeInBytes
  }
  previewItems {
    id
    image {
      ...ImageFragment
    }
    youTubeEmbedLink
  }
  isSoldOut
  baseStockLevel {
    ...StockLevelFragment
  }
  currentStockLevel {
    ...StockLevelFragment
  }
  specialDeal {
    discountedPrice
    timeCondition {
      ...TimeConditionFragment
    }
    stockLimitCondition {
      ...StockLimitConditionFragment
    }
  }
}
    ${PriceDetailsFragmentFragmentDoc}
${DiscountFragmentFragmentDoc}
${ImageFragmentFragmentDoc}
${StockLevelFragmentFragmentDoc}
${TimeConditionFragmentFragmentDoc}
${StockLimitConditionFragmentFragmentDoc}`;
export const ProductFragmentFragmentDoc = gql`
    fragment ProductFragment on Product {
  id
  createdAt
  updatedAt
  tags
  isPublished
  isSuspended
  isDeleted
  isExcludedFromAutomaticLists
  name
  tagline
  description
  currentVariants {
    ...ProductVariantFragment
  }
  featuredVariant {
    ...ProductVariantFragment
  }
  chosenVariant {
    ...ProductVariantFragment
  }
  store {
    id
    name
  }
  category {
    id
    name
    categoryGroup
  }
  variantsLabel
  isQuantityEnabled
  quantityLabel
}
    ${ProductVariantFragmentFragmentDoc}`;
export const CartFragmentFragmentDoc = gql`
    fragment CartFragment on Cart {
  id
  userId
  updatedAt
  items {
    id
    createdAt
    cartId
    storeId
    priceDetails {
      ...PriceDetailsFragment
    }
    product {
      ...ProductFragment
    }
    purchasableStatus
    quantity
  }
  relevantPromoCodes {
    ...DiscountFragment
  }
  subtotal
  automaticSavings
  promoCodeSavings
  taxes
  paymentProcessingFee
  total
}
    ${PriceDetailsFragmentFragmentDoc}
${ProductFragmentFragmentDoc}
${DiscountFragmentFragmentDoc}`;
export const OrderFragmentFragmentDoc = gql`
    fragment OrderFragment on Order {
  id
  createdAt
  updatedAt
  userId
  items {
    id
    orderId
    orderStatus
    createdAt
    updatedAt
    priceDetails {
      ...PriceDetailsFragment
    }
    product {
      id
      name
      tagline
      store {
        id
        name
        website
      }
      chosenVariant {
        ...ProductVariantFragment
      }
    }
    quantity
  }
  currentSnapshot {
    transaction {
      id
      createdAt
      subtotal
      paymentProcessingFee
      taxes
      paymentProcessor
      customerId
      currency
      paymentMethodId
      paymentIntentId
      chargeId
    }
    id
    orderStatus
    subtotal
    automaticSavings
    promoCodeSavings
    paymentProcessingFee
    taxes
    total
    paymentProcessor
  }
  attachedPromoCodes {
    ...DiscountFragment
  }
}
    ${PriceDetailsFragmentFragmentDoc}
${ProductVariantFragmentFragmentDoc}
${DiscountFragmentFragmentDoc}`;
export const ProductSalesFragmentFragmentDoc = gql`
    fragment ProductSalesFragment on ProductSale {
  orderItem {
    id
    orderId
    product {
      id
      name
      tagline
      chosenVariant {
        variantId
        variantSnapshotId
        variantName
        variantDescription
      }
    }
    orderStatus
    createdAt
    priceDetails {
      ...PriceDetailsFragment
    }
  }
  user {
    firstName
    lastName
    email
  }
}
    ${PriceDetailsFragmentFragmentDoc}`;
export const StorePublicFragmentFragmentDoc = gql`
    fragment StorePublicFragment on Store {
  id
  createdAt
  updatedAt
  name
  bio
  website
  cover {
    ...ImageFragment
  }
  profile {
    ...ImageFragment
  }
  productsForSaleConnection {
    edges {
      node {
        ...ProductFragment
      }
    }
    totalCount
    pageInfo {
      isLastPage
      endCursor
    }
  }
}
    ${ImageFragmentFragmentDoc}
${ProductFragmentFragmentDoc}`;
export const StorePrivateFragmentFragmentDoc = gql`
    fragment StorePrivateFragment on StorePrivate {
  id
  name
  createdAt
  updatedAt
  website
  bio
  cover {
    ...ImageFragment
  }
  profile {
    ...ImageFragment
  }
  dashboardPublishedProductsConnection {
    edges {
      node {
        ...ProductFragment
      }
    }
    totalCount
    pageInfo {
      isLastPage
      endCursor
    }
  }
  dashboardUnpublishedProductsConnection {
    edges {
      node {
        ...ProductFragment
      }
    }
    totalCount
    pageInfo {
      isLastPage
      endCursor
    }
  }
  productsForSaleConnection {
    edges {
      node {
        ...ProductFragment
      }
    }
    totalCount
    pageInfo {
      isLastPage
      endCursor
    }
  }
  promoCodeDiscounts(query: {count: 20}) {
    edges {
      node {
        ...DiscountFragment
      }
    }
  }
}
    ${ImageFragmentFragmentDoc}
${ProductFragmentFragmentDoc}
${DiscountFragmentFragmentDoc}`;
export const PaymentMethodFragmentFragmentDoc = gql`
    fragment PaymentMethodFragment on PaymentMethod {
  id
  userId
  createdAt
  updatedAt
  customerId
  paymentProcessor
  paymentMethodTypes
  last4
  expMonth
  expYear
  email
  name
  details
}
    `;
export const UserPrivateFragmentFragmentDoc = gql`
    fragment UserPrivateFragment on UserPrivate {
  id
  isSuspended
  firstName
  lastName
  email
  stripeCustomerId
  paypalCustomerId
  subscribedNewsletters
  emailVerified
  userRole
  payoutMethod {
    id
    payoutType
    payoutEmail
    payoutProcessor
    payoutProcessorId
  }
  wishlistItemsConnection(query: {}) {
    edges {
      node {
        addedAt
        product {
          ...ProductFragment
        }
      }
    }
  }
}
    ${ProductFragmentFragmentDoc}`;
export const AddProductsToCartDocument = gql`
    mutation addProductsToCart($cartId: ID!, $productProductVariantIds: [ProductProductVariantId!]!) {
  addProductsToCart(cartId: $cartId, productProductVariantIds: $productProductVariantIds) {
    ...CartFragment
  }
}
    ${CartFragmentFragmentDoc}`;

/**
 * __useAddProductsToCartMutation__
 *
 * To run a mutation, you first call `useAddProductsToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductsToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductsToCartMutation, { data, loading, error }] = useAddProductsToCartMutation({
 *   variables: {
 *      cartId: // value for 'cartId'
 *      productProductVariantIds: // value for 'productProductVariantIds'
 *   },
 * });
 */
export function useAddProductsToCartMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddProductsToCartMutation, AddProductsToCartMutationVariables>) {
        return ApolloReactHooks.useMutation<AddProductsToCartMutation, AddProductsToCartMutationVariables>(AddProductsToCartDocument, baseOptions);
      }
export type AddProductsToCartMutationHookResult = ReturnType<typeof useAddProductsToCartMutation>;
export type AddProductsToCartMutationResult = ApolloReactCommon.MutationResult<AddProductsToCartMutation>;
export type AddProductsToCartMutationOptions = ApolloReactCommon.BaseMutationOptions<AddProductsToCartMutation, AddProductsToCartMutationVariables>;
export const RemoveProductsFromCartDocument = gql`
    mutation removeProductsFromCart($cartId: ID!, $productProductVariantIds: [ProductProductVariantId!]!) {
  removeProductsFromCart(cartId: $cartId, productProductVariantIds: $productProductVariantIds) {
    ...CartFragment
  }
}
    ${CartFragmentFragmentDoc}`;

/**
 * __useRemoveProductsFromCartMutation__
 *
 * To run a mutation, you first call `useRemoveProductsFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductsFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductsFromCartMutation, { data, loading, error }] = useRemoveProductsFromCartMutation({
 *   variables: {
 *      cartId: // value for 'cartId'
 *      productProductVariantIds: // value for 'productProductVariantIds'
 *   },
 * });
 */
export function useRemoveProductsFromCartMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveProductsFromCartMutation, RemoveProductsFromCartMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveProductsFromCartMutation, RemoveProductsFromCartMutationVariables>(RemoveProductsFromCartDocument, baseOptions);
      }
export type RemoveProductsFromCartMutationHookResult = ReturnType<typeof useRemoveProductsFromCartMutation>;
export type RemoveProductsFromCartMutationResult = ApolloReactCommon.MutationResult<RemoveProductsFromCartMutation>;
export type RemoveProductsFromCartMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveProductsFromCartMutation, RemoveProductsFromCartMutationVariables>;
export const AddPromoCodeToCartDocument = gql`
    mutation addPromoCodeToCart($code: String!) {
  addPromoCodeToCart(code: $code) {
    ... on CartMutationResponse {
      cart {
        ...CartFragment
      }
    }
  }
}
    ${CartFragmentFragmentDoc}`;

/**
 * __useAddPromoCodeToCartMutation__
 *
 * To run a mutation, you first call `useAddPromoCodeToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPromoCodeToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPromoCodeToCartMutation, { data, loading, error }] = useAddPromoCodeToCartMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useAddPromoCodeToCartMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddPromoCodeToCartMutation, AddPromoCodeToCartMutationVariables>) {
        return ApolloReactHooks.useMutation<AddPromoCodeToCartMutation, AddPromoCodeToCartMutationVariables>(AddPromoCodeToCartDocument, baseOptions);
      }
export type AddPromoCodeToCartMutationHookResult = ReturnType<typeof useAddPromoCodeToCartMutation>;
export type AddPromoCodeToCartMutationResult = ApolloReactCommon.MutationResult<AddPromoCodeToCartMutation>;
export type AddPromoCodeToCartMutationOptions = ApolloReactCommon.BaseMutationOptions<AddPromoCodeToCartMutation, AddPromoCodeToCartMutationVariables>;
export const RemovePromoCodeFromCartDocument = gql`
    mutation removePromoCodeFromCart($discountId: ID!) {
  removePromoCodeFromCart(discountId: $discountId) {
    ... on CartMutationResponse {
      cart {
        ...CartFragment
      }
    }
  }
}
    ${CartFragmentFragmentDoc}`;

/**
 * __useRemovePromoCodeFromCartMutation__
 *
 * To run a mutation, you first call `useRemovePromoCodeFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePromoCodeFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePromoCodeFromCartMutation, { data, loading, error }] = useRemovePromoCodeFromCartMutation({
 *   variables: {
 *      discountId: // value for 'discountId'
 *   },
 * });
 */
export function useRemovePromoCodeFromCartMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemovePromoCodeFromCartMutation, RemovePromoCodeFromCartMutationVariables>) {
        return ApolloReactHooks.useMutation<RemovePromoCodeFromCartMutation, RemovePromoCodeFromCartMutationVariables>(RemovePromoCodeFromCartDocument, baseOptions);
      }
export type RemovePromoCodeFromCartMutationHookResult = ReturnType<typeof useRemovePromoCodeFromCartMutation>;
export type RemovePromoCodeFromCartMutationResult = ApolloReactCommon.MutationResult<RemovePromoCodeFromCartMutation>;
export type RemovePromoCodeFromCartMutationOptions = ApolloReactCommon.BaseMutationOptions<RemovePromoCodeFromCartMutation, RemovePromoCodeFromCartMutationVariables>;
export const GetUserCartDocument = gql`
    query getUserCart {
  user {
    id
    ... on UserPrivate {
      cart {
        ...CartFragment
      }
    }
  }
}
    ${CartFragmentFragmentDoc}`;

/**
 * __useGetUserCartQuery__
 *
 * To run a query within a React component, call `useGetUserCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCartQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCartQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserCartQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserCartQuery, GetUserCartQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserCartQuery, GetUserCartQueryVariables>(GetUserCartDocument, baseOptions);
      }
export function useGetUserCartLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserCartQuery, GetUserCartQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserCartQuery, GetUserCartQueryVariables>(GetUserCartDocument, baseOptions);
        }
export type GetUserCartQueryHookResult = ReturnType<typeof useGetUserCartQuery>;
export type GetUserCartLazyQueryHookResult = ReturnType<typeof useGetUserCartLazyQuery>;
export type GetUserCartQueryResult = ApolloReactCommon.QueryResult<GetUserCartQuery, GetUserCartQueryVariables>;
export const TryPromoCodeDocument = gql`
    query tryPromoCode($code: String!, $cartProductsInfo: [ProductProductVariantId!]!) {
  tryPromoCode(code: $code, cartProductsInfo: $cartProductsInfo) {
    ...DiscountFragment
  }
}
    ${DiscountFragmentFragmentDoc}`;

/**
 * __useTryPromoCodeQuery__
 *
 * To run a query within a React component, call `useTryPromoCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useTryPromoCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTryPromoCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *      cartProductsInfo: // value for 'cartProductsInfo'
 *   },
 * });
 */
export function useTryPromoCodeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TryPromoCodeQuery, TryPromoCodeQueryVariables>) {
        return ApolloReactHooks.useQuery<TryPromoCodeQuery, TryPromoCodeQueryVariables>(TryPromoCodeDocument, baseOptions);
      }
export function useTryPromoCodeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TryPromoCodeQuery, TryPromoCodeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TryPromoCodeQuery, TryPromoCodeQueryVariables>(TryPromoCodeDocument, baseOptions);
        }
export type TryPromoCodeQueryHookResult = ReturnType<typeof useTryPromoCodeQuery>;
export type TryPromoCodeLazyQueryHookResult = ReturnType<typeof useTryPromoCodeLazyQuery>;
export type TryPromoCodeQueryResult = ApolloReactCommon.QueryResult<TryPromoCodeQuery, TryPromoCodeQueryVariables>;
export const GetProductCategoriesDocument = gql`
    query getProductCategories {
  categories {
    id
    name
    createdAt
    updatedAt
    categoryGroup
  }
}
    `;

/**
 * __useGetProductCategoriesQuery__
 *
 * To run a query within a React component, call `useGetProductCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProductCategoriesQuery, GetProductCategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetProductCategoriesQuery, GetProductCategoriesQueryVariables>(GetProductCategoriesDocument, baseOptions);
      }
export function useGetProductCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProductCategoriesQuery, GetProductCategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetProductCategoriesQuery, GetProductCategoriesQueryVariables>(GetProductCategoriesDocument, baseOptions);
        }
export type GetProductCategoriesQueryHookResult = ReturnType<typeof useGetProductCategoriesQuery>;
export type GetProductCategoriesLazyQueryHookResult = ReturnType<typeof useGetProductCategoriesLazyQuery>;
export type GetProductCategoriesQueryResult = ApolloReactCommon.QueryResult<GetProductCategoriesQuery, GetProductCategoriesQueryVariables>;
export const RegisterUploadDocument = gql`
    mutation registerUpload($uploadType: UploadType!, $mimeType: String!, $fileSize: Int!) {
  uploadRegister(uploadType: $uploadType, mimeType: $mimeType, fileSize: $fileSize) {
    ... on UploadRegisterMutationResponse {
      uploadId
      putUrl
    }
  }
}
    `;

/**
 * __useRegisterUploadMutation__
 *
 * To run a mutation, you first call `useRegisterUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUploadMutation, { data, loading, error }] = useRegisterUploadMutation({
 *   variables: {
 *      uploadType: // value for 'uploadType'
 *      mimeType: // value for 'mimeType'
 *      fileSize: // value for 'fileSize'
 *   },
 * });
 */
export function useRegisterUploadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterUploadMutation, RegisterUploadMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterUploadMutation, RegisterUploadMutationVariables>(RegisterUploadDocument, baseOptions);
      }
export type RegisterUploadMutationHookResult = ReturnType<typeof useRegisterUploadMutation>;
export type RegisterUploadMutationResult = ApolloReactCommon.MutationResult<RegisterUploadMutation>;
export type RegisterUploadMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterUploadMutation, RegisterUploadMutationVariables>;
export const SaveImageUploadDocument = gql`
    mutation saveImageUpload($uploadId: ID!, $description: String, $tags: [String], $ownerIds: [String]) {
  uploadSaveImage(uploadId: $uploadId, description: $description, tags: $tags, ownerIds: $ownerIds) {
    ... on UploadSaveImageMutationResponse {
      image {
        ...ImageFragment
      }
    }
  }
}
    ${ImageFragmentFragmentDoc}`;

/**
 * __useSaveImageUploadMutation__
 *
 * To run a mutation, you first call `useSaveImageUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveImageUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveImageUploadMutation, { data, loading, error }] = useSaveImageUploadMutation({
 *   variables: {
 *      uploadId: // value for 'uploadId'
 *      description: // value for 'description'
 *      tags: // value for 'tags'
 *      ownerIds: // value for 'ownerIds'
 *   },
 * });
 */
export function useSaveImageUploadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveImageUploadMutation, SaveImageUploadMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveImageUploadMutation, SaveImageUploadMutationVariables>(SaveImageUploadDocument, baseOptions);
      }
export type SaveImageUploadMutationHookResult = ReturnType<typeof useSaveImageUploadMutation>;
export type SaveImageUploadMutationResult = ApolloReactCommon.MutationResult<SaveImageUploadMutation>;
export type SaveImageUploadMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveImageUploadMutation, SaveImageUploadMutationVariables>;
export const SaveProductFileUploadDocument = gql`
    mutation saveProductFileUpload($uploadId: ID!, $fileName: String!, $ownerIds: [String]) {
  uploadSaveProductFile(uploadId: $uploadId, fileName: $fileName, ownerIds: $ownerIds) {
    ... on UploadSaveProductFileMutationResponse {
      fileId
    }
  }
}
    `;

/**
 * __useSaveProductFileUploadMutation__
 *
 * To run a mutation, you first call `useSaveProductFileUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveProductFileUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveProductFileUploadMutation, { data, loading, error }] = useSaveProductFileUploadMutation({
 *   variables: {
 *      uploadId: // value for 'uploadId'
 *      fileName: // value for 'fileName'
 *      ownerIds: // value for 'ownerIds'
 *   },
 * });
 */
export function useSaveProductFileUploadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveProductFileUploadMutation, SaveProductFileUploadMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveProductFileUploadMutation, SaveProductFileUploadMutationVariables>(SaveProductFileUploadDocument, baseOptions);
      }
export type SaveProductFileUploadMutationHookResult = ReturnType<typeof useSaveProductFileUploadMutation>;
export type SaveProductFileUploadMutationResult = ApolloReactCommon.MutationResult<SaveProductFileUploadMutation>;
export type SaveProductFileUploadMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveProductFileUploadMutation, SaveProductFileUploadMutationVariables>;
export const GetProductFileDownloadLinkDocument = gql`
    mutation getProductFileDownloadLink($id: ID!, $orderItemId: ID!) {
  generateProductFileDownloadLink(id: $id, orderItemId: $orderItemId) {
    ... on ProductFileLinkMutationResponse {
      downloadLink {
        productFileId
        expiresAt
        url
      }
    }
  }
}
    `;

/**
 * __useGetProductFileDownloadLinkMutation__
 *
 * To run a mutation, you first call `useGetProductFileDownloadLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetProductFileDownloadLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getProductFileDownloadLinkMutation, { data, loading, error }] = useGetProductFileDownloadLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      orderItemId: // value for 'orderItemId'
 *   },
 * });
 */
export function useGetProductFileDownloadLinkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetProductFileDownloadLinkMutation, GetProductFileDownloadLinkMutationVariables>) {
        return ApolloReactHooks.useMutation<GetProductFileDownloadLinkMutation, GetProductFileDownloadLinkMutationVariables>(GetProductFileDownloadLinkDocument, baseOptions);
      }
export type GetProductFileDownloadLinkMutationHookResult = ReturnType<typeof useGetProductFileDownloadLinkMutation>;
export type GetProductFileDownloadLinkMutationResult = ApolloReactCommon.MutationResult<GetProductFileDownloadLinkMutation>;
export type GetProductFileDownloadLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<GetProductFileDownloadLinkMutation, GetProductFileDownloadLinkMutationVariables>;
export const GetDownloadsDocument = gql`
    query getDownloads($query: ConnectionQuery) {
  user {
    id
    ... on UserPrivate {
      downloadsConnection(query: $query) {
        totalCount
        pageInfo {
          isLastPage
          endCursor
        }
        edges {
          cursor
          node {
            product {
              ...ProductFragment
            }
            order {
              ...OrderFragment
              currentSnapshot {
                transaction {
                  id
                  createdAt
                  subtotal
                  paymentProcessingFee
                  taxes
                  paymentProcessor
                  customerId
                  currency
                  paymentMethodId
                  paymentMethod {
                    ... on PaymentMethod {
                      ...PaymentMethodFragment
                    }
                  }
                  paymentIntentId
                  chargeId
                }
              }
            }
          }
        }
      }
    }
  }
}
    ${ProductFragmentFragmentDoc}
${OrderFragmentFragmentDoc}
${PaymentMethodFragmentFragmentDoc}`;

/**
 * __useGetDownloadsQuery__
 *
 * To run a query within a React component, call `useGetDownloadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDownloadsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDownloadsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetDownloadsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDownloadsQuery, GetDownloadsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetDownloadsQuery, GetDownloadsQueryVariables>(GetDownloadsDocument, baseOptions);
      }
export function useGetDownloadsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDownloadsQuery, GetDownloadsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetDownloadsQuery, GetDownloadsQueryVariables>(GetDownloadsDocument, baseOptions);
        }
export type GetDownloadsQueryHookResult = ReturnType<typeof useGetDownloadsQuery>;
export type GetDownloadsLazyQueryHookResult = ReturnType<typeof useGetDownloadsLazyQuery>;
export type GetDownloadsQueryResult = ApolloReactCommon.QueryResult<GetDownloadsQuery, GetDownloadsQueryVariables>;
export const CheckoutProductsDocument = gql`
    mutation checkoutProducts($productsInfo: [ProductProductVariantId!]!, $promoCodesToAdd: [String!], $quotedPrice: Price!, $paymentProcessorData: String!) {
  checkoutProducts(productsInfo: $productsInfo, promoCodesToAdd: $promoCodesToAdd, quotedPrice: $quotedPrice, paymentProcessorData: $paymentProcessorData) {
    ... on OrderCreateMutationResponse {
      unconfirmedOrder {
        ...OrderFragment
      }
    }
  }
}
    ${OrderFragmentFragmentDoc}`;

/**
 * __useCheckoutProductsMutation__
 *
 * To run a mutation, you first call `useCheckoutProductsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckoutProductsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkoutProductsMutation, { data, loading, error }] = useCheckoutProductsMutation({
 *   variables: {
 *      productsInfo: // value for 'productsInfo'
 *      promoCodesToAdd: // value for 'promoCodesToAdd'
 *      quotedPrice: // value for 'quotedPrice'
 *      paymentProcessorData: // value for 'paymentProcessorData'
 *   },
 * });
 */
export function useCheckoutProductsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CheckoutProductsMutation, CheckoutProductsMutationVariables>) {
        return ApolloReactHooks.useMutation<CheckoutProductsMutation, CheckoutProductsMutationVariables>(CheckoutProductsDocument, baseOptions);
      }
export type CheckoutProductsMutationHookResult = ReturnType<typeof useCheckoutProductsMutation>;
export type CheckoutProductsMutationResult = ApolloReactCommon.MutationResult<CheckoutProductsMutation>;
export type CheckoutProductsMutationOptions = ApolloReactCommon.BaseMutationOptions<CheckoutProductsMutation, CheckoutProductsMutationVariables>;
export const CheckoutCartForFrontendPaymentDocument = gql`
    mutation checkoutCartForFrontendPayment($quotedPrice: Price!) {
  checkoutCartForFrontendPayment(quotedPrice: $quotedPrice) {
    ... on OrderMutationResponse {
      order {
        ...OrderFragment
      }
    }
  }
}
    ${OrderFragmentFragmentDoc}`;

/**
 * __useCheckoutCartForFrontendPaymentMutation__
 *
 * To run a mutation, you first call `useCheckoutCartForFrontendPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckoutCartForFrontendPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkoutCartForFrontendPaymentMutation, { data, loading, error }] = useCheckoutCartForFrontendPaymentMutation({
 *   variables: {
 *      quotedPrice: // value for 'quotedPrice'
 *   },
 * });
 */
export function useCheckoutCartForFrontendPaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CheckoutCartForFrontendPaymentMutation, CheckoutCartForFrontendPaymentMutationVariables>) {
        return ApolloReactHooks.useMutation<CheckoutCartForFrontendPaymentMutation, CheckoutCartForFrontendPaymentMutationVariables>(CheckoutCartForFrontendPaymentDocument, baseOptions);
      }
export type CheckoutCartForFrontendPaymentMutationHookResult = ReturnType<typeof useCheckoutCartForFrontendPaymentMutation>;
export type CheckoutCartForFrontendPaymentMutationResult = ApolloReactCommon.MutationResult<CheckoutCartForFrontendPaymentMutation>;
export type CheckoutCartForFrontendPaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<CheckoutCartForFrontendPaymentMutation, CheckoutCartForFrontendPaymentMutationVariables>;
export const CheckoutProductsForFrontendPaymentDocument = gql`
    mutation checkoutProductsForFrontendPayment($productsInfo: [ProductProductVariantId!]!, $promoCodesToAdd: [String!], $quotedPrice: Price!) {
  checkoutProductsForFrontendPayment(productsInfo: $productsInfo, promoCodesToAdd: $promoCodesToAdd, quotedPrice: $quotedPrice) {
    ... on OrderMutationResponse {
      order {
        ...OrderFragment
      }
    }
  }
}
    ${OrderFragmentFragmentDoc}`;

/**
 * __useCheckoutProductsForFrontendPaymentMutation__
 *
 * To run a mutation, you first call `useCheckoutProductsForFrontendPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckoutProductsForFrontendPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkoutProductsForFrontendPaymentMutation, { data, loading, error }] = useCheckoutProductsForFrontendPaymentMutation({
 *   variables: {
 *      productsInfo: // value for 'productsInfo'
 *      promoCodesToAdd: // value for 'promoCodesToAdd'
 *      quotedPrice: // value for 'quotedPrice'
 *   },
 * });
 */
export function useCheckoutProductsForFrontendPaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CheckoutProductsForFrontendPaymentMutation, CheckoutProductsForFrontendPaymentMutationVariables>) {
        return ApolloReactHooks.useMutation<CheckoutProductsForFrontendPaymentMutation, CheckoutProductsForFrontendPaymentMutationVariables>(CheckoutProductsForFrontendPaymentDocument, baseOptions);
      }
export type CheckoutProductsForFrontendPaymentMutationHookResult = ReturnType<typeof useCheckoutProductsForFrontendPaymentMutation>;
export type CheckoutProductsForFrontendPaymentMutationResult = ApolloReactCommon.MutationResult<CheckoutProductsForFrontendPaymentMutation>;
export type CheckoutProductsForFrontendPaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<CheckoutProductsForFrontendPaymentMutation, CheckoutProductsForFrontendPaymentMutationVariables>;
export const ConfirmOrderAfterFrontendPaymentDocument = gql`
    mutation confirmOrderAfterFrontendPayment($orderId: ID!, $paymentProcessorData: String!) {
  confirmOrderAfterFrontendPayment(orderId: $orderId, paymentProcessorData: $paymentProcessorData) {
    ... on OrderMutationResponse {
      order {
        ...OrderFragment
      }
    }
  }
}
    ${OrderFragmentFragmentDoc}`;

/**
 * __useConfirmOrderAfterFrontendPaymentMutation__
 *
 * To run a mutation, you first call `useConfirmOrderAfterFrontendPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmOrderAfterFrontendPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmOrderAfterFrontendPaymentMutation, { data, loading, error }] = useConfirmOrderAfterFrontendPaymentMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      paymentProcessorData: // value for 'paymentProcessorData'
 *   },
 * });
 */
export function useConfirmOrderAfterFrontendPaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ConfirmOrderAfterFrontendPaymentMutation, ConfirmOrderAfterFrontendPaymentMutationVariables>) {
        return ApolloReactHooks.useMutation<ConfirmOrderAfterFrontendPaymentMutation, ConfirmOrderAfterFrontendPaymentMutationVariables>(ConfirmOrderAfterFrontendPaymentDocument, baseOptions);
      }
export type ConfirmOrderAfterFrontendPaymentMutationHookResult = ReturnType<typeof useConfirmOrderAfterFrontendPaymentMutation>;
export type ConfirmOrderAfterFrontendPaymentMutationResult = ApolloReactCommon.MutationResult<ConfirmOrderAfterFrontendPaymentMutation>;
export type ConfirmOrderAfterFrontendPaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<ConfirmOrderAfterFrontendPaymentMutation, ConfirmOrderAfterFrontendPaymentMutationVariables>;
export const GetOrderAsAdminDocument = gql`
    query getOrderAsAdmin($orderId: ID!) {
  getOrderAsAdmin(orderId: $orderId) {
    ...OrderFragment
  }
}
    ${OrderFragmentFragmentDoc}`;

/**
 * __useGetOrderAsAdminQuery__
 *
 * To run a query within a React component, call `useGetOrderAsAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderAsAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderAsAdminQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGetOrderAsAdminQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetOrderAsAdminQuery, GetOrderAsAdminQueryVariables>) {
        return ApolloReactHooks.useQuery<GetOrderAsAdminQuery, GetOrderAsAdminQueryVariables>(GetOrderAsAdminDocument, baseOptions);
      }
export function useGetOrderAsAdminLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOrderAsAdminQuery, GetOrderAsAdminQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetOrderAsAdminQuery, GetOrderAsAdminQueryVariables>(GetOrderAsAdminDocument, baseOptions);
        }
export type GetOrderAsAdminQueryHookResult = ReturnType<typeof useGetOrderAsAdminQuery>;
export type GetOrderAsAdminLazyQueryHookResult = ReturnType<typeof useGetOrderAsAdminLazyQuery>;
export type GetOrderAsAdminQueryResult = ApolloReactCommon.QueryResult<GetOrderAsAdminQuery, GetOrderAsAdminQueryVariables>;
export const GetRecentTransactionsDocument = gql`
    query getRecentTransactions($count: Int!) {
  getRecentTransactions(count: $count) {
    id
    orderId
    chargeId
    createdAt
    subtotal
    paymentProcessingFee
    currency
  }
}
    `;

/**
 * __useGetRecentTransactionsQuery__
 *
 * To run a query within a React component, call `useGetRecentTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentTransactionsQuery({
 *   variables: {
 *      count: // value for 'count'
 *   },
 * });
 */
export function useGetRecentTransactionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetRecentTransactionsQuery, GetRecentTransactionsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetRecentTransactionsQuery, GetRecentTransactionsQueryVariables>(GetRecentTransactionsDocument, baseOptions);
      }
export function useGetRecentTransactionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRecentTransactionsQuery, GetRecentTransactionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetRecentTransactionsQuery, GetRecentTransactionsQueryVariables>(GetRecentTransactionsDocument, baseOptions);
        }
export type GetRecentTransactionsQueryHookResult = ReturnType<typeof useGetRecentTransactionsQuery>;
export type GetRecentTransactionsLazyQueryHookResult = ReturnType<typeof useGetRecentTransactionsLazyQuery>;
export type GetRecentTransactionsQueryResult = ApolloReactCommon.QueryResult<GetRecentTransactionsQuery, GetRecentTransactionsQueryVariables>;
export const AddPaymentMethodDocument = gql`
    mutation addPaymentMethod($paymentMethodId: ID!, $customerId: ID!) {
  addPaymentMethod(paymentMethodId: $paymentMethodId, customerId: $customerId) {
    user {
      ...UserPrivateFragment
    }
  }
}
    ${UserPrivateFragmentFragmentDoc}`;

/**
 * __useAddPaymentMethodMutation__
 *
 * To run a mutation, you first call `useAddPaymentMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPaymentMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPaymentMethodMutation, { data, loading, error }] = useAddPaymentMethodMutation({
 *   variables: {
 *      paymentMethodId: // value for 'paymentMethodId'
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useAddPaymentMethodMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddPaymentMethodMutation, AddPaymentMethodMutationVariables>) {
        return ApolloReactHooks.useMutation<AddPaymentMethodMutation, AddPaymentMethodMutationVariables>(AddPaymentMethodDocument, baseOptions);
      }
export type AddPaymentMethodMutationHookResult = ReturnType<typeof useAddPaymentMethodMutation>;
export type AddPaymentMethodMutationResult = ApolloReactCommon.MutationResult<AddPaymentMethodMutation>;
export type AddPaymentMethodMutationOptions = ApolloReactCommon.BaseMutationOptions<AddPaymentMethodMutation, AddPaymentMethodMutationVariables>;
export const RemovePaymentMethodDocument = gql`
    mutation removePaymentMethod($paymentMethodId: ID!, $customerId: ID!) {
  removePaymentMethod(paymentMethodId: $paymentMethodId, customerId: $customerId) {
    user {
      ...UserPrivateFragment
    }
  }
}
    ${UserPrivateFragmentFragmentDoc}`;

/**
 * __useRemovePaymentMethodMutation__
 *
 * To run a mutation, you first call `useRemovePaymentMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePaymentMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePaymentMethodMutation, { data, loading, error }] = useRemovePaymentMethodMutation({
 *   variables: {
 *      paymentMethodId: // value for 'paymentMethodId'
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useRemovePaymentMethodMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemovePaymentMethodMutation, RemovePaymentMethodMutationVariables>) {
        return ApolloReactHooks.useMutation<RemovePaymentMethodMutation, RemovePaymentMethodMutationVariables>(RemovePaymentMethodDocument, baseOptions);
      }
export type RemovePaymentMethodMutationHookResult = ReturnType<typeof useRemovePaymentMethodMutation>;
export type RemovePaymentMethodMutationResult = ApolloReactCommon.MutationResult<RemovePaymentMethodMutation>;
export type RemovePaymentMethodMutationOptions = ApolloReactCommon.BaseMutationOptions<RemovePaymentMethodMutation, RemovePaymentMethodMutationVariables>;
export const SetDefaultPaymentMethodDocument = gql`
    mutation setDefaultPaymentMethod($paymentMethodId: ID!, $customerId: ID!) {
  setDefaultPaymentMethod(paymentMethodId: $paymentMethodId, customerId: $customerId) {
    user {
      ...UserPrivateFragment
    }
  }
}
    ${UserPrivateFragmentFragmentDoc}`;

/**
 * __useSetDefaultPaymentMethodMutation__
 *
 * To run a mutation, you first call `useSetDefaultPaymentMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDefaultPaymentMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDefaultPaymentMethodMutation, { data, loading, error }] = useSetDefaultPaymentMethodMutation({
 *   variables: {
 *      paymentMethodId: // value for 'paymentMethodId'
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useSetDefaultPaymentMethodMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetDefaultPaymentMethodMutation, SetDefaultPaymentMethodMutationVariables>) {
        return ApolloReactHooks.useMutation<SetDefaultPaymentMethodMutation, SetDefaultPaymentMethodMutationVariables>(SetDefaultPaymentMethodDocument, baseOptions);
      }
export type SetDefaultPaymentMethodMutationHookResult = ReturnType<typeof useSetDefaultPaymentMethodMutation>;
export type SetDefaultPaymentMethodMutationResult = ApolloReactCommon.MutationResult<SetDefaultPaymentMethodMutation>;
export type SetDefaultPaymentMethodMutationOptions = ApolloReactCommon.BaseMutationOptions<SetDefaultPaymentMethodMutation, SetDefaultPaymentMethodMutationVariables>;
export const GetUserPaymentMethodsDocument = gql`
    query getUserPaymentMethods {
  user {
    ... on UserPrivate {
      id
      paymentMethods {
        ... on PaymentMethod {
          ...PaymentMethodFragment
        }
      }
      defaultPaymentMethod {
        ... on PaymentMethod {
          ...PaymentMethodFragment
        }
      }
    }
  }
}
    ${PaymentMethodFragmentFragmentDoc}`;

/**
 * __useGetUserPaymentMethodsQuery__
 *
 * To run a query within a React component, call `useGetUserPaymentMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPaymentMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPaymentMethodsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserPaymentMethodsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserPaymentMethodsQuery, GetUserPaymentMethodsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserPaymentMethodsQuery, GetUserPaymentMethodsQueryVariables>(GetUserPaymentMethodsDocument, baseOptions);
      }
export function useGetUserPaymentMethodsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserPaymentMethodsQuery, GetUserPaymentMethodsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserPaymentMethodsQuery, GetUserPaymentMethodsQueryVariables>(GetUserPaymentMethodsDocument, baseOptions);
        }
export type GetUserPaymentMethodsQueryHookResult = ReturnType<typeof useGetUserPaymentMethodsQuery>;
export type GetUserPaymentMethodsLazyQueryHookResult = ReturnType<typeof useGetUserPaymentMethodsLazyQuery>;
export type GetUserPaymentMethodsQueryResult = ApolloReactCommon.QueryResult<GetUserPaymentMethodsQuery, GetUserPaymentMethodsQueryVariables>;
export const CreateProductDocument = gql`
    mutation createProduct($productCreateInput: ProductCreateInput) {
  createProduct(productCreateInput: $productCreateInput) {
    ... on ProductMutationResponse {
      product {
        id
        isSuspended
        isPublished
        isDeleted
        isExcludedFromAutomaticLists
        tags
        category {
          id
          name
          categoryGroup
        }
        name
        tagline
        description
        currentVariants {
          variantId
          variantName
          variantDescription
          isDefault
          previewItems {
            id
            youTubeEmbedLink
            image {
              ...ImageFragment
            }
          }
          files {
            id
            fileName
            mimeType
            sizeInBytes
            createdAt
          }
        }
        createdAt
        updatedAt
      }
    }
  }
}
    ${ImageFragmentFragmentDoc}`;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      productCreateInput: // value for 'productCreateInput'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, baseOptions);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = ApolloReactCommon.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const EditProductDocument = gql`
    mutation editProduct($productEditInput: ProductEditInput) {
  editProduct(productEditInput: $productEditInput) {
    product {
      id
      isSuspended
      isPublished
      isDeleted
      isExcludedFromAutomaticLists
      tags
      category {
        id
        name
        categoryGroup
      }
      name
      tagline
      description
      currentVariants {
        variantId
        variantName
        variantDescription
        isDefault
        previewItems {
          id
          youTubeEmbedLink
          image {
            ...ImageFragment
          }
        }
        files {
          id
          fileName
          mimeType
          sizeInBytes
          createdAt
        }
      }
      createdAt
      updatedAt
    }
  }
}
    ${ImageFragmentFragmentDoc}`;

/**
 * __useEditProductMutation__
 *
 * To run a mutation, you first call `useEditProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProductMutation, { data, loading, error }] = useEditProductMutation({
 *   variables: {
 *      productEditInput: // value for 'productEditInput'
 *   },
 * });
 */
export function useEditProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditProductMutation, EditProductMutationVariables>) {
        return ApolloReactHooks.useMutation<EditProductMutation, EditProductMutationVariables>(EditProductDocument, baseOptions);
      }
export type EditProductMutationHookResult = ReturnType<typeof useEditProductMutation>;
export type EditProductMutationResult = ApolloReactCommon.MutationResult<EditProductMutation>;
export type EditProductMutationOptions = ApolloReactCommon.BaseMutationOptions<EditProductMutation, EditProductMutationVariables>;
export const GetRecommendedProductsDocument = gql`
    query getRecommendedProducts($query: ConnectionQuery) {
  productsRecommendedConnection(query: $query) {
    totalCount
    pageInfo {
      isLastPage
      endCursor
    }
    edges {
      cursor
      node {
        ...ProductFragment
      }
    }
  }
}
    ${ProductFragmentFragmentDoc}`;

/**
 * __useGetRecommendedProductsQuery__
 *
 * To run a query within a React component, call `useGetRecommendedProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecommendedProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecommendedProductsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetRecommendedProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetRecommendedProductsQuery, GetRecommendedProductsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetRecommendedProductsQuery, GetRecommendedProductsQueryVariables>(GetRecommendedProductsDocument, baseOptions);
      }
export function useGetRecommendedProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRecommendedProductsQuery, GetRecommendedProductsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetRecommendedProductsQuery, GetRecommendedProductsQueryVariables>(GetRecommendedProductsDocument, baseOptions);
        }
export type GetRecommendedProductsQueryHookResult = ReturnType<typeof useGetRecommendedProductsQuery>;
export type GetRecommendedProductsLazyQueryHookResult = ReturnType<typeof useGetRecommendedProductsLazyQuery>;
export type GetRecommendedProductsQueryResult = ApolloReactCommon.QueryResult<GetRecommendedProductsQuery, GetRecommendedProductsQueryVariables>;
export const ProductsAllConnectionDocument = gql`
    query productsAllConnection($query: ConnectionQuery) {
  productsAllConnection(query: $query) {
    totalCount
    pageInfo {
      isLastPage
      endCursor
    }
    edges {
      cursor
      node {
        ...ProductFragment
      }
    }
  }
}
    ${ProductFragmentFragmentDoc}`;

/**
 * __useProductsAllConnectionQuery__
 *
 * To run a query within a React component, call `useProductsAllConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsAllConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsAllConnectionQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useProductsAllConnectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductsAllConnectionQuery, ProductsAllConnectionQueryVariables>) {
        return ApolloReactHooks.useQuery<ProductsAllConnectionQuery, ProductsAllConnectionQueryVariables>(ProductsAllConnectionDocument, baseOptions);
      }
export function useProductsAllConnectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductsAllConnectionQuery, ProductsAllConnectionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProductsAllConnectionQuery, ProductsAllConnectionQueryVariables>(ProductsAllConnectionDocument, baseOptions);
        }
export type ProductsAllConnectionQueryHookResult = ReturnType<typeof useProductsAllConnectionQuery>;
export type ProductsAllConnectionLazyQueryHookResult = ReturnType<typeof useProductsAllConnectionLazyQuery>;
export type ProductsAllConnectionQueryResult = ApolloReactCommon.QueryResult<ProductsAllConnectionQuery, ProductsAllConnectionQueryVariables>;
export const GetProductDocument = gql`
    query getProduct($productId: ID!) {
  product(id: $productId) {
    ...ProductFragment
    store {
      ...StorePublicFragment
    }
  }
}
    ${ProductFragmentFragmentDoc}
${StorePublicFragmentFragmentDoc}`;

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetProductQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
        return ApolloReactHooks.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, baseOptions);
      }
export function useGetProductLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, baseOptions);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductQueryResult = ApolloReactCommon.QueryResult<GetProductQuery, GetProductQueryVariables>;
export const ProductsDealsEndingSoonConnectionDocument = gql`
    query productsDealsEndingSoonConnection($query: ConnectionQuery) {
  productsDealsEndingSoonConnection(query: $query) {
    totalCount
    pageInfo {
      isLastPage
      endCursor
    }
    edges {
      cursor
      node {
        ...ProductFragment
      }
    }
  }
}
    ${ProductFragmentFragmentDoc}`;

/**
 * __useProductsDealsEndingSoonConnectionQuery__
 *
 * To run a query within a React component, call `useProductsDealsEndingSoonConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsDealsEndingSoonConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsDealsEndingSoonConnectionQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useProductsDealsEndingSoonConnectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductsDealsEndingSoonConnectionQuery, ProductsDealsEndingSoonConnectionQueryVariables>) {
        return ApolloReactHooks.useQuery<ProductsDealsEndingSoonConnectionQuery, ProductsDealsEndingSoonConnectionQueryVariables>(ProductsDealsEndingSoonConnectionDocument, baseOptions);
      }
export function useProductsDealsEndingSoonConnectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductsDealsEndingSoonConnectionQuery, ProductsDealsEndingSoonConnectionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProductsDealsEndingSoonConnectionQuery, ProductsDealsEndingSoonConnectionQueryVariables>(ProductsDealsEndingSoonConnectionDocument, baseOptions);
        }
export type ProductsDealsEndingSoonConnectionQueryHookResult = ReturnType<typeof useProductsDealsEndingSoonConnectionQuery>;
export type ProductsDealsEndingSoonConnectionLazyQueryHookResult = ReturnType<typeof useProductsDealsEndingSoonConnectionLazyQuery>;
export type ProductsDealsEndingSoonConnectionQueryResult = ApolloReactCommon.QueryResult<ProductsDealsEndingSoonConnectionQuery, ProductsDealsEndingSoonConnectionQueryVariables>;
export const ProductsLimitedReleasesConnectionDocument = gql`
    query productsLimitedReleasesConnection($query: ConnectionQuery) {
  productsLimitedReleasesConnection(query: $query) {
    totalCount
    pageInfo {
      isLastPage
      endCursor
    }
    edges {
      cursor
      node {
        ...ProductFragment
      }
    }
  }
}
    ${ProductFragmentFragmentDoc}`;

/**
 * __useProductsLimitedReleasesConnectionQuery__
 *
 * To run a query within a React component, call `useProductsLimitedReleasesConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsLimitedReleasesConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsLimitedReleasesConnectionQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useProductsLimitedReleasesConnectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductsLimitedReleasesConnectionQuery, ProductsLimitedReleasesConnectionQueryVariables>) {
        return ApolloReactHooks.useQuery<ProductsLimitedReleasesConnectionQuery, ProductsLimitedReleasesConnectionQueryVariables>(ProductsLimitedReleasesConnectionDocument, baseOptions);
      }
export function useProductsLimitedReleasesConnectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductsLimitedReleasesConnectionQuery, ProductsLimitedReleasesConnectionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProductsLimitedReleasesConnectionQuery, ProductsLimitedReleasesConnectionQueryVariables>(ProductsLimitedReleasesConnectionDocument, baseOptions);
        }
export type ProductsLimitedReleasesConnectionQueryHookResult = ReturnType<typeof useProductsLimitedReleasesConnectionQuery>;
export type ProductsLimitedReleasesConnectionLazyQueryHookResult = ReturnType<typeof useProductsLimitedReleasesConnectionLazyQuery>;
export type ProductsLimitedReleasesConnectionQueryResult = ApolloReactCommon.QueryResult<ProductsLimitedReleasesConnectionQuery, ProductsLimitedReleasesConnectionQueryVariables>;
export const ProductsByCategoryConnectionDocument = gql`
    query productsByCategoryConnection($categoryId: ID, $categoryName: String, $query: ConnectionQuery) {
  productsByCategoryConnection(categoryId: $categoryId, categoryName: $categoryName, query: $query) {
    totalCount
    pageInfo {
      isLastPage
      endCursor
    }
    edges {
      cursor
      node {
        ...ProductFragment
      }
    }
  }
}
    ${ProductFragmentFragmentDoc}`;

/**
 * __useProductsByCategoryConnectionQuery__
 *
 * To run a query within a React component, call `useProductsByCategoryConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsByCategoryConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsByCategoryConnectionQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      categoryName: // value for 'categoryName'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useProductsByCategoryConnectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductsByCategoryConnectionQuery, ProductsByCategoryConnectionQueryVariables>) {
        return ApolloReactHooks.useQuery<ProductsByCategoryConnectionQuery, ProductsByCategoryConnectionQueryVariables>(ProductsByCategoryConnectionDocument, baseOptions);
      }
export function useProductsByCategoryConnectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductsByCategoryConnectionQuery, ProductsByCategoryConnectionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProductsByCategoryConnectionQuery, ProductsByCategoryConnectionQueryVariables>(ProductsByCategoryConnectionDocument, baseOptions);
        }
export type ProductsByCategoryConnectionQueryHookResult = ReturnType<typeof useProductsByCategoryConnectionQuery>;
export type ProductsByCategoryConnectionLazyQueryHookResult = ReturnType<typeof useProductsByCategoryConnectionLazyQuery>;
export type ProductsByCategoryConnectionQueryResult = ApolloReactCommon.QueryResult<ProductsByCategoryConnectionQuery, ProductsByCategoryConnectionQueryVariables>;
export const SignUpUsingEmailDocument = gql`
    mutation signUpUsingEmail($email: String!, $password: String!, $username: String, $firstName: String, $lastName: String, $productProductVariantIds: [ProductProductVariantId], $subscribedNewsletters: [String]) {
  signUpUsingEmail(email: $email, password: $password, username: $username, firstName: $firstName, lastName: $lastName, productProductVariantIds: $productProductVariantIds, subscribedNewsletters: $subscribedNewsletters) {
    user {
      ...UserPrivateFragment
    }
    sendgridResponse {
      verified {
        email
        username
        expiresAt
        id
      }
      status {
        message
      }
    }
    stripeCustomerCreationResponse {
      endpoint
      status
      response {
        id
        email
        currency
        created
        balance
        description
        defaultSource
      }
    }
  }
}
    ${UserPrivateFragmentFragmentDoc}`;

/**
 * __useSignUpUsingEmailMutation__
 *
 * To run a mutation, you first call `useSignUpUsingEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpUsingEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpUsingEmailMutation, { data, loading, error }] = useSignUpUsingEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      productProductVariantIds: // value for 'productProductVariantIds'
 *      subscribedNewsletters: // value for 'subscribedNewsletters'
 *   },
 * });
 */
export function useSignUpUsingEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpUsingEmailMutation, SignUpUsingEmailMutationVariables>) {
        return ApolloReactHooks.useMutation<SignUpUsingEmailMutation, SignUpUsingEmailMutationVariables>(SignUpUsingEmailDocument, baseOptions);
      }
export type SignUpUsingEmailMutationHookResult = ReturnType<typeof useSignUpUsingEmailMutation>;
export type SignUpUsingEmailMutationResult = ApolloReactCommon.MutationResult<SignUpUsingEmailMutation>;
export type SignUpUsingEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpUsingEmailMutation, SignUpUsingEmailMutationVariables>;
export const EditUserProfileDocument = gql`
    mutation editUserProfile($username: String, $email: String, $firstName: String, $lastName: String, $subscribedNewsletterIds: [ID], $payoutMethod: String) {
  editUserProfile(username: $username, email: $email, firstName: $firstName, lastName: $lastName, subscribedNewsletterIds: $subscribedNewsletterIds, payoutMethod: $payoutMethod) {
    user {
      id
      lastName
      firstName
      username
      email
      ... on UserPrivate {
        ...UserPrivateFragment
      }
    }
  }
}
    ${UserPrivateFragmentFragmentDoc}`;

/**
 * __useEditUserProfileMutation__
 *
 * To run a mutation, you first call `useEditUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserProfileMutation, { data, loading, error }] = useEditUserProfileMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      subscribedNewsletterIds: // value for 'subscribedNewsletterIds'
 *      payoutMethod: // value for 'payoutMethod'
 *   },
 * });
 */
export function useEditUserProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditUserProfileMutation, EditUserProfileMutationVariables>) {
        return ApolloReactHooks.useMutation<EditUserProfileMutation, EditUserProfileMutationVariables>(EditUserProfileDocument, baseOptions);
      }
export type EditUserProfileMutationHookResult = ReturnType<typeof useEditUserProfileMutation>;
export type EditUserProfileMutationResult = ApolloReactCommon.MutationResult<EditUserProfileMutation>;
export type EditUserProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<EditUserProfileMutation, EditUserProfileMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation changePassword($currentPassword: String!, $newPassword: String!) {
  changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
    ... on UserMutationResponse {
      user {
        id
        email
      }
    }
  }
}
    `;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      currentPassword: // value for 'currentPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = ApolloReactCommon.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const SetPayoutMethodDocument = gql`
    mutation setPayoutMethod($payoutType: String, $payoutEmail: String, $payoutProcessor: String, $payoutProcessorId: String) {
  setPayoutMethod(payoutType: $payoutType, payoutEmail: $payoutEmail, payoutProcessor: $payoutProcessor, payoutProcessorId: $payoutProcessorId) {
    ... on UserMutationResponse {
      user {
        ...UserPrivateFragment
      }
    }
  }
}
    ${UserPrivateFragmentFragmentDoc}`;

/**
 * __useSetPayoutMethodMutation__
 *
 * To run a mutation, you first call `useSetPayoutMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPayoutMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPayoutMethodMutation, { data, loading, error }] = useSetPayoutMethodMutation({
 *   variables: {
 *      payoutType: // value for 'payoutType'
 *      payoutEmail: // value for 'payoutEmail'
 *      payoutProcessor: // value for 'payoutProcessor'
 *      payoutProcessorId: // value for 'payoutProcessorId'
 *   },
 * });
 */
export function useSetPayoutMethodMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetPayoutMethodMutation, SetPayoutMethodMutationVariables>) {
        return ApolloReactHooks.useMutation<SetPayoutMethodMutation, SetPayoutMethodMutationVariables>(SetPayoutMethodDocument, baseOptions);
      }
export type SetPayoutMethodMutationHookResult = ReturnType<typeof useSetPayoutMethodMutation>;
export type SetPayoutMethodMutationResult = ApolloReactCommon.MutationResult<SetPayoutMethodMutation>;
export type SetPayoutMethodMutationOptions = ApolloReactCommon.BaseMutationOptions<SetPayoutMethodMutation, SetPayoutMethodMutationVariables>;
export const LogOutDocument = gql`
    mutation logOut {
  logOut {
    ... on BlankMutationResponse {
      success
    }
  }
}
    `;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, baseOptions);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = ApolloReactCommon.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const LogInUsingEmailDocument = gql`
    mutation logInUsingEmail($email: String!, $password: String!, $productProductVariantIds: [ProductProductVariantId]) {
  logInUsingEmail(email: $email, password: $password, productProductVariantIds: $productProductVariantIds) {
    jwt
    user {
      ...UserPrivateFragment
    }
  }
}
    ${UserPrivateFragmentFragmentDoc}`;

/**
 * __useLogInUsingEmailMutation__
 *
 * To run a mutation, you first call `useLogInUsingEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInUsingEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInUsingEmailMutation, { data, loading, error }] = useLogInUsingEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      productProductVariantIds: // value for 'productProductVariantIds'
 *   },
 * });
 */
export function useLogInUsingEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogInUsingEmailMutation, LogInUsingEmailMutationVariables>) {
        return ApolloReactHooks.useMutation<LogInUsingEmailMutation, LogInUsingEmailMutationVariables>(LogInUsingEmailDocument, baseOptions);
      }
export type LogInUsingEmailMutationHookResult = ReturnType<typeof useLogInUsingEmailMutation>;
export type LogInUsingEmailMutationResult = ApolloReactCommon.MutationResult<LogInUsingEmailMutation>;
export type LogInUsingEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<LogInUsingEmailMutation, LogInUsingEmailMutationVariables>;
export const GetUserDocument = gql`
    query getUser {
  user {
    id
    firstName
    lastName
    email
    ... on UserPrivate {
      ...UserPrivateFragment
    }
  }
}
    ${UserPrivateFragmentFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const SendResetPasswordEmailDocument = gql`
    mutation sendResetPasswordEmail($email: String!) {
  sendResetPasswordEmail(email: $email) {
    resetId
    emailSentTo
    status {
      message
    }
  }
}
    `;

/**
 * __useSendResetPasswordEmailMutation__
 *
 * To run a mutation, you first call `useSendResetPasswordEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendResetPasswordEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendResetPasswordEmailMutation, { data, loading, error }] = useSendResetPasswordEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendResetPasswordEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendResetPasswordEmailMutation, SendResetPasswordEmailMutationVariables>) {
        return ApolloReactHooks.useMutation<SendResetPasswordEmailMutation, SendResetPasswordEmailMutationVariables>(SendResetPasswordEmailDocument, baseOptions);
      }
export type SendResetPasswordEmailMutationHookResult = ReturnType<typeof useSendResetPasswordEmailMutation>;
export type SendResetPasswordEmailMutationResult = ApolloReactCommon.MutationResult<SendResetPasswordEmailMutation>;
export type SendResetPasswordEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<SendResetPasswordEmailMutation, SendResetPasswordEmailMutationVariables>;
export const AddProductToWishlistDocument = gql`
    mutation addProductToWishlist($productId: ID!, $variantId: ID!) {
  addProductToWishlist(productId: $productId, variantId: $variantId) {
    __typename
  }
}
    `;

/**
 * __useAddProductToWishlistMutation__
 *
 * To run a mutation, you first call `useAddProductToWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductToWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductToWishlistMutation, { data, loading, error }] = useAddProductToWishlistMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      variantId: // value for 'variantId'
 *   },
 * });
 */
export function useAddProductToWishlistMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddProductToWishlistMutation, AddProductToWishlistMutationVariables>) {
        return ApolloReactHooks.useMutation<AddProductToWishlistMutation, AddProductToWishlistMutationVariables>(AddProductToWishlistDocument, baseOptions);
      }
export type AddProductToWishlistMutationHookResult = ReturnType<typeof useAddProductToWishlistMutation>;
export type AddProductToWishlistMutationResult = ApolloReactCommon.MutationResult<AddProductToWishlistMutation>;
export type AddProductToWishlistMutationOptions = ApolloReactCommon.BaseMutationOptions<AddProductToWishlistMutation, AddProductToWishlistMutationVariables>;
export const RemoveProductFromWishlistDocument = gql`
    mutation removeProductFromWishlist($productId: ID!, $variantId: ID!) {
  removeProductFromWishlist(productId: $productId, variantId: $variantId) {
    __typename
  }
}
    `;

/**
 * __useRemoveProductFromWishlistMutation__
 *
 * To run a mutation, you first call `useRemoveProductFromWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductFromWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductFromWishlistMutation, { data, loading, error }] = useRemoveProductFromWishlistMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      variantId: // value for 'variantId'
 *   },
 * });
 */
export function useRemoveProductFromWishlistMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveProductFromWishlistMutation, RemoveProductFromWishlistMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveProductFromWishlistMutation, RemoveProductFromWishlistMutationVariables>(RemoveProductFromWishlistDocument, baseOptions);
      }
export type RemoveProductFromWishlistMutationHookResult = ReturnType<typeof useRemoveProductFromWishlistMutation>;
export type RemoveProductFromWishlistMutationResult = ApolloReactCommon.MutationResult<RemoveProductFromWishlistMutation>;
export type RemoveProductFromWishlistMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveProductFromWishlistMutation, RemoveProductFromWishlistMutationVariables>;
export const WishlistItemsConnectionDocument = gql`
    query wishlistItemsConnection($query: ConnectionQuery!) {
  wishlistItemsConnection(query: $query) {
    totalCount
    pageInfo {
      isLastPage
      endCursor
    }
    edges {
      cursor
      node {
        addedAt
        product {
          ...ProductFragment
        }
      }
    }
  }
}
    ${ProductFragmentFragmentDoc}`;

/**
 * __useWishlistItemsConnectionQuery__
 *
 * To run a query within a React component, call `useWishlistItemsConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useWishlistItemsConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWishlistItemsConnectionQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useWishlistItemsConnectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WishlistItemsConnectionQuery, WishlistItemsConnectionQueryVariables>) {
        return ApolloReactHooks.useQuery<WishlistItemsConnectionQuery, WishlistItemsConnectionQueryVariables>(WishlistItemsConnectionDocument, baseOptions);
      }
export function useWishlistItemsConnectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WishlistItemsConnectionQuery, WishlistItemsConnectionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WishlistItemsConnectionQuery, WishlistItemsConnectionQueryVariables>(WishlistItemsConnectionDocument, baseOptions);
        }
export type WishlistItemsConnectionQueryHookResult = ReturnType<typeof useWishlistItemsConnectionQuery>;
export type WishlistItemsConnectionLazyQueryHookResult = ReturnType<typeof useWishlistItemsConnectionLazyQuery>;
export type WishlistItemsConnectionQueryResult = ApolloReactCommon.QueryResult<WishlistItemsConnectionQuery, WishlistItemsConnectionQueryVariables>;
export type ID = Scalars["ID"]
export type Price = Scalars["Price"]
export type PageCursor = Scalars["PageCursor"]
export type ProductCategoryGroup = Scalars["ProductCategoryGroup"]