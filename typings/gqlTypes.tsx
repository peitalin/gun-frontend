import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamp: any;
  /** An area where a specific product category lives (eg Design, Video, Sounds) */
  ProductCategoryGroup: any;
  /** Standard date string */
  Date: Date;
  timestamptz: any;
  PageCursor: any;
  /** Price value representing USD cents */
  Price: number;
};

export type AddRemovePaymentMethodResponse = {
   __typename?: 'AddRemovePaymentMethodResponse';
  user: UserPrivate;
};

/** Basic insight into some interesting platform statistic (eg number of stores). */
export type AdminInsight = {
   __typename?: 'AdminInsight';
  /** Name of the value (eg "Number of Sales Made"). */
  name: Scalars['String'];
  /** String version of value (eg "42,000"). */
  value: Scalars['String'];
};

export type ApprovePayoutsResult = {
   __typename?: 'ApprovePayoutsResult';
  approvedPayouts?: Maybe<Array<Maybe<Payout>>>;
  payoutsAlreadyApproved?: Maybe<Array<Maybe<Payout>>>;
  payoutsAlreadyApprovedIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** Mutation result that doesn't need to give anything back. */
export type BlankMutationResponse = {
   __typename?: 'BlankMutationResponse';
  /** Should always be true if you get this result instead of a MutationErrorSummary - mainly here to allow gql to build */
  success: Scalars['Boolean'];
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
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

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
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

/** Collection of products the user is in the process of buying */
export type Cart = {
   __typename?: 'Cart';
  automaticSavings: Scalars['Price'];
  id: Scalars['ID'];
  items: Array<CartItem>;
  paymentProcessingFee: Scalars['Price'];
  promoCodeSavings: Scalars['Price'];
  subtotal: Scalars['Price'];
  taxes: Scalars['Price'];
  total: Scalars['Price'];
  updatedAt: Scalars['Date'];
  userId: Scalars['ID'];
};

/** Pairing of product and current pricing information applicable to the checkout process */
export type CartItem = {
   __typename?: 'CartItem';
  cartId: Scalars['ID'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  product: Product;
  purchasableStatus: CartItemPurchasableStatus;
  quantity: Scalars['Int'];
  storeId: Scalars['ID'];
  userId: Scalars['ID'];
};

/** Availability state of the item in the cart - can it be purchased right now? */
export enum CartItemPurchasableStatus {
  /** Yes it can be purchased right now. */
  AVAILABLE = 'AVAILABLE',
  /** The entire product is no longer available. */
  PRODUCT_UNAVAILABLE = 'PRODUCT_UNAVAILABLE',
  /** The variant is available, but not in the quantity they're trying to buy. */
  QUANTITY_TOO_HIGH = 'QUANTITY_TOO_HIGH',
  /** The variant is currently sold out. Other variants may be available. */
  SOLD_OUT = 'SOLD_OUT',
  /** The variant is currently unavailable for some other reason, but other variants may be available. */
  VARIANT_UNAVAILABLE = 'VARIANT_UNAVAILABLE'
}

export type CartMutationResponse = {
   __typename?: 'CartMutationResponse';
  cart: Cart;
};

/** columns and relationships of "categories" */
export type Categories = {
   __typename?: 'categories';
  categoryGroup: Scalars['String'];
  createdAt: Scalars['timestamp'];
  id: Scalars['String'];
  name: Scalars['String'];
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Categories_Max_Fields>;
  min?: Maybe<Categories_Min_Fields>;
};


/** aggregate fields of "categories" */
export type Categories_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Categories_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "categories" */
export type Categories_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Categories_Max_Order_By>;
  min?: Maybe<Categories_Min_Order_By>;
};

/** input type for inserting array relation for remote table "categories" */
export type Categories_Arr_Rel_Insert_Input = {
  data: Array<Categories_Insert_Input>;
  on_conflict?: Maybe<Categories_On_Conflict>;
};

/** Boolean expression to filter rows from the table "categories". All fields are combined with a logical 'AND'. */
export type Categories_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Categories_Bool_Exp>>>;
  _not?: Maybe<Categories_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Categories_Bool_Exp>>>;
  categoryGroup?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "categories" */
export enum Categories_Constraint {
  /** unique or primary key constraint */
  CATEGORIES_PKEY = 'categories_pkey'
}

/** input type for inserting data into table "categories" */
export type Categories_Insert_Input = {
  categoryGroup?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type Categories_Max_Fields = {
   __typename?: 'categories_max_fields';
  categoryGroup?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** order by max() on columns of table "categories" */
export type Categories_Max_Order_By = {
  categoryGroup?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Categories_Min_Fields = {
   __typename?: 'categories_min_fields';
  categoryGroup?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** order by min() on columns of table "categories" */
export type Categories_Min_Order_By = {
  categoryGroup?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** response of any mutation on the table "categories" */
export type Categories_Mutation_Response = {
   __typename?: 'categories_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Categories>;
};

/** input type for inserting object relation for remote table "categories" */
export type Categories_Obj_Rel_Insert_Input = {
  data: Categories_Insert_Input;
  on_conflict?: Maybe<Categories_On_Conflict>;
};

/** on conflict condition type for table "categories" */
export type Categories_On_Conflict = {
  constraint: Categories_Constraint;
  update_columns: Array<Categories_Update_Column>;
  where?: Maybe<Categories_Bool_Exp>;
};

/** ordering options when selecting data from "categories" */
export type Categories_Order_By = {
  categoryGroup?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** primary key columns input for table: "categories" */
export type Categories_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "categories" */
export enum Categories_Select_Column {
  /** column name */
  CATEGORYGROUP = 'categoryGroup',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  NAME = 'name',
  /** column name */
  UPDATEDAT = 'updatedAt'
}

/** input type for updating data in table "categories" */
export type Categories_Set_Input = {
  categoryGroup?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** update columns of table "categories" */
export enum Categories_Update_Column {
  /** column name */
  CATEGORYGROUP = 'categoryGroup',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  NAME = 'name',
  /** column name */
  UPDATEDAT = 'updatedAt'
}

/** Boolean expression to filter rows from the table "categories". All fields are combined with a logical 'AND'. */
export type CategoriesBoolExp = {
  _and?: Maybe<Array<Maybe<CategoriesBoolExp>>>;
  _not?: Maybe<CategoriesBoolExp>;
  _or?: Maybe<Array<Maybe<CategoriesBoolExp>>>;
  categoryGroup?: Maybe<StringComparisonExp>;
  createdAt?: Maybe<TimestampComparisonExp>;
  id?: Maybe<StringComparisonExp>;
  name?: Maybe<StringComparisonExp>;
  updatedAt?: Maybe<TimestampComparisonExp>;
};

/** ordering options when selecting data from "categories" */
export type CategoriesOrderBy = {
  categoryGroup?: Maybe<OrderBy>;
  createdAt?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  updatedAt?: Maybe<OrderBy>;
};

/** columns and relationships of "chat_messages" */
export type Chat_Messages = {
   __typename?: 'chat_messages';
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
  count?: Maybe<Scalars['Int']>;
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
  on_conflict?: Maybe<Chat_Messages_On_Conflict>;
};

/** Boolean expression to filter rows from the table "chat_messages". All fields are combined with a logical 'AND'. */
export type Chat_Messages_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Chat_Messages_Bool_Exp>>>;
  _not?: Maybe<Chat_Messages_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Chat_Messages_Bool_Exp>>>;
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
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Chat_Messages>;
};

/** input type for inserting object relation for remote table "chat_messages" */
export type Chat_Messages_Obj_Rel_Insert_Input = {
  data: Chat_Messages_Insert_Input;
  on_conflict?: Maybe<Chat_Messages_On_Conflict>;
};

/** on conflict condition type for table "chat_messages" */
export type Chat_Messages_On_Conflict = {
  constraint: Chat_Messages_Constraint;
  update_columns: Array<Chat_Messages_Update_Column>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};

/** ordering options when selecting data from "chat_messages" */
export type Chat_Messages_Order_By = {
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

/** primary key columns input for table: "chat_messages" */
export type Chat_Messages_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "chat_messages" */
export enum Chat_Messages_Select_Column {
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
  /** An aggregated array relationship */
  messages_aggregate: Chat_Messages_Aggregate;
  name?: Maybe<Scalars['String']>;
  /** An object relationship */
  owner: Users;
  ownerId: Scalars['String'];
  /** An object relationship */
  product: Products;
  productId: Scalars['String'];
  status: Scalars['String'];
  /** An array relationship */
  users: Array<Chat_Users>;
  /** An aggregated array relationship */
  users_aggregate: Chat_Users_Aggregate;
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
export type Chat_RoomsUsersArgs = {
  distinct_on?: Maybe<Array<Chat_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Users_Order_By>>;
  where?: Maybe<Chat_Users_Bool_Exp>;
};


/** columns and relationships of "chat_rooms" */
export type Chat_RoomsUsers_AggregateArgs = {
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Chat_Rooms_Max_Fields>;
  min?: Maybe<Chat_Rooms_Min_Fields>;
};


/** aggregate fields of "chat_rooms" */
export type Chat_Rooms_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Chat_Rooms_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "chat_rooms" */
export type Chat_Rooms_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Chat_Rooms_Max_Order_By>;
  min?: Maybe<Chat_Rooms_Min_Order_By>;
};

/** input type for inserting array relation for remote table "chat_rooms" */
export type Chat_Rooms_Arr_Rel_Insert_Input = {
  data: Array<Chat_Rooms_Insert_Input>;
  on_conflict?: Maybe<Chat_Rooms_On_Conflict>;
};

/** Boolean expression to filter rows from the table "chat_rooms". All fields are combined with a logical 'AND'. */
export type Chat_Rooms_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Chat_Rooms_Bool_Exp>>>;
  _not?: Maybe<Chat_Rooms_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Chat_Rooms_Bool_Exp>>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  messages?: Maybe<Chat_Messages_Bool_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  owner?: Maybe<Users_Bool_Exp>;
  ownerId?: Maybe<String_Comparison_Exp>;
  product?: Maybe<Products_Bool_Exp>;
  productId?: Maybe<String_Comparison_Exp>;
  status?: Maybe<String_Comparison_Exp>;
  users?: Maybe<Chat_Users_Bool_Exp>;
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
  product?: Maybe<Products_Obj_Rel_Insert_Input>;
  productId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  users?: Maybe<Chat_Users_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Chat_Rooms_Max_Fields = {
   __typename?: 'chat_rooms_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "chat_rooms" */
export type Chat_Rooms_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  ownerId?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Chat_Rooms_Min_Fields = {
   __typename?: 'chat_rooms_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "chat_rooms" */
export type Chat_Rooms_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  ownerId?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
};

/** response of any mutation on the table "chat_rooms" */
export type Chat_Rooms_Mutation_Response = {
   __typename?: 'chat_rooms_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Chat_Rooms>;
};

/** input type for inserting object relation for remote table "chat_rooms" */
export type Chat_Rooms_Obj_Rel_Insert_Input = {
  data: Chat_Rooms_Insert_Input;
  on_conflict?: Maybe<Chat_Rooms_On_Conflict>;
};

/** on conflict condition type for table "chat_rooms" */
export type Chat_Rooms_On_Conflict = {
  constraint: Chat_Rooms_Constraint;
  update_columns: Array<Chat_Rooms_Update_Column>;
  where?: Maybe<Chat_Rooms_Bool_Exp>;
};

/** ordering options when selecting data from "chat_rooms" */
export type Chat_Rooms_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  messages_aggregate?: Maybe<Chat_Messages_Aggregate_Order_By>;
  name?: Maybe<Order_By>;
  owner?: Maybe<Users_Order_By>;
  ownerId?: Maybe<Order_By>;
  product?: Maybe<Products_Order_By>;
  productId?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  users_aggregate?: Maybe<Chat_Users_Aggregate_Order_By>;
};

/** primary key columns input for table: "chat_rooms" */
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
  PRODUCTID = 'productId',
  /** column name */
  STATUS = 'status'
}

/** input type for updating data in table "chat_rooms" */
export type Chat_Rooms_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
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
  PRODUCTID = 'productId',
  /** column name */
  STATUS = 'status'
}

/** columns and relationships of "chat_users" */
export type Chat_Users = {
   __typename?: 'chat_users';
  /** An object relationship */
  chatRoom?: Maybe<Chat_Rooms>;
  chatRoomId: Scalars['String'];
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
  count?: Maybe<Scalars['Int']>;
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
  on_conflict?: Maybe<Chat_Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "chat_users". All fields are combined with a logical 'AND'. */
export type Chat_Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Chat_Users_Bool_Exp>>>;
  _not?: Maybe<Chat_Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Chat_Users_Bool_Exp>>>;
  chatRoom?: Maybe<Chat_Rooms_Bool_Exp>;
  chatRoomId?: Maybe<String_Comparison_Exp>;
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
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Chat_Users_Max_Fields = {
   __typename?: 'chat_users_max_fields';
  chatRoomId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "chat_users" */
export type Chat_Users_Max_Order_By = {
  chatRoomId?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Chat_Users_Min_Fields = {
   __typename?: 'chat_users_min_fields';
  chatRoomId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "chat_users" */
export type Chat_Users_Min_Order_By = {
  chatRoomId?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** response of any mutation on the table "chat_users" */
export type Chat_Users_Mutation_Response = {
   __typename?: 'chat_users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Chat_Users>;
};

/** input type for inserting object relation for remote table "chat_users" */
export type Chat_Users_Obj_Rel_Insert_Input = {
  data: Chat_Users_Insert_Input;
  on_conflict?: Maybe<Chat_Users_On_Conflict>;
};

/** on conflict condition type for table "chat_users" */
export type Chat_Users_On_Conflict = {
  constraint: Chat_Users_Constraint;
  update_columns: Array<Chat_Users_Update_Column>;
  where?: Maybe<Chat_Users_Bool_Exp>;
};

/** ordering options when selecting data from "chat_users" */
export type Chat_Users_Order_By = {
  chatRoom?: Maybe<Chat_Rooms_Order_By>;
  chatRoomId?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: "chat_users" */
export type Chat_Users_Pk_Columns_Input = {
  chatRoomId: Scalars['String'];
  userId: Scalars['String'];
};

/** select columns of table "chat_users" */
export enum Chat_Users_Select_Column {
  /** column name */
  CHATROOMID = 'chatRoomId',
  /** column name */
  USERID = 'userId'
}

/** input type for updating data in table "chat_users" */
export type Chat_Users_Set_Input = {
  chatRoomId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** update columns of table "chat_users" */
export enum Chat_Users_Update_Column {
  /** column name */
  CHATROOMID = 'chatRoomId',
  /** column name */
  USERID = 'userId'
}

export type Connection = {
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ConnectionOffsetQuery = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ProductsOrderBy>;
  where?: Maybe<ProductsBoolExp>;
};

/** Parameters that control how to access pages within a Connection */
export type ConnectionQuery = {
  /**
   * Maximum number of items you want to see within a connection page.
   * Defaults to the maximum you can ask for, which is a sensible number controlled by the server.
   */
  count?: Maybe<Scalars['Int']>;
  /**
   * Reference to a point in the middle of the entire dataset from which to page either side of.
   * If not provided then it defaults to the start of the entire dataset.
   * If you need to access the other end of the dataset / navigate backwards, provide no cursor but flip sortAscending.
   * Defaults to null.
   */
  cursor?: Maybe<Scalars['PageCursor']>;
  /**
   * Whether or not to select a page backwards from the provided cursor (as opposed to forwards).
   * Either way the result set will exclude the item AT the specified cursor, because you already have it.
   * Defaults to false.
   */
  pageBackwards?: Maybe<Scalars['Boolean']>;
  /**
   * Whether or not to order the entire dataset in ascending form (as opposed to descending).
   * Defaults to false.
   */
  sortAscending?: Maybe<Scalars['Boolean']>;
};

export type ConnectionWithMetrics = {
  pageInfo: PageInfo;
  /** SUM(x) of a query, where x is a specific column to be aggregated */
  totalAmount?: Maybe<Scalars['Int']>;
  /** COUNT(*) of a query, larger than the number of paginated results returned */
  totalCount?: Maybe<Scalars['Int']>;
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


/** A product associated with an order, which may or may not be available for downloading */
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

export type HasuraPageInfo = {
   __typename?: 'HasuraPageInfo';
  isLastPage: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
};

/** Metadata about an image, including the size variants */
export type Image = {
   __typename?: 'Image';
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  original: ImageVariant;
  tags?: Maybe<Scalars['String']>;
  variants: Array<ImageVariant>;
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Image_Owners_Max_Fields>;
  min?: Maybe<Image_Owners_Min_Fields>;
};


/** aggregate fields of "image_owners" */
export type Image_Owners_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Image_Owners_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "image_owners" */
export type Image_Owners_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Image_Owners_Max_Order_By>;
  min?: Maybe<Image_Owners_Min_Order_By>;
};

/** input type for inserting array relation for remote table "image_owners" */
export type Image_Owners_Arr_Rel_Insert_Input = {
  data: Array<Image_Owners_Insert_Input>;
  on_conflict?: Maybe<Image_Owners_On_Conflict>;
};

/** Boolean expression to filter rows from the table "image_owners". All fields are combined with a logical 'AND'. */
export type Image_Owners_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Image_Owners_Bool_Exp>>>;
  _not?: Maybe<Image_Owners_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Image_Owners_Bool_Exp>>>;
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

/** order by max() on columns of table "image_owners" */
export type Image_Owners_Max_Order_By = {
  imageId?: Maybe<Order_By>;
  ownerId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Image_Owners_Min_Fields = {
   __typename?: 'image_owners_min_fields';
  imageId?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "image_owners" */
export type Image_Owners_Min_Order_By = {
  imageId?: Maybe<Order_By>;
  ownerId?: Maybe<Order_By>;
};

/** response of any mutation on the table "image_owners" */
export type Image_Owners_Mutation_Response = {
   __typename?: 'image_owners_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Image_Owners>;
};

/** input type for inserting object relation for remote table "image_owners" */
export type Image_Owners_Obj_Rel_Insert_Input = {
  data: Image_Owners_Insert_Input;
  on_conflict?: Maybe<Image_Owners_On_Conflict>;
};

/** on conflict condition type for table "image_owners" */
export type Image_Owners_On_Conflict = {
  constraint: Image_Owners_Constraint;
  update_columns: Array<Image_Owners_Update_Column>;
  where?: Maybe<Image_Owners_Bool_Exp>;
};

/** ordering options when selecting data from "image_owners" */
export type Image_Owners_Order_By = {
  imageId?: Maybe<Order_By>;
  ownerId?: Maybe<Order_By>;
};

/** primary key columns input for table: "image_owners" */
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
  /** An object relationship */
  original?: Maybe<Image_Variants>;
  originalVariantId: Scalars['String'];
  tags?: Maybe<Scalars['String']>;
  /** An array relationship */
  variants: Array<Image_Variants>;
  /** An aggregated array relationship */
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Image_Parents_Max_Fields>;
  min?: Maybe<Image_Parents_Min_Fields>;
};


/** aggregate fields of "image_parents" */
export type Image_Parents_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Image_Parents_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "image_parents" */
export type Image_Parents_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Image_Parents_Max_Order_By>;
  min?: Maybe<Image_Parents_Min_Order_By>;
};

/** input type for inserting array relation for remote table "image_parents" */
export type Image_Parents_Arr_Rel_Insert_Input = {
  data: Array<Image_Parents_Insert_Input>;
  on_conflict?: Maybe<Image_Parents_On_Conflict>;
};

/** Boolean expression to filter rows from the table "image_parents". All fields are combined with a logical 'AND'. */
export type Image_Parents_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Image_Parents_Bool_Exp>>>;
  _not?: Maybe<Image_Parents_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Image_Parents_Bool_Exp>>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
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

/** order by max() on columns of table "image_parents" */
export type Image_Parents_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  originalVariantId?: Maybe<Order_By>;
  tags?: Maybe<Order_By>;
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

/** order by min() on columns of table "image_parents" */
export type Image_Parents_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  originalVariantId?: Maybe<Order_By>;
  tags?: Maybe<Order_By>;
};

/** response of any mutation on the table "image_parents" */
export type Image_Parents_Mutation_Response = {
   __typename?: 'image_parents_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Image_Parents>;
};

/** input type for inserting object relation for remote table "image_parents" */
export type Image_Parents_Obj_Rel_Insert_Input = {
  data: Image_Parents_Insert_Input;
  on_conflict?: Maybe<Image_Parents_On_Conflict>;
};

/** on conflict condition type for table "image_parents" */
export type Image_Parents_On_Conflict = {
  constraint: Image_Parents_Constraint;
  update_columns: Array<Image_Parents_Update_Column>;
  where?: Maybe<Image_Parents_Bool_Exp>;
};

/** ordering options when selecting data from "image_parents" */
export type Image_Parents_Order_By = {
  createdAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  original?: Maybe<Image_Variants_Order_By>;
  originalVariantId?: Maybe<Order_By>;
  tags?: Maybe<Order_By>;
  variants_aggregate?: Maybe<Image_Variants_Aggregate_Order_By>;
};

/** primary key columns input for table: "image_parents" */
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
  ORIGINALVARIANTID = 'originalVariantId',
  /** column name */
  TAGS = 'tags'
}

/** input type for updating data in table "image_parents" */
export type Image_Parents_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
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
  _and?: Maybe<Array<Maybe<Image_Variants_Bool_Exp>>>;
  _not?: Maybe<Image_Variants_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Image_Variants_Bool_Exp>>>;
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

/** input type for incrementing integer column in table "image_variants" */
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
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Image_Variants>;
};

/** input type for inserting object relation for remote table "image_variants" */
export type Image_Variants_Obj_Rel_Insert_Input = {
  data: Image_Variants_Insert_Input;
  on_conflict?: Maybe<Image_Variants_On_Conflict>;
};

/** on conflict condition type for table "image_variants" */
export type Image_Variants_On_Conflict = {
  constraint: Image_Variants_Constraint;
  update_columns: Array<Image_Variants_Update_Column>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};

/** ordering options when selecting data from "image_variants" */
export type Image_Variants_Order_By = {
  heightInPixels?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  parentId?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
  widthInPixels?: Maybe<Order_By>;
};

/** primary key columns input for table: "image_variants" */
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

export type ImageUrl = {
   __typename?: 'ImageUrl';
  url: Scalars['String'];
};

/** Metadata about an individual image variant */
export type ImageVariant = {
   __typename?: 'ImageVariant';
  heightInPixels?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  mimeType?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  widthInPixels?: Maybe<Scalars['Int']>;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
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

export type Login2Response = {
   __typename?: 'Login2Response';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type LoginMutationResponse = {
   __typename?: 'LoginMutationResponse';
  jwt?: Maybe<Scalars['String']>;
  setCookie?: Maybe<Scalars['String']>;
  user: UserPrivate;
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
  count?: Maybe<Scalars['Int']>;
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

/** order by aggregate values of table "migrations" */
export type Migrations_Aggregate_Order_By = {
  avg?: Maybe<Migrations_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Migrations_Max_Order_By>;
  min?: Maybe<Migrations_Min_Order_By>;
  stddev?: Maybe<Migrations_Stddev_Order_By>;
  stddev_pop?: Maybe<Migrations_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Migrations_Stddev_Samp_Order_By>;
  sum?: Maybe<Migrations_Sum_Order_By>;
  var_pop?: Maybe<Migrations_Var_Pop_Order_By>;
  var_samp?: Maybe<Migrations_Var_Samp_Order_By>;
  variance?: Maybe<Migrations_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "migrations" */
export type Migrations_Arr_Rel_Insert_Input = {
  data: Array<Migrations_Insert_Input>;
  on_conflict?: Maybe<Migrations_On_Conflict>;
};

/** aggregate avg on columns */
export type Migrations_Avg_Fields = {
   __typename?: 'migrations_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "migrations" */
export type Migrations_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "migrations". All fields are combined with a logical 'AND'. */
export type Migrations_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Migrations_Bool_Exp>>>;
  _not?: Maybe<Migrations_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Migrations_Bool_Exp>>>;
  datetime?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "migrations" */
export enum Migrations_Constraint {
  /** unique or primary key constraint */
  MIGRATIONS_PKEY = 'migrations_pkey'
}

/** input type for incrementing integer column in table "migrations" */
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

/** order by max() on columns of table "migrations" */
export type Migrations_Max_Order_By = {
  datetime?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Migrations_Min_Fields = {
   __typename?: 'migrations_min_fields';
  datetime?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "migrations" */
export type Migrations_Min_Order_By = {
  datetime?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** response of any mutation on the table "migrations" */
export type Migrations_Mutation_Response = {
   __typename?: 'migrations_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Migrations>;
};

/** input type for inserting object relation for remote table "migrations" */
export type Migrations_Obj_Rel_Insert_Input = {
  data: Migrations_Insert_Input;
  on_conflict?: Maybe<Migrations_On_Conflict>;
};

/** on conflict condition type for table "migrations" */
export type Migrations_On_Conflict = {
  constraint: Migrations_Constraint;
  update_columns: Array<Migrations_Update_Column>;
  where?: Maybe<Migrations_Bool_Exp>;
};

/** ordering options when selecting data from "migrations" */
export type Migrations_Order_By = {
  datetime?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** primary key columns input for table: "migrations" */
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

/** order by stddev() on columns of table "migrations" */
export type Migrations_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Migrations_Stddev_Pop_Fields = {
   __typename?: 'migrations_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "migrations" */
export type Migrations_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Migrations_Stddev_Samp_Fields = {
   __typename?: 'migrations_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "migrations" */
export type Migrations_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Migrations_Sum_Fields = {
   __typename?: 'migrations_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "migrations" */
export type Migrations_Sum_Order_By = {
  id?: Maybe<Order_By>;
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

/** order by var_pop() on columns of table "migrations" */
export type Migrations_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Migrations_Var_Samp_Fields = {
   __typename?: 'migrations_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "migrations" */
export type Migrations_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Migrations_Variance_Fields = {
   __typename?: 'migrations_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "migrations" */
export type Migrations_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

export type MostRecentDownloadRecord = {
   __typename?: 'MostRecentDownloadRecord';
  downloadedAt?: Maybe<Scalars['Date']>;
  fileId: Scalars['ID'];
  fileName?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  /**
   * Add a payment method to a user's profile
   * 
   * AccessRule – LOGGED_IN
   */
  addPaymentMethod: AddRemovePaymentMethodResponse;
  /**
   * Add a product to a curated list.
   * 
   * It will be added at the bottom, but you can rearrange items later.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  addProductToCuratedList: CuratedListItemMutationResponse;
  /**
   * Add a product to the wishlist.
   * 
   * AccessRule – LOGGED_IN
   */
  addProductToWishlist: BlankMutationResponse;
  /**
   * Add a product to the cart.
   * 
   * AccessRule – LOGGED_IN
   * 
   * TODO: No reason for this to take the cart ID, seing as it's a user operation and they only have one cart
   */
  addProductsToCart: Cart;
  /**
   * Add a promo code to the cart.
   * 
   * AccessRule – LOGGED_IN
   */
  addPromoCodeToCart: CartMutationResponse;
  /**
   * Adjust the quantity in the cart for one of the items.
   * 
   * AccessRule – LOGGED_IN
   * 
   * TODO: No reason for this to take the cart ID, seing as it's a user operation and they only have one cart
   */
  adjustCartItemQuantity: Cart;
  /**
   * Create an affiliate identity for a user.
   * 
   * NOTE: This normally happens automatically for new users, so this is really just here to help create
   *       them for legacy users.
   * 
   * This will fail if the user already has one (no-op).
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  adminCreateAffiliateForUser: BlankMutationResponse;
  /**
   * Delete a specific user account.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  adminDeleteAccount: BlankMutationResponse;
  /**
   * Delete an affiliate identity owned by a user.
   * Pending payouts from the affiliate should still be available behind the scenes, but the user dashboard will clear.
   * 
   * WARNING: This will prevent new clicks and conversions for the affiliateID/ref.
   * 
   * This should be reserved for extraordinary situations, such as wanting to remove an undesirable affiliateId (eg ass1234).
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  adminDeleteAffiliateForUser: BlankMutationResponse;
  /**
   * Delete a specific product.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  adminDeleteProduct?: Maybe<ProductsMutationResponse>;
  /**
   * Delete a specific store.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  adminDeleteStore: StoreMutationResponse;
  /**
   * Generate a temporary URL to download a product file if you're an admin.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  adminGenerateProductFileDownloadLink: ProductFileLinkMutationResponse;
  /**
   * Admin capability to provide payment details to manually confirm an order after frontend has handled the payment.
   * 
   * This is essentially for manually retrying in the event that money has been taken without correctly writing out the order.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  adminManuallyConfirmOrderAfterFrontendPayment: OrderMutationResponse;
  /**
   * Approve selected Payouts, and dispatch Payouts to payout provider if
   * there are 2 approvals.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  approvePayouts: ApprovePayoutsResult;
  /**
   * Change your password.
   * 
   * AccessRule – LOGGED_IN
   */
  changePassword: UserMutationResponse;
  /**
   * Kickoff full checkout (order creation, payment, and order confirmation) for the logged-in user's cart.
   * 
   * AccessRule – LOGGED_IN
   */
  checkoutCart: OrderCreateMutationResponse;
  /**
   * Create an unconfirmed order for the contents of the logged-in user's cart with the intention to
   * then confirm it later when frontend has organised payment.
   * 
   * AccessRule – LOGGED_IN
   */
  checkoutCartForFrontendPayment: OrderMutationResponse;
  checkoutConfirmCart: OrderMutationResponse;
  checkoutConfirmProducts: OrderMutationResponse;
  /**
   * Kickoff full checkout (order creation, payment, and order confirmation) for a set of products.
   * 
   * Useful for InstantBuy OR checking out when you're not logged in, because in both cases there's no cart.
   * 
   * AccessRule – PUBLIC
   */
  checkoutProducts: OrderCreateMutationResponse;
  /**
   * Create an unconfirmed order for a set of products with the intention to then confirm it later
   * when frontend has organised payment.
   * 
   * Useful for InstantBuy OR checking out with frontend payment method when you're not logged in.
   * 
   * AccessRule – PUBLIC
   */
  checkoutProductsForFrontendPayment: OrderMutationResponse;
  /**
   * Claim ownership over an order that doesn't currently have an owner.
   * Designed for use after the user has logged in (or signed up) after making a logged out purchase.
   * 
   * AccessRule – LOGGED_IN
   */
  claimUnclaimedOrderOwnership: OrderMutationResponse;
  /**
   * Provide payment details to confirm an order after frontend has handled the payment.
   * 
   * This is only required for payment methods that cannot be executed on the backend (eg PayPal).
   * 
   * AccessRule – PUBLIC
   */
  confirmOrderAfterFrontendPayment: OrderMutationResponse;
  /**
   * Confirm password reset after receiving email
   * 
   * AccessRule – PUBLIC
   */
  confirmResetPassword: ResetPasswordResponse;
  /**
   * Create a new curated list.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  createCuratedList: CuratedListMutationResponse;
  /**
   * Create a PayoutSplit for a seller
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  createPayoutSplit: PayoutSplit;
  /**
   * Create a Payout from all existing unpaid PayoutItems for the month.
   * Adds 1 approval to payouts.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  createPayouts: Array<Payout>;
  /**
   * Create a product for the logged-in user's store.
   * 
   * AccessRule – LOGGED_IN
   */
  createProduct: ProductMutationResponse;
  /** AccessRule – PLATFORM_ADMIN */
  createRefund: CreateRefundMutationResponse;
  /**
   * Create the store profile for the logged-in user.
   * 
   * AccessRule – LOGGED_IN
   */
  createStore?: Maybe<StoreMutationResponse>;
  /**
   * Delete the account associated with the logged-in user.
   * 
   * AccessRule – LOGGED_IN
   */
  deleteAccount: BlankMutationResponse;
  /**
   * Delete a curated list.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  deleteCuratedList: BlankMutationResponse;
  /**
   * Delete a product from the logged-in user's store.
   * 
   * AccessRule – OWNER
   */
  deleteProduct?: Maybe<ProductsMutationResponse>;
  /**
   * Delete the store associated with the logged-in user.
   * 
   * AccessRule – LOGGED_IN
   */
  deleteStore: StoreMutationResponse;
  /**
   * Create a product for the logged-in user's store.
   * 
   * If a platform admin has suspended the product, changing isPublished will not be able to override that.
   * 
   * AccessRule – LOGGED_IN
   */
  editProduct: ProductMutationResponse;
  /**
   * Edit the store profile for the logged-in user.
   * 
   * AccessRule – LOGGED_IN
   */
  editStoreProfile?: Maybe<StoreMutationResponse>;
  /**
   * Edit user profile information.
   * 
   * AccessRule – LOGGED_IN
   */
  editUserProfile: UserMutationResponse;
  /**
   * Exclude a product from any search results.
   * The only way to find the product will be through direct link, or
   * having it show up in an automatic or curated list.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  excludeProductFromSearch?: Maybe<ProductMutationResponse>;
  /**
   * Follow a store.
   * 
   * AccessRule – LOGGED_IN
   */
  followStore: FollowingStoresConnection;
  /**
   * Generate a temporary URL to download a product file.
   * 
   * AccessRule – LOGGED_IN (and product owning the file has been purchased...)
   */
  generateProductFileDownloadLink: ProductFileLinkMutationResponse;
  /**
   * Re-include a product that was being excluded from search results.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  includeProductInSearch?: Maybe<ProductMutationResponse>;
  /**
   * Log in using an email address and password.
   * 
   * AccessRule – PUBLIC
   */
  logInUsingEmail: LoginMutationResponse;
  /**
   * Log out and invalidate access tokens.
   * 
   * AccessRule – LOGGED_IN
   */
  logOut: BlankMutationResponse;
  /**
   * Change the location of the items in a curated list.
   * 
   * This works by providing the complete list of itemIds, in the order you want them to appear in the list.
   * It is designed to work well with a Save button design, rather than a real-time drag and drop edit UX.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  rearrangeCuratedListItems: CuratedListMutationResponse;
  /**
   * Record that an affiliate link was clicked, and receive a cookie to keep track of the referral.
   * 
   * AccessRule – PUBLIC
   */
  recordAffiliateLinkClick: BlankMutationResponse;
  /**
   * Refresh the contents and pricing breakdown of the cart.
   * This is needed for making sure products are still purchasable and promo codes are still valid.
   * AccessRule – LOGGED_IN
   */
  refreshCart: CartMutationResponse;
  /**
   * Remove an item in a curated list.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  removeItemFromCuratedList: CuratedListMutationResponse;
  /**
   * Remove a payment method from a user's profile
   * 
   * AccessRule – LOGGED_IN
   */
  removePaymentMethod: AddRemovePaymentMethodResponse;
  /**
   * Remove a product from the wishlist.
   * 
   * AccessRule – LOGGED_IN
   */
  removeProductFromWishlist: BlankMutationResponse;
  /**
   * Remove a product from the cart.
   * 
   * AccessRule – LOGGED_IN
   * 
   * TODO: No reason for this to take the cart ID, seing as it's a user operation and they only have one cart
   */
  removeProductsFromCart: Cart;
  /**
   * Remove a promo code from the cart.
   * 
   * AccessRule – LOGGED_IN
   */
  removePromoCodeFromCart: CartMutationResponse;
  /**
   * Remove any reserved link stub currently in use for your store.
   * 
   * AccessRule – LOGGED_IN
   */
  removeStoreLinkSlug: BlankMutationResponse;
  /**
   * Attempt to reserve a store link slug for your store.
   * 
   * You can only have one of these at a time, so changing it will release any old one for other stores to use.
   * The slug you provide should be validated to be url-friendly otherwise it may fail server side validation.
   * 
   * AccessRule – LOGGED_IN
   */
  reserveStoreLinkSlug?: Maybe<PrimaryLinkSlugs>;
  /**
   * Send a password reset email.
   * 
   * AccessRule – PUBLIC
   */
  sendResetPasswordEmail: SendResetPasswordResponse;
  /**
   * Verify the logged-in user's email address using a code that was emailed to them.
   * 
   * AccessRule – LOGGED_IN
   */
  sendVerifyEmail: UserMutationResponse;
  /**
   * Set the default payment method for a user (credit cards)
   * 
   * AccessRule – LOGGED_IN
   */
  setDefaultPaymentMethod: AddRemovePaymentMethodResponse;
  /**
   * Change your payout method.
   * 
   * AccessRule – LOGGED_IN
   */
  setPayoutMethod: UserMutationResponse;
  /**
   * Create a new account using an email address and password.
   * 
   * AccessRule – PUBLIC
   */
  signUpUsingEmail: SignUpMutationResponse;
  /**
   * Suspend a product.
   * This will force the product to become unavailable for purchase or downloading.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  suspendProduct?: Maybe<ProductMutationResponse>;
  /**
   * Suspend a store.
   * This will force the store and its products to become hidden for everyone except the store owner.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  suspendStore?: Maybe<StoreMutationResponse>;
  /**
   * Suspend a user account.
   * This will have a number of side effects:
   * - User will be logged out
   * - User will be unable to log back in
   * - If they are a store owner, their store will disappear
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  suspendUser: BlankMutationResponse;
  /**
   * Unfollow a store
   * 
   * AccessRule – LOGGED_IN
   */
  unfollowStore: FollowingStoresConnection;
  /**
   * Reinstate a suspended product.
   * This will reverse the number of side effects of suspension.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  unsuspendProduct?: Maybe<ProductMutationResponse>;
  /**
   * Reinstate a suspended store.
   * This will reverse the number of side effects of suspension.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  unsuspendStore?: Maybe<StoreMutationResponse>;
  /**
   * Reinstate a suspended user's account.
   * This will reverse the number of side effects of suspension.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  unsuspendUser: BlankMutationResponse;
  /**
   * Request to upload a piece of content.
   * 
   * This is the first stage of uploading - registration.
   * 
   * How uploading works:
   * 1. Register the upload and receive the upload ID and PUT URL.
   * 2. Use the PUT URL received in this response to actually upload the file.
   * 3. Then use uploadSave to make it official – your uploaded file will be validated.
   * 
   * AccessRule – LOGGED_IN
   */
  uploadRegister: UploadRegisterMutationResponse;
  /**
   * Request to save an uploaded image / make it official.
   * 
   * This is the last stage of uploading - saving.
   * Your uploaded image will be validated and made available for use.
   * 
   * AccessRule – LOGGED_IN
   */
  uploadSaveImage: UploadSaveImageMutationResponse;
  /**
   * Request to save an uploaded product file / make it official.
   * 
   * This is the last stage of uploading - saving.
   * Your uploaded file will be validated and made available for use.
   * 
   * AccessRule – LOGGED_IN
   */
  uploadSaveProductFile: UploadSaveProductFileMutationResponse;
  /**
   * keeps track of when you last visited a store
   * 
   * AccessRule – LOGGED_IN
   */
  visitStore: FollowingStoresConnection;
};


export type MutationAddPaymentMethodArgs = {
  customerId: Scalars['String'];
  paymentMethodId: Scalars['String'];
};


export type MutationAddProductToCuratedListArgs = {
  listId: Scalars['String'];
  productId: Scalars['String'];
  variantId?: Maybe<Scalars['String']>;
};


export type MutationAddProductToWishlistArgs = {
  productId: Scalars['String'];
  variantId: Scalars['String'];
};


export type MutationAddProductsToCartArgs = {
  cartId: Scalars['String'];
  productProductVariantIds: Array<ProductProductVariantId>;
};


export type MutationAddPromoCodeToCartArgs = {
  code: Scalars['String'];
};


export type MutationAdjustCartItemQuantityArgs = {
  cartId: Scalars['String'];
  itemId: Scalars['String'];
  quantity?: Maybe<Scalars['Int']>;
};


export type MutationAdminCreateAffiliateForUserArgs = {
  userId: Scalars['String'];
};


export type MutationAdminDeleteAccountArgs = {
  userId: Scalars['String'];
};


export type MutationAdminDeleteAffiliateForUserArgs = {
  userId: Scalars['String'];
};


export type MutationAdminDeleteProductArgs = {
  productId: Scalars['String'];
};


export type MutationAdminDeleteStoreArgs = {
  storeId: Scalars['String'];
};


export type MutationAdminGenerateProductFileDownloadLinkArgs = {
  id: Scalars['String'];
};


export type MutationAdminManuallyConfirmOrderAfterFrontendPaymentArgs = {
  anonOrderEmailAddress?: Maybe<Scalars['String']>;
  cartIdToEmpty?: Maybe<Scalars['String']>;
  orderId: Scalars['String'];
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
  unconfirmedOrderId: Scalars['String'];
};


export type MutationCheckoutConfirmProductsArgs = {
  anonOrderEmailAddress?: Maybe<Scalars['String']>;
  paymentProcessorData: Scalars['String'];
  unconfirmedOrderId: Scalars['String'];
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
  orderId: Scalars['String'];
};


export type MutationConfirmOrderAfterFrontendPaymentArgs = {
  anonOrderEmailAddress?: Maybe<Scalars['String']>;
  orderId: Scalars['String'];
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


export type MutationCreateProductArgs = {
  productCreateInput?: Maybe<ProductCreateInput>;
};


export type MutationCreateRefundArgs = {
  input: CreateRefundInput;
};


export type MutationCreateStoreArgs = {
  bio?: Maybe<Scalars['String']>;
  coverId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String'];
};


export type MutationDeleteCuratedListArgs = {
  listId: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  productId: Scalars['String'];
};


export type MutationDeleteStoreArgs = {
  password: Scalars['String'];
};


export type MutationEditProductArgs = {
  productEditInput?: Maybe<ProductEditInput>;
};


export type MutationEditStoreProfileArgs = {
  bio?: Maybe<Scalars['String']>;
  coverId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};


export type MutationEditUserProfileArgs = {
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  payoutMethod?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};


export type MutationExcludeProductFromSearchArgs = {
  productId: Scalars['String'];
};


export type MutationFollowStoreArgs = {
  query?: Maybe<ConnectionQuery>;
  storeId: Scalars['String'];
};


export type MutationGenerateProductFileDownloadLinkArgs = {
  id: Scalars['String'];
  orderItemId: Scalars['String'];
};


export type MutationIncludeProductInSearchArgs = {
  productId: Scalars['String'];
};


export type MutationLogInUsingEmailArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRearrangeCuratedListItemsArgs = {
  itemIdsInOrder: Array<Scalars['ID']>;
  listId: Scalars['String'];
};


export type MutationRecordAffiliateLinkClickArgs = {
  affiliateId: Scalars['String'];
  path: Scalars['String'];
};


export type MutationRemoveItemFromCuratedListArgs = {
  itemId: Scalars['String'];
  listId: Scalars['String'];
};


export type MutationRemovePaymentMethodArgs = {
  customerId: Scalars['String'];
  paymentMethodId: Scalars['String'];
};


export type MutationRemoveProductFromWishlistArgs = {
  productId: Scalars['String'];
  variantId: Scalars['String'];
};


export type MutationRemoveProductsFromCartArgs = {
  cartId: Scalars['String'];
  productProductVariantIds: Array<ProductProductVariantId>;
};


export type MutationRemovePromoCodeFromCartArgs = {
  discountId: Scalars['String'];
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
  customerId: Scalars['String'];
  paymentMethodId: Scalars['String'];
};


export type MutationSetPayoutMethodArgs = {
  payoutEmail?: Maybe<Scalars['String']>;
  payoutProcessor?: Maybe<Scalars['String']>;
  payoutProcessorId?: Maybe<Scalars['String']>;
  payoutType?: Maybe<PayoutType>;
};


export type MutationSignUpUsingEmailArgs = {
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};


export type MutationSuspendProductArgs = {
  productId: Scalars['String'];
};


export type MutationSuspendStoreArgs = {
  storeId: Scalars['String'];
};


export type MutationSuspendUserArgs = {
  userId: Scalars['String'];
};


export type MutationUnfollowStoreArgs = {
  query?: Maybe<ConnectionQuery>;
  storeId: Scalars['String'];
};


export type MutationUnsuspendProductArgs = {
  productId: Scalars['String'];
};


export type MutationUnsuspendStoreArgs = {
  storeId: Scalars['String'];
};


export type MutationUnsuspendUserArgs = {
  userId: Scalars['String'];
};


export type MutationUploadRegisterArgs = {
  fileSize: Scalars['Int'];
  mimeType: Scalars['String'];
  uploadType: UploadType;
};


export type MutationUploadSaveImageArgs = {
  description?: Maybe<Scalars['String']>;
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags?: Maybe<Scalars['String']>;
  uploadId: Scalars['String'];
};


export type MutationUploadSaveProductFileArgs = {
  fileName: Scalars['String'];
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  uploadId: Scalars['String'];
};


export type MutationVisitStoreArgs = {
  query?: Maybe<ConnectionQuery>;
  storeId: Scalars['String'];
};

/** mutation root */
export type Mutation_Root = {
   __typename?: 'mutation_root';
  /**
   * Add a payment method to a user's profile
   * 
   * AccessRule – LOGGED_IN
   */
  addPaymentMethod: AddRemovePaymentMethodResponse;
  /**
   * Add a product to a curated list.
   * 
   * It will be added at the bottom, but you can rearrange items later.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  addProductToCuratedList: CuratedListItemMutationResponse;
  /**
   * Add a product to the wishlist.
   * 
   * AccessRule – LOGGED_IN
   */
  addProductToWishlist: BlankMutationResponse;
  /**
   * Add a product to the cart.
   * 
   * AccessRule – LOGGED_IN
   * 
   * TODO: No reason for this to take the cart ID, seing as it's a user operation and they only have one cart
   */
  addProductsToCart: Cart;
  /**
   * Add a promo code to the cart.
   * 
   * AccessRule – LOGGED_IN
   */
  addPromoCodeToCart: CartMutationResponse;
  /**
   * Adjust the quantity in the cart for one of the items.
   * 
   * AccessRule – LOGGED_IN
   * 
   * TODO: No reason for this to take the cart ID, seing as it's a user operation and they only have one cart
   */
  adjustCartItemQuantity: Cart;
  /**
   * Create an affiliate identity for a user.
   * 
   * NOTE: This normally happens automatically for new users, so this is really just here to help create
   *       them for legacy users.
   * 
   * This will fail if the user already has one (no-op).
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  adminCreateAffiliateForUser: BlankMutationResponse;
  /**
   * Delete a specific user account.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  adminDeleteAccount: BlankMutationResponse;
  /**
   * Delete an affiliate identity owned by a user.
   * Pending payouts from the affiliate should still be available behind the scenes, but the user dashboard will clear.
   * 
   * WARNING: This will prevent new clicks and conversions for the affiliateID/ref.
   * 
   * This should be reserved for extraordinary situations, such as wanting to remove an undesirable affiliateId (eg ass1234).
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  adminDeleteAffiliateForUser: BlankMutationResponse;
  /**
   * Delete a specific product.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  adminDeleteProduct?: Maybe<ProductsMutationResponse>;
  /**
   * Delete a specific store.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  adminDeleteStore: StoreMutationResponse;
  /**
   * Generate a temporary URL to download a product file if you're an admin.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  adminGenerateProductFileDownloadLink: ProductFileLinkMutationResponse;
  /**
   * Admin capability to provide payment details to manually confirm an order after frontend has handled the payment.
   * 
   * This is essentially for manually retrying in the event that money has been taken without correctly writing out the order.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  adminManuallyConfirmOrderAfterFrontendPayment: OrderMutationResponse;
  /**
   * Approve selected Payouts, and dispatch Payouts to payout provider if
   * there are 2 approvals.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  approvePayouts: ApprovePayoutsResult;
  /**
   * Change your password.
   * 
   * AccessRule – LOGGED_IN
   */
  changePassword: UserMutationResponse;
  /**
   * Kickoff full checkout (order creation, payment, and order confirmation) for the logged-in user's cart.
   * 
   * AccessRule – LOGGED_IN
   */
  checkoutCart: OrderCreateMutationResponse;
  /**
   * Create an unconfirmed order for the contents of the logged-in user's cart with the intention to
   * then confirm it later when frontend has organised payment.
   * 
   * AccessRule – LOGGED_IN
   */
  checkoutCartForFrontendPayment: OrderMutationResponse;
  checkoutConfirmCart: OrderMutationResponse;
  checkoutConfirmProducts: OrderMutationResponse;
  /**
   * Kickoff full checkout (order creation, payment, and order confirmation) for a set of products.
   * 
   * Useful for InstantBuy OR checking out when you're not logged in, because in both cases there's no cart.
   * 
   * AccessRule – PUBLIC
   */
  checkoutProducts: OrderCreateMutationResponse;
  /**
   * Create an unconfirmed order for a set of products with the intention to then confirm it later
   * when frontend has organised payment.
   * 
   * Useful for InstantBuy OR checking out with frontend payment method when you're not logged in.
   * 
   * AccessRule – PUBLIC
   */
  checkoutProductsForFrontendPayment: OrderMutationResponse;
  /**
   * Claim ownership over an order that doesn't currently have an owner.
   * Designed for use after the user has logged in (or signed up) after making a logged out purchase.
   * 
   * AccessRule – LOGGED_IN
   */
  claimUnclaimedOrderOwnership: OrderMutationResponse;
  /**
   * Provide payment details to confirm an order after frontend has handled the payment.
   * 
   * This is only required for payment methods that cannot be executed on the backend (eg PayPal).
   * 
   * AccessRule – PUBLIC
   */
  confirmOrderAfterFrontendPayment: OrderMutationResponse;
  /**
   * Confirm password reset after receiving email
   * 
   * AccessRule – PUBLIC
   */
  confirmResetPassword: ResetPasswordResponse;
  /**
   * Create a new curated list.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  createCuratedList: CuratedListMutationResponse;
  /**
   * Create a PayoutSplit for a seller
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  createPayoutSplit: PayoutSplit;
  /**
   * Create a Payout from all existing unpaid PayoutItems for the month.
   * Adds 1 approval to payouts.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  createPayouts: Array<Payout>;
  /**
   * Create a product for the logged-in user's store.
   * 
   * AccessRule – LOGGED_IN
   */
  createProduct: ProductMutationResponse;
  /** AccessRule – PLATFORM_ADMIN */
  createRefund: CreateRefundMutationResponse;
  /**
   * Create the store profile for the logged-in user.
   * 
   * AccessRule – LOGGED_IN
   */
  createStore?: Maybe<StoreMutationResponse>;
  /**
   * Delete the account associated with the logged-in user.
   * 
   * AccessRule – LOGGED_IN
   */
  deleteAccount: BlankMutationResponse;
  /**
   * Delete a curated list.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  deleteCuratedList: BlankMutationResponse;
  /**
   * Delete a product from the logged-in user's store.
   * 
   * AccessRule – OWNER
   */
  deleteProduct?: Maybe<ProductsMutationResponse>;
  /**
   * Delete the store associated with the logged-in user.
   * 
   * AccessRule – LOGGED_IN
   */
  deleteStore: StoreMutationResponse;
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
  /** delete data from the table: "payment_methods" */
  delete_payment_methods?: Maybe<Payment_Methods_Mutation_Response>;
  /** delete single row from the table: "payment_methods" */
  delete_payment_methods_by_pk?: Maybe<Payment_Methods>;
  /** delete data from the table: "payout_methods" */
  delete_payout_methods?: Maybe<Payout_Methods_Mutation_Response>;
  /** delete single row from the table: "payout_methods" */
  delete_payout_methods_by_pk?: Maybe<Payout_Methods>;
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
  /** delete data from the table: "stores" */
  delete_stores?: Maybe<Stores_Mutation_Response>;
  /** delete single row from the table: "stores" */
  delete_stores_by_pk?: Maybe<Stores>;
  /** delete data from the table: "user_licenses" */
  delete_user_licenses?: Maybe<User_Licenses_Mutation_Response>;
  /** delete single row from the table: "user_licenses" */
  delete_user_licenses_by_pk?: Maybe<User_Licenses>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /**
   * Create a product for the logged-in user's store.
   * 
   * If a platform admin has suspended the product, changing isPublished will not be able to override that.
   * 
   * AccessRule – LOGGED_IN
   */
  editProduct: ProductMutationResponse;
  /**
   * Edit the store profile for the logged-in user.
   * 
   * AccessRule – LOGGED_IN
   */
  editStoreProfile?: Maybe<StoreMutationResponse>;
  /**
   * Edit user profile information.
   * 
   * AccessRule – LOGGED_IN
   */
  editUserProfile: UserMutationResponse;
  /**
   * Exclude a product from any search results.
   * The only way to find the product will be through direct link, or
   * having it show up in an automatic or curated list.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  excludeProductFromSearch?: Maybe<ProductMutationResponse>;
  /**
   * Follow a store.
   * 
   * AccessRule – LOGGED_IN
   */
  followStore: FollowingStoresConnection;
  /**
   * Generate a temporary URL to download a product file.
   * 
   * AccessRule – LOGGED_IN (and product owning the file has been purchased...)
   */
  generateProductFileDownloadLink: ProductFileLinkMutationResponse;
  /**
   * Re-include a product that was being excluded from search results.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  includeProductInSearch?: Maybe<ProductMutationResponse>;
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
  /** insert data into the table: "payment_methods" */
  insert_payment_methods?: Maybe<Payment_Methods_Mutation_Response>;
  /** insert a single row into the table: "payment_methods" */
  insert_payment_methods_one?: Maybe<Payment_Methods>;
  /** insert data into the table: "payout_methods" */
  insert_payout_methods?: Maybe<Payout_Methods_Mutation_Response>;
  /** insert a single row into the table: "payout_methods" */
  insert_payout_methods_one?: Maybe<Payout_Methods>;
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
  /** insert data into the table: "stores" */
  insert_stores?: Maybe<Stores_Mutation_Response>;
  /** insert a single row into the table: "stores" */
  insert_stores_one?: Maybe<Stores>;
  /** insert data into the table: "user_licenses" */
  insert_user_licenses?: Maybe<User_Licenses_Mutation_Response>;
  /** insert a single row into the table: "user_licenses" */
  insert_user_licenses_one?: Maybe<User_Licenses>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /**
   * Log in using an email address and password.
   * 
   * AccessRule – PUBLIC
   */
  logInUsingEmail: LoginMutationResponse;
  /**
   * Log out and invalidate access tokens.
   * 
   * AccessRule – LOGGED_IN
   */
  logOut: BlankMutationResponse;
  /**
   * Change the location of the items in a curated list.
   * 
   * This works by providing the complete list of itemIds, in the order you want them to appear in the list.
   * It is designed to work well with a Save button design, rather than a real-time drag and drop edit UX.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  rearrangeCuratedListItems: CuratedListMutationResponse;
  /**
   * Record that an affiliate link was clicked, and receive a cookie to keep track of the referral.
   * 
   * AccessRule – PUBLIC
   */
  recordAffiliateLinkClick: BlankMutationResponse;
  /**
   * Refresh the contents and pricing breakdown of the cart.
   * This is needed for making sure products are still purchasable and promo codes are still valid.
   * AccessRule – LOGGED_IN
   */
  refreshCart: CartMutationResponse;
  /**
   * Remove an item in a curated list.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  removeItemFromCuratedList: CuratedListMutationResponse;
  /**
   * Remove a payment method from a user's profile
   * 
   * AccessRule – LOGGED_IN
   */
  removePaymentMethod: AddRemovePaymentMethodResponse;
  /**
   * Remove a product from the wishlist.
   * 
   * AccessRule – LOGGED_IN
   */
  removeProductFromWishlist: BlankMutationResponse;
  /**
   * Remove a product from the cart.
   * 
   * AccessRule – LOGGED_IN
   * 
   * TODO: No reason for this to take the cart ID, seing as it's a user operation and they only have one cart
   */
  removeProductsFromCart: Cart;
  /**
   * Remove a promo code from the cart.
   * 
   * AccessRule – LOGGED_IN
   */
  removePromoCodeFromCart: CartMutationResponse;
  /**
   * Remove any reserved link stub currently in use for your store.
   * 
   * AccessRule – LOGGED_IN
   */
  removeStoreLinkSlug: BlankMutationResponse;
  /**
   * Attempt to reserve a store link slug for your store.
   * 
   * You can only have one of these at a time, so changing it will release any old one for other stores to use.
   * The slug you provide should be validated to be url-friendly otherwise it may fail server side validation.
   * 
   * AccessRule – LOGGED_IN
   */
  reserveStoreLinkSlug?: Maybe<PrimaryLinkSlugs>;
  /**
   * Send a password reset email.
   * 
   * AccessRule – PUBLIC
   */
  sendResetPasswordEmail: SendResetPasswordResponse;
  /**
   * Verify the logged-in user's email address using a code that was emailed to them.
   * 
   * AccessRule – LOGGED_IN
   */
  sendVerifyEmail: UserMutationResponse;
  /**
   * Set the default payment method for a user (credit cards)
   * 
   * AccessRule – LOGGED_IN
   */
  setDefaultPaymentMethod: AddRemovePaymentMethodResponse;
  /**
   * Change your payout method.
   * 
   * AccessRule – LOGGED_IN
   */
  setPayoutMethod: UserMutationResponse;
  /**
   * Create a new account using an email address and password.
   * 
   * AccessRule – PUBLIC
   */
  signUpUsingEmail: SignUpMutationResponse;
  /**
   * Suspend a product.
   * This will force the product to become unavailable for purchase or downloading.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  suspendProduct?: Maybe<ProductMutationResponse>;
  /**
   * Suspend a store.
   * This will force the store and its products to become hidden for everyone except the store owner.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  suspendStore?: Maybe<StoreMutationResponse>;
  /**
   * Suspend a user account.
   * This will have a number of side effects:
   * - User will be logged out
   * - User will be unable to log back in
   * - If they are a store owner, their store will disappear
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  suspendUser: BlankMutationResponse;
  /**
   * Unfollow a store
   * 
   * AccessRule – LOGGED_IN
   */
  unfollowStore: FollowingStoresConnection;
  /**
   * Reinstate a suspended product.
   * This will reverse the number of side effects of suspension.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  unsuspendProduct?: Maybe<ProductMutationResponse>;
  /**
   * Reinstate a suspended store.
   * This will reverse the number of side effects of suspension.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  unsuspendStore?: Maybe<StoreMutationResponse>;
  /**
   * Reinstate a suspended user's account.
   * This will reverse the number of side effects of suspension.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  unsuspendUser: BlankMutationResponse;
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
  /** update data of the table: "payment_methods" */
  update_payment_methods?: Maybe<Payment_Methods_Mutation_Response>;
  /** update single row of the table: "payment_methods" */
  update_payment_methods_by_pk?: Maybe<Payment_Methods>;
  /** update data of the table: "payout_methods" */
  update_payout_methods?: Maybe<Payout_Methods_Mutation_Response>;
  /** update single row of the table: "payout_methods" */
  update_payout_methods_by_pk?: Maybe<Payout_Methods>;
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
  /** update data of the table: "stores" */
  update_stores?: Maybe<Stores_Mutation_Response>;
  /** update single row of the table: "stores" */
  update_stores_by_pk?: Maybe<Stores>;
  /** update data of the table: "user_licenses" */
  update_user_licenses?: Maybe<User_Licenses_Mutation_Response>;
  /** update single row of the table: "user_licenses" */
  update_user_licenses_by_pk?: Maybe<User_Licenses>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /**
   * Request to upload a piece of content.
   * 
   * This is the first stage of uploading - registration.
   * 
   * How uploading works:
   * 1. Register the upload and receive the upload ID and PUT URL.
   * 2. Use the PUT URL received in this response to actually upload the file.
   * 3. Then use uploadSave to make it official – your uploaded file will be validated.
   * 
   * AccessRule – LOGGED_IN
   */
  uploadRegister: UploadRegisterMutationResponse;
  /**
   * Request to save an uploaded image / make it official.
   * 
   * This is the last stage of uploading - saving.
   * Your uploaded image will be validated and made available for use.
   * 
   * AccessRule – LOGGED_IN
   */
  uploadSaveImage: UploadSaveImageMutationResponse;
  /**
   * Request to save an uploaded product file / make it official.
   * 
   * This is the last stage of uploading - saving.
   * Your uploaded file will be validated and made available for use.
   * 
   * AccessRule – LOGGED_IN
   */
  uploadSaveProductFile: UploadSaveProductFileMutationResponse;
  /**
   * keeps track of when you last visited a store
   * 
   * AccessRule – LOGGED_IN
   */
  visitStore: FollowingStoresConnection;
};


/** mutation root */
export type Mutation_RootAddPaymentMethodArgs = {
  customerId: Scalars['String'];
  paymentMethodId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootAddProductToCuratedListArgs = {
  listId: Scalars['String'];
  productId: Scalars['String'];
  variantId?: Maybe<Scalars['String']>;
};


/** mutation root */
export type Mutation_RootAddProductToWishlistArgs = {
  productId: Scalars['String'];
  variantId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootAddProductsToCartArgs = {
  cartId: Scalars['String'];
  productProductVariantIds: Array<ProductProductVariantId>;
};


/** mutation root */
export type Mutation_RootAddPromoCodeToCartArgs = {
  code: Scalars['String'];
};


/** mutation root */
export type Mutation_RootAdjustCartItemQuantityArgs = {
  cartId: Scalars['String'];
  itemId: Scalars['String'];
  quantity?: Maybe<Scalars['Int']>;
};


/** mutation root */
export type Mutation_RootAdminCreateAffiliateForUserArgs = {
  userId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootAdminDeleteAccountArgs = {
  userId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootAdminDeleteAffiliateForUserArgs = {
  userId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootAdminDeleteProductArgs = {
  productId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootAdminDeleteStoreArgs = {
  storeId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootAdminGenerateProductFileDownloadLinkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootAdminManuallyConfirmOrderAfterFrontendPaymentArgs = {
  anonOrderEmailAddress?: Maybe<Scalars['String']>;
  cartIdToEmpty?: Maybe<Scalars['String']>;
  orderId: Scalars['String'];
  paymentProcessorData: Scalars['String'];
};


/** mutation root */
export type Mutation_RootApprovePayoutsArgs = {
  payoutIds: Array<Scalars['String']>;
};


/** mutation root */
export type Mutation_RootChangePasswordArgs = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


/** mutation root */
export type Mutation_RootCheckoutCartArgs = {
  paymentProcessorData: Scalars['String'];
  quotedPrice: Scalars['Price'];
};


/** mutation root */
export type Mutation_RootCheckoutCartForFrontendPaymentArgs = {
  quotedPrice: Scalars['Price'];
};


/** mutation root */
export type Mutation_RootCheckoutConfirmCartArgs = {
  paymentProcessorData: Scalars['String'];
  unconfirmedOrderId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootCheckoutConfirmProductsArgs = {
  anonOrderEmailAddress?: Maybe<Scalars['String']>;
  paymentProcessorData: Scalars['String'];
  unconfirmedOrderId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootCheckoutProductsArgs = {
  paymentProcessorData: Scalars['String'];
  productsInfo: Array<ProductProductVariantId>;
  promoCodesToAdd?: Maybe<Array<Scalars['String']>>;
  quotedPrice: Scalars['Price'];
};


/** mutation root */
export type Mutation_RootCheckoutProductsForFrontendPaymentArgs = {
  productsInfo: Array<ProductProductVariantId>;
  promoCodesToAdd?: Maybe<Array<Scalars['String']>>;
  quotedPrice: Scalars['Price'];
};


/** mutation root */
export type Mutation_RootClaimUnclaimedOrderOwnershipArgs = {
  orderId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootConfirmOrderAfterFrontendPaymentArgs = {
  anonOrderEmailAddress?: Maybe<Scalars['String']>;
  orderId: Scalars['String'];
  paymentProcessorData: Scalars['String'];
};


/** mutation root */
export type Mutation_RootConfirmResetPasswordArgs = {
  email: Scalars['String'];
  expiresAt: Scalars['Date'];
  newPassword?: Maybe<Scalars['String']>;
  resetId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootCreateCuratedListArgs = {
  name: Scalars['String'];
};


/** mutation root */
export type Mutation_RootCreatePayoutSplitArgs = {
  dealType: PayoutDealType;
  expiresAt?: Maybe<Scalars['Date']>;
  rate: Scalars['Float'];
  referrerId?: Maybe<Scalars['String']>;
  storeOrUserId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootCreatePayoutsArgs = {
  month: Scalars['Int'];
  year: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootCreateProductArgs = {
  productCreateInput?: Maybe<ProductCreateInput>;
};


/** mutation root */
export type Mutation_RootCreateRefundArgs = {
  input: CreateRefundInput;
};


/** mutation root */
export type Mutation_RootCreateStoreArgs = {
  bio?: Maybe<Scalars['String']>;
  coverId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};


/** mutation root */
export type Mutation_RootDeleteAccountArgs = {
  password: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteCuratedListArgs = {
  listId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteProductArgs = {
  productId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteStoreArgs = {
  password: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_CategoriesArgs = {
  where: Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Categories_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Chat_MessagesArgs = {
  where: Chat_Messages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Chat_Messages_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Chat_RoomsArgs = {
  where: Chat_Rooms_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Chat_Rooms_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Chat_UsersArgs = {
  where: Chat_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Chat_Users_By_PkArgs = {
  chatRoomId: Scalars['String'];
  userId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Image_OwnersArgs = {
  where: Image_Owners_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Image_Owners_By_PkArgs = {
  imageId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Image_ParentsArgs = {
  where: Image_Parents_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Image_Parents_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Image_VariantsArgs = {
  where: Image_Variants_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Image_Variants_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_MigrationsArgs = {
  where: Migrations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Migrations_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Payment_MethodsArgs = {
  where: Payment_Methods_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Payment_Methods_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Payout_MethodsArgs = {
  where: Payout_Methods_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Payout_Methods_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Product_File_OwnersArgs = {
  where: Product_File_Owners_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Product_File_Owners_By_PkArgs = {
  productFileId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Product_FilesArgs = {
  where: Product_Files_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Product_Files_By_PkArgs = {
  productFileId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Product_Preview_ItemsArgs = {
  where: Product_Preview_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Product_Preview_Items_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Product_SnapshotsArgs = {
  where: Product_Snapshots_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Product_Snapshots_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Product_VariantsArgs = {
  where: Product_Variants_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Product_Variants_By_PkArgs = {
  variantSnapshotId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_ProductsArgs = {
  where: Products_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Products_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_StoresArgs = {
  where: Stores_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Stores_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_User_LicensesArgs = {
  where: User_Licenses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Licenses_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootEditProductArgs = {
  productEditInput?: Maybe<ProductEditInput>;
};


/** mutation root */
export type Mutation_RootEditStoreProfileArgs = {
  bio?: Maybe<Scalars['String']>;
  coverId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};


/** mutation root */
export type Mutation_RootEditUserProfileArgs = {
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  payoutMethod?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};


/** mutation root */
export type Mutation_RootExcludeProductFromSearchArgs = {
  productId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootFollowStoreArgs = {
  query?: Maybe<ConnectionQuery>;
  storeId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootGenerateProductFileDownloadLinkArgs = {
  id: Scalars['String'];
  orderItemId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootIncludeProductInSearchArgs = {
  productId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsert_CategoriesArgs = {
  objects: Array<Categories_Insert_Input>;
  on_conflict?: Maybe<Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Categories_OneArgs = {
  object: Categories_Insert_Input;
  on_conflict?: Maybe<Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Chat_MessagesArgs = {
  objects: Array<Chat_Messages_Insert_Input>;
  on_conflict?: Maybe<Chat_Messages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Chat_Messages_OneArgs = {
  object: Chat_Messages_Insert_Input;
  on_conflict?: Maybe<Chat_Messages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Chat_RoomsArgs = {
  objects: Array<Chat_Rooms_Insert_Input>;
  on_conflict?: Maybe<Chat_Rooms_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Chat_Rooms_OneArgs = {
  object: Chat_Rooms_Insert_Input;
  on_conflict?: Maybe<Chat_Rooms_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Chat_UsersArgs = {
  objects: Array<Chat_Users_Insert_Input>;
  on_conflict?: Maybe<Chat_Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Chat_Users_OneArgs = {
  object: Chat_Users_Insert_Input;
  on_conflict?: Maybe<Chat_Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Image_OwnersArgs = {
  objects: Array<Image_Owners_Insert_Input>;
  on_conflict?: Maybe<Image_Owners_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Image_Owners_OneArgs = {
  object: Image_Owners_Insert_Input;
  on_conflict?: Maybe<Image_Owners_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Image_ParentsArgs = {
  objects: Array<Image_Parents_Insert_Input>;
  on_conflict?: Maybe<Image_Parents_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Image_Parents_OneArgs = {
  object: Image_Parents_Insert_Input;
  on_conflict?: Maybe<Image_Parents_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Image_VariantsArgs = {
  objects: Array<Image_Variants_Insert_Input>;
  on_conflict?: Maybe<Image_Variants_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Image_Variants_OneArgs = {
  object: Image_Variants_Insert_Input;
  on_conflict?: Maybe<Image_Variants_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MigrationsArgs = {
  objects: Array<Migrations_Insert_Input>;
  on_conflict?: Maybe<Migrations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Migrations_OneArgs = {
  object: Migrations_Insert_Input;
  on_conflict?: Maybe<Migrations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Payment_MethodsArgs = {
  objects: Array<Payment_Methods_Insert_Input>;
  on_conflict?: Maybe<Payment_Methods_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Payment_Methods_OneArgs = {
  object: Payment_Methods_Insert_Input;
  on_conflict?: Maybe<Payment_Methods_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Payout_MethodsArgs = {
  objects: Array<Payout_Methods_Insert_Input>;
  on_conflict?: Maybe<Payout_Methods_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Payout_Methods_OneArgs = {
  object: Payout_Methods_Insert_Input;
  on_conflict?: Maybe<Payout_Methods_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_File_OwnersArgs = {
  objects: Array<Product_File_Owners_Insert_Input>;
  on_conflict?: Maybe<Product_File_Owners_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_File_Owners_OneArgs = {
  object: Product_File_Owners_Insert_Input;
  on_conflict?: Maybe<Product_File_Owners_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_FilesArgs = {
  objects: Array<Product_Files_Insert_Input>;
  on_conflict?: Maybe<Product_Files_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_Files_OneArgs = {
  object: Product_Files_Insert_Input;
  on_conflict?: Maybe<Product_Files_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_Preview_ItemsArgs = {
  objects: Array<Product_Preview_Items_Insert_Input>;
  on_conflict?: Maybe<Product_Preview_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_Preview_Items_OneArgs = {
  object: Product_Preview_Items_Insert_Input;
  on_conflict?: Maybe<Product_Preview_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_SnapshotsArgs = {
  objects: Array<Product_Snapshots_Insert_Input>;
  on_conflict?: Maybe<Product_Snapshots_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_Snapshots_OneArgs = {
  object: Product_Snapshots_Insert_Input;
  on_conflict?: Maybe<Product_Snapshots_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_VariantsArgs = {
  objects: Array<Product_Variants_Insert_Input>;
  on_conflict?: Maybe<Product_Variants_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_Variants_OneArgs = {
  object: Product_Variants_Insert_Input;
  on_conflict?: Maybe<Product_Variants_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProductsArgs = {
  objects: Array<Products_Insert_Input>;
  on_conflict?: Maybe<Products_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Products_OneArgs = {
  object: Products_Insert_Input;
  on_conflict?: Maybe<Products_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_StoresArgs = {
  objects: Array<Stores_Insert_Input>;
  on_conflict?: Maybe<Stores_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Stores_OneArgs = {
  object: Stores_Insert_Input;
  on_conflict?: Maybe<Stores_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_LicensesArgs = {
  objects: Array<User_Licenses_Insert_Input>;
  on_conflict?: Maybe<User_Licenses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Licenses_OneArgs = {
  object: User_Licenses_Insert_Input;
  on_conflict?: Maybe<User_Licenses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootLogInUsingEmailArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


/** mutation root */
export type Mutation_RootRearrangeCuratedListItemsArgs = {
  itemIdsInOrder: Array<Scalars['ID']>;
  listId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootRecordAffiliateLinkClickArgs = {
  affiliateId: Scalars['String'];
  path: Scalars['String'];
};


/** mutation root */
export type Mutation_RootRemoveItemFromCuratedListArgs = {
  itemId: Scalars['String'];
  listId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootRemovePaymentMethodArgs = {
  customerId: Scalars['String'];
  paymentMethodId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootRemoveProductFromWishlistArgs = {
  productId: Scalars['String'];
  variantId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootRemoveProductsFromCartArgs = {
  cartId: Scalars['String'];
  productProductVariantIds: Array<ProductProductVariantId>;
};


/** mutation root */
export type Mutation_RootRemovePromoCodeFromCartArgs = {
  discountId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootReserveStoreLinkSlugArgs = {
  slug: Scalars['String'];
};


/** mutation root */
export type Mutation_RootSendResetPasswordEmailArgs = {
  email: Scalars['String'];
};


/** mutation root */
export type Mutation_RootSendVerifyEmailArgs = {
  ref: Scalars['String'];
};


/** mutation root */
export type Mutation_RootSetDefaultPaymentMethodArgs = {
  customerId: Scalars['String'];
  paymentMethodId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootSetPayoutMethodArgs = {
  payoutEmail?: Maybe<Scalars['String']>;
  payoutProcessor?: Maybe<Scalars['String']>;
  payoutProcessorId?: Maybe<Scalars['String']>;
  payoutType?: Maybe<PayoutType>;
};


/** mutation root */
export type Mutation_RootSignUpUsingEmailArgs = {
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};


/** mutation root */
export type Mutation_RootSuspendProductArgs = {
  productId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootSuspendStoreArgs = {
  storeId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootSuspendUserArgs = {
  userId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootUnfollowStoreArgs = {
  query?: Maybe<ConnectionQuery>;
  storeId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootUnsuspendProductArgs = {
  productId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootUnsuspendStoreArgs = {
  storeId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootUnsuspendUserArgs = {
  userId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootUpdate_CategoriesArgs = {
  _set?: Maybe<Categories_Set_Input>;
  where: Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Categories_By_PkArgs = {
  _set?: Maybe<Categories_Set_Input>;
  pk_columns: Categories_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Chat_MessagesArgs = {
  _set?: Maybe<Chat_Messages_Set_Input>;
  where: Chat_Messages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Chat_Messages_By_PkArgs = {
  _set?: Maybe<Chat_Messages_Set_Input>;
  pk_columns: Chat_Messages_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Chat_RoomsArgs = {
  _set?: Maybe<Chat_Rooms_Set_Input>;
  where: Chat_Rooms_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Chat_Rooms_By_PkArgs = {
  _set?: Maybe<Chat_Rooms_Set_Input>;
  pk_columns: Chat_Rooms_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Chat_UsersArgs = {
  _set?: Maybe<Chat_Users_Set_Input>;
  where: Chat_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Chat_Users_By_PkArgs = {
  _set?: Maybe<Chat_Users_Set_Input>;
  pk_columns: Chat_Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Image_OwnersArgs = {
  _set?: Maybe<Image_Owners_Set_Input>;
  where: Image_Owners_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Image_Owners_By_PkArgs = {
  _set?: Maybe<Image_Owners_Set_Input>;
  pk_columns: Image_Owners_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Image_ParentsArgs = {
  _set?: Maybe<Image_Parents_Set_Input>;
  where: Image_Parents_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Image_Parents_By_PkArgs = {
  _set?: Maybe<Image_Parents_Set_Input>;
  pk_columns: Image_Parents_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Image_VariantsArgs = {
  _inc?: Maybe<Image_Variants_Inc_Input>;
  _set?: Maybe<Image_Variants_Set_Input>;
  where: Image_Variants_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Image_Variants_By_PkArgs = {
  _inc?: Maybe<Image_Variants_Inc_Input>;
  _set?: Maybe<Image_Variants_Set_Input>;
  pk_columns: Image_Variants_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_MigrationsArgs = {
  _inc?: Maybe<Migrations_Inc_Input>;
  _set?: Maybe<Migrations_Set_Input>;
  where: Migrations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Migrations_By_PkArgs = {
  _inc?: Maybe<Migrations_Inc_Input>;
  _set?: Maybe<Migrations_Set_Input>;
  pk_columns: Migrations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Payment_MethodsArgs = {
  _inc?: Maybe<Payment_Methods_Inc_Input>;
  _set?: Maybe<Payment_Methods_Set_Input>;
  where: Payment_Methods_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Payment_Methods_By_PkArgs = {
  _inc?: Maybe<Payment_Methods_Inc_Input>;
  _set?: Maybe<Payment_Methods_Set_Input>;
  pk_columns: Payment_Methods_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Payout_MethodsArgs = {
  _set?: Maybe<Payout_Methods_Set_Input>;
  where: Payout_Methods_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Payout_Methods_By_PkArgs = {
  _set?: Maybe<Payout_Methods_Set_Input>;
  pk_columns: Payout_Methods_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Product_File_OwnersArgs = {
  _set?: Maybe<Product_File_Owners_Set_Input>;
  where: Product_File_Owners_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Product_File_Owners_By_PkArgs = {
  _set?: Maybe<Product_File_Owners_Set_Input>;
  pk_columns: Product_File_Owners_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Product_FilesArgs = {
  _inc?: Maybe<Product_Files_Inc_Input>;
  _set?: Maybe<Product_Files_Set_Input>;
  where: Product_Files_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Product_Files_By_PkArgs = {
  _inc?: Maybe<Product_Files_Inc_Input>;
  _set?: Maybe<Product_Files_Set_Input>;
  pk_columns: Product_Files_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Product_Preview_ItemsArgs = {
  _inc?: Maybe<Product_Preview_Items_Inc_Input>;
  _set?: Maybe<Product_Preview_Items_Set_Input>;
  where: Product_Preview_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Product_Preview_Items_By_PkArgs = {
  _inc?: Maybe<Product_Preview_Items_Inc_Input>;
  _set?: Maybe<Product_Preview_Items_Set_Input>;
  pk_columns: Product_Preview_Items_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Product_SnapshotsArgs = {
  _set?: Maybe<Product_Snapshots_Set_Input>;
  where: Product_Snapshots_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Product_Snapshots_By_PkArgs = {
  _set?: Maybe<Product_Snapshots_Set_Input>;
  pk_columns: Product_Snapshots_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Product_VariantsArgs = {
  _inc?: Maybe<Product_Variants_Inc_Input>;
  _set?: Maybe<Product_Variants_Set_Input>;
  where: Product_Variants_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Product_Variants_By_PkArgs = {
  _inc?: Maybe<Product_Variants_Inc_Input>;
  _set?: Maybe<Product_Variants_Set_Input>;
  pk_columns: Product_Variants_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProductsArgs = {
  _set?: Maybe<Products_Set_Input>;
  where: Products_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Products_By_PkArgs = {
  _set?: Maybe<Products_Set_Input>;
  pk_columns: Products_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_StoresArgs = {
  _set?: Maybe<Stores_Set_Input>;
  where: Stores_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Stores_By_PkArgs = {
  _set?: Maybe<Stores_Set_Input>;
  pk_columns: Stores_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_LicensesArgs = {
  _set?: Maybe<User_Licenses_Set_Input>;
  where: User_Licenses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Licenses_By_PkArgs = {
  _set?: Maybe<User_Licenses_Set_Input>;
  pk_columns: User_Licenses_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUploadRegisterArgs = {
  fileSize: Scalars['Int'];
  mimeType: Scalars['String'];
  uploadType: UploadType;
};


/** mutation root */
export type Mutation_RootUploadSaveImageArgs = {
  description?: Maybe<Scalars['String']>;
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags?: Maybe<Scalars['String']>;
  uploadId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootUploadSaveProductFileArgs = {
  fileName: Scalars['String'];
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  uploadId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootVisitStoreArgs = {
  query?: Maybe<ConnectionQuery>;
  storeId: Scalars['String'];
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

/** Record of payment for products aka a successful cart checkout */
export type Order = {
   __typename?: 'Order';
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

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  ASC = 'asc',
  /** in the ascending order, nulls first */
  ASC_NULLS_FIRST = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  ASC_NULLS_LAST = 'asc_nulls_last',
  /** in the descending order, nulls first */
  DESC = 'desc',
  /** in the descending order, nulls first */
  DESC_NULLS_FIRST = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DESC_NULLS_LAST = 'desc_nulls_last'
}

/** column ordering options */
export enum OrderBy {
  /** in the ascending order, nulls last */
  ASC = 'asc',
  /** in the ascending order, nulls first */
  ASC_NULLS_FIRST = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  ASC_NULLS_LAST = 'asc_nulls_last',
  /** in the descending order, nulls first */
  DESC = 'desc',
  /** in the descending order, nulls first */
  DESC_NULLS_FIRST = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DESC_NULLS_LAST = 'desc_nulls_last'
}

export type OrderCreateMutationResponse = {
   __typename?: 'OrderCreateMutationResponse';
  paymentProcessorResponse: Scalars['String'];
  unconfirmedOrder: Order;
};

/** Very similar to CartItem, this freezes the version of the product and the pricing that applied */
export type OrderItem = {
   __typename?: 'OrderItem';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  /**
   * This is the newest event per file, not one per every time they download it (otherwise there are scale issues).
   * Can query all records using other methods if needed
   */
  mostRecentDownloadRecords: Array<MostRecentDownloadRecord>;
  orderId: Scalars['ID'];
  orderStatus: OrderStatus;
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

/** Order Status for individual items. */
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

/** Parameters that control how to access pages within a Connection that uses a descrete page system instead of a cursor. */
export type PageBasedConnectionQuery = {
  count?: Maybe<Scalars['Int']>;
  pageNumber?: Maybe<Scalars['Int']>;
  sortAscending?: Maybe<Scalars['Boolean']>;
};

export type PageBasedConnectionWithMetrics = {
  pageInfo: PageBasedConnectionPageInfo;
  /** SUM(x) of a query, where x is a specific column to be aggregated */
  totalAmount?: Maybe<Scalars['Int']>;
  /** COUNT(*) of a query, larger than the number of paginated results returned */
  totalCount?: Maybe<Scalars['Int']>;
};


export type PageInfo = {
   __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['PageCursor']>;
  isLastPage: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
};

export enum PayeeType {
  /** Affiliates */
  AFFILIATE = 'AFFILIATE',
  /** EFC */
  PLATFORM = 'PLATFORM',
  /** Store */
  STORE = 'STORE'
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
  count?: Maybe<Scalars['Int']>;
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

/** order by aggregate values of table "payment_methods" */
export type Payment_Methods_Aggregate_Order_By = {
  avg?: Maybe<Payment_Methods_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Payment_Methods_Max_Order_By>;
  min?: Maybe<Payment_Methods_Min_Order_By>;
  stddev?: Maybe<Payment_Methods_Stddev_Order_By>;
  stddev_pop?: Maybe<Payment_Methods_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Payment_Methods_Stddev_Samp_Order_By>;
  sum?: Maybe<Payment_Methods_Sum_Order_By>;
  var_pop?: Maybe<Payment_Methods_Var_Pop_Order_By>;
  var_samp?: Maybe<Payment_Methods_Var_Samp_Order_By>;
  variance?: Maybe<Payment_Methods_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "payment_methods" */
export type Payment_Methods_Arr_Rel_Insert_Input = {
  data: Array<Payment_Methods_Insert_Input>;
  on_conflict?: Maybe<Payment_Methods_On_Conflict>;
};

/** aggregate avg on columns */
export type Payment_Methods_Avg_Fields = {
   __typename?: 'payment_methods_avg_fields';
  expMonth?: Maybe<Scalars['Float']>;
  expYear?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "payment_methods" */
export type Payment_Methods_Avg_Order_By = {
  expMonth?: Maybe<Order_By>;
  expYear?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "payment_methods". All fields are combined with a logical 'AND'. */
export type Payment_Methods_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Payment_Methods_Bool_Exp>>>;
  _not?: Maybe<Payment_Methods_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Payment_Methods_Bool_Exp>>>;
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

/** input type for incrementing integer column in table "payment_methods" */
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

/** order by max() on columns of table "payment_methods" */
export type Payment_Methods_Max_Order_By = {
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

/** order by min() on columns of table "payment_methods" */
export type Payment_Methods_Min_Order_By = {
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

/** response of any mutation on the table "payment_methods" */
export type Payment_Methods_Mutation_Response = {
   __typename?: 'payment_methods_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Payment_Methods>;
};

/** input type for inserting object relation for remote table "payment_methods" */
export type Payment_Methods_Obj_Rel_Insert_Input = {
  data: Payment_Methods_Insert_Input;
  on_conflict?: Maybe<Payment_Methods_On_Conflict>;
};

/** on conflict condition type for table "payment_methods" */
export type Payment_Methods_On_Conflict = {
  constraint: Payment_Methods_Constraint;
  update_columns: Array<Payment_Methods_Update_Column>;
  where?: Maybe<Payment_Methods_Bool_Exp>;
};

/** ordering options when selecting data from "payment_methods" */
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

/** primary key columns input for table: "payment_methods" */
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

/** order by stddev() on columns of table "payment_methods" */
export type Payment_Methods_Stddev_Order_By = {
  expMonth?: Maybe<Order_By>;
  expYear?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Payment_Methods_Stddev_Pop_Fields = {
   __typename?: 'payment_methods_stddev_pop_fields';
  expMonth?: Maybe<Scalars['Float']>;
  expYear?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "payment_methods" */
export type Payment_Methods_Stddev_Pop_Order_By = {
  expMonth?: Maybe<Order_By>;
  expYear?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Payment_Methods_Stddev_Samp_Fields = {
   __typename?: 'payment_methods_stddev_samp_fields';
  expMonth?: Maybe<Scalars['Float']>;
  expYear?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "payment_methods" */
export type Payment_Methods_Stddev_Samp_Order_By = {
  expMonth?: Maybe<Order_By>;
  expYear?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Payment_Methods_Sum_Fields = {
   __typename?: 'payment_methods_sum_fields';
  expMonth?: Maybe<Scalars['Int']>;
  expYear?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "payment_methods" */
export type Payment_Methods_Sum_Order_By = {
  expMonth?: Maybe<Order_By>;
  expYear?: Maybe<Order_By>;
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

/** order by var_pop() on columns of table "payment_methods" */
export type Payment_Methods_Var_Pop_Order_By = {
  expMonth?: Maybe<Order_By>;
  expYear?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Payment_Methods_Var_Samp_Fields = {
   __typename?: 'payment_methods_var_samp_fields';
  expMonth?: Maybe<Scalars['Float']>;
  expYear?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "payment_methods" */
export type Payment_Methods_Var_Samp_Order_By = {
  expMonth?: Maybe<Order_By>;
  expYear?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Payment_Methods_Variance_Fields = {
   __typename?: 'payment_methods_variance_fields';
  expMonth?: Maybe<Scalars['Float']>;
  expYear?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "payment_methods" */
export type Payment_Methods_Variance_Order_By = {
  expMonth?: Maybe<Order_By>;
  expYear?: Maybe<Order_By>;
};

/** Stripe Credit Card, or Paypal Payment Method, or ? some other processor */
export type PaymentMethod = {
   __typename?: 'PaymentMethod';
  createdAt?: Maybe<Scalars['Date']>;
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
  userId?: Maybe<Scalars['ID']>;
};

/** Payment Processor Company */
export enum PaymentProcessor {
  APPLEPAY = 'ApplePay',
  GOOGLEPAY = 'GooglePay',
  NOPAYMENTFEES = 'NoPaymentFees',
  PAYPAL = 'Paypal',
  STRIPE = 'Stripe',
  STRIPEDOMESTIC = 'StripeDomestic'
}

/** Record of a payout event from the platform to the owner of a store */
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
  /**
   * This should later be a payoutID -> bank account/paypal email/card
   * sellers may have a variety of payout methods to choose from with Adyen.
   */
  payoutEmail: Scalars['String'];
  payoutItemIds: Array<Scalars['ID']>;
  /**
   * Payout items breakdown.
   * PayoutId -> PayoutItems -> OrderItems
   */
  payoutItems?: Maybe<Array<Maybe<PayoutItem>>>;
  payoutStatus: PayoutStatus;
  /**
   * product sales breakdown.
   * PayoutId -> PayoutItems -> OrderItems
   */
  productsBreakdownConnection: ProductsSoldPeriodSummaryConnection;
  startPeriod: Scalars['Date'];
};


/** Record of a payout event from the platform to the owner of a store */
export type PayoutProductsBreakdownConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};

/** columns and relationships of "payout_methods" */
export type Payout_Methods = {
   __typename?: 'payout_methods';
  createdAt: Scalars['timestamptz'];
  id: Scalars['String'];
  payeeId: Scalars['String'];
  payoutEmail?: Maybe<Scalars['String']>;
  payoutProcessor?: Maybe<Scalars['String']>;
  payoutProcessorId?: Maybe<Scalars['String']>;
  payoutType?: Maybe<Scalars['String']>;
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Payout_Methods_Max_Fields>;
  min?: Maybe<Payout_Methods_Min_Fields>;
};


/** aggregate fields of "payout_methods" */
export type Payout_Methods_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Payout_Methods_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "payout_methods" */
export type Payout_Methods_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Payout_Methods_Max_Order_By>;
  min?: Maybe<Payout_Methods_Min_Order_By>;
};

/** input type for inserting array relation for remote table "payout_methods" */
export type Payout_Methods_Arr_Rel_Insert_Input = {
  data: Array<Payout_Methods_Insert_Input>;
  on_conflict?: Maybe<Payout_Methods_On_Conflict>;
};

/** Boolean expression to filter rows from the table "payout_methods". All fields are combined with a logical 'AND'. */
export type Payout_Methods_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Payout_Methods_Bool_Exp>>>;
  _not?: Maybe<Payout_Methods_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Payout_Methods_Bool_Exp>>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  payeeId?: Maybe<String_Comparison_Exp>;
  payoutEmail?: Maybe<String_Comparison_Exp>;
  payoutProcessor?: Maybe<String_Comparison_Exp>;
  payoutProcessorId?: Maybe<String_Comparison_Exp>;
  payoutType?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "payout_methods" */
export enum Payout_Methods_Constraint {
  /** unique or primary key constraint */
  PAYOUT_METHODS_PKEY = 'payout_methods_pkey'
}

/** input type for inserting data into table "payout_methods" */
export type Payout_Methods_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  payeeId?: Maybe<Scalars['String']>;
  payoutEmail?: Maybe<Scalars['String']>;
  payoutProcessor?: Maybe<Scalars['String']>;
  payoutProcessorId?: Maybe<Scalars['String']>;
  payoutType?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Payout_Methods_Max_Fields = {
   __typename?: 'payout_methods_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  payeeId?: Maybe<Scalars['String']>;
  payoutEmail?: Maybe<Scalars['String']>;
  payoutProcessor?: Maybe<Scalars['String']>;
  payoutProcessorId?: Maybe<Scalars['String']>;
  payoutType?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "payout_methods" */
export type Payout_Methods_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  payeeId?: Maybe<Order_By>;
  payoutEmail?: Maybe<Order_By>;
  payoutProcessor?: Maybe<Order_By>;
  payoutProcessorId?: Maybe<Order_By>;
  payoutType?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Payout_Methods_Min_Fields = {
   __typename?: 'payout_methods_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  payeeId?: Maybe<Scalars['String']>;
  payoutEmail?: Maybe<Scalars['String']>;
  payoutProcessor?: Maybe<Scalars['String']>;
  payoutProcessorId?: Maybe<Scalars['String']>;
  payoutType?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "payout_methods" */
export type Payout_Methods_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  payeeId?: Maybe<Order_By>;
  payoutEmail?: Maybe<Order_By>;
  payoutProcessor?: Maybe<Order_By>;
  payoutProcessorId?: Maybe<Order_By>;
  payoutType?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** response of any mutation on the table "payout_methods" */
export type Payout_Methods_Mutation_Response = {
   __typename?: 'payout_methods_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Payout_Methods>;
};

/** input type for inserting object relation for remote table "payout_methods" */
export type Payout_Methods_Obj_Rel_Insert_Input = {
  data: Payout_Methods_Insert_Input;
  on_conflict?: Maybe<Payout_Methods_On_Conflict>;
};

/** on conflict condition type for table "payout_methods" */
export type Payout_Methods_On_Conflict = {
  constraint: Payout_Methods_Constraint;
  update_columns: Array<Payout_Methods_Update_Column>;
  where?: Maybe<Payout_Methods_Bool_Exp>;
};

/** ordering options when selecting data from "payout_methods" */
export type Payout_Methods_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  payeeId?: Maybe<Order_By>;
  payoutEmail?: Maybe<Order_By>;
  payoutProcessor?: Maybe<Order_By>;
  payoutProcessorId?: Maybe<Order_By>;
  payoutType?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** primary key columns input for table: "payout_methods" */
export type Payout_Methods_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "payout_methods" */
export enum Payout_Methods_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  PAYEEID = 'payeeId',
  /** column name */
  PAYOUTEMAIL = 'payoutEmail',
  /** column name */
  PAYOUTPROCESSOR = 'payoutProcessor',
  /** column name */
  PAYOUTPROCESSORID = 'payoutProcessorId',
  /** column name */
  PAYOUTTYPE = 'payoutType',
  /** column name */
  UPDATEDAT = 'updatedAt'
}

/** input type for updating data in table "payout_methods" */
export type Payout_Methods_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  payeeId?: Maybe<Scalars['String']>;
  payoutEmail?: Maybe<Scalars['String']>;
  payoutProcessor?: Maybe<Scalars['String']>;
  payoutProcessorId?: Maybe<Scalars['String']>;
  payoutType?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "payout_methods" */
export enum Payout_Methods_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ID = 'id',
  /** column name */
  PAYEEID = 'payeeId',
  /** column name */
  PAYOUTEMAIL = 'payoutEmail',
  /** column name */
  PAYOUTPROCESSOR = 'payoutProcessor',
  /** column name */
  PAYOUTPROCESSORID = 'payoutProcessorId',
  /** column name */
  PAYOUTTYPE = 'payoutType',
  /** column name */
  UPDATEDAT = 'updatedAt'
}

export enum PayoutDealType {
  /** Deal given to someone who shared their ref link to the site */
  BUYER_AFFILIATE = 'BUYER_AFFILIATE',
  /** seller referred by an affiliate earns this rate */
  REFERRED_SELLER = 'REFERRED_SELLER',
  /** What a normal seller receives. Sellers without an entry default to platform default of 15%. */
  SELLER = 'SELLER',
  /** someone who refers another seller earns this rate */
  SELLER_AFFILIATE = 'SELLER_AFFILIATE'
}

export type PayoutEdge = Edge & {
   __typename?: 'PayoutEdge';
  cursor: Scalars['PageCursor'];
  node: Payout;
};

/**
 * Summary of (upcoming) sales for
 * today, last 7 days, last 30 days, all time.
 * Includes deductions from refunds
 */
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
  /**
   * This should later be a payoutID -> bank account/paypal email/card
   * sellers may have a variety of payout methods to choose from with Adyen.
   */
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
  /** Sums the 'subtotal' column of the transactions table */
  totalAmount?: Maybe<Scalars['Int']>;
  /** The number of transactions in the period */
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
  /** Sums the 'amount' column of the payout_items table */
  totalAmount?: Maybe<Scalars['Int']>;
  /** The number of payoutItems in the period */
  totalCount?: Maybe<Scalars['Int']>;
};

export type PayoutItemsPagedEdge = PageBasedConnectionEdge & {
   __typename?: 'PayoutItemsPagedEdge';
  node: PayoutItem;
  pageNumber: Scalars['Int'];
};

/** Details about how to get paid for selling products */
export type PayoutMethod = {
   __typename?: 'PayoutMethod';
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  /** Paypal Only, or email associated with a bank account */
  payoutEmail?: Maybe<Scalars['String']>;
  /** Paypal, Bank, or Card provider */
  payoutProcessor?: Maybe<Scalars['String']>;
  /** ID associated with payout method from payout provider */
  payoutProcessorId?: Maybe<Scalars['String']>;
  payoutType?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  userId?: Maybe<Scalars['ID']>;
};

export type PayoutMethodMutationResponse = {
   __typename?: 'PayoutMethodMutationResponse';
  payoutMethod: PayoutMethod;
};

export type PayoutsConnection = ConnectionWithMetrics & {
   __typename?: 'PayoutsConnection';
  edges: Array<PayoutEdge>;
  pageInfo: PageInfo;
  /** Sums the 'amount' column of the payouts table */
  totalAmount?: Maybe<Scalars['Int']>;
  /** The number of payouts in the period */
  totalCount?: Maybe<Scalars['Int']>;
};

/** PayoutSplit */
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
  /** Seller did not put down a payout method */
  MISSING_PAYOUT_METHOD = 'MISSING_PAYOUT_METHOD',
  /** Payout processed and confirmed by payout provider */
  PAID = 'PAID',
  /** Payout pending another admin's approval before dispatch to payout provider */
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  /** Pending refund, while waiting for payout to be approved */
  PENDING_REFUND = 'PENDING_REFUND',
  /** Payout sent to payout provider and processing */
  PROCESSING = 'PROCESSING',
  /** Payout refunded, after payout */
  REFUNDED = 'REFUNDED',
  /** Payout refunding initial state */
  REFUNDING = 'REFUNDING',
  /** Payout retained by platform */
  RETAINED = 'RETAINED',
  /** UNPAID */
  UNPAID = 'UNPAID'
}

export enum PayoutType {
  BANK = 'BANK',
  PAYPAL = 'PAYPAL'
}


/** Set of link slugs that are most current / best suit an item being routed to. */
export type PrimaryLinkSlugs = {
   __typename?: 'PrimaryLinkSlugs';
  /** An automatically generated link slug. */
  auto: Scalars['String'];
  /** An optional manually selected link slug. */
  manual?: Maybe<Scalars['String']>;
  /** ID of the entity that owns the link slugs. */
  ownerId: Scalars['ID'];
};

/** Something that can be bought */
export type Product = {
  actionType: Scalars['String'];
  ammoType?: Maybe<Scalars['String']>;
  boreDiameter?: Maybe<Scalars['String']>;
  category?: Maybe<ProductCategory>;
  categoryId: Scalars['ID'];
  /** Chosen variant, for cartItems */
  chosenVariant?: Maybe<ProductVariant>;
  condition: Scalars['String'];
  createdAt: Scalars['Date'];
  currentVariants: Array<ProductVariant>;
  dealer: Scalars['String'];
  description: Scalars['String'];
  featuredVariant?: Maybe<ProductVariant>;
  id: Scalars['ID'];
  /** Whether or not it has been deleted */
  isDeleted: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it from automatic lists */
  isExcludedFromRecommendations: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it from search results */
  isExcludedFromSearch: Scalars['Boolean'];
  /** Whether or not the product owner has published it */
  isPublished: Scalars['Boolean'];
  /** Whether or not a platform admin has unpublished it */
  isSuspended: Scalars['Boolean'];
  location: Scalars['String'];
  make: Scalars['String'];
  model: Scalars['String'];
  productId: Scalars['String'];
  serialNumber: Scalars['String'];
  /** Current snapshot */
  snapshotId: Scalars['ID'];
  store?: Maybe<Store>;
  storeId: Scalars['ID'];
  tags?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  /** Metadata */
  updatedAt?: Maybe<Scalars['Date']>;
};

/** columns and relationships of "product_file_owners" */
export type Product_File_Owners = {
   __typename?: 'product_file_owners';
  ownerId: Scalars['String'];
  productFileId: Scalars['String'];
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Product_File_Owners_Max_Fields>;
  min?: Maybe<Product_File_Owners_Min_Fields>;
};


/** aggregate fields of "product_file_owners" */
export type Product_File_Owners_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Product_File_Owners_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "product_file_owners" */
export type Product_File_Owners_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Product_File_Owners_Max_Order_By>;
  min?: Maybe<Product_File_Owners_Min_Order_By>;
};

/** input type for inserting array relation for remote table "product_file_owners" */
export type Product_File_Owners_Arr_Rel_Insert_Input = {
  data: Array<Product_File_Owners_Insert_Input>;
  on_conflict?: Maybe<Product_File_Owners_On_Conflict>;
};

/** Boolean expression to filter rows from the table "product_file_owners". All fields are combined with a logical 'AND'. */
export type Product_File_Owners_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Product_File_Owners_Bool_Exp>>>;
  _not?: Maybe<Product_File_Owners_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Product_File_Owners_Bool_Exp>>>;
  ownerId?: Maybe<String_Comparison_Exp>;
  productFileId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "product_file_owners" */
export enum Product_File_Owners_Constraint {
  /** unique or primary key constraint */
  PRODUCT_FILE_OWNERS_PKEY = 'product_file_owners_pkey'
}

/** input type for inserting data into table "product_file_owners" */
export type Product_File_Owners_Insert_Input = {
  ownerId?: Maybe<Scalars['String']>;
  productFileId?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Product_File_Owners_Max_Fields = {
   __typename?: 'product_file_owners_max_fields';
  ownerId?: Maybe<Scalars['String']>;
  productFileId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "product_file_owners" */
export type Product_File_Owners_Max_Order_By = {
  ownerId?: Maybe<Order_By>;
  productFileId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Product_File_Owners_Min_Fields = {
   __typename?: 'product_file_owners_min_fields';
  ownerId?: Maybe<Scalars['String']>;
  productFileId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "product_file_owners" */
export type Product_File_Owners_Min_Order_By = {
  ownerId?: Maybe<Order_By>;
  productFileId?: Maybe<Order_By>;
};

/** response of any mutation on the table "product_file_owners" */
export type Product_File_Owners_Mutation_Response = {
   __typename?: 'product_file_owners_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Product_File_Owners>;
};

/** input type for inserting object relation for remote table "product_file_owners" */
export type Product_File_Owners_Obj_Rel_Insert_Input = {
  data: Product_File_Owners_Insert_Input;
  on_conflict?: Maybe<Product_File_Owners_On_Conflict>;
};

/** on conflict condition type for table "product_file_owners" */
export type Product_File_Owners_On_Conflict = {
  constraint: Product_File_Owners_Constraint;
  update_columns: Array<Product_File_Owners_Update_Column>;
  where?: Maybe<Product_File_Owners_Bool_Exp>;
};

/** ordering options when selecting data from "product_file_owners" */
export type Product_File_Owners_Order_By = {
  ownerId?: Maybe<Order_By>;
  productFileId?: Maybe<Order_By>;
};

/** primary key columns input for table: "product_file_owners" */
export type Product_File_Owners_Pk_Columns_Input = {
  productFileId: Scalars['String'];
};

/** select columns of table "product_file_owners" */
export enum Product_File_Owners_Select_Column {
  /** column name */
  OWNERID = 'ownerId',
  /** column name */
  PRODUCTFILEID = 'productFileId'
}

/** input type for updating data in table "product_file_owners" */
export type Product_File_Owners_Set_Input = {
  ownerId?: Maybe<Scalars['String']>;
  productFileId?: Maybe<Scalars['String']>;
};

/** update columns of table "product_file_owners" */
export enum Product_File_Owners_Update_Column {
  /** column name */
  OWNERID = 'ownerId',
  /** column name */
  PRODUCTFILEID = 'productFileId'
}

/** columns and relationships of "product_files" */
export type Product_Files = {
   __typename?: 'product_files';
  createdAt?: Maybe<Scalars['timestamptz']>;
  fileName?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  productFileId: Scalars['String'];
  sizeInBytes?: Maybe<Scalars['Int']>;
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


/** aggregate fields of "product_files" */
export type Product_Files_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Product_Files_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "product_files" */
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

/** input type for inserting array relation for remote table "product_files" */
export type Product_Files_Arr_Rel_Insert_Input = {
  data: Array<Product_Files_Insert_Input>;
  on_conflict?: Maybe<Product_Files_On_Conflict>;
};

/** aggregate avg on columns */
export type Product_Files_Avg_Fields = {
   __typename?: 'product_files_avg_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "product_files" */
export type Product_Files_Avg_Order_By = {
  sizeInBytes?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "product_files". All fields are combined with a logical 'AND'. */
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

/** unique or primary key constraints on table "product_files" */
export enum Product_Files_Constraint {
  /** unique or primary key constraint */
  PRODUCT_FILES_PKEY = 'product_files_pkey'
}

/** input type for incrementing integer column in table "product_files" */
export type Product_Files_Inc_Input = {
  sizeInBytes?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "product_files" */
export type Product_Files_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  fileName?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  productFileId?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Product_Files_Max_Fields = {
   __typename?: 'product_files_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  fileName?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  productFileId?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "product_files" */
export type Product_Files_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  fileName?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  productFileId?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Product_Files_Min_Fields = {
   __typename?: 'product_files_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  fileName?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  productFileId?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "product_files" */
export type Product_Files_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  fileName?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  productFileId?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
};

/** response of any mutation on the table "product_files" */
export type Product_Files_Mutation_Response = {
   __typename?: 'product_files_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Product_Files>;
};

/** input type for inserting object relation for remote table "product_files" */
export type Product_Files_Obj_Rel_Insert_Input = {
  data: Product_Files_Insert_Input;
  on_conflict?: Maybe<Product_Files_On_Conflict>;
};

/** on conflict condition type for table "product_files" */
export type Product_Files_On_Conflict = {
  constraint: Product_Files_Constraint;
  update_columns: Array<Product_Files_Update_Column>;
  where?: Maybe<Product_Files_Bool_Exp>;
};

/** ordering options when selecting data from "product_files" */
export type Product_Files_Order_By = {
  createdAt?: Maybe<Order_By>;
  fileName?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  productFileId?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
};

/** primary key columns input for table: "product_files" */
export type Product_Files_Pk_Columns_Input = {
  productFileId: Scalars['String'];
};

/** select columns of table "product_files" */
export enum Product_Files_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  FILENAME = 'fileName',
  /** column name */
  MIMETYPE = 'mimeType',
  /** column name */
  PRODUCTFILEID = 'productFileId',
  /** column name */
  SIZEINBYTES = 'sizeInBytes'
}

/** input type for updating data in table "product_files" */
export type Product_Files_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  fileName?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  productFileId?: Maybe<Scalars['String']>;
  sizeInBytes?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Product_Files_Stddev_Fields = {
   __typename?: 'product_files_stddev_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "product_files" */
export type Product_Files_Stddev_Order_By = {
  sizeInBytes?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Product_Files_Stddev_Pop_Fields = {
   __typename?: 'product_files_stddev_pop_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "product_files" */
export type Product_Files_Stddev_Pop_Order_By = {
  sizeInBytes?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Product_Files_Stddev_Samp_Fields = {
   __typename?: 'product_files_stddev_samp_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "product_files" */
export type Product_Files_Stddev_Samp_Order_By = {
  sizeInBytes?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Product_Files_Sum_Fields = {
   __typename?: 'product_files_sum_fields';
  sizeInBytes?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "product_files" */
export type Product_Files_Sum_Order_By = {
  sizeInBytes?: Maybe<Order_By>;
};

/** update columns of table "product_files" */
export enum Product_Files_Update_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  FILENAME = 'fileName',
  /** column name */
  MIMETYPE = 'mimeType',
  /** column name */
  PRODUCTFILEID = 'productFileId',
  /** column name */
  SIZEINBYTES = 'sizeInBytes'
}

/** aggregate var_pop on columns */
export type Product_Files_Var_Pop_Fields = {
   __typename?: 'product_files_var_pop_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "product_files" */
export type Product_Files_Var_Pop_Order_By = {
  sizeInBytes?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Product_Files_Var_Samp_Fields = {
   __typename?: 'product_files_var_samp_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "product_files" */
export type Product_Files_Var_Samp_Order_By = {
  sizeInBytes?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Product_Files_Variance_Fields = {
   __typename?: 'product_files_variance_fields';
  sizeInBytes?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "product_files" */
export type Product_Files_Variance_Order_By = {
  sizeInBytes?: Maybe<Order_By>;
};

/** columns and relationships of "product_preview_items" */
export type Product_Preview_Items = {
   __typename?: 'product_preview_items';
  id: Scalars['String'];
  /** An object relationship */
  image?: Maybe<Image_Parents>;
  imageId?: Maybe<Scalars['String']>;
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
  _and?: Maybe<Array<Maybe<Product_Preview_Items_Bool_Exp>>>;
  _not?: Maybe<Product_Preview_Items_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Product_Preview_Items_Bool_Exp>>>;
  id?: Maybe<String_Comparison_Exp>;
  image?: Maybe<Image_Parents_Bool_Exp>;
  imageId?: Maybe<String_Comparison_Exp>;
  position?: Maybe<Int_Comparison_Exp>;
  variantSnapshotId?: Maybe<String_Comparison_Exp>;
  youTubeEmbedLink?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "product_preview_items" */
export enum Product_Preview_Items_Constraint {
  /** unique or primary key constraint */
  PRODUCT_PREVIEW_ITEMS_PKEY = 'product_preview_items_pkey'
}

/** input type for incrementing integer column in table "product_preview_items" */
export type Product_Preview_Items_Inc_Input = {
  position?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "product_preview_items" */
export type Product_Preview_Items_Insert_Input = {
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Image_Parents_Obj_Rel_Insert_Input>;
  imageId?: Maybe<Scalars['String']>;
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
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Product_Preview_Items>;
};

/** input type for inserting object relation for remote table "product_preview_items" */
export type Product_Preview_Items_Obj_Rel_Insert_Input = {
  data: Product_Preview_Items_Insert_Input;
  on_conflict?: Maybe<Product_Preview_Items_On_Conflict>;
};

/** on conflict condition type for table "product_preview_items" */
export type Product_Preview_Items_On_Conflict = {
  constraint: Product_Preview_Items_Constraint;
  update_columns: Array<Product_Preview_Items_Update_Column>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};

/** ordering options when selecting data from "product_preview_items" */
export type Product_Preview_Items_Order_By = {
  id?: Maybe<Order_By>;
  image?: Maybe<Image_Parents_Order_By>;
  imageId?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  variantSnapshotId?: Maybe<Order_By>;
  youTubeEmbedLink?: Maybe<Order_By>;
};

/** primary key columns input for table: "product_preview_items" */
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
  boreDiameter?: Maybe<Scalars['String']>;
  condition: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  /** An array relationship */
  currentVariants: Array<Product_Variants>;
  /** An aggregated array relationship */
  currentVariants_aggregate: Product_Variants_Aggregate;
  dealer: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['String'];
  location: Scalars['String'];
  make: Scalars['String'];
  model: Scalars['String'];
  productId: Scalars['String'];
  /** An array relationship */
  products: Array<Products>;
  /** An aggregated array relationship */
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Product_Snapshots_Max_Fields>;
  min?: Maybe<Product_Snapshots_Min_Fields>;
};


/** aggregate fields of "product_snapshots" */
export type Product_Snapshots_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Product_Snapshots_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "product_snapshots" */
export type Product_Snapshots_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Product_Snapshots_Max_Order_By>;
  min?: Maybe<Product_Snapshots_Min_Order_By>;
};

/** input type for inserting array relation for remote table "product_snapshots" */
export type Product_Snapshots_Arr_Rel_Insert_Input = {
  data: Array<Product_Snapshots_Insert_Input>;
  on_conflict?: Maybe<Product_Snapshots_On_Conflict>;
};

/** Boolean expression to filter rows from the table "product_snapshots". All fields are combined with a logical 'AND'. */
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

/** unique or primary key constraints on table "product_snapshots" */
export enum Product_Snapshots_Constraint {
  /** unique or primary key constraint */
  PRODUCT_SNAPSHOTS_PKEY = 'product_snapshots_pkey'
}

/** input type for inserting data into table "product_snapshots" */
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

/** aggregate max on columns */
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

/** order by max() on columns of table "product_snapshots" */
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

/** aggregate min on columns */
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

/** order by min() on columns of table "product_snapshots" */
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

/** response of any mutation on the table "product_snapshots" */
export type Product_Snapshots_Mutation_Response = {
   __typename?: 'product_snapshots_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Product_Snapshots>;
};

/** input type for inserting object relation for remote table "product_snapshots" */
export type Product_Snapshots_Obj_Rel_Insert_Input = {
  data: Product_Snapshots_Insert_Input;
  on_conflict?: Maybe<Product_Snapshots_On_Conflict>;
};

/** on conflict condition type for table "product_snapshots" */
export type Product_Snapshots_On_Conflict = {
  constraint: Product_Snapshots_Constraint;
  update_columns: Array<Product_Snapshots_Update_Column>;
  where?: Maybe<Product_Snapshots_Bool_Exp>;
};

/** ordering options when selecting data from "product_snapshots" */
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

/** primary key columns input for table: "product_snapshots" */
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
  BOREDIAMETER = 'boreDiameter',
  /** column name */
  CONDITION = 'condition',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  DEALER = 'dealer',
  /** column name */
  DESCRIPTION = 'description',
  /** column name */
  ID = 'id',
  /** column name */
  LOCATION = 'location',
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

/** update columns of table "product_snapshots" */
export enum Product_Snapshots_Update_Column {
  /** column name */
  ACTIONTYPE = 'actionType',
  /** column name */
  AMMOTYPE = 'ammoType',
  /** column name */
  BOREDIAMETER = 'boreDiameter',
  /** column name */
  CONDITION = 'condition',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  DEALER = 'dealer',
  /** column name */
  DESCRIPTION = 'description',
  /** column name */
  ID = 'id',
  /** column name */
  LOCATION = 'location',
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
  isDefault: Scalars['Boolean'];
  isSoldOut: Scalars['Boolean'];
  position: Scalars['Int'];
  /** An array relationship */
  previewItems: Array<Product_Preview_Items>;
  /** An aggregated array relationship */
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
  _and?: Maybe<Array<Maybe<Product_Variants_Bool_Exp>>>;
  _not?: Maybe<Product_Variants_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Product_Variants_Bool_Exp>>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  isDefault?: Maybe<Boolean_Comparison_Exp>;
  isSoldOut?: Maybe<Boolean_Comparison_Exp>;
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

/** input type for incrementing integer column in table "product_variants" */
export type Product_Variants_Inc_Input = {
  position?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Int']>;
  priceWas?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "product_variants" */
export type Product_Variants_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  isSoldOut?: Maybe<Scalars['Boolean']>;
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
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Product_Variants>;
};

/** input type for inserting object relation for remote table "product_variants" */
export type Product_Variants_Obj_Rel_Insert_Input = {
  data: Product_Variants_Insert_Input;
  on_conflict?: Maybe<Product_Variants_On_Conflict>;
};

/** on conflict condition type for table "product_variants" */
export type Product_Variants_On_Conflict = {
  constraint: Product_Variants_Constraint;
  update_columns: Array<Product_Variants_Update_Column>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};

/** ordering options when selecting data from "product_variants" */
export type Product_Variants_Order_By = {
  createdAt?: Maybe<Order_By>;
  isDefault?: Maybe<Order_By>;
  isSoldOut?: Maybe<Order_By>;
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

/** primary key columns input for table: "product_variants" */
export type Product_Variants_Pk_Columns_Input = {
  variantSnapshotId: Scalars['String'];
};

/** select columns of table "product_variants" */
export enum Product_Variants_Select_Column {
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  ISDEFAULT = 'isDefault',
  /** column name */
  ISSOLDOUT = 'isSoldOut',
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
  isDefault?: Maybe<Scalars['Boolean']>;
  isSoldOut?: Maybe<Scalars['Boolean']>;
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
  ISDEFAULT = 'isDefault',
  /** column name */
  ISSOLDOUT = 'isSoldOut',
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

/** Category that a product belongs to */
export type ProductCategory = {
   __typename?: 'ProductCategory';
  categoryGroup?: Maybe<Scalars['ProductCategoryGroup']>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['Date']>;
};


export type ProductCreateInput = {
  actionType?: Maybe<Scalars['String']>;
  ammoType?: Maybe<Scalars['String']>;
  boreDiameter?: Maybe<Scalars['String']>;
  /** ID of the category to file the product under. */
  categoryId: Scalars['ID'];
  condition: Scalars['String'];
  /**
   * The set of available variants.
   * Cannot be empty.
   * TODO: max number
   */
  currentVariants: Array<ProductVariantInput>;
  dealer: Scalars['String'];
  /** A whole bunch of words to describe the product #TODO: regex */
  description: Scalars['String'];
  /** Whether or not to put the item up for sale. */
  isPublished: Scalars['Boolean'];
  /** Whether or not to allow more than 1 of this product per transaction. */
  isQuantityEnabled: Scalars['Boolean'];
  location: Scalars['String'];
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  /** Which type of quantity system to use / what it means from user's perspective. */
  quantityLabel?: Maybe<QuantityLabel>;
  serialNumber: Scalars['String'];
  /** Individual words (no spaces) that can help to surface the product in search results. #TODO: min & max number */
  tags?: Maybe<Scalars['String']>;
  /** Short description of the product #TODO: regex */
  title: Scalars['String'];
  /** Which type of variants system to use / what it means from user's perspective. */
  variantsLabel?: Maybe<VariantsLabel>;
};

export type ProductEditInput = {
  actionType?: Maybe<Scalars['String']>;
  ammoType?: Maybe<Scalars['String']>;
  boreDiameter?: Maybe<Scalars['String']>;
  /** ID of the category to file the product under. */
  categoryId: Scalars['ID'];
  condition: Scalars['String'];
  /**
   * The set of available variants.
   * Will be sorted as per the provided order, and cannot be empty.
   * TODO: max number
   */
  currentVariants: Array<ProductVariantEditInput>;
  dealer: Scalars['String'];
  /** A whole bunch of words to describe the product #TODO: regex */
  description: Scalars['String'];
  /** Whether or not to put the item up for sale. */
  isPublished: Scalars['Boolean'];
  /** Whether or not to allow more than 1 of this product per transaction. */
  isQuantityEnabled: Scalars['Boolean'];
  location: Scalars['String'];
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  /** Identifier of the product to edit. */
  productId: Scalars['ID'];
  /** Which type of quantity system to use / what it means from user's perspective. */
  quantityLabel?: Maybe<QuantityLabel>;
  serialNumber: Scalars['String'];
  /** Individual words (no spaces) that can help to surface the product in search results. #TODO: max number */
  tags?: Maybe<Scalars['String']>;
  /** Short description of the product #TODO: regex */
  title: Scalars['String'];
  /** Which type of variants system to use / what it means from user's perspective. */
  variantsLabel?: Maybe<VariantsLabel>;
};

/** Critical information about a file within a product */
export type ProductFile = {
   __typename?: 'ProductFile';
  createdAt: Scalars['Date'];
  fileName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mimeType: Scalars['String'];
  sizeInBytes: Scalars['Int'];
};

/** Wrapping of temporary download link for a product file */
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

/** An item that shows off the product (image, YouTube link, hosted videos to come) */
export type ProductPreviewItem = {
   __typename?: 'ProductPreviewItem';
  id: Scalars['ID'];
  image?: Maybe<Image>;
  imageId?: Maybe<Scalars['ID']>;
  youTubeEmbedLink?: Maybe<Scalars['String']>;
};

export type ProductPreviewItemInput = {
  /** ID of uploaded product image or a link to YouTube embedded video */
  imageId?: Maybe<Scalars['ID']>;
  youTubeEmbedLink?: Maybe<Scalars['String']>;
};

/** Private information about something that can be bought */
export type ProductPrivate = Product & {
   __typename?: 'ProductPrivate';
  actionType: Scalars['String'];
  ammoType?: Maybe<Scalars['String']>;
  boreDiameter?: Maybe<Scalars['String']>;
  category?: Maybe<ProductCategory>;
  categoryId: Scalars['ID'];
  /** Chosen variant, for cartItems */
  chosenVariant?: Maybe<ProductVariant>;
  condition: Scalars['String'];
  createdAt: Scalars['Date'];
  currentVariants: Array<ProductVariant>;
  dealer: Scalars['String'];
  description: Scalars['String'];
  featuredVariant?: Maybe<ProductVariant>;
  /** Connection to all the versions of the product, past and current. */
  historicalSnapshotsConnection: ProductsConnection;
  id: Scalars['ID'];
  /** Whether or not it has been deleted */
  isDeleted: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it from automatic lists */
  isExcludedFromRecommendations: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it from search results */
  isExcludedFromSearch: Scalars['Boolean'];
  /** Whether or not the product owner has published it */
  isPublished: Scalars['Boolean'];
  /** Whether or not a platform admin has unpublished it */
  isSuspended: Scalars['Boolean'];
  location: Scalars['String'];
  make: Scalars['String'];
  model: Scalars['String'];
  productId: Scalars['String'];
  serialNumber: Scalars['String'];
  /** Current snapshot */
  snapshotId: Scalars['ID'];
  store?: Maybe<Store>;
  storeId: Scalars['ID'];
  tags?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  /** Metadata */
  updatedAt?: Maybe<Scalars['Date']>;
};


/** Private information about something that can be bought */
export type ProductPrivateHistoricalSnapshotsConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};

export type ProductProductVariantId = {
  productId: Scalars['ID'];
  quantity?: Maybe<Scalars['Int']>;
  variantId: Scalars['ID'];
};

/** Public information about something that can be bought */
export type ProductPublic = Product & {
   __typename?: 'ProductPublic';
  actionType: Scalars['String'];
  ammoType?: Maybe<Scalars['String']>;
  boreDiameter?: Maybe<Scalars['String']>;
  category?: Maybe<ProductCategory>;
  categoryId: Scalars['ID'];
  /** Chosen variant, for cartItems */
  chosenVariant?: Maybe<ProductVariant>;
  condition: Scalars['String'];
  createdAt: Scalars['Date'];
  currentVariants: Array<ProductVariant>;
  dealer: Scalars['String'];
  description: Scalars['String'];
  featuredVariant?: Maybe<ProductVariant>;
  id: Scalars['ID'];
  /** Whether or not it has been deleted */
  isDeleted: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it from automatic lists */
  isExcludedFromRecommendations: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it from search results */
  isExcludedFromSearch: Scalars['Boolean'];
  /** Whether or not the product owner has published it */
  isPublished: Scalars['Boolean'];
  /** Whether or not a platform admin has unpublished it */
  isSuspended: Scalars['Boolean'];
  location: Scalars['String'];
  make: Scalars['String'];
  model: Scalars['String'];
  productId: Scalars['String'];
  serialNumber: Scalars['String'];
  /** Current snapshot */
  snapshotId: Scalars['ID'];
  store?: Maybe<Store>;
  storeId: Scalars['ID'];
  tags?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  /** Metadata */
  updatedAt?: Maybe<Scalars['Date']>;
};

/** columns and relationships of "products" */
export type Products = {
   __typename?: 'products';
  /** An object relationship */
  category?: Maybe<Categories>;
  categoryId: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  /** An object relationship */
  currentSnapshot: Product_Snapshots;
  currentSnapshotId: Scalars['String'];
  id: Scalars['String'];
  isDeleted: Scalars['Boolean'];
  isExcludedFromRecommendations: Scalars['Boolean'];
  isExcludedFromSearch: Scalars['Boolean'];
  isPublished: Scalars['Boolean'];
  isSuspended: Scalars['Boolean'];
  /** An array relationship */
  product_variants: Array<Product_Variants>;
  /** An aggregated array relationship */
  product_variants_aggregate: Product_Variants_Aggregate;
  /** An object relationship */
  store?: Maybe<Stores>;
  storeId: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "products" */
export type ProductsProduct_VariantsArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


/** columns and relationships of "products" */
export type ProductsProduct_Variants_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
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
  count?: Maybe<Scalars['Int']>;
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
  on_conflict?: Maybe<Products_On_Conflict>;
};

/** Boolean expression to filter rows from the table "products". All fields are combined with a logical 'AND'. */
export type Products_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Products_Bool_Exp>>>;
  _not?: Maybe<Products_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Products_Bool_Exp>>>;
  category?: Maybe<Categories_Bool_Exp>;
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
  product_variants?: Maybe<Product_Variants_Bool_Exp>;
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
  category?: Maybe<Categories_Obj_Rel_Insert_Input>;
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
  product_variants?: Maybe<Product_Variants_Arr_Rel_Insert_Input>;
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
  storeId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "products" */
export type Products_Max_Order_By = {
  categoryId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currentSnapshotId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
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
  storeId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "products" */
export type Products_Min_Order_By = {
  categoryId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currentSnapshotId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** response of any mutation on the table "products" */
export type Products_Mutation_Response = {
   __typename?: 'products_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Products>;
};

/** input type for inserting object relation for remote table "products" */
export type Products_Obj_Rel_Insert_Input = {
  data: Products_Insert_Input;
  on_conflict?: Maybe<Products_On_Conflict>;
};

/** on conflict condition type for table "products" */
export type Products_On_Conflict = {
  constraint: Products_Constraint;
  update_columns: Array<Products_Update_Column>;
  where?: Maybe<Products_Bool_Exp>;
};

/** ordering options when selecting data from "products" */
export type Products_Order_By = {
  category?: Maybe<Categories_Order_By>;
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
  product_variants_aggregate?: Maybe<Product_Variants_Aggregate_Order_By>;
  store?: Maybe<Stores_Order_By>;
  storeId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** primary key columns input for table: "products" */
export type Products_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "products" */
export enum Products_Select_Column {
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
  ISEXCLUDEDFROMRECOMMENDATIONS = 'isExcludedFromRecommendations',
  /** column name */
  ISEXCLUDEDFROMSEARCH = 'isExcludedFromSearch',
  /** column name */
  ISPUBLISHED = 'isPublished',
  /** column name */
  ISSUSPENDED = 'isSuspended',
  /** column name */
  STOREID = 'storeId',
  /** column name */
  UPDATEDAT = 'updatedAt'
}

/** input type for updating data in table "products" */
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

/** update columns of table "products" */
export enum Products_Update_Column {
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
  ISEXCLUDEDFROMRECOMMENDATIONS = 'isExcludedFromRecommendations',
  /** column name */
  ISEXCLUDEDFROMSEARCH = 'isExcludedFromSearch',
  /** column name */
  ISPUBLISHED = 'isPublished',
  /** column name */
  ISSUSPENDED = 'isSuspended',
  /** column name */
  STOREID = 'storeId',
  /** column name */
  UPDATEDAT = 'updatedAt'
}

/** Record for the seller, of an item from their store that was included in a recent purchase on the platform */
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

/** Boolean expression to filter rows from the table "products". All fields are combined with a logical 'AND'. */
export type ProductsBoolExp = {
  _and?: Maybe<Array<Maybe<ProductsBoolExp>>>;
  _not?: Maybe<ProductsBoolExp>;
  _or?: Maybe<Array<Maybe<ProductsBoolExp>>>;
  category?: Maybe<CategoriesBoolExp>;
  categoryId?: Maybe<StringComparisonExp>;
  createdAt?: Maybe<TimestamptzComparisonExp>;
  /** currentSnapshot: product_snapshots_bool_exp */
  currentSnapshotId?: Maybe<StringComparisonExp>;
  id?: Maybe<StringComparisonExp>;
  isDeleted?: Maybe<BooleanComparisonExp>;
  isExcludedFromRecommendations?: Maybe<BooleanComparisonExp>;
  isExcludedFromSearch?: Maybe<BooleanComparisonExp>;
  isPublished?: Maybe<BooleanComparisonExp>;
  isSuspended?: Maybe<BooleanComparisonExp>;
  /** product_variants: product_variants_bool_exp */
  storeId?: Maybe<StringComparisonExp>;
  updatedAt?: Maybe<TimestamptzComparisonExp>;
};

export type ProductsConnection = Connection & {
   __typename?: 'ProductsConnection';
  edges: Array<ProductsEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ProductsEdge = {
   __typename?: 'ProductsEdge';
  node: Product;
};

export type ProductsMutationResponse = {
   __typename?: 'ProductsMutationResponse';
  products: Array<Product>;
};

/** Summary of how many sales of a specific product were made */
export type ProductSoldPeriodSummary = {
   __typename?: 'ProductSoldPeriodSummary';
  grossAmount: Scalars['Price'];
  numberOfSalesMade: Scalars['Int'];
  product: Product;
};

/** ordering options when selecting data from "products" */
export type ProductsOrderBy = {
  /**
   * category: categoriesOrderBy
   * categoryId: orderBy
   */
  createdAt?: Maybe<OrderBy>;
  price?: Maybe<OrderBy>;
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

/** User-facing information about the product variant */
export type ProductVariant = {
   __typename?: 'ProductVariant';
  createdAt: Scalars['Date'];
  isDefault: Scalars['Boolean'];
  /** Whether or not the variant is sold out and therefore cannot be purchased. */
  isSoldOut: Scalars['Boolean'];
  position: Scalars['Int'];
  previewItems: Array<ProductPreviewItem>;
  price: Scalars['Price'];
  priceWas?: Maybe<Scalars['Price']>;
  productId: Scalars['ID'];
  snapshotId: Scalars['ID'];
  storeId: Scalars['ID'];
  variantDescription?: Maybe<Scalars['String']>;
  variantId: Scalars['ID'];
  variantName: Scalars['String'];
  variantSnapshotId: Scalars['ID'];
};

export type ProductVariantEditInput = {
  /** Whether the variant is the default variant */
  isDefault: Scalars['Boolean'];
  /**
   * Set of product preview items.
   * Will be sorted as per the provided order, and cannot be empty.
   * #TODO: max number
   */
  previewItems: Array<ProductPreviewItemInput>;
  /** Price (now) for the product variant */
  price: Scalars['Price'];
  /** Price (was) for the product variant */
  priceWas?: Maybe<Scalars['Price']>;
  /** Amount that can be purchased now (main stock level, irrelevant of specialDeal). */
  quantityAvailable?: Maybe<Scalars['Int']>;
  /** A whole bunch of words to describe the product variant #TODO: regex */
  variantDescription: Scalars['String'];
  /** When the variant already existed, provide the ID, otherwise provide null because it's new */
  variantId?: Maybe<Scalars['ID']>;
  /** What to call the product variant #TODO: regex */
  variantName: Scalars['String'];
};

export type ProductVariantInput = {
  /** Whether the variant is the default variant */
  isDefault: Scalars['Boolean'];
  /**
   * Set of product preview items.
   * Will be sorted as per the provided order, and cannot be empty.
   * #TODO: max number
   */
  previewItems: Array<ProductPreviewItemInput>;
  /** Price (now) for the product variant */
  price: Scalars['Price'];
  /** Price (was) for the product variant */
  priceWas?: Maybe<Scalars['Price']>;
  /** Amount that can be purchased now (main stock level, irrelevant of specialDeal). */
  quantityAvailable?: Maybe<Scalars['Int']>;
  /** A whole bunch of words to describe the product variant #TODO: regex */
  variantDescription: Scalars['String'];
  /** What to call the product variant #TODO: regex */
  variantName: Scalars['String'];
};

export enum QuantityLabel {
  /** Default */
  QUANTITY = 'QUANTITY',
  /** Seats, in relation to license variants */
  SEATS = 'SEATS'
}

export type Query = {
   __typename?: 'Query';
  /**
   * Get a category by its ID.
   * 
   * AccessRule – PUBLIC
   */
  category?: Maybe<ProductCategory>;
  /**
   * Get a curated list by its ID.
   * 
   * AccessRule – PUBLIC
   */
  curatedList?: Maybe<CuratedList>;
  /**
   * Collection of items that make up a curated list.
   * 
   * This is the admin connection, which will show items that may otherwise be hidden due to published status etc.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  curatedListItemsAdminConnection?: Maybe<CuratedListItemsConnection>;
  /**
   * Collection of items that make up a curated list.
   * 
   * AccessRule – PUBLIC
   */
  curatedListItemsConnection?: Maybe<CuratedListItemsConnection>;
  /**
   * Get details of one of your orders.
   * 
   * AccessRule – OWNER
   */
  getOrder?: Maybe<Order>;
  /**
   * Get details about any order in the system.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  getOrderAsAdmin?: Maybe<Order>;
  /**
   * Get details of items within one of your orders.
   * 
   * AccessRule – OWNER
   */
  getOrderItem?: Maybe<OrderItem>;
  /**
   * Get a credit card payment method's details from Stripe
   * 
   * AccessRule – OWNER
   */
  getPaymentMethod?: Maybe<PaymentMethod>;
  /**
   * List a specific payouts for a store/payee
   * 
   * AccessRule – OWNER
   */
  getPayoutById: Payout;
  /**
   * List payoutItems between startDate and endDate.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  getPayoutItemsInPeriodAdmin: PayoutItemsConnection;
  /**
   * List payoutItems between startDate and endDate.
   * Paged connection.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  getPayoutItemsInPeriodAdminPaged: PayoutItemsPagedConnection;
  /**
   * get a store's payout split
   * 
   * AccessRule – OWNER
   */
  getPayoutSplitByStoreId: PayoutSplit;
  /**
   * List all payouts for a store/payee
   * 
   * AccessRule – OWNER
   */
  getPayouts: PayoutsConnection;
  /**
   * List all payouts in the period between startDate and endDate.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  getPayoutsInPeriodAdmin: PayoutsConnection;
  /**
   * Get the product by productId
   * 
   * AccessRule – PUBLIC
   */
  getProductById?: Maybe<Product>;
  /**
   * Get the full list of product categories.
   * TODO: The maximum expected number of categories is X
   * 
   * AccessRule – PUBLIC
   */
  getProductCategories: Array<ProductCategory>;
  /**
   * Get the product that owns a product link slug.
   * 
   * AccessRule – PUBLIC
   */
  getProductFromLinkSlug?: Maybe<Product>;
  /**
   * Get details of items within one of your Product Sales.
   * 
   * AccessRule – OWNER
   */
  getProductSale?: Maybe<ProductSale>;
  /**
   * Get recent transactions, a helper function for Admin dashboard
   * to test refunds
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  getRecentTransactions: Array<Transaction>;
  /**
   * Get the store by storeIdOrSlug
   * 
   * AccessRule – PUBLIC
   */
  getStoreById?: Maybe<Store>;
  /**
   * Get the store that owns a store link slug.
   * 
   * AccessRule – PUBLIC
   */
  getStoreFromLinkSlug?: Maybe<Store>;
  /**
   * List sales summaries for stores in the period between startDate and endDate.
   * ONLY RETURNS stores which actually made a sale in the period.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  getStoreSalesInPeriodAdmin: StoreSalesInPeriodConnection;
  /**
   * Get transaction details of an order from efc-payment service
   * 
   * AccessRule – LOGGED_IN
   */
  getTransaction?: Maybe<Transaction>;
  /**
   * List transactions between startDate and endDate.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  getTransactionsInPeriodAdmin: TransactionsConnection;
  /**
   * Collection of curated lists.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  listOfCuratedListsConnection: CuratedListsConnection;
  /**
   * List credit card payment methods the user has saved
   * 
   * AccessRule – OWNER
   */
  listPaymentMethods?: Maybe<Array<PaymentMethod>>;
  /**
   * Get the user who is currently logged in.
   * 
   * AccessRule – LOGGED_IN
   */
  loggedInUser: UserPrivate;
  /**
   * Find out the owner of a product link slug.
   * 
   * AccessRule – PUBLIC
   */
  lookupProductLinkSlug?: Maybe<PrimaryLinkSlugs>;
  /**
   * Find out the owner of a store link slug.
   * 
   * AccessRule – PUBLIC
   */
  lookupStoreLinkSlug?: Maybe<PrimaryLinkSlugs>;
  /**
   * Get a product by its ID.
   * 
   * AccessRule – PUBLIC
   */
  product?: Maybe<Product>;
  /**
   * Query the complete list of products, on or off sale.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  productsAdminConnection: ProductsConnection;
  /**
   * Retrieve all of the products on the platform that can be purchased.
   * 
   * AccessRule – PUBLIC
   */
  productsAllConnection: ProductsConnection;
  /**
   * Retrieve all of the products for sale within a specific category.
   * 
   * AccessRule – PUBLIC
   */
  productsByCategoryConnection?: Maybe<ProductsConnection>;
  /**
   * Query the list of products that are recommended for the logged-in user.
   * If nobody is logged in, a general list of recommendations is still returned.
   * 
   * AccessRule – PUBLIC
   */
  productsRecommendedConnection: ProductsConnection;
  /**
   * Perform universal search.
   * 
   * AccessRule – PUBLIC
   */
  search: SearchResultsConnection;
  /**
   * Get a store by its ID.
   * 
   * AccessRule – PUBLIC
   */
  store?: Maybe<Store>;
  /**
   * Query the complete list of stores.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  storesAdminConnection: StoresConnection;
  /**
   * Lookup public information about a user.
   * If the requested user is also the logged-in user, UserPrivate fields will be available.
   * 
   * AccessRule – PUBLIC
   */
  user?: Maybe<User>;
  /**
   * Lookup private information about a user using their ID or email address.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  userByEmailOrId?: Maybe<User>;
  /**
   * Collection of products the user has saved for maybe purchasing later.
   * 
   * AccessRule – LOGGED_IN
   */
  wishlistItemsConnection: WishlistItemsConnection;
};


export type QueryCategoryArgs = {
  id: Scalars['String'];
};


export type QueryCuratedListArgs = {
  listId: Scalars['String'];
};


export type QueryCuratedListItemsAdminConnectionArgs = {
  listId: Scalars['String'];
  query?: Maybe<ConnectionQuery>;
};


export type QueryCuratedListItemsConnectionArgs = {
  listId: Scalars['String'];
  query?: Maybe<ConnectionQuery>;
};


export type QueryGetOrderArgs = {
  orderId: Scalars['String'];
};


export type QueryGetOrderAsAdminArgs = {
  orderId: Scalars['String'];
};


export type QueryGetOrderItemArgs = {
  orderItemId: Scalars['String'];
};


export type QueryGetPaymentMethodArgs = {
  paymentMethodId: Scalars['String'];
};


export type QueryGetPayoutByIdArgs = {
  payoutId: Scalars['String'];
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
  storeOrUserId: Scalars['String'];
};


export type QueryGetPayoutsArgs = {
  query: ConnectionQuery;
  storeId: Scalars['String'];
};


export type QueryGetPayoutsInPeriodAdminArgs = {
  month: Scalars['Int'];
  payoutStatus?: Maybe<PayoutStatus>;
  query: ConnectionQuery;
  year: Scalars['Int'];
};


export type QueryGetProductByIdArgs = {
  productId: Scalars['String'];
};


export type QueryGetProductFromLinkSlugArgs = {
  slug: Scalars['String'];
};


export type QueryGetProductSaleArgs = {
  orderItemId: Scalars['String'];
};


export type QueryGetRecentTransactionsArgs = {
  count: Scalars['Int'];
};


export type QueryGetStoreByIdArgs = {
  storeId: Scalars['String'];
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
  transactionId: Scalars['String'];
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
  customerId: Scalars['String'];
};


export type QueryLookupProductLinkSlugArgs = {
  slug: Scalars['String'];
};


export type QueryLookupStoreLinkSlugArgs = {
  slug: Scalars['String'];
};


export type QueryProductArgs = {
  id: Scalars['String'];
};


export type QueryProductsAdminConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type QueryProductsAllConnectionArgs = {
  query?: Maybe<ConnectionOffsetQuery>;
  searchTerm?: Maybe<Scalars['String']>;
};


export type QueryProductsByCategoryConnectionArgs = {
  categoryId?: Maybe<Scalars['String']>;
  categoryName?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionOffsetQuery>;
};


export type QueryProductsRecommendedConnectionArgs = {
  currentlyViewingProductIdOrSlug?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionQuery>;
};


export type QuerySearchArgs = {
  query?: Maybe<PageBasedConnectionQuery>;
  searchTerm: Scalars['String'];
};


export type QueryStoreArgs = {
  id: Scalars['String'];
};


export type QueryStoresAdminConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryUserByEmailOrIdArgs = {
  userIdOrEmail: Scalars['String'];
};


export type QueryWishlistItemsConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};

/** query root */
export type Query_Root = {
   __typename?: 'query_root';
  /** fetch data from the table: "categories" */
  categories: Array<Categories>;
  /** fetch aggregated fields from the table: "categories" */
  categories_aggregate: Categories_Aggregate;
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>;
  /**
   * Get a category by its ID.
   * 
   * AccessRule – PUBLIC
   */
  category?: Maybe<ProductCategory>;
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
  /**
   * Get a curated list by its ID.
   * 
   * AccessRule – PUBLIC
   */
  curatedList?: Maybe<CuratedList>;
  /**
   * Collection of items that make up a curated list.
   * 
   * This is the admin connection, which will show items that may otherwise be hidden due to published status etc.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  curatedListItemsAdminConnection?: Maybe<CuratedListItemsConnection>;
  /**
   * Collection of items that make up a curated list.
   * 
   * AccessRule – PUBLIC
   */
  curatedListItemsConnection?: Maybe<CuratedListItemsConnection>;
  /**
   * Get details of one of your orders.
   * 
   * AccessRule – OWNER
   */
  getOrder?: Maybe<Order>;
  /**
   * Get details about any order in the system.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  getOrderAsAdmin?: Maybe<Order>;
  /**
   * Get details of items within one of your orders.
   * 
   * AccessRule – OWNER
   */
  getOrderItem?: Maybe<OrderItem>;
  /**
   * Get a credit card payment method's details from Stripe
   * 
   * AccessRule – OWNER
   */
  getPaymentMethod?: Maybe<PaymentMethod>;
  /**
   * List a specific payouts for a store/payee
   * 
   * AccessRule – OWNER
   */
  getPayoutById: Payout;
  /**
   * List payoutItems between startDate and endDate.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  getPayoutItemsInPeriodAdmin: PayoutItemsConnection;
  /**
   * List payoutItems between startDate and endDate.
   * Paged connection.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  getPayoutItemsInPeriodAdminPaged: PayoutItemsPagedConnection;
  /**
   * get a store's payout split
   * 
   * AccessRule – OWNER
   */
  getPayoutSplitByStoreId: PayoutSplit;
  /**
   * List all payouts for a store/payee
   * 
   * AccessRule – OWNER
   */
  getPayouts: PayoutsConnection;
  /**
   * List all payouts in the period between startDate and endDate.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  getPayoutsInPeriodAdmin: PayoutsConnection;
  /**
   * Get the product by productId
   * 
   * AccessRule – PUBLIC
   */
  getProductById?: Maybe<Product>;
  /**
   * Get the full list of product categories.
   * TODO: The maximum expected number of categories is X
   * 
   * AccessRule – PUBLIC
   */
  getProductCategories: Array<ProductCategory>;
  /**
   * Get the product that owns a product link slug.
   * 
   * AccessRule – PUBLIC
   */
  getProductFromLinkSlug?: Maybe<Product>;
  /**
   * Get details of items within one of your Product Sales.
   * 
   * AccessRule – OWNER
   */
  getProductSale?: Maybe<ProductSale>;
  /**
   * Get recent transactions, a helper function for Admin dashboard
   * to test refunds
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  getRecentTransactions: Array<Transaction>;
  /**
   * Get the store by storeIdOrSlug
   * 
   * AccessRule – PUBLIC
   */
  getStoreById?: Maybe<Store>;
  /**
   * Get the store that owns a store link slug.
   * 
   * AccessRule – PUBLIC
   */
  getStoreFromLinkSlug?: Maybe<Store>;
  /**
   * List sales summaries for stores in the period between startDate and endDate.
   * ONLY RETURNS stores which actually made a sale in the period.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  getStoreSalesInPeriodAdmin: StoreSalesInPeriodConnection;
  /**
   * Get transaction details of an order from efc-payment service
   * 
   * AccessRule – LOGGED_IN
   */
  getTransaction?: Maybe<Transaction>;
  /**
   * List transactions between startDate and endDate.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  getTransactionsInPeriodAdmin: TransactionsConnection;
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
  /**
   * Collection of curated lists.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  listOfCuratedListsConnection: CuratedListsConnection;
  /**
   * List credit card payment methods the user has saved
   * 
   * AccessRule – OWNER
   */
  listPaymentMethods?: Maybe<Array<PaymentMethod>>;
  /**
   * Get the user who is currently logged in.
   * 
   * AccessRule – LOGGED_IN
   */
  loggedInUser: UserPrivate;
  /**
   * Find out the owner of a product link slug.
   * 
   * AccessRule – PUBLIC
   */
  lookupProductLinkSlug?: Maybe<PrimaryLinkSlugs>;
  /**
   * Find out the owner of a store link slug.
   * 
   * AccessRule – PUBLIC
   */
  lookupStoreLinkSlug?: Maybe<PrimaryLinkSlugs>;
  /** fetch data from the table: "migrations" */
  migrations: Array<Migrations>;
  /** fetch aggregated fields from the table: "migrations" */
  migrations_aggregate: Migrations_Aggregate;
  /** fetch data from the table: "migrations" using primary key columns */
  migrations_by_pk?: Maybe<Migrations>;
  /** fetch data from the table: "payment_methods" */
  payment_methods: Array<Payment_Methods>;
  /** fetch aggregated fields from the table: "payment_methods" */
  payment_methods_aggregate: Payment_Methods_Aggregate;
  /** fetch data from the table: "payment_methods" using primary key columns */
  payment_methods_by_pk?: Maybe<Payment_Methods>;
  /** fetch data from the table: "payout_methods" */
  payout_methods: Array<Payout_Methods>;
  /** fetch aggregated fields from the table: "payout_methods" */
  payout_methods_aggregate: Payout_Methods_Aggregate;
  /** fetch data from the table: "payout_methods" using primary key columns */
  payout_methods_by_pk?: Maybe<Payout_Methods>;
  /**
   * Get a product by its ID.
   * 
   * AccessRule – PUBLIC
   */
  product?: Maybe<Product>;
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
  /** fetch data from the table: "products" */
  products: Array<Products>;
  /**
   * Query the complete list of products, on or off sale.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  productsAdminConnection: ProductsConnection;
  /**
   * Retrieve all of the products on the platform that can be purchased.
   * 
   * AccessRule – PUBLIC
   */
  productsAllConnection: ProductsConnection;
  /**
   * Retrieve all of the products for sale within a specific category.
   * 
   * AccessRule – PUBLIC
   */
  productsByCategoryConnection?: Maybe<ProductsConnection>;
  /**
   * Query the list of products that are recommended for the logged-in user.
   * If nobody is logged in, a general list of recommendations is still returned.
   * 
   * AccessRule – PUBLIC
   */
  productsRecommendedConnection: ProductsConnection;
  /** fetch aggregated fields from the table: "products" */
  products_aggregate: Products_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /**
   * Perform universal search.
   * 
   * AccessRule – PUBLIC
   */
  search: SearchResultsConnection;
  /**
   * Get a store by its ID.
   * 
   * AccessRule – PUBLIC
   */
  store?: Maybe<Store>;
  /** fetch data from the table: "stores" */
  stores: Array<Stores>;
  /**
   * Query the complete list of stores.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  storesAdminConnection: StoresConnection;
  /** fetch aggregated fields from the table: "stores" */
  stores_aggregate: Stores_Aggregate;
  /** fetch data from the table: "stores" using primary key columns */
  stores_by_pk?: Maybe<Stores>;
  /**
   * Lookup public information about a user.
   * If the requested user is also the logged-in user, UserPrivate fields will be available.
   * 
   * AccessRule – PUBLIC
   */
  user?: Maybe<User>;
  /**
   * Lookup private information about a user using their ID or email address.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  userByEmailOrId?: Maybe<User>;
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
  /** fetch data from the table: "users_typing" */
  users_typing: Array<Users_Typing>;
  /** fetch aggregated fields from the table: "users_typing" */
  users_typing_aggregate: Users_Typing_Aggregate;
  /**
   * Collection of products the user has saved for maybe purchasing later.
   * 
   * AccessRule – LOGGED_IN
   */
  wishlistItemsConnection: WishlistItemsConnection;
};


/** query root */
export type Query_RootCategoriesArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};


/** query root */
export type Query_RootCategories_AggregateArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};


/** query root */
export type Query_RootCategories_By_PkArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootCategoryArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootChat_MessagesArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};


/** query root */
export type Query_RootChat_Messages_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};


/** query root */
export type Query_RootChat_Messages_By_PkArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootChat_RoomsArgs = {
  distinct_on?: Maybe<Array<Chat_Rooms_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Rooms_Order_By>>;
  where?: Maybe<Chat_Rooms_Bool_Exp>;
};


/** query root */
export type Query_RootChat_Rooms_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Rooms_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Rooms_Order_By>>;
  where?: Maybe<Chat_Rooms_Bool_Exp>;
};


/** query root */
export type Query_RootChat_Rooms_By_PkArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootChat_UsersArgs = {
  distinct_on?: Maybe<Array<Chat_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Users_Order_By>>;
  where?: Maybe<Chat_Users_Bool_Exp>;
};


/** query root */
export type Query_RootChat_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Users_Order_By>>;
  where?: Maybe<Chat_Users_Bool_Exp>;
};


/** query root */
export type Query_RootChat_Users_By_PkArgs = {
  chatRoomId: Scalars['String'];
  userId: Scalars['String'];
};


/** query root */
export type Query_RootCuratedListArgs = {
  listId: Scalars['String'];
};


/** query root */
export type Query_RootCuratedListItemsAdminConnectionArgs = {
  listId: Scalars['String'];
  query?: Maybe<ConnectionQuery>;
};


/** query root */
export type Query_RootCuratedListItemsConnectionArgs = {
  listId: Scalars['String'];
  query?: Maybe<ConnectionQuery>;
};


/** query root */
export type Query_RootGetOrderArgs = {
  orderId: Scalars['String'];
};


/** query root */
export type Query_RootGetOrderAsAdminArgs = {
  orderId: Scalars['String'];
};


/** query root */
export type Query_RootGetOrderItemArgs = {
  orderItemId: Scalars['String'];
};


/** query root */
export type Query_RootGetPaymentMethodArgs = {
  paymentMethodId: Scalars['String'];
};


/** query root */
export type Query_RootGetPayoutByIdArgs = {
  payoutId: Scalars['String'];
};


/** query root */
export type Query_RootGetPayoutItemsInPeriodAdminArgs = {
  month?: Maybe<Scalars['Int']>;
  payoutStatus?: Maybe<PayoutStatus>;
  query: ConnectionQuery;
  year?: Maybe<Scalars['Int']>;
};


/** query root */
export type Query_RootGetPayoutItemsInPeriodAdminPagedArgs = {
  month?: Maybe<Scalars['Int']>;
  payoutStatus?: Maybe<PayoutStatus>;
  query: PageBasedConnectionQuery;
  year?: Maybe<Scalars['Int']>;
};


/** query root */
export type Query_RootGetPayoutSplitByStoreIdArgs = {
  storeOrUserId: Scalars['String'];
};


/** query root */
export type Query_RootGetPayoutsArgs = {
  query: ConnectionQuery;
  storeId: Scalars['String'];
};


/** query root */
export type Query_RootGetPayoutsInPeriodAdminArgs = {
  month: Scalars['Int'];
  payoutStatus?: Maybe<PayoutStatus>;
  query: ConnectionQuery;
  year: Scalars['Int'];
};


/** query root */
export type Query_RootGetProductByIdArgs = {
  productId: Scalars['String'];
};


/** query root */
export type Query_RootGetProductFromLinkSlugArgs = {
  slug: Scalars['String'];
};


/** query root */
export type Query_RootGetProductSaleArgs = {
  orderItemId: Scalars['String'];
};


/** query root */
export type Query_RootGetRecentTransactionsArgs = {
  count: Scalars['Int'];
};


/** query root */
export type Query_RootGetStoreByIdArgs = {
  storeId: Scalars['String'];
};


/** query root */
export type Query_RootGetStoreFromLinkSlugArgs = {
  slug: Scalars['String'];
};


/** query root */
export type Query_RootGetStoreSalesInPeriodAdminArgs = {
  endDate: Scalars['Date'];
  query?: Maybe<ConnectionQuery>;
  startDate: Scalars['Date'];
};


/** query root */
export type Query_RootGetTransactionArgs = {
  transactionId: Scalars['String'];
};


/** query root */
export type Query_RootGetTransactionsInPeriodAdminArgs = {
  month?: Maybe<Scalars['Int']>;
  query?: Maybe<ConnectionQuery>;
  year?: Maybe<Scalars['Int']>;
};


/** query root */
export type Query_RootImage_OwnersArgs = {
  distinct_on?: Maybe<Array<Image_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Owners_Order_By>>;
  where?: Maybe<Image_Owners_Bool_Exp>;
};


/** query root */
export type Query_RootImage_Owners_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Owners_Order_By>>;
  where?: Maybe<Image_Owners_Bool_Exp>;
};


/** query root */
export type Query_RootImage_Owners_By_PkArgs = {
  imageId: Scalars['String'];
};


/** query root */
export type Query_RootImage_ParentsArgs = {
  distinct_on?: Maybe<Array<Image_Parents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Parents_Order_By>>;
  where?: Maybe<Image_Parents_Bool_Exp>;
};


/** query root */
export type Query_RootImage_Parents_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Parents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Parents_Order_By>>;
  where?: Maybe<Image_Parents_Bool_Exp>;
};


/** query root */
export type Query_RootImage_Parents_By_PkArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootImage_VariantsArgs = {
  distinct_on?: Maybe<Array<Image_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Variants_Order_By>>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};


/** query root */
export type Query_RootImage_Variants_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Variants_Order_By>>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};


/** query root */
export type Query_RootImage_Variants_By_PkArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootListOfCuratedListsConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


/** query root */
export type Query_RootListPaymentMethodsArgs = {
  customerId: Scalars['String'];
};


/** query root */
export type Query_RootLookupProductLinkSlugArgs = {
  slug: Scalars['String'];
};


/** query root */
export type Query_RootLookupStoreLinkSlugArgs = {
  slug: Scalars['String'];
};


/** query root */
export type Query_RootMigrationsArgs = {
  distinct_on?: Maybe<Array<Migrations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Migrations_Order_By>>;
  where?: Maybe<Migrations_Bool_Exp>;
};


/** query root */
export type Query_RootMigrations_AggregateArgs = {
  distinct_on?: Maybe<Array<Migrations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Migrations_Order_By>>;
  where?: Maybe<Migrations_Bool_Exp>;
};


/** query root */
export type Query_RootMigrations_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootPayment_MethodsArgs = {
  distinct_on?: Maybe<Array<Payment_Methods_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payment_Methods_Order_By>>;
  where?: Maybe<Payment_Methods_Bool_Exp>;
};


/** query root */
export type Query_RootPayment_Methods_AggregateArgs = {
  distinct_on?: Maybe<Array<Payment_Methods_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payment_Methods_Order_By>>;
  where?: Maybe<Payment_Methods_Bool_Exp>;
};


/** query root */
export type Query_RootPayment_Methods_By_PkArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootPayout_MethodsArgs = {
  distinct_on?: Maybe<Array<Payout_Methods_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payout_Methods_Order_By>>;
  where?: Maybe<Payout_Methods_Bool_Exp>;
};


/** query root */
export type Query_RootPayout_Methods_AggregateArgs = {
  distinct_on?: Maybe<Array<Payout_Methods_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payout_Methods_Order_By>>;
  where?: Maybe<Payout_Methods_Bool_Exp>;
};


/** query root */
export type Query_RootPayout_Methods_By_PkArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootProductArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootProduct_File_OwnersArgs = {
  distinct_on?: Maybe<Array<Product_File_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_File_Owners_Order_By>>;
  where?: Maybe<Product_File_Owners_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_File_Owners_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_File_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_File_Owners_Order_By>>;
  where?: Maybe<Product_File_Owners_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_File_Owners_By_PkArgs = {
  productFileId: Scalars['String'];
};


/** query root */
export type Query_RootProduct_FilesArgs = {
  distinct_on?: Maybe<Array<Product_Files_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Files_Order_By>>;
  where?: Maybe<Product_Files_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_Files_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Files_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Files_Order_By>>;
  where?: Maybe<Product_Files_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_Files_By_PkArgs = {
  productFileId: Scalars['String'];
};


/** query root */
export type Query_RootProduct_Preview_ItemsArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_Preview_Items_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_Preview_Items_By_PkArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootProduct_SnapshotsArgs = {
  distinct_on?: Maybe<Array<Product_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Snapshots_Order_By>>;
  where?: Maybe<Product_Snapshots_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_Snapshots_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Snapshots_Order_By>>;
  where?: Maybe<Product_Snapshots_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_Snapshots_By_PkArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootProduct_VariantsArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_Variants_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_Variants_By_PkArgs = {
  variantSnapshotId: Scalars['String'];
};


/** query root */
export type Query_RootProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


/** query root */
export type Query_RootProductsAdminConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


/** query root */
export type Query_RootProductsAllConnectionArgs = {
  query?: Maybe<ConnectionOffsetQuery>;
  searchTerm?: Maybe<Scalars['String']>;
};


/** query root */
export type Query_RootProductsByCategoryConnectionArgs = {
  categoryId?: Maybe<Scalars['String']>;
  categoryName?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionOffsetQuery>;
};


/** query root */
export type Query_RootProductsRecommendedConnectionArgs = {
  currentlyViewingProductIdOrSlug?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionQuery>;
};


/** query root */
export type Query_RootProducts_AggregateArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


/** query root */
export type Query_RootProducts_By_PkArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootSearchArgs = {
  query?: Maybe<PageBasedConnectionQuery>;
  searchTerm: Scalars['String'];
};


/** query root */
export type Query_RootStoreArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootStoresArgs = {
  distinct_on?: Maybe<Array<Stores_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Stores_Order_By>>;
  where?: Maybe<Stores_Bool_Exp>;
};


/** query root */
export type Query_RootStoresAdminConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


/** query root */
export type Query_RootStores_AggregateArgs = {
  distinct_on?: Maybe<Array<Stores_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Stores_Order_By>>;
  where?: Maybe<Stores_Bool_Exp>;
};


/** query root */
export type Query_RootStores_By_PkArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootUserArgs = {
  id?: Maybe<Scalars['String']>;
};


/** query root */
export type Query_RootUserByEmailOrIdArgs = {
  userIdOrEmail: Scalars['String'];
};


/** query root */
export type Query_RootUser_LicensesArgs = {
  distinct_on?: Maybe<Array<User_Licenses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Licenses_Order_By>>;
  where?: Maybe<User_Licenses_Bool_Exp>;
};


/** query root */
export type Query_RootUser_Licenses_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Licenses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Licenses_Order_By>>;
  where?: Maybe<User_Licenses_Bool_Exp>;
};


/** query root */
export type Query_RootUser_Licenses_By_PkArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootUsers_OnlineArgs = {
  distinct_on?: Maybe<Array<Users_Online_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Online_Order_By>>;
  where?: Maybe<Users_Online_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_Online_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Online_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Online_Order_By>>;
  where?: Maybe<Users_Online_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_TypingArgs = {
  distinct_on?: Maybe<Array<Users_Typing_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Typing_Order_By>>;
  where?: Maybe<Users_Typing_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_Typing_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Typing_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Typing_Order_By>>;
  where?: Maybe<Users_Typing_Bool_Exp>;
};


/** query root */
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

/** An item in a search result (this can accomodate multiple types of items in a search result) */
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

/** Current stock level information, influencing whether an item is purchasable */
export type StockLevel = {
   __typename?: 'StockLevel';
  /** Amount that can be purchased now */
  quantityAvailable: Scalars['Int'];
  /** How much was allocated when it was last restocked */
  quantityRestocked?: Maybe<Scalars['Int']>;
  /** When the quantity was last restocked */
  restockedAt?: Maybe<Scalars['Date']>;
};

/** Information about a store */
export type Store = {
  bio?: Maybe<Scalars['String']>;
  cover?: Maybe<Image>;
  coverId?: Maybe<Scalars['ID']>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  /** Whether or not it has been deleted */
  isDeleted: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it */
  isSuspended: Scalars['Boolean'];
  name: Scalars['String'];
  productsForSaleConnection: ProductsConnection;
  profile?: Maybe<Image>;
  profileId?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  userId: Scalars['ID'];
  website?: Maybe<Scalars['String']>;
};


/** Information about a store */
export type StoreProductsForSaleConnectionArgs = {
  query?: Maybe<ConnectionOffsetQuery>;
};

/** Collection of analytical information */
export type StoreAnalytics = {
   __typename?: 'StoreAnalytics';
  /**
   * The total sum of revenues from sold products,
   * and counts of sold items in periods:
   * - today
   * - last 7 days
   * - last 30 days
   * - all time
   */
  payoutHistorySummaries: PayoutHistorySummaries;
  /** List of sold items */
  salesHistoryConnection: StoreSalesHistoryConnection;
  /** ID of the store owning the analytics */
  storeId: Scalars['ID'];
};


/** Collection of analytical information */
export type StoreAnalyticsSalesHistoryConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};

export type StoreMutationResponse = {
   __typename?: 'StoreMutationResponse';
  store: StorePrivate;
};

/** Private store info */
export type StorePrivate = Store & {
   __typename?: 'StorePrivate';
  analytics?: Maybe<StoreAnalytics>;
  bio?: Maybe<Scalars['String']>;
  cover?: Maybe<Image>;
  coverId?: Maybe<Scalars['ID']>;
  createdAt: Scalars['Date'];
  /** Store sellers's view of currently published products. */
  dashboardPublishedProductsConnection: Array<Maybe<Product>>;
  /** Store sellers's view of currently unpublished products. */
  dashboardUnpublishedProductsConnection: Array<Maybe<Product>>;
  id: Scalars['ID'];
  /** Whether or not it has been deleted */
  isDeleted: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it */
  isSuspended: Scalars['Boolean'];
  name: Scalars['String'];
  payoutSplit?: Maybe<PayoutSplit>;
  productsForSaleConnection: ProductsConnection;
  profile?: Maybe<Image>;
  profileId?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  user?: Maybe<UserPrivate>;
  userId: Scalars['ID'];
  website?: Maybe<Scalars['String']>;
};


/** Private store info */
export type StorePrivateProductsForSaleConnectionArgs = {
  query?: Maybe<ConnectionOffsetQuery>;
};

/** Public store info */
export type StorePublic = Store & {
   __typename?: 'StorePublic';
  bio?: Maybe<Scalars['String']>;
  cover?: Maybe<Image>;
  coverId?: Maybe<Scalars['ID']>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  /** Whether or not it has been deleted */
  isDeleted: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it */
  isSuspended: Scalars['Boolean'];
  name: Scalars['String'];
  productsForSaleConnection: ProductsConnection;
  profile?: Maybe<Image>;
  profileId?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  user: UserPublic;
  userId: Scalars['ID'];
  website?: Maybe<Scalars['String']>;
};


/** Public store info */
export type StorePublicProductsForSaleConnectionArgs = {
  query?: Maybe<ConnectionOffsetQuery>;
};

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
  name: Scalars['String'];
  /** An array relationship */
  products: Array<Products>;
  /** An aggregated array relationship */
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Stores_Max_Fields>;
  min?: Maybe<Stores_Min_Fields>;
};


/** aggregate fields of "stores" */
export type Stores_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Stores_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "stores" */
export type Stores_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Stores_Max_Order_By>;
  min?: Maybe<Stores_Min_Order_By>;
};

/** input type for inserting array relation for remote table "stores" */
export type Stores_Arr_Rel_Insert_Input = {
  data: Array<Stores_Insert_Input>;
  on_conflict?: Maybe<Stores_On_Conflict>;
};

/** Boolean expression to filter rows from the table "stores". All fields are combined with a logical 'AND'. */
export type Stores_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Stores_Bool_Exp>>>;
  _not?: Maybe<Stores_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Stores_Bool_Exp>>>;
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

/** order by max() on columns of table "stores" */
export type Stores_Max_Order_By = {
  bio?: Maybe<Order_By>;
  coverId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  profileId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
  website?: Maybe<Order_By>;
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

/** order by min() on columns of table "stores" */
export type Stores_Min_Order_By = {
  bio?: Maybe<Order_By>;
  coverId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  profileId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
  website?: Maybe<Order_By>;
};

/** response of any mutation on the table "stores" */
export type Stores_Mutation_Response = {
   __typename?: 'stores_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Stores>;
};

/** input type for inserting object relation for remote table "stores" */
export type Stores_Obj_Rel_Insert_Input = {
  data: Stores_Insert_Input;
  on_conflict?: Maybe<Stores_On_Conflict>;
};

/** on conflict condition type for table "stores" */
export type Stores_On_Conflict = {
  constraint: Stores_Constraint;
  update_columns: Array<Stores_Update_Column>;
  where?: Maybe<Stores_Bool_Exp>;
};

/** ordering options when selecting data from "stores" */
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

/** primary key columns input for table: "stores" */
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

export type StoresEdge = Edge & {
   __typename?: 'StoresEdge';
  cursor: Scalars['PageCursor'];
  node: Store;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
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

export type StringComparisonExp = {
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

/** This is a condensed version of the Stripe Customer creation response */
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

/** subscription root */
export type Subscription_Root = {
   __typename?: 'subscription_root';
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
  /** fetch data from the table: "migrations" */
  migrations: Array<Migrations>;
  /** fetch aggregated fields from the table: "migrations" */
  migrations_aggregate: Migrations_Aggregate;
  /** fetch data from the table: "migrations" using primary key columns */
  migrations_by_pk?: Maybe<Migrations>;
  /** fetch data from the table: "payment_methods" */
  payment_methods: Array<Payment_Methods>;
  /** fetch aggregated fields from the table: "payment_methods" */
  payment_methods_aggregate: Payment_Methods_Aggregate;
  /** fetch data from the table: "payment_methods" using primary key columns */
  payment_methods_by_pk?: Maybe<Payment_Methods>;
  /** fetch data from the table: "payout_methods" */
  payout_methods: Array<Payout_Methods>;
  /** fetch aggregated fields from the table: "payout_methods" */
  payout_methods_aggregate: Payout_Methods_Aggregate;
  /** fetch data from the table: "payout_methods" using primary key columns */
  payout_methods_by_pk?: Maybe<Payout_Methods>;
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
  /** fetch data from the table: "products" */
  products: Array<Products>;
  /** fetch aggregated fields from the table: "products" */
  products_aggregate: Products_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "stores" */
  stores: Array<Stores>;
  /** fetch aggregated fields from the table: "stores" */
  stores_aggregate: Stores_Aggregate;
  /** fetch data from the table: "stores" using primary key columns */
  stores_by_pk?: Maybe<Stores>;
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
  /** fetch data from the table: "users_typing" */
  users_typing: Array<Users_Typing>;
  /** fetch aggregated fields from the table: "users_typing" */
  users_typing_aggregate: Users_Typing_Aggregate;
};


/** subscription root */
export type Subscription_RootCategoriesArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCategories_AggregateArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCategories_By_PkArgs = {
  id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootChat_MessagesArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootChat_Messages_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootChat_Messages_By_PkArgs = {
  id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootChat_RoomsArgs = {
  distinct_on?: Maybe<Array<Chat_Rooms_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Rooms_Order_By>>;
  where?: Maybe<Chat_Rooms_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootChat_Rooms_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Rooms_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Rooms_Order_By>>;
  where?: Maybe<Chat_Rooms_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootChat_Rooms_By_PkArgs = {
  id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootChat_UsersArgs = {
  distinct_on?: Maybe<Array<Chat_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Users_Order_By>>;
  where?: Maybe<Chat_Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootChat_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Users_Order_By>>;
  where?: Maybe<Chat_Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootChat_Users_By_PkArgs = {
  chatRoomId: Scalars['String'];
  userId: Scalars['String'];
};


/** subscription root */
export type Subscription_RootImage_OwnersArgs = {
  distinct_on?: Maybe<Array<Image_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Owners_Order_By>>;
  where?: Maybe<Image_Owners_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootImage_Owners_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Owners_Order_By>>;
  where?: Maybe<Image_Owners_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootImage_Owners_By_PkArgs = {
  imageId: Scalars['String'];
};


/** subscription root */
export type Subscription_RootImage_ParentsArgs = {
  distinct_on?: Maybe<Array<Image_Parents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Parents_Order_By>>;
  where?: Maybe<Image_Parents_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootImage_Parents_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Parents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Parents_Order_By>>;
  where?: Maybe<Image_Parents_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootImage_Parents_By_PkArgs = {
  id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootImage_VariantsArgs = {
  distinct_on?: Maybe<Array<Image_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Variants_Order_By>>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootImage_Variants_AggregateArgs = {
  distinct_on?: Maybe<Array<Image_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Image_Variants_Order_By>>;
  where?: Maybe<Image_Variants_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootImage_Variants_By_PkArgs = {
  id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootMigrationsArgs = {
  distinct_on?: Maybe<Array<Migrations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Migrations_Order_By>>;
  where?: Maybe<Migrations_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMigrations_AggregateArgs = {
  distinct_on?: Maybe<Array<Migrations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Migrations_Order_By>>;
  where?: Maybe<Migrations_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMigrations_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootPayment_MethodsArgs = {
  distinct_on?: Maybe<Array<Payment_Methods_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payment_Methods_Order_By>>;
  where?: Maybe<Payment_Methods_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPayment_Methods_AggregateArgs = {
  distinct_on?: Maybe<Array<Payment_Methods_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payment_Methods_Order_By>>;
  where?: Maybe<Payment_Methods_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPayment_Methods_By_PkArgs = {
  id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootPayout_MethodsArgs = {
  distinct_on?: Maybe<Array<Payout_Methods_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payout_Methods_Order_By>>;
  where?: Maybe<Payout_Methods_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPayout_Methods_AggregateArgs = {
  distinct_on?: Maybe<Array<Payout_Methods_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Payout_Methods_Order_By>>;
  where?: Maybe<Payout_Methods_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPayout_Methods_By_PkArgs = {
  id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootProduct_File_OwnersArgs = {
  distinct_on?: Maybe<Array<Product_File_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_File_Owners_Order_By>>;
  where?: Maybe<Product_File_Owners_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_File_Owners_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_File_Owners_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_File_Owners_Order_By>>;
  where?: Maybe<Product_File_Owners_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_File_Owners_By_PkArgs = {
  productFileId: Scalars['String'];
};


/** subscription root */
export type Subscription_RootProduct_FilesArgs = {
  distinct_on?: Maybe<Array<Product_Files_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Files_Order_By>>;
  where?: Maybe<Product_Files_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_Files_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Files_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Files_Order_By>>;
  where?: Maybe<Product_Files_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_Files_By_PkArgs = {
  productFileId: Scalars['String'];
};


/** subscription root */
export type Subscription_RootProduct_Preview_ItemsArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_Preview_Items_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_Preview_Items_By_PkArgs = {
  id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootProduct_SnapshotsArgs = {
  distinct_on?: Maybe<Array<Product_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Snapshots_Order_By>>;
  where?: Maybe<Product_Snapshots_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_Snapshots_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Snapshots_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Snapshots_Order_By>>;
  where?: Maybe<Product_Snapshots_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_Snapshots_By_PkArgs = {
  id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootProduct_VariantsArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_Variants_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_Variants_By_PkArgs = {
  variantSnapshotId: Scalars['String'];
};


/** subscription root */
export type Subscription_RootProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProducts_AggregateArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProducts_By_PkArgs = {
  id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootStoresArgs = {
  distinct_on?: Maybe<Array<Stores_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Stores_Order_By>>;
  where?: Maybe<Stores_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStores_AggregateArgs = {
  distinct_on?: Maybe<Array<Stores_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Stores_Order_By>>;
  where?: Maybe<Stores_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStores_By_PkArgs = {
  id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootUser_LicensesArgs = {
  distinct_on?: Maybe<Array<User_Licenses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Licenses_Order_By>>;
  where?: Maybe<User_Licenses_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_Licenses_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Licenses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Licenses_Order_By>>;
  where?: Maybe<User_Licenses_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_Licenses_By_PkArgs = {
  id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootUsers_OnlineArgs = {
  distinct_on?: Maybe<Array<Users_Online_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Online_Order_By>>;
  where?: Maybe<Users_Online_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_Online_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Online_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Online_Order_By>>;
  where?: Maybe<Users_Online_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_TypingArgs = {
  distinct_on?: Maybe<Array<Users_Typing_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Typing_Order_By>>;
  where?: Maybe<Users_Typing_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_Typing_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Typing_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Typing_Order_By>>;
  where?: Maybe<Users_Typing_Bool_Exp>;
};

export type SummaryStatistics = {
   __typename?: 'SummaryStatistics';
  amountSum: Scalars['Int'];
  count: Scalars['Int'];
};


/** expression to compare columns of type timestamp. All fields are combined with logical 'AND'. */
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

/** expression to compare columns of type timestamp. All fields are combined with logical 'AND'. */
export type TimestampComparisonExp = {
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


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
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

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
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
  /** Sums the 'amount' column of the payout_items table */
  totalAmount?: Maybe<Scalars['Int']>;
  /** The number of transactions in the period */
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

/** A category of file upload – each one has a different purpose. */
export enum UploadType {
  IMAGE = 'IMAGE',
  PRODUCT_FILE = 'PRODUCT_FILE'
}

/** Information about a person on the platform */
export type User = {
  createdAt?: Maybe<Scalars['Date']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
};

/** columns and relationships of "user_licenses" */
export type User_Licenses = {
   __typename?: 'user_licenses';
  expiry: Scalars['timestamp'];
  id: Scalars['String'];
  licenseCategory: Scalars['String'];
  licenseNumber: Scalars['String'];
  state?: Maybe<Scalars['String']>;
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<User_Licenses_Max_Fields>;
  min?: Maybe<User_Licenses_Min_Fields>;
};


/** aggregate fields of "user_licenses" */
export type User_Licenses_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Licenses_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_licenses" */
export type User_Licenses_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<User_Licenses_Max_Order_By>;
  min?: Maybe<User_Licenses_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user_licenses" */
export type User_Licenses_Arr_Rel_Insert_Input = {
  data: Array<User_Licenses_Insert_Input>;
  on_conflict?: Maybe<User_Licenses_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user_licenses". All fields are combined with a logical 'AND'. */
export type User_Licenses_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Licenses_Bool_Exp>>>;
  _not?: Maybe<User_Licenses_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Licenses_Bool_Exp>>>;
  expiry?: Maybe<Timestamp_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  licenseCategory?: Maybe<String_Comparison_Exp>;
  licenseNumber?: Maybe<String_Comparison_Exp>;
  state?: Maybe<String_Comparison_Exp>;
  verified?: Maybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_licenses" */
export enum User_Licenses_Constraint {
  /** unique or primary key constraint */
  USER_LICENSES_PKEY = 'user_licenses_pkey'
}

/** input type for inserting data into table "user_licenses" */
export type User_Licenses_Insert_Input = {
  expiry?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  licenseCategory?: Maybe<Scalars['String']>;
  licenseNumber?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type User_Licenses_Max_Fields = {
   __typename?: 'user_licenses_max_fields';
  expiry?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  licenseCategory?: Maybe<Scalars['String']>;
  licenseNumber?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "user_licenses" */
export type User_Licenses_Max_Order_By = {
  expiry?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  licenseCategory?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
  state?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Licenses_Min_Fields = {
   __typename?: 'user_licenses_min_fields';
  expiry?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  licenseCategory?: Maybe<Scalars['String']>;
  licenseNumber?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "user_licenses" */
export type User_Licenses_Min_Order_By = {
  expiry?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  licenseCategory?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
  state?: Maybe<Order_By>;
};

/** response of any mutation on the table "user_licenses" */
export type User_Licenses_Mutation_Response = {
   __typename?: 'user_licenses_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User_Licenses>;
};

/** input type for inserting object relation for remote table "user_licenses" */
export type User_Licenses_Obj_Rel_Insert_Input = {
  data: User_Licenses_Insert_Input;
  on_conflict?: Maybe<User_Licenses_On_Conflict>;
};

/** on conflict condition type for table "user_licenses" */
export type User_Licenses_On_Conflict = {
  constraint: User_Licenses_Constraint;
  update_columns: Array<User_Licenses_Update_Column>;
  where?: Maybe<User_Licenses_Bool_Exp>;
};

/** ordering options when selecting data from "user_licenses" */
export type User_Licenses_Order_By = {
  expiry?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  licenseCategory?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
  state?: Maybe<Order_By>;
  verified?: Maybe<Order_By>;
};

/** primary key columns input for table: "user_licenses" */
export type User_Licenses_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "user_licenses" */
export enum User_Licenses_Select_Column {
  /** column name */
  EXPIRY = 'expiry',
  /** column name */
  ID = 'id',
  /** column name */
  LICENSECATEGORY = 'licenseCategory',
  /** column name */
  LICENSENUMBER = 'licenseNumber',
  /** column name */
  STATE = 'state',
  /** column name */
  VERIFIED = 'verified'
}

/** input type for updating data in table "user_licenses" */
export type User_Licenses_Set_Input = {
  expiry?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['String']>;
  licenseCategory?: Maybe<Scalars['String']>;
  licenseNumber?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
};

/** update columns of table "user_licenses" */
export enum User_Licenses_Update_Column {
  /** column name */
  EXPIRY = 'expiry',
  /** column name */
  ID = 'id',
  /** column name */
  LICENSECATEGORY = 'licenseCategory',
  /** column name */
  LICENSENUMBER = 'licenseNumber',
  /** column name */
  STATE = 'state',
  /** column name */
  VERIFIED = 'verified'
}

export type UserMutationResponse = {
   __typename?: 'UserMutationResponse';
  user: UserPrivate;
};

/** Private user info */
export type UserPrivate = User & {
   __typename?: 'UserPrivate';
  cart?: Maybe<Cart>;
  cartId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  defaultPaymentMethod?: Maybe<PaymentMethod>;
  defaultPaymentMethodId?: Maybe<Scalars['ID']>;
  downloadsConnection?: Maybe<DownloadsConnection>;
  email: Scalars['String'];
  emailVerified?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  followingStores?: Maybe<FollowingStoresConnection>;
  id: Scalars['ID'];
  isSuspended: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  orderHistoryConnection?: Maybe<OrdersConnection>;
  paymentMethods?: Maybe<Array<Maybe<PaymentMethod>>>;
  payoutHistoryConnection?: Maybe<PayoutsConnection>;
  payoutMethod?: Maybe<PayoutMethod>;
  payoutMethodId?: Maybe<Scalars['ID']>;
  store?: Maybe<StorePrivate>;
  storeId?: Maybe<Scalars['ID']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  userRole: Role;
  username?: Maybe<Scalars['String']>;
  wishlistItemsConnection?: Maybe<WishlistItemsConnection>;
};


/** Private user info */
export type UserPrivateDownloadsConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


/** Private user info */
export type UserPrivateFollowingStoresArgs = {
  query?: Maybe<ConnectionQuery>;
};


/** Private user info */
export type UserPrivateOrderHistoryConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


/** Private user info */
export type UserPrivatePayoutHistoryConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


/** Private user info */
export type UserPrivateWishlistItemsConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};

/** Public user info */
export type UserPublic = User & {
   __typename?: 'UserPublic';
  createdAt?: Maybe<Scalars['Date']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
};

/** columns and relationships of "users" */
export type Users = {
   __typename?: 'users';
  cartId?: Maybe<Scalars['String']>;
  /** An array relationship */
  conversations: Array<Chat_Users>;
  /** An aggregated array relationship */
  conversations_aggregate: Chat_Users_Aggregate;
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
  lastTyped?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  license?: Maybe<User_Licenses>;
  licenseId?: Maybe<Scalars['String']>;
  passwordHash: Scalars['String'];
  /** An object relationship */
  payoutMethod?: Maybe<Payout_Methods>;
  payoutMethodId?: Maybe<Scalars['String']>;
  payoutSplitId?: Maybe<Scalars['String']>;
  sellerReferredById?: Maybe<Scalars['String']>;
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Max_Order_By>;
  min?: Maybe<Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  cartId?: Maybe<String_Comparison_Exp>;
  conversations?: Maybe<Chat_Users_Bool_Exp>;
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
  lastTyped?: Maybe<Timestamptz_Comparison_Exp>;
  license?: Maybe<User_Licenses_Bool_Exp>;
  licenseId?: Maybe<String_Comparison_Exp>;
  passwordHash?: Maybe<String_Comparison_Exp>;
  payoutMethod?: Maybe<Payout_Methods_Bool_Exp>;
  payoutMethodId?: Maybe<String_Comparison_Exp>;
  payoutSplitId?: Maybe<String_Comparison_Exp>;
  sellerReferredById?: Maybe<String_Comparison_Exp>;
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
  USERS_PKEY = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  cartId?: Maybe<Scalars['String']>;
  conversations?: Maybe<Chat_Users_Arr_Rel_Insert_Input>;
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
  lastTyped?: Maybe<Scalars['timestamptz']>;
  license?: Maybe<User_Licenses_Obj_Rel_Insert_Input>;
  licenseId?: Maybe<Scalars['String']>;
  passwordHash?: Maybe<Scalars['String']>;
  payoutMethod?: Maybe<Payout_Methods_Obj_Rel_Insert_Input>;
  payoutMethodId?: Maybe<Scalars['String']>;
  payoutSplitId?: Maybe<Scalars['String']>;
  sellerReferredById?: Maybe<Scalars['String']>;
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
  defaultPaymentMethodId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  lastTyped?: Maybe<Scalars['timestamptz']>;
  licenseId?: Maybe<Scalars['String']>;
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

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  cartId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  defaultPaymentMethodId?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  firstName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  lastName?: Maybe<Order_By>;
  lastSeen?: Maybe<Order_By>;
  lastTyped?: Maybe<Order_By>;
  licenseId?: Maybe<Order_By>;
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

/** aggregate min on columns */
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
  lastTyped?: Maybe<Scalars['timestamptz']>;
  licenseId?: Maybe<Scalars['String']>;
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

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  cartId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  defaultPaymentMethodId?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  firstName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  lastName?: Maybe<Order_By>;
  lastSeen?: Maybe<Order_By>;
  lastTyped?: Maybe<Order_By>;
  licenseId?: Maybe<Order_By>;
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

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
   __typename?: 'users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Online_Max_Fields>;
  min?: Maybe<Users_Online_Min_Fields>;
};


/** aggregate fields of "users_online" */
export type Users_Online_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Online_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users_online" */
export type Users_Online_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Online_Max_Order_By>;
  min?: Maybe<Users_Online_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "users_online". All fields are combined with a logical 'AND'. */
export type Users_Online_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Online_Bool_Exp>>>;
  _not?: Maybe<Users_Online_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Online_Bool_Exp>>>;
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

/** order by max() on columns of table "users_online" */
export type Users_Online_Max_Order_By = {
  email?: Maybe<Order_By>;
  firstName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  lastName?: Maybe<Order_By>;
  lastSeen?: Maybe<Order_By>;
  lastType?: Maybe<Order_By>;
  licenseId?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
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

/** order by min() on columns of table "users_online" */
export type Users_Online_Min_Order_By = {
  email?: Maybe<Order_By>;
  firstName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  lastName?: Maybe<Order_By>;
  lastSeen?: Maybe<Order_By>;
  lastType?: Maybe<Order_By>;
  licenseId?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
};

/** ordering options when selecting data from "users_online" */
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

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  cartId?: Maybe<Order_By>;
  conversations_aggregate?: Maybe<Chat_Users_Aggregate_Order_By>;
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
  lastTyped?: Maybe<Order_By>;
  license?: Maybe<User_Licenses_Order_By>;
  licenseId?: Maybe<Order_By>;
  passwordHash?: Maybe<Order_By>;
  payoutMethod?: Maybe<Payout_Methods_Order_By>;
  payoutMethodId?: Maybe<Order_By>;
  payoutSplitId?: Maybe<Order_By>;
  sellerReferredById?: Maybe<Order_By>;
  store?: Maybe<Stores_Order_By>;
  storeById?: Maybe<Stores_Order_By>;
  storeId?: Maybe<Order_By>;
  stripeCustomerId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userRole?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** primary key columns input for table: "users" */
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
  LICENSEID = 'licenseId',
  /** column name */
  PASSWORDHASH = 'passwordHash',
  /** column name */
  PAYOUTMETHODID = 'payoutMethodId',
  /** column name */
  PAYOUTSPLITID = 'payoutSplitId',
  /** column name */
  SELLERREFERREDBYID = 'sellerReferredById',
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
  licenseId?: Maybe<Scalars['String']>;
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Typing_Max_Fields>;
  min?: Maybe<Users_Typing_Min_Fields>;
};


/** aggregate fields of "users_typing" */
export type Users_Typing_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Typing_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users_typing" */
export type Users_Typing_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Typing_Max_Order_By>;
  min?: Maybe<Users_Typing_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "users_typing". All fields are combined with a logical 'AND'. */
export type Users_Typing_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Typing_Bool_Exp>>>;
  _not?: Maybe<Users_Typing_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Typing_Bool_Exp>>>;
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

/** order by max() on columns of table "users_typing" */
export type Users_Typing_Max_Order_By = {
  email?: Maybe<Order_By>;
  firstName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  lastName?: Maybe<Order_By>;
  lastSeen?: Maybe<Order_By>;
  lastTyped?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
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

/** order by min() on columns of table "users_typing" */
export type Users_Typing_Min_Order_By = {
  email?: Maybe<Order_By>;
  firstName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  lastName?: Maybe<Order_By>;
  lastSeen?: Maybe<Order_By>;
  lastTyped?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
};

/** ordering options when selecting data from "users_typing" */
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
  LICENSEID = 'licenseId',
  /** column name */
  PASSWORDHASH = 'passwordHash',
  /** column name */
  PAYOUTMETHODID = 'payoutMethodId',
  /** column name */
  PAYOUTSPLITID = 'payoutSplitId',
  /** column name */
  SELLERREFERREDBYID = 'sellerReferredById',
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

export type UserWithRole = User & {
   __typename?: 'UserWithRole';
  createdAt?: Maybe<Scalars['Date']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  userRole: Role;
};

export enum VariantsLabel {
  /** License type variants */
  LICENSE = 'LICENSE',
  /** Default */
  VARIANT = 'VARIANT'
}

/** An individual item in a wishlist */
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





export type RegisterUploadMutationVariables = Exact<{
  uploadType: UploadType;
  mimeType: Scalars['String'];
  fileSize: Scalars['Int'];
}>;


export type RegisterUploadMutation = { __typename?: 'mutation_root', uploadRegister: { __typename?: 'UploadRegisterMutationResponse', uploadId: string, putUrl: string } };

export type SaveImageUploadMutationVariables = Exact<{
  uploadId: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>;
}>;


export type SaveImageUploadMutation = { __typename?: 'mutation_root', uploadSaveImage: { __typename?: 'UploadSaveImageMutationResponse', image: (
      { __typename?: 'Image' }
      & ImageFragment
    ) } };

export type SaveProductFileUploadMutationVariables = Exact<{
  uploadId: Scalars['String'];
  fileName: Scalars['String'];
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>;
}>;


export type SaveProductFileUploadMutation = { __typename?: 'mutation_root', uploadSaveProductFile: { __typename?: 'UploadSaveProductFileMutationResponse', fileId: string } };

export type GetProductFileDownloadLinkMutationVariables = Exact<{
  id: Scalars['String'];
  orderItemId: Scalars['String'];
}>;


export type GetProductFileDownloadLinkMutation = { __typename?: 'mutation_root', generateProductFileDownloadLink: { __typename?: 'ProductFileLinkMutationResponse', downloadLink: { __typename?: 'ProductFileDownloadLink', productFileId: string, expiresAt: any, url: string } } };

export type ImageFragment = { __typename?: 'Image', id: string, createdAt: any, tags?: Maybe<string>, description?: Maybe<string>, original: { __typename?: 'ImageVariant', id: string, url?: Maybe<string>, mimeType?: Maybe<string>, heightInPixels?: Maybe<number>, widthInPixels?: Maybe<number>, sizeInBytes?: Maybe<number> }, variants: Array<{ __typename?: 'ImageVariant', id: string, mimeType?: Maybe<string>, sizeInBytes?: Maybe<number>, widthInPixels?: Maybe<number>, heightInPixels?: Maybe<number>, url?: Maybe<string> }> };

export type ProductVariantFragment = { __typename?: 'ProductVariant', variantSnapshotId: string, variantId: string, snapshotId: string, productId: string, storeId: string, createdAt: any, variantName: string, variantDescription?: Maybe<string>, isDefault: boolean, position: number, price: any, priceWas?: Maybe<any>, isSoldOut: boolean, previewItems: Array<{ __typename?: 'ProductPreviewItem', id: string, youTubeEmbedLink?: Maybe<string>, image?: Maybe<(
      { __typename?: 'Image' }
      & ImageFragment
    )> }> };

type ProductFragment_ProductPrivate_ = { __typename?: 'ProductPrivate', id: string, createdAt: any, updatedAt?: Maybe<any>, tags?: Maybe<string>, isPublished: boolean, isSuspended: boolean, isDeleted: boolean, isExcludedFromRecommendations: boolean, title: string, description: string, condition: string, make: string, model: string, ammoType?: Maybe<string>, actionType: string, boreDiameter?: Maybe<string>, serialNumber: string, location: string, dealer: string, currentVariants: Array<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )>, featuredVariant?: Maybe<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )>, chosenVariant?: Maybe<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )>, store?: Maybe<{ __typename?: 'StorePrivate', id: string, name: string } | { __typename?: 'StorePublic', id: string, name: string }>, category?: Maybe<{ __typename?: 'ProductCategory', id: string, name: string, categoryGroup?: Maybe<any> }> };

type ProductFragment_ProductPublic_ = { __typename?: 'ProductPublic', id: string, createdAt: any, updatedAt?: Maybe<any>, tags?: Maybe<string>, isPublished: boolean, isSuspended: boolean, isDeleted: boolean, isExcludedFromRecommendations: boolean, title: string, description: string, condition: string, make: string, model: string, ammoType?: Maybe<string>, actionType: string, boreDiameter?: Maybe<string>, serialNumber: string, location: string, dealer: string, currentVariants: Array<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )>, featuredVariant?: Maybe<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )>, chosenVariant?: Maybe<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )>, store?: Maybe<{ __typename?: 'StorePrivate', id: string, name: string } | { __typename?: 'StorePublic', id: string, name: string }>, category?: Maybe<{ __typename?: 'ProductCategory', id: string, name: string, categoryGroup?: Maybe<any> }> };

export type ProductFragment = ProductFragment_ProductPrivate_ | ProductFragment_ProductPublic_;

type StorePublicFragment_StorePrivate_ = { __typename?: 'StorePrivate', id: string, createdAt: any, updatedAt?: Maybe<any>, name: string, bio?: Maybe<string>, website?: Maybe<string>, cover?: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )>, profile?: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )> };

type StorePublicFragment_StorePublic_ = { __typename?: 'StorePublic', id: string, createdAt: any, updatedAt?: Maybe<any>, name: string, bio?: Maybe<string>, website?: Maybe<string>, cover?: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )>, profile?: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )> };

export type StorePublicFragment = StorePublicFragment_StorePrivate_ | StorePublicFragment_StorePublic_;

export type StorePrivateFragment = { __typename?: 'StorePrivate', id: string, name: string, createdAt: any, updatedAt?: Maybe<any>, website?: Maybe<string>, bio?: Maybe<string>, coverId?: Maybe<string>, profileId?: Maybe<string>, cover?: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )>, profile?: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )> };

export type PaymentMethodFragment = { __typename?: 'PaymentMethod', id: string, userId?: Maybe<string>, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, customerId?: Maybe<string>, paymentProcessor?: Maybe<PaymentProcessor>, paymentMethodTypes?: Maybe<Array<Maybe<string>>>, last4?: Maybe<string>, expMonth?: Maybe<string>, expYear?: Maybe<string>, email?: Maybe<string>, name?: Maybe<string>, details?: Maybe<string> };

export type UserPrivateFragment = { __typename?: 'UserPrivate', id: string, firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, stripeCustomerId?: Maybe<string>, emailVerified?: Maybe<boolean>, userRole: Role, isSuspended: boolean, store?: Maybe<(
    { __typename?: 'StorePrivate' }
    & StorePrivateFragment
  )>, payoutMethod?: Maybe<{ __typename?: 'PayoutMethod', id: string, payoutType?: Maybe<string>, payoutEmail?: Maybe<string>, payoutProcessor?: Maybe<string>, payoutProcessorId?: Maybe<string> }> };

export type Unnamed_1_MutationVariables = Exact<{
  image_parents_input: Array<Image_Parents_Insert_Input>;
  image_variants_input: Array<Image_Variants_Insert_Input>;
  product_preview_items_input: Array<Product_Preview_Items_Insert_Input>;
  product_variants_input: Array<Product_Variants_Insert_Input>;
  product_snapshots_input: Array<Product_Snapshots_Insert_Input>;
  products_input: Array<Products_Insert_Input>;
}>;


export type Unnamed_1_Mutation = { __typename?: 'mutation_root', insert_image_parents?: Maybe<{ __typename?: 'image_parents_mutation_response', affected_rows: number }>, insert_image_variants?: Maybe<{ __typename?: 'image_variants_mutation_response', affected_rows: number }>, insert_product_preview_items?: Maybe<{ __typename?: 'product_preview_items_mutation_response', affected_rows: number }>, insert_product_variants?: Maybe<{ __typename?: 'product_variants_mutation_response', affected_rows: number }>, insert_product_snapshots?: Maybe<{ __typename?: 'product_snapshots_mutation_response', affected_rows: number }>, insert_products?: Maybe<{ __typename?: 'products_mutation_response', affected_rows: number }> };

export type ProductsAllConnectionQueryVariables = Exact<{
  searchTerm: Scalars['String'];
  query?: Maybe<ConnectionOffsetQuery>;
}>;


export type ProductsAllConnectionQuery = { __typename?: 'query_root', productsAllConnection: { __typename?: 'ProductsConnection', totalCount?: Maybe<number>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor?: Maybe<any> }, edges: Array<{ __typename?: 'ProductsEdge', node: (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) | (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) }> } };

export type CreateStoreMutationVariables = Exact<{
  name: Scalars['String'];
  profileId: Scalars['String'];
  coverId: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
}>;


export type CreateStoreMutation = { __typename?: 'mutation_root', createStore?: Maybe<{ __typename?: 'StoreMutationResponse', store: (
      { __typename?: 'StorePrivate' }
      & StorePrivateFragment
    ) }> };

export type EditStoreProfileMutationVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['String']>;
  coverId?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
}>;


export type EditStoreProfileMutation = { __typename?: 'mutation_root', editStoreProfile?: Maybe<{ __typename?: 'StoreMutationResponse', store: (
      { __typename?: 'StorePrivate' }
      & StorePrivateFragment
    ) }> };

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
  variantSnapshotId
  variantId
  snapshotId
  productId
  storeId
  createdAt
  variantName
  variantDescription
  isDefault
  position
  price
  priceWas
  previewItems {
    id
    image {
      ...ImageFragment
    }
    youTubeEmbedLink
  }
  isSoldOut
}
    ${ImageFragmentFragmentDoc}`;
export const ProductFragmentFragmentDoc = gql`
    fragment ProductFragment on Product {
  id
  createdAt
  updatedAt
  tags
  isPublished
  isSuspended
  isDeleted
  isExcludedFromRecommendations
  title
  description
  condition
  make
  model
  ammoType
  actionType
  boreDiameter
  serialNumber
  location
  dealer
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
}
    ${ProductVariantFragmentFragmentDoc}`;
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
}
    ${ImageFragmentFragmentDoc}`;
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
export const StorePrivateFragmentFragmentDoc = gql`
    fragment StorePrivateFragment on StorePrivate {
  id
  name
  createdAt
  updatedAt
  website
  bio
  coverId
  profileId
  cover {
    ...ImageFragment
  }
  profile {
    ...ImageFragment
  }
}
    ${ImageFragmentFragmentDoc}`;
export const UserPrivateFragmentFragmentDoc = gql`
    fragment UserPrivateFragment on UserPrivate {
  id
  firstName
  lastName
  email
  stripeCustomerId
  emailVerified
  userRole
  isSuspended
  store {
    ...StorePrivateFragment
  }
  payoutMethod {
    id
    payoutType
    payoutEmail
    payoutProcessor
    payoutProcessorId
  }
}
    ${StorePrivateFragmentFragmentDoc}`;
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
    mutation saveImageUpload($uploadId: String!, $description: String, $tags: String, $ownerIds: [String]) {
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
    mutation saveProductFileUpload($uploadId: String!, $fileName: String!, $ownerIds: [String]) {
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
    mutation getProductFileDownloadLink($id: String!, $orderItemId: String!) {
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
export const ProductsAllConnectionDocument = gql`
    query productsAllConnection($searchTerm: String!, $query: ConnectionOffsetQuery) {
  productsAllConnection(searchTerm: $searchTerm, query: $query) {
    totalCount
    pageInfo {
      isLastPage
      endCursor
    }
    edges {
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
 *      searchTerm: // value for 'searchTerm'
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
export const CreateStoreDocument = gql`
    mutation createStore($name: String!, $profileId: String!, $coverId: String!, $bio: String, $website: String) {
  createStore(name: $name, profileId: $profileId, coverId: $coverId, bio: $bio, website: $website) {
    store {
      ... on StorePrivate {
        ...StorePrivateFragment
      }
    }
  }
}
    ${StorePrivateFragmentFragmentDoc}`;

/**
 * __useCreateStoreMutation__
 *
 * To run a mutation, you first call `useCreateStoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStoreMutation, { data, loading, error }] = useCreateStoreMutation({
 *   variables: {
 *      name: // value for 'name'
 *      profileId: // value for 'profileId'
 *      coverId: // value for 'coverId'
 *      bio: // value for 'bio'
 *      website: // value for 'website'
 *   },
 * });
 */
export function useCreateStoreMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateStoreMutation, CreateStoreMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateStoreMutation, CreateStoreMutationVariables>(CreateStoreDocument, baseOptions);
      }
export type CreateStoreMutationHookResult = ReturnType<typeof useCreateStoreMutation>;
export type CreateStoreMutationResult = ApolloReactCommon.MutationResult<CreateStoreMutation>;
export type CreateStoreMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateStoreMutation, CreateStoreMutationVariables>;
export const EditStoreProfileDocument = gql`
    mutation editStoreProfile($name: String, $profileId: String, $coverId: String, $website: String, $bio: String) {
  editStoreProfile(name: $name, profileId: $profileId, coverId: $coverId, website: $website, bio: $bio) {
    store {
      ... on StorePrivate {
        ...StorePrivateFragment
      }
    }
  }
}
    ${StorePrivateFragmentFragmentDoc}`;

/**
 * __useEditStoreProfileMutation__
 *
 * To run a mutation, you first call `useEditStoreProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditStoreProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editStoreProfileMutation, { data, loading, error }] = useEditStoreProfileMutation({
 *   variables: {
 *      name: // value for 'name'
 *      profileId: // value for 'profileId'
 *      coverId: // value for 'coverId'
 *      website: // value for 'website'
 *      bio: // value for 'bio'
 *   },
 * });
 */
export function useEditStoreProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditStoreProfileMutation, EditStoreProfileMutationVariables>) {
        return ApolloReactHooks.useMutation<EditStoreProfileMutation, EditStoreProfileMutationVariables>(EditStoreProfileDocument, baseOptions);
      }
export type EditStoreProfileMutationHookResult = ReturnType<typeof useEditStoreProfileMutation>;
export type EditStoreProfileMutationResult = ApolloReactCommon.MutationResult<EditStoreProfileMutation>;
export type EditStoreProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<EditStoreProfileMutation, EditStoreProfileMutationVariables>;
export type ID = Scalars["ID"]
export type Price = Scalars["Price"]
export type PageCursor = Scalars["PageCursor"]
export type ProductCategoryGroup = Scalars["ProductCategoryGroup"]