
import { ReduxStateImageSwap } from "./image_swap-reducer";
import { ActionType } from "./actions";
import { ID } from "typings/gqlTypes";
import {
  DzuPreviewOrder,
  DzuPreviewItem
} from "typings/dropzone";



export const reduxImageSwapActions = {

  ///// UPLOADER /////

  SET_PREVIEW_ITEMS: (
    payload?: DzuPreviewItem[]
  ): ActionType<DzuPreviewItem[]> => ({
    type: "IMAGE_SWAP_SET_PREVIEW_ITEMS",
    payload: payload
  }),

  ADD_PREVIEW_ITEMS: (
    payload?: DzuPreviewItem[]
  ): ActionType<DzuPreviewItem[]> => ({
    type: "IMAGE_SWAP_ADD_PREVIEW_ITEMS",
    payload: payload
  }),

  UPDATE_PREVIEW_ITEM: (
    payload?: DzuPreviewItem
  ): ActionType<DzuPreviewItem> => ({
    type: "IMAGE_SWAP_UPDATE_PREVIEW_ITEM",
    payload: payload
  }),

  REMOVE_PREVIEW_ITEMS: (
    payload?: ID[]
  ): ActionType<ID[]> => ({
    type: "IMAGE_SWAP_REMOVE_PREVIEW_ITEMS",
    payload: payload
  }),

  REORDER_PREVIEW_ITEMS: (
    payload?: DzuPreviewItem[]
  ): ActionType<DzuPreviewItem[]> => ({
    type: "IMAGE_SWAP_REORDER_PREVIEW_ITEMS",
    payload: payload
  }),

  SET_DZU_PREVIEW_ORDER: (
    payload?: DzuPreviewOrder[]
  ): ActionType<DzuPreviewOrder[]> => ({
    type: "IMAGE_SWAP_SET_DZU_PREVIEW_ORDER",
    payload: payload
  }),

  ADD_DZU_PREVIEW_ORDER: (
    payload?: DzuPreviewOrder[]
  ): ActionType<DzuPreviewOrder[]> => ({
    type: "IMAGE_SWAP_ADD_DZU_PREVIEW_ORDER",
    payload: payload
  }),

  UPDATE_DZU_PREVIEW_ORDER: (
    payload?: DzuPreviewOrder
  ): ActionType<DzuPreviewOrder> => ({
    type: "IMAGE_SWAP_UPDATE_DZU_PREVIEW_ORDER",
    payload: payload
  }),

  REMOVE_DZU_PREVIEW_ORDER: (payload?: ID[]): ActionType<ID[]> => ({
    type: "IMAGE_SWAP_REMOVE_DZU_PREVIEW_ORDER",
    payload: payload
  }),

  REORDER_DZU_PREVIEW_ORDER: (
    payload?: DzuPreviewOrder[]
  ): ActionType<DzuPreviewOrder[]> => ({
    type: "IMAGE_SWAP_REORDER_DZU_PREVIEW_ORDER",
    payload: payload
  }),

  RESET_DZU_PREVIEW_ORDER: (payload?: null): ActionType<null> => ({
    type: "IMAGE_SWAP_RESET_DZU_PREVIEW_ORDER",
    payload: payload
  }),

  RESET_IMAGE_SWAP: (payload?: null): ActionType<null> => ({
    type: "IMAGE_SWAP_RESET_IMAGE_SWAP",
    payload: payload
  }),

}
