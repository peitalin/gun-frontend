///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////


mutation {

  insert_image_parents(objects:[
    {
      image_id: "image_1",
      original_variant_id: "image_1",
    },
    {
      image_id: "image_2",
      original_variant_id: "image_2",
    },
  ]) {
    affected_rows
  }

  insert_image_variants(objects:[
    {
      variant_id: "image_1",
      parent_id: "image_1",
      mime_type: "image/jpeg",
      width_in_pixels: 1200,
      height_in_pixels: 720,
      size_in_bytes: 100
    },
    {
      variant_id: "image_1_600",
      parent_id: "image_1",
      mime_type: "image/jpeg",
      width_in_pixels: 600,
      height_in_pixels: 480,
      size_in_bytes: 100
    },
    {
      variant_id: "image_2",
      parent_id: "image_2",
      mime_type: "image/jpeg",
      width_in_pixels: 1200,
      height_in_pixels: 720,
      size_in_bytes: 100
    },
    {
      variant_id: "image_2_600",
      parent_id: "image_2",
      mime_type: "image/jpeg",
      width_in_pixels: 600,
      height_in_pixels: 480,
      size_in_bytes: 100
    }
  ]) {
    affected_rows
  }

  insert_product_preview_items(objects:[
    {
      id: "preview_item_1",
      position: 0,
      image_id: "image_1",
      youtube_embed_link: null,
    },
    {
      id: "preview_item_2",
      position: 1,
      image_id: "image_2",
      youtube_embed_link: null,
    }
  ]) {
    affected_rows
  }

  insert_product_variants(objects:[
    {
      variant_snapshot_id: "pvs_prod_snapshot_1_prod_variant_1",
      variant_id: "prod_variant_1",
      snapshot_id: "prod_snapshot_1",
      product_id: "prod_1",
      store_id: "store_1",
      variant_name: "gun1 variant1",
      variant_description: "gun1 variant1 description",
      position: 0,
      is_default: true,
      base_price: 1500,
      preview_item_ids: "{preview_item_1}"
    },
    {
      variant_snapshot_id: "pvs_prod_snapshot_1_prod_variant_2",
      variant_id: "prod_variant_2",
      snapshot_id: "prod_snapshot_1",
      product_id: "prod_1",
      store_id: "store_1",
      variant_name: "gun1 variant2",
      variant_description: "gun1 variant2 description",
      position: 0,
      is_default: true,
      base_price: 1600,
      preview_item_ids: "{preview_item_2}"
    },
  ]) {
    affected_rows
  }

  insert_product_snapshots(objects:[
    {
      id: "prod_snapshot_1",
      product_id: "prod_1",
      name: "gun1",
      tagline: "some gun1",
      description: "some gun1 description",
      location: "some gun1 location",
      dealer: "some gun1 dealer"
    },
  ]) {
    affected_rows
  }

  insert_products(objects:[
    {
      id: "prod_1",
      current_snapshot_id: "prod_snapshot_1",
      store_id: "store_1",
    },
  ]) {
    affected_rows
  }
}


/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

query {
  products {
    id
    store_id
    current_snapshot {
      id
      name
      current_variants {
        variant_id
        variant_name
      }
    }
  }
}
