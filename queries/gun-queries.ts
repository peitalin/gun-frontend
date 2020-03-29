import gql from "graphql-tag";

export const GET_PRODUCTS = gql`
query {
  products {
    id
    store_id
    is_deleted
    is_published
    is_suspended
    is_excluded_from_search
    is_excluded_from_recommendations
    category_id
    created_at
    updated_at
    current_snapshot {
      id
      created_at
      product_id
      title
      description
      condition
      make
      model
      ammo_type
      action_type
      bore_diameter
      serial_number
      location
      dealer
      current_variants {
        variant_snapshot_id
        variant_id
        variant_name
        variant_description
        position
        is_default
        base_price
        preview_items {
          id
          image_id
          position
          youtube_embed_link
          variant_snapshot_id
        }
        preview_items_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
}
`;

