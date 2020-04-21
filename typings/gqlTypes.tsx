import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
  json: any;
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

export type Image_Owners = {
   __typename?: 'image_owners';
  image_id: Scalars['String'];
  owner_id: Scalars['String'];
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
  image_id?: Maybe<String_Comparison_Exp>;
  owner_id?: Maybe<String_Comparison_Exp>;
};

export enum Image_Owners_Constraint {
  ImageOwnersPkey = 'image_owners_pkey'
}

export type Image_Owners_Insert_Input = {
  image_id?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
};

export type Image_Owners_Max_Fields = {
   __typename?: 'image_owners_max_fields';
  image_id?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
};

export type Image_Owners_Max_Order_By = {
  image_id?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
};

export type Image_Owners_Min_Fields = {
   __typename?: 'image_owners_min_fields';
  image_id?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
};

export type Image_Owners_Min_Order_By = {
  image_id?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
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
  image_id?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
};

export type Image_Owners_Pk_Columns_Input = {
  image_id: Scalars['String'];
};

export enum Image_Owners_Select_Column {
  ImageId = 'image_id',
  OwnerId = 'owner_id'
}

export type Image_Owners_Set_Input = {
  image_id?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
};

export enum Image_Owners_Update_Column {
  ImageId = 'image_id',
  OwnerId = 'owner_id'
}

export type Image_Parents = {
   __typename?: 'image_parents';
  created_at: Scalars['timestamptz'];
  description?: Maybe<Scalars['String']>;
  image_id: Scalars['String'];
  original?: Maybe<Image_Variants>;
  original_variant_id: Scalars['String'];
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
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  image_id?: Maybe<String_Comparison_Exp>;
  original?: Maybe<Image_Variants_Bool_Exp>;
  original_variant_id?: Maybe<String_Comparison_Exp>;
  tags?: Maybe<String_Comparison_Exp>;
  variants?: Maybe<Image_Variants_Bool_Exp>;
};

export enum Image_Parents_Constraint {
  ImageParentsPkey = 'image_parents_pkey'
}

export type Image_Parents_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  image_id?: Maybe<Scalars['String']>;
  original?: Maybe<Image_Variants_Obj_Rel_Insert_Input>;
  original_variant_id?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  variants?: Maybe<Image_Variants_Arr_Rel_Insert_Input>;
};

export type Image_Parents_Max_Fields = {
   __typename?: 'image_parents_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  image_id?: Maybe<Scalars['String']>;
  original_variant_id?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
};

export type Image_Parents_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  image_id?: Maybe<Order_By>;
  original_variant_id?: Maybe<Order_By>;
  tags?: Maybe<Order_By>;
};

export type Image_Parents_Min_Fields = {
   __typename?: 'image_parents_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  image_id?: Maybe<Scalars['String']>;
  original_variant_id?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
};

export type Image_Parents_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  image_id?: Maybe<Order_By>;
  original_variant_id?: Maybe<Order_By>;
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
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  image_id?: Maybe<Order_By>;
  original?: Maybe<Image_Variants_Order_By>;
  original_variant_id?: Maybe<Order_By>;
  tags?: Maybe<Order_By>;
  variants_aggregate?: Maybe<Image_Variants_Aggregate_Order_By>;
};

export type Image_Parents_Pk_Columns_Input = {
  image_id: Scalars['String'];
};

export enum Image_Parents_Select_Column {
  CreatedAt = 'created_at',
  Description = 'description',
  ImageId = 'image_id',
  OriginalVariantId = 'original_variant_id',
  Tags = 'tags'
}

export type Image_Parents_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  image_id?: Maybe<Scalars['String']>;
  original_variant_id?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
};

export enum Image_Parents_Update_Column {
  CreatedAt = 'created_at',
  Description = 'description',
  ImageId = 'image_id',
  OriginalVariantId = 'original_variant_id',
  Tags = 'tags'
}

export type Image_Variants = {
   __typename?: 'image_variants';
  height_in_pixels: Scalars['Int'];
  mime_type: Scalars['String'];
  parent_id: Scalars['String'];
  size_in_bytes: Scalars['Int'];
  url?: Maybe<Scalars['String']>;
  variant_id: Scalars['String'];
  width_in_pixels: Scalars['Int'];
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
  height_in_pixels?: Maybe<Scalars['Float']>;
  size_in_bytes?: Maybe<Scalars['Float']>;
  width_in_pixels?: Maybe<Scalars['Float']>;
};

export type Image_Variants_Avg_Order_By = {
  height_in_pixels?: Maybe<Order_By>;
  size_in_bytes?: Maybe<Order_By>;
  width_in_pixels?: Maybe<Order_By>;
};

export type Image_Variants_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Image_Variants_Bool_Exp>>>;
  _not?: Maybe<Image_Variants_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Image_Variants_Bool_Exp>>>;
  height_in_pixels?: Maybe<Int_Comparison_Exp>;
  mime_type?: Maybe<String_Comparison_Exp>;
  parent_id?: Maybe<String_Comparison_Exp>;
  size_in_bytes?: Maybe<Int_Comparison_Exp>;
  url?: Maybe<String_Comparison_Exp>;
  variant_id?: Maybe<String_Comparison_Exp>;
  width_in_pixels?: Maybe<Int_Comparison_Exp>;
};

export enum Image_Variants_Constraint {
  ImageVariantsPkey = 'image_variants_pkey'
}

export type Image_Variants_Inc_Input = {
  height_in_pixels?: Maybe<Scalars['Int']>;
  size_in_bytes?: Maybe<Scalars['Int']>;
  width_in_pixels?: Maybe<Scalars['Int']>;
};

export type Image_Variants_Insert_Input = {
  height_in_pixels?: Maybe<Scalars['Int']>;
  mime_type?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['String']>;
  size_in_bytes?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  variant_id?: Maybe<Scalars['String']>;
  width_in_pixels?: Maybe<Scalars['Int']>;
};

export type Image_Variants_Max_Fields = {
   __typename?: 'image_variants_max_fields';
  height_in_pixels?: Maybe<Scalars['Int']>;
  mime_type?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['String']>;
  size_in_bytes?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  variant_id?: Maybe<Scalars['String']>;
  width_in_pixels?: Maybe<Scalars['Int']>;
};

export type Image_Variants_Max_Order_By = {
  height_in_pixels?: Maybe<Order_By>;
  mime_type?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
  size_in_bytes?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
  variant_id?: Maybe<Order_By>;
  width_in_pixels?: Maybe<Order_By>;
};

export type Image_Variants_Min_Fields = {
   __typename?: 'image_variants_min_fields';
  height_in_pixels?: Maybe<Scalars['Int']>;
  mime_type?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['String']>;
  size_in_bytes?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  variant_id?: Maybe<Scalars['String']>;
  width_in_pixels?: Maybe<Scalars['Int']>;
};

export type Image_Variants_Min_Order_By = {
  height_in_pixels?: Maybe<Order_By>;
  mime_type?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
  size_in_bytes?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
  variant_id?: Maybe<Order_By>;
  width_in_pixels?: Maybe<Order_By>;
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
  height_in_pixels?: Maybe<Order_By>;
  mime_type?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
  size_in_bytes?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
  variant_id?: Maybe<Order_By>;
  width_in_pixels?: Maybe<Order_By>;
};

