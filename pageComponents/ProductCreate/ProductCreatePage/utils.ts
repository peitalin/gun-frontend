// Typings
import {
  ProductCreateInput,
  Product,
  Categories,
  ProductVariantInput,
  StorePrivate,
} from "typings/gqlTypes";
import {
  ProductCreateInputFrontEnd,
  ProductEditInputFrontEnd,
  ProductCreateEditCommonInput,
} from "typings"
import {
  ReducerName,
  DzuPreviewOrder,
  DzuPreviewItem,
} from "typings/dropzone";
// Validation
import { FormikErrors, useFormik } from 'formik';



export const productCreateInputToProduct = (
  p: ProductCreateInput,
  categories: Categories[],
  currentVariants: ProductVariantInput[],
  store: StorePrivate,
): Product => {

  let featuredVariant = currentVariants.find(v => v.isDefault)

  // let googleBucketUrl = process.env.NODE_ENV === "production"
  //   ? 'https://storage.googleapis.com/production-gunmarketplace-images/'
  //   : 'https://storage.googleapis.com/develop-gunmarketplace-images/'

  // moved everything to develop in production
  let googleBucketUrl =
    'https://storage.googleapis.com/production-gunmarketplace-images/'


  let previewFeaturedVariant = {
    ...featuredVariant,
    variantId: "variant_temp_1",
    previewItems: (featuredVariant?.previewItems ?? []).map(p => {
      let imageId = p?.imageId;
      if (imageId) {
        return {
          ...p,
          image: {
            original: {
              url: `${googleBucketUrl}${imageId}`
            }
          },
        }
      } else if (p.youTubeEmbedLink) {
        return {
          ...p,
          youTubeEmbedLink: p.youTubeEmbedLink
        }
      } else {
        return { ...p }
      }
    }),
    priceDetails: {
      actualPrice: featuredVariant.price,
      basePrice: featuredVariant.priceWas,
    },
  }

  // console.log("previewFeaturedVariant", previewFeaturedVariant)

  let product = {
    ...p,
    id: "product_preview",
    createdAt: new Date(),
    category: categories.find(c => c.id === p.categoryId),
    description: p.description,
    storeId: null, // <LinkLoading disable={!product.storeId}>
    store: store,
    snapshotId: "prod_snapshot_preview",
    snapshotCreatedAt: new Date(),
    currentSnapshot: {
      ...p,
    },
    isExcludedFromAutomaticLists: false,
    isExcludedFromSearch: false,
    isPublished: true, // to display ProductPreviewPage
    isDeleted: false,
    isSuspended: false,
    featuredVariant: previewFeaturedVariant,
  } as any
  // console.log("productCreateInputtoProduct:::", product)
  return product
}


export const isFormikDisabled = (
  errors: FormikErrors<ProductCreateInput>,
) => {
  let formikErrors = Object.keys(errors)
  return formikErrors.length > 0
}

export const printValidationErrors = (
  errors: FormikErrors<ProductCreateInput>,
  showMaxErrors: number
): string => {

  // watch out for nested objects which may not be strings
  // if using Object.values()
  let priceError = errors?.currentVariants?.[0]
  let priceWasError = errors?.currentVariants?.[0]
  let previewItemsError = errors?.currentVariants?.[0]

  let { currentVariants, ...filterErrors }: any = errors

  if (priceError) {
    filterErrors = { ...filterErrors, price: priceError }
  }
  if (priceWasError) {
    filterErrors = { ...filterErrors, priceWas: priceWasError }
  }
  if (previewItemsError) {
    filterErrors = { ...filterErrors, previewItems: previewItemsError }
  }

  let numExtraErrors = Object.keys(filterErrors).length - showMaxErrors

  const errorMsg = Object.keys(filterErrors).slice(0, showMaxErrors).join(", ")
  if (numExtraErrors > 0) {
    return `Please check: ${errorMsg}... and more`
  } else {
    return `Please check: ${errorMsg}`
  }
}

export const reduxToFormikCurrentVariants = ({
  productCreateInput,
  productEditInput,
  dzuPreviewItems,
  dzuPreviewOrder,
}: {
  productCreateInput?: ProductCreateInputFrontEnd,
  productEditInput?: ProductEditInputFrontEnd,
  dzuPreviewItems: DzuPreviewItem[],
  dzuPreviewOrder: DzuPreviewOrder[],
}): ProductVariantInput[] => {

  if (productCreateInput && productEditInput) {
    throw new Error ("cannot used both productCreateInput and productEditInput")
  }

  let productInput: ProductCreateInputFrontEnd | ProductEditInputFrontEnd
  if (productCreateInput) {
    productInput = productCreateInput
  }
  if (productEditInput) {
    productInput = productEditInput
  } else {
    throw new Error ("Must have either productCreateInput or productEditInput")
  }

  // pulls preview items from redux into each current variant in formik
  // we store just a single copy of preview items in redux, then duplicate
  // across all currentVariants in Formik before sending to backend.
  return (productInput?.currentVariants ?? []).map(v => {

    // pull preview items from redux into each current variant in formik
    let previewItems = dzuPreviewOrder.map(
      order => dzuPreviewItems.find(p => p.id === order.id)
    )
    .filter(pv => !!pv?.fileId || !!pv?.youTubeVimeoEmbedLink)
    .map(pv => {
      return {
        imageId: pv.fileId,
        youTubeEmbedLink: pv.youTubeVimeoEmbedLink,
      }
    })

    return {
      ...v,
      previewItems: previewItems,
    }
  })
}