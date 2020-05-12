import { ReduxStateProductCreate } from "./product_create-reducer";
import { ActionType } from "./actions";
type ActionProductCreate = ActionType<ReduxStateProductCreate>;
import { ID } from "typings/gqlTypes";
import {
  DzuFilePreview,
  DzuPreviewOrder,
  DzuPreviewItem
} from "typings/dropzone";


export interface AddVariantInput {
  variantName: string;
  variantDescription: string;
  price: number;
  priceWas: number;
  isDefault: boolean;
}
export interface EditVariantInput extends AddVariantInput {
  variantId: string;
}


export const reduxProductCreateActions = {

  UPDATE_PRODUCT_CREATE: (payload?: ReduxStateProductCreate): ActionProductCreate => ({
    type: "PRODUCT_CREATE_UPDATE_PRODUCT_CREATE",
    payload: payload
  }),

  UPDATE_TITLE: (payload?: string): ActionType<string> => ({
    type: "PRODUCT_CREATE_UPDATE_TITLE",
    payload: payload
  }),

  UPDATE_DESCRIPTION: (payload?: string): ActionType<string> => ({
    type: "PRODUCT_CREATE_UPDATE_DESCRIPTION",
    payload: payload
  }),

  UPDATE_CATEGORY_ID: (payload?: ID): ActionType<ID> => ({
    type: "PRODUCT_CREATE_UPDATE_CATEGORY_ID",
    payload: payload
  }),

  UPDATE_STORE_ID: (payload?: ID): ActionType<ID> => ({
    type: "PRODUCT_CREATE_UPDATE_STORE_ID",
    payload: payload
  }),

  UPDATE_TAGS: (payload?: string[]): ActionType<string[]> => ({
    type: "PRODUCT_CREATE_UPDATE_TAGS",
    payload: payload
  }),

  PUBLISH_IMMEDIATELY: (payload?: boolean): ActionType<boolean> => ({
    type: "PRODUCT_CREATE_PUBLISH_IMMEDIATELY",
    payload: payload
  }),

  /////// Variants ////////

  ADD_VARIANTS: (payload?: AddVariantInput[]): ActionType<AddVariantInput[]> => ({
    type: "PRODUCT_CREATE_ADD_VARIANTS",
    payload: payload
  }),

  REMOVE_VARIANT: (payload?: number): ActionType<number> => ({
    type: "PRODUCT_CREATE_REMOVE_VARIANT",
    payload: payload
  }),

  SET_IS_DEFAULT: (payload?: number): ActionType<number> => ({
    type: "PRODUCT_CREATE_SET_IS_DEFAULT",
    payload: payload
  }),

  UPDATE_PRICE: (
    payload?: { price: number, position: number }
  ): ActionType<{ price: number, position: number }> => ({
    type: "PRODUCT_CREATE_UPDATE_PRICE",
    payload: payload
  }),

  UPDATE_PRICE_WAS: (
    payload?: { priceWas: number, position: number }
  ): ActionType<{ priceWas: number, position: number }> => ({
    type: "PRODUCT_CREATE_UPDATE_PRICE_WAS",
    payload: payload
  }),

  UPDATE_VARIANT_NAME: (
    payload?: { variantName: string, position: number }
  ): ActionType<{ variantName: string, position: number }> => ({
    type: "PRODUCT_CREATE_UPDATE_VARIANT_NAME",
    payload: payload
  }),

  UPDATE_VARIANT_DESCRIPTION: (
    payload?: { variantDescription: string, position: number }
  ): ActionType<{ variantDescription: string, position: number }> => ({
    type: "PRODUCT_CREATE_UPDATE_VARIANT_DESCRIPTION",
    payload: payload
  }),

  ///// UPLOADER /////

  SET_PREVIEW_ITEMS: (
    payload?: DzuPreviewItem[]
  ): ActionType<DzuPreviewItem[]> => ({
    type: "PRODUCT_CREATE_SET_PREVIEW_ITEMS",
    payload: payload
  }),

  ADD_PREVIEW_ITEMS: (
    payload?: DzuPreviewItem[]
  ): ActionType<DzuPreviewItem[]> => ({
    type: "PRODUCT_CREATE_ADD_PREVIEW_ITEMS",
    payload: payload
  }),

  UPDATE_PREVIEW_ITEM: (
    payload?: DzuPreviewItem
  ): ActionType<DzuPreviewItem> => ({
    type: "PRODUCT_CREATE_UPDATE_PREVIEW_ITEM",
    payload: payload
  }),

  REMOVE_PREVIEW_ITEMS: (
    payload?: ID[]
  ): ActionType<ID[]> => ({
    type: "PRODUCT_CREATE_REMOVE_PREVIEW_ITEMS",
    payload: payload
  }),

  REORDER_PREVIEW_ITEMS: (
    payload?: DzuPreviewItem[]
  ): ActionType<DzuPreviewItem[]> => ({
    type: "PRODUCT_CREATE_REORDER_PREVIEW_ITEMS",
    payload: payload
  }),

  SET_DZU_PREVIEW_ORDER: (
    payload?: DzuPreviewOrder[]
  ): ActionType<DzuPreviewOrder[]> => ({
    type: "PRODUCT_CREATE_SET_DZU_PREVIEW_ORDER",
    payload: payload
  }),

  ADD_DZU_PREVIEW_ORDER: (
    payload?: DzuPreviewOrder[]
  ): ActionType<DzuPreviewOrder[]> => ({
    type: "PRODUCT_CREATE_ADD_DZU_PREVIEW_ORDER",
    payload: payload
  }),

  UPDATE_DZU_PREVIEW_ORDER: (
    payload?: DzuPreviewOrder
  ): ActionType<DzuPreviewOrder> => ({
    type: "PRODUCT_CREATE_UPDATE_DZU_PREVIEW_ORDER",
    payload: payload
  }),

  REMOVE_DZU_PREVIEW_ORDER: (payload?: ID[]): ActionType<ID[]> => ({
    type: "PRODUCT_CREATE_REMOVE_DZU_PREVIEW_ORDER",
    payload: payload
  }),

  REORDER_DZU_PREVIEW_ORDER: (
    payload?: DzuPreviewOrder[]
  ): ActionType<DzuPreviewOrder[]> => ({
    type: "PRODUCT_CREATE_REORDER_DZU_PREVIEW_ORDER",
    payload: payload
  }),

  RESET_DZU_PREVIEW_ORDER: (payload?: null): ActionType<null> => ({
    type: "PRODUCT_CREATE_RESET_DZU_PREVIEW_ORDER",
    payload: payload
  }),

  RESET_PRODUCT_CREATE: (payload?: null): ActionType<null> => ({
    type: "PRODUCT_CREATE_RESET_PRODUCT_CREATE",
    payload: payload
  }),

}