export type Image_Variants_Pk_Columns_Input = {
  variant_id: Scalars['String'];
};

export enum Image_Variants_Select_Column {
  HeightInPixels = 'height_in_pixels',
  MimeType = 'mime_type',
  ParentId = 'parent_id',
  SizeInBytes = 'size_in_bytes',
  Url = 'url',
  VariantId = 'variant_id',
  WidthInPixels = 'width_in_pixels'
}

export type Image_Variants_Set_Input = {
  height_in_pixels?: Maybe<Scalars['Int']>;
  mime_type?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['String']>;
  size_in_bytes?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  variant_id?: Maybe<Scalars['String']>;
  width_in_pixels?: Maybe<Scalars['Int']>;
};

export type Image_Variants_Stddev_Fields = {
   __typename?: 'image_variants_stddev_fields';
  height_in_pixels?: Maybe<Scalars['Float']>;
  size_in_bytes?: Maybe<Scalars['Float']>;
  width_in_pixels?: Maybe<Scalars['Float']>;
};

export type Image_Variants_Stddev_Order_By = {
  height_in_pixels?: Maybe<Order_By>;
  size_in_bytes?: Maybe<Order_By>;
  width_in_pixels?: Maybe<Order_By>;
};

export type Image_Variants_Stddev_Pop_Fields = {
   __typename?: 'image_variants_stddev_pop_fields';
  height_in_pixels?: Maybe<Scalars['Float']>;
  size_in_bytes?: Maybe<Scalars['Float']>;
  width_in_pixels?: Maybe<Scalars['Float']>;
};

export type Image_Variants_Stddev_Pop_Order_By = {
  height_in_pixels?: Maybe<Order_By>;
  size_in_bytes?: Maybe<Order_By>;
  width_in_pixels?: Maybe<Order_By>;
};

export type Image_Variants_Stddev_Samp_Fields = {
   __typename?: 'image_variants_stddev_samp_fields';
  height_in_pixels?: Maybe<Scalars['Float']>;
  size_in_bytes?: Maybe<Scalars['Float']>;
  width_in_pixels?: Maybe<Scalars['Float']>;
};

export type Image_Variants_Stddev_Samp_Order_By = {
  height_in_pixels?: Maybe<Order_By>;
  size_in_bytes?: Maybe<Order_By>;
  width_in_pixels?: Maybe<Order_By>;
};

export type Image_Variants_Sum_Fields = {
   __typename?: 'image_variants_sum_fields';
  height_in_pixels?: Maybe<Scalars['Int']>;
  size_in_bytes?: Maybe<Scalars['Int']>;
  width_in_pixels?: Maybe<Scalars['Int']>;
};

export type Image_Variants_Sum_Order_By = {
  height_in_pixels?: Maybe<Order_By>;
  size_in_bytes?: Maybe<Order_By>;
  width_in_pixels?: Maybe<Order_By>;
};

export enum Image_Variants_Update_Column {
  HeightInPixels = 'height_in_pixels',
  MimeType = 'mime_type',
  ParentId = 'parent_id',
  SizeInBytes = 'size_in_bytes',
  Url = 'url',
  VariantId = 'variant_id',
  WidthInPixels = 'width_in_pixels'
}

export type Image_Variants_Var_Pop_Fields = {
   __typename?: 'image_variants_var_pop_fields';
  height_in_pixels?: Maybe<Scalars['Float']>;
  size_in_bytes?: Maybe<Scalars['Float']>;
  width_in_pixels?: Maybe<Scalars['Float']>;
};

export type Image_Variants_Var_Pop_Order_By = {
  height_in_pixels?: Maybe<Order_By>;
  size_in_bytes?: Maybe<Order_By>;
  width_in_pixels?: Maybe<Order_By>;
};

export type Image_Variants_Var_Samp_Fields = {
   __typename?: 'image_variants_var_samp_fields';
  height_in_pixels?: Maybe<Scalars['Float']>;
  size_in_bytes?: Maybe<Scalars['Float']>;
  width_in_pixels?: Maybe<Scalars['Float']>;
};

export type Image_Variants_Var_Samp_Order_By = {
  height_in_pixels?: Maybe<Order_By>;
  size_in_bytes?: Maybe<Order_By>;
  width_in_pixels?: Maybe<Order_By>;
};

export type Image_Variants_Variance_Fields = {
   __typename?: 'image_variants_variance_fields';
  height_in_pixels?: Maybe<Scalars['Float']>;
  size_in_bytes?: Maybe<Scalars['Float']>;
  width_in_pixels?: Maybe<Scalars['Float']>;
};

export type Image_Variants_Variance_Order_By = {
  height_in_pixels?: Maybe<Order_By>;
  size_in_bytes?: Maybe<Order_By>;
  width_in_pixels?: Maybe<Order_By>;
};

