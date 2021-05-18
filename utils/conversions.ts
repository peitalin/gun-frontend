import {
  Product,
  ProductEditInput,
  ProductVariantEditInput,
  Product_Preview_Items,
} from "typings/gqlTypes";
import { DzuPreviewItem } from "typings/dropzone";


export const productToProductEditInput = (
  product: Product,
): ProductEditInput => {

  if (!product) {
    return {
      productId: "",
      title: "",
      categoryId: "",
      description: "<p></p>",
      currentVariants: [],
      isPublished: false,
      allowBids: true,
      condition: "",
      make: "",
      model: "",
      ammoType: "",
      actionType: "",
      caliber: "",
      serialNumber: "",
      location: "",
      dealerId: "",
      magazineCapacity: "",
      barrelLength: "",
      sellerLicenseId: "",
    }
  }

  return {
    productId: product.id,
    title: product.currentSnapshot.title,
    categoryId: product.category.id,
    description: product.currentSnapshot.description,
    currentVariants: [
      {
        variantId: product.featuredVariant?.variantId,
        variantName: product.featuredVariant?.variantName,
        variantDescription: product.featuredVariant?.variantDescription,
        priceWas: product.featuredVariant?.priceWas,
        price: product.featuredVariant?.price,
        isDefault: product.featuredVariant?.isDefault,
        previewItems: (product.featuredVariant?.previewItems ?? [])
          .map((p, index) => ({
            imageId: p?.image?.id,
            youTubeEmbedLink: p.youTubeEmbedLink,
          }))
      } as ProductVariantEditInput
    ],
    isPublished: product.isPublished,
    allowBids: product.allowBids ?? true,
    condition: product.currentSnapshot.condition,
    make: product.currentSnapshot.make,
    model: product.currentSnapshot.model,
    ammoType: product.currentSnapshot.ammoType,
    actionType: product.currentSnapshot.actionType,
    caliber: product.currentSnapshot.caliber,
    serialNumber: product.currentSnapshot.serialNumber,
    location: product.currentSnapshot.location,
    dealerId: product.currentSnapshot.dealer.id,
    magazineCapacity: product.currentSnapshot.magazineCapacity,
    barrelLength: product.currentSnapshot.barrelLength,
    sellerLicenseId: product.sellerLicenseId,
  };
}

export const previewsToDzuPreviews = (
  previewItems: Product_Preview_Items[]
): DzuPreviewItem[] => {
  return previewItems.map(p => {
    return {
      id: p?.id,
      name: p?.image?.description,
      previewUrl: p?.image?.original?.url,
      fileId: p?.image?.id,
      percent: 100,
      size: p?.image?.original?.sizeInBytes,
      duration: null,
      status: 'done',
      fileWithMeta: null,
      youTubeVimeoEmbedLink: null,
    }
  })
}

