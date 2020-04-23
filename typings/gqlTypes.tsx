import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ProductCategoryGroup: any;
  Date: Date;
  PageCursor: any;
  Price: number;
  timestamptz: any;
  json: any;
  uuid: any;
};

export type AddRemovePaymentMethodResponse = {
   __typename?: 'AddRemovePaymentMethodResponse';
  user: UserPrivate;
};

export type AdminInsight = {
   __typename?: 'AdminInsight';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type ApprovePayoutsResult = {
   __typename?: 'ApprovePayoutsResult';
  approvedPayouts?: Maybe<Array<Maybe<Payout>>>;
  payoutsAlreadyApproved?: Maybe<Array<Maybe<Payout>>>;
  payoutsAlreadyApprovedIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type BlankMutationResponse = {
   __typename?: 'BlankMutationResponse';
  success: Scalars['Boolean'];
};

export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

export type Cart = {
   __typename?: 'Cart';
  automaticSavings: Scalars['Price'];
  id: Scalars['ID'];
  items: Array<CartItem>;
  paymentProcessingFee: Scalars['Price'];
  promoCodeSavings: Scalars['Price'];
  relevantPromoCodes: Array<Discount>;
  subtotal: Scalars['Price'];
  taxes: Scalars['Price'];
  total: Scalars['Price'];
  updatedAt: Scalars['Date'];
  userId: Scalars['ID'];
};

export type CartItem = {
   __typename?: 'CartItem';
  cartId: Scalars['ID'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  priceDetails: PriceDetails;
  product: Product;
  purchasableStatus: CartItemPurchasableStatus;
  quantity: Scalars['Int'];
  storeId: Scalars['ID'];
  userId: Scalars['ID'];
};

export enum CartItemPurchasableStatus {
  AVAILABLE = 'AVAILABLE',
  PRODUCT_UNAVAILABLE = 'PRODUCT_UNAVAILABLE',
  QUANTITY_TOO_HIGH = 'QUANTITY_TOO_HIGH',
  SOLD_OUT = 'SOLD_OUT',
  VARIANT_UNAVAILABLE = 'VARIANT_UNAVAILABLE'
}

export type CartMutationResponse = {
   __typename?: 'CartMutationResponse';
  cart: Cart;
};

export type Connection = {
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ConnectionQuery = {
  count?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['PageCursor']>;
  pageBackwards?: Maybe<Scalars['Boolean']>;
  sortAscending?: Maybe<Scalars['Boolean']>;
};

export type ConnectionWithMetrics = {
  pageInfo: PageInfo;
  totalAmount?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type CreatePlatformDiscountInput = {
  end?: Maybe<Scalars['Date']>;
  isDisabled: Scalars['Boolean'];
  promoCode?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Date']>;
  valuePercentageOff: Scalars['Float'];
};

export type CreateRefundInput = {
  chargeId: Scalars['ID'];
  orderId: Scalars['ID'];
  paymentIntentId?: Maybe<Scalars['ID']>;
  paymentProcessingFee?: Maybe<Scalars['Int']>;
  paymentProcessor?: Maybe<PaymentProcessor>;
  paypalInvoiceNumber?: Maybe<Scalars['ID']>;
  reason?: Maybe<Scalars['String']>;
  reasonDetail?: Maybe<Scalars['String']>;
  refundOrderItems: Array<Maybe<RefundOrderItem>>;
  taxes?: Maybe<Scalars['Int']>;
};

export type CreateRefundMutationResponse = {
   __typename?: 'CreateRefundMutationResponse';
  transaction: Transaction;
};

export type CreateStorePromoCodeInput = {
  end?: Maybe<Scalars['Date']>;
  isDisabled: Scalars['Boolean'];
  minimumPurchaseAmount?: Maybe<Scalars['Price']>;
  minimumQuantity?: Maybe<Scalars['Int']>;
  promoCode: Scalars['String'];
  specificProductId?: Maybe<Scalars['ID']>;
  specificProductVariantId?: Maybe<Scalars['ID']>;
  start?: Maybe<Scalars['Date']>;
  valueDollarsOff?: Maybe<Scalars['Price']>;
  valuePercentageOff?: Maybe<Scalars['Float']>;
};

export type CuratedList = {
   __typename?: 'CuratedList';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type CuratedListItem = {
   __typename?: 'CuratedListItem';
  addedAt: Scalars['Date'];
  id: Scalars['ID'];
  listId: Scalars['ID'];
  product: Product;
};

export type CuratedListItemMutationResponse = {
   __typename?: 'CuratedListItemMutationResponse';
  item: CuratedListItem;
};

export type CuratedListItemsConnection = Connection & {
   __typename?: 'CuratedListItemsConnection';
  edges: Array<CuratedListItemsEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type CuratedListItemsEdge = Edge & {
   __typename?: 'CuratedListItemsEdge';
  cursor: Scalars['PageCursor'];
  node: CuratedListItem;
};

export type CuratedListMutationResponse = {
   __typename?: 'CuratedListMutationResponse';
  list: CuratedList;
};

export type CuratedListsConnection = Connection & {
   __typename?: 'CuratedListsConnection';
  edges: Array<CuratedListsEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type CuratedListsEdge = Edge & {
   __typename?: 'CuratedListsEdge';
  cursor: Scalars['PageCursor'];
  node: CuratedList;
};


export type Discount = {
   __typename?: 'Discount';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  isAutomatic: Scalars['Boolean'];
  isDisabled: Scalars['Boolean'];
  modifier: DiscountModifier;
  platformScopeInfo?: Maybe<PlatformScopedDiscountInfo>;
  productScopeInfo?: Maybe<ProductScopedDiscountInfo>;
  promoCode?: Maybe<Scalars['String']>;
  scope: DiscountScope;
  storeScopeInfo?: Maybe<StoreScopedDiscountInfo>;
  timeCondition?: Maybe<DiscountTimeCondition>;
  valueDollarsOff?: Maybe<Scalars['Price']>;
  valueFixed?: Maybe<Scalars['Price']>;
  valuePercentageOff?: Maybe<Scalars['Float']>;
};

export enum DiscountModifier {
  DOLLARS_OFF = 'DOLLARS_OFF',
  FIXED_PRICE = 'FIXED_PRICE',
  PERCENTAGE_OFF = 'PERCENTAGE_OFF'
}

export type DiscountMutationResponse = {
   __typename?: 'DiscountMutationResponse';
  discount: Discount;
};

export type DiscountsConnection = Connection & {
   __typename?: 'DiscountsConnection';
  edges: Array<DiscountsEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export enum DiscountScope {
  PLATFORM = 'PLATFORM',
  PRODUCT = 'PRODUCT',
  STORE = 'STORE'
}

export type DiscountsEdge = Edge & {
   __typename?: 'DiscountsEdge';
  cursor: Scalars['PageCursor'];
  node: Discount;
};

export type DiscountStockLimitCondition = {
   __typename?: 'DiscountStockLimitCondition';
  stockLevel: StockLevel;
  supplyExhaustionRule: DiscountUnavailableRule;
};

export type DiscountStockLimitConditionInput = {
  quantityAvailable: Scalars['Int'];
  supplyExhaustionRule: DiscountUnavailableRule;
};

export type DiscountTimeCondition = {
   __typename?: 'DiscountTimeCondition';
  end: Scalars['Date'];
  start?: Maybe<Scalars['Date']>;
  timeExpiryRule: DiscountUnavailableRule;
};

export type DiscountTimeConditionInput = {
  end: Scalars['Date'];
  start?: Maybe<Scalars['Date']>;
  timeExpiryRule: DiscountUnavailableRule;
};

export enum DiscountUnavailableRule {
  DISABLE_DISCOUNT = 'DISABLE_DISCOUNT',
  MARK_AS_SOLD_OUT = 'MARK_AS_SOLD_OUT'
}

export type Download = {
   __typename?: 'Download';
  order: Order;
  orderId: Scalars['ID'];
  product: Product;
};

export type DownloadsConnection = Connection & {
   __typename?: 'DownloadsConnection';
  edges: Array<DownloadsEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type DownloadsEdge = Edge & {
   __typename?: 'DownloadsEdge';
  cursor: Scalars['PageCursor'];
  node: Download;
};

export type Edge = {
  cursor: Scalars['PageCursor'];
};

export type EditPlatformDiscountInput = {
  discountId: Scalars['ID'];
  isDisabled?: Maybe<Scalars['Boolean']>;
};

export type EditStorePromoCodeInput = {
  discountId: Scalars['ID'];
  isDisabled?: Maybe<Scalars['Boolean']>;
};

export type FollowedStore = {
   __typename?: 'FollowedStore';
  createdAt?: Maybe<Scalars['Date']>;
  lastVisited?: Maybe<Scalars['Date']>;
  store?: Maybe<StorePublic>;
};

export type FollowingStoresConnection = Connection & {
   __typename?: 'FollowingStoresConnection';
  edges: Array<FollowingStoresEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type FollowingStoresEdge = Edge & {
   __typename?: 'FollowingStoresEdge';
  cursor: Scalars['PageCursor'];
  node: FollowedStore;
};

export type Image = {
   __typename?: 'Image';
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  original: ImageVariant;
  tags?: Maybe<Array<Scalars['String']>>;
  variants: Array<ImageVariant>;
};

export type Image_Owners = {
   __typename?: 'image_owners';
  imageId: Scalars['String'];
  ownerId: Scalars['String'];
};

export type Image_Owners_Aggregate = {
   __typename?: 'image_owners_aggregate';
  aggregate?: Maybe<Image_Owners_Aggregate_Fields>;
  nodes: Array<Image_Owners>;
};

export type Image_Owners_Aggregate_Fields = {
   __typename?: 'image_owners_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Image_Owners_Max_Fields>;
  min?: Maybe<Image_Owners_Min_Fields>;
};


export type Image_Owners_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Image_Owners_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Image_Owners_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Image_Owners_Max_Order_By>;
  min?: Maybe<Image_Owners_Min_Order_By>;
};

export type Image_Owners_Arr_Rel_Insert_Input = {
  data: Array<Image_Owners_Insert_Input>;
  on_conflict?: Maybe<Image_Owners_On_Conflict>;
};

export type Image_Owners_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Image_Owners_Bool_Exp>>>;
  _not?: Maybe<Image_Owners_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Image_Owners_Bool_Exp>>>;
  imageId?: Maybe<String_Comparison_Exp>;
  ownerId?: Maybe<String_Comparison_Exp>;
};

export enum Image_Owners_Constraint {
  IMAGE_OWNERS_IMAGE_ID_KEY = 'image_owners_image_id_key',
  IMAGE_OWNERS_PKEY = 'image_owners_pkey'
}

export type Image_Owners_Insert_Input = {
  imageId?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
};

export type Image_Owners_Max_Fields = {
   __typename?: 'image_owners_max_fields';
  imageId?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
};

export type Image_Owners_Max_Order_By = {
  imageId?: Maybe<Order_By>;
  ownerId?: Maybe<Order_By>;
};

export type Image_Owners_Min_Fields = {
   __typename?: 'image_owners_min_fields';
  imageId?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
};

export type Image_Owners_Min_Order_By = {
  imageId?: Maybe<Order_By>;
  ownerId?: Maybe<Order_By>;
};

export type Image_Owners_Mutation_Response = {
   __typename?: 'image_owners_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Image_Owners>;
};

export type Image_Owners_Obj_Rel_Insert_Input = {
  data: Image_Owners_Insert_Input;
  on_conflict?: Maybe<Image_Owners_On_Conflict>;
};

export type Image_Owners_On_Conflict = {
  constraint: Image_Owners_Constraint;
  update_columns: Array<Image_Owners_Update_Column>;
  where?: Maybe<Image_Owners_Bool_Exp>;
};

export type Image_Owners_Order_By = {
  imageId?: Maybe<Order_By>;
  ownerId?: Maybe<Order_By>;
};

export type Image_Owners_Pk_Columns_Input = {
  imageId: Scalars['String'];
};

export enum Image_Owners_Select_Column {
  IMAGEID = 'imageId',
  OWNERID = 'ownerId'
}

export type Image_Owners_Set_Input = {
  imageId?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
};

export enum Image_Owners_Update_Column {
  IMAGEID = 'imageId',
  OWNERID = 'ownerId'
}

export type Image_Parents = {
   __typename?: 'image_parents';
  createdAt: Scalars['timestamptz'];
  description?: Maybe<Scalars['String']>;
  imageId: Scalars['String'];
  original?: Maybe<Image_Variants>;
  originalVariantId: Scalars['String'];
  tags?: Maybe<Scalars['String']>;
  variants: Array<Image_Variants>;
  variants_aggregate: Image_Variants_Aggregate;
};


export type Image_ParentsVariantsArgs = {
  distinct_on?: Maybe<Array<Image_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Variants_Order_By>>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};


export type Image_ParentsVariants_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Variants_Order_By>>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};

export type Image_Parents_Aggregate = {
   __typename?: 'image_parents_aggregate';
  aggregate?: Maybe<Image_Parents_Aggregate_Fields>;
  nodes: Array<Image_Parents>;
};

export type Image_Parents_Aggregate_Fields = {
   __typename?: 'image_parents_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Image_Parents_Max_Fields>;
  min?: Maybe<Image_Parents_Min_Fields>;
};


export type Image_Parents_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Image_Parents_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Image_Parents_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Image_Parents_Max_Order_By>;
  min?: Maybe<Image_Parents_Min_Order_By>;
};

export type Image_Parents_Arr_Rel_Insert_Input = {
  data: Array<Image_Parents_Insert_Input>;
  on_conflict?: Maybe<Image_Parents_On_Conflict>;
};

export type Image_Parents_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Image_Parents_Bool_Exp>>>;
  _not?: Maybe<Image_Parents_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Image_Parents_Bool_Exp>>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  imageId?: Maybe<String_Comparison_Exp>;
  original?: Maybe<Image_Variants_Bool_Exp>;
  originalVariantId?: Maybe<String_Comparison_Exp>;
  tags?: Maybe<String_Comparison_Exp>;
  variants?: Maybe<Image_Variants_Bool_Exp>;
};

export enum Image_Parents_Constraint {
  IMAGE_PARENTS_IMAGE_ID_KEY = 'image_parents_image_id_key',
  IMAGE_PARENTS_PKEY = 'image_parents_pkey'
}

export type Image_Parents_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  imageId?: Maybe<Scalars['String']>;
  original?: Maybe<Image_Variants_Obj_Rel_Insert_Input>;
  originalVariantId?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  variants?: Maybe<Image_Variants_Arr_Rel_Insert_Input>;
};

export type Image_Parents_Max_Fields = {
   __typename?: 'image_parents_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  imageId?: Maybe<Scalars['String']>;
  originalVariantId?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
};

export type Image_Parents_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  imageId?: Maybe<Order_By>;
  originalVariantId?: Maybe<Order_By>;
  tags?: Maybe<Order_By>;
};

export type Image_Parents_Min_Fields = {
   __typename?: 'image_parents_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  imageId?: Maybe<Scalars['String']>;
  originalVariantId?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
};

export type Image_Parents_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  imageId?: Maybe<Order_By>;
  originalVariantId?: Maybe<Order_By>;
  tags?: Maybe<Order_By>;
};

export type Image_Parents_Mutation_Response = {
   __typename?: 'image_parents_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Image_Parents>;
};

export type Image_Parents_Obj_Rel_Insert_Input = {
  data: Image_Parents_Insert_Input;
  on_conflict?: Maybe<Image_Parents_On_Conflict>;
};

export type Image_Parents_On_Conflict = {
  constraint: Image_Parents_Constraint;
  update_columns: Array<Image_Parents_Update_Column>;
  where?: Maybe<Image_Parents_Bool_Exp>;
};

export type Image_Parents_Order_By = {
  createdAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  imageId?: Maybe<Order_By>;
  original?: Maybe<Image_Variants_Order_By>;
  originalVariantId?: Maybe<Order_By>;
  tags?: Maybe<Order_By>;
  variants_aggregate?: Maybe<Image_Variants_Aggregate_Order_By>;
};

export type Image_Parents_Pk_Columns_Input = {
  imageId: Scalars['String'];
};

export enum Image_Parents_Select_Column {
  CREATEDAT = 'createdAt',
  DESCRIPTION = 'description',
  IMAGEID = 'imageId',
  ORIGINALVARIANTID = 'originalVariantId',
  TAGS = 'tags'
}

export type Image_Parents_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  imageId?: Maybe<Scalars['String']>;
  originalVariantId?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
};

export enum Image_Parents_Update_Column {
  CREATEDAT = 'createdAt',
  DESCRIPTION = 'description',
  IMAGEID = 'imageId',
  ORIGINALVARIANTID = 'originalVariantId',
  TAGS = 'tags'
}

export type Image_Variants = {
   __typename?: 'image_variants';
  heightInPixels: Scalars['Int'];
  mimeType: Scalars['String'];
  parentId: Scalars['String'];
  sizeInBytes: Scalars['Int'];
  url?: Maybe<Scalars['String']>;
  variantId: Scalars['String'];
  widthInPixels: Scalars['Int'];
};

export type Image_Variants_Aggregate = {
   __typename?: 'image_variants_aggregate';
  aggregate?: Maybe<Image_Variants_Aggregate_Fields>;
  nodes: Array<Image_Variants>;
};

export type Image_Variants_Aggregate_Fields = {
   __typename?: 'image_variants_aggregate_fields';
  avg?: Maybe<Image_Variants_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Image_Variants_Max_Fields>;
  min?: Maybe<Image_Variants_Min_Fields>;
  stddev?: Maybe<Image_Variants_Stddev_Fields>;
  stddev_pop?: Maybe<Image_Variants_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Image_Variants_Stddev_Samp_Fields>;
  sum?: Maybe<Image_Variants_Sum_Fields>;
  var_pop?: Maybe<Image_Variants_Var_Pop_Fields>;
  var_samp?: Maybe<Image_Variants_Var_Samp_Fields>;
  variance?: Maybe<Image_Variants_Variance_Fields>;
};


export type Image_Variants_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Image_Variants_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Image_Variants_Aggregate_Order_By = {
  avg?: Maybe<Image_Variants_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Image_Variants_Max_Order_By>;
  min?: Maybe<Image_Variants_Min_Order_By>;
  stddev?: Maybe<Image_Variants_Stddev_Order_By>;
  stddev_pop?: Maybe<Image_Variants_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Image_Variants_Stddev_Samp_Order_By>;
  sum?: Maybe<Image_Variants_Sum_Order_By>;
  var_pop?: Maybe<Image_Variants_Var_Pop_Order_By>;
  var_samp?: Maybe<Image_Variants_Var_Samp_Order_By>;
  variance?: Maybe<Image_Variants_Variance_Order_By>;
};

export type Image_Variants_Arr_Rel_Insert_Input = {
  data: Array<Image_Variants_Insert_Input>;
  on_conflict?: Maybe<Image_Variants_On_Conflict>;
};

export type Image_Variants_Avg_Fields = {
   __typename?: 'image_variants_avg_fields';
  heightInPixels?: Maybe<Scalars['Float']>;
  sizeInBytes?: Maybe<Scalars['Float']>;
  widthInPixels?: Maybe<Scalars['Float']>;
};

export type Image_Variants_Avg_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

export type Image_Variants_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Image_Variants_Bool_Exp>>>;
  _not?: Maybe<Image_Variants_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Image_Variants_Bool_Exp>>>;
  heightInPixels?: Maybe<Int_Comparison_Exp>;
  mimeType?: Maybe<String_Comparison_Exp>;
  parentId?: Maybe<String_Comparison_Exp>;
  sizeInBytes?: Maybe<Int_Comparison_Exp>;
  url?: Maybe<String_Comparison_Exp>;
  variantId?: Maybe<String_Comparison_Exp>;
  widthInPixels?: Maybe<Int_Comparison_Exp>;
};

export enum Image_Variants_Constraint {
  IMAGE_VARIANTS_PKEY = 'image_variants_pkey',
  IMAGE_VARIANTS_VARIANT_ID_KEY = 'image_variants_variant_id_key'
}

export type Image_Variants_Inc_Input = {
  heightInPixels?: Maybe<Scalars['Int']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
  widthInPixels?: Maybe<Scalars['Int']>;
};

export type Image_Variants_Insert_Input = {
  heightInPixels?: Maybe<Scalars['Int']>;
  mimeType?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  variantId?: Maybe<Scalars['String']>;
  widthInPixels?: Maybe<Scalars['Int']>;
};

export type Image_Variants_Max_Fields = {
   __typename?: 'image_variants_max_fields';
  heightInPixels?: Maybe<Scalars['Int']>;
  mimeType?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  variantId?: Maybe<Scalars['String']>;
  widthInPixels?: Maybe<Scalars['Int']>;
};

export type Image_Variants_Max_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  parentId?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
  variantId?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

export type Image_Variants_Min_Fields = {
   __typename?: 'image_variants_min_fields';
  heightInPixels?: Maybe<Scalars['Int']>;
  mimeType?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  variantId?: Maybe<Scalars['String']>;
  widthInPixels?: Maybe<Scalars['Int']>;
};

export type Image_Variants_Min_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  parentId?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
  variantId?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

export type Image_Variants_Mutation_Response = {
   __typename?: 'image_variants_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Image_Variants>;
};

export type Image_Variants_Obj_Rel_Insert_Input = {
  data: Image_Variants_Insert_Input;
  on_conflict?: Maybe<Image_Variants_On_Conflict>;
};

export type Image_Variants_On_Conflict = {
  constraint: Image_Variants_Constraint;
  update_columns: Array<Image_Variants_Update_Column>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};

export type Image_Variants_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  parentId?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
  variantId?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

export type Image_Variants_Pk_Columns_Input = {
  variantId: Scalars['String'];
};

export enum Image_Variants_Select_Column {
  HEIGHTINPIXELS = 'heightInPixels',
  MIMETYPE = 'mimeType',
  PARENTID = 'parentId',
  SIZEINBYTES = 'sizeInBytes',
  URL = 'url',
  VARIANTID = 'variantId',
  WIDTHINPIXELS = 'widthInPixels'
}

export type Image_Variants_Set_Input = {
  heightInPixels?: Maybe<Scalars['Int']>;
  mimeType?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  variantId?: Maybe<Scalars['String']>;
  widthInPixels?: Maybe<Scalars['Int']>;
};

export type Image_Variants_Stddev_Fields = {
   __typename?: 'image_variants_stddev_fields';
  heightInPixels?: Maybe<Scalars['Float']>;
  sizeInBytes?: Maybe<Scalars['Float']>;
  widthInPixels?: Maybe<Scalars['Float']>;
};

export type Image_Variants_Stddev_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

export type Image_Variants_Stddev_Pop_Fields = {
   __typename?: 'image_variants_stddev_pop_fields';
  heightInPixels?: Maybe<Scalars['Float']>;
  sizeInBytes?: Maybe<Scalars['Float']>;
  widthInPixels?: Maybe<Scalars['Float']>;
};

export type Image_Variants_Stddev_Pop_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

export type Image_Variants_Stddev_Samp_Fields = {
   __typename?: 'image_variants_stddev_samp_fields';
  heightInPixels?: Maybe<Scalars['Float']>;
  sizeInBytes?: Maybe<Scalars['Float']>;
  widthInPixels?: Maybe<Scalars['Float']>;
};

export type Image_Variants_Stddev_Samp_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

export type Image_Variants_Sum_Fields = {
   __typename?: 'image_variants_sum_fields';
  heightInPixels?: Maybe<Scalars['Int']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
  widthInPixels?: Maybe<Scalars['Int']>;
};

export type Image_Variants_Sum_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

export enum Image_Variants_Update_Column {
  HEIGHTINPIXELS = 'heightInPixels',
  MIMETYPE = 'mimeType',
  PARENTID = 'parentId',
  SIZEINBYTES = 'sizeInBytes',
  URL = 'url',
  VARIANTID = 'variantId',
  WIDTHINPIXELS = 'widthInPixels'
}

export type Image_Variants_Var_Pop_Fields = {
   __typename?: 'image_variants_var_pop_fields';
  heightInPixels?: Maybe<Scalars['Float']>;
  sizeInBytes?: Maybe<Scalars['Float']>;
  widthInPixels?: Maybe<Scalars['Float']>;
};

export type Image_Variants_Var_Pop_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

export type Image_Variants_Var_Samp_Fields = {
   __typename?: 'image_variants_var_samp_fields';
  heightInPixels?: Maybe<Scalars['Float']>;
  sizeInBytes?: Maybe<Scalars['Float']>;
  widthInPixels?: Maybe<Scalars['Float']>;
};

export type Image_Variants_Var_Samp_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

export type Image_Variants_Variance_Fields = {
   __typename?: 'image_variants_variance_fields';
  heightInPixels?: Maybe<Scalars['Float']>;
  sizeInBytes?: Maybe<Scalars['Float']>;
  widthInPixels?: Maybe<Scalars['Float']>;
};

export type Image_Variants_Variance_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

export type ImageUrl = {
   __typename?: 'ImageUrl';
  url: Scalars['String'];
};

export type ImageVariant = {
   __typename?: 'ImageVariant';
  heightInPixels: Scalars['Int'];
  id: Scalars['ID'];
  mimeType: Scalars['String'];
  sizeInBytes: Scalars['Int'];
  url: Scalars['String'];
  widthInPixels: Scalars['Int'];
};

export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};


