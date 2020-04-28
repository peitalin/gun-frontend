import { ActionType } from './actions'
import { reduxStripeActions as A } from "./stripe-actions";
import { ID } from "typings/gqlTypes";
import { oc as option } from "ts-optchain";


////// Stripe state reducer //////////
export interface ReduxStateStripe {
  showProductPageStripeComponent: boolean;
  showMySettingsStripeComponent: boolean;
  showCheckoutCartStripeComponent: boolean;
}

const initialStripeState: ReduxStateStripe = {
  showProductPageStripeComponent: true,
  showMySettingsStripeComponent: false,
  showCheckoutCartStripeComponent: false,
}

export const reduxReducerStripe = (
  state: ReduxStateStripe = initialStripeState,
  action: ActionType
): ReduxStateStripe => {

  // console.info("ReduxStripe payload: ", action.payload)

  switch ( action.type ) {

    case A.SHOW_PRODUCT_PAGE_STRIPE_COMPONENT().type: {
      return {
        showProductPageStripeComponent: true,
        showMySettingsStripeComponent: false,
        showCheckoutCartStripeComponent: false,
      }
    }

    case A.SHOW_MY_SETTINGS_STRIPE_COMPONENT().type: {
      return {
        showProductPageStripeComponent: false,
        showMySettingsStripeComponent: true,
        showCheckoutCartStripeComponent: false,
      }
    }

    case A.SHOW_CHECKOUT_CART_STRIPE_COMPONENT().type: {
      return {
        showProductPageStripeComponent: false,
        showMySettingsStripeComponent: false,
        showCheckoutCartStripeComponent: true,
      }
    }

    default: {
      return state
    }
  }
}


