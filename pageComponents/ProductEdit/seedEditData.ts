import { Product } from "typings/gqlTypes";
import {
  productToProductEditInput,
  filesToDzuFiles,
  previewsToDzuPreviews,
} from "utils/conversions";
import { oc as option } from "ts-optchain";
// Redux
import { batch } from "react-redux";
import { Dispatch } from "redux";
import { Actions } from "reduxStore/actions";




export const seedProductEditDataAction = (product: Product) =>
(dispatch: Dispatch<any>) => {

  const actions = Actions.reduxProductEdit;
  // console.log("converting product", product)
  const productEditInput = productToProductEditInput(product);
  console.log("seeding productedit data into redux", productEditInput)

  batch(() => {
    dispatch(actions.UPDATE_PRODUCT_EDIT(productEditInput))
    dispatch(actions.SET_DZU_FILES(
      filesToDzuFiles(option(product).featuredVariant.files([]))
    ))
    dispatch(actions.SET_PREVIEW_ITEMS(
      previewsToDzuPreviews(option(product).featuredVariant.previewItems([]))
    ))
  })

}