export type Json_Comparison_Exp = {
  _eq?: Maybe<Scalars['json']>;
  _gt?: Maybe<Scalars['json']>;
  _gte?: Maybe<Scalars['json']>;
  _in?: Maybe<Array<Scalars['json']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['json']>;
  _lte?: Maybe<Scalars['json']>;
  _neq?: Maybe<Scalars['json']>;
  _nin?: Maybe<Array<Scalars['json']>>;
};

export type LoginMutationResponse = {
   __typename?: 'LoginMutationResponse';
  jwt?: Maybe<Scalars['String']>;
  setCookie?: Maybe<Scalars['String']>;
  user: UserPrivate;
};

export type MostRecentDownloadRecord = {
   __typename?: 'MostRecentDownloadRecord';
  downloadedAt?: Maybe<Scalars['Date']>;
  fileId: Scalars['ID'];
  fileName?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  addPaymentMethod: AddRemovePaymentMethodResponse;
  addProductToCuratedList: CuratedListItemMutationResponse;
  addProductToWishlist: BlankMutationResponse;
  addProductsToCart: Cart;
  addPromoCodeToCart: CartMutationResponse;
  adjustCartItemQuantity: Cart;
  adminCreateAffiliateForUser: BlankMutationResponse;
  adminDeleteAccount: BlankMutationResponse;
  adminDeleteAffiliateForUser: BlankMutationResponse;
  adminDeleteProduct?: Maybe<ProductMutationResponse>;
  adminDeleteStore: StoreMutationResponse;
  adminGenerateProductFileDownloadLink: ProductFileLinkMutationResponse;
  adminManuallyConfirmOrderAfterFrontendPayment: OrderMutationResponse;
  approvePayouts: ApprovePayoutsResult;
  changePassword: UserMutationResponse;
  checkoutCart: OrderCreateMutationResponse;
  checkoutCartForFrontendPayment: OrderMutationResponse;
  checkoutConfirmCart: OrderMutationResponse;
  checkoutConfirmProducts: OrderMutationResponse;
  checkoutProducts: OrderCreateMutationResponse;
  checkoutProductsForFrontendPayment: OrderMutationResponse;
  claimUnclaimedOrderOwnership: OrderMutationResponse;
  confirmOrderAfterFrontendPayment: OrderMutationResponse;
  confirmResetPassword: ResetPasswordResponse;
  createCuratedList: CuratedListMutationResponse;
  createPayoutSplit: PayoutSplit;
  createPayouts: Array<Payout>;
  createPlatformDiscount: DiscountMutationResponse;
  createProduct: ProductMutationResponse;
  createRefund: CreateRefundMutationResponse;
  createStore: StoreMutationResponse;
  createStorePromoCode: DiscountMutationResponse;
  deleteAccount: BlankMutationResponse;
  deleteCuratedList: BlankMutationResponse;
  deleteProduct?: Maybe<ProductMutationResponse>;
  deleteStore: StoreMutationResponse;
  editPlatformDiscount: DiscountMutationResponse;
  editProduct: ProductMutationResponse;
  editStoreProfile?: Maybe<StoreMutationResponse>;
  editStorePromoCode: DiscountMutationResponse;
  editUserProfile: UserMutationResponse;
  excludeProductFromAutomaticLists?: Maybe<ProductMutationResponse>;
  excludeProductFromSearch?: Maybe<ProductMutationResponse>;
  followStore: FollowingStoresConnection;
  generateProductFileDownloadLink: ProductFileLinkMutationResponse;
  includeProductInAutomaticLists?: Maybe<ProductMutationResponse>;
  includeProductInSearch?: Maybe<ProductMutationResponse>;
  logInUsingEmail: LoginMutationResponse;
  logOut: BlankMutationResponse;
  rearrangeCuratedListItems: CuratedListMutationResponse;
  reassignOrderOwnership: OrderMutationResponse;
  recordAffiliateLinkClick: BlankMutationResponse;
  refreshCart: CartMutationResponse;
  removeItemFromCuratedList: CuratedListMutationResponse;
  removePaymentMethod: AddRemovePaymentMethodResponse;
  removeProductFromWishlist: BlankMutationResponse;
  removeProductsFromCart: Cart;
  removePromoCodeFromCart: CartMutationResponse;
  removeStoreLinkSlug: BlankMutationResponse;
  reserveStoreLinkSlug?: Maybe<PrimaryLinkSlugs>;
  sendResetPasswordEmail: SendResetPasswordResponse;
  sendVerifyEmail: UserMutationResponse;
  setDefaultPaymentMethod: AddRemovePaymentMethodResponse;
  setPayoutMethod: UserMutationResponse;
  signUpUsingEmail: SignUpMutationResponse;
  suspendProduct?: Maybe<ProductMutationResponse>;
  suspendStore?: Maybe<StoreMutationResponse>;
  suspendUser: BlankMutationResponse;
  unfollowStore: FollowingStoresConnection;
  unsuspendProduct?: Maybe<ProductMutationResponse>;
  unsuspendStore?: Maybe<StoreMutationResponse>;
  unsuspendUser: BlankMutationResponse;
  uploadRegister: UploadRegisterMutationResponse;
  uploadSaveImage: UploadSaveImageMutationResponse;
  uploadSaveProductFile: UploadSaveProductFileMutationResponse;
  visitStore: FollowingStoresConnection;
};


export type MutationAddPaymentMethodArgs = {
  customerId: Scalars['ID'];
  paymentMethodId: Scalars['ID'];
};


export type MutationAddProductToCuratedListArgs = {
  listId: Scalars['ID'];
  productId: Scalars['ID'];
  variantId?: Maybe<Scalars['ID']>;
};


export type MutationAddProductToWishlistArgs = {
  productId: Scalars['ID'];
  variantId: Scalars['ID'];
};


export type MutationAddProductsToCartArgs = {
  cartId: Scalars['ID'];
  productProductVariantIds: Array<ProductProductVariantId>;
};


export type MutationAddPromoCodeToCartArgs = {
  code: Scalars['String'];
};


export type MutationAdjustCartItemQuantityArgs = {
  cartId: Scalars['ID'];
  itemId: Scalars['ID'];
  quantity?: Maybe<Scalars['Int']>;
};


export type MutationAdminCreateAffiliateForUserArgs = {
  userId: Scalars['ID'];
};


export type MutationAdminDeleteAccountArgs = {
  userId: Scalars['ID'];
};


export type MutationAdminDeleteAffiliateForUserArgs = {
  userId: Scalars['ID'];
};


export type MutationAdminDeleteProductArgs = {
  productId: Scalars['ID'];
};


export type MutationAdminDeleteStoreArgs = {
  storeId: Scalars['ID'];
};


export type MutationAdminGenerateProductFileDownloadLinkArgs = {
  id: Scalars['ID'];
};


export type MutationAdminManuallyConfirmOrderAfterFrontendPaymentArgs = {
  anonOrderEmailAddress?: Maybe<Scalars['String']>;
  cartIdToEmpty?: Maybe<Scalars['ID']>;
  orderId: Scalars['ID'];
  paymentProcessorData: Scalars['String'];
};


export type MutationApprovePayoutsArgs = {
  payoutIds: Array<Scalars['String']>;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationCheckoutCartArgs = {
  paymentProcessorData: Scalars['String'];
  quotedPrice: Scalars['Price'];
};


export type MutationCheckoutCartForFrontendPaymentArgs = {
  quotedPrice: Scalars['Price'];
};


export type MutationCheckoutConfirmCartArgs = {
  paymentProcessorData: Scalars['String'];
  unconfirmedOrderId: Scalars['ID'];
};


export type MutationCheckoutConfirmProductsArgs = {
  anonOrderEmailAddress?: Maybe<Scalars['String']>;
  paymentProcessorData: Scalars['String'];
  unconfirmedOrderId: Scalars['ID'];
};


export type MutationCheckoutProductsArgs = {
  paymentProcessorData: Scalars['String'];
  productsInfo: Array<ProductProductVariantId>;
  promoCodesToAdd?: Maybe<Array<Scalars['String']>>;
  quotedPrice: Scalars['Price'];
};


export type MutationCheckoutProductsForFrontendPaymentArgs = {
  productsInfo: Array<ProductProductVariantId>;
  promoCodesToAdd?: Maybe<Array<Scalars['String']>>;
  quotedPrice: Scalars['Price'];
};


export type MutationClaimUnclaimedOrderOwnershipArgs = {
  orderId: Scalars['ID'];
};


export type MutationConfirmOrderAfterFrontendPaymentArgs = {
  anonOrderEmailAddress?: Maybe<Scalars['String']>;
  orderId: Scalars['ID'];
  paymentProcessorData: Scalars['String'];
};


export type MutationConfirmResetPasswordArgs = {
  email: Scalars['String'];
  expiresAt: Scalars['Date'];
  newPassword?: Maybe<Scalars['String']>;
  resetId: Scalars['String'];
};


export type MutationCreateCuratedListArgs = {
  name: Scalars['String'];
};


export type MutationCreatePayoutSplitArgs = {
  dealType: PayoutDealType;
  expiresAt?: Maybe<Scalars['Date']>;
  rate: Scalars['Float'];
  referrerId?: Maybe<Scalars['String']>;
  storeOrUserId: Scalars['String'];
};


export type MutationCreatePayoutsArgs = {
  month: Scalars['Int'];
  year: Scalars['Int'];
};


export type MutationCreatePlatformDiscountArgs = {
  input: CreatePlatformDiscountInput;
};


export type MutationCreateProductArgs = {
  productCreateInput?: Maybe<ProductCreateInput>;
};


export type MutationCreateRefundArgs = {
  input: CreateRefundInput;
};


export type MutationCreateStoreArgs = {
  bio?: Maybe<Scalars['String']>;
  coverId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  profileId?: Maybe<Scalars['ID']>;
  website?: Maybe<Scalars['String']>;
};


export type MutationCreateStorePromoCodeArgs = {
  input: CreateStorePromoCodeInput;
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String'];
};


export type MutationDeleteCuratedListArgs = {
  listId: Scalars['ID'];
};


export type MutationDeleteProductArgs = {
  productId: Scalars['ID'];
};


export type MutationDeleteStoreArgs = {
  password: Scalars['String'];
};


export type MutationEditPlatformDiscountArgs = {
  input: EditPlatformDiscountInput;
};


export type MutationEditProductArgs = {
  productEditInput?: Maybe<ProductEditInput>;
};


export type MutationEditStoreProfileArgs = {
  bio?: Maybe<Scalars['String']>;
  coverId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['ID']>;
  website?: Maybe<Scalars['String']>;
};


export type MutationEditStorePromoCodeArgs = {
  input: EditStorePromoCodeInput;
};


export type MutationEditUserProfileArgs = {
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  payoutMethod?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};


export type MutationExcludeProductFromAutomaticListsArgs = {
  productId: Scalars['ID'];
};


export type MutationExcludeProductFromSearchArgs = {
  productId: Scalars['ID'];
};


export type MutationFollowStoreArgs = {
  query?: Maybe<ConnectionQuery>;
  storeId: Scalars['ID'];
};


export type MutationGenerateProductFileDownloadLinkArgs = {
  id: Scalars['ID'];
  orderItemId: Scalars['ID'];
};


export type MutationIncludeProductInAutomaticListsArgs = {
  productId: Scalars['ID'];
};


export type MutationIncludeProductInSearchArgs = {
  productId: Scalars['ID'];
};


export type MutationLogInUsingEmailArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  productProductVariantIds?: Maybe<Array<Maybe<ProductProductVariantId>>>;
};


export type MutationRearrangeCuratedListItemsArgs = {
  itemIdsInOrder: Array<Scalars['ID']>;
  listId: Scalars['ID'];
};


export type MutationReassignOrderOwnershipArgs = {
  orderId: Scalars['ID'];
  userIdOrEmail: Scalars['String'];
};


export type MutationRecordAffiliateLinkClickArgs = {
  affiliateId: Scalars['ID'];
  path: Scalars['String'];
};


export type MutationRemoveItemFromCuratedListArgs = {
  itemId: Scalars['ID'];
  listId: Scalars['ID'];
};


export type MutationRemovePaymentMethodArgs = {
  customerId: Scalars['ID'];
  paymentMethodId: Scalars['ID'];
};


export type MutationRemoveProductFromWishlistArgs = {
  productId: Scalars['ID'];
  variantId: Scalars['ID'];
};


export type MutationRemoveProductsFromCartArgs = {
  cartId: Scalars['ID'];
  productProductVariantIds: Array<ProductProductVariantId>;
};


export type MutationRemovePromoCodeFromCartArgs = {
  discountId: Scalars['ID'];
};


export type MutationReserveStoreLinkSlugArgs = {
  slug: Scalars['String'];
};


export type MutationSendResetPasswordEmailArgs = {
  email: Scalars['String'];
};


export type MutationSendVerifyEmailArgs = {
  ref: Scalars['String'];
};


export type MutationSetDefaultPaymentMethodArgs = {
  customerId: Scalars['ID'];
  paymentMethodId: Scalars['ID'];
};


export type MutationSetPayoutMethodArgs = {
  payoutEmail?: Maybe<Scalars['String']>;
  payoutProcessor?: Maybe<Scalars['String']>;
  payoutProcessorId?: Maybe<Scalars['String']>;
  payoutType?: Maybe<Scalars['String']>;
};


export type MutationSignUpUsingEmailArgs = {
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  productProductVariantIds?: Maybe<Array<Maybe<ProductProductVariantId>>>;
  username?: Maybe<Scalars['String']>;
};


export type MutationSuspendProductArgs = {
  productId: Scalars['ID'];
};


export type MutationSuspendStoreArgs = {
  storeId: Scalars['ID'];
};


export type MutationSuspendUserArgs = {
  userId: Scalars['ID'];
};


export type MutationUnfollowStoreArgs = {
  query?: Maybe<ConnectionQuery>;
  storeId: Scalars['ID'];
};


export type MutationUnsuspendProductArgs = {
  productId: Scalars['ID'];
};


export type MutationUnsuspendStoreArgs = {
  storeId: Scalars['ID'];
};


export type MutationUnsuspendUserArgs = {
  userId: Scalars['ID'];
};


export type MutationUploadRegisterArgs = {
  fileSize: Scalars['Int'];
  mimeType: Scalars['String'];
  uploadType: UploadType;
};


export type MutationUploadSaveImageArgs = {
  description?: Maybe<Scalars['String']>;
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  uploadId: Scalars['ID'];
};


export type MutationUploadSaveProductFileArgs = {
  fileName: Scalars['String'];
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  uploadId: Scalars['ID'];
};


export type MutationVisitStoreArgs = {
  query?: Maybe<ConnectionQuery>;
  storeId: Scalars['ID'];
};

export type Mutation_Root = {
   __typename?: 'mutation_root';
  addPaymentMethod: AddRemovePaymentMethodResponse;
  addProductToCuratedList: CuratedListItemMutationResponse;
  addProductToWishlist: BlankMutationResponse;
  addProductsToCart: Cart;
  addPromoCodeToCart: CartMutationResponse;
  adjustCartItemQuantity: Cart;
  adminCreateAffiliateForUser: BlankMutationResponse;
  adminDeleteAccount: BlankMutationResponse;
  adminDeleteAffiliateForUser: BlankMutationResponse;
  adminDeleteProduct?: Maybe<ProductMutationResponse>;
  adminDeleteStore: StoreMutationResponse;
  adminGenerateProductFileDownloadLink: ProductFileLinkMutationResponse;
  adminManuallyConfirmOrderAfterFrontendPayment: OrderMutationResponse;
  approvePayouts: ApprovePayoutsResult;
  changePassword: UserMutationResponse;
  checkoutCart: OrderCreateMutationResponse;
  checkoutCartForFrontendPayment: OrderMutationResponse;
  checkoutConfirmCart: OrderMutationResponse;
  checkoutConfirmProducts: OrderMutationResponse;
  checkoutProducts: OrderCreateMutationResponse;
  checkoutProductsForFrontendPayment: OrderMutationResponse;
  claimUnclaimedOrderOwnership: OrderMutationResponse;
  confirmOrderAfterFrontendPayment: OrderMutationResponse;
  confirmResetPassword: ResetPasswordResponse;
  createCuratedList: CuratedListMutationResponse;
  createPayoutSplit: PayoutSplit;
  createPayouts: Array<Payout>;
  createPlatformDiscount: DiscountMutationResponse;
  createProduct: ProductMutationResponse;
  createRefund: CreateRefundMutationResponse;
  createStore: StoreMutationResponse;
  createStorePromoCode: DiscountMutationResponse;
  deleteAccount: BlankMutationResponse;
  deleteCuratedList: BlankMutationResponse;
  deleteProduct?: Maybe<ProductMutationResponse>;
  deleteStore: StoreMutationResponse;
  delete_image_owners?: Maybe<Image_Owners_Mutation_Response>;
  delete_image_owners_by_pk?: Maybe<Image_Owners>;
  delete_image_parents?: Maybe<Image_Parents_Mutation_Response>;
  delete_image_parents_by_pk?: Maybe<Image_Parents>;
  delete_image_variants?: Maybe<Image_Variants_Mutation_Response>;
  delete_image_variants_by_pk?: Maybe<Image_Variants>;
  delete_online_users?: Maybe<Online_Users_Mutation_Response>;
  delete_product_file_owners?: Maybe<Product_File_Owners_Mutation_Response>;
  delete_product_file_owners_by_pk?: Maybe<Product_File_Owners>;
  delete_product_files?: Maybe<Product_Files_Mutation_Response>;
  delete_product_files_by_pk?: Maybe<Product_Files>;
  delete_product_preview_items?: Maybe<Product_Preview_Items_Mutation_Response>;
  delete_product_preview_items_by_pk?: Maybe<Product_Preview_Items>;
  delete_product_snapshots?: Maybe<Product_Snapshots_Mutation_Response>;
  delete_product_snapshots_by_pk?: Maybe<Product_Snapshots>;
  delete_product_variants?: Maybe<Product_Variants_Mutation_Response>;
  delete_product_variants_by_pk?: Maybe<Product_Variants>;
  delete_products?: Maybe<Products_Mutation_Response>;
  delete_products_by_pk?: Maybe<Products>;
  delete_users?: Maybe<Users_Mutation_Response>;
  delete_users_by_pk?: Maybe<Users>;
  editPlatformDiscount: DiscountMutationResponse;
  editProduct: ProductMutationResponse;
  editStoreProfile?: Maybe<StoreMutationResponse>;
  editStorePromoCode: DiscountMutationResponse;
  editUserProfile: UserMutationResponse;
  excludeProductFromAutomaticLists?: Maybe<ProductMutationResponse>;
  excludeProductFromSearch?: Maybe<ProductMutationResponse>;
  followStore: FollowingStoresConnection;
  generateProductFileDownloadLink: ProductFileLinkMutationResponse;
  includeProductInAutomaticLists?: Maybe<ProductMutationResponse>;
  includeProductInSearch?: Maybe<ProductMutationResponse>;
  insert_image_owners?: Maybe<Image_Owners_Mutation_Response>;
  insert_image_owners_one?: Maybe<Image_Owners>;
  insert_image_parents?: Maybe<Image_Parents_Mutation_Response>;
  insert_image_parents_one?: Maybe<Image_Parents>;
  insert_image_variants?: Maybe<Image_Variants_Mutation_Response>;
  insert_image_variants_one?: Maybe<Image_Variants>;
  insert_online_users?: Maybe<Online_Users_Mutation_Response>;
  insert_online_users_one?: Maybe<Online_Users>;
  insert_product_file_owners?: Maybe<Product_File_Owners_Mutation_Response>;
  insert_product_file_owners_one?: Maybe<Product_File_Owners>;
  insert_product_files?: Maybe<Product_Files_Mutation_Response>;
  insert_product_files_one?: Maybe<Product_Files>;
  insert_product_preview_items?: Maybe<Product_Preview_Items_Mutation_Response>;
  insert_product_preview_items_one?: Maybe<Product_Preview_Items>;
  insert_product_snapshots?: Maybe<Product_Snapshots_Mutation_Response>;
  insert_product_snapshots_one?: Maybe<Product_Snapshots>;
  insert_product_variants?: Maybe<Product_Variants_Mutation_Response>;
  insert_product_variants_one?: Maybe<Product_Variants>;
  insert_products?: Maybe<Products_Mutation_Response>;
  insert_products_one?: Maybe<Products>;
  insert_users?: Maybe<Users_Mutation_Response>;
  insert_users_one?: Maybe<Users>;
  logInUsingEmail: LoginMutationResponse;
  logOut: BlankMutationResponse;
  rearrangeCuratedListItems: CuratedListMutationResponse;
  reassignOrderOwnership: OrderMutationResponse;
  recordAffiliateLinkClick: BlankMutationResponse;
  refreshCart: CartMutationResponse;
  removeItemFromCuratedList: CuratedListMutationResponse;
  removePaymentMethod: AddRemovePaymentMethodResponse;
  removeProductFromWishlist: BlankMutationResponse;
  removeProductsFromCart: Cart;
  removePromoCodeFromCart: CartMutationResponse;
  removeStoreLinkSlug: BlankMutationResponse;
  reserveStoreLinkSlug?: Maybe<PrimaryLinkSlugs>;
  sendResetPasswordEmail: SendResetPasswordResponse;
  sendVerifyEmail: UserMutationResponse;
  setDefaultPaymentMethod: AddRemovePaymentMethodResponse;
  setPayoutMethod: UserMutationResponse;
  signUpUsingEmail: SignUpMutationResponse;
  suspendProduct?: Maybe<ProductMutationResponse>;
  suspendStore?: Maybe<StoreMutationResponse>;
  suspendUser: BlankMutationResponse;
  unfollowStore: FollowingStoresConnection;
  unsuspendProduct?: Maybe<ProductMutationResponse>;
  unsuspendStore?: Maybe<StoreMutationResponse>;
  unsuspendUser: BlankMutationResponse;
  update_image_owners?: Maybe<Image_Owners_Mutation_Response>;
  update_image_owners_by_pk?: Maybe<Image_Owners>;
  update_image_parents?: Maybe<Image_Parents_Mutation_Response>;
  update_image_parents_by_pk?: Maybe<Image_Parents>;
  update_image_variants?: Maybe<Image_Variants_Mutation_Response>;
  update_image_variants_by_pk?: Maybe<Image_Variants>;
  update_online_users?: Maybe<Online_Users_Mutation_Response>;
  update_product_file_owners?: Maybe<Product_File_Owners_Mutation_Response>;
  update_product_file_owners_by_pk?: Maybe<Product_File_Owners>;
  update_product_files?: Maybe<Product_Files_Mutation_Response>;
  update_product_files_by_pk?: Maybe<Product_Files>;
  update_product_preview_items?: Maybe<Product_Preview_Items_Mutation_Response>;
  update_product_preview_items_by_pk?: Maybe<Product_Preview_Items>;
  update_product_snapshots?: Maybe<Product_Snapshots_Mutation_Response>;
  update_product_snapshots_by_pk?: Maybe<Product_Snapshots>;
  update_product_variants?: Maybe<Product_Variants_Mutation_Response>;
  update_product_variants_by_pk?: Maybe<Product_Variants>;
  update_products?: Maybe<Products_Mutation_Response>;
  update_products_by_pk?: Maybe<Products>;
  update_users?: Maybe<Users_Mutation_Response>;
  update_users_by_pk?: Maybe<Users>;
  uploadRegister: UploadRegisterMutationResponse;
  uploadSaveImage: UploadSaveImageMutationResponse;
  uploadSaveProductFile: UploadSaveProductFileMutationResponse;
  url?: Maybe<ImageUrl>;
  visitStore: FollowingStoresConnection;
};


