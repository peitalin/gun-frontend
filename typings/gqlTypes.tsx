import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamp: any;
  timestamptz: any;
  seed_float: any;
  bigint: any;
  /** Standard date string */
  Date: Date;
  PageCursor: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** Price value representing USD cents */
  Price: number;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
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
  payoutsAlreadyApprovedIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  payoutsAlreadyApproved?: Maybe<Array<Maybe<Payout>>>;
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
  licenseId?: Maybe<Scalars['String']>;
  license?: Maybe<User_Licenses>;
};

export type Bid = {
   __typename?: 'Bid';
  id?: Maybe<Scalars['String']>;
  bidStatus?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  acceptedPrice?: Maybe<Scalars['Int']>;
  offerPrice?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  status?: Maybe<BidStatus>;
  productId?: Maybe<Scalars['String']>;
  productSnapshotId?: Maybe<Scalars['String']>;
  variantId?: Maybe<Scalars['String']>;
};

/** columns and relationships of "bids" */
export type Bids = {
   __typename?: 'bids';
  acceptedPrice?: Maybe<Scalars['Int']>;
  bidStatus: Scalars['String'];
  createdAt?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
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
  count?: Maybe<Scalars['Int']>;
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

/** order by aggregate values of table "bids" */
export type Bids_Aggregate_Order_By = {
  avg?: Maybe<Bids_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Bids_Max_Order_By>;
  min?: Maybe<Bids_Min_Order_By>;
  stddev?: Maybe<Bids_Stddev_Order_By>;
  stddev_pop?: Maybe<Bids_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Bids_Stddev_Samp_Order_By>;
  sum?: Maybe<Bids_Sum_Order_By>;
  var_pop?: Maybe<Bids_Var_Pop_Order_By>;
  var_samp?: Maybe<Bids_Var_Samp_Order_By>;
  variance?: Maybe<Bids_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "bids" */
export type Bids_Arr_Rel_Insert_Input = {
  data: Array<Bids_Insert_Input>;
  on_conflict?: Maybe<Bids_On_Conflict>;
};

/** aggregate avg on columns */
export type Bids_Avg_Fields = {
   __typename?: 'bids_avg_fields';
  acceptedPrice?: Maybe<Scalars['Float']>;
  offerPrice?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "bids" */
export type Bids_Avg_Order_By = {
  acceptedPrice?: Maybe<Order_By>;
  offerPrice?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "bids". All fields are combined with a logical 'AND'. */
export type Bids_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Bids_Bool_Exp>>>;
  _not?: Maybe<Bids_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Bids_Bool_Exp>>>;
  acceptedPrice?: Maybe<Int_Comparison_Exp>;
  bidStatus?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
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

/** input type for incrementing integer column in table "bids" */
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

/** order by max() on columns of table "bids" */
export type Bids_Max_Order_By = {
  acceptedPrice?: Maybe<Order_By>;
  bidStatus?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  offerPrice?: Maybe<Order_By>;
  orderId?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  productSnapshotId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  variantId?: Maybe<Order_By>;
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

/** order by min() on columns of table "bids" */
export type Bids_Min_Order_By = {
  acceptedPrice?: Maybe<Order_By>;
  bidStatus?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  offerPrice?: Maybe<Order_By>;
  orderId?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  productSnapshotId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  variantId?: Maybe<Order_By>;
};

/** response of any mutation on the table "bids" */
export type Bids_Mutation_Response = {
   __typename?: 'bids_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Bids>;
};

/** input type for inserting object relation for remote table "bids" */
export type Bids_Obj_Rel_Insert_Input = {
  data: Bids_Insert_Input;
  on_conflict?: Maybe<Bids_On_Conflict>;
};

/** on conflict condition type for table "bids" */
export type Bids_On_Conflict = {
  constraint: Bids_Constraint;
  update_columns: Array<Bids_Update_Column>;
  where?: Maybe<Bids_Bool_Exp>;
};

/** ordering options when selecting data from "bids" */
export type Bids_Order_By = {
  acceptedPrice?: Maybe<Order_By>;
  bidStatus?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  offerPrice?: Maybe<Order_By>;
  orderId?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  productSnapshotId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  variantId?: Maybe<Order_By>;
};

/** primary key columns input for table: "bids" */
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

/** order by stddev() on columns of table "bids" */
export type Bids_Stddev_Order_By = {
  acceptedPrice?: Maybe<Order_By>;
  offerPrice?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Bids_Stddev_Pop_Fields = {
   __typename?: 'bids_stddev_pop_fields';
  acceptedPrice?: Maybe<Scalars['Float']>;
  offerPrice?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "bids" */
export type Bids_Stddev_Pop_Order_By = {
  acceptedPrice?: Maybe<Order_By>;
  offerPrice?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Bids_Stddev_Samp_Fields = {
   __typename?: 'bids_stddev_samp_fields';
  acceptedPrice?: Maybe<Scalars['Float']>;
  offerPrice?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "bids" */
export type Bids_Stddev_Samp_Order_By = {
  acceptedPrice?: Maybe<Order_By>;
  offerPrice?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Bids_Sum_Fields = {
   __typename?: 'bids_sum_fields';
  acceptedPrice?: Maybe<Scalars['Int']>;
  offerPrice?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "bids" */
export type Bids_Sum_Order_By = {
  acceptedPrice?: Maybe<Order_By>;
  offerPrice?: Maybe<Order_By>;
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

/** order by var_pop() on columns of table "bids" */
export type Bids_Var_Pop_Order_By = {
  acceptedPrice?: Maybe<Order_By>;
  offerPrice?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Bids_Var_Samp_Fields = {
   __typename?: 'bids_var_samp_fields';
  acceptedPrice?: Maybe<Scalars['Float']>;
  offerPrice?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "bids" */
export type Bids_Var_Samp_Order_By = {
  acceptedPrice?: Maybe<Order_By>;
  offerPrice?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Bids_Variance_Fields = {
   __typename?: 'bids_variance_fields';
  acceptedPrice?: Maybe<Scalars['Float']>;
  offerPrice?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "bids" */
export type Bids_Variance_Order_By = {
  acceptedPrice?: Maybe<Order_By>;
  offerPrice?: Maybe<Order_By>;
};

export enum BidStatus {
  /** created by buyer or seller */
  CREATED = 'CREATED',
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


/** expression to compare columns of type bigint. All fields are combined with logical 'AND'. */
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

/** Mutation result that doesn't need to give anything back. */
export type BlankMutationResponse = {
   __typename?: 'BlankMutationResponse';
  /** Should always be true if you get this result instead of a MutationErrorSummary - mainly here to allow gql to build */
  success: Scalars['Boolean'];
  status?: Maybe<Scalars['JSON']>;
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

/** columns and relationships of "categories" */
export type Categories = {
   __typename?: 'categories';
  /** An object relationship */
  bannerImage?: Maybe<Image_Parents>;
  bannerImageId?: Maybe<Scalars['String']>;
  blurb?: Maybe<Scalars['String']>;
  categoryGroup: Scalars['String'];
  createdAt: Scalars['timestamp'];
  id: Scalars['String'];
  name: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
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

/** order by max() on columns of table "categories" */
export type Categories_Max_Order_By = {
  bannerImageId?: Maybe<Order_By>;
  blurb?: Maybe<Order_By>;
  categoryGroup?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
  thumbImageId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
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

/** order by min() on columns of table "categories" */
export type Categories_Min_Order_By = {
  bannerImageId?: Maybe<Order_By>;
  blurb?: Maybe<Order_By>;
  categoryGroup?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
  thumbImageId?: Maybe<Order_By>;
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

/** primary key columns input for table: "categories" */
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
  bid?: Maybe<Bids_Bool_Exp>;
  bidId?: Maybe<String_Comparison_Exp>;
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
  bid?: Maybe<Bids_Order_By>;
  bidId?: Maybe<Order_By>;
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
  /** An aggregated array relationship */
  messages_aggregate: Chat_Messages_Aggregate;
  name?: Maybe<Scalars['String']>;
  /** An object relationship */
  owner: Users;
  ownerId: Scalars['String'];
  /** An array relationship */
  participants: Array<Chat_Users>;
  /** An aggregated array relationship */
  participants_aggregate: Chat_Users_Aggregate;
  /** An object relationship */
  product: Products;
  productId: Scalars['String'];
  status: Scalars['String'];
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
  participants?: Maybe<Chat_Users_Bool_Exp>;
  product?: Maybe<Products_Bool_Exp>;
  productId?: Maybe<String_Comparison_Exp>;
  status?: Maybe<String_Comparison_Exp>;
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
  status?: Maybe<Scalars['String']>;
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
  participants_aggregate?: Maybe<Chat_Users_Aggregate_Order_By>;
  product?: Maybe<Products_Order_By>;
  productId?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
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

export type ChatRoom = {
   __typename?: 'ChatRoom';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  ownerId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  owner?: Maybe<BasicUser>;
  status?: Maybe<Scalars['String']>;
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

export type CoinbaseExchangeRates = {
   __typename?: 'CoinbaseExchangeRates';
  currency?: Maybe<Scalars['String']>;
  rates?: Maybe<Scalars['JSON']>;
};

export type Connection = {
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
};

export type ConnectionOffsetQuery = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  /** orderBy: products_order_by // hasura's orderby */
  orderBy?: Maybe<ProductsOrderBy>;
  where?: Maybe<Products_Bool_Exp>;
  filters?: Maybe<Scalars['String']>;
  facetFilters?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>;
};

export type ConnectionOffsetQueryOrders = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Orders_Order_By>;
  where?: Maybe<Orders_Bool_Exp>;
};

/** Parameters that control how to access pages within a Connection */
export type ConnectionQuery = {
  /**
   * Whether or not to order the entire dataset in ascending form (as opposed to descending).
   * Defaults to false.
   */
  sortAscending?: Maybe<Scalars['Boolean']>;
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
   * Maximum number of items you want to see within a connection page.
   * Defaults to the maximum you can ask for, which is a sensible number controlled by the server.
   */
  count?: Maybe<Scalars['Int']>;
};

export type ConnectionWithMetrics = {
  /** COUNT(*) of a query, larger than the number of paginated results returned */
  totalCount?: Maybe<Scalars['Int']>;
  /** SUM(x) of a query, where x is a specific column to be aggregated */
  totalAmount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
};

export type Conversation = {
   __typename?: 'Conversation';
  userId?: Maybe<Scalars['String']>;
  user?: Maybe<BasicUser>;
  chatRoomId?: Maybe<Scalars['String']>;
  chatRoom?: Maybe<ChatRoom>;
};

export type CreateProductsConfig = {
  count: Scalars['Int'];
  /** sellerLogin: LoginDetails */
  alwaysPublish?: Maybe<Scalars['Boolean']>;
  alwaysFewestPreviews?: Maybe<Scalars['Boolean']>;
  alwaysGreatestPreviews?: Maybe<Scalars['Boolean']>;
  alwaysDiscounted?: Maybe<Scalars['Boolean']>;
};

export type CreateRefundMutationResponse = {
   __typename?: 'CreateRefundMutationResponse';
  transaction: Transactions;
};

export type CuratedList = {
   __typename?: 'CuratedList';
  id: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
};

export type CuratedListItem = {
   __typename?: 'CuratedListItem';
  id: Scalars['ID'];
  addedAt: Scalars['Date'];
  listId: Scalars['ID'];
  product: Product;
};

export type CuratedListItemMutationResponse = {
   __typename?: 'CuratedListItemMutationResponse';
  item: CuratedListItem;
};

export type CuratedListItemsConnection = Connection & {
   __typename?: 'CuratedListItemsConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<CuratedListItemsEdge>;
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
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<CuratedListsEdge>;
};

export type CuratedListsEdge = Edge & {
   __typename?: 'CuratedListsEdge';
  cursor: Scalars['PageCursor'];
  node: CuratedList;
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
  dealer?: Maybe<Dealers>;
};

/** columns and relationships of "dealers" */
export type Dealers = {
   __typename?: 'dealers';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamptz'];
  id: Scalars['String'];
  licenseNumber: Scalars['String'];
  name: Scalars['String'];
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Dealers_Max_Fields>;
  min?: Maybe<Dealers_Min_Fields>;
};


/** aggregate fields of "dealers" */
export type Dealers_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Dealers_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dealers" */
export type Dealers_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Dealers_Max_Order_By>;
  min?: Maybe<Dealers_Min_Order_By>;
};

/** input type for inserting array relation for remote table "dealers" */
export type Dealers_Arr_Rel_Insert_Input = {
  data: Array<Dealers_Insert_Input>;
  on_conflict?: Maybe<Dealers_On_Conflict>;
};

/** Boolean expression to filter rows from the table "dealers". All fields are combined with a logical 'AND'. */
export type Dealers_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Dealers_Bool_Exp>>>;
  _not?: Maybe<Dealers_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Dealers_Bool_Exp>>>;
  address?: Maybe<String_Comparison_Exp>;
  city?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  licenseNumber?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
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

/** order by max() on columns of table "dealers" */
export type Dealers_Max_Order_By = {
  address?: Maybe<Order_By>;
  city?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  postCode?: Maybe<Order_By>;
  state?: Maybe<Order_By>;
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

/** order by min() on columns of table "dealers" */
export type Dealers_Min_Order_By = {
  address?: Maybe<Order_By>;
  city?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  postCode?: Maybe<Order_By>;
  state?: Maybe<Order_By>;
};

/** response of any mutation on the table "dealers" */
export type Dealers_Mutation_Response = {
   __typename?: 'dealers_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Dealers>;
};

/** input type for inserting object relation for remote table "dealers" */
export type Dealers_Obj_Rel_Insert_Input = {
  data: Dealers_Insert_Input;
  on_conflict?: Maybe<Dealers_On_Conflict>;
};

/** on conflict condition type for table "dealers" */
export type Dealers_On_Conflict = {
  constraint: Dealers_Constraint;
  update_columns: Array<Dealers_Update_Column>;
  where?: Maybe<Dealers_Bool_Exp>;
};

/** ordering options when selecting data from "dealers" */
export type Dealers_Order_By = {
  address?: Maybe<Order_By>;
  city?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  postCode?: Maybe<Order_By>;
  state?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
};

/** primary key columns input for table: "dealers" */
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
  POSTCODE = 'postCode',
  /** column name */
  STATE = 'state'
}

export type Edge = {
  cursor: Scalars['PageCursor'];
};

export type EditUserPhoneNumberInput = {
  phoneNumber: Scalars['String'];
  areaCode?: Maybe<Scalars['String']>;
  countryCode: Scalars['String'];
};

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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Email_Subscriptions_Max_Fields>;
  min?: Maybe<Email_Subscriptions_Min_Fields>;
};


/** aggregate fields of "email_subscriptions" */
export type Email_Subscriptions_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Email_Subscriptions_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "email_subscriptions" */
export type Email_Subscriptions_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Email_Subscriptions_Max_Order_By>;
  min?: Maybe<Email_Subscriptions_Min_Order_By>;
};

/** input type for inserting array relation for remote table "email_subscriptions" */
export type Email_Subscriptions_Arr_Rel_Insert_Input = {
  data: Array<Email_Subscriptions_Insert_Input>;
  on_conflict?: Maybe<Email_Subscriptions_On_Conflict>;
};

/** Boolean expression to filter rows from the table "email_subscriptions". All fields are combined with a logical 'AND'. */
export type Email_Subscriptions_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Email_Subscriptions_Bool_Exp>>>;
  _not?: Maybe<Email_Subscriptions_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Email_Subscriptions_Bool_Exp>>>;
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

/** order by max() on columns of table "email_subscriptions" */
export type Email_Subscriptions_Max_Order_By = {
  id?: Maybe<Order_By>;
  subject_?: Maybe<Order_By>;
  subscribers?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Email_Subscriptions_Min_Fields = {
   __typename?: 'email_subscriptions_min_fields';
  id?: Maybe<Scalars['String']>;
  subject_?: Maybe<Scalars['String']>;
  subscribers?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "email_subscriptions" */
export type Email_Subscriptions_Min_Order_By = {
  id?: Maybe<Order_By>;
  subject_?: Maybe<Order_By>;
  subscribers?: Maybe<Order_By>;
};

/** response of any mutation on the table "email_subscriptions" */
export type Email_Subscriptions_Mutation_Response = {
   __typename?: 'email_subscriptions_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Email_Subscriptions>;
};

/** input type for inserting object relation for remote table "email_subscriptions" */
export type Email_Subscriptions_Obj_Rel_Insert_Input = {
  data: Email_Subscriptions_Insert_Input;
  on_conflict?: Maybe<Email_Subscriptions_On_Conflict>;
};

/** on conflict condition type for table "email_subscriptions" */
export type Email_Subscriptions_On_Conflict = {
  constraint: Email_Subscriptions_Constraint;
  update_columns: Array<Email_Subscriptions_Update_Column>;
  where?: Maybe<Email_Subscriptions_Bool_Exp>;
};

/** ordering options when selecting data from "email_subscriptions" */
export type Email_Subscriptions_Order_By = {
  id?: Maybe<Order_By>;
  subject_?: Maybe<Order_By>;
  subscribers?: Maybe<Order_By>;
};

/** primary key columns input for table: "email_subscriptions" */
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Emails_Max_Fields>;
  min?: Maybe<Emails_Min_Fields>;
};


/** aggregate fields of "emails" */
export type Emails_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Emails_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "emails" */
export type Emails_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Emails_Max_Order_By>;
  min?: Maybe<Emails_Min_Order_By>;
};

/** input type for inserting array relation for remote table "emails" */
export type Emails_Arr_Rel_Insert_Input = {
  data: Array<Emails_Insert_Input>;
  on_conflict?: Maybe<Emails_On_Conflict>;
};

/** Boolean expression to filter rows from the table "emails". All fields are combined with a logical 'AND'. */
export type Emails_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Emails_Bool_Exp>>>;
  _not?: Maybe<Emails_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Emails_Bool_Exp>>>;
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

/** order by max() on columns of table "emails" */
export type Emails_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  emailType?: Maybe<Order_By>;
  from_?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  subject_?: Maybe<Order_By>;
  to_?: Maybe<Order_By>;
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

/** order by min() on columns of table "emails" */
export type Emails_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  emailType?: Maybe<Order_By>;
  from_?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  subject_?: Maybe<Order_By>;
  to_?: Maybe<Order_By>;
};

/** response of any mutation on the table "emails" */
export type Emails_Mutation_Response = {
   __typename?: 'emails_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Emails>;
};

/** input type for inserting object relation for remote table "emails" */
export type Emails_Obj_Rel_Insert_Input = {
  data: Emails_Insert_Input;
  on_conflict?: Maybe<Emails_On_Conflict>;
};

/** on conflict condition type for table "emails" */
export type Emails_On_Conflict = {
  constraint: Emails_Constraint;
  update_columns: Array<Emails_Update_Column>;
  where?: Maybe<Emails_Bool_Exp>;
};

/** ordering options when selecting data from "emails" */
export type Emails_Order_By = {
  createdAt?: Maybe<Order_By>;
  emailType?: Maybe<Order_By>;
  from_?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  subject_?: Maybe<Order_By>;
  to_?: Maybe<Order_By>;
};

/** primary key columns input for table: "emails" */
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

export enum FacetAttributes {
  _CATEGORYSLUGFACET = '_categorySlugFacet',
  _CATEGORYNAMEFACET = '_categoryNameFacet',
  _CATEGORYGROUPFACET = '_categoryGroupFacet',
  _STOREIDFACET = '_storeIdFacet',
  _ISPUBLISHEDFACET = '_isPublishedFacet'
}

export type FacetsDistributionObject = {
   __typename?: 'FacetsDistributionObject';
  /** make a JSON type, keys are arbitrary category names */
  categoryNames?: Maybe<Scalars['JSON']>;
  categorySlugs?: Maybe<Scalars['JSON']>;
  isPublished?: Maybe<Scalars['JSON']>;
  /** categoryGroups: JSON */
  stores?: Maybe<Scalars['JSON']>;
};

export type FollowedStore = {
   __typename?: 'FollowedStore';
  createdAt?: Maybe<Scalars['Date']>;
  lastVisited?: Maybe<Scalars['Date']>;
  store?: Maybe<StorePublic>;
};

export type FollowingStoresConnection = Connection & {
   __typename?: 'FollowingStoresConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<FollowingStoresEdge>;
};

export type FollowingStoresEdge = Edge & {
   __typename?: 'FollowingStoresEdge';
  cursor: Scalars['PageCursor'];
  node: FollowedStore;
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

export type InsertDealerInput = {
  address: Scalars['String'];
  city?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  postCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  licenseNumber: Scalars['String'];
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



export type List_Products_Random_Args = {
  seed?: Maybe<Scalars['seed_float']>;
};

export type Login2Response = {
   __typename?: 'Login2Response';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

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

export type Mutation = {
   __typename?: 'Mutation';
  /** delete data from the table: "bids" */
  delete_bids?: Maybe<Bids_Mutation_Response>;
  /** delete single row from the table: "bids" */
  delete_bids_by_pk?: Maybe<Bids>;
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
  /** delete data from the table: "order_snapshots" */
  delete_order_snapshots?: Maybe<Order_Snapshots_Mutation_Response>;
  /** delete single row from the table: "order_snapshots" */
  delete_order_snapshots_by_pk?: Maybe<Order_Snapshots>;
  /** delete data from the table: "orders" */
  delete_orders?: Maybe<Orders_Mutation_Response>;
  /** delete single row from the table: "orders" */
  delete_orders_by_pk?: Maybe<Orders>;
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
  /** delete data from the table: "refunds" */
  delete_refunds?: Maybe<Refunds_Mutation_Response>;
  /** delete single row from the table: "refunds" */
  delete_refunds_by_pk?: Maybe<Refunds>;
  /** delete data from the table: "stores" */
  delete_stores?: Maybe<Stores_Mutation_Response>;
  /** delete single row from the table: "stores" */
  delete_stores_by_pk?: Maybe<Stores>;
  /** delete data from the table: "transactions" */
  delete_transactions?: Maybe<Transactions_Mutation_Response>;
  /** delete single row from the table: "transactions" */
  delete_transactions_by_pk?: Maybe<Transactions>;
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
  /** insert data into the table: "order_snapshots" */
  insert_order_snapshots?: Maybe<Order_Snapshots_Mutation_Response>;
  /** insert a single row into the table: "order_snapshots" */
  insert_order_snapshots_one?: Maybe<Order_Snapshots>;
  /** insert data into the table: "orders" */
  insert_orders?: Maybe<Orders_Mutation_Response>;
  /** insert a single row into the table: "orders" */
  insert_orders_one?: Maybe<Orders>;
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
  /** insert data into the table: "refunds" */
  insert_refunds?: Maybe<Refunds_Mutation_Response>;
  /** insert a single row into the table: "refunds" */
  insert_refunds_one?: Maybe<Refunds>;
  /** insert data into the table: "stores" */
  insert_stores?: Maybe<Stores_Mutation_Response>;
  /** insert a single row into the table: "stores" */
  insert_stores_one?: Maybe<Stores>;
  /** insert data into the table: "transactions" */
  insert_transactions?: Maybe<Transactions_Mutation_Response>;
  /** insert a single row into the table: "transactions" */
  insert_transactions_one?: Maybe<Transactions>;
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
  /** update data of the table: "order_snapshots" */
  update_order_snapshots?: Maybe<Order_Snapshots_Mutation_Response>;
  /** update single row of the table: "order_snapshots" */
  update_order_snapshots_by_pk?: Maybe<Order_Snapshots>;
  /** update data of the table: "orders" */
  update_orders?: Maybe<Orders_Mutation_Response>;
  /** update single row of the table: "orders" */
  update_orders_by_pk?: Maybe<Orders>;
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
  /** update data of the table: "refunds" */
  update_refunds?: Maybe<Refunds_Mutation_Response>;
  /** update single row of the table: "refunds" */
  update_refunds_by_pk?: Maybe<Refunds>;
  /** update data of the table: "stores" */
  update_stores?: Maybe<Stores_Mutation_Response>;
  /** update single row of the table: "stores" */
  update_stores_by_pk?: Maybe<Stores>;
  /** update data of the table: "transactions" */
  update_transactions?: Maybe<Transactions_Mutation_Response>;
  /** update single row of the table: "transactions" */
  update_transactions_by_pk?: Maybe<Transactions>;
  /** update data of the table: "user_licenses" */
  update_user_licenses?: Maybe<User_Licenses_Mutation_Response>;
  /** update single row of the table: "user_licenses" */
  update_user_licenses_by_pk?: Maybe<User_Licenses>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /**
   * Create a new account using an email address and password.
   * AccessRule – PUBLIC
   */
  signUpUsingEmail: SignUpMutationResponse;
  /**
   * Log in using an email address and password.
   * AccessRule – PUBLIC
   */
  logInUsingEmail: LoginMutationResponse;
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
  editUserLicense: UserMutationResponse;
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
   * Request to upload a piece of content.
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
   * This is the last stage of uploading - saving.
   * AccessRule – LOGGED_IN
   */
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
  /**
   * keeps track of when you last visited a store
   * 
   * AccessRule – LOGGED_IN
   */
  visitStore: FollowingStoresConnection;
  /**
   * Add a product to the wishlist.
   * 
   * AccessRule – LOGGED_IN
   */
  addProductToWishlist: BlankMutationResponse;
  /**
   * Remove a product from the wishlist.
   * 
   * AccessRule – LOGGED_IN
   */
  removeProductFromWishlist: BlankMutationResponse;
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
  createProduct: ProductMutationResponse;
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
  deleteProduct?: Maybe<ProductsMutationResponse>;
  /**
   * Delete a specific product.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  adminDeleteProduct?: Maybe<ProductsMutationResponse>;
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
  suspendProduct?: Maybe<ProductMutationResponse>;
  /**
   * Reinstate a suspended product.
   * This will reverse the number of side effects of suspension.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  unsuspendProduct?: Maybe<ProductMutationResponse>;
  /**
   * Exclude a product from any search results.
   * The only way to find the product will be through direct link, or
   * having it show up in an automatic or curated list.
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
  suspendStore?: Maybe<StoreMutationResponse>;
  /**
   * Reinstate a suspended store.
   * This will reverse the number of side effects of suspension.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  unsuspendStore?: Maybe<StoreMutationResponse>;
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
  /**
   * Create a new curated list.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  createCuratedList: CuratedListMutationResponse;
  /**
   * Delete a curated list.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  deleteCuratedList: BlankMutationResponse;
  /**
   * Add a product to a curated list.
   * 
   * It will be added at the bottom, but you can rearrange items later.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  addProductToCuratedList: CuratedListItemMutationResponse;
  /**
   * Remove an item in a curated list.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  removeItemFromCuratedList: CuratedListMutationResponse;
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
   * AccessRule – LOGGED_IN
   * For a buyer to create an order
   */
  createOrder: OrderCreateMutationResponse;
  /**
   * AccessRule – LOGGED_IN
   * For a buyer to make payment and confirm an order.
   * using a Westpac token + Westpac customer Id
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
  refundOrder: OrderMutationResponse;
  /** AccessRule – PLATFORM_ADMIN */
  cancelOrderAndPayment: OrderMutationResponse;
  createMockPreviewItems: Product_Preview_Items_Mutation_Response;
  generateRandomProducts: Array<Maybe<ProductPrivate>>;
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
  editDealer?: Maybe<UserMutationResponse>;
  createDealerForUser?: Maybe<UserMutationResponse>;
  setDealerIdForUser?: Maybe<UserMutationResponse>;
  reindexSearchIndex?: Maybe<BlankMutationResponse>;
  sendChatMessage?: Maybe<Array<Maybe<Message>>>;
  emitTypingEvent?: Maybe<BlankMutationResponse>;
  sendBidMessage?: Maybe<Array<Maybe<Message>>>;
  updateBid?: Maybe<Array<Maybe<Bid>>>;
  updateChatStatus?: Maybe<Array<Maybe<ChatRoom>>>;
  createNewChat?: Maybe<Array<Maybe<ChatRoom>>>;
  saySomething?: Maybe<Scalars['String']>;
};


export type MutationDelete_BidsArgs = {
  where: Bids_Bool_Exp;
};


export type MutationDelete_Bids_By_PkArgs = {
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


export type MutationDelete_RefundsArgs = {
  where: Refunds_Bool_Exp;
};


export type MutationDelete_Refunds_By_PkArgs = {
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


export type MutationInsert_RefundsArgs = {
  objects: Array<Refunds_Insert_Input>;
  on_conflict?: Maybe<Refunds_On_Conflict>;
};


export type MutationInsert_Refunds_OneArgs = {
  object: Refunds_Insert_Input;
  on_conflict?: Maybe<Refunds_On_Conflict>;
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


export type MutationUpdate_Order_SnapshotsArgs = {
  _set?: Maybe<Order_Snapshots_Set_Input>;
  where: Order_Snapshots_Bool_Exp;
};


export type MutationUpdate_Order_Snapshots_By_PkArgs = {
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


export type MutationUpdate_RefundsArgs = {
  _set?: Maybe<Refunds_Set_Input>;
  where: Refunds_Bool_Exp;
};


export type MutationUpdate_Refunds_By_PkArgs = {
  _set?: Maybe<Refunds_Set_Input>;
  pk_columns: Refunds_Pk_Columns_Input;
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
  username?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  licenseNumber: Scalars['String'];
  licenseExpiry: Scalars['Date'];
  licenseCategory?: Maybe<Scalars['String']>;
  licenseState?: Maybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  countryCode: Scalars['String'];
};


export type MutationLogInUsingEmailArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
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


export type MutationEditUserLicenseArgs = {
  licenseNumber: Scalars['String'];
  licenseExpiry: Scalars['Date'];
  licenseCategory?: Maybe<Scalars['String']>;
  licenseState?: Maybe<Scalars['String']>;
};


export type MutationAdminApproveUserLicenseArgs = {
  userId: Scalars['String'];
  verified: Scalars['Boolean'];
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String'];
};


export type MutationAdminDeleteAccountArgs = {
  userId: Scalars['String'];
};


export type MutationUploadRegisterArgs = {
  uploadType: UploadType;
  mimeType: Scalars['String'];
  fileSize: Scalars['Int'];
};


export type MutationUploadSaveImageArgs = {
  uploadId: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>;
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


export type MutationVisitStoreArgs = {
  storeId: Scalars['String'];
  query?: Maybe<ConnectionQuery>;
};


export type MutationAddProductToWishlistArgs = {
  productId: Scalars['String'];
  variantId: Scalars['String'];
};


export type MutationRemoveProductFromWishlistArgs = {
  productId: Scalars['String'];
  variantId: Scalars['String'];
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
  productCreateInput?: Maybe<ProductCreateInput>;
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


export type MutationSuspendProductArgs = {
  productId: Scalars['String'];
};


export type MutationUnsuspendProductArgs = {
  productId: Scalars['String'];
};


export type MutationExcludeProductFromSearchArgs = {
  productId: Scalars['String'];
};


export type MutationIncludeProductInSearchArgs = {
  productId: Scalars['String'];
};


export type MutationSuspendStoreArgs = {
  storeId: Scalars['String'];
};


export type MutationUnsuspendStoreArgs = {
  storeId: Scalars['String'];
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


export type MutationCreateCuratedListArgs = {
  name: Scalars['String'];
};


export type MutationDeleteCuratedListArgs = {
  listId: Scalars['String'];
};


export type MutationAddProductToCuratedListArgs = {
  listId: Scalars['String'];
  productId: Scalars['String'];
  variantId?: Maybe<Scalars['String']>;
};


export type MutationRemoveItemFromCuratedListArgs = {
  listId: Scalars['String'];
  itemId: Scalars['String'];
};


export type MutationRearrangeCuratedListItemsArgs = {
  listId: Scalars['String'];
  itemIdsInOrder: Array<Scalars['ID']>;
};


export type MutationCreateOrderArgs = {
  productId: Scalars['String'];
  productSnapshotId: Scalars['String'];
  variantId: Scalars['String'];
  variantSnapshotId: Scalars['String'];
  total: Scalars['Int'];
  buyerId: Scalars['String'];
  sellerStoreId: Scalars['String'];
  stripeAuthorizePaymentData: Scalars['String'];
  bidId?: Maybe<Scalars['String']>;
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


export type MutationRefundOrderArgs = {
  orderId: Scalars['String'];
  reason?: Maybe<Scalars['String']>;
  reasonDetails?: Maybe<Scalars['String']>;
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


export type MutationGenerateRandomProductsArgs = {
  config?: Maybe<CreateProductsConfig>;
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


export type MutationEditDealerArgs = {
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  licenseNumber?: Maybe<Scalars['String']>;
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
  dealerUserId: Scalars['String'];
  dealerId?: Maybe<Scalars['String']>;
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
  content: Scalars['String'];
  productId: Scalars['String'];
  productSnapshotId: Scalars['String'];
  variantId: Scalars['String'];
  offerPrice: Scalars['Int'];
  bidStatus: Scalars['String'];
};


export type MutationUpdateBidArgs = {
  bidId: Scalars['String'];
  bidStatus: Scalars['String'];
};


export type MutationUpdateChatStatusArgs = {
  chatRoomId: Scalars['String'];
  chatStatus: Scalars['String'];
  messageLimit?: Maybe<Scalars['Int']>;
};


export type MutationCreateNewChatArgs = {
  productId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  messageLimit?: Maybe<Scalars['Int']>;
};


export type MutationSaySomethingArgs = {
  message?: Maybe<Scalars['String']>;
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
  updatedAt?: Maybe<Scalars['Date']>;
  variantId?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
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

/** columns and relationships of "order_snapshots" */
export type Order_Snapshots = {
   __typename?: 'order_snapshots';
  /** An object relationship */
  adminApprover?: Maybe<Users>;
  adminApproverId?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamp'];
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Order_Snapshots_Max_Fields>;
  min?: Maybe<Order_Snapshots_Min_Fields>;
};


/** aggregate fields of "order_snapshots" */
export type Order_Snapshots_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Order_Snapshots_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "order_snapshots" */
export type Order_Snapshots_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Order_Snapshots_Max_Order_By>;
  min?: Maybe<Order_Snapshots_Min_Order_By>;
};

/** input type for inserting array relation for remote table "order_snapshots" */
export type Order_Snapshots_Arr_Rel_Insert_Input = {
  data: Array<Order_Snapshots_Insert_Input>;
  on_conflict?: Maybe<Order_Snapshots_On_Conflict>;
};

/** Boolean expression to filter rows from the table "order_snapshots". All fields are combined with a logical 'AND'. */
export type Order_Snapshots_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Order_Snapshots_Bool_Exp>>>;
  _not?: Maybe<Order_Snapshots_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Order_Snapshots_Bool_Exp>>>;
  adminApprover?: Maybe<Users_Bool_Exp>;
  adminApproverId?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
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
  ORDER_SNAPSHOTS_FORM_FILE_ID_KEY = 'order_snapshots_form_file_id_key',
  /** unique or primary key constraint */
  ORDER_SNAPSHOTS_PKEY = 'order_snapshots_pkey'
}

/** input type for inserting data into table "order_snapshots" */
export type Order_Snapshots_Insert_Input = {
  adminApprover?: Maybe<Users_Obj_Rel_Insert_Input>;
  adminApproverId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
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
  createdAt?: Maybe<Scalars['timestamp']>;
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
  createdAt?: Maybe<Order_By>;
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
  createdAt?: Maybe<Scalars['timestamp']>;
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
  createdAt?: Maybe<Order_By>;
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
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Order_Snapshots>;
};

/** input type for inserting object relation for remote table "order_snapshots" */
export type Order_Snapshots_Obj_Rel_Insert_Input = {
  data: Order_Snapshots_Insert_Input;
  on_conflict?: Maybe<Order_Snapshots_On_Conflict>;
};

/** on conflict condition type for table "order_snapshots" */
export type Order_Snapshots_On_Conflict = {
  constraint: Order_Snapshots_Constraint;
  update_columns: Array<Order_Snapshots_Update_Column>;
  where?: Maybe<Order_Snapshots_Bool_Exp>;
};

/** ordering options when selecting data from "order_snapshots" */
export type Order_Snapshots_Order_By = {
  adminApprover?: Maybe<Users_Order_By>;
  adminApproverId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
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

/** primary key columns input for table: "order_snapshots" */
export type Order_Snapshots_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "order_snapshots" */
export enum Order_Snapshots_Select_Column {
  /** column name */
  ADMINAPPROVERID = 'adminApproverId',
  /** column name */
  CREATEDAT = 'createdAt',
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
  createdAt?: Maybe<Scalars['timestamp']>;
  form10FileId?: Maybe<Scalars['String']>;
  form10ImageId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  orderStatus?: Maybe<Scalars['String']>;
  refundId?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['String']>;
};

/** update columns of table "order_snapshots" */
export enum Order_Snapshots_Update_Column {
  /** column name */
  ADMINAPPROVERID = 'adminApproverId',
  /** column name */
  CREATEDAT = 'createdAt',
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
  updatedAt?: Maybe<Scalars['Date']>;
  variantId?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
};

/** column ordering options */
export enum OrderBy {
  /** in the ascending order, nulls last */
  ASC = 'asc',
  /** in the descending order, nulls first */
  DESC = 'desc'
}

export type OrderCreateMutationResponse = {
   __typename?: 'OrderCreateMutationResponse';
  unconfirmedOrder: Order;
  stripePaymentIntent: Scalars['String'];
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
  updatedAt?: Maybe<Scalars['Date']>;
  variantId?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
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
  updatedAt?: Maybe<Scalars['Date']>;
  variantId?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
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
  createdAt: Scalars['timestamp'];
  currency: Scalars['String'];
  /** An object relationship */
  currentSnapshot?: Maybe<Order_Snapshots>;
  currentSnapshotId: Scalars['String'];
  id: Scalars['String'];
  /** An array relationship */
  orderSnapshots: Array<Order_Snapshots>;
  /** An aggregated array relationship */
  orderSnapshots_aggregate: Order_Snapshots_Aggregate;
  paymentIntentId?: Maybe<Scalars['String']>;
  /** An array relationship */
  payoutItems: Array<Payout_Items>;
  /** An aggregated array relationship */
  payoutItems_aggregate: Payout_Items_Aggregate;
  /** An object relationship */
  product: Products;
  productId: Scalars['String'];
  productSnapshotId: Scalars['String'];
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
  count?: Maybe<Scalars['Int']>;
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

/** order by aggregate values of table "orders" */
export type Orders_Aggregate_Order_By = {
  avg?: Maybe<Orders_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Orders_Max_Order_By>;
  min?: Maybe<Orders_Min_Order_By>;
  stddev?: Maybe<Orders_Stddev_Order_By>;
  stddev_pop?: Maybe<Orders_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Orders_Stddev_Samp_Order_By>;
  sum?: Maybe<Orders_Sum_Order_By>;
  var_pop?: Maybe<Orders_Var_Pop_Order_By>;
  var_samp?: Maybe<Orders_Var_Samp_Order_By>;
  variance?: Maybe<Orders_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "orders" */
export type Orders_Arr_Rel_Insert_Input = {
  data: Array<Orders_Insert_Input>;
  on_conflict?: Maybe<Orders_On_Conflict>;
};

/** aggregate avg on columns */
export type Orders_Avg_Fields = {
   __typename?: 'orders_avg_fields';
  total?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "orders" */
export type Orders_Avg_Order_By = {
  total?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "orders". All fields are combined with a logical 'AND'. */
export type Orders_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Orders_Bool_Exp>>>;
  _not?: Maybe<Orders_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Orders_Bool_Exp>>>;
  bid?: Maybe<Bids_Bool_Exp>;
  bidId?: Maybe<String_Comparison_Exp>;
  buyer?: Maybe<Users_Bool_Exp>;
  buyerId?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  currency?: Maybe<String_Comparison_Exp>;
  currentSnapshot?: Maybe<Order_Snapshots_Bool_Exp>;
  currentSnapshotId?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  orderSnapshots?: Maybe<Order_Snapshots_Bool_Exp>;
  paymentIntentId?: Maybe<String_Comparison_Exp>;
  payoutItems?: Maybe<Payout_Items_Bool_Exp>;
  product?: Maybe<Products_Bool_Exp>;
  productId?: Maybe<String_Comparison_Exp>;
  productSnapshotId?: Maybe<String_Comparison_Exp>;
  sellerStore?: Maybe<Stores_Bool_Exp>;
  sellerStoreId?: Maybe<String_Comparison_Exp>;
  total?: Maybe<Int_Comparison_Exp>;
  updatedAt?: Maybe<Timestamp_Comparison_Exp>;
  variantId?: Maybe<String_Comparison_Exp>;
  variantSnapshotId?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "orders" */
export enum Orders_Constraint {
  /** unique or primary key constraint */
  ORDERS_BID_ID_KEY = 'orders_bid_id_key',
  /** unique or primary key constraint */
  ORDERS_PKEY = 'orders_pkey'
}

/** input type for incrementing integer column in table "orders" */
export type Orders_Inc_Input = {
  total?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "orders" */
export type Orders_Insert_Input = {
  bid?: Maybe<Bids_Obj_Rel_Insert_Input>;
  bidId?: Maybe<Scalars['String']>;
  buyer?: Maybe<Users_Obj_Rel_Insert_Input>;
  buyerId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  currentSnapshot?: Maybe<Order_Snapshots_Obj_Rel_Insert_Input>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  orderSnapshots?: Maybe<Order_Snapshots_Arr_Rel_Insert_Input>;
  paymentIntentId?: Maybe<Scalars['String']>;
  payoutItems?: Maybe<Payout_Items_Arr_Rel_Insert_Input>;
  product?: Maybe<Products_Obj_Rel_Insert_Input>;
  productId?: Maybe<Scalars['String']>;
  productSnapshotId?: Maybe<Scalars['String']>;
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
  createdAt?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productSnapshotId?: Maybe<Scalars['String']>;
  sellerStoreId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  variantId?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "orders" */
export type Orders_Max_Order_By = {
  bidId?: Maybe<Order_By>;
  buyerId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currency?: Maybe<Order_By>;
  currentSnapshotId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  paymentIntentId?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  productSnapshotId?: Maybe<Order_By>;
  sellerStoreId?: Maybe<Order_By>;
  total?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  variantId?: Maybe<Order_By>;
  variantSnapshotId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Orders_Min_Fields = {
   __typename?: 'orders_min_fields';
  bidId?: Maybe<Scalars['String']>;
  buyerId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productSnapshotId?: Maybe<Scalars['String']>;
  sellerStoreId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  variantId?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "orders" */
export type Orders_Min_Order_By = {
  bidId?: Maybe<Order_By>;
  buyerId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currency?: Maybe<Order_By>;
  currentSnapshotId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  paymentIntentId?: Maybe<Order_By>;
  productId?: Maybe<Order_By>;
  productSnapshotId?: Maybe<Order_By>;
  sellerStoreId?: Maybe<Order_By>;
  total?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  variantId?: Maybe<Order_By>;
  variantSnapshotId?: Maybe<Order_By>;
};

/** response of any mutation on the table "orders" */
export type Orders_Mutation_Response = {
   __typename?: 'orders_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Orders>;
};

/** input type for inserting object relation for remote table "orders" */
export type Orders_Obj_Rel_Insert_Input = {
  data: Orders_Insert_Input;
  on_conflict?: Maybe<Orders_On_Conflict>;
};

/** on conflict condition type for table "orders" */
export type Orders_On_Conflict = {
  constraint: Orders_Constraint;
  update_columns: Array<Orders_Update_Column>;
  where?: Maybe<Orders_Bool_Exp>;
};

/** ordering options when selecting data from "orders" */
export type Orders_Order_By = {
  bid?: Maybe<Bids_Order_By>;
  bidId?: Maybe<Order_By>;
  buyer?: Maybe<Users_Order_By>;
  buyerId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currency?: Maybe<Order_By>;
  currentSnapshot?: Maybe<Order_Snapshots_Order_By>;
  currentSnapshotId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  orderSnapshots_aggregate?: Maybe<Order_Snapshots_Aggregate_Order_By>;
  paymentIntentId?: Maybe<Order_By>;
  payoutItems_aggregate?: Maybe<Payout_Items_Aggregate_Order_By>;
  product?: Maybe<Products_Order_By>;
  productId?: Maybe<Order_By>;
  productSnapshotId?: Maybe<Order_By>;
  sellerStore?: Maybe<Stores_Order_By>;
  sellerStoreId?: Maybe<Order_By>;
  total?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  variantId?: Maybe<Order_By>;
  variantSnapshotId?: Maybe<Order_By>;
};

/** primary key columns input for table: "orders" */
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
  CREATEDAT = 'createdAt',
  /** column name */
  CURRENCY = 'currency',
  /** column name */
  CURRENTSNAPSHOTID = 'currentSnapshotId',
  /** column name */
  ID = 'id',
  /** column name */
  PAYMENTINTENTID = 'paymentIntentId',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  PRODUCTSNAPSHOTID = 'productSnapshotId',
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
  createdAt?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  currentSnapshotId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productSnapshotId?: Maybe<Scalars['String']>;
  sellerStoreId?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  variantId?: Maybe<Scalars['String']>;
  variantSnapshotId?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Orders_Stddev_Fields = {
   __typename?: 'orders_stddev_fields';
  total?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "orders" */
export type Orders_Stddev_Order_By = {
  total?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Orders_Stddev_Pop_Fields = {
   __typename?: 'orders_stddev_pop_fields';
  total?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "orders" */
export type Orders_Stddev_Pop_Order_By = {
  total?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Orders_Stddev_Samp_Fields = {
   __typename?: 'orders_stddev_samp_fields';
  total?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "orders" */
export type Orders_Stddev_Samp_Order_By = {
  total?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Orders_Sum_Fields = {
   __typename?: 'orders_sum_fields';
  total?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "orders" */
export type Orders_Sum_Order_By = {
  total?: Maybe<Order_By>;
};

/** update columns of table "orders" */
export enum Orders_Update_Column {
  /** column name */
  BIDID = 'bidId',
  /** column name */
  BUYERID = 'buyerId',
  /** column name */
  CREATEDAT = 'createdAt',
  /** column name */
  CURRENCY = 'currency',
  /** column name */
  CURRENTSNAPSHOTID = 'currentSnapshotId',
  /** column name */
  ID = 'id',
  /** column name */
  PAYMENTINTENTID = 'paymentIntentId',
  /** column name */
  PRODUCTID = 'productId',
  /** column name */
  PRODUCTSNAPSHOTID = 'productSnapshotId',
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
  total?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "orders" */
export type Orders_Var_Pop_Order_By = {
  total?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Orders_Var_Samp_Fields = {
   __typename?: 'orders_var_samp_fields';
  total?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "orders" */
export type Orders_Var_Samp_Order_By = {
  total?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Orders_Variance_Fields = {
   __typename?: 'orders_variance_fields';
  total?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "orders" */
export type Orders_Variance_Order_By = {
  total?: Maybe<Order_By>;
};

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

export type OrderSnapshot = {
   __typename?: 'OrderSnapshot';
  /** An object relationship */
  adminApprover?: Maybe<UserForDealers>;
  adminApproverId?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamp'];
  /** An object relationship */
  form10Image?: Maybe<Image_Parents>;
  form10ImageId?: Maybe<Scalars['String']>;
  form10File?: Maybe<Product_Files>;
  form10FileId?: Maybe<Scalars['String']>;
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

export type PageBasedConnectionEdge = {
  pageNumber: Scalars['Int'];
};

export type PageBasedConnectionPageInfo = {
   __typename?: 'PageBasedConnectionPageInfo';
  pageNumber: Scalars['Int'];
  isLastPage: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
};

/** Parameters that control how to access pages within a Connection that uses a descrete page system instead of a cursor. */
export type PageBasedConnectionQuery = {
  sortAscending?: Maybe<Scalars['Boolean']>;
  pageNumber?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
};

export type PageBasedConnectionWithMetrics = {
  /** COUNT(*) of a query, larger than the number of paginated results returned */
  totalCount?: Maybe<Scalars['Int']>;
  /** SUM(x) of a query, where x is a specific column to be aggregated */
  totalAmount?: Maybe<Scalars['Int']>;
  pageInfo: PageBasedConnectionPageInfo;
};


export type PageInfo = {
   __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['PageCursor']>;
  isLastPage: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
};

export enum PayeeType {
  /** Store */
  STORE = 'STORE',
  /** Affiliates */
  AFFILIATE = 'AFFILIATE',
  /** EFC */
  PLATFORM = 'PLATFORM'
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

/** Record of a payout event from the platform to the owner of a store */
export type Payout = {
   __typename?: 'Payout';
  id: Scalars['ID'];
  createdAt: Scalars['Date'];
  storeId: Scalars['ID'];
  payeeType: PayeeType;
  amount: Scalars['Price'];
  startPeriod: Scalars['Date'];
  endPeriod: Scalars['Date'];
  payoutDate: Scalars['Date'];
  payoutStatus: PayoutStatus;
  /**
   * This should later be a payoutID -> bank account/paypal email/card
   * sellers may have a variety of payout methods to choose from with Adyen.
   */
  payoutEmail: Scalars['String'];
  currency: Scalars['String'];
  payoutItemIds: Array<Scalars['ID']>;
  approvedByIds: Array<Scalars['ID']>;
  details?: Maybe<Scalars['String']>;
  approvedByAdmins: Array<UserForDealers>;
  /**
   * Payout items breakdown.
   * PayoutId -> PayoutItems -> OrderItems
   */
  payoutItems?: Maybe<Array<Maybe<PayoutItem>>>;
  /**
   * product sales breakdown.
   * PayoutId -> PayoutItems -> OrderItems
   */
  productsBreakdownConnection: ProductsSoldPeriodSummaryConnection;
};


/** Record of a payout event from the platform to the owner of a store */
export type PayoutProductsBreakdownConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};

/** columns and relationships of "payout_items" */
export type Payout_Items = {
   __typename?: 'payout_items';
  amount: Scalars['Int'];
  createdAt: Scalars['timestamp'];
  currency: Scalars['String'];
  id: Scalars['String'];
  orderId: Scalars['String'];
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
  count?: Maybe<Scalars['Int']>;
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
  on_conflict?: Maybe<Payout_Items_On_Conflict>;
};

/** aggregate avg on columns */
export type Payout_Items_Avg_Fields = {
   __typename?: 'payout_items_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  paymentProcessingFee?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "payout_items" */
export type Payout_Items_Avg_Order_By = {
  amount?: Maybe<Order_By>;
  paymentProcessingFee?: Maybe<Order_By>;
  taxes?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "payout_items". All fields are combined with a logical 'AND'. */
export type Payout_Items_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Payout_Items_Bool_Exp>>>;
  _not?: Maybe<Payout_Items_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Payout_Items_Bool_Exp>>>;
  amount?: Maybe<Int_Comparison_Exp>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  currency?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  orderId?: Maybe<String_Comparison_Exp>;
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

/** input type for incrementing integer column in table "payout_items" */
export type Payout_Items_Inc_Input = {
  amount?: Maybe<Scalars['Int']>;
  paymentProcessingFee?: Maybe<Scalars['Int']>;
  taxes?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "payout_items" */
export type Payout_Items_Insert_Input = {
  amount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
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
  orderId?: Maybe<Scalars['String']>;
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
  orderId?: Maybe<Order_By>;
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
  orderId?: Maybe<Scalars['String']>;
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
  orderId?: Maybe<Order_By>;
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
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Payout_Items>;
};

/** input type for inserting object relation for remote table "payout_items" */
export type Payout_Items_Obj_Rel_Insert_Input = {
  data: Payout_Items_Insert_Input;
  on_conflict?: Maybe<Payout_Items_On_Conflict>;
};

/** on conflict condition type for table "payout_items" */
export type Payout_Items_On_Conflict = {
  constraint: Payout_Items_Constraint;
  update_columns: Array<Payout_Items_Update_Column>;
  where?: Maybe<Payout_Items_Bool_Exp>;
};

/** ordering options when selecting data from "payout_items" */
export type Payout_Items_Order_By = {
  amount?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  currency?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  orderId?: Maybe<Order_By>;
  payeeType?: Maybe<Order_By>;
  paymentProcessingFee?: Maybe<Order_By>;
  payoutId?: Maybe<Order_By>;
  payoutStatus?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  taxes?: Maybe<Order_By>;
  txnId?: Maybe<Order_By>;
};

/** primary key columns input for table: "payout_items" */
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
  ORDERID = 'orderId',
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
  orderId?: Maybe<Scalars['String']>;
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
  paymentProcessingFee?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "payout_items" */
export type Payout_Items_Stddev_Order_By = {
  amount?: Maybe<Order_By>;
  paymentProcessingFee?: Maybe<Order_By>;
  taxes?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Payout_Items_Stddev_Pop_Fields = {
   __typename?: 'payout_items_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  paymentProcessingFee?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "payout_items" */
export type Payout_Items_Stddev_Pop_Order_By = {
  amount?: Maybe<Order_By>;
  paymentProcessingFee?: Maybe<Order_By>;
  taxes?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Payout_Items_Stddev_Samp_Fields = {
   __typename?: 'payout_items_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  paymentProcessingFee?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "payout_items" */
export type Payout_Items_Stddev_Samp_Order_By = {
  amount?: Maybe<Order_By>;
  paymentProcessingFee?: Maybe<Order_By>;
  taxes?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Payout_Items_Sum_Fields = {
   __typename?: 'payout_items_sum_fields';
  amount?: Maybe<Scalars['Int']>;
  paymentProcessingFee?: Maybe<Scalars['Int']>;
  taxes?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "payout_items" */
export type Payout_Items_Sum_Order_By = {
  amount?: Maybe<Order_By>;
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
  ORDERID = 'orderId',
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
  paymentProcessingFee?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "payout_items" */
export type Payout_Items_Var_Pop_Order_By = {
  amount?: Maybe<Order_By>;
  paymentProcessingFee?: Maybe<Order_By>;
  taxes?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Payout_Items_Var_Samp_Fields = {
   __typename?: 'payout_items_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  paymentProcessingFee?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "payout_items" */
export type Payout_Items_Var_Samp_Order_By = {
  amount?: Maybe<Order_By>;
  paymentProcessingFee?: Maybe<Order_By>;
  taxes?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Payout_Items_Variance_Fields = {
   __typename?: 'payout_items_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  paymentProcessingFee?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "payout_items" */
export type Payout_Items_Variance_Order_By = {
  amount?: Maybe<Order_By>;
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

/** order by max() on columns of table "payout_methods" */
export type Payout_Methods_Max_Order_By = {
  accountName?: Maybe<Order_By>;
  accountNumber?: Maybe<Order_By>;
  bsb?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  payoutType?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
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

/** order by min() on columns of table "payout_methods" */
export type Payout_Methods_Min_Order_By = {
  accountName?: Maybe<Order_By>;
  accountNumber?: Maybe<Order_By>;
  bsb?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  payoutType?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
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
  accountName?: Maybe<Order_By>;
  accountNumber?: Maybe<Order_By>;
  bsb?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  payoutType?: Maybe<Order_By>;
  storeId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** primary key columns input for table: "payout_methods" */
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

export enum PayoutDealType {
  /** What a normal seller receives. Sellers without an entry default to platform default of 15%. */
  SELLER = 'SELLER',
  /** someone who refers another seller earns this rate */
  SELLER_AFFILIATE = 'SELLER_AFFILIATE',
  /** seller referred by an affiliate earns this rate */
  REFERRED_SELLER = 'REFERRED_SELLER',
  /** Deal given to someone who shared their ref link to the site */
  BUYER_AFFILIATE = 'BUYER_AFFILIATE'
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
  today: SummaryStatistics;
  last7Days: SummaryStatistics;
  last30Days: SummaryStatistics;
  lastPeriod: SummaryStatistics;
  currentPeriod: SummaryStatistics;
  allTime: SummaryStatistics;
};

export type PayoutInput = {
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  storeId?: Maybe<Scalars['ID']>;
  sellerPayment?: Maybe<Scalars['Price']>;
  platformFee?: Maybe<Scalars['Price']>;
  startPeriod?: Maybe<Scalars['Date']>;
  endPeriod?: Maybe<Scalars['Date']>;
  payoutDate?: Maybe<Scalars['Date']>;
  payoutStatus?: Maybe<PayoutStatus>;
  /**
   * This should later be a payoutID -> bank account/paypal email/card
   * sellers may have a variety of payout methods to choose from with Adyen.
   */
  payoutEmail?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  payoutItemIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  approvedByIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  details?: Maybe<Scalars['String']>;
};

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
};

export type PayoutItemsConnection = ConnectionWithMetrics & {
   __typename?: 'PayoutItemsConnection';
  /** The number of transactions in the period */
  totalCount?: Maybe<Scalars['Int']>;
  /** Sums the 'subtotal' column of the transactions table */
  totalAmount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<PayoutItemsEdge>;
};

export type PayoutItemsEdge = Edge & {
   __typename?: 'PayoutItemsEdge';
  cursor: Scalars['PageCursor'];
  node: PayoutItem;
};

export type PayoutItemsPagedConnection = PageBasedConnectionWithMetrics & {
   __typename?: 'PayoutItemsPagedConnection';
  /** The number of payoutItems in the period */
  totalCount?: Maybe<Scalars['Int']>;
  /** Sums the 'amount' column of the payout_items table */
  totalAmount?: Maybe<Scalars['Int']>;
  /** The amount of payment processing fees paid by sellers in the period */
  totalFees?: Maybe<Scalars['Int']>;
  pageInfo: PageBasedConnectionPageInfo;
  edges: Array<PayoutItemsPagedEdge>;
};

export type PayoutItemsPagedEdge = PageBasedConnectionEdge & {
   __typename?: 'PayoutItemsPagedEdge';
  pageNumber: Scalars['Int'];
  node: PayoutItem;
};

export type PayoutMethodMutationResponse = {
   __typename?: 'PayoutMethodMutationResponse';
  payoutMethod: Payout_Methods;
};

export type PayoutsConnection = ConnectionWithMetrics & {
   __typename?: 'PayoutsConnection';
  /** The number of payouts in the period */
  totalCount?: Maybe<Scalars['Int']>;
  /** Sums the 'amount' column of the payouts table */
  totalAmount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<PayoutEdge>;
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
  /** Payout pending another admin's approval before dispatch to payout provider */
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  /** Payout sent to payout provider and processing */
  PROCESSING = 'PROCESSING',
  /** Payout processed and confirmed by payout provider */
  PAID = 'PAID',
  /** Payout refunding initial state */
  REFUNDING = 'REFUNDING',
  /** Pending refund, while waiting for payout to be approved */
  PENDING_REFUND = 'PENDING_REFUND',
  /** Payout refunded, after payout */
  REFUNDED = 'REFUNDED'
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Phone_Numbers_Max_Fields>;
  min?: Maybe<Phone_Numbers_Min_Fields>;
};


/** aggregate fields of "phone_numbers" */
export type Phone_Numbers_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Phone_Numbers_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "phone_numbers" */
export type Phone_Numbers_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Phone_Numbers_Max_Order_By>;
  min?: Maybe<Phone_Numbers_Min_Order_By>;
};

/** input type for inserting array relation for remote table "phone_numbers" */
export type Phone_Numbers_Arr_Rel_Insert_Input = {
  data: Array<Phone_Numbers_Insert_Input>;
  on_conflict?: Maybe<Phone_Numbers_On_Conflict>;
};

/** Boolean expression to filter rows from the table "phone_numbers". All fields are combined with a logical 'AND'. */
export type Phone_Numbers_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Phone_Numbers_Bool_Exp>>>;
  _not?: Maybe<Phone_Numbers_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Phone_Numbers_Bool_Exp>>>;
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

/** order by max() on columns of table "phone_numbers" */
export type Phone_Numbers_Max_Order_By = {
  areaCode?: Maybe<Order_By>;
  countryCode?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  number?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
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

/** order by min() on columns of table "phone_numbers" */
export type Phone_Numbers_Min_Order_By = {
  areaCode?: Maybe<Order_By>;
  countryCode?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  number?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** response of any mutation on the table "phone_numbers" */
export type Phone_Numbers_Mutation_Response = {
   __typename?: 'phone_numbers_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Phone_Numbers>;
};

/** input type for inserting object relation for remote table "phone_numbers" */
export type Phone_Numbers_Obj_Rel_Insert_Input = {
  data: Phone_Numbers_Insert_Input;
  on_conflict?: Maybe<Phone_Numbers_On_Conflict>;
};

/** on conflict condition type for table "phone_numbers" */
export type Phone_Numbers_On_Conflict = {
  constraint: Phone_Numbers_Constraint;
  update_columns: Array<Phone_Numbers_Update_Column>;
  where?: Maybe<Phone_Numbers_Bool_Exp>;
};

/** ordering options when selecting data from "phone_numbers" */
export type Phone_Numbers_Order_By = {
  areaCode?: Maybe<Order_By>;
  countryCode?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  number?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: "phone_numbers" */
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
  isExcludedFromRecommendations: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it from search results */
  isExcludedFromSearch: Scalars['Boolean'];
  /** Whether or not it has been sold */
  soldOutStatus: Scalars['String'];
  /** All editable attributes in ProductSnapshots and ProductSnapshots.currentVariants */
  currentSnapshotId: Scalars['String'];
  currentSnapshot: Product_Snapshots;
  featuredVariant: Product_Variants;
};

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

/** order by max() on columns of table "product_file_owners" */
export type Product_File_Owners_Max_Order_By = {
  fileId?: Maybe<Order_By>;
  ownerId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Product_File_Owners_Min_Fields = {
   __typename?: 'product_file_owners_min_fields';
  fileId?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "product_file_owners" */
export type Product_File_Owners_Min_Order_By = {
  fileId?: Maybe<Order_By>;
  ownerId?: Maybe<Order_By>;
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
  fileId?: Maybe<Order_By>;
  ownerId?: Maybe<Order_By>;
};

/** primary key columns input for table: "product_file_owners" */
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
  id?: Maybe<String_Comparison_Exp>;
  mimeType?: Maybe<String_Comparison_Exp>;
  sizeInBytes?: Maybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "product_files" */
export enum Product_Files_Constraint {
  /** unique or primary key constraint */
  FILES_PKEY = 'files_pkey'
}

/** input type for incrementing integer column in table "product_files" */
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

/** order by max() on columns of table "product_files" */
export type Product_Files_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  fileName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
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

/** order by min() on columns of table "product_files" */
export type Product_Files_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  fileName?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
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
  id?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  sizeInBytes?: Maybe<Order_By>;
};

/** primary key columns input for table: "product_files" */
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
  sizeInBytes?: Maybe<Scalars['bigint']>;
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
  barrelLength?: Maybe<Scalars['String']>;
  caliber?: Maybe<Scalars['String']>;
  condition: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  /** An array relationship */
  currentVariants: Array<Product_Variants>;
  /** An aggregated array relationship */
  currentVariants_aggregate: Product_Variants_Aggregate;
  /** An object relationship */
  dealer?: Maybe<Dealers>;
  dealerId: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['String'];
  location: Scalars['String'];
  magazineCapacity?: Maybe<Scalars['String']>;
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
  barrelLength?: Maybe<String_Comparison_Exp>;
  caliber?: Maybe<String_Comparison_Exp>;
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

/** order by max() on columns of table "product_snapshots" */
export type Product_Snapshots_Max_Order_By = {
  actionType?: Maybe<Order_By>;
  ammoType?: Maybe<Order_By>;
  barrelLength?: Maybe<Order_By>;
  caliber?: Maybe<Order_By>;
  condition?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  dealerId?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  magazineCapacity?: Maybe<Order_By>;
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
  barrelLength?: Maybe<Scalars['String']>;
  caliber?: Maybe<Scalars['String']>;
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

/** order by min() on columns of table "product_snapshots" */
export type Product_Snapshots_Min_Order_By = {
  actionType?: Maybe<Order_By>;
  ammoType?: Maybe<Order_By>;
  barrelLength?: Maybe<Order_By>;
  caliber?: Maybe<Order_By>;
  condition?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  dealerId?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  magazineCapacity?: Maybe<Order_By>;
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
  barrelLength?: Maybe<Order_By>;
  caliber?: Maybe<Order_By>;
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
  BARRELLENGTH = 'barrelLength',
  /** column name */
  CALIBER = 'caliber',
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

/** input type for incrementing integer column in table "product_variants" */
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

/** primary key columns input for table: "product_variants" */
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

export type ProductCreateInput = {
  /** ID of the category to file the product under. */
  categoryId: Scalars['ID'];
  /**
   * The set of available variants.
   * Cannot be empty.
   * TODO: max number
   */
  currentVariants: Array<ProductVariantInput>;
  /** Whether or not to put the item up for sale. */
  isPublished: Scalars['Boolean'];
  /** Short description of the product #TODO: regex */
  title: Scalars['String'];
  /** A whole bunch of words to describe the product #TODO: regex */
  description: Scalars['String'];
  condition: Scalars['String'];
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  ammoType?: Maybe<Scalars['String']>;
  actionType?: Maybe<Scalars['String']>;
  caliber?: Maybe<Scalars['String']>;
  serialNumber: Scalars['String'];
  location: Scalars['String'];
  dealerId?: Maybe<Scalars['String']>;
  dealer?: Maybe<InsertDealerInput>;
  magazineCapacity?: Maybe<Scalars['String']>;
  barrelLength?: Maybe<Scalars['String']>;
};

export type ProductEditInput = {
  /** Identifier of the product to edit. */
  productId: Scalars['ID'];
  /** ID of the category to file the product under. */
  categoryId: Scalars['ID'];
  /**
   * The set of available variants.
   * Will be sorted as per the provided order, and cannot be empty.
   * TODO: max number
   */
  currentVariants: Array<ProductVariantEditInput>;
  /** Whether or not to put the item up for sale. */
  isPublished: Scalars['Boolean'];
  /** Short description of the product #TODO: regex */
  title: Scalars['String'];
  /** A whole bunch of words to describe the product #TODO: regex */
  description: Scalars['String'];
  condition: Scalars['String'];
  make: Scalars['String'];
  model: Scalars['String'];
  ammoType?: Maybe<Scalars['String']>;
  actionType?: Maybe<Scalars['String']>;
  caliber: Scalars['String'];
  serialNumber: Scalars['String'];
  location: Scalars['String'];
  dealerId?: Maybe<Scalars['String']>;
  dealer?: Maybe<InsertDealerInput>;
  magazineCapacity?: Maybe<Scalars['String']>;
  barrelLength?: Maybe<Scalars['String']>;
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

export type ProductMutationResponse = {
   __typename?: 'ProductMutationResponse';
  product: Product;
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
  isExcludedFromRecommendations: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it from search results */
  isExcludedFromSearch: Scalars['Boolean'];
  /** Whether or not it has been sold */
  soldOutStatus: Scalars['String'];
  /** All editable attributes in ProductSnapshots and ProductSnapshots.currentVariants */
  currentSnapshotId: Scalars['String'];
  currentSnapshot: Product_Snapshots;
  featuredVariant: Product_Variants;
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
  isExcludedFromRecommendations: Scalars['Boolean'];
  /** Whether or not a platform admin has hidden it from search results */
  isExcludedFromSearch: Scalars['Boolean'];
  /** Whether or not it has been sold */
  soldOutStatus: Scalars['String'];
  /** All editable attributes in ProductSnapshots and ProductSnapshots.currentVariants */
  currentSnapshotId: Scalars['String'];
  currentSnapshot: Product_Snapshots;
  featuredVariant: Product_Variants;
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
  lastPerformanceReview?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  productVariants: Array<Product_Variants>;
  /** An aggregated array relationship */
  productVariants_aggregate: Product_Variants_Aggregate;
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
  lastPerformanceReview?: Maybe<Timestamptz_Comparison_Exp>;
  productVariants?: Maybe<Product_Variants_Bool_Exp>;
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
  lastPerformanceReview?: Maybe<Scalars['timestamptz']>;
  productVariants?: Maybe<Product_Variants_Arr_Rel_Insert_Input>;
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
  soldOutStatus?: Maybe<Order_By>;
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
  lastPerformanceReview?: Maybe<Order_By>;
  productVariants_aggregate?: Maybe<Product_Variants_Aggregate_Order_By>;
  soldOutStatus?: Maybe<Order_By>;
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
  LASTPERFORMANCEREVIEW = 'lastPerformanceReview',
  /** column name */
  SOLDOUTSTATUS = 'soldOutStatus',
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
  lastPerformanceReview?: Maybe<Scalars['timestamptz']>;
  soldOutStatus?: Maybe<Scalars['String']>;
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
  LASTPERFORMANCEREVIEW = 'lastPerformanceReview',
  /** column name */
  SOLDOUTSTATUS = 'soldOutStatus',
  /** column name */
  STOREID = 'storeId',
  /** column name */
  UPDATEDAT = 'updatedAt'
}

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

/** Summary of how many sales of a specific product were made */
export type ProductSoldPeriodSummary = {
   __typename?: 'ProductSoldPeriodSummary';
  product: Product;
  numberOfSalesMade: Scalars['Int'];
  grossAmount: Scalars['Price'];
};

/** ordering options when selecting data from "products" */
export type ProductsOrderBy = {
  createdAt?: Maybe<OrderBy>;
  price?: Maybe<OrderBy>;
};

export type ProductsSoldPeriodSummaryConnection = Connection & {
   __typename?: 'ProductsSoldPeriodSummaryConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<ProductsSoldPeriodSummaryEdge>;
};

export type ProductsSoldPeriodSummaryEdge = Edge & {
   __typename?: 'ProductsSoldPeriodSummaryEdge';
  cursor: Scalars['PageCursor'];
  node: ProductSoldPeriodSummary;
};

export type ProductVariantEditInput = {
  /** When the variant already existed, provide the ID, otherwise provide null because it's new */
  variantId?: Maybe<Scalars['ID']>;
  /** What to call the product variant #TODO: regex */
  variantName: Scalars['String'];
  /** A whole bunch of words to describe the product variant #TODO: regex */
  variantDescription: Scalars['String'];
  /** Whether the variant is the default variant */
  isDefault: Scalars['Boolean'];
  /** Price (now) for the product variant */
  price: Scalars['Price'];
  /** Price (was) for the product variant */
  priceWas?: Maybe<Scalars['Price']>;
  /**
   * Set of product preview items.
   * Will be sorted as per the provided order, and cannot be empty.
   * #TODO: max number
   */
  previewItems: Array<ProductPreviewItemInput>;
  /** Amount that can be purchased now (main stock level, irrelevant of specialDeal). */
  quantityAvailable?: Maybe<Scalars['Int']>;
};

export type ProductVariantInput = {
  /** What to call the product variant #TODO: regex */
  variantName: Scalars['String'];
  /** A whole bunch of words to describe the product variant #TODO: regex */
  variantDescription: Scalars['String'];
  /** Whether the variant is the default variant */
  isDefault: Scalars['Boolean'];
  /** Price (now) for the product variant */
  price: Scalars['Price'];
  /** Price (was) for the product variant */
  priceWas?: Maybe<Scalars['Price']>;
  /**
   * Set of product preview items.
   * Will be sorted as per the provided order, and cannot be empty.
   * #TODO: max number
   */
  previewItems: Array<ProductPreviewItemInput>;
  /** Amount that can be purchased now (main stock level, irrelevant of specialDeal). */
  quantityAvailable?: Maybe<Scalars['Int']>;
};

export type Query = {
   __typename?: 'Query';
  /** fetch data from the table: "bids" */
  bids: Array<Bids>;
  /** fetch aggregated fields from the table: "bids" */
  bids_aggregate: Bids_Aggregate;
  /** fetch data from the table: "bids" using primary key columns */
  bids_by_pk?: Maybe<Bids>;
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
  /** fetch data from the table: "orders" using primary key columns */
  orders_by_pk?: Maybe<Orders>;
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
  /** fetch data from the table: "products" */
  products: Array<Products>;
  /** fetch aggregated fields from the table: "products" */
  products_aggregate: Products_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "refunds" */
  refunds: Array<Refunds>;
  /** fetch aggregated fields from the table: "refunds" */
  refunds_aggregate: Refunds_Aggregate;
  /** fetch data from the table: "refunds" using primary key columns */
  refunds_by_pk?: Maybe<Refunds>;
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
  /**
   * Query the list of products that are recommended for the logged-in user.
   * If nobody is logged in, a general list of recommendations is still returned.
   * 
   * AccessRule – PUBLIC
   */
  getRecommendedProductsConnection: ProductsConnection;
  /**
   * Retrieve all of the products on the platform that can be purchased.
   * 
   * AccessRule – PUBLIC
   */
  productsAllConnection: ProductsConnection;
  /**
   * Search all of the products on the platform that can be purchased.
   * 
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
   * 
   * AccessRule – PUBLIC
   */
  product?: Maybe<Product>;
  /**
   * Get a store by its ID.
   * 
   * AccessRule – PUBLIC
   */
  store?: Maybe<Store>;
  /**
   * Get the full list of product categories.
   * TODO: The maximum expected number of categories is X
   * 
   * AccessRule – PUBLIC
   */
  getProductCategories: Array<Categories>;
  /**
   * Get a category by its ID.
   * 
   * AccessRule – PUBLIC
   */
  category?: Maybe<Categories>;
  /**
   * Query the complete list of products, on or off sale.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  productsAdminConnection: ProductsConnection;
  /**
   * Query the complete list of stores.
   * AccessRule – PLATFORM_ADMIN
   */
  storesAdminConnection: StoresConnection;
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
   * Get transaction details of an order from efc-payment service
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
   * List payoutItems between startDate and endDate.
   * Paged connection.
   * AccessRule – PLATFORM_ADMIN
   */
  getPayoutItemsInPeriodAdminPaged: PayoutItemsPagedConnection;
  /**
   * List all payouts in the period between startDate and endDate.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  getPayoutsInPeriodAdmin: PayoutsConnection;
  /**
   * List all payouts for a store/payee
   * 
   * AccessRule – OWNER
   */
  getPayouts: PayoutsConnection;
  /**
   * List a specific payouts for a store/payee
   * 
   * AccessRule – OWNER
   */
  getPayoutById: Payout;
  /**
   * get a store's payout split
   * 
   * AccessRule – OWNER
   */
  getPayoutSplitByStoreId: PayoutSplit;
  /**
   * List transactions between startDate and endDate.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  getTransactionsInPeriodAdmin: TransactionsConnection;
  /**
   * Get recent transactions, a helper function for Admin dashboard
   * to test refunds
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  getRecentTransactions: Array<Transactions>;
  /**
   * Collection of products the user has saved for maybe purchasing later.
   * 
   * AccessRule – LOGGED_IN
   */
  wishlistItemsConnection: WishlistItemsConnection;
  /**
   * Collection of curated lists.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  listOfCuratedListsConnection: CuratedListsConnection;
  /**
   * Get a curated list by its ID.
   * 
   * AccessRule – PUBLIC
   */
  curatedList?: Maybe<CuratedList>;
  /**
   * Collection of items that make up a curated list.
   * 
   * AccessRule – PUBLIC
   */
  curatedListItemsConnection?: Maybe<CuratedListItemsConnection>;
  /**
   * Collection of items that make up a curated list.
   * 
   * This is the admin connection, which will show items that may otherwise be hidden due to published status etc.
   * 
   * AccessRule – PLATFORM_ADMIN
   */
  curatedListItemsAdminConnection?: Maybe<CuratedListItemsConnection>;
  /**
   * Get the product by productId
   * 
   * AccessRule – PUBLIC
   */
  getProductById?: Maybe<Product>;
  /**
   * Get the store by storeIdOrSlug
   * 
   * AccessRule – PUBLIC
   */
  getStoreById?: Maybe<Store>;
  getStoreProductsForSaleConnection: ProductsConnection;
  /**
   * Get all gun dealers
   * 
   * AccessRule – PUBLIC
   */
  getAllDealers?: Maybe<Array<Maybe<Dealers>>>;
  /** Store sellers's view of currently published products. */
  dashboardProductsConnection: ProductsConnection;
  getCoinbaseExchangeRates?: Maybe<CoinbaseExchangeRates>;
  getUserBidsForProduct?: Maybe<ChatRoom>;
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


export type QueryOrders_By_PkArgs = {
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


export type QueryGetRecommendedProductsConnectionArgs = {
  query?: Maybe<ConnectionOffsetQuery>;
};


export type QueryProductsAllConnectionArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionOffsetQuery>;
};


export type QuerySearchArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionOffsetQuery>;
};


export type QueryProductsByCategoryConnectionArgs = {
  categorySlug: Scalars['String'];
  searchTerm?: Maybe<Scalars['String']>;
  query: ConnectionOffsetQuery;
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


export type QueryProductsAdminConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type QueryStoresAdminConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
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


export type QueryGetPayoutItemsInPeriodAdminArgs = {
  month?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
  payoutStatus?: Maybe<PayoutStatus>;
  query: ConnectionQuery;
};


export type QueryGetOrdersCreatedConnectionAdminArgs = {
  query: ConnectionOffsetQueryOrders;
};


export type QueryGetOrdersPendingApprovalConnectionAdminArgs = {
  query: ConnectionOffsetQueryOrders;
};


export type QueryGetOrdersAdminApprovedConnectionArgs = {
  query: ConnectionOffsetQueryOrders;
};


export type QueryGetOrdersExpiringConnectionAdminArgs = {
  query: ConnectionOffsetQueryOrders;
};


export type QueryGetOrdersCancelledConnectionArgs = {
  query: ConnectionOffsetQueryOrders;
};


export type QueryGetOrdersPayoutCompleteConnectionArgs = {
  query: ConnectionOffsetQueryOrders;
};


export type QueryGetOrdersCompletingConnectionDealerArgs = {
  query: ConnectionOffsetQueryOrders;
};


export type QueryGetOrdersArrivingConnectionDealerArgs = {
  query: ConnectionOffsetQueryOrders;
};


export type QueryGetPayoutItemsInPeriodAdminPagedArgs = {
  month?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
  payoutStatus?: Maybe<PayoutStatus>;
  query: PageBasedConnectionQuery;
};


export type QueryGetPayoutsInPeriodAdminArgs = {
  month: Scalars['Int'];
  year: Scalars['Int'];
  payoutStatus?: Maybe<PayoutStatus>;
  query: ConnectionQuery;
};


export type QueryGetPayoutsArgs = {
  storeId: Scalars['String'];
  query: ConnectionQuery;
};


export type QueryGetPayoutByIdArgs = {
  payoutId: Scalars['String'];
};


export type QueryGetPayoutSplitByStoreIdArgs = {
  storeOrUserId: Scalars['String'];
};


export type QueryGetTransactionsInPeriodAdminArgs = {
  month?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
  query?: Maybe<ConnectionQuery>;
};


export type QueryGetRecentTransactionsArgs = {
  count: Scalars['Int'];
};


export type QueryWishlistItemsConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type QueryListOfCuratedListsConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


export type QueryCuratedListArgs = {
  listId: Scalars['String'];
};


export type QueryCuratedListItemsConnectionArgs = {
  listId: Scalars['String'];
  query?: Maybe<ConnectionQuery>;
};


export type QueryCuratedListItemsAdminConnectionArgs = {
  listId: Scalars['String'];
  query?: Maybe<ConnectionQuery>;
};


export type QueryGetProductByIdArgs = {
  productId: Scalars['String'];
};


export type QueryGetStoreByIdArgs = {
  storeId: Scalars['String'];
};


export type QueryGetStoreProductsForSaleConnectionArgs = {
  storeId: Scalars['String'];
  searchTerm?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionOffsetQuery>;
};


export type QueryDashboardProductsConnectionArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionOffsetQuery>;
};


export type QueryGetUserBidsForProductArgs = {
  productId: Scalars['String'];
};

export type RefundPayoutItem = {
  storeId?: Maybe<Scalars['ID']>;
  payeeType?: Maybe<PayeeType>;
  amount?: Maybe<Scalars['Int']>;
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Refunds_Max_Fields>;
  min?: Maybe<Refunds_Min_Fields>;
};


/** aggregate fields of "refunds" */
export type Refunds_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Refunds_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "refunds" */
export type Refunds_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Refunds_Max_Order_By>;
  min?: Maybe<Refunds_Min_Order_By>;
};

/** input type for inserting array relation for remote table "refunds" */
export type Refunds_Arr_Rel_Insert_Input = {
  data: Array<Refunds_Insert_Input>;
  on_conflict?: Maybe<Refunds_On_Conflict>;
};

/** Boolean expression to filter rows from the table "refunds". All fields are combined with a logical 'AND'. */
export type Refunds_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Refunds_Bool_Exp>>>;
  _not?: Maybe<Refunds_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Refunds_Bool_Exp>>>;
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

/** order by max() on columns of table "refunds" */
export type Refunds_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  orderId?: Maybe<Order_By>;
  reason?: Maybe<Order_By>;
  reasonDetails?: Maybe<Order_By>;
  receiptNumber?: Maybe<Order_By>;
  transactionId?: Maybe<Order_By>;
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

/** order by min() on columns of table "refunds" */
export type Refunds_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  orderId?: Maybe<Order_By>;
  reason?: Maybe<Order_By>;
  reasonDetails?: Maybe<Order_By>;
  receiptNumber?: Maybe<Order_By>;
  transactionId?: Maybe<Order_By>;
};

/** response of any mutation on the table "refunds" */
export type Refunds_Mutation_Response = {
   __typename?: 'refunds_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Refunds>;
};

/** input type for inserting object relation for remote table "refunds" */
export type Refunds_Obj_Rel_Insert_Input = {
  data: Refunds_Insert_Input;
  on_conflict?: Maybe<Refunds_On_Conflict>;
};

/** on conflict condition type for table "refunds" */
export type Refunds_On_Conflict = {
  constraint: Refunds_Constraint;
  update_columns: Array<Refunds_Update_Column>;
  where?: Maybe<Refunds_Bool_Exp>;
};

/** ordering options when selecting data from "refunds" */
export type Refunds_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  orderId?: Maybe<Order_By>;
  reason?: Maybe<Order_By>;
  reasonDetails?: Maybe<Order_By>;
  receiptNumber?: Maybe<Order_By>;
  transactionId?: Maybe<Order_By>;
};

/** primary key columns input for table: "refunds" */
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
  SYSTEM = 'SYSTEM'
}

export type SalesBreakdown = {
   __typename?: 'SalesBreakdown';
  id: Scalars['ID'];
  actualPrice: Scalars['Int'];
};


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

/** Information about a store */
export type Store = {
  id: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
  userId: Scalars['ID'];
  user?: Maybe<BasicUser>;
  name: Scalars['String'];
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
  query?: Maybe<ConnectionOffsetQuery>;
};

/** Collection of analytical information */
export type StoreAnalytics = {
   __typename?: 'StoreAnalytics';
  /** ID of the store owning the analytics */
  storeId: Scalars['ID'];
  /**
   * The total sum of revenues from sold products,
   * and counts of sold items in periods:
   * - today
   * - last 7 days
   * - last 30 days
   * - all time
   */
  payoutHistorySummaries: PayoutHistorySummaries;
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
  name: Scalars['String'];
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
  analytics?: Maybe<StoreAnalytics>;
  payoutSplit?: Maybe<PayoutSplit>;
};


/** Private store info */
export type StorePrivateProductsForSaleConnectionArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionOffsetQuery>;
};


/** Private store info */
export type StorePrivateDashboardProductsConnectionArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  query?: Maybe<ConnectionOffsetQuery>;
};

/** Public store info */
export type StorePublic = Store & {
   __typename?: 'StorePublic';
  id: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
  userId: Scalars['ID'];
  user?: Maybe<BasicUser>;
  name: Scalars['String'];
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
  storeId: Scalars['ID'];
  itemCount: Scalars['Int'];
  totalSalesRevenue: Scalars['Int'];
  salesBreakdown: Array<SalesBreakdown>;
  order: Array<Orders>;
};

export type StoresConnection = Connection & {
   __typename?: 'StoresConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<StoresEdge>;
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

export type Subscription = {
   __typename?: 'Subscription';
  /** fetch data from the table: "bids" */
  bids: Array<Bids>;
  /** fetch aggregated fields from the table: "bids" */
  bids_aggregate: Bids_Aggregate;
  /** fetch data from the table: "bids" using primary key columns */
  bids_by_pk?: Maybe<Bids>;
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
  /** fetch data from the table: "orders" using primary key columns */
  orders_by_pk?: Maybe<Orders>;
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
  /** fetch data from the table: "products" */
  products: Array<Products>;
  /** fetch aggregated fields from the table: "products" */
  products_aggregate: Products_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "refunds" */
  refunds: Array<Refunds>;
  /** fetch aggregated fields from the table: "refunds" */
  refunds_aggregate: Refunds_Aggregate;
  /** fetch data from the table: "refunds" using primary key columns */
  refunds_by_pk?: Maybe<Refunds>;
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
  numberIncremented?: Maybe<Scalars['Int']>;
  saidSomething?: Maybe<Scalars['String']>;
  /** myConversations: JSON */
  myConversations?: Maybe<Array<Maybe<Conversation>>>;
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


export type SubscriptionOrders_By_PkArgs = {
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
  messageLimit?: Maybe<Scalars['Int']>;
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
  /** An aggregated array relationship */
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
  count?: Maybe<Scalars['Int']>;
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

/** order by aggregate values of table "transactions" */
export type Transactions_Aggregate_Order_By = {
  avg?: Maybe<Transactions_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Transactions_Max_Order_By>;
  min?: Maybe<Transactions_Min_Order_By>;
  stddev?: Maybe<Transactions_Stddev_Order_By>;
  stddev_pop?: Maybe<Transactions_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Transactions_Stddev_Samp_Order_By>;
  sum?: Maybe<Transactions_Sum_Order_By>;
  var_pop?: Maybe<Transactions_Var_Pop_Order_By>;
  var_samp?: Maybe<Transactions_Var_Samp_Order_By>;
  variance?: Maybe<Transactions_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "transactions" */
export type Transactions_Arr_Rel_Insert_Input = {
  data: Array<Transactions_Insert_Input>;
  on_conflict?: Maybe<Transactions_On_Conflict>;
};

/** aggregate avg on columns */
export type Transactions_Avg_Fields = {
   __typename?: 'transactions_avg_fields';
  total?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "transactions" */
export type Transactions_Avg_Order_By = {
  total?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "transactions". All fields are combined with a logical 'AND'. */
export type Transactions_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Transactions_Bool_Exp>>>;
  _not?: Maybe<Transactions_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Transactions_Bool_Exp>>>;
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

/** input type for incrementing integer column in table "transactions" */
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

/** order by max() on columns of table "transactions" */
export type Transactions_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  currency?: Maybe<Order_By>;
  customerId?: Maybe<Order_By>;
  details?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  orderId?: Maybe<Order_By>;
  paymentIntentId?: Maybe<Order_By>;
  paymentMethodId?: Maybe<Order_By>;
  paymentProcessor?: Maybe<Order_By>;
  receiptNumber?: Maybe<Order_By>;
  refundId?: Maybe<Order_By>;
  total?: Maybe<Order_By>;
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

/** order by min() on columns of table "transactions" */
export type Transactions_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  currency?: Maybe<Order_By>;
  customerId?: Maybe<Order_By>;
  details?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  orderId?: Maybe<Order_By>;
  paymentIntentId?: Maybe<Order_By>;
  paymentMethodId?: Maybe<Order_By>;
  paymentProcessor?: Maybe<Order_By>;
  receiptNumber?: Maybe<Order_By>;
  refundId?: Maybe<Order_By>;
  total?: Maybe<Order_By>;
};

/** response of any mutation on the table "transactions" */
export type Transactions_Mutation_Response = {
   __typename?: 'transactions_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Transactions>;
};

/** input type for inserting object relation for remote table "transactions" */
export type Transactions_Obj_Rel_Insert_Input = {
  data: Transactions_Insert_Input;
  on_conflict?: Maybe<Transactions_On_Conflict>;
};

/** on conflict condition type for table "transactions" */
export type Transactions_On_Conflict = {
  constraint: Transactions_Constraint;
  update_columns: Array<Transactions_Update_Column>;
  where?: Maybe<Transactions_Bool_Exp>;
};

/** ordering options when selecting data from "transactions" */
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

/** primary key columns input for table: "transactions" */
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

/** order by stddev() on columns of table "transactions" */
export type Transactions_Stddev_Order_By = {
  total?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Transactions_Stddev_Pop_Fields = {
   __typename?: 'transactions_stddev_pop_fields';
  total?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "transactions" */
export type Transactions_Stddev_Pop_Order_By = {
  total?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Transactions_Stddev_Samp_Fields = {
   __typename?: 'transactions_stddev_samp_fields';
  total?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "transactions" */
export type Transactions_Stddev_Samp_Order_By = {
  total?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Transactions_Sum_Fields = {
   __typename?: 'transactions_sum_fields';
  total?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "transactions" */
export type Transactions_Sum_Order_By = {
  total?: Maybe<Order_By>;
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

/** order by var_pop() on columns of table "transactions" */
export type Transactions_Var_Pop_Order_By = {
  total?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Transactions_Var_Samp_Fields = {
   __typename?: 'transactions_var_samp_fields';
  total?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "transactions" */
export type Transactions_Var_Samp_Order_By = {
  total?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Transactions_Variance_Fields = {
   __typename?: 'transactions_variance_fields';
  total?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "transactions" */
export type Transactions_Variance_Order_By = {
  total?: Maybe<Order_By>;
};

export type TransactionsConnection = Connection & {
   __typename?: 'TransactionsConnection';
  /** The number of transactions in the period */
  totalCount?: Maybe<Scalars['Int']>;
  /** Sums the 'amount' column of the payout_items table */
  totalAmount?: Maybe<Scalars['Int']>;
  /** The amount of payment processing fees paid by sellers in the period */
  totalFees?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<TransactionsEdge>;
};

export type TransactionsEdge = Edge & {
   __typename?: 'TransactionsEdge';
  cursor: Scalars['PageCursor'];
  node: Transactions;
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

/** columns and relationships of "user_licenses" */
export type User_Licenses = {
   __typename?: 'user_licenses';
  id: Scalars['String'];
  licenseCategory?: Maybe<Scalars['String']>;
  licenseExpiry: Scalars['timestamp'];
  licenseNumber: Scalars['String'];
  licenseState?: Maybe<Scalars['String']>;
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
  id?: Maybe<String_Comparison_Exp>;
  licenseCategory?: Maybe<String_Comparison_Exp>;
  licenseExpiry?: Maybe<Timestamp_Comparison_Exp>;
  licenseNumber?: Maybe<String_Comparison_Exp>;
  licenseState?: Maybe<String_Comparison_Exp>;
  verified?: Maybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_licenses" */
export enum User_Licenses_Constraint {
  /** unique or primary key constraint */
  USER_LICENSES_PKEY = 'user_licenses_pkey'
}

/** input type for inserting data into table "user_licenses" */
export type User_Licenses_Insert_Input = {
  id?: Maybe<Scalars['String']>;
  licenseCategory?: Maybe<Scalars['String']>;
  licenseExpiry?: Maybe<Scalars['timestamp']>;
  licenseNumber?: Maybe<Scalars['String']>;
  licenseState?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type User_Licenses_Max_Fields = {
   __typename?: 'user_licenses_max_fields';
  id?: Maybe<Scalars['String']>;
  licenseCategory?: Maybe<Scalars['String']>;
  licenseExpiry?: Maybe<Scalars['timestamp']>;
  licenseNumber?: Maybe<Scalars['String']>;
  licenseState?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "user_licenses" */
export type User_Licenses_Max_Order_By = {
  id?: Maybe<Order_By>;
  licenseCategory?: Maybe<Order_By>;
  licenseExpiry?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
  licenseState?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Licenses_Min_Fields = {
   __typename?: 'user_licenses_min_fields';
  id?: Maybe<Scalars['String']>;
  licenseCategory?: Maybe<Scalars['String']>;
  licenseExpiry?: Maybe<Scalars['timestamp']>;
  licenseNumber?: Maybe<Scalars['String']>;
  licenseState?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "user_licenses" */
export type User_Licenses_Min_Order_By = {
  id?: Maybe<Order_By>;
  licenseCategory?: Maybe<Order_By>;
  licenseExpiry?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
  licenseState?: Maybe<Order_By>;
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
  id?: Maybe<Order_By>;
  licenseCategory?: Maybe<Order_By>;
  licenseExpiry?: Maybe<Order_By>;
  licenseNumber?: Maybe<Order_By>;
  licenseState?: Maybe<Order_By>;
  verified?: Maybe<Order_By>;
};

/** primary key columns input for table: "user_licenses" */
export type User_Licenses_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "user_licenses" */
export enum User_Licenses_Select_Column {
  /** column name */
  ID = 'id',
  /** column name */
  LICENSECATEGORY = 'licenseCategory',
  /** column name */
  LICENSEEXPIRY = 'licenseExpiry',
  /** column name */
  LICENSENUMBER = 'licenseNumber',
  /** column name */
  LICENSESTATE = 'licenseState',
  /** column name */
  VERIFIED = 'verified'
}

/** input type for updating data in table "user_licenses" */
export type User_Licenses_Set_Input = {
  id?: Maybe<Scalars['String']>;
  licenseCategory?: Maybe<Scalars['String']>;
  licenseExpiry?: Maybe<Scalars['timestamp']>;
  licenseNumber?: Maybe<Scalars['String']>;
  licenseState?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
};

/** update columns of table "user_licenses" */
export enum User_Licenses_Update_Column {
  /** column name */
  ID = 'id',
  /** column name */
  LICENSECATEGORY = 'licenseCategory',
  /** column name */
  LICENSEEXPIRY = 'licenseExpiry',
  /** column name */
  LICENSENUMBER = 'licenseNumber',
  /** column name */
  LICENSESTATE = 'licenseState',
  /** column name */
  VERIFIED = 'verified'
}

export type UserForDealers = BasicUser & {
   __typename?: 'UserForDealers';
  id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Date']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  userRole: Role;
  licenseId?: Maybe<Scalars['String']>;
  license?: Maybe<User_Licenses>;
  phoneNumberId?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Phone_Numbers>;
  dealerId?: Maybe<Scalars['String']>;
  dealer?: Maybe<Dealer>;
};

export type UserMutationResponse = {
   __typename?: 'UserMutationResponse';
  user: UserPrivate;
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
  buyerOrdersConnection?: Maybe<OrdersConnection>;
  sellerOrdersConnection?: Maybe<OrdersConnection>;
  sellerOrdersActionItemsConnection?: Maybe<OrdersConnection>;
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
  payoutHistoryConnection?: Maybe<PayoutsConnection>;
  wishlistItemsConnection?: Maybe<WishlistItemsConnection>;
  followingStores?: Maybe<FollowingStoresConnection>;
  licenseId?: Maybe<Scalars['String']>;
  license?: Maybe<User_Licenses>;
  phoneNumberId?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Phone_Numbers>;
  dealerId?: Maybe<Scalars['String']>;
  dealer?: Maybe<Dealer>;
};


/** Private user info */
export type UserPrivateBuyerOrdersConnectionArgs = {
  query?: Maybe<ConnectionOffsetQueryOrders>;
};


/** Private user info */
export type UserPrivateSellerOrdersConnectionArgs = {
  query?: Maybe<ConnectionOffsetQueryOrders>;
};


/** Private user info */
export type UserPrivateSellerOrdersActionItemsConnectionArgs = {
  query?: Maybe<ConnectionOffsetQueryOrders>;
};


/** Private user info */
export type UserPrivatePayoutHistoryConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
};


/** Private user info */
export type UserPrivateWishlistItemsConnectionArgs = {
  query?: Maybe<ConnectionQuery>;
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
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  /**
   * email: String
   * userRole: Role
   */
  licenseId?: Maybe<Scalars['String']>;
  license?: Maybe<User_Licenses>;
  dealerId?: Maybe<Scalars['String']>;
  dealer?: Maybe<Dealer>;
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
  /** An object relationship */
  dealer?: Maybe<Dealers>;
  dealerId?: Maybe<Scalars['String']>;
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
  dealer?: Maybe<Dealers_Bool_Exp>;
  dealerId?: Maybe<String_Comparison_Exp>;
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
  phoneNumberId?: Maybe<Scalars['String']>;
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
  dealerId?: Maybe<Order_By>;
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
  phoneNumberId?: Maybe<Order_By>;
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
  dealerId?: Maybe<Scalars['String']>;
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
  phoneNumberId?: Maybe<Scalars['String']>;
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
  dealerId?: Maybe<Order_By>;
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
  phoneNumberId?: Maybe<Order_By>;
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
  dealer?: Maybe<Dealers_Order_By>;
  dealerId?: Maybe<Order_By>;
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
  DEALERID = 'dealerId',
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
  DEALERID = 'dealerId',
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

export type UserWithRole = BasicUser & {
   __typename?: 'UserWithRole';
  id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Date']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  /** email: String */
  userRole: Role;
  licenseId?: Maybe<Scalars['String']>;
  license?: Maybe<User_Licenses>;
  dealerId?: Maybe<Scalars['String']>;
  dealer?: Maybe<Dealer>;
};

/** An individual item in a wishlist */
export type WishlistItem = {
   __typename?: 'WishlistItem';
  ownerUserId: Scalars['ID'];
  addedAt: Scalars['Date'];
  product: Product;
};

export type WishlistItemsConnection = Connection & {
   __typename?: 'WishlistItemsConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges: Array<WishlistItemsEdge>;
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


export type RegisterUploadMutation = { __typename?: 'Mutation', uploadRegister: { __typename?: 'UploadRegisterMutationResponse', uploadId: string, putUrl: string } };

export type SaveImageUploadMutationVariables = Exact<{
  uploadId: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>;
}>;


export type SaveImageUploadMutation = { __typename?: 'Mutation', uploadSaveImage: { __typename?: 'UploadSaveImageMutationResponse', image: (
      { __typename?: 'image_parents' }
      & ImageFragment
    ) } };

export type UploadSaveFileMutationVariables = Exact<{
  uploadId: Scalars['String'];
  fileName: Scalars['String'];
  ownerIds?: Maybe<Array<Maybe<Scalars['String']>>>;
}>;


export type UploadSaveFileMutation = { __typename?: 'Mutation', uploadSaveFile: { __typename?: 'UploadSaveFileMutationResponse', fileId: string } };

export type ImageFragment = { __typename?: 'image_parents', id: string, createdAt: any, tags?: Maybe<string>, description?: Maybe<string>, original?: Maybe<{ __typename?: 'image_variants', id: string, mimeType: string, heightInPixels: number, widthInPixels: number, sizeInBytes: number, url?: Maybe<string> }>, variants: Array<{ __typename?: 'image_variants', id: string, mimeType: string, sizeInBytes: number, widthInPixels: number, heightInPixels: number, url?: Maybe<string> }> };

export type ProductFileFragment = { __typename?: 'product_files', id: string, fileName: string, createdAt: any, mimeType: string, sizeInBytes: any };

export type ProductSnapshotsFragment = { __typename?: 'product_snapshots', id: string, createdAt: any, productId: string, title: string, description: string, condition: string, make: string, model: string, ammoType?: Maybe<string>, actionType: string, caliber?: Maybe<string>, serialNumber: string, location: string, magazineCapacity?: Maybe<string>, barrelLength?: Maybe<string>, dealer?: Maybe<{ __typename?: 'dealers', id: string, name: string, address?: Maybe<string>, city?: Maybe<string>, state?: Maybe<string>, postCode?: Maybe<string>, licenseNumber: string, createdAt: any, user?: Maybe<{ __typename?: 'users', id: string, firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, userRole?: Maybe<string>, licenseId?: Maybe<string>, phoneNumberId?: Maybe<string>, phoneNumber?: Maybe<{ __typename?: 'phone_numbers', countryCode: string, number: string }> }> }> };

export type ProductVariantsFragment = { __typename?: 'product_variants', variantSnapshotId: string, variantId: string, snapshotId: string, productId: string, storeId: string, createdAt: any, variantName: string, variantDescription: string, isDefault: boolean, position: number, price: number, priceWas?: Maybe<number>, previewItems: Array<{ __typename?: 'product_preview_items', id: string, imageId?: Maybe<string>, position: number, youTubeEmbedLink?: Maybe<string>, variantSnapshotId?: Maybe<string>, image?: Maybe<(
      { __typename?: 'image_parents' }
      & ImageFragment
    )> }> };

export type UserLicenseFragment = { __typename?: 'user_licenses', id: string, licenseNumber: string, licenseCategory?: Maybe<string>, licenseExpiry: any, licenseState?: Maybe<string>, verified: boolean };

type ProductFragment_ProductPrivate_ = { __typename?: 'ProductPrivate', id: string, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, isPublished: boolean, isSuspended: boolean, isDeleted: boolean, isExcludedFromRecommendations: boolean, storeId: string, soldOutStatus: string, currentSnapshot: (
    { __typename?: 'product_snapshots' }
    & ProductSnapshotsFragment
  ), featuredVariant: (
    { __typename?: 'product_variants' }
    & ProductVariantsFragment
  ), store?: Maybe<{ __typename?: 'StorePrivate', id: string, name: string, user?: Maybe<{ __typename?: 'UserPrivate', id: string, license?: Maybe<(
        { __typename?: 'user_licenses' }
        & UserLicenseFragment
      )> }> }>, category?: Maybe<{ __typename?: 'categories', id: string, name: string, slug?: Maybe<string>, categoryGroup: string }> };

type ProductFragment_ProductPublic_ = { __typename?: 'ProductPublic', id: string, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, isPublished: boolean, isSuspended: boolean, isDeleted: boolean, isExcludedFromRecommendations: boolean, storeId: string, soldOutStatus: string, currentSnapshot: (
    { __typename?: 'product_snapshots' }
    & ProductSnapshotsFragment
  ), featuredVariant: (
    { __typename?: 'product_variants' }
    & ProductVariantsFragment
  ), store?: Maybe<{ __typename?: 'StorePrivate', id: string, name: string, user?: Maybe<{ __typename?: 'UserPrivate', id: string, license?: Maybe<(
        { __typename?: 'user_licenses' }
        & UserLicenseFragment
      )> }> } | { __typename?: 'StorePublic', id: string, name: string, user?: Maybe<{ __typename?: 'UserPrivate', id: string, license?: Maybe<(
        { __typename?: 'user_licenses' }
        & UserLicenseFragment
      )> } | { __typename?: 'UserForDealers', id: string, license?: Maybe<(
        { __typename?: 'user_licenses' }
        & UserLicenseFragment
      )> } | { __typename?: 'UserPublic', id: string, license?: Maybe<(
        { __typename?: 'user_licenses' }
        & UserLicenseFragment
      )> } | { __typename?: 'UserWithRole', id: string, license?: Maybe<(
        { __typename?: 'user_licenses' }
        & UserLicenseFragment
      )> }> }>, category?: Maybe<{ __typename?: 'categories', id: string, name: string, slug?: Maybe<string>, categoryGroup: string }> };

export type ProductFragment = ProductFragment_ProductPrivate_ | ProductFragment_ProductPublic_;

type StoresFragment_StorePrivate_ = { __typename?: 'StorePrivate', id: string, createdAt: any, name: string, bio?: Maybe<string>, website?: Maybe<string>, coverId?: Maybe<string>, profileId?: Maybe<string>, user?: Maybe<{ __typename?: 'UserPrivate' }>, cover?: Maybe<(
    { __typename?: 'image_parents' }
    & ImageFragment
  )>, profile?: Maybe<(
    { __typename?: 'image_parents' }
    & ImageFragment
  )> };

type StoresFragment_StorePublic_ = { __typename?: 'StorePublic', id: string, createdAt: any, name: string, bio?: Maybe<string>, website?: Maybe<string>, coverId?: Maybe<string>, profileId?: Maybe<string>, user?: Maybe<{ __typename?: 'UserPrivate' } | { __typename?: 'UserForDealers' } | { __typename?: 'UserPublic', id: string } | { __typename?: 'UserWithRole' }>, cover?: Maybe<(
    { __typename?: 'image_parents' }
    & ImageFragment
  )>, profile?: Maybe<(
    { __typename?: 'image_parents' }
    & ImageFragment
  )> };

export type StoresFragment = StoresFragment_StorePrivate_ | StoresFragment_StorePublic_;

export type UsersFragment = { __typename?: 'UserPrivate', id: string, email: string, username?: Maybe<string>, userRole: Role, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, firstName?: Maybe<string>, lastName?: Maybe<string>, emailVerified?: Maybe<boolean>, storeId?: Maybe<string>, payoutMethodId?: Maybe<string>, isDeleted: boolean, isSuspended: boolean, lastSeen?: Maybe<any>, licenseId?: Maybe<string>, store?: Maybe<(
    { __typename?: 'StorePrivate' }
    & StoresFragment_StorePrivate_
  )>, payoutMethod?: Maybe<{ __typename?: 'payout_methods', id: string, storeId: string, createdAt: any, updatedAt?: Maybe<any>, payoutType?: Maybe<string>, bsb?: Maybe<string>, accountNumber?: Maybe<string>, accountName?: Maybe<string> }>, license?: Maybe<(
    { __typename?: 'user_licenses' }
    & UserLicenseFragment
  )> };

export type BidFragment = { __typename?: 'Bid', id?: Maybe<string>, productId?: Maybe<string>, productSnapshotId?: Maybe<string>, variantId?: Maybe<string>, offerPrice?: Maybe<number>, acceptedPrice?: Maybe<number>, orderId?: Maybe<string>, bidStatus?: Maybe<string>, createdAt?: Maybe<any>, updatedAt?: Maybe<any> };

export type MessageFragment = { __typename?: 'Message', id?: Maybe<string>, chatRoomId?: Maybe<string>, createdAt?: Maybe<any>, content?: Maybe<string>, sender?: Maybe<{ __typename?: 'UserPrivate', firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, id: string, license?: Maybe<(
      { __typename?: 'user_licenses' }
      & UserLicenseFragment
    )> } | { __typename?: 'UserForDealers', id: string, license?: Maybe<(
      { __typename?: 'user_licenses' }
      & UserLicenseFragment
    )> } | { __typename?: 'UserPublic', id: string, license?: Maybe<(
      { __typename?: 'user_licenses' }
      & UserLicenseFragment
    )> } | { __typename?: 'UserWithRole', id: string, license?: Maybe<(
      { __typename?: 'user_licenses' }
      & UserLicenseFragment
    )> }>, bid?: Maybe<(
    { __typename?: 'Bid' }
    & BidFragment
  )> };

export type TransactionFragment = { __typename?: 'transactions', id: string, total: number, createdAt: any, currency?: Maybe<string>, receiptNumber: string, customerId?: Maybe<string>, orderId?: Maybe<string>, paymentProcessor?: Maybe<string>, paymentMethodId?: Maybe<string>, paymentIntentId?: Maybe<string>, refundId?: Maybe<string>, refund?: Maybe<{ __typename?: 'refunds', id: string, transactionId: string, orderId: string, createdAt: any, reason: string, reasonDetails: string, receiptNumber: string }> };

export type PayoutItemFragment = { __typename?: 'payout_items', id: string, storeId: string, payeeType: string, amount: number, paymentProcessingFee: number, createdAt: any, payoutStatus: string, currency: string, orderId: string, txnId: string, payoutId?: Maybe<string>, taxes: number };

export type OrderSnapshotFragment = { __typename?: 'OrderSnapshot', id: string, orderStatus: string, createdAt: any, adminApproverId?: Maybe<string>, adminApprover?: Maybe<{ __typename?: 'UserForDealers', id: string, firstName?: Maybe<string>, lastName?: Maybe<string>, email: string }>, form10Image?: Maybe<(
    { __typename?: 'image_parents' }
    & ImageFragment
  )>, form10File?: Maybe<(
    { __typename?: 'product_files' }
    & ProductFileFragment
  )> };

type OrdersFragment_OrderPublic_ = { __typename?: 'OrderPublic', id?: Maybe<string>, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, bidId?: Maybe<string>, total?: Maybe<number>, currency?: Maybe<string>, buyerId?: Maybe<string>, sellerStoreId?: Maybe<string>, productId?: Maybe<string>, paymentIntentId?: Maybe<string>, bid?: Maybe<(
    { __typename?: 'Bid' }
    & BidFragment
  )>, buyer?: Maybe<{ __typename?: 'UserPrivate', firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, id: string, phoneNumber?: Maybe<{ __typename?: 'phone_numbers', id: string, areaCode?: Maybe<string>, countryCode: string, number: string }>, license?: Maybe<(
      { __typename?: 'user_licenses' }
      & UserLicenseFragment
    )> } | { __typename?: 'UserForDealers', firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, id: string, phoneNumber?: Maybe<{ __typename?: 'phone_numbers', id: string, areaCode?: Maybe<string>, countryCode: string, number: string }>, license?: Maybe<(
      { __typename?: 'user_licenses' }
      & UserLicenseFragment
    )> } | { __typename?: 'UserPublic', id: string, license?: Maybe<(
      { __typename?: 'user_licenses' }
      & UserLicenseFragment
    )> } | { __typename?: 'UserWithRole', id: string, license?: Maybe<(
      { __typename?: 'user_licenses' }
      & UserLicenseFragment
    )> }>, sellerStore?: Maybe<{ __typename?: 'StorePrivate', id: string, name: string, website?: Maybe<string>, createdAt: any, updatedAt?: Maybe<any>, user?: Maybe<{ __typename?: 'UserPrivate', firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, id: string, license?: Maybe<(
        { __typename?: 'user_licenses' }
        & UserLicenseFragment
      )>, payoutMethod?: Maybe<{ __typename?: 'payout_methods', id: string, createdAt: any, updatedAt?: Maybe<any>, payoutType?: Maybe<string>, bsb?: Maybe<string>, accountNumber?: Maybe<string>, accountName?: Maybe<string> }>, phoneNumber?: Maybe<{ __typename?: 'phone_numbers', id: string, areaCode?: Maybe<string>, countryCode: string, number: string }> }> } | { __typename?: 'StorePublic', id: string, name: string, website?: Maybe<string>, createdAt: any, updatedAt?: Maybe<any>, user?: Maybe<{ __typename?: 'UserPrivate', firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, id: string, license?: Maybe<(
        { __typename?: 'user_licenses' }
        & UserLicenseFragment
      )>, payoutMethod?: Maybe<{ __typename?: 'payout_methods', id: string, createdAt: any, updatedAt?: Maybe<any>, payoutType?: Maybe<string>, bsb?: Maybe<string>, accountNumber?: Maybe<string>, accountName?: Maybe<string> }>, phoneNumber?: Maybe<{ __typename?: 'phone_numbers', id: string, areaCode?: Maybe<string>, countryCode: string, number: string }> } | { __typename?: 'UserForDealers', firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, id: string, license?: Maybe<(
        { __typename?: 'user_licenses' }
        & UserLicenseFragment
      )>, phoneNumber?: Maybe<{ __typename?: 'phone_numbers', id: string, areaCode?: Maybe<string>, countryCode: string, number: string }> } | { __typename?: 'UserPublic', id: string, license?: Maybe<(
        { __typename?: 'user_licenses' }
        & UserLicenseFragment
      )> } | { __typename?: 'UserWithRole', id: string }> }>, currentSnapshot?: Maybe<(
    { __typename?: 'OrderSnapshot', transaction?: Maybe<(
      { __typename?: 'transactions' }
      & TransactionFragment
    )> }
    & OrderSnapshotFragment
  )>, orderSnapshots?: Maybe<Array<Maybe<(
    { __typename?: 'OrderSnapshot' }
    & OrderSnapshotFragment
  )>>>, product?: Maybe<{ __typename?: 'ProductPrivate', id: string, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, isPublished: boolean, isSuspended: boolean, isDeleted: boolean, isExcludedFromRecommendations: boolean, storeId: string, soldOutStatus: string, currentSnapshot: (
      { __typename?: 'product_snapshots' }
      & ProductSnapshotsFragment
    ), featuredVariant: (
      { __typename?: 'product_variants' }
      & ProductVariantsFragment
    ), category?: Maybe<{ __typename?: 'categories', id: string, name: string, slug?: Maybe<string>, categoryGroup: string }>, store?: Maybe<{ __typename?: 'StorePrivate', id: string, name: string, userId: string, user?: Maybe<{ __typename?: 'UserPrivate', id: string }> }> } | { __typename?: 'ProductPublic', id: string, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, isPublished: boolean, isSuspended: boolean, isDeleted: boolean, isExcludedFromRecommendations: boolean, storeId: string, soldOutStatus: string, currentSnapshot: (
      { __typename?: 'product_snapshots' }
      & ProductSnapshotsFragment
    ), featuredVariant: (
      { __typename?: 'product_variants' }
      & ProductVariantsFragment
    ), category?: Maybe<{ __typename?: 'categories', id: string, name: string, slug?: Maybe<string>, categoryGroup: string }>, store?: Maybe<{ __typename?: 'StorePrivate', id: string, name: string, userId: string, user?: Maybe<{ __typename?: 'UserPrivate', id: string }> } | { __typename?: 'StorePublic', id: string, name: string, userId: string, user?: Maybe<{ __typename?: 'UserPrivate', id: string } | { __typename?: 'UserForDealers', id: string } | { __typename?: 'UserPublic', id: string } | { __typename?: 'UserWithRole', id: string }> }> }>, payoutItems?: Maybe<Array<Maybe<(
    { __typename?: 'payout_items' }
    & PayoutItemFragment
  )>>> };

type OrdersFragment_OrderDealer_ = { __typename?: 'OrderDealer', id?: Maybe<string>, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, bidId?: Maybe<string>, total?: Maybe<number>, currency?: Maybe<string>, buyerId?: Maybe<string>, sellerStoreId?: Maybe<string>, productId?: Maybe<string>, paymentIntentId?: Maybe<string>, paymentIntent?: Maybe<{ __typename?: 'PaymentIntent', id?: Maybe<string>, amount?: Maybe<number>, createdAt?: Maybe<any>, currency?: Maybe<string>, liveMode?: Maybe<boolean>, status?: Maybe<string> }>, bid?: Maybe<(
    { __typename?: 'Bid' }
    & BidFragment
  )>, buyer?: Maybe<{ __typename?: 'UserPrivate', firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, id: string, phoneNumber?: Maybe<{ __typename?: 'phone_numbers', id: string, areaCode?: Maybe<string>, countryCode: string, number: string }>, license?: Maybe<(
      { __typename?: 'user_licenses' }
      & UserLicenseFragment
    )> } | { __typename?: 'UserForDealers', firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, id: string, phoneNumber?: Maybe<{ __typename?: 'phone_numbers', id: string, areaCode?: Maybe<string>, countryCode: string, number: string }>, license?: Maybe<(
      { __typename?: 'user_licenses' }
      & UserLicenseFragment
    )> } | { __typename?: 'UserPublic', id: string, license?: Maybe<(
      { __typename?: 'user_licenses' }
      & UserLicenseFragment
    )> } | { __typename?: 'UserWithRole', id: string, license?: Maybe<(
      { __typename?: 'user_licenses' }
      & UserLicenseFragment
    )> }>, sellerStore?: Maybe<{ __typename?: 'StorePrivate', id: string, name: string, website?: Maybe<string>, createdAt: any, updatedAt?: Maybe<any>, user?: Maybe<{ __typename?: 'UserPrivate', firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, id: string, license?: Maybe<(
        { __typename?: 'user_licenses' }
        & UserLicenseFragment
      )>, payoutMethod?: Maybe<{ __typename?: 'payout_methods', id: string, createdAt: any, updatedAt?: Maybe<any>, payoutType?: Maybe<string>, bsb?: Maybe<string>, accountNumber?: Maybe<string>, accountName?: Maybe<string> }>, phoneNumber?: Maybe<{ __typename?: 'phone_numbers', id: string, areaCode?: Maybe<string>, countryCode: string, number: string }> }> } | { __typename?: 'StorePublic', id: string, name: string, website?: Maybe<string>, createdAt: any, updatedAt?: Maybe<any>, user?: Maybe<{ __typename?: 'UserPrivate', firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, id: string, license?: Maybe<(
        { __typename?: 'user_licenses' }
        & UserLicenseFragment
      )>, payoutMethod?: Maybe<{ __typename?: 'payout_methods', id: string, createdAt: any, updatedAt?: Maybe<any>, payoutType?: Maybe<string>, bsb?: Maybe<string>, accountNumber?: Maybe<string>, accountName?: Maybe<string> }>, phoneNumber?: Maybe<{ __typename?: 'phone_numbers', id: string, areaCode?: Maybe<string>, countryCode: string, number: string }> } | { __typename?: 'UserForDealers', firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, id: string, license?: Maybe<(
        { __typename?: 'user_licenses' }
        & UserLicenseFragment
      )>, phoneNumber?: Maybe<{ __typename?: 'phone_numbers', id: string, areaCode?: Maybe<string>, countryCode: string, number: string }> } | { __typename?: 'UserPublic', id: string, license?: Maybe<(
        { __typename?: 'user_licenses' }
        & UserLicenseFragment
      )> } | { __typename?: 'UserWithRole', id: string }> }>, currentSnapshot?: Maybe<(
    { __typename?: 'OrderSnapshot', transaction?: Maybe<(
      { __typename?: 'transactions' }
      & TransactionFragment
    )> }
    & OrderSnapshotFragment
  )>, orderSnapshots?: Maybe<Array<Maybe<(
    { __typename?: 'OrderSnapshot' }
    & OrderSnapshotFragment
  )>>>, product?: Maybe<{ __typename?: 'ProductPrivate', id: string, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, isPublished: boolean, isSuspended: boolean, isDeleted: boolean, isExcludedFromRecommendations: boolean, storeId: string, soldOutStatus: string, currentSnapshot: (
      { __typename?: 'product_snapshots' }
      & ProductSnapshotsFragment
    ), featuredVariant: (
      { __typename?: 'product_variants' }
      & ProductVariantsFragment
    ), category?: Maybe<{ __typename?: 'categories', id: string, name: string, slug?: Maybe<string>, categoryGroup: string }>, store?: Maybe<{ __typename?: 'StorePrivate', id: string, name: string, userId: string, user?: Maybe<{ __typename?: 'UserPrivate', id: string }> }> }>, payoutItems?: Maybe<Array<Maybe<(
    { __typename?: 'payout_items' }
    & PayoutItemFragment
  )>>> };

type OrdersFragment_OrderAdmin_ = { __typename?: 'OrderAdmin', id?: Maybe<string>, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, bidId?: Maybe<string>, total?: Maybe<number>, currency?: Maybe<string>, buyerId?: Maybe<string>, sellerStoreId?: Maybe<string>, productId?: Maybe<string>, paymentIntentId?: Maybe<string>, paymentIntent?: Maybe<{ __typename?: 'PaymentIntent', id?: Maybe<string>, amount?: Maybe<number>, amountCapturable?: Maybe<number>, amountReceived?: Maybe<number>, captureMethod?: Maybe<string>, createdAt?: Maybe<any>, currency?: Maybe<string>, liveMode?: Maybe<boolean>, status?: Maybe<string> }>, bid?: Maybe<(
    { __typename?: 'Bid' }
    & BidFragment
  )>, buyer?: Maybe<{ __typename?: 'UserPrivate', firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, id: string, phoneNumber?: Maybe<{ __typename?: 'phone_numbers', id: string, areaCode?: Maybe<string>, countryCode: string, number: string }>, license?: Maybe<(
      { __typename?: 'user_licenses' }
      & UserLicenseFragment
    )> }>, sellerStore?: Maybe<{ __typename?: 'StorePrivate', id: string, name: string, website?: Maybe<string>, createdAt: any, updatedAt?: Maybe<any>, user?: Maybe<{ __typename?: 'UserPrivate', firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, id: string, license?: Maybe<(
        { __typename?: 'user_licenses' }
        & UserLicenseFragment
      )>, payoutMethod?: Maybe<{ __typename?: 'payout_methods', id: string, createdAt: any, updatedAt?: Maybe<any>, payoutType?: Maybe<string>, bsb?: Maybe<string>, accountNumber?: Maybe<string>, accountName?: Maybe<string> }>, phoneNumber?: Maybe<{ __typename?: 'phone_numbers', id: string, areaCode?: Maybe<string>, countryCode: string, number: string }> }> }>, currentSnapshot?: Maybe<(
    { __typename?: 'OrderSnapshot', transaction?: Maybe<(
      { __typename?: 'transactions' }
      & TransactionFragment
    )> }
    & OrderSnapshotFragment
  )>, orderSnapshots?: Maybe<Array<Maybe<(
    { __typename?: 'OrderSnapshot' }
    & OrderSnapshotFragment
  )>>>, product?: Maybe<{ __typename?: 'ProductPrivate', id: string, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, isPublished: boolean, isSuspended: boolean, isDeleted: boolean, isExcludedFromRecommendations: boolean, storeId: string, soldOutStatus: string, currentSnapshot: (
      { __typename?: 'product_snapshots' }
      & ProductSnapshotsFragment
    ), featuredVariant: (
      { __typename?: 'product_variants' }
      & ProductVariantsFragment
    ), category?: Maybe<{ __typename?: 'categories', id: string, name: string, slug?: Maybe<string>, categoryGroup: string }>, store?: Maybe<{ __typename?: 'StorePrivate', id: string, name: string, userId: string, user?: Maybe<{ __typename?: 'UserPrivate', id: string }> }> }>, payoutItems?: Maybe<Array<Maybe<(
    { __typename?: 'payout_items' }
    & PayoutItemFragment
  )>>> };

export type OrdersFragment = OrdersFragment_OrderPublic_ | OrdersFragment_OrderDealer_ | OrdersFragment_OrderAdmin_;

type StorePublicFragment_StorePrivate_ = { __typename?: 'StorePrivate', id: string, createdAt: any, updatedAt?: Maybe<any>, name: string, bio?: Maybe<string>, website?: Maybe<string>, userId: string, cover?: Maybe<(
    { __typename?: 'image_parents' }
    & ImageFragment
  )>, profile?: Maybe<(
    { __typename?: 'image_parents' }
    & ImageFragment
  )>, productsForSaleConnection: { __typename?: 'ProductsConnection', totalCount?: Maybe<number>, edges: Array<{ __typename?: 'ProductsEdge', node: (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) | (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) }>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor?: Maybe<any> } } };

type StorePublicFragment_StorePublic_ = { __typename?: 'StorePublic', id: string, createdAt: any, updatedAt?: Maybe<any>, name: string, bio?: Maybe<string>, website?: Maybe<string>, userId: string, cover?: Maybe<(
    { __typename?: 'image_parents' }
    & ImageFragment
  )>, profile?: Maybe<(
    { __typename?: 'image_parents' }
    & ImageFragment
  )>, productsForSaleConnection: { __typename?: 'ProductsConnection', totalCount?: Maybe<number>, edges: Array<{ __typename?: 'ProductsEdge', node: (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) | (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) }>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor?: Maybe<any> } } };

export type StorePublicFragment = StorePublicFragment_StorePrivate_ | StorePublicFragment_StorePublic_;

export type StorePrivateFragment = { __typename?: 'StorePrivate', id: string, name: string, createdAt: any, updatedAt?: Maybe<any>, website?: Maybe<string>, bio?: Maybe<string>, coverId?: Maybe<string>, profileId?: Maybe<string>, cover?: Maybe<(
    { __typename?: 'image_parents' }
    & ImageFragment
  )>, profile?: Maybe<(
    { __typename?: 'image_parents' }
    & ImageFragment
  )> };

export type PaymentMethodFragment = { __typename?: 'payment_methods', id: string, userId: string, createdAt: any, updatedAt?: Maybe<any>, customerId?: Maybe<string>, paymentProcessor?: Maybe<string>, paymentMethodTypes?: Maybe<string>, last4?: Maybe<string>, expMonth?: Maybe<number>, expYear?: Maybe<number>, email?: Maybe<string>, name?: Maybe<string>, details?: Maybe<string> };

export type UserPrivateFragment = { __typename?: 'UserPrivate', id: string, firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, emailVerified?: Maybe<boolean>, userRole: Role, isSuspended: boolean, storeId?: Maybe<string>, dealerId?: Maybe<string>, license?: Maybe<{ __typename?: 'user_licenses', id: string, licenseNumber: string, licenseCategory?: Maybe<string>, licenseExpiry: any, licenseState?: Maybe<string>, verified: boolean }>, phoneNumber?: Maybe<{ __typename?: 'phone_numbers', id: string, areaCode?: Maybe<string>, countryCode: string, number: string }>, store?: Maybe<(
    { __typename?: 'StorePrivate' }
    & StorePrivateFragment
  )>, dealer?: Maybe<{ __typename?: 'Dealer', id: string, name?: Maybe<string>, address?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string>, postCode?: Maybe<string>, licenseNumber: string, createdAt?: Maybe<any> }>, payoutMethod?: Maybe<{ __typename?: 'payout_methods', id: string, payoutType?: Maybe<string>, bsb?: Maybe<string>, accountNumber?: Maybe<string>, accountName?: Maybe<string> }> };

export type ProductsAllConnectionQueryVariables = Exact<{
  searchTerm: Scalars['String'];
  query?: Maybe<ConnectionOffsetQuery>;
}>;


export type ProductsAllConnectionQuery = { __typename?: 'Query', productsAllConnection: { __typename?: 'ProductsConnection', totalCount?: Maybe<number>, pageInfo: { __typename?: 'PageInfo', isLastPage: boolean, endCursor?: Maybe<any> }, edges: Array<{ __typename?: 'ProductsEdge', node: (
        { __typename?: 'ProductPrivate' }
        & ProductFragment_ProductPrivate_
      ) | (
        { __typename?: 'ProductPublic' }
        & ProductFragment_ProductPublic_
      ) }> } };

export type CreateStoreMutationVariables = Exact<{
  name: Scalars['String'];
  profileId?: Maybe<Scalars['String']>;
  coverId?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
}>;


export type CreateStoreMutation = { __typename?: 'Mutation', createStore?: Maybe<{ __typename?: 'StoreMutationResponse', store: (
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


export type EditStoreProfileMutation = { __typename?: 'Mutation', editStoreProfile?: Maybe<{ __typename?: 'StoreMutationResponse', store: (
      { __typename?: 'StorePrivate' }
      & StorePrivateFragment
    ) }> };

export const ImageFragmentFragmentDoc = gql`
    fragment ImageFragment on image_parents {
  id
  original {
    id
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
export const StoresFragmentFragmentDoc = gql`
    fragment StoresFragment on Store {
  id
  createdAt
  name
  bio
  website
  user {
    ... on UserPublic {
      id
    }
  }
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
export const UserLicenseFragmentFragmentDoc = gql`
    fragment UserLicenseFragment on user_licenses {
  id
  licenseNumber
  licenseCategory
  licenseExpiry
  licenseState
  verified
}
    `;
export const UsersFragmentFragmentDoc = gql`
    fragment UsersFragment on UserPrivate {
  store {
    ...StoresFragment
  }
  id
  email
  username
  userRole
  createdAt
  updatedAt
  firstName
  lastName
  emailVerified
  storeId
  payoutMethod {
    id
    storeId
    createdAt
    updatedAt
    payoutType
    bsb
    accountNumber
    accountName
  }
  payoutMethodId
  isDeleted
  isSuspended
  lastSeen
  licenseId
  license {
    ...UserLicenseFragment
  }
}
    ${StoresFragmentFragmentDoc}
${UserLicenseFragmentFragmentDoc}`;
export const BidFragmentFragmentDoc = gql`
    fragment BidFragment on Bid {
  id
  productId
  productSnapshotId
  variantId
  offerPrice
  acceptedPrice
  orderId
  bidStatus
  createdAt
  updatedAt
}
    `;
export const MessageFragmentFragmentDoc = gql`
    fragment MessageFragment on Message {
  id
  chatRoomId
  createdAt
  sender {
    id
    ... on UserPrivate {
      firstName
      lastName
      email
    }
    license {
      ...UserLicenseFragment
    }
  }
  content
  bid {
    ...BidFragment
  }
}
    ${UserLicenseFragmentFragmentDoc}
${BidFragmentFragmentDoc}`;
export const ProductFileFragmentFragmentDoc = gql`
    fragment ProductFileFragment on product_files {
  id
  fileName
  createdAt
  mimeType
  sizeInBytes
}
    `;
export const OrderSnapshotFragmentFragmentDoc = gql`
    fragment OrderSnapshotFragment on OrderSnapshot {
  id
  orderStatus
  createdAt
  adminApproverId
  adminApprover {
    id
    firstName
    lastName
    email
  }
  form10Image {
    ...ImageFragment
  }
  form10File {
    ...ProductFileFragment
  }
}
    ${ImageFragmentFragmentDoc}
${ProductFileFragmentFragmentDoc}`;
export const TransactionFragmentFragmentDoc = gql`
    fragment TransactionFragment on transactions {
  id
  total
  createdAt
  currency
  receiptNumber
  customerId
  orderId
  paymentProcessor
  paymentMethodId
  paymentIntentId
  refundId
  refund {
    id
    transactionId
    orderId
    createdAt
    reason
    reasonDetails
    receiptNumber
  }
}
    `;
export const ProductSnapshotsFragmentFragmentDoc = gql`
    fragment ProductSnapshotsFragment on product_snapshots {
  id
  createdAt
  productId
  title
  description
  condition
  make
  model
  ammoType
  actionType
  caliber
  serialNumber
  location
  magazineCapacity
  barrelLength
  dealer {
    id
    name
    address
    city
    state
    postCode
    licenseNumber
    createdAt
    user {
      id
      firstName
      lastName
      email
      userRole
      licenseId
      phoneNumberId
      phoneNumber {
        countryCode
        number
      }
    }
  }
}
    `;
export const ProductVariantsFragmentFragmentDoc = gql`
    fragment ProductVariantsFragment on product_variants {
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
    imageId
    position
    youTubeEmbedLink
    variantSnapshotId
    image {
      ...ImageFragment
    }
  }
}
    ${ImageFragmentFragmentDoc}`;
export const PayoutItemFragmentFragmentDoc = gql`
    fragment PayoutItemFragment on payout_items {
  id
  storeId
  payeeType
  amount
  paymentProcessingFee
  createdAt
  payoutStatus
  currency
  orderId
  txnId
  payoutId
  taxes
}
    `;
export const OrdersFragmentFragmentDoc = gql`
    fragment OrdersFragment on Order {
  id
  createdAt
  updatedAt
  bidId
  bid {
    ...BidFragment
  }
  total
  currency
  buyerId
  buyer {
    id
    license {
      ...UserLicenseFragment
    }
    ... on UserForDealers {
      firstName
      lastName
      email
      phoneNumber {
        id
        areaCode
        countryCode
        number
      }
    }
    ... on UserPrivate {
      firstName
      lastName
      email
      phoneNumber {
        id
        areaCode
        countryCode
        number
      }
    }
  }
  sellerStoreId
  sellerStore {
    id
    name
    website
    createdAt
    updatedAt
    user {
      id
      ... on UserPublic {
        license {
          ...UserLicenseFragment
        }
      }
      ... on UserForDealers {
        firstName
        lastName
        email
        license {
          ...UserLicenseFragment
        }
        phoneNumber {
          id
          areaCode
          countryCode
          number
        }
      }
      ... on UserPrivate {
        firstName
        lastName
        email
        license {
          ...UserLicenseFragment
        }
        payoutMethod {
          id
          createdAt
          updatedAt
          payoutType
          bsb
          accountNumber
          accountName
        }
        phoneNumber {
          id
          areaCode
          countryCode
          number
        }
      }
    }
  }
  currentSnapshot {
    ...OrderSnapshotFragment
    transaction {
      ...TransactionFragment
    }
  }
  orderSnapshots {
    ...OrderSnapshotFragment
  }
  productId
  product {
    id
    createdAt
    updatedAt
    isPublished
    isSuspended
    isDeleted
    isExcludedFromRecommendations
    storeId
    soldOutStatus
    currentSnapshot {
      ...ProductSnapshotsFragment
    }
    featuredVariant {
      ...ProductVariantsFragment
    }
    category {
      id
      name
      slug
      categoryGroup
    }
    store {
      id
      name
      userId
      user {
        id
      }
    }
  }
  payoutItems {
    ...PayoutItemFragment
  }
  paymentIntentId
  ... on OrderDealer {
    paymentIntent {
      id
      amount
      createdAt
      currency
      liveMode
      status
    }
  }
  ... on OrderAdmin {
    paymentIntent {
      id
      amount
      amountCapturable
      amountReceived
      captureMethod
      createdAt
      currency
      liveMode
      status
    }
  }
}
    ${BidFragmentFragmentDoc}
${UserLicenseFragmentFragmentDoc}
${OrderSnapshotFragmentFragmentDoc}
${TransactionFragmentFragmentDoc}
${ProductSnapshotsFragmentFragmentDoc}
${ProductVariantsFragmentFragmentDoc}
${PayoutItemFragmentFragmentDoc}`;
export const ProductFragmentFragmentDoc = gql`
    fragment ProductFragment on Product {
  id
  createdAt
  updatedAt
  isPublished
  isSuspended
  isDeleted
  isExcludedFromRecommendations
  storeId
  soldOutStatus
  currentSnapshot {
    ...ProductSnapshotsFragment
  }
  featuredVariant {
    ...ProductVariantsFragment
  }
  store {
    id
    name
    user {
      id
      license {
        ...UserLicenseFragment
      }
    }
  }
  category {
    id
    name
    slug
    categoryGroup
  }
}
    ${ProductSnapshotsFragmentFragmentDoc}
${ProductVariantsFragmentFragmentDoc}
${UserLicenseFragmentFragmentDoc}`;
export const StorePublicFragmentFragmentDoc = gql`
    fragment StorePublicFragment on Store {
  id
  createdAt
  updatedAt
  name
  bio
  website
  userId
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
export const PaymentMethodFragmentFragmentDoc = gql`
    fragment PaymentMethodFragment on payment_methods {
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
  emailVerified
  userRole
  isSuspended
  license {
    id
    licenseNumber
    licenseCategory
    licenseExpiry
    licenseState
    verified
  }
  phoneNumber {
    id
    areaCode
    countryCode
    number
  }
  storeId
  store {
    ...StorePrivateFragment
  }
  dealerId
  dealer {
    id
    name
    address
    state
    city
    postCode
    licenseNumber
    createdAt
  }
  payoutMethod {
    id
    payoutType
    bsb
    accountNumber
    accountName
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
export type SaveImageUploadMutationResult = ApolloReactCommon.MutationResult<SaveImageUploadMutation>;
export type SaveImageUploadMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveImageUploadMutation, SaveImageUploadMutationVariables>;
export const UploadSaveFileDocument = gql`
    mutation uploadSaveFile($uploadId: String!, $fileName: String!, $ownerIds: [String]) {
  uploadSaveFile(uploadId: $uploadId, fileName: $fileName, ownerIds: $ownerIds) {
    ... on UploadSaveFileMutationResponse {
      fileId
    }
  }
}
    `;
export type UploadSaveFileMutationResult = ApolloReactCommon.MutationResult<UploadSaveFileMutation>;
export type UploadSaveFileMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadSaveFileMutation, UploadSaveFileMutationVariables>;
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
export type ProductsAllConnectionQueryResult = ApolloReactCommon.QueryResult<ProductsAllConnectionQuery, ProductsAllConnectionQueryVariables>;
export const CreateStoreDocument = gql`
    mutation createStore($name: String!, $profileId: String, $coverId: String, $bio: String, $website: String) {
  createStore(name: $name, profileId: $profileId, coverId: $coverId, bio: $bio, website: $website) {
    store {
      ... on StorePrivate {
        ...StorePrivateFragment
      }
    }
  }
}
    ${StorePrivateFragmentFragmentDoc}`;
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
export type EditStoreProfileMutationResult = ApolloReactCommon.MutationResult<EditStoreProfileMutation>;
export type EditStoreProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<EditStoreProfileMutation, EditStoreProfileMutationVariables>;
export type ID = Scalars["ID"]
export type Price = Scalars["Price"]
export type PageCursor = Scalars["PageCursor"]
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] }