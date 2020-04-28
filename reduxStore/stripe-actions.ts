
import { ReduxStateStripe } from "./stripe-reducer";
import { ActionType } from "./actions";
import { ID, Connection } from "typings/gqlTypes";


export const reduxStripeActions = {

  SHOW_PRODUCT_PAGE_STRIPE_COMPONENT: (): ActionType<null> => ({
    type: "SHOW_PRODUCT_PAGE_STRIPE_COMPONENT",
    payload: null
  }),

  SHOW_MY_SETTINGS_STRIPE_COMPONENT: (): ActionType<null> => ({
    type: "SHOW_MY_SETTINGS_STRIPE_COMPONENT",
    payload: null
  }),

  SHOW_CHECKOUT_CART_STRIPE_COMPONENT: (): ActionType<null> => ({
    type: "SHOW_CHECKOUT_CART_STRIPE_COMPONENT",
    payload: null
  }),

}