export type Mutation_RootAddPaymentMethodArgs = {
  customerId: Scalars['ID'];
  paymentMethodId: Scalars['ID'];
};


export type Mutation_RootAddProductToCuratedListArgs = {
  listId: Scalars['ID'];
  productId: Scalars['ID'];
  variantId?: Maybe<Scalars['ID']>;
};


export type Mutation_RootAddProductToWishlistArgs = {
  productId: Scalars['ID'];
  variantId: Scalars['ID'];
};


export type Mutation_RootAddProductsToCartArgs = {
  cartId: Scalars['ID'];
  productProductVariantIds: Array<ProductProductVariantId>;
};


export type Mutation_RootAddPromoCodeToCartArgs = {
  code: Scalars['String'];
};


export type Mutation_RootAdjustCartItemQuantityArgs = {
  cartId: Scalars['ID'];
  itemId: Scalars['ID'];
  quantity?: Maybe<Scalars['Int']>;
};


export type Mutation_RootAdminCreateAffiliateForUserArgs = {
  userId: Scalars['ID'];
};


export type Mutation_RootAdminDeleteAccountArgs = {
  userId: Scalars['ID'];
};


export type Mutation_RootAdminDeleteAffiliateForUserArgs = {
  userId: Scalars['ID'];
};


export type Mutation_RootAdminDeleteProductArgs = {
  productId: Scalars['ID'];
};


export type Mutation_RootAdminDeleteStoreArgs = {
  storeId: Scalars['ID'];
};


export type Mutation_RootAdminGenerateProductFileDownloadLinkArgs = {
  id: Scalars['ID'];
};


export type Mutation_RootAdminManuallyConfirmOrderAfterFrontendPaymentArgs = {
  anonOrderEmailAddress?: Maybe<Scalars['String']>;
  cartIdToEmpty?: Maybe<Scalars['ID']>;
  orderId: Scalars['ID'];
  paymentProcessorData: Scalars['String'];
};


export type Mutation_RootApprovePayoutsArgs = {
  payoutIds: Array<Scalars['String']>;
};


export type Mutation_RootChangePasswordArgs = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type Mutation_RootCheckoutCartArgs = {
  paymentProcessorData: Scalars['String'];
  quotedPrice: Scalars['Price'];
};


export type Mutation_RootCheckoutCartForFrontendPaymentArgs = {
  quotedPrice: Scalars['Price'];
};


export type Mutation_RootCheckoutConfirmCartArgs = {
  paymentProcessorData: Scalars['String'];
  unconfirmedOrderId: Scalars['ID'];
};


export type Mutation_RootCheckoutConfirmProductsArgs = {
  anonOrderEmailAddress?: Maybe<Scalars['String']>;
  paymentProcessorData: Scalars['String'];
  unconfirmedOrderId: Scalars['ID'];
};


export type Mutation_RootCheckoutProductsArgs = {
  paymentProcessorData: Scalars['String'];
  productsInfo: Array<ProductProductVariantId>;
  promoCodesToAdd?: Maybe<Array<Scalars['String']>>;
  quotedPrice: Scalars['Price'];
};


export type Mutation_RootCheckoutProductsForFrontendPaymentArgs = {
  productsInfo: Array<ProductProductVariantId>;
  promoCodesToAdd?: Maybe<Array<Scalars['String']>>;
  quotedPrice: Scalars['Price'];
};


export type Mutation_RootClaimUnclaimedOrderOwnershipArgs = {
  orderId: Scalars['ID'];
};


export type Mutation_RootConfirmOrderAfterFrontendPaymentArgs = {
  anonOrderEmailAddress?: Maybe<Scalars['String']>;
  orderId: Scalars['ID'];
  paymentProcessorData: Scalars['String'];
};


export type Mutation_RootConfirmResetPasswordArgs = {
  email: Scalars['String'];
  expiresAt: Scalars['Date'];
  newPassword?: Maybe<Scalars['String']>;
  resetId: Scalars['String'];
};


export type Mutation_RootCreateCuratedListArgs = {
  name: Scalars['String'];
};


export type Mutation_RootCreatePayoutSplitArgs = {
  dealType: PayoutDealType;
  expiresAt?: Maybe<Scalars['Date']>;
  rate: Scalars['Float'];
  referrerId?: Maybe<Scalars['String']>;
  storeOrUserId: Scalars['String'];
};


export type Mutation_RootCreatePayoutsArgs = {
  month: Scalars['Int'];
  year: Scalars['Int'];
};


export type Mutation_RootCreatePlatformDiscountArgs = {
  input: CreatePlatformDiscountInput;
};


export type Mutation_RootCreateProductArgs = {
  productCreateInput?: Maybe<ProductCreateInput>;
};


export type Mutation_RootCreateRefundArgs = {
  input: CreateRefundInput;
};


export type Mutation_RootCreateStoreArgs = {
  bio?: Maybe<Scalars['String']>;
  coverId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  profileId?: Maybe<Scalars['ID']>;
  website?: Maybe<Scalars['String']>;
};


export type Mutation_RootCreateStorePromoCodeArgs = {
  input: CreateStorePromoCodeInput;
};


export type Mutation_RootDeleteAccountArgs = {
  password: Scalars['String'];
};


export type Mutation_RootDeleteCuratedListArgs = {
  listId: Scalars['ID'];
};


export type Mutation_RootDeleteProductArgs = {
  productId: Scalars['ID'];
};


export type Mutation_RootDeleteStoreArgs = {
  password: Scalars['String'];
};


export type Mutation_RootDelete_Image_OwnersArgs = {
  where: Image_Owners_Bool_Exp;
};


export type Mutation_RootDelete_Image_Owners_By_PkArgs = {
  imageId: Scalars['String'];
};


export type Mutation_RootDelete_Image_ParentsArgs = {
  where: Image_Parents_Bool_Exp;
};


export type Mutation_RootDelete_Image_Parents_By_PkArgs = {
  imageId: Scalars['String'];
};


export type Mutation_RootDelete_Image_VariantsArgs = {
  where: Image_Variants_Bool_Exp;
};


export type Mutation_RootDelete_Image_Variants_By_PkArgs = {
  variantId: Scalars['String'];
};


export type Mutation_RootDelete_Online_UsersArgs = {
  where: Online_Users_Bool_Exp;
};


export type Mutation_RootDelete_Product_File_OwnersArgs = {
  where: Product_File_Owners_Bool_Exp;
};


export type Mutation_RootDelete_Product_File_Owners_By_PkArgs = {
  productFileId: Scalars['String'];
};


export type Mutation_RootDelete_Product_FilesArgs = {
  where: Product_Files_Bool_Exp;
};


export type Mutation_RootDelete_Product_Files_By_PkArgs = {
  productFileId: Scalars['String'];
};


export type Mutation_RootDelete_Product_Preview_ItemsArgs = {
  where: Product_Preview_Items_Bool_Exp;
};


export type Mutation_RootDelete_Product_Preview_Items_By_PkArgs = {
  id: Scalars['String'];
};


export type Mutation_RootDelete_Product_SnapshotsArgs = {
  where: Product_Snapshots_Bool_Exp;
};


export type Mutation_RootDelete_Product_Snapshots_By_PkArgs = {
  id: Scalars['String'];
};


export type Mutation_RootDelete_Product_VariantsArgs = {
  where: Product_Variants_Bool_Exp;
};


export type Mutation_RootDelete_Product_Variants_By_PkArgs = {
  variantSnapshotId: Scalars['String'];
};


export type Mutation_RootDelete_ProductsArgs = {
  where: Products_Bool_Exp;
};


export type Mutation_RootDelete_Products_By_PkArgs = {
  id: Scalars['String'];
};


export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['String'];
};


export type Mutation_RootEditPlatformDiscountArgs = {
  input: EditPlatformDiscountInput;
};


export type Mutation_RootEditProductArgs = {
  productEditInput?: Maybe<ProductEditInput>;
};


export type Mutation_RootEditStoreProfileArgs = {
  bio?: Maybe<Scalars['String']>;
  coverId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['ID']>;
  website?: Maybe<Scalars['String']>;
};


export type Mutation_RootEditStorePromoCodeArgs = {
  input: EditStorePromoCodeInput;
};


export type Mutation_RootEditUserProfileArgs = {
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  payoutMethod?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};


export type Mutation_RootExcludeProductFromAutomaticListsArgs = {
  productId: Scalars['ID'];
};


export type Mutation_RootExcludeProductFromSearchArgs = {
  productId: Scalars['ID'];
};


export type Mutation_RootFollowStoreArgs = {
  query?: Maybe<ConnectionQuery>;
  storeId: Scalars['ID'];
};


export type Mutation_RootGenerateProductFileDownloadLinkArgs = {
  id: Scalars['ID'];
  orderItemId: Scalars['ID'];
};


export type Mutation_RootIncludeProductInAutomaticListsArgs = {
  productId: Scalars['ID'];
};


export type Mutation_RootIncludeProductInSearchArgs = {
  productId: Scalars['ID'];
};


export type Mutation_RootInsert_Image_OwnersArgs = {
  objects: Array<Image_Owners_Insert_Input>;
  on_conflict?: Maybe<Image_Owners_On_Conflict>;
};


export type Mutation_RootInsert_Image_Owners_OneArgs = {
  object: Image_Owners_Insert_Input;
  on_conflict?: Maybe<Image_Owners_On_Conflict>;
};


export type Mutation_RootInsert_Image_ParentsArgs = {
  objects: Array<Image_Parents_Insert_Input>;
  on_conflict?: Maybe<Image_Parents_On_Conflict>;
};


export type Mutation_RootInsert_Image_Parents_OneArgs = {
  object: Image_Parents_Insert_Input;
  on_conflict?: Maybe<Image_Parents_On_Conflict>;
};


export type Mutation_RootInsert_Image_VariantsArgs = {
  objects: Array<Image_Variants_Insert_Input>;
  on_conflict?: Maybe<Image_Variants_On_Conflict>;
};


export type Mutation_RootInsert_Image_Variants_OneArgs = {
  object: Image_Variants_Insert_Input;
  on_conflict?: Maybe<Image_Variants_On_Conflict>;
};


export type Mutation_RootInsert_Online_UsersArgs = {
  objects: Array<Online_Users_Insert_Input>;
};


export type Mutation_RootInsert_Online_Users_OneArgs = {
  object: Online_Users_Insert_Input;
};


export type Mutation_RootInsert_Product_File_OwnersArgs = {
  objects: Array<Product_File_Owners_Insert_Input>;
  on_conflict?: Maybe<Product_File_Owners_On_Conflict>;
};


export type Mutation_RootInsert_Product_File_Owners_OneArgs = {
  object: Product_File_Owners_Insert_Input;
  on_conflict?: Maybe<Product_File_Owners_On_Conflict>;
};


export type Mutation_RootInsert_Product_FilesArgs = {
  objects: Array<Product_Files_Insert_Input>;
  on_conflict?: Maybe<Product_Files_On_Conflict>;
};


export type Mutation_RootInsert_Product_Files_OneArgs = {
  object: Product_Files_Insert_Input;
  on_conflict?: Maybe<Product_Files_On_Conflict>;
};


export type Mutation_RootInsert_Product_Preview_ItemsArgs = {
  objects: Array<Product_Preview_Items_Insert_Input>;
  on_conflict?: Maybe<Product_Preview_Items_On_Conflict>;
};


export type Mutation_RootInsert_Product_Preview_Items_OneArgs = {
  object: Product_Preview_Items_Insert_Input;
  on_conflict?: Maybe<Product_Preview_Items_On_Conflict>;
};


export type Mutation_RootInsert_Product_SnapshotsArgs = {
  objects: Array<Product_Snapshots_Insert_Input>;
  on_conflict?: Maybe<Product_Snapshots_On_Conflict>;
};


export type Mutation_RootInsert_Product_Snapshots_OneArgs = {
  object: Product_Snapshots_Insert_Input;
  on_conflict?: Maybe<Product_Snapshots_On_Conflict>;
};


export type Mutation_RootInsert_Product_VariantsArgs = {
  objects: Array<Product_Variants_Insert_Input>;
  on_conflict?: Maybe<Product_Variants_On_Conflict>;
};


export type Mutation_RootInsert_Product_Variants_OneArgs = {
  object: Product_Variants_Insert_Input;
  on_conflict?: Maybe<Product_Variants_On_Conflict>;
};


export type Mutation_RootInsert_ProductsArgs = {
  objects: Array<Products_Insert_Input>;
  on_conflict?: Maybe<Products_On_Conflict>;
};


export type Mutation_RootInsert_Products_OneArgs = {
  object: Products_Insert_Input;
  on_conflict?: Maybe<Products_On_Conflict>;
};


export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};


export type Mutation_RootLogInUsingEmailArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  productProductVariantIds?: Maybe<Array<Maybe<ProductProductVariantId>>>;
};


export type Mutation_RootRearrangeCuratedListItemsArgs = {
  itemIdsInOrder: Array<Scalars['ID']>;
  listId: Scalars['ID'];
};


export type Mutation_RootReassignOrderOwnershipArgs = {
  orderId: Scalars['ID'];
  userIdOrEmail: Scalars['String'];
};


export type Mutation_RootRecordAffiliateLinkClickArgs = {
  affiliateId: Scalars['ID'];
  path: Scalars['String'];
};


export type Mutation_RootRemoveItemFromCuratedListArgs = {
  itemId: Scalars['ID'];
  listId: Scalars['ID'];
};


export type Mutation_RootRemovePaymentMethodArgs = {
  customerId: Scalars['ID'];
  paymentMethodId: Scalars['ID'];
};


export type Mutation_RootRemoveProductFromWishlistArgs = {
  productId: Scalars['ID'];
  variantId: Scalars['ID'];
};


export type Mutation_RootRemoveProductsFromCartArgs = {
  cartId: Scalars['ID'];
  productProductVariantIds: Array<ProductProductVariantId>;
};


export type Mutation_RootRemovePromoCodeFromCartArgs = {
  discountId: Scalars['ID'];
};


export type Mutation_RootReserveStoreLinkSlugArgs = {
  slug: Scalars['String'];
};


export type Mutation_RootSendResetPasswordEmailArgs = {
  email: Scalars['String'];
};


export type Mutation_RootSendVerifyEmailArgs = {
  ref: Scalars['String'];
};


export type Mutation_RootSetDefaultPaymentMethodArgs = {
  customerId: Scalars['ID'];
  paymentMethodId: Scalars['ID'];
};


export type Mutation_RootSetPayoutMethodArgs = {
  payoutEmail?: Maybe<Scalars['String']>;
  payoutProcessor?: Maybe<Scalars['String']>;
  payoutProcessorId?: Maybe<Scalars['String']>;
  payoutType?: Maybe<Scalars['String']>;
};


export type Mutation_RootSignUpUsingEmailArgs = {
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  productProductVariantIds?: Maybe<Array<Maybe<ProductProductVariantId>>>;
  username?: Maybe<Scalars['String']>;
};


export type Mutation_RootSuspendProductArgs = {
  productId: Scalars['ID'];
};


export type Mutation_RootSuspendStoreArgs = {
  storeId: Scalars['ID'];
};


export type Mutation_RootSuspendUserArgs = {
  userId: Scalars['ID'];
};


export type Mutation_RootUnfollowStoreArgs = {
  query?: Maybe<ConnectionQuery>;
  storeId: Scalars['ID'];
};


export type Mutation_RootUnsuspendProductArgs = {
  productId: Scalars['ID'];
};


export type Mutation_RootUnsuspendStoreArgs = {
  storeId: Scalars['ID'];
};


export type Mutation_RootUnsuspendUserArgs = {
  userId: Scalars['ID'];
};


export type Mutation_RootUpdate_Image_OwnersArgs = {
  _set?: Maybe<Image_Owners_Set_Input>;
  where: Image_Owners_Bool_Exp;
};


export type Mutation_RootUpdate_Image_Owners_By_PkArgs = {
  _set?: Maybe<Image_Owners_Set_Input>;
  pk_columns: Image_Owners_Pk_Columns_Input;
};


export type Mutation_RootUpdate_Image_ParentsArgs = {
  _set?: Maybe<Image_Parents_Set_Input>;
  where: Image_Parents_Bool_Exp;
};


export type Mutation_RootUpdate_Image_Parents_By_PkArgs = {
  _set?: Maybe<Image_Parents_Set_Input>;
  pk_columns: Image_Parents_Pk_Columns_Input;
};


export type Mutation_RootUpdate_Image_VariantsArgs = {
  _inc?: Maybe<Image_Variants_Inc_Input>;
  _set?: Maybe<Image_Variants_Set_Input>;
  where: Image_Variants_Bool_Exp;
};


export type Mutation_RootUpdate_Image_Variants_By_PkArgs = {
  _inc?: Maybe<Image_Variants_Inc_Input>;
  _set?: Maybe<Image_Variants_Set_Input>;
  pk_columns: Image_Variants_Pk_Columns_Input;
};


export type Mutation_RootUpdate_Online_UsersArgs = {
  _set?: Maybe<Online_Users_Set_Input>;
  where: Online_Users_Bool_Exp;
};


export type Mutation_RootUpdate_Product_File_OwnersArgs = {
  _set?: Maybe<Product_File_Owners_Set_Input>;
  where: Product_File_Owners_Bool_Exp;
};


export type Mutation_RootUpdate_Product_File_Owners_By_PkArgs = {
  _set?: Maybe<Product_File_Owners_Set_Input>;
  pk_columns: Product_File_Owners_Pk_Columns_Input;
};


export type Mutation_RootUpdate_Product_FilesArgs = {
  _inc?: Maybe<Product_Files_Inc_Input>;
  _set?: Maybe<Product_Files_Set_Input>;
  where: Product_Files_Bool_Exp;
};


export type Mutation_RootUpdate_Product_Files_By_PkArgs = {
  _inc?: Maybe<Product_Files_Inc_Input>;
  _set?: Maybe<Product_Files_Set_Input>;
  pk_columns: Product_Files_Pk_Columns_Input;
};


export type Mutation_RootUpdate_Product_Preview_ItemsArgs = {
  _inc?: Maybe<Product_Preview_Items_Inc_Input>;
  _set?: Maybe<Product_Preview_Items_Set_Input>;
  where: Product_Preview_Items_Bool_Exp;
};


export type Mutation_RootUpdate_Product_Preview_Items_By_PkArgs = {
  _inc?: Maybe<Product_Preview_Items_Inc_Input>;
  _set?: Maybe<Product_Preview_Items_Set_Input>;
  pk_columns: Product_Preview_Items_Pk_Columns_Input;
};


export type Mutation_RootUpdate_Product_SnapshotsArgs = {
  _set?: Maybe<Product_Snapshots_Set_Input>;
  where: Product_Snapshots_Bool_Exp;
};


export type Mutation_RootUpdate_Product_Snapshots_By_PkArgs = {
  _set?: Maybe<Product_Snapshots_Set_Input>;
  pk_columns: Product_Snapshots_Pk_Columns_Input;
};


export type Mutation_RootUpdate_Product_VariantsArgs = {
  _inc?: Maybe<Product_Variants_Inc_Input>;
  _set?: Maybe<Product_Variants_Set_Input>;
  where: Product_Variants_Bool_Exp;
};


export type Mutation_RootUpdate_Product_Variants_By_PkArgs = {
  _inc?: Maybe<Product_Variants_Inc_Input>;
  _set?: Maybe<Product_Variants_Set_Input>;
  pk_columns: Product_Variants_Pk_Columns_Input;
};


export type Mutation_RootUpdate_ProductsArgs = {
  _set?: Maybe<Products_Set_Input>;
  where: Products_Bool_Exp;
};


export type Mutation_RootUpdate_Products_By_PkArgs = {
  _set?: Maybe<Products_Set_Input>;
  pk_columns: Products_Pk_Columns_Input;
};


export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


export type Mutation_RootUploadRegisterArgs = {
  fileSize: Scalars['Int'];
  mimeType: Scalars['String'];
  uploadType: UploadType;
};


export type Mutation_RootUploadSaveImageArgs = {
  description?: Maybe<Scalars['String']>;
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  uploadId: Scalars['ID'];
};


export type Mutation_RootUploadSaveProductFileArgs = {
  fileName: Scalars['String'];
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  uploadId: Scalars['ID'];
};


export type Mutation_RootUrlArgs = {
  image_id?: Maybe<Scalars['String']>;
};


export type Mutation_RootVisitStoreArgs = {
  query?: Maybe<ConnectionQuery>;
  storeId: Scalars['ID'];
};

export type MutationError = {
   __typename?: 'MutationError';
  code: Scalars['String'];
  debugMessage?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type MutationErrorSummary = {
   __typename?: 'MutationErrorSummary';
  errors?: Maybe<Array<Maybe<MutationError>>>;
  shouldRetry?: Maybe<Scalars['Boolean']>;
};

export type Online_Users = {
   __typename?: 'online_users';
  id?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
};

export type Online_Users_Aggregate = {
   __typename?: 'online_users_aggregate';
  aggregate?: Maybe<Online_Users_Aggregate_Fields>;
  nodes: Array<Online_Users>;
};

export type Online_Users_Aggregate_Fields = {
   __typename?: 'online_users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Online_Users_Max_Fields>;
  min?: Maybe<Online_Users_Min_Fields>;
};


export type Online_Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Online_Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Online_Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Online_Users_Max_Order_By>;
  min?: Maybe<Online_Users_Min_Order_By>;
};

export type Online_Users_Arr_Rel_Insert_Input = {
  data: Array<Online_Users_Insert_Input>;
};

export type Online_Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Online_Users_Bool_Exp>>>;
  _not?: Maybe<Online_Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Online_Users_Bool_Exp>>>;
  id?: Maybe<String_Comparison_Exp>;
  lastSeen?: Maybe<Timestamptz_Comparison_Exp>;
};

export type Online_Users_Insert_Input = {
  id?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
};

export type Online_Users_Max_Fields = {
   __typename?: 'online_users_max_fields';
  id?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
};

export type Online_Users_Max_Order_By = {
  id?: Maybe<Order_By>;
  lastSeen?: Maybe<Order_By>;
};

export type Online_Users_Min_Fields = {
   __typename?: 'online_users_min_fields';
  id?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
};

