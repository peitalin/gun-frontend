import { ProductEditInput } from "typings/gqlTypes";
import {
  productToProductEditInput,
  previewsToDzuPreviews,
} from "utils/conversions";
// Redux
import { batch } from "react-redux";
import { Dispatch } from "redux";
import { Actions } from "reduxStore/actions";




export const seedProductEditDataAction = (productEditInput: ProductEditInput) =>
(dispatch: Dispatch<any>) => {

  const actions = Actions.reduxProductEdit;

  batch(() => {
    dispatch(actions.UPDATE_PRODUCT_EDIT(productEditInput))
    dispatch(actions.SET_PREVIEW_ITEMS(
      previewsToDzuPreviews(product?.featuredVariant?.previewItems ?? [])
    ))
  })

}