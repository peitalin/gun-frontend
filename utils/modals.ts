
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

    storePayoutCreate: () => {
      dispatch(Actions.reduxModals.TOGGLE_STORE_PAYOUT_CREATE_MODAL(true))
    },

    mySettings: () => {
      dispatch(Actions.reduxModals.TOGGLE_MY_SETTINGS_MODAL(true))
    },

    login: () => {
      dispatch(Actions.reduxModals.TOGGLE_LOGIN_MODAL(true))
    },

    sellerProfileEdit: () => {
      dispatch(Actions.reduxModals.TOGGLE_SELLER_PROFILE_EDIT_MODAL(true))
    },

  }
}

