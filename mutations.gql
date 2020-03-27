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
      variant_snapshot_id: "pvs_prod_snapshot_1_prod_variant_1",
    },
    {
      id: "preview_item_2",
      position: 1,
      image_id: "image_2",
      youtube_embed_link: null,
      variant_snapshot_id: "pvs_prod_snapshot_1_prod_variant_1",
    },
    {
      id: "preview_item_3",
      position: 0,
      image_id: "image_1",
      youtube_embed_link: null,
      variant_snapshot_id: "pvs_prod_snapshot_1_prod_variant_2",
    },
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
      variant_name: "0.22WMR Caliber",
      variant_description: "gun1 variant1 0.22 caliber",
      position: 0,
      is_default: true,
      base_price: 1500,
    },
    {
      variant_snapshot_id: "pvs_prod_snapshot_1_prod_variant_2",
      variant_id: "prod_variant_2",
      snapshot_id: "prod_snapshot_1",
      product_id: "prod_1",
      store_id: "store_1",
      variant_name: "0.308 Caliber",
      variant_description: "gun1 variant2 0.308 caliber",
      position: 0,
      is_default: false,
      base_price: 1800,
    },
  ]) {
    affected_rows
  }

  insert_product_snapshots(objects:[
    {
      id: "prod_snapshot_1",
      product_id: "prod_1",
      title: "gun1",
      description: "some gun1 description",
      condition: "very good",
      make: "Henry",
      model: "H001M",
      ammo_type: "Rimfire",
      action_type: "Lever",
      bore_diameter: "0.224",
      serial_number: "M222956H",
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
      category_id: "category_1",
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