export type ImageUrl = {
   __typename?: 'ImageUrl';
  url: Scalars['String'];
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

export type Mutation_Root = {
   __typename?: 'mutation_root';
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
  delete_profile?: Maybe<Profile_Mutation_Response>;
  delete_profile_by_pk?: Maybe<Profile>;
  delete_users?: Maybe<Users_Mutation_Response>;
  delete_users_by_pk?: Maybe<Users>;
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
  insert_profile?: Maybe<Profile_Mutation_Response>;
  insert_profile_one?: Maybe<Profile>;
  insert_users?: Maybe<Users_Mutation_Response>;
  insert_users_one?: Maybe<Users>;
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
  update_profile?: Maybe<Profile_Mutation_Response>;
  update_profile_by_pk?: Maybe<Profile>;
  update_users?: Maybe<Users_Mutation_Response>;
  update_users_by_pk?: Maybe<Users>;
  url?: Maybe<ImageUrl>;
};


export type Mutation_RootDelete_Image_OwnersArgs = {
  where: Image_Owners_Bool_Exp;
};


export type Mutation_RootDelete_Image_Owners_By_PkArgs = {
  image_id: Scalars['String'];
};


export type Mutation_RootDelete_Image_ParentsArgs = {
  where: Image_Parents_Bool_Exp;
};


export type Mutation_RootDelete_Image_Parents_By_PkArgs = {
  image_id: Scalars['String'];
};


export type Mutation_RootDelete_Image_VariantsArgs = {
  where: Image_Variants_Bool_Exp;
};


export type Mutation_RootDelete_Image_Variants_By_PkArgs = {
  variant_id: Scalars['String'];
};


export type Mutation_RootDelete_Online_UsersArgs = {
  where: Online_Users_Bool_Exp;
};


export type Mutation_RootDelete_Product_File_OwnersArgs = {
  where: Product_File_Owners_Bool_Exp;
};


export type Mutation_RootDelete_Product_File_Owners_By_PkArgs = {
  product_file_id: Scalars['String'];
};


export type Mutation_RootDelete_Product_FilesArgs = {
  where: Product_Files_Bool_Exp;
};


export type Mutation_RootDelete_Product_Files_By_PkArgs = {
  product_file_id: Scalars['String'];
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
  variant_snapshot_id: Scalars['String'];
};


export type Mutation_RootDelete_ProductsArgs = {
  where: Products_Bool_Exp;
};


export type Mutation_RootDelete_Products_By_PkArgs = {
  id: Scalars['String'];
};


export type Mutation_RootDelete_ProfileArgs = {
  where: Profile_Bool_Exp;
};


export type Mutation_RootDelete_Profile_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['String'];
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


export type Mutation_RootInsert_ProfileArgs = {
  objects: Array<Profile_Insert_Input>;
  on_conflict?: Maybe<Profile_On_Conflict>;
};


export type Mutation_RootInsert_Profile_OneArgs = {
  object: Profile_Insert_Input;
  on_conflict?: Maybe<Profile_On_Conflict>;
};


export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
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


export type Mutation_RootUpdate_ProfileArgs = {
  _set?: Maybe<Profile_Set_Input>;
  where: Profile_Bool_Exp;
};


export type Mutation_RootUpdate_Profile_By_PkArgs = {
  _set?: Maybe<Profile_Set_Input>;
  pk_columns: Profile_Pk_Columns_Input;
};


export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


export type Mutation_RootUrlArgs = {
  image_id?: Maybe<Scalars['String']>;
};

export type Online_Users = {
   __typename?: 'online_users';
  id?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
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
  last_seen?: Maybe<Timestamptz_Comparison_Exp>;
};

export type Online_Users_Insert_Input = {
  id?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
};

export type Online_Users_Max_Fields = {
   __typename?: 'online_users_max_fields';
  id?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
};

export type Online_Users_Max_Order_By = {
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
};

export type Online_Users_Min_Fields = {
   __typename?: 'online_users_min_fields';
  id?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
};

export type Online_Users_Min_Order_By = {
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
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
  last_seen?: Maybe<Order_By>;
};

export enum Online_Users_Select_Column {
  Id = 'id',
  LastSeen = 'last_seen'
}

export type Online_Users_Set_Input = {
  id?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
};

export enum Order_By {
  Asc = 'asc',
  AscNullsFirst = 'asc_nulls_first',
  AscNullsLast = 'asc_nulls_last',
  Desc = 'desc',
  DescNullsFirst = 'desc_nulls_first',
  DescNullsLast = 'desc_nulls_last'
}

export type Product_File_Owners = {
   __typename?: 'product_file_owners';
  owner_id: Scalars['String'];
  product_file_id: Scalars['String'];
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
  owner_id?: Maybe<String_Comparison_Exp>;
  product_file_id?: Maybe<String_Comparison_Exp>;
};

export enum Product_File_Owners_Constraint {
  ProductFileOwnersPkey = 'product_file_owners_pkey'
}

export type Product_File_Owners_Insert_Input = {
  owner_id?: Maybe<Scalars['String']>;
  product_file_id?: Maybe<Scalars['String']>;
};

export type Product_File_Owners_Max_Fields = {
   __typename?: 'product_file_owners_max_fields';
  owner_id?: Maybe<Scalars['String']>;
  product_file_id?: Maybe<Scalars['String']>;
};

export type Product_File_Owners_Max_Order_By = {
  owner_id?: Maybe<Order_By>;
  product_file_id?: Maybe<Order_By>;
};

export type Product_File_Owners_Min_Fields = {
   __typename?: 'product_file_owners_min_fields';
  owner_id?: Maybe<Scalars['String']>;
  product_file_id?: Maybe<Scalars['String']>;
};

export type Product_File_Owners_Min_Order_By = {
  owner_id?: Maybe<Order_By>;
  product_file_id?: Maybe<Order_By>;
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
  owner_id?: Maybe<Order_By>;
  product_file_id?: Maybe<Order_By>;
};

export type Product_File_Owners_Pk_Columns_Input = {
  product_file_id: Scalars['String'];
};

export enum Product_File_Owners_Select_Column {
  OwnerId = 'owner_id',
  ProductFileId = 'product_file_id'
}

export type Product_File_Owners_Set_Input = {
  owner_id?: Maybe<Scalars['String']>;
  product_file_id?: Maybe<Scalars['String']>;
};

export enum Product_File_Owners_Update_Column {
  OwnerId = 'owner_id',
  ProductFileId = 'product_file_id'
}

export type Product_Files = {
   __typename?: 'product_files';
  created_at?: Maybe<Scalars['timestamptz']>;
  file_name?: Maybe<Scalars['String']>;
  mime_type?: Maybe<Scalars['String']>;
  product_file_id: Scalars['String'];
  size_in_bytes?: Maybe<Scalars['Int']>;
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
  size_in_bytes?: Maybe<Scalars['Float']>;
};

export type Product_Files_Avg_Order_By = {
  size_in_bytes?: Maybe<Order_By>;
};

export type Product_Files_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Product_Files_Bool_Exp>>>;
  _not?: Maybe<Product_Files_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Product_Files_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  file_name?: Maybe<String_Comparison_Exp>;
  mime_type?: Maybe<String_Comparison_Exp>;
  product_file_id?: Maybe<String_Comparison_Exp>;
  size_in_bytes?: Maybe<Int_Comparison_Exp>;
};

export enum Product_Files_Constraint {
  ProductFilesPkey = 'product_files_pkey'
}

export type Product_Files_Inc_Input = {
  size_in_bytes?: Maybe<Scalars['Int']>;
};

export type Product_Files_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  file_name?: Maybe<Scalars['String']>;
  mime_type?: Maybe<Scalars['String']>;
  product_file_id?: Maybe<Scalars['String']>;
  size_in_bytes?: Maybe<Scalars['Int']>;
};

export type Product_Files_Max_Fields = {
   __typename?: 'product_files_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  file_name?: Maybe<Scalars['String']>;
  mime_type?: Maybe<Scalars['String']>;
  product_file_id?: Maybe<Scalars['String']>;
  size_in_bytes?: Maybe<Scalars['Int']>;
};

export type Product_Files_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  file_name?: Maybe<Order_By>;
  mime_type?: Maybe<Order_By>;
  product_file_id?: Maybe<Order_By>;
  size_in_bytes?: Maybe<Order_By>;
};

export type Product_Files_Min_Fields = {
   __typename?: 'product_files_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  file_name?: Maybe<Scalars['String']>;
  mime_type?: Maybe<Scalars['String']>;
  product_file_id?: Maybe<Scalars['String']>;
  size_in_bytes?: Maybe<Scalars['Int']>;
};

export type Product_Files_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  file_name?: Maybe<Order_By>;
  mime_type?: Maybe<Order_By>;
  product_file_id?: Maybe<Order_By>;
  size_in_bytes?: Maybe<Order_By>;
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
  created_at?: Maybe<Order_By>;
  file_name?: Maybe<Order_By>;
  mime_type?: Maybe<Order_By>;
  product_file_id?: Maybe<Order_By>;
  size_in_bytes?: Maybe<Order_By>;
};

export type Product_Files_Pk_Columns_Input = {
  product_file_id: Scalars['String'];
};

export enum Product_Files_Select_Column {
  CreatedAt = 'created_at',
  FileName = 'file_name',
  MimeType = 'mime_type',
  ProductFileId = 'product_file_id',
  SizeInBytes = 'size_in_bytes'
}