export type Online_Users_Min_Order_By = {
  id?: Maybe<Order_By>;
  lastSeen?: Maybe<Order_By>;
};

export type Online_Users_Mutation_Response = {
   __typename?: 'online_users_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Online_Users>;
};

export type Online_Users_Obj_Rel_Insert_Input = {
  data: Online_Users_Insert_Input;
};

export type Online_Users_Order_By = {
  id?: Maybe<Order_By>;
  lastSeen?: Maybe<Order_By>;
};

export enum Online_Users_Select_Column {
  ID = 'id',
  LASTSEEN = 'lastSeen'
}

export type Online_Users_Set_Input = {
  id?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
};

export type Order = {
   __typename?: 'Order';
  attachedPromoCodes: Array<Discount>;
  createdAt: Scalars['Date'];
  currentSnapshot: OrderSnapshot;
  id: Scalars['ID'];
  isCartlessPurchase: Scalars['Boolean'];
  isLoggedOutPurchase: Scalars['Boolean'];
  isMobilePurchase: Scalars['Boolean'];
  items: Array<OrderItem>;
  updatedAt?: Maybe<Scalars['Date']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']>;
};

export enum Order_By {
  ASC = 'asc',
  ASC_NULLS_FIRST = 'asc_nulls_first',
  ASC_NULLS_LAST = 'asc_nulls_last',
  DESC = 'desc',
  DESC_NULLS_FIRST = 'desc_nulls_first',
  DESC_NULLS_LAST = 'desc_nulls_last'
}

export type OrderCreateMutationResponse = {
   __typename?: 'OrderCreateMutationResponse';
  paymentProcessorResponse: Scalars['String'];
  unconfirmedOrder: Order;
};

export type OrderItem = {
   __typename?: 'OrderItem';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  mostRecentDownloadRecords: Array<MostRecentDownloadRecord>;
  orderId: Scalars['ID'];
  orderStatus: OrderStatus;
  priceDetails: PriceDetails;
  product: Product;
  productId: Scalars['ID'];
  productSnapshotId: Scalars['ID'];
  quantity?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Date']>;
  userId?: Maybe<Scalars['ID']>;
  variantId: Scalars['ID'];
  variantSnapshotId: Scalars['ID'];
};

export type OrderMutationResponse = {
   __typename?: 'OrderMutationResponse';
  order: Order;
};

export type OrdersConnection = Connection & {
   __typename?: 'OrdersConnection';
  edges: Array<OrdersEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type OrdersEdge = Edge & {
   __typename?: 'OrdersEdge';
  cursor: Scalars['PageCursor'];
  node: Order;
};

export type OrderSnapshot = {
   __typename?: 'OrderSnapshot';
  automaticSavings: Scalars['Price'];
  createdAt: Scalars['Date'];
  currency?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  orderId: Scalars['ID'];
  orderStatus: OrderStatus;
  paymentProcessingFee: Scalars['Price'];
  paymentProcessor?: Maybe<PaymentProcessor>;
  promoCodeSavings: Scalars['Price'];
  subtotal: Scalars['Price'];
  taxes: Scalars['Price'];
  total: Scalars['Price'];
  transaction?: Maybe<Transaction>;
  transactionId?: Maybe<Scalars['ID']>;
};

export enum OrderStatus {
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED',
  CREATED = 'CREATED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
  REFUNDED = 'REFUNDED'
}

export type PageBasedConnection = {
  pageInfo: PageBasedConnectionPageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PageBasedConnectionEdge = {
  pageNumber: Scalars['Int'];
};

export type PageBasedConnectionPageInfo = {
   __typename?: 'PageBasedConnectionPageInfo';
  isLastPage: Scalars['Boolean'];
  pageNumber: Scalars['Int'];
  totalPages?: Maybe<Scalars['Int']>;
};

export type PageBasedConnectionQuery = {
  count?: Maybe<Scalars['Int']>;
  pageNumber?: Maybe<Scalars['Int']>;
  sortAscending?: Maybe<Scalars['Boolean']>;
};

export type PageBasedConnectionWithMetrics = {
  pageInfo: PageBasedConnectionPageInfo;
  totalAmount?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};


export type PageInfo = {
   __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['PageCursor']>;
  isLastPage: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
};

export enum PayeeType {
  AFFILIATE = 'AFFILIATE',
  PLATFORM = 'PLATFORM',
  STORE = 'STORE'
}

export type PaymentMethod = {
   __typename?: 'PaymentMethod';
  createdAt: Scalars['Date'];
  customerId?: Maybe<Scalars['ID']>;
  details?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  expMonth?: Maybe<Scalars['String']>;
  expYear?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  last4?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  paymentMethodTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  paymentProcessor?: Maybe<PaymentProcessor>;
  updatedAt?: Maybe<Scalars['Date']>;
  userId: Scalars['ID'];
};

export enum PaymentProcessor {
  APPLEPAY = 'ApplePay',
  GOOGLEPAY = 'GooglePay',
  NOPAYMENTFEES = 'NoPaymentFees',
  PAYPAL = 'Paypal',
  STRIPE = 'Stripe',
  STRIPEDOMESTIC = 'StripeDomestic'
}

export type Payout = {
   __typename?: 'Payout';
  amount: Scalars['Price'];
  approvedByAdmins: Array<UserWithRole>;
  approvedByIds: Array<Scalars['ID']>;
  createdAt: Scalars['Date'];
  currency: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  endPeriod: Scalars['Date'];
  id: Scalars['ID'];
  payeeId: Scalars['ID'];
  payeeType: PayeeType;
  payoutDate: Scalars['Date'];
  payoutEmail: Scalars['String'];
  payoutItemIds: Array<Scalars['ID']>;
  payoutItems?: Maybe<Array<Maybe<PayoutItem>>>;
  payoutStatus: PayoutStatus;
  productsBreakdownConnection: ProductsSoldPeriodSummaryConnection;
  startPeriod: Scalars['Date'];
};


export type PayoutProductsBreakdownConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};

export enum PayoutDealType {
  BUYER_AFFILIATE = 'BUYER_AFFILIATE',
  REFERRED_SELLER = 'REFERRED_SELLER',
  SELLER = 'SELLER',
  SELLER_AFFILIATE = 'SELLER_AFFILIATE'
}

export type PayoutEdge = Edge & {
   __typename?: 'PayoutEdge';
  cursor: Scalars['PageCursor'];
  node: Payout;
};

export type PayoutHistorySummaries = {
   __typename?: 'PayoutHistorySummaries';
  allTime: SummaryStatistics;
  currentPeriod: SummaryStatistics;
  last30Days: SummaryStatistics;
  last7Days: SummaryStatistics;
  lastPeriod: SummaryStatistics;
  today: SummaryStatistics;
};

export type PayoutInput = {
  approvedByIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  createdAt?: Maybe<Scalars['Date']>;
  currency?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  endPeriod?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  payoutDate?: Maybe<Scalars['Date']>;
  payoutEmail?: Maybe<Scalars['String']>;
  payoutItemIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  payoutStatus?: Maybe<PayoutStatus>;
  platformFee?: Maybe<Scalars['Price']>;
  sellerPayment?: Maybe<Scalars['Price']>;
  startPeriod?: Maybe<Scalars['Date']>;
  storeId?: Maybe<Scalars['ID']>;
};

export type PayoutItem = {
   __typename?: 'PayoutItem';
  amount: Scalars['Price'];
  createdAt: Scalars['Date'];
  currency?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  orderItem?: Maybe<OrderItem>;
  orderItemId: Scalars['ID'];
  payeeId: Scalars['ID'];
  payeeType: PayeeType;
  paymentProcessingFee: Scalars['Price'];
  payoutId?: Maybe<Scalars['ID']>;
  payoutStatus: PayoutStatus;
  store?: Maybe<StorePrivate>;
  transaction?: Maybe<Transaction>;
  txnId: Scalars['ID'];
};

export type PayoutItemsConnection = ConnectionWithMetrics & {
   __typename?: 'PayoutItemsConnection';
  edges: Array<PayoutItemsEdge>;
  pageInfo: PageInfo;
  totalAmount?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PayoutItemsEdge = Edge & {
   __typename?: 'PayoutItemsEdge';
  cursor: Scalars['PageCursor'];
  node: PayoutItem;
};

export type PayoutItemsPagedConnection = PageBasedConnectionWithMetrics & {
   __typename?: 'PayoutItemsPagedConnection';
  edges: Array<PayoutItemsPagedEdge>;
  pageInfo: PageBasedConnectionPageInfo;
  totalAmount?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PayoutItemsPagedEdge = PageBasedConnectionEdge & {
   __typename?: 'PayoutItemsPagedEdge';
  node: PayoutItem;
  pageNumber: Scalars['Int'];
};

export type PayoutMethod = {
   __typename?: 'PayoutMethod';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  payoutEmail?: Maybe<Scalars['String']>;
  payoutProcessor?: Maybe<Scalars['String']>;
  payoutProcessorId?: Maybe<Scalars['String']>;
  payoutType?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  userId: Scalars['ID'];
};

export type PayoutMethodMutationResponse = {
   __typename?: 'PayoutMethodMutationResponse';
  payoutMethod: PayoutMethod;
};

export type PayoutsConnection = ConnectionWithMetrics & {
   __typename?: 'PayoutsConnection';
  edges: Array<PayoutEdge>;
  pageInfo: PageInfo;
  totalAmount?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PayoutSplit = {
   __typename?: 'PayoutSplit';
  createdAt: Scalars['Date'];
  dealType: PayoutDealType;
  expiresAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  rate: Scalars['Float'];
  referrerId?: Maybe<Scalars['ID']>;
  storeOrUserId: Scalars['ID'];
};

export enum PayoutStatus {
  MISSING_PAYOUT_METHOD = 'MISSING_PAYOUT_METHOD',
  PAID = 'PAID',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  PENDING_REFUND = 'PENDING_REFUND',
  PROCESSING = 'PROCESSING',
  REFUNDED = 'REFUNDED',
  REFUNDING = 'REFUNDING',
  RETAINED = 'RETAINED',
  UNPAID = 'UNPAID'
}

export type PlatformScopedDiscountInfo = {
   __typename?: 'PlatformScopedDiscountInfo';
  isApplicableToAnyProduct: Scalars['Boolean'];
};


export type PriceDetails = {
   __typename?: 'PriceDetails';
  actualPrice: Scalars['Price'];
  basePrice: Scalars['Price'];
  discountBreakdown?: Maybe<PriceDetailsDiscountBreakdown>;
};

export type PriceDetailsDiscountBreakdown = {
   __typename?: 'PriceDetailsDiscountBreakdown';
  dollarsOffComponent: Scalars['Price'];
  dollarsOffDiscounts: Array<Discount>;
  fixedPriceComponent: Scalars['Price'];
  fixedPriceDiscount?: Maybe<Discount>;
  percentOffComponent: Scalars['Price'];
  percentOffDiscount?: Maybe<Discount>;
  promoCodeComponent: Scalars['Price'];
};

export type PrimaryLinkSlugs = {
   __typename?: 'PrimaryLinkSlugs';
  auto: Scalars['String'];
  manual?: Maybe<Scalars['String']>;
  ownerId: Scalars['ID'];
};

export type Product = {
  category: ProductCategory;
  categoryId: Scalars['ID'];
  chosenVariant?: Maybe<ProductVariant>;
  createdAt: Scalars['Date'];
  currentVariants: Array<ProductVariant>;
  description: Scalars['String'];
  featuredVariant?: Maybe<ProductVariant>;
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  isExcludedFromAutomaticLists: Scalars['Boolean'];
  isExcludedFromSearch: Scalars['Boolean'];
  isPublished: Scalars['Boolean'];
  isQuantityEnabled: Scalars['Boolean'];
  isSuspended: Scalars['Boolean'];
  linkSlugs?: Maybe<PrimaryLinkSlugs>;
  name: Scalars['String'];
  quantityLabel: QuantityLabel;
  snapshotCreatedAt: Scalars['Date'];
  snapshotId: Scalars['ID'];
  store: Store;
  storeId: Scalars['ID'];
  tagline: Scalars['String'];
  tags: Array<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  variantsLabel: VariantsLabel;
};

export type Product_File_Owners = {
   __typename?: 'product_file_owners';
  ownerId: Scalars['String'];
  productFileId: Scalars['String'];
};

export type Product_File_Owners_Aggregate = {
   __typename?: 'product_file_owners_aggregate';
  aggregate?: Maybe<Product_File_Owners_Aggregate_Fields>;
  nodes: Array<Product_File_Owners>;
};

export type Product_File_Owners_Aggregate_Fields = {
   __typename?: 'product_file_owners_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Product_File_Owners_Max_Fields>;
  min?: Maybe<Product_File_Owners_Min_Fields>;
};


export type Product_File_Owners_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Product_File_Owners_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Product_File_Owners_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Product_File_Owners_Max_Order_By>;
  min?: Maybe<Product_File_Owners_Min_Order_By>;
};

export type Product_File_Owners_Arr_Rel_Insert_Input = {
  data: Array<Product_File_Owners_Insert_Input>;
  on_conflict?: Maybe<Product_File_Owners_On_Conflict>;
};

export type Product_File_Owners_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Product_File_Owners_Bool_Exp>>>;
  _not?: Maybe<Product_File_Owners_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Product_File_Owners_Bool_Exp>>>;
  ownerId?: Maybe<String_Comparison_Exp>;
  productFileId?: Maybe<String_Comparison_Exp>;
};

export enum Product_File_Owners_Constraint {
  PRODUCT_FILE_OWNERS_PKEY = 'product_file_owners_pkey',
  PRODUCT_FILE_OWNERS_PRODUCT_FILE_ID_KEY = 'product_file_owners_product_file_id_key'
}

export type Product_File_Owners_Insert_Input = {
  ownerId?: Maybe<Scalars['String']>;
  productFileId?: Maybe<Scalars['String']>;
};

export type Product_File_Owners_Max_Fields = {
   __typename?: 'product_file_owners_max_fields';
  ownerId?: Maybe<Scalars['String']>;
  productFileId?: Maybe<Scalars['String']>;
};

export type Product_File_Owners_Max_Order_By = {
  ownerId?: Maybe<Order_By>;
  productFileId?: Maybe<Order_By>;
};

export type Product_File_Owners_Min_Fields = {
   __typename?: 'product_file_owners_min_fields';
  ownerId?: Maybe<Scalars['String']>;
  productFileId?: Maybe<Scalars['String']>;
};

export type Product_File_Owners_Min_Order_By = {
  ownerId?: Maybe<Order_By>;
  productFileId?: Maybe<Order_By>;
};

export type Product_File_Owners_Mutation_Response = {
   __typename?: 'product_file_owners_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Product_File_Owners>;
};

export type Product_File_Owners_Obj_Rel_Insert_Input = {
  data: Product_File_Owners_Insert_Input;
  on_conflict?: Maybe<Product_File_Owners_On_Conflict>;
};

export type Product_File_Owners_On_Conflict = {
  constraint: Product_File_Owners_Constraint;
  update_columns: Array<Product_File_Owners_Update_Column>;
  where?: Maybe<Product_File_Owners_Bool_Exp>;
};

export type Product_File_Owners_Order_By = {
  ownerId?: Maybe<Order_By>;
  productFileId?: Maybe<Order_By>;
};

export type Product_File_Owners_Pk_Columns_Input = {
  productFileId: Scalars['String'];
};

export enum Product_File_Owners_Select_Column {
  OWNERID = 'ownerId',
  PRODUCTFILEID = 'productFileId'
}

export type Product_File_Owners_Set_Input = {
  ownerId?: Maybe<Scalars['String']>;
  productFileId?: Maybe<Scalars['String']>;
};

export enum Product_File_Owners_Update_Column {
  OWNERID = 'ownerId',
  PRODUCTFILEID = 'productFileId'
}

export type Product_Files = {
   __typename?: 'product_files';
  createdAt?: Maybe<Scalars['timestamptz']>;
  fileName?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  productFileId: Scalars['String'];
  sizeInBytes?: Maybe<Scalars['Int']>;
};

export type Product_Files_Aggregate = {
   __typename?: 'product_files_aggregate';
  aggregate?: Maybe<Product_Files_Aggregate_Fields>;
  nodes: Array<Product_Files>;
};

export type Product_Files_Aggregate_Fields = {
   __typename?: 'product_files_aggregate_fields';
  avg?: Maybe<Product_Files_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Product_Files_Max_Fields>;
  min?: Maybe<Product_Files_Min_Fields>;
  stddev?: Maybe<Product_Files_Stddev_Fields>;
  stddev_pop?: Maybe<Product_Files_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Product_Files_Stddev_Samp_Fields>;
  sum?: Maybe<Product_Files_Sum_Fields>;
  var_pop?: Maybe<Product_Files_Var_Pop_Fields>;
  var_samp?: Maybe<Product_Files_Var_Samp_Fields>;
  variance?: Maybe<Product_Files_Variance_Fields>;
};


export type Product_Files_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Product_Files_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Product_Files_Aggregate_Order_By = {
  avg?: Maybe<Product_Files_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Product_Files_Max_Order_By>;
  min?: Maybe<Product_Files_Min_Order_By>;
  stddev?: Maybe<Product_Files_Stddev_Order_By>;
  stddev_pop?: Maybe<Product_Files_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Product_Files_Stddev_Samp_Order_By>;
  sum?: Maybe<Product_Files_Sum_Order_By>;
  var_pop?: Maybe<Product_Files_Var_Pop_Order_By>;
  var_samp?: Maybe<Product_Files_Var_Samp_Order_By>;
  variance?: Maybe<Product_Files_Variance_Order_By>;
};

export type Product_Files_Arr_Rel_Insert_Input = {
  data: Array<Product_Files_Insert_Input>;
  on_conflict?: Maybe<Product_Files_On_Conflict>;
};

export type Product_Files_Avg_Fields = {
   __typename?: 'product_files_avg_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

export type Product_Files_Avg_Order_By = {
  sizeInBytes?: Maybe<Order_By>;
};

export type Product_Files_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Product_Files_Bool_Exp>>>;
  _not?: Maybe<Product_Files_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Product_Files_Bool_Exp>>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  fileName?: Maybe<String_Comparison_Exp>;
  mimeType?: Maybe<String_Comparison_Exp>;
  productFileId?: Maybe<String_Comparison_Exp>;
  sizeInBytes?: Maybe<Int_Comparison_Exp>;
};

export enum Product_Files_Constraint {
  PRODUCT_FILES_PKEY = 'product_files_pkey',
  PRODUCT_FILES_PRODUCT_FILE_ID_KEY = 'product_files_product_file_id_key'
}

export type Product_Files_Inc_Input = {
  sizeInBytes?: Maybe<Scalars['Int']>;
};

export type Product_Files_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  fileName?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  productFileId?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
};

export type Product_Files_Max_Fields = {
   __typename?: 'product_files_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  fileName?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  productFileId?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
};

export type Product_Files_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  fileName?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  productFileId?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
};

export type Product_Files_Min_Fields = {
   __typename?: 'product_files_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  fileName?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  productFileId?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
};

export type Product_Files_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  fileName?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  productFileId?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
};

export type Product_Files_Mutation_Response = {
   __typename?: 'product_files_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Product_Files>;
};

export type Product_Files_Obj_Rel_Insert_Input = {
  data: Product_Files_Insert_Input;
  on_conflict?: Maybe<Product_Files_On_Conflict>;
};

export type Product_Files_On_Conflict = {
  constraint: Product_Files_Constraint;
  update_columns: Array<Product_Files_Update_Column>;
  where?: Maybe<Product_Files_Bool_Exp>;
};

export type Product_Files_Order_By = {
  createdAt?: Maybe<Order_By>;
  fileName?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  productFileId?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
};

export type Product_Files_Pk_Columns_Input = {
  productFileId: Scalars['String'];
};

export enum Product_Files_Select_Column {
  CREATEDAT = 'createdAt',
  FILENAME = 'fileName',
  MIMETYPE = 'mimeType',
  PRODUCTFILEID = 'productFileId',
  SIZEINBYTES = 'sizeInBytes'
}

export type Product_Files_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  fileName?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  productFileId?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
};

