import gql from "graphql-tag";

export const CREATE_PRODUCT_GUN = gql`
mutation {

  insert_image_parents(objects:[
    {
      imageId: "image_1",
      originalVariantId: "image_1",
    },
    {
      imageId: "image_2",
      originalVariantId: "image_2",
    },
  ]) {
    affected_rows
  }

  insert_image_variants(objects:[
    {
      variantId: "image_1",
      parentId: "image_1",
      mimeType: "image/jpeg",
      widthInPixels: 1200,
      heightInPixels: 720,
      sizeInBytes: 100
    },
    {
      variantId: "image_1_600",
      parentId: "image_1",
      mimeType: "image/jpeg",
      widthInPixels: 600,
      heightInPixels: 480,
      sizeInBytes: 100
    },
    {
      variantId: "image_2",
      parentId: "image_2",
      mimeType: "image/jpeg",
      widthInPixels: 1200,
      heightInPixels: 720,
      sizeInBytes: 100
    },
    {
      variantId: "image_2_600",
      parentId: "image_2",
      mimeType: "image/jpeg",
      widthInPixels: 600,
      heightInPixels: 480,
      sizeInBytes: 100
    }
  ]) {
    affected_rows
  }

  insert_product_preview_items(objects:[
    {
      id: "preview_item_1",
      position: 0,
      imageId: "image_1",
      youtubeEmbedLink: null,
      variantSnapshotId: "pvs_prod_snapshot_1_prod_variant_1",
    },
    {
      id: "preview_item_2",
      position: 1,
      imageId: "image_2",
      youtubeEmbedLink: null,
      variantSnapshotId: "pvs_prod_snapshot_1_prod_variant_1",
    },
    {
      id: "preview_item_3",
      position: 0,
      imageId: "image_1",
      youtubeEmbedLink: null,
      variantSnapshotId: "pvs_prod_snapshot_1_prod_variant_2",
    },
  ]) {
    affected_rows
  }

  insert_product_variants(objects:[
    {
      variantSnapshotId: "pvs_prod_snapshot_1_prod_variant_1",
      variantId: "prod_variant_1",
      snapshotId: "prod_snapshot_1",
      productId: "prod_1",
      storeId: "store_1",
      variantName: "0.22WMR Caliber",
      variantDescription: "gun1 variant1 0.22 caliber",
      position: 0,
      isDefault: true,
      basePrice: 1500,
    },
    {
      variantSnapshotId: "pvs_prod_snapshot_1_prod_variant_2",
      variantId: "prod_variant_2",
      snapshotId: "prod_snapshot_1",
      productId: "prod_1",
      storeId: "store_1",
      variantName: "0.308 Caliber",
      variantDescription: "gun1 variant2 0.308 caliber",
      position: 0,
      isDefault: false,
      basePrice: 1800,
    },
  ]) {
    affected_rows
  }

  insert_product_snapshots(objects:[
    {
      id: "prod_snapshot_1",
      productId: "prod_1",
      title: "gun1",
      description: "some gun1 description",
      condition: "very good",
      make: "Henry",
      model: "H001M",
      ammoType: "Rimfire",
      actionType: "Lever",
      boreDiameter: "0.224",
      serialNumber: "M222956H",
      location: "some gun1 location",
      dealer: "some gun1 dealer"
    },
  ]) {
    affected_rows
  }

  insert_products(objects:[
    {
      id: "prod_1",
      currentSnapshotId: "prod_snapshot_1",
      storeId: "store_1",
      categoryId: "category_1",
    },
  ]) {
    affected_rows
  }
}
`;