export type Product_Files_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  file_name?: Maybe<Scalars['String']>;
  mime_type?: Maybe<Scalars['String']>;
  product_file_id?: Maybe<Scalars['String']>;
  size_in_bytes?: Maybe<Scalars['Int']>;
};

export type Product_Files_Stddev_Fields = {
   __typename?: 'product_files_stddev_fields';
  size_in_bytes?: Maybe<Scalars['Float']>;
};

export type Product_Files_Stddev_Order_By = {
  size_in_bytes?: Maybe<Order_By>;
};

export type Product_Files_Stddev_Pop_Fields = {
   __typename?: 'product_files_stddev_pop_fields';
  size_in_bytes?: Maybe<Scalars['Float']>;
};

export type Product_Files_Stddev_Pop_Order_By = {
  size_in_bytes?: Maybe<Order_By>;
};

export type Product_Files_Stddev_Samp_Fields = {
   __typename?: 'product_files_stddev_samp_fields';
  size_in_bytes?: Maybe<Scalars['Float']>;
};

export type Product_Files_Stddev_Samp_Order_By = {
  size_in_bytes?: Maybe<Order_By>;
};

export type Product_Files_Sum_Fields = {
   __typename?: 'product_files_sum_fields';
  size_in_bytes?: Maybe<Scalars['Int']>;
};

export type Product_Files_Sum_Order_By = {
  size_in_bytes?: Maybe<Order_By>;
};

export enum Product_Files_Update_Column {
  CreatedAt = 'created_at',
  FileName = 'file_name',
  MimeType = 'mime_type',
  ProductFileId = 'product_file_id',
  SizeInBytes = 'size_in_bytes'
}

export type Product_Files_Var_Pop_Fields = {
   __typename?: 'product_files_var_pop_fields';
  size_in_bytes?: Maybe<Scalars['Float']>;
};

export type Product_Files_Var_Pop_Order_By = {
  size_in_bytes?: Maybe<Order_By>;
};

export type Product_Files_Var_Samp_Fields = {
   __typename?: 'product_files_var_samp_fields';
  size_in_bytes?: Maybe<Scalars['Float']>;
};

export type Product_Files_Var_Samp_Order_By = {
  size_in_bytes?: Maybe<Order_By>;
};

export type Product_Files_Variance_Fields = {
   __typename?: 'product_files_variance_fields';
  size_in_bytes?: Maybe<Scalars['Float']>;
};

export type Product_Files_Variance_Order_By = {
  size_in_bytes?: Maybe<Order_By>;
};

export type Product_Preview_Items = {
   __typename?: 'product_preview_items';
  id: Scalars['String'];
  image?: Maybe<Image_Parents>;
  image_id?: Maybe<Scalars['String']>;
  position: Scalars['Int'];
  variant_snapshot_id?: Maybe<Scalars['String']>;
  youtube_embed_link?: Maybe<Scalars['String']>;
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
  image_id?: Maybe<String_Comparison_Exp>;
  position?: Maybe<Int_Comparison_Exp>;
  variant_snapshot_id?: Maybe<String_Comparison_Exp>;
  youtube_embed_link?: Maybe<String_Comparison_Exp>;
};

export enum Product_Preview_Items_Constraint {
  ProductPreviewItemsPkey = 'product_preview_items_pkey'
}

export type Product_Preview_Items_Inc_Input = {
  position?: Maybe<Scalars['Int']>;
};

export type Product_Preview_Items_Insert_Input = {
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Image_Parents_Obj_Rel_Insert_Input>;
  image_id?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  variant_snapshot_id?: Maybe<Scalars['String']>;
  youtube_embed_link?: Maybe<Scalars['String']>;
};

export type Product_Preview_Items_Max_Fields = {
   __typename?: 'product_preview_items_max_fields';
  id?: Maybe<Scalars['String']>;
  image_id?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  variant_snapshot_id?: Maybe<Scalars['String']>;
  youtube_embed_link?: Maybe<Scalars['String']>;
};

export type Product_Preview_Items_Max_Order_By = {
  id?: Maybe<Order_By>;
  image_id?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  variant_snapshot_id?: Maybe<Order_By>;
  youtube_embed_link?: Maybe<Order_By>;
};

export type Product_Preview_Items_Min_Fields = {
   __typename?: 'product_preview_items_min_fields';
  id?: Maybe<Scalars['String']>;
  image_id?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  variant_snapshot_id?: Maybe<Scalars['String']>;
  youtube_embed_link?: Maybe<Scalars['String']>;
};

export type Product_Preview_Items_Min_Order_By = {
  id?: Maybe<Order_By>;
  image_id?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  variant_snapshot_id?: Maybe<Order_By>;
  youtube_embed_link?: Maybe<Order_By>;
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
  image_id?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  variant_snapshot_id?: Maybe<Order_By>;
  youtube_embed_link?: Maybe<Order_By>;
};

export type Product_Preview_Items_Pk_Columns_Input = {
  id: Scalars['String'];
};

export enum Product_Preview_Items_Select_Column {
  Id = 'id',
  ImageId = 'image_id',
  Position = 'position',
  VariantSnapshotId = 'variant_snapshot_id',
  YoutubeEmbedLink = 'youtube_embed_link'
}

export type Product_Preview_Items_Set_Input = {
  id?: Maybe<Scalars['String']>;
  image_id?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  variant_snapshot_id?: Maybe<Scalars['String']>;
  youtube_embed_link?: Maybe<Scalars['String']>;
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
  Id = 'id',
  ImageId = 'image_id',
  Position = 'position',
  VariantSnapshotId = 'variant_snapshot_id',
  YoutubeEmbedLink = 'youtube_embed_link'
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
  action_type: Scalars['String'];
  ammo_type?: Maybe<Scalars['String']>;
  bore_diameter?: Maybe<Scalars['String']>;
  condition: Scalars['String'];
  created_at: Scalars['timestamptz'];
  current_variants: Array<Product_Variants>;
  current_variants_aggregate: Product_Variants_Aggregate;
  dealer: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['String'];
  location: Scalars['String'];
  make: Scalars['String'];
  model: Scalars['String'];
  product_id: Scalars['String'];
  products: Array<Products>;
  products_aggregate: Products_Aggregate;
  serial_number: Scalars['String'];
  title: Scalars['String'];
};


export type Product_SnapshotsCurrent_VariantsArgs = {
  distinct_on?: Maybe<Array<Product_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Variants_Order_By>>;
  where?: Maybe<Product_Variants_Bool_Exp>;
};


export type Product_SnapshotsCurrent_Variants_AggregateArgs = {
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
  action_type?: Maybe<String_Comparison_Exp>;
  ammo_type?: Maybe<String_Comparison_Exp>;
  bore_diameter?: Maybe<String_Comparison_Exp>;
  condition?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  current_variants?: Maybe<Product_Variants_Bool_Exp>;
  dealer?: Maybe<String_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  location?: Maybe<String_Comparison_Exp>;
  make?: Maybe<String_Comparison_Exp>;
  model?: Maybe<String_Comparison_Exp>;
  product_id?: Maybe<String_Comparison_Exp>;
  products?: Maybe<Products_Bool_Exp>;
  serial_number?: Maybe<String_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
};

