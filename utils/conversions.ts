import {
  Product,
  ProductEditInput,
  ProductVariantEditInput,
} from "typings/gqlTypes";
import { oc as option } from "ts-optchain";
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
      boreDiameter: "",
      serialNumber: "",
      location: "",
      dealer: "",
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
    currentVariants: product.currentVariants.map(variant => {
      return {
        variantId: variant.variantId,
        variantName: variant.variantName,
        variantDescription: variant.variantDescription,
        priceWas: variant.priceWas,
        price: variant.price,
        isDefault: variant.isDefault,
        previewItems: variant.previewItems.map((p, index) => ({
          // id: p.id,
          // position: index,
          imageId: option(p).image.id(),
          youTubeEmbedLink: p.youTubeEmbedLink,
        })),
      } as ProductVariantEditInput
    }),
    tags: product.tags,
    isPublished: product.isPublished,
    condition: product.currentSnapshot.condition,
    make: product.currentSnapshot.make,
    model: product.currentSnapshot.model,
    ammoType: product.currentSnapshot.ammoType,
    actionType: product.currentSnapshot.actionType,
    boreDiameter: product.currentSnapshot.boreDiameter,
    serialNumber: product.currentSnapshot.serialNumber,
    location: product.currentSnapshot.location,
    dealer: product.currentSnapshot.dealer,
  };
}
