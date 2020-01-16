
import { Dispatch } from "redux";
import { Actions } from "reduxStore/actions";


export const goToModalConnect = (
  dispatch: Dispatch,
) => {
  return {

    checkout: (state?: { skipRefreshCart: boolean }) => {
      dispatch(Actions.reduxModals.TOGGLE_CHECKOUT_MODAL(true))
    },

    productCreate: () => {
      dispatch(Actions.reduxModals.TOGGLE_PRODUCT_CREATE_MODAL(true))
    },

    productEdit: (productId: string) => {
      dispatch(Actions.reduxModals.TOGGLE_PRODUCT_EDIT_MODAL(true))
    },

    storeCreate: () => {
      dispatch(Actions.reduxModals.TOGGLE_STORE_CREATE_MODAL(true))
    },

    mySettings: () => {
      dispatch(Actions.reduxModals.TOGGLE_MY_SETTINGS_MODAL(true))
    },

    contactUs: () => {
      dispatch(Actions.reduxModals.TOGGLE_CONTACT_US_MODAL(true))
    },

    previewItem: () => {
      dispatch(Actions.reduxModals.TOGGLE_PREVIEW_ITEM_MODAL(true))
    },

    shareLink: () => {
      dispatch(Actions.reduxModals.TOGGLE_SHARE_LINK_MODAL(true))
    },

    giftDownload: () => {
      dispatch(Actions.reduxModals.TOGGLE_GIFT_DOWNLOAD_MODAL(true))
    },

    login: () => {
      dispatch(Actions.reduxModals.TOGGLE_LOGIN_MODAL(true))
    },

    sellerProfileEdit: () => {
      dispatch(Actions.reduxModals.TOGGLE_SELLER_PROFILE_EDIT_MODAL(true))
    },

  }
}