export type Product_Files_Stddev_Fields = {
   __typename?: 'product_files_stddev_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

export type Product_Files_Stddev_Order_By = {
  sizeInBytes?: Maybe<Order_By>;
};

export type Product_Files_Stddev_Pop_Fields = {
   __typename?: 'product_files_stddev_pop_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

export type Product_Files_Stddev_Pop_Order_By = {
  sizeInBytes?: Maybe<Order_By>;
};

export type Product_Files_Stddev_Samp_Fields = {
   __typename?: 'product_files_stddev_samp_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

export type Product_Files_Stddev_Samp_Order_By = {
  sizeInBytes?: Maybe<Order_By>;
};

export type Product_Files_Sum_Fields = {
   __typename?: 'product_files_sum_fields';
  sizeInBytes?: Maybe<Scalars['Int']>;
};

export type Product_Files_Sum_Order_By = {
  sizeInBytes?: Maybe<Order_By>;
};

export enum Product_Files_Update_Column {
  CREATEDAT = 'createdAt',
  FILENAME = 'fileName',
  MIMETYPE = 'mimeType',
  PRODUCTFILEID = 'productFileId',
  SIZEINBYTES = 'sizeInBytes'
}

export type Product_Files_Var_Pop_Fields = {
   __typename?: 'product_files_var_pop_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

export type Product_Files_Var_Pop_Order_By = {
  sizeInBytes?: Maybe<Order_By>;
};

export type Product_Files_Var_Samp_Fields = {
   __typename?: 'product_files_var_samp_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

export type Product_Files_Var_Samp_Order_By = {
  sizeInBytes?: Maybe<Order_By>;
};

export type Product_Files_Variance_Fields = {
   __typename?: 'product_files_variance_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

export type Product_Files_Variance_Order_By = {
  sizeInBytes?: Maybe<Order_By>;
};

export type Product_Preview_Items = {
   __typename?: 'product_preview_items';
  id: Scalars['String'];
  image?: Maybe<Image_Parents>;
  imageId?: Maybe<Scalars['String']>;
  position: Scalars['Int'];
  variantSnapshotId?: Maybe<Scalars['String']>;
  youtubeEmbedLink?: Maybe<Scalars['String']>;
};

export type Product_Preview_Items_Aggregate = {
   __typename?: 'product_preview_items_aggregate';
  aggregate?: Maybe<Product_Preview_Items_Aggregate_Fields>;
  nodes: Array<Product_Preview_Items>;
};

export type Product_Preview_Items_Aggregate_Fields = {
   __typename?: 'product_preview_items_aggregate_fields';
  avg?: Maybe<Product_Preview_Items_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Product_Preview_Items_Max_Fields>;
  min?: Maybe<Product_Preview_Items_Min_Fields>;
  stddev?: Maybe<Product_Preview_Items_Stddev_Fields>;
  stddev_pop?: Maybe<Product_Preview_Items_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Product_Preview_Items_Stddev_Samp_Fields>;
  sum?: Maybe<Product_Preview_Items_Sum_Fields>;
  var_pop?: Maybe<Product_Preview_Items_Var_Pop_Fields>;
  var_samp?: Maybe<Product_Preview_Items_Var_Samp_Fields>;
  variance?: Maybe<Product_Preview_Items_Variance_Fields>;
};


export type Product_Preview_Items_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Product_Preview_Items_Aggregate_Order_By = {
  avg?: Maybe<Product_Preview_Items_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Product_Preview_Items_Max_Order_By>;
  min?: Maybe<Product_Preview_Items_Min_Order_By>;
  stddev?: Maybe<Product_Preview_Items_Stddev_Order_By>;
  stddev_pop?: Maybe<Product_Preview_Items_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Product_Preview_Items_Stddev_Samp_Order_By>;
  sum?: Maybe<Product_Preview_Items_Sum_Order_By>;
  var_pop?: Maybe<Product_Preview_Items_Var_Pop_Order_By>;
  var_samp?: Maybe<Product_Preview_Items_Var_Samp_Order_By>;
  variance?: Maybe<Product_Preview_Items_Variance_Order_By>;
};

export type Product_Preview_Items_Arr_Rel_Insert_Input = {
  data: Array<Product_Preview_Items_Insert_Input>;
  on_conflict?: Maybe<Product_Preview_Items_On_Conflict>;
};

export type Product_Preview_Items_Avg_Fields = {
   __typename?: 'product_preview_items_avg_fields';
  position?: Maybe<Scalars['Float']>;
};

export type Product_Preview_Items_Avg_Order_By = {
  position?: Maybe<Order_By>;
};

export type Product_Preview_Items_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Product_Preview_Items_Bool_Exp>>>;
  _not?: Maybe<Product_Preview_Items_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Product_Preview_Items_Bool_Exp>>>;
  id?: Maybe<String_Comparison_Exp>;
  image?: Maybe<Image_Parents_Bool_Exp>;
  imageId?: Maybe<String_Comparison_Exp>;
  position?: Maybe<Int_Comparison_Exp>;
  variantSnapshotId?: Maybe<String_Comparison_Exp>;
  youtubeEmbedLink?: Maybe<String_Comparison_Exp>;
};

export enum Product_Preview_Items_Constraint {
  PRODUCT_PREVIEW_ITEMS_PKEY = 'product_preview_items_pkey'
}

export type Product_Preview_Items_Inc_Input = {
  position?: Maybe<Scalars['Int']>;
};

export type Product_Preview_Items_Insert_Input = {
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Image_Parents_Obj_Rel_Insert_Input>;
  imageId?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
  youtubeEmbedLink?: Maybe<Scalars['String']>;
};

export type Product_Preview_Items_Max_Fields = {
   __typename?: 'product_preview_items_max_fields';
  id?: Maybe<Scalars['String']>;
  imageId?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
  youtubeEmbedLink?: Maybe<Scalars['String']>;
};

export type Product_Preview_Items_Max_Order_By = {
  id?: Maybe<Order_By>;
  imageId?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  variantSnapshotId?: Maybe<Order_By>;
  youtubeEmbedLink?: Maybe<Order_By>;
};

export type Product_Preview_Items_Min_Fields = {
   __typename?: 'product_preview_items_min_fields';
  id?: Maybe<Scalars['String']>;
  imageId?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
  youtubeEmbedLink?: Maybe<Scalars['String']>;
};

export type Product_Preview_Items_Min_Order_By = {
  id?: Maybe<Order_By>;
  imageId?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  variantSnapshotId?: Maybe<Order_By>;
  youtubeEmbedLink?: Maybe<Order_By>;
};

export type Product_Preview_Items_Mutation_Response = {
   __typename?: 'product_preview_items_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Product_Preview_Items>;
};

export type Product_Preview_Items_Obj_Rel_Insert_Input = {
  data: Product_Preview_Items_Insert_Input;
  on_conflict?: Maybe<Product_Preview_Items_On_Conflict>;
};

export type Product_Preview_Items_On_Conflict = {
  constraint: Product_Preview_Items_Constraint;
  update_columns: Array<Product_Preview_Items_Update_Column>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};

export type Product_Preview_Items_Order_By = {
  id?: Maybe<Order_By>;
  image?: Maybe<Image_Parents_Order_By>;
  imageId?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  variantSnapshotId?: Maybe<Order_By>;
  youtubeEmbedLink?: Maybe<Order_By>;
};

export type Product_Preview_Items_Pk_Columns_Input = {
  id: Scalars['String'];
};

export enum Product_Preview_Items_Select_Column {
  ID = 'id',
  IMAGEID = 'imageId',
  POSITION = 'position',
  VARIANTSNAPSHOTID = 'variantSnapshotId',
  YOUTUBEEMBEDLINK = 'youtubeEmbedLink'
}

export type Product_Preview_Items_Set_Input = {
  id?: Maybe<Scalars['String']>;
  imageId?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
  youtubeEmbedLink?: Maybe<Scalars['String']>;
};

export type Product_Preview_Items_Stddev_Fields = {
   __typename?: 'product_preview_items_stddev_fields';
  position?: Maybe<Scalars['Float']>;
};

export type Product_Preview_Items_Stddev_Order_By = {
  position?: Maybe<Order_By>;
};

export type Product_Preview_Items_Stddev_Pop_Fields = {
   __typename?: 'product_preview_items_stddev_pop_fields';
  position?: Maybe<Scalars['Float']>;
};

export type Product_Preview_Items_Stddev_Pop_Order_By = {
  position?: Maybe<Order_By>;
};

export type Product_Preview_Items_Stddev_Samp_Fields = {
   __typename?: 'product_preview_items_stddev_samp_fields';
  position?: Maybe<Scalars['Float']>;
};

export type Product_Preview_Items_Stddev_Samp_Order_By = {
  position?: Maybe<Order_By>;
};

export type Product_Preview_Items_Sum_Fields = {
   __typename?: 'product_preview_items_sum_fields';
  position?: Maybe<Scalars['Int']>;
};

export type Product_Preview_Items_Sum_Order_By = {
  position?: Maybe<Order_By>;
};

export enum Product_Preview_Items_Update_Column {
  ID = 'id',
  IMAGEID = 'imageId',
  POSITION = 'position',
  VARIANTSNAPSHOTID = 'variantSnapshotId',
  YOUTUBEEMBEDLINK = 'youtubeEmbedLink'
}

export type Product_Preview_Items_Var_Pop_Fields = {
   __typename?: 'product_preview_items_var_pop_fields';
  position?: Maybe<Scalars['Float']>;
};

export type Product_Preview_Items_Var_Pop_Order_By = {
  position?: Maybe<Order_By>;
};

export type Product_Preview_Items_Var_Samp_Fields = {
   __typename?: 'product_preview_items_var_samp_fields';
  position?: Maybe<Scalars['Float']>;
};

export type Product_Preview_Items_Var_Samp_Order_By = {
  position?: Maybe<Order_By>;
};

export type Product_Preview_Items_Variance_Fields = {
   __typename?: 'product_preview_items_variance_fields';
  position?: Maybe<Scalars['Float']>;
};

export type Product_Preview_Items_Variance_Order_By = {
  position?: Maybe<Order_By>;
};

export type Product_Snapshots = {
   __typename?: 'product_snapshots';
  actionType: Scalars['String'];
  ammoType?: Maybe<Scalars['String']>;
  boreDiameter?: Maybe<Scalars['String']>;
  condition: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  currentVariants: Array<Product_Variants>;
  currentVariants_aggregate: Product_Variants_Aggregate;
  dealer: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['String'];
  location: Scalars['String'];
  make: Scalars['String'];
  model: Scalars['String'];
  productId: Scalars['String'];
  products: Array<Products>;
  products_aggregate: Products_Aggregate;
  serialNumber: Scalars['String'];
  title: Scalars['String'];
};


export type Product_SnapshotsCurrentVariantsArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


export type Product_SnapshotsCurrentVariants_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


export type Product_SnapshotsProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type Product_SnapshotsProducts_AggregateArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};

export type Product_Snapshots_Aggregate = {
   __typename?: 'product_snapshots_aggregate';
  aggregate?: Maybe<Product_Snapshots_Aggregate_Fields>;
  nodes: Array<Product_Snapshots>;
};

export type Product_Snapshots_Aggregate_Fields = {
   __typename?: 'product_snapshots_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Product_Snapshots_Max_Fields>;
  min?: Maybe<Product_Snapshots_Min_Fields>;
};


export type Product_Snapshots_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Product_Snapshots_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Product_Snapshots_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Product_Snapshots_Max_Order_By>;
  min?: Maybe<Product_Snapshots_Min_Order_By>;
};

export type Product_Snapshots_Arr_Rel_Insert_Input = {
  data: Array<Product_Snapshots_Insert_Input>;
  on_conflict?: Maybe<Product_Snapshots_On_Conflict>;
};

export type Product_Snapshots_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Product_Snapshots_Bool_Exp>>>;
  _not?: Maybe<Product_Snapshots_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Product_Snapshots_Bool_Exp>>>;
  actionType?: Maybe<String_Comparison_Exp>;
  ammoType?: Maybe<String_Comparison_Exp>;
  boreDiameter?: Maybe<String_Comparison_Exp>;
  condition?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  currentVariants?: Maybe<Product_Variants_Bool_Exp>;
  dealer?: Maybe<String_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  location?: Maybe<String_Comparison_Exp>;
  make?: Maybe<String_Comparison_Exp>;
  model?: Maybe<String_Comparison_Exp>;
  productId?: Maybe<String_Comparison_Exp>;
  products?: Maybe<Products_Bool_Exp>;
  serialNumber?: Maybe<String_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
};

export enum Product_Snapshots_Constraint {
  PRODUCT_SNAPSHOTS_PKEY = 'product_snapshots_pkey'
}

export type Product_Snapshots_Insert_Input = {
  actionType?: Maybe<Scalars['String']>;
  ammoType?: Maybe<Scalars['String']>;
  boreDiameter?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currentVariants?: Maybe<Product_Variants_Arr_Rel_Insert_Input>;
  dealer?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  products?: Maybe<Products_Arr_Rel_Insert_Input>;
  serialNumber?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Product_Snapshots_Max_Fields = {
   __typename?: 'product_snapshots_max_fields';
  actionType?: Maybe<Scalars['String']>;
  ammoType?: Maybe<Scalars['String']>;
  boreDiameter?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  dealer?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  serialNumber?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Product_Snapshots_Max_Order_By = {
  actionType?: Maybe<Order_By>;
  ammoType?: Maybe<Order_By>;
  boreDiameter?: Maybe<Order_By>;
  condition?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  dealer?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  make?: Maybe<Order_By>;
  model?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  serialNumber?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
};

export type Product_Snapshots_Min_Fields = {
   __typename?: 'product_snapshots_min_fields';
  actionType?: Maybe<Scalars['String']>;
  ammoType?: Maybe<Scalars['String']>;
  boreDiameter?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  dealer?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  serialNumber?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Product_Snapshots_Min_Order_By = {
  actionType?: Maybe<Order_By>;
  ammoType?: Maybe<Order_By>;
  boreDiameter?: Maybe<Order_By>;
  condition?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  dealer?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  make?: Maybe<Order_By>;
  model?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  serialNumber?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
};

export type Product_Snapshots_Mutation_Response = {
   __typename?: 'product_snapshots_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Product_Snapshots>;
};

export type Product_Snapshots_Obj_Rel_Insert_Input = {
  data: Product_Snapshots_Insert_Input;
  on_conflict?: Maybe<Product_Snapshots_On_Conflict>;
};

export type Product_Snapshots_On_Conflict = {
  constraint: Product_Snapshots_Constraint;
  update_columns: Array<Product_Snapshots_Update_Column>;
  where?: Maybe<Product_Snapshots_Bool_Exp>;
};

export type Product_Snapshots_Order_By = {
  actionType?: Maybe<Order_By>;
  ammoType?: Maybe<Order_By>;
  boreDiameter?: Maybe<Order_By>;
  condition?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currentVariants_aggregate?: Maybe<Product_Variants_Aggregate_Order_By>;
  dealer?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  make?: Maybe<Order_By>;
  model?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  products_aggregate?: Maybe<Products_Aggregate_Order_By>;
  serialNumber?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
};

export type Product_Snapshots_Pk_Columns_Input = {
  id: Scalars['String'];
};

export enum Product_Snapshots_Select_Column {
  ACTIONTYPE = 'actionType',
  AMMOTYPE = 'ammoType',
  BOREDIAMETER = 'boreDiameter',
  CONDITION = 'condition',
  CREATEDAT = 'createdAt',
  DEALER = 'dealer',
  DESCRIPTION = 'description',
  ID = 'id',
  LOCATION = 'location',
  MAKE = 'make',
  MODEL = 'model',
  PRODUCTID = 'productId',
  SERIALNUMBER = 'serialNumber',
  TITLE = 'title'
}

export type Product_Snapshots_Set_Input = {
  actionType?: Maybe<Scalars['String']>;
  ammoType?: Maybe<Scalars['String']>;
  boreDiameter?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  dealer?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  serialNumber?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export enum Product_Snapshots_Update_Column {
  ACTIONTYPE = 'actionType',
  AMMOTYPE = 'ammoType',
  BOREDIAMETER = 'boreDiameter',
  CONDITION = 'condition',
  CREATEDAT = 'createdAt',
  DEALER = 'dealer',
  DESCRIPTION = 'description',
  ID = 'id',
  LOCATION = 'location',
  MAKE = 'make',
  MODEL = 'model',
  PRODUCTID = 'productId',
  SERIALNUMBER = 'serialNumber',
  TITLE = 'title'
}

export type Product_Variants = {
   __typename?: 'product_variants';
  basePrice: Scalars['Int'];
  createdAt: Scalars['timestamptz'];
  isDefault: Scalars['Boolean'];
  position: Scalars['Int'];
  previewItems: Array<Product_Preview_Items>;
  previewItems_aggregate: Product_Preview_Items_Aggregate;
  productId: Scalars['String'];
  snapshotId: Scalars['String'];
  storeId: Scalars['String'];
  variantDescription: Scalars['String'];
  variantId: Scalars['String'];
  variantName: Scalars['String'];
  variantSnapshotId: Scalars['String'];
};


export type Product_VariantsPreviewItemsArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};


export type Product_VariantsPreviewItems_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};

export type Product_Variants_Aggregate = {
   __typename?: 'product_variants_aggregate';
  aggregate?: Maybe<Product_Variants_Aggregate_Fields>;
  nodes: Array<Product_Variants>;
};

export type Product_Variants_Aggregate_Fields = {
   __typename?: 'product_variants_aggregate_fields';
  avg?: Maybe<Product_Variants_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Product_Variants_Max_Fields>;
  min?: Maybe<Product_Variants_Min_Fields>;
  stddev?: Maybe<Product_Variants_Stddev_Fields>;
  stddev_pop?: Maybe<Product_Variants_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Product_Variants_Stddev_Samp_Fields>;
  sum?: Maybe<Product_Variants_Sum_Fields>;
  var_pop?: Maybe<Product_Variants_Var_Pop_Fields>;
  var_samp?: Maybe<Product_Variants_Var_Samp_Fields>;
  variance?: Maybe<Product_Variants_Variance_Fields>;
};


export type Product_Variants_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Product_Variants_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Product_Variants_Aggregate_Order_By = {
  avg?: Maybe<Product_Variants_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Product_Variants_Max_Order_By>;
  min?: Maybe<Product_Variants_Min_Order_By>;
  stddev?: Maybe<Product_Variants_Stddev_Order_By>;
  stddev_pop?: Maybe<Product_Variants_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Product_Variants_Stddev_Samp_Order_By>;
  sum?: Maybe<Product_Variants_Sum_Order_By>;
  var_pop?: Maybe<Product_Variants_Var_Pop_Order_By>;
  var_samp?: Maybe<Product_Variants_Var_Samp_Order_By>;
  variance?: Maybe<Product_Variants_Variance_Order_By>;
};

export type Product_Variants_Arr_Rel_Insert_Input = {
  data: Array<Product_Variants_Insert_Input>;
  on_conflict?: Maybe<Product_Variants_On_Conflict>;
};

export type Product_Variants_Avg_Fields = {
   __typename?: 'product_variants_avg_fields';
  basePrice?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
};

export type Product_Variants_Avg_Order_By = {
  basePrice?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
};

export type Product_Variants_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Product_Variants_Bool_Exp>>>;
  _not?: Maybe<Product_Variants_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Product_Variants_Bool_Exp>>>;
  basePrice?: Maybe<Int_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  isDefault?: Maybe<Boolean_Comparison_Exp>;
  position?: Maybe<Int_Comparison_Exp>;
  previewItems?: Maybe<Product_Preview_Items_Bool_Exp>;
  productId?: Maybe<String_Comparison_Exp>;
  snapshotId?: Maybe<String_Comparison_Exp>;
  storeId?: Maybe<String_Comparison_Exp>;
  variantDescription?: Maybe<String_Comparison_Exp>;
  variantId?: Maybe<String_Comparison_Exp>;
  variantName?: Maybe<String_Comparison_Exp>;
  variantSnapshotId?: Maybe<String_Comparison_Exp>;
};

export enum Product_Variants_Constraint {
  PRODUCT_VARIANTS_PKEY = 'product_variants_pkey',
  PRODUCT_VARIANTS_VARIANT_SNAPSHOT_ID_KEY = 'product_variants_variant_snapshot_id_key'
}

export type Product_Variants_Inc_Input = {
  basePrice?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
};

export type Product_Variants_Insert_Input = {
  basePrice?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  position?: Maybe<Scalars['Int']>;
  previewItems?: Maybe<Product_Preview_Items_Arr_Rel_Insert_Input>;
  productId?: Maybe<Scalars['String']>;
  snapshotId?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  variantDescription?: Maybe<Scalars['String']>;
  variantId?: Maybe<Scalars['String']>;
  variantName?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
};

export type Product_Variants_Max_Fields = {
   __typename?: 'product_variants_max_fields';
  basePrice?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  position?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  snapshotId?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  variantDescription?: Maybe<Scalars['String']>;
  variantId?: Maybe<Scalars['String']>;
  variantName?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
};

export type Product_Variants_Max_Order_By = {
  basePrice?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  snapshotId?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  variantDescription?: Maybe<Order_By>;
  variantId?: Maybe<Order_By>;
  variantName?: Maybe<Order_By>;
  variantSnapshotId?: Maybe<Order_By>;
};

export type Product_Variants_Min_Fields = {
   __typename?: 'product_variants_min_fields';
  basePrice?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  position?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  snapshotId?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  variantDescription?: Maybe<Scalars['String']>;
  variantId?: Maybe<Scalars['String']>;
  variantName?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
};

export type Product_Variants_Min_Order_By = {
  basePrice?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  snapshotId?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  variantDescription?: Maybe<Order_By>;
  variantId?: Maybe<Order_By>;
  variantName?: Maybe<Order_By>;
  variantSnapshotId?: Maybe<Order_By>;
};

export type Product_Variants_Mutation_Response = {
   __typename?: 'product_variants_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Product_Variants>;
};

export type Product_Variants_Obj_Rel_Insert_Input = {
  data: Product_Variants_Insert_Input;
  on_conflict?: Maybe<Product_Variants_On_Conflict>;
};

export type Product_Variants_On_Conflict = {
  constraint: Product_Variants_Constraint;
  update_columns: Array<Product_Variants_Update_Column>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};

export type Product_Variants_Order_By = {
  basePrice?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  isDefault?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  previewItems_aggregate?: Maybe<Product_Preview_Items_Aggregate_Order_By>;
  productId?: Maybe<Order_By>;
  snapshotId?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  variantDescription?: Maybe<Order_By>;
  variantId?: Maybe<Order_By>;
  variantName?: Maybe<Order_By>;
  variantSnapshotId?: Maybe<Order_By>;
};

export type Product_Variants_Pk_Columns_Input = {
  variantSnapshotId: Scalars['String'];
};

export enum Product_Variants_Select_Column {
  BASEPRICE = 'basePrice',
  CREATEDAT = 'createdAt',
  ISDEFAULT = 'isDefault',
  POSITION = 'position',
  PRODUCTID = 'productId',
  SNAPSHOTID = 'snapshotId',
  STOREID = 'storeId',
  VARIANTDESCRIPTION = 'variantDescription',
  VARIANTID = 'variantId',
  VARIANTNAME = 'variantName',
  VARIANTSNAPSHOTID = 'variantSnapshotId'
}

export type Product_Variants_Set_Input = {
  basePrice?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  position?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  snapshotId?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  variantDescription?: Maybe<Scalars['String']>;
  variantId?: Maybe<Scalars['String']>;
  variantName?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
};

export type Product_Variants_Stddev_Fields = {
   __typename?: 'product_variants_stddev_fields';
  basePrice?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
};

export type Product_Variants_Stddev_Order_By = {
  basePrice?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
};

export type Product_Variants_Stddev_Pop_Fields = {
   __typename?: 'product_variants_stddev_pop_fields';
  basePrice?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
};

export type Product_Variants_Stddev_Pop_Order_By = {
  basePrice?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
};

export type Product_Variants_Stddev_Samp_Fields = {
   __typename?: 'product_variants_stddev_samp_fields';
  basePrice?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
};

export type Product_Variants_Stddev_Samp_Order_By = {
  basePrice?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
};

export type Product_Variants_Sum_Fields = {
   __typename?: 'product_variants_sum_fields';
  basePrice?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
};

export type Product_Variants_Sum_Order_By = {
  basePrice?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
};

export enum Product_Variants_Update_Column {
  BASEPRICE = 'basePrice',
  CREATEDAT = 'createdAt',
  ISDEFAULT = 'isDefault',
  POSITION = 'position',
  PRODUCTID = 'productId',
  SNAPSHOTID = 'snapshotId',
  STOREID = 'storeId',
  VARIANTDESCRIPTION = 'variantDescription',
  VARIANTID = 'variantId',
  VARIANTNAME = 'variantName',
  VARIANTSNAPSHOTID = 'variantSnapshotId'
}

export type Product_Variants_Var_Pop_Fields = {
   __typename?: 'product_variants_var_pop_fields';
  basePrice?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
};

export type Product_Variants_Var_Pop_Order_By = {
  basePrice?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
};

export type Product_Variants_Var_Samp_Fields = {
   __typename?: 'product_variants_var_samp_fields';
  basePrice?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
};

export type Product_Variants_Var_Samp_Order_By = {
  basePrice?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
};

export type Product_Variants_Variance_Fields = {
   __typename?: 'product_variants_variance_fields';
  basePrice?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
};

export type Product_Variants_Variance_Order_By = {
  basePrice?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
};

export type ProductCategory = {
   __typename?: 'ProductCategory';
  categoryGroup?: Maybe<Scalars['ProductCategoryGroup']>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['Date']>;
};


export type ProductCreateInput = {
  categoryId: Scalars['ID'];
  currentVariants: Array<ProductVariantInput>;
  description: Scalars['String'];
  isPublished: Scalars['Boolean'];
  isQuantityEnabled: Scalars['Boolean'];
  name: Scalars['String'];
  quantityLabel?: Maybe<QuantityLabel>;
  tagline: Scalars['String'];
  tags: Array<Scalars['String']>;
  variantsLabel?: Maybe<VariantsLabel>;
};

export type ProductEditInput = {
  categoryId: Scalars['ID'];
  currentVariants: Array<ProductVariantEditInput>;
  description: Scalars['String'];
  isPublished: Scalars['Boolean'];
  isQuantityEnabled: Scalars['Boolean'];
  name: Scalars['String'];
  productId: Scalars['ID'];
  quantityLabel?: Maybe<QuantityLabel>;
  tagline: Scalars['String'];
  tags: Array<Scalars['String']>;
  variantsLabel?: Maybe<VariantsLabel>;
};

export type ProductFile = {
   __typename?: 'ProductFile';
  createdAt: Scalars['Date'];
  fileName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mimeType: Scalars['String'];
  sizeInBytes: Scalars['Int'];
};

export type ProductFileDownloadLink = {
   __typename?: 'ProductFileDownloadLink';
  expiresAt: Scalars['Date'];
  productFileId: Scalars['ID'];
  url: Scalars['String'];
};

export type ProductFileLinkMutationResponse = {
   __typename?: 'ProductFileLinkMutationResponse';
  downloadLink: ProductFileDownloadLink;
};

export type ProductFileLinksMutationResponse = {
   __typename?: 'ProductFileLinksMutationResponse';
  downloadLinks: Array<ProductFileDownloadLink>;
};

export type ProductMutationResponse = {
   __typename?: 'ProductMutationResponse';
  product: Product;
};

export type ProductPreviewItem = {
   __typename?: 'ProductPreviewItem';
  id: Scalars['ID'];
  image?: Maybe<Image>;
  imageId?: Maybe<Scalars['ID']>;
  youTubeEmbedLink?: Maybe<Scalars['String']>;
};

export type ProductPreviewItemInput = {
  imageId?: Maybe<Scalars['ID']>;
  youTubeEmbedLink?: Maybe<Scalars['String']>;
};

export type ProductPrivate = Product & {
   __typename?: 'ProductPrivate';
  category: ProductCategory;
  categoryId: Scalars['ID'];
  chosenVariant?: Maybe<ProductVariant>;
  createdAt: Scalars['Date'];
  currentVariants: Array<ProductVariant>;
  description: Scalars['String'];
  featuredVariant?: Maybe<ProductVariant>;
  historicalSnapshotsConnection: ProductsConnection;
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  isExcludedFromAutomaticLists: Scalars['Boolean'];
  isExcludedFromSearch: Scalars['Boolean'];
  isPublished: Scalars['Boolean'];
  isQuantityEnabled: Scalars['Boolean'];
  isSuspended: Scalars['Boolean'];
  linkSlugs?: Maybe<PrimaryLinkSlugs>;
  name: Scalars['String'];
  quantityLabel: QuantityLabel;
  snapshotCreatedAt: Scalars['Date'];
  snapshotId: Scalars['ID'];
  store: Store;
  storeId: Scalars['ID'];
  tagline: Scalars['String'];
  tags: Array<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  variantsLabel: VariantsLabel;
};


export type ProductPrivateHistoricalSnapshotsConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};

export type ProductProductVariantId = {
  productId: Scalars['ID'];
  quantity?: Maybe<Scalars['Int']>;
  variantId: Scalars['ID'];
};

export type ProductPublic = Product & {
   __typename?: 'ProductPublic';
  category: ProductCategory;
  categoryId: Scalars['ID'];
  chosenVariant?: Maybe<ProductVariant>;
  createdAt: Scalars['Date'];
  currentVariants: Array<ProductVariant>;
  description: Scalars['String'];
  featuredVariant?: Maybe<ProductVariant>;
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  isExcludedFromAutomaticLists: Scalars['Boolean'];
  isExcludedFromSearch: Scalars['Boolean'];
  isPublished: Scalars['Boolean'];
  isQuantityEnabled: Scalars['Boolean'];
  isSuspended: Scalars['Boolean'];
  linkSlugs?: Maybe<PrimaryLinkSlugs>;
  name: Scalars['String'];
  quantityLabel: QuantityLabel;
  snapshotCreatedAt: Scalars['Date'];
  snapshotId: Scalars['ID'];
  store: Store;
  storeId: Scalars['ID'];
  tagline: Scalars['String'];
  tags: Array<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  variantsLabel: VariantsLabel;
};

export type Products = {
   __typename?: 'products';
  categoryId: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  currentSnapshot: Product_Snapshots;
  currentSnapshotId: Scalars['String'];
  id: Scalars['String'];
  isDeleted: Scalars['Boolean'];
  isExcludedFromRecommendations: Scalars['Boolean'];
  isExcludedFromSearch: Scalars['Boolean'];
  isPublished: Scalars['Boolean'];
  isSuspended: Scalars['Boolean'];
  storeId: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};

export type Products_Aggregate = {
   __typename?: 'products_aggregate';
  aggregate?: Maybe<Products_Aggregate_Fields>;
  nodes: Array<Products>;
};

export type Products_Aggregate_Fields = {
   __typename?: 'products_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Products_Max_Fields>;
  min?: Maybe<Products_Min_Fields>;
};


export type Products_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Products_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Products_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Products_Max_Order_By>;
  min?: Maybe<Products_Min_Order_By>;
};

export type Products_Arr_Rel_Insert_Input = {
  data: Array<Products_Insert_Input>;
  on_conflict?: Maybe<Products_On_Conflict>;
};

export type Products_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Products_Bool_Exp>>>;
  _not?: Maybe<Products_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Products_Bool_Exp>>>;
  categoryId?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  currentSnapshot?: Maybe<Product_Snapshots_Bool_Exp>;
  currentSnapshotId?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  isDeleted?: Maybe<Boolean_Comparison_Exp>;
  isExcludedFromRecommendations?: Maybe<Boolean_Comparison_Exp>;
  isExcludedFromSearch?: Maybe<Boolean_Comparison_Exp>;
  isPublished?: Maybe<Boolean_Comparison_Exp>;
  isSuspended?: Maybe<Boolean_Comparison_Exp>;
  storeId?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
};

export enum Products_Constraint {
  PRODUCTS_PKEY = 'products_pkey'
}

export type Products_Insert_Input = {
  categoryId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currentSnapshot?: Maybe<Product_Snapshots_Obj_Rel_Insert_Input>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  isExcludedFromRecommendations?: Maybe<Scalars['Boolean']>;
  isExcludedFromSearch?: Maybe<Scalars['Boolean']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  isSuspended?: Maybe<Scalars['Boolean']>;
  storeId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

export type Products_Max_Fields = {
   __typename?: 'products_max_fields';
  categoryId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

export type Products_Max_Order_By = {
  categoryId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currentSnapshotId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Products_Min_Fields = {
   __typename?: 'products_min_fields';
  categoryId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

export type Products_Min_Order_By = {
  categoryId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currentSnapshotId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Products_Mutation_Response = {
   __typename?: 'products_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Products>;
};

export type Products_Obj_Rel_Insert_Input = {
  data: Products_Insert_Input;
  on_conflict?: Maybe<Products_On_Conflict>;
};

export type Products_On_Conflict = {
  constraint: Products_Constraint;
  update_columns: Array<Products_Update_Column>;
  where?: Maybe<Products_Bool_Exp>;
};

export type Products_Order_By = {
  categoryId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currentSnapshot?: Maybe<Product_Snapshots_Order_By>;
  currentSnapshotId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  isDeleted?: Maybe<Order_By>;
  isExcludedFromRecommendations?: Maybe<Order_By>;
  isExcludedFromSearch?: Maybe<Order_By>;
  isPublished?: Maybe<Order_By>;
  isSuspended?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Products_Pk_Columns_Input = {
  id: Scalars['String'];
};

export enum Products_Select_Column {
  CATEGORYID = 'categoryId',
  CREATEDAT = 'createdAt',
  CURRENTSNAPSHOTID = 'currentSnapshotId',
  ID = 'id',
  ISDELETED = 'isDeleted',
  ISEXCLUDEDFROMRECOMMENDATIONS = 'isExcludedFromRecommendations',
  ISEXCLUDEDFROMSEARCH = 'isExcludedFromSearch',
  ISPUBLISHED = 'isPublished',
  ISSUSPENDED = 'isSuspended',
  STOREID = 'storeId',
  UPDATEDAT = 'updatedAt'
}

export type Products_Set_Input = {
  categoryId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  isExcludedFromRecommendations?: Maybe<Scalars['Boolean']>;
  isExcludedFromSearch?: Maybe<Scalars['Boolean']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  isSuspended?: Maybe<Scalars['Boolean']>;
  storeId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

export enum Products_Update_Column {
  CATEGORYID = 'categoryId',
  CREATEDAT = 'createdAt',
  CURRENTSNAPSHOTID = 'currentSnapshotId',
  ID = 'id',
  ISDELETED = 'isDeleted',
  ISEXCLUDEDFROMRECOMMENDATIONS = 'isExcludedFromRecommendations',
  ISEXCLUDEDFROMSEARCH = 'isExcludedFromSearch',
  ISPUBLISHED = 'isPublished',
  ISSUSPENDED = 'isSuspended',
  STOREID = 'storeId',
  UPDATEDAT = 'updatedAt'
}

export type ProductSale = {
   __typename?: 'ProductSale';
  orderItem: OrderItem;
  payoutItems?: Maybe<Array<Maybe<PayoutItem>>>;
  user?: Maybe<UserPublic>;
  userId?: Maybe<Scalars['ID']>;
};

export type ProductSalesEdge = Edge & {
   __typename?: 'ProductSalesEdge';
  cursor: Scalars['PageCursor'];
  node: ProductSale;
};

export type ProductsConnection = Connection & {
   __typename?: 'ProductsConnection';
  edges: Array<ProductsEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ProductScopedDiscountInfo = {
   __typename?: 'ProductScopedDiscountInfo';
  stockLimitCondition?: Maybe<DiscountStockLimitCondition>;
  variantSnapshotId?: Maybe<Scalars['ID']>;
};

export type ProductsEdge = Edge & {
   __typename?: 'ProductsEdge';
  cursor: Scalars['PageCursor'];
  node: Product;
};

export type ProductSoldPeriodSummary = {
   __typename?: 'ProductSoldPeriodSummary';
  grossAmount: Scalars['Price'];
  numberOfSalesMade: Scalars['Int'];
  product: Product;
};

export type ProductSpecialDeal = {
   __typename?: 'ProductSpecialDeal';
  discountedPrice: Scalars['Price'];
  stockLimitCondition?: Maybe<DiscountStockLimitCondition>;
  timeCondition?: Maybe<DiscountTimeCondition>;
};

export type ProductSpecialDealInput = {
  discountedPrice: Scalars['Price'];
  stockLimitCondition?: Maybe<DiscountStockLimitConditionInput>;
  timeCondition?: Maybe<DiscountTimeConditionInput>;
};

export type ProductsSoldPeriodSummaryConnection = Connection & {
   __typename?: 'ProductsSoldPeriodSummaryConnection';
  edges: Array<ProductsSoldPeriodSummaryEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ProductsSoldPeriodSummaryEdge = Edge & {
   __typename?: 'ProductsSoldPeriodSummaryEdge';
  cursor: Scalars['PageCursor'];
  node: ProductSoldPeriodSummary;
};

export type ProductVariant = {
   __typename?: 'ProductVariant';
  baseStockLevel?: Maybe<StockLevel>;
  createdAt: Scalars['Date'];
  currentStockLevel?: Maybe<StockLevel>;
  fileIds: Array<Scalars['ID']>;
  files: Array<ProductFile>;
  isDefault: Scalars['Boolean'];
  isSoldOut: Scalars['Boolean'];
  permanentDiscountedPriceDiscount?: Maybe<Discount>;
  previewItems: Array<ProductPreviewItem>;
  price: Scalars['Price'];
  priceDetails: PriceDetails;
  priceWas?: Maybe<Scalars['Price']>;
  productId: Scalars['ID'];
  productSnapshotId: Scalars['ID'];
  relevantDiscounts?: Maybe<Array<Maybe<Discount>>>;
  specialDeal?: Maybe<ProductSpecialDeal>;
  specialDealDiscount?: Maybe<Discount>;
  storeId: Scalars['ID'];
  variantDescription?: Maybe<Scalars['String']>;
  variantId: Scalars['ID'];
  variantName: Scalars['String'];
  variantSnapshotId: Scalars['ID'];
};

export type ProductVariantEditInput = {
  fileIds: Array<Scalars['ID']>;
  isDefault: Scalars['Boolean'];
  previewItems: Array<ProductPreviewItemInput>;
  price: Scalars['Price'];
  priceWas?: Maybe<Scalars['Price']>;
  quantityAvailable?: Maybe<Scalars['Int']>;
  specialDeal?: Maybe<ProductSpecialDealInput>;
  variantDescription: Scalars['String'];
  variantId?: Maybe<Scalars['ID']>;
  variantName: Scalars['String'];
};

export type ProductVariantInput = {
  fileIds: Array<Scalars['ID']>;
  isDefault: Scalars['Boolean'];
  previewItems: Array<ProductPreviewItemInput>;
  price: Scalars['Price'];
  priceWas?: Maybe<Scalars['Price']>;
  quantityAvailable?: Maybe<Scalars['Int']>;
  specialDeal?: Maybe<ProductSpecialDealInput>;
  variantDescription: Scalars['String'];
  variantName: Scalars['String'];
};

export enum QuantityLabel {
  QUANTITY = 'QUANTITY',
  SEATS = 'SEATS'
}

export type Query = {
   __typename?: 'Query';
  basicInsights: Array<AdminInsight>;
  categories: Array<ProductCategory>;
  category?: Maybe<ProductCategory>;
  curatedList?: Maybe<CuratedList>;
  curatedListItemsAdminConnection?: Maybe<CuratedListItemsConnection>;
  curatedListItemsConnection?: Maybe<CuratedListItemsConnection>;
  getOrder?: Maybe<Order>;
  getOrderAsAdmin?: Maybe<Order>;
  getOrderItem?: Maybe<OrderItem>;
  getPaymentMethod?: Maybe<PaymentMethod>;
  getPayoutById: Payout;
  getPayoutItemsInPeriodAdmin: PayoutItemsConnection;
  getPayoutItemsInPeriodAdminPaged: PayoutItemsPagedConnection;
  getPayoutSplitByStoreId: PayoutSplit;
  getPayouts: PayoutsConnection;
  getPayoutsInPeriodAdmin: PayoutsConnection;
  getProductByProductIdOrSlug?: Maybe<Product>;
  getProductFromLinkSlug?: Maybe<Product>;
  getProductSale?: Maybe<ProductSale>;
  getRecentTransactions: Array<Transaction>;
  getStoreByStoreIdOrSlug?: Maybe<Store>;
  getStoreFromLinkSlug?: Maybe<Store>;
  getStoreSalesInPeriodAdmin: StoreSalesInPeriodConnection;
  getTransaction?: Maybe<Transaction>;
  getTransactionsInPeriodAdmin: TransactionsConnection;
  listOfCuratedListsConnection: CuratedListsConnection;
  listPaymentMethods?: Maybe<Array<PaymentMethod>>;
  loggedInUser: UserPrivate;
  lookupProductLinkSlug?: Maybe<PrimaryLinkSlugs>;
  lookupStoreLinkSlug?: Maybe<PrimaryLinkSlugs>;
  platformDiscounts: DiscountsConnection;
  product?: Maybe<Product>;
  productsAdminConnection: ProductsConnection;
  productsAllConnection: ProductsConnection;
  productsByCategoryConnection?: Maybe<ProductsConnection>;
  productsDealsEndingSoonConnection: ProductsConnection;
  productsLimitedReleasesConnection: ProductsConnection;
  productsRecommendedConnection: ProductsConnection;
  search: SearchResultsConnection;
  store?: Maybe<Store>;
  storeDiscounts: DiscountsConnection;
  storesAdminConnection: StoresConnection;
  tryPromoCode?: Maybe<Discount>;
  unclaimedOrder?: Maybe<Order>;
  unclaimedOrdersConnection: OrdersConnection;
  user?: Maybe<User>;
  userByEmailOrId?: Maybe<User>;
  wishlistItemsConnection: WishlistItemsConnection;
};


export type QueryCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryCuratedListArgs = {
  listId: Scalars['ID'];
};


export type QueryCuratedListItemsAdminConnectionArgs = {
  listId: Scalars['ID'];
  query?: Maybe<ConnectionQuery>;
};


export type QueryCuratedListItemsConnectionArgs = {
  listId: Scalars['ID'];
  query?: Maybe<ConnectionQuery>;
};


export type QueryGetOrderArgs = {
  orderId: Scalars['ID'];
};


export type QueryGetOrderAsAdminArgs = {
  orderId: Scalars['ID'];
};


export type QueryGetOrderItemArgs = {
  orderItemId: Scalars['ID'];
};


export type QueryGetPaymentMethodArgs = {
  paymentMethodId: Scalars['ID'];
};


export type QueryGetPayoutByIdArgs = {
  payoutId: Scalars['ID'];
};


export type QueryGetPayoutItemsInPeriodAdminArgs = {
  month?: Maybe<Scalars['Int']>;
  payoutStatus?: Maybe<PayoutStatus>;
  query: ConnectionQuery;
  year?: Maybe<Scalars['Int']>;
};


export type QueryGetPayoutItemsInPeriodAdminPagedArgs = {
  month?: Maybe<Scalars['Int']>;
  payoutStatus?: Maybe<PayoutStatus>;
  query: PageBasedConnectionQuery;
  year?: Maybe<Scalars['Int']>;
};


export type QueryGetPayoutSplitByStoreIdArgs = {
  storeOrUserId: Scalars['ID'];
};


export type QueryGetPayoutsArgs = {
  query: ConnectionQuery;
  storeId: Scalars['ID'];
};


export type QueryGetPayoutsInPeriodAdminArgs = {
  month: Scalars['Int'];
  payoutStatus?: Maybe<PayoutStatus>;
  query: ConnectionQuery;
  year: Scalars['Int'];
};


export type QueryGetProductByProductIdOrSlugArgs = {
  productIdOrSlug: Scalars['String'];
};


export type QueryGetProductFromLinkSlugArgs = {
  slug: Scalars['String'];
};


export type QueryGetProductSaleArgs = {
  orderItemId: Scalars['ID'];
};


export type QueryGetRecentTransactionsArgs = {
  count: Scalars['Int'];
};


export type QueryGetStoreByStoreIdOrSlugArgs = {
  storeIdOrSlug: Scalars['String'];
};


export type QueryGetStoreFromLinkSlugArgs = {
  slug: Scalars['String'];
};


export type QueryGetStoreSalesInPeriodAdminArgs = {
  endDate: Scalars['Date'];
  query?: Maybe<ConnectionQuery>;
  startDate: Scalars['Date'];
};


export type QueryGetTransactionArgs = {
  transactionId: Scalars['ID'];
};


export type QueryGetTransactionsInPeriodAdminArgs = {
  month?: Maybe<Scalars['Int']>;
  query?: Maybe<ConnectionQuery>;
  year?: Maybe<Scalars['Int']>;
};


export type QueryListOfCuratedListsConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type QueryListPaymentMethodsArgs = {
  customerId: Scalars['ID'];
};


export type QueryLookupProductLinkSlugArgs = {
  slug: Scalars['String'];
};


export type QueryLookupStoreLinkSlugArgs = {
  slug: Scalars['String'];
};


export type QueryPlatformDiscountsArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QueryProductsAdminConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type QueryProductsAllConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type QueryProductsByCategoryConnectionArgs = {
  categoryId?: Maybe<Scalars['ID']>;
  categoryName?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionQuery>;
};


export type QueryProductsDealsEndingSoonConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type QueryProductsLimitedReleasesConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type QueryProductsRecommendedConnectionArgs = {
  currentlyViewingProductIdOrSlug?: Maybe<Scalars['ID']>;
  query?: Maybe<ConnectionQuery>;
};


export type QuerySearchArgs = {
  query?: Maybe<PageBasedConnectionQuery>;
  searchTerm: Scalars['String'];
};


export type QueryStoreArgs = {
  id: Scalars['ID'];
};


export type QueryStoreDiscountsArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type QueryStoresAdminConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type QueryTryPromoCodeArgs = {
  cartProductsInfo: Array<ProductProductVariantId>;
  code: Scalars['String'];
};


export type QueryUnclaimedOrderArgs = {
  id: Scalars['ID'];
};


export type QueryUnclaimedOrdersConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryUserByEmailOrIdArgs = {
  userIdOrEmail: Scalars['String'];
};


export type QueryWishlistItemsConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};

export type Query_Root = {
   __typename?: 'query_root';
  basicInsights: Array<AdminInsight>;
  categories: Array<ProductCategory>;
  category?: Maybe<ProductCategory>;
  curatedList?: Maybe<CuratedList>;
  curatedListItemsAdminConnection?: Maybe<CuratedListItemsConnection>;
  curatedListItemsConnection?: Maybe<CuratedListItemsConnection>;
  getOrder?: Maybe<Order>;
  getOrderAsAdmin?: Maybe<Order>;
  getOrderItem?: Maybe<OrderItem>;
  getPaymentMethod?: Maybe<PaymentMethod>;
  getPayoutById: Payout;
  getPayoutItemsInPeriodAdmin: PayoutItemsConnection;
  getPayoutItemsInPeriodAdminPaged: PayoutItemsPagedConnection;
  getPayoutSplitByStoreId: PayoutSplit;
  getPayouts: PayoutsConnection;
  getPayoutsInPeriodAdmin: PayoutsConnection;
  getProductByProductIdOrSlug?: Maybe<Product>;
  getProductFromLinkSlug?: Maybe<Product>;
  getProductSale?: Maybe<ProductSale>;
  getRecentTransactions: Array<Transaction>;
  getStoreByStoreIdOrSlug?: Maybe<Store>;
  getStoreFromLinkSlug?: Maybe<Store>;
  getStoreSalesInPeriodAdmin: StoreSalesInPeriodConnection;
  getTransaction?: Maybe<Transaction>;
  getTransactionsInPeriodAdmin: TransactionsConnection;
  image_owners: Array<Image_Owners>;
  image_owners_aggregate: Image_Owners_Aggregate;
  image_owners_by_pk?: Maybe<Image_Owners>;
  image_parents: Array<Image_Parents>;
  image_parents_aggregate: Image_Parents_Aggregate;
  image_parents_by_pk?: Maybe<Image_Parents>;
  image_variants: Array<Image_Variants>;
  image_variants_aggregate: Image_Variants_Aggregate;
  image_variants_by_pk?: Maybe<Image_Variants>;
  listOfCuratedListsConnection: CuratedListsConnection;
  listPaymentMethods?: Maybe<Array<PaymentMethod>>;
  loggedInUser: UserPrivate;
  lookupProductLinkSlug?: Maybe<PrimaryLinkSlugs>;
  lookupStoreLinkSlug?: Maybe<PrimaryLinkSlugs>;
  online_users: Array<Online_Users>;
  online_users_aggregate: Online_Users_Aggregate;
  platformDiscounts: DiscountsConnection;
  product?: Maybe<Product>;
  product_file_owners: Array<Product_File_Owners>;
  product_file_owners_aggregate: Product_File_Owners_Aggregate;
  product_file_owners_by_pk?: Maybe<Product_File_Owners>;
  product_files: Array<Product_Files>;
  product_files_aggregate: Product_Files_Aggregate;
  product_files_by_pk?: Maybe<Product_Files>;
  product_preview_items: Array<Product_Preview_Items>;
  product_preview_items_aggregate: Product_Preview_Items_Aggregate;
  product_preview_items_by_pk?: Maybe<Product_Preview_Items>;
  product_snapshots: Array<Product_Snapshots>;
  product_snapshots_aggregate: Product_Snapshots_Aggregate;
  product_snapshots_by_pk?: Maybe<Product_Snapshots>;
  product_variants: Array<Product_Variants>;
  product_variants_aggregate: Product_Variants_Aggregate;
  product_variants_by_pk?: Maybe<Product_Variants>;
  products: Array<Products>;
  productsAdminConnection: ProductsConnection;
  productsAllConnection: ProductsConnection;
  productsByCategoryConnection?: Maybe<ProductsConnection>;
  productsDealsEndingSoonConnection: ProductsConnection;
  productsLimitedReleasesConnection: ProductsConnection;
  productsRecommendedConnection: ProductsConnection;
  products_aggregate: Products_Aggregate;
  products_by_pk?: Maybe<Products>;
  search: SearchResultsConnection;
  store?: Maybe<Store>;
  storeDiscounts: DiscountsConnection;
  storesAdminConnection: StoresConnection;
  tryPromoCode?: Maybe<Discount>;
  unclaimedOrder?: Maybe<Order>;
  unclaimedOrdersConnection: OrdersConnection;
  user?: Maybe<User>;
  userByEmailOrId?: Maybe<User>;
  users: Array<Users>;
  users_aggregate: Users_Aggregate;
  users_by_pk?: Maybe<Users>;
  wishlistItemsConnection: WishlistItemsConnection;
};


export type Query_RootCategoryArgs = {
  id: Scalars['ID'];
};


export type Query_RootCuratedListArgs = {
  listId: Scalars['ID'];
};


export type Query_RootCuratedListItemsAdminConnectionArgs = {
  listId: Scalars['ID'];
  query?: Maybe<ConnectionQuery>;
};


export type Query_RootCuratedListItemsConnectionArgs = {
  listId: Scalars['ID'];
  query?: Maybe<ConnectionQuery>;
};


export type Query_RootGetOrderArgs = {
  orderId: Scalars['ID'];
};


export type Query_RootGetOrderAsAdminArgs = {
  orderId: Scalars['ID'];
};


export type Query_RootGetOrderItemArgs = {
  orderItemId: Scalars['ID'];
};


export type Query_RootGetPaymentMethodArgs = {
  paymentMethodId: Scalars['ID'];
};


export type Query_RootGetPayoutByIdArgs = {
  payoutId: Scalars['ID'];
};


export type Query_RootGetPayoutItemsInPeriodAdminArgs = {
  month?: Maybe<Scalars['Int']>;
  payoutStatus?: Maybe<PayoutStatus>;
  query: ConnectionQuery;
  year?: Maybe<Scalars['Int']>;
};


export type Query_RootGetPayoutItemsInPeriodAdminPagedArgs = {
  month?: Maybe<Scalars['Int']>;
  payoutStatus?: Maybe<PayoutStatus>;
  query: PageBasedConnectionQuery;
  year?: Maybe<Scalars['Int']>;
};


export type Query_RootGetPayoutSplitByStoreIdArgs = {
  storeOrUserId: Scalars['ID'];
};


export type Query_RootGetPayoutsArgs = {
  query: ConnectionQuery;
  storeId: Scalars['ID'];
};


export type Query_RootGetPayoutsInPeriodAdminArgs = {
  month: Scalars['Int'];
  payoutStatus?: Maybe<PayoutStatus>;
  query: ConnectionQuery;
  year: Scalars['Int'];
};


export type Query_RootGetProductByProductIdOrSlugArgs = {
  productIdOrSlug: Scalars['String'];
};


export type Query_RootGetProductFromLinkSlugArgs = {
  slug: Scalars['String'];
};


export type Query_RootGetProductSaleArgs = {
  orderItemId: Scalars['ID'];
};


export type Query_RootGetRecentTransactionsArgs = {
  count: Scalars['Int'];
};


export type Query_RootGetStoreByStoreIdOrSlugArgs = {
  storeIdOrSlug: Scalars['String'];
};


export type Query_RootGetStoreFromLinkSlugArgs = {
  slug: Scalars['String'];
};


export type Query_RootGetStoreSalesInPeriodAdminArgs = {
  endDate: Scalars['Date'];
  query?: Maybe<ConnectionQuery>;
  startDate: Scalars['Date'];
};


export type Query_RootGetTransactionArgs = {
  transactionId: Scalars['ID'];
};


export type Query_RootGetTransactionsInPeriodAdminArgs = {
  month?: Maybe<Scalars['Int']>;
  query?: Maybe<ConnectionQuery>;
  year?: Maybe<Scalars['Int']>;
};


export type Query_RootImage_OwnersArgs = {
  distinct_on?: Maybe<Array<Image_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Owners_Order_By>>;
  where?: Maybe<Image_Owners_Bool_Exp>;
};


export type Query_RootImage_Owners_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Owners_Order_By>>;
  where?: Maybe<Image_Owners_Bool_Exp>;
};


export type Query_RootImage_Owners_By_PkArgs = {
  imageId: Scalars['String'];
};


export type Query_RootImage_ParentsArgs = {
  distinct_on?: Maybe<Array<Image_Parents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Parents_Order_By>>;
  where?: Maybe<Image_Parents_Bool_Exp>;
};


export type Query_RootImage_Parents_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Parents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Parents_Order_By>>;
  where?: Maybe<Image_Parents_Bool_Exp>;
};


export type Query_RootImage_Parents_By_PkArgs = {
  imageId: Scalars['String'];
};


export type Query_RootImage_VariantsArgs = {
  distinct_on?: Maybe<Array<Image_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Variants_Order_By>>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};


export type Query_RootImage_Variants_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Variants_Order_By>>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};


export type Query_RootImage_Variants_By_PkArgs = {
  variantId: Scalars['String'];
};


export type Query_RootListOfCuratedListsConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type Query_RootListPaymentMethodsArgs = {
  customerId: Scalars['ID'];
};


export type Query_RootLookupProductLinkSlugArgs = {
  slug: Scalars['String'];
};


export type Query_RootLookupStoreLinkSlugArgs = {
  slug: Scalars['String'];
};


export type Query_RootOnline_UsersArgs = {
  distinct_on?: Maybe<Array<Online_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Online_Users_Order_By>>;
  where?: Maybe<Online_Users_Bool_Exp>;
};


export type Query_RootOnline_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Online_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Online_Users_Order_By>>;
  where?: Maybe<Online_Users_Bool_Exp>;
};


export type Query_RootPlatformDiscountsArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type Query_RootProductArgs = {
  id: Scalars['ID'];
};


export type Query_RootProduct_File_OwnersArgs = {
  distinct_on?: Maybe<Array<Product_File_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_File_Owners_Order_By>>;
  where?: Maybe<Product_File_Owners_Bool_Exp>;
};


export type Query_RootProduct_File_Owners_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_File_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_File_Owners_Order_By>>;
  where?: Maybe<Product_File_Owners_Bool_Exp>;
};


export type Query_RootProduct_File_Owners_By_PkArgs = {
  productFileId: Scalars['String'];
};


export type Query_RootProduct_FilesArgs = {
  distinct_on?: Maybe<Array<Product_Files_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Files_Order_By>>;
  where?: Maybe<Product_Files_Bool_Exp>;
};


export type Query_RootProduct_Files_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Files_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Files_Order_By>>;
  where?: Maybe<Product_Files_Bool_Exp>;
};


export type Query_RootProduct_Files_By_PkArgs = {
  productFileId: Scalars['String'];
};


export type Query_RootProduct_Preview_ItemsArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};


export type Query_RootProduct_Preview_Items_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};


