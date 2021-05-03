import { ReduxStateModals } from "./modals-reducer";
import { ActionType } from "./actions";


export const reduxModalsActions = {

  TOGGLE_PRODUCT_CREATE_MODAL: (payload?: boolean): ActionType<boolean> => ({
    type: "TOGGLE_PRODUCT_CREATE_MODAL",
    payload: payload
  }),

  TOGGLE_PRODUCT_EDIT_MODAL: (payload?: boolean): ActionType<boolean> => ({
    type: "TOGGLE_PRODUCT_EDIT_MODAL",
    payload: payload
  }),

  TOGGLE_STORE_CREATE_MODAL: (payload?: boolean): ActionType<boolean> => ({
    type: "TOGGLE_STORE_CREATE_MODAL",
    payload: payload
  }),

  TOGGLE_MY_SETTINGS_MODAL: (payload?: boolean): ActionType<boolean> => ({
    type: "TOGGLE_MY_SETTINGS_MODAL",
    payload: payload
  }),

  TOGGLE_CONTACT_US_MODAL: (payload?: boolean): ActionType<boolean> => ({
    type: "TOGGLE_CONTACT_US_MODAL",
    payload: payload
  }),

  TOGGLE_PREVIEW_ITEM_MODAL: (payload?: boolean): ActionType<boolean> => ({
    type: "TOGGLE_PREVIEW_ITEM_MODAL",
    payload: payload
  }),

  TOGGLE_SHARE_LINK_MODAL: (payload?: boolean): ActionType<boolean> => ({
    type: "TOGGLE_SHARE_LINK_MODAL",
    payload: payload
  }),

  TOGGLE_GIFT_DOWNLOAD_MODAL: (payload?: boolean): ActionType<boolean> => ({
    type: "TOGGLE_GIFT_DOWNLOAD_MODAL",
    payload: payload
  }),

  TOGGLE_LOGIN_MODAL: (payload?: boolean): ActionType<boolean> => ({
    type: "TOGGLE_LOGIN_MODAL",
    payload: payload
  }),

  TOGGLE_SELLER_PROFILE_EDIT_MODAL: (payload?: boolean): ActionType<boolean> => ({
    type: "TOGGLE_SELLER_PROFILE_EDIT_MODAL",
    payload: payload
  }),

  TOGGLE_DEALER_PROFILE_EDIT_MODAL: (payload?: boolean): ActionType<boolean> => ({
    type: "TOGGLE_DEALER_PROFILE_EDIT_MODAL",
    payload: payload
  }),

  TOGGLE_CHECKOUT_MODAL: (payload?: boolean): ActionType<boolean> => ({
    type: "TOGGLE_CHECKOUT_MODAL",
    payload: payload
  }),

  TOGGLE_STORE_PROMO_CODE_CREATE_MODAL: (payload?: boolean): ActionType<boolean> => ({
    type: "TOGGLE_STORE_PROMO_CODE_CREATE_MODAL",
    payload: payload
  }),

  TOGGLE_BIDDING_ROOM_MODAL: (payload?: boolean): ActionType<boolean> => ({
    type: "TOGGLE_BIDDING_ROOM_MODAL",
    payload: payload
  }),

  TOGGLE_PROMOTED_SLOT_PURCHASE_MODAL: (payload?: boolean): ActionType<boolean> => ({
    type: "TOGGLE_PROMOTED_SLOT_PURCHASE_MODAL",
    payload: payload
  }),

}
