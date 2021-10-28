import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Standard date string */
  Date: Date;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** Price value representing USD cents */
  Price: number;
  _text: any;
  bigint: any;
  numeric: any;
  seed_float: any;
  timestamp: any;
  timestamptz: any;
};

export type AddRemovePaymentMethodResponse = {
  __typename?: 'AddRemovePaymentMethodResponse';
  user: UserPrivate;
};

export type AggregatorScrapeResponse = {
  __typename?: 'AggregatorScrapeResponse';
  id: Scalars['String'];
  link: Scalars['String'];
  title: Scalars['String'];
};

export type AuthorizePaymentMutationResponse = {
  __typename?: 'AuthorizePaymentMutationResponse';
  stripePaymentIntent: Scalars['String'];
};

/** Information about a person on the platform */
export type BasicUser = {
  id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Date']>;
  /**
   * firstName: String
   * lastName: String
   * email: String
   */
  defaultLicenseId?: Maybe<Scalars['String']>;
  defaultLicense?: Maybe<User_Licenses>;
  licenses?: Maybe<Array<Maybe<User_Licenses>>>;
};

export type Bid = {
  __typename?: 'Bid';
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  acceptedPrice?: Maybe<Scalars['Int']>;
  offerPrice?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  bidStatus?: Maybe<BidStatus>;
  productId?: Maybe<Scalars['String']>;
  productSnapshotId?: Maybe<Scalars['String']>;
  variantId?: Maybe<Scalars['String']>;
};

export enum BidStatus {
  /** created by buyer or seller */
  ACTIVE = 'ACTIVE',
  /** accepted and ready for buyer to create an order based on this bid */
  ACCEPTED = 'ACCEPTED',
  /** declined by the seller and no actions/steps further are available */
  DECLINED = 'DECLINED',
  /** withdrawn by the buyer and no actions/steps further are available */
  WITHDRAWN = 'WITHDRAWN',
  /** spent by buyer and used to create an order with seller's accepted price */
  SPENT = 'SPENT',
  /** another bid was accepted and now these losing bids are expired */
  EXPIRED = 'EXPIRED'
}

/** Mutation result that doesn't need to give anything back. */
export type BlankMutationResponse = {
  __typename?: 'BlankMutationResponse';
  /** Should always be true if you get this result instead of a MutationErrorSummary - mainly here to allow gql to build */
  success: Scalars['Boolean'];
  status?: Maybe<Scalars['JSON']>;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
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

/** Calibers grouped by AmmoType */
export enum CaliberGroup {
  SHOTSHELL = 'SHOTSHELL',
  PROJECTILE = 'PROJECTILE',
  RIMFIRE_CENTERFIRE = 'RIMFIRE_CENTERFIRE'
}

export type ChatRoom = {
  __typename?: 'ChatRoom';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  ownerId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  owner?: Maybe<BasicUser>;
  product?: Maybe<Product>;
  participants?: Maybe<Array<Maybe<Conversation>>>;
  messages?: Maybe<Array<Maybe<Message>>>;
};


export type ChatRoomMessagesArgs = {
  limit?: Maybe<Scalars['Int']>;
};

export enum ChatRoomStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  COMPLETED = 'COMPLETED'
}

export type ClaimItemMutationResponse = {
  __typename?: 'ClaimItemMutationResponse';
  user?: Maybe<UserPrivate>;
  claimId?: Maybe<Scalars['String']>;
  newsItem?: Maybe<NewsItem>;
};

export type ClaimProductLink = {
  __typename?: 'ClaimProductLink';
  claimId: Scalars['String'];
  claimLink: Scalars['String'];
  newsItemId: Scalars['String'];
};

export type ClassifiedAdPaymentInput = {
  total: Scalars['Int'];
  internationalFee: Scalars['Int'];
  stripeCreatePaymentData: Scalars['String'];
  currency: Scalars['String'];
};

export type CoinbaseExchangeRates = {
  __typename?: 'CoinbaseExchangeRates';
  currency?: Maybe<Scalars['String']>;
  rates?: Maybe<Scalars['JSON']>;
};

export type Collection = {
  __typename?: 'Collection';
  id: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  name: Scalars['String'];
  private: Scalars['Boolean'];
  userId: Scalars['String'];
  itemsConnection?: Maybe<CollectionItemsConnection>;
};

/** An individual item in a collection */
export type CollectionItem = {
  __typename?: 'CollectionItem';
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  userId: Scalars['String'];
  /** either product or externalProduct */
  productId?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  externalProductId?: Maybe<Scalars['String']>;
  externalProduct?: Maybe<External_Products>;
};

export type CollectionItemMutationResponse = {
  __typename?: 'CollectionItemMutationResponse';
  collectionId: Scalars['String'];
  collectionItem: CollectionItem;
};

export type CollectionItemsConnection = {
  __typename?: 'CollectionItemsConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<CollectionItemsEdge>;
};

export type CollectionItemsEdge = {
  __typename?: 'CollectionItemsEdge';
  node: CollectionItem;
};

export type Connection = {
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
};

export type ConnectionQuery = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  /** orderBy: products_order_by # hasura's orderby */
  orderBy?: Maybe<ProductsOrderBy>;
  where?: Maybe<Products_Bool_Exp>;
  filter?: Maybe<Scalars['String']>;
};

export type ConnectionQueryNewsItem = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  /** orderBy: products_order_by # hasura's orderby */
  orderBy?: Maybe<News_Items_Order_By>;
  where?: Maybe<News_Items_Bool_Exp>;
  filter?: Maybe<Scalars['String']>;
};

export type ConnectionQueryOrders = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Orders_Order_By>;
  where?: Maybe<Orders_Bool_Exp>;
};

export type Conversation = {
  __typename?: 'Conversation';
  userId?: Maybe<Scalars['String']>;
  user?: Maybe<BasicUser>;
  chatRoomId?: Maybe<Scalars['String']>;
  chatRoom?: Maybe<ChatRoom>;
  chatRoomStatus?: Maybe<ChatRoomStatus>;
};


/** columns and relationships of "dealers" */
export type Dealer = {
  __typename?: 'Dealer';
  id: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  licenseNumber: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  /** An object relationship */
  user?: Maybe<BasicUser>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type DealerMutationResponse = {
  __typename?: 'DealerMutationResponse';
  status: Scalars['String'];
  dealer?: Maybe<Dealer>;
};

export enum DealerState {
  ALL_STATES = 'ALL_STATES',
  ACT = 'ACT',
  NSW = 'NSW',
  NT = 'NT',
  QLD = 'QLD',
  SA = 'SA',
  TAS = 'TAS',
  VIC = 'VIC',
  WA = 'WA'
}

export type EditUserPhoneNumberInput = {
  phoneNumber: Scalars['String'];
  areaCode?: Maybe<Scalars['String']>;
  countryCode: Scalars['String'];
};

export type ExternalProductCreateInput = {
  model?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  caliber?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  priceWas?: Maybe<Scalars['Int']>;
  condition?: Maybe<Scalars['String']>;
  action?: Maybe<Scalars['String']>;
  adType?: Maybe<Scalars['String']>;
  advertised?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  isSold?: Maybe<Scalars['Boolean']>;
  licenseNumber: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  serialNumber: Scalars['String'];
  soldText?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  transferringDealer?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  sourceSite: Scalars['String'];
  sourceSiteUrl: Scalars['String'];
  sourceSiteId: Scalars['String'];
  previewItems: Array<ProductPreviewItemInput>;
  barrelLength?: Maybe<Scalars['String']>;
  hrsToSold?: Maybe<Scalars['Int']>;
};

export type ExternalProductMutationResponse = {
  __typename?: 'ExternalProductMutationResponse';
  externalProduct: External_Products;
};

export type FacetsDistributionObject = {
  __typename?: 'FacetsDistributionObject';
  /** make a JSON type, keys are arbitrary category names */
  categoryNames?: Maybe<Scalars['JSON']>;
  categorySlugs?: Maybe<Scalars['JSON']>;
  isPublished?: Maybe<Scalars['JSON']>;
  /** categoryGroups: JSON */
  stores?: Maybe<Scalars['JSON']>;
  actionTypes?: Maybe<Scalars['JSON']>;
  calibers?: Maybe<Scalars['JSON']>;
  dealerStates?: Maybe<Scalars['JSON']>;
};

export type FollowedStore = {
  __typename?: 'FollowedStore';
  createdAt?: Maybe<Scalars['Date']>;
  lastVisited?: Maybe<Scalars['Date']>;
  store?: Maybe<StorePublic>;
};

export type FollowingStoresConnection = {
  __typename?: 'FollowingStoresConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<FollowingStoresEdge>;
};

export type FollowingStoresEdge = {
  __typename?: 'FollowingStoresEdge';
  node: FollowedStore;
};

export type InsertDealerInput = {
  address: Scalars['String'];
  city?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  postCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  licenseNumber: Scalars['String'];
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
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



export enum ListingType {
  /** seller buys classified ad without ability for buyer sto buy with escrow */
  CLASSIFIED = 'CLASSIFIED',
  /** seller buys classified as with option for buyer to elect escrow */
  CLASSIFIED_WITH_ESCROW = 'CLASSIFIED_WITH_ESCROW',
  /** seller initiated escrow */
  ESCROW_ONLY = 'ESCROW_ONLY'
}

export type LoginDetails = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutationResponse = {
  __typename?: 'LoginMutationResponse';
  user: UserPrivate;
  jwt?: Maybe<Scalars['String']>;
  setCookie?: Maybe<Scalars['String']>;
};

export type MarkPayoutsAsPaidMutationResponse = {
  __typename?: 'MarkPayoutsAsPaidMutationResponse';
  orders: Array<Maybe<Order>>;
};

export type Message = {
  __typename?: 'Message';
  id?: Maybe<Scalars['String']>;
  chatRoomId?: Maybe<Scalars['String']>;
  senderId?: Maybe<Scalars['String']>;
  sender?: Maybe<BasicUser>;
  content?: Maybe<Scalars['String']>;
  /**
   * previewItemId: String
   * previewItem: ProductPreviewItem
   */
  bidId?: Maybe<Scalars['String']>;
  bid?: Maybe<Bid>;
  createdAt?: Maybe<Scalars['Date']>;
  editedAt?: Maybe<Scalars['Date']>;
  readAt?: Maybe<Scalars['Date']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** delete data from the table: "bids" */
  delete_bids?: Maybe<Bids_Mutation_Response>;
  /** delete single row from the table: "bids" */
  delete_bids_by_pk?: Maybe<Bids>;
  /** delete data from the table: "calibers" */
  delete_calibers?: Maybe<Calibers_Mutation_Response>;
  /** delete single row from the table: "calibers" */
  delete_calibers_by_pk?: Maybe<Calibers>;
  /** delete data from the table: "categories" */
  delete_categories?: Maybe<Categories_Mutation_Response>;
  /** delete single row from the table: "categories" */
  delete_categories_by_pk?: Maybe<Categories>;
  /** delete data from the table: "chat_messages" */
  delete_chat_messages?: Maybe<Chat_Messages_Mutation_Response>;
  /** delete single row from the table: "chat_messages" */
  delete_chat_messages_by_pk?: Maybe<Chat_Messages>;
  /** delete data from the table: "chat_rooms" */
  delete_chat_rooms?: Maybe<Chat_Rooms_Mutation_Response>;
  /** delete single row from the table: "chat_rooms" */
  delete_chat_rooms_by_pk?: Maybe<Chat_Rooms>;
  /** delete data from the table: "chat_users" */
  delete_chat_users?: Maybe<Chat_Users_Mutation_Response>;
  /** delete single row from the table: "chat_users" */
  delete_chat_users_by_pk?: Maybe<Chat_Users>;
  /** delete data from the table: "classified_ad_purchases" */
  delete_classified_ad_purchases?: Maybe<Classified_Ad_Purchases_Mutation_Response>;
  /** delete single row from the table: "classified_ad_purchases" */
  delete_classified_ad_purchases_by_pk?: Maybe<Classified_Ad_Purchases>;
  /** delete data from the table: "collection_items" */
  delete_collection_items?: Maybe<Collection_Items_Mutation_Response>;
  /** delete single row from the table: "collection_items" */
  delete_collection_items_by_pk?: Maybe<Collection_Items>;
  /** delete data from the table: "collections" */
  delete_collections?: Maybe<Collections_Mutation_Response>;
  /** delete single row from the table: "collections" */
  delete_collections_by_pk?: Maybe<Collections>;
  /** delete data from the table: "dealers" */
  delete_dealers?: Maybe<Dealers_Mutation_Response>;
  /** delete single row from the table: "dealers" */
  delete_dealers_by_pk?: Maybe<Dealers>;
  /** delete data from the table: "email_subscriptions" */
  delete_email_subscriptions?: Maybe<Email_Subscriptions_Mutation_Response>;
  /** delete single row from the table: "email_subscriptions" */
  delete_email_subscriptions_by_pk?: Maybe<Email_Subscriptions>;
  /** delete data from the table: "emails" */
  delete_emails?: Maybe<Emails_Mutation_Response>;
  /** delete single row from the table: "emails" */
  delete_emails_by_pk?: Maybe<Emails>;
  /** delete data from the table: "external_product_snapshots" */
  delete_external_product_snapshots?: Maybe<External_Product_Snapshots_Mutation_Response>;
  /** delete single row from the table: "external_product_snapshots" */
  delete_external_product_snapshots_by_pk?: Maybe<External_Product_Snapshots>;
  /** delete data from the table: "external_products" */
  delete_external_products?: Maybe<External_Products_Mutation_Response>;
  /** delete single row from the table: "external_products" */
  delete_external_products_by_pk?: Maybe<External_Products>;
  /** delete data from the table: "image_owners" */
  delete_image_owners?: Maybe<Image_Owners_Mutation_Response>;
  /** delete single row from the table: "image_owners" */
  delete_image_owners_by_pk?: Maybe<Image_Owners>;
  /** delete data from the table: "image_parents" */
  delete_image_parents?: Maybe<Image_Parents_Mutation_Response>;
  /** delete single row from the table: "image_parents" */
  delete_image_parents_by_pk?: Maybe<Image_Parents>;
  /** delete data from the table: "image_variants" */
  delete_image_variants?: Maybe<Image_Variants_Mutation_Response>;
  /** delete single row from the table: "image_variants" */
  delete_image_variants_by_pk?: Maybe<Image_Variants>;
  /** delete data from the table: "migrations" */
  delete_migrations?: Maybe<Migrations_Mutation_Response>;
  /** delete single row from the table: "migrations" */
  delete_migrations_by_pk?: Maybe<Migrations>;
  /** delete data from the table: "news_item_votes" */
  delete_news_item_votes?: Maybe<News_Item_Votes_Mutation_Response>;
  /** delete single row from the table: "news_item_votes" */
  delete_news_item_votes_by_pk?: Maybe<News_Item_Votes>;
  /** delete data from the table: "news_items" */
  delete_news_items?: Maybe<News_Items_Mutation_Response>;
  /** delete single row from the table: "news_items" */
  delete_news_items_by_pk?: Maybe<News_Items>;
  /** delete data from the table: "order_snapshots" */
  delete_order_snapshots?: Maybe<Order_Snapshots_Mutation_Response>;
  /** delete single row from the table: "order_snapshots" */
  delete_order_snapshots_by_pk?: Maybe<Order_Snapshots>;
  /** delete data from the table: "orders" */
  delete_orders?: Maybe<Orders_Mutation_Response>;
  /** delete single row from the table: "orders" */
  delete_orders_by_pk?: Maybe<Orders>;
  /** delete data from the table: "page_config_sections" */
  delete_page_config_sections?: Maybe<Page_Config_Sections_Mutation_Response>;
  /** delete single row from the table: "page_config_sections" */
  delete_page_config_sections_by_pk?: Maybe<Page_Config_Sections>;
  /** delete data from the table: "page_configs" */
  delete_page_configs?: Maybe<Page_Configs_Mutation_Response>;
  /** delete single row from the table: "page_configs" */
  delete_page_configs_by_pk?: Maybe<Page_Configs>;
  /** delete data from the table: "payment_methods" */
  delete_payment_methods?: Maybe<Payment_Methods_Mutation_Response>;
  /** delete single row from the table: "payment_methods" */
  delete_payment_methods_by_pk?: Maybe<Payment_Methods>;
  /** delete data from the table: "payout_items" */
  delete_payout_items?: Maybe<Payout_Items_Mutation_Response>;
  /** delete single row from the table: "payout_items" */
  delete_payout_items_by_pk?: Maybe<Payout_Items>;
  /** delete data from the table: "payout_methods" */
  delete_payout_methods?: Maybe<Payout_Methods_Mutation_Response>;
  /** delete single row from the table: "payout_methods" */
  delete_payout_methods_by_pk?: Maybe<Payout_Methods>;
  /** delete data from the table: "phone_numbers" */
  delete_phone_numbers?: Maybe<Phone_Numbers_Mutation_Response>;
  /** delete single row from the table: "phone_numbers" */
  delete_phone_numbers_by_pk?: Maybe<Phone_Numbers>;
  /** delete data from the table: "product_file_owners" */
  delete_product_file_owners?: Maybe<Product_File_Owners_Mutation_Response>;
  /** delete single row from the table: "product_file_owners" */
  delete_product_file_owners_by_pk?: Maybe<Product_File_Owners>;
  /** delete data from the table: "product_files" */
  delete_product_files?: Maybe<Product_Files_Mutation_Response>;
  /** delete single row from the table: "product_files" */
  delete_product_files_by_pk?: Maybe<Product_Files>;
  /** delete data from the table: "product_preview_items" */
  delete_product_preview_items?: Maybe<Product_Preview_Items_Mutation_Response>;
  /** delete single row from the table: "product_preview_items" */
  delete_product_preview_items_by_pk?: Maybe<Product_Preview_Items>;
  /** delete data from the table: "product_snapshots" */
  delete_product_snapshots?: Maybe<Product_Snapshots_Mutation_Response>;
  /** delete single row from the table: "product_snapshots" */
  delete_product_snapshots_by_pk?: Maybe<Product_Snapshots>;
  /** delete data from the table: "product_variants" */
  delete_product_variants?: Maybe<Product_Variants_Mutation_Response>;
  /** delete single row from the table: "product_variants" */
  delete_product_variants_by_pk?: Maybe<Product_Variants>;
  /** delete data from the table: "products" */
  delete_products?: Maybe<Products_Mutation_Response>;
  /** delete single row from the table: "products" */
  delete_products_by_pk?: Maybe<Products>;
  /** delete data from the table: "promoted_lists" */
  delete_promoted_lists?: Maybe<Promoted_Lists_Mutation_Response>;
  /** delete single row from the table: "promoted_lists" */
  delete_promoted_lists_by_pk?: Maybe<Promoted_Lists>;
  /** delete data from the table: "promoted_slots" */
  delete_promoted_slots?: Maybe<Promoted_Slots_Mutation_Response>;
  /** delete single row from the table: "promoted_slots" */
  delete_promoted_slots_by_pk?: Maybe<Promoted_Slots>;
  /** delete data from the table: "promotion_purchases" */
  delete_promotion_purchases?: Maybe<Promotion_Purchases_Mutation_Response>;
  /** delete single row from the table: "promotion_purchases" */
  delete_promotion_purchases_by_pk?: Maybe<Promotion_Purchases>;
  /** delete data from the table: "ratings" */
  delete_ratings?: Maybe<Ratings_Mutation_Response>;
  /** delete single row from the table: "ratings" */
  delete_ratings_by_pk?: Maybe<Ratings>;
  /** delete data from the table: "refunds" */
  delete_refunds?: Maybe<Refunds_Mutation_Response>;
  /** delete single row from the table: "refunds" */
  delete_refunds_by_pk?: Maybe<Refunds>;
  /** delete data from the table: "saved_search_hits" */
  delete_saved_search_hits?: Maybe<Saved_Search_Hits_Mutation_Response>;
  /** delete single row from the table: "saved_search_hits" */
  delete_saved_search_hits_by_pk?: Maybe<Saved_Search_Hits>;
  /** delete data from the table: "saved_searches" */
  delete_saved_searches?: Maybe<Saved_Searches_Mutation_Response>;
  /** delete single row from the table: "saved_searches" */
  delete_saved_searches_by_pk?: Maybe<Saved_Searches>;
  /** delete data from the table: "signup_emails" */
  delete_signup_emails?: Maybe<Signup_Emails_Mutation_Response>;
  /** delete single row from the table: "signup_emails" */
  delete_signup_emails_by_pk?: Maybe<Signup_Emails>;
  /** delete data from the table: "stores" */
  delete_stores?: Maybe<Stores_Mutation_Response>;
  /** delete single row from the table: "stores" */
  delete_stores_by_pk?: Maybe<Stores>;
  /** delete data from the table: "transactions" */
  delete_transactions?: Maybe<Transactions_Mutation_Response>;
  /** delete single row from the table: "transactions" */
  delete_transactions_by_pk?: Maybe<Transactions>;
  /** delete data from the table: "unique_product_views" */
  delete_unique_product_views?: Maybe<Unique_Product_Views_Mutation_Response>;
  /** delete single row from the table: "unique_product_views" */
  delete_unique_product_views_by_pk?: Maybe<Unique_Product_Views>;
  /** delete data from the table: "user_licenses" */
  delete_user_licenses?: Maybe<User_Licenses_Mutation_Response>;
  /** delete single row from the table: "user_licenses" */
  delete_user_licenses_by_pk?: Maybe<User_Licenses>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "bids" */
  insert_bids?: Maybe<Bids_Mutation_Response>;
  /** insert a single row into the table: "bids" */
  insert_bids_one?: Maybe<Bids>;
  /** insert data into the table: "calibers" */
  insert_calibers?: Maybe<Calibers_Mutation_Response>;
  /** insert a single row into the table: "calibers" */
  insert_calibers_one?: Maybe<Calibers>;
  /** insert data into the table: "categories" */
  insert_categories?: Maybe<Categories_Mutation_Response>;
  /** insert a single row into the table: "categories" */
  insert_categories_one?: Maybe<Categories>;
  /** insert data into the table: "chat_messages" */
  insert_chat_messages?: Maybe<Chat_Messages_Mutation_Response>;
  /** insert a single row into the table: "chat_messages" */
  insert_chat_messages_one?: Maybe<Chat_Messages>;
  /** insert data into the table: "chat_rooms" */
  insert_chat_rooms?: Maybe<Chat_Rooms_Mutation_Response>;
  /** insert a single row into the table: "chat_rooms" */
  insert_chat_rooms_one?: Maybe<Chat_Rooms>;
  /** insert data into the table: "chat_users" */
  insert_chat_users?: Maybe<Chat_Users_Mutation_Response>;
  /** insert a single row into the table: "chat_users" */
  insert_chat_users_one?: Maybe<Chat_Users>;
  /** insert data into the table: "classified_ad_purchases" */
  insert_classified_ad_purchases?: Maybe<Classified_Ad_Purchases_Mutation_Response>;
  /** insert a single row into the table: "classified_ad_purchases" */
  insert_classified_ad_purchases_one?: Maybe<Classified_Ad_Purchases>;
  /** insert data into the table: "collection_items" */
  insert_collection_items?: Maybe<Collection_Items_Mutation_Response>;
  /** insert a single row into the table: "collection_items" */
  insert_collection_items_one?: Maybe<Collection_Items>;
  /** insert data into the table: "collections" */
  insert_collections?: Maybe<Collections_Mutation_Response>;
  /** insert a single row into the table: "collections" */
  insert_collections_one?: Maybe<Collections>;
  /** insert data into the table: "dealers" */
  insert_dealers?: Maybe<Dealers_Mutation_Response>;
  /** insert a single row into the table: "dealers" */
  insert_dealers_one?: Maybe<Dealers>;
  /** insert data into the table: "email_subscriptions" */
  insert_email_subscriptions?: Maybe<Email_Subscriptions_Mutation_Response>;
  /** insert a single row into the table: "email_subscriptions" */
  insert_email_subscriptions_one?: Maybe<Email_Subscriptions>;
  /** insert data into the table: "emails" */
  insert_emails?: Maybe<Emails_Mutation_Response>;
  /** insert a single row into the table: "emails" */
  insert_emails_one?: Maybe<Emails>;
  /** insert data into the table: "external_product_snapshots" */
  insert_external_product_snapshots?: Maybe<External_Product_Snapshots_Mutation_Response>;
  /** insert a single row into the table: "external_product_snapshots" */
  insert_external_product_snapshots_one?: Maybe<External_Product_Snapshots>;
  /** insert data into the table: "external_products" */
  insert_external_products?: Maybe<External_Products_Mutation_Response>;
  /** insert a single row into the table: "external_products" */
  insert_external_products_one?: Maybe<External_Products>;
  /** insert data into the table: "image_owners" */
  insert_image_owners?: Maybe<Image_Owners_Mutation_Response>;
  /** insert a single row into the table: "image_owners" */
  insert_image_owners_one?: Maybe<Image_Owners>;
  /** insert data into the table: "image_parents" */
  insert_image_parents?: Maybe<Image_Parents_Mutation_Response>;
  /** insert a single row into the table: "image_parents" */
  insert_image_parents_one?: Maybe<Image_Parents>;
  /** insert data into the table: "image_variants" */
  insert_image_variants?: Maybe<Image_Variants_Mutation_Response>;
  /** insert a single row into the table: "image_variants" */
  insert_image_variants_one?: Maybe<Image_Variants>;
  /** insert data into the table: "migrations" */
  insert_migrations?: Maybe<Migrations_Mutation_Response>;
  /** insert a single row into the table: "migrations" */
  insert_migrations_one?: Maybe<Migrations>;
  /** insert data into the table: "news_item_votes" */
  insert_news_item_votes?: Maybe<News_Item_Votes_Mutation_Response>;
  /** insert a single row into the table: "news_item_votes" */
  insert_news_item_votes_one?: Maybe<News_Item_Votes>;
  /** insert data into the table: "news_items" */
  insert_news_items?: Maybe<News_Items_Mutation_Response>;
  /** insert a single row into the table: "news_items" */
  insert_news_items_one?: Maybe<News_Items>;
  /** insert data into the table: "order_snapshots" */
  insert_order_snapshots?: Maybe<Order_Snapshots_Mutation_Response>;
  /** insert a single row into the table: "order_snapshots" */
  insert_order_snapshots_one?: Maybe<Order_Snapshots>;
  /** insert data into the table: "orders" */
  insert_orders?: Maybe<Orders_Mutation_Response>;
  /** insert a single row into the table: "orders" */
  insert_orders_one?: Maybe<Orders>;
  /** insert data into the table: "page_config_sections" */
  insert_page_config_sections?: Maybe<Page_Config_Sections_Mutation_Response>;
  /** insert a single row into the table: "page_config_sections" */
  insert_page_config_sections_one?: Maybe<Page_Config_Sections>;
  /** insert data into the table: "page_configs" */
  insert_page_configs?: Maybe<Page_Configs_Mutation_Response>;
  /** insert a single row into the table: "page_configs" */
  insert_page_configs_one?: Maybe<Page_Configs>;
  /** insert data into the table: "payment_methods" */
  insert_payment_methods?: Maybe<Payment_Methods_Mutation_Response>;
  /** insert a single row into the table: "payment_methods" */
  insert_payment_methods_one?: Maybe<Payment_Methods>;
  /** insert data into the table: "payout_items" */
  insert_payout_items?: Maybe<Payout_Items_Mutation_Response>;
  /** insert a single row into the table: "payout_items" */
  insert_payout_items_one?: Maybe<Payout_Items>;
  /** insert data into the table: "payout_methods" */
  insert_payout_methods?: Maybe<Payout_Methods_Mutation_Response>;
  /** insert a single row into the table: "payout_methods" */
  insert_payout_methods_one?: Maybe<Payout_Methods>;
  /** insert data into the table: "phone_numbers" */
  insert_phone_numbers?: Maybe<Phone_Numbers_Mutation_Response>;
  /** insert a single row into the table: "phone_numbers" */
  insert_phone_numbers_one?: Maybe<Phone_Numbers>;
  /** insert data into the table: "product_file_owners" */
  insert_product_file_owners?: Maybe<Product_File_Owners_Mutation_Response>;
  /** insert a single row into the table: "product_file_owners" */
  insert_product_file_owners_one?: Maybe<Product_File_Owners>;
  /** insert data into the table: "product_files" */
  insert_product_files?: Maybe<Product_Files_Mutation_Response>;
  /** insert a single row into the table: "product_files" */
  insert_product_files_one?: Maybe<Product_Files>;
  /** insert data into the table: "product_preview_items" */
  insert_product_preview_items?: Maybe<Product_Preview_Items_Mutation_Response>;
  /** insert a single row into the table: "product_preview_items" */
  insert_product_preview_items_one?: Maybe<Product_Preview_Items>;
  /** insert data into the table: "product_snapshots" */
  insert_product_snapshots?: Maybe<Product_Snapshots_Mutation_Response>;
  /** insert a single row into the table: "product_snapshots" */
  insert_product_snapshots_one?: Maybe<Product_Snapshots>;
  /** insert data into the table: "product_variants" */
  insert_product_variants?: Maybe<Product_Variants_Mutation_Response>;
  /** insert a single row into the table: "product_variants" */
  insert_product_variants_one?: Maybe<Product_Variants>;
  /** insert data into the table: "products" */
  insert_products?: Maybe<Products_Mutation_Response>;
  /** insert a single row into the table: "products" */
  insert_products_one?: Maybe<Products>;
  /** insert data into the table: "promoted_lists" */
  insert_promoted_lists?: Maybe<Promoted_Lists_Mutation_Response>;
  /** insert a single row into the table: "promoted_lists" */
  insert_promoted_lists_one?: Maybe<Promoted_Lists>;
  /** insert data into the table: "promoted_slots" */
  insert_promoted_slots?: Maybe<Promoted_Slots_Mutation_Response>;
  /** insert a single row into the table: "promoted_slots" */
  insert_promoted_slots_one?: Maybe<Promoted_Slots>;
  /** insert data into the table: "promotion_purchases" */
  insert_promotion_purchases?: Maybe<Promotion_Purchases_Mutation_Response>;
  /** insert a single row into the table: "promotion_purchases" */
  insert_promotion_purchases_one?: Maybe<Promotion_Purchases>;
  /** insert data into the table: "ratings" */
  insert_ratings?: Maybe<Ratings_Mutation_Response>;
  /** insert a single row into the table: "ratings" */
  insert_ratings_one?: Maybe<Ratings>;
  /** insert data into the table: "refunds" */
  insert_refunds?: Maybe<Refunds_Mutation_Response>;
  /** insert a single row into the table: "refunds" */
  insert_refunds_one?: Maybe<Refunds>;
  /** insert data into the table: "saved_search_hits" */
  insert_saved_search_hits?: Maybe<Saved_Search_Hits_Mutation_Response>;
  /** insert a single row into the table: "saved_search_hits" */
  insert_saved_search_hits_one?: Maybe<Saved_Search_Hits>;
  /** insert data into the table: "saved_searches" */
  insert_saved_searches?: Maybe<Saved_Searches_Mutation_Response>;
  /** insert a single row into the table: "saved_searches" */
  insert_saved_searches_one?: Maybe<Saved_Searches>;
  /** insert data into the table: "signup_emails" */
  insert_signup_emails?: Maybe<Signup_Emails_Mutation_Response>;
  /** insert a single row into the table: "signup_emails" */
  insert_signup_emails_one?: Maybe<Signup_Emails>;
  /** insert data into the table: "stores" */
  insert_stores?: Maybe<Stores_Mutation_Response>;
  /** insert a single row into the table: "stores" */
  insert_stores_one?: Maybe<Stores>;
  /** insert data into the table: "transactions" */
  insert_transactions?: Maybe<Transactions_Mutation_Response>;
  /** insert a single row into the table: "transactions" */
  insert_transactions_one?: Maybe<Transactions>;
  /** insert data into the table: "unique_product_views" */
  insert_unique_product_views?: Maybe<Unique_Product_Views_Mutation_Response>;
  /** insert a single row into the table: "unique_product_views" */
  insert_unique_product_views_one?: Maybe<Unique_Product_Views>;
  /** insert data into the table: "user_licenses" */
  insert_user_licenses?: Maybe<User_Licenses_Mutation_Response>;
  /** insert a single row into the table: "user_licenses" */
  insert_user_licenses_one?: Maybe<User_Licenses>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "bids" */
  update_bids?: Maybe<Bids_Mutation_Response>;
  /** update single row of the table: "bids" */
  update_bids_by_pk?: Maybe<Bids>;
  /** update data of the table: "calibers" */
  update_calibers?: Maybe<Calibers_Mutation_Response>;
  /** update single row of the table: "calibers" */
  update_calibers_by_pk?: Maybe<Calibers>;
  /** update data of the table: "categories" */
  update_categories?: Maybe<Categories_Mutation_Response>;
  /** update single row of the table: "categories" */
  update_categories_by_pk?: Maybe<Categories>;
  /** update data of the table: "chat_messages" */
  update_chat_messages?: Maybe<Chat_Messages_Mutation_Response>;
  /** update single row of the table: "chat_messages" */
  update_chat_messages_by_pk?: Maybe<Chat_Messages>;
  /** update data of the table: "chat_rooms" */
  update_chat_rooms?: Maybe<Chat_Rooms_Mutation_Response>;
  /** update single row of the table: "chat_rooms" */
  update_chat_rooms_by_pk?: Maybe<Chat_Rooms>;
  /** update data of the table: "chat_users" */
  update_chat_users?: Maybe<Chat_Users_Mutation_Response>;
  /** update single row of the table: "chat_users" */
  update_chat_users_by_pk?: Maybe<Chat_Users>;
  /** update data of the table: "classified_ad_purchases" */
  update_classified_ad_purchases?: Maybe<Classified_Ad_Purchases_Mutation_Response>;
  /** update single row of the table: "classified_ad_purchases" */
  update_classified_ad_purchases_by_pk?: Maybe<Classified_Ad_Purchases>;
  /** update data of the table: "collection_items" */
  update_collection_items?: Maybe<Collection_Items_Mutation_Response>;
  /** update single row of the table: "collection_items" */
  update_collection_items_by_pk?: Maybe<Collection_Items>;
  /** update data of the table: "collections" */
  update_collections?: Maybe<Collections_Mutation_Response>;
  /** update single row of the table: "collections" */
  update_collections_by_pk?: Maybe<Collections>;
  /** update data of the table: "dealers" */
  update_dealers?: Maybe<Dealers_Mutation_Response>;
  /** update single row of the table: "dealers" */
  update_dealers_by_pk?: Maybe<Dealers>;
  /** update data of the table: "email_subscriptions" */
  update_email_subscriptions?: Maybe<Email_Subscriptions_Mutation_Response>;
  /** update single row of the table: "email_subscriptions" */
  update_email_subscriptions_by_pk?: Maybe<Email_Subscriptions>;
  /** update data of the table: "emails" */
  update_emails?: Maybe<Emails_Mutation_Response>;
  /** update single row of the table: "emails" */
  update_emails_by_pk?: Maybe<Emails>;
  /** update data of the table: "external_product_snapshots" */
  update_external_product_snapshots?: Maybe<External_Product_Snapshots_Mutation_Response>;
  /** update single row of the table: "external_product_snapshots" */
  update_external_product_snapshots_by_pk?: Maybe<External_Product_Snapshots>;
  /** update data of the table: "external_products" */
  update_external_products?: Maybe<External_Products_Mutation_Response>;
  /** update single row of the table: "external_products" */
  update_external_products_by_pk?: Maybe<External_Products>;
  /** update data of the table: "image_owners" */
  update_image_owners?: Maybe<Image_Owners_Mutation_Response>;
  /** update single row of the table: "image_owners" */
  update_image_owners_by_pk?: Maybe<Image_Owners>;
  /** update data of the table: "image_parents" */
  update_image_parents?: Maybe<Image_Parents_Mutation_Response>;
  /** update single row of the table: "image_parents" */
  update_image_parents_by_pk?: Maybe<Image_Parents>;
  /** update data of the table: "image_variants" */
  update_image_variants?: Maybe<Image_Variants_Mutation_Response>;
  /** update single row of the table: "image_variants" */
  update_image_variants_by_pk?: Maybe<Image_Variants>;
  /** update data of the table: "migrations" */
  update_migrations?: Maybe<Migrations_Mutation_Response>;
  /** update single row of the table: "migrations" */
  update_migrations_by_pk?: Maybe<Migrations>;
  /** update data of the table: "news_item_votes" */
  update_news_item_votes?: Maybe<News_Item_Votes_Mutation_Response>;
  /** update single row of the table: "news_item_votes" */
  update_news_item_votes_by_pk?: Maybe<News_Item_Votes>;
  /** update data of the table: "news_items" */
  update_news_items?: Maybe<News_Items_Mutation_Response>;
  /** update single row of the table: "news_items" */
  update_news_items_by_pk?: Maybe<News_Items>;
  /** update data of the table: "order_snapshots" */
  update_order_snapshots?: Maybe<Order_Snapshots_Mutation_Response>;
  /** update single row of the table: "order_snapshots" */
  update_order_snapshots_by_pk?: Maybe<Order_Snapshots>;
  /** update data of the table: "orders" */
  update_orders?: Maybe<Orders_Mutation_Response>;
  /** update single row of the table: "orders" */
  update_orders_by_pk?: Maybe<Orders>;
  /** update data of the table: "page_config_sections" */
  update_page_config_sections?: Maybe<Page_Config_Sections_Mutation_Response>;
  /** update single row of the table: "page_config_sections" */
  update_page_config_sections_by_pk?: Maybe<Page_Config_Sections>;
  /** update data of the table: "page_configs" */
  update_page_configs?: Maybe<Page_Configs_Mutation_Response>;
  /** update single row of the table: "page_configs" */
  update_page_configs_by_pk?: Maybe<Page_Configs>;
  /** update data of the table: "payment_methods" */
  update_payment_methods?: Maybe<Payment_Methods_Mutation_Response>;
  /** update single row of the table: "payment_methods" */
  update_payment_methods_by_pk?: Maybe<Payment_Methods>;
  /** update data of the table: "payout_items" */
  update_payout_items?: Maybe<Payout_Items_Mutation_Response>;
  /** update single row of the table: "payout_items" */
  update_payout_items_by_pk?: Maybe<Payout_Items>;
  /** update data of the table: "payout_methods" */
  update_payout_methods?: Maybe<Payout_Methods_Mutation_Response>;
  /** update single row of the table: "payout_methods" */
  update_payout_methods_by_pk?: Maybe<Payout_Methods>;
  /** update data of the table: "phone_numbers" */
  update_phone_numbers?: Maybe<Phone_Numbers_Mutation_Response>;
  /** update single row of the table: "phone_numbers" */
  update_phone_numbers_by_pk?: Maybe<Phone_Numbers>;
  /** update data of the table: "product_file_owners" */
  update_product_file_owners?: Maybe<Product_File_Owners_Mutation_Response>;
  /** update single row of the table: "product_file_owners" */
  update_product_file_owners_by_pk?: Maybe<Product_File_Owners>;
  /** update data of the table: "product_files" */
  update_product_files?: Maybe<Product_Files_Mutation_Response>;
  /** update single row of the table: "product_files" */
  update_product_files_by_pk?: Maybe<Product_Files>;
  /** update data of the table: "product_preview_items" */
  update_product_preview_items?: Maybe<Product_Preview_Items_Mutation_Response>;
  /** update single row of the table: "product_preview_items" */
  update_product_preview_items_by_pk?: Maybe<Product_Preview_Items>;
  /** update data of the table: "product_snapshots" */
  update_product_snapshots?: Maybe<Product_Snapshots_Mutation_Response>;
  /** update single row of the table: "product_snapshots" */
  update_product_snapshots_by_pk?: Maybe<Product_Snapshots>;
  /** update data of the table: "product_variants" */
  update_product_variants?: Maybe<Product_Variants_Mutation_Response>;
  /** update single row of the table: "product_variants" */
  update_product_variants_by_pk?: Maybe<Product_Variants>;
  /** update data of the table: "products" */
  update_products?: Maybe<Products_Mutation_Response>;
  /** update single row of the table: "products" */
  update_products_by_pk?: Maybe<Products>;
  /** update data of the table: "promoted_lists" */
  update_promoted_lists?: Maybe<Promoted_Lists_Mutation_Response>;
  /** update single row of the table: "promoted_lists" */
  update_promoted_lists_by_pk?: Maybe<Promoted_Lists>;
  /** update data of the table: "promoted_slots" */
  update_promoted_slots?: Maybe<Promoted_Slots_Mutation_Response>;
  /** update single row of the table: "promoted_slots" */
  update_promoted_slots_by_pk?: Maybe<Promoted_Slots>;
  /** update data of the table: "promotion_purchases" */
  update_promotion_purchases?: Maybe<Promotion_Purchases_Mutation_Response>;
  /** update single row of the table: "promotion_purchases" */
  update_promotion_purchases_by_pk?: Maybe<Promotion_Purchases>;
  /** update data of the table: "ratings" */
  update_ratings?: Maybe<Ratings_Mutation_Response>;
  /** update single row of the table: "ratings" */
  update_ratings_by_pk?: Maybe<Ratings>;
  /** update data of the table: "refunds" */
  update_refunds?: Maybe<Refunds_Mutation_Response>;
  /** update single row of the table: "refunds" */
  update_refunds_by_pk?: Maybe<Refunds>;
  /** update data of the table: "saved_search_hits" */
  update_saved_search_hits?: Maybe<Saved_Search_Hits_Mutation_Response>;
  /** update single row of the table: "saved_search_hits" */
  update_saved_search_hits_by_pk?: Maybe<Saved_Search_Hits>;
  /** update data of the table: "saved_searches" */
  update_saved_searches?: Maybe<Saved_Searches_Mutation_Response>;
  /** update single row of the table: "saved_searches" */
  update_saved_searches_by_pk?: Maybe<Saved_Searches>;
  /** update data of the table: "signup_emails" */
  update_signup_emails?: Maybe<Signup_Emails_Mutation_Response>;
  /** update single row of the table: "signup_emails" */
  update_signup_emails_by_pk?: Maybe<Signup_Emails>;
  /** update data of the table: "stores" */
  update_stores?: Maybe<Stores_Mutation_Response>;
  /** update single row of the table: "stores" */
  update_stores_by_pk?: Maybe<Stores>;
  /** update data of the table: "transactions" */
  update_transactions?: Maybe<Transactions_Mutation_Response>;
  /** update single row of the table: "transactions" */
  update_transactions_by_pk?: Maybe<Transactions>;
  /** update data of the table: "unique_product_views" */
  update_unique_product_views?: Maybe<Unique_Product_Views_Mutation_Response>;
  /** update single row of the table: "unique_product_views" */
  update_unique_product_views_by_pk?: Maybe<Unique_Product_Views>;
  /** update data of the table: "user_licenses" */
  update_user_licenses?: Maybe<User_Licenses_Mutation_Response>;
  /** update single row of the table: "user_licenses" */
  update_user_licenses_by_pk?: Maybe<User_Licenses>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  signUpUsingEmail: SignUpMutationResponse;
  logInUsingEmail: LoginMutationResponse;
  signUpAndClaimItem: ClaimItemMutationResponse;
  logInAndClaimItem: ClaimItemMutationResponse;
  /**
   * Log out and invalidate access tokens.
   * AccessRule – LOGGED_IN
   */
  logOut: BlankMutationResponse;
  /**
   * Send a password reset email.
   * AccessRule – PUBLIC
   */
  sendResetPasswordEmail: SendResetPasswordResponse;
  /**
   * Confirm password reset after receiving email
   * AccessRule – PUBLIC
   */
  confirmResetPassword: ResetPasswordResponse;
  /**
   * Change your password.
   * AccessRule – LOGGED_IN
   */
  changePassword: UserMutationResponse;
  /**
   * Change your payout method.
   * AccessRule – LOGGED_IN
   */
  setPayoutMethod: UserMutationResponse;
  /**
   * Edit user profile information.
   * AccessRule – LOGGED_IN
   */
  editUserProfile: UserMutationResponse;
  verifyEmail: UserMutationResponse;
  addUserLicense: UserMutationResponse;
  editUserLicense: UserMutationResponse;
  deleteUserLicense: UserMutationResponse;
  setDefaultLicenseId: UserMutationResponse;
  adminApproveUserLicense: UserMutationResponse;
  /**
   * Delete the account associated with the logged-in user.
   *
   * AccessRule – LOGGED_IN
   */
  deleteAccount: BlankMutationResponse;
  /**
   * Delete a specific user account.
   *
   * AccessRule – PLATFORM_ADMIN
   */
  adminDeleteAccount: BlankMutationResponse;
  /**
   * Upload to google bucket using signed urls
   * 1. Register the upload and return the upload ID and PUT URL to the frontend
   * 2. Frontend uses the PUT URL to upload the file directly
   * 3. Front then uses uploadSave to save info to DB. The uploaded file will be validated.
   */
  uploadRegisterGoogleUrl: UploadRegisterMutationResponse;
  /** Request to save an uploaded image / make it official. */
  uploadSaveImage: UploadSaveImageMutationResponse;
  uploadSaveFile: UploadSaveFileMutationResponse;
  /**
   * Follow a store.
   *
   * AccessRule – LOGGED_IN
   */
  followStore: FollowingStoresConnection;
  /**
   * Unfollow a store
   *
   * AccessRule – LOGGED_IN
   */
  unfollowStore: FollowingStoresConnection;
  createCollection: Collection;
  deleteCollection: Collection;
  editCollection: Collection;
  /**
   * Add a product to the collection.
   * AccessRule – LOGGED_IN
   */
  addProductToCollection: CollectionItemMutationResponse;
  /**
   * Remove a product from the collection.
   * AccessRule – LOGGED_IN
   */
  removeProductFromCollection: CollectionItemMutationResponse;
  /**
   * Create the store profile for the logged-in user.
   *
   * AccessRule – LOGGED_IN
   */
  createStore?: Maybe<StoreMutationResponse>;
  /**
   * Edit the store profile for the logged-in user.
   *
   * AccessRule – LOGGED_IN
   */
  editStoreProfile?: Maybe<StoreMutationResponse>;
  /**
   * Delete the store associated with the logged-in user.
   *
   * AccessRule – LOGGED_IN
   */
  deleteStore: StoreMutationResponse;
  /**
   * Delete a specific store.
   *
   * AccessRule – PLATFORM_ADMIN
   */
  adminDeleteStore: StoreMutationResponse;
  /**
   * Create a product for the logged-in user's store.
   *
   * AccessRule – LOGGED_IN
   */
  createProduct: ProductListingMutationResponse;
  /**
   * Create a product for the logged-in user's store.
   *
   * If a platform admin has suspended the product, changing isPublished will not be able to override that.
   *
   * AccessRule – LOGGED_IN
   */
  editProduct: ProductMutationResponse;
  publishProduct: ProductMutationResponse;
  unpublishProduct: ProductMutationResponse;
  /**
   * Delete a product from the logged-in user's store.
   *
   * AccessRule – OWNER
   */
  deleteProduct?: Maybe<ProductMutationResponse>;
  /**
   * Delete a specific product.
   *
   * AccessRule – PLATFORM_ADMIN
   */
  adminDeleteProduct?: Maybe<ProductMutationResponse>;
  /**
   * Suspend a user account.
   * This will have a number of side effects:
   * - User will be logged out
   * - User will be unable to log back in
   *
   * AccessRule – PLATFORM_ADMIN
   */
  suspendUser: BlankMutationResponse;
  /**
   * Reinstate a suspended user's account.
   * This will reverse the number of side effects of suspension.
   *
   * AccessRule – PLATFORM_ADMIN
   */
  unsuspendUser: BlankMutationResponse;
  /**
   * Suspend a product.
   * This will force the product to become unavailable for purchase or downloading.
   *
   * AccessRule – PLATFORM_ADMIN
   */
  suspendUnsuspendProduct?: Maybe<ProductMutationResponse>;
  /**
   * Exclude a product from any search results.
   * The only way to find the product will be through direct link, or
   * having it show up in an automatic or promoted list.
   *
   * AccessRule – PLATFORM_ADMIN
   */
  excludeProductFromSearch?: Maybe<ProductMutationResponse>;
  /**
   * Re-include a product that was being excluded from search results.
   *
   * AccessRule – PLATFORM_ADMIN
   */
  includeProductInSearch?: Maybe<ProductMutationResponse>;
  /**
   * Suspend a store.
   * This will force the store and its products to become hidden for everyone except the store owner.
   *
   * AccessRule – PLATFORM_ADMIN
   */
  suspendUnsuspendStore?: Maybe<StoreMutationResponse>;
  /**
   * Set the default payment method for a user (credit cards)
   *
   * AccessRule – LOGGED_IN
   */
  setDefaultPaymentMethod: AddRemovePaymentMethodResponse;
  /**
   * Add a payment method to a user's profile
   *
   * AccessRule – LOGGED_IN
   */
  addPaymentMethod: AddRemovePaymentMethodResponse;
  /**
   * Remove a payment method from a user's profile
   *
   * AccessRule – LOGGED_IN
   */
  removePaymentMethod: AddRemovePaymentMethodResponse;
  /**
   * Create a PayoutSplit for a seller
   *
   * AccessRule – PLATFORM_ADMIN
   */
  createPayoutSplit: PayoutSplit;
  initiatePageConfig?: Maybe<PageConfig>;
  initiateCategories: Array<Categories>;
  initiateCalibers: Array<Calibers>;
  /** Create a new promoted list, or replace existing one if promoted_list_id clashes */
  insertOrReplacePromotedList: PromotedListMutationResponse;
  /**
   * Delete a promoted list.
   *
   * AccessRule – PLATFORM_ADMIN
   */
  deletePromotedList: BlankMutationResponse;
  /**
   * Add a product to a promoted list.
   * AccessRule – PLATFORM_ADMIN
   */
  addProductToPromotedList: PromotedSlotMutationResponse;
  /**
   * Remove an item in a promoted list.
   * AccessRule – PLATFORM_ADMIN
   */
  removeProductFromPromotedList: PromotedListMutationResponse;
  editPromotedSlot?: Maybe<PromotedSlot>;
  /**
   * AccessRule – LOGGED_IN
   * For a buyer to purchase a promotion slot
   */
  purchasePromotion: PromotionPurchaseMutationResponse;
  /**
   * AccessRule – LOGGED_IN
   * For a buyer to create a payment authorizeation before confirming an order
   */
  authorizePayment: AuthorizePaymentMutationResponse;
  /**
   * AccessRule – LOGGED_IN
   * For a buyer to create an order after authorizing a payment
   */
  confirmOrder: OrderConfirmMutationResponse;
  cancelPaymentIntentFailure?: Maybe<BlankMutationResponse>;
  /**
   * AccessRule – LOGGED_IN
   * For admins to capture payment after order is created
   */
  capturePaymentForOrder: OrderMutationResponse;
  /**
   * AccessRule – LOGGED_IN
   * For a seller to upload form 10 after disposing gun
   */
  addForm10: OrderMutationResponse;
  /**
   * AccessRule – LOGGED_IN
   * For a seller to remove a file which they accidentally uploaded as form 10
   */
  removeForm10: OrderMutationResponse;
  /**
   * AccessRule – ADMIN
   * For admins to approve a form10
   */
  approveForm10: OrderMutationResponse;
  /**
   * AccessRule – ADMIN
   * For admins to revert approval of a form10
   */
  unapproveForm10: OrderMutationResponse;
  /**
   * AccessRule – ADMIN
   * For admins to reject a form10 and alert seller to resubmit the form 10
   */
  reviseAndResubmitForm10: OrderMutationResponse;
  /**
   * AccessRule – LOGGED_IN
   * For Admins to confirm and attach Westpac Payout IDs to orders
   * After funds have been transferred to sellers
   */
  markPayoutsAsPaid: MarkPayoutsAsPaidMutationResponse;
  /** AccessRule – PLATFORM_ADMIN */
  cancelOrderAndPayment: OrderMutationResponse;
  createMockPreviewItems: Product_Preview_Items_Mutation_Response;
  sendWelcomeEmail: BlankMutationResponse;
  sendTestPasswordChangedEmail: BlankMutationResponse;
  sendPayoutDetailsChangedEmail: BlankMutationResponse;
  sendConfirmedPaymentBuyerEmail: BlankMutationResponse;
  sendConfirmedPaymentSellerEmail: BlankMutationResponse;
  sendConfirmedPaymentAdminEmail: BlankMutationResponse;
  sendConfirmedPaymentDealerEmail: BlankMutationResponse;
  sendRefundedBuyerEmail: BlankMutationResponse;
  sendRefundedSellerEmail: BlankMutationResponse;
  sendRefundedAdminEmail: BlankMutationResponse;
  sendForm10ReviseAndResubmitSellerEmail: BlankMutationResponse;
  sendForm10SubmittedAdminEmail: BlankMutationResponse;
  sendForm10ApprovedBuyerEmail: BlankMutationResponse;
  sendForm10ApprovedSellerEmail: BlankMutationResponse;
  sendPayoutCompleteSellerEmail: BlankMutationResponse;
  sendReviewRepublishOrRemoveSellerEmail: BlankMutationResponse;
  editDealer?: Maybe<UserMutationResponse>;
  editDealerAsAdmin?: Maybe<Dealer>;
  createNewDealer?: Maybe<DealerMutationResponse>;
  createDealerForUser?: Maybe<UserMutationResponse>;
  setDealerIdForUser?: Maybe<UserMutationResponse>;
  unlinkUsersForDealerId?: Maybe<DealerMutationResponse>;
  deleteDealerAsAdmin?: Maybe<DealerMutationResponse>;
  reindexSearchIndex?: Maybe<BlankMutationResponse>;
  sendChatMessage?: Maybe<Array<Maybe<Message>>>;
  emitTypingEvent?: Maybe<BlankMutationResponse>;
  sendBidMessage?: Maybe<Array<Maybe<Message>>>;
  updateBid?: Maybe<Array<Maybe<Bid>>>;
  updateChatStatus?: Maybe<Conversation>;
  createInitialBid?: Maybe<ChatRoom>;
  saySomething?: Maybe<Scalars['String']>;
  signupToWaitlist?: Maybe<Signup_Emails>;
  insertUniqueProductView?: Maybe<Unique_Product_Views>;
  insertSavedSearch?: Maybe<Saved_Searches>;
  deleteSavedSearch?: Maybe<Saved_Searches>;
  markSavedSearchHitsAsSeen: Array<SavedSearchHit>;
  createNewsItemWithExternalProduct: NewsItem;
  markExternalProductAsSold: NewsItem;
  editExternalProduct: NewsItem;
  suspendUnsuspendNewsItem: NewsItem;
  upvoteNewsItem: NewsItem;
  downvoteNewsItem: NewsItem;
  unvoteNewsItem: NewsItem;
  rescrapeExternalProduct: AggregatorScrapeResponse;
  setNewsItemCategory: NewsItem;
  reindexProductOrNewsItem?: Maybe<BlankMutationResponse>;
  generateClaimProductRefId?: Maybe<ClaimProductLink>;
  swapImagesForExternalProduct?: Maybe<NewsItem>;
  markProductSold?: Maybe<ProductMutationResponse>;
};


export type MutationDelete_BidsArgs = {
  where: Bids_Bool_Exp;
};


export type MutationDelete_Bids_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_CalibersArgs = {
  where: Calibers_Bool_Exp;
};


export type MutationDelete_Calibers_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_CategoriesArgs = {
  where: Categories_Bool_Exp;
};


export type MutationDelete_Categories_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Chat_MessagesArgs = {
  where: Chat_Messages_Bool_Exp;
};


export type MutationDelete_Chat_Messages_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Chat_RoomsArgs = {
  where: Chat_Rooms_Bool_Exp;
};


export type MutationDelete_Chat_Rooms_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Chat_UsersArgs = {
  where: Chat_Users_Bool_Exp;
};


export type MutationDelete_Chat_Users_By_PkArgs = {
  chatRoomId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationDelete_Classified_Ad_PurchasesArgs = {
  where: Classified_Ad_Purchases_Bool_Exp;
};


export type MutationDelete_Classified_Ad_Purchases_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Collection_ItemsArgs = {
  where: Collection_Items_Bool_Exp;
};


export type MutationDelete_Collection_Items_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_CollectionsArgs = {
  where: Collections_Bool_Exp;
};


export type MutationDelete_Collections_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_DealersArgs = {
  where: Dealers_Bool_Exp;
};


export type MutationDelete_Dealers_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Email_SubscriptionsArgs = {
  where: Email_Subscriptions_Bool_Exp;
};


export type MutationDelete_Email_Subscriptions_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_EmailsArgs = {
  where: Emails_Bool_Exp;
};


export type MutationDelete_Emails_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_External_Product_SnapshotsArgs = {
  where: External_Product_Snapshots_Bool_Exp;
};


export type MutationDelete_External_Product_Snapshots_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_External_ProductsArgs = {
  where: External_Products_Bool_Exp;
};


export type MutationDelete_External_Products_By_PkArgs = {
  sourceSite: Scalars['String'];
  sourceSiteId: Scalars['String'];
};


export type MutationDelete_Image_OwnersArgs = {
  where: Image_Owners_Bool_Exp;
};


export type MutationDelete_Image_Owners_By_PkArgs = {
  imageId: Scalars['String'];
};


export type MutationDelete_Image_ParentsArgs = {
  where: Image_Parents_Bool_Exp;
};


export type MutationDelete_Image_Parents_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Image_VariantsArgs = {
  where: Image_Variants_Bool_Exp;
};


export type MutationDelete_Image_Variants_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_MigrationsArgs = {
  where: Migrations_Bool_Exp;
};


export type MutationDelete_Migrations_By_PkArgs = {
  id: Scalars['Int'];
};


export type MutationDelete_News_Item_VotesArgs = {
  where: News_Item_Votes_Bool_Exp;
};


export type MutationDelete_News_Item_Votes_By_PkArgs = {
  newsItemId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationDelete_News_ItemsArgs = {
  where: News_Items_Bool_Exp;
};


export type MutationDelete_News_Items_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Order_SnapshotsArgs = {
  where: Order_Snapshots_Bool_Exp;
};


export type MutationDelete_Order_Snapshots_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_OrdersArgs = {
  where: Orders_Bool_Exp;
};


export type MutationDelete_Orders_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Page_Config_SectionsArgs = {
  where: Page_Config_Sections_Bool_Exp;
};


export type MutationDelete_Page_Config_Sections_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Page_ConfigsArgs = {
  where: Page_Configs_Bool_Exp;
};


export type MutationDelete_Page_Configs_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Payment_MethodsArgs = {
  where: Payment_Methods_Bool_Exp;
};


export type MutationDelete_Payment_Methods_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Payout_ItemsArgs = {
  where: Payout_Items_Bool_Exp;
};


export type MutationDelete_Payout_Items_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Payout_MethodsArgs = {
  where: Payout_Methods_Bool_Exp;
};


export type MutationDelete_Payout_Methods_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Phone_NumbersArgs = {
  where: Phone_Numbers_Bool_Exp;
};


export type MutationDelete_Phone_Numbers_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Product_File_OwnersArgs = {
  where: Product_File_Owners_Bool_Exp;
};


export type MutationDelete_Product_File_Owners_By_PkArgs = {
  fileId: Scalars['String'];
};


export type MutationDelete_Product_FilesArgs = {
  where: Product_Files_Bool_Exp;
};


export type MutationDelete_Product_Files_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Product_Preview_ItemsArgs = {
  where: Product_Preview_Items_Bool_Exp;
};


export type MutationDelete_Product_Preview_Items_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Product_SnapshotsArgs = {
  where: Product_Snapshots_Bool_Exp;
};


export type MutationDelete_Product_Snapshots_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Product_VariantsArgs = {
  where: Product_Variants_Bool_Exp;
};


export type MutationDelete_Product_Variants_By_PkArgs = {
  variantId: Scalars['String'];
};


export type MutationDelete_ProductsArgs = {
  where: Products_Bool_Exp;
};


export type MutationDelete_Products_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Promoted_ListsArgs = {
  where: Promoted_Lists_Bool_Exp;
};


export type MutationDelete_Promoted_Lists_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Promoted_SlotsArgs = {
  where: Promoted_Slots_Bool_Exp;
};


export type MutationDelete_Promoted_Slots_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Promotion_PurchasesArgs = {
  where: Promotion_Purchases_Bool_Exp;
};


export type MutationDelete_Promotion_Purchases_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_RatingsArgs = {
  where: Ratings_Bool_Exp;
};


export type MutationDelete_Ratings_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_RefundsArgs = {
  where: Refunds_Bool_Exp;
};


export type MutationDelete_Refunds_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Saved_Search_HitsArgs = {
  where: Saved_Search_Hits_Bool_Exp;
};


export type MutationDelete_Saved_Search_Hits_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Saved_SearchesArgs = {
  where: Saved_Searches_Bool_Exp;
};


export type MutationDelete_Saved_Searches_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Signup_EmailsArgs = {
  where: Signup_Emails_Bool_Exp;
};


export type MutationDelete_Signup_Emails_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_StoresArgs = {
  where: Stores_Bool_Exp;
};


export type MutationDelete_Stores_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_TransactionsArgs = {
  where: Transactions_Bool_Exp;
};


export type MutationDelete_Transactions_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_Unique_Product_ViewsArgs = {
  where: Unique_Product_Views_Bool_Exp;
};


export type MutationDelete_Unique_Product_Views_By_PkArgs = {
  productId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationDelete_User_LicensesArgs = {
  where: User_Licenses_Bool_Exp;
};


export type MutationDelete_User_Licenses_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


export type MutationDelete_Users_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationInsert_BidsArgs = {
  objects: Array<Bids_Insert_Input>;
  on_conflict?: Maybe<Bids_On_Conflict>;
};


export type MutationInsert_Bids_OneArgs = {
  object: Bids_Insert_Input;
  on_conflict?: Maybe<Bids_On_Conflict>;
};


export type MutationInsert_CalibersArgs = {
  objects: Array<Calibers_Insert_Input>;
  on_conflict?: Maybe<Calibers_On_Conflict>;
};


export type MutationInsert_Calibers_OneArgs = {
  object: Calibers_Insert_Input;
  on_conflict?: Maybe<Calibers_On_Conflict>;
};


export type MutationInsert_CategoriesArgs = {
  objects: Array<Categories_Insert_Input>;
  on_conflict?: Maybe<Categories_On_Conflict>;
};


export type MutationInsert_Categories_OneArgs = {
  object: Categories_Insert_Input;
  on_conflict?: Maybe<Categories_On_Conflict>;
};


export type MutationInsert_Chat_MessagesArgs = {
  objects: Array<Chat_Messages_Insert_Input>;
  on_conflict?: Maybe<Chat_Messages_On_Conflict>;
};


export type MutationInsert_Chat_Messages_OneArgs = {
  object: Chat_Messages_Insert_Input;
  on_conflict?: Maybe<Chat_Messages_On_Conflict>;
};


export type MutationInsert_Chat_RoomsArgs = {
  objects: Array<Chat_Rooms_Insert_Input>;
  on_conflict?: Maybe<Chat_Rooms_On_Conflict>;
};


export type MutationInsert_Chat_Rooms_OneArgs = {
  object: Chat_Rooms_Insert_Input;
  on_conflict?: Maybe<Chat_Rooms_On_Conflict>;
};


export type MutationInsert_Chat_UsersArgs = {
  objects: Array<Chat_Users_Insert_Input>;
  on_conflict?: Maybe<Chat_Users_On_Conflict>;
};


export type MutationInsert_Chat_Users_OneArgs = {
  object: Chat_Users_Insert_Input;
  on_conflict?: Maybe<Chat_Users_On_Conflict>;
};


export type MutationInsert_Classified_Ad_PurchasesArgs = {
  objects: Array<Classified_Ad_Purchases_Insert_Input>;
  on_conflict?: Maybe<Classified_Ad_Purchases_On_Conflict>;
};


export type MutationInsert_Classified_Ad_Purchases_OneArgs = {
  object: Classified_Ad_Purchases_Insert_Input;
  on_conflict?: Maybe<Classified_Ad_Purchases_On_Conflict>;
};


export type MutationInsert_Collection_ItemsArgs = {
  objects: Array<Collection_Items_Insert_Input>;
  on_conflict?: Maybe<Collection_Items_On_Conflict>;
};


export type MutationInsert_Collection_Items_OneArgs = {
  object: Collection_Items_Insert_Input;
  on_conflict?: Maybe<Collection_Items_On_Conflict>;
};


export type MutationInsert_CollectionsArgs = {
  objects: Array<Collections_Insert_Input>;
  on_conflict?: Maybe<Collections_On_Conflict>;
};


export type MutationInsert_Collections_OneArgs = {
  object: Collections_Insert_Input;
  on_conflict?: Maybe<Collections_On_Conflict>;
};


export type MutationInsert_DealersArgs = {
  objects: Array<Dealers_Insert_Input>;
  on_conflict?: Maybe<Dealers_On_Conflict>;
};


export type MutationInsert_Dealers_OneArgs = {
  object: Dealers_Insert_Input;
  on_conflict?: Maybe<Dealers_On_Conflict>;
};


export type MutationInsert_Email_SubscriptionsArgs = {
  objects: Array<Email_Subscriptions_Insert_Input>;
  on_conflict?: Maybe<Email_Subscriptions_On_Conflict>;
};


export type MutationInsert_Email_Subscriptions_OneArgs = {
  object: Email_Subscriptions_Insert_Input;
  on_conflict?: Maybe<Email_Subscriptions_On_Conflict>;
};


export type MutationInsert_EmailsArgs = {
  objects: Array<Emails_Insert_Input>;
  on_conflict?: Maybe<Emails_On_Conflict>;
};


export type MutationInsert_Emails_OneArgs = {
  object: Emails_Insert_Input;
  on_conflict?: Maybe<Emails_On_Conflict>;
};


export type MutationInsert_External_Product_SnapshotsArgs = {
  objects: Array<External_Product_Snapshots_Insert_Input>;
  on_conflict?: Maybe<External_Product_Snapshots_On_Conflict>;
};


export type MutationInsert_External_Product_Snapshots_OneArgs = {
  object: External_Product_Snapshots_Insert_Input;
  on_conflict?: Maybe<External_Product_Snapshots_On_Conflict>;
};


export type MutationInsert_External_ProductsArgs = {
  objects: Array<External_Products_Insert_Input>;
  on_conflict?: Maybe<External_Products_On_Conflict>;
};


export type MutationInsert_External_Products_OneArgs = {
  object: External_Products_Insert_Input;
  on_conflict?: Maybe<External_Products_On_Conflict>;
};


export type MutationInsert_Image_OwnersArgs = {
  objects: Array<Image_Owners_Insert_Input>;
  on_conflict?: Maybe<Image_Owners_On_Conflict>;
};


export type MutationInsert_Image_Owners_OneArgs = {
  object: Image_Owners_Insert_Input;
  on_conflict?: Maybe<Image_Owners_On_Conflict>;
};


export type MutationInsert_Image_ParentsArgs = {
  objects: Array<Image_Parents_Insert_Input>;
  on_conflict?: Maybe<Image_Parents_On_Conflict>;
};


export type MutationInsert_Image_Parents_OneArgs = {
  object: Image_Parents_Insert_Input;
  on_conflict?: Maybe<Image_Parents_On_Conflict>;
};


export type MutationInsert_Image_VariantsArgs = {
  objects: Array<Image_Variants_Insert_Input>;
  on_conflict?: Maybe<Image_Variants_On_Conflict>;
};


export type MutationInsert_Image_Variants_OneArgs = {
  object: Image_Variants_Insert_Input;
  on_conflict?: Maybe<Image_Variants_On_Conflict>;
};


export type MutationInsert_MigrationsArgs = {
  objects: Array<Migrations_Insert_Input>;
  on_conflict?: Maybe<Migrations_On_Conflict>;
};


export type MutationInsert_Migrations_OneArgs = {
  object: Migrations_Insert_Input;
  on_conflict?: Maybe<Migrations_On_Conflict>;
};


export type MutationInsert_News_Item_VotesArgs = {
  objects: Array<News_Item_Votes_Insert_Input>;
  on_conflict?: Maybe<News_Item_Votes_On_Conflict>;
};


export type MutationInsert_News_Item_Votes_OneArgs = {
  object: News_Item_Votes_Insert_Input;
  on_conflict?: Maybe<News_Item_Votes_On_Conflict>;
};


export type MutationInsert_News_ItemsArgs = {
  objects: Array<News_Items_Insert_Input>;
  on_conflict?: Maybe<News_Items_On_Conflict>;
};


export type MutationInsert_News_Items_OneArgs = {
  object: News_Items_Insert_Input;
  on_conflict?: Maybe<News_Items_On_Conflict>;
};


export type MutationInsert_Order_SnapshotsArgs = {
  objects: Array<Order_Snapshots_Insert_Input>;
  on_conflict?: Maybe<Order_Snapshots_On_Conflict>;
};


export type MutationInsert_Order_Snapshots_OneArgs = {
  object: Order_Snapshots_Insert_Input;
  on_conflict?: Maybe<Order_Snapshots_On_Conflict>;
};


export type MutationInsert_OrdersArgs = {
  objects: Array<Orders_Insert_Input>;
  on_conflict?: Maybe<Orders_On_Conflict>;
};


export type MutationInsert_Orders_OneArgs = {
  object: Orders_Insert_Input;
  on_conflict?: Maybe<Orders_On_Conflict>;
};


export type MutationInsert_Page_Config_SectionsArgs = {
  objects: Array<Page_Config_Sections_Insert_Input>;
  on_conflict?: Maybe<Page_Config_Sections_On_Conflict>;
};


export type MutationInsert_Page_Config_Sections_OneArgs = {
  object: Page_Config_Sections_Insert_Input;
  on_conflict?: Maybe<Page_Config_Sections_On_Conflict>;
};


export type MutationInsert_Page_ConfigsArgs = {
  objects: Array<Page_Configs_Insert_Input>;
  on_conflict?: Maybe<Page_Configs_On_Conflict>;
};


export type MutationInsert_Page_Configs_OneArgs = {
  object: Page_Configs_Insert_Input;
  on_conflict?: Maybe<Page_Configs_On_Conflict>;
};


export type MutationInsert_Payment_MethodsArgs = {
  objects: Array<Payment_Methods_Insert_Input>;
  on_conflict?: Maybe<Payment_Methods_On_Conflict>;
};


export type MutationInsert_Payment_Methods_OneArgs = {
  object: Payment_Methods_Insert_Input;
  on_conflict?: Maybe<Payment_Methods_On_Conflict>;
};


export type MutationInsert_Payout_ItemsArgs = {
  objects: Array<Payout_Items_Insert_Input>;
  on_conflict?: Maybe<Payout_Items_On_Conflict>;
};


export type MutationInsert_Payout_Items_OneArgs = {
  object: Payout_Items_Insert_Input;
  on_conflict?: Maybe<Payout_Items_On_Conflict>;
};


export type MutationInsert_Payout_MethodsArgs = {
  objects: Array<Payout_Methods_Insert_Input>;
  on_conflict?: Maybe<Payout_Methods_On_Conflict>;
};


export type MutationInsert_Payout_Methods_OneArgs = {
  object: Payout_Methods_Insert_Input;
  on_conflict?: Maybe<Payout_Methods_On_Conflict>;
};


export type MutationInsert_Phone_NumbersArgs = {
  objects: Array<Phone_Numbers_Insert_Input>;
  on_conflict?: Maybe<Phone_Numbers_On_Conflict>;
};


export type MutationInsert_Phone_Numbers_OneArgs = {
  object: Phone_Numbers_Insert_Input;
  on_conflict?: Maybe<Phone_Numbers_On_Conflict>;
};


export type MutationInsert_Product_File_OwnersArgs = {
  objects: Array<Product_File_Owners_Insert_Input>;
  on_conflict?: Maybe<Product_File_Owners_On_Conflict>;
};


export type MutationInsert_Product_File_Owners_OneArgs = {
  object: Product_File_Owners_Insert_Input;
  on_conflict?: Maybe<Product_File_Owners_On_Conflict>;
};


export type MutationInsert_Product_FilesArgs = {
  objects: Array<Product_Files_Insert_Input>;
  on_conflict?: Maybe<Product_Files_On_Conflict>;
};


export type MutationInsert_Product_Files_OneArgs = {
  object: Product_Files_Insert_Input;
  on_conflict?: Maybe<Product_Files_On_Conflict>;
};


export type MutationInsert_Product_Preview_ItemsArgs = {
  objects: Array<Product_Preview_Items_Insert_Input>;
  on_conflict?: Maybe<Product_Preview_Items_On_Conflict>;
};


export type MutationInsert_Product_Preview_Items_OneArgs = {
  object: Product_Preview_Items_Insert_Input;
  on_conflict?: Maybe<Product_Preview_Items_On_Conflict>;
};


export type MutationInsert_Product_SnapshotsArgs = {
  objects: Array<Product_Snapshots_Insert_Input>;
  on_conflict?: Maybe<Product_Snapshots_On_Conflict>;
};


export type MutationInsert_Product_Snapshots_OneArgs = {
  object: Product_Snapshots_Insert_Input;
  on_conflict?: Maybe<Product_Snapshots_On_Conflict>;
};


export type MutationInsert_Product_VariantsArgs = {
  objects: Array<Product_Variants_Insert_Input>;
  on_conflict?: Maybe<Product_Variants_On_Conflict>;
};


export type MutationInsert_Product_Variants_OneArgs = {
  object: Product_Variants_Insert_Input;
  on_conflict?: Maybe<Product_Variants_On_Conflict>;
};


export type MutationInsert_ProductsArgs = {
  objects: Array<Products_Insert_Input>;
  on_conflict?: Maybe<Products_On_Conflict>;
};


export type MutationInsert_Products_OneArgs = {
  object: Products_Insert_Input;
  on_conflict?: Maybe<Products_On_Conflict>;
};


export type MutationInsert_Promoted_ListsArgs = {
  objects: Array<Promoted_Lists_Insert_Input>;
  on_conflict?: Maybe<Promoted_Lists_On_Conflict>;
};


export type MutationInsert_Promoted_Lists_OneArgs = {
  object: Promoted_Lists_Insert_Input;
  on_conflict?: Maybe<Promoted_Lists_On_Conflict>;
};


export type MutationInsert_Promoted_SlotsArgs = {
  objects: Array<Promoted_Slots_Insert_Input>;
  on_conflict?: Maybe<Promoted_Slots_On_Conflict>;
};


export type MutationInsert_Promoted_Slots_OneArgs = {
  object: Promoted_Slots_Insert_Input;
  on_conflict?: Maybe<Promoted_Slots_On_Conflict>;
};


export type MutationInsert_Promotion_PurchasesArgs = {
  objects: Array<Promotion_Purchases_Insert_Input>;
  on_conflict?: Maybe<Promotion_Purchases_On_Conflict>;
};


export type MutationInsert_Promotion_Purchases_OneArgs = {
  object: Promotion_Purchases_Insert_Input;
  on_conflict?: Maybe<Promotion_Purchases_On_Conflict>;
};


export type MutationInsert_RatingsArgs = {
  objects: Array<Ratings_Insert_Input>;
  on_conflict?: Maybe<Ratings_On_Conflict>;
};


export type MutationInsert_Ratings_OneArgs = {
  object: Ratings_Insert_Input;
  on_conflict?: Maybe<Ratings_On_Conflict>;
};


export type MutationInsert_RefundsArgs = {
  objects: Array<Refunds_Insert_Input>;
  on_conflict?: Maybe<Refunds_On_Conflict>;
};


export type MutationInsert_Refunds_OneArgs = {
  object: Refunds_Insert_Input;
  on_conflict?: Maybe<Refunds_On_Conflict>;
};


export type MutationInsert_Saved_Search_HitsArgs = {
  objects: Array<Saved_Search_Hits_Insert_Input>;
  on_conflict?: Maybe<Saved_Search_Hits_On_Conflict>;
};


export type MutationInsert_Saved_Search_Hits_OneArgs = {
  object: Saved_Search_Hits_Insert_Input;
  on_conflict?: Maybe<Saved_Search_Hits_On_Conflict>;
};


export type MutationInsert_Saved_SearchesArgs = {
  objects: Array<Saved_Searches_Insert_Input>;
  on_conflict?: Maybe<Saved_Searches_On_Conflict>;
};


export type MutationInsert_Saved_Searches_OneArgs = {
  object: Saved_Searches_Insert_Input;
  on_conflict?: Maybe<Saved_Searches_On_Conflict>;
};


export type MutationInsert_Signup_EmailsArgs = {
  objects: Array<Signup_Emails_Insert_Input>;
  on_conflict?: Maybe<Signup_Emails_On_Conflict>;
};


export type MutationInsert_Signup_Emails_OneArgs = {
  object: Signup_Emails_Insert_Input;
  on_conflict?: Maybe<Signup_Emails_On_Conflict>;
};


export type MutationInsert_StoresArgs = {
  objects: Array<Stores_Insert_Input>;
  on_conflict?: Maybe<Stores_On_Conflict>;
};


export type MutationInsert_Stores_OneArgs = {
  object: Stores_Insert_Input;
  on_conflict?: Maybe<Stores_On_Conflict>;
};


export type MutationInsert_TransactionsArgs = {
  objects: Array<Transactions_Insert_Input>;
  on_conflict?: Maybe<Transactions_On_Conflict>;
};


export type MutationInsert_Transactions_OneArgs = {
  object: Transactions_Insert_Input;
  on_conflict?: Maybe<Transactions_On_Conflict>;
};


export type MutationInsert_Unique_Product_ViewsArgs = {
  objects: Array<Unique_Product_Views_Insert_Input>;
  on_conflict?: Maybe<Unique_Product_Views_On_Conflict>;
};


export type MutationInsert_Unique_Product_Views_OneArgs = {
  object: Unique_Product_Views_Insert_Input;
  on_conflict?: Maybe<Unique_Product_Views_On_Conflict>;
};


export type MutationInsert_User_LicensesArgs = {
  objects: Array<User_Licenses_Insert_Input>;
  on_conflict?: Maybe<User_Licenses_On_Conflict>;
};


export type MutationInsert_User_Licenses_OneArgs = {
  object: User_Licenses_Insert_Input;
  on_conflict?: Maybe<User_Licenses_On_Conflict>;
};


export type MutationInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


export type MutationInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};


export type MutationUpdate_BidsArgs = {
  _inc?: Maybe<Bids_Inc_Input>;
  _set?: Maybe<Bids_Set_Input>;
  where: Bids_Bool_Exp;
};


export type MutationUpdate_Bids_By_PkArgs = {
  _inc?: Maybe<Bids_Inc_Input>;
  _set?: Maybe<Bids_Set_Input>;
  pk_columns: Bids_Pk_Columns_Input;
};


export type MutationUpdate_CalibersArgs = {
  _set?: Maybe<Calibers_Set_Input>;
  where: Calibers_Bool_Exp;
};


export type MutationUpdate_Calibers_By_PkArgs = {
  _set?: Maybe<Calibers_Set_Input>;
  pk_columns: Calibers_Pk_Columns_Input;
};


export type MutationUpdate_CategoriesArgs = {
  _set?: Maybe<Categories_Set_Input>;
  where: Categories_Bool_Exp;
};


export type MutationUpdate_Categories_By_PkArgs = {
  _set?: Maybe<Categories_Set_Input>;
  pk_columns: Categories_Pk_Columns_Input;
};


export type MutationUpdate_Chat_MessagesArgs = {
  _set?: Maybe<Chat_Messages_Set_Input>;
  where: Chat_Messages_Bool_Exp;
};


export type MutationUpdate_Chat_Messages_By_PkArgs = {
  _set?: Maybe<Chat_Messages_Set_Input>;
  pk_columns: Chat_Messages_Pk_Columns_Input;
};


export type MutationUpdate_Chat_RoomsArgs = {
  _set?: Maybe<Chat_Rooms_Set_Input>;
  where: Chat_Rooms_Bool_Exp;
};


export type MutationUpdate_Chat_Rooms_By_PkArgs = {
  _set?: Maybe<Chat_Rooms_Set_Input>;
  pk_columns: Chat_Rooms_Pk_Columns_Input;
};


export type MutationUpdate_Chat_UsersArgs = {
  _set?: Maybe<Chat_Users_Set_Input>;
  where: Chat_Users_Bool_Exp;
};


export type MutationUpdate_Chat_Users_By_PkArgs = {
  _set?: Maybe<Chat_Users_Set_Input>;
  pk_columns: Chat_Users_Pk_Columns_Input;
};


export type MutationUpdate_Classified_Ad_PurchasesArgs = {
  _inc?: Maybe<Classified_Ad_Purchases_Inc_Input>;
  _set?: Maybe<Classified_Ad_Purchases_Set_Input>;
  where: Classified_Ad_Purchases_Bool_Exp;
};


export type MutationUpdate_Classified_Ad_Purchases_By_PkArgs = {
  _inc?: Maybe<Classified_Ad_Purchases_Inc_Input>;
  _set?: Maybe<Classified_Ad_Purchases_Set_Input>;
  pk_columns: Classified_Ad_Purchases_Pk_Columns_Input;
};


export type MutationUpdate_Collection_ItemsArgs = {
  _inc?: Maybe<Collection_Items_Inc_Input>;
  _set?: Maybe<Collection_Items_Set_Input>;
  where: Collection_Items_Bool_Exp;
};


export type MutationUpdate_Collection_Items_By_PkArgs = {
  _inc?: Maybe<Collection_Items_Inc_Input>;
  _set?: Maybe<Collection_Items_Set_Input>;
  pk_columns: Collection_Items_Pk_Columns_Input;
};


export type MutationUpdate_CollectionsArgs = {
  _set?: Maybe<Collections_Set_Input>;
  where: Collections_Bool_Exp;
};


export type MutationUpdate_Collections_By_PkArgs = {
  _set?: Maybe<Collections_Set_Input>;
  pk_columns: Collections_Pk_Columns_Input;
};


export type MutationUpdate_DealersArgs = {
  _set?: Maybe<Dealers_Set_Input>;
  where: Dealers_Bool_Exp;
};


export type MutationUpdate_Dealers_By_PkArgs = {
  _set?: Maybe<Dealers_Set_Input>;
  pk_columns: Dealers_Pk_Columns_Input;
};


export type MutationUpdate_Email_SubscriptionsArgs = {
  _set?: Maybe<Email_Subscriptions_Set_Input>;
  where: Email_Subscriptions_Bool_Exp;
};


export type MutationUpdate_Email_Subscriptions_By_PkArgs = {
  _set?: Maybe<Email_Subscriptions_Set_Input>;
  pk_columns: Email_Subscriptions_Pk_Columns_Input;
};


export type MutationUpdate_EmailsArgs = {
  _set?: Maybe<Emails_Set_Input>;
  where: Emails_Bool_Exp;
};


export type MutationUpdate_Emails_By_PkArgs = {
  _set?: Maybe<Emails_Set_Input>;
  pk_columns: Emails_Pk_Columns_Input;
};


export type MutationUpdate_External_Product_SnapshotsArgs = {
  _inc?: Maybe<External_Product_Snapshots_Inc_Input>;
  _set?: Maybe<External_Product_Snapshots_Set_Input>;
  where: External_Product_Snapshots_Bool_Exp;
};


export type MutationUpdate_External_Product_Snapshots_By_PkArgs = {
  _inc?: Maybe<External_Product_Snapshots_Inc_Input>;
  _set?: Maybe<External_Product_Snapshots_Set_Input>;
  pk_columns: External_Product_Snapshots_Pk_Columns_Input;
};


export type MutationUpdate_External_ProductsArgs = {
  _inc?: Maybe<External_Products_Inc_Input>;
  _set?: Maybe<External_Products_Set_Input>;
  where: External_Products_Bool_Exp;
};


export type MutationUpdate_External_Products_By_PkArgs = {
  _inc?: Maybe<External_Products_Inc_Input>;
  _set?: Maybe<External_Products_Set_Input>;
  pk_columns: External_Products_Pk_Columns_Input;
};


export type MutationUpdate_Image_OwnersArgs = {
  _set?: Maybe<Image_Owners_Set_Input>;
  where: Image_Owners_Bool_Exp;
};


export type MutationUpdate_Image_Owners_By_PkArgs = {
  _set?: Maybe<Image_Owners_Set_Input>;
  pk_columns: Image_Owners_Pk_Columns_Input;
};


export type MutationUpdate_Image_ParentsArgs = {
  _set?: Maybe<Image_Parents_Set_Input>;
  where: Image_Parents_Bool_Exp;
};


export type MutationUpdate_Image_Parents_By_PkArgs = {
  _set?: Maybe<Image_Parents_Set_Input>;
  pk_columns: Image_Parents_Pk_Columns_Input;
};


export type MutationUpdate_Image_VariantsArgs = {
  _inc?: Maybe<Image_Variants_Inc_Input>;
  _set?: Maybe<Image_Variants_Set_Input>;
  where: Image_Variants_Bool_Exp;
};


export type MutationUpdate_Image_Variants_By_PkArgs = {
  _inc?: Maybe<Image_Variants_Inc_Input>;
  _set?: Maybe<Image_Variants_Set_Input>;
  pk_columns: Image_Variants_Pk_Columns_Input;
};


export type MutationUpdate_MigrationsArgs = {
  _inc?: Maybe<Migrations_Inc_Input>;
  _set?: Maybe<Migrations_Set_Input>;
  where: Migrations_Bool_Exp;
};


export type MutationUpdate_Migrations_By_PkArgs = {
  _inc?: Maybe<Migrations_Inc_Input>;
  _set?: Maybe<Migrations_Set_Input>;
  pk_columns: Migrations_Pk_Columns_Input;
};


export type MutationUpdate_News_Item_VotesArgs = {
  _inc?: Maybe<News_Item_Votes_Inc_Input>;
  _set?: Maybe<News_Item_Votes_Set_Input>;
  where: News_Item_Votes_Bool_Exp;
};


export type MutationUpdate_News_Item_Votes_By_PkArgs = {
  _inc?: Maybe<News_Item_Votes_Inc_Input>;
  _set?: Maybe<News_Item_Votes_Set_Input>;
  pk_columns: News_Item_Votes_Pk_Columns_Input;
};


export type MutationUpdate_News_ItemsArgs = {
  _inc?: Maybe<News_Items_Inc_Input>;
  _set?: Maybe<News_Items_Set_Input>;
  where: News_Items_Bool_Exp;
};


export type MutationUpdate_News_Items_By_PkArgs = {
  _inc?: Maybe<News_Items_Inc_Input>;
  _set?: Maybe<News_Items_Set_Input>;
  pk_columns: News_Items_Pk_Columns_Input;
};


export type MutationUpdate_Order_SnapshotsArgs = {
  _inc?: Maybe<Order_Snapshots_Inc_Input>;
  _set?: Maybe<Order_Snapshots_Set_Input>;
  where: Order_Snapshots_Bool_Exp;
};


export type MutationUpdate_Order_Snapshots_By_PkArgs = {
  _inc?: Maybe<Order_Snapshots_Inc_Input>;
  _set?: Maybe<Order_Snapshots_Set_Input>;
  pk_columns: Order_Snapshots_Pk_Columns_Input;
};


export type MutationUpdate_OrdersArgs = {
  _inc?: Maybe<Orders_Inc_Input>;
  _set?: Maybe<Orders_Set_Input>;
  where: Orders_Bool_Exp;
};


export type MutationUpdate_Orders_By_PkArgs = {
  _inc?: Maybe<Orders_Inc_Input>;
  _set?: Maybe<Orders_Set_Input>;
  pk_columns: Orders_Pk_Columns_Input;
};


export type MutationUpdate_Page_Config_SectionsArgs = {
  _inc?: Maybe<Page_Config_Sections_Inc_Input>;
  _set?: Maybe<Page_Config_Sections_Set_Input>;
  where: Page_Config_Sections_Bool_Exp;
};


export type MutationUpdate_Page_Config_Sections_By_PkArgs = {
  _inc?: Maybe<Page_Config_Sections_Inc_Input>;
  _set?: Maybe<Page_Config_Sections_Set_Input>;
  pk_columns: Page_Config_Sections_Pk_Columns_Input;
};


export type MutationUpdate_Page_ConfigsArgs = {
  _set?: Maybe<Page_Configs_Set_Input>;
  where: Page_Configs_Bool_Exp;
};


export type MutationUpdate_Page_Configs_By_PkArgs = {
  _set?: Maybe<Page_Configs_Set_Input>;
  pk_columns: Page_Configs_Pk_Columns_Input;
};


export type MutationUpdate_Payment_MethodsArgs = {
  _inc?: Maybe<Payment_Methods_Inc_Input>;
  _set?: Maybe<Payment_Methods_Set_Input>;
  where: Payment_Methods_Bool_Exp;
};


export type MutationUpdate_Payment_Methods_By_PkArgs = {
  _inc?: Maybe<Payment_Methods_Inc_Input>;
  _set?: Maybe<Payment_Methods_Set_Input>;
  pk_columns: Payment_Methods_Pk_Columns_Input;
};


export type MutationUpdate_Payout_ItemsArgs = {
  _inc?: Maybe<Payout_Items_Inc_Input>;
  _set?: Maybe<Payout_Items_Set_Input>;
  where: Payout_Items_Bool_Exp;
};


export type MutationUpdate_Payout_Items_By_PkArgs = {
  _inc?: Maybe<Payout_Items_Inc_Input>;
  _set?: Maybe<Payout_Items_Set_Input>;
  pk_columns: Payout_Items_Pk_Columns_Input;
};


export type MutationUpdate_Payout_MethodsArgs = {
  _set?: Maybe<Payout_Methods_Set_Input>;
  where: Payout_Methods_Bool_Exp;
};


export type MutationUpdate_Payout_Methods_By_PkArgs = {
  _set?: Maybe<Payout_Methods_Set_Input>;
  pk_columns: Payout_Methods_Pk_Columns_Input;
};


export type MutationUpdate_Phone_NumbersArgs = {
  _set?: Maybe<Phone_Numbers_Set_Input>;
  where: Phone_Numbers_Bool_Exp;
};


export type MutationUpdate_Phone_Numbers_By_PkArgs = {
  _set?: Maybe<Phone_Numbers_Set_Input>;
  pk_columns: Phone_Numbers_Pk_Columns_Input;
};


export type MutationUpdate_Product_File_OwnersArgs = {
  _set?: Maybe<Product_File_Owners_Set_Input>;
  where: Product_File_Owners_Bool_Exp;
};


export type MutationUpdate_Product_File_Owners_By_PkArgs = {
  _set?: Maybe<Product_File_Owners_Set_Input>;
  pk_columns: Product_File_Owners_Pk_Columns_Input;
};


export type MutationUpdate_Product_FilesArgs = {
  _inc?: Maybe<Product_Files_Inc_Input>;
  _set?: Maybe<Product_Files_Set_Input>;
  where: Product_Files_Bool_Exp;
};


export type MutationUpdate_Product_Files_By_PkArgs = {
  _inc?: Maybe<Product_Files_Inc_Input>;
  _set?: Maybe<Product_Files_Set_Input>;
  pk_columns: Product_Files_Pk_Columns_Input;
};


export type MutationUpdate_Product_Preview_ItemsArgs = {
  _inc?: Maybe<Product_Preview_Items_Inc_Input>;
  _set?: Maybe<Product_Preview_Items_Set_Input>;
  where: Product_Preview_Items_Bool_Exp;
};


export type MutationUpdate_Product_Preview_Items_By_PkArgs = {
  _inc?: Maybe<Product_Preview_Items_Inc_Input>;
  _set?: Maybe<Product_Preview_Items_Set_Input>;
  pk_columns: Product_Preview_Items_Pk_Columns_Input;
};


export type MutationUpdate_Product_SnapshotsArgs = {
  _set?: Maybe<Product_Snapshots_Set_Input>;
  where: Product_Snapshots_Bool_Exp;
};


export type MutationUpdate_Product_Snapshots_By_PkArgs = {
  _set?: Maybe<Product_Snapshots_Set_Input>;
  pk_columns: Product_Snapshots_Pk_Columns_Input;
};


export type MutationUpdate_Product_VariantsArgs = {
  _inc?: Maybe<Product_Variants_Inc_Input>;
  _set?: Maybe<Product_Variants_Set_Input>;
  where: Product_Variants_Bool_Exp;
};


export type MutationUpdate_Product_Variants_By_PkArgs = {
  _inc?: Maybe<Product_Variants_Inc_Input>;
  _set?: Maybe<Product_Variants_Set_Input>;
  pk_columns: Product_Variants_Pk_Columns_Input;
};


export type MutationUpdate_ProductsArgs = {
  _set?: Maybe<Products_Set_Input>;
  where: Products_Bool_Exp;
};


export type MutationUpdate_Products_By_PkArgs = {
  _set?: Maybe<Products_Set_Input>;
  pk_columns: Products_Pk_Columns_Input;
};


export type MutationUpdate_Promoted_ListsArgs = {
  _inc?: Maybe<Promoted_Lists_Inc_Input>;
  _set?: Maybe<Promoted_Lists_Set_Input>;
  where: Promoted_Lists_Bool_Exp;
};


export type MutationUpdate_Promoted_Lists_By_PkArgs = {
  _inc?: Maybe<Promoted_Lists_Inc_Input>;
  _set?: Maybe<Promoted_Lists_Set_Input>;
  pk_columns: Promoted_Lists_Pk_Columns_Input;
};


export type MutationUpdate_Promoted_SlotsArgs = {
  _inc?: Maybe<Promoted_Slots_Inc_Input>;
  _set?: Maybe<Promoted_Slots_Set_Input>;
  where: Promoted_Slots_Bool_Exp;
};


export type MutationUpdate_Promoted_Slots_By_PkArgs = {
  _inc?: Maybe<Promoted_Slots_Inc_Input>;
  _set?: Maybe<Promoted_Slots_Set_Input>;
  pk_columns: Promoted_Slots_Pk_Columns_Input;
};


export type MutationUpdate_Promotion_PurchasesArgs = {
  _inc?: Maybe<Promotion_Purchases_Inc_Input>;
  _set?: Maybe<Promotion_Purchases_Set_Input>;
  where: Promotion_Purchases_Bool_Exp;
};


export type MutationUpdate_Promotion_Purchases_By_PkArgs = {
  _inc?: Maybe<Promotion_Purchases_Inc_Input>;
  _set?: Maybe<Promotion_Purchases_Set_Input>;
  pk_columns: Promotion_Purchases_Pk_Columns_Input;
};


export type MutationUpdate_RatingsArgs = {
  _inc?: Maybe<Ratings_Inc_Input>;
  _set?: Maybe<Ratings_Set_Input>;
  where: Ratings_Bool_Exp;
};


export type MutationUpdate_Ratings_By_PkArgs = {
  _inc?: Maybe<Ratings_Inc_Input>;
  _set?: Maybe<Ratings_Set_Input>;
  pk_columns: Ratings_Pk_Columns_Input;
};


export type MutationUpdate_RefundsArgs = {
  _set?: Maybe<Refunds_Set_Input>;
  where: Refunds_Bool_Exp;
};


export type MutationUpdate_Refunds_By_PkArgs = {
  _set?: Maybe<Refunds_Set_Input>;
  pk_columns: Refunds_Pk_Columns_Input;
};


export type MutationUpdate_Saved_Search_HitsArgs = {
  _set?: Maybe<Saved_Search_Hits_Set_Input>;
  where: Saved_Search_Hits_Bool_Exp;
};


export type MutationUpdate_Saved_Search_Hits_By_PkArgs = {
  _set?: Maybe<Saved_Search_Hits_Set_Input>;
  pk_columns: Saved_Search_Hits_Pk_Columns_Input;
};


export type MutationUpdate_Saved_SearchesArgs = {
  _inc?: Maybe<Saved_Searches_Inc_Input>;
  _set?: Maybe<Saved_Searches_Set_Input>;
  where: Saved_Searches_Bool_Exp;
};


export type MutationUpdate_Saved_Searches_By_PkArgs = {
  _inc?: Maybe<Saved_Searches_Inc_Input>;
  _set?: Maybe<Saved_Searches_Set_Input>;
  pk_columns: Saved_Searches_Pk_Columns_Input;
};


export type MutationUpdate_Signup_EmailsArgs = {
  _set?: Maybe<Signup_Emails_Set_Input>;
  where: Signup_Emails_Bool_Exp;
};


export type MutationUpdate_Signup_Emails_By_PkArgs = {
  _set?: Maybe<Signup_Emails_Set_Input>;
  pk_columns: Signup_Emails_Pk_Columns_Input;
};


export type MutationUpdate_StoresArgs = {
  _set?: Maybe<Stores_Set_Input>;
  where: Stores_Bool_Exp;
};


export type MutationUpdate_Stores_By_PkArgs = {
  _set?: Maybe<Stores_Set_Input>;
  pk_columns: Stores_Pk_Columns_Input;
};


export type MutationUpdate_TransactionsArgs = {
  _inc?: Maybe<Transactions_Inc_Input>;
  _set?: Maybe<Transactions_Set_Input>;
  where: Transactions_Bool_Exp;
};


export type MutationUpdate_Transactions_By_PkArgs = {
  _inc?: Maybe<Transactions_Inc_Input>;
  _set?: Maybe<Transactions_Set_Input>;
  pk_columns: Transactions_Pk_Columns_Input;
};


export type MutationUpdate_Unique_Product_ViewsArgs = {
  _set?: Maybe<Unique_Product_Views_Set_Input>;
  where: Unique_Product_Views_Bool_Exp;
};


export type MutationUpdate_Unique_Product_Views_By_PkArgs = {
  _set?: Maybe<Unique_Product_Views_Set_Input>;
  pk_columns: Unique_Product_Views_Pk_Columns_Input;
};


export type MutationUpdate_User_LicensesArgs = {
  _set?: Maybe<User_Licenses_Set_Input>;
  where: User_Licenses_Bool_Exp;
};


export type MutationUpdate_User_Licenses_By_PkArgs = {
  _set?: Maybe<User_Licenses_Set_Input>;
  pk_columns: User_Licenses_Pk_Columns_Input;
};


export type MutationUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


export type MutationUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


export type MutationSignUpUsingEmailArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLogInUsingEmailArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignUpAndClaimItemArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  licenseNumber: Scalars['String'];
  licenseExpiry: Scalars['Date'];
  licenseCategory: Scalars['String'];
  licenseState: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  claimId: Scalars['String'];
  dealerId?: Maybe<Scalars['String']>;
  newPreviewItems: Array<ProductPreviewItemInput>;
};


export type MutationLogInAndClaimItemArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  claimId: Scalars['String'];
  dealerId?: Maybe<Scalars['String']>;
  newPreviewItems: Array<ProductPreviewItemInput>;
};


export type MutationSendResetPasswordEmailArgs = {
  email: Scalars['String'];
};


export type MutationConfirmResetPasswordArgs = {
  email: Scalars['String'];
  expiresAt: Scalars['Date'];
  resetId: Scalars['String'];
  newPassword?: Maybe<Scalars['String']>;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationSetPayoutMethodArgs = {
  payoutType?: Maybe<Scalars['String']>;
  bsb?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  accountName?: Maybe<Scalars['String']>;
};


export type MutationEditUserProfileArgs = {
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  editUserPhoneNumberInput: EditUserPhoneNumberInput;
  payoutMethodId?: Maybe<Scalars['String']>;
};


export type MutationVerifyEmailArgs = {
  userId: Scalars['String'];
  emailVerified: Scalars['Boolean'];
};


export type MutationAddUserLicenseArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  licenseNumber: Scalars['String'];
  licenseExpiry: Scalars['Date'];
  licenseCategory?: Maybe<Scalars['String']>;
  licenseState?: Maybe<Scalars['String']>;
};


export type MutationEditUserLicenseArgs = {
  licenseId: Scalars['String'];
  licenseNumber: Scalars['String'];
  licenseExpiry: Scalars['Date'];
  licenseCategory?: Maybe<Scalars['String']>;
  licenseState?: Maybe<Scalars['String']>;
};


export type MutationDeleteUserLicenseArgs = {
  licenseId: Scalars['String'];
};


export type MutationSetDefaultLicenseIdArgs = {
  licenseId: Scalars['String'];
};


export type MutationAdminApproveUserLicenseArgs = {
  userId: Scalars['String'];
  licenseId: Scalars['String'];
  verified: Scalars['Boolean'];
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String'];
};


export type MutationAdminDeleteAccountArgs = {
  userId: Scalars['String'];
};


export type MutationUploadRegisterGoogleUrlArgs = {
  uploadType: UploadType;
  mimeType: Scalars['String'];
  fileSize: Scalars['Int'];
  claimId?: Maybe<Scalars['String']>;
};


export type MutationUploadSaveImageArgs = {
  uploadId: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  isInternal?: Maybe<Scalars['Boolean']>;
  rescrape?: Maybe<Scalars['Boolean']>;
  claimId?: Maybe<Scalars['String']>;
};


export type MutationUploadSaveFileArgs = {
  uploadId: Scalars['String'];
  fileName: Scalars['String'];
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type MutationFollowStoreArgs = {
  storeId: Scalars['String'];
  query?: Maybe<ConnectionQuery>;
};


export type MutationUnfollowStoreArgs = {
  storeId: Scalars['String'];
  query?: Maybe<ConnectionQuery>;
};


export type MutationCreateCollectionArgs = {
  name: Scalars['String'];
  privateCollection?: Maybe<Scalars['Boolean']>;
};


export type MutationDeleteCollectionArgs = {
  collectionId: Scalars['String'];
};


export type MutationEditCollectionArgs = {
  collectionId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  privateCollection?: Maybe<Scalars['Boolean']>;
};


export type MutationAddProductToCollectionArgs = {
  collectionId: Scalars['String'];
  productId?: Maybe<Scalars['String']>;
  externalProductId?: Maybe<Scalars['String']>;
};


export type MutationRemoveProductFromCollectionArgs = {
  collectionId: Scalars['String'];
  collectionItemId: Scalars['String'];
};


export type MutationCreateStoreArgs = {
  name?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['String']>;
  coverId?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};


export type MutationEditStoreProfileArgs = {
  name?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['String']>;
  coverId?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};


export type MutationDeleteStoreArgs = {
  password: Scalars['String'];
};


export type MutationAdminDeleteStoreArgs = {
  storeId: Scalars['String'];
};


export type MutationCreateProductArgs = {
  productCreateInput: ProductCreateInput;
  classifiedAdPaymentInput?: Maybe<ClassifiedAdPaymentInput>;
};


export type MutationEditProductArgs = {
  productEditInput?: Maybe<ProductEditInput>;
};


export type MutationPublishProductArgs = {
  productId: Scalars['String'];
};


export type MutationUnpublishProductArgs = {
  productId: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  productId: Scalars['String'];
};


export type MutationAdminDeleteProductArgs = {
  productId: Scalars['String'];
};


export type MutationSuspendUserArgs = {
  userId: Scalars['String'];
};


export type MutationUnsuspendUserArgs = {
  userId: Scalars['String'];
};


export type MutationSuspendUnsuspendProductArgs = {
  productId: Scalars['String'];
  isSuspended: Scalars['Boolean'];
};


export type MutationExcludeProductFromSearchArgs = {
  productId: Scalars['String'];
};


export type MutationIncludeProductInSearchArgs = {
  productId: Scalars['String'];
};


export type MutationSuspendUnsuspendStoreArgs = {
  storeId: Scalars['String'];
  isSuspended: Scalars['Boolean'];
};


export type MutationSetDefaultPaymentMethodArgs = {
  paymentMethodId: Scalars['String'];
  customerId: Scalars['String'];
};


export type MutationAddPaymentMethodArgs = {
  paymentMethodId: Scalars['String'];
  customerId: Scalars['String'];
};


export type MutationRemovePaymentMethodArgs = {
  paymentMethodId: Scalars['String'];
  customerId: Scalars['String'];
};


export type MutationCreatePayoutSplitArgs = {
  storeOrUserId: Scalars['String'];
  dealType: PayoutDealType;
  rate: Scalars['Float'];
  expiresAt?: Maybe<Scalars['Date']>;
  referrerId?: Maybe<Scalars['String']>;
};


export type MutationInsertOrReplacePromotedListArgs = {
  name: Scalars['String'];
};


export type MutationDeletePromotedListArgs = {
  listId: Scalars['String'];
};


export type MutationAddProductToPromotedListArgs = {
  promotedSlotId: Scalars['String'];
  promotedListId: Scalars['String'];
  productId: Scalars['String'];
  ownerId?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
};


export type MutationRemoveProductFromPromotedListArgs = {
  promotedListId: Scalars['String'];
  promotedSlotId: Scalars['String'];
};


export type MutationEditPromotedSlotArgs = {
  promotedSlotId: Scalars['String'];
  isAvailableForPurchase?: Maybe<Scalars['Boolean']>;
  reservePrice?: Maybe<Scalars['Int']>;
  durationInHours?: Maybe<Scalars['Int']>;
};


export type MutationPurchasePromotionArgs = {
  promotedSlotId: Scalars['String'];
  productId: Scalars['String'];
  total: Scalars['Int'];
  internationalFee: Scalars['Int'];
  buyerId: Scalars['String'];
  stripeCreatePaymentData: Scalars['String'];
  currency?: Maybe<Scalars['String']>;
  bidId?: Maybe<Scalars['String']>;
};


export type MutationAuthorizePaymentArgs = {
  productId: Scalars['String'];
  total: Scalars['Int'];
  internationalFee: Scalars['Int'];
  buyerLicenseId: Scalars['String'];
  stripeAuthorizePaymentData: Scalars['String'];
  bidId?: Maybe<Scalars['String']>;
};


export type MutationConfirmOrderArgs = {
  productId: Scalars['String'];
  total: Scalars['Int'];
  internationalFee: Scalars['Int'];
  buyerId: Scalars['String'];
  buyerLicenseId: Scalars['String'];
  sellerStoreId: Scalars['String'];
  paymentIntentId: Scalars['String'];
  bidId?: Maybe<Scalars['String']>;
};


export type MutationCancelPaymentIntentFailureArgs = {
  paymentIntentId: Scalars['String'];
};


export type MutationCapturePaymentForOrderArgs = {
  orderId: Scalars['String'];
};


export type MutationAddForm10Args = {
  orderId: Scalars['String'];
  form10FileId: Scalars['String'];
};


export type MutationRemoveForm10Args = {
  orderId: Scalars['String'];
};


export type MutationApproveForm10Args = {
  orderId: Scalars['String'];
};


export type MutationUnapproveForm10Args = {
  orderId: Scalars['String'];
};


export type MutationReviseAndResubmitForm10Args = {
  orderId: Scalars['String'];
};


export type MutationMarkPayoutsAsPaidArgs = {
  orderIds: Array<Scalars['String']>;
  payoutId: Scalars['String'];
};


export type MutationCancelOrderAndPaymentArgs = {
  orderId: Scalars['String'];
  markProductAbandoned?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateMockPreviewItemsArgs = {
  productPreviewItemInputs: Array<ProductPreviewItemInput>;
  variantId: Scalars['ID'];
  snapshotId: Scalars['ID'];
};


export type MutationSendTestPasswordChangedEmailArgs = {
  email?: Maybe<Scalars['String']>;
};


export type MutationSendPayoutDetailsChangedEmailArgs = {
  userId: Scalars['String'];
};


export type MutationSendConfirmedPaymentBuyerEmailArgs = {
  userId: Scalars['String'];
  orderId: Scalars['String'];
};


export type MutationSendConfirmedPaymentSellerEmailArgs = {
  userId: Scalars['String'];
  orderId: Scalars['String'];
};


export type MutationSendConfirmedPaymentAdminEmailArgs = {
  orderId: Scalars['String'];
};


export type MutationSendConfirmedPaymentDealerEmailArgs = {
  dealerId: Scalars['String'];
  sellerId: Scalars['String'];
  buyerId: Scalars['String'];
  orderId: Scalars['String'];
};


export type MutationSendRefundedBuyerEmailArgs = {
  userId: Scalars['String'];
  orderId: Scalars['String'];
};


export type MutationSendRefundedSellerEmailArgs = {
  userId: Scalars['String'];
  orderId: Scalars['String'];
};


export type MutationSendRefundedAdminEmailArgs = {
  orderId: Scalars['String'];
  buyerEmail: Scalars['String'];
};


export type MutationSendForm10ReviseAndResubmitSellerEmailArgs = {
  userId: Scalars['String'];
  orderId: Scalars['String'];
};


export type MutationSendForm10SubmittedAdminEmailArgs = {
  orderId: Scalars['String'];
  sellerEmail: Scalars['String'];
};


export type MutationSendForm10ApprovedBuyerEmailArgs = {
  userId: Scalars['String'];
  orderId: Scalars['String'];
};


export type MutationSendForm10ApprovedSellerEmailArgs = {
  userId: Scalars['String'];
  orderId: Scalars['String'];
};


export type MutationSendPayoutCompleteSellerEmailArgs = {
  userId: Scalars['String'];
  orderId: Scalars['String'];
};


export type MutationSendReviewRepublishOrRemoveSellerEmailArgs = {
  userId: Scalars['String'];
  productId: Scalars['String'];
};


export type MutationEditDealerArgs = {
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  licenseNumber?: Maybe<Scalars['String']>;
};


export type MutationEditDealerAsAdminArgs = {
  dealerId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  licenseNumber?: Maybe<Scalars['String']>;
};


export type MutationCreateNewDealerArgs = {
  name: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  licenseNumber: Scalars['String'];
};


export type MutationCreateDealerForUserArgs = {
  dealerUserId: Scalars['String'];
  name: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  licenseNumber: Scalars['String'];
};


export type MutationSetDealerIdForUserArgs = {
  dealerUserIdOrEmail: Scalars['String'];
  dealerId?: Maybe<Scalars['String']>;
};


export type MutationUnlinkUsersForDealerIdArgs = {
  dealerId: Scalars['String'];
};


export type MutationDeleteDealerAsAdminArgs = {
  dealerId: Scalars['String'];
};


export type MutationSendChatMessageArgs = {
  chatRoomId: Scalars['String'];
  senderId: Scalars['String'];
  content: Scalars['String'];
  previewItemId?: Maybe<Scalars['String']>;
};


export type MutationEmitTypingEventArgs = {
  senderId: Scalars['String'];
};


export type MutationSendBidMessageArgs = {
  chatRoomId: Scalars['String'];
  productId: Scalars['String'];
  productSnapshotId: Scalars['String'];
  variantId: Scalars['String'];
  offerPrice: Scalars['Int'];
  counterBidId?: Maybe<Scalars['String']>;
};


export type MutationUpdateBidArgs = {
  bidId: Scalars['String'];
  bidStatus: Scalars['String'];
};


export type MutationUpdateChatStatusArgs = {
  chatRoomId: Scalars['String'];
  chatRoomStatus: Scalars['String'];
  messageLimit?: Maybe<Scalars['Int']>;
};


export type MutationCreateInitialBidArgs = {
  productId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  messageLimit?: Maybe<Scalars['Int']>;
  productSnapshotId: Scalars['String'];
  variantId: Scalars['String'];
  offerPrice: Scalars['Int'];
};


export type MutationSaySomethingArgs = {
  message?: Maybe<Scalars['String']>;
};


export type MutationSignupToWaitlistArgs = {
  email: Scalars['String'];
};


export type MutationInsertUniqueProductViewArgs = {
  productId: Scalars['String'];
  userId: Scalars['String'];
  sellerUserId: Scalars['String'];
};


export type MutationInsertSavedSearchArgs = {
  categorySlug?: Maybe<Scalars['String']>;
  dealerState?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  caliber?: Maybe<Scalars['String']>;
};


export type MutationDeleteSavedSearchArgs = {
  savedSearchId: Scalars['String'];
};


export type MutationMarkSavedSearchHitsAsSeenArgs = {
  savedSearchHitsIds: Array<Scalars['String']>;
};


export type MutationCreateNewsItemWithExternalProductArgs = {
  externalProductCreateInput?: Maybe<ExternalProductCreateInput>;
  rescrape?: Maybe<Scalars['Boolean']>;
};


export type MutationMarkExternalProductAsSoldArgs = {
  sourceSiteId: Scalars['String'];
  soldText: Scalars['String'];
  isSold: Scalars['Boolean'];
  price?: Maybe<Scalars['Int']>;
  skipHrsToSold?: Maybe<Scalars['Boolean']>;
};


export type MutationEditExternalProductArgs = {
  externalProductId: Scalars['String'];
  externalProductCreateInput: ExternalProductCreateInput;
};


export type MutationSuspendUnsuspendNewsItemArgs = {
  newsItemId: Scalars['String'];
  isSuspended: Scalars['Boolean'];
};


export type MutationUpvoteNewsItemArgs = {
  newsItemId: Scalars['String'];
};


export type MutationDownvoteNewsItemArgs = {
  newsItemId: Scalars['String'];
};


export type MutationUnvoteNewsItemArgs = {
  newsItemId: Scalars['String'];
};


export type MutationRescrapeExternalProductArgs = {
  sourceSiteId: Scalars['String'];
  sourceSite: ScraperSourceSite;
  sourceSiteUrl?: Maybe<Scalars['String']>;
};


export type MutationSetNewsItemCategoryArgs = {
  newsItemId: Scalars['String'];
  categoryId: Scalars['String'];
};


export type MutationReindexProductOrNewsItemArgs = {
  productId?: Maybe<Scalars['String']>;
  newsItemId?: Maybe<Scalars['String']>;
};


export type MutationGenerateClaimProductRefIdArgs = {
  newsItemId: Scalars['String'];
};


export type MutationSwapImagesForExternalProductArgs = {
  claimId: Scalars['String'];
  newPreviewItems: Array<ProductPreviewItemInput>;
};


export type MutationMarkProductSoldArgs = {
  productId: Scalars['String'];
};

/** Something that went wrong during a mutation. */
export type MutationError = {
  __typename?: 'MutationError';
  /** Identifier of the issue, so a client app can know how to communicate the problem to the user. */
  code: Scalars['String'];
  /** message for a user to understand what went wrong. */
  debugMessage?: Maybe<Scalars['String']>;
  /** Technical message for developer to use if the issue arises during development. */
  error?: Maybe<Scalars['String']>;
};

/** Collection of one or more problems that happened during a mutation. */
export type MutationErrorSummary = {
  __typename?: 'MutationErrorSummary';
  /** The error or errors that were encountered trying to process the request. */
  errors?: Maybe<Array<Maybe<MutationError>>>;
  /** Indication of whether or not the problem could be overcome by retrying. */
  shouldRetry?: Maybe<Scalars['Boolean']>;
};

export type NewsItem = {
  __typename?: 'NewsItem';
  id: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
  externalProductId?: Maybe<Scalars['String']>;
  externalProduct?: Maybe<External_Products>;
  productId?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  /** uses only data from searchIndex/cache, faster than getting data from DB */
  productPreview?: Maybe<ProductPreview>;
  isDeleted: Scalars['Boolean'];
  isSuspended: Scalars['Boolean'];
  sourceSite?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  rankScore?: Maybe<Scalars['Float']>;
  votes?: Maybe<Array<Maybe<News_Item_Votes>>>;
  yourVote?: Maybe<News_Item_Votes>;
};

export type NewsItemsConnection = {
  __typename?: 'NewsItemsConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<NewsItemsEdge>;
  facetsDistribution?: Maybe<FacetsDistributionObject>;
};

export type NewsItemsEdge = {
  __typename?: 'NewsItemsEdge';
  node: NewsItem;
};

export type Order = {
  bid?: Maybe<Bid>;
  bidId?: Maybe<Scalars['String']>;
  buyer?: Maybe<BasicUser>;
  buyerId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  currency?: Maybe<Scalars['String']>;
  currentSnapshot?: Maybe<OrderSnapshot>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  orderSnapshots?: Maybe<Array<Maybe<OrderSnapshot>>>;
  /** orderSnapshots_aggregate: Order_Snapshots_Aggregate, */
  paymentIntentId?: Maybe<Scalars['String']>;
  payoutItems?: Maybe<Array<Maybe<Payout_Items>>>;
  /** payoutItems_aggregate: Payout_Items_Aggregate, */
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['String']>;
  productSnapshotId?: Maybe<Scalars['String']>;
  sellerStore?: Maybe<Store>;
  sellerStoreId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
  internationalFee?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Date']>;
  variantId?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
  buyerLicenseId?: Maybe<Scalars['String']>;
  buyerLicense?: Maybe<User_Licenses>;
};

export type OrderAdmin = Order & {
  __typename?: 'OrderAdmin';
  bid?: Maybe<Bid>;
  bidId?: Maybe<Scalars['String']>;
  buyer?: Maybe<UserPrivate>;
  buyerId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  currency?: Maybe<Scalars['String']>;
  currentSnapshot?: Maybe<OrderSnapshot>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  orderSnapshots?: Maybe<Array<Maybe<OrderSnapshot>>>;
  /** orderSnapshots_aggregate: Order_Snapshots_Aggregate, */
  paymentIntentId?: Maybe<Scalars['String']>;
  paymentIntent?: Maybe<PaymentIntent>;
  payoutItems?: Maybe<Array<Maybe<Payout_Items>>>;
  /** payoutItems_aggregate: Payout_Items_Aggregate, */
  product?: Maybe<ProductPrivate>;
  productId?: Maybe<Scalars['String']>;
  productSnapshotId?: Maybe<Scalars['String']>;
  sellerStore?: Maybe<StorePrivate>;
  sellerStoreId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
  internationalFee?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Date']>;
  variantId?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
  buyerLicenseId?: Maybe<Scalars['String']>;
  buyerLicense?: Maybe<User_Licenses>;
};

export type OrderConfirmMutationResponse = {
  __typename?: 'OrderConfirmMutationResponse';
  confirmedOrder: Order;
};

export type OrderDealer = Order & {
  __typename?: 'OrderDealer';
  bid?: Maybe<Bid>;
  bidId?: Maybe<Scalars['String']>;
  buyer?: Maybe<BasicUser>;
  buyerId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  currency?: Maybe<Scalars['String']>;
  currentSnapshot?: Maybe<OrderSnapshot>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  orderSnapshots?: Maybe<Array<Maybe<OrderSnapshot>>>;
  /** orderSnapshots_aggregate: Order_Snapshots_Aggregate, */
  paymentIntentId?: Maybe<Scalars['String']>;
  paymentIntent?: Maybe<PaymentIntent>;
  payoutItems?: Maybe<Array<Maybe<Payout_Items>>>;
  /** payoutItems_aggregate: Payout_Items_Aggregate, */
  product?: Maybe<ProductPrivate>;
  productId?: Maybe<Scalars['String']>;
  productSnapshotId?: Maybe<Scalars['String']>;
  sellerStore?: Maybe<Store>;
  sellerStoreId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
  internationalFee?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Date']>;
  variantId?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
  buyerLicenseId?: Maybe<Scalars['String']>;
  buyerLicense?: Maybe<User_Licenses>;
};

export type OrderMutationResponse = {
  __typename?: 'OrderMutationResponse';
  order: Order;
};

export type OrderPublic = Order & {
  __typename?: 'OrderPublic';
  bid?: Maybe<Bid>;
  bidId?: Maybe<Scalars['String']>;
  buyer?: Maybe<BasicUser>;
  buyerId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  currency?: Maybe<Scalars['String']>;
  currentSnapshot?: Maybe<OrderSnapshot>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  orderSnapshots?: Maybe<Array<Maybe<OrderSnapshot>>>;
  /** orderSnapshots_aggregate: Order_Snapshots_Aggregate, */
  paymentIntentId?: Maybe<Scalars['String']>;
  payoutItems?: Maybe<Array<Maybe<Payout_Items>>>;
  /** payoutItems_aggregate: Payout_Items_Aggregate, */
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['String']>;
  productSnapshotId?: Maybe<Scalars['String']>;
  sellerStore?: Maybe<Store>;
  sellerStoreId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
  internationalFee?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Date']>;
  variantId?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
  buyerLicenseId?: Maybe<Scalars['String']>;
  buyerLicense?: Maybe<User_Licenses>;
};

export type OrderSnapshot = {
  __typename?: 'OrderSnapshot';
  /** An object relationship */
  adminApprover?: Maybe<UserWithMobileNumber>;
  adminApproverId?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamp'];
  /** An object relationship */
  form10Image?: Maybe<Image_Parents>;
  form10ImageId?: Maybe<Scalars['String']>;
  form10File?: Maybe<Product_Files>;
  form10FileId?: Maybe<Scalars['String']>;
  disposalTimeHrs?: Maybe<Scalars['numeric']>;
  approvalTimeHrs?: Maybe<Scalars['numeric']>;
  id: Scalars['String'];
  orderId: Scalars['String'];
  orderStatus: Scalars['String'];
  /** An object relationship */
  refund?: Maybe<Refunds>;
  refundId?: Maybe<Scalars['String']>;
  /** An object relationship */
  transaction?: Maybe<Transactions>;
  transactionId?: Maybe<Scalars['String']>;
};

/** Order Status for individual items. */
export enum OrderStatus {
  /** step 1, buyer purchases item */
  CREATED = 'CREATED',
  /** step 1a: payment authorization success */
  CONFIRMED_PAYMENT_FORM_10_REQUIRED = 'CONFIRMED_PAYMENT_FORM_10_REQUIRED',
  /** step 1b: payment authorization failed */
  FAILED = 'FAILED',
  /** step 1c: payment authorization was cancelled (not captured) */
  CANCELLED = 'CANCELLED',
  /** step 1d: payment refunded (should not reach this state unless emergency) */
  REFUNDED = 'REFUNDED',
  /** step 2, seller delivers product, submits receipt form 10 */
  FORM_10_SUBMITTED = 'FORM_10_SUBMITTED',
  /** step 3a, admin checks and rejects uploaded form10, prompt seller to resubmit */
  FORM_10_REVISE_AND_RESUBMIT = 'FORM_10_REVISE_AND_RESUBMIT',
  /** step 3b, admin checks and approves uploaded form10, payment is captured here */
  ADMIN_APPROVED = 'ADMIN_APPROVED',
  /** step 4, payout completed, westpac transaction ID inputted */
  COMPLETE = 'COMPLETE'
}

export type OrdersConnection = Connection & {
  __typename?: 'OrdersConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<OrdersEdge>;
};

export type OrdersEdge = {
  __typename?: 'OrdersEdge';
  node: Order;
};

export type OrdersGroupedByDay = {
  __typename?: 'OrdersGroupedByDay';
  day?: Maybe<Scalars['Date']>;
  orderIds: Array<Scalars['String']>;
};

export type PageConfig = {
  __typename?: 'PageConfig';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  urlPath?: Maybe<Scalars['String']>;
  pageConfigSections?: Maybe<Array<Maybe<PageConfigSection>>>;
};

export type PageConfigSection = {
  __typename?: 'PageConfigSection';
  id: Scalars['ID'];
  pageConfigId: Scalars['ID'];
  viewAllPath: Scalars['String'];
  hideViewAll: Scalars['Boolean'];
  promotedListId?: Maybe<Scalars['ID']>;
  isNewestList?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  isLastPage?: Maybe<Scalars['Boolean']>;
  totalPages?: Maybe<Scalars['Int']>;
};

export enum PayeeType {
  /** Store */
  STORE = 'STORE',
  /** Dealer */
  DEALER = 'DEALER',
  /** Gun Marketplace */
  PLATFORM = 'PLATFORM'
}

export type PaymentIntent = {
  __typename?: 'PaymentIntent';
  id?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Int']>;
  amountCapturable?: Maybe<Scalars['Int']>;
  amountReceived?: Maybe<Scalars['Int']>;
  captureMethod?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  currency?: Maybe<Scalars['String']>;
  liveMode?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['String']>;
};

/** Payment Processor Company */
export enum PaymentProcessor {
  STRIPE = 'Stripe',
  STRIPEDOMESTIC = 'StripeDomestic',
  PAYPAL = 'Paypal',
  APPLEPAY = 'ApplePay',
  GOOGLEPAY = 'GooglePay',
  NOPAYMENTFEES = 'NoPaymentFees'
}

export type PayoutAggregate = {
  __typename?: 'PayoutAggregate';
  sum?: Maybe<PayoutSum>;
};

export enum PayoutDealType {
  /** What a seller receives. */
  SELLER = 'SELLER',
  /** What a dealer seller receives. */
  DEALER = 'DEALER'
}

export type PayoutItem = {
  __typename?: 'PayoutItem';
  id: Scalars['ID'];
  storeId: Scalars['ID'];
  payeeType: PayeeType;
  store?: Maybe<StorePrivate>;
  amount: Scalars['Price'];
  paymentProcessingFee: Scalars['Price'];
  createdAt: Scalars['Date'];
  payoutStatus: PayoutStatus;
  currency?: Maybe<Scalars['String']>;
  orderId: Scalars['ID'];
  order?: Maybe<Orders>;
  txnId: Scalars['ID'];
  transaction?: Maybe<Transactions>;
  payoutId?: Maybe<Scalars['ID']>;
  internationalFee?: Maybe<Scalars['Price']>;
};

export type PayoutItemsConnection = {
  __typename?: 'PayoutItemsConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<Payout_Items>;
};

export type PayoutMethodMutationResponse = {
  __typename?: 'PayoutMethodMutationResponse';
  payoutMethod: Payout_Methods;
};

/** PayoutSplit */
export type PayoutSplit = {
  __typename?: 'PayoutSplit';
  id: Scalars['ID'];
  storeOrUserId: Scalars['ID'];
  createdAt: Scalars['Date'];
  dealType: PayoutDealType;
  expiresAt?: Maybe<Scalars['Date']>;
  rate: Scalars['Float'];
  referrerId?: Maybe<Scalars['ID']>;
};

export enum PayoutStatus {
  /** UNPAID */
  UNPAID = 'UNPAID',
  /** Seller did not put down a payout method */
  MISSING_PAYOUT_METHOD = 'MISSING_PAYOUT_METHOD',
  /** Payout retained by platform */
  RETAINED = 'RETAINED',
  /** Payout processed and confirmed by payout provider */
  PAID = 'PAID'
}

export type PayoutSum = {
  __typename?: 'PayoutSum';
  amount?: Maybe<Scalars['Int']>;
  paymentProcessingFee?: Maybe<Scalars['Int']>;
  taxes?: Maybe<Scalars['Int']>;
  internationalFee?: Maybe<Scalars['Int']>;
};

export type PayoutSummary = {
  __typename?: 'PayoutSummary';
  nodes?: Maybe<Array<Maybe<Payout_Items>>>;
  aggregate?: Maybe<PayoutAggregate>;
};


/** Something that can be bought */
export type Product = {
  /** Metadata */
  id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  categoryId: Scalars['ID'];
  category?: Maybe<Categories>;
  storeId: Scalars['ID'];
  store?: Maybe<Store>;
  /** Whether or not the product owner has published it */
  isPublished: Scalars['Boolean'];
  /** Whether or not a platform admin has unpublished it */
  isSuspended: Scalars['Boolean'];
  /** Whether or not it has been deleted */
  isDeleted: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it from automatic lists */
  isSoldElsewhere: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it from search results */
  isExcludedFromSearch: Scalars['Boolean'];
  /** Whether or not it has been sold */
  soldOutStatus: Scalars['String'];
  /** All editable attributes in ProductSnapshots and ProductSnapshots.currentVariants */
  currentSnapshotId: Scalars['String'];
  currentSnapshot: Product_Snapshots;
  featuredVariant: Product_Variants;
  uniqueProductViews?: Maybe<Unique_Product_Views_Aggregate>;
  sellerLicenseId?: Maybe<Scalars['String']>;
  sellerLicense?: Maybe<User_Licenses>;
  /** Allow bidding on this product */
  allowBids?: Maybe<Scalars['Boolean']>;
  listingType?: Maybe<ListingType>;
  productType?: Maybe<ProductType>;
  newsItem?: Maybe<NewsItem>;
};

/** Classified Ad Product */
export type ProductClassifiedAd = Product & {
  __typename?: 'ProductClassifiedAd';
  /** Metadata */
  id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  categoryId: Scalars['ID'];
  category?: Maybe<Categories>;
  storeId: Scalars['ID'];
  store?: Maybe<StoreClassifiedAd>;
  /** Whether or not the product owner has published it */
  isPublished: Scalars['Boolean'];
  /** Whether or not a platform admin has unpublished it */
  isSuspended: Scalars['Boolean'];
  /** Whether or not it has been deleted */
  isDeleted: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it from automatic lists */
  isSoldElsewhere: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it from search results */
  isExcludedFromSearch: Scalars['Boolean'];
  /** Whether or not it has been sold */
  soldOutStatus: Scalars['String'];
  /** All editable attributes in ProductSnapshots and ProductSnapshots.currentVariants */
  currentSnapshotId: Scalars['String'];
  currentSnapshot: Product_Snapshots;
  featuredVariant: Product_Variants;
  uniqueProductViews?: Maybe<Unique_Product_Views_Aggregate>;
  sellerLicenseId?: Maybe<Scalars['String']>;
  sellerLicense?: Maybe<User_Licenses>;
  /** Allow bidding on this product */
  allowBids?: Maybe<Scalars['Boolean']>;
  listingType?: Maybe<ListingType>;
  productType?: Maybe<ProductType>;
  newsItem?: Maybe<NewsItem>;
};

export type ProductCreateInput = {
  /**
   * ID of the seller's firearm license to file the product under.
   * Gun has to match the right firearm license when the seller disposese the gun
   */
  sellerLicenseId: Scalars['ID'];
  /**  ID of the category to file the product under.   */
  categoryId: Scalars['ID'];
  /**  The set of available variants.   */
  currentVariants: Array<ProductVariantInput>;
  /**  Whether or not to put the item up for sale.   */
  isPublished: Scalars['Boolean'];
  title: Scalars['String'];
  description: Scalars['String'];
  condition: Scalars['String'];
  make: Scalars['String'];
  model: Scalars['String'];
  ammoType?: Maybe<Scalars['String']>;
  actionType?: Maybe<Scalars['String']>;
  caliber: Scalars['String'];
  serialNumber: Scalars['String'];
  location: Scalars['String'];
  /** dealerId optional for CLASSIFIED_AD but required for ESCROW */
  dealerId?: Maybe<Scalars['String']>;
  /** dealer: InsertDealerInput */
  magazineCapacity?: Maybe<Scalars['String']>;
  barrelLength?: Maybe<Scalars['String']>;
  allowBids?: Maybe<Scalars['Boolean']>;
  listingType: ListingType;
  productType: ProductType;
};

export type ProductEditInput = {
  productId: Scalars['ID'];
  /**
   * ID of the seller's firearm license to file the product under.
   * Gun has to match the right firearm license when the seller disposese the gun
   */
  sellerLicenseId: Scalars['ID'];
  categoryId: Scalars['ID'];
  currentVariants: Array<ProductVariantEditInput>;
  isPublished: Scalars['Boolean'];
  title: Scalars['String'];
  description: Scalars['String'];
  condition: Scalars['String'];
  make: Scalars['String'];
  model: Scalars['String'];
  ammoType?: Maybe<Scalars['String']>;
  actionType?: Maybe<Scalars['String']>;
  caliber: Scalars['String'];
  serialNumber: Scalars['String'];
  location: Scalars['String'];
  /** dealerId optional for CLASSIFIED_AD but required for ESCROW */
  dealerId?: Maybe<Scalars['String']>;
  /** dealer: InsertDealerInput */
  magazineCapacity?: Maybe<Scalars['String']>;
  barrelLength?: Maybe<Scalars['String']>;
  allowBids?: Maybe<Scalars['Boolean']>;
  listingType: ListingType;
  productType?: Maybe<ProductType>;
};

/** Critical information about a file within a product */
export type ProductFile = {
  __typename?: 'ProductFile';
  id: Scalars['ID'];
  fileName?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  mimeType: Scalars['String'];
  sizeInBytes: Scalars['Int'];
};

/** Wrapping of temporary download link for a product file */
export type ProductFileDownloadLink = {
  __typename?: 'ProductFileDownloadLink';
  productFileId: Scalars['ID'];
  url: Scalars['String'];
  expiresAt: Scalars['Date'];
};

export type ProductListingMutationResponse = {
  __typename?: 'ProductListingMutationResponse';
  product: Product;
  stripePaymentIntent?: Maybe<Scalars['String']>;
  classifiedAdPurchase?: Maybe<Classified_Ad_Purchases>;
  newsItemId?: Maybe<Scalars['String']>;
};

export type ProductMutationResponse = {
  __typename?: 'ProductMutationResponse';
  product: Product;
};

/** Product Preview for both Internal and External Products */
export type ProductPreview = {
  __typename?: 'ProductPreview';
  id: Scalars['String'];
  createdAt?: Maybe<Scalars['Date']>;
  featuredPreviewItemId?: Maybe<Scalars['String']>;
  /** only 1, even thouse typename is plural cuz of hasura naming convention */
  featuredPreview?: Maybe<Product_Preview_Items>;
  title?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  caliber?: Maybe<Scalars['String']>;
  actionType?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  priceWas?: Maybe<Scalars['Int']>;
  isSuspended: Scalars['Boolean'];
  isSoldElsewhere?: Maybe<Scalars['Boolean']>;
  soldOutStatus: Scalars['String'];
  sellerLicenseVerified?: Maybe<Scalars['Boolean']>;
  sellerLicenseId?: Maybe<Scalars['String']>;
  dealerState?: Maybe<Scalars['String']>;
  sourceSiteUrl?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  listingType?: Maybe<ListingType>;
  sellerLicenseNumber?: Maybe<Scalars['String']>;
  serialNumber?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  adType?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
};

/** An item that shows off the product (image, YouTube link, hosted videos to come) */
export type ProductPreviewItem = {
  __typename?: 'ProductPreviewItem';
  id: Scalars['ID'];
  imageId?: Maybe<Scalars['ID']>;
  image?: Maybe<Image_Parents>;
  youTubeEmbedLink?: Maybe<Scalars['String']>;
};

export type ProductPreviewItemInput = {
  /** ID of uploaded product image or a link to YouTube embedded video */
  imageId?: Maybe<Scalars['ID']>;
  youTubeEmbedLink?: Maybe<Scalars['String']>;
  isInternal?: Maybe<Scalars['Boolean']>;
};

export type ProductPreviewsConnection = Connection & {
  __typename?: 'ProductPreviewsConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<ProductPreviewsEdge>;
};

export type ProductPreviewsEdge = {
  __typename?: 'ProductPreviewsEdge';
  node: ProductPreview;
};

/** Private information about something that can be bought */
export type ProductPrivate = Product & {
  __typename?: 'ProductPrivate';
  /** Metadata */
  id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  categoryId: Scalars['ID'];
  category?: Maybe<Categories>;
  storeId: Scalars['ID'];
  store?: Maybe<StorePrivate>;
  /** Whether or not the product owner has published it */
  isPublished: Scalars['Boolean'];
  /** Whether or not a platform admin has unpublished it */
  isSuspended: Scalars['Boolean'];
  /** Whether or not it has been deleted */
  isDeleted: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it from automatic lists */
  isSoldElsewhere: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it from search results */
  isExcludedFromSearch: Scalars['Boolean'];
  /** Whether or not it has been sold */
  soldOutStatus: Scalars['String'];
  /** All editable attributes in ProductSnapshots and ProductSnapshots.currentVariants */
  currentSnapshotId: Scalars['String'];
  currentSnapshot: Product_Snapshots;
  featuredVariant: Product_Variants;
  uniqueProductViews?: Maybe<Unique_Product_Views_Aggregate>;
  sellerLicenseId?: Maybe<Scalars['String']>;
  sellerLicense?: Maybe<User_Licenses>;
  /** Allow bidding on this product */
  allowBids?: Maybe<Scalars['Boolean']>;
  listingType?: Maybe<ListingType>;
  productType?: Maybe<ProductType>;
  newsItem?: Maybe<NewsItem>;
};

export type ProductProductVariantId = {
  productId: Scalars['ID'];
  variantId: Scalars['ID'];
  quantity?: Maybe<Scalars['Int']>;
};

/** Public information about something that can be bought */
export type ProductPublic = Product & {
  __typename?: 'ProductPublic';
  /** Metadata */
  id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  categoryId: Scalars['ID'];
  category?: Maybe<Categories>;
  storeId: Scalars['ID'];
  store?: Maybe<Store>;
  /** Whether or not the product owner has published it */
  isPublished: Scalars['Boolean'];
  /** Whether or not a platform admin has unpublished it */
  isSuspended: Scalars['Boolean'];
  /** Whether or not it has been deleted */
  isDeleted: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it from automatic lists */
  isSoldElsewhere: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it from search results */
  isExcludedFromSearch: Scalars['Boolean'];
  /** Whether or not it has been sold */
  soldOutStatus: Scalars['String'];
  /** All editable attributes in ProductSnapshots and ProductSnapshots.currentVariants */
  currentSnapshotId: Scalars['String'];
  currentSnapshot: Product_Snapshots;
  featuredVariant: Product_Variants;
  uniqueProductViews?: Maybe<Unique_Product_Views_Aggregate>;
  sellerLicenseId?: Maybe<Scalars['String']>;
  sellerLicense?: Maybe<User_Licenses>;
  /** Allow bidding on this product */
  allowBids?: Maybe<Scalars['Boolean']>;
  listingType?: Maybe<ListingType>;
  productType?: Maybe<ProductType>;
  newsItem?: Maybe<NewsItem>;
};

export enum ProductType {
  FIREARM = 'FIREARM',
  ITEM = 'ITEM'
}

export type ProductVariantEditInput = {
  /** When the variant already exists, provide ID, otherwise provide null because it's new */
  variantId?: Maybe<Scalars['ID']>;
  variantName: Scalars['String'];
  variantDescription: Scalars['String'];
  isDefault: Scalars['Boolean'];
  /**  Price (now) for the product variant  */
  price: Scalars['Price'];
  /**  Original price when product was first uploaded  */
  priceWas?: Maybe<Scalars['Price']>;
  /**
   * Set of product preview items.
   * Will be sorted as per the provided order, and cannot be empty.
   */
  previewItems: Array<ProductPreviewItemInput>;
};

export type ProductVariantInput = {
  /**  What to call the product variant  */
  variantName: Scalars['String'];
  /**  A whole bunch of words to describe the product variant */
  variantDescription: Scalars['String'];
  isDefault: Scalars['Boolean'];
  /**  Price (now) for the product variant  */
  price: Scalars['Price'];
  /**  Original price when product was first uploaded  */
  priceWas?: Maybe<Scalars['Price']>;
  /**
   * Set of product preview items.
   * Will be sorted as per the provided order, and cannot be empty.
   */
  previewItems: Array<ProductPreviewItemInput>;
};

export type ProductsConnection = Connection & {
  __typename?: 'ProductsConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<ProductsEdge>;
  facetsDistribution?: Maybe<FacetsDistributionObject>;
};

export type ProductsEdge = {
  __typename?: 'ProductsEdge';
  node: Product;
};

export type ProductsMutationResponse = {
  __typename?: 'ProductsMutationResponse';
  products: Array<Product>;
};

export type PromotedList = {
  __typename?: 'PromotedList';
  id: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
  numberOfSlots?: Maybe<Scalars['Int']>;
  categoryFilterSlug?: Maybe<Scalars['String']>;
  /** promotedSlots: [PromotedSlot] */
  promotedSlotsConnection?: Maybe<PromotedSlotsConnection>;
  cardsPerRow?: Maybe<Scalars['Int']>;
};

export type PromotedListMutationResponse = {
  __typename?: 'PromotedListMutationResponse';
  promotedList: PromotedList;
};

export type PromotedSlot = {
  __typename?: 'PromotedSlot';
  id: Scalars['ID'];
  createdAt: Scalars['Date'];
  promotedListId: Scalars['ID'];
  productId?: Maybe<Scalars['ID']>;
  product?: Maybe<Product>;
  productPreview?: Maybe<ProductPreview>;
  ownerId?: Maybe<Scalars['ID']>;
  reservePrice?: Maybe<Scalars['Int']>;
  isAvailableForPurchase: Scalars['Boolean'];
  expiresAt?: Maybe<Scalars['Date']>;
  position?: Maybe<Scalars['Int']>;
  isRandomFiller?: Maybe<Scalars['Boolean']>;
  durationInHours?: Maybe<Scalars['numeric']>;
};

export type PromotedSlotMutationResponse = {
  __typename?: 'PromotedSlotMutationResponse';
  promotedSlot: PromotedSlot;
};

export type PromotedSlotsConnection = {
  __typename?: 'PromotedSlotsConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<PromotedSlotsEdge>;
};

export type PromotedSlotsEdge = {
  __typename?: 'PromotedSlotsEdge';
  node: PromotedSlot;
};

export type PromotionPurchaseMutationResponse = {
  __typename?: 'PromotionPurchaseMutationResponse';
  promotionPurchase: Promotion_Purchases;
  promotedSlot: PromotedSlot;
  stripePaymentIntent: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** fetch data from the table: "bids" */
  bids: Array<Bids>;
  /** fetch aggregated fields from the table: "bids" */
  bids_aggregate: Bids_Aggregate;
  /** fetch data from the table: "bids" using primary key columns */
  bids_by_pk?: Maybe<Bids>;
  /** fetch data from the table: "calibers" */
  calibers: Array<Calibers>;
  /** fetch aggregated fields from the table: "calibers" */
  calibers_aggregate: Calibers_Aggregate;
  /** fetch data from the table: "calibers" using primary key columns */
  calibers_by_pk?: Maybe<Calibers>;
  /** fetch data from the table: "categories" */
  categories: Array<Categories>;
  /** fetch aggregated fields from the table: "categories" */
  categories_aggregate: Categories_Aggregate;
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>;
  /** fetch data from the table: "chat_messages" */
  chat_messages: Array<Chat_Messages>;
  /** fetch aggregated fields from the table: "chat_messages" */
  chat_messages_aggregate: Chat_Messages_Aggregate;
  /** fetch data from the table: "chat_messages" using primary key columns */
  chat_messages_by_pk?: Maybe<Chat_Messages>;
  /** fetch data from the table: "chat_rooms" */
  chat_rooms: Array<Chat_Rooms>;
  /** fetch aggregated fields from the table: "chat_rooms" */
  chat_rooms_aggregate: Chat_Rooms_Aggregate;
  /** fetch data from the table: "chat_rooms" using primary key columns */
  chat_rooms_by_pk?: Maybe<Chat_Rooms>;
  /** fetch data from the table: "chat_users" */
  chat_users: Array<Chat_Users>;
  /** fetch aggregated fields from the table: "chat_users" */
  chat_users_aggregate: Chat_Users_Aggregate;
  /** fetch data from the table: "chat_users" using primary key columns */
  chat_users_by_pk?: Maybe<Chat_Users>;
  /** fetch data from the table: "classified_ad_purchases" */
  classified_ad_purchases: Array<Classified_Ad_Purchases>;
  /** fetch aggregated fields from the table: "classified_ad_purchases" */
  classified_ad_purchases_aggregate: Classified_Ad_Purchases_Aggregate;
  /** fetch data from the table: "classified_ad_purchases" using primary key columns */
  classified_ad_purchases_by_pk?: Maybe<Classified_Ad_Purchases>;
  /** fetch data from the table: "collection_items" */
  collection_items: Array<Collection_Items>;
  /** fetch aggregated fields from the table: "collection_items" */
  collection_items_aggregate: Collection_Items_Aggregate;
  /** fetch data from the table: "collection_items" using primary key columns */
  collection_items_by_pk?: Maybe<Collection_Items>;
  /** fetch data from the table: "collections" */
  collections: Array<Collections>;
  /** fetch aggregated fields from the table: "collections" */
  collections_aggregate: Collections_Aggregate;
  /** fetch data from the table: "collections" using primary key columns */
  collections_by_pk?: Maybe<Collections>;
  /** fetch data from the table: "dealers" */
  dealers: Array<Dealers>;
  /** fetch aggregated fields from the table: "dealers" */
  dealers_aggregate: Dealers_Aggregate;
  /** fetch data from the table: "dealers" using primary key columns */
  dealers_by_pk?: Maybe<Dealers>;
  /** fetch data from the table: "email_subscriptions" */
  email_subscriptions: Array<Email_Subscriptions>;
  /** fetch aggregated fields from the table: "email_subscriptions" */
  email_subscriptions_aggregate: Email_Subscriptions_Aggregate;
  /** fetch data from the table: "email_subscriptions" using primary key columns */
  email_subscriptions_by_pk?: Maybe<Email_Subscriptions>;
  /** fetch data from the table: "emails" */
  emails: Array<Emails>;
  /** fetch aggregated fields from the table: "emails" */
  emails_aggregate: Emails_Aggregate;
  /** fetch data from the table: "emails" using primary key columns */
  emails_by_pk?: Maybe<Emails>;
  /** fetch data from the table: "external_product_snapshots" */
  external_product_snapshots: Array<External_Product_Snapshots>;
  /** fetch aggregated fields from the table: "external_product_snapshots" */
  external_product_snapshots_aggregate: External_Product_Snapshots_Aggregate;
  /** fetch data from the table: "external_product_snapshots" using primary key columns */
  external_product_snapshots_by_pk?: Maybe<External_Product_Snapshots>;
  /** fetch data from the table: "external_products" */
  external_products: Array<External_Products>;
  /** fetch aggregated fields from the table: "external_products" */
  external_products_aggregate: External_Products_Aggregate;
  /** fetch data from the table: "external_products" using primary key columns */
  external_products_by_pk?: Maybe<External_Products>;
  /** fetch data from the table: "image_owners" */
  image_owners: Array<Image_Owners>;
  /** fetch aggregated fields from the table: "image_owners" */
  image_owners_aggregate: Image_Owners_Aggregate;
  /** fetch data from the table: "image_owners" using primary key columns */
  image_owners_by_pk?: Maybe<Image_Owners>;
  /** fetch data from the table: "image_parents" */
  image_parents: Array<Image_Parents>;
  /** fetch aggregated fields from the table: "image_parents" */
  image_parents_aggregate: Image_Parents_Aggregate;
  /** fetch data from the table: "image_parents" using primary key columns */
  image_parents_by_pk?: Maybe<Image_Parents>;
  /** fetch data from the table: "image_variants" */
  image_variants: Array<Image_Variants>;
  /** fetch aggregated fields from the table: "image_variants" */
  image_variants_aggregate: Image_Variants_Aggregate;
  /** fetch data from the table: "image_variants" using primary key columns */
  image_variants_by_pk?: Maybe<Image_Variants>;
  /** execute function "list_products_random" which returns "products" */
  list_products_random: Array<Products>;
  /** execute function "list_products_random" and query aggregates on result of table type "products" */
  list_products_random_aggregate: Products_Aggregate;
  /** fetch data from the table: "migrations" */
  migrations: Array<Migrations>;
  /** fetch aggregated fields from the table: "migrations" */
  migrations_aggregate: Migrations_Aggregate;
  /** fetch data from the table: "migrations" using primary key columns */
  migrations_by_pk?: Maybe<Migrations>;
  /** fetch data from the table: "news_item_votes" */
  news_item_votes: Array<News_Item_Votes>;
  /** fetch aggregated fields from the table: "news_item_votes" */
  news_item_votes_aggregate: News_Item_Votes_Aggregate;
  /** fetch data from the table: "news_item_votes" using primary key columns */
  news_item_votes_by_pk?: Maybe<News_Item_Votes>;
  /** fetch data from the table: "news_items" */
  news_items: Array<News_Items>;
  /** fetch aggregated fields from the table: "news_items" */
  news_items_aggregate: News_Items_Aggregate;
  /** fetch data from the table: "news_items" using primary key columns */
  news_items_by_pk?: Maybe<News_Items>;
  /** fetch data from the table: "order_snapshots" */
  order_snapshots: Array<Order_Snapshots>;
  /** fetch aggregated fields from the table: "order_snapshots" */
  order_snapshots_aggregate: Order_Snapshots_Aggregate;
  /** fetch data from the table: "order_snapshots" using primary key columns */
  order_snapshots_by_pk?: Maybe<Order_Snapshots>;
  /** fetch data from the table: "orders" */
  orders: Array<Orders>;
  /** fetch aggregated fields from the table: "orders" */
  orders_aggregate: Orders_Aggregate;
  /** fetch data from the table: "orders_approved_grouped_by_day" */
  orders_approved_grouped_by_day: Array<Orders_Approved_Grouped_By_Day>;
  /** fetch aggregated fields from the table: "orders_approved_grouped_by_day" */
  orders_approved_grouped_by_day_aggregate: Orders_Approved_Grouped_By_Day_Aggregate;
  /** fetch data from the table: "orders" using primary key columns */
  orders_by_pk?: Maybe<Orders>;
  /** fetch data from the table: "orders_complete_grouped_by_day" */
  orders_complete_grouped_by_day: Array<Orders_Complete_Grouped_By_Day>;
  /** fetch aggregated fields from the table: "orders_complete_grouped_by_day" */
  orders_complete_grouped_by_day_aggregate: Orders_Complete_Grouped_By_Day_Aggregate;
  /** fetch data from the table: "page_config_sections" */
  page_config_sections: Array<Page_Config_Sections>;
  /** fetch aggregated fields from the table: "page_config_sections" */
  page_config_sections_aggregate: Page_Config_Sections_Aggregate;
  /** fetch data from the table: "page_config_sections" using primary key columns */
  page_config_sections_by_pk?: Maybe<Page_Config_Sections>;
  /** fetch data from the table: "page_configs" */
  page_configs: Array<Page_Configs>;
  /** fetch aggregated fields from the table: "page_configs" */
  page_configs_aggregate: Page_Configs_Aggregate;
  /** fetch data from the table: "page_configs" using primary key columns */
  page_configs_by_pk?: Maybe<Page_Configs>;
  /** fetch data from the table: "payment_methods" */
  payment_methods: Array<Payment_Methods>;
  /** fetch aggregated fields from the table: "payment_methods" */
  payment_methods_aggregate: Payment_Methods_Aggregate;
  /** fetch data from the table: "payment_methods" using primary key columns */
  payment_methods_by_pk?: Maybe<Payment_Methods>;
  /** fetch data from the table: "payout_items" */
  payout_items: Array<Payout_Items>;
  /** fetch aggregated fields from the table: "payout_items" */
  payout_items_aggregate: Payout_Items_Aggregate;
  /** fetch data from the table: "payout_items" using primary key columns */
  payout_items_by_pk?: Maybe<Payout_Items>;
  /** fetch data from the table: "payout_methods" */
  payout_methods: Array<Payout_Methods>;
  /** fetch aggregated fields from the table: "payout_methods" */
  payout_methods_aggregate: Payout_Methods_Aggregate;
  /** fetch data from the table: "payout_methods" using primary key columns */
  payout_methods_by_pk?: Maybe<Payout_Methods>;
  /** fetch data from the table: "phone_numbers" */
  phone_numbers: Array<Phone_Numbers>;
  /** fetch aggregated fields from the table: "phone_numbers" */
  phone_numbers_aggregate: Phone_Numbers_Aggregate;
  /** fetch data from the table: "phone_numbers" using primary key columns */
  phone_numbers_by_pk?: Maybe<Phone_Numbers>;
  /** fetch data from the table: "product_file_owners" */
  product_file_owners: Array<Product_File_Owners>;
  /** fetch aggregated fields from the table: "product_file_owners" */
  product_file_owners_aggregate: Product_File_Owners_Aggregate;
  /** fetch data from the table: "product_file_owners" using primary key columns */
  product_file_owners_by_pk?: Maybe<Product_File_Owners>;
  /** fetch data from the table: "product_files" */
  product_files: Array<Product_Files>;
  /** fetch aggregated fields from the table: "product_files" */
  product_files_aggregate: Product_Files_Aggregate;
  /** fetch data from the table: "product_files" using primary key columns */
  product_files_by_pk?: Maybe<Product_Files>;
  /** fetch data from the table: "product_preview_items" */
  product_preview_items: Array<Product_Preview_Items>;
  /** fetch aggregated fields from the table: "product_preview_items" */
  product_preview_items_aggregate: Product_Preview_Items_Aggregate;
  /** fetch data from the table: "product_preview_items" using primary key columns */
  product_preview_items_by_pk?: Maybe<Product_Preview_Items>;
  /** fetch data from the table: "product_snapshots" */
  product_snapshots: Array<Product_Snapshots>;
  /** fetch aggregated fields from the table: "product_snapshots" */
  product_snapshots_aggregate: Product_Snapshots_Aggregate;
  /** fetch data from the table: "product_snapshots" using primary key columns */
  product_snapshots_by_pk?: Maybe<Product_Snapshots>;
  /** fetch data from the table: "product_variants" */
  product_variants: Array<Product_Variants>;
  /** fetch aggregated fields from the table: "product_variants" */
  product_variants_aggregate: Product_Variants_Aggregate;
  /** fetch data from the table: "product_variants" using primary key columns */
  product_variants_by_pk?: Maybe<Product_Variants>;
  /** An array relationship */
  products: Array<Products>;
  /** An aggregate relationship */
  products_aggregate: Products_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "promoted_lists" */
  promoted_lists: Array<Promoted_Lists>;
  /** fetch aggregated fields from the table: "promoted_lists" */
  promoted_lists_aggregate: Promoted_Lists_Aggregate;
  /** fetch data from the table: "promoted_lists" using primary key columns */
  promoted_lists_by_pk?: Maybe<Promoted_Lists>;
  /** fetch data from the table: "promoted_slots" */
  promoted_slots: Array<Promoted_Slots>;
  /** fetch aggregated fields from the table: "promoted_slots" */
  promoted_slots_aggregate: Promoted_Slots_Aggregate;
  /** fetch data from the table: "promoted_slots" using primary key columns */
  promoted_slots_by_pk?: Maybe<Promoted_Slots>;
  /** fetch data from the table: "promotion_purchases" */
  promotion_purchases: Array<Promotion_Purchases>;
  /** fetch aggregated fields from the table: "promotion_purchases" */
  promotion_purchases_aggregate: Promotion_Purchases_Aggregate;
  /** fetch data from the table: "promotion_purchases" using primary key columns */
  promotion_purchases_by_pk?: Maybe<Promotion_Purchases>;
  /** fetch data from the table: "ratings" */
  ratings: Array<Ratings>;
  /** fetch aggregated fields from the table: "ratings" */
  ratings_aggregate: Ratings_Aggregate;
  /** fetch data from the table: "ratings" using primary key columns */
  ratings_by_pk?: Maybe<Ratings>;
  /** fetch data from the table: "refunds" */
  refunds: Array<Refunds>;
  /** fetch aggregated fields from the table: "refunds" */
  refunds_aggregate: Refunds_Aggregate;
  /** fetch data from the table: "refunds" using primary key columns */
  refunds_by_pk?: Maybe<Refunds>;
  /** fetch data from the table: "saved_search_hits" */
  saved_search_hits: Array<Saved_Search_Hits>;
  /** fetch aggregated fields from the table: "saved_search_hits" */
  saved_search_hits_aggregate: Saved_Search_Hits_Aggregate;
  /** fetch data from the table: "saved_search_hits" using primary key columns */
  saved_search_hits_by_pk?: Maybe<Saved_Search_Hits>;
  /** fetch data from the table: "saved_searches" */
  saved_searches: Array<Saved_Searches>;
  /** fetch aggregated fields from the table: "saved_searches" */
  saved_searches_aggregate: Saved_Searches_Aggregate;
  /** fetch data from the table: "saved_searches" using primary key columns */
  saved_searches_by_pk?: Maybe<Saved_Searches>;
  /** fetch data from the table: "signup_emails" */
  signup_emails: Array<Signup_Emails>;
  /** fetch aggregated fields from the table: "signup_emails" */
  signup_emails_aggregate: Signup_Emails_Aggregate;
  /** fetch data from the table: "signup_emails" using primary key columns */
  signup_emails_by_pk?: Maybe<Signup_Emails>;
  /** fetch data from the table: "stores" */
  stores: Array<Stores>;
  /** fetch aggregated fields from the table: "stores" */
  stores_aggregate: Stores_Aggregate;
  /** fetch data from the table: "stores" using primary key columns */
  stores_by_pk?: Maybe<Stores>;
  /** fetch data from the table: "transactions" */
  transactions: Array<Transactions>;
  /** fetch aggregated fields from the table: "transactions" */
  transactions_aggregate: Transactions_Aggregate;
  /** fetch data from the table: "transactions" using primary key columns */
  transactions_by_pk?: Maybe<Transactions>;
  /** fetch data from the table: "unique_product_views" */
  unique_product_views: Array<Unique_Product_Views>;
  /** fetch aggregated fields from the table: "unique_product_views" */
  unique_product_views_aggregate: Unique_Product_Views_Aggregate;
  /** fetch data from the table: "unique_product_views" using primary key columns */
  unique_product_views_by_pk?: Maybe<Unique_Product_Views>;
  /** fetch data from the table: "user_licenses" */
  user_licenses: Array<User_Licenses>;
  /** fetch aggregated fields from the table: "user_licenses" */
  user_licenses_aggregate: User_Licenses_Aggregate;
  /** fetch data from the table: "user_licenses" using primary key columns */
  user_licenses_by_pk?: Maybe<User_Licenses>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "users_online" */
  users_online: Array<Users_Online>;
  /** fetch aggregated fields from the table: "users_online" */
  users_online_aggregate: Users_Online_Aggregate;
  /** fetch data from the table: "users_orders_metrics" */
  users_orders_metrics: Array<Users_Orders_Metrics>;
  /** fetch aggregated fields from the table: "users_orders_metrics" */
  users_orders_metrics_aggregate: Users_Orders_Metrics_Aggregate;
  /** fetch data from the table: "users_typing" */
  users_typing: Array<Users_Typing>;
  /** fetch aggregated fields from the table: "users_typing" */
  users_typing_aggregate: Users_Typing_Aggregate;
  /**
   * Get the user who is currently logged in.
   *
   * AccessRule – LOGGED_IN
   */
  loggedInUser: UserPrivate;
  /**
   * Lookup public information about a user.
   * If the requested user is also the logged-in user, UserPrivate fields will be available.
   *
   * AccessRule – PUBLIC
   */
  user?: Maybe<BasicUser>;
  /**
   * Lookup private information about a user using their ID or email address.
   *
   * AccessRule – PLATFORM_ADMIN
   */
  userByEmailOrIdAdminOnly?: Maybe<BasicUser>;
  /**
   * Get recent users who just signed up, a helper function for Admin dashboard
   * to verify users
   *
   * AccessRule – PLATFORM_ADMIN
   */
  getRecentUsers: Array<BasicUser>;
  /** AccessRule – PLATFORM_ADMIN */
  getRecentProducts: Array<Product>;
  /**
   * Query the list of products that are recommended for the logged-in user.
   * If nobody is logged in, a general list of recommendations is still returned.
   * AccessRule – PUBLIC
   */
  getRecommendedProductsConnection: ProductsConnection;
  /**
   * Retrieve all of the products on the platform that can be purchased.
   * AccessRule – PUBLIC
   */
  productsNewReleasesConnection: ProductPreviewsConnection;
  /**
   * Search all of the products on the platform that can be purchased.
   * AccessRule – PUBLIC
   */
  search: ProductsConnection;
  /**
   * Retrieve all of the products for sale within a specific category.
   * AccessRule – PUBLIC
   */
  productsByCategoryConnection?: Maybe<ProductsConnection>;
  /**
   * Get a product by its ID.
   * AccessRule – PUBLIC
   */
  product?: Maybe<Product>;
  /**
   * Get a store by its ID.
   * AccessRule – PUBLIC
   */
  store?: Maybe<Store>;
  /**
   * Get the full list of product categories.
   * AccessRule – PUBLIC
   */
  getCategories: Array<Categories>;
  /**
   * Get the full list of calibers
   * AccessRule – PUBLIC
   */
  getCalibers: Array<Calibers>;
  /**
   * Get a category by its ID.
   * AccessRule – PUBLIC
   */
  category?: Maybe<Categories>;
  /**
   * List credit card payment methods the user has saved
   * AccessRule – OWNER
   */
  listPaymentMethods?: Maybe<Array<Payment_Methods>>;
  /**
   * Get a credit card payment method's details from Stripe
   * AccessRule – OWNER
   */
  getPaymentMethod?: Maybe<Payment_Methods>;
  /**
   * Get transaction details of an order from gun-payment service
   * AccessRule – LOGGED_IN
   */
  getTransaction?: Maybe<Transactions>;
  /**
   * Get details about any order in the system.
   * AccessRule – PLATFORM_ADMIN
   */
  getOrderAsAdmin?: Maybe<Order>;
  /**
   * Get details of one of your orders.
   * AccessRule – OWNER
   */
  getOrder?: Maybe<Order>;
  /**
   * Get payoutItems and payout summary for ADMIN_APPROVED orders
   * AccessRule – PLATFORM_ADMIN
   */
  getAdminApprovedPayoutSummary: PayoutSummary;
  /**
   * Get payoutItems and payout summary for COMPLETE orders
   * AccessRule – PLATFORM_ADMIN
   */
  getCompleteOrdersPayoutSummary: PayoutSummary;
  /**
   * List payoutItems between startDate and endDate.
   * AccessRule – PLATFORM_ADMIN
   */
  getPayoutItemsInPeriodAdmin: PayoutItemsConnection;
  /**
   * List orders that are pending seller Form10 upload
   * AccessRule – PLATFORM_ADMIN
   */
  getOrdersCreatedConnectionAdmin: OrdersConnection;
  /**
   * List orders that are pending admin approval, after seller uploads form10
   * AccessRule – PLATFORM_ADMIN
   */
  getOrdersPendingApprovalConnectionAdmin: OrdersConnection;
  /**
   * Get orderIds grouped by day of approval, so we can group and aggregate payouts
   * in sync with Stripe's daily payouts.
   * AccessRule – PLATFORM_ADMIN
   */
  getAdminApprovedOrderIdsGroupedByDay: Array<OrdersGroupedByDay>;
  /**
   * Works in conjunnction with getAdminApprovedOrderIdsGroupedByDay()
   * Get orders by orderIds in orderConnection form
   * AccessRule – PLATFORM_ADMIN
   */
  getOrdersAdminApprovedByIdsConnection: OrdersConnection;
  /**
   * Get completed orders grouped by day of approval
   * AccessRule – PLATFORM_ADMIN
   */
  getCompleteOrderIdsGroupedByDay: Array<OrdersGroupedByDay>;
  /**
   * Works in conjunnction with getCompleteOrderIdsGroupedByDay()
   * Get orders by orderIds in orderConnection form
   * AccessRule – PLATFORM_ADMIN
   */
  getOrdersCompleteByIdsConnection: OrdersConnection;
  /**
   * List orders that have been approved by admin, and are ready to be paid
   * AccessRule – PLATFORM_ADMIN
   */
  getOrdersAdminApprovedConnection: OrdersConnection;
  /**
   * Orders which are close to being expiring need to be cancelled
   * Orders which are older than 3 days, and have not have product disposed by
   * seller + approved by admins
   * AccessRule – PLATFORM_ADMIN
   */
  getOrdersExpiringConnectionAdmin: OrdersConnection;
  /**
   * Orders which have been refunded
   * AccessRule – PLATFORM_ADMIN
   */
  getOrdersCancelledConnection: OrdersConnection;
  /**
   * Orders which have completed payouts
   * AccessRule – PLATFORM_ADMIN
   */
  getOrdersPayoutCompleteConnection: OrdersConnection;
  /**
   * Orders which are close to being expiring need to be cancelled
   * Orders which are older than 3 days, and have not have product disposed by
   * seller + approved by admins
   * AccessRule – DEALER
   */
  getOrdersCompletingConnectionDealer: OrdersConnection;
  /**
   * List orders that are pending seller Form10 upload
   * AccessRule – DEALER
   */
  getOrdersArrivingConnectionDealer: OrdersConnection;
  /**
   * List transactions between startDate and endDate.
   * AccessRule – PLATFORM_ADMIN
   */
  getTransactionsInPeriodAdmin: TransactionsConnection;
  /**
   * Get recent transactions, a helper function for Admin dashboard
   * AccessRule – PLATFORM_ADMIN
   */
  getRecentTransactions: Array<Transactions>;
  /**
   * Collection of products the user has saved for maybe purchasing later.
   * AccessRule – LOGGED_IN
   */
  getCollectionsByUserId: Array<Collection>;
  /**
   * Collection of products the user has saved for maybe purchasing later.
   * AccessRule – LOGGED_IN
   */
  getCollection: Collection;
  /**
   * Get a promoted list by its ID.
   * returns promotedList.promotedSlotsConnection
   *
   * AccessRule – PUBLIC
   */
  getPromotedList?: Maybe<PromotedList>;
  getPromotedSlotByProductId?: Maybe<PromotedSlot>;
  getPageConfig?: Maybe<PageConfig>;
  /**
   * Get the product by productId
   * AccessRule – PUBLIC
   */
  getProductById?: Maybe<Product>;
  /**
   * Get the promoted product by its slot id
   * AccessRule – PUBLIC
   */
  getPromotedSlotById?: Maybe<PromotedSlot>;
  /**
   * Get the store by storeIdOrSlug
   * AccessRule – PUBLIC
   */
  getStoreById?: Maybe<Store>;
  getStoreProductsForSaleConnection: ProductsConnection;
  /**
   * Get all gun dealers
   * AccessRule – PUBLIC
   */
  getAllDealers?: Maybe<Array<Maybe<Dealer>>>;
  /** Search for a gun dealer */
  searchDealerAsAdmin?: Maybe<Dealer>;
  /** Store sellers's view of currently published products. */
  dashboardProductsConnection: ProductsConnection;
  getCoinbaseExchangeRates?: Maybe<CoinbaseExchangeRates>;
  getUserBidsForProduct?: Maybe<ChatRoom>;
  getSignupWaitlist: Array<Signup_Emails>;
  /** These are the user's saved searches */
  getSavedSearchesByUser?: Maybe<SavedSearchesConnection>;
  /**
   * These notifications for when a users's saved search had a match
   * when a product was listed
   */
  getSavedSearchHitsByUser?: Maybe<SavedSearchHitsConnection>;
  /** Get image, for gun-aggregator to check if image exists */
  getImages: Array<Image_Parents>;
  /** for gun-aggregator to check if external products exists */
  getExternalProductsBySourceSiteId: Array<External_Products>;
  /** Gets news item by Id */
  getNewsItemById?: Maybe<NewsItem>;
  /** searches through all news items */
  getNewsItemsSearchConnection?: Maybe<NewsItemsConnection>;
  /** Gets news items in the last 24hrs */
  getHotNewsItemsToday?: Maybe<NewsItemsConnection>;
  /** Gets news items between yesterday and the day before */
  getHotNewsItemsYesterday?: Maybe<NewsItemsConnection>;
  /** Gets news items between 3 days to 7 days ago */
  getHotNewsItemsThisWeek?: Maybe<NewsItemsConnection>;
  /** Gets news items between 7 days to 14 days ago */
  getHotNewsItemsLastWeek?: Maybe<NewsItemsConnection>;
  /** Gets misc items this week */
  getHotMiscItemsThisWeek?: Maybe<NewsItemsConnection>;
  /** Gets misc items last week */
  getHotMiscItemsLastWeek?: Maybe<NewsItemsConnection>;
  buyerOrdersConnection?: Maybe<OrdersConnection>;
  sellerOrdersConnection?: Maybe<OrdersConnection>;
  sellerOrdersActionItemsConnection?: Maybe<OrdersConnection>;
  getNewsItemByClaimId?: Maybe<NewsItem>;
};


export type QueryBidsArgs = {
  distinct_on?: Maybe<Array<Bids_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Bids_Order_By>>;
  where?: Maybe<Bids_Bool_Exp>;
};


export type QueryBids_AggregateArgs = {
  distinct_on?: Maybe<Array<Bids_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Bids_Order_By>>;
  where?: Maybe<Bids_Bool_Exp>;
};


export type QueryBids_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryCalibersArgs = {
  distinct_on?: Maybe<Array<Calibers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Calibers_Order_By>>;
  where?: Maybe<Calibers_Bool_Exp>;
};


export type QueryCalibers_AggregateArgs = {
  distinct_on?: Maybe<Array<Calibers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Calibers_Order_By>>;
  where?: Maybe<Calibers_Bool_Exp>;
};


export type QueryCalibers_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryCategoriesArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};


export type QueryCategories_AggregateArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};


export type QueryCategories_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryChat_MessagesArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};


export type QueryChat_Messages_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};


export type QueryChat_Messages_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryChat_RoomsArgs = {
  distinct_on?: Maybe<Array<Chat_Rooms_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Rooms_Order_By>>;
  where?: Maybe<Chat_Rooms_Bool_Exp>;
};


export type QueryChat_Rooms_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Rooms_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Rooms_Order_By>>;
  where?: Maybe<Chat_Rooms_Bool_Exp>;
};


export type QueryChat_Rooms_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryChat_UsersArgs = {
  distinct_on?: Maybe<Array<Chat_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Users_Order_By>>;
  where?: Maybe<Chat_Users_Bool_Exp>;
};


export type QueryChat_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Users_Order_By>>;
  where?: Maybe<Chat_Users_Bool_Exp>;
};


export type QueryChat_Users_By_PkArgs = {
  chatRoomId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryClassified_Ad_PurchasesArgs = {
  distinct_on?: Maybe<Array<Classified_Ad_Purchases_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Classified_Ad_Purchases_Order_By>>;
  where?: Maybe<Classified_Ad_Purchases_Bool_Exp>;
};


export type QueryClassified_Ad_Purchases_AggregateArgs = {
  distinct_on?: Maybe<Array<Classified_Ad_Purchases_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Classified_Ad_Purchases_Order_By>>;
  where?: Maybe<Classified_Ad_Purchases_Bool_Exp>;
};


export type QueryClassified_Ad_Purchases_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryCollection_ItemsArgs = {
  distinct_on?: Maybe<Array<Collection_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Collection_Items_Order_By>>;
  where?: Maybe<Collection_Items_Bool_Exp>;
};


export type QueryCollection_Items_AggregateArgs = {
  distinct_on?: Maybe<Array<Collection_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Collection_Items_Order_By>>;
  where?: Maybe<Collection_Items_Bool_Exp>;
};


export type QueryCollection_Items_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryCollectionsArgs = {
  distinct_on?: Maybe<Array<Collections_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Collections_Order_By>>;
  where?: Maybe<Collections_Bool_Exp>;
};


export type QueryCollections_AggregateArgs = {
  distinct_on?: Maybe<Array<Collections_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Collections_Order_By>>;
  where?: Maybe<Collections_Bool_Exp>;
};


export type QueryCollections_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryDealersArgs = {
  distinct_on?: Maybe<Array<Dealers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dealers_Order_By>>;
  where?: Maybe<Dealers_Bool_Exp>;
};


export type QueryDealers_AggregateArgs = {
  distinct_on?: Maybe<Array<Dealers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dealers_Order_By>>;
  where?: Maybe<Dealers_Bool_Exp>;
};


export type QueryDealers_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryEmail_SubscriptionsArgs = {
  distinct_on?: Maybe<Array<Email_Subscriptions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Email_Subscriptions_Order_By>>;
  where?: Maybe<Email_Subscriptions_Bool_Exp>;
};


export type QueryEmail_Subscriptions_AggregateArgs = {
  distinct_on?: Maybe<Array<Email_Subscriptions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Email_Subscriptions_Order_By>>;
  where?: Maybe<Email_Subscriptions_Bool_Exp>;
};


export type QueryEmail_Subscriptions_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryEmailsArgs = {
  distinct_on?: Maybe<Array<Emails_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Emails_Order_By>>;
  where?: Maybe<Emails_Bool_Exp>;
};


export type QueryEmails_AggregateArgs = {
  distinct_on?: Maybe<Array<Emails_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Emails_Order_By>>;
  where?: Maybe<Emails_Bool_Exp>;
};


export type QueryEmails_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryExternal_Product_SnapshotsArgs = {
  distinct_on?: Maybe<Array<External_Product_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<External_Product_Snapshots_Order_By>>;
  where?: Maybe<External_Product_Snapshots_Bool_Exp>;
};


export type QueryExternal_Product_Snapshots_AggregateArgs = {
  distinct_on?: Maybe<Array<External_Product_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<External_Product_Snapshots_Order_By>>;
  where?: Maybe<External_Product_Snapshots_Bool_Exp>;
};


export type QueryExternal_Product_Snapshots_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryExternal_ProductsArgs = {
  distinct_on?: Maybe<Array<External_Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<External_Products_Order_By>>;
  where?: Maybe<External_Products_Bool_Exp>;
};


export type QueryExternal_Products_AggregateArgs = {
  distinct_on?: Maybe<Array<External_Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<External_Products_Order_By>>;
  where?: Maybe<External_Products_Bool_Exp>;
};


export type QueryExternal_Products_By_PkArgs = {
  sourceSite: Scalars['String'];
  sourceSiteId: Scalars['String'];
};


export type QueryImage_OwnersArgs = {
  distinct_on?: Maybe<Array<Image_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Owners_Order_By>>;
  where?: Maybe<Image_Owners_Bool_Exp>;
};


export type QueryImage_Owners_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Owners_Order_By>>;
  where?: Maybe<Image_Owners_Bool_Exp>;
};


export type QueryImage_Owners_By_PkArgs = {
  imageId: Scalars['String'];
};


export type QueryImage_ParentsArgs = {
  distinct_on?: Maybe<Array<Image_Parents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Parents_Order_By>>;
  where?: Maybe<Image_Parents_Bool_Exp>;
};


export type QueryImage_Parents_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Parents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Parents_Order_By>>;
  where?: Maybe<Image_Parents_Bool_Exp>;
};


export type QueryImage_Parents_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryImage_VariantsArgs = {
  distinct_on?: Maybe<Array<Image_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Variants_Order_By>>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};


export type QueryImage_Variants_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Variants_Order_By>>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};


export type QueryImage_Variants_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryList_Products_RandomArgs = {
  args: List_Products_Random_Args;
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type QueryList_Products_Random_AggregateArgs = {
  args: List_Products_Random_Args;
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type QueryMigrationsArgs = {
  distinct_on?: Maybe<Array<Migrations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Migrations_Order_By>>;
  where?: Maybe<Migrations_Bool_Exp>;
};


export type QueryMigrations_AggregateArgs = {
  distinct_on?: Maybe<Array<Migrations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Migrations_Order_By>>;
  where?: Maybe<Migrations_Bool_Exp>;
};


export type QueryMigrations_By_PkArgs = {
  id: Scalars['Int'];
};


export type QueryNews_Item_VotesArgs = {
  distinct_on?: Maybe<Array<News_Item_Votes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<News_Item_Votes_Order_By>>;
  where?: Maybe<News_Item_Votes_Bool_Exp>;
};


export type QueryNews_Item_Votes_AggregateArgs = {
  distinct_on?: Maybe<Array<News_Item_Votes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<News_Item_Votes_Order_By>>;
  where?: Maybe<News_Item_Votes_Bool_Exp>;
};


export type QueryNews_Item_Votes_By_PkArgs = {
  newsItemId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryNews_ItemsArgs = {
  distinct_on?: Maybe<Array<News_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<News_Items_Order_By>>;
  where?: Maybe<News_Items_Bool_Exp>;
};


export type QueryNews_Items_AggregateArgs = {
  distinct_on?: Maybe<Array<News_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<News_Items_Order_By>>;
  where?: Maybe<News_Items_Bool_Exp>;
};


export type QueryNews_Items_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryOrder_SnapshotsArgs = {
  distinct_on?: Maybe<Array<Order_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Order_Snapshots_Order_By>>;
  where?: Maybe<Order_Snapshots_Bool_Exp>;
};


export type QueryOrder_Snapshots_AggregateArgs = {
  distinct_on?: Maybe<Array<Order_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Order_Snapshots_Order_By>>;
  where?: Maybe<Order_Snapshots_Bool_Exp>;
};


export type QueryOrder_Snapshots_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryOrdersArgs = {
  distinct_on?: Maybe<Array<Orders_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orders_Order_By>>;
  where?: Maybe<Orders_Bool_Exp>;
};


export type QueryOrders_AggregateArgs = {
  distinct_on?: Maybe<Array<Orders_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orders_Order_By>>;
  where?: Maybe<Orders_Bool_Exp>;
};


export type QueryOrders_Approved_Grouped_By_DayArgs = {
  distinct_on?: Maybe<Array<Orders_Approved_Grouped_By_Day_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orders_Approved_Grouped_By_Day_Order_By>>;
  where?: Maybe<Orders_Approved_Grouped_By_Day_Bool_Exp>;
};


export type QueryOrders_Approved_Grouped_By_Day_AggregateArgs = {
  distinct_on?: Maybe<Array<Orders_Approved_Grouped_By_Day_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orders_Approved_Grouped_By_Day_Order_By>>;
  where?: Maybe<Orders_Approved_Grouped_By_Day_Bool_Exp>;
};


export type QueryOrders_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryOrders_Complete_Grouped_By_DayArgs = {
  distinct_on?: Maybe<Array<Orders_Complete_Grouped_By_Day_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orders_Complete_Grouped_By_Day_Order_By>>;
  where?: Maybe<Orders_Complete_Grouped_By_Day_Bool_Exp>;
};


export type QueryOrders_Complete_Grouped_By_Day_AggregateArgs = {
  distinct_on?: Maybe<Array<Orders_Complete_Grouped_By_Day_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orders_Complete_Grouped_By_Day_Order_By>>;
  where?: Maybe<Orders_Complete_Grouped_By_Day_Bool_Exp>;
};


export type QueryPage_Config_SectionsArgs = {
  distinct_on?: Maybe<Array<Page_Config_Sections_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Config_Sections_Order_By>>;
  where?: Maybe<Page_Config_Sections_Bool_Exp>;
};


export type QueryPage_Config_Sections_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Config_Sections_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Config_Sections_Order_By>>;
  where?: Maybe<Page_Config_Sections_Bool_Exp>;
};


export type QueryPage_Config_Sections_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryPage_ConfigsArgs = {
  distinct_on?: Maybe<Array<Page_Configs_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Configs_Order_By>>;
  where?: Maybe<Page_Configs_Bool_Exp>;
};


export type QueryPage_Configs_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Configs_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Configs_Order_By>>;
  where?: Maybe<Page_Configs_Bool_Exp>;
};


export type QueryPage_Configs_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryPayment_MethodsArgs = {
  distinct_on?: Maybe<Array<Payment_Methods_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payment_Methods_Order_By>>;
  where?: Maybe<Payment_Methods_Bool_Exp>;
};


export type QueryPayment_Methods_AggregateArgs = {
  distinct_on?: Maybe<Array<Payment_Methods_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payment_Methods_Order_By>>;
  where?: Maybe<Payment_Methods_Bool_Exp>;
};


export type QueryPayment_Methods_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryPayout_ItemsArgs = {
  distinct_on?: Maybe<Array<Payout_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payout_Items_Order_By>>;
  where?: Maybe<Payout_Items_Bool_Exp>;
};


export type QueryPayout_Items_AggregateArgs = {
  distinct_on?: Maybe<Array<Payout_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payout_Items_Order_By>>;
  where?: Maybe<Payout_Items_Bool_Exp>;
};


export type QueryPayout_Items_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryPayout_MethodsArgs = {
  distinct_on?: Maybe<Array<Payout_Methods_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payout_Methods_Order_By>>;
  where?: Maybe<Payout_Methods_Bool_Exp>;
};


export type QueryPayout_Methods_AggregateArgs = {
  distinct_on?: Maybe<Array<Payout_Methods_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payout_Methods_Order_By>>;
  where?: Maybe<Payout_Methods_Bool_Exp>;
};


export type QueryPayout_Methods_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryPhone_NumbersArgs = {
  distinct_on?: Maybe<Array<Phone_Numbers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Phone_Numbers_Order_By>>;
  where?: Maybe<Phone_Numbers_Bool_Exp>;
};


export type QueryPhone_Numbers_AggregateArgs = {
  distinct_on?: Maybe<Array<Phone_Numbers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Phone_Numbers_Order_By>>;
  where?: Maybe<Phone_Numbers_Bool_Exp>;
};


export type QueryPhone_Numbers_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryProduct_File_OwnersArgs = {
  distinct_on?: Maybe<Array<Product_File_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_File_Owners_Order_By>>;
  where?: Maybe<Product_File_Owners_Bool_Exp>;
};


export type QueryProduct_File_Owners_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_File_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_File_Owners_Order_By>>;
  where?: Maybe<Product_File_Owners_Bool_Exp>;
};


export type QueryProduct_File_Owners_By_PkArgs = {
  fileId: Scalars['String'];
};


export type QueryProduct_FilesArgs = {
  distinct_on?: Maybe<Array<Product_Files_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Files_Order_By>>;
  where?: Maybe<Product_Files_Bool_Exp>;
};


export type QueryProduct_Files_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Files_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Files_Order_By>>;
  where?: Maybe<Product_Files_Bool_Exp>;
};


export type QueryProduct_Files_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryProduct_Preview_ItemsArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};


export type QueryProduct_Preview_Items_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};


export type QueryProduct_Preview_Items_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryProduct_SnapshotsArgs = {
  distinct_on?: Maybe<Array<Product_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Snapshots_Order_By>>;
  where?: Maybe<Product_Snapshots_Bool_Exp>;
};


export type QueryProduct_Snapshots_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Snapshots_Order_By>>;
  where?: Maybe<Product_Snapshots_Bool_Exp>;
};


export type QueryProduct_Snapshots_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryProduct_VariantsArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


export type QueryProduct_Variants_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


export type QueryProduct_Variants_By_PkArgs = {
  variantId: Scalars['String'];
};


export type QueryProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type QueryProducts_AggregateArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type QueryProducts_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryPromoted_ListsArgs = {
  distinct_on?: Maybe<Array<Promoted_Lists_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Promoted_Lists_Order_By>>;
  where?: Maybe<Promoted_Lists_Bool_Exp>;
};


export type QueryPromoted_Lists_AggregateArgs = {
  distinct_on?: Maybe<Array<Promoted_Lists_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Promoted_Lists_Order_By>>;
  where?: Maybe<Promoted_Lists_Bool_Exp>;
};


export type QueryPromoted_Lists_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryPromoted_SlotsArgs = {
  distinct_on?: Maybe<Array<Promoted_Slots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Promoted_Slots_Order_By>>;
  where?: Maybe<Promoted_Slots_Bool_Exp>;
};


export type QueryPromoted_Slots_AggregateArgs = {
  distinct_on?: Maybe<Array<Promoted_Slots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Promoted_Slots_Order_By>>;
  where?: Maybe<Promoted_Slots_Bool_Exp>;
};


export type QueryPromoted_Slots_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryPromotion_PurchasesArgs = {
  distinct_on?: Maybe<Array<Promotion_Purchases_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Promotion_Purchases_Order_By>>;
  where?: Maybe<Promotion_Purchases_Bool_Exp>;
};


export type QueryPromotion_Purchases_AggregateArgs = {
  distinct_on?: Maybe<Array<Promotion_Purchases_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Promotion_Purchases_Order_By>>;
  where?: Maybe<Promotion_Purchases_Bool_Exp>;
};


export type QueryPromotion_Purchases_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryRatingsArgs = {
  distinct_on?: Maybe<Array<Ratings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Ratings_Order_By>>;
  where?: Maybe<Ratings_Bool_Exp>;
};


export type QueryRatings_AggregateArgs = {
  distinct_on?: Maybe<Array<Ratings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Ratings_Order_By>>;
  where?: Maybe<Ratings_Bool_Exp>;
};


export type QueryRatings_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryRefundsArgs = {
  distinct_on?: Maybe<Array<Refunds_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Refunds_Order_By>>;
  where?: Maybe<Refunds_Bool_Exp>;
};


export type QueryRefunds_AggregateArgs = {
  distinct_on?: Maybe<Array<Refunds_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Refunds_Order_By>>;
  where?: Maybe<Refunds_Bool_Exp>;
};


export type QueryRefunds_By_PkArgs = {
  id: Scalars['String'];
};


export type QuerySaved_Search_HitsArgs = {
  distinct_on?: Maybe<Array<Saved_Search_Hits_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Saved_Search_Hits_Order_By>>;
  where?: Maybe<Saved_Search_Hits_Bool_Exp>;
};


export type QuerySaved_Search_Hits_AggregateArgs = {
  distinct_on?: Maybe<Array<Saved_Search_Hits_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Saved_Search_Hits_Order_By>>;
  where?: Maybe<Saved_Search_Hits_Bool_Exp>;
};


export type QuerySaved_Search_Hits_By_PkArgs = {
  id: Scalars['String'];
};


export type QuerySaved_SearchesArgs = {
  distinct_on?: Maybe<Array<Saved_Searches_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Saved_Searches_Order_By>>;
  where?: Maybe<Saved_Searches_Bool_Exp>;
};


export type QuerySaved_Searches_AggregateArgs = {
  distinct_on?: Maybe<Array<Saved_Searches_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Saved_Searches_Order_By>>;
  where?: Maybe<Saved_Searches_Bool_Exp>;
};


export type QuerySaved_Searches_By_PkArgs = {
  id: Scalars['String'];
};


export type QuerySignup_EmailsArgs = {
  distinct_on?: Maybe<Array<Signup_Emails_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Signup_Emails_Order_By>>;
  where?: Maybe<Signup_Emails_Bool_Exp>;
};


export type QuerySignup_Emails_AggregateArgs = {
  distinct_on?: Maybe<Array<Signup_Emails_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Signup_Emails_Order_By>>;
  where?: Maybe<Signup_Emails_Bool_Exp>;
};


export type QuerySignup_Emails_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryStoresArgs = {
  distinct_on?: Maybe<Array<Stores_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Stores_Order_By>>;
  where?: Maybe<Stores_Bool_Exp>;
};


export type QueryStores_AggregateArgs = {
  distinct_on?: Maybe<Array<Stores_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Stores_Order_By>>;
  where?: Maybe<Stores_Bool_Exp>;
};


export type QueryStores_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryTransactionsArgs = {
  distinct_on?: Maybe<Array<Transactions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transactions_Order_By>>;
  where?: Maybe<Transactions_Bool_Exp>;
};


export type QueryTransactions_AggregateArgs = {
  distinct_on?: Maybe<Array<Transactions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transactions_Order_By>>;
  where?: Maybe<Transactions_Bool_Exp>;
};


export type QueryTransactions_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryUnique_Product_ViewsArgs = {
  distinct_on?: Maybe<Array<Unique_Product_Views_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Unique_Product_Views_Order_By>>;
  where?: Maybe<Unique_Product_Views_Bool_Exp>;
};


export type QueryUnique_Product_Views_AggregateArgs = {
  distinct_on?: Maybe<Array<Unique_Product_Views_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Unique_Product_Views_Order_By>>;
  where?: Maybe<Unique_Product_Views_Bool_Exp>;
};


export type QueryUnique_Product_Views_By_PkArgs = {
  productId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryUser_LicensesArgs = {
  distinct_on?: Maybe<Array<User_Licenses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Licenses_Order_By>>;
  where?: Maybe<User_Licenses_Bool_Exp>;
};


export type QueryUser_Licenses_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Licenses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Licenses_Order_By>>;
  where?: Maybe<User_Licenses_Bool_Exp>;
};


export type QueryUser_Licenses_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type QueryUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type QueryUsers_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryUsers_OnlineArgs = {
  distinct_on?: Maybe<Array<Users_Online_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Online_Order_By>>;
  where?: Maybe<Users_Online_Bool_Exp>;
};


export type QueryUsers_Online_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Online_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Online_Order_By>>;
  where?: Maybe<Users_Online_Bool_Exp>;
};


export type QueryUsers_Orders_MetricsArgs = {
  distinct_on?: Maybe<Array<Users_Orders_Metrics_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Orders_Metrics_Order_By>>;
  where?: Maybe<Users_Orders_Metrics_Bool_Exp>;
};


export type QueryUsers_Orders_Metrics_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Orders_Metrics_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Orders_Metrics_Order_By>>;
  where?: Maybe<Users_Orders_Metrics_Bool_Exp>;
};


export type QueryUsers_TypingArgs = {
  distinct_on?: Maybe<Array<Users_Typing_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Typing_Order_By>>;
  where?: Maybe<Users_Typing_Bool_Exp>;
};


export type QueryUsers_Typing_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Typing_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Typing_Order_By>>;
  where?: Maybe<Users_Typing_Bool_Exp>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryUserByEmailOrIdAdminOnlyArgs = {
  userIdOrEmail: Scalars['String'];
};


export type QueryGetRecentUsersArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type QueryGetRecentProductsArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type QueryGetRecommendedProductsConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type QueryProductsNewReleasesConnectionArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionQuery>;
};


export type QuerySearchArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionQuery>;
};


export type QueryProductsByCategoryConnectionArgs = {
  query: ConnectionQuery;
  categorySlugs: Array<Maybe<Scalars['String']>>;
  dealerStates?: Maybe<Array<Maybe<Scalars['String']>>>;
  calibers?: Maybe<Array<Maybe<Scalars['String']>>>;
  actionTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  searchTerm?: Maybe<Scalars['String']>;
};


export type QueryProductArgs = {
  id: Scalars['String'];
};


export type QueryStoreArgs = {
  id: Scalars['String'];
};


export type QueryCategoryArgs = {
  id: Scalars['String'];
};


export type QueryListPaymentMethodsArgs = {
  customerId: Scalars['String'];
};


export type QueryGetPaymentMethodArgs = {
  paymentMethodId: Scalars['String'];
};


export type QueryGetTransactionArgs = {
  transactionId: Scalars['String'];
};


export type QueryGetOrderAsAdminArgs = {
  orderId: Scalars['String'];
};


export type QueryGetOrderArgs = {
  orderId: Scalars['String'];
};


export type QueryGetAdminApprovedPayoutSummaryArgs = {
  orderIds: Array<Scalars['String']>;
};


export type QueryGetCompleteOrdersPayoutSummaryArgs = {
  orderIds: Array<Scalars['String']>;
};


export type QueryGetPayoutItemsInPeriodAdminArgs = {
  month?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
  payoutStatus?: Maybe<PayoutStatus>;
  query: ConnectionQuery;
};


export type QueryGetOrdersCreatedConnectionAdminArgs = {
  query: ConnectionQueryOrders;
};


export type QueryGetOrdersPendingApprovalConnectionAdminArgs = {
  query: ConnectionQueryOrders;
};


export type QueryGetOrdersAdminApprovedByIdsConnectionArgs = {
  orderIds: Array<Scalars['String']>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type QueryGetCompleteOrderIdsGroupedByDayArgs = {
  before?: Maybe<Scalars['Date']>;
  after?: Maybe<Scalars['Date']>;
};


export type QueryGetOrdersCompleteByIdsConnectionArgs = {
  orderIds: Array<Scalars['String']>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type QueryGetOrdersAdminApprovedConnectionArgs = {
  query: ConnectionQueryOrders;
};


export type QueryGetOrdersExpiringConnectionAdminArgs = {
  query: ConnectionQueryOrders;
};


export type QueryGetOrdersCancelledConnectionArgs = {
  query: ConnectionQueryOrders;
};


export type QueryGetOrdersPayoutCompleteConnectionArgs = {
  query: ConnectionQueryOrders;
};


export type QueryGetOrdersCompletingConnectionDealerArgs = {
  query: ConnectionQueryOrders;
};


export type QueryGetOrdersArrivingConnectionDealerArgs = {
  query: ConnectionQueryOrders;
};


export type QueryGetTransactionsInPeriodAdminArgs = {
  month?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
  query?: Maybe<ConnectionQuery>;
};


export type QueryGetRecentTransactionsArgs = {
  count: Scalars['Int'];
};


export type QueryGetCollectionsByUserIdArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type QueryGetCollectionArgs = {
  collectionId: Scalars['ID'];
  query?: Maybe<ConnectionQuery>;
};


export type QueryGetPromotedListArgs = {
  promotedListId: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  categoryFilterSlug?: Maybe<Scalars['String']>;
  withFallbackProducts?: Maybe<Scalars['Boolean']>;
};


export type QueryGetPromotedSlotByProductIdArgs = {
  productId: Scalars['String'];
  promotedListId?: Maybe<Scalars['String']>;
};


export type QueryGetPageConfigArgs = {
  urlPath: Scalars['String'];
};


export type QueryGetProductByIdArgs = {
  productId: Scalars['String'];
};


export type QueryGetPromotedSlotByIdArgs = {
  promotedSlotId: Scalars['String'];
};


export type QueryGetStoreByIdArgs = {
  storeId: Scalars['String'];
};


export type QueryGetStoreProductsForSaleConnectionArgs = {
  storeId: Scalars['String'];
  searchTerm?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionQuery>;
};


export type QuerySearchDealerAsAdminArgs = {
  dealerIdOrLicenseNumber: Scalars['String'];
};


export type QueryDashboardProductsConnectionArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionQuery>;
};


export type QueryGetUserBidsForProductArgs = {
  productId: Scalars['String'];
};


export type QueryGetSignupWaitlistArgs = {
  limit: Scalars['Int'];
};


export type QueryGetSavedSearchesByUserArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryGetSavedSearchHitsByUserArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  unseenOnly?: Maybe<Scalars['Boolean']>;
};


export type QueryGetImagesArgs = {
  imageIds: Array<Scalars['String']>;
};


export type QueryGetExternalProductsBySourceSiteIdArgs = {
  externalProductIds: Array<Scalars['String']>;
};


export type QueryGetNewsItemByIdArgs = {
  newsItemId: Scalars['String'];
};


export type QueryGetNewsItemsSearchConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
  searchTerm?: Maybe<Scalars['String']>;
  sortBy?: Maybe<SortByNewsItems>;
  productType?: Maybe<ProductType>;
  categorySlugs?: Maybe<Array<Maybe<Scalars['String']>>>;
  dealerStates?: Maybe<Array<Maybe<Scalars['String']>>>;
  calibers?: Maybe<Array<Maybe<Scalars['String']>>>;
  actionTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryGetHotNewsItemsTodayArgs = {
  query?: Maybe<ConnectionQuery>;
  sortBy?: Maybe<SortByNewsItems>;
};


export type QueryGetHotNewsItemsYesterdayArgs = {
  query?: Maybe<ConnectionQuery>;
  sortBy?: Maybe<SortByNewsItems>;
};


export type QueryGetHotNewsItemsThisWeekArgs = {
  query?: Maybe<ConnectionQuery>;
  sortBy?: Maybe<SortByNewsItems>;
};


export type QueryGetHotNewsItemsLastWeekArgs = {
  query?: Maybe<ConnectionQuery>;
  sortBy?: Maybe<SortByNewsItems>;
};


export type QueryGetHotMiscItemsThisWeekArgs = {
  query?: Maybe<ConnectionQuery>;
  sortBy?: Maybe<SortByNewsItems>;
};


export type QueryGetHotMiscItemsLastWeekArgs = {
  query?: Maybe<ConnectionQuery>;
  sortBy?: Maybe<SortByNewsItems>;
};


export type QueryBuyerOrdersConnectionArgs = {
  query?: Maybe<ConnectionQueryOrders>;
};


export type QuerySellerOrdersConnectionArgs = {
  query?: Maybe<ConnectionQueryOrders>;
};


export type QuerySellerOrdersActionItemsConnectionArgs = {
  query?: Maybe<ConnectionQueryOrders>;
};


export type QueryGetNewsItemByClaimIdArgs = {
  claimId: Scalars['String'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  email?: Maybe<Scalars['String']>;
  expiresAt?: Maybe<Scalars['Date']>;
  resetId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['JSON']>;
};

export enum Role {
  ANON = 'ANON',
  USER = 'USER',
  DEALER = 'DEALER',
  PLATFORM_ADMIN = 'PLATFORM_ADMIN',
  PLATFORM_EDITOR = 'PLATFORM_EDITOR',
  SYSTEM = 'SYSTEM'
}

export type SavedSearchHit = {
  __typename?: 'SavedSearchHit';
  id: Scalars['ID'];
  savedSearchId: Scalars['ID'];
  userId: Scalars['ID'];
  productTitle: Scalars['String'];
  productId?: Maybe<Scalars['ID']>;
  externalProductId?: Maybe<Scalars['ID']>;
  createdAt: Scalars['Date'];
  seen?: Maybe<Scalars['Boolean']>;
  user?: Maybe<UserPrivate>;
  /** either product or external_products */
  product?: Maybe<Product>;
  externalProduct?: Maybe<External_Products>;
  savedSearch?: Maybe<Saved_Searches>;
};

export type SavedSearchHitsConnection = {
  __typename?: 'SavedSearchHitsConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<SavedSearchHitsEdge>;
};

export type SavedSearchHitsEdge = {
  __typename?: 'SavedSearchHitsEdge';
  node: SavedSearchHit;
};

export type SavedSearchesConnection = {
  __typename?: 'SavedSearchesConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<SavedSearchesEdge>;
};

export type SavedSearchesEdge = {
  __typename?: 'SavedSearchesEdge';
  node: Saved_Searches;
};

export enum ScraperSourceSite {
  USEDGUNS = 'USEDGUNS',
  SSAA = 'SSAA',
  OZGUNSALES = 'OZGUNSALES'
}

export type SendResetPasswordResponse = {
  __typename?: 'SendResetPasswordResponse';
  resetId?: Maybe<Scalars['String']>;
  emailSentTo?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['JSON']>;
};

export type SignUpMutationResponse = {
  __typename?: 'SignUpMutationResponse';
  user: UserPrivate;
};

export enum SoldOutStatus {
  SOLD_OUT = 'SOLD_OUT',
  RESERVED = 'RESERVED',
  AVAILABLE = 'AVAILABLE',
  ABANDONED = 'ABANDONED'
}

export enum SortByNewsItems {
  PRICE_ASC = 'PRICE_ASC',
  PRICE_DESC = 'PRICE_DESC',
  CREATED_AT_ASC = 'CREATED_AT_ASC',
  CREATED_AT_DESC = 'CREATED_AT_DESC',
  RANK_ASC = 'RANK_ASC',
  RANK_DESC = 'RANK_DESC'
}

/** Information about a store */
export type Store = {
  id: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
  userId: Scalars['ID'];
  user?: Maybe<BasicUser>;
  name?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['ID']>;
  profile?: Maybe<Image_Parents>;
  coverId?: Maybe<Scalars['ID']>;
  cover?: Maybe<Image_Parents>;
  bio?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  /** Whether or not a platform admin has hidden it */
  isSuspended: Scalars['Boolean'];
  /** Whether or not it has been deleted */
  isDeleted: Scalars['Boolean'];
  productsForSaleConnection: ProductsConnection;
};


/** Information about a store */
export type StoreProductsForSaleConnectionArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionQuery>;
};

/** Store for classified ads. Leaks Mobile phone number */
export type StoreClassifiedAd = Store & {
  __typename?: 'StoreClassifiedAd';
  id: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
  userId: Scalars['ID'];
  user?: Maybe<UserWithMobileNumber>;
  name?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['ID']>;
  profile?: Maybe<Image_Parents>;
  coverId?: Maybe<Scalars['ID']>;
  cover?: Maybe<Image_Parents>;
  bio?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  /** Whether or not a platform admin has hidden it */
  isSuspended: Scalars['Boolean'];
  /** Whether or not it has been deleted */
  isDeleted: Scalars['Boolean'];
  productsForSaleConnection: ProductsConnection;
};


/** Store for classified ads. Leaks Mobile phone number */
export type StoreClassifiedAdProductsForSaleConnectionArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionQuery>;
};

export type StoreMutationResponse = {
  __typename?: 'StoreMutationResponse';
  store: StorePrivate;
};

/** Private store info */
export type StorePrivate = Store & {
  __typename?: 'StorePrivate';
  id: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
  userId: Scalars['ID'];
  user?: Maybe<UserPrivate>;
  name?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['ID']>;
  profile?: Maybe<Image_Parents>;
  coverId?: Maybe<Scalars['ID']>;
  cover?: Maybe<Image_Parents>;
  bio?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  /** Whether or not a platform admin has hidden it */
  isSuspended: Scalars['Boolean'];
  /** Whether or not it has been deleted */
  isDeleted: Scalars['Boolean'];
  productsForSaleConnection: ProductsConnection;
  /** Store sellers's view of currently published products. */
  dashboardProductsConnection: ProductsConnection;
  payoutSplit?: Maybe<PayoutSplit>;
};


/** Private store info */
export type StorePrivateProductsForSaleConnectionArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionQuery>;
};


/** Private store info */
export type StorePrivateDashboardProductsConnectionArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionQuery>;
};

/** Public store info */
export type StorePublic = Store & {
  __typename?: 'StorePublic';
  id: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
  userId: Scalars['ID'];
  user?: Maybe<BasicUser>;
  name?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['ID']>;
  profile?: Maybe<Image_Parents>;
  coverId?: Maybe<Scalars['ID']>;
  cover?: Maybe<Image_Parents>;
  bio?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  /** Whether or not a platform admin has hidden it */
  isSuspended: Scalars['Boolean'];
  /** Whether or not it has been deleted */
  isDeleted: Scalars['Boolean'];
  productsForSaleConnection: ProductsConnection;
};


/** Public store info */
export type StorePublicProductsForSaleConnectionArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionQuery>;
};

export type StoresConnection = {
  __typename?: 'StoresConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<StoresEdge>;
};

export type StoresEdge = {
  __typename?: 'StoresEdge';
  node: Store;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars['String']>;
  _is_null?: Maybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** fetch data from the table: "bids" */
  bids: Array<Bids>;
  /** fetch aggregated fields from the table: "bids" */
  bids_aggregate: Bids_Aggregate;
  /** fetch data from the table: "bids" using primary key columns */
  bids_by_pk?: Maybe<Bids>;
  /** fetch data from the table: "calibers" */
  calibers: Array<Calibers>;
  /** fetch aggregated fields from the table: "calibers" */
  calibers_aggregate: Calibers_Aggregate;
  /** fetch data from the table: "calibers" using primary key columns */
  calibers_by_pk?: Maybe<Calibers>;
  /** fetch data from the table: "categories" */
  categories: Array<Categories>;
  /** fetch aggregated fields from the table: "categories" */
  categories_aggregate: Categories_Aggregate;
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>;
  /** fetch data from the table: "chat_messages" */
  chat_messages: Array<Chat_Messages>;
  /** fetch aggregated fields from the table: "chat_messages" */
  chat_messages_aggregate: Chat_Messages_Aggregate;
  /** fetch data from the table: "chat_messages" using primary key columns */
  chat_messages_by_pk?: Maybe<Chat_Messages>;
  /** fetch data from the table: "chat_rooms" */
  chat_rooms: Array<Chat_Rooms>;
  /** fetch aggregated fields from the table: "chat_rooms" */
  chat_rooms_aggregate: Chat_Rooms_Aggregate;
  /** fetch data from the table: "chat_rooms" using primary key columns */
  chat_rooms_by_pk?: Maybe<Chat_Rooms>;
  /** fetch data from the table: "chat_users" */
  chat_users: Array<Chat_Users>;
  /** fetch aggregated fields from the table: "chat_users" */
  chat_users_aggregate: Chat_Users_Aggregate;
  /** fetch data from the table: "chat_users" using primary key columns */
  chat_users_by_pk?: Maybe<Chat_Users>;
  /** fetch data from the table: "classified_ad_purchases" */
  classified_ad_purchases: Array<Classified_Ad_Purchases>;
  /** fetch aggregated fields from the table: "classified_ad_purchases" */
  classified_ad_purchases_aggregate: Classified_Ad_Purchases_Aggregate;
  /** fetch data from the table: "classified_ad_purchases" using primary key columns */
  classified_ad_purchases_by_pk?: Maybe<Classified_Ad_Purchases>;
  /** fetch data from the table: "collection_items" */
  collection_items: Array<Collection_Items>;
  /** fetch aggregated fields from the table: "collection_items" */
  collection_items_aggregate: Collection_Items_Aggregate;
  /** fetch data from the table: "collection_items" using primary key columns */
  collection_items_by_pk?: Maybe<Collection_Items>;
  /** fetch data from the table: "collections" */
  collections: Array<Collections>;
  /** fetch aggregated fields from the table: "collections" */
  collections_aggregate: Collections_Aggregate;
  /** fetch data from the table: "collections" using primary key columns */
  collections_by_pk?: Maybe<Collections>;
  /** fetch data from the table: "dealers" */
  dealers: Array<Dealers>;
  /** fetch aggregated fields from the table: "dealers" */
  dealers_aggregate: Dealers_Aggregate;
  /** fetch data from the table: "dealers" using primary key columns */
  dealers_by_pk?: Maybe<Dealers>;
  /** fetch data from the table: "email_subscriptions" */
  email_subscriptions: Array<Email_Subscriptions>;
  /** fetch aggregated fields from the table: "email_subscriptions" */
  email_subscriptions_aggregate: Email_Subscriptions_Aggregate;
  /** fetch data from the table: "email_subscriptions" using primary key columns */
  email_subscriptions_by_pk?: Maybe<Email_Subscriptions>;
  /** fetch data from the table: "emails" */
  emails: Array<Emails>;
  /** fetch aggregated fields from the table: "emails" */
  emails_aggregate: Emails_Aggregate;
  /** fetch data from the table: "emails" using primary key columns */
  emails_by_pk?: Maybe<Emails>;
  /** fetch data from the table: "external_product_snapshots" */
  external_product_snapshots: Array<External_Product_Snapshots>;
  /** fetch aggregated fields from the table: "external_product_snapshots" */
  external_product_snapshots_aggregate: External_Product_Snapshots_Aggregate;
  /** fetch data from the table: "external_product_snapshots" using primary key columns */
  external_product_snapshots_by_pk?: Maybe<External_Product_Snapshots>;
  /** fetch data from the table: "external_products" */
  external_products: Array<External_Products>;
  /** fetch aggregated fields from the table: "external_products" */
  external_products_aggregate: External_Products_Aggregate;
  /** fetch data from the table: "external_products" using primary key columns */
  external_products_by_pk?: Maybe<External_Products>;
  /** fetch data from the table: "image_owners" */
  image_owners: Array<Image_Owners>;
  /** fetch aggregated fields from the table: "image_owners" */
  image_owners_aggregate: Image_Owners_Aggregate;
  /** fetch data from the table: "image_owners" using primary key columns */
  image_owners_by_pk?: Maybe<Image_Owners>;
  /** fetch data from the table: "image_parents" */
  image_parents: Array<Image_Parents>;
  /** fetch aggregated fields from the table: "image_parents" */
  image_parents_aggregate: Image_Parents_Aggregate;
  /** fetch data from the table: "image_parents" using primary key columns */
  image_parents_by_pk?: Maybe<Image_Parents>;
  /** fetch data from the table: "image_variants" */
  image_variants: Array<Image_Variants>;
  /** fetch aggregated fields from the table: "image_variants" */
  image_variants_aggregate: Image_Variants_Aggregate;
  /** fetch data from the table: "image_variants" using primary key columns */
  image_variants_by_pk?: Maybe<Image_Variants>;
  /** execute function "list_products_random" which returns "products" */
  list_products_random: Array<Products>;
  /** execute function "list_products_random" and query aggregates on result of table type "products" */
  list_products_random_aggregate: Products_Aggregate;
  /** fetch data from the table: "migrations" */
  migrations: Array<Migrations>;
  /** fetch aggregated fields from the table: "migrations" */
  migrations_aggregate: Migrations_Aggregate;
  /** fetch data from the table: "migrations" using primary key columns */
  migrations_by_pk?: Maybe<Migrations>;
  /** fetch data from the table: "news_item_votes" */
  news_item_votes: Array<News_Item_Votes>;
  /** fetch aggregated fields from the table: "news_item_votes" */
  news_item_votes_aggregate: News_Item_Votes_Aggregate;
  /** fetch data from the table: "news_item_votes" using primary key columns */
  news_item_votes_by_pk?: Maybe<News_Item_Votes>;
  /** fetch data from the table: "news_items" */
  news_items: Array<News_Items>;
  /** fetch aggregated fields from the table: "news_items" */
  news_items_aggregate: News_Items_Aggregate;
  /** fetch data from the table: "news_items" using primary key columns */
  news_items_by_pk?: Maybe<News_Items>;
  /** fetch data from the table: "order_snapshots" */
  order_snapshots: Array<Order_Snapshots>;
  /** fetch aggregated fields from the table: "order_snapshots" */
  order_snapshots_aggregate: Order_Snapshots_Aggregate;
  /** fetch data from the table: "order_snapshots" using primary key columns */
  order_snapshots_by_pk?: Maybe<Order_Snapshots>;
  /** fetch data from the table: "orders" */
  orders: Array<Orders>;
  /** fetch aggregated fields from the table: "orders" */
  orders_aggregate: Orders_Aggregate;
  /** fetch data from the table: "orders_approved_grouped_by_day" */
  orders_approved_grouped_by_day: Array<Orders_Approved_Grouped_By_Day>;
  /** fetch aggregated fields from the table: "orders_approved_grouped_by_day" */
  orders_approved_grouped_by_day_aggregate: Orders_Approved_Grouped_By_Day_Aggregate;
  /** fetch data from the table: "orders" using primary key columns */
  orders_by_pk?: Maybe<Orders>;
  /** fetch data from the table: "orders_complete_grouped_by_day" */
  orders_complete_grouped_by_day: Array<Orders_Complete_Grouped_By_Day>;
  /** fetch aggregated fields from the table: "orders_complete_grouped_by_day" */
  orders_complete_grouped_by_day_aggregate: Orders_Complete_Grouped_By_Day_Aggregate;
  /** fetch data from the table: "page_config_sections" */
  page_config_sections: Array<Page_Config_Sections>;
  /** fetch aggregated fields from the table: "page_config_sections" */
  page_config_sections_aggregate: Page_Config_Sections_Aggregate;
  /** fetch data from the table: "page_config_sections" using primary key columns */
  page_config_sections_by_pk?: Maybe<Page_Config_Sections>;
  /** fetch data from the table: "page_configs" */
  page_configs: Array<Page_Configs>;
  /** fetch aggregated fields from the table: "page_configs" */
  page_configs_aggregate: Page_Configs_Aggregate;
  /** fetch data from the table: "page_configs" using primary key columns */
  page_configs_by_pk?: Maybe<Page_Configs>;
  /** fetch data from the table: "payment_methods" */
  payment_methods: Array<Payment_Methods>;
  /** fetch aggregated fields from the table: "payment_methods" */
  payment_methods_aggregate: Payment_Methods_Aggregate;
  /** fetch data from the table: "payment_methods" using primary key columns */
  payment_methods_by_pk?: Maybe<Payment_Methods>;
  /** fetch data from the table: "payout_items" */
  payout_items: Array<Payout_Items>;
  /** fetch aggregated fields from the table: "payout_items" */
  payout_items_aggregate: Payout_Items_Aggregate;
  /** fetch data from the table: "payout_items" using primary key columns */
  payout_items_by_pk?: Maybe<Payout_Items>;
  /** fetch data from the table: "payout_methods" */
  payout_methods: Array<Payout_Methods>;
  /** fetch aggregated fields from the table: "payout_methods" */
  payout_methods_aggregate: Payout_Methods_Aggregate;
  /** fetch data from the table: "payout_methods" using primary key columns */
  payout_methods_by_pk?: Maybe<Payout_Methods>;
  /** fetch data from the table: "phone_numbers" */
  phone_numbers: Array<Phone_Numbers>;
  /** fetch aggregated fields from the table: "phone_numbers" */
  phone_numbers_aggregate: Phone_Numbers_Aggregate;
  /** fetch data from the table: "phone_numbers" using primary key columns */
  phone_numbers_by_pk?: Maybe<Phone_Numbers>;
  /** fetch data from the table: "product_file_owners" */
  product_file_owners: Array<Product_File_Owners>;
  /** fetch aggregated fields from the table: "product_file_owners" */
  product_file_owners_aggregate: Product_File_Owners_Aggregate;
  /** fetch data from the table: "product_file_owners" using primary key columns */
  product_file_owners_by_pk?: Maybe<Product_File_Owners>;
  /** fetch data from the table: "product_files" */
  product_files: Array<Product_Files>;
  /** fetch aggregated fields from the table: "product_files" */
  product_files_aggregate: Product_Files_Aggregate;
  /** fetch data from the table: "product_files" using primary key columns */
  product_files_by_pk?: Maybe<Product_Files>;
  /** fetch data from the table: "product_preview_items" */
  product_preview_items: Array<Product_Preview_Items>;
  /** fetch aggregated fields from the table: "product_preview_items" */
  product_preview_items_aggregate: Product_Preview_Items_Aggregate;
  /** fetch data from the table: "product_preview_items" using primary key columns */
  product_preview_items_by_pk?: Maybe<Product_Preview_Items>;
  /** fetch data from the table: "product_snapshots" */
  product_snapshots: Array<Product_Snapshots>;
  /** fetch aggregated fields from the table: "product_snapshots" */
  product_snapshots_aggregate: Product_Snapshots_Aggregate;
  /** fetch data from the table: "product_snapshots" using primary key columns */
  product_snapshots_by_pk?: Maybe<Product_Snapshots>;
  /** fetch data from the table: "product_variants" */
  product_variants: Array<Product_Variants>;
  /** fetch aggregated fields from the table: "product_variants" */
  product_variants_aggregate: Product_Variants_Aggregate;
  /** fetch data from the table: "product_variants" using primary key columns */
  product_variants_by_pk?: Maybe<Product_Variants>;
  /** An array relationship */
  products: Array<Products>;
  /** An aggregate relationship */
  products_aggregate: Products_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "promoted_lists" */
  promoted_lists: Array<Promoted_Lists>;
  /** fetch aggregated fields from the table: "promoted_lists" */
  promoted_lists_aggregate: Promoted_Lists_Aggregate;
  /** fetch data from the table: "promoted_lists" using primary key columns */
  promoted_lists_by_pk?: Maybe<Promoted_Lists>;
  /** fetch data from the table: "promoted_slots" */
  promoted_slots: Array<Promoted_Slots>;
  /** fetch aggregated fields from the table: "promoted_slots" */
  promoted_slots_aggregate: Promoted_Slots_Aggregate;
  /** fetch data from the table: "promoted_slots" using primary key columns */
  promoted_slots_by_pk?: Maybe<Promoted_Slots>;
  /** fetch data from the table: "promotion_purchases" */
  promotion_purchases: Array<Promotion_Purchases>;
  /** fetch aggregated fields from the table: "promotion_purchases" */
  promotion_purchases_aggregate: Promotion_Purchases_Aggregate;
  /** fetch data from the table: "promotion_purchases" using primary key columns */
  promotion_purchases_by_pk?: Maybe<Promotion_Purchases>;
  /** fetch data from the table: "ratings" */
  ratings: Array<Ratings>;
  /** fetch aggregated fields from the table: "ratings" */
  ratings_aggregate: Ratings_Aggregate;
  /** fetch data from the table: "ratings" using primary key columns */
  ratings_by_pk?: Maybe<Ratings>;
  /** fetch data from the table: "refunds" */
  refunds: Array<Refunds>;
  /** fetch aggregated fields from the table: "refunds" */
  refunds_aggregate: Refunds_Aggregate;
  /** fetch data from the table: "refunds" using primary key columns */
  refunds_by_pk?: Maybe<Refunds>;
  /** fetch data from the table: "saved_search_hits" */
  saved_search_hits: Array<Saved_Search_Hits>;
  /** fetch aggregated fields from the table: "saved_search_hits" */
  saved_search_hits_aggregate: Saved_Search_Hits_Aggregate;
  /** fetch data from the table: "saved_search_hits" using primary key columns */
  saved_search_hits_by_pk?: Maybe<Saved_Search_Hits>;
  /** fetch data from the table: "saved_searches" */
  saved_searches: Array<Saved_Searches>;
  /** fetch aggregated fields from the table: "saved_searches" */
  saved_searches_aggregate: Saved_Searches_Aggregate;
  /** fetch data from the table: "saved_searches" using primary key columns */
  saved_searches_by_pk?: Maybe<Saved_Searches>;
  /** fetch data from the table: "signup_emails" */
  signup_emails: Array<Signup_Emails>;
  /** fetch aggregated fields from the table: "signup_emails" */
  signup_emails_aggregate: Signup_Emails_Aggregate;
  /** fetch data from the table: "signup_emails" using primary key columns */
  signup_emails_by_pk?: Maybe<Signup_Emails>;
  /** fetch data from the table: "stores" */
  stores: Array<Stores>;
  /** fetch aggregated fields from the table: "stores" */
  stores_aggregate: Stores_Aggregate;
  /** fetch data from the table: "stores" using primary key columns */
  stores_by_pk?: Maybe<Stores>;
  /** fetch data from the table: "transactions" */
  transactions: Array<Transactions>;
  /** fetch aggregated fields from the table: "transactions" */
  transactions_aggregate: Transactions_Aggregate;
  /** fetch data from the table: "transactions" using primary key columns */
  transactions_by_pk?: Maybe<Transactions>;
  /** fetch data from the table: "unique_product_views" */
  unique_product_views: Array<Unique_Product_Views>;
  /** fetch aggregated fields from the table: "unique_product_views" */
  unique_product_views_aggregate: Unique_Product_Views_Aggregate;
  /** fetch data from the table: "unique_product_views" using primary key columns */
  unique_product_views_by_pk?: Maybe<Unique_Product_Views>;
  /** fetch data from the table: "user_licenses" */
  user_licenses: Array<User_Licenses>;
  /** fetch aggregated fields from the table: "user_licenses" */
  user_licenses_aggregate: User_Licenses_Aggregate;
  /** fetch data from the table: "user_licenses" using primary key columns */
  user_licenses_by_pk?: Maybe<User_Licenses>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "users_online" */
  users_online: Array<Users_Online>;
  /** fetch aggregated fields from the table: "users_online" */
  users_online_aggregate: Users_Online_Aggregate;
  /** fetch data from the table: "users_orders_metrics" */
  users_orders_metrics: Array<Users_Orders_Metrics>;
  /** fetch aggregated fields from the table: "users_orders_metrics" */
  users_orders_metrics_aggregate: Users_Orders_Metrics_Aggregate;
  /** fetch data from the table: "users_typing" */
  users_typing: Array<Users_Typing>;
  /** fetch aggregated fields from the table: "users_typing" */
  users_typing_aggregate: Users_Typing_Aggregate;
  numberIncremented?: Maybe<Scalars['Int']>;
  saidSomething?: Maybe<Scalars['String']>;
  /** myConversations: JSON */
  myConversations?: Maybe<Array<Maybe<Conversation>>>;
  newsItemsSortByNewConnection?: Maybe<NewsItemsConnection>;
};


export type SubscriptionBidsArgs = {
  distinct_on?: Maybe<Array<Bids_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Bids_Order_By>>;
  where?: Maybe<Bids_Bool_Exp>;
};


export type SubscriptionBids_AggregateArgs = {
  distinct_on?: Maybe<Array<Bids_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Bids_Order_By>>;
  where?: Maybe<Bids_Bool_Exp>;
};


export type SubscriptionBids_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionCalibersArgs = {
  distinct_on?: Maybe<Array<Calibers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Calibers_Order_By>>;
  where?: Maybe<Calibers_Bool_Exp>;
};


export type SubscriptionCalibers_AggregateArgs = {
  distinct_on?: Maybe<Array<Calibers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Calibers_Order_By>>;
  where?: Maybe<Calibers_Bool_Exp>;
};


export type SubscriptionCalibers_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionCategoriesArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};


export type SubscriptionCategories_AggregateArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};


export type SubscriptionCategories_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionChat_MessagesArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};


export type SubscriptionChat_Messages_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};


export type SubscriptionChat_Messages_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionChat_RoomsArgs = {
  distinct_on?: Maybe<Array<Chat_Rooms_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Rooms_Order_By>>;
  where?: Maybe<Chat_Rooms_Bool_Exp>;
};


export type SubscriptionChat_Rooms_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Rooms_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Rooms_Order_By>>;
  where?: Maybe<Chat_Rooms_Bool_Exp>;
};


export type SubscriptionChat_Rooms_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionChat_UsersArgs = {
  distinct_on?: Maybe<Array<Chat_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Users_Order_By>>;
  where?: Maybe<Chat_Users_Bool_Exp>;
};


export type SubscriptionChat_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Users_Order_By>>;
  where?: Maybe<Chat_Users_Bool_Exp>;
};


export type SubscriptionChat_Users_By_PkArgs = {
  chatRoomId: Scalars['String'];
  userId: Scalars['String'];
};


export type SubscriptionClassified_Ad_PurchasesArgs = {
  distinct_on?: Maybe<Array<Classified_Ad_Purchases_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Classified_Ad_Purchases_Order_By>>;
  where?: Maybe<Classified_Ad_Purchases_Bool_Exp>;
};


export type SubscriptionClassified_Ad_Purchases_AggregateArgs = {
  distinct_on?: Maybe<Array<Classified_Ad_Purchases_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Classified_Ad_Purchases_Order_By>>;
  where?: Maybe<Classified_Ad_Purchases_Bool_Exp>;
};


export type SubscriptionClassified_Ad_Purchases_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionCollection_ItemsArgs = {
  distinct_on?: Maybe<Array<Collection_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Collection_Items_Order_By>>;
  where?: Maybe<Collection_Items_Bool_Exp>;
};


export type SubscriptionCollection_Items_AggregateArgs = {
  distinct_on?: Maybe<Array<Collection_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Collection_Items_Order_By>>;
  where?: Maybe<Collection_Items_Bool_Exp>;
};


export type SubscriptionCollection_Items_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionCollectionsArgs = {
  distinct_on?: Maybe<Array<Collections_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Collections_Order_By>>;
  where?: Maybe<Collections_Bool_Exp>;
};


export type SubscriptionCollections_AggregateArgs = {
  distinct_on?: Maybe<Array<Collections_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Collections_Order_By>>;
  where?: Maybe<Collections_Bool_Exp>;
};


export type SubscriptionCollections_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionDealersArgs = {
  distinct_on?: Maybe<Array<Dealers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dealers_Order_By>>;
  where?: Maybe<Dealers_Bool_Exp>;
};


export type SubscriptionDealers_AggregateArgs = {
  distinct_on?: Maybe<Array<Dealers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dealers_Order_By>>;
  where?: Maybe<Dealers_Bool_Exp>;
};


export type SubscriptionDealers_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionEmail_SubscriptionsArgs = {
  distinct_on?: Maybe<Array<Email_Subscriptions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Email_Subscriptions_Order_By>>;
  where?: Maybe<Email_Subscriptions_Bool_Exp>;
};


export type SubscriptionEmail_Subscriptions_AggregateArgs = {
  distinct_on?: Maybe<Array<Email_Subscriptions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Email_Subscriptions_Order_By>>;
  where?: Maybe<Email_Subscriptions_Bool_Exp>;
};


export type SubscriptionEmail_Subscriptions_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionEmailsArgs = {
  distinct_on?: Maybe<Array<Emails_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Emails_Order_By>>;
  where?: Maybe<Emails_Bool_Exp>;
};


export type SubscriptionEmails_AggregateArgs = {
  distinct_on?: Maybe<Array<Emails_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Emails_Order_By>>;
  where?: Maybe<Emails_Bool_Exp>;
};


export type SubscriptionEmails_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionExternal_Product_SnapshotsArgs = {
  distinct_on?: Maybe<Array<External_Product_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<External_Product_Snapshots_Order_By>>;
  where?: Maybe<External_Product_Snapshots_Bool_Exp>;
};


export type SubscriptionExternal_Product_Snapshots_AggregateArgs = {
  distinct_on?: Maybe<Array<External_Product_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<External_Product_Snapshots_Order_By>>;
  where?: Maybe<External_Product_Snapshots_Bool_Exp>;
};


export type SubscriptionExternal_Product_Snapshots_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionExternal_ProductsArgs = {
  distinct_on?: Maybe<Array<External_Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<External_Products_Order_By>>;
  where?: Maybe<External_Products_Bool_Exp>;
};


export type SubscriptionExternal_Products_AggregateArgs = {
  distinct_on?: Maybe<Array<External_Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<External_Products_Order_By>>;
  where?: Maybe<External_Products_Bool_Exp>;
};


export type SubscriptionExternal_Products_By_PkArgs = {
  sourceSite: Scalars['String'];
  sourceSiteId: Scalars['String'];
};


export type SubscriptionImage_OwnersArgs = {
  distinct_on?: Maybe<Array<Image_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Owners_Order_By>>;
  where?: Maybe<Image_Owners_Bool_Exp>;
};


export type SubscriptionImage_Owners_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Owners_Order_By>>;
  where?: Maybe<Image_Owners_Bool_Exp>;
};


export type SubscriptionImage_Owners_By_PkArgs = {
  imageId: Scalars['String'];
};


export type SubscriptionImage_ParentsArgs = {
  distinct_on?: Maybe<Array<Image_Parents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Parents_Order_By>>;
  where?: Maybe<Image_Parents_Bool_Exp>;
};


export type SubscriptionImage_Parents_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Parents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Parents_Order_By>>;
  where?: Maybe<Image_Parents_Bool_Exp>;
};


export type SubscriptionImage_Parents_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionImage_VariantsArgs = {
  distinct_on?: Maybe<Array<Image_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Variants_Order_By>>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};


export type SubscriptionImage_Variants_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Variants_Order_By>>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};


export type SubscriptionImage_Variants_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionList_Products_RandomArgs = {
  args: List_Products_Random_Args;
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type SubscriptionList_Products_Random_AggregateArgs = {
  args: List_Products_Random_Args;
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type SubscriptionMigrationsArgs = {
  distinct_on?: Maybe<Array<Migrations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Migrations_Order_By>>;
  where?: Maybe<Migrations_Bool_Exp>;
};


export type SubscriptionMigrations_AggregateArgs = {
  distinct_on?: Maybe<Array<Migrations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Migrations_Order_By>>;
  where?: Maybe<Migrations_Bool_Exp>;
};


export type SubscriptionMigrations_By_PkArgs = {
  id: Scalars['Int'];
};


export type SubscriptionNews_Item_VotesArgs = {
  distinct_on?: Maybe<Array<News_Item_Votes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<News_Item_Votes_Order_By>>;
  where?: Maybe<News_Item_Votes_Bool_Exp>;
};


export type SubscriptionNews_Item_Votes_AggregateArgs = {
  distinct_on?: Maybe<Array<News_Item_Votes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<News_Item_Votes_Order_By>>;
  where?: Maybe<News_Item_Votes_Bool_Exp>;
};


export type SubscriptionNews_Item_Votes_By_PkArgs = {
  newsItemId: Scalars['String'];
  userId: Scalars['String'];
};


export type SubscriptionNews_ItemsArgs = {
  distinct_on?: Maybe<Array<News_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<News_Items_Order_By>>;
  where?: Maybe<News_Items_Bool_Exp>;
};


export type SubscriptionNews_Items_AggregateArgs = {
  distinct_on?: Maybe<Array<News_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<News_Items_Order_By>>;
  where?: Maybe<News_Items_Bool_Exp>;
};


export type SubscriptionNews_Items_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionOrder_SnapshotsArgs = {
  distinct_on?: Maybe<Array<Order_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Order_Snapshots_Order_By>>;
  where?: Maybe<Order_Snapshots_Bool_Exp>;
};


export type SubscriptionOrder_Snapshots_AggregateArgs = {
  distinct_on?: Maybe<Array<Order_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Order_Snapshots_Order_By>>;
  where?: Maybe<Order_Snapshots_Bool_Exp>;
};


export type SubscriptionOrder_Snapshots_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionOrdersArgs = {
  distinct_on?: Maybe<Array<Orders_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orders_Order_By>>;
  where?: Maybe<Orders_Bool_Exp>;
};


export type SubscriptionOrders_AggregateArgs = {
  distinct_on?: Maybe<Array<Orders_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orders_Order_By>>;
  where?: Maybe<Orders_Bool_Exp>;
};


export type SubscriptionOrders_Approved_Grouped_By_DayArgs = {
  distinct_on?: Maybe<Array<Orders_Approved_Grouped_By_Day_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orders_Approved_Grouped_By_Day_Order_By>>;
  where?: Maybe<Orders_Approved_Grouped_By_Day_Bool_Exp>;
};


export type SubscriptionOrders_Approved_Grouped_By_Day_AggregateArgs = {
  distinct_on?: Maybe<Array<Orders_Approved_Grouped_By_Day_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orders_Approved_Grouped_By_Day_Order_By>>;
  where?: Maybe<Orders_Approved_Grouped_By_Day_Bool_Exp>;
};


export type SubscriptionOrders_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionOrders_Complete_Grouped_By_DayArgs = {
  distinct_on?: Maybe<Array<Orders_Complete_Grouped_By_Day_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orders_Complete_Grouped_By_Day_Order_By>>;
  where?: Maybe<Orders_Complete_Grouped_By_Day_Bool_Exp>;
};


export type SubscriptionOrders_Complete_Grouped_By_Day_AggregateArgs = {
  distinct_on?: Maybe<Array<Orders_Complete_Grouped_By_Day_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orders_Complete_Grouped_By_Day_Order_By>>;
  where?: Maybe<Orders_Complete_Grouped_By_Day_Bool_Exp>;
};


export type SubscriptionPage_Config_SectionsArgs = {
  distinct_on?: Maybe<Array<Page_Config_Sections_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Config_Sections_Order_By>>;
  where?: Maybe<Page_Config_Sections_Bool_Exp>;
};


export type SubscriptionPage_Config_Sections_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Config_Sections_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Config_Sections_Order_By>>;
  where?: Maybe<Page_Config_Sections_Bool_Exp>;
};


export type SubscriptionPage_Config_Sections_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionPage_ConfigsArgs = {
  distinct_on?: Maybe<Array<Page_Configs_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Configs_Order_By>>;
  where?: Maybe<Page_Configs_Bool_Exp>;
};


export type SubscriptionPage_Configs_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Configs_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Configs_Order_By>>;
  where?: Maybe<Page_Configs_Bool_Exp>;
};


export type SubscriptionPage_Configs_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionPayment_MethodsArgs = {
  distinct_on?: Maybe<Array<Payment_Methods_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payment_Methods_Order_By>>;
  where?: Maybe<Payment_Methods_Bool_Exp>;
};


export type SubscriptionPayment_Methods_AggregateArgs = {
  distinct_on?: Maybe<Array<Payment_Methods_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payment_Methods_Order_By>>;
  where?: Maybe<Payment_Methods_Bool_Exp>;
};


export type SubscriptionPayment_Methods_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionPayout_ItemsArgs = {
  distinct_on?: Maybe<Array<Payout_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payout_Items_Order_By>>;
  where?: Maybe<Payout_Items_Bool_Exp>;
};


export type SubscriptionPayout_Items_AggregateArgs = {
  distinct_on?: Maybe<Array<Payout_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payout_Items_Order_By>>;
  where?: Maybe<Payout_Items_Bool_Exp>;
};


export type SubscriptionPayout_Items_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionPayout_MethodsArgs = {
  distinct_on?: Maybe<Array<Payout_Methods_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payout_Methods_Order_By>>;
  where?: Maybe<Payout_Methods_Bool_Exp>;
};


export type SubscriptionPayout_Methods_AggregateArgs = {
  distinct_on?: Maybe<Array<Payout_Methods_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payout_Methods_Order_By>>;
  where?: Maybe<Payout_Methods_Bool_Exp>;
};


export type SubscriptionPayout_Methods_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionPhone_NumbersArgs = {
  distinct_on?: Maybe<Array<Phone_Numbers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Phone_Numbers_Order_By>>;
  where?: Maybe<Phone_Numbers_Bool_Exp>;
};


export type SubscriptionPhone_Numbers_AggregateArgs = {
  distinct_on?: Maybe<Array<Phone_Numbers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Phone_Numbers_Order_By>>;
  where?: Maybe<Phone_Numbers_Bool_Exp>;
};


export type SubscriptionPhone_Numbers_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionProduct_File_OwnersArgs = {
  distinct_on?: Maybe<Array<Product_File_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_File_Owners_Order_By>>;
  where?: Maybe<Product_File_Owners_Bool_Exp>;
};


export type SubscriptionProduct_File_Owners_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_File_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_File_Owners_Order_By>>;
  where?: Maybe<Product_File_Owners_Bool_Exp>;
};


export type SubscriptionProduct_File_Owners_By_PkArgs = {
  fileId: Scalars['String'];
};


export type SubscriptionProduct_FilesArgs = {
  distinct_on?: Maybe<Array<Product_Files_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Files_Order_By>>;
  where?: Maybe<Product_Files_Bool_Exp>;
};


export type SubscriptionProduct_Files_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Files_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Files_Order_By>>;
  where?: Maybe<Product_Files_Bool_Exp>;
};


export type SubscriptionProduct_Files_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionProduct_Preview_ItemsArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};


export type SubscriptionProduct_Preview_Items_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};


export type SubscriptionProduct_Preview_Items_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionProduct_SnapshotsArgs = {
  distinct_on?: Maybe<Array<Product_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Snapshots_Order_By>>;
  where?: Maybe<Product_Snapshots_Bool_Exp>;
};


export type SubscriptionProduct_Snapshots_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Snapshots_Order_By>>;
  where?: Maybe<Product_Snapshots_Bool_Exp>;
};


export type SubscriptionProduct_Snapshots_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionProduct_VariantsArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


export type SubscriptionProduct_Variants_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


export type SubscriptionProduct_Variants_By_PkArgs = {
  variantId: Scalars['String'];
};


export type SubscriptionProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type SubscriptionProducts_AggregateArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type SubscriptionProducts_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionPromoted_ListsArgs = {
  distinct_on?: Maybe<Array<Promoted_Lists_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Promoted_Lists_Order_By>>;
  where?: Maybe<Promoted_Lists_Bool_Exp>;
};


export type SubscriptionPromoted_Lists_AggregateArgs = {
  distinct_on?: Maybe<Array<Promoted_Lists_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Promoted_Lists_Order_By>>;
  where?: Maybe<Promoted_Lists_Bool_Exp>;
};


export type SubscriptionPromoted_Lists_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionPromoted_SlotsArgs = {
  distinct_on?: Maybe<Array<Promoted_Slots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Promoted_Slots_Order_By>>;
  where?: Maybe<Promoted_Slots_Bool_Exp>;
};


export type SubscriptionPromoted_Slots_AggregateArgs = {
  distinct_on?: Maybe<Array<Promoted_Slots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Promoted_Slots_Order_By>>;
  where?: Maybe<Promoted_Slots_Bool_Exp>;
};


export type SubscriptionPromoted_Slots_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionPromotion_PurchasesArgs = {
  distinct_on?: Maybe<Array<Promotion_Purchases_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Promotion_Purchases_Order_By>>;
  where?: Maybe<Promotion_Purchases_Bool_Exp>;
};


export type SubscriptionPromotion_Purchases_AggregateArgs = {
  distinct_on?: Maybe<Array<Promotion_Purchases_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Promotion_Purchases_Order_By>>;
  where?: Maybe<Promotion_Purchases_Bool_Exp>;
};


export type SubscriptionPromotion_Purchases_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionRatingsArgs = {
  distinct_on?: Maybe<Array<Ratings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Ratings_Order_By>>;
  where?: Maybe<Ratings_Bool_Exp>;
};


export type SubscriptionRatings_AggregateArgs = {
  distinct_on?: Maybe<Array<Ratings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Ratings_Order_By>>;
  where?: Maybe<Ratings_Bool_Exp>;
};


export type SubscriptionRatings_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionRefundsArgs = {
  distinct_on?: Maybe<Array<Refunds_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Refunds_Order_By>>;
  where?: Maybe<Refunds_Bool_Exp>;
};


export type SubscriptionRefunds_AggregateArgs = {
  distinct_on?: Maybe<Array<Refunds_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Refunds_Order_By>>;
  where?: Maybe<Refunds_Bool_Exp>;
};


export type SubscriptionRefunds_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionSaved_Search_HitsArgs = {
  distinct_on?: Maybe<Array<Saved_Search_Hits_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Saved_Search_Hits_Order_By>>;
  where?: Maybe<Saved_Search_Hits_Bool_Exp>;
};


export type SubscriptionSaved_Search_Hits_AggregateArgs = {
  distinct_on?: Maybe<Array<Saved_Search_Hits_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Saved_Search_Hits_Order_By>>;
  where?: Maybe<Saved_Search_Hits_Bool_Exp>;
};


export type SubscriptionSaved_Search_Hits_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionSaved_SearchesArgs = {
  distinct_on?: Maybe<Array<Saved_Searches_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Saved_Searches_Order_By>>;
  where?: Maybe<Saved_Searches_Bool_Exp>;
};


export type SubscriptionSaved_Searches_AggregateArgs = {
  distinct_on?: Maybe<Array<Saved_Searches_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Saved_Searches_Order_By>>;
  where?: Maybe<Saved_Searches_Bool_Exp>;
};


export type SubscriptionSaved_Searches_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionSignup_EmailsArgs = {
  distinct_on?: Maybe<Array<Signup_Emails_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Signup_Emails_Order_By>>;
  where?: Maybe<Signup_Emails_Bool_Exp>;
};


export type SubscriptionSignup_Emails_AggregateArgs = {
  distinct_on?: Maybe<Array<Signup_Emails_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Signup_Emails_Order_By>>;
  where?: Maybe<Signup_Emails_Bool_Exp>;
};


export type SubscriptionSignup_Emails_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionStoresArgs = {
  distinct_on?: Maybe<Array<Stores_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Stores_Order_By>>;
  where?: Maybe<Stores_Bool_Exp>;
};


export type SubscriptionStores_AggregateArgs = {
  distinct_on?: Maybe<Array<Stores_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Stores_Order_By>>;
  where?: Maybe<Stores_Bool_Exp>;
};


export type SubscriptionStores_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionTransactionsArgs = {
  distinct_on?: Maybe<Array<Transactions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transactions_Order_By>>;
  where?: Maybe<Transactions_Bool_Exp>;
};


export type SubscriptionTransactions_AggregateArgs = {
  distinct_on?: Maybe<Array<Transactions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transactions_Order_By>>;
  where?: Maybe<Transactions_Bool_Exp>;
};


export type SubscriptionTransactions_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionUnique_Product_ViewsArgs = {
  distinct_on?: Maybe<Array<Unique_Product_Views_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Unique_Product_Views_Order_By>>;
  where?: Maybe<Unique_Product_Views_Bool_Exp>;
};


export type SubscriptionUnique_Product_Views_AggregateArgs = {
  distinct_on?: Maybe<Array<Unique_Product_Views_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Unique_Product_Views_Order_By>>;
  where?: Maybe<Unique_Product_Views_Bool_Exp>;
};


export type SubscriptionUnique_Product_Views_By_PkArgs = {
  productId: Scalars['String'];
  userId: Scalars['String'];
};


export type SubscriptionUser_LicensesArgs = {
  distinct_on?: Maybe<Array<User_Licenses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Licenses_Order_By>>;
  where?: Maybe<User_Licenses_Bool_Exp>;
};


export type SubscriptionUser_Licenses_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Licenses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Licenses_Order_By>>;
  where?: Maybe<User_Licenses_Bool_Exp>;
};


export type SubscriptionUser_Licenses_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type SubscriptionUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type SubscriptionUsers_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionUsers_OnlineArgs = {
  distinct_on?: Maybe<Array<Users_Online_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Online_Order_By>>;
  where?: Maybe<Users_Online_Bool_Exp>;
};


export type SubscriptionUsers_Online_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Online_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Online_Order_By>>;
  where?: Maybe<Users_Online_Bool_Exp>;
};


export type SubscriptionUsers_Orders_MetricsArgs = {
  distinct_on?: Maybe<Array<Users_Orders_Metrics_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Orders_Metrics_Order_By>>;
  where?: Maybe<Users_Orders_Metrics_Bool_Exp>;
};


export type SubscriptionUsers_Orders_Metrics_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Orders_Metrics_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Orders_Metrics_Order_By>>;
  where?: Maybe<Users_Orders_Metrics_Bool_Exp>;
};


export type SubscriptionUsers_TypingArgs = {
  distinct_on?: Maybe<Array<Users_Typing_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Typing_Order_By>>;
  where?: Maybe<Users_Typing_Bool_Exp>;
};


export type SubscriptionUsers_Typing_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Typing_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Typing_Order_By>>;
  where?: Maybe<Users_Typing_Bool_Exp>;
};


export type SubscriptionMyConversationsArgs = {
  chatRoomStatuses: Array<Scalars['String']>;
  messageLimit?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type SubscriptionNewsItemsSortByNewConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type TransactionsConnection = {
  __typename?: 'TransactionsConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<Transactions>;
};

export type UploadRegisterMutationResponse = {
  __typename?: 'UploadRegisterMutationResponse';
  uploadId: Scalars['ID'];
  putUrl: Scalars['String'];
};

export type UploadSaveFileMutationResponse = {
  __typename?: 'UploadSaveFileMutationResponse';
  fileId: Scalars['ID'];
};

export type UploadSaveImageMutationResponse = {
  __typename?: 'UploadSaveImageMutationResponse';
  image: Image_Parents;
};

/** A category of file upload – each one has a different purpose. */
export enum UploadType {
  IMAGE = 'IMAGE',
  PRODUCT_FILE = 'PRODUCT_FILE'
}

export type UserMutationResponse = {
  __typename?: 'UserMutationResponse';
  user: UserPrivate;
};

export type UserOrderMetrics = {
  __typename?: 'UserOrderMetrics';
  id?: Maybe<Scalars['ID']>;
  itemsBought?: Maybe<Scalars['Int']>;
  totalSpend?: Maybe<Scalars['Int']>;
  itemsSold?: Maybe<Scalars['Int']>;
  totalSales?: Maybe<Scalars['Int']>;
  avgDisposalTimeHrs?: Maybe<Scalars['Float']>;
  avgApprovalTimeHrs?: Maybe<Scalars['Float']>;
};

/** Private user info */
export type UserPrivate = BasicUser & {
  __typename?: 'UserPrivate';
  id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Date']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  email: Scalars['String'];
  emailVerified?: Maybe<Scalars['Boolean']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  userRole: Role;
  paymentMethods?: Maybe<Array<Maybe<Payment_Methods>>>;
  defaultPaymentMethodId?: Maybe<Scalars['ID']>;
  defaultPaymentMethod?: Maybe<Payment_Methods>;
  isSuspended: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  lastSeen?: Maybe<Scalars['Date']>;
  storeId?: Maybe<Scalars['ID']>;
  store?: Maybe<StorePrivate>;
  payoutMethodId?: Maybe<Scalars['ID']>;
  payoutMethod?: Maybe<Payout_Methods>;
  collections?: Maybe<Array<Maybe<Collection>>>;
  followingStores?: Maybe<FollowingStoresConnection>;
  defaultLicenseId?: Maybe<Scalars['String']>;
  defaultLicense?: Maybe<User_Licenses>;
  licenses?: Maybe<Array<Maybe<User_Licenses>>>;
  phoneNumberId?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Phone_Numbers>;
  dealerId?: Maybe<Scalars['String']>;
  dealer?: Maybe<Dealer>;
  orderMetrics?: Maybe<UserOrderMetrics>;
  isWhitelisted?: Maybe<Scalars['Boolean']>;
};


/** Private user info */
export type UserPrivateFollowingStoresArgs = {
  query?: Maybe<ConnectionQuery>;
};

/** Public user info */
export type UserPublic = BasicUser & {
  __typename?: 'UserPublic';
  id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Date']>;
  /**
   * firstName: String
   * lastName: String
   * email: String
   * userRole: Role
   */
  defaultLicenseId?: Maybe<Scalars['String']>;
  defaultLicense?: Maybe<User_Licenses>;
  licenses?: Maybe<Array<Maybe<User_Licenses>>>;
  dealerId?: Maybe<Scalars['String']>;
  dealer?: Maybe<Dealer>;
  orderMetrics?: Maybe<UserOrderMetrics>;
};

export type UserWithMobileNumber = BasicUser & {
  __typename?: 'UserWithMobileNumber';
  id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Date']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  userRole: Role;
  defaultLicenseId?: Maybe<Scalars['String']>;
  defaultLicense?: Maybe<User_Licenses>;
  licenses?: Maybe<Array<Maybe<User_Licenses>>>;
  phoneNumberId?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Phone_Numbers>;
  dealerId?: Maybe<Scalars['String']>;
  dealer?: Maybe<Dealer>;
  orderMetrics?: Maybe<UserOrderMetrics>;
};

export type UserWithRole = BasicUser & {
  __typename?: 'UserWithRole';
  id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Date']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  /** email: String */
  userRole: Role;
  defaultLicenseId?: Maybe<Scalars['String']>;
  defaultLicense?: Maybe<User_Licenses>;
  licenses?: Maybe<Array<Maybe<User_Licenses>>>;
  dealerId?: Maybe<Scalars['String']>;
  dealer?: Maybe<Dealer>;
  orderMetrics?: Maybe<UserOrderMetrics>;
};


/** Boolean expression to compare columns of type "_text". All fields are combined with logical 'AND'. */
export type _Text_Comparison_Exp = {
  _eq?: Maybe<Scalars['_text']>;
  _gt?: Maybe<Scalars['_text']>;
  _gte?: Maybe<Scalars['_text']>;
  _in?: Maybe<Array<Scalars['_text']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['_text']>;
  _lte?: Maybe<Scalars['_text']>;
  _neq?: Maybe<Scalars['_text']>;
  _nin?: Maybe<Array<Scalars['_text']>>;
};

/** columns and relationships of "bids" */
export type Bids = {
  __typename?: 'bids';
  acceptedPrice?: Maybe<Scalars['Int']>;
  bidStatus: Scalars['String'];
  createdAt?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  /** An object relationship */
  message?: Maybe<Chat_Messages>;
  offerPrice: Scalars['Int'];
  orderId?: Maybe<Scalars['String']>;
  productId: Scalars['String'];
  productSnapshotId: Scalars['String'];
  updatedAt?: Maybe<Scalars['timestamptz']>;
  variantId?: Maybe<Scalars['String']>;
};

/** aggregated selection of "bids" */
export type Bids_Aggregate = {
  __typename?: 'bids_aggregate';
  aggregate?: Maybe<Bids_Aggregate_Fields>;
  nodes: Array<Bids>;
};

/** aggregate fields of "bids" */
export type Bids_Aggregate_Fields = {
  __typename?: 'bids_aggregate_fields';
  avg?: Maybe<Bids_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Bids_Max_Fields>;
  min?: Maybe<Bids_Min_Fields>;
  stddev?: Maybe<Bids_Stddev_Fields>;
  stddev_pop?: Maybe<Bids_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Bids_Stddev_Samp_Fields>;
  sum?: Maybe<Bids_Sum_Fields>;
  var_pop?: Maybe<Bids_Var_Pop_Fields>;
  var_samp?: Maybe<Bids_Var_Samp_Fields>;
  variance?: Maybe<Bids_Variance_Fields>;
};


/** aggregate fields of "bids" */
export type Bids_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Bids_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Bids_Avg_Fields = {
  __typename?: 'bids_avg_fields';
  acceptedPrice?: Maybe<Scalars['Float']>;
  offerPrice?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "bids". All fields are combined with a logical 'AND'. */
export type Bids_Bool_Exp = {
  _and?: Maybe<Array<Bids_Bool_Exp>>;
  _not?: Maybe<Bids_Bool_Exp>;
  _or?: Maybe<Array<Bids_Bool_Exp>>;
  acceptedPrice?: Maybe<Int_Comparison_Exp>;
  bidStatus?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  message?: Maybe<Chat_Messages_Bool_Exp>;
  offerPrice?: Maybe<Int_Comparison_Exp>;
  orderId?: Maybe<String_Comparison_Exp>;
  productId?: Maybe<String_Comparison_Exp>;
  productSnapshotId?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  variantId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "bids" */
export enum Bids_Constraint {
  /** unique or primary key constraint */
  BIDS_PKEY = 'bids_pkey'
}

/** input type for incrementing numeric columns in table "bids" */
export type Bids_Inc_Input = {
  acceptedPrice?: Maybe<Scalars['Int']>;
  offerPrice?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "bids" */
export type Bids_Insert_Input = {
  acceptedPrice?: Maybe<Scalars['Int']>;
  bidStatus?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  message?: Maybe<Chat_Messages_Obj_Rel_Insert_Input>;
  offerPrice?: Maybe<Scalars['Int']>;
  orderId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productSnapshotId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  variantId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Bids_Max_Fields = {
  __typename?: 'bids_max_fields';
  acceptedPrice?: Maybe<Scalars['Int']>;
  bidStatus?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  offerPrice?: Maybe<Scalars['Int']>;
  orderId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productSnapshotId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  variantId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Bids_Min_Fields = {
  __typename?: 'bids_min_fields';
  acceptedPrice?: Maybe<Scalars['Int']>;
  bidStatus?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  offerPrice?: Maybe<Scalars['Int']>;
  orderId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productSnapshotId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  variantId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "bids" */
export type Bids_Mutation_Response = {
  __typename?: 'bids_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Bids>;
};

/** input type for inserting object relation for remote table "bids" */
export type Bids_Obj_Rel_Insert_Input = {
  data: Bids_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Bids_On_Conflict>;
};

/** on conflict condition type for table "bids" */
export type Bids_On_Conflict = {
  constraint: Bids_Constraint;
  update_columns?: Array<Bids_Update_Column>;
  where?: Maybe<Bids_Bool_Exp>;
};

/** Ordering options when selecting data from "bids". */
export type Bids_Order_By = {
  acceptedPrice?: Maybe<Order_By>;
  bidStatus?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  message?: Maybe<Chat_Messages_Order_By>;
  offerPrice?: Maybe<Order_By>;
  orderId?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  productSnapshotId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  variantId?: Maybe<Order_By>;
};

/** primary key columns input for table: bids */
export type Bids_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "bids" */
export enum Bids_Select_Column {
  /** column name */
  ACCEPTEDPRICE = 'acceptedPrice',
  /** column name */
  BIDSTATUS = 'bidStatus',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  OFFERPRICE = 'offerPrice',
  /** column name */
  ORDERID = 'orderId',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  PRODUCTSNAPSHOTID = 'productSnapshotId',
  /** column name */
  UPDATEDAT = 'updatedAt',
  /** column name */
  VARIANTID = 'variantId'
}

/** input type for updating data in table "bids" */
export type Bids_Set_Input = {
  acceptedPrice?: Maybe<Scalars['Int']>;
  bidStatus?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  offerPrice?: Maybe<Scalars['Int']>;
  orderId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productSnapshotId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  variantId?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Bids_Stddev_Fields = {
  __typename?: 'bids_stddev_fields';
  acceptedPrice?: Maybe<Scalars['Float']>;
  offerPrice?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Bids_Stddev_Pop_Fields = {
  __typename?: 'bids_stddev_pop_fields';
  acceptedPrice?: Maybe<Scalars['Float']>;
  offerPrice?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Bids_Stddev_Samp_Fields = {
  __typename?: 'bids_stddev_samp_fields';
  acceptedPrice?: Maybe<Scalars['Float']>;
  offerPrice?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Bids_Sum_Fields = {
  __typename?: 'bids_sum_fields';
  acceptedPrice?: Maybe<Scalars['Int']>;
  offerPrice?: Maybe<Scalars['Int']>;
};

/** update columns of table "bids" */
export enum Bids_Update_Column {
  /** column name */
  ACCEPTEDPRICE = 'acceptedPrice',
  /** column name */
  BIDSTATUS = 'bidStatus',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  OFFERPRICE = 'offerPrice',
  /** column name */
  ORDERID = 'orderId',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  PRODUCTSNAPSHOTID = 'productSnapshotId',
  /** column name */
  UPDATEDAT = 'updatedAt',
  /** column name */
  VARIANTID = 'variantId'
}

/** aggregate var_pop on columns */
export type Bids_Var_Pop_Fields = {
  __typename?: 'bids_var_pop_fields';
  acceptedPrice?: Maybe<Scalars['Float']>;
  offerPrice?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Bids_Var_Samp_Fields = {
  __typename?: 'bids_var_samp_fields';
  acceptedPrice?: Maybe<Scalars['Float']>;
  offerPrice?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Bids_Variance_Fields = {
  __typename?: 'bids_variance_fields';
  acceptedPrice?: Maybe<Scalars['Float']>;
  offerPrice?: Maybe<Scalars['Float']>;
};


/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: Maybe<Scalars['bigint']>;
  _gt?: Maybe<Scalars['bigint']>;
  _gte?: Maybe<Scalars['bigint']>;
  _in?: Maybe<Array<Scalars['bigint']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['bigint']>;
  _lte?: Maybe<Scalars['bigint']>;
  _neq?: Maybe<Scalars['bigint']>;
  _nin?: Maybe<Array<Scalars['bigint']>>;
};

/** columns and relationships of "calibers" */
export type Calibers = {
  __typename?: 'calibers';
  group: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

/** aggregated selection of "calibers" */
export type Calibers_Aggregate = {
  __typename?: 'calibers_aggregate';
  aggregate?: Maybe<Calibers_Aggregate_Fields>;
  nodes: Array<Calibers>;
};

/** aggregate fields of "calibers" */
export type Calibers_Aggregate_Fields = {
  __typename?: 'calibers_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Calibers_Max_Fields>;
  min?: Maybe<Calibers_Min_Fields>;
};


/** aggregate fields of "calibers" */
export type Calibers_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Calibers_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "calibers". All fields are combined with a logical 'AND'. */
export type Calibers_Bool_Exp = {
  _and?: Maybe<Array<Calibers_Bool_Exp>>;
  _not?: Maybe<Calibers_Bool_Exp>;
  _or?: Maybe<Array<Calibers_Bool_Exp>>;
  group?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "calibers" */
export enum Calibers_Constraint {
  /** unique or primary key constraint */
  CALIBERS_PKEY = 'calibers_pkey'
}

/** input type for inserting data into table "calibers" */
export type Calibers_Insert_Input = {
  group?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Calibers_Max_Fields = {
  __typename?: 'calibers_max_fields';
  group?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Calibers_Min_Fields = {
  __typename?: 'calibers_min_fields';
  group?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "calibers" */
export type Calibers_Mutation_Response = {
  __typename?: 'calibers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Calibers>;
};

/** on conflict condition type for table "calibers" */
export type Calibers_On_Conflict = {
  constraint: Calibers_Constraint;
  update_columns?: Array<Calibers_Update_Column>;
  where?: Maybe<Calibers_Bool_Exp>;
};

/** Ordering options when selecting data from "calibers". */
export type Calibers_Order_By = {
  group?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** primary key columns input for table: calibers */
export type Calibers_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "calibers" */
export enum Calibers_Select_Column {
  /** column name */
  GROUP = 'group',
  /** column name */
  ID = 'id',
  /** column name */
  NAME = 'name'
}

/** input type for updating data in table "calibers" */
export type Calibers_Set_Input = {
  group?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** update columns of table "calibers" */
export enum Calibers_Update_Column {
  /** column name */
  GROUP = 'group',
  /** column name */
  ID = 'id',
  /** column name */
  NAME = 'name'
}

/** columns and relationships of "categories" */
export type Categories = {
  __typename?: 'categories';
  /** An object relationship */
  bannerImage?: Maybe<Image_Parents>;
  bannerImageId?: Maybe<Scalars['String']>;
  blurb?: Maybe<Scalars['String']>;
  categoryGroup?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamp'];
  id: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  /** An object relationship */
  thumbImage?: Maybe<Image_Parents>;
  thumbImageId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** aggregated selection of "categories" */
export type Categories_Aggregate = {
  __typename?: 'categories_aggregate';
  aggregate?: Maybe<Categories_Aggregate_Fields>;
  nodes: Array<Categories>;
};

/** aggregate fields of "categories" */
export type Categories_Aggregate_Fields = {
  __typename?: 'categories_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Categories_Max_Fields>;
  min?: Maybe<Categories_Min_Fields>;
};


/** aggregate fields of "categories" */
export type Categories_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Categories_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "categories". All fields are combined with a logical 'AND'. */
export type Categories_Bool_Exp = {
  _and?: Maybe<Array<Categories_Bool_Exp>>;
  _not?: Maybe<Categories_Bool_Exp>;
  _or?: Maybe<Array<Categories_Bool_Exp>>;
  bannerImage?: Maybe<Image_Parents_Bool_Exp>;
  bannerImageId?: Maybe<String_Comparison_Exp>;
  blurb?: Maybe<String_Comparison_Exp>;
  categoryGroup?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  slug?: Maybe<String_Comparison_Exp>;
  thumbImage?: Maybe<Image_Parents_Bool_Exp>;
  thumbImageId?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "categories" */
export enum Categories_Constraint {
  /** unique or primary key constraint */
  CATEGORIES_PKEY = 'categories_pkey'
}

/** input type for inserting data into table "categories" */
export type Categories_Insert_Input = {
  bannerImage?: Maybe<Image_Parents_Obj_Rel_Insert_Input>;
  bannerImageId?: Maybe<Scalars['String']>;
  blurb?: Maybe<Scalars['String']>;
  categoryGroup?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  thumbImage?: Maybe<Image_Parents_Obj_Rel_Insert_Input>;
  thumbImageId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type Categories_Max_Fields = {
  __typename?: 'categories_max_fields';
  bannerImageId?: Maybe<Scalars['String']>;
  blurb?: Maybe<Scalars['String']>;
  categoryGroup?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  thumbImageId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type Categories_Min_Fields = {
  __typename?: 'categories_min_fields';
  bannerImageId?: Maybe<Scalars['String']>;
  blurb?: Maybe<Scalars['String']>;
  categoryGroup?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  thumbImageId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** response of any mutation on the table "categories" */
export type Categories_Mutation_Response = {
  __typename?: 'categories_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Categories>;
};

/** input type for inserting object relation for remote table "categories" */
export type Categories_Obj_Rel_Insert_Input = {
  data: Categories_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Categories_On_Conflict>;
};

/** on conflict condition type for table "categories" */
export type Categories_On_Conflict = {
  constraint: Categories_Constraint;
  update_columns?: Array<Categories_Update_Column>;
  where?: Maybe<Categories_Bool_Exp>;
};

/** Ordering options when selecting data from "categories". */
export type Categories_Order_By = {
  bannerImage?: Maybe<Image_Parents_Order_By>;
  bannerImageId?: Maybe<Order_By>;
  blurb?: Maybe<Order_By>;
  categoryGroup?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
  thumbImage?: Maybe<Image_Parents_Order_By>;
  thumbImageId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** primary key columns input for table: categories */
export type Categories_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "categories" */
export enum Categories_Select_Column {
  /** column name */
  BANNERIMAGEID = 'bannerImageId',
  /** column name */
  BLURB = 'blurb',
  /** column name */
  CATEGORYGROUP = 'categoryGroup',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  NAME = 'name',
  /** column name */
  SLUG = 'slug',
  /** column name */
  THUMBIMAGEID = 'thumbImageId',
  /** column name */
  UPDATEDAT = 'updatedAt'
}

/** input type for updating data in table "categories" */
export type Categories_Set_Input = {
  bannerImageId?: Maybe<Scalars['String']>;
  blurb?: Maybe<Scalars['String']>;
  categoryGroup?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  thumbImageId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** update columns of table "categories" */
export enum Categories_Update_Column {
  /** column name */
  BANNERIMAGEID = 'bannerImageId',
  /** column name */
  BLURB = 'blurb',
  /** column name */
  CATEGORYGROUP = 'categoryGroup',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  NAME = 'name',
  /** column name */
  SLUG = 'slug',
  /** column name */
  THUMBIMAGEID = 'thumbImageId',
  /** column name */
  UPDATEDAT = 'updatedAt'
}

/** columns and relationships of "chat_messages" */
export type Chat_Messages = {
  __typename?: 'chat_messages';
  /** An object relationship */
  bid?: Maybe<Bids>;
  bidId?: Maybe<Scalars['String']>;
  /** An object relationship */
  chatRoom?: Maybe<Chat_Rooms>;
  chatRoomId: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamp'];
  editedAt?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  /** An object relationship */
  previewItem?: Maybe<Product_Preview_Items>;
  previewItemId?: Maybe<Scalars['String']>;
  read_at?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  sender: Users;
  senderId: Scalars['String'];
};

/** aggregated selection of "chat_messages" */
export type Chat_Messages_Aggregate = {
  __typename?: 'chat_messages_aggregate';
  aggregate?: Maybe<Chat_Messages_Aggregate_Fields>;
  nodes: Array<Chat_Messages>;
};

/** aggregate fields of "chat_messages" */
export type Chat_Messages_Aggregate_Fields = {
  __typename?: 'chat_messages_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Chat_Messages_Max_Fields>;
  min?: Maybe<Chat_Messages_Min_Fields>;
};


/** aggregate fields of "chat_messages" */
export type Chat_Messages_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Chat_Messages_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "chat_messages" */
export type Chat_Messages_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Chat_Messages_Max_Order_By>;
  min?: Maybe<Chat_Messages_Min_Order_By>;
};

/** input type for inserting array relation for remote table "chat_messages" */
export type Chat_Messages_Arr_Rel_Insert_Input = {
  data: Array<Chat_Messages_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Chat_Messages_On_Conflict>;
};

/** Boolean expression to filter rows from the table "chat_messages". All fields are combined with a logical 'AND'. */
export type Chat_Messages_Bool_Exp = {
  _and?: Maybe<Array<Chat_Messages_Bool_Exp>>;
  _not?: Maybe<Chat_Messages_Bool_Exp>;
  _or?: Maybe<Array<Chat_Messages_Bool_Exp>>;
  bid?: Maybe<Bids_Bool_Exp>;
  bidId?: Maybe<String_Comparison_Exp>;
  chatRoom?: Maybe<Chat_Rooms_Bool_Exp>;
  chatRoomId?: Maybe<String_Comparison_Exp>;
  content?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  editedAt?: Maybe<Timestamp_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  previewItem?: Maybe<Product_Preview_Items_Bool_Exp>;
  previewItemId?: Maybe<String_Comparison_Exp>;
  read_at?: Maybe<Timestamp_Comparison_Exp>;
  sender?: Maybe<Users_Bool_Exp>;
  senderId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "chat_messages" */
export enum Chat_Messages_Constraint {
  /** unique or primary key constraint */
  CHAT_MESSAGES_PKEY = 'chat_messages_pkey'
}

/** input type for inserting data into table "chat_messages" */
export type Chat_Messages_Insert_Input = {
  bid?: Maybe<Bids_Obj_Rel_Insert_Input>;
  bidId?: Maybe<Scalars['String']>;
  chatRoom?: Maybe<Chat_Rooms_Obj_Rel_Insert_Input>;
  chatRoomId?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  editedAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  previewItem?: Maybe<Product_Preview_Items_Obj_Rel_Insert_Input>;
  previewItemId?: Maybe<Scalars['String']>;
  read_at?: Maybe<Scalars['timestamp']>;
  sender?: Maybe<Users_Obj_Rel_Insert_Input>;
  senderId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Chat_Messages_Max_Fields = {
  __typename?: 'chat_messages_max_fields';
  bidId?: Maybe<Scalars['String']>;
  chatRoomId?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  editedAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  previewItemId?: Maybe<Scalars['String']>;
  read_at?: Maybe<Scalars['timestamp']>;
  senderId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "chat_messages" */
export type Chat_Messages_Max_Order_By = {
  bidId?: Maybe<Order_By>;
  chatRoomId?: Maybe<Order_By>;
  content?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  editedAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  previewItemId?: Maybe<Order_By>;
  read_at?: Maybe<Order_By>;
  senderId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Chat_Messages_Min_Fields = {
  __typename?: 'chat_messages_min_fields';
  bidId?: Maybe<Scalars['String']>;
  chatRoomId?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  editedAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  previewItemId?: Maybe<Scalars['String']>;
  read_at?: Maybe<Scalars['timestamp']>;
  senderId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "chat_messages" */
export type Chat_Messages_Min_Order_By = {
  bidId?: Maybe<Order_By>;
  chatRoomId?: Maybe<Order_By>;
  content?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  editedAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  previewItemId?: Maybe<Order_By>;
  read_at?: Maybe<Order_By>;
  senderId?: Maybe<Order_By>;
};

/** response of any mutation on the table "chat_messages" */
export type Chat_Messages_Mutation_Response = {
  __typename?: 'chat_messages_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Chat_Messages>;
};

/** input type for inserting object relation for remote table "chat_messages" */
export type Chat_Messages_Obj_Rel_Insert_Input = {
  data: Chat_Messages_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Chat_Messages_On_Conflict>;
};

/** on conflict condition type for table "chat_messages" */
export type Chat_Messages_On_Conflict = {
  constraint: Chat_Messages_Constraint;
  update_columns?: Array<Chat_Messages_Update_Column>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};

/** Ordering options when selecting data from "chat_messages". */
export type Chat_Messages_Order_By = {
  bid?: Maybe<Bids_Order_By>;
  bidId?: Maybe<Order_By>;
  chatRoom?: Maybe<Chat_Rooms_Order_By>;
  chatRoomId?: Maybe<Order_By>;
  content?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  editedAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  previewItem?: Maybe<Product_Preview_Items_Order_By>;
  previewItemId?: Maybe<Order_By>;
  read_at?: Maybe<Order_By>;
  sender?: Maybe<Users_Order_By>;
  senderId?: Maybe<Order_By>;
};

/** primary key columns input for table: chat_messages */
export type Chat_Messages_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "chat_messages" */
export enum Chat_Messages_Select_Column {
  /** column name */
  BIDID = 'bidId',
  /** column name */
  CHATROOMID = 'chatRoomId',
  /** column name */
  CONTENT = 'content',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  EDITEDAT = 'editedAt',
  /** column name */
  ID = 'id',
  /** column name */
  PREVIEWITEMID = 'previewItemId',
  /** column name */
  READ_AT = 'read_at',
  /** column name */
  SENDERID = 'senderId'
}

/** input type for updating data in table "chat_messages" */
export type Chat_Messages_Set_Input = {
  bidId?: Maybe<Scalars['String']>;
  chatRoomId?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  editedAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  previewItemId?: Maybe<Scalars['String']>;
  read_at?: Maybe<Scalars['timestamp']>;
  senderId?: Maybe<Scalars['String']>;
};

/** update columns of table "chat_messages" */
export enum Chat_Messages_Update_Column {
  /** column name */
  BIDID = 'bidId',
  /** column name */
  CHATROOMID = 'chatRoomId',
  /** column name */
  CONTENT = 'content',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  EDITEDAT = 'editedAt',
  /** column name */
  ID = 'id',
  /** column name */
  PREVIEWITEMID = 'previewItemId',
  /** column name */
  READ_AT = 'read_at',
  /** column name */
  SENDERID = 'senderId'
}

/** columns and relationships of "chat_rooms" */
export type Chat_Rooms = {
  __typename?: 'chat_rooms';
  createdAt: Scalars['timestamptz'];
  id: Scalars['String'];
  /** An array relationship */
  messages: Array<Chat_Messages>;
  /** An aggregate relationship */
  messages_aggregate: Chat_Messages_Aggregate;
  name?: Maybe<Scalars['String']>;
  /** An object relationship */
  owner: Users;
  ownerId: Scalars['String'];
  /** An array relationship */
  participants: Array<Chat_Users>;
  /** An aggregate relationship */
  participants_aggregate: Chat_Users_Aggregate;
  /** An object relationship */
  product: Products;
  productId: Scalars['String'];
};


/** columns and relationships of "chat_rooms" */
export type Chat_RoomsMessagesArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};


/** columns and relationships of "chat_rooms" */
export type Chat_RoomsMessages_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};


/** columns and relationships of "chat_rooms" */
export type Chat_RoomsParticipantsArgs = {
  distinct_on?: Maybe<Array<Chat_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Users_Order_By>>;
  where?: Maybe<Chat_Users_Bool_Exp>;
};


/** columns and relationships of "chat_rooms" */
export type Chat_RoomsParticipants_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Users_Order_By>>;
  where?: Maybe<Chat_Users_Bool_Exp>;
};

/** aggregated selection of "chat_rooms" */
export type Chat_Rooms_Aggregate = {
  __typename?: 'chat_rooms_aggregate';
  aggregate?: Maybe<Chat_Rooms_Aggregate_Fields>;
  nodes: Array<Chat_Rooms>;
};

/** aggregate fields of "chat_rooms" */
export type Chat_Rooms_Aggregate_Fields = {
  __typename?: 'chat_rooms_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Chat_Rooms_Max_Fields>;
  min?: Maybe<Chat_Rooms_Min_Fields>;
};


/** aggregate fields of "chat_rooms" */
export type Chat_Rooms_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Chat_Rooms_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "chat_rooms". All fields are combined with a logical 'AND'. */
export type Chat_Rooms_Bool_Exp = {
  _and?: Maybe<Array<Chat_Rooms_Bool_Exp>>;
  _not?: Maybe<Chat_Rooms_Bool_Exp>;
  _or?: Maybe<Array<Chat_Rooms_Bool_Exp>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  messages?: Maybe<Chat_Messages_Bool_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  owner?: Maybe<Users_Bool_Exp>;
  ownerId?: Maybe<String_Comparison_Exp>;
  participants?: Maybe<Chat_Users_Bool_Exp>;
  product?: Maybe<Products_Bool_Exp>;
  productId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "chat_rooms" */
export enum Chat_Rooms_Constraint {
  /** unique or primary key constraint */
  CHAT_ROOMS_PKEY = 'chat_rooms_pkey'
}

/** input type for inserting data into table "chat_rooms" */
export type Chat_Rooms_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  messages?: Maybe<Chat_Messages_Arr_Rel_Insert_Input>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Users_Obj_Rel_Insert_Input>;
  ownerId?: Maybe<Scalars['String']>;
  participants?: Maybe<Chat_Users_Arr_Rel_Insert_Input>;
  product?: Maybe<Products_Obj_Rel_Insert_Input>;
  productId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Chat_Rooms_Max_Fields = {
  __typename?: 'chat_rooms_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Chat_Rooms_Min_Fields = {
  __typename?: 'chat_rooms_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "chat_rooms" */
export type Chat_Rooms_Mutation_Response = {
  __typename?: 'chat_rooms_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Chat_Rooms>;
};

/** input type for inserting object relation for remote table "chat_rooms" */
export type Chat_Rooms_Obj_Rel_Insert_Input = {
  data: Chat_Rooms_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Chat_Rooms_On_Conflict>;
};

/** on conflict condition type for table "chat_rooms" */
export type Chat_Rooms_On_Conflict = {
  constraint: Chat_Rooms_Constraint;
  update_columns?: Array<Chat_Rooms_Update_Column>;
  where?: Maybe<Chat_Rooms_Bool_Exp>;
};

/** Ordering options when selecting data from "chat_rooms". */
export type Chat_Rooms_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  messages_aggregate?: Maybe<Chat_Messages_Aggregate_Order_By>;
  name?: Maybe<Order_By>;
  owner?: Maybe<Users_Order_By>;
  ownerId?: Maybe<Order_By>;
  participants_aggregate?: Maybe<Chat_Users_Aggregate_Order_By>;
  product?: Maybe<Products_Order_By>;
  productId?: Maybe<Order_By>;
};

/** primary key columns input for table: chat_rooms */
export type Chat_Rooms_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "chat_rooms" */
export enum Chat_Rooms_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  NAME = 'name',
  /** column name */
  OWNERID = 'ownerId',
  /** column name */
  PRODUCTID = 'productId'
}

/** input type for updating data in table "chat_rooms" */
export type Chat_Rooms_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
};

/** update columns of table "chat_rooms" */
export enum Chat_Rooms_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  NAME = 'name',
  /** column name */
  OWNERID = 'ownerId',
  /** column name */
  PRODUCTID = 'productId'
}

/** columns and relationships of "chat_users" */
export type Chat_Users = {
  __typename?: 'chat_users';
  /** An object relationship */
  chatRoom?: Maybe<Chat_Rooms>;
  chatRoomId: Scalars['String'];
  chatRoomStatus?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: Users;
  userId: Scalars['String'];
};

/** aggregated selection of "chat_users" */
export type Chat_Users_Aggregate = {
  __typename?: 'chat_users_aggregate';
  aggregate?: Maybe<Chat_Users_Aggregate_Fields>;
  nodes: Array<Chat_Users>;
};

/** aggregate fields of "chat_users" */
export type Chat_Users_Aggregate_Fields = {
  __typename?: 'chat_users_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Chat_Users_Max_Fields>;
  min?: Maybe<Chat_Users_Min_Fields>;
};


/** aggregate fields of "chat_users" */
export type Chat_Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Chat_Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "chat_users" */
export type Chat_Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Chat_Users_Max_Order_By>;
  min?: Maybe<Chat_Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "chat_users" */
export type Chat_Users_Arr_Rel_Insert_Input = {
  data: Array<Chat_Users_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Chat_Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "chat_users". All fields are combined with a logical 'AND'. */
export type Chat_Users_Bool_Exp = {
  _and?: Maybe<Array<Chat_Users_Bool_Exp>>;
  _not?: Maybe<Chat_Users_Bool_Exp>;
  _or?: Maybe<Array<Chat_Users_Bool_Exp>>;
  chatRoom?: Maybe<Chat_Rooms_Bool_Exp>;
  chatRoomId?: Maybe<String_Comparison_Exp>;
  chatRoomStatus?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  userId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "chat_users" */
export enum Chat_Users_Constraint {
  /** unique or primary key constraint */
  CHAT_USERS_PKEY = 'chat_users_pkey'
}

/** input type for inserting data into table "chat_users" */
export type Chat_Users_Insert_Input = {
  chatRoom?: Maybe<Chat_Rooms_Obj_Rel_Insert_Input>;
  chatRoomId?: Maybe<Scalars['String']>;
  chatRoomStatus?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Chat_Users_Max_Fields = {
  __typename?: 'chat_users_max_fields';
  chatRoomId?: Maybe<Scalars['String']>;
  chatRoomStatus?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "chat_users" */
export type Chat_Users_Max_Order_By = {
  chatRoomId?: Maybe<Order_By>;
  chatRoomStatus?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Chat_Users_Min_Fields = {
  __typename?: 'chat_users_min_fields';
  chatRoomId?: Maybe<Scalars['String']>;
  chatRoomStatus?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "chat_users" */
export type Chat_Users_Min_Order_By = {
  chatRoomId?: Maybe<Order_By>;
  chatRoomStatus?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** response of any mutation on the table "chat_users" */
export type Chat_Users_Mutation_Response = {
  __typename?: 'chat_users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Chat_Users>;
};

/** on conflict condition type for table "chat_users" */
export type Chat_Users_On_Conflict = {
  constraint: Chat_Users_Constraint;
  update_columns?: Array<Chat_Users_Update_Column>;
  where?: Maybe<Chat_Users_Bool_Exp>;
};

/** Ordering options when selecting data from "chat_users". */
export type Chat_Users_Order_By = {
  chatRoom?: Maybe<Chat_Rooms_Order_By>;
  chatRoomId?: Maybe<Order_By>;
  chatRoomStatus?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: chat_users */
export type Chat_Users_Pk_Columns_Input = {
  chatRoomId: Scalars['String'];
  userId: Scalars['String'];
};

/** select columns of table "chat_users" */
export enum Chat_Users_Select_Column {
  /** column name */
  CHATROOMID = 'chatRoomId',
  /** column name */
  CHATROOMSTATUS = 'chatRoomStatus',
  /** column name */
  CREATED_AT = 'created_at',
  /** column name */
  USERID = 'userId'
}

/** input type for updating data in table "chat_users" */
export type Chat_Users_Set_Input = {
  chatRoomId?: Maybe<Scalars['String']>;
  chatRoomStatus?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** update columns of table "chat_users" */
export enum Chat_Users_Update_Column {
  /** column name */
  CHATROOMID = 'chatRoomId',
  /** column name */
  CHATROOMSTATUS = 'chatRoomStatus',
  /** column name */
  CREATED_AT = 'created_at',
  /** column name */
  USERID = 'userId'
}

/** columns and relationships of "classified_ad_purchases" */
export type Classified_Ad_Purchases = {
  __typename?: 'classified_ad_purchases';
  buyerId: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  currency: Scalars['String'];
  fees: Scalars['Int'];
  id: Scalars['String'];
  paymentIntentId: Scalars['String'];
  productId: Scalars['String'];
  total: Scalars['Int'];
};

/** aggregated selection of "classified_ad_purchases" */
export type Classified_Ad_Purchases_Aggregate = {
  __typename?: 'classified_ad_purchases_aggregate';
  aggregate?: Maybe<Classified_Ad_Purchases_Aggregate_Fields>;
  nodes: Array<Classified_Ad_Purchases>;
};

/** aggregate fields of "classified_ad_purchases" */
export type Classified_Ad_Purchases_Aggregate_Fields = {
  __typename?: 'classified_ad_purchases_aggregate_fields';
  avg?: Maybe<Classified_Ad_Purchases_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Classified_Ad_Purchases_Max_Fields>;
  min?: Maybe<Classified_Ad_Purchases_Min_Fields>;
  stddev?: Maybe<Classified_Ad_Purchases_Stddev_Fields>;
  stddev_pop?: Maybe<Classified_Ad_Purchases_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Classified_Ad_Purchases_Stddev_Samp_Fields>;
  sum?: Maybe<Classified_Ad_Purchases_Sum_Fields>;
  var_pop?: Maybe<Classified_Ad_Purchases_Var_Pop_Fields>;
  var_samp?: Maybe<Classified_Ad_Purchases_Var_Samp_Fields>;
  variance?: Maybe<Classified_Ad_Purchases_Variance_Fields>;
};


/** aggregate fields of "classified_ad_purchases" */
export type Classified_Ad_Purchases_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Classified_Ad_Purchases_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Classified_Ad_Purchases_Avg_Fields = {
  __typename?: 'classified_ad_purchases_avg_fields';
  fees?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "classified_ad_purchases". All fields are combined with a logical 'AND'. */
export type Classified_Ad_Purchases_Bool_Exp = {
  _and?: Maybe<Array<Classified_Ad_Purchases_Bool_Exp>>;
  _not?: Maybe<Classified_Ad_Purchases_Bool_Exp>;
  _or?: Maybe<Array<Classified_Ad_Purchases_Bool_Exp>>;
  buyerId?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  currency?: Maybe<String_Comparison_Exp>;
  fees?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  paymentIntentId?: Maybe<String_Comparison_Exp>;
  productId?: Maybe<String_Comparison_Exp>;
  total?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "classified_ad_purchases" */
export enum Classified_Ad_Purchases_Constraint {
  /** unique or primary key constraint */
  CLASSIFIED_AD_PURCHASES_PKEY = 'classified_ad_purchases_pkey'
}

/** input type for incrementing numeric columns in table "classified_ad_purchases" */
export type Classified_Ad_Purchases_Inc_Input = {
  fees?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "classified_ad_purchases" */
export type Classified_Ad_Purchases_Insert_Input = {
  buyerId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currency?: Maybe<Scalars['String']>;
  fees?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Classified_Ad_Purchases_Max_Fields = {
  __typename?: 'classified_ad_purchases_max_fields';
  buyerId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currency?: Maybe<Scalars['String']>;
  fees?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Classified_Ad_Purchases_Min_Fields = {
  __typename?: 'classified_ad_purchases_min_fields';
  buyerId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currency?: Maybe<Scalars['String']>;
  fees?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "classified_ad_purchases" */
export type Classified_Ad_Purchases_Mutation_Response = {
  __typename?: 'classified_ad_purchases_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Classified_Ad_Purchases>;
};

/** on conflict condition type for table "classified_ad_purchases" */
export type Classified_Ad_Purchases_On_Conflict = {
  constraint: Classified_Ad_Purchases_Constraint;
  update_columns?: Array<Classified_Ad_Purchases_Update_Column>;
  where?: Maybe<Classified_Ad_Purchases_Bool_Exp>;
};

/** Ordering options when selecting data from "classified_ad_purchases". */
export type Classified_Ad_Purchases_Order_By = {
  buyerId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currency?: Maybe<Order_By>;
  fees?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  paymentIntentId?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  total?: Maybe<Order_By>;
};

/** primary key columns input for table: classified_ad_purchases */
export type Classified_Ad_Purchases_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "classified_ad_purchases" */
export enum Classified_Ad_Purchases_Select_Column {
  /** column name */
  BUYERID = 'buyerId',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CURRENCY = 'currency',
  /** column name */
  FEES = 'fees',
  /** column name */
  ID = 'id',
  /** column name */
  PAYMENTINTENTID = 'paymentIntentId',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  TOTAL = 'total'
}

/** input type for updating data in table "classified_ad_purchases" */
export type Classified_Ad_Purchases_Set_Input = {
  buyerId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currency?: Maybe<Scalars['String']>;
  fees?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Classified_Ad_Purchases_Stddev_Fields = {
  __typename?: 'classified_ad_purchases_stddev_fields';
  fees?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Classified_Ad_Purchases_Stddev_Pop_Fields = {
  __typename?: 'classified_ad_purchases_stddev_pop_fields';
  fees?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Classified_Ad_Purchases_Stddev_Samp_Fields = {
  __typename?: 'classified_ad_purchases_stddev_samp_fields';
  fees?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Classified_Ad_Purchases_Sum_Fields = {
  __typename?: 'classified_ad_purchases_sum_fields';
  fees?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

/** update columns of table "classified_ad_purchases" */
export enum Classified_Ad_Purchases_Update_Column {
  /** column name */
  BUYERID = 'buyerId',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CURRENCY = 'currency',
  /** column name */
  FEES = 'fees',
  /** column name */
  ID = 'id',
  /** column name */
  PAYMENTINTENTID = 'paymentIntentId',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  TOTAL = 'total'
}

/** aggregate var_pop on columns */
export type Classified_Ad_Purchases_Var_Pop_Fields = {
  __typename?: 'classified_ad_purchases_var_pop_fields';
  fees?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Classified_Ad_Purchases_Var_Samp_Fields = {
  __typename?: 'classified_ad_purchases_var_samp_fields';
  fees?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Classified_Ad_Purchases_Variance_Fields = {
  __typename?: 'classified_ad_purchases_variance_fields';
  fees?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "collection_items" */
export type Collection_Items = {
  __typename?: 'collection_items';
  collectionId?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamptz'];
  /** An object relationship */
  externalProduct?: Maybe<External_Products>;
  externalProductId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  position?: Maybe<Scalars['Int']>;
  /** An object relationship */
  product?: Maybe<Products>;
  productId?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

/** aggregated selection of "collection_items" */
export type Collection_Items_Aggregate = {
  __typename?: 'collection_items_aggregate';
  aggregate?: Maybe<Collection_Items_Aggregate_Fields>;
  nodes: Array<Collection_Items>;
};

/** aggregate fields of "collection_items" */
export type Collection_Items_Aggregate_Fields = {
  __typename?: 'collection_items_aggregate_fields';
  avg?: Maybe<Collection_Items_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Collection_Items_Max_Fields>;
  min?: Maybe<Collection_Items_Min_Fields>;
  stddev?: Maybe<Collection_Items_Stddev_Fields>;
  stddev_pop?: Maybe<Collection_Items_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Collection_Items_Stddev_Samp_Fields>;
  sum?: Maybe<Collection_Items_Sum_Fields>;
  var_pop?: Maybe<Collection_Items_Var_Pop_Fields>;
  var_samp?: Maybe<Collection_Items_Var_Samp_Fields>;
  variance?: Maybe<Collection_Items_Variance_Fields>;
};


/** aggregate fields of "collection_items" */
export type Collection_Items_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Collection_Items_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "collection_items" */
export type Collection_Items_Aggregate_Order_By = {
  avg?: Maybe<Collection_Items_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Collection_Items_Max_Order_By>;
  min?: Maybe<Collection_Items_Min_Order_By>;
  stddev?: Maybe<Collection_Items_Stddev_Order_By>;
  stddev_pop?: Maybe<Collection_Items_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Collection_Items_Stddev_Samp_Order_By>;
  sum?: Maybe<Collection_Items_Sum_Order_By>;
  var_pop?: Maybe<Collection_Items_Var_Pop_Order_By>;
  var_samp?: Maybe<Collection_Items_Var_Samp_Order_By>;
  variance?: Maybe<Collection_Items_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "collection_items" */
export type Collection_Items_Arr_Rel_Insert_Input = {
  data: Array<Collection_Items_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Collection_Items_On_Conflict>;
};

/** aggregate avg on columns */
export type Collection_Items_Avg_Fields = {
  __typename?: 'collection_items_avg_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "collection_items" */
export type Collection_Items_Avg_Order_By = {
  position?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "collection_items". All fields are combined with a logical 'AND'. */
export type Collection_Items_Bool_Exp = {
  _and?: Maybe<Array<Collection_Items_Bool_Exp>>;
  _not?: Maybe<Collection_Items_Bool_Exp>;
  _or?: Maybe<Array<Collection_Items_Bool_Exp>>;
  collectionId?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  externalProduct?: Maybe<External_Products_Bool_Exp>;
  externalProductId?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  position?: Maybe<Int_Comparison_Exp>;
  product?: Maybe<Products_Bool_Exp>;
  productId?: Maybe<String_Comparison_Exp>;
  userId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "collection_items" */
export enum Collection_Items_Constraint {
  /** unique or primary key constraint */
  COLLECTION_ITEMS_PKEY = 'collection_items_pkey',
  /** unique or primary key constraint */
  COLLECTION_ITEMS_PRODUCT_ID_COLLECTION_ID_USER_ID_KEY = 'collection_items_product_id_collection_id_user_id_key'
}

/** input type for incrementing numeric columns in table "collection_items" */
export type Collection_Items_Inc_Input = {
  position?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "collection_items" */
export type Collection_Items_Insert_Input = {
  collectionId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  externalProduct?: Maybe<External_Products_Obj_Rel_Insert_Input>;
  externalProductId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  product?: Maybe<Products_Obj_Rel_Insert_Input>;
  productId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Collection_Items_Max_Fields = {
  __typename?: 'collection_items_max_fields';
  collectionId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  externalProductId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "collection_items" */
export type Collection_Items_Max_Order_By = {
  collectionId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  externalProductId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Collection_Items_Min_Fields = {
  __typename?: 'collection_items_min_fields';
  collectionId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  externalProductId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "collection_items" */
export type Collection_Items_Min_Order_By = {
  collectionId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  externalProductId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** response of any mutation on the table "collection_items" */
export type Collection_Items_Mutation_Response = {
  __typename?: 'collection_items_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Collection_Items>;
};

/** on conflict condition type for table "collection_items" */
export type Collection_Items_On_Conflict = {
  constraint: Collection_Items_Constraint;
  update_columns?: Array<Collection_Items_Update_Column>;
  where?: Maybe<Collection_Items_Bool_Exp>;
};

/** Ordering options when selecting data from "collection_items". */
export type Collection_Items_Order_By = {
  collectionId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  externalProduct?: Maybe<External_Products_Order_By>;
  externalProductId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  product?: Maybe<Products_Order_By>;
  productId?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: collection_items */
export type Collection_Items_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "collection_items" */
export enum Collection_Items_Select_Column {
  /** column name */
  COLLECTIONID = 'collectionId',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  EXTERNALPRODUCTID = 'externalProductId',
  /** column name */
  ID = 'id',
  /** column name */
  POSITION = 'position',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  USERID = 'userId'
}

/** input type for updating data in table "collection_items" */
export type Collection_Items_Set_Input = {
  collectionId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  externalProductId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Collection_Items_Stddev_Fields = {
  __typename?: 'collection_items_stddev_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "collection_items" */
export type Collection_Items_Stddev_Order_By = {
  position?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Collection_Items_Stddev_Pop_Fields = {
  __typename?: 'collection_items_stddev_pop_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "collection_items" */
export type Collection_Items_Stddev_Pop_Order_By = {
  position?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Collection_Items_Stddev_Samp_Fields = {
  __typename?: 'collection_items_stddev_samp_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "collection_items" */
export type Collection_Items_Stddev_Samp_Order_By = {
  position?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Collection_Items_Sum_Fields = {
  __typename?: 'collection_items_sum_fields';
  position?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "collection_items" */
export type Collection_Items_Sum_Order_By = {
  position?: Maybe<Order_By>;
};

/** update columns of table "collection_items" */
export enum Collection_Items_Update_Column {
  /** column name */
  COLLECTIONID = 'collectionId',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  EXTERNALPRODUCTID = 'externalProductId',
  /** column name */
  ID = 'id',
  /** column name */
  POSITION = 'position',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  USERID = 'userId'
}

/** aggregate var_pop on columns */
export type Collection_Items_Var_Pop_Fields = {
  __typename?: 'collection_items_var_pop_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "collection_items" */
export type Collection_Items_Var_Pop_Order_By = {
  position?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Collection_Items_Var_Samp_Fields = {
  __typename?: 'collection_items_var_samp_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "collection_items" */
export type Collection_Items_Var_Samp_Order_By = {
  position?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Collection_Items_Variance_Fields = {
  __typename?: 'collection_items_variance_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "collection_items" */
export type Collection_Items_Variance_Order_By = {
  position?: Maybe<Order_By>;
};

/** columns and relationships of "collections" */
export type Collections = {
  __typename?: 'collections';
  createdAt: Scalars['timestamptz'];
  id: Scalars['String'];
  /** An array relationship */
  items: Array<Collection_Items>;
  /** An aggregate relationship */
  items_aggregate: Collection_Items_Aggregate;
  name: Scalars['String'];
  private: Scalars['Boolean'];
  updatedAt: Scalars['timestamptz'];
  userId?: Maybe<Scalars['String']>;
};


/** columns and relationships of "collections" */
export type CollectionsItemsArgs = {
  distinct_on?: Maybe<Array<Collection_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Collection_Items_Order_By>>;
  where?: Maybe<Collection_Items_Bool_Exp>;
};


/** columns and relationships of "collections" */
export type CollectionsItems_AggregateArgs = {
  distinct_on?: Maybe<Array<Collection_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Collection_Items_Order_By>>;
  where?: Maybe<Collection_Items_Bool_Exp>;
};

/** aggregated selection of "collections" */
export type Collections_Aggregate = {
  __typename?: 'collections_aggregate';
  aggregate?: Maybe<Collections_Aggregate_Fields>;
  nodes: Array<Collections>;
};

/** aggregate fields of "collections" */
export type Collections_Aggregate_Fields = {
  __typename?: 'collections_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Collections_Max_Fields>;
  min?: Maybe<Collections_Min_Fields>;
};


/** aggregate fields of "collections" */
export type Collections_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Collections_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "collections". All fields are combined with a logical 'AND'. */
export type Collections_Bool_Exp = {
  _and?: Maybe<Array<Collections_Bool_Exp>>;
  _not?: Maybe<Collections_Bool_Exp>;
  _or?: Maybe<Array<Collections_Bool_Exp>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  items?: Maybe<Collection_Items_Bool_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  private?: Maybe<Boolean_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  userId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "collections" */
export enum Collections_Constraint {
  /** unique or primary key constraint */
  COLLECTIONS_PKEY = 'collections_pkey'
}

/** input type for inserting data into table "collections" */
export type Collections_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  items?: Maybe<Collection_Items_Arr_Rel_Insert_Input>;
  name?: Maybe<Scalars['String']>;
  private?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Collections_Max_Fields = {
  __typename?: 'collections_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Collections_Min_Fields = {
  __typename?: 'collections_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "collections" */
export type Collections_Mutation_Response = {
  __typename?: 'collections_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Collections>;
};

/** on conflict condition type for table "collections" */
export type Collections_On_Conflict = {
  constraint: Collections_Constraint;
  update_columns?: Array<Collections_Update_Column>;
  where?: Maybe<Collections_Bool_Exp>;
};

/** Ordering options when selecting data from "collections". */
export type Collections_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  items_aggregate?: Maybe<Collection_Items_Aggregate_Order_By>;
  name?: Maybe<Order_By>;
  private?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: collections */
export type Collections_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "collections" */
export enum Collections_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  NAME = 'name',
  /** column name */
  PRIVATE = 'private',
  /** column name */
  UPDATEDAT = 'updatedAt',
  /** column name */
  USERID = 'userId'
}

/** input type for updating data in table "collections" */
export type Collections_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  private?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** update columns of table "collections" */
export enum Collections_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  NAME = 'name',
  /** column name */
  PRIVATE = 'private',
  /** column name */
  UPDATEDAT = 'updatedAt',
  /** column name */
  USERID = 'userId'
}

/** columns and relationships of "dealers" */
export type Dealers = {
  __typename?: 'dealers';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamptz'];
  id: Scalars['String'];
  licenseNumber: Scalars['String'];
  name: Scalars['String'];
  operating?: Maybe<Scalars['Boolean']>;
  postCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  /** An object relationship */
  user?: Maybe<Users>;
};

/** aggregated selection of "dealers" */
export type Dealers_Aggregate = {
  __typename?: 'dealers_aggregate';
  aggregate?: Maybe<Dealers_Aggregate_Fields>;
  nodes: Array<Dealers>;
};

/** aggregate fields of "dealers" */
export type Dealers_Aggregate_Fields = {
  __typename?: 'dealers_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Dealers_Max_Fields>;
  min?: Maybe<Dealers_Min_Fields>;
};


/** aggregate fields of "dealers" */
export type Dealers_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Dealers_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "dealers". All fields are combined with a logical 'AND'. */
export type Dealers_Bool_Exp = {
  _and?: Maybe<Array<Dealers_Bool_Exp>>;
  _not?: Maybe<Dealers_Bool_Exp>;
  _or?: Maybe<Array<Dealers_Bool_Exp>>;
  address?: Maybe<String_Comparison_Exp>;
  city?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  licenseNumber?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  operating?: Maybe<Boolean_Comparison_Exp>;
  postCode?: Maybe<String_Comparison_Exp>;
  state?: Maybe<String_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "dealers" */
export enum Dealers_Constraint {
  /** unique or primary key constraint */
  DEALER_ADDRESSES_PKEY = 'dealer_addresses_pkey',
  /** unique or primary key constraint */
  DEALERS_LICENSE_NUMBER_KEY = 'dealers_license_number_key'
}

/** input type for inserting data into table "dealers" */
export type Dealers_Insert_Input = {
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  licenseNumber?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  operating?: Maybe<Scalars['Boolean']>;
  postCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Dealers_Max_Fields = {
  __typename?: 'dealers_max_fields';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  licenseNumber?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Dealers_Min_Fields = {
  __typename?: 'dealers_min_fields';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  licenseNumber?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "dealers" */
export type Dealers_Mutation_Response = {
  __typename?: 'dealers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Dealers>;
};

/** input type for inserting object relation for remote table "dealers" */
export type Dealers_Obj_Rel_Insert_Input = {
  data: Dealers_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Dealers_On_Conflict>;
};

/** on conflict condition type for table "dealers" */
export type Dealers_On_Conflict = {
  constraint: Dealers_Constraint;
  update_columns?: Array<Dealers_Update_Column>;
  where?: Maybe<Dealers_Bool_Exp>;
};

/** Ordering options when selecting data from "dealers". */
export type Dealers_Order_By = {
  address?: Maybe<Order_By>;
  city?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  operating?: Maybe<Order_By>;
  postCode?: Maybe<Order_By>;
  state?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
};

/** primary key columns input for table: dealers */
export type Dealers_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "dealers" */
export enum Dealers_Select_Column {
  /** column name */
  ADDRESS = 'address',
  /** column name */
  CITY = 'city',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  LICENSENUMBER = 'licenseNumber',
  /** column name */
  NAME = 'name',
  /** column name */
  OPERATING = 'operating',
  /** column name */
  POSTCODE = 'postCode',
  /** column name */
  STATE = 'state'
}

/** input type for updating data in table "dealers" */
export type Dealers_Set_Input = {
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  licenseNumber?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  operating?: Maybe<Scalars['Boolean']>;
  postCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

/** update columns of table "dealers" */
export enum Dealers_Update_Column {
  /** column name */
  ADDRESS = 'address',
  /** column name */
  CITY = 'city',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  LICENSENUMBER = 'licenseNumber',
  /** column name */
  NAME = 'name',
  /** column name */
  OPERATING = 'operating',
  /** column name */
  POSTCODE = 'postCode',
  /** column name */
  STATE = 'state'
}

/** columns and relationships of "email_subscriptions" */
export type Email_Subscriptions = {
  __typename?: 'email_subscriptions';
  id: Scalars['String'];
  subject_: Scalars['String'];
  subscribers: Scalars['String'];
};

/** aggregated selection of "email_subscriptions" */
export type Email_Subscriptions_Aggregate = {
  __typename?: 'email_subscriptions_aggregate';
  aggregate?: Maybe<Email_Subscriptions_Aggregate_Fields>;
  nodes: Array<Email_Subscriptions>;
};

/** aggregate fields of "email_subscriptions" */
export type Email_Subscriptions_Aggregate_Fields = {
  __typename?: 'email_subscriptions_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Email_Subscriptions_Max_Fields>;
  min?: Maybe<Email_Subscriptions_Min_Fields>;
};


/** aggregate fields of "email_subscriptions" */
export type Email_Subscriptions_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Email_Subscriptions_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "email_subscriptions". All fields are combined with a logical 'AND'. */
export type Email_Subscriptions_Bool_Exp = {
  _and?: Maybe<Array<Email_Subscriptions_Bool_Exp>>;
  _not?: Maybe<Email_Subscriptions_Bool_Exp>;
  _or?: Maybe<Array<Email_Subscriptions_Bool_Exp>>;
  id?: Maybe<String_Comparison_Exp>;
  subject_?: Maybe<String_Comparison_Exp>;
  subscribers?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "email_subscriptions" */
export enum Email_Subscriptions_Constraint {
  /** unique or primary key constraint */
  EMAIL_SUBSCRIPTIONS_PKEY = 'email_subscriptions_pkey'
}

/** input type for inserting data into table "email_subscriptions" */
export type Email_Subscriptions_Insert_Input = {
  id?: Maybe<Scalars['String']>;
  subject_?: Maybe<Scalars['String']>;
  subscribers?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Email_Subscriptions_Max_Fields = {
  __typename?: 'email_subscriptions_max_fields';
  id?: Maybe<Scalars['String']>;
  subject_?: Maybe<Scalars['String']>;
  subscribers?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Email_Subscriptions_Min_Fields = {
  __typename?: 'email_subscriptions_min_fields';
  id?: Maybe<Scalars['String']>;
  subject_?: Maybe<Scalars['String']>;
  subscribers?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "email_subscriptions" */
export type Email_Subscriptions_Mutation_Response = {
  __typename?: 'email_subscriptions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Email_Subscriptions>;
};

/** on conflict condition type for table "email_subscriptions" */
export type Email_Subscriptions_On_Conflict = {
  constraint: Email_Subscriptions_Constraint;
  update_columns?: Array<Email_Subscriptions_Update_Column>;
  where?: Maybe<Email_Subscriptions_Bool_Exp>;
};

/** Ordering options when selecting data from "email_subscriptions". */
export type Email_Subscriptions_Order_By = {
  id?: Maybe<Order_By>;
  subject_?: Maybe<Order_By>;
  subscribers?: Maybe<Order_By>;
};

/** primary key columns input for table: email_subscriptions */
export type Email_Subscriptions_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "email_subscriptions" */
export enum Email_Subscriptions_Select_Column {
  /** column name */
  ID = 'id',
  /** column name */
  SUBJECT_ = 'subject_',
  /** column name */
  SUBSCRIBERS = 'subscribers'
}

/** input type for updating data in table "email_subscriptions" */
export type Email_Subscriptions_Set_Input = {
  id?: Maybe<Scalars['String']>;
  subject_?: Maybe<Scalars['String']>;
  subscribers?: Maybe<Scalars['String']>;
};

/** update columns of table "email_subscriptions" */
export enum Email_Subscriptions_Update_Column {
  /** column name */
  ID = 'id',
  /** column name */
  SUBJECT_ = 'subject_',
  /** column name */
  SUBSCRIBERS = 'subscribers'
}

/** columns and relationships of "emails" */
export type Emails = {
  __typename?: 'emails';
  createdAt: Scalars['timestamp'];
  emailType: Scalars['String'];
  from_: Scalars['String'];
  id: Scalars['String'];
  subject_: Scalars['String'];
  to_: Scalars['String'];
};

/** aggregated selection of "emails" */
export type Emails_Aggregate = {
  __typename?: 'emails_aggregate';
  aggregate?: Maybe<Emails_Aggregate_Fields>;
  nodes: Array<Emails>;
};

/** aggregate fields of "emails" */
export type Emails_Aggregate_Fields = {
  __typename?: 'emails_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Emails_Max_Fields>;
  min?: Maybe<Emails_Min_Fields>;
};


/** aggregate fields of "emails" */
export type Emails_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Emails_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "emails". All fields are combined with a logical 'AND'. */
export type Emails_Bool_Exp = {
  _and?: Maybe<Array<Emails_Bool_Exp>>;
  _not?: Maybe<Emails_Bool_Exp>;
  _or?: Maybe<Array<Emails_Bool_Exp>>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  emailType?: Maybe<String_Comparison_Exp>;
  from_?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  subject_?: Maybe<String_Comparison_Exp>;
  to_?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "emails" */
export enum Emails_Constraint {
  /** unique or primary key constraint */
  EMAILS_PKEY = 'emails_pkey'
}

/** input type for inserting data into table "emails" */
export type Emails_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamp']>;
  emailType?: Maybe<Scalars['String']>;
  from_?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  subject_?: Maybe<Scalars['String']>;
  to_?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Emails_Max_Fields = {
  __typename?: 'emails_max_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  emailType?: Maybe<Scalars['String']>;
  from_?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  subject_?: Maybe<Scalars['String']>;
  to_?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Emails_Min_Fields = {
  __typename?: 'emails_min_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  emailType?: Maybe<Scalars['String']>;
  from_?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  subject_?: Maybe<Scalars['String']>;
  to_?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "emails" */
export type Emails_Mutation_Response = {
  __typename?: 'emails_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Emails>;
};

/** on conflict condition type for table "emails" */
export type Emails_On_Conflict = {
  constraint: Emails_Constraint;
  update_columns?: Array<Emails_Update_Column>;
  where?: Maybe<Emails_Bool_Exp>;
};

/** Ordering options when selecting data from "emails". */
export type Emails_Order_By = {
  createdAt?: Maybe<Order_By>;
  emailType?: Maybe<Order_By>;
  from_?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  subject_?: Maybe<Order_By>;
  to_?: Maybe<Order_By>;
};

/** primary key columns input for table: emails */
export type Emails_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "emails" */
export enum Emails_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  EMAILTYPE = 'emailType',
  /** column name */
  FROM_ = 'from_',
  /** column name */
  ID = 'id',
  /** column name */
  SUBJECT_ = 'subject_',
  /** column name */
  TO_ = 'to_'
}

/** input type for updating data in table "emails" */
export type Emails_Set_Input = {
  createdAt?: Maybe<Scalars['timestamp']>;
  emailType?: Maybe<Scalars['String']>;
  from_?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  subject_?: Maybe<Scalars['String']>;
  to_?: Maybe<Scalars['String']>;
};

/** update columns of table "emails" */
export enum Emails_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  EMAILTYPE = 'emailType',
  /** column name */
  FROM_ = 'from_',
  /** column name */
  ID = 'id',
  /** column name */
  SUBJECT_ = 'subject_',
  /** column name */
  TO_ = 'to_'
}

/** columns and relationships of "external_product_snapshots" */
export type External_Product_Snapshots = {
  __typename?: 'external_product_snapshots';
  action?: Maybe<Scalars['String']>;
  adType?: Maybe<Scalars['String']>;
  advertised?: Maybe<Scalars['timestamptz']>;
  barrelLength?: Maybe<Scalars['String']>;
  caliber?: Maybe<Scalars['String']>;
  caliberId?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamptz'];
  description?: Maybe<Scalars['String']>;
  externalProductId: Scalars['String'];
  hrsToSold?: Maybe<Scalars['numeric']>;
  id: Scalars['String'];
  isSold?: Maybe<Scalars['Boolean']>;
  licenseNumber: Scalars['String'];
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  /** An array relationship */
  previewItems: Array<Product_Preview_Items>;
  /** An aggregate relationship */
  previewItems_aggregate: Product_Preview_Items_Aggregate;
  price?: Maybe<Scalars['Int']>;
  priceWas?: Maybe<Scalars['Int']>;
  serialNumber: Scalars['String'];
  soldText?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  transferringDealer?: Maybe<Scalars['String']>;
};


/** columns and relationships of "external_product_snapshots" */
export type External_Product_SnapshotsPreviewItemsArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};


/** columns and relationships of "external_product_snapshots" */
export type External_Product_SnapshotsPreviewItems_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};

/** aggregated selection of "external_product_snapshots" */
export type External_Product_Snapshots_Aggregate = {
  __typename?: 'external_product_snapshots_aggregate';
  aggregate?: Maybe<External_Product_Snapshots_Aggregate_Fields>;
  nodes: Array<External_Product_Snapshots>;
};

/** aggregate fields of "external_product_snapshots" */
export type External_Product_Snapshots_Aggregate_Fields = {
  __typename?: 'external_product_snapshots_aggregate_fields';
  avg?: Maybe<External_Product_Snapshots_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<External_Product_Snapshots_Max_Fields>;
  min?: Maybe<External_Product_Snapshots_Min_Fields>;
  stddev?: Maybe<External_Product_Snapshots_Stddev_Fields>;
  stddev_pop?: Maybe<External_Product_Snapshots_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<External_Product_Snapshots_Stddev_Samp_Fields>;
  sum?: Maybe<External_Product_Snapshots_Sum_Fields>;
  var_pop?: Maybe<External_Product_Snapshots_Var_Pop_Fields>;
  var_samp?: Maybe<External_Product_Snapshots_Var_Samp_Fields>;
  variance?: Maybe<External_Product_Snapshots_Variance_Fields>;
};


/** aggregate fields of "external_product_snapshots" */
export type External_Product_Snapshots_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<External_Product_Snapshots_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "external_product_snapshots" */
export type External_Product_Snapshots_Aggregate_Order_By = {
  avg?: Maybe<External_Product_Snapshots_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<External_Product_Snapshots_Max_Order_By>;
  min?: Maybe<External_Product_Snapshots_Min_Order_By>;
  stddev?: Maybe<External_Product_Snapshots_Stddev_Order_By>;
  stddev_pop?: Maybe<External_Product_Snapshots_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<External_Product_Snapshots_Stddev_Samp_Order_By>;
  sum?: Maybe<External_Product_Snapshots_Sum_Order_By>;
  var_pop?: Maybe<External_Product_Snapshots_Var_Pop_Order_By>;
  var_samp?: Maybe<External_Product_Snapshots_Var_Samp_Order_By>;
  variance?: Maybe<External_Product_Snapshots_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "external_product_snapshots" */
export type External_Product_Snapshots_Arr_Rel_Insert_Input = {
  data: Array<External_Product_Snapshots_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<External_Product_Snapshots_On_Conflict>;
};

/** aggregate avg on columns */
export type External_Product_Snapshots_Avg_Fields = {
  __typename?: 'external_product_snapshots_avg_fields';
  hrsToSold?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  priceWas?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "external_product_snapshots" */
export type External_Product_Snapshots_Avg_Order_By = {
  hrsToSold?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "external_product_snapshots". All fields are combined with a logical 'AND'. */
export type External_Product_Snapshots_Bool_Exp = {
  _and?: Maybe<Array<External_Product_Snapshots_Bool_Exp>>;
  _not?: Maybe<External_Product_Snapshots_Bool_Exp>;
  _or?: Maybe<Array<External_Product_Snapshots_Bool_Exp>>;
  action?: Maybe<String_Comparison_Exp>;
  adType?: Maybe<String_Comparison_Exp>;
  advertised?: Maybe<Timestamptz_Comparison_Exp>;
  barrelLength?: Maybe<String_Comparison_Exp>;
  caliber?: Maybe<String_Comparison_Exp>;
  caliberId?: Maybe<String_Comparison_Exp>;
  condition?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  externalProductId?: Maybe<String_Comparison_Exp>;
  hrsToSold?: Maybe<Numeric_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  isSold?: Maybe<Boolean_Comparison_Exp>;
  licenseNumber?: Maybe<String_Comparison_Exp>;
  make?: Maybe<String_Comparison_Exp>;
  model?: Maybe<String_Comparison_Exp>;
  phoneNumber?: Maybe<String_Comparison_Exp>;
  previewItems?: Maybe<Product_Preview_Items_Bool_Exp>;
  price?: Maybe<Int_Comparison_Exp>;
  priceWas?: Maybe<Int_Comparison_Exp>;
  serialNumber?: Maybe<String_Comparison_Exp>;
  soldText?: Maybe<String_Comparison_Exp>;
  state?: Maybe<String_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  transferringDealer?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "external_product_snapshots" */
export enum External_Product_Snapshots_Constraint {
  /** unique or primary key constraint */
  EXTERNAL_PRODUCT_SNAPSHOTS_PKEY = 'external_product_snapshots_pkey'
}

/** input type for incrementing numeric columns in table "external_product_snapshots" */
export type External_Product_Snapshots_Inc_Input = {
  hrsToSold?: Maybe<Scalars['numeric']>;
  price?: Maybe<Scalars['Int']>;
  priceWas?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "external_product_snapshots" */
export type External_Product_Snapshots_Insert_Input = {
  action?: Maybe<Scalars['String']>;
  adType?: Maybe<Scalars['String']>;
  advertised?: Maybe<Scalars['timestamptz']>;
  barrelLength?: Maybe<Scalars['String']>;
  caliber?: Maybe<Scalars['String']>;
  caliberId?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  externalProductId?: Maybe<Scalars['String']>;
  hrsToSold?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['String']>;
  isSold?: Maybe<Scalars['Boolean']>;
  licenseNumber?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  previewItems?: Maybe<Product_Preview_Items_Arr_Rel_Insert_Input>;
  price?: Maybe<Scalars['Int']>;
  priceWas?: Maybe<Scalars['Int']>;
  serialNumber?: Maybe<Scalars['String']>;
  soldText?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  transferringDealer?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type External_Product_Snapshots_Max_Fields = {
  __typename?: 'external_product_snapshots_max_fields';
  action?: Maybe<Scalars['String']>;
  adType?: Maybe<Scalars['String']>;
  advertised?: Maybe<Scalars['timestamptz']>;
  barrelLength?: Maybe<Scalars['String']>;
  caliber?: Maybe<Scalars['String']>;
  caliberId?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  externalProductId?: Maybe<Scalars['String']>;
  hrsToSold?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['String']>;
  licenseNumber?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  priceWas?: Maybe<Scalars['Int']>;
  serialNumber?: Maybe<Scalars['String']>;
  soldText?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  transferringDealer?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "external_product_snapshots" */
export type External_Product_Snapshots_Max_Order_By = {
  action?: Maybe<Order_By>;
  adType?: Maybe<Order_By>;
  advertised?: Maybe<Order_By>;
  barrelLength?: Maybe<Order_By>;
  caliber?: Maybe<Order_By>;
  caliberId?: Maybe<Order_By>;
  condition?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  externalProductId?: Maybe<Order_By>;
  hrsToSold?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
  make?: Maybe<Order_By>;
  model?: Maybe<Order_By>;
  phoneNumber?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
  serialNumber?: Maybe<Order_By>;
  soldText?: Maybe<Order_By>;
  state?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  transferringDealer?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type External_Product_Snapshots_Min_Fields = {
  __typename?: 'external_product_snapshots_min_fields';
  action?: Maybe<Scalars['String']>;
  adType?: Maybe<Scalars['String']>;
  advertised?: Maybe<Scalars['timestamptz']>;
  barrelLength?: Maybe<Scalars['String']>;
  caliber?: Maybe<Scalars['String']>;
  caliberId?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  externalProductId?: Maybe<Scalars['String']>;
  hrsToSold?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['String']>;
  licenseNumber?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  priceWas?: Maybe<Scalars['Int']>;
  serialNumber?: Maybe<Scalars['String']>;
  soldText?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  transferringDealer?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "external_product_snapshots" */
export type External_Product_Snapshots_Min_Order_By = {
  action?: Maybe<Order_By>;
  adType?: Maybe<Order_By>;
  advertised?: Maybe<Order_By>;
  barrelLength?: Maybe<Order_By>;
  caliber?: Maybe<Order_By>;
  caliberId?: Maybe<Order_By>;
  condition?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  externalProductId?: Maybe<Order_By>;
  hrsToSold?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
  make?: Maybe<Order_By>;
  model?: Maybe<Order_By>;
  phoneNumber?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
  serialNumber?: Maybe<Order_By>;
  soldText?: Maybe<Order_By>;
  state?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  transferringDealer?: Maybe<Order_By>;
};

/** response of any mutation on the table "external_product_snapshots" */
export type External_Product_Snapshots_Mutation_Response = {
  __typename?: 'external_product_snapshots_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<External_Product_Snapshots>;
};

/** input type for inserting object relation for remote table "external_product_snapshots" */
export type External_Product_Snapshots_Obj_Rel_Insert_Input = {
  data: External_Product_Snapshots_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<External_Product_Snapshots_On_Conflict>;
};

/** on conflict condition type for table "external_product_snapshots" */
export type External_Product_Snapshots_On_Conflict = {
  constraint: External_Product_Snapshots_Constraint;
  update_columns?: Array<External_Product_Snapshots_Update_Column>;
  where?: Maybe<External_Product_Snapshots_Bool_Exp>;
};

/** Ordering options when selecting data from "external_product_snapshots". */
export type External_Product_Snapshots_Order_By = {
  action?: Maybe<Order_By>;
  adType?: Maybe<Order_By>;
  advertised?: Maybe<Order_By>;
  barrelLength?: Maybe<Order_By>;
  caliber?: Maybe<Order_By>;
  caliberId?: Maybe<Order_By>;
  condition?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  externalProductId?: Maybe<Order_By>;
  hrsToSold?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  isSold?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
  make?: Maybe<Order_By>;
  model?: Maybe<Order_By>;
  phoneNumber?: Maybe<Order_By>;
  previewItems_aggregate?: Maybe<Product_Preview_Items_Aggregate_Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
  serialNumber?: Maybe<Order_By>;
  soldText?: Maybe<Order_By>;
  state?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  transferringDealer?: Maybe<Order_By>;
};

/** primary key columns input for table: external_product_snapshots */
export type External_Product_Snapshots_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "external_product_snapshots" */
export enum External_Product_Snapshots_Select_Column {
  /** column name */
  ACTION = 'action',
  /** column name */
  ADTYPE = 'adType',
  /** column name */
  ADVERTISED = 'advertised',
  /** column name */
  BARRELLENGTH = 'barrelLength',
  /** column name */
  CALIBER = 'caliber',
  /** column name */
  CALIBERID = 'caliberId',
  /** column name */
  CONDITION = 'condition',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  DESCRIPTION = 'description',
  /** column name */
  EXTERNALPRODUCTID = 'externalProductId',
  /** column name */
  HRSTOSOLD = 'hrsToSold',
  /** column name */
  ID = 'id',
  /** column name */
  ISSOLD = 'isSold',
  /** column name */
  LICENSENUMBER = 'licenseNumber',
  /** column name */
  MAKE = 'make',
  /** column name */
  MODEL = 'model',
  /** column name */
  PHONENUMBER = 'phoneNumber',
  /** column name */
  PRICE = 'price',
  /** column name */
  PRICEWAS = 'priceWas',
  /** column name */
  SERIALNUMBER = 'serialNumber',
  /** column name */
  SOLDTEXT = 'soldText',
  /** column name */
  STATE = 'state',
  /** column name */
  TITLE = 'title',
  /** column name */
  TRANSFERRINGDEALER = 'transferringDealer'
}

/** input type for updating data in table "external_product_snapshots" */
export type External_Product_Snapshots_Set_Input = {
  action?: Maybe<Scalars['String']>;
  adType?: Maybe<Scalars['String']>;
  advertised?: Maybe<Scalars['timestamptz']>;
  barrelLength?: Maybe<Scalars['String']>;
  caliber?: Maybe<Scalars['String']>;
  caliberId?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  externalProductId?: Maybe<Scalars['String']>;
  hrsToSold?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['String']>;
  isSold?: Maybe<Scalars['Boolean']>;
  licenseNumber?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  priceWas?: Maybe<Scalars['Int']>;
  serialNumber?: Maybe<Scalars['String']>;
  soldText?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  transferringDealer?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type External_Product_Snapshots_Stddev_Fields = {
  __typename?: 'external_product_snapshots_stddev_fields';
  hrsToSold?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  priceWas?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "external_product_snapshots" */
export type External_Product_Snapshots_Stddev_Order_By = {
  hrsToSold?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type External_Product_Snapshots_Stddev_Pop_Fields = {
  __typename?: 'external_product_snapshots_stddev_pop_fields';
  hrsToSold?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  priceWas?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "external_product_snapshots" */
export type External_Product_Snapshots_Stddev_Pop_Order_By = {
  hrsToSold?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type External_Product_Snapshots_Stddev_Samp_Fields = {
  __typename?: 'external_product_snapshots_stddev_samp_fields';
  hrsToSold?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  priceWas?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "external_product_snapshots" */
export type External_Product_Snapshots_Stddev_Samp_Order_By = {
  hrsToSold?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type External_Product_Snapshots_Sum_Fields = {
  __typename?: 'external_product_snapshots_sum_fields';
  hrsToSold?: Maybe<Scalars['numeric']>;
  price?: Maybe<Scalars['Int']>;
  priceWas?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "external_product_snapshots" */
export type External_Product_Snapshots_Sum_Order_By = {
  hrsToSold?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
};

/** update columns of table "external_product_snapshots" */
export enum External_Product_Snapshots_Update_Column {
  /** column name */
  ACTION = 'action',
  /** column name */
  ADTYPE = 'adType',
  /** column name */
  ADVERTISED = 'advertised',
  /** column name */
  BARRELLENGTH = 'barrelLength',
  /** column name */
  CALIBER = 'caliber',
  /** column name */
  CALIBERID = 'caliberId',
  /** column name */
  CONDITION = 'condition',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  DESCRIPTION = 'description',
  /** column name */
  EXTERNALPRODUCTID = 'externalProductId',
  /** column name */
  HRSTOSOLD = 'hrsToSold',
  /** column name */
  ID = 'id',
  /** column name */
  ISSOLD = 'isSold',
  /** column name */
  LICENSENUMBER = 'licenseNumber',
  /** column name */
  MAKE = 'make',
  /** column name */
  MODEL = 'model',
  /** column name */
  PHONENUMBER = 'phoneNumber',
  /** column name */
  PRICE = 'price',
  /** column name */
  PRICEWAS = 'priceWas',
  /** column name */
  SERIALNUMBER = 'serialNumber',
  /** column name */
  SOLDTEXT = 'soldText',
  /** column name */
  STATE = 'state',
  /** column name */
  TITLE = 'title',
  /** column name */
  TRANSFERRINGDEALER = 'transferringDealer'
}

/** aggregate var_pop on columns */
export type External_Product_Snapshots_Var_Pop_Fields = {
  __typename?: 'external_product_snapshots_var_pop_fields';
  hrsToSold?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  priceWas?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "external_product_snapshots" */
export type External_Product_Snapshots_Var_Pop_Order_By = {
  hrsToSold?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type External_Product_Snapshots_Var_Samp_Fields = {
  __typename?: 'external_product_snapshots_var_samp_fields';
  hrsToSold?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  priceWas?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "external_product_snapshots" */
export type External_Product_Snapshots_Var_Samp_Order_By = {
  hrsToSold?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type External_Product_Snapshots_Variance_Fields = {
  __typename?: 'external_product_snapshots_variance_fields';
  hrsToSold?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  priceWas?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "external_product_snapshots" */
export type External_Product_Snapshots_Variance_Order_By = {
  hrsToSold?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
};

/** columns and relationships of "external_products" */
export type External_Products = {
  __typename?: 'external_products';
  /** An object relationship */
  category?: Maybe<Categories>;
  categoryId?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamptz'];
  /** An object relationship */
  currentExternalProductSnapshot?: Maybe<External_Product_Snapshots>;
  currentExternalProductSnapshotId: Scalars['String'];
  day?: Maybe<Scalars['Int']>;
  /** An array relationship */
  externalProductSnapshots: Array<External_Product_Snapshots>;
  /** An aggregate relationship */
  externalProductSnapshots_aggregate: External_Product_Snapshots_Aggregate;
  id: Scalars['String'];
  month?: Maybe<Scalars['Int']>;
  productType?: Maybe<Scalars['String']>;
  sourceSite: Scalars['String'];
  sourceSiteId: Scalars['String'];
  sourceSiteUrl?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
  year?: Maybe<Scalars['Int']>;
};


/** columns and relationships of "external_products" */
export type External_ProductsExternalProductSnapshotsArgs = {
  distinct_on?: Maybe<Array<External_Product_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<External_Product_Snapshots_Order_By>>;
  where?: Maybe<External_Product_Snapshots_Bool_Exp>;
};


/** columns and relationships of "external_products" */
export type External_ProductsExternalProductSnapshots_AggregateArgs = {
  distinct_on?: Maybe<Array<External_Product_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<External_Product_Snapshots_Order_By>>;
  where?: Maybe<External_Product_Snapshots_Bool_Exp>;
};

/** aggregated selection of "external_products" */
export type External_Products_Aggregate = {
  __typename?: 'external_products_aggregate';
  aggregate?: Maybe<External_Products_Aggregate_Fields>;
  nodes: Array<External_Products>;
};

/** aggregate fields of "external_products" */
export type External_Products_Aggregate_Fields = {
  __typename?: 'external_products_aggregate_fields';
  avg?: Maybe<External_Products_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<External_Products_Max_Fields>;
  min?: Maybe<External_Products_Min_Fields>;
  stddev?: Maybe<External_Products_Stddev_Fields>;
  stddev_pop?: Maybe<External_Products_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<External_Products_Stddev_Samp_Fields>;
  sum?: Maybe<External_Products_Sum_Fields>;
  var_pop?: Maybe<External_Products_Var_Pop_Fields>;
  var_samp?: Maybe<External_Products_Var_Samp_Fields>;
  variance?: Maybe<External_Products_Variance_Fields>;
};


/** aggregate fields of "external_products" */
export type External_Products_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<External_Products_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type External_Products_Avg_Fields = {
  __typename?: 'external_products_avg_fields';
  day?: Maybe<Scalars['Float']>;
  month?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "external_products". All fields are combined with a logical 'AND'. */
export type External_Products_Bool_Exp = {
  _and?: Maybe<Array<External_Products_Bool_Exp>>;
  _not?: Maybe<External_Products_Bool_Exp>;
  _or?: Maybe<Array<External_Products_Bool_Exp>>;
  category?: Maybe<Categories_Bool_Exp>;
  categoryId?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  currentExternalProductSnapshot?: Maybe<External_Product_Snapshots_Bool_Exp>;
  currentExternalProductSnapshotId?: Maybe<String_Comparison_Exp>;
  day?: Maybe<Int_Comparison_Exp>;
  externalProductSnapshots?: Maybe<External_Product_Snapshots_Bool_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  month?: Maybe<Int_Comparison_Exp>;
  productType?: Maybe<String_Comparison_Exp>;
  sourceSite?: Maybe<String_Comparison_Exp>;
  sourceSiteId?: Maybe<String_Comparison_Exp>;
  sourceSiteUrl?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  year?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "external_products" */
export enum External_Products_Constraint {
  /** unique or primary key constraint */
  EXTERNAL_PRODUCTS_PKEY = 'external_products_pkey'
}

/** input type for incrementing numeric columns in table "external_products" */
export type External_Products_Inc_Input = {
  day?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "external_products" */
export type External_Products_Insert_Input = {
  category?: Maybe<Categories_Obj_Rel_Insert_Input>;
  categoryId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currentExternalProductSnapshot?: Maybe<External_Product_Snapshots_Obj_Rel_Insert_Input>;
  currentExternalProductSnapshotId?: Maybe<Scalars['String']>;
  day?: Maybe<Scalars['Int']>;
  externalProductSnapshots?: Maybe<External_Product_Snapshots_Arr_Rel_Insert_Input>;
  id?: Maybe<Scalars['String']>;
  month?: Maybe<Scalars['Int']>;
  productType?: Maybe<Scalars['String']>;
  sourceSite?: Maybe<Scalars['String']>;
  sourceSiteId?: Maybe<Scalars['String']>;
  sourceSiteUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  year?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type External_Products_Max_Fields = {
  __typename?: 'external_products_max_fields';
  categoryId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currentExternalProductSnapshotId?: Maybe<Scalars['String']>;
  day?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  month?: Maybe<Scalars['Int']>;
  productType?: Maybe<Scalars['String']>;
  sourceSite?: Maybe<Scalars['String']>;
  sourceSiteId?: Maybe<Scalars['String']>;
  sourceSiteUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  year?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type External_Products_Min_Fields = {
  __typename?: 'external_products_min_fields';
  categoryId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currentExternalProductSnapshotId?: Maybe<Scalars['String']>;
  day?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  month?: Maybe<Scalars['Int']>;
  productType?: Maybe<Scalars['String']>;
  sourceSite?: Maybe<Scalars['String']>;
  sourceSiteId?: Maybe<Scalars['String']>;
  sourceSiteUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  year?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "external_products" */
export type External_Products_Mutation_Response = {
  __typename?: 'external_products_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<External_Products>;
};

/** input type for inserting object relation for remote table "external_products" */
export type External_Products_Obj_Rel_Insert_Input = {
  data: External_Products_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<External_Products_On_Conflict>;
};

/** on conflict condition type for table "external_products" */
export type External_Products_On_Conflict = {
  constraint: External_Products_Constraint;
  update_columns?: Array<External_Products_Update_Column>;
  where?: Maybe<External_Products_Bool_Exp>;
};

/** Ordering options when selecting data from "external_products". */
export type External_Products_Order_By = {
  category?: Maybe<Categories_Order_By>;
  categoryId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currentExternalProductSnapshot?: Maybe<External_Product_Snapshots_Order_By>;
  currentExternalProductSnapshotId?: Maybe<Order_By>;
  day?: Maybe<Order_By>;
  externalProductSnapshots_aggregate?: Maybe<External_Product_Snapshots_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  month?: Maybe<Order_By>;
  productType?: Maybe<Order_By>;
  sourceSite?: Maybe<Order_By>;
  sourceSiteId?: Maybe<Order_By>;
  sourceSiteUrl?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  year?: Maybe<Order_By>;
};

/** primary key columns input for table: external_products */
export type External_Products_Pk_Columns_Input = {
  sourceSite: Scalars['String'];
  sourceSiteId: Scalars['String'];
};

/** select columns of table "external_products" */
export enum External_Products_Select_Column {
  /** column name */
  CATEGORYID = 'categoryId',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CURRENTEXTERNALPRODUCTSNAPSHOTID = 'currentExternalProductSnapshotId',
  /** column name */
  DAY = 'day',
  /** column name */
  ID = 'id',
  /** column name */
  MONTH = 'month',
  /** column name */
  PRODUCTTYPE = 'productType',
  /** column name */
  SOURCESITE = 'sourceSite',
  /** column name */
  SOURCESITEID = 'sourceSiteId',
  /** column name */
  SOURCESITEURL = 'sourceSiteUrl',
  /** column name */
  UPDATEDAT = 'updatedAt',
  /** column name */
  YEAR = 'year'
}

/** input type for updating data in table "external_products" */
export type External_Products_Set_Input = {
  categoryId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currentExternalProductSnapshotId?: Maybe<Scalars['String']>;
  day?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  month?: Maybe<Scalars['Int']>;
  productType?: Maybe<Scalars['String']>;
  sourceSite?: Maybe<Scalars['String']>;
  sourceSiteId?: Maybe<Scalars['String']>;
  sourceSiteUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  year?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type External_Products_Stddev_Fields = {
  __typename?: 'external_products_stddev_fields';
  day?: Maybe<Scalars['Float']>;
  month?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type External_Products_Stddev_Pop_Fields = {
  __typename?: 'external_products_stddev_pop_fields';
  day?: Maybe<Scalars['Float']>;
  month?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type External_Products_Stddev_Samp_Fields = {
  __typename?: 'external_products_stddev_samp_fields';
  day?: Maybe<Scalars['Float']>;
  month?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type External_Products_Sum_Fields = {
  __typename?: 'external_products_sum_fields';
  day?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

/** update columns of table "external_products" */
export enum External_Products_Update_Column {
  /** column name */
  CATEGORYID = 'categoryId',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CURRENTEXTERNALPRODUCTSNAPSHOTID = 'currentExternalProductSnapshotId',
  /** column name */
  DAY = 'day',
  /** column name */
  ID = 'id',
  /** column name */
  MONTH = 'month',
  /** column name */
  PRODUCTTYPE = 'productType',
  /** column name */
  SOURCESITE = 'sourceSite',
  /** column name */
  SOURCESITEID = 'sourceSiteId',
  /** column name */
  SOURCESITEURL = 'sourceSiteUrl',
  /** column name */
  UPDATEDAT = 'updatedAt',
  /** column name */
  YEAR = 'year'
}

/** aggregate var_pop on columns */
export type External_Products_Var_Pop_Fields = {
  __typename?: 'external_products_var_pop_fields';
  day?: Maybe<Scalars['Float']>;
  month?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type External_Products_Var_Samp_Fields = {
  __typename?: 'external_products_var_samp_fields';
  day?: Maybe<Scalars['Float']>;
  month?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type External_Products_Variance_Fields = {
  __typename?: 'external_products_variance_fields';
  day?: Maybe<Scalars['Float']>;
  month?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "image_owners" */
export type Image_Owners = {
  __typename?: 'image_owners';
  imageId: Scalars['String'];
  ownerId: Scalars['String'];
};

/** aggregated selection of "image_owners" */
export type Image_Owners_Aggregate = {
  __typename?: 'image_owners_aggregate';
  aggregate?: Maybe<Image_Owners_Aggregate_Fields>;
  nodes: Array<Image_Owners>;
};

/** aggregate fields of "image_owners" */
export type Image_Owners_Aggregate_Fields = {
  __typename?: 'image_owners_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Image_Owners_Max_Fields>;
  min?: Maybe<Image_Owners_Min_Fields>;
};


/** aggregate fields of "image_owners" */
export type Image_Owners_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Image_Owners_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "image_owners". All fields are combined with a logical 'AND'. */
export type Image_Owners_Bool_Exp = {
  _and?: Maybe<Array<Image_Owners_Bool_Exp>>;
  _not?: Maybe<Image_Owners_Bool_Exp>;
  _or?: Maybe<Array<Image_Owners_Bool_Exp>>;
  imageId?: Maybe<String_Comparison_Exp>;
  ownerId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "image_owners" */
export enum Image_Owners_Constraint {
  /** unique or primary key constraint */
  IMAGE_OWNERS_PKEY = 'image_owners_pkey'
}

/** input type for inserting data into table "image_owners" */
export type Image_Owners_Insert_Input = {
  imageId?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Image_Owners_Max_Fields = {
  __typename?: 'image_owners_max_fields';
  imageId?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Image_Owners_Min_Fields = {
  __typename?: 'image_owners_min_fields';
  imageId?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "image_owners" */
export type Image_Owners_Mutation_Response = {
  __typename?: 'image_owners_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Image_Owners>;
};

/** on conflict condition type for table "image_owners" */
export type Image_Owners_On_Conflict = {
  constraint: Image_Owners_Constraint;
  update_columns?: Array<Image_Owners_Update_Column>;
  where?: Maybe<Image_Owners_Bool_Exp>;
};

/** Ordering options when selecting data from "image_owners". */
export type Image_Owners_Order_By = {
  imageId?: Maybe<Order_By>;
  ownerId?: Maybe<Order_By>;
};

/** primary key columns input for table: image_owners */
export type Image_Owners_Pk_Columns_Input = {
  imageId: Scalars['String'];
};

/** select columns of table "image_owners" */
export enum Image_Owners_Select_Column {
  /** column name */
  IMAGEID = 'imageId',
  /** column name */
  OWNERID = 'ownerId'
}

/** input type for updating data in table "image_owners" */
export type Image_Owners_Set_Input = {
  imageId?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
};

/** update columns of table "image_owners" */
export enum Image_Owners_Update_Column {
  /** column name */
  IMAGEID = 'imageId',
  /** column name */
  OWNERID = 'ownerId'
}

/** columns and relationships of "image_parents" */
export type Image_Parents = {
  __typename?: 'image_parents';
  createdAt: Scalars['timestamptz'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isInternal?: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  original?: Maybe<Image_Variants>;
  originalVariantId: Scalars['String'];
  tags?: Maybe<Scalars['String']>;
  /** An array relationship */
  variants: Array<Image_Variants>;
  /** An aggregate relationship */
  variants_aggregate: Image_Variants_Aggregate;
};


/** columns and relationships of "image_parents" */
export type Image_ParentsVariantsArgs = {
  distinct_on?: Maybe<Array<Image_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Variants_Order_By>>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};


/** columns and relationships of "image_parents" */
export type Image_ParentsVariants_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Variants_Order_By>>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};

/** aggregated selection of "image_parents" */
export type Image_Parents_Aggregate = {
  __typename?: 'image_parents_aggregate';
  aggregate?: Maybe<Image_Parents_Aggregate_Fields>;
  nodes: Array<Image_Parents>;
};

/** aggregate fields of "image_parents" */
export type Image_Parents_Aggregate_Fields = {
  __typename?: 'image_parents_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Image_Parents_Max_Fields>;
  min?: Maybe<Image_Parents_Min_Fields>;
};


/** aggregate fields of "image_parents" */
export type Image_Parents_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Image_Parents_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "image_parents". All fields are combined with a logical 'AND'. */
export type Image_Parents_Bool_Exp = {
  _and?: Maybe<Array<Image_Parents_Bool_Exp>>;
  _not?: Maybe<Image_Parents_Bool_Exp>;
  _or?: Maybe<Array<Image_Parents_Bool_Exp>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  isInternal?: Maybe<Boolean_Comparison_Exp>;
  original?: Maybe<Image_Variants_Bool_Exp>;
  originalVariantId?: Maybe<String_Comparison_Exp>;
  tags?: Maybe<String_Comparison_Exp>;
  variants?: Maybe<Image_Variants_Bool_Exp>;
};

/** unique or primary key constraints on table "image_parents" */
export enum Image_Parents_Constraint {
  /** unique or primary key constraint */
  IMAGE_PARENTS_PKEY = 'image_parents_pkey'
}

/** input type for inserting data into table "image_parents" */
export type Image_Parents_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isInternal?: Maybe<Scalars['Boolean']>;
  original?: Maybe<Image_Variants_Obj_Rel_Insert_Input>;
  originalVariantId?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  variants?: Maybe<Image_Variants_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Image_Parents_Max_Fields = {
  __typename?: 'image_parents_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  originalVariantId?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Image_Parents_Min_Fields = {
  __typename?: 'image_parents_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  originalVariantId?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "image_parents" */
export type Image_Parents_Mutation_Response = {
  __typename?: 'image_parents_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Image_Parents>;
};

/** input type for inserting object relation for remote table "image_parents" */
export type Image_Parents_Obj_Rel_Insert_Input = {
  data: Image_Parents_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Image_Parents_On_Conflict>;
};

/** on conflict condition type for table "image_parents" */
export type Image_Parents_On_Conflict = {
  constraint: Image_Parents_Constraint;
  update_columns?: Array<Image_Parents_Update_Column>;
  where?: Maybe<Image_Parents_Bool_Exp>;
};

/** Ordering options when selecting data from "image_parents". */
export type Image_Parents_Order_By = {
  createdAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  isInternal?: Maybe<Order_By>;
  original?: Maybe<Image_Variants_Order_By>;
  originalVariantId?: Maybe<Order_By>;
  tags?: Maybe<Order_By>;
  variants_aggregate?: Maybe<Image_Variants_Aggregate_Order_By>;
};

/** primary key columns input for table: image_parents */
export type Image_Parents_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "image_parents" */
export enum Image_Parents_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  DESCRIPTION = 'description',
  /** column name */
  ID = 'id',
  /** column name */
  ISINTERNAL = 'isInternal',
  /** column name */
  ORIGINALVARIANTID = 'originalVariantId',
  /** column name */
  TAGS = 'tags'
}

/** input type for updating data in table "image_parents" */
export type Image_Parents_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isInternal?: Maybe<Scalars['Boolean']>;
  originalVariantId?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
};

/** update columns of table "image_parents" */
export enum Image_Parents_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  DESCRIPTION = 'description',
  /** column name */
  ID = 'id',
  /** column name */
  ISINTERNAL = 'isInternal',
  /** column name */
  ORIGINALVARIANTID = 'originalVariantId',
  /** column name */
  TAGS = 'tags'
}

/** columns and relationships of "image_variants" */
export type Image_Variants = {
  __typename?: 'image_variants';
  heightInPixels: Scalars['Int'];
  id: Scalars['String'];
  mimeType: Scalars['String'];
  parentId: Scalars['String'];
  sizeInBytes: Scalars['Int'];
  url?: Maybe<Scalars['String']>;
  widthInPixels: Scalars['Int'];
};

/** aggregated selection of "image_variants" */
export type Image_Variants_Aggregate = {
  __typename?: 'image_variants_aggregate';
  aggregate?: Maybe<Image_Variants_Aggregate_Fields>;
  nodes: Array<Image_Variants>;
};

/** aggregate fields of "image_variants" */
export type Image_Variants_Aggregate_Fields = {
  __typename?: 'image_variants_aggregate_fields';
  avg?: Maybe<Image_Variants_Avg_Fields>;
  count: Scalars['Int'];
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


/** aggregate fields of "image_variants" */
export type Image_Variants_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Image_Variants_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "image_variants" */
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

/** input type for inserting array relation for remote table "image_variants" */
export type Image_Variants_Arr_Rel_Insert_Input = {
  data: Array<Image_Variants_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Image_Variants_On_Conflict>;
};

/** aggregate avg on columns */
export type Image_Variants_Avg_Fields = {
  __typename?: 'image_variants_avg_fields';
  heightInPixels?: Maybe<Scalars['Float']>;
  sizeInBytes?: Maybe<Scalars['Float']>;
  widthInPixels?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "image_variants" */
export type Image_Variants_Avg_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "image_variants". All fields are combined with a logical 'AND'. */
export type Image_Variants_Bool_Exp = {
  _and?: Maybe<Array<Image_Variants_Bool_Exp>>;
  _not?: Maybe<Image_Variants_Bool_Exp>;
  _or?: Maybe<Array<Image_Variants_Bool_Exp>>;
  heightInPixels?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  mimeType?: Maybe<String_Comparison_Exp>;
  parentId?: Maybe<String_Comparison_Exp>;
  sizeInBytes?: Maybe<Int_Comparison_Exp>;
  url?: Maybe<String_Comparison_Exp>;
  widthInPixels?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "image_variants" */
export enum Image_Variants_Constraint {
  /** unique or primary key constraint */
  IMAGE_VARIANTS_PKEY = 'image_variants_pkey'
}

/** input type for incrementing numeric columns in table "image_variants" */
export type Image_Variants_Inc_Input = {
  heightInPixels?: Maybe<Scalars['Int']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
  widthInPixels?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "image_variants" */
export type Image_Variants_Insert_Input = {
  heightInPixels?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  widthInPixels?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Image_Variants_Max_Fields = {
  __typename?: 'image_variants_max_fields';
  heightInPixels?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  widthInPixels?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "image_variants" */
export type Image_Variants_Max_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  parentId?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Image_Variants_Min_Fields = {
  __typename?: 'image_variants_min_fields';
  heightInPixels?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  widthInPixels?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "image_variants" */
export type Image_Variants_Min_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  parentId?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

/** response of any mutation on the table "image_variants" */
export type Image_Variants_Mutation_Response = {
  __typename?: 'image_variants_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Image_Variants>;
};

/** input type for inserting object relation for remote table "image_variants" */
export type Image_Variants_Obj_Rel_Insert_Input = {
  data: Image_Variants_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Image_Variants_On_Conflict>;
};

/** on conflict condition type for table "image_variants" */
export type Image_Variants_On_Conflict = {
  constraint: Image_Variants_Constraint;
  update_columns?: Array<Image_Variants_Update_Column>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};

/** Ordering options when selecting data from "image_variants". */
export type Image_Variants_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  parentId?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

/** primary key columns input for table: image_variants */
export type Image_Variants_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "image_variants" */
export enum Image_Variants_Select_Column {
  /** column name */
  HEIGHTINPIXELS = 'heightInPixels',
  /** column name */
  ID = 'id',
  /** column name */
  MIMETYPE = 'mimeType',
  /** column name */
  PARENTID = 'parentId',
  /** column name */
  SIZEINBYTES = 'sizeInBytes',
  /** column name */
  URL = 'url',
  /** column name */
  WIDTHINPIXELS = 'widthInPixels'
}

/** input type for updating data in table "image_variants" */
export type Image_Variants_Set_Input = {
  heightInPixels?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  widthInPixels?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Image_Variants_Stddev_Fields = {
  __typename?: 'image_variants_stddev_fields';
  heightInPixels?: Maybe<Scalars['Float']>;
  sizeInBytes?: Maybe<Scalars['Float']>;
  widthInPixels?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "image_variants" */
export type Image_Variants_Stddev_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Image_Variants_Stddev_Pop_Fields = {
  __typename?: 'image_variants_stddev_pop_fields';
  heightInPixels?: Maybe<Scalars['Float']>;
  sizeInBytes?: Maybe<Scalars['Float']>;
  widthInPixels?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "image_variants" */
export type Image_Variants_Stddev_Pop_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Image_Variants_Stddev_Samp_Fields = {
  __typename?: 'image_variants_stddev_samp_fields';
  heightInPixels?: Maybe<Scalars['Float']>;
  sizeInBytes?: Maybe<Scalars['Float']>;
  widthInPixels?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "image_variants" */
export type Image_Variants_Stddev_Samp_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Image_Variants_Sum_Fields = {
  __typename?: 'image_variants_sum_fields';
  heightInPixels?: Maybe<Scalars['Int']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
  widthInPixels?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "image_variants" */
export type Image_Variants_Sum_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

/** update columns of table "image_variants" */
export enum Image_Variants_Update_Column {
  /** column name */
  HEIGHTINPIXELS = 'heightInPixels',
  /** column name */
  ID = 'id',
  /** column name */
  MIMETYPE = 'mimeType',
  /** column name */
  PARENTID = 'parentId',
  /** column name */
  SIZEINBYTES = 'sizeInBytes',
  /** column name */
  URL = 'url',
  /** column name */
  WIDTHINPIXELS = 'widthInPixels'
}

/** aggregate var_pop on columns */
export type Image_Variants_Var_Pop_Fields = {
  __typename?: 'image_variants_var_pop_fields';
  heightInPixels?: Maybe<Scalars['Float']>;
  sizeInBytes?: Maybe<Scalars['Float']>;
  widthInPixels?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "image_variants" */
export type Image_Variants_Var_Pop_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Image_Variants_Var_Samp_Fields = {
  __typename?: 'image_variants_var_samp_fields';
  heightInPixels?: Maybe<Scalars['Float']>;
  sizeInBytes?: Maybe<Scalars['Float']>;
  widthInPixels?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "image_variants" */
export type Image_Variants_Var_Samp_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Image_Variants_Variance_Fields = {
  __typename?: 'image_variants_variance_fields';
  heightInPixels?: Maybe<Scalars['Float']>;
  sizeInBytes?: Maybe<Scalars['Float']>;
  widthInPixels?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "image_variants" */
export type Image_Variants_Variance_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

export type List_Products_Random_Args = {
  seed?: Maybe<Scalars['seed_float']>;
};

/** columns and relationships of "migrations" */
export type Migrations = {
  __typename?: 'migrations';
  datetime?: Maybe<Scalars['timestamptz']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

/** aggregated selection of "migrations" */
export type Migrations_Aggregate = {
  __typename?: 'migrations_aggregate';
  aggregate?: Maybe<Migrations_Aggregate_Fields>;
  nodes: Array<Migrations>;
};

/** aggregate fields of "migrations" */
export type Migrations_Aggregate_Fields = {
  __typename?: 'migrations_aggregate_fields';
  avg?: Maybe<Migrations_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Migrations_Max_Fields>;
  min?: Maybe<Migrations_Min_Fields>;
  stddev?: Maybe<Migrations_Stddev_Fields>;
  stddev_pop?: Maybe<Migrations_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Migrations_Stddev_Samp_Fields>;
  sum?: Maybe<Migrations_Sum_Fields>;
  var_pop?: Maybe<Migrations_Var_Pop_Fields>;
  var_samp?: Maybe<Migrations_Var_Samp_Fields>;
  variance?: Maybe<Migrations_Variance_Fields>;
};


/** aggregate fields of "migrations" */
export type Migrations_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Migrations_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Migrations_Avg_Fields = {
  __typename?: 'migrations_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "migrations". All fields are combined with a logical 'AND'. */
export type Migrations_Bool_Exp = {
  _and?: Maybe<Array<Migrations_Bool_Exp>>;
  _not?: Maybe<Migrations_Bool_Exp>;
  _or?: Maybe<Array<Migrations_Bool_Exp>>;
  datetime?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "migrations" */
export enum Migrations_Constraint {
  /** unique or primary key constraint */
  MIGRATIONS_PKEY = 'migrations_pkey'
}

/** input type for incrementing numeric columns in table "migrations" */
export type Migrations_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "migrations" */
export type Migrations_Insert_Input = {
  datetime?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Migrations_Max_Fields = {
  __typename?: 'migrations_max_fields';
  datetime?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Migrations_Min_Fields = {
  __typename?: 'migrations_min_fields';
  datetime?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "migrations" */
export type Migrations_Mutation_Response = {
  __typename?: 'migrations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Migrations>;
};

/** on conflict condition type for table "migrations" */
export type Migrations_On_Conflict = {
  constraint: Migrations_Constraint;
  update_columns?: Array<Migrations_Update_Column>;
  where?: Maybe<Migrations_Bool_Exp>;
};

/** Ordering options when selecting data from "migrations". */
export type Migrations_Order_By = {
  datetime?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** primary key columns input for table: migrations */
export type Migrations_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "migrations" */
export enum Migrations_Select_Column {
  /** column name */
  DATETIME = 'datetime',
  /** column name */
  ID = 'id',
  /** column name */
  NAME = 'name'
}

/** input type for updating data in table "migrations" */
export type Migrations_Set_Input = {
  datetime?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Migrations_Stddev_Fields = {
  __typename?: 'migrations_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Migrations_Stddev_Pop_Fields = {
  __typename?: 'migrations_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Migrations_Stddev_Samp_Fields = {
  __typename?: 'migrations_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Migrations_Sum_Fields = {
  __typename?: 'migrations_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "migrations" */
export enum Migrations_Update_Column {
  /** column name */
  DATETIME = 'datetime',
  /** column name */
  ID = 'id',
  /** column name */
  NAME = 'name'
}

/** aggregate var_pop on columns */
export type Migrations_Var_Pop_Fields = {
  __typename?: 'migrations_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Migrations_Var_Samp_Fields = {
  __typename?: 'migrations_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Migrations_Variance_Fields = {
  __typename?: 'migrations_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "news_item_votes" */
export type News_Item_Votes = {
  __typename?: 'news_item_votes';
  createdAt: Scalars['timestamptz'];
  id: Scalars['String'];
  newsItemId: Scalars['String'];
  score: Scalars['Int'];
  updatedAt: Scalars['timestamptz'];
  userId: Scalars['String'];
};

/** aggregated selection of "news_item_votes" */
export type News_Item_Votes_Aggregate = {
  __typename?: 'news_item_votes_aggregate';
  aggregate?: Maybe<News_Item_Votes_Aggregate_Fields>;
  nodes: Array<News_Item_Votes>;
};

/** aggregate fields of "news_item_votes" */
export type News_Item_Votes_Aggregate_Fields = {
  __typename?: 'news_item_votes_aggregate_fields';
  avg?: Maybe<News_Item_Votes_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<News_Item_Votes_Max_Fields>;
  min?: Maybe<News_Item_Votes_Min_Fields>;
  stddev?: Maybe<News_Item_Votes_Stddev_Fields>;
  stddev_pop?: Maybe<News_Item_Votes_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<News_Item_Votes_Stddev_Samp_Fields>;
  sum?: Maybe<News_Item_Votes_Sum_Fields>;
  var_pop?: Maybe<News_Item_Votes_Var_Pop_Fields>;
  var_samp?: Maybe<News_Item_Votes_Var_Samp_Fields>;
  variance?: Maybe<News_Item_Votes_Variance_Fields>;
};


/** aggregate fields of "news_item_votes" */
export type News_Item_Votes_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<News_Item_Votes_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "news_item_votes" */
export type News_Item_Votes_Aggregate_Order_By = {
  avg?: Maybe<News_Item_Votes_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<News_Item_Votes_Max_Order_By>;
  min?: Maybe<News_Item_Votes_Min_Order_By>;
  stddev?: Maybe<News_Item_Votes_Stddev_Order_By>;
  stddev_pop?: Maybe<News_Item_Votes_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<News_Item_Votes_Stddev_Samp_Order_By>;
  sum?: Maybe<News_Item_Votes_Sum_Order_By>;
  var_pop?: Maybe<News_Item_Votes_Var_Pop_Order_By>;
  var_samp?: Maybe<News_Item_Votes_Var_Samp_Order_By>;
  variance?: Maybe<News_Item_Votes_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "news_item_votes" */
export type News_Item_Votes_Arr_Rel_Insert_Input = {
  data: Array<News_Item_Votes_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<News_Item_Votes_On_Conflict>;
};

/** aggregate avg on columns */
export type News_Item_Votes_Avg_Fields = {
  __typename?: 'news_item_votes_avg_fields';
  score?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "news_item_votes" */
export type News_Item_Votes_Avg_Order_By = {
  score?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "news_item_votes". All fields are combined with a logical 'AND'. */
export type News_Item_Votes_Bool_Exp = {
  _and?: Maybe<Array<News_Item_Votes_Bool_Exp>>;
  _not?: Maybe<News_Item_Votes_Bool_Exp>;
  _or?: Maybe<Array<News_Item_Votes_Bool_Exp>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  newsItemId?: Maybe<String_Comparison_Exp>;
  score?: Maybe<Int_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  userId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "news_item_votes" */
export enum News_Item_Votes_Constraint {
  /** unique or primary key constraint */
  NEWS_ITEM_VOTES_PKEY = 'news_item_votes_pkey'
}

/** input type for incrementing numeric columns in table "news_item_votes" */
export type News_Item_Votes_Inc_Input = {
  score?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "news_item_votes" */
export type News_Item_Votes_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  newsItemId?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type News_Item_Votes_Max_Fields = {
  __typename?: 'news_item_votes_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  newsItemId?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "news_item_votes" */
export type News_Item_Votes_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  newsItemId?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type News_Item_Votes_Min_Fields = {
  __typename?: 'news_item_votes_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  newsItemId?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "news_item_votes" */
export type News_Item_Votes_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  newsItemId?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** response of any mutation on the table "news_item_votes" */
export type News_Item_Votes_Mutation_Response = {
  __typename?: 'news_item_votes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<News_Item_Votes>;
};

/** on conflict condition type for table "news_item_votes" */
export type News_Item_Votes_On_Conflict = {
  constraint: News_Item_Votes_Constraint;
  update_columns?: Array<News_Item_Votes_Update_Column>;
  where?: Maybe<News_Item_Votes_Bool_Exp>;
};

/** Ordering options when selecting data from "news_item_votes". */
export type News_Item_Votes_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  newsItemId?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: news_item_votes */
export type News_Item_Votes_Pk_Columns_Input = {
  newsItemId: Scalars['String'];
  userId: Scalars['String'];
};

/** select columns of table "news_item_votes" */
export enum News_Item_Votes_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  NEWSITEMID = 'newsItemId',
  /** column name */
  SCORE = 'score',
  /** column name */
  UPDATEDAT = 'updatedAt',
  /** column name */
  USERID = 'userId'
}

/** input type for updating data in table "news_item_votes" */
export type News_Item_Votes_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  newsItemId?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type News_Item_Votes_Stddev_Fields = {
  __typename?: 'news_item_votes_stddev_fields';
  score?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "news_item_votes" */
export type News_Item_Votes_Stddev_Order_By = {
  score?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type News_Item_Votes_Stddev_Pop_Fields = {
  __typename?: 'news_item_votes_stddev_pop_fields';
  score?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "news_item_votes" */
export type News_Item_Votes_Stddev_Pop_Order_By = {
  score?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type News_Item_Votes_Stddev_Samp_Fields = {
  __typename?: 'news_item_votes_stddev_samp_fields';
  score?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "news_item_votes" */
export type News_Item_Votes_Stddev_Samp_Order_By = {
  score?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type News_Item_Votes_Sum_Fields = {
  __typename?: 'news_item_votes_sum_fields';
  score?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "news_item_votes" */
export type News_Item_Votes_Sum_Order_By = {
  score?: Maybe<Order_By>;
};

/** update columns of table "news_item_votes" */
export enum News_Item_Votes_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  NEWSITEMID = 'newsItemId',
  /** column name */
  SCORE = 'score',
  /** column name */
  UPDATEDAT = 'updatedAt',
  /** column name */
  USERID = 'userId'
}

/** aggregate var_pop on columns */
export type News_Item_Votes_Var_Pop_Fields = {
  __typename?: 'news_item_votes_var_pop_fields';
  score?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "news_item_votes" */
export type News_Item_Votes_Var_Pop_Order_By = {
  score?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type News_Item_Votes_Var_Samp_Fields = {
  __typename?: 'news_item_votes_var_samp_fields';
  score?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "news_item_votes" */
export type News_Item_Votes_Var_Samp_Order_By = {
  score?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type News_Item_Votes_Variance_Fields = {
  __typename?: 'news_item_votes_variance_fields';
  score?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "news_item_votes" */
export type News_Item_Votes_Variance_Order_By = {
  score?: Maybe<Order_By>;
};

/** columns and relationships of "news_items" */
export type News_Items = {
  __typename?: 'news_items';
  createdAt: Scalars['timestamptz'];
  /** An object relationship */
  externalProduct?: Maybe<External_Products>;
  externalProductId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isDeleted?: Maybe<Scalars['Boolean']>;
  isSuspended?: Maybe<Scalars['Boolean']>;
  number: Scalars['Int'];
  /** An object relationship */
  product?: Maybe<Products>;
  productId?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  sourceSite?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
  /** An array relationship */
  votes: Array<News_Item_Votes>;
  /** An aggregate relationship */
  votes_aggregate: News_Item_Votes_Aggregate;
};


/** columns and relationships of "news_items" */
export type News_ItemsVotesArgs = {
  distinct_on?: Maybe<Array<News_Item_Votes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<News_Item_Votes_Order_By>>;
  where?: Maybe<News_Item_Votes_Bool_Exp>;
};


/** columns and relationships of "news_items" */
export type News_ItemsVotes_AggregateArgs = {
  distinct_on?: Maybe<Array<News_Item_Votes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<News_Item_Votes_Order_By>>;
  where?: Maybe<News_Item_Votes_Bool_Exp>;
};

/** aggregated selection of "news_items" */
export type News_Items_Aggregate = {
  __typename?: 'news_items_aggregate';
  aggregate?: Maybe<News_Items_Aggregate_Fields>;
  nodes: Array<News_Items>;
};

/** aggregate fields of "news_items" */
export type News_Items_Aggregate_Fields = {
  __typename?: 'news_items_aggregate_fields';
  avg?: Maybe<News_Items_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<News_Items_Max_Fields>;
  min?: Maybe<News_Items_Min_Fields>;
  stddev?: Maybe<News_Items_Stddev_Fields>;
  stddev_pop?: Maybe<News_Items_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<News_Items_Stddev_Samp_Fields>;
  sum?: Maybe<News_Items_Sum_Fields>;
  var_pop?: Maybe<News_Items_Var_Pop_Fields>;
  var_samp?: Maybe<News_Items_Var_Samp_Fields>;
  variance?: Maybe<News_Items_Variance_Fields>;
};


/** aggregate fields of "news_items" */
export type News_Items_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<News_Items_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type News_Items_Avg_Fields = {
  __typename?: 'news_items_avg_fields';
  number?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "news_items". All fields are combined with a logical 'AND'. */
export type News_Items_Bool_Exp = {
  _and?: Maybe<Array<News_Items_Bool_Exp>>;
  _not?: Maybe<News_Items_Bool_Exp>;
  _or?: Maybe<Array<News_Items_Bool_Exp>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  externalProduct?: Maybe<External_Products_Bool_Exp>;
  externalProductId?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  isDeleted?: Maybe<Boolean_Comparison_Exp>;
  isSuspended?: Maybe<Boolean_Comparison_Exp>;
  number?: Maybe<Int_Comparison_Exp>;
  product?: Maybe<Products_Bool_Exp>;
  productId?: Maybe<String_Comparison_Exp>;
  score?: Maybe<Int_Comparison_Exp>;
  sourceSite?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  votes?: Maybe<News_Item_Votes_Bool_Exp>;
};

/** unique or primary key constraints on table "news_items" */
export enum News_Items_Constraint {
  /** unique or primary key constraint */
  NEWS_ITEMS_PKEY = 'news_items_pkey'
}

/** input type for incrementing numeric columns in table "news_items" */
export type News_Items_Inc_Input = {
  number?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "news_items" */
export type News_Items_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  externalProduct?: Maybe<External_Products_Obj_Rel_Insert_Input>;
  externalProductId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  isSuspended?: Maybe<Scalars['Boolean']>;
  number?: Maybe<Scalars['Int']>;
  product?: Maybe<Products_Obj_Rel_Insert_Input>;
  productId?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  sourceSite?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  votes?: Maybe<News_Item_Votes_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type News_Items_Max_Fields = {
  __typename?: 'news_items_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  externalProductId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  sourceSite?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type News_Items_Min_Fields = {
  __typename?: 'news_items_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  externalProductId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  sourceSite?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "news_items" */
export type News_Items_Mutation_Response = {
  __typename?: 'news_items_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<News_Items>;
};

/** input type for inserting object relation for remote table "news_items" */
export type News_Items_Obj_Rel_Insert_Input = {
  data: News_Items_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<News_Items_On_Conflict>;
};

/** on conflict condition type for table "news_items" */
export type News_Items_On_Conflict = {
  constraint: News_Items_Constraint;
  update_columns?: Array<News_Items_Update_Column>;
  where?: Maybe<News_Items_Bool_Exp>;
};

/** Ordering options when selecting data from "news_items". */
export type News_Items_Order_By = {
  createdAt?: Maybe<Order_By>;
  externalProduct?: Maybe<External_Products_Order_By>;
  externalProductId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  isDeleted?: Maybe<Order_By>;
  isSuspended?: Maybe<Order_By>;
  number?: Maybe<Order_By>;
  product?: Maybe<Products_Order_By>;
  productId?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
  sourceSite?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  votes_aggregate?: Maybe<News_Item_Votes_Aggregate_Order_By>;
};

/** primary key columns input for table: news_items */
export type News_Items_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "news_items" */
export enum News_Items_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  EXTERNALPRODUCTID = 'externalProductId',
  /** column name */
  ID = 'id',
  /** column name */
  ISDELETED = 'isDeleted',
  /** column name */
  ISSUSPENDED = 'isSuspended',
  /** column name */
  NUMBER = 'number',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  SCORE = 'score',
  /** column name */
  SOURCESITE = 'sourceSite',
  /** column name */
  UPDATEDAT = 'updatedAt'
}

/** input type for updating data in table "news_items" */
export type News_Items_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  externalProductId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  isSuspended?: Maybe<Scalars['Boolean']>;
  number?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  sourceSite?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type News_Items_Stddev_Fields = {
  __typename?: 'news_items_stddev_fields';
  number?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type News_Items_Stddev_Pop_Fields = {
  __typename?: 'news_items_stddev_pop_fields';
  number?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type News_Items_Stddev_Samp_Fields = {
  __typename?: 'news_items_stddev_samp_fields';
  number?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type News_Items_Sum_Fields = {
  __typename?: 'news_items_sum_fields';
  number?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Int']>;
};

/** update columns of table "news_items" */
export enum News_Items_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  EXTERNALPRODUCTID = 'externalProductId',
  /** column name */
  ID = 'id',
  /** column name */
  ISDELETED = 'isDeleted',
  /** column name */
  ISSUSPENDED = 'isSuspended',
  /** column name */
  NUMBER = 'number',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  SCORE = 'score',
  /** column name */
  SOURCESITE = 'sourceSite',
  /** column name */
  UPDATEDAT = 'updatedAt'
}

/** aggregate var_pop on columns */
export type News_Items_Var_Pop_Fields = {
  __typename?: 'news_items_var_pop_fields';
  number?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type News_Items_Var_Samp_Fields = {
  __typename?: 'news_items_var_samp_fields';
  number?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type News_Items_Variance_Fields = {
  __typename?: 'news_items_variance_fields';
  number?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};


/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: Maybe<Scalars['numeric']>;
  _gt?: Maybe<Scalars['numeric']>;
  _gte?: Maybe<Scalars['numeric']>;
  _in?: Maybe<Array<Scalars['numeric']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['numeric']>;
  _lte?: Maybe<Scalars['numeric']>;
  _neq?: Maybe<Scalars['numeric']>;
  _nin?: Maybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum OrderBy {
  /** in the ascending order, nulls last */
  ASC = 'asc',
  /** in the descending order, nulls first */
  DESC = 'desc'
}

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  ASC = 'asc',
  /** in ascending order, nulls first */
  ASC_NULLS_FIRST = 'asc_nulls_first',
  /** in ascending order, nulls last */
  ASC_NULLS_LAST = 'asc_nulls_last',
  /** in descending order, nulls first */
  DESC = 'desc',
  /** in descending order, nulls first */
  DESC_NULLS_FIRST = 'desc_nulls_first',
  /** in descending order, nulls last */
  DESC_NULLS_LAST = 'desc_nulls_last'
}

/** columns and relationships of "order_snapshots" */
export type Order_Snapshots = {
  __typename?: 'order_snapshots';
  /** An object relationship */
  adminApprover?: Maybe<Users>;
  adminApproverId?: Maybe<Scalars['String']>;
  approvalTimeHrs?: Maybe<Scalars['numeric']>;
  createdAt: Scalars['timestamp'];
  disposalTimeHrs?: Maybe<Scalars['numeric']>;
  /** An object relationship */
  form10File?: Maybe<Product_Files>;
  form10FileId?: Maybe<Scalars['String']>;
  /** An object relationship */
  form10Image?: Maybe<Image_Parents>;
  form10ImageId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  orderId: Scalars['String'];
  orderStatus: Scalars['String'];
  /** An object relationship */
  refund?: Maybe<Refunds>;
  refundId?: Maybe<Scalars['String']>;
  /** An object relationship */
  transaction?: Maybe<Transactions>;
  transactionId?: Maybe<Scalars['String']>;
};

/** aggregated selection of "order_snapshots" */
export type Order_Snapshots_Aggregate = {
  __typename?: 'order_snapshots_aggregate';
  aggregate?: Maybe<Order_Snapshots_Aggregate_Fields>;
  nodes: Array<Order_Snapshots>;
};

/** aggregate fields of "order_snapshots" */
export type Order_Snapshots_Aggregate_Fields = {
  __typename?: 'order_snapshots_aggregate_fields';
  avg?: Maybe<Order_Snapshots_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Order_Snapshots_Max_Fields>;
  min?: Maybe<Order_Snapshots_Min_Fields>;
  stddev?: Maybe<Order_Snapshots_Stddev_Fields>;
  stddev_pop?: Maybe<Order_Snapshots_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Order_Snapshots_Stddev_Samp_Fields>;
  sum?: Maybe<Order_Snapshots_Sum_Fields>;
  var_pop?: Maybe<Order_Snapshots_Var_Pop_Fields>;
  var_samp?: Maybe<Order_Snapshots_Var_Samp_Fields>;
  variance?: Maybe<Order_Snapshots_Variance_Fields>;
};


/** aggregate fields of "order_snapshots" */
export type Order_Snapshots_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Order_Snapshots_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "order_snapshots" */
export type Order_Snapshots_Aggregate_Order_By = {
  avg?: Maybe<Order_Snapshots_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Order_Snapshots_Max_Order_By>;
  min?: Maybe<Order_Snapshots_Min_Order_By>;
  stddev?: Maybe<Order_Snapshots_Stddev_Order_By>;
  stddev_pop?: Maybe<Order_Snapshots_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Order_Snapshots_Stddev_Samp_Order_By>;
  sum?: Maybe<Order_Snapshots_Sum_Order_By>;
  var_pop?: Maybe<Order_Snapshots_Var_Pop_Order_By>;
  var_samp?: Maybe<Order_Snapshots_Var_Samp_Order_By>;
  variance?: Maybe<Order_Snapshots_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "order_snapshots" */
export type Order_Snapshots_Arr_Rel_Insert_Input = {
  data: Array<Order_Snapshots_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Order_Snapshots_On_Conflict>;
};

/** aggregate avg on columns */
export type Order_Snapshots_Avg_Fields = {
  __typename?: 'order_snapshots_avg_fields';
  approvalTimeHrs?: Maybe<Scalars['Float']>;
  disposalTimeHrs?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "order_snapshots" */
export type Order_Snapshots_Avg_Order_By = {
  approvalTimeHrs?: Maybe<Order_By>;
  disposalTimeHrs?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "order_snapshots". All fields are combined with a logical 'AND'. */
export type Order_Snapshots_Bool_Exp = {
  _and?: Maybe<Array<Order_Snapshots_Bool_Exp>>;
  _not?: Maybe<Order_Snapshots_Bool_Exp>;
  _or?: Maybe<Array<Order_Snapshots_Bool_Exp>>;
  adminApprover?: Maybe<Users_Bool_Exp>;
  adminApproverId?: Maybe<String_Comparison_Exp>;
  approvalTimeHrs?: Maybe<Numeric_Comparison_Exp>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  disposalTimeHrs?: Maybe<Numeric_Comparison_Exp>;
  form10File?: Maybe<Product_Files_Bool_Exp>;
  form10FileId?: Maybe<String_Comparison_Exp>;
  form10Image?: Maybe<Image_Parents_Bool_Exp>;
  form10ImageId?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  orderId?: Maybe<String_Comparison_Exp>;
  orderStatus?: Maybe<String_Comparison_Exp>;
  refund?: Maybe<Refunds_Bool_Exp>;
  refundId?: Maybe<String_Comparison_Exp>;
  transaction?: Maybe<Transactions_Bool_Exp>;
  transactionId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "order_snapshots" */
export enum Order_Snapshots_Constraint {
  /** unique or primary key constraint */
  ORDER_SNAPSHOTS_PKEY = 'order_snapshots_pkey'
}

/** input type for incrementing numeric columns in table "order_snapshots" */
export type Order_Snapshots_Inc_Input = {
  approvalTimeHrs?: Maybe<Scalars['numeric']>;
  disposalTimeHrs?: Maybe<Scalars['numeric']>;
};

/** input type for inserting data into table "order_snapshots" */
export type Order_Snapshots_Insert_Input = {
  adminApprover?: Maybe<Users_Obj_Rel_Insert_Input>;
  adminApproverId?: Maybe<Scalars['String']>;
  approvalTimeHrs?: Maybe<Scalars['numeric']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  disposalTimeHrs?: Maybe<Scalars['numeric']>;
  form10File?: Maybe<Product_Files_Obj_Rel_Insert_Input>;
  form10FileId?: Maybe<Scalars['String']>;
  form10Image?: Maybe<Image_Parents_Obj_Rel_Insert_Input>;
  form10ImageId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  orderStatus?: Maybe<Scalars['String']>;
  refund?: Maybe<Refunds_Obj_Rel_Insert_Input>;
  refundId?: Maybe<Scalars['String']>;
  transaction?: Maybe<Transactions_Obj_Rel_Insert_Input>;
  transactionId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Order_Snapshots_Max_Fields = {
  __typename?: 'order_snapshots_max_fields';
  adminApproverId?: Maybe<Scalars['String']>;
  approvalTimeHrs?: Maybe<Scalars['numeric']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  disposalTimeHrs?: Maybe<Scalars['numeric']>;
  form10FileId?: Maybe<Scalars['String']>;
  form10ImageId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  orderStatus?: Maybe<Scalars['String']>;
  refundId?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "order_snapshots" */
export type Order_Snapshots_Max_Order_By = {
  adminApproverId?: Maybe<Order_By>;
  approvalTimeHrs?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  disposalTimeHrs?: Maybe<Order_By>;
  form10FileId?: Maybe<Order_By>;
  form10ImageId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  orderId?: Maybe<Order_By>;
  orderStatus?: Maybe<Order_By>;
  refundId?: Maybe<Order_By>;
  transactionId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Order_Snapshots_Min_Fields = {
  __typename?: 'order_snapshots_min_fields';
  adminApproverId?: Maybe<Scalars['String']>;
  approvalTimeHrs?: Maybe<Scalars['numeric']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  disposalTimeHrs?: Maybe<Scalars['numeric']>;
  form10FileId?: Maybe<Scalars['String']>;
  form10ImageId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  orderStatus?: Maybe<Scalars['String']>;
  refundId?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "order_snapshots" */
export type Order_Snapshots_Min_Order_By = {
  adminApproverId?: Maybe<Order_By>;
  approvalTimeHrs?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  disposalTimeHrs?: Maybe<Order_By>;
  form10FileId?: Maybe<Order_By>;
  form10ImageId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  orderId?: Maybe<Order_By>;
  orderStatus?: Maybe<Order_By>;
  refundId?: Maybe<Order_By>;
  transactionId?: Maybe<Order_By>;
};

/** response of any mutation on the table "order_snapshots" */
export type Order_Snapshots_Mutation_Response = {
  __typename?: 'order_snapshots_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Order_Snapshots>;
};

/** input type for inserting object relation for remote table "order_snapshots" */
export type Order_Snapshots_Obj_Rel_Insert_Input = {
  data: Order_Snapshots_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Order_Snapshots_On_Conflict>;
};

/** on conflict condition type for table "order_snapshots" */
export type Order_Snapshots_On_Conflict = {
  constraint: Order_Snapshots_Constraint;
  update_columns?: Array<Order_Snapshots_Update_Column>;
  where?: Maybe<Order_Snapshots_Bool_Exp>;
};

/** Ordering options when selecting data from "order_snapshots". */
export type Order_Snapshots_Order_By = {
  adminApprover?: Maybe<Users_Order_By>;
  adminApproverId?: Maybe<Order_By>;
  approvalTimeHrs?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  disposalTimeHrs?: Maybe<Order_By>;
  form10File?: Maybe<Product_Files_Order_By>;
  form10FileId?: Maybe<Order_By>;
  form10Image?: Maybe<Image_Parents_Order_By>;
  form10ImageId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  orderId?: Maybe<Order_By>;
  orderStatus?: Maybe<Order_By>;
  refund?: Maybe<Refunds_Order_By>;
  refundId?: Maybe<Order_By>;
  transaction?: Maybe<Transactions_Order_By>;
  transactionId?: Maybe<Order_By>;
};

/** primary key columns input for table: order_snapshots */
export type Order_Snapshots_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "order_snapshots" */
export enum Order_Snapshots_Select_Column {
  /** column name */
  ADMINAPPROVERID = 'adminApproverId',
  /** column name */
  APPROVALTIMEHRS = 'approvalTimeHrs',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  DISPOSALTIMEHRS = 'disposalTimeHrs',
  /** column name */
  FORM10FILEID = 'form10FileId',
  /** column name */
  FORM10IMAGEID = 'form10ImageId',
  /** column name */
  ID = 'id',
  /** column name */
  ORDERID = 'orderId',
  /** column name */
  ORDERSTATUS = 'orderStatus',
  /** column name */
  REFUNDID = 'refundId',
  /** column name */
  TRANSACTIONID = 'transactionId'
}

/** input type for updating data in table "order_snapshots" */
export type Order_Snapshots_Set_Input = {
  adminApproverId?: Maybe<Scalars['String']>;
  approvalTimeHrs?: Maybe<Scalars['numeric']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  disposalTimeHrs?: Maybe<Scalars['numeric']>;
  form10FileId?: Maybe<Scalars['String']>;
  form10ImageId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  orderStatus?: Maybe<Scalars['String']>;
  refundId?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Order_Snapshots_Stddev_Fields = {
  __typename?: 'order_snapshots_stddev_fields';
  approvalTimeHrs?: Maybe<Scalars['Float']>;
  disposalTimeHrs?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "order_snapshots" */
export type Order_Snapshots_Stddev_Order_By = {
  approvalTimeHrs?: Maybe<Order_By>;
  disposalTimeHrs?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Order_Snapshots_Stddev_Pop_Fields = {
  __typename?: 'order_snapshots_stddev_pop_fields';
  approvalTimeHrs?: Maybe<Scalars['Float']>;
  disposalTimeHrs?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "order_snapshots" */
export type Order_Snapshots_Stddev_Pop_Order_By = {
  approvalTimeHrs?: Maybe<Order_By>;
  disposalTimeHrs?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Order_Snapshots_Stddev_Samp_Fields = {
  __typename?: 'order_snapshots_stddev_samp_fields';
  approvalTimeHrs?: Maybe<Scalars['Float']>;
  disposalTimeHrs?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "order_snapshots" */
export type Order_Snapshots_Stddev_Samp_Order_By = {
  approvalTimeHrs?: Maybe<Order_By>;
  disposalTimeHrs?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Order_Snapshots_Sum_Fields = {
  __typename?: 'order_snapshots_sum_fields';
  approvalTimeHrs?: Maybe<Scalars['numeric']>;
  disposalTimeHrs?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "order_snapshots" */
export type Order_Snapshots_Sum_Order_By = {
  approvalTimeHrs?: Maybe<Order_By>;
  disposalTimeHrs?: Maybe<Order_By>;
};

/** update columns of table "order_snapshots" */
export enum Order_Snapshots_Update_Column {
  /** column name */
  ADMINAPPROVERID = 'adminApproverId',
  /** column name */
  APPROVALTIMEHRS = 'approvalTimeHrs',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  DISPOSALTIMEHRS = 'disposalTimeHrs',
  /** column name */
  FORM10FILEID = 'form10FileId',
  /** column name */
  FORM10IMAGEID = 'form10ImageId',
  /** column name */
  ID = 'id',
  /** column name */
  ORDERID = 'orderId',
  /** column name */
  ORDERSTATUS = 'orderStatus',
  /** column name */
  REFUNDID = 'refundId',
  /** column name */
  TRANSACTIONID = 'transactionId'
}

/** aggregate var_pop on columns */
export type Order_Snapshots_Var_Pop_Fields = {
  __typename?: 'order_snapshots_var_pop_fields';
  approvalTimeHrs?: Maybe<Scalars['Float']>;
  disposalTimeHrs?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "order_snapshots" */
export type Order_Snapshots_Var_Pop_Order_By = {
  approvalTimeHrs?: Maybe<Order_By>;
  disposalTimeHrs?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Order_Snapshots_Var_Samp_Fields = {
  __typename?: 'order_snapshots_var_samp_fields';
  approvalTimeHrs?: Maybe<Scalars['Float']>;
  disposalTimeHrs?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "order_snapshots" */
export type Order_Snapshots_Var_Samp_Order_By = {
  approvalTimeHrs?: Maybe<Order_By>;
  disposalTimeHrs?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Order_Snapshots_Variance_Fields = {
  __typename?: 'order_snapshots_variance_fields';
  approvalTimeHrs?: Maybe<Scalars['Float']>;
  disposalTimeHrs?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "order_snapshots" */
export type Order_Snapshots_Variance_Order_By = {
  approvalTimeHrs?: Maybe<Order_By>;
  disposalTimeHrs?: Maybe<Order_By>;
};

/** columns and relationships of "orders" */
export type Orders = {
  __typename?: 'orders';
  /** An object relationship */
  bid?: Maybe<Bids>;
  bidId?: Maybe<Scalars['String']>;
  /** An object relationship */
  buyer?: Maybe<Users>;
  buyerId: Scalars['String'];
  /** An object relationship */
  buyerLicense?: Maybe<User_Licenses>;
  buyerLicenseId?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamp'];
  currency: Scalars['String'];
  /** An object relationship */
  currentSnapshot?: Maybe<Order_Snapshots>;
  currentSnapshotId: Scalars['String'];
  id: Scalars['String'];
  internationalFee?: Maybe<Scalars['Int']>;
  /** An array relationship */
  orderSnapshots: Array<Order_Snapshots>;
  /** An aggregate relationship */
  orderSnapshots_aggregate: Order_Snapshots_Aggregate;
  paymentIntentId?: Maybe<Scalars['String']>;
  /** An array relationship */
  payoutItems: Array<Payout_Items>;
  /** An aggregate relationship */
  payoutItems_aggregate: Payout_Items_Aggregate;
  /** An object relationship */
  product: Products;
  productId: Scalars['String'];
  productSnapshotId: Scalars['String'];
  reminderCount?: Maybe<Scalars['Int']>;
  /** An object relationship */
  sellerStore?: Maybe<Stores>;
  sellerStoreId: Scalars['String'];
  total: Scalars['Int'];
  updatedAt: Scalars['timestamp'];
  variantId: Scalars['String'];
  variantSnapshotId: Scalars['String'];
};


/** columns and relationships of "orders" */
export type OrdersOrderSnapshotsArgs = {
  distinct_on?: Maybe<Array<Order_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Order_Snapshots_Order_By>>;
  where?: Maybe<Order_Snapshots_Bool_Exp>;
};


/** columns and relationships of "orders" */
export type OrdersOrderSnapshots_AggregateArgs = {
  distinct_on?: Maybe<Array<Order_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Order_Snapshots_Order_By>>;
  where?: Maybe<Order_Snapshots_Bool_Exp>;
};


/** columns and relationships of "orders" */
export type OrdersPayoutItemsArgs = {
  distinct_on?: Maybe<Array<Payout_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payout_Items_Order_By>>;
  where?: Maybe<Payout_Items_Bool_Exp>;
};


/** columns and relationships of "orders" */
export type OrdersPayoutItems_AggregateArgs = {
  distinct_on?: Maybe<Array<Payout_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payout_Items_Order_By>>;
  where?: Maybe<Payout_Items_Bool_Exp>;
};

/** aggregated selection of "orders" */
export type Orders_Aggregate = {
  __typename?: 'orders_aggregate';
  aggregate?: Maybe<Orders_Aggregate_Fields>;
  nodes: Array<Orders>;
};

/** aggregate fields of "orders" */
export type Orders_Aggregate_Fields = {
  __typename?: 'orders_aggregate_fields';
  avg?: Maybe<Orders_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Orders_Max_Fields>;
  min?: Maybe<Orders_Min_Fields>;
  stddev?: Maybe<Orders_Stddev_Fields>;
  stddev_pop?: Maybe<Orders_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Orders_Stddev_Samp_Fields>;
  sum?: Maybe<Orders_Sum_Fields>;
  var_pop?: Maybe<Orders_Var_Pop_Fields>;
  var_samp?: Maybe<Orders_Var_Samp_Fields>;
  variance?: Maybe<Orders_Variance_Fields>;
};


/** aggregate fields of "orders" */
export type Orders_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Orders_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** columns and relationships of "orders_approved_grouped_by_day" */
export type Orders_Approved_Grouped_By_Day = {
  __typename?: 'orders_approved_grouped_by_day';
  day?: Maybe<Scalars['timestamp']>;
  order_ids?: Maybe<Scalars['_text']>;
};

/** aggregated selection of "orders_approved_grouped_by_day" */
export type Orders_Approved_Grouped_By_Day_Aggregate = {
  __typename?: 'orders_approved_grouped_by_day_aggregate';
  aggregate?: Maybe<Orders_Approved_Grouped_By_Day_Aggregate_Fields>;
  nodes: Array<Orders_Approved_Grouped_By_Day>;
};

/** aggregate fields of "orders_approved_grouped_by_day" */
export type Orders_Approved_Grouped_By_Day_Aggregate_Fields = {
  __typename?: 'orders_approved_grouped_by_day_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Orders_Approved_Grouped_By_Day_Max_Fields>;
  min?: Maybe<Orders_Approved_Grouped_By_Day_Min_Fields>;
};


/** aggregate fields of "orders_approved_grouped_by_day" */
export type Orders_Approved_Grouped_By_Day_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Orders_Approved_Grouped_By_Day_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/**
 * Boolean expression to filter rows from the table
 * "orders_approved_grouped_by_day". All fields are combined with a logical 'AND'.
 */
export type Orders_Approved_Grouped_By_Day_Bool_Exp = {
  _and?: Maybe<Array<Orders_Approved_Grouped_By_Day_Bool_Exp>>;
  _not?: Maybe<Orders_Approved_Grouped_By_Day_Bool_Exp>;
  _or?: Maybe<Array<Orders_Approved_Grouped_By_Day_Bool_Exp>>;
  day?: Maybe<Timestamp_Comparison_Exp>;
  order_ids?: Maybe<_Text_Comparison_Exp>;
};

/** aggregate max on columns */
export type Orders_Approved_Grouped_By_Day_Max_Fields = {
  __typename?: 'orders_approved_grouped_by_day_max_fields';
  day?: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type Orders_Approved_Grouped_By_Day_Min_Fields = {
  __typename?: 'orders_approved_grouped_by_day_min_fields';
  day?: Maybe<Scalars['timestamp']>;
};

/** Ordering options when selecting data from "orders_approved_grouped_by_day". */
export type Orders_Approved_Grouped_By_Day_Order_By = {
  day?: Maybe<Order_By>;
  order_ids?: Maybe<Order_By>;
};

/** select columns of table "orders_approved_grouped_by_day" */
export enum Orders_Approved_Grouped_By_Day_Select_Column {
  /** column name */
  DAY = 'day',
  /** column name */
  ORDER_IDS = 'order_ids'
}

/** aggregate avg on columns */
export type Orders_Avg_Fields = {
  __typename?: 'orders_avg_fields';
  internationalFee?: Maybe<Scalars['Float']>;
  reminderCount?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "orders". All fields are combined with a logical 'AND'. */
export type Orders_Bool_Exp = {
  _and?: Maybe<Array<Orders_Bool_Exp>>;
  _not?: Maybe<Orders_Bool_Exp>;
  _or?: Maybe<Array<Orders_Bool_Exp>>;
  bid?: Maybe<Bids_Bool_Exp>;
  bidId?: Maybe<String_Comparison_Exp>;
  buyer?: Maybe<Users_Bool_Exp>;
  buyerId?: Maybe<String_Comparison_Exp>;
  buyerLicense?: Maybe<User_Licenses_Bool_Exp>;
  buyerLicenseId?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  currency?: Maybe<String_Comparison_Exp>;
  currentSnapshot?: Maybe<Order_Snapshots_Bool_Exp>;
  currentSnapshotId?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  internationalFee?: Maybe<Int_Comparison_Exp>;
  orderSnapshots?: Maybe<Order_Snapshots_Bool_Exp>;
  paymentIntentId?: Maybe<String_Comparison_Exp>;
  payoutItems?: Maybe<Payout_Items_Bool_Exp>;
  product?: Maybe<Products_Bool_Exp>;
  productId?: Maybe<String_Comparison_Exp>;
  productSnapshotId?: Maybe<String_Comparison_Exp>;
  reminderCount?: Maybe<Int_Comparison_Exp>;
  sellerStore?: Maybe<Stores_Bool_Exp>;
  sellerStoreId?: Maybe<String_Comparison_Exp>;
  total?: Maybe<Int_Comparison_Exp>;
  updatedAt?: Maybe<Timestamp_Comparison_Exp>;
  variantId?: Maybe<String_Comparison_Exp>;
  variantSnapshotId?: Maybe<String_Comparison_Exp>;
};

/** columns and relationships of "orders_complete_grouped_by_day" */
export type Orders_Complete_Grouped_By_Day = {
  __typename?: 'orders_complete_grouped_by_day';
  day?: Maybe<Scalars['timestamp']>;
  order_ids?: Maybe<Scalars['_text']>;
};

/** aggregated selection of "orders_complete_grouped_by_day" */
export type Orders_Complete_Grouped_By_Day_Aggregate = {
  __typename?: 'orders_complete_grouped_by_day_aggregate';
  aggregate?: Maybe<Orders_Complete_Grouped_By_Day_Aggregate_Fields>;
  nodes: Array<Orders_Complete_Grouped_By_Day>;
};

/** aggregate fields of "orders_complete_grouped_by_day" */
export type Orders_Complete_Grouped_By_Day_Aggregate_Fields = {
  __typename?: 'orders_complete_grouped_by_day_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Orders_Complete_Grouped_By_Day_Max_Fields>;
  min?: Maybe<Orders_Complete_Grouped_By_Day_Min_Fields>;
};


/** aggregate fields of "orders_complete_grouped_by_day" */
export type Orders_Complete_Grouped_By_Day_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Orders_Complete_Grouped_By_Day_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/**
 * Boolean expression to filter rows from the table
 * "orders_complete_grouped_by_day". All fields are combined with a logical 'AND'.
 */
export type Orders_Complete_Grouped_By_Day_Bool_Exp = {
  _and?: Maybe<Array<Orders_Complete_Grouped_By_Day_Bool_Exp>>;
  _not?: Maybe<Orders_Complete_Grouped_By_Day_Bool_Exp>;
  _or?: Maybe<Array<Orders_Complete_Grouped_By_Day_Bool_Exp>>;
  day?: Maybe<Timestamp_Comparison_Exp>;
  order_ids?: Maybe<_Text_Comparison_Exp>;
};

/** aggregate max on columns */
export type Orders_Complete_Grouped_By_Day_Max_Fields = {
  __typename?: 'orders_complete_grouped_by_day_max_fields';
  day?: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type Orders_Complete_Grouped_By_Day_Min_Fields = {
  __typename?: 'orders_complete_grouped_by_day_min_fields';
  day?: Maybe<Scalars['timestamp']>;
};

/** Ordering options when selecting data from "orders_complete_grouped_by_day". */
export type Orders_Complete_Grouped_By_Day_Order_By = {
  day?: Maybe<Order_By>;
  order_ids?: Maybe<Order_By>;
};

/** select columns of table "orders_complete_grouped_by_day" */
export enum Orders_Complete_Grouped_By_Day_Select_Column {
  /** column name */
  DAY = 'day',
  /** column name */
  ORDER_IDS = 'order_ids'
}

/** unique or primary key constraints on table "orders" */
export enum Orders_Constraint {
  /** unique or primary key constraint */
  ORDERS_BID_ID_KEY = 'orders_bid_id_key',
  /** unique or primary key constraint */
  ORDERS_PKEY = 'orders_pkey'
}

/** input type for incrementing numeric columns in table "orders" */
export type Orders_Inc_Input = {
  internationalFee?: Maybe<Scalars['Int']>;
  reminderCount?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "orders" */
export type Orders_Insert_Input = {
  bid?: Maybe<Bids_Obj_Rel_Insert_Input>;
  bidId?: Maybe<Scalars['String']>;
  buyer?: Maybe<Users_Obj_Rel_Insert_Input>;
  buyerId?: Maybe<Scalars['String']>;
  buyerLicense?: Maybe<User_Licenses_Obj_Rel_Insert_Input>;
  buyerLicenseId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  currentSnapshot?: Maybe<Order_Snapshots_Obj_Rel_Insert_Input>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  internationalFee?: Maybe<Scalars['Int']>;
  orderSnapshots?: Maybe<Order_Snapshots_Arr_Rel_Insert_Input>;
  paymentIntentId?: Maybe<Scalars['String']>;
  payoutItems?: Maybe<Payout_Items_Arr_Rel_Insert_Input>;
  product?: Maybe<Products_Obj_Rel_Insert_Input>;
  productId?: Maybe<Scalars['String']>;
  productSnapshotId?: Maybe<Scalars['String']>;
  reminderCount?: Maybe<Scalars['Int']>;
  sellerStore?: Maybe<Stores_Obj_Rel_Insert_Input>;
  sellerStoreId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  variantId?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Orders_Max_Fields = {
  __typename?: 'orders_max_fields';
  bidId?: Maybe<Scalars['String']>;
  buyerId?: Maybe<Scalars['String']>;
  buyerLicenseId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  internationalFee?: Maybe<Scalars['Int']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productSnapshotId?: Maybe<Scalars['String']>;
  reminderCount?: Maybe<Scalars['Int']>;
  sellerStoreId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  variantId?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Orders_Min_Fields = {
  __typename?: 'orders_min_fields';
  bidId?: Maybe<Scalars['String']>;
  buyerId?: Maybe<Scalars['String']>;
  buyerLicenseId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  internationalFee?: Maybe<Scalars['Int']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productSnapshotId?: Maybe<Scalars['String']>;
  reminderCount?: Maybe<Scalars['Int']>;
  sellerStoreId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  variantId?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "orders" */
export type Orders_Mutation_Response = {
  __typename?: 'orders_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Orders>;
};

/** input type for inserting object relation for remote table "orders" */
export type Orders_Obj_Rel_Insert_Input = {
  data: Orders_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Orders_On_Conflict>;
};

/** on conflict condition type for table "orders" */
export type Orders_On_Conflict = {
  constraint: Orders_Constraint;
  update_columns?: Array<Orders_Update_Column>;
  where?: Maybe<Orders_Bool_Exp>;
};

/** Ordering options when selecting data from "orders". */
export type Orders_Order_By = {
  bid?: Maybe<Bids_Order_By>;
  bidId?: Maybe<Order_By>;
  buyer?: Maybe<Users_Order_By>;
  buyerId?: Maybe<Order_By>;
  buyerLicense?: Maybe<User_Licenses_Order_By>;
  buyerLicenseId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currency?: Maybe<Order_By>;
  currentSnapshot?: Maybe<Order_Snapshots_Order_By>;
  currentSnapshotId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  internationalFee?: Maybe<Order_By>;
  orderSnapshots_aggregate?: Maybe<Order_Snapshots_Aggregate_Order_By>;
  paymentIntentId?: Maybe<Order_By>;
  payoutItems_aggregate?: Maybe<Payout_Items_Aggregate_Order_By>;
  product?: Maybe<Products_Order_By>;
  productId?: Maybe<Order_By>;
  productSnapshotId?: Maybe<Order_By>;
  reminderCount?: Maybe<Order_By>;
  sellerStore?: Maybe<Stores_Order_By>;
  sellerStoreId?: Maybe<Order_By>;
  total?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  variantId?: Maybe<Order_By>;
  variantSnapshotId?: Maybe<Order_By>;
};

/** primary key columns input for table: orders */
export type Orders_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "orders" */
export enum Orders_Select_Column {
  /** column name */
  BIDID = 'bidId',
  /** column name */
  BUYERID = 'buyerId',
  /** column name */
  BUYERLICENSEID = 'buyerLicenseId',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CURRENCY = 'currency',
  /** column name */
  CURRENTSNAPSHOTID = 'currentSnapshotId',
  /** column name */
  ID = 'id',
  /** column name */
  INTERNATIONALFEE = 'internationalFee',
  /** column name */
  PAYMENTINTENTID = 'paymentIntentId',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  PRODUCTSNAPSHOTID = 'productSnapshotId',
  /** column name */
  REMINDERCOUNT = 'reminderCount',
  /** column name */
  SELLERSTOREID = 'sellerStoreId',
  /** column name */
  TOTAL = 'total',
  /** column name */
  UPDATEDAT = 'updatedAt',
  /** column name */
  VARIANTID = 'variantId',
  /** column name */
  VARIANTSNAPSHOTID = 'variantSnapshotId'
}

/** input type for updating data in table "orders" */
export type Orders_Set_Input = {
  bidId?: Maybe<Scalars['String']>;
  buyerId?: Maybe<Scalars['String']>;
  buyerLicenseId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  internationalFee?: Maybe<Scalars['Int']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productSnapshotId?: Maybe<Scalars['String']>;
  reminderCount?: Maybe<Scalars['Int']>;
  sellerStoreId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  variantId?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Orders_Stddev_Fields = {
  __typename?: 'orders_stddev_fields';
  internationalFee?: Maybe<Scalars['Float']>;
  reminderCount?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Orders_Stddev_Pop_Fields = {
  __typename?: 'orders_stddev_pop_fields';
  internationalFee?: Maybe<Scalars['Float']>;
  reminderCount?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Orders_Stddev_Samp_Fields = {
  __typename?: 'orders_stddev_samp_fields';
  internationalFee?: Maybe<Scalars['Float']>;
  reminderCount?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Orders_Sum_Fields = {
  __typename?: 'orders_sum_fields';
  internationalFee?: Maybe<Scalars['Int']>;
  reminderCount?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

/** update columns of table "orders" */
export enum Orders_Update_Column {
  /** column name */
  BIDID = 'bidId',
  /** column name */
  BUYERID = 'buyerId',
  /** column name */
  BUYERLICENSEID = 'buyerLicenseId',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CURRENCY = 'currency',
  /** column name */
  CURRENTSNAPSHOTID = 'currentSnapshotId',
  /** column name */
  ID = 'id',
  /** column name */
  INTERNATIONALFEE = 'internationalFee',
  /** column name */
  PAYMENTINTENTID = 'paymentIntentId',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  PRODUCTSNAPSHOTID = 'productSnapshotId',
  /** column name */
  REMINDERCOUNT = 'reminderCount',
  /** column name */
  SELLERSTOREID = 'sellerStoreId',
  /** column name */
  TOTAL = 'total',
  /** column name */
  UPDATEDAT = 'updatedAt',
  /** column name */
  VARIANTID = 'variantId',
  /** column name */
  VARIANTSNAPSHOTID = 'variantSnapshotId'
}

/** aggregate var_pop on columns */
export type Orders_Var_Pop_Fields = {
  __typename?: 'orders_var_pop_fields';
  internationalFee?: Maybe<Scalars['Float']>;
  reminderCount?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Orders_Var_Samp_Fields = {
  __typename?: 'orders_var_samp_fields';
  internationalFee?: Maybe<Scalars['Float']>;
  reminderCount?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Orders_Variance_Fields = {
  __typename?: 'orders_variance_fields';
  internationalFee?: Maybe<Scalars['Float']>;
  reminderCount?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "page_config_sections" */
export type Page_Config_Sections = {
  __typename?: 'page_config_sections';
  hideViewAll: Scalars['Boolean'];
  id: Scalars['String'];
  isNewestList?: Maybe<Scalars['Boolean']>;
  pageConfigId: Scalars['String'];
  position?: Maybe<Scalars['Int']>;
  /** An object relationship */
  promotedList?: Maybe<Promoted_Lists>;
  promotedListId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  viewAllPath: Scalars['String'];
};

/** aggregated selection of "page_config_sections" */
export type Page_Config_Sections_Aggregate = {
  __typename?: 'page_config_sections_aggregate';
  aggregate?: Maybe<Page_Config_Sections_Aggregate_Fields>;
  nodes: Array<Page_Config_Sections>;
};

/** aggregate fields of "page_config_sections" */
export type Page_Config_Sections_Aggregate_Fields = {
  __typename?: 'page_config_sections_aggregate_fields';
  avg?: Maybe<Page_Config_Sections_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Page_Config_Sections_Max_Fields>;
  min?: Maybe<Page_Config_Sections_Min_Fields>;
  stddev?: Maybe<Page_Config_Sections_Stddev_Fields>;
  stddev_pop?: Maybe<Page_Config_Sections_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Page_Config_Sections_Stddev_Samp_Fields>;
  sum?: Maybe<Page_Config_Sections_Sum_Fields>;
  var_pop?: Maybe<Page_Config_Sections_Var_Pop_Fields>;
  var_samp?: Maybe<Page_Config_Sections_Var_Samp_Fields>;
  variance?: Maybe<Page_Config_Sections_Variance_Fields>;
};


/** aggregate fields of "page_config_sections" */
export type Page_Config_Sections_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Page_Config_Sections_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "page_config_sections" */
export type Page_Config_Sections_Aggregate_Order_By = {
  avg?: Maybe<Page_Config_Sections_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Page_Config_Sections_Max_Order_By>;
  min?: Maybe<Page_Config_Sections_Min_Order_By>;
  stddev?: Maybe<Page_Config_Sections_Stddev_Order_By>;
  stddev_pop?: Maybe<Page_Config_Sections_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Page_Config_Sections_Stddev_Samp_Order_By>;
  sum?: Maybe<Page_Config_Sections_Sum_Order_By>;
  var_pop?: Maybe<Page_Config_Sections_Var_Pop_Order_By>;
  var_samp?: Maybe<Page_Config_Sections_Var_Samp_Order_By>;
  variance?: Maybe<Page_Config_Sections_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "page_config_sections" */
export type Page_Config_Sections_Arr_Rel_Insert_Input = {
  data: Array<Page_Config_Sections_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Page_Config_Sections_On_Conflict>;
};

/** aggregate avg on columns */
export type Page_Config_Sections_Avg_Fields = {
  __typename?: 'page_config_sections_avg_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "page_config_sections" */
export type Page_Config_Sections_Avg_Order_By = {
  position?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "page_config_sections". All fields are combined with a logical 'AND'. */
export type Page_Config_Sections_Bool_Exp = {
  _and?: Maybe<Array<Page_Config_Sections_Bool_Exp>>;
  _not?: Maybe<Page_Config_Sections_Bool_Exp>;
  _or?: Maybe<Array<Page_Config_Sections_Bool_Exp>>;
  hideViewAll?: Maybe<Boolean_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  isNewestList?: Maybe<Boolean_Comparison_Exp>;
  pageConfigId?: Maybe<String_Comparison_Exp>;
  position?: Maybe<Int_Comparison_Exp>;
  promotedList?: Maybe<Promoted_Lists_Bool_Exp>;
  promotedListId?: Maybe<String_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  viewAllPath?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "page_config_sections" */
export enum Page_Config_Sections_Constraint {
  /** unique or primary key constraint */
  PAGE_CONFIG_SECTIONS_PKEY = 'page_config_sections_pkey'
}

/** input type for incrementing numeric columns in table "page_config_sections" */
export type Page_Config_Sections_Inc_Input = {
  position?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "page_config_sections" */
export type Page_Config_Sections_Insert_Input = {
  hideViewAll?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  isNewestList?: Maybe<Scalars['Boolean']>;
  pageConfigId?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  promotedList?: Maybe<Promoted_Lists_Obj_Rel_Insert_Input>;
  promotedListId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  viewAllPath?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Page_Config_Sections_Max_Fields = {
  __typename?: 'page_config_sections_max_fields';
  id?: Maybe<Scalars['String']>;
  pageConfigId?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  promotedListId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  viewAllPath?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "page_config_sections" */
export type Page_Config_Sections_Max_Order_By = {
  id?: Maybe<Order_By>;
  pageConfigId?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  promotedListId?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  viewAllPath?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Page_Config_Sections_Min_Fields = {
  __typename?: 'page_config_sections_min_fields';
  id?: Maybe<Scalars['String']>;
  pageConfigId?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  promotedListId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  viewAllPath?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "page_config_sections" */
export type Page_Config_Sections_Min_Order_By = {
  id?: Maybe<Order_By>;
  pageConfigId?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  promotedListId?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  viewAllPath?: Maybe<Order_By>;
};

/** response of any mutation on the table "page_config_sections" */
export type Page_Config_Sections_Mutation_Response = {
  __typename?: 'page_config_sections_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Page_Config_Sections>;
};

/** on conflict condition type for table "page_config_sections" */
export type Page_Config_Sections_On_Conflict = {
  constraint: Page_Config_Sections_Constraint;
  update_columns?: Array<Page_Config_Sections_Update_Column>;
  where?: Maybe<Page_Config_Sections_Bool_Exp>;
};

/** Ordering options when selecting data from "page_config_sections". */
export type Page_Config_Sections_Order_By = {
  hideViewAll?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  isNewestList?: Maybe<Order_By>;
  pageConfigId?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  promotedList?: Maybe<Promoted_Lists_Order_By>;
  promotedListId?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  viewAllPath?: Maybe<Order_By>;
};

/** primary key columns input for table: page_config_sections */
export type Page_Config_Sections_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "page_config_sections" */
export enum Page_Config_Sections_Select_Column {
  /** column name */
  HIDEVIEWALL = 'hideViewAll',
  /** column name */
  ID = 'id',
  /** column name */
  ISNEWESTLIST = 'isNewestList',
  /** column name */
  PAGECONFIGID = 'pageConfigId',
  /** column name */
  POSITION = 'position',
  /** column name */
  PROMOTEDLISTID = 'promotedListId',
  /** column name */
  TITLE = 'title',
  /** column name */
  VIEWALLPATH = 'viewAllPath'
}

/** input type for updating data in table "page_config_sections" */
export type Page_Config_Sections_Set_Input = {
  hideViewAll?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  isNewestList?: Maybe<Scalars['Boolean']>;
  pageConfigId?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  promotedListId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  viewAllPath?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Page_Config_Sections_Stddev_Fields = {
  __typename?: 'page_config_sections_stddev_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "page_config_sections" */
export type Page_Config_Sections_Stddev_Order_By = {
  position?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Page_Config_Sections_Stddev_Pop_Fields = {
  __typename?: 'page_config_sections_stddev_pop_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "page_config_sections" */
export type Page_Config_Sections_Stddev_Pop_Order_By = {
  position?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Page_Config_Sections_Stddev_Samp_Fields = {
  __typename?: 'page_config_sections_stddev_samp_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "page_config_sections" */
export type Page_Config_Sections_Stddev_Samp_Order_By = {
  position?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Page_Config_Sections_Sum_Fields = {
  __typename?: 'page_config_sections_sum_fields';
  position?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "page_config_sections" */
export type Page_Config_Sections_Sum_Order_By = {
  position?: Maybe<Order_By>;
};

/** update columns of table "page_config_sections" */
export enum Page_Config_Sections_Update_Column {
  /** column name */
  HIDEVIEWALL = 'hideViewAll',
  /** column name */
  ID = 'id',
  /** column name */
  ISNEWESTLIST = 'isNewestList',
  /** column name */
  PAGECONFIGID = 'pageConfigId',
  /** column name */
  POSITION = 'position',
  /** column name */
  PROMOTEDLISTID = 'promotedListId',
  /** column name */
  TITLE = 'title',
  /** column name */
  VIEWALLPATH = 'viewAllPath'
}

/** aggregate var_pop on columns */
export type Page_Config_Sections_Var_Pop_Fields = {
  __typename?: 'page_config_sections_var_pop_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "page_config_sections" */
export type Page_Config_Sections_Var_Pop_Order_By = {
  position?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Page_Config_Sections_Var_Samp_Fields = {
  __typename?: 'page_config_sections_var_samp_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "page_config_sections" */
export type Page_Config_Sections_Var_Samp_Order_By = {
  position?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Page_Config_Sections_Variance_Fields = {
  __typename?: 'page_config_sections_variance_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "page_config_sections" */
export type Page_Config_Sections_Variance_Order_By = {
  position?: Maybe<Order_By>;
};

/** columns and relationships of "page_configs" */
export type Page_Configs = {
  __typename?: 'page_configs';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  /** An array relationship */
  pageConfigSections: Array<Page_Config_Sections>;
  /** An aggregate relationship */
  pageConfigSections_aggregate: Page_Config_Sections_Aggregate;
  urlPath?: Maybe<Scalars['String']>;
};


/** columns and relationships of "page_configs" */
export type Page_ConfigsPageConfigSectionsArgs = {
  distinct_on?: Maybe<Array<Page_Config_Sections_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Config_Sections_Order_By>>;
  where?: Maybe<Page_Config_Sections_Bool_Exp>;
};


/** columns and relationships of "page_configs" */
export type Page_ConfigsPageConfigSections_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Config_Sections_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Config_Sections_Order_By>>;
  where?: Maybe<Page_Config_Sections_Bool_Exp>;
};

/** aggregated selection of "page_configs" */
export type Page_Configs_Aggregate = {
  __typename?: 'page_configs_aggregate';
  aggregate?: Maybe<Page_Configs_Aggregate_Fields>;
  nodes: Array<Page_Configs>;
};

/** aggregate fields of "page_configs" */
export type Page_Configs_Aggregate_Fields = {
  __typename?: 'page_configs_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Page_Configs_Max_Fields>;
  min?: Maybe<Page_Configs_Min_Fields>;
};


/** aggregate fields of "page_configs" */
export type Page_Configs_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Page_Configs_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "page_configs". All fields are combined with a logical 'AND'. */
export type Page_Configs_Bool_Exp = {
  _and?: Maybe<Array<Page_Configs_Bool_Exp>>;
  _not?: Maybe<Page_Configs_Bool_Exp>;
  _or?: Maybe<Array<Page_Configs_Bool_Exp>>;
  id?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  pageConfigSections?: Maybe<Page_Config_Sections_Bool_Exp>;
  urlPath?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "page_configs" */
export enum Page_Configs_Constraint {
  /** unique or primary key constraint */
  PAGE_CONFIGS_PATH_KEY = 'page_configs_path_key',
  /** unique or primary key constraint */
  PAGE_CONFIGS_PKEY = 'page_configs_pkey'
}

/** input type for inserting data into table "page_configs" */
export type Page_Configs_Insert_Input = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  pageConfigSections?: Maybe<Page_Config_Sections_Arr_Rel_Insert_Input>;
  urlPath?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Page_Configs_Max_Fields = {
  __typename?: 'page_configs_max_fields';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  urlPath?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Page_Configs_Min_Fields = {
  __typename?: 'page_configs_min_fields';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  urlPath?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "page_configs" */
export type Page_Configs_Mutation_Response = {
  __typename?: 'page_configs_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Page_Configs>;
};

/** on conflict condition type for table "page_configs" */
export type Page_Configs_On_Conflict = {
  constraint: Page_Configs_Constraint;
  update_columns?: Array<Page_Configs_Update_Column>;
  where?: Maybe<Page_Configs_Bool_Exp>;
};

/** Ordering options when selecting data from "page_configs". */
export type Page_Configs_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  pageConfigSections_aggregate?: Maybe<Page_Config_Sections_Aggregate_Order_By>;
  urlPath?: Maybe<Order_By>;
};

/** primary key columns input for table: page_configs */
export type Page_Configs_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "page_configs" */
export enum Page_Configs_Select_Column {
  /** column name */
  ID = 'id',
  /** column name */
  NAME = 'name',
  /** column name */
  URLPATH = 'urlPath'
}

/** input type for updating data in table "page_configs" */
export type Page_Configs_Set_Input = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  urlPath?: Maybe<Scalars['String']>;
};

/** update columns of table "page_configs" */
export enum Page_Configs_Update_Column {
  /** column name */
  ID = 'id',
  /** column name */
  NAME = 'name',
  /** column name */
  URLPATH = 'urlPath'
}

/** columns and relationships of "payment_methods" */
export type Payment_Methods = {
  __typename?: 'payment_methods';
  createdAt: Scalars['timestamptz'];
  customerId?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  expMonth?: Maybe<Scalars['Int']>;
  expYear?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  last4?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  paymentMethodTypes?: Maybe<Scalars['String']>;
  paymentProcessor?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId: Scalars['String'];
};

/** aggregated selection of "payment_methods" */
export type Payment_Methods_Aggregate = {
  __typename?: 'payment_methods_aggregate';
  aggregate?: Maybe<Payment_Methods_Aggregate_Fields>;
  nodes: Array<Payment_Methods>;
};

/** aggregate fields of "payment_methods" */
export type Payment_Methods_Aggregate_Fields = {
  __typename?: 'payment_methods_aggregate_fields';
  avg?: Maybe<Payment_Methods_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Payment_Methods_Max_Fields>;
  min?: Maybe<Payment_Methods_Min_Fields>;
  stddev?: Maybe<Payment_Methods_Stddev_Fields>;
  stddev_pop?: Maybe<Payment_Methods_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Payment_Methods_Stddev_Samp_Fields>;
  sum?: Maybe<Payment_Methods_Sum_Fields>;
  var_pop?: Maybe<Payment_Methods_Var_Pop_Fields>;
  var_samp?: Maybe<Payment_Methods_Var_Samp_Fields>;
  variance?: Maybe<Payment_Methods_Variance_Fields>;
};


/** aggregate fields of "payment_methods" */
export type Payment_Methods_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Payment_Methods_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Payment_Methods_Avg_Fields = {
  __typename?: 'payment_methods_avg_fields';
  expMonth?: Maybe<Scalars['Float']>;
  expYear?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "payment_methods". All fields are combined with a logical 'AND'. */
export type Payment_Methods_Bool_Exp = {
  _and?: Maybe<Array<Payment_Methods_Bool_Exp>>;
  _not?: Maybe<Payment_Methods_Bool_Exp>;
  _or?: Maybe<Array<Payment_Methods_Bool_Exp>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  customerId?: Maybe<String_Comparison_Exp>;
  details?: Maybe<String_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  expMonth?: Maybe<Int_Comparison_Exp>;
  expYear?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  last4?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  paymentMethodTypes?: Maybe<String_Comparison_Exp>;
  paymentProcessor?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  userId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "payment_methods" */
export enum Payment_Methods_Constraint {
  /** unique or primary key constraint */
  PAYMENT_METHODS_PKEY = 'payment_methods_pkey'
}

/** input type for incrementing numeric columns in table "payment_methods" */
export type Payment_Methods_Inc_Input = {
  expMonth?: Maybe<Scalars['Int']>;
  expYear?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "payment_methods" */
export type Payment_Methods_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  customerId?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  expMonth?: Maybe<Scalars['Int']>;
  expYear?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  last4?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  paymentMethodTypes?: Maybe<Scalars['String']>;
  paymentProcessor?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Payment_Methods_Max_Fields = {
  __typename?: 'payment_methods_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  customerId?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  expMonth?: Maybe<Scalars['Int']>;
  expYear?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  last4?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  paymentMethodTypes?: Maybe<Scalars['String']>;
  paymentProcessor?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Payment_Methods_Min_Fields = {
  __typename?: 'payment_methods_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  customerId?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  expMonth?: Maybe<Scalars['Int']>;
  expYear?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  last4?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  paymentMethodTypes?: Maybe<Scalars['String']>;
  paymentProcessor?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "payment_methods" */
export type Payment_Methods_Mutation_Response = {
  __typename?: 'payment_methods_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Payment_Methods>;
};

/** input type for inserting object relation for remote table "payment_methods" */
export type Payment_Methods_Obj_Rel_Insert_Input = {
  data: Payment_Methods_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Payment_Methods_On_Conflict>;
};

/** on conflict condition type for table "payment_methods" */
export type Payment_Methods_On_Conflict = {
  constraint: Payment_Methods_Constraint;
  update_columns?: Array<Payment_Methods_Update_Column>;
  where?: Maybe<Payment_Methods_Bool_Exp>;
};

/** Ordering options when selecting data from "payment_methods". */
export type Payment_Methods_Order_By = {
  createdAt?: Maybe<Order_By>;
  customerId?: Maybe<Order_By>;
  details?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  expMonth?: Maybe<Order_By>;
  expYear?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last4?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  paymentMethodTypes?: Maybe<Order_By>;
  paymentProcessor?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: payment_methods */
export type Payment_Methods_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "payment_methods" */
export enum Payment_Methods_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CUSTOMERID = 'customerId',
  /** column name */
  DETAILS = 'details',
  /** column name */
  EMAIL = 'email',
  /** column name */
  EXPMONTH = 'expMonth',
  /** column name */
  EXPYEAR = 'expYear',
  /** column name */
  ID = 'id',
  /** column name */
  LAST4 = 'last4',
  /** column name */
  NAME = 'name',
  /** column name */
  PAYMENTMETHODTYPES = 'paymentMethodTypes',
  /** column name */
  PAYMENTPROCESSOR = 'paymentProcessor',
  /** column name */
  UPDATEDAT = 'updatedAt',
  /** column name */
  USERID = 'userId'
}

/** input type for updating data in table "payment_methods" */
export type Payment_Methods_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  customerId?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  expMonth?: Maybe<Scalars['Int']>;
  expYear?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  last4?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  paymentMethodTypes?: Maybe<Scalars['String']>;
  paymentProcessor?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Payment_Methods_Stddev_Fields = {
  __typename?: 'payment_methods_stddev_fields';
  expMonth?: Maybe<Scalars['Float']>;
  expYear?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Payment_Methods_Stddev_Pop_Fields = {
  __typename?: 'payment_methods_stddev_pop_fields';
  expMonth?: Maybe<Scalars['Float']>;
  expYear?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Payment_Methods_Stddev_Samp_Fields = {
  __typename?: 'payment_methods_stddev_samp_fields';
  expMonth?: Maybe<Scalars['Float']>;
  expYear?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Payment_Methods_Sum_Fields = {
  __typename?: 'payment_methods_sum_fields';
  expMonth?: Maybe<Scalars['Int']>;
  expYear?: Maybe<Scalars['Int']>;
};

/** update columns of table "payment_methods" */
export enum Payment_Methods_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CUSTOMERID = 'customerId',
  /** column name */
  DETAILS = 'details',
  /** column name */
  EMAIL = 'email',
  /** column name */
  EXPMONTH = 'expMonth',
  /** column name */
  EXPYEAR = 'expYear',
  /** column name */
  ID = 'id',
  /** column name */
  LAST4 = 'last4',
  /** column name */
  NAME = 'name',
  /** column name */
  PAYMENTMETHODTYPES = 'paymentMethodTypes',
  /** column name */
  PAYMENTPROCESSOR = 'paymentProcessor',
  /** column name */
  UPDATEDAT = 'updatedAt',
  /** column name */
  USERID = 'userId'
}

/** aggregate var_pop on columns */
export type Payment_Methods_Var_Pop_Fields = {
  __typename?: 'payment_methods_var_pop_fields';
  expMonth?: Maybe<Scalars['Float']>;
  expYear?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Payment_Methods_Var_Samp_Fields = {
  __typename?: 'payment_methods_var_samp_fields';
  expMonth?: Maybe<Scalars['Float']>;
  expYear?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Payment_Methods_Variance_Fields = {
  __typename?: 'payment_methods_variance_fields';
  expMonth?: Maybe<Scalars['Float']>;
  expYear?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "payout_items" */
export type Payout_Items = {
  __typename?: 'payout_items';
  amount: Scalars['Int'];
  createdAt: Scalars['timestamp'];
  currency: Scalars['String'];
  id: Scalars['String'];
  internationalFee?: Maybe<Scalars['Int']>;
  /** An object relationship */
  order?: Maybe<Orders>;
  orderId: Scalars['String'];
  paidAt?: Maybe<Scalars['timestamptz']>;
  payeeType: Scalars['String'];
  paymentProcessingFee: Scalars['Int'];
  payoutId?: Maybe<Scalars['String']>;
  payoutStatus: Scalars['String'];
  storeId: Scalars['String'];
  taxes: Scalars['Int'];
  txnId: Scalars['String'];
};

/** aggregated selection of "payout_items" */
export type Payout_Items_Aggregate = {
  __typename?: 'payout_items_aggregate';
  aggregate?: Maybe<Payout_Items_Aggregate_Fields>;
  nodes: Array<Payout_Items>;
};

/** aggregate fields of "payout_items" */
export type Payout_Items_Aggregate_Fields = {
  __typename?: 'payout_items_aggregate_fields';
  avg?: Maybe<Payout_Items_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Payout_Items_Max_Fields>;
  min?: Maybe<Payout_Items_Min_Fields>;
  stddev?: Maybe<Payout_Items_Stddev_Fields>;
  stddev_pop?: Maybe<Payout_Items_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Payout_Items_Stddev_Samp_Fields>;
  sum?: Maybe<Payout_Items_Sum_Fields>;
  var_pop?: Maybe<Payout_Items_Var_Pop_Fields>;
  var_samp?: Maybe<Payout_Items_Var_Samp_Fields>;
  variance?: Maybe<Payout_Items_Variance_Fields>;
};


/** aggregate fields of "payout_items" */
export type Payout_Items_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Payout_Items_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "payout_items" */
export type Payout_Items_Aggregate_Order_By = {
  avg?: Maybe<Payout_Items_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Payout_Items_Max_Order_By>;
  min?: Maybe<Payout_Items_Min_Order_By>;
  stddev?: Maybe<Payout_Items_Stddev_Order_By>;
  stddev_pop?: Maybe<Payout_Items_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Payout_Items_Stddev_Samp_Order_By>;
  sum?: Maybe<Payout_Items_Sum_Order_By>;
  var_pop?: Maybe<Payout_Items_Var_Pop_Order_By>;
  var_samp?: Maybe<Payout_Items_Var_Samp_Order_By>;
  variance?: Maybe<Payout_Items_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "payout_items" */
export type Payout_Items_Arr_Rel_Insert_Input = {
  data: Array<Payout_Items_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Payout_Items_On_Conflict>;
};

/** aggregate avg on columns */
export type Payout_Items_Avg_Fields = {
  __typename?: 'payout_items_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  internationalFee?: Maybe<Scalars['Float']>;
  paymentProcessingFee?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "payout_items" */
export type Payout_Items_Avg_Order_By = {
  amount?: Maybe<Order_By>;
  internationalFee?: Maybe<Order_By>;
  paymentProcessingFee?: Maybe<Order_By>;
  taxes?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "payout_items". All fields are combined with a logical 'AND'. */
export type Payout_Items_Bool_Exp = {
  _and?: Maybe<Array<Payout_Items_Bool_Exp>>;
  _not?: Maybe<Payout_Items_Bool_Exp>;
  _or?: Maybe<Array<Payout_Items_Bool_Exp>>;
  amount?: Maybe<Int_Comparison_Exp>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  currency?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  internationalFee?: Maybe<Int_Comparison_Exp>;
  order?: Maybe<Orders_Bool_Exp>;
  orderId?: Maybe<String_Comparison_Exp>;
  paidAt?: Maybe<Timestamptz_Comparison_Exp>;
  payeeType?: Maybe<String_Comparison_Exp>;
  paymentProcessingFee?: Maybe<Int_Comparison_Exp>;
  payoutId?: Maybe<String_Comparison_Exp>;
  payoutStatus?: Maybe<String_Comparison_Exp>;
  storeId?: Maybe<String_Comparison_Exp>;
  taxes?: Maybe<Int_Comparison_Exp>;
  txnId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "payout_items" */
export enum Payout_Items_Constraint {
  /** unique or primary key constraint */
  PAYOUT_ITEMS_PKEY = 'payout_items_pkey'
}

/** input type for incrementing numeric columns in table "payout_items" */
export type Payout_Items_Inc_Input = {
  amount?: Maybe<Scalars['Int']>;
  internationalFee?: Maybe<Scalars['Int']>;
  paymentProcessingFee?: Maybe<Scalars['Int']>;
  taxes?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "payout_items" */
export type Payout_Items_Insert_Input = {
  amount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  internationalFee?: Maybe<Scalars['Int']>;
  order?: Maybe<Orders_Obj_Rel_Insert_Input>;
  orderId?: Maybe<Scalars['String']>;
  paidAt?: Maybe<Scalars['timestamptz']>;
  payeeType?: Maybe<Scalars['String']>;
  paymentProcessingFee?: Maybe<Scalars['Int']>;
  payoutId?: Maybe<Scalars['String']>;
  payoutStatus?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  taxes?: Maybe<Scalars['Int']>;
  txnId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Payout_Items_Max_Fields = {
  __typename?: 'payout_items_max_fields';
  amount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  internationalFee?: Maybe<Scalars['Int']>;
  orderId?: Maybe<Scalars['String']>;
  paidAt?: Maybe<Scalars['timestamptz']>;
  payeeType?: Maybe<Scalars['String']>;
  paymentProcessingFee?: Maybe<Scalars['Int']>;
  payoutId?: Maybe<Scalars['String']>;
  payoutStatus?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  taxes?: Maybe<Scalars['Int']>;
  txnId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "payout_items" */
export type Payout_Items_Max_Order_By = {
  amount?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currency?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  internationalFee?: Maybe<Order_By>;
  orderId?: Maybe<Order_By>;
  paidAt?: Maybe<Order_By>;
  payeeType?: Maybe<Order_By>;
  paymentProcessingFee?: Maybe<Order_By>;
  payoutId?: Maybe<Order_By>;
  payoutStatus?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  taxes?: Maybe<Order_By>;
  txnId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Payout_Items_Min_Fields = {
  __typename?: 'payout_items_min_fields';
  amount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  internationalFee?: Maybe<Scalars['Int']>;
  orderId?: Maybe<Scalars['String']>;
  paidAt?: Maybe<Scalars['timestamptz']>;
  payeeType?: Maybe<Scalars['String']>;
  paymentProcessingFee?: Maybe<Scalars['Int']>;
  payoutId?: Maybe<Scalars['String']>;
  payoutStatus?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  taxes?: Maybe<Scalars['Int']>;
  txnId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "payout_items" */
export type Payout_Items_Min_Order_By = {
  amount?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currency?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  internationalFee?: Maybe<Order_By>;
  orderId?: Maybe<Order_By>;
  paidAt?: Maybe<Order_By>;
  payeeType?: Maybe<Order_By>;
  paymentProcessingFee?: Maybe<Order_By>;
  payoutId?: Maybe<Order_By>;
  payoutStatus?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  taxes?: Maybe<Order_By>;
  txnId?: Maybe<Order_By>;
};

/** response of any mutation on the table "payout_items" */
export type Payout_Items_Mutation_Response = {
  __typename?: 'payout_items_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Payout_Items>;
};

/** on conflict condition type for table "payout_items" */
export type Payout_Items_On_Conflict = {
  constraint: Payout_Items_Constraint;
  update_columns?: Array<Payout_Items_Update_Column>;
  where?: Maybe<Payout_Items_Bool_Exp>;
};

/** Ordering options when selecting data from "payout_items". */
export type Payout_Items_Order_By = {
  amount?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currency?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  internationalFee?: Maybe<Order_By>;
  order?: Maybe<Orders_Order_By>;
  orderId?: Maybe<Order_By>;
  paidAt?: Maybe<Order_By>;
  payeeType?: Maybe<Order_By>;
  paymentProcessingFee?: Maybe<Order_By>;
  payoutId?: Maybe<Order_By>;
  payoutStatus?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  taxes?: Maybe<Order_By>;
  txnId?: Maybe<Order_By>;
};

/** primary key columns input for table: payout_items */
export type Payout_Items_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "payout_items" */
export enum Payout_Items_Select_Column {
  /** column name */
  AMOUNT = 'amount',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CURRENCY = 'currency',
  /** column name */
  ID = 'id',
  /** column name */
  INTERNATIONALFEE = 'internationalFee',
  /** column name */
  ORDERID = 'orderId',
  /** column name */
  PAIDAT = 'paidAt',
  /** column name */
  PAYEETYPE = 'payeeType',
  /** column name */
  PAYMENTPROCESSINGFEE = 'paymentProcessingFee',
  /** column name */
  PAYOUTID = 'payoutId',
  /** column name */
  PAYOUTSTATUS = 'payoutStatus',
  /** column name */
  STOREID = 'storeId',
  /** column name */
  TAXES = 'taxes',
  /** column name */
  TXNID = 'txnId'
}

/** input type for updating data in table "payout_items" */
export type Payout_Items_Set_Input = {
  amount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  internationalFee?: Maybe<Scalars['Int']>;
  orderId?: Maybe<Scalars['String']>;
  paidAt?: Maybe<Scalars['timestamptz']>;
  payeeType?: Maybe<Scalars['String']>;
  paymentProcessingFee?: Maybe<Scalars['Int']>;
  payoutId?: Maybe<Scalars['String']>;
  payoutStatus?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  taxes?: Maybe<Scalars['Int']>;
  txnId?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Payout_Items_Stddev_Fields = {
  __typename?: 'payout_items_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  internationalFee?: Maybe<Scalars['Float']>;
  paymentProcessingFee?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "payout_items" */
export type Payout_Items_Stddev_Order_By = {
  amount?: Maybe<Order_By>;
  internationalFee?: Maybe<Order_By>;
  paymentProcessingFee?: Maybe<Order_By>;
  taxes?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Payout_Items_Stddev_Pop_Fields = {
  __typename?: 'payout_items_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  internationalFee?: Maybe<Scalars['Float']>;
  paymentProcessingFee?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "payout_items" */
export type Payout_Items_Stddev_Pop_Order_By = {
  amount?: Maybe<Order_By>;
  internationalFee?: Maybe<Order_By>;
  paymentProcessingFee?: Maybe<Order_By>;
  taxes?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Payout_Items_Stddev_Samp_Fields = {
  __typename?: 'payout_items_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  internationalFee?: Maybe<Scalars['Float']>;
  paymentProcessingFee?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "payout_items" */
export type Payout_Items_Stddev_Samp_Order_By = {
  amount?: Maybe<Order_By>;
  internationalFee?: Maybe<Order_By>;
  paymentProcessingFee?: Maybe<Order_By>;
  taxes?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Payout_Items_Sum_Fields = {
  __typename?: 'payout_items_sum_fields';
  amount?: Maybe<Scalars['Int']>;
  internationalFee?: Maybe<Scalars['Int']>;
  paymentProcessingFee?: Maybe<Scalars['Int']>;
  taxes?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "payout_items" */
export type Payout_Items_Sum_Order_By = {
  amount?: Maybe<Order_By>;
  internationalFee?: Maybe<Order_By>;
  paymentProcessingFee?: Maybe<Order_By>;
  taxes?: Maybe<Order_By>;
};

/** update columns of table "payout_items" */
export enum Payout_Items_Update_Column {
  /** column name */
  AMOUNT = 'amount',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CURRENCY = 'currency',
  /** column name */
  ID = 'id',
  /** column name */
  INTERNATIONALFEE = 'internationalFee',
  /** column name */
  ORDERID = 'orderId',
  /** column name */
  PAIDAT = 'paidAt',
  /** column name */
  PAYEETYPE = 'payeeType',
  /** column name */
  PAYMENTPROCESSINGFEE = 'paymentProcessingFee',
  /** column name */
  PAYOUTID = 'payoutId',
  /** column name */
  PAYOUTSTATUS = 'payoutStatus',
  /** column name */
  STOREID = 'storeId',
  /** column name */
  TAXES = 'taxes',
  /** column name */
  TXNID = 'txnId'
}

/** aggregate var_pop on columns */
export type Payout_Items_Var_Pop_Fields = {
  __typename?: 'payout_items_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  internationalFee?: Maybe<Scalars['Float']>;
  paymentProcessingFee?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "payout_items" */
export type Payout_Items_Var_Pop_Order_By = {
  amount?: Maybe<Order_By>;
  internationalFee?: Maybe<Order_By>;
  paymentProcessingFee?: Maybe<Order_By>;
  taxes?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Payout_Items_Var_Samp_Fields = {
  __typename?: 'payout_items_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  internationalFee?: Maybe<Scalars['Float']>;
  paymentProcessingFee?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "payout_items" */
export type Payout_Items_Var_Samp_Order_By = {
  amount?: Maybe<Order_By>;
  internationalFee?: Maybe<Order_By>;
  paymentProcessingFee?: Maybe<Order_By>;
  taxes?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Payout_Items_Variance_Fields = {
  __typename?: 'payout_items_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  internationalFee?: Maybe<Scalars['Float']>;
  paymentProcessingFee?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "payout_items" */
export type Payout_Items_Variance_Order_By = {
  amount?: Maybe<Order_By>;
  internationalFee?: Maybe<Order_By>;
  paymentProcessingFee?: Maybe<Order_By>;
  taxes?: Maybe<Order_By>;
};

/** columns and relationships of "payout_methods" */
export type Payout_Methods = {
  __typename?: 'payout_methods';
  accountName?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  bsb?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamptz'];
  id: Scalars['String'];
  payoutType?: Maybe<Scalars['String']>;
  storeId: Scalars['String'];
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregated selection of "payout_methods" */
export type Payout_Methods_Aggregate = {
  __typename?: 'payout_methods_aggregate';
  aggregate?: Maybe<Payout_Methods_Aggregate_Fields>;
  nodes: Array<Payout_Methods>;
};

/** aggregate fields of "payout_methods" */
export type Payout_Methods_Aggregate_Fields = {
  __typename?: 'payout_methods_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Payout_Methods_Max_Fields>;
  min?: Maybe<Payout_Methods_Min_Fields>;
};


/** aggregate fields of "payout_methods" */
export type Payout_Methods_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Payout_Methods_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "payout_methods". All fields are combined with a logical 'AND'. */
export type Payout_Methods_Bool_Exp = {
  _and?: Maybe<Array<Payout_Methods_Bool_Exp>>;
  _not?: Maybe<Payout_Methods_Bool_Exp>;
  _or?: Maybe<Array<Payout_Methods_Bool_Exp>>;
  accountName?: Maybe<String_Comparison_Exp>;
  accountNumber?: Maybe<String_Comparison_Exp>;
  bsb?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  payoutType?: Maybe<String_Comparison_Exp>;
  storeId?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "payout_methods" */
export enum Payout_Methods_Constraint {
  /** unique or primary key constraint */
  PAYOUT_METHODS_PKEY = 'payout_methods_pkey'
}

/** input type for inserting data into table "payout_methods" */
export type Payout_Methods_Insert_Input = {
  accountName?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  bsb?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  payoutType?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Payout_Methods_Max_Fields = {
  __typename?: 'payout_methods_max_fields';
  accountName?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  bsb?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  payoutType?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Payout_Methods_Min_Fields = {
  __typename?: 'payout_methods_min_fields';
  accountName?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  bsb?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  payoutType?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "payout_methods" */
export type Payout_Methods_Mutation_Response = {
  __typename?: 'payout_methods_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Payout_Methods>;
};

/** input type for inserting object relation for remote table "payout_methods" */
export type Payout_Methods_Obj_Rel_Insert_Input = {
  data: Payout_Methods_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Payout_Methods_On_Conflict>;
};

/** on conflict condition type for table "payout_methods" */
export type Payout_Methods_On_Conflict = {
  constraint: Payout_Methods_Constraint;
  update_columns?: Array<Payout_Methods_Update_Column>;
  where?: Maybe<Payout_Methods_Bool_Exp>;
};

/** Ordering options when selecting data from "payout_methods". */
export type Payout_Methods_Order_By = {
  accountName?: Maybe<Order_By>;
  accountNumber?: Maybe<Order_By>;
  bsb?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  payoutType?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** primary key columns input for table: payout_methods */
export type Payout_Methods_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "payout_methods" */
export enum Payout_Methods_Select_Column {
  /** column name */
  ACCOUNTNAME = 'accountName',
  /** column name */
  ACCOUNTNUMBER = 'accountNumber',
  /** column name */
  BSB = 'bsb',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  PAYOUTTYPE = 'payoutType',
  /** column name */
  STOREID = 'storeId',
  /** column name */
  UPDATEDAT = 'updatedAt'
}

/** input type for updating data in table "payout_methods" */
export type Payout_Methods_Set_Input = {
  accountName?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  bsb?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  payoutType?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "payout_methods" */
export enum Payout_Methods_Update_Column {
  /** column name */
  ACCOUNTNAME = 'accountName',
  /** column name */
  ACCOUNTNUMBER = 'accountNumber',
  /** column name */
  BSB = 'bsb',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  PAYOUTTYPE = 'payoutType',
  /** column name */
  STOREID = 'storeId',
  /** column name */
  UPDATEDAT = 'updatedAt'
}

/** columns and relationships of "phone_numbers" */
export type Phone_Numbers = {
  __typename?: 'phone_numbers';
  areaCode?: Maybe<Scalars['String']>;
  countryCode: Scalars['String'];
  created_at?: Maybe<Scalars['timestamptz']>;
  id: Scalars['String'];
  number: Scalars['String'];
  userId: Scalars['String'];
};

/** aggregated selection of "phone_numbers" */
export type Phone_Numbers_Aggregate = {
  __typename?: 'phone_numbers_aggregate';
  aggregate?: Maybe<Phone_Numbers_Aggregate_Fields>;
  nodes: Array<Phone_Numbers>;
};

/** aggregate fields of "phone_numbers" */
export type Phone_Numbers_Aggregate_Fields = {
  __typename?: 'phone_numbers_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Phone_Numbers_Max_Fields>;
  min?: Maybe<Phone_Numbers_Min_Fields>;
};


/** aggregate fields of "phone_numbers" */
export type Phone_Numbers_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Phone_Numbers_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "phone_numbers". All fields are combined with a logical 'AND'. */
export type Phone_Numbers_Bool_Exp = {
  _and?: Maybe<Array<Phone_Numbers_Bool_Exp>>;
  _not?: Maybe<Phone_Numbers_Bool_Exp>;
  _or?: Maybe<Array<Phone_Numbers_Bool_Exp>>;
  areaCode?: Maybe<String_Comparison_Exp>;
  countryCode?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  number?: Maybe<String_Comparison_Exp>;
  userId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "phone_numbers" */
export enum Phone_Numbers_Constraint {
  /** unique or primary key constraint */
  PHONE_NUMBERS_PKEY = 'phone_numbers_pkey'
}

/** input type for inserting data into table "phone_numbers" */
export type Phone_Numbers_Insert_Input = {
  areaCode?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Phone_Numbers_Max_Fields = {
  __typename?: 'phone_numbers_max_fields';
  areaCode?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Phone_Numbers_Min_Fields = {
  __typename?: 'phone_numbers_min_fields';
  areaCode?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "phone_numbers" */
export type Phone_Numbers_Mutation_Response = {
  __typename?: 'phone_numbers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Phone_Numbers>;
};

/** input type for inserting object relation for remote table "phone_numbers" */
export type Phone_Numbers_Obj_Rel_Insert_Input = {
  data: Phone_Numbers_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Phone_Numbers_On_Conflict>;
};

/** on conflict condition type for table "phone_numbers" */
export type Phone_Numbers_On_Conflict = {
  constraint: Phone_Numbers_Constraint;
  update_columns?: Array<Phone_Numbers_Update_Column>;
  where?: Maybe<Phone_Numbers_Bool_Exp>;
};

/** Ordering options when selecting data from "phone_numbers". */
export type Phone_Numbers_Order_By = {
  areaCode?: Maybe<Order_By>;
  countryCode?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  number?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: phone_numbers */
export type Phone_Numbers_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "phone_numbers" */
export enum Phone_Numbers_Select_Column {
  /** column name */
  AREACODE = 'areaCode',
  /** column name */
  COUNTRYCODE = 'countryCode',
  /** column name */
  CREATED_AT = 'created_at',
  /** column name */
  ID = 'id',
  /** column name */
  NUMBER = 'number',
  /** column name */
  USERID = 'userId'
}

/** input type for updating data in table "phone_numbers" */
export type Phone_Numbers_Set_Input = {
  areaCode?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** update columns of table "phone_numbers" */
export enum Phone_Numbers_Update_Column {
  /** column name */
  AREACODE = 'areaCode',
  /** column name */
  COUNTRYCODE = 'countryCode',
  /** column name */
  CREATED_AT = 'created_at',
  /** column name */
  ID = 'id',
  /** column name */
  NUMBER = 'number',
  /** column name */
  USERID = 'userId'
}

/** columns and relationships of "product_file_owners" */
export type Product_File_Owners = {
  __typename?: 'product_file_owners';
  fileId: Scalars['String'];
  ownerId: Scalars['String'];
};

/** aggregated selection of "product_file_owners" */
export type Product_File_Owners_Aggregate = {
  __typename?: 'product_file_owners_aggregate';
  aggregate?: Maybe<Product_File_Owners_Aggregate_Fields>;
  nodes: Array<Product_File_Owners>;
};

/** aggregate fields of "product_file_owners" */
export type Product_File_Owners_Aggregate_Fields = {
  __typename?: 'product_file_owners_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Product_File_Owners_Max_Fields>;
  min?: Maybe<Product_File_Owners_Min_Fields>;
};


/** aggregate fields of "product_file_owners" */
export type Product_File_Owners_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Product_File_Owners_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "product_file_owners". All fields are combined with a logical 'AND'. */
export type Product_File_Owners_Bool_Exp = {
  _and?: Maybe<Array<Product_File_Owners_Bool_Exp>>;
  _not?: Maybe<Product_File_Owners_Bool_Exp>;
  _or?: Maybe<Array<Product_File_Owners_Bool_Exp>>;
  fileId?: Maybe<String_Comparison_Exp>;
  ownerId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "product_file_owners" */
export enum Product_File_Owners_Constraint {
  /** unique or primary key constraint */
  PRODUCT_FILE_OWNERS_PKEY = 'product_file_owners_pkey'
}

/** input type for inserting data into table "product_file_owners" */
export type Product_File_Owners_Insert_Input = {
  fileId?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Product_File_Owners_Max_Fields = {
  __typename?: 'product_file_owners_max_fields';
  fileId?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Product_File_Owners_Min_Fields = {
  __typename?: 'product_file_owners_min_fields';
  fileId?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "product_file_owners" */
export type Product_File_Owners_Mutation_Response = {
  __typename?: 'product_file_owners_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Product_File_Owners>;
};

/** on conflict condition type for table "product_file_owners" */
export type Product_File_Owners_On_Conflict = {
  constraint: Product_File_Owners_Constraint;
  update_columns?: Array<Product_File_Owners_Update_Column>;
  where?: Maybe<Product_File_Owners_Bool_Exp>;
};

/** Ordering options when selecting data from "product_file_owners". */
export type Product_File_Owners_Order_By = {
  fileId?: Maybe<Order_By>;
  ownerId?: Maybe<Order_By>;
};

/** primary key columns input for table: product_file_owners */
export type Product_File_Owners_Pk_Columns_Input = {
  fileId: Scalars['String'];
};

/** select columns of table "product_file_owners" */
export enum Product_File_Owners_Select_Column {
  /** column name */
  FILEID = 'fileId',
  /** column name */
  OWNERID = 'ownerId'
}

/** input type for updating data in table "product_file_owners" */
export type Product_File_Owners_Set_Input = {
  fileId?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
};

/** update columns of table "product_file_owners" */
export enum Product_File_Owners_Update_Column {
  /** column name */
  FILEID = 'fileId',
  /** column name */
  OWNERID = 'ownerId'
}

/** columns and relationships of "product_files" */
export type Product_Files = {
  __typename?: 'product_files';
  createdAt: Scalars['timestamptz'];
  fileName: Scalars['String'];
  id: Scalars['String'];
  mimeType: Scalars['String'];
  sizeInBytes: Scalars['bigint'];
};

/** aggregated selection of "product_files" */
export type Product_Files_Aggregate = {
  __typename?: 'product_files_aggregate';
  aggregate?: Maybe<Product_Files_Aggregate_Fields>;
  nodes: Array<Product_Files>;
};

/** aggregate fields of "product_files" */
export type Product_Files_Aggregate_Fields = {
  __typename?: 'product_files_aggregate_fields';
  avg?: Maybe<Product_Files_Avg_Fields>;
  count: Scalars['Int'];
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


/** aggregate fields of "product_files" */
export type Product_Files_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Product_Files_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Product_Files_Avg_Fields = {
  __typename?: 'product_files_avg_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "product_files". All fields are combined with a logical 'AND'. */
export type Product_Files_Bool_Exp = {
  _and?: Maybe<Array<Product_Files_Bool_Exp>>;
  _not?: Maybe<Product_Files_Bool_Exp>;
  _or?: Maybe<Array<Product_Files_Bool_Exp>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  fileName?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  mimeType?: Maybe<String_Comparison_Exp>;
  sizeInBytes?: Maybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "product_files" */
export enum Product_Files_Constraint {
  /** unique or primary key constraint */
  FILES_PKEY = 'files_pkey'
}

/** input type for incrementing numeric columns in table "product_files" */
export type Product_Files_Inc_Input = {
  sizeInBytes?: Maybe<Scalars['bigint']>;
};

/** input type for inserting data into table "product_files" */
export type Product_Files_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  fileName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['bigint']>;
};

/** aggregate max on columns */
export type Product_Files_Max_Fields = {
  __typename?: 'product_files_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  fileName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['bigint']>;
};

/** aggregate min on columns */
export type Product_Files_Min_Fields = {
  __typename?: 'product_files_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  fileName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['bigint']>;
};

/** response of any mutation on the table "product_files" */
export type Product_Files_Mutation_Response = {
  __typename?: 'product_files_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Product_Files>;
};

/** input type for inserting object relation for remote table "product_files" */
export type Product_Files_Obj_Rel_Insert_Input = {
  data: Product_Files_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Product_Files_On_Conflict>;
};

/** on conflict condition type for table "product_files" */
export type Product_Files_On_Conflict = {
  constraint: Product_Files_Constraint;
  update_columns?: Array<Product_Files_Update_Column>;
  where?: Maybe<Product_Files_Bool_Exp>;
};

/** Ordering options when selecting data from "product_files". */
export type Product_Files_Order_By = {
  createdAt?: Maybe<Order_By>;
  fileName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
};

/** primary key columns input for table: product_files */
export type Product_Files_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "product_files" */
export enum Product_Files_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  FILENAME = 'fileName',
  /** column name */
  ID = 'id',
  /** column name */
  MIMETYPE = 'mimeType',
  /** column name */
  SIZEINBYTES = 'sizeInBytes'
}

/** input type for updating data in table "product_files" */
export type Product_Files_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  fileName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['bigint']>;
};

/** aggregate stddev on columns */
export type Product_Files_Stddev_Fields = {
  __typename?: 'product_files_stddev_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Product_Files_Stddev_Pop_Fields = {
  __typename?: 'product_files_stddev_pop_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Product_Files_Stddev_Samp_Fields = {
  __typename?: 'product_files_stddev_samp_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Product_Files_Sum_Fields = {
  __typename?: 'product_files_sum_fields';
  sizeInBytes?: Maybe<Scalars['bigint']>;
};

/** update columns of table "product_files" */
export enum Product_Files_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  FILENAME = 'fileName',
  /** column name */
  ID = 'id',
  /** column name */
  MIMETYPE = 'mimeType',
  /** column name */
  SIZEINBYTES = 'sizeInBytes'
}

/** aggregate var_pop on columns */
export type Product_Files_Var_Pop_Fields = {
  __typename?: 'product_files_var_pop_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Product_Files_Var_Samp_Fields = {
  __typename?: 'product_files_var_samp_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Product_Files_Variance_Fields = {
  __typename?: 'product_files_variance_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "product_preview_items" */
export type Product_Preview_Items = {
  __typename?: 'product_preview_items';
  id: Scalars['String'];
  /** An object relationship */
  image?: Maybe<Image_Parents>;
  imageId?: Maybe<Scalars['String']>;
  isInternal?: Maybe<Scalars['Boolean']>;
  position: Scalars['Int'];
  variantSnapshotId?: Maybe<Scalars['String']>;
  youTubeEmbedLink?: Maybe<Scalars['String']>;
};

/** aggregated selection of "product_preview_items" */
export type Product_Preview_Items_Aggregate = {
  __typename?: 'product_preview_items_aggregate';
  aggregate?: Maybe<Product_Preview_Items_Aggregate_Fields>;
  nodes: Array<Product_Preview_Items>;
};

/** aggregate fields of "product_preview_items" */
export type Product_Preview_Items_Aggregate_Fields = {
  __typename?: 'product_preview_items_aggregate_fields';
  avg?: Maybe<Product_Preview_Items_Avg_Fields>;
  count: Scalars['Int'];
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


/** aggregate fields of "product_preview_items" */
export type Product_Preview_Items_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "product_preview_items" */
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

/** input type for inserting array relation for remote table "product_preview_items" */
export type Product_Preview_Items_Arr_Rel_Insert_Input = {
  data: Array<Product_Preview_Items_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Product_Preview_Items_On_Conflict>;
};

/** aggregate avg on columns */
export type Product_Preview_Items_Avg_Fields = {
  __typename?: 'product_preview_items_avg_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "product_preview_items" */
export type Product_Preview_Items_Avg_Order_By = {
  position?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "product_preview_items". All fields are combined with a logical 'AND'. */
export type Product_Preview_Items_Bool_Exp = {
  _and?: Maybe<Array<Product_Preview_Items_Bool_Exp>>;
  _not?: Maybe<Product_Preview_Items_Bool_Exp>;
  _or?: Maybe<Array<Product_Preview_Items_Bool_Exp>>;
  id?: Maybe<String_Comparison_Exp>;
  image?: Maybe<Image_Parents_Bool_Exp>;
  imageId?: Maybe<String_Comparison_Exp>;
  isInternal?: Maybe<Boolean_Comparison_Exp>;
  position?: Maybe<Int_Comparison_Exp>;
  variantSnapshotId?: Maybe<String_Comparison_Exp>;
  youTubeEmbedLink?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "product_preview_items" */
export enum Product_Preview_Items_Constraint {
  /** unique or primary key constraint */
  PRODUCT_PREVIEW_ITEMS_PKEY = 'product_preview_items_pkey'
}

/** input type for incrementing numeric columns in table "product_preview_items" */
export type Product_Preview_Items_Inc_Input = {
  position?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "product_preview_items" */
export type Product_Preview_Items_Insert_Input = {
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Image_Parents_Obj_Rel_Insert_Input>;
  imageId?: Maybe<Scalars['String']>;
  isInternal?: Maybe<Scalars['Boolean']>;
  position?: Maybe<Scalars['Int']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
  youTubeEmbedLink?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Product_Preview_Items_Max_Fields = {
  __typename?: 'product_preview_items_max_fields';
  id?: Maybe<Scalars['String']>;
  imageId?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
  youTubeEmbedLink?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "product_preview_items" */
export type Product_Preview_Items_Max_Order_By = {
  id?: Maybe<Order_By>;
  imageId?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  variantSnapshotId?: Maybe<Order_By>;
  youTubeEmbedLink?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Product_Preview_Items_Min_Fields = {
  __typename?: 'product_preview_items_min_fields';
  id?: Maybe<Scalars['String']>;
  imageId?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
  youTubeEmbedLink?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "product_preview_items" */
export type Product_Preview_Items_Min_Order_By = {
  id?: Maybe<Order_By>;
  imageId?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  variantSnapshotId?: Maybe<Order_By>;
  youTubeEmbedLink?: Maybe<Order_By>;
};

/** response of any mutation on the table "product_preview_items" */
export type Product_Preview_Items_Mutation_Response = {
  __typename?: 'product_preview_items_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Product_Preview_Items>;
};

/** input type for inserting object relation for remote table "product_preview_items" */
export type Product_Preview_Items_Obj_Rel_Insert_Input = {
  data: Product_Preview_Items_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Product_Preview_Items_On_Conflict>;
};

/** on conflict condition type for table "product_preview_items" */
export type Product_Preview_Items_On_Conflict = {
  constraint: Product_Preview_Items_Constraint;
  update_columns?: Array<Product_Preview_Items_Update_Column>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};

/** Ordering options when selecting data from "product_preview_items". */
export type Product_Preview_Items_Order_By = {
  id?: Maybe<Order_By>;
  image?: Maybe<Image_Parents_Order_By>;
  imageId?: Maybe<Order_By>;
  isInternal?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  variantSnapshotId?: Maybe<Order_By>;
  youTubeEmbedLink?: Maybe<Order_By>;
};

/** primary key columns input for table: product_preview_items */
export type Product_Preview_Items_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "product_preview_items" */
export enum Product_Preview_Items_Select_Column {
  /** column name */
  ID = 'id',
  /** column name */
  IMAGEID = 'imageId',
  /** column name */
  ISINTERNAL = 'isInternal',
  /** column name */
  POSITION = 'position',
  /** column name */
  VARIANTSNAPSHOTID = 'variantSnapshotId',
  /** column name */
  YOUTUBEEMBEDLINK = 'youTubeEmbedLink'
}

/** input type for updating data in table "product_preview_items" */
export type Product_Preview_Items_Set_Input = {
  id?: Maybe<Scalars['String']>;
  imageId?: Maybe<Scalars['String']>;
  isInternal?: Maybe<Scalars['Boolean']>;
  position?: Maybe<Scalars['Int']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
  youTubeEmbedLink?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Product_Preview_Items_Stddev_Fields = {
  __typename?: 'product_preview_items_stddev_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "product_preview_items" */
export type Product_Preview_Items_Stddev_Order_By = {
  position?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Product_Preview_Items_Stddev_Pop_Fields = {
  __typename?: 'product_preview_items_stddev_pop_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "product_preview_items" */
export type Product_Preview_Items_Stddev_Pop_Order_By = {
  position?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Product_Preview_Items_Stddev_Samp_Fields = {
  __typename?: 'product_preview_items_stddev_samp_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "product_preview_items" */
export type Product_Preview_Items_Stddev_Samp_Order_By = {
  position?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Product_Preview_Items_Sum_Fields = {
  __typename?: 'product_preview_items_sum_fields';
  position?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "product_preview_items" */
export type Product_Preview_Items_Sum_Order_By = {
  position?: Maybe<Order_By>;
};

/** update columns of table "product_preview_items" */
export enum Product_Preview_Items_Update_Column {
  /** column name */
  ID = 'id',
  /** column name */
  IMAGEID = 'imageId',
  /** column name */
  ISINTERNAL = 'isInternal',
  /** column name */
  POSITION = 'position',
  /** column name */
  VARIANTSNAPSHOTID = 'variantSnapshotId',
  /** column name */
  YOUTUBEEMBEDLINK = 'youTubeEmbedLink'
}

/** aggregate var_pop on columns */
export type Product_Preview_Items_Var_Pop_Fields = {
  __typename?: 'product_preview_items_var_pop_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "product_preview_items" */
export type Product_Preview_Items_Var_Pop_Order_By = {
  position?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Product_Preview_Items_Var_Samp_Fields = {
  __typename?: 'product_preview_items_var_samp_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "product_preview_items" */
export type Product_Preview_Items_Var_Samp_Order_By = {
  position?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Product_Preview_Items_Variance_Fields = {
  __typename?: 'product_preview_items_variance_fields';
  position?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "product_preview_items" */
export type Product_Preview_Items_Variance_Order_By = {
  position?: Maybe<Order_By>;
};

/** columns and relationships of "product_snapshots" */
export type Product_Snapshots = {
  __typename?: 'product_snapshots';
  actionType: Scalars['String'];
  ammoType?: Maybe<Scalars['String']>;
  barrelLength?: Maybe<Scalars['String']>;
  caliber?: Maybe<Scalars['String']>;
  caliberId?: Maybe<Scalars['String']>;
  condition: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  /** An array relationship */
  currentVariants: Array<Product_Variants>;
  /** An aggregate relationship */
  currentVariants_aggregate: Product_Variants_Aggregate;
  /** An object relationship */
  dealer?: Maybe<Dealers>;
  dealerId?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['String'];
  location: Scalars['String'];
  magazineCapacity?: Maybe<Scalars['String']>;
  make: Scalars['String'];
  model: Scalars['String'];
  productId: Scalars['String'];
  /** An array relationship */
  products: Array<Products>;
  /** An aggregate relationship */
  products_aggregate: Products_Aggregate;
  serialNumber: Scalars['String'];
  title: Scalars['String'];
};


/** columns and relationships of "product_snapshots" */
export type Product_SnapshotsCurrentVariantsArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


/** columns and relationships of "product_snapshots" */
export type Product_SnapshotsCurrentVariants_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


/** columns and relationships of "product_snapshots" */
export type Product_SnapshotsProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


/** columns and relationships of "product_snapshots" */
export type Product_SnapshotsProducts_AggregateArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};

/** aggregated selection of "product_snapshots" */
export type Product_Snapshots_Aggregate = {
  __typename?: 'product_snapshots_aggregate';
  aggregate?: Maybe<Product_Snapshots_Aggregate_Fields>;
  nodes: Array<Product_Snapshots>;
};

/** aggregate fields of "product_snapshots" */
export type Product_Snapshots_Aggregate_Fields = {
  __typename?: 'product_snapshots_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Product_Snapshots_Max_Fields>;
  min?: Maybe<Product_Snapshots_Min_Fields>;
};


/** aggregate fields of "product_snapshots" */
export type Product_Snapshots_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Product_Snapshots_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "product_snapshots". All fields are combined with a logical 'AND'. */
export type Product_Snapshots_Bool_Exp = {
  _and?: Maybe<Array<Product_Snapshots_Bool_Exp>>;
  _not?: Maybe<Product_Snapshots_Bool_Exp>;
  _or?: Maybe<Array<Product_Snapshots_Bool_Exp>>;
  actionType?: Maybe<String_Comparison_Exp>;
  ammoType?: Maybe<String_Comparison_Exp>;
  barrelLength?: Maybe<String_Comparison_Exp>;
  caliber?: Maybe<String_Comparison_Exp>;
  caliberId?: Maybe<String_Comparison_Exp>;
  condition?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  currentVariants?: Maybe<Product_Variants_Bool_Exp>;
  dealer?: Maybe<Dealers_Bool_Exp>;
  dealerId?: Maybe<String_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  location?: Maybe<String_Comparison_Exp>;
  magazineCapacity?: Maybe<String_Comparison_Exp>;
  make?: Maybe<String_Comparison_Exp>;
  model?: Maybe<String_Comparison_Exp>;
  productId?: Maybe<String_Comparison_Exp>;
  products?: Maybe<Products_Bool_Exp>;
  serialNumber?: Maybe<String_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "product_snapshots" */
export enum Product_Snapshots_Constraint {
  /** unique or primary key constraint */
  PRODUCT_SNAPSHOTS_PKEY = 'product_snapshots_pkey'
}

/** input type for inserting data into table "product_snapshots" */
export type Product_Snapshots_Insert_Input = {
  actionType?: Maybe<Scalars['String']>;
  ammoType?: Maybe<Scalars['String']>;
  barrelLength?: Maybe<Scalars['String']>;
  caliber?: Maybe<Scalars['String']>;
  caliberId?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currentVariants?: Maybe<Product_Variants_Arr_Rel_Insert_Input>;
  dealer?: Maybe<Dealers_Obj_Rel_Insert_Input>;
  dealerId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  magazineCapacity?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  products?: Maybe<Products_Arr_Rel_Insert_Input>;
  serialNumber?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Product_Snapshots_Max_Fields = {
  __typename?: 'product_snapshots_max_fields';
  actionType?: Maybe<Scalars['String']>;
  ammoType?: Maybe<Scalars['String']>;
  barrelLength?: Maybe<Scalars['String']>;
  caliber?: Maybe<Scalars['String']>;
  caliberId?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  dealerId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  magazineCapacity?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  serialNumber?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Product_Snapshots_Min_Fields = {
  __typename?: 'product_snapshots_min_fields';
  actionType?: Maybe<Scalars['String']>;
  ammoType?: Maybe<Scalars['String']>;
  barrelLength?: Maybe<Scalars['String']>;
  caliber?: Maybe<Scalars['String']>;
  caliberId?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  dealerId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  magazineCapacity?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  serialNumber?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "product_snapshots" */
export type Product_Snapshots_Mutation_Response = {
  __typename?: 'product_snapshots_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Product_Snapshots>;
};

/** input type for inserting object relation for remote table "product_snapshots" */
export type Product_Snapshots_Obj_Rel_Insert_Input = {
  data: Product_Snapshots_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Product_Snapshots_On_Conflict>;
};

/** on conflict condition type for table "product_snapshots" */
export type Product_Snapshots_On_Conflict = {
  constraint: Product_Snapshots_Constraint;
  update_columns?: Array<Product_Snapshots_Update_Column>;
  where?: Maybe<Product_Snapshots_Bool_Exp>;
};

/** Ordering options when selecting data from "product_snapshots". */
export type Product_Snapshots_Order_By = {
  actionType?: Maybe<Order_By>;
  ammoType?: Maybe<Order_By>;
  barrelLength?: Maybe<Order_By>;
  caliber?: Maybe<Order_By>;
  caliberId?: Maybe<Order_By>;
  condition?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currentVariants_aggregate?: Maybe<Product_Variants_Aggregate_Order_By>;
  dealer?: Maybe<Dealers_Order_By>;
  dealerId?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  magazineCapacity?: Maybe<Order_By>;
  make?: Maybe<Order_By>;
  model?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  products_aggregate?: Maybe<Products_Aggregate_Order_By>;
  serialNumber?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
};

/** primary key columns input for table: product_snapshots */
export type Product_Snapshots_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "product_snapshots" */
export enum Product_Snapshots_Select_Column {
  /** column name */
  ACTIONTYPE = 'actionType',
  /** column name */
  AMMOTYPE = 'ammoType',
  /** column name */
  BARRELLENGTH = 'barrelLength',
  /** column name */
  CALIBER = 'caliber',
  /** column name */
  CALIBERID = 'caliberId',
  /** column name */
  CONDITION = 'condition',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  DEALERID = 'dealerId',
  /** column name */
  DESCRIPTION = 'description',
  /** column name */
  ID = 'id',
  /** column name */
  LOCATION = 'location',
  /** column name */
  MAGAZINECAPACITY = 'magazineCapacity',
  /** column name */
  MAKE = 'make',
  /** column name */
  MODEL = 'model',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  SERIALNUMBER = 'serialNumber',
  /** column name */
  TITLE = 'title'
}

/** input type for updating data in table "product_snapshots" */
export type Product_Snapshots_Set_Input = {
  actionType?: Maybe<Scalars['String']>;
  ammoType?: Maybe<Scalars['String']>;
  barrelLength?: Maybe<Scalars['String']>;
  caliber?: Maybe<Scalars['String']>;
  caliberId?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  dealerId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  magazineCapacity?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  serialNumber?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** update columns of table "product_snapshots" */
export enum Product_Snapshots_Update_Column {
  /** column name */
  ACTIONTYPE = 'actionType',
  /** column name */
  AMMOTYPE = 'ammoType',
  /** column name */
  BARRELLENGTH = 'barrelLength',
  /** column name */
  CALIBER = 'caliber',
  /** column name */
  CALIBERID = 'caliberId',
  /** column name */
  CONDITION = 'condition',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  DEALERID = 'dealerId',
  /** column name */
  DESCRIPTION = 'description',
  /** column name */
  ID = 'id',
  /** column name */
  LOCATION = 'location',
  /** column name */
  MAGAZINECAPACITY = 'magazineCapacity',
  /** column name */
  MAKE = 'make',
  /** column name */
  MODEL = 'model',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  SERIALNUMBER = 'serialNumber',
  /** column name */
  TITLE = 'title'
}

/** columns and relationships of "product_variants" */
export type Product_Variants = {
  __typename?: 'product_variants';
  createdAt: Scalars['timestamptz'];
  currency?: Maybe<Scalars['String']>;
  isDefault: Scalars['Boolean'];
  position: Scalars['Int'];
  /** An array relationship */
  previewItems: Array<Product_Preview_Items>;
  /** An aggregate relationship */
  previewItems_aggregate: Product_Preview_Items_Aggregate;
  price: Scalars['Int'];
  priceWas?: Maybe<Scalars['Int']>;
  productId: Scalars['String'];
  snapshotId: Scalars['String'];
  storeId: Scalars['String'];
  variantDescription: Scalars['String'];
  variantId: Scalars['String'];
  variantName: Scalars['String'];
  variantSnapshotId: Scalars['String'];
};


/** columns and relationships of "product_variants" */
export type Product_VariantsPreviewItemsArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};


/** columns and relationships of "product_variants" */
export type Product_VariantsPreviewItems_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};

/** aggregated selection of "product_variants" */
export type Product_Variants_Aggregate = {
  __typename?: 'product_variants_aggregate';
  aggregate?: Maybe<Product_Variants_Aggregate_Fields>;
  nodes: Array<Product_Variants>;
};

/** aggregate fields of "product_variants" */
export type Product_Variants_Aggregate_Fields = {
  __typename?: 'product_variants_aggregate_fields';
  avg?: Maybe<Product_Variants_Avg_Fields>;
  count: Scalars['Int'];
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


/** aggregate fields of "product_variants" */
export type Product_Variants_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Product_Variants_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "product_variants" */
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

/** input type for inserting array relation for remote table "product_variants" */
export type Product_Variants_Arr_Rel_Insert_Input = {
  data: Array<Product_Variants_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Product_Variants_On_Conflict>;
};

/** aggregate avg on columns */
export type Product_Variants_Avg_Fields = {
  __typename?: 'product_variants_avg_fields';
  position?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  priceWas?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "product_variants" */
export type Product_Variants_Avg_Order_By = {
  position?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "product_variants". All fields are combined with a logical 'AND'. */
export type Product_Variants_Bool_Exp = {
  _and?: Maybe<Array<Product_Variants_Bool_Exp>>;
  _not?: Maybe<Product_Variants_Bool_Exp>;
  _or?: Maybe<Array<Product_Variants_Bool_Exp>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  currency?: Maybe<String_Comparison_Exp>;
  isDefault?: Maybe<Boolean_Comparison_Exp>;
  position?: Maybe<Int_Comparison_Exp>;
  previewItems?: Maybe<Product_Preview_Items_Bool_Exp>;
  price?: Maybe<Int_Comparison_Exp>;
  priceWas?: Maybe<Int_Comparison_Exp>;
  productId?: Maybe<String_Comparison_Exp>;
  snapshotId?: Maybe<String_Comparison_Exp>;
  storeId?: Maybe<String_Comparison_Exp>;
  variantDescription?: Maybe<String_Comparison_Exp>;
  variantId?: Maybe<String_Comparison_Exp>;
  variantName?: Maybe<String_Comparison_Exp>;
  variantSnapshotId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "product_variants" */
export enum Product_Variants_Constraint {
  /** unique or primary key constraint */
  PRODUCT_VARIANTS_PKEY = 'product_variants_pkey'
}

/** input type for incrementing numeric columns in table "product_variants" */
export type Product_Variants_Inc_Input = {
  position?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Int']>;
  priceWas?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "product_variants" */
export type Product_Variants_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  currency?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  position?: Maybe<Scalars['Int']>;
  previewItems?: Maybe<Product_Preview_Items_Arr_Rel_Insert_Input>;
  price?: Maybe<Scalars['Int']>;
  priceWas?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  snapshotId?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  variantDescription?: Maybe<Scalars['String']>;
  variantId?: Maybe<Scalars['String']>;
  variantName?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Product_Variants_Max_Fields = {
  __typename?: 'product_variants_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  currency?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Int']>;
  priceWas?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  snapshotId?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  variantDescription?: Maybe<Scalars['String']>;
  variantId?: Maybe<Scalars['String']>;
  variantName?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "product_variants" */
export type Product_Variants_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  currency?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  snapshotId?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  variantDescription?: Maybe<Order_By>;
  variantId?: Maybe<Order_By>;
  variantName?: Maybe<Order_By>;
  variantSnapshotId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Product_Variants_Min_Fields = {
  __typename?: 'product_variants_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  currency?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Int']>;
  priceWas?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  snapshotId?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  variantDescription?: Maybe<Scalars['String']>;
  variantId?: Maybe<Scalars['String']>;
  variantName?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "product_variants" */
export type Product_Variants_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  currency?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  snapshotId?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  variantDescription?: Maybe<Order_By>;
  variantId?: Maybe<Order_By>;
  variantName?: Maybe<Order_By>;
  variantSnapshotId?: Maybe<Order_By>;
};

/** response of any mutation on the table "product_variants" */
export type Product_Variants_Mutation_Response = {
  __typename?: 'product_variants_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Product_Variants>;
};

/** on conflict condition type for table "product_variants" */
export type Product_Variants_On_Conflict = {
  constraint: Product_Variants_Constraint;
  update_columns?: Array<Product_Variants_Update_Column>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};

/** Ordering options when selecting data from "product_variants". */
export type Product_Variants_Order_By = {
  createdAt?: Maybe<Order_By>;
  currency?: Maybe<Order_By>;
  isDefault?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  previewItems_aggregate?: Maybe<Product_Preview_Items_Aggregate_Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  snapshotId?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  variantDescription?: Maybe<Order_By>;
  variantId?: Maybe<Order_By>;
  variantName?: Maybe<Order_By>;
  variantSnapshotId?: Maybe<Order_By>;
};

/** primary key columns input for table: product_variants */
export type Product_Variants_Pk_Columns_Input = {
  variantId: Scalars['String'];
};

/** select columns of table "product_variants" */
export enum Product_Variants_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CURRENCY = 'currency',
  /** column name */
  ISDEFAULT = 'isDefault',
  /** column name */
  POSITION = 'position',
  /** column name */
  PRICE = 'price',
  /** column name */
  PRICEWAS = 'priceWas',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  SNAPSHOTID = 'snapshotId',
  /** column name */
  STOREID = 'storeId',
  /** column name */
  VARIANTDESCRIPTION = 'variantDescription',
  /** column name */
  VARIANTID = 'variantId',
  /** column name */
  VARIANTNAME = 'variantName',
  /** column name */
  VARIANTSNAPSHOTID = 'variantSnapshotId'
}

/** input type for updating data in table "product_variants" */
export type Product_Variants_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  currency?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  position?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Int']>;
  priceWas?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  snapshotId?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  variantDescription?: Maybe<Scalars['String']>;
  variantId?: Maybe<Scalars['String']>;
  variantName?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Product_Variants_Stddev_Fields = {
  __typename?: 'product_variants_stddev_fields';
  position?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  priceWas?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "product_variants" */
export type Product_Variants_Stddev_Order_By = {
  position?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Product_Variants_Stddev_Pop_Fields = {
  __typename?: 'product_variants_stddev_pop_fields';
  position?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  priceWas?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "product_variants" */
export type Product_Variants_Stddev_Pop_Order_By = {
  position?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Product_Variants_Stddev_Samp_Fields = {
  __typename?: 'product_variants_stddev_samp_fields';
  position?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  priceWas?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "product_variants" */
export type Product_Variants_Stddev_Samp_Order_By = {
  position?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Product_Variants_Sum_Fields = {
  __typename?: 'product_variants_sum_fields';
  position?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Int']>;
  priceWas?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "product_variants" */
export type Product_Variants_Sum_Order_By = {
  position?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
};

/** update columns of table "product_variants" */
export enum Product_Variants_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CURRENCY = 'currency',
  /** column name */
  ISDEFAULT = 'isDefault',
  /** column name */
  POSITION = 'position',
  /** column name */
  PRICE = 'price',
  /** column name */
  PRICEWAS = 'priceWas',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  SNAPSHOTID = 'snapshotId',
  /** column name */
  STOREID = 'storeId',
  /** column name */
  VARIANTDESCRIPTION = 'variantDescription',
  /** column name */
  VARIANTID = 'variantId',
  /** column name */
  VARIANTNAME = 'variantName',
  /** column name */
  VARIANTSNAPSHOTID = 'variantSnapshotId'
}

/** aggregate var_pop on columns */
export type Product_Variants_Var_Pop_Fields = {
  __typename?: 'product_variants_var_pop_fields';
  position?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  priceWas?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "product_variants" */
export type Product_Variants_Var_Pop_Order_By = {
  position?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Product_Variants_Var_Samp_Fields = {
  __typename?: 'product_variants_var_samp_fields';
  position?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  priceWas?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "product_variants" */
export type Product_Variants_Var_Samp_Order_By = {
  position?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Product_Variants_Variance_Fields = {
  __typename?: 'product_variants_variance_fields';
  position?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  priceWas?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "product_variants" */
export type Product_Variants_Variance_Order_By = {
  position?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  priceWas?: Maybe<Order_By>;
};

/** columns and relationships of "products" */
export type Products = {
  __typename?: 'products';
  allowBids?: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  category?: Maybe<Categories>;
  categoryId: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  /** An object relationship */
  currentSnapshot: Product_Snapshots;
  currentSnapshotId: Scalars['String'];
  id: Scalars['String'];
  isDeleted: Scalars['Boolean'];
  isExcludedFromSearch: Scalars['Boolean'];
  isPublished: Scalars['Boolean'];
  isSoldElsewhere: Scalars['Boolean'];
  isSuspended: Scalars['Boolean'];
  lastPerformanceReview?: Maybe<Scalars['timestamptz']>;
  listingType?: Maybe<Scalars['String']>;
  /** An object relationship */
  newsItem?: Maybe<News_Items>;
  productType?: Maybe<Scalars['String']>;
  /** An array relationship */
  productVariants: Array<Product_Variants>;
  /** An aggregate relationship */
  productVariants_aggregate: Product_Variants_Aggregate;
  /** An object relationship */
  promotedSlot?: Maybe<Promoted_Slots>;
  /** An object relationship */
  sellerLicense?: Maybe<User_Licenses>;
  sellerLicenseId?: Maybe<Scalars['String']>;
  soldOutStatus: Scalars['String'];
  /** An object relationship */
  store?: Maybe<Stores>;
  storeId: Scalars['String'];
  updatedAt?: Maybe<Scalars['timestamptz']>;
};


/** columns and relationships of "products" */
export type ProductsProductVariantsArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


/** columns and relationships of "products" */
export type ProductsProductVariants_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};

/** ordering options when selecting data from "products" */
export type ProductsOrderBy = {
  createdAt?: Maybe<OrderBy>;
  price?: Maybe<OrderBy>;
};

/** aggregated selection of "products" */
export type Products_Aggregate = {
  __typename?: 'products_aggregate';
  aggregate?: Maybe<Products_Aggregate_Fields>;
  nodes: Array<Products>;
};

/** aggregate fields of "products" */
export type Products_Aggregate_Fields = {
  __typename?: 'products_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Products_Max_Fields>;
  min?: Maybe<Products_Min_Fields>;
};


/** aggregate fields of "products" */
export type Products_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Products_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "products" */
export type Products_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Products_Max_Order_By>;
  min?: Maybe<Products_Min_Order_By>;
};

/** input type for inserting array relation for remote table "products" */
export type Products_Arr_Rel_Insert_Input = {
  data: Array<Products_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Products_On_Conflict>;
};

/** Boolean expression to filter rows from the table "products". All fields are combined with a logical 'AND'. */
export type Products_Bool_Exp = {
  _and?: Maybe<Array<Products_Bool_Exp>>;
  _not?: Maybe<Products_Bool_Exp>;
  _or?: Maybe<Array<Products_Bool_Exp>>;
  allowBids?: Maybe<Boolean_Comparison_Exp>;
  category?: Maybe<Categories_Bool_Exp>;
  categoryId?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  currentSnapshot?: Maybe<Product_Snapshots_Bool_Exp>;
  currentSnapshotId?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  isDeleted?: Maybe<Boolean_Comparison_Exp>;
  isExcludedFromSearch?: Maybe<Boolean_Comparison_Exp>;
  isPublished?: Maybe<Boolean_Comparison_Exp>;
  isSoldElsewhere?: Maybe<Boolean_Comparison_Exp>;
  isSuspended?: Maybe<Boolean_Comparison_Exp>;
  lastPerformanceReview?: Maybe<Timestamptz_Comparison_Exp>;
  listingType?: Maybe<String_Comparison_Exp>;
  newsItem?: Maybe<News_Items_Bool_Exp>;
  productType?: Maybe<String_Comparison_Exp>;
  productVariants?: Maybe<Product_Variants_Bool_Exp>;
  promotedSlot?: Maybe<Promoted_Slots_Bool_Exp>;
  sellerLicense?: Maybe<User_Licenses_Bool_Exp>;
  sellerLicenseId?: Maybe<String_Comparison_Exp>;
  soldOutStatus?: Maybe<String_Comparison_Exp>;
  store?: Maybe<Stores_Bool_Exp>;
  storeId?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "products" */
export enum Products_Constraint {
  /** unique or primary key constraint */
  PRODUCTS_PKEY = 'products_pkey'
}

/** input type for inserting data into table "products" */
export type Products_Insert_Input = {
  allowBids?: Maybe<Scalars['Boolean']>;
  category?: Maybe<Categories_Obj_Rel_Insert_Input>;
  categoryId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currentSnapshot?: Maybe<Product_Snapshots_Obj_Rel_Insert_Input>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  isExcludedFromSearch?: Maybe<Scalars['Boolean']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  isSoldElsewhere?: Maybe<Scalars['Boolean']>;
  isSuspended?: Maybe<Scalars['Boolean']>;
  lastPerformanceReview?: Maybe<Scalars['timestamptz']>;
  listingType?: Maybe<Scalars['String']>;
  newsItem?: Maybe<News_Items_Obj_Rel_Insert_Input>;
  productType?: Maybe<Scalars['String']>;
  productVariants?: Maybe<Product_Variants_Arr_Rel_Insert_Input>;
  promotedSlot?: Maybe<Promoted_Slots_Obj_Rel_Insert_Input>;
  sellerLicense?: Maybe<User_Licenses_Obj_Rel_Insert_Input>;
  sellerLicenseId?: Maybe<Scalars['String']>;
  soldOutStatus?: Maybe<Scalars['String']>;
  store?: Maybe<Stores_Obj_Rel_Insert_Input>;
  storeId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Products_Max_Fields = {
  __typename?: 'products_max_fields';
  categoryId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastPerformanceReview?: Maybe<Scalars['timestamptz']>;
  listingType?: Maybe<Scalars['String']>;
  productType?: Maybe<Scalars['String']>;
  sellerLicenseId?: Maybe<Scalars['String']>;
  soldOutStatus?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "products" */
export type Products_Max_Order_By = {
  categoryId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currentSnapshotId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  lastPerformanceReview?: Maybe<Order_By>;
  listingType?: Maybe<Order_By>;
  productType?: Maybe<Order_By>;
  sellerLicenseId?: Maybe<Order_By>;
  soldOutStatus?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Products_Min_Fields = {
  __typename?: 'products_min_fields';
  categoryId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastPerformanceReview?: Maybe<Scalars['timestamptz']>;
  listingType?: Maybe<Scalars['String']>;
  productType?: Maybe<Scalars['String']>;
  sellerLicenseId?: Maybe<Scalars['String']>;
  soldOutStatus?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "products" */
export type Products_Min_Order_By = {
  categoryId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currentSnapshotId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  lastPerformanceReview?: Maybe<Order_By>;
  listingType?: Maybe<Order_By>;
  productType?: Maybe<Order_By>;
  sellerLicenseId?: Maybe<Order_By>;
  soldOutStatus?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** response of any mutation on the table "products" */
export type Products_Mutation_Response = {
  __typename?: 'products_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Products>;
};

/** input type for inserting object relation for remote table "products" */
export type Products_Obj_Rel_Insert_Input = {
  data: Products_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Products_On_Conflict>;
};

/** on conflict condition type for table "products" */
export type Products_On_Conflict = {
  constraint: Products_Constraint;
  update_columns?: Array<Products_Update_Column>;
  where?: Maybe<Products_Bool_Exp>;
};

/** Ordering options when selecting data from "products". */
export type Products_Order_By = {
  allowBids?: Maybe<Order_By>;
  category?: Maybe<Categories_Order_By>;
  categoryId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currentSnapshot?: Maybe<Product_Snapshots_Order_By>;
  currentSnapshotId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  isDeleted?: Maybe<Order_By>;
  isExcludedFromSearch?: Maybe<Order_By>;
  isPublished?: Maybe<Order_By>;
  isSoldElsewhere?: Maybe<Order_By>;
  isSuspended?: Maybe<Order_By>;
  lastPerformanceReview?: Maybe<Order_By>;
  listingType?: Maybe<Order_By>;
  newsItem?: Maybe<News_Items_Order_By>;
  productType?: Maybe<Order_By>;
  productVariants_aggregate?: Maybe<Product_Variants_Aggregate_Order_By>;
  promotedSlot?: Maybe<Promoted_Slots_Order_By>;
  sellerLicense?: Maybe<User_Licenses_Order_By>;
  sellerLicenseId?: Maybe<Order_By>;
  soldOutStatus?: Maybe<Order_By>;
  store?: Maybe<Stores_Order_By>;
  storeId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** primary key columns input for table: products */
export type Products_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "products" */
export enum Products_Select_Column {
  /** column name */
  ALLOWBIDS = 'allowBids',
  /** column name */
  CATEGORYID = 'categoryId',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CURRENTSNAPSHOTID = 'currentSnapshotId',
  /** column name */
  ID = 'id',
  /** column name */
  ISDELETED = 'isDeleted',
  /** column name */
  ISEXCLUDEDFROMSEARCH = 'isExcludedFromSearch',
  /** column name */
  ISPUBLISHED = 'isPublished',
  /** column name */
  ISSOLDELSEWHERE = 'isSoldElsewhere',
  /** column name */
  ISSUSPENDED = 'isSuspended',
  /** column name */
  LASTPERFORMANCEREVIEW = 'lastPerformanceReview',
  /** column name */
  LISTINGTYPE = 'listingType',
  /** column name */
  PRODUCTTYPE = 'productType',
  /** column name */
  SELLERLICENSEID = 'sellerLicenseId',
  /** column name */
  SOLDOUTSTATUS = 'soldOutStatus',
  /** column name */
  STOREID = 'storeId',
  /** column name */
  UPDATEDAT = 'updatedAt'
}

/** input type for updating data in table "products" */
export type Products_Set_Input = {
  allowBids?: Maybe<Scalars['Boolean']>;
  categoryId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  isExcludedFromSearch?: Maybe<Scalars['Boolean']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  isSoldElsewhere?: Maybe<Scalars['Boolean']>;
  isSuspended?: Maybe<Scalars['Boolean']>;
  lastPerformanceReview?: Maybe<Scalars['timestamptz']>;
  listingType?: Maybe<Scalars['String']>;
  productType?: Maybe<Scalars['String']>;
  sellerLicenseId?: Maybe<Scalars['String']>;
  soldOutStatus?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "products" */
export enum Products_Update_Column {
  /** column name */
  ALLOWBIDS = 'allowBids',
  /** column name */
  CATEGORYID = 'categoryId',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CURRENTSNAPSHOTID = 'currentSnapshotId',
  /** column name */
  ID = 'id',
  /** column name */
  ISDELETED = 'isDeleted',
  /** column name */
  ISEXCLUDEDFROMSEARCH = 'isExcludedFromSearch',
  /** column name */
  ISPUBLISHED = 'isPublished',
  /** column name */
  ISSOLDELSEWHERE = 'isSoldElsewhere',
  /** column name */
  ISSUSPENDED = 'isSuspended',
  /** column name */
  LASTPERFORMANCEREVIEW = 'lastPerformanceReview',
  /** column name */
  LISTINGTYPE = 'listingType',
  /** column name */
  PRODUCTTYPE = 'productType',
  /** column name */
  SELLERLICENSEID = 'sellerLicenseId',
  /** column name */
  SOLDOUTSTATUS = 'soldOutStatus',
  /** column name */
  STOREID = 'storeId',
  /** column name */
  UPDATEDAT = 'updatedAt'
}

/** columns and relationships of "promoted_lists" */
export type Promoted_Lists = {
  __typename?: 'promoted_lists';
  cardsPerRow?: Maybe<Scalars['Int']>;
  categoryFilterSlug?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamptz'];
  id: Scalars['String'];
  numberOfSlots: Scalars['Int'];
  /** An array relationship */
  promotedSlots: Array<Promoted_Slots>;
  /** An aggregate relationship */
  promotedSlots_aggregate: Promoted_Slots_Aggregate;
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "promoted_lists" */
export type Promoted_ListsPromotedSlotsArgs = {
  distinct_on?: Maybe<Array<Promoted_Slots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Promoted_Slots_Order_By>>;
  where?: Maybe<Promoted_Slots_Bool_Exp>;
};


/** columns and relationships of "promoted_lists" */
export type Promoted_ListsPromotedSlots_AggregateArgs = {
  distinct_on?: Maybe<Array<Promoted_Slots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Promoted_Slots_Order_By>>;
  where?: Maybe<Promoted_Slots_Bool_Exp>;
};

/** aggregated selection of "promoted_lists" */
export type Promoted_Lists_Aggregate = {
  __typename?: 'promoted_lists_aggregate';
  aggregate?: Maybe<Promoted_Lists_Aggregate_Fields>;
  nodes: Array<Promoted_Lists>;
};

/** aggregate fields of "promoted_lists" */
export type Promoted_Lists_Aggregate_Fields = {
  __typename?: 'promoted_lists_aggregate_fields';
  avg?: Maybe<Promoted_Lists_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Promoted_Lists_Max_Fields>;
  min?: Maybe<Promoted_Lists_Min_Fields>;
  stddev?: Maybe<Promoted_Lists_Stddev_Fields>;
  stddev_pop?: Maybe<Promoted_Lists_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Promoted_Lists_Stddev_Samp_Fields>;
  sum?: Maybe<Promoted_Lists_Sum_Fields>;
  var_pop?: Maybe<Promoted_Lists_Var_Pop_Fields>;
  var_samp?: Maybe<Promoted_Lists_Var_Samp_Fields>;
  variance?: Maybe<Promoted_Lists_Variance_Fields>;
};


/** aggregate fields of "promoted_lists" */
export type Promoted_Lists_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Promoted_Lists_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Promoted_Lists_Avg_Fields = {
  __typename?: 'promoted_lists_avg_fields';
  cardsPerRow?: Maybe<Scalars['Float']>;
  numberOfSlots?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "promoted_lists". All fields are combined with a logical 'AND'. */
export type Promoted_Lists_Bool_Exp = {
  _and?: Maybe<Array<Promoted_Lists_Bool_Exp>>;
  _not?: Maybe<Promoted_Lists_Bool_Exp>;
  _or?: Maybe<Array<Promoted_Lists_Bool_Exp>>;
  cardsPerRow?: Maybe<Int_Comparison_Exp>;
  categoryFilterSlug?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  numberOfSlots?: Maybe<Int_Comparison_Exp>;
  promotedSlots?: Maybe<Promoted_Slots_Bool_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "promoted_lists" */
export enum Promoted_Lists_Constraint {
  /** unique or primary key constraint */
  PROMOTED_LISTS_PKEY = 'promoted_lists_pkey'
}

/** input type for incrementing numeric columns in table "promoted_lists" */
export type Promoted_Lists_Inc_Input = {
  cardsPerRow?: Maybe<Scalars['Int']>;
  numberOfSlots?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "promoted_lists" */
export type Promoted_Lists_Insert_Input = {
  cardsPerRow?: Maybe<Scalars['Int']>;
  categoryFilterSlug?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  numberOfSlots?: Maybe<Scalars['Int']>;
  promotedSlots?: Maybe<Promoted_Slots_Arr_Rel_Insert_Input>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Promoted_Lists_Max_Fields = {
  __typename?: 'promoted_lists_max_fields';
  cardsPerRow?: Maybe<Scalars['Int']>;
  categoryFilterSlug?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  numberOfSlots?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Promoted_Lists_Min_Fields = {
  __typename?: 'promoted_lists_min_fields';
  cardsPerRow?: Maybe<Scalars['Int']>;
  categoryFilterSlug?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  numberOfSlots?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "promoted_lists" */
export type Promoted_Lists_Mutation_Response = {
  __typename?: 'promoted_lists_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Promoted_Lists>;
};

/** input type for inserting object relation for remote table "promoted_lists" */
export type Promoted_Lists_Obj_Rel_Insert_Input = {
  data: Promoted_Lists_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Promoted_Lists_On_Conflict>;
};

/** on conflict condition type for table "promoted_lists" */
export type Promoted_Lists_On_Conflict = {
  constraint: Promoted_Lists_Constraint;
  update_columns?: Array<Promoted_Lists_Update_Column>;
  where?: Maybe<Promoted_Lists_Bool_Exp>;
};

/** Ordering options when selecting data from "promoted_lists". */
export type Promoted_Lists_Order_By = {
  cardsPerRow?: Maybe<Order_By>;
  categoryFilterSlug?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  numberOfSlots?: Maybe<Order_By>;
  promotedSlots_aggregate?: Maybe<Promoted_Slots_Aggregate_Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** primary key columns input for table: promoted_lists */
export type Promoted_Lists_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "promoted_lists" */
export enum Promoted_Lists_Select_Column {
  /** column name */
  CARDSPERROW = 'cardsPerRow',
  /** column name */
  CATEGORYFILTERSLUG = 'categoryFilterSlug',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  NUMBEROFSLOTS = 'numberOfSlots',
  /** column name */
  UPDATEDAT = 'updatedAt'
}

/** input type for updating data in table "promoted_lists" */
export type Promoted_Lists_Set_Input = {
  cardsPerRow?: Maybe<Scalars['Int']>;
  categoryFilterSlug?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  numberOfSlots?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Promoted_Lists_Stddev_Fields = {
  __typename?: 'promoted_lists_stddev_fields';
  cardsPerRow?: Maybe<Scalars['Float']>;
  numberOfSlots?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Promoted_Lists_Stddev_Pop_Fields = {
  __typename?: 'promoted_lists_stddev_pop_fields';
  cardsPerRow?: Maybe<Scalars['Float']>;
  numberOfSlots?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Promoted_Lists_Stddev_Samp_Fields = {
  __typename?: 'promoted_lists_stddev_samp_fields';
  cardsPerRow?: Maybe<Scalars['Float']>;
  numberOfSlots?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Promoted_Lists_Sum_Fields = {
  __typename?: 'promoted_lists_sum_fields';
  cardsPerRow?: Maybe<Scalars['Int']>;
  numberOfSlots?: Maybe<Scalars['Int']>;
};

/** update columns of table "promoted_lists" */
export enum Promoted_Lists_Update_Column {
  /** column name */
  CARDSPERROW = 'cardsPerRow',
  /** column name */
  CATEGORYFILTERSLUG = 'categoryFilterSlug',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  NUMBEROFSLOTS = 'numberOfSlots',
  /** column name */
  UPDATEDAT = 'updatedAt'
}

/** aggregate var_pop on columns */
export type Promoted_Lists_Var_Pop_Fields = {
  __typename?: 'promoted_lists_var_pop_fields';
  cardsPerRow?: Maybe<Scalars['Float']>;
  numberOfSlots?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Promoted_Lists_Var_Samp_Fields = {
  __typename?: 'promoted_lists_var_samp_fields';
  cardsPerRow?: Maybe<Scalars['Float']>;
  numberOfSlots?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Promoted_Lists_Variance_Fields = {
  __typename?: 'promoted_lists_variance_fields';
  cardsPerRow?: Maybe<Scalars['Float']>;
  numberOfSlots?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "promoted_slots" */
export type Promoted_Slots = {
  __typename?: 'promoted_slots';
  createdAt: Scalars['timestamptz'];
  durationInHours?: Maybe<Scalars['Int']>;
  expiresAt?: Maybe<Scalars['timestamptz']>;
  id: Scalars['String'];
  isAvailableForPurchase: Scalars['Boolean'];
  ownerId?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  /** An object relationship */
  product?: Maybe<Products>;
  productId?: Maybe<Scalars['String']>;
  promotedListId: Scalars['String'];
  reservePrice?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregated selection of "promoted_slots" */
export type Promoted_Slots_Aggregate = {
  __typename?: 'promoted_slots_aggregate';
  aggregate?: Maybe<Promoted_Slots_Aggregate_Fields>;
  nodes: Array<Promoted_Slots>;
};

/** aggregate fields of "promoted_slots" */
export type Promoted_Slots_Aggregate_Fields = {
  __typename?: 'promoted_slots_aggregate_fields';
  avg?: Maybe<Promoted_Slots_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Promoted_Slots_Max_Fields>;
  min?: Maybe<Promoted_Slots_Min_Fields>;
  stddev?: Maybe<Promoted_Slots_Stddev_Fields>;
  stddev_pop?: Maybe<Promoted_Slots_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Promoted_Slots_Stddev_Samp_Fields>;
  sum?: Maybe<Promoted_Slots_Sum_Fields>;
  var_pop?: Maybe<Promoted_Slots_Var_Pop_Fields>;
  var_samp?: Maybe<Promoted_Slots_Var_Samp_Fields>;
  variance?: Maybe<Promoted_Slots_Variance_Fields>;
};


/** aggregate fields of "promoted_slots" */
export type Promoted_Slots_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Promoted_Slots_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "promoted_slots" */
export type Promoted_Slots_Aggregate_Order_By = {
  avg?: Maybe<Promoted_Slots_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Promoted_Slots_Max_Order_By>;
  min?: Maybe<Promoted_Slots_Min_Order_By>;
  stddev?: Maybe<Promoted_Slots_Stddev_Order_By>;
  stddev_pop?: Maybe<Promoted_Slots_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Promoted_Slots_Stddev_Samp_Order_By>;
  sum?: Maybe<Promoted_Slots_Sum_Order_By>;
  var_pop?: Maybe<Promoted_Slots_Var_Pop_Order_By>;
  var_samp?: Maybe<Promoted_Slots_Var_Samp_Order_By>;
  variance?: Maybe<Promoted_Slots_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "promoted_slots" */
export type Promoted_Slots_Arr_Rel_Insert_Input = {
  data: Array<Promoted_Slots_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Promoted_Slots_On_Conflict>;
};

/** aggregate avg on columns */
export type Promoted_Slots_Avg_Fields = {
  __typename?: 'promoted_slots_avg_fields';
  durationInHours?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  reservePrice?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "promoted_slots" */
export type Promoted_Slots_Avg_Order_By = {
  durationInHours?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  reservePrice?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "promoted_slots". All fields are combined with a logical 'AND'. */
export type Promoted_Slots_Bool_Exp = {
  _and?: Maybe<Array<Promoted_Slots_Bool_Exp>>;
  _not?: Maybe<Promoted_Slots_Bool_Exp>;
  _or?: Maybe<Array<Promoted_Slots_Bool_Exp>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  durationInHours?: Maybe<Int_Comparison_Exp>;
  expiresAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  isAvailableForPurchase?: Maybe<Boolean_Comparison_Exp>;
  ownerId?: Maybe<String_Comparison_Exp>;
  position?: Maybe<Int_Comparison_Exp>;
  product?: Maybe<Products_Bool_Exp>;
  productId?: Maybe<String_Comparison_Exp>;
  promotedListId?: Maybe<String_Comparison_Exp>;
  reservePrice?: Maybe<Int_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "promoted_slots" */
export enum Promoted_Slots_Constraint {
  /** unique or primary key constraint */
  PROMOTED_SLOTS_PKEY = 'promoted_slots_pkey',
  /** unique or primary key constraint */
  PROMOTED_SLOTS_PROMOTED_LIST_ID_PRODUCT_ID_KEY = 'promoted_slots_promoted_list_id_product_id_key'
}

/** input type for incrementing numeric columns in table "promoted_slots" */
export type Promoted_Slots_Inc_Input = {
  durationInHours?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
  reservePrice?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "promoted_slots" */
export type Promoted_Slots_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  durationInHours?: Maybe<Scalars['Int']>;
  expiresAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  isAvailableForPurchase?: Maybe<Scalars['Boolean']>;
  ownerId?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  product?: Maybe<Products_Obj_Rel_Insert_Input>;
  productId?: Maybe<Scalars['String']>;
  promotedListId?: Maybe<Scalars['String']>;
  reservePrice?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Promoted_Slots_Max_Fields = {
  __typename?: 'promoted_slots_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  durationInHours?: Maybe<Scalars['Int']>;
  expiresAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  promotedListId?: Maybe<Scalars['String']>;
  reservePrice?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "promoted_slots" */
export type Promoted_Slots_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  durationInHours?: Maybe<Order_By>;
  expiresAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  ownerId?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  promotedListId?: Maybe<Order_By>;
  reservePrice?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Promoted_Slots_Min_Fields = {
  __typename?: 'promoted_slots_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  durationInHours?: Maybe<Scalars['Int']>;
  expiresAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  promotedListId?: Maybe<Scalars['String']>;
  reservePrice?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "promoted_slots" */
export type Promoted_Slots_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  durationInHours?: Maybe<Order_By>;
  expiresAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  ownerId?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  promotedListId?: Maybe<Order_By>;
  reservePrice?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "promoted_slots" */
export type Promoted_Slots_Mutation_Response = {
  __typename?: 'promoted_slots_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Promoted_Slots>;
};

/** input type for inserting object relation for remote table "promoted_slots" */
export type Promoted_Slots_Obj_Rel_Insert_Input = {
  data: Promoted_Slots_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Promoted_Slots_On_Conflict>;
};

/** on conflict condition type for table "promoted_slots" */
export type Promoted_Slots_On_Conflict = {
  constraint: Promoted_Slots_Constraint;
  update_columns?: Array<Promoted_Slots_Update_Column>;
  where?: Maybe<Promoted_Slots_Bool_Exp>;
};

/** Ordering options when selecting data from "promoted_slots". */
export type Promoted_Slots_Order_By = {
  createdAt?: Maybe<Order_By>;
  durationInHours?: Maybe<Order_By>;
  expiresAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  isAvailableForPurchase?: Maybe<Order_By>;
  ownerId?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  product?: Maybe<Products_Order_By>;
  productId?: Maybe<Order_By>;
  promotedListId?: Maybe<Order_By>;
  reservePrice?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: promoted_slots */
export type Promoted_Slots_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "promoted_slots" */
export enum Promoted_Slots_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  DURATIONINHOURS = 'durationInHours',
  /** column name */
  EXPIRESAT = 'expiresAt',
  /** column name */
  ID = 'id',
  /** column name */
  ISAVAILABLEFORPURCHASE = 'isAvailableForPurchase',
  /** column name */
  OWNERID = 'ownerId',
  /** column name */
  POSITION = 'position',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  PROMOTEDLISTID = 'promotedListId',
  /** column name */
  RESERVEPRICE = 'reservePrice',
  /** column name */
  UPDATED_AT = 'updated_at'
}

/** input type for updating data in table "promoted_slots" */
export type Promoted_Slots_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  durationInHours?: Maybe<Scalars['Int']>;
  expiresAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  isAvailableForPurchase?: Maybe<Scalars['Boolean']>;
  ownerId?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  promotedListId?: Maybe<Scalars['String']>;
  reservePrice?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Promoted_Slots_Stddev_Fields = {
  __typename?: 'promoted_slots_stddev_fields';
  durationInHours?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  reservePrice?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "promoted_slots" */
export type Promoted_Slots_Stddev_Order_By = {
  durationInHours?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  reservePrice?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Promoted_Slots_Stddev_Pop_Fields = {
  __typename?: 'promoted_slots_stddev_pop_fields';
  durationInHours?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  reservePrice?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "promoted_slots" */
export type Promoted_Slots_Stddev_Pop_Order_By = {
  durationInHours?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  reservePrice?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Promoted_Slots_Stddev_Samp_Fields = {
  __typename?: 'promoted_slots_stddev_samp_fields';
  durationInHours?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  reservePrice?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "promoted_slots" */
export type Promoted_Slots_Stddev_Samp_Order_By = {
  durationInHours?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  reservePrice?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Promoted_Slots_Sum_Fields = {
  __typename?: 'promoted_slots_sum_fields';
  durationInHours?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
  reservePrice?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "promoted_slots" */
export type Promoted_Slots_Sum_Order_By = {
  durationInHours?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  reservePrice?: Maybe<Order_By>;
};

/** update columns of table "promoted_slots" */
export enum Promoted_Slots_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  DURATIONINHOURS = 'durationInHours',
  /** column name */
  EXPIRESAT = 'expiresAt',
  /** column name */
  ID = 'id',
  /** column name */
  ISAVAILABLEFORPURCHASE = 'isAvailableForPurchase',
  /** column name */
  OWNERID = 'ownerId',
  /** column name */
  POSITION = 'position',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  PROMOTEDLISTID = 'promotedListId',
  /** column name */
  RESERVEPRICE = 'reservePrice',
  /** column name */
  UPDATED_AT = 'updated_at'
}

/** aggregate var_pop on columns */
export type Promoted_Slots_Var_Pop_Fields = {
  __typename?: 'promoted_slots_var_pop_fields';
  durationInHours?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  reservePrice?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "promoted_slots" */
export type Promoted_Slots_Var_Pop_Order_By = {
  durationInHours?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  reservePrice?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Promoted_Slots_Var_Samp_Fields = {
  __typename?: 'promoted_slots_var_samp_fields';
  durationInHours?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  reservePrice?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "promoted_slots" */
export type Promoted_Slots_Var_Samp_Order_By = {
  durationInHours?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  reservePrice?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Promoted_Slots_Variance_Fields = {
  __typename?: 'promoted_slots_variance_fields';
  durationInHours?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  reservePrice?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "promoted_slots" */
export type Promoted_Slots_Variance_Order_By = {
  durationInHours?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  reservePrice?: Maybe<Order_By>;
};

/** columns and relationships of "promotion_purchases" */
export type Promotion_Purchases = {
  __typename?: 'promotion_purchases';
  buyerId: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  currency: Scalars['String'];
  durationInHours?: Maybe<Scalars['Int']>;
  fees: Scalars['Int'];
  id: Scalars['String'];
  paymentIntentId: Scalars['String'];
  productId?: Maybe<Scalars['String']>;
  promotedListId: Scalars['String'];
  promotedSlotId: Scalars['String'];
  total: Scalars['Int'];
};

/** aggregated selection of "promotion_purchases" */
export type Promotion_Purchases_Aggregate = {
  __typename?: 'promotion_purchases_aggregate';
  aggregate?: Maybe<Promotion_Purchases_Aggregate_Fields>;
  nodes: Array<Promotion_Purchases>;
};

/** aggregate fields of "promotion_purchases" */
export type Promotion_Purchases_Aggregate_Fields = {
  __typename?: 'promotion_purchases_aggregate_fields';
  avg?: Maybe<Promotion_Purchases_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Promotion_Purchases_Max_Fields>;
  min?: Maybe<Promotion_Purchases_Min_Fields>;
  stddev?: Maybe<Promotion_Purchases_Stddev_Fields>;
  stddev_pop?: Maybe<Promotion_Purchases_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Promotion_Purchases_Stddev_Samp_Fields>;
  sum?: Maybe<Promotion_Purchases_Sum_Fields>;
  var_pop?: Maybe<Promotion_Purchases_Var_Pop_Fields>;
  var_samp?: Maybe<Promotion_Purchases_Var_Samp_Fields>;
  variance?: Maybe<Promotion_Purchases_Variance_Fields>;
};


/** aggregate fields of "promotion_purchases" */
export type Promotion_Purchases_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Promotion_Purchases_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Promotion_Purchases_Avg_Fields = {
  __typename?: 'promotion_purchases_avg_fields';
  durationInHours?: Maybe<Scalars['Float']>;
  fees?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "promotion_purchases". All fields are combined with a logical 'AND'. */
export type Promotion_Purchases_Bool_Exp = {
  _and?: Maybe<Array<Promotion_Purchases_Bool_Exp>>;
  _not?: Maybe<Promotion_Purchases_Bool_Exp>;
  _or?: Maybe<Array<Promotion_Purchases_Bool_Exp>>;
  buyerId?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  currency?: Maybe<String_Comparison_Exp>;
  durationInHours?: Maybe<Int_Comparison_Exp>;
  fees?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  paymentIntentId?: Maybe<String_Comparison_Exp>;
  productId?: Maybe<String_Comparison_Exp>;
  promotedListId?: Maybe<String_Comparison_Exp>;
  promotedSlotId?: Maybe<String_Comparison_Exp>;
  total?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "promotion_purchases" */
export enum Promotion_Purchases_Constraint {
  /** unique or primary key constraint */
  PROMOTION_PURCHASES_PKEY = 'promotion_purchases_pkey'
}

/** input type for incrementing numeric columns in table "promotion_purchases" */
export type Promotion_Purchases_Inc_Input = {
  durationInHours?: Maybe<Scalars['Int']>;
  fees?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "promotion_purchases" */
export type Promotion_Purchases_Insert_Input = {
  buyerId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currency?: Maybe<Scalars['String']>;
  durationInHours?: Maybe<Scalars['Int']>;
  fees?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  promotedListId?: Maybe<Scalars['String']>;
  promotedSlotId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Promotion_Purchases_Max_Fields = {
  __typename?: 'promotion_purchases_max_fields';
  buyerId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currency?: Maybe<Scalars['String']>;
  durationInHours?: Maybe<Scalars['Int']>;
  fees?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  promotedListId?: Maybe<Scalars['String']>;
  promotedSlotId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Promotion_Purchases_Min_Fields = {
  __typename?: 'promotion_purchases_min_fields';
  buyerId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currency?: Maybe<Scalars['String']>;
  durationInHours?: Maybe<Scalars['Int']>;
  fees?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  promotedListId?: Maybe<Scalars['String']>;
  promotedSlotId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "promotion_purchases" */
export type Promotion_Purchases_Mutation_Response = {
  __typename?: 'promotion_purchases_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Promotion_Purchases>;
};

/** on conflict condition type for table "promotion_purchases" */
export type Promotion_Purchases_On_Conflict = {
  constraint: Promotion_Purchases_Constraint;
  update_columns?: Array<Promotion_Purchases_Update_Column>;
  where?: Maybe<Promotion_Purchases_Bool_Exp>;
};

/** Ordering options when selecting data from "promotion_purchases". */
export type Promotion_Purchases_Order_By = {
  buyerId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currency?: Maybe<Order_By>;
  durationInHours?: Maybe<Order_By>;
  fees?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  paymentIntentId?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  promotedListId?: Maybe<Order_By>;
  promotedSlotId?: Maybe<Order_By>;
  total?: Maybe<Order_By>;
};

/** primary key columns input for table: promotion_purchases */
export type Promotion_Purchases_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "promotion_purchases" */
export enum Promotion_Purchases_Select_Column {
  /** column name */
  BUYERID = 'buyerId',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CURRENCY = 'currency',
  /** column name */
  DURATIONINHOURS = 'durationInHours',
  /** column name */
  FEES = 'fees',
  /** column name */
  ID = 'id',
  /** column name */
  PAYMENTINTENTID = 'paymentIntentId',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  PROMOTEDLISTID = 'promotedListId',
  /** column name */
  PROMOTEDSLOTID = 'promotedSlotId',
  /** column name */
  TOTAL = 'total'
}

/** input type for updating data in table "promotion_purchases" */
export type Promotion_Purchases_Set_Input = {
  buyerId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currency?: Maybe<Scalars['String']>;
  durationInHours?: Maybe<Scalars['Int']>;
  fees?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  promotedListId?: Maybe<Scalars['String']>;
  promotedSlotId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Promotion_Purchases_Stddev_Fields = {
  __typename?: 'promotion_purchases_stddev_fields';
  durationInHours?: Maybe<Scalars['Float']>;
  fees?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Promotion_Purchases_Stddev_Pop_Fields = {
  __typename?: 'promotion_purchases_stddev_pop_fields';
  durationInHours?: Maybe<Scalars['Float']>;
  fees?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Promotion_Purchases_Stddev_Samp_Fields = {
  __typename?: 'promotion_purchases_stddev_samp_fields';
  durationInHours?: Maybe<Scalars['Float']>;
  fees?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Promotion_Purchases_Sum_Fields = {
  __typename?: 'promotion_purchases_sum_fields';
  durationInHours?: Maybe<Scalars['Int']>;
  fees?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

/** update columns of table "promotion_purchases" */
export enum Promotion_Purchases_Update_Column {
  /** column name */
  BUYERID = 'buyerId',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CURRENCY = 'currency',
  /** column name */
  DURATIONINHOURS = 'durationInHours',
  /** column name */
  FEES = 'fees',
  /** column name */
  ID = 'id',
  /** column name */
  PAYMENTINTENTID = 'paymentIntentId',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  PROMOTEDLISTID = 'promotedListId',
  /** column name */
  PROMOTEDSLOTID = 'promotedSlotId',
  /** column name */
  TOTAL = 'total'
}

/** aggregate var_pop on columns */
export type Promotion_Purchases_Var_Pop_Fields = {
  __typename?: 'promotion_purchases_var_pop_fields';
  durationInHours?: Maybe<Scalars['Float']>;
  fees?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Promotion_Purchases_Var_Samp_Fields = {
  __typename?: 'promotion_purchases_var_samp_fields';
  durationInHours?: Maybe<Scalars['Float']>;
  fees?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Promotion_Purchases_Variance_Fields = {
  __typename?: 'promotion_purchases_variance_fields';
  durationInHours?: Maybe<Scalars['Float']>;
  fees?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "ratings" */
export type Ratings = {
  __typename?: 'ratings';
  createdAt: Scalars['timestamptz'];
  id: Scalars['String'];
  orderId?: Maybe<Scalars['String']>;
  rateeId: Scalars['String'];
  raterId: Scalars['String'];
  score: Scalars['numeric'];
};

/** aggregated selection of "ratings" */
export type Ratings_Aggregate = {
  __typename?: 'ratings_aggregate';
  aggregate?: Maybe<Ratings_Aggregate_Fields>;
  nodes: Array<Ratings>;
};

/** aggregate fields of "ratings" */
export type Ratings_Aggregate_Fields = {
  __typename?: 'ratings_aggregate_fields';
  avg?: Maybe<Ratings_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Ratings_Max_Fields>;
  min?: Maybe<Ratings_Min_Fields>;
  stddev?: Maybe<Ratings_Stddev_Fields>;
  stddev_pop?: Maybe<Ratings_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Ratings_Stddev_Samp_Fields>;
  sum?: Maybe<Ratings_Sum_Fields>;
  var_pop?: Maybe<Ratings_Var_Pop_Fields>;
  var_samp?: Maybe<Ratings_Var_Samp_Fields>;
  variance?: Maybe<Ratings_Variance_Fields>;
};


/** aggregate fields of "ratings" */
export type Ratings_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Ratings_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Ratings_Avg_Fields = {
  __typename?: 'ratings_avg_fields';
  score?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "ratings". All fields are combined with a logical 'AND'. */
export type Ratings_Bool_Exp = {
  _and?: Maybe<Array<Ratings_Bool_Exp>>;
  _not?: Maybe<Ratings_Bool_Exp>;
  _or?: Maybe<Array<Ratings_Bool_Exp>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  orderId?: Maybe<String_Comparison_Exp>;
  rateeId?: Maybe<String_Comparison_Exp>;
  raterId?: Maybe<String_Comparison_Exp>;
  score?: Maybe<Numeric_Comparison_Exp>;
};

/** unique or primary key constraints on table "ratings" */
export enum Ratings_Constraint {
  /** unique or primary key constraint */
  RATINGS_PKEY = 'ratings_pkey'
}

/** input type for incrementing numeric columns in table "ratings" */
export type Ratings_Inc_Input = {
  score?: Maybe<Scalars['numeric']>;
};

/** input type for inserting data into table "ratings" */
export type Ratings_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  rateeId?: Maybe<Scalars['String']>;
  raterId?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['numeric']>;
};

/** aggregate max on columns */
export type Ratings_Max_Fields = {
  __typename?: 'ratings_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  rateeId?: Maybe<Scalars['String']>;
  raterId?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['numeric']>;
};

/** aggregate min on columns */
export type Ratings_Min_Fields = {
  __typename?: 'ratings_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  rateeId?: Maybe<Scalars['String']>;
  raterId?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['numeric']>;
};

/** response of any mutation on the table "ratings" */
export type Ratings_Mutation_Response = {
  __typename?: 'ratings_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Ratings>;
};

/** on conflict condition type for table "ratings" */
export type Ratings_On_Conflict = {
  constraint: Ratings_Constraint;
  update_columns?: Array<Ratings_Update_Column>;
  where?: Maybe<Ratings_Bool_Exp>;
};

/** Ordering options when selecting data from "ratings". */
export type Ratings_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  orderId?: Maybe<Order_By>;
  rateeId?: Maybe<Order_By>;
  raterId?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** primary key columns input for table: ratings */
export type Ratings_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "ratings" */
export enum Ratings_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  ORDERID = 'orderId',
  /** column name */
  RATEEID = 'rateeId',
  /** column name */
  RATERID = 'raterId',
  /** column name */
  SCORE = 'score'
}

/** input type for updating data in table "ratings" */
export type Ratings_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  rateeId?: Maybe<Scalars['String']>;
  raterId?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['numeric']>;
};

/** aggregate stddev on columns */
export type Ratings_Stddev_Fields = {
  __typename?: 'ratings_stddev_fields';
  score?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Ratings_Stddev_Pop_Fields = {
  __typename?: 'ratings_stddev_pop_fields';
  score?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Ratings_Stddev_Samp_Fields = {
  __typename?: 'ratings_stddev_samp_fields';
  score?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Ratings_Sum_Fields = {
  __typename?: 'ratings_sum_fields';
  score?: Maybe<Scalars['numeric']>;
};

/** update columns of table "ratings" */
export enum Ratings_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  ORDERID = 'orderId',
  /** column name */
  RATEEID = 'rateeId',
  /** column name */
  RATERID = 'raterId',
  /** column name */
  SCORE = 'score'
}

/** aggregate var_pop on columns */
export type Ratings_Var_Pop_Fields = {
  __typename?: 'ratings_var_pop_fields';
  score?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Ratings_Var_Samp_Fields = {
  __typename?: 'ratings_var_samp_fields';
  score?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Ratings_Variance_Fields = {
  __typename?: 'ratings_variance_fields';
  score?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "refunds" */
export type Refunds = {
  __typename?: 'refunds';
  createdAt: Scalars['timestamp'];
  id: Scalars['String'];
  orderId: Scalars['String'];
  reason: Scalars['String'];
  reasonDetails: Scalars['String'];
  receiptNumber: Scalars['String'];
  transactionId: Scalars['String'];
};

/** aggregated selection of "refunds" */
export type Refunds_Aggregate = {
  __typename?: 'refunds_aggregate';
  aggregate?: Maybe<Refunds_Aggregate_Fields>;
  nodes: Array<Refunds>;
};

/** aggregate fields of "refunds" */
export type Refunds_Aggregate_Fields = {
  __typename?: 'refunds_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Refunds_Max_Fields>;
  min?: Maybe<Refunds_Min_Fields>;
};


/** aggregate fields of "refunds" */
export type Refunds_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Refunds_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "refunds". All fields are combined with a logical 'AND'. */
export type Refunds_Bool_Exp = {
  _and?: Maybe<Array<Refunds_Bool_Exp>>;
  _not?: Maybe<Refunds_Bool_Exp>;
  _or?: Maybe<Array<Refunds_Bool_Exp>>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  orderId?: Maybe<String_Comparison_Exp>;
  reason?: Maybe<String_Comparison_Exp>;
  reasonDetails?: Maybe<String_Comparison_Exp>;
  receiptNumber?: Maybe<String_Comparison_Exp>;
  transactionId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "refunds" */
export enum Refunds_Constraint {
  /** unique or primary key constraint */
  REFUNDS_PKEY = 'refunds_pkey'
}

/** input type for inserting data into table "refunds" */
export type Refunds_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  reasonDetails?: Maybe<Scalars['String']>;
  receiptNumber?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Refunds_Max_Fields = {
  __typename?: 'refunds_max_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  reasonDetails?: Maybe<Scalars['String']>;
  receiptNumber?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Refunds_Min_Fields = {
  __typename?: 'refunds_min_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  reasonDetails?: Maybe<Scalars['String']>;
  receiptNumber?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "refunds" */
export type Refunds_Mutation_Response = {
  __typename?: 'refunds_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Refunds>;
};

/** input type for inserting object relation for remote table "refunds" */
export type Refunds_Obj_Rel_Insert_Input = {
  data: Refunds_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Refunds_On_Conflict>;
};

/** on conflict condition type for table "refunds" */
export type Refunds_On_Conflict = {
  constraint: Refunds_Constraint;
  update_columns?: Array<Refunds_Update_Column>;
  where?: Maybe<Refunds_Bool_Exp>;
};

/** Ordering options when selecting data from "refunds". */
export type Refunds_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  orderId?: Maybe<Order_By>;
  reason?: Maybe<Order_By>;
  reasonDetails?: Maybe<Order_By>;
  receiptNumber?: Maybe<Order_By>;
  transactionId?: Maybe<Order_By>;
};

/** primary key columns input for table: refunds */
export type Refunds_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "refunds" */
export enum Refunds_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  ORDERID = 'orderId',
  /** column name */
  REASON = 'reason',
  /** column name */
  REASONDETAILS = 'reasonDetails',
  /** column name */
  RECEIPTNUMBER = 'receiptNumber',
  /** column name */
  TRANSACTIONID = 'transactionId'
}

/** input type for updating data in table "refunds" */
export type Refunds_Set_Input = {
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  reasonDetails?: Maybe<Scalars['String']>;
  receiptNumber?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['String']>;
};

/** update columns of table "refunds" */
export enum Refunds_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  ORDERID = 'orderId',
  /** column name */
  REASON = 'reason',
  /** column name */
  REASONDETAILS = 'reasonDetails',
  /** column name */
  RECEIPTNUMBER = 'receiptNumber',
  /** column name */
  TRANSACTIONID = 'transactionId'
}

/** columns and relationships of "saved_search_hits" */
export type Saved_Search_Hits = {
  __typename?: 'saved_search_hits';
  createdAt: Scalars['timestamptz'];
  emailSent?: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  externalProduct?: Maybe<External_Products>;
  externalProductId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  /** An object relationship */
  product?: Maybe<Products>;
  productId?: Maybe<Scalars['String']>;
  productTitle: Scalars['String'];
  /** An object relationship */
  savedSearch?: Maybe<Saved_Searches>;
  savedSearchId: Scalars['String'];
  seen?: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  user?: Maybe<Users>;
  userId: Scalars['String'];
};

/** aggregated selection of "saved_search_hits" */
export type Saved_Search_Hits_Aggregate = {
  __typename?: 'saved_search_hits_aggregate';
  aggregate?: Maybe<Saved_Search_Hits_Aggregate_Fields>;
  nodes: Array<Saved_Search_Hits>;
};

/** aggregate fields of "saved_search_hits" */
export type Saved_Search_Hits_Aggregate_Fields = {
  __typename?: 'saved_search_hits_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Saved_Search_Hits_Max_Fields>;
  min?: Maybe<Saved_Search_Hits_Min_Fields>;
};


/** aggregate fields of "saved_search_hits" */
export type Saved_Search_Hits_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Saved_Search_Hits_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "saved_search_hits". All fields are combined with a logical 'AND'. */
export type Saved_Search_Hits_Bool_Exp = {
  _and?: Maybe<Array<Saved_Search_Hits_Bool_Exp>>;
  _not?: Maybe<Saved_Search_Hits_Bool_Exp>;
  _or?: Maybe<Array<Saved_Search_Hits_Bool_Exp>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  emailSent?: Maybe<Boolean_Comparison_Exp>;
  externalProduct?: Maybe<External_Products_Bool_Exp>;
  externalProductId?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  product?: Maybe<Products_Bool_Exp>;
  productId?: Maybe<String_Comparison_Exp>;
  productTitle?: Maybe<String_Comparison_Exp>;
  savedSearch?: Maybe<Saved_Searches_Bool_Exp>;
  savedSearchId?: Maybe<String_Comparison_Exp>;
  seen?: Maybe<Boolean_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  userId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "saved_search_hits" */
export enum Saved_Search_Hits_Constraint {
  /** unique or primary key constraint */
  SAVED_SEARCH_HITS_PKEY = 'saved_search_hits_pkey'
}

/** input type for inserting data into table "saved_search_hits" */
export type Saved_Search_Hits_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  emailSent?: Maybe<Scalars['Boolean']>;
  externalProduct?: Maybe<External_Products_Obj_Rel_Insert_Input>;
  externalProductId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  product?: Maybe<Products_Obj_Rel_Insert_Input>;
  productId?: Maybe<Scalars['String']>;
  productTitle?: Maybe<Scalars['String']>;
  savedSearch?: Maybe<Saved_Searches_Obj_Rel_Insert_Input>;
  savedSearchId?: Maybe<Scalars['String']>;
  seen?: Maybe<Scalars['Boolean']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Saved_Search_Hits_Max_Fields = {
  __typename?: 'saved_search_hits_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  externalProductId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productTitle?: Maybe<Scalars['String']>;
  savedSearchId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Saved_Search_Hits_Min_Fields = {
  __typename?: 'saved_search_hits_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  externalProductId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productTitle?: Maybe<Scalars['String']>;
  savedSearchId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "saved_search_hits" */
export type Saved_Search_Hits_Mutation_Response = {
  __typename?: 'saved_search_hits_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Saved_Search_Hits>;
};

/** on conflict condition type for table "saved_search_hits" */
export type Saved_Search_Hits_On_Conflict = {
  constraint: Saved_Search_Hits_Constraint;
  update_columns?: Array<Saved_Search_Hits_Update_Column>;
  where?: Maybe<Saved_Search_Hits_Bool_Exp>;
};

/** Ordering options when selecting data from "saved_search_hits". */
export type Saved_Search_Hits_Order_By = {
  createdAt?: Maybe<Order_By>;
  emailSent?: Maybe<Order_By>;
  externalProduct?: Maybe<External_Products_Order_By>;
  externalProductId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  product?: Maybe<Products_Order_By>;
  productId?: Maybe<Order_By>;
  productTitle?: Maybe<Order_By>;
  savedSearch?: Maybe<Saved_Searches_Order_By>;
  savedSearchId?: Maybe<Order_By>;
  seen?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: saved_search_hits */
export type Saved_Search_Hits_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "saved_search_hits" */
export enum Saved_Search_Hits_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  EMAILSENT = 'emailSent',
  /** column name */
  EXTERNALPRODUCTID = 'externalProductId',
  /** column name */
  ID = 'id',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  PRODUCTTITLE = 'productTitle',
  /** column name */
  SAVEDSEARCHID = 'savedSearchId',
  /** column name */
  SEEN = 'seen',
  /** column name */
  USERID = 'userId'
}

/** input type for updating data in table "saved_search_hits" */
export type Saved_Search_Hits_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  emailSent?: Maybe<Scalars['Boolean']>;
  externalProductId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productTitle?: Maybe<Scalars['String']>;
  savedSearchId?: Maybe<Scalars['String']>;
  seen?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['String']>;
};

/** update columns of table "saved_search_hits" */
export enum Saved_Search_Hits_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  EMAILSENT = 'emailSent',
  /** column name */
  EXTERNALPRODUCTID = 'externalProductId',
  /** column name */
  ID = 'id',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  PRODUCTTITLE = 'productTitle',
  /** column name */
  SAVEDSEARCHID = 'savedSearchId',
  /** column name */
  SEEN = 'seen',
  /** column name */
  USERID = 'userId'
}

/** columns and relationships of "saved_searches" */
export type Saved_Searches = {
  __typename?: 'saved_searches';
  caliber?: Maybe<Scalars['String']>;
  categorySlug?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamptz'];
  dealerState?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isDeleted?: Maybe<Scalars['Boolean']>;
  make?: Maybe<Scalars['String']>;
  matchesNeeded?: Maybe<Scalars['Int']>;
  model?: Maybe<Scalars['String']>;
  searchTerm?: Maybe<Scalars['String']>;
  /** An object relationship */
  user?: Maybe<Users>;
  userId: Scalars['String'];
};

/** aggregated selection of "saved_searches" */
export type Saved_Searches_Aggregate = {
  __typename?: 'saved_searches_aggregate';
  aggregate?: Maybe<Saved_Searches_Aggregate_Fields>;
  nodes: Array<Saved_Searches>;
};

/** aggregate fields of "saved_searches" */
export type Saved_Searches_Aggregate_Fields = {
  __typename?: 'saved_searches_aggregate_fields';
  avg?: Maybe<Saved_Searches_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Saved_Searches_Max_Fields>;
  min?: Maybe<Saved_Searches_Min_Fields>;
  stddev?: Maybe<Saved_Searches_Stddev_Fields>;
  stddev_pop?: Maybe<Saved_Searches_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Saved_Searches_Stddev_Samp_Fields>;
  sum?: Maybe<Saved_Searches_Sum_Fields>;
  var_pop?: Maybe<Saved_Searches_Var_Pop_Fields>;
  var_samp?: Maybe<Saved_Searches_Var_Samp_Fields>;
  variance?: Maybe<Saved_Searches_Variance_Fields>;
};


/** aggregate fields of "saved_searches" */
export type Saved_Searches_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Saved_Searches_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Saved_Searches_Avg_Fields = {
  __typename?: 'saved_searches_avg_fields';
  matchesNeeded?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "saved_searches". All fields are combined with a logical 'AND'. */
export type Saved_Searches_Bool_Exp = {
  _and?: Maybe<Array<Saved_Searches_Bool_Exp>>;
  _not?: Maybe<Saved_Searches_Bool_Exp>;
  _or?: Maybe<Array<Saved_Searches_Bool_Exp>>;
  caliber?: Maybe<String_Comparison_Exp>;
  categorySlug?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  dealerState?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  isDeleted?: Maybe<Boolean_Comparison_Exp>;
  make?: Maybe<String_Comparison_Exp>;
  matchesNeeded?: Maybe<Int_Comparison_Exp>;
  model?: Maybe<String_Comparison_Exp>;
  searchTerm?: Maybe<String_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  userId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "saved_searches" */
export enum Saved_Searches_Constraint {
  /** unique or primary key constraint */
  SAVED_SEARCHES_PKEY = 'saved_searches_pkey'
}

/** input type for incrementing numeric columns in table "saved_searches" */
export type Saved_Searches_Inc_Input = {
  matchesNeeded?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "saved_searches" */
export type Saved_Searches_Insert_Input = {
  caliber?: Maybe<Scalars['String']>;
  categorySlug?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  dealerState?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  make?: Maybe<Scalars['String']>;
  matchesNeeded?: Maybe<Scalars['Int']>;
  model?: Maybe<Scalars['String']>;
  searchTerm?: Maybe<Scalars['String']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Saved_Searches_Max_Fields = {
  __typename?: 'saved_searches_max_fields';
  caliber?: Maybe<Scalars['String']>;
  categorySlug?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  dealerState?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  matchesNeeded?: Maybe<Scalars['Int']>;
  model?: Maybe<Scalars['String']>;
  searchTerm?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Saved_Searches_Min_Fields = {
  __typename?: 'saved_searches_min_fields';
  caliber?: Maybe<Scalars['String']>;
  categorySlug?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  dealerState?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  matchesNeeded?: Maybe<Scalars['Int']>;
  model?: Maybe<Scalars['String']>;
  searchTerm?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "saved_searches" */
export type Saved_Searches_Mutation_Response = {
  __typename?: 'saved_searches_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Saved_Searches>;
};

/** input type for inserting object relation for remote table "saved_searches" */
export type Saved_Searches_Obj_Rel_Insert_Input = {
  data: Saved_Searches_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Saved_Searches_On_Conflict>;
};

/** on conflict condition type for table "saved_searches" */
export type Saved_Searches_On_Conflict = {
  constraint: Saved_Searches_Constraint;
  update_columns?: Array<Saved_Searches_Update_Column>;
  where?: Maybe<Saved_Searches_Bool_Exp>;
};

/** Ordering options when selecting data from "saved_searches". */
export type Saved_Searches_Order_By = {
  caliber?: Maybe<Order_By>;
  categorySlug?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  dealerState?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  isDeleted?: Maybe<Order_By>;
  make?: Maybe<Order_By>;
  matchesNeeded?: Maybe<Order_By>;
  model?: Maybe<Order_By>;
  searchTerm?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: saved_searches */
export type Saved_Searches_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "saved_searches" */
export enum Saved_Searches_Select_Column {
  /** column name */
  CALIBER = 'caliber',
  /** column name */
  CATEGORYSLUG = 'categorySlug',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  DEALERSTATE = 'dealerState',
  /** column name */
  ID = 'id',
  /** column name */
  ISDELETED = 'isDeleted',
  /** column name */
  MAKE = 'make',
  /** column name */
  MATCHESNEEDED = 'matchesNeeded',
  /** column name */
  MODEL = 'model',
  /** column name */
  SEARCHTERM = 'searchTerm',
  /** column name */
  USERID = 'userId'
}

/** input type for updating data in table "saved_searches" */
export type Saved_Searches_Set_Input = {
  caliber?: Maybe<Scalars['String']>;
  categorySlug?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  dealerState?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  make?: Maybe<Scalars['String']>;
  matchesNeeded?: Maybe<Scalars['Int']>;
  model?: Maybe<Scalars['String']>;
  searchTerm?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Saved_Searches_Stddev_Fields = {
  __typename?: 'saved_searches_stddev_fields';
  matchesNeeded?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Saved_Searches_Stddev_Pop_Fields = {
  __typename?: 'saved_searches_stddev_pop_fields';
  matchesNeeded?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Saved_Searches_Stddev_Samp_Fields = {
  __typename?: 'saved_searches_stddev_samp_fields';
  matchesNeeded?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Saved_Searches_Sum_Fields = {
  __typename?: 'saved_searches_sum_fields';
  matchesNeeded?: Maybe<Scalars['Int']>;
};

/** update columns of table "saved_searches" */
export enum Saved_Searches_Update_Column {
  /** column name */
  CALIBER = 'caliber',
  /** column name */
  CATEGORYSLUG = 'categorySlug',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  DEALERSTATE = 'dealerState',
  /** column name */
  ID = 'id',
  /** column name */
  ISDELETED = 'isDeleted',
  /** column name */
  MAKE = 'make',
  /** column name */
  MATCHESNEEDED = 'matchesNeeded',
  /** column name */
  MODEL = 'model',
  /** column name */
  SEARCHTERM = 'searchTerm',
  /** column name */
  USERID = 'userId'
}

/** aggregate var_pop on columns */
export type Saved_Searches_Var_Pop_Fields = {
  __typename?: 'saved_searches_var_pop_fields';
  matchesNeeded?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Saved_Searches_Var_Samp_Fields = {
  __typename?: 'saved_searches_var_samp_fields';
  matchesNeeded?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Saved_Searches_Variance_Fields = {
  __typename?: 'saved_searches_variance_fields';
  matchesNeeded?: Maybe<Scalars['Float']>;
};


/** columns and relationships of "signup_emails" */
export type Signup_Emails = {
  __typename?: 'signup_emails';
  createdAt: Scalars['timestamptz'];
  email: Scalars['String'];
  id: Scalars['String'];
};

/** aggregated selection of "signup_emails" */
export type Signup_Emails_Aggregate = {
  __typename?: 'signup_emails_aggregate';
  aggregate?: Maybe<Signup_Emails_Aggregate_Fields>;
  nodes: Array<Signup_Emails>;
};

/** aggregate fields of "signup_emails" */
export type Signup_Emails_Aggregate_Fields = {
  __typename?: 'signup_emails_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Signup_Emails_Max_Fields>;
  min?: Maybe<Signup_Emails_Min_Fields>;
};


/** aggregate fields of "signup_emails" */
export type Signup_Emails_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Signup_Emails_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "signup_emails". All fields are combined with a logical 'AND'. */
export type Signup_Emails_Bool_Exp = {
  _and?: Maybe<Array<Signup_Emails_Bool_Exp>>;
  _not?: Maybe<Signup_Emails_Bool_Exp>;
  _or?: Maybe<Array<Signup_Emails_Bool_Exp>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "signup_emails" */
export enum Signup_Emails_Constraint {
  /** unique or primary key constraint */
  SIGNUP_EMAILS_EMAIL_KEY = 'signup_emails_email_key',
  /** unique or primary key constraint */
  SIGNUP_EMAILS_PKEY = 'signup_emails_pkey'
}

/** input type for inserting data into table "signup_emails" */
export type Signup_Emails_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Signup_Emails_Max_Fields = {
  __typename?: 'signup_emails_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Signup_Emails_Min_Fields = {
  __typename?: 'signup_emails_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "signup_emails" */
export type Signup_Emails_Mutation_Response = {
  __typename?: 'signup_emails_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Signup_Emails>;
};

/** on conflict condition type for table "signup_emails" */
export type Signup_Emails_On_Conflict = {
  constraint: Signup_Emails_Constraint;
  update_columns?: Array<Signup_Emails_Update_Column>;
  where?: Maybe<Signup_Emails_Bool_Exp>;
};

/** Ordering options when selecting data from "signup_emails". */
export type Signup_Emails_Order_By = {
  createdAt?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** primary key columns input for table: signup_emails */
export type Signup_Emails_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "signup_emails" */
export enum Signup_Emails_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  EMAIL = 'email',
  /** column name */
  ID = 'id'
}

/** input type for updating data in table "signup_emails" */
export type Signup_Emails_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

/** update columns of table "signup_emails" */
export enum Signup_Emails_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  EMAIL = 'email',
  /** column name */
  ID = 'id'
}

/** columns and relationships of "stores" */
export type Stores = {
  __typename?: 'stores';
  bio?: Maybe<Scalars['String']>;
  /** An object relationship */
  cover?: Maybe<Image_Parents>;
  coverId?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamp'];
  id: Scalars['String'];
  isDeleted: Scalars['Boolean'];
  isSuspended: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  /** An array relationship */
  products: Array<Products>;
  /** An aggregate relationship */
  products_aggregate: Products_Aggregate;
  /** An object relationship */
  profile?: Maybe<Image_Parents>;
  profileId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  user: Users;
  userId: Scalars['String'];
  website?: Maybe<Scalars['String']>;
};


/** columns and relationships of "stores" */
export type StoresProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


/** columns and relationships of "stores" */
export type StoresProducts_AggregateArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};

/** aggregated selection of "stores" */
export type Stores_Aggregate = {
  __typename?: 'stores_aggregate';
  aggregate?: Maybe<Stores_Aggregate_Fields>;
  nodes: Array<Stores>;
};

/** aggregate fields of "stores" */
export type Stores_Aggregate_Fields = {
  __typename?: 'stores_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Stores_Max_Fields>;
  min?: Maybe<Stores_Min_Fields>;
};


/** aggregate fields of "stores" */
export type Stores_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Stores_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "stores". All fields are combined with a logical 'AND'. */
export type Stores_Bool_Exp = {
  _and?: Maybe<Array<Stores_Bool_Exp>>;
  _not?: Maybe<Stores_Bool_Exp>;
  _or?: Maybe<Array<Stores_Bool_Exp>>;
  bio?: Maybe<String_Comparison_Exp>;
  cover?: Maybe<Image_Parents_Bool_Exp>;
  coverId?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  isDeleted?: Maybe<Boolean_Comparison_Exp>;
  isSuspended?: Maybe<Boolean_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  products?: Maybe<Products_Bool_Exp>;
  profile?: Maybe<Image_Parents_Bool_Exp>;
  profileId?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamp_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  userId?: Maybe<String_Comparison_Exp>;
  website?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "stores" */
export enum Stores_Constraint {
  /** unique or primary key constraint */
  STORES_PKEY = 'stores_pkey',
  /** unique or primary key constraint */
  STORES_USER_ID_KEY = 'stores_user_id_key'
}

/** input type for inserting data into table "stores" */
export type Stores_Insert_Input = {
  bio?: Maybe<Scalars['String']>;
  cover?: Maybe<Image_Parents_Obj_Rel_Insert_Input>;
  coverId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  isSuspended?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  products?: Maybe<Products_Arr_Rel_Insert_Input>;
  profile?: Maybe<Image_Parents_Obj_Rel_Insert_Input>;
  profileId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  userId?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Stores_Max_Fields = {
  __typename?: 'stores_max_fields';
  bio?: Maybe<Scalars['String']>;
  coverId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  userId?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Stores_Min_Fields = {
  __typename?: 'stores_min_fields';
  bio?: Maybe<Scalars['String']>;
  coverId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  userId?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "stores" */
export type Stores_Mutation_Response = {
  __typename?: 'stores_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Stores>;
};

/** input type for inserting object relation for remote table "stores" */
export type Stores_Obj_Rel_Insert_Input = {
  data: Stores_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Stores_On_Conflict>;
};

/** on conflict condition type for table "stores" */
export type Stores_On_Conflict = {
  constraint: Stores_Constraint;
  update_columns?: Array<Stores_Update_Column>;
  where?: Maybe<Stores_Bool_Exp>;
};

/** Ordering options when selecting data from "stores". */
export type Stores_Order_By = {
  bio?: Maybe<Order_By>;
  cover?: Maybe<Image_Parents_Order_By>;
  coverId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  isDeleted?: Maybe<Order_By>;
  isSuspended?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  products_aggregate?: Maybe<Products_Aggregate_Order_By>;
  profile?: Maybe<Image_Parents_Order_By>;
  profileId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  userId?: Maybe<Order_By>;
  website?: Maybe<Order_By>;
};

/** primary key columns input for table: stores */
export type Stores_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "stores" */
export enum Stores_Select_Column {
  /** column name */
  BIO = 'bio',
  /** column name */
  COVERID = 'coverId',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  ISDELETED = 'isDeleted',
  /** column name */
  ISSUSPENDED = 'isSuspended',
  /** column name */
  NAME = 'name',
  /** column name */
  PROFILEID = 'profileId',
  /** column name */
  UPDATEDAT = 'updatedAt',
  /** column name */
  USERID = 'userId',
  /** column name */
  WEBSITE = 'website'
}

/** input type for updating data in table "stores" */
export type Stores_Set_Input = {
  bio?: Maybe<Scalars['String']>;
  coverId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  isSuspended?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  userId?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** update columns of table "stores" */
export enum Stores_Update_Column {
  /** column name */
  BIO = 'bio',
  /** column name */
  COVERID = 'coverId',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  ISDELETED = 'isDeleted',
  /** column name */
  ISSUSPENDED = 'isSuspended',
  /** column name */
  NAME = 'name',
  /** column name */
  PROFILEID = 'profileId',
  /** column name */
  UPDATEDAT = 'updatedAt',
  /** column name */
  USERID = 'userId',
  /** column name */
  WEBSITE = 'website'
}


/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamp']>;
  _gt?: Maybe<Scalars['timestamp']>;
  _gte?: Maybe<Scalars['timestamp']>;
  _in?: Maybe<Array<Scalars['timestamp']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamp']>;
  _lte?: Maybe<Scalars['timestamp']>;
  _neq?: Maybe<Scalars['timestamp']>;
  _nin?: Maybe<Array<Scalars['timestamp']>>;
};


/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
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

/** columns and relationships of "transactions" */
export type Transactions = {
  __typename?: 'transactions';
  createdAt: Scalars['timestamp'];
  currency?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  /** An object relationship */
  order?: Maybe<Orders>;
  orderId?: Maybe<Scalars['String']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  /** An object relationship */
  paymentMethod?: Maybe<Payment_Methods>;
  paymentMethodId?: Maybe<Scalars['String']>;
  paymentProcessor?: Maybe<Scalars['String']>;
  /** An array relationship */
  payoutItems: Array<Payout_Items>;
  /** An aggregate relationship */
  payoutItems_aggregate: Payout_Items_Aggregate;
  receiptNumber: Scalars['String'];
  /** An object relationship */
  refund?: Maybe<Refunds>;
  refundId?: Maybe<Scalars['String']>;
  total: Scalars['Int'];
};


/** columns and relationships of "transactions" */
export type TransactionsPayoutItemsArgs = {
  distinct_on?: Maybe<Array<Payout_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payout_Items_Order_By>>;
  where?: Maybe<Payout_Items_Bool_Exp>;
};


/** columns and relationships of "transactions" */
export type TransactionsPayoutItems_AggregateArgs = {
  distinct_on?: Maybe<Array<Payout_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payout_Items_Order_By>>;
  where?: Maybe<Payout_Items_Bool_Exp>;
};

/** aggregated selection of "transactions" */
export type Transactions_Aggregate = {
  __typename?: 'transactions_aggregate';
  aggregate?: Maybe<Transactions_Aggregate_Fields>;
  nodes: Array<Transactions>;
};

/** aggregate fields of "transactions" */
export type Transactions_Aggregate_Fields = {
  __typename?: 'transactions_aggregate_fields';
  avg?: Maybe<Transactions_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Transactions_Max_Fields>;
  min?: Maybe<Transactions_Min_Fields>;
  stddev?: Maybe<Transactions_Stddev_Fields>;
  stddev_pop?: Maybe<Transactions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Transactions_Stddev_Samp_Fields>;
  sum?: Maybe<Transactions_Sum_Fields>;
  var_pop?: Maybe<Transactions_Var_Pop_Fields>;
  var_samp?: Maybe<Transactions_Var_Samp_Fields>;
  variance?: Maybe<Transactions_Variance_Fields>;
};


/** aggregate fields of "transactions" */
export type Transactions_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Transactions_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Transactions_Avg_Fields = {
  __typename?: 'transactions_avg_fields';
  total?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "transactions". All fields are combined with a logical 'AND'. */
export type Transactions_Bool_Exp = {
  _and?: Maybe<Array<Transactions_Bool_Exp>>;
  _not?: Maybe<Transactions_Bool_Exp>;
  _or?: Maybe<Array<Transactions_Bool_Exp>>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  currency?: Maybe<String_Comparison_Exp>;
  customerId?: Maybe<String_Comparison_Exp>;
  details?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  order?: Maybe<Orders_Bool_Exp>;
  orderId?: Maybe<String_Comparison_Exp>;
  paymentIntentId?: Maybe<String_Comparison_Exp>;
  paymentMethod?: Maybe<Payment_Methods_Bool_Exp>;
  paymentMethodId?: Maybe<String_Comparison_Exp>;
  paymentProcessor?: Maybe<String_Comparison_Exp>;
  payoutItems?: Maybe<Payout_Items_Bool_Exp>;
  receiptNumber?: Maybe<String_Comparison_Exp>;
  refund?: Maybe<Refunds_Bool_Exp>;
  refundId?: Maybe<String_Comparison_Exp>;
  total?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "transactions" */
export enum Transactions_Constraint {
  /** unique or primary key constraint */
  TRANSACTIONS_PKEY = 'transactions_pkey'
}

/** input type for incrementing numeric columns in table "transactions" */
export type Transactions_Inc_Input = {
  total?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "transactions" */
export type Transactions_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  order?: Maybe<Orders_Obj_Rel_Insert_Input>;
  orderId?: Maybe<Scalars['String']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  paymentMethod?: Maybe<Payment_Methods_Obj_Rel_Insert_Input>;
  paymentMethodId?: Maybe<Scalars['String']>;
  paymentProcessor?: Maybe<Scalars['String']>;
  payoutItems?: Maybe<Payout_Items_Arr_Rel_Insert_Input>;
  receiptNumber?: Maybe<Scalars['String']>;
  refund?: Maybe<Refunds_Obj_Rel_Insert_Input>;
  refundId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Transactions_Max_Fields = {
  __typename?: 'transactions_max_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  paymentMethodId?: Maybe<Scalars['String']>;
  paymentProcessor?: Maybe<Scalars['String']>;
  receiptNumber?: Maybe<Scalars['String']>;
  refundId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Transactions_Min_Fields = {
  __typename?: 'transactions_min_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  paymentMethodId?: Maybe<Scalars['String']>;
  paymentProcessor?: Maybe<Scalars['String']>;
  receiptNumber?: Maybe<Scalars['String']>;
  refundId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "transactions" */
export type Transactions_Mutation_Response = {
  __typename?: 'transactions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Transactions>;
};

/** input type for inserting object relation for remote table "transactions" */
export type Transactions_Obj_Rel_Insert_Input = {
  data: Transactions_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Transactions_On_Conflict>;
};

/** on conflict condition type for table "transactions" */
export type Transactions_On_Conflict = {
  constraint: Transactions_Constraint;
  update_columns?: Array<Transactions_Update_Column>;
  where?: Maybe<Transactions_Bool_Exp>;
};

/** Ordering options when selecting data from "transactions". */
export type Transactions_Order_By = {
  createdAt?: Maybe<Order_By>;
  currency?: Maybe<Order_By>;
  customerId?: Maybe<Order_By>;
  details?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  order?: Maybe<Orders_Order_By>;
  orderId?: Maybe<Order_By>;
  paymentIntentId?: Maybe<Order_By>;
  paymentMethod?: Maybe<Payment_Methods_Order_By>;
  paymentMethodId?: Maybe<Order_By>;
  paymentProcessor?: Maybe<Order_By>;
  payoutItems_aggregate?: Maybe<Payout_Items_Aggregate_Order_By>;
  receiptNumber?: Maybe<Order_By>;
  refund?: Maybe<Refunds_Order_By>;
  refundId?: Maybe<Order_By>;
  total?: Maybe<Order_By>;
};

/** primary key columns input for table: transactions */
export type Transactions_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "transactions" */
export enum Transactions_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CURRENCY = 'currency',
  /** column name */
  CUSTOMERID = 'customerId',
  /** column name */
  DETAILS = 'details',
  /** column name */
  ID = 'id',
  /** column name */
  ORDERID = 'orderId',
  /** column name */
  PAYMENTINTENTID = 'paymentIntentId',
  /** column name */
  PAYMENTMETHODID = 'paymentMethodId',
  /** column name */
  PAYMENTPROCESSOR = 'paymentProcessor',
  /** column name */
  RECEIPTNUMBER = 'receiptNumber',
  /** column name */
  REFUNDID = 'refundId',
  /** column name */
  TOTAL = 'total'
}

/** input type for updating data in table "transactions" */
export type Transactions_Set_Input = {
  createdAt?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  paymentMethodId?: Maybe<Scalars['String']>;
  paymentProcessor?: Maybe<Scalars['String']>;
  receiptNumber?: Maybe<Scalars['String']>;
  refundId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Transactions_Stddev_Fields = {
  __typename?: 'transactions_stddev_fields';
  total?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Transactions_Stddev_Pop_Fields = {
  __typename?: 'transactions_stddev_pop_fields';
  total?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Transactions_Stddev_Samp_Fields = {
  __typename?: 'transactions_stddev_samp_fields';
  total?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Transactions_Sum_Fields = {
  __typename?: 'transactions_sum_fields';
  total?: Maybe<Scalars['Int']>;
};

/** update columns of table "transactions" */
export enum Transactions_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CURRENCY = 'currency',
  /** column name */
  CUSTOMERID = 'customerId',
  /** column name */
  DETAILS = 'details',
  /** column name */
  ID = 'id',
  /** column name */
  ORDERID = 'orderId',
  /** column name */
  PAYMENTINTENTID = 'paymentIntentId',
  /** column name */
  PAYMENTMETHODID = 'paymentMethodId',
  /** column name */
  PAYMENTPROCESSOR = 'paymentProcessor',
  /** column name */
  RECEIPTNUMBER = 'receiptNumber',
  /** column name */
  REFUNDID = 'refundId',
  /** column name */
  TOTAL = 'total'
}

/** aggregate var_pop on columns */
export type Transactions_Var_Pop_Fields = {
  __typename?: 'transactions_var_pop_fields';
  total?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Transactions_Var_Samp_Fields = {
  __typename?: 'transactions_var_samp_fields';
  total?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Transactions_Variance_Fields = {
  __typename?: 'transactions_variance_fields';
  total?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "unique_product_views" */
export type Unique_Product_Views = {
  __typename?: 'unique_product_views';
  createdAt: Scalars['timestamptz'];
  productId: Scalars['String'];
  sellerUserId: Scalars['String'];
  userId: Scalars['String'];
};

/** aggregated selection of "unique_product_views" */
export type Unique_Product_Views_Aggregate = {
  __typename?: 'unique_product_views_aggregate';
  aggregate?: Maybe<Unique_Product_Views_Aggregate_Fields>;
  nodes: Array<Unique_Product_Views>;
};

/** aggregate fields of "unique_product_views" */
export type Unique_Product_Views_Aggregate_Fields = {
  __typename?: 'unique_product_views_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Unique_Product_Views_Max_Fields>;
  min?: Maybe<Unique_Product_Views_Min_Fields>;
};


/** aggregate fields of "unique_product_views" */
export type Unique_Product_Views_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Unique_Product_Views_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "unique_product_views". All fields are combined with a logical 'AND'. */
export type Unique_Product_Views_Bool_Exp = {
  _and?: Maybe<Array<Unique_Product_Views_Bool_Exp>>;
  _not?: Maybe<Unique_Product_Views_Bool_Exp>;
  _or?: Maybe<Array<Unique_Product_Views_Bool_Exp>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  productId?: Maybe<String_Comparison_Exp>;
  sellerUserId?: Maybe<String_Comparison_Exp>;
  userId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "unique_product_views" */
export enum Unique_Product_Views_Constraint {
  /** unique or primary key constraint */
  UNIQUE_PRODUCT_VIEWS_PKEY = 'unique_product_views_pkey'
}

/** input type for inserting data into table "unique_product_views" */
export type Unique_Product_Views_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  productId?: Maybe<Scalars['String']>;
  sellerUserId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Unique_Product_Views_Max_Fields = {
  __typename?: 'unique_product_views_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  productId?: Maybe<Scalars['String']>;
  sellerUserId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Unique_Product_Views_Min_Fields = {
  __typename?: 'unique_product_views_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  productId?: Maybe<Scalars['String']>;
  sellerUserId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "unique_product_views" */
export type Unique_Product_Views_Mutation_Response = {
  __typename?: 'unique_product_views_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Unique_Product_Views>;
};

/** on conflict condition type for table "unique_product_views" */
export type Unique_Product_Views_On_Conflict = {
  constraint: Unique_Product_Views_Constraint;
  update_columns?: Array<Unique_Product_Views_Update_Column>;
  where?: Maybe<Unique_Product_Views_Bool_Exp>;
};

/** Ordering options when selecting data from "unique_product_views". */
export type Unique_Product_Views_Order_By = {
  createdAt?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  sellerUserId?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: unique_product_views */
export type Unique_Product_Views_Pk_Columns_Input = {
  productId: Scalars['String'];
  userId: Scalars['String'];
};

/** select columns of table "unique_product_views" */
export enum Unique_Product_Views_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  SELLERUSERID = 'sellerUserId',
  /** column name */
  USERID = 'userId'
}

/** input type for updating data in table "unique_product_views" */
export type Unique_Product_Views_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  productId?: Maybe<Scalars['String']>;
  sellerUserId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** update columns of table "unique_product_views" */
export enum Unique_Product_Views_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  SELLERUSERID = 'sellerUserId',
  /** column name */
  USERID = 'userId'
}

/** columns and relationships of "user_licenses" */
export type User_Licenses = {
  __typename?: 'user_licenses';
  createdAt?: Maybe<Scalars['timestamptz']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isDeleted?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  licenseCategory?: Maybe<Scalars['String']>;
  licenseExpiry: Scalars['timestamp'];
  licenseNumber: Scalars['String'];
  licenseState?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  verified: Scalars['Boolean'];
};

/** aggregated selection of "user_licenses" */
export type User_Licenses_Aggregate = {
  __typename?: 'user_licenses_aggregate';
  aggregate?: Maybe<User_Licenses_Aggregate_Fields>;
  nodes: Array<User_Licenses>;
};

/** aggregate fields of "user_licenses" */
export type User_Licenses_Aggregate_Fields = {
  __typename?: 'user_licenses_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<User_Licenses_Max_Fields>;
  min?: Maybe<User_Licenses_Min_Fields>;
};


/** aggregate fields of "user_licenses" */
export type User_Licenses_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Licenses_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "user_licenses". All fields are combined with a logical 'AND'. */
export type User_Licenses_Bool_Exp = {
  _and?: Maybe<Array<User_Licenses_Bool_Exp>>;
  _not?: Maybe<User_Licenses_Bool_Exp>;
  _or?: Maybe<Array<User_Licenses_Bool_Exp>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  firstName?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  isDeleted?: Maybe<Boolean_Comparison_Exp>;
  lastName?: Maybe<String_Comparison_Exp>;
  licenseCategory?: Maybe<String_Comparison_Exp>;
  licenseExpiry?: Maybe<Timestamp_Comparison_Exp>;
  licenseNumber?: Maybe<String_Comparison_Exp>;
  licenseState?: Maybe<String_Comparison_Exp>;
  userId?: Maybe<String_Comparison_Exp>;
  verified?: Maybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_licenses" */
export enum User_Licenses_Constraint {
  /** unique or primary key constraint */
  USER_LICENSES_PKEY = 'user_licenses_pkey'
}

/** input type for inserting data into table "user_licenses" */
export type User_Licenses_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  licenseCategory?: Maybe<Scalars['String']>;
  licenseExpiry?: Maybe<Scalars['timestamp']>;
  licenseNumber?: Maybe<Scalars['String']>;
  licenseState?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type User_Licenses_Max_Fields = {
  __typename?: 'user_licenses_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  licenseCategory?: Maybe<Scalars['String']>;
  licenseExpiry?: Maybe<Scalars['timestamp']>;
  licenseNumber?: Maybe<Scalars['String']>;
  licenseState?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type User_Licenses_Min_Fields = {
  __typename?: 'user_licenses_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  licenseCategory?: Maybe<Scalars['String']>;
  licenseExpiry?: Maybe<Scalars['timestamp']>;
  licenseNumber?: Maybe<Scalars['String']>;
  licenseState?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "user_licenses" */
export type User_Licenses_Mutation_Response = {
  __typename?: 'user_licenses_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Licenses>;
};

/** input type for inserting object relation for remote table "user_licenses" */
export type User_Licenses_Obj_Rel_Insert_Input = {
  data: User_Licenses_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<User_Licenses_On_Conflict>;
};

/** on conflict condition type for table "user_licenses" */
export type User_Licenses_On_Conflict = {
  constraint: User_Licenses_Constraint;
  update_columns?: Array<User_Licenses_Update_Column>;
  where?: Maybe<User_Licenses_Bool_Exp>;
};

/** Ordering options when selecting data from "user_licenses". */
export type User_Licenses_Order_By = {
  createdAt?: Maybe<Order_By>;
  firstName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  isDeleted?: Maybe<Order_By>;
  lastName?: Maybe<Order_By>;
  licenseCategory?: Maybe<Order_By>;
  licenseExpiry?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
  licenseState?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
  verified?: Maybe<Order_By>;
};

/** primary key columns input for table: user_licenses */
export type User_Licenses_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "user_licenses" */
export enum User_Licenses_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  FIRSTNAME = 'firstName',
  /** column name */
  ID = 'id',
  /** column name */
  ISDELETED = 'isDeleted',
  /** column name */
  LASTNAME = 'lastName',
  /** column name */
  LICENSECATEGORY = 'licenseCategory',
  /** column name */
  LICENSEEXPIRY = 'licenseExpiry',
  /** column name */
  LICENSENUMBER = 'licenseNumber',
  /** column name */
  LICENSESTATE = 'licenseState',
  /** column name */
  USERID = 'userId',
  /** column name */
  VERIFIED = 'verified'
}

/** input type for updating data in table "user_licenses" */
export type User_Licenses_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  licenseCategory?: Maybe<Scalars['String']>;
  licenseExpiry?: Maybe<Scalars['timestamp']>;
  licenseNumber?: Maybe<Scalars['String']>;
  licenseState?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
};

/** update columns of table "user_licenses" */
export enum User_Licenses_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  FIRSTNAME = 'firstName',
  /** column name */
  ID = 'id',
  /** column name */
  ISDELETED = 'isDeleted',
  /** column name */
  LASTNAME = 'lastName',
  /** column name */
  LICENSECATEGORY = 'licenseCategory',
  /** column name */
  LICENSEEXPIRY = 'licenseExpiry',
  /** column name */
  LICENSENUMBER = 'licenseNumber',
  /** column name */
  LICENSESTATE = 'licenseState',
  /** column name */
  USERID = 'userId',
  /** column name */
  VERIFIED = 'verified'
}

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  cartId?: Maybe<Scalars['String']>;
  /** An array relationship */
  conversations: Array<Chat_Users>;
  /** An aggregate relationship */
  conversations_aggregate: Chat_Users_Aggregate;
  createdAt?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  dealer?: Maybe<Dealers>;
  dealerId?: Maybe<Scalars['String']>;
  /** An object relationship */
  defaultLicense?: Maybe<User_Licenses>;
  defaultLicenseId?: Maybe<Scalars['String']>;
  defaultPaymentMethodId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  emailVerified?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isDeleted: Scalars['Boolean'];
  isSuspended: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  lastTyped?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  ordersMetrics?: Maybe<Users_Orders_Metrics>;
  passwordHash: Scalars['String'];
  /** An object relationship */
  payoutMethod?: Maybe<Payout_Methods>;
  payoutMethodId?: Maybe<Scalars['String']>;
  payoutSplitId?: Maybe<Scalars['String']>;
  /** An object relationship */
  phoneNumber?: Maybe<Phone_Numbers>;
  phoneNumberId?: Maybe<Scalars['String']>;
  /** An object relationship */
  store?: Maybe<Stores>;
  /** An object relationship */
  storeById?: Maybe<Stores>;
  storeId?: Maybe<Scalars['String']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userRole?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};


/** columns and relationships of "users" */
export type UsersConversationsArgs = {
  distinct_on?: Maybe<Array<Chat_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Users_Order_By>>;
  where?: Maybe<Chat_Users_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersConversations_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Users_Order_By>>;
  where?: Maybe<Chat_Users_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Users_Bool_Exp>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Users_Bool_Exp>>;
  cartId?: Maybe<String_Comparison_Exp>;
  conversations?: Maybe<Chat_Users_Bool_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  dealer?: Maybe<Dealers_Bool_Exp>;
  dealerId?: Maybe<String_Comparison_Exp>;
  defaultLicense?: Maybe<User_Licenses_Bool_Exp>;
  defaultLicenseId?: Maybe<String_Comparison_Exp>;
  defaultPaymentMethodId?: Maybe<String_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  emailVerified?: Maybe<Boolean_Comparison_Exp>;
  firstName?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  isDeleted?: Maybe<Boolean_Comparison_Exp>;
  isSuspended?: Maybe<Boolean_Comparison_Exp>;
  lastName?: Maybe<String_Comparison_Exp>;
  lastSeen?: Maybe<Timestamptz_Comparison_Exp>;
  lastTyped?: Maybe<Timestamptz_Comparison_Exp>;
  ordersMetrics?: Maybe<Users_Orders_Metrics_Bool_Exp>;
  passwordHash?: Maybe<String_Comparison_Exp>;
  payoutMethod?: Maybe<Payout_Methods_Bool_Exp>;
  payoutMethodId?: Maybe<String_Comparison_Exp>;
  payoutSplitId?: Maybe<String_Comparison_Exp>;
  phoneNumber?: Maybe<Phone_Numbers_Bool_Exp>;
  phoneNumberId?: Maybe<String_Comparison_Exp>;
  store?: Maybe<Stores_Bool_Exp>;
  storeById?: Maybe<Stores_Bool_Exp>;
  storeId?: Maybe<String_Comparison_Exp>;
  stripeCustomerId?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  userRole?: Maybe<String_Comparison_Exp>;
  username?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  USERS_DEALER_ID_KEY = 'users_dealer_id_key',
  /** unique or primary key constraint */
  USERS_EMAIL_KEY = 'users_email_key',
  /** unique or primary key constraint */
  USERS_PKEY = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  cartId?: Maybe<Scalars['String']>;
  conversations?: Maybe<Chat_Users_Arr_Rel_Insert_Input>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  dealer?: Maybe<Dealers_Obj_Rel_Insert_Input>;
  dealerId?: Maybe<Scalars['String']>;
  defaultLicense?: Maybe<User_Licenses_Obj_Rel_Insert_Input>;
  defaultLicenseId?: Maybe<Scalars['String']>;
  defaultPaymentMethodId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  isSuspended?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  lastTyped?: Maybe<Scalars['timestamptz']>;
  ordersMetrics?: Maybe<Users_Orders_Metrics_Obj_Rel_Insert_Input>;
  passwordHash?: Maybe<Scalars['String']>;
  payoutMethod?: Maybe<Payout_Methods_Obj_Rel_Insert_Input>;
  payoutMethodId?: Maybe<Scalars['String']>;
  payoutSplitId?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Phone_Numbers_Obj_Rel_Insert_Input>;
  phoneNumberId?: Maybe<Scalars['String']>;
  store?: Maybe<Stores_Obj_Rel_Insert_Input>;
  storeById?: Maybe<Stores_Obj_Rel_Insert_Input>;
  storeId?: Maybe<Scalars['String']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userRole?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  cartId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  dealerId?: Maybe<Scalars['String']>;
  defaultLicenseId?: Maybe<Scalars['String']>;
  defaultPaymentMethodId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  lastTyped?: Maybe<Scalars['timestamptz']>;
  passwordHash?: Maybe<Scalars['String']>;
  payoutMethodId?: Maybe<Scalars['String']>;
  payoutSplitId?: Maybe<Scalars['String']>;
  phoneNumberId?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userRole?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  cartId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  dealerId?: Maybe<Scalars['String']>;
  defaultLicenseId?: Maybe<Scalars['String']>;
  defaultPaymentMethodId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  lastTyped?: Maybe<Scalars['timestamptz']>;
  passwordHash?: Maybe<Scalars['String']>;
  payoutMethodId?: Maybe<Scalars['String']>;
  payoutSplitId?: Maybe<Scalars['String']>;
  phoneNumberId?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userRole?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

/** columns and relationships of "users_online" */
export type Users_Online = {
  __typename?: 'users_online';
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  lastType?: Maybe<Scalars['timestamptz']>;
  licenseId?: Maybe<Scalars['String']>;
  licenseNumber?: Maybe<Scalars['String']>;
};

/** aggregated selection of "users_online" */
export type Users_Online_Aggregate = {
  __typename?: 'users_online_aggregate';
  aggregate?: Maybe<Users_Online_Aggregate_Fields>;
  nodes: Array<Users_Online>;
};

/** aggregate fields of "users_online" */
export type Users_Online_Aggregate_Fields = {
  __typename?: 'users_online_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Users_Online_Max_Fields>;
  min?: Maybe<Users_Online_Min_Fields>;
};


/** aggregate fields of "users_online" */
export type Users_Online_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Online_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "users_online". All fields are combined with a logical 'AND'. */
export type Users_Online_Bool_Exp = {
  _and?: Maybe<Array<Users_Online_Bool_Exp>>;
  _not?: Maybe<Users_Online_Bool_Exp>;
  _or?: Maybe<Array<Users_Online_Bool_Exp>>;
  email?: Maybe<String_Comparison_Exp>;
  firstName?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  lastName?: Maybe<String_Comparison_Exp>;
  lastSeen?: Maybe<Timestamptz_Comparison_Exp>;
  lastType?: Maybe<Timestamptz_Comparison_Exp>;
  licenseId?: Maybe<String_Comparison_Exp>;
  licenseNumber?: Maybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Users_Online_Max_Fields = {
  __typename?: 'users_online_max_fields';
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  lastType?: Maybe<Scalars['timestamptz']>;
  licenseId?: Maybe<Scalars['String']>;
  licenseNumber?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Users_Online_Min_Fields = {
  __typename?: 'users_online_min_fields';
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  lastType?: Maybe<Scalars['timestamptz']>;
  licenseId?: Maybe<Scalars['String']>;
  licenseNumber?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "users_online". */
export type Users_Online_Order_By = {
  email?: Maybe<Order_By>;
  firstName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  lastName?: Maybe<Order_By>;
  lastSeen?: Maybe<Order_By>;
  lastType?: Maybe<Order_By>;
  licenseId?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
};

/** select columns of table "users_online" */
export enum Users_Online_Select_Column {
  /** column name */
  EMAIL = 'email',
  /** column name */
  FIRSTNAME = 'firstName',
  /** column name */
  ID = 'id',
  /** column name */
  LASTNAME = 'lastName',
  /** column name */
  LASTSEEN = 'lastSeen',
  /** column name */
  LASTTYPE = 'lastType',
  /** column name */
  LICENSEID = 'licenseId',
  /** column name */
  LICENSENUMBER = 'licenseNumber'
}

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  cartId?: Maybe<Order_By>;
  conversations_aggregate?: Maybe<Chat_Users_Aggregate_Order_By>;
  createdAt?: Maybe<Order_By>;
  dealer?: Maybe<Dealers_Order_By>;
  dealerId?: Maybe<Order_By>;
  defaultLicense?: Maybe<User_Licenses_Order_By>;
  defaultLicenseId?: Maybe<Order_By>;
  defaultPaymentMethodId?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  emailVerified?: Maybe<Order_By>;
  firstName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  isDeleted?: Maybe<Order_By>;
  isSuspended?: Maybe<Order_By>;
  lastName?: Maybe<Order_By>;
  lastSeen?: Maybe<Order_By>;
  lastTyped?: Maybe<Order_By>;
  ordersMetrics?: Maybe<Users_Orders_Metrics_Order_By>;
  passwordHash?: Maybe<Order_By>;
  payoutMethod?: Maybe<Payout_Methods_Order_By>;
  payoutMethodId?: Maybe<Order_By>;
  payoutSplitId?: Maybe<Order_By>;
  phoneNumber?: Maybe<Phone_Numbers_Order_By>;
  phoneNumberId?: Maybe<Order_By>;
  store?: Maybe<Stores_Order_By>;
  storeById?: Maybe<Stores_Order_By>;
  storeId?: Maybe<Order_By>;
  stripeCustomerId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userRole?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** columns and relationships of "users_orders_metrics" */
export type Users_Orders_Metrics = {
  __typename?: 'users_orders_metrics';
  avgApprovalTimeHrs?: Maybe<Scalars['numeric']>;
  avgDisposalTimeHrs?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['String']>;
  itemsBought?: Maybe<Scalars['bigint']>;
  itemsSold?: Maybe<Scalars['bigint']>;
  totalSales?: Maybe<Scalars['bigint']>;
  totalSpend?: Maybe<Scalars['bigint']>;
};

/** aggregated selection of "users_orders_metrics" */
export type Users_Orders_Metrics_Aggregate = {
  __typename?: 'users_orders_metrics_aggregate';
  aggregate?: Maybe<Users_Orders_Metrics_Aggregate_Fields>;
  nodes: Array<Users_Orders_Metrics>;
};

/** aggregate fields of "users_orders_metrics" */
export type Users_Orders_Metrics_Aggregate_Fields = {
  __typename?: 'users_orders_metrics_aggregate_fields';
  avg?: Maybe<Users_Orders_Metrics_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Users_Orders_Metrics_Max_Fields>;
  min?: Maybe<Users_Orders_Metrics_Min_Fields>;
  stddev?: Maybe<Users_Orders_Metrics_Stddev_Fields>;
  stddev_pop?: Maybe<Users_Orders_Metrics_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Users_Orders_Metrics_Stddev_Samp_Fields>;
  sum?: Maybe<Users_Orders_Metrics_Sum_Fields>;
  var_pop?: Maybe<Users_Orders_Metrics_Var_Pop_Fields>;
  var_samp?: Maybe<Users_Orders_Metrics_Var_Samp_Fields>;
  variance?: Maybe<Users_Orders_Metrics_Variance_Fields>;
};


/** aggregate fields of "users_orders_metrics" */
export type Users_Orders_Metrics_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Orders_Metrics_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Users_Orders_Metrics_Avg_Fields = {
  __typename?: 'users_orders_metrics_avg_fields';
  avgApprovalTimeHrs?: Maybe<Scalars['Float']>;
  avgDisposalTimeHrs?: Maybe<Scalars['Float']>;
  itemsBought?: Maybe<Scalars['Float']>;
  itemsSold?: Maybe<Scalars['Float']>;
  totalSales?: Maybe<Scalars['Float']>;
  totalSpend?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "users_orders_metrics". All fields are combined with a logical 'AND'. */
export type Users_Orders_Metrics_Bool_Exp = {
  _and?: Maybe<Array<Users_Orders_Metrics_Bool_Exp>>;
  _not?: Maybe<Users_Orders_Metrics_Bool_Exp>;
  _or?: Maybe<Array<Users_Orders_Metrics_Bool_Exp>>;
  avgApprovalTimeHrs?: Maybe<Numeric_Comparison_Exp>;
  avgDisposalTimeHrs?: Maybe<Numeric_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  itemsBought?: Maybe<Bigint_Comparison_Exp>;
  itemsSold?: Maybe<Bigint_Comparison_Exp>;
  totalSales?: Maybe<Bigint_Comparison_Exp>;
  totalSpend?: Maybe<Bigint_Comparison_Exp>;
};

/** input type for inserting data into table "users_orders_metrics" */
export type Users_Orders_Metrics_Insert_Input = {
  avgApprovalTimeHrs?: Maybe<Scalars['numeric']>;
  avgDisposalTimeHrs?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['String']>;
  itemsBought?: Maybe<Scalars['bigint']>;
  itemsSold?: Maybe<Scalars['bigint']>;
  totalSales?: Maybe<Scalars['bigint']>;
  totalSpend?: Maybe<Scalars['bigint']>;
};

/** aggregate max on columns */
export type Users_Orders_Metrics_Max_Fields = {
  __typename?: 'users_orders_metrics_max_fields';
  avgApprovalTimeHrs?: Maybe<Scalars['numeric']>;
  avgDisposalTimeHrs?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['String']>;
  itemsBought?: Maybe<Scalars['bigint']>;
  itemsSold?: Maybe<Scalars['bigint']>;
  totalSales?: Maybe<Scalars['bigint']>;
  totalSpend?: Maybe<Scalars['bigint']>;
};

/** aggregate min on columns */
export type Users_Orders_Metrics_Min_Fields = {
  __typename?: 'users_orders_metrics_min_fields';
  avgApprovalTimeHrs?: Maybe<Scalars['numeric']>;
  avgDisposalTimeHrs?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['String']>;
  itemsBought?: Maybe<Scalars['bigint']>;
  itemsSold?: Maybe<Scalars['bigint']>;
  totalSales?: Maybe<Scalars['bigint']>;
  totalSpend?: Maybe<Scalars['bigint']>;
};

/** input type for inserting object relation for remote table "users_orders_metrics" */
export type Users_Orders_Metrics_Obj_Rel_Insert_Input = {
  data: Users_Orders_Metrics_Insert_Input;
};

/** Ordering options when selecting data from "users_orders_metrics". */
export type Users_Orders_Metrics_Order_By = {
  avgApprovalTimeHrs?: Maybe<Order_By>;
  avgDisposalTimeHrs?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  itemsBought?: Maybe<Order_By>;
  itemsSold?: Maybe<Order_By>;
  totalSales?: Maybe<Order_By>;
  totalSpend?: Maybe<Order_By>;
};

/** select columns of table "users_orders_metrics" */
export enum Users_Orders_Metrics_Select_Column {
  /** column name */
  AVGAPPROVALTIMEHRS = 'avgApprovalTimeHrs',
  /** column name */
  AVGDISPOSALTIMEHRS = 'avgDisposalTimeHrs',
  /** column name */
  ID = 'id',
  /** column name */
  ITEMSBOUGHT = 'itemsBought',
  /** column name */
  ITEMSSOLD = 'itemsSold',
  /** column name */
  TOTALSALES = 'totalSales',
  /** column name */
  TOTALSPEND = 'totalSpend'
}

/** aggregate stddev on columns */
export type Users_Orders_Metrics_Stddev_Fields = {
  __typename?: 'users_orders_metrics_stddev_fields';
  avgApprovalTimeHrs?: Maybe<Scalars['Float']>;
  avgDisposalTimeHrs?: Maybe<Scalars['Float']>;
  itemsBought?: Maybe<Scalars['Float']>;
  itemsSold?: Maybe<Scalars['Float']>;
  totalSales?: Maybe<Scalars['Float']>;
  totalSpend?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Users_Orders_Metrics_Stddev_Pop_Fields = {
  __typename?: 'users_orders_metrics_stddev_pop_fields';
  avgApprovalTimeHrs?: Maybe<Scalars['Float']>;
  avgDisposalTimeHrs?: Maybe<Scalars['Float']>;
  itemsBought?: Maybe<Scalars['Float']>;
  itemsSold?: Maybe<Scalars['Float']>;
  totalSales?: Maybe<Scalars['Float']>;
  totalSpend?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Users_Orders_Metrics_Stddev_Samp_Fields = {
  __typename?: 'users_orders_metrics_stddev_samp_fields';
  avgApprovalTimeHrs?: Maybe<Scalars['Float']>;
  avgDisposalTimeHrs?: Maybe<Scalars['Float']>;
  itemsBought?: Maybe<Scalars['Float']>;
  itemsSold?: Maybe<Scalars['Float']>;
  totalSales?: Maybe<Scalars['Float']>;
  totalSpend?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Users_Orders_Metrics_Sum_Fields = {
  __typename?: 'users_orders_metrics_sum_fields';
  avgApprovalTimeHrs?: Maybe<Scalars['numeric']>;
  avgDisposalTimeHrs?: Maybe<Scalars['numeric']>;
  itemsBought?: Maybe<Scalars['bigint']>;
  itemsSold?: Maybe<Scalars['bigint']>;
  totalSales?: Maybe<Scalars['bigint']>;
  totalSpend?: Maybe<Scalars['bigint']>;
};

/** aggregate var_pop on columns */
export type Users_Orders_Metrics_Var_Pop_Fields = {
  __typename?: 'users_orders_metrics_var_pop_fields';
  avgApprovalTimeHrs?: Maybe<Scalars['Float']>;
  avgDisposalTimeHrs?: Maybe<Scalars['Float']>;
  itemsBought?: Maybe<Scalars['Float']>;
  itemsSold?: Maybe<Scalars['Float']>;
  totalSales?: Maybe<Scalars['Float']>;
  totalSpend?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Users_Orders_Metrics_Var_Samp_Fields = {
  __typename?: 'users_orders_metrics_var_samp_fields';
  avgApprovalTimeHrs?: Maybe<Scalars['Float']>;
  avgDisposalTimeHrs?: Maybe<Scalars['Float']>;
  itemsBought?: Maybe<Scalars['Float']>;
  itemsSold?: Maybe<Scalars['Float']>;
  totalSales?: Maybe<Scalars['Float']>;
  totalSpend?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Users_Orders_Metrics_Variance_Fields = {
  __typename?: 'users_orders_metrics_variance_fields';
  avgApprovalTimeHrs?: Maybe<Scalars['Float']>;
  avgDisposalTimeHrs?: Maybe<Scalars['Float']>;
  itemsBought?: Maybe<Scalars['Float']>;
  itemsSold?: Maybe<Scalars['Float']>;
  totalSales?: Maybe<Scalars['Float']>;
  totalSpend?: Maybe<Scalars['Float']>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CARTID = 'cartId',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  DEALERID = 'dealerId',
  /** column name */
  DEFAULTLICENSEID = 'defaultLicenseId',
  /** column name */
  DEFAULTPAYMENTMETHODID = 'defaultPaymentMethodId',
  /** column name */
  EMAIL = 'email',
  /** column name */
  EMAILVERIFIED = 'emailVerified',
  /** column name */
  FIRSTNAME = 'firstName',
  /** column name */
  ID = 'id',
  /** column name */
  ISDELETED = 'isDeleted',
  /** column name */
  ISSUSPENDED = 'isSuspended',
  /** column name */
  LASTNAME = 'lastName',
  /** column name */
  LASTSEEN = 'lastSeen',
  /** column name */
  LASTTYPED = 'lastTyped',
  /** column name */
  PASSWORDHASH = 'passwordHash',
  /** column name */
  PAYOUTMETHODID = 'payoutMethodId',
  /** column name */
  PAYOUTSPLITID = 'payoutSplitId',
  /** column name */
  PHONENUMBERID = 'phoneNumberId',
  /** column name */
  STOREID = 'storeId',
  /** column name */
  STRIPECUSTOMERID = 'stripeCustomerId',
  /** column name */
  UPDATEDAT = 'updatedAt',
  /** column name */
  USERROLE = 'userRole',
  /** column name */
  USERNAME = 'username'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  cartId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  dealerId?: Maybe<Scalars['String']>;
  defaultLicenseId?: Maybe<Scalars['String']>;
  defaultPaymentMethodId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  isSuspended?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  lastTyped?: Maybe<Scalars['timestamptz']>;
  passwordHash?: Maybe<Scalars['String']>;
  payoutMethodId?: Maybe<Scalars['String']>;
  payoutSplitId?: Maybe<Scalars['String']>;
  phoneNumberId?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userRole?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

/** columns and relationships of "users_typing" */
export type Users_Typing = {
  __typename?: 'users_typing';
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  lastTyped?: Maybe<Scalars['timestamptz']>;
  licenseNumber?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
};

/** aggregated selection of "users_typing" */
export type Users_Typing_Aggregate = {
  __typename?: 'users_typing_aggregate';
  aggregate?: Maybe<Users_Typing_Aggregate_Fields>;
  nodes: Array<Users_Typing>;
};

/** aggregate fields of "users_typing" */
export type Users_Typing_Aggregate_Fields = {
  __typename?: 'users_typing_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Users_Typing_Max_Fields>;
  min?: Maybe<Users_Typing_Min_Fields>;
};


/** aggregate fields of "users_typing" */
export type Users_Typing_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Typing_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "users_typing". All fields are combined with a logical 'AND'. */
export type Users_Typing_Bool_Exp = {
  _and?: Maybe<Array<Users_Typing_Bool_Exp>>;
  _not?: Maybe<Users_Typing_Bool_Exp>;
  _or?: Maybe<Array<Users_Typing_Bool_Exp>>;
  email?: Maybe<String_Comparison_Exp>;
  firstName?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  lastName?: Maybe<String_Comparison_Exp>;
  lastSeen?: Maybe<Timestamptz_Comparison_Exp>;
  lastTyped?: Maybe<Timestamptz_Comparison_Exp>;
  licenseNumber?: Maybe<String_Comparison_Exp>;
  verified?: Maybe<Boolean_Comparison_Exp>;
};

/** aggregate max on columns */
export type Users_Typing_Max_Fields = {
  __typename?: 'users_typing_max_fields';
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  lastTyped?: Maybe<Scalars['timestamptz']>;
  licenseNumber?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Users_Typing_Min_Fields = {
  __typename?: 'users_typing_min_fields';
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  lastTyped?: Maybe<Scalars['timestamptz']>;
  licenseNumber?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "users_typing". */
export type Users_Typing_Order_By = {
  email?: Maybe<Order_By>;
  firstName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  lastName?: Maybe<Order_By>;
  lastSeen?: Maybe<Order_By>;
  lastTyped?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
  verified?: Maybe<Order_By>;
};

/** select columns of table "users_typing" */
export enum Users_Typing_Select_Column {
  /** column name */
  EMAIL = 'email',
  /** column name */
  FIRSTNAME = 'firstName',
  /** column name */
  ID = 'id',
  /** column name */
  LASTNAME = 'lastName',
  /** column name */
  LASTSEEN = 'lastSeen',
  /** column name */
  LASTTYPED = 'lastTyped',
  /** column name */
  LICENSENUMBER = 'licenseNumber',
  /** column name */
  VERIFIED = 'verified'
}

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CARTID = 'cartId',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  DEALERID = 'dealerId',
  /** column name */
  DEFAULTLICENSEID = 'defaultLicenseId',
  /** column name */
  DEFAULTPAYMENTMETHODID = 'defaultPaymentMethodId',
  /** column name */
  EMAIL = 'email',
  /** column name */
  EMAILVERIFIED = 'emailVerified',
  /** column name */
  FIRSTNAME = 'firstName',
  /** column name */
  ID = 'id',
  /** column name */
  ISDELETED = 'isDeleted',
  /** column name */
  ISSUSPENDED = 'isSuspended',
  /** column name */
  LASTNAME = 'lastName',
  /** column name */
  LASTSEEN = 'lastSeen',
  /** column name */
  LASTTYPED = 'lastTyped',
  /** column name */
  PASSWORDHASH = 'passwordHash',
  /** column name */
  PAYOUTMETHODID = 'payoutMethodId',
  /** column name */
  PAYOUTSPLITID = 'payoutSplitId',
  /** column name */
  PHONENUMBERID = 'phoneNumberId',
  /** column name */
  STOREID = 'storeId',
  /** column name */
  STRIPECUSTOMERID = 'stripeCustomerId',
  /** column name */
  UPDATEDAT = 'updatedAt',
  /** column name */
  USERROLE = 'userRole',
  /** column name */
  USERNAME = 'username'
}

export type ID = Scalars["ID"]
export type Price = Scalars["Price"]