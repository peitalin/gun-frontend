
import { ReduxStateProductEdit } from "./product_edit-reducer";
import { ActionType } from "./actions";
import { ID, ProductEditInput } from "typings/gqlTypes";
import { EditVariantInput } from "./product_create-actions";
import {
  DzuFilePreview,
  DzuPreviewOrder,
  DzuPreviewItem
} from "typings/dropzone";



export const reduxProductEditActions = {

  UPDATE_PRODUCT_EDIT: (payload?: ProductEditInput): ActionType<ProductEditInput> => ({
    type: "PRODUCT_EDIT_UPDATE_PRODUCT_EDIT",
    payload: payload
  }),

  UPDATE_TITLE: (payload?: string): ActionType<string> => ({
    type: "PRODUCT_EDIT_UPDATE_TITLE",
    payload: payload
  }),

  UPDATE_DESCRIPTION: (payload?: string): ActionType<string> => ({
    type: "PRODUCT_EDIT_UPDATE_DESCRIPTION",
    payload: payload
  }),

  UPDATE_CATEGORY_ID: (payload?: ID): ActionType<ID> => ({
    type: "PRODUCT_EDIT_UPDATE_CATEGORY_ID",
    payload: payload
  }),

  UPDATE_PRODUCT_ID: (payload?: ID): ActionType<ID> => ({
    type: "PRODUCT_EDIT_UPDATE_PRODUCT_ID",
    payload: payload
  }),

  UPDATE_TAGS: (payload?: string[]): ActionType<string[]> => ({
    type: "PRODUCT_EDIT_UPDATE_TAGS",
    payload: payload
  }),

  IS_PUBLISHED: (payload?: boolean): ActionType<boolean> => ({
    type: "PRODUCT_EDIT_PUBLISH_IMMEDIATELY",
    payload: payload
  }),

  /////// Variants ////////

  ADD_VARIANTS: (payload?: EditVariantInput[]): ActionType<EditVariantInput[]> => ({
    type: "PRODUCT_EDIT_ADD_VARIANTS",
    payload: payload
  }),

  REMOVE_VARIANT: (payload?: number): ActionType<number> => ({
    type: "PRODUCT_EDIT_REMOVE_VARIANT",
    payload: payload
  }),

  SET_IS_DEFAULT: (payload?: number): ActionType<number> => ({
    type: "PRODUCT_EDIT_SET_IS_DEFAULT",
    payload: payload
  }),

  UPDATE_PRICE: (
    payload?: { price: number, position: number }
  ): ActionType<{ price: number, position: number }> => ({
    type: "PRODUCT_EDIT_UPDATE_PRICE",
    payload: payload
  }),

  UPDATE_PRICE_WAS: (
    payload?: { priceWas: number, position: number }
  ): ActionType<{ priceWas: number, position: number }> => ({
    type: "PRODUCT_EDIT_UPDATE_PRICE_WAS",
    payload: payload
  }),

  UPDATE_VARIANT_NAME: (
    payload?: { variantName: string, position: number }
  ): ActionType<{ variantName: string, position: number }> => ({
    type: "PRODUCT_EDIT_UPDATE_VARIANT_NAME",
    payload: payload
  }),

  UPDATE_VARIANT_DESCRIPTION: (
    payload?: { variantDescription: string, position: number }
  ): ActionType<{ variantDescription: string, position: number }> => ({
    type: "PRODUCT_EDIT_UPDATE_VARIANT_DESCRIPTION",
    payload: payload
  }),

  ///// UPLOADER /////

  SET_PREVIEW_ITEMS: (
    payload?: DzuPreviewItem[]
  ): ActionType<DzuPreviewItem[]> => ({
    type: "PRODUCT_EDIT_SET_PREVIEW_ITEMS",
    payload: payload
  }),

  ADD_PREVIEW_ITEMS: (
    payload?: DzuPreviewItem[]
  ): ActionType<DzuPreviewItem[]> => ({
    type: "PRODUCT_EDIT_ADD_PREVIEW_ITEMS",
    payload: payload
  }),

  UPDATE_PREVIEW_ITEM: (
    payload?: DzuPreviewItem
  ): ActionType<DzuPreviewItem> => ({
    type: "PRODUCT_EDIT_UPDATE_PREVIEW_ITEM",
    payload: payload
  }),

  REMOVE_PREVIEW_ITEMS: (
    payload?: ID[]
  ): ActionType<ID[]> => ({
    type: "PRODUCT_EDIT_REMOVE_PREVIEW_ITEMS",
    payload: payload
  }),

  REORDER_PREVIEW_ITEMS: (
    payload?: DzuPreviewItem[]
  ): ActionType<DzuPreviewItem[]> => ({
    type: "PRODUCT_EDIT_REORDER_PREVIEW_ITEMS",
    payload: payload
  }),

  SET_DZU_PREVIEW_ORDER: (
    payload?: DzuPreviewOrder[]
  ): ActionType<DzuPreviewOrder[]> => ({
    type: "PRODUCT_EDIT_SET_DZU_PREVIEW_ORDER",
    payload: payload
  }),

  ADD_DZU_PREVIEW_ORDER: (
    payload?: DzuPreviewOrder[]
  ): ActionType<DzuPreviewOrder[]> => ({
    type: "PRODUCT_EDIT_ADD_DZU_PREVIEW_ORDER",
    payload: payload
  }),

  UPDATE_DZU_PREVIEW_ORDER: (
    payload?: DzuPreviewOrder
  ): ActionType<DzuPreviewOrder> => ({
    type: "PRODUCT_EDIT_UPDATE_DZU_PREVIEW_ORDER",
    payload: payload
  }),

  REMOVE_DZU_PREVIEW_ORDER: (payload?: ID[]): ActionType<ID[]> => ({
    type: "PRODUCT_EDIT_REMOVE_DZU_PREVIEW_ORDER",
    payload: payload
  }),

  REORDER_DZU_PREVIEW_ORDER: (
    payload?: DzuPreviewOrder[]
  ): ActionType<DzuPreviewOrder[]> => ({
    type: "PRODUCT_EDIT_REORDER_DZU_PREVIEW_ORDER",
    payload: payload
  }),

  RESET_DZU_PREVIEW_ORDER: (payload?: null): ActionType<null> => ({
    type: "PRODUCT_EDIT_RESET_DZU_PREVIEW_ORDER",
    payload: payload
  }),

  RESET_PRODUCT_EDIT: (payload?: null): ActionType<null> => ({
    type: "PRODUCT_EDIT_RESET_PRODUCT_EDIT",
    payload: payload
  }),

}