export type Query_RootProduct_Preview_Items_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootProduct_SnapshotsArgs = {
  distinct_on?: Maybe<Array<Product_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Snapshots_Order_By>>;
  where?: Maybe<Product_Snapshots_Bool_Exp>;
};


export type Query_RootProduct_Snapshots_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Snapshots_Order_By>>;
  where?: Maybe<Product_Snapshots_Bool_Exp>;
};


export type Query_RootProduct_Snapshots_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootProduct_VariantsArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


export type Query_RootProduct_Variants_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


export type Query_RootProduct_Variants_By_PkArgs = {
  variantSnapshotId: Scalars['String'];
};


export type Query_RootProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type Query_RootProductsAdminConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type Query_RootProductsAllConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type Query_RootProductsByCategoryConnectionArgs = {
  categoryId?: Maybe<Scalars['ID']>;
  categoryName?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionQuery>;
};


export type Query_RootProductsDealsEndingSoonConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type Query_RootProductsLimitedReleasesConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type Query_RootProductsRecommendedConnectionArgs = {
  currentlyViewingProductIdOrSlug?: Maybe<Scalars['ID']>;
  query?: Maybe<ConnectionQuery>;
};


export type Query_RootProducts_AggregateArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type Query_RootProducts_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootSearchArgs = {
  query?: Maybe<PageBasedConnectionQuery>;
  searchTerm: Scalars['String'];
};


export type Query_RootStoreArgs = {
  id: Scalars['ID'];
};


export type Query_RootStoreDiscountsArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type Query_RootStoresAdminConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type Query_RootTryPromoCodeArgs = {
  cartProductsInfo: Array<ProductProductVariantId>;
  code: Scalars['String'];
};


export type Query_RootUnclaimedOrderArgs = {
  id: Scalars['ID'];
};


export type Query_RootUnclaimedOrdersConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type Query_RootUserArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type Query_RootUserByEmailOrIdArgs = {
  userIdOrEmail: Scalars['String'];
};


export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootWishlistItemsConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};

export type Refund = {
   __typename?: 'Refund';
  createdAt: Scalars['ID'];
  id: Scalars['ID'];
  orderId: Scalars['ID'];
  orderItemIds: Array<Scalars['ID']>;
  reason: Scalars['String'];
  reasonDetails?: Maybe<Scalars['String']>;
  transactionId: Scalars['ID'];
};

export type RefundOrderItem = {
  disableItem?: Maybe<Scalars['Boolean']>;
  orderItemId?: Maybe<Scalars['ID']>;
  refundPayoutItems?: Maybe<Array<Maybe<RefundPayoutItem>>>;
};

export type RefundPayoutItem = {
  amount?: Maybe<Scalars['Int']>;
  payeeId?: Maybe<Scalars['ID']>;
  payeeType?: Maybe<PayeeType>;
};

export type ResetPasswordResponse = {
   __typename?: 'ResetPasswordResponse';
  email?: Maybe<Scalars['String']>;
  expiresAt?: Maybe<Scalars['Date']>;
  resetId?: Maybe<Scalars['String']>;
};

export enum Role {
  ANON = 'ANON',
  PLATFORM_ADMIN = 'PLATFORM_ADMIN',
  SYSTEM = 'SYSTEM',
  USER = 'USER'
}

export type SalesBreakdown = {
   __typename?: 'SalesBreakdown';
  actualPrice: Scalars['Int'];
  id: Scalars['ID'];
};

export type SearchResultItem = ProductPrivate | ProductPublic;

export type SearchResultsConnection = PageBasedConnection & {
   __typename?: 'SearchResultsConnection';
  edges: Array<SearchResultsEdge>;
  pageInfo: PageBasedConnectionPageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type SearchResultsEdge = PageBasedConnectionEdge & {
   __typename?: 'SearchResultsEdge';
  node: SearchResultItem;
  pageNumber: Scalars['Int'];
};

export type SendgridResponse = {
   __typename?: 'SendgridResponse';
  status?: Maybe<SendgridStatus>;
  verified?: Maybe<SendgridVerified>;
};

export type SendgridStatus = {
   __typename?: 'SendgridStatus';
  message?: Maybe<Scalars['String']>;
};

export type SendgridVerified = {
   __typename?: 'SendgridVerified';
  email?: Maybe<Scalars['String']>;
  expiresAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type SendResetPasswordResponse = {
   __typename?: 'SendResetPasswordResponse';
  emailSentTo?: Maybe<Scalars['String']>;
  resetId?: Maybe<Scalars['String']>;
  status?: Maybe<SendgridStatus>;
};

export type SignUpMutationResponse = {
   __typename?: 'SignUpMutationResponse';
  sendgridResponse?: Maybe<SendgridResponse>;
  stripeCustomerCreationResponse?: Maybe<StripeCustomerCreationResponse>;
  user: UserPrivate;
};

export type StockLevel = {
   __typename?: 'StockLevel';
  quantityAvailable: Scalars['Int'];
  quantityRestocked?: Maybe<Scalars['Int']>;
  restockedAt?: Maybe<Scalars['Date']>;
};

export type Store = {
  bio?: Maybe<Scalars['String']>;
  cover?: Maybe<Image>;
  coverId?: Maybe<Scalars['ID']>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  isSuspended: Scalars['Boolean'];
  linkSlugs?: Maybe<PrimaryLinkSlugs>;
  name: Scalars['String'];
  productsForSaleConnection: ProductsConnection;
  profile?: Maybe<Image>;
  profileId?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  userId: Scalars['ID'];
  website?: Maybe<Scalars['String']>;
};


export type StoreProductsForSaleConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};

export type StoreAnalytics = {
   __typename?: 'StoreAnalytics';
  payoutHistorySummaries: PayoutHistorySummaries;
  salesHistoryConnection: StoreSalesHistoryConnection;
  storeId: Scalars['ID'];
};


export type StoreAnalyticsSalesHistoryConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};

export type StoreMutationResponse = {
   __typename?: 'StoreMutationResponse';
  store: StorePrivate;
};

export type StorePrivate = Store & {
   __typename?: 'StorePrivate';
  analytics: StoreAnalytics;
  bio?: Maybe<Scalars['String']>;
  cover?: Maybe<Image>;
  coverId?: Maybe<Scalars['ID']>;
  createdAt: Scalars['Date'];
  dashboardPublishedProductsConnection: ProductsConnection;
  dashboardUnpublishedProductsConnection?: Maybe<ProductsConnection>;
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  isSuspended: Scalars['Boolean'];
  linkSlugs?: Maybe<PrimaryLinkSlugs>;
  name: Scalars['String'];
  payoutSplit?: Maybe<PayoutSplit>;
  productsForSaleConnection: ProductsConnection;
  profile?: Maybe<Image>;
  profileId?: Maybe<Scalars['ID']>;
  promoCodeDiscounts: DiscountsConnection;
  updatedAt?: Maybe<Scalars['Date']>;
  user: UserPrivate;
  userId: Scalars['ID'];
  website?: Maybe<Scalars['String']>;
};


export type StorePrivateDashboardPublishedProductsConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type StorePrivateDashboardUnpublishedProductsConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type StorePrivateProductsForSaleConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type StorePrivatePromoCodeDiscountsArgs = {
  query?: Maybe<ConnectionQuery>;
};

export type StorePublic = Store & {
   __typename?: 'StorePublic';
  bio?: Maybe<Scalars['String']>;
  cover?: Maybe<Image>;
  coverId?: Maybe<Scalars['ID']>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  isSuspended: Scalars['Boolean'];
  linkSlugs?: Maybe<PrimaryLinkSlugs>;
  name: Scalars['String'];
  productsForSaleConnection: ProductsConnection;
  profile?: Maybe<Image>;
  profileId?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  user: UserPublic;
  userId: Scalars['ID'];
  website?: Maybe<Scalars['String']>;
};


export type StorePublicProductsForSaleConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};

export type StoreSales = {
   __typename?: 'StoreSales';
  itemCount: Scalars['Int'];
  salesBreakdown: Array<SalesBreakdown>;
  salesItems: Array<OrderItem>;
  storeId: Scalars['ID'];
  totalSalesRevenue: Scalars['Int'];
};

export type StoreSalesEdge = Edge & {
   __typename?: 'StoreSalesEdge';
  cursor: Scalars['PageCursor'];
  node: StoreSales;
};

export type StoreSalesHistoryConnection = Connection & {
   __typename?: 'StoreSalesHistoryConnection';
  edges: Array<ProductSalesEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type StoreSalesInPeriodConnection = Connection & {
   __typename?: 'StoreSalesInPeriodConnection';
  edges: Array<StoreSalesEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type StoresConnection = Connection & {
   __typename?: 'StoresConnection';
  edges: Array<StoresEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type StoreScopedDiscountInfo = {
   __typename?: 'StoreScopedDiscountInfo';
  minimumQuantity?: Maybe<Scalars['Int']>;
  minimumSpend?: Maybe<Scalars['Price']>;
  productId?: Maybe<Scalars['ID']>;
  storeId: Scalars['ID'];
  variantId?: Maybe<Scalars['ID']>;
};

export type StoresEdge = Edge & {
   __typename?: 'StoresEdge';
  cursor: Scalars['PageCursor'];
  node: Store;
};

export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

export type StripeCustomerCreationResponse = {
   __typename?: 'StripeCustomerCreationResponse';
  endpoint?: Maybe<Scalars['String']>;
  response?: Maybe<StripeCustomerProfile>;
  status?: Maybe<Scalars['String']>;
};

export type StripeCustomerProfile = {
   __typename?: 'StripeCustomerProfile';
  balance?: Maybe<Scalars['Int']>;
  created?: Maybe<Scalars['Date']>;
  currency?: Maybe<Scalars['String']>;
  defaultSource?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Subscription_Root = {
   __typename?: 'subscription_root';
  image_owners: Array<Image_Owners>;
  image_owners_aggregate: Image_Owners_Aggregate;
  image_owners_by_pk?: Maybe<Image_Owners>;
  image_parents: Array<Image_Parents>;
  image_parents_aggregate: Image_Parents_Aggregate;
  image_parents_by_pk?: Maybe<Image_Parents>;
  image_variants: Array<Image_Variants>;
  image_variants_aggregate: Image_Variants_Aggregate;
  image_variants_by_pk?: Maybe<Image_Variants>;
  online_users: Array<Online_Users>;
  online_users_aggregate: Online_Users_Aggregate;
  product_file_owners: Array<Product_File_Owners>;
  product_file_owners_aggregate: Product_File_Owners_Aggregate;
  product_file_owners_by_pk?: Maybe<Product_File_Owners>;
  product_files: Array<Product_Files>;
  product_files_aggregate: Product_Files_Aggregate;
  product_files_by_pk?: Maybe<Product_Files>;
  product_preview_items: Array<Product_Preview_Items>;
  product_preview_items_aggregate: Product_Preview_Items_Aggregate;
  product_preview_items_by_pk?: Maybe<Product_Preview_Items>;
  product_snapshots: Array<Product_Snapshots>;
  product_snapshots_aggregate: Product_Snapshots_Aggregate;
  product_snapshots_by_pk?: Maybe<Product_Snapshots>;
  product_variants: Array<Product_Variants>;
  product_variants_aggregate: Product_Variants_Aggregate;
  product_variants_by_pk?: Maybe<Product_Variants>;
  products: Array<Products>;
  products_aggregate: Products_Aggregate;
  products_by_pk?: Maybe<Products>;
  users: Array<Users>;
  users_aggregate: Users_Aggregate;
  users_by_pk?: Maybe<Users>;
};


export type Subscription_RootImage_OwnersArgs = {
  distinct_on?: Maybe<Array<Image_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Owners_Order_By>>;
  where?: Maybe<Image_Owners_Bool_Exp>;
};


export type Subscription_RootImage_Owners_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Owners_Order_By>>;
  where?: Maybe<Image_Owners_Bool_Exp>;
};


export type Subscription_RootImage_Owners_By_PkArgs = {
  imageId: Scalars['String'];
};


export type Subscription_RootImage_ParentsArgs = {
  distinct_on?: Maybe<Array<Image_Parents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Parents_Order_By>>;
  where?: Maybe<Image_Parents_Bool_Exp>;
};


export type Subscription_RootImage_Parents_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Parents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Parents_Order_By>>;
  where?: Maybe<Image_Parents_Bool_Exp>;
};


export type Subscription_RootImage_Parents_By_PkArgs = {
  imageId: Scalars['String'];
};


export type Subscription_RootImage_VariantsArgs = {
  distinct_on?: Maybe<Array<Image_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Variants_Order_By>>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};


export type Subscription_RootImage_Variants_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Variants_Order_By>>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};


export type Subscription_RootImage_Variants_By_PkArgs = {
  variantId: Scalars['String'];
};


export type Subscription_RootOnline_UsersArgs = {
  distinct_on?: Maybe<Array<Online_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Online_Users_Order_By>>;
  where?: Maybe<Online_Users_Bool_Exp>;
};


export type Subscription_RootOnline_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Online_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Online_Users_Order_By>>;
  where?: Maybe<Online_Users_Bool_Exp>;
};


export type Subscription_RootProduct_File_OwnersArgs = {
  distinct_on?: Maybe<Array<Product_File_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_File_Owners_Order_By>>;
  where?: Maybe<Product_File_Owners_Bool_Exp>;
};


export type Subscription_RootProduct_File_Owners_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_File_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_File_Owners_Order_By>>;
  where?: Maybe<Product_File_Owners_Bool_Exp>;
};


export type Subscription_RootProduct_File_Owners_By_PkArgs = {
  productFileId: Scalars['String'];
};


export type Subscription_RootProduct_FilesArgs = {
  distinct_on?: Maybe<Array<Product_Files_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Files_Order_By>>;
  where?: Maybe<Product_Files_Bool_Exp>;
};


export type Subscription_RootProduct_Files_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Files_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Files_Order_By>>;
  where?: Maybe<Product_Files_Bool_Exp>;
};


export type Subscription_RootProduct_Files_By_PkArgs = {
  productFileId: Scalars['String'];
};


export type Subscription_RootProduct_Preview_ItemsArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};


export type Subscription_RootProduct_Preview_Items_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};


export type Subscription_RootProduct_Preview_Items_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootProduct_SnapshotsArgs = {
  distinct_on?: Maybe<Array<Product_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Snapshots_Order_By>>;
  where?: Maybe<Product_Snapshots_Bool_Exp>;
};


export type Subscription_RootProduct_Snapshots_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Snapshots_Order_By>>;
  where?: Maybe<Product_Snapshots_Bool_Exp>;
};


export type Subscription_RootProduct_Snapshots_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootProduct_VariantsArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


export type Subscription_RootProduct_Variants_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


export type Subscription_RootProduct_Variants_By_PkArgs = {
  variantSnapshotId: Scalars['String'];
};


export type Subscription_RootProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type Subscription_RootProducts_AggregateArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type Subscription_RootProducts_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

export type SummaryStatistics = {
   __typename?: 'SummaryStatistics';
  amountSum: Scalars['Int'];
  count: Scalars['Int'];
};


export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

export type Transaction = {
   __typename?: 'Transaction';
  chargeId: Scalars['ID'];
  createdAt: Scalars['Date'];
  currency?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['ID']>;
  details?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  order?: Maybe<Order>;
  orderId: Scalars['ID'];
  paymentIntentId?: Maybe<Scalars['ID']>;
  paymentMethod?: Maybe<PaymentMethod>;
  paymentMethodId: Scalars['ID'];
  paymentProcessingFee: Scalars['Price'];
  paymentProcessor: PaymentProcessor;
  refund?: Maybe<Refund>;
  refundId?: Maybe<Scalars['ID']>;
  subtotal: Scalars['Price'];
  taxes: Scalars['Price'];
};

export type TransactionsConnection = Connection & {
   __typename?: 'TransactionsConnection';
  edges: Array<TransactionsEdge>;
  pageInfo: PageInfo;
  totalAmount?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type TransactionsEdge = Edge & {
   __typename?: 'TransactionsEdge';
  cursor: Scalars['PageCursor'];
  node: Transaction;
};

export type UploadRegisterMutationResponse = {
   __typename?: 'UploadRegisterMutationResponse';
  putUrl: Scalars['String'];
  uploadId: Scalars['ID'];
};

export type UploadSaveImageMutationResponse = {
   __typename?: 'UploadSaveImageMutationResponse';
  image: Image;
};

export type UploadSaveProductFileMutationResponse = {
   __typename?: 'UploadSaveProductFileMutationResponse';
  fileId: Scalars['ID'];
};

export enum UploadType {
  IMAGE = 'IMAGE',
  PRODUCT_FILE = 'PRODUCT_FILE'
}

export type User = {
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
};

export type UserMutationResponse = {
   __typename?: 'UserMutationResponse';
  user: UserPrivate;
};

export type UserPrivate = User & {
   __typename?: 'UserPrivate';
  cart: Cart;
  cartId: Scalars['ID'];
  createdAt: Scalars['Date'];
  defaultPaymentMethod?: Maybe<PaymentMethod>;
  defaultPaymentMethodId?: Maybe<Scalars['ID']>;
  downloadsConnection: DownloadsConnection;
  email: Scalars['String'];
  emailVerified?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  followingStores: FollowingStoresConnection;
  id: Scalars['ID'];
  isSuspended: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  orderHistoryConnection: OrdersConnection;
  paymentMethods: Array<PaymentMethod>;
  payoutHistoryConnection: PayoutsConnection;
  payoutMethod?: Maybe<PayoutMethod>;
  payoutMethodId?: Maybe<Scalars['ID']>;
  store?: Maybe<StorePrivate>;
  storeId?: Maybe<Scalars['ID']>;
  stripeCustomerId: Scalars['String'];
  updatedAt?: Maybe<Scalars['Date']>;
  userRole: Role;
  username?: Maybe<Scalars['String']>;
  wishlistItemsConnection: WishlistItemsConnection;
};


export type UserPrivateDownloadsConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type UserPrivateFollowingStoresArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type UserPrivateOrderHistoryConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type UserPrivatePayoutHistoryConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type UserPrivateWishlistItemsConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};

