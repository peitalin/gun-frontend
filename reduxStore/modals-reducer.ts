import { ActionType } from './actions'
import { reduxModalsActions as A } from "./modals-actions";

////// Modals state reducer //////////
export interface ReduxStateModals {
  productCreateModalOpen: boolean;
  productEditModalOpen: boolean;
  storeCreateModalOpen: boolean;
  mySettingsModalOpen: boolean;
  contactUsModalOpen: boolean;
  previewItemModalOpen: boolean;
  shareLinkModalOpen: boolean;
  giftDownloadModalOpen: boolean;
  loginModalOpen: boolean;
  sellerProfileEditModalOpen: boolean;
  dealerProfileEditModalOpen: boolean;
  checkoutModalOpen: boolean;
  storePromoCodeCreate: boolean;
  chatCenterOpen: boolean;
  promotedItemPurchaseModalOpen: boolean;
}

const initialModalsState: ReduxStateModals = {
  productCreateModalOpen: false,
  productEditModalOpen: false,
  storeCreateModalOpen: false,
  mySettingsModalOpen: false,
  contactUsModalOpen: false,
  previewItemModalOpen: false,
  shareLinkModalOpen: false,
  giftDownloadModalOpen: false,
  loginModalOpen: false,
  sellerProfileEditModalOpen: false,
  dealerProfileEditModalOpen: false,
  checkoutModalOpen: false,
  storePromoCodeCreate: false,
  chatCenterOpen: false,
  promotedItemPurchaseModalOpen: false,
}

export const reduxReducerModals = (
  state: ReduxStateModals = initialModalsState,
  action: ActionType
): ReduxStateModals => {

  // console.info("ReduxModals payload: ", action.payload)

  switch ( action.type ) {

    case A.TOGGLE_PRODUCT_CREATE_MODAL().type: {
      return { ...state, productCreateModalOpen: action.payload }
    }

    case A.TOGGLE_PRODUCT_EDIT_MODAL().type: {
      return { ...state, productEditModalOpen: action.payload }
    }

    case A.TOGGLE_STORE_CREATE_MODAL().type: {
      return { ...state, storeCreateModalOpen: action.payload }
    }

    case A.TOGGLE_MY_SETTINGS_MODAL().type: {
      return { ...state, mySettingsModalOpen: action.payload }
    }

    case A.TOGGLE_CONTACT_US_MODAL().type: {
      return { ...state, contactUsModalOpen: action.payload }
    }

    case A.TOGGLE_PREVIEW_ITEM_MODAL().type: {
      return { ...state, previewItemModalOpen: action.payload }
    }

    case A.TOGGLE_SHARE_LINK_MODAL().type: {
      return { ...state, shareLinkModalOpen: action.payload }
    }

    case A.TOGGLE_GIFT_DOWNLOAD_MODAL().type: {
      return { ...state, giftDownloadModalOpen: action.payload }
    }

    case A.TOGGLE_LOGIN_MODAL().type: {
      return { ...state, loginModalOpen: action.payload }
    }

    case A.TOGGLE_SELLER_PROFILE_EDIT_MODAL().type: {
      return { ...state, sellerProfileEditModalOpen: action.payload }
    }

    case A.TOGGLE_DEALER_PROFILE_EDIT_MODAL().type: {
      return { ...state, dealerProfileEditModalOpen: action.payload }
    }

    case A.TOGGLE_CHECKOUT_MODAL().type: {
      return { ...state, checkoutModalOpen: action.payload }
    }

    case A.TOGGLE_STORE_PROMO_CODE_CREATE_MODAL().type: {
      return { ...state, storePromoCodeCreate: action.payload }
    }

    case A.TOGGLE_BIDDING_ROOM_MODAL().type: {
      return { ...state, chatCenterOpen: action.payload }
    }

    case A.TOGGLE_PROMOTED_ITEM_PURCHASE_MODAL().type: {
      return { ...state, promotedItemPurchaseModalOpen: action.payload }
    }

    default: {
      return state
    }
  }
}