export enum Product_Snapshots_Constraint {
  ProductSnapshotsPkey = 'product_snapshots_pkey'
}

export type Product_Snapshots_Insert_Input = {
  action_type?: Maybe<Scalars['String']>;
  ammo_type?: Maybe<Scalars['String']>;
  bore_diameter?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  current_variants?: Maybe<Product_Variants_Arr_Rel_Insert_Input>;
  dealer?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
  products?: Maybe<Products_Arr_Rel_Insert_Input>;
  serial_number?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Product_Snapshots_Max_Fields = {
   __typename?: 'product_snapshots_max_fields';
  action_type?: Maybe<Scalars['String']>;
  ammo_type?: Maybe<Scalars['String']>;
  bore_diameter?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  dealer?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
  serial_number?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Product_Snapshots_Max_Order_By = {
  action_type?: Maybe<Order_By>;
  ammo_type?: Maybe<Order_By>;
  bore_diameter?: Maybe<Order_By>;
  condition?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  dealer?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  make?: Maybe<Order_By>;
  model?: Maybe<Order_By>;
  product_id?: Maybe<Order_By>;
  serial_number?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
};

export type Product_Snapshots_Min_Fields = {
   __typename?: 'product_snapshots_min_fields';
  action_type?: Maybe<Scalars['String']>;
  ammo_type?: Maybe<Scalars['String']>;
  bore_diameter?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  dealer?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
  serial_number?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Product_Snapshots_Min_Order_By = {
  action_type?: Maybe<Order_By>;
  ammo_type?: Maybe<Order_By>;
  bore_diameter?: Maybe<Order_By>;
  condition?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  dealer?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  make?: Maybe<Order_By>;
  model?: Maybe<Order_By>;
  product_id?: Maybe<Order_By>;
  serial_number?: Maybe<Order_By>;
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
  action_type?: Maybe<Order_By>;
  ammo_type?: Maybe<Order_By>;
  bore_diameter?: Maybe<Order_By>;
  condition?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  current_variants_aggregate?: Maybe<Product_Variants_Aggregate_Order_By>;
  dealer?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  make?: Maybe<Order_By>;
  model?: Maybe<Order_By>;
  product_id?: Maybe<Order_By>;
  products_aggregate?: Maybe<Products_Aggregate_Order_By>;
  serial_number?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
};

export type Product_Snapshots_Pk_Columns_Input = {
  id: Scalars['String'];
};

export enum Product_Snapshots_Select_Column {
  ActionType = 'action_type',
  AmmoType = 'ammo_type',
  BoreDiameter = 'bore_diameter',
  Condition = 'condition',
  CreatedAt = 'created_at',
  Dealer = 'dealer',
  Description = 'description',
  Id = 'id',
  Location = 'location',
  Make = 'make',
  Model = 'model',
  ProductId = 'product_id',
  SerialNumber = 'serial_number',
  Title = 'title'
}

export type Product_Snapshots_Set_Input = {
  action_type?: Maybe<Scalars['String']>;
  ammo_type?: Maybe<Scalars['String']>;
  bore_diameter?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  dealer?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
  serial_number?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export enum Product_Snapshots_Update_Column {
  ActionType = 'action_type',
  AmmoType = 'ammo_type',
  BoreDiameter = 'bore_diameter',
  Condition = 'condition',
  CreatedAt = 'created_at',
  Dealer = 'dealer',
  Description = 'description',
  Id = 'id',
  Location = 'location',
  Make = 'make',
  Model = 'model',
  ProductId = 'product_id',
  SerialNumber = 'serial_number',
  Title = 'title'
}

export type Product_Variants = {
   __typename?: 'product_variants';
  base_price: Scalars['Int'];
  created_at: Scalars['timestamptz'];
  is_default: Scalars['Boolean'];
  position: Scalars['Int'];
  preview_items: Array<Product_Preview_Items>;
  preview_items_aggregate: Product_Preview_Items_Aggregate;
  product_id: Scalars['String'];
  snapshot_id: Scalars['String'];
  store_id: Scalars['String'];
  variant_description: Scalars['String'];
  variant_id: Scalars['String'];
  variant_name: Scalars['String'];
  variant_snapshot_id: Scalars['String'];
};


export type Product_VariantsPreview_ItemsArgs = {
  distinct_on?: Maybe<Array<Product_Preview_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Preview_Items_Order_By>>;
  where?: Maybe<Product_Preview_Items_Bool_Exp>;
};


export type Product_VariantsPreview_Items_AggregateArgs = {
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
  base_price?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
};

export type Product_Variants_Avg_Order_By = {
  base_price?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
};

export type Product_Variants_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Product_Variants_Bool_Exp>>>;
  _not?: Maybe<Product_Variants_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Product_Variants_Bool_Exp>>>;
  base_price?: Maybe<Int_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  is_default?: Maybe<Boolean_Comparison_Exp>;
  position?: Maybe<Int_Comparison_Exp>;
  preview_items?: Maybe<Product_Preview_Items_Bool_Exp>;
  product_id?: Maybe<String_Comparison_Exp>;
  snapshot_id?: Maybe<String_Comparison_Exp>;
  store_id?: Maybe<String_Comparison_Exp>;
  variant_description?: Maybe<String_Comparison_Exp>;
  variant_id?: Maybe<String_Comparison_Exp>;
  variant_name?: Maybe<String_Comparison_Exp>;
  variant_snapshot_id?: Maybe<String_Comparison_Exp>;
};

export enum Product_Variants_Constraint {
  ProductVariantsPkey = 'product_variants_pkey',
  ProductVariantsVariantSnapshotIdKey = 'product_variants_variant_snapshot_id_key'
}

export type Product_Variants_Inc_Input = {
  base_price?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
};

export type Product_Variants_Insert_Input = {
  base_price?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  is_default?: Maybe<Scalars['Boolean']>;
  position?: Maybe<Scalars['Int']>;
  preview_items?: Maybe<Product_Preview_Items_Arr_Rel_Insert_Input>;
  product_id?: Maybe<Scalars['String']>;
  snapshot_id?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['String']>;
  variant_description?: Maybe<Scalars['String']>;
  variant_id?: Maybe<Scalars['String']>;
  variant_name?: Maybe<Scalars['String']>;
  variant_snapshot_id?: Maybe<Scalars['String']>;
};

export type Product_Variants_Max_Fields = {
   __typename?: 'product_variants_max_fields';
  base_price?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  position?: Maybe<Scalars['Int']>;
  product_id?: Maybe<Scalars['String']>;
  snapshot_id?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['String']>;
  variant_description?: Maybe<Scalars['String']>;
  variant_id?: Maybe<Scalars['String']>;
  variant_name?: Maybe<Scalars['String']>;
  variant_snapshot_id?: Maybe<Scalars['String']>;
};

export type Product_Variants_Max_Order_By = {
  base_price?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  product_id?: Maybe<Order_By>;
  snapshot_id?: Maybe<Order_By>;
  store_id?: Maybe<Order_By>;
  variant_description?: Maybe<Order_By>;
  variant_id?: Maybe<Order_By>;
  variant_name?: Maybe<Order_By>;
  variant_snapshot_id?: Maybe<Order_By>;
};

export type Product_Variants_Min_Fields = {
   __typename?: 'product_variants_min_fields';
  base_price?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  position?: Maybe<Scalars['Int']>;
  product_id?: Maybe<Scalars['String']>;
  snapshot_id?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['String']>;
  variant_description?: Maybe<Scalars['String']>;
  variant_id?: Maybe<Scalars['String']>;
  variant_name?: Maybe<Scalars['String']>;
  variant_snapshot_id?: Maybe<Scalars['String']>;
};

export type Product_Variants_Min_Order_By = {
  base_price?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  product_id?: Maybe<Order_By>;
  snapshot_id?: Maybe<Order_By>;
  store_id?: Maybe<Order_By>;
  variant_description?: Maybe<Order_By>;
  variant_id?: Maybe<Order_By>;
  variant_name?: Maybe<Order_By>;
  variant_snapshot_id?: Maybe<Order_By>;
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
  base_price?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  is_default?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  preview_items_aggregate?: Maybe<Product_Preview_Items_Aggregate_Order_By>;
  product_id?: Maybe<Order_By>;
  snapshot_id?: Maybe<Order_By>;
  store_id?: Maybe<Order_By>;
  variant_description?: Maybe<Order_By>;
  variant_id?: Maybe<Order_By>;
  variant_name?: Maybe<Order_By>;
  variant_snapshot_id?: Maybe<Order_By>;
};

export type Product_Variants_Pk_Columns_Input = {
  variant_snapshot_id: Scalars['String'];
};

export enum Product_Variants_Select_Column {
  BasePrice = 'base_price',
  CreatedAt = 'created_at',
  IsDefault = 'is_default',
  Position = 'position',
  ProductId = 'product_id',
  SnapshotId = 'snapshot_id',
  StoreId = 'store_id',
  VariantDescription = 'variant_description',
  VariantId = 'variant_id',
  VariantName = 'variant_name',
  VariantSnapshotId = 'variant_snapshot_id'
}

export type Product_Variants_Set_Input = {
  base_price?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  is_default?: Maybe<Scalars['Boolean']>;
  position?: Maybe<Scalars['Int']>;
  product_id?: Maybe<Scalars['String']>;
  snapshot_id?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['String']>;
  variant_description?: Maybe<Scalars['String']>;
  variant_id?: Maybe<Scalars['String']>;
  variant_name?: Maybe<Scalars['String']>;
  variant_snapshot_id?: Maybe<Scalars['String']>;
};

export type Product_Variants_Stddev_Fields = {
   __typename?: 'product_variants_stddev_fields';
  base_price?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
};

export type Product_Variants_Stddev_Order_By = {
  base_price?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
};

export type Product_Variants_Stddev_Pop_Fields = {
   __typename?: 'product_variants_stddev_pop_fields';
  base_price?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
};

export type Product_Variants_Stddev_Pop_Order_By = {
  base_price?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
};

export type Product_Variants_Stddev_Samp_Fields = {
   __typename?: 'product_variants_stddev_samp_fields';
  base_price?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
};

export type Product_Variants_Stddev_Samp_Order_By = {
  base_price?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
};

export type Product_Variants_Sum_Fields = {
   __typename?: 'product_variants_sum_fields';
  base_price?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
};

export type Product_Variants_Sum_Order_By = {
  base_price?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
};

export enum Product_Variants_Update_Column {
  BasePrice = 'base_price',
  CreatedAt = 'created_at',
  IsDefault = 'is_default',
  Position = 'position',
  ProductId = 'product_id',
  SnapshotId = 'snapshot_id',
  StoreId = 'store_id',
  VariantDescription = 'variant_description',
  VariantId = 'variant_id',
  VariantName = 'variant_name',
  VariantSnapshotId = 'variant_snapshot_id'
}

export type Product_Variants_Var_Pop_Fields = {
   __typename?: 'product_variants_var_pop_fields';
  base_price?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
};

export type Product_Variants_Var_Pop_Order_By = {
  base_price?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
};

export type Product_Variants_Var_Samp_Fields = {
   __typename?: 'product_variants_var_samp_fields';
  base_price?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
};

export type Product_Variants_Var_Samp_Order_By = {
  base_price?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
};

export type Product_Variants_Variance_Fields = {
   __typename?: 'product_variants_variance_fields';
  base_price?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
};

export type Product_Variants_Variance_Order_By = {
  base_price?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
};

export type Products = {
   __typename?: 'products';
  category_id: Scalars['String'];
  created_at: Scalars['timestamptz'];
  current_snapshot: Product_Snapshots;
  current_snapshot_id: Scalars['String'];
  id: Scalars['String'];
  is_deleted: Scalars['Boolean'];
  is_excluded_from_recommendations: Scalars['Boolean'];
  is_excluded_from_search: Scalars['Boolean'];
  is_published: Scalars['Boolean'];
  is_suspended: Scalars['Boolean'];
  store_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
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
  category_id?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  current_snapshot?: Maybe<Product_Snapshots_Bool_Exp>;
  current_snapshot_id?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  is_deleted?: Maybe<Boolean_Comparison_Exp>;
  is_excluded_from_recommendations?: Maybe<Boolean_Comparison_Exp>;
  is_excluded_from_search?: Maybe<Boolean_Comparison_Exp>;
  is_published?: Maybe<Boolean_Comparison_Exp>;
  is_suspended?: Maybe<Boolean_Comparison_Exp>;
  store_id?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

export enum Products_Constraint {
  ProductsPkey = 'products_pkey'
}

export type Products_Insert_Input = {
  category_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  current_snapshot?: Maybe<Product_Snapshots_Obj_Rel_Insert_Input>;
  current_snapshot_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  is_deleted?: Maybe<Scalars['Boolean']>;
  is_excluded_from_recommendations?: Maybe<Scalars['Boolean']>;
  is_excluded_from_search?: Maybe<Scalars['Boolean']>;
  is_published?: Maybe<Scalars['Boolean']>;
  is_suspended?: Maybe<Scalars['Boolean']>;
  store_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type Products_Max_Fields = {
   __typename?: 'products_max_fields';
  category_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  current_snapshot_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type Products_Max_Order_By = {
  category_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  current_snapshot_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  store_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

export type Products_Min_Fields = {
   __typename?: 'products_min_fields';
  category_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  current_snapshot_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type Products_Min_Order_By = {
  category_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  current_snapshot_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  store_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
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
  category_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  current_snapshot?: Maybe<Product_Snapshots_Order_By>;
  current_snapshot_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  is_deleted?: Maybe<Order_By>;
  is_excluded_from_recommendations?: Maybe<Order_By>;
  is_excluded_from_search?: Maybe<Order_By>;
  is_published?: Maybe<Order_By>;
  is_suspended?: Maybe<Order_By>;
  store_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

export type Products_Pk_Columns_Input = {
  id: Scalars['String'];
};

export enum Products_Select_Column {
  CategoryId = 'category_id',
  CreatedAt = 'created_at',
  CurrentSnapshotId = 'current_snapshot_id',
  Id = 'id',
  IsDeleted = 'is_deleted',
  IsExcludedFromRecommendations = 'is_excluded_from_recommendations',
  IsExcludedFromSearch = 'is_excluded_from_search',
  IsPublished = 'is_published',
  IsSuspended = 'is_suspended',
  StoreId = 'store_id',
  UpdatedAt = 'updated_at'
}

export type Products_Set_Input = {
  category_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  current_snapshot_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  is_deleted?: Maybe<Scalars['Boolean']>;
  is_excluded_from_recommendations?: Maybe<Scalars['Boolean']>;
  is_excluded_from_search?: Maybe<Scalars['Boolean']>;
  is_published?: Maybe<Scalars['Boolean']>;
  is_suspended?: Maybe<Scalars['Boolean']>;
  store_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export enum Products_Update_Column {
  CategoryId = 'category_id',
  CreatedAt = 'created_at',
  CurrentSnapshotId = 'current_snapshot_id',
  Id = 'id',
  IsDeleted = 'is_deleted',
  IsExcludedFromRecommendations = 'is_excluded_from_recommendations',
  IsExcludedFromSearch = 'is_excluded_from_search',
  IsPublished = 'is_published',
  IsSuspended = 'is_suspended',
  StoreId = 'store_id',
  UpdatedAt = 'updated_at'
}

export type Profile = {
   __typename?: 'profile';
  id: Scalars['uuid'];
  name: Scalars['String'];
};

export type Profile_Aggregate = {
   __typename?: 'profile_aggregate';
  aggregate?: Maybe<Profile_Aggregate_Fields>;
  nodes: Array<Profile>;
};

export type Profile_Aggregate_Fields = {
   __typename?: 'profile_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Profile_Max_Fields>;
  min?: Maybe<Profile_Min_Fields>;
};


export type Profile_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Profile_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Profile_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Profile_Max_Order_By>;
  min?: Maybe<Profile_Min_Order_By>;
};

export type Profile_Arr_Rel_Insert_Input = {
  data: Array<Profile_Insert_Input>;
  on_conflict?: Maybe<Profile_On_Conflict>;
};

export type Profile_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Profile_Bool_Exp>>>;
  _not?: Maybe<Profile_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Profile_Bool_Exp>>>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

export enum Profile_Constraint {
  ProfilePkey = 'profile_pkey'
}

export type Profile_Insert_Input = {
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

export type Profile_Max_Fields = {
   __typename?: 'profile_max_fields';
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

export type Profile_Max_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

export type Profile_Min_Fields = {
   __typename?: 'profile_min_fields';
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

export type Profile_Min_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

export type Profile_Mutation_Response = {
   __typename?: 'profile_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Profile>;
};

export type Profile_Obj_Rel_Insert_Input = {
  data: Profile_Insert_Input;
  on_conflict?: Maybe<Profile_On_Conflict>;
};

export type Profile_On_Conflict = {
  constraint: Profile_Constraint;
  update_columns: Array<Profile_Update_Column>;
  where?: Maybe<Profile_Bool_Exp>;
};

export type Profile_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

export type Profile_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

export enum Profile_Select_Column {
  Id = 'id',
  Name = 'name'
}

export type Profile_Set_Input = {
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

export enum Profile_Update_Column {
  Id = 'id',
  Name = 'name'
}

export type Query_Root = {
   __typename?: 'query_root';
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
  profile: Array<Profile>;
  profile_aggregate: Profile_Aggregate;
  profile_by_pk?: Maybe<Profile>;
  users: Array<Users>;
  users_aggregate: Users_Aggregate;
  users_by_pk?: Maybe<Users>;
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
  image_id: Scalars['String'];
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
  image_id: Scalars['String'];
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
  variant_id: Scalars['String'];
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
  product_file_id: Scalars['String'];
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
  product_file_id: Scalars['String'];
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
  variant_snapshot_id: Scalars['String'];
};


export type Query_RootProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
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


export type Query_RootProfileArgs = {
  distinct_on?: Maybe<Array<Profile_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profile_Order_By>>;
  where?: Maybe<Profile_Bool_Exp>;
};


export type Query_RootProfile_AggregateArgs = {
  distinct_on?: Maybe<Array<Profile_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profile_Order_By>>;
  where?: Maybe<Profile_Bool_Exp>;
};


export type Query_RootProfile_By_PkArgs = {
  id: Scalars['uuid'];
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
  profile: Array<Profile>;
  profile_aggregate: Profile_Aggregate;
  profile_by_pk?: Maybe<Profile>;
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
  image_id: Scalars['String'];
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
  image_id: Scalars['String'];
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
  variant_id: Scalars['String'];
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
  product_file_id: Scalars['String'];
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
  product_file_id: Scalars['String'];
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
  variant_snapshot_id: Scalars['String'];
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


export type Subscription_RootProfileArgs = {
  distinct_on?: Maybe<Array<Profile_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profile_Order_By>>;
  where?: Maybe<Profile_Bool_Exp>;
};


export type Subscription_RootProfile_AggregateArgs = {
  distinct_on?: Maybe<Array<Profile_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profile_Order_By>>;
  where?: Maybe<Profile_Bool_Exp>;
};


export type Subscription_RootProfile_By_PkArgs = {
  id: Scalars['uuid'];
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

export type Users = {
   __typename?: 'users';
  cart_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  default_payment_method_id?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  email_verified?: Maybe<Scalars['Boolean']>;
  first_name?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  is_deleted: Scalars['Boolean'];
  is_suspended: Scalars['Boolean'];
  last_name?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  password_hash: Scalars['String'];
  payout_method_id?: Maybe<Scalars['String']>;
  payout_split_id?: Maybe<Scalars['String']>;
  seller_referred_by_id?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['String']>;
  stripe_customer_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_role?: Maybe<Scalars['String']>;
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
  cart_id?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  default_payment_method_id?: Maybe<String_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  email_verified?: Maybe<Boolean_Comparison_Exp>;
  first_name?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  is_deleted?: Maybe<Boolean_Comparison_Exp>;
  is_suspended?: Maybe<Boolean_Comparison_Exp>;
  last_name?: Maybe<String_Comparison_Exp>;
  last_seen?: Maybe<Timestamptz_Comparison_Exp>;
  password_hash?: Maybe<String_Comparison_Exp>;
  payout_method_id?: Maybe<String_Comparison_Exp>;
  payout_split_id?: Maybe<String_Comparison_Exp>;
  seller_referred_by_id?: Maybe<String_Comparison_Exp>;
  store_id?: Maybe<String_Comparison_Exp>;
  stripe_customer_id?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user_role?: Maybe<String_Comparison_Exp>;
  username?: Maybe<String_Comparison_Exp>;
};

export enum Users_Constraint {
  UsersPkey = 'users_pkey'
}

export type Users_Insert_Input = {
  cart_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  default_payment_method_id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['Boolean']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  is_deleted?: Maybe<Scalars['Boolean']>;
  is_suspended?: Maybe<Scalars['Boolean']>;
  last_name?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  password_hash?: Maybe<Scalars['String']>;
  payout_method_id?: Maybe<Scalars['String']>;
  payout_split_id?: Maybe<Scalars['String']>;
  seller_referred_by_id?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['String']>;
  stripe_customer_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_role?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Users_Max_Fields = {
   __typename?: 'users_max_fields';
  cart_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  default_payment_method_id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  password_hash?: Maybe<Scalars['String']>;
  payout_method_id?: Maybe<Scalars['String']>;
  payout_split_id?: Maybe<Scalars['String']>;
  seller_referred_by_id?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['String']>;
  stripe_customer_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_role?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Users_Max_Order_By = {
  cart_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  default_payment_method_id?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  password_hash?: Maybe<Order_By>;
  payout_method_id?: Maybe<Order_By>;
  payout_split_id?: Maybe<Order_By>;
  seller_referred_by_id?: Maybe<Order_By>;
  store_id?: Maybe<Order_By>;
  stripe_customer_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_role?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

export type Users_Min_Fields = {
   __typename?: 'users_min_fields';
  cart_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  default_payment_method_id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  password_hash?: Maybe<Scalars['String']>;
  payout_method_id?: Maybe<Scalars['String']>;
  payout_split_id?: Maybe<Scalars['String']>;
  seller_referred_by_id?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['String']>;
  stripe_customer_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_role?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Users_Min_Order_By = {
  cart_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  default_payment_method_id?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  password_hash?: Maybe<Order_By>;
  payout_method_id?: Maybe<Order_By>;
  payout_split_id?: Maybe<Order_By>;
  seller_referred_by_id?: Maybe<Order_By>;
  store_id?: Maybe<Order_By>;
  stripe_customer_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_role?: Maybe<Order_By>;
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
  cart_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  default_payment_method_id?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  email_verified?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  is_deleted?: Maybe<Order_By>;
  is_suspended?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  password_hash?: Maybe<Order_By>;
  payout_method_id?: Maybe<Order_By>;
  payout_split_id?: Maybe<Order_By>;
  seller_referred_by_id?: Maybe<Order_By>;
  store_id?: Maybe<Order_By>;
  stripe_customer_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_role?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

export type Users_Pk_Columns_Input = {
  id: Scalars['String'];
};

export enum Users_Select_Column {
  CartId = 'cart_id',
  CreatedAt = 'created_at',
  DefaultPaymentMethodId = 'default_payment_method_id',
  Email = 'email',
  EmailVerified = 'email_verified',
  FirstName = 'first_name',
  Id = 'id',
  IsDeleted = 'is_deleted',
  IsSuspended = 'is_suspended',
  LastName = 'last_name',
  LastSeen = 'last_seen',
  PasswordHash = 'password_hash',
  PayoutMethodId = 'payout_method_id',
  PayoutSplitId = 'payout_split_id',
  SellerReferredById = 'seller_referred_by_id',
  StoreId = 'store_id',
  StripeCustomerId = 'stripe_customer_id',
  UpdatedAt = 'updated_at',
  UserRole = 'user_role',
  Username = 'username'
}

export type Users_Set_Input = {
  cart_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  default_payment_method_id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['Boolean']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  is_deleted?: Maybe<Scalars['Boolean']>;
  is_suspended?: Maybe<Scalars['Boolean']>;
  last_name?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  password_hash?: Maybe<Scalars['String']>;
  payout_method_id?: Maybe<Scalars['String']>;
  payout_split_id?: Maybe<Scalars['String']>;
  seller_referred_by_id?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['String']>;
  stripe_customer_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_role?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export enum Users_Update_Column {
  CartId = 'cart_id',
  CreatedAt = 'created_at',
  DefaultPaymentMethodId = 'default_payment_method_id',
  Email = 'email',
  EmailVerified = 'email_verified',
  FirstName = 'first_name',
  Id = 'id',
  IsDeleted = 'is_deleted',
  IsSuspended = 'is_suspended',
  LastName = 'last_name',
  LastSeen = 'last_seen',
  PasswordHash = 'password_hash',
  PayoutMethodId = 'payout_method_id',
  PayoutSplitId = 'payout_split_id',
  SellerReferredById = 'seller_referred_by_id',
  StoreId = 'store_id',
  StripeCustomerId = 'stripe_customer_id',
  UpdatedAt = 'updated_at',
  UserRole = 'user_role',
  Username = 'username'
}


export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type Unnamed_1_MutationVariables = {};


export type Unnamed_1_Mutation = (
  { __typename?: 'mutation_root' }
  & { insert_image_parents?: Maybe<(
    { __typename?: 'image_parents_mutation_response' }
    & Pick<Image_Parents_Mutation_Response, 'affected_rows'>
  )>, insert_image_variants?: Maybe<(
    { __typename?: 'image_variants_mutation_response' }
    & Pick<Image_Variants_Mutation_Response, 'affected_rows'>
  )>, insert_product_preview_items?: Maybe<(
    { __typename?: 'product_preview_items_mutation_response' }
    & Pick<Product_Preview_Items_Mutation_Response, 'affected_rows'>
  )>, insert_product_variants?: Maybe<(
    { __typename?: 'product_variants_mutation_response' }
    & Pick<Product_Variants_Mutation_Response, 'affected_rows'>
  )>, insert_product_snapshots?: Maybe<(
    { __typename?: 'product_snapshots_mutation_response' }
    & Pick<Product_Snapshots_Mutation_Response, 'affected_rows'>
  )>, insert_products?: Maybe<(
    { __typename?: 'products_mutation_response' }
    & Pick<Products_Mutation_Response, 'affected_rows'>
  )> }
);

export type Unnamed_2_QueryVariables = {};


export type Unnamed_2_Query = (
  { __typename?: 'query_root' }
  & { products: Array<(
    { __typename?: 'products' }
    & Pick<Products, 'id' | 'store_id' | 'is_deleted' | 'is_published' | 'is_suspended' | 'is_excluded_from_search' | 'is_excluded_from_recommendations' | 'category_id' | 'created_at' | 'updated_at'>
    & { current_snapshot: (
      { __typename?: 'product_snapshots' }
      & Pick<Product_Snapshots, 'id' | 'created_at' | 'product_id' | 'title' | 'description' | 'condition' | 'make' | 'model' | 'ammo_type' | 'action_type' | 'bore_diameter' | 'serial_number' | 'location' | 'dealer'>
      & { current_variants: Array<(
        { __typename?: 'product_variants' }
        & Pick<Product_Variants, 'variant_snapshot_id' | 'variant_id' | 'variant_name' | 'variant_description' | 'position' | 'is_default' | 'base_price'>
        & { preview_items: Array<(
          { __typename?: 'product_preview_items' }
          & Pick<Product_Preview_Items, 'id' | 'image_id' | 'position' | 'youtube_embed_link' | 'variant_snapshot_id'>
        )>, preview_items_aggregate: (
          { __typename?: 'product_preview_items_aggregate' }
          & { aggregate?: Maybe<(
            { __typename?: 'product_preview_items_aggregate_fields' }
            & Pick<Product_Preview_Items_Aggregate_Fields, 'count'>
          )> }
        ) }
      )> }
    ) }
  )> }
);