export type UserPublic = User & {
   __typename?: 'UserPublic';
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
};

export type Users = {
   __typename?: 'users';
  cartId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  defaultPaymentMethodId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  emailVerified?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isDeleted: Scalars['Boolean'];
  isSuspended: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  passwordHash: Scalars['String'];
  payoutMethodId?: Maybe<Scalars['String']>;
  payoutSplitId?: Maybe<Scalars['String']>;
  sellerReferredById?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userRole?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Users_Aggregate = {
   __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

export type Users_Aggregate_Fields = {
   __typename?: 'users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Max_Order_By>;
  min?: Maybe<Users_Min_Order_By>;
};

export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};

export type Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  cartId?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  defaultPaymentMethodId?: Maybe<String_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  emailVerified?: Maybe<Boolean_Comparison_Exp>;
  firstName?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  isDeleted?: Maybe<Boolean_Comparison_Exp>;
  isSuspended?: Maybe<Boolean_Comparison_Exp>;
  lastName?: Maybe<String_Comparison_Exp>;
  lastSeen?: Maybe<Timestamptz_Comparison_Exp>;
  passwordHash?: Maybe<String_Comparison_Exp>;
  payoutMethodId?: Maybe<String_Comparison_Exp>;
  payoutSplitId?: Maybe<String_Comparison_Exp>;
  sellerReferredById?: Maybe<String_Comparison_Exp>;
  storeId?: Maybe<String_Comparison_Exp>;
  stripeCustomerId?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  userRole?: Maybe<String_Comparison_Exp>;
  username?: Maybe<String_Comparison_Exp>;
};

export enum Users_Constraint {
  USERS_EMAIL_KEY = 'users_email_key',
  USERS_PKEY = 'users_pkey'
}

export type Users_Insert_Input = {
  cartId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  defaultPaymentMethodId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  isSuspended?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  passwordHash?: Maybe<Scalars['String']>;
  payoutMethodId?: Maybe<Scalars['String']>;
  payoutSplitId?: Maybe<Scalars['String']>;
  sellerReferredById?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userRole?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Users_Max_Fields = {
   __typename?: 'users_max_fields';
  cartId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  defaultPaymentMethodId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  passwordHash?: Maybe<Scalars['String']>;
  payoutMethodId?: Maybe<Scalars['String']>;
  payoutSplitId?: Maybe<Scalars['String']>;
  sellerReferredById?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userRole?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Users_Max_Order_By = {
  cartId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  defaultPaymentMethodId?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  firstName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  lastName?: Maybe<Order_By>;
  lastSeen?: Maybe<Order_By>;
  passwordHash?: Maybe<Order_By>;
  payoutMethodId?: Maybe<Order_By>;
  payoutSplitId?: Maybe<Order_By>;
  sellerReferredById?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  stripeCustomerId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userRole?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

export type Users_Min_Fields = {
   __typename?: 'users_min_fields';
  cartId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  defaultPaymentMethodId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  passwordHash?: Maybe<Scalars['String']>;
  payoutMethodId?: Maybe<Scalars['String']>;
  payoutSplitId?: Maybe<Scalars['String']>;
  sellerReferredById?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userRole?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Users_Min_Order_By = {
  cartId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  defaultPaymentMethodId?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  firstName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  lastName?: Maybe<Order_By>;
  lastSeen?: Maybe<Order_By>;
  passwordHash?: Maybe<Order_By>;
  payoutMethodId?: Maybe<Order_By>;
  payoutSplitId?: Maybe<Order_By>;
  sellerReferredById?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  stripeCustomerId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userRole?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

export type Users_Mutation_Response = {
   __typename?: 'users_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Users>;
};

export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};

export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

export type Users_Order_By = {
  cartId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  defaultPaymentMethodId?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  emailVerified?: Maybe<Order_By>;
  firstName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  isDeleted?: Maybe<Order_By>;
  isSuspended?: Maybe<Order_By>;
  lastName?: Maybe<Order_By>;
  lastSeen?: Maybe<Order_By>;
  passwordHash?: Maybe<Order_By>;
  payoutMethodId?: Maybe<Order_By>;
  payoutSplitId?: Maybe<Order_By>;
  sellerReferredById?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  stripeCustomerId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userRole?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

export type Users_Pk_Columns_Input = {
  id: Scalars['String'];
};

export enum Users_Select_Column {
  CARTID = 'cartId',
  CREATEDAT = 'createdAt',
  DEFAULTPAYMENTMETHODID = 'defaultPaymentMethodId',
  EMAIL = 'email',
  EMAILVERIFIED = 'emailVerified',
  FIRSTNAME = 'firstName',
  ID = 'id',
  ISDELETED = 'isDeleted',
  ISSUSPENDED = 'isSuspended',
  LASTNAME = 'lastName',
  LASTSEEN = 'lastSeen',
  PASSWORDHASH = 'passwordHash',
  PAYOUTMETHODID = 'payoutMethodId',
  PAYOUTSPLITID = 'payoutSplitId',
  SELLERREFERREDBYID = 'sellerReferredById',
  STOREID = 'storeId',
  STRIPECUSTOMERID = 'stripeCustomerId',
  UPDATEDAT = 'updatedAt',
  USERROLE = 'userRole',
  USERNAME = 'username'
}

export type Users_Set_Input = {
  cartId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  defaultPaymentMethodId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  isSuspended?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  passwordHash?: Maybe<Scalars['String']>;
  payoutMethodId?: Maybe<Scalars['String']>;
  payoutSplitId?: Maybe<Scalars['String']>;
  sellerReferredById?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userRole?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export enum Users_Update_Column {
  CARTID = 'cartId',
  CREATEDAT = 'createdAt',
  DEFAULTPAYMENTMETHODID = 'defaultPaymentMethodId',
  EMAIL = 'email',
  EMAILVERIFIED = 'emailVerified',
  FIRSTNAME = 'firstName',
  ID = 'id',
  ISDELETED = 'isDeleted',
  ISSUSPENDED = 'isSuspended',
  LASTNAME = 'lastName',
  LASTSEEN = 'lastSeen',
  PASSWORDHASH = 'passwordHash',
  PAYOUTMETHODID = 'payoutMethodId',
  PAYOUTSPLITID = 'payoutSplitId',
  SELLERREFERREDBYID = 'sellerReferredById',
  STOREID = 'storeId',
  STRIPECUSTOMERID = 'stripeCustomerId',
  UPDATEDAT = 'updatedAt',
  USERROLE = 'userRole',
  USERNAME = 'username'
}

export type UserWithRole = User & {
   __typename?: 'UserWithRole';
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  userRole: Role;
};


export enum VariantsLabel {
  LICENSE = 'LICENSE',
  VARIANT = 'VARIANT'
}

export type WishlistItem = {
   __typename?: 'WishlistItem';
  addedAt: Scalars['Date'];
  ownerUserId: Scalars['ID'];
  product: Product;
};

export type WishlistItemsConnection = Connection & {
   __typename?: 'WishlistItemsConnection';
  edges: Array<WishlistItemsEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type WishlistItemsEdge = Edge & {
   __typename?: 'WishlistItemsEdge';
  cursor: Scalars['PageCursor'];
  node: WishlistItem;
};





export type RegisterUploadMutationVariables = {
  uploadType: UploadType;
  mimeType: Scalars['String'];
  fileSize: Scalars['Int'];
};


export type RegisterUploadMutation = { __typename?: 'mutation_root', uploadRegister: { __typename?: 'UploadRegisterMutationResponse', uploadId: string, putUrl: string } };

export type SaveImageUploadMutationVariables = {
  uploadId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type SaveImageUploadMutation = { __typename?: 'mutation_root', uploadSaveImage: { __typename?: 'UploadSaveImageMutationResponse', image: (
      { __typename?: 'Image' }
      & ImageFragment
    ) } };

export type SaveProductFileUploadMutationVariables = {
  uploadId: Scalars['ID'];
  fileName: Scalars['String'];
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type SaveProductFileUploadMutation = { __typename?: 'mutation_root', uploadSaveProductFile: { __typename?: 'UploadSaveProductFileMutationResponse', fileId: string } };

export type GetProductFileDownloadLinkMutationVariables = {
  id: Scalars['ID'];
  orderItemId: Scalars['ID'];
};


export type GetProductFileDownloadLinkMutation = { __typename?: 'mutation_root', generateProductFileDownloadLink: { __typename?: 'ProductFileLinkMutationResponse', downloadLink: { __typename?: 'ProductFileDownloadLink', productFileId: string, expiresAt: any, url: string } } };

export type StockLevelFragment = { __typename?: 'StockLevel', quantityAvailable: number, restockedAt?: Maybe<any>, quantityRestocked?: Maybe<number> };

export type StockLimitConditionFragment = { __typename?: 'DiscountStockLimitCondition', supplyExhaustionRule: DiscountUnavailableRule, stockLevel: (
    { __typename?: 'StockLevel' }
    & StockLevelFragment
  ) };

export type TimeConditionFragment = { __typename?: 'DiscountTimeCondition', start?: Maybe<any>, end: any, timeExpiryRule: DiscountUnavailableRule };

export type DiscountFragment = { __typename?: 'Discount', id: string, createdAt: any, scope: DiscountScope, modifier: DiscountModifier, isAutomatic: boolean, promoCode?: Maybe<string>, valueFixed?: Maybe<any>, valueDollarsOff?: Maybe<any>, valuePercentageOff?: Maybe<number>, isDisabled: boolean, timeCondition?: Maybe<(
    { __typename?: 'DiscountTimeCondition' }
    & TimeConditionFragment
  )>, productScopeInfo?: Maybe<{ __typename?: 'ProductScopedDiscountInfo', variantSnapshotId?: Maybe<string>, stockLimitCondition?: Maybe<(
      { __typename?: 'DiscountStockLimitCondition' }
      & StockLimitConditionFragment
    )> }>, storeScopeInfo?: Maybe<{ __typename?: 'StoreScopedDiscountInfo', storeId: string, productId?: Maybe<string>, variantId?: Maybe<string>, minimumSpend?: Maybe<any>, minimumQuantity?: Maybe<number> }>, platformScopeInfo?: Maybe<{ __typename?: 'PlatformScopedDiscountInfo', isApplicableToAnyProduct: boolean }> };

export type PriceDetailsFragment = { __typename?: 'PriceDetails', basePrice: any, actualPrice: any, discountBreakdown?: Maybe<{ __typename?: 'PriceDetailsDiscountBreakdown', fixedPriceComponent: any, dollarsOffComponent: any, percentOffComponent: any, promoCodeComponent: any, fixedPriceDiscount?: Maybe<(
      { __typename?: 'Discount' }
      & DiscountFragment
    )>, dollarsOffDiscounts: Array<(
      { __typename?: 'Discount' }
      & DiscountFragment
    )>, percentOffDiscount?: Maybe<(
      { __typename?: 'Discount' }
      & DiscountFragment
    )> }> };

export type ImageFragment = { __typename?: 'Image', id: string, createdAt: any, tags?: Maybe<Array<string>>, description?: Maybe<string>, original: { __typename?: 'ImageVariant', id: string, url: string, mimeType: string, heightInPixels: number, widthInPixels: number, sizeInBytes: number }, variants: Array<{ __typename?: 'ImageVariant', id: string, mimeType: string, sizeInBytes: number, widthInPixels: number, heightInPixels: number, url: string }> };

export type ProductVariantFragment = { __typename?: 'ProductVariant', variantId: string, variantSnapshotId: string, createdAt: any, variantName: string, variantDescription?: Maybe<string>, isDefault: boolean, price: any, priceWas?: Maybe<any>, isSoldOut: boolean, priceDetails: (
    { __typename?: 'PriceDetails' }
    & PriceDetailsFragment
  ), relevantDiscounts?: Maybe<Array<Maybe<(
    { __typename?: 'Discount' }
    & DiscountFragment
  )>>>, files: Array<{ __typename?: 'ProductFile', id: string, fileName?: Maybe<string>, createdAt: any, mimeType: string, sizeInBytes: number }>, previewItems: Array<{ __typename?: 'ProductPreviewItem', id: string, youTubeEmbedLink?: Maybe<string>, image?: Maybe<(
      { __typename?: 'Image' }
      & ImageFragment
    )> }>, baseStockLevel?: Maybe<(
    { __typename?: 'StockLevel' }
    & StockLevelFragment
  )>, currentStockLevel?: Maybe<(
    { __typename?: 'StockLevel' }
    & StockLevelFragment
  )>, specialDeal?: Maybe<{ __typename?: 'ProductSpecialDeal', discountedPrice: any, timeCondition?: Maybe<(
      { __typename?: 'DiscountTimeCondition' }
      & TimeConditionFragment
    )>, stockLimitCondition?: Maybe<(
      { __typename?: 'DiscountStockLimitCondition' }
      & StockLimitConditionFragment
    )> }> };

type ProductFragment_ProductPrivate_ = { __typename?: 'ProductPrivate', id: string, createdAt: any, updatedAt?: Maybe<any>, tags: Array<string>, isPublished: boolean, isSuspended: boolean, isDeleted: boolean, isExcludedFromAutomaticLists: boolean, name: string, tagline: string, description: string, variantsLabel: VariantsLabel, isQuantityEnabled: boolean, quantityLabel: QuantityLabel, currentVariants: Array<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )>, featuredVariant?: Maybe<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )>, chosenVariant?: Maybe<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )>, store: { __typename?: 'StorePrivate', id: string, name: string } | { __typename?: 'StorePublic', id: string, name: string }, category: { __typename?: 'ProductCategory', id: string, name: string, categoryGroup?: Maybe<any> } };

type ProductFragment_ProductPublic_ = { __typename?: 'ProductPublic', id: string, createdAt: any, updatedAt?: Maybe<any>, tags: Array<string>, isPublished: boolean, isSuspended: boolean, isDeleted: boolean, isExcludedFromAutomaticLists: boolean, name: string, tagline: string, description: string, variantsLabel: VariantsLabel, isQuantityEnabled: boolean, quantityLabel: QuantityLabel, currentVariants: Array<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )>, featuredVariant?: Maybe<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )>, chosenVariant?: Maybe<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )>, store: { __typename?: 'StorePrivate', id: string, name: string } | { __typename?: 'StorePublic', id: string, name: string }, category: { __typename?: 'ProductCategory', id: string, name: string, categoryGroup?: Maybe<any> } };

export type ProductFragment = ProductFragment_ProductPrivate_ | ProductFragment_ProductPublic_;

export type CartFragment = { __typename?: 'Cart', id: string, userId: string, updatedAt: any, subtotal: any, automaticSavings: any, promoCodeSavings: any, taxes: any, paymentProcessingFee: any, total: any, items: Array<{ __typename?: 'CartItem', id: string, createdAt: any, cartId: string, storeId: string, purchasableStatus: CartItemPurchasableStatus, quantity: number, priceDetails: (
      { __typename?: 'PriceDetails' }
      & PriceDetailsFragment
    ), product: (
      { __typename?: 'ProductPrivate' }
      & ProductFragment_ProductPrivate_
    ) | (
      { __typename?: 'ProductPublic' }
      & ProductFragment_ProductPublic_
    ) }>, relevantPromoCodes: Array<(
    { __typename?: 'Discount' }
    & DiscountFragment
  )> };

export type OrderFragment = { __typename?: 'Order', id: string, createdAt: any, updatedAt?: Maybe<any>, userId?: Maybe<string>, items: Array<{ __typename?: 'OrderItem', id: string, orderId: string, orderStatus: OrderStatus, createdAt: any, updatedAt?: Maybe<any>, quantity?: Maybe<number>, priceDetails: (
      { __typename?: 'PriceDetails' }
      & PriceDetailsFragment
    ), product: { __typename?: 'ProductPrivate', id: string, name: string, tagline: string, store: { __typename?: 'StorePrivate', id: string, name: string, website?: Maybe<string> } | { __typename?: 'StorePublic', id: string, name: string, website?: Maybe<string> }, chosenVariant?: Maybe<(
        { __typename?: 'ProductVariant' }
        & ProductVariantFragment
      )> } | { __typename?: 'ProductPublic', id: string, name: string, tagline: string, store: { __typename?: 'StorePrivate', id: string, name: string, website?: Maybe<string> } | { __typename?: 'StorePublic', id: string, name: string, website?: Maybe<string> }, chosenVariant?: Maybe<(
        { __typename?: 'ProductVariant' }
        & ProductVariantFragment
      )> } }>, currentSnapshot: { __typename?: 'OrderSnapshot', id: string, orderStatus: OrderStatus, subtotal: any, automaticSavings: any, promoCodeSavings: any, paymentProcessingFee: any, taxes: any, total: any, paymentProcessor?: Maybe<PaymentProcessor>, transaction?: Maybe<{ __typename?: 'Transaction', id: string, createdAt: any, subtotal: any, paymentProcessingFee: any, taxes: any, paymentProcessor: PaymentProcessor, customerId?: Maybe<string>, currency?: Maybe<string>, paymentMethodId: string, paymentIntentId?: Maybe<string>, chargeId: string }> }, attachedPromoCodes: Array<(
    { __typename?: 'Discount' }
    & DiscountFragment
  )> };

export type ProductSalesFragment = { __typename?: 'ProductSale', orderItem: { __typename?: 'OrderItem', id: string, orderId: string, orderStatus: OrderStatus, createdAt: any, product: { __typename?: 'ProductPrivate', id: string, name: string, tagline: string, chosenVariant?: Maybe<{ __typename?: 'ProductVariant', variantId: string, variantSnapshotId: string, variantName: string, variantDescription?: Maybe<string> }> } | { __typename?: 'ProductPublic', id: string, name: string, tagline: string, chosenVariant?: Maybe<{ __typename?: 'ProductVariant', variantId: string, variantSnapshotId: string, variantName: string, variantDescription?: Maybe<string> }> }, priceDetails: (
      { __typename?: 'PriceDetails' }
      & PriceDetailsFragment
    ) }, user?: Maybe<{ __typename?: 'UserPublic', firstName?: Maybe<string>, lastName?: Maybe<string>, email: string }> };

type StorePublicFragment_StorePrivate_ = { __typename?: 'StorePrivate', id: string, createdAt: any, updatedAt?: Maybe<any>, name: string, bio?: Maybe<string>, website?: Maybe<string>, cover?: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )>, profile?: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )>, productsForSaleConnection: { __typename?: 'ProductsConnection', totalCount?: Maybe<number>, edges: Array<{ __typename?: 'ProductsEdge', node: (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) | (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) }>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor?: Maybe<any> } } };

type StorePublicFragment_StorePublic_ = { __typename?: 'StorePublic', id: string, createdAt: any, updatedAt?: Maybe<any>, name: string, bio?: Maybe<string>, website?: Maybe<string>, cover?: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )>, profile?: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )>, productsForSaleConnection: { __typename?: 'ProductsConnection', totalCount?: Maybe<number>, edges: Array<{ __typename?: 'ProductsEdge', node: (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) | (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) }>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor?: Maybe<any> } } };

export type StorePublicFragment = StorePublicFragment_StorePrivate_ | StorePublicFragment_StorePublic_;

export type StorePrivateFragment = { __typename?: 'StorePrivate', id: string, name: string, createdAt: any, updatedAt?: Maybe<any>, website?: Maybe<string>, bio?: Maybe<string>, cover?: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )>, profile?: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )>, dashboardPublishedProductsConnection: { __typename?: 'ProductsConnection', totalCount?: Maybe<number>, edges: Array<{ __typename?: 'ProductsEdge', node: (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) | (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) }>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor?: Maybe<any> } }, dashboardUnpublishedProductsConnection?: Maybe<{ __typename?: 'ProductsConnection', totalCount?: Maybe<number>, edges: Array<{ __typename?: 'ProductsEdge', node: (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) | (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) }>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor?: Maybe<any> } }>, productsForSaleConnection: { __typename?: 'ProductsConnection', totalCount?: Maybe<number>, edges: Array<{ __typename?: 'ProductsEdge', node: (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) | (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) }>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor?: Maybe<any> } }, promoCodeDiscounts: { __typename?: 'DiscountsConnection', edges: Array<{ __typename?: 'DiscountsEdge', node: (
        { __typename?: 'Discount' }
        & DiscountFragment
      ) }> } };

export type PaymentMethodFragment = { __typename?: 'PaymentMethod', id: string, userId: string, createdAt: any, updatedAt?: Maybe<any>, customerId?: Maybe<string>, paymentProcessor?: Maybe<PaymentProcessor>, paymentMethodTypes?: Maybe<Array<Maybe<string>>>, last4?: Maybe<string>, expMonth?: Maybe<string>, expYear?: Maybe<string>, email?: Maybe<string>, name?: Maybe<string>, details?: Maybe<string> };

export type UserPrivateFragment = { __typename?: 'UserPrivate', id: string, firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, stripeCustomerId: string, emailVerified?: Maybe<boolean>, userRole: Role };

export type Unnamed_1_MutationVariables = {};


export type Unnamed_1_Mutation = { __typename?: 'mutation_root', insert_image_parents?: Maybe<{ __typename?: 'image_parents_mutation_response', affected_rows: number }>, insert_image_variants?: Maybe<{ __typename?: 'image_variants_mutation_response', affected_rows: number }>, insert_product_preview_items?: Maybe<{ __typename?: 'product_preview_items_mutation_response', affected_rows: number }>, insert_product_variants?: Maybe<{ __typename?: 'product_variants_mutation_response', affected_rows: number }>, insert_product_snapshots?: Maybe<{ __typename?: 'product_snapshots_mutation_response', affected_rows: number }>, insert_products?: Maybe<{ __typename?: 'products_mutation_response', affected_rows: number }> };

export type Unnamed_2_QueryVariables = {};


export type Unnamed_2_Query = { __typename?: 'query_root', products: Array<{ __typename?: 'products', id: string, storeId: string, isDeleted: boolean, isPublished: boolean, isSuspended: boolean, isExcludedFromSearch: boolean, isExcludedFromRecommendations: boolean, categoryId: string, createdAt: any, updatedAt: any, currentSnapshot: { __typename?: 'product_snapshots', id: string, createdAt: any, productId: string, title: string, description: string, condition: string, make: string, model: string, ammoType?: Maybe<string>, actionType: string, boreDiameter?: Maybe<string>, serialNumber: string, location: string, dealer: string, currentVariants: Array<{ __typename?: 'product_variants', variantSnapshotId: string, variantId: string, variantName: string, variantDescription: string, position: number, isDefault: boolean, basePrice: number, previewItems: Array<{ __typename?: 'product_preview_items', id: string, imageId?: Maybe<string>, position: number, youtubeEmbedLink?: Maybe<string>, variantSnapshotId?: Maybe<string> }> }> } }> };

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
    url
  }
  variants {
    id
    mimeType
    sizeInBytes
    widthInPixels
    heightInPixels
    url
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
  firstName
  lastName
  email
  stripeCustomerId
  emailVerified
  userRole
}
    `;
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
export type ID = Scalars["ID"]
export type Price = Scalars["Price"]
export type PageCursor = Scalars["PageCursor"]
export type ProductCategoryGroup = Scalars["ProductCategoryGroup"]