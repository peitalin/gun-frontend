import gql from "graphql-tag";


export const CREATE_PRODUCT_GUN = gql`
mutation(
  $image_parents_input: [image_parents_insert_input!]!
  $image_variants_input: [image_variants_insert_input!]!
  $product_preview_items_input: [product_preview_items_insert_input!]!
  $product_variants_input: [product_variants_insert_input!]!
  $product_snapshots_input: [product_snapshots_insert_input!]!
  $products_input: [products_insert_input!]!
) {

  insert_image_parents(objects: $image_parents_input) {
    affected_rows
  }

  insert_image_variants(objects: $image_variants_input) {
    affected_rows
  }

  insert_product_preview_items(objects: $product_preview_items_input) {
    affected_rows
  }

  insert_product_variants(objects: $product_variants_input) {
    affected_rows
  }

  insert_product_snapshots(objects: $product_snapshots_input) {
    affected_rows
  }

  insert_products(objects: $products_input) {
    affected_rows
  }
}
`;
