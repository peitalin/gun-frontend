import {
  Product,
  ProductEditInput,
  ProductVariantEditInput,
  Product_Preview_Items,
} from "typings/gqlTypes";
import { oc as option } from "ts-optchain";
import { DzuPreviewItem } from "typings/dropzone";
import {
  deserialize,
} from "components/TextEditor/helpersDeserializers"


export const productToProductEditInput = (
  product: Product,
  toHtml?: boolean,
): ProductEditInput => {

  if (!product) {
    return {
      productId: "",
      title: "",
      categoryId: "",
      description: "",
      currentVariants: [],
      tags: [] as any,
      isPublished: false,
      condition: "",
      make: "",
      model: "",
      ammoType: "",
      actionType: "",
      caliber: "",
      serialNumber: "",
      location: "",
      dealerId: "",
      dealer: undefined,
    }
  }

  let description;

  if (!toHtml) {
    // parse html DOM from string
    let descriptionHtml = new DOMParser().parseFromString(
      product.currentSnapshot.description,
      'text/html'
    )
    // slate.js object representation
    description = deserialize(descriptionHtml.body)
    // console.log("deserialized slate obj", description)
  } else {
    description = product.currentSnapshot.description
  }

  return {
    productId: product.id,
    title: product.currentSnapshot.title,
    categoryId: product.category.id,
    description: description,
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
            imageId: option(p).image.id(),
            youTubeEmbedLink: p.youTubeEmbedLink,
          }))
      } as ProductVariantEditInput
    ],
    tags: product.tags,
    isPublished: product.isPublished,
    condition: product.currentSnapshot.condition,
    make: product.currentSnapshot.make,
    model: product.currentSnapshot.model,
    ammoType: product.currentSnapshot.ammoType,
    actionType: product.currentSnapshot.actionType,
    caliber: product.currentSnapshot.caliber,
    serialNumber: product.currentSnapshot.serialNumber,
    location: product.currentSnapshot.location,
    dealerId: product.currentSnapshot.dealer.id,
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

