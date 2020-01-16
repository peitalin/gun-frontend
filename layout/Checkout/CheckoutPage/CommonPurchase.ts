import { Order, ProductProductVariantId, ID, Cart } from "typings/gqlTypes";
import { CheckoutProductsResponse, CheckoutCartResponse } from "typings";

// graphql
import {
  CHECKOUT_CART,
  CHECKOUT_PRODUCTS,
} from "queries/orders-mutations";
import { ApolloClient } from "apollo-client";
import { GET_DOWNLOADS } from "queries/downloads-queries";
import { MY_DOWNLOADS_PAGINATION_COUNT } from "pages/my-downloads";
// Redux
import { useSelector, useDispatch, batch } from "react-redux";
import { Dispatch } from "redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// router
import { useRouter, NextRouter } from "next/router";



interface StripePaymentProcessorData {
  paymentMethod: string;
  savePaymentMethod: boolean;
  customerId?: string;
}


export const stripePurchase = (apolloClient: ApolloClient<any>) =>
async(
  paymentMethodId: ID,
  savePaymentMethod: boolean,
  cart: Cart | null,
  stripeCustomerId?: string,
  strangerEmail?: string
): Promise<Order> => {

  let order: Order;

  const processorData: StripePaymentProcessorData = {
    paymentMethod: paymentMethodId,
    savePaymentMethod: savePaymentMethod,
    customerId: stripeCustomerId
  };
  const processorDataString = JSON.stringify(processorData);

  // Handle the case where we're logged-in (have a real cart)
  if (cart.id) {
    const response: CheckoutCartResponse = await apolloClient.mutate({
      mutation: CHECKOUT_CART,
      variables: {
        quotedPrice: cart.total,
        paymentProcessorData: processorDataString
      }
    });
    order = response.data.checkoutCart.order;
  }

  // Handle the logged-out case
  else {
    const productsInfo: ProductProductVariantId[] = cart.items.map(item => {
      return {
        productId: item.product.id,
        variantId: item.product.chosenVariant.variantId,
        quantity: item.quantity
      };
    });
    const response: CheckoutProductsResponse = await apolloClient.mutate({
      mutation: CHECKOUT_PRODUCTS,
      variables: {
        productsInfo: productsInfo,
        promoCodesToAdd: cart.relevantPromoCodes.map(d => d.promoCode),
        quotedPrice: cart.total,
        paymentProcessorData: processorDataString,
        anonOrderEmailAddress: strangerEmail
      }
    });
    order = response.data.checkoutProducts.order;
  }
  return order;
};





export const handleOrderPostPurchase = (
  apolloClient: ApolloClient<any>,
  dispatch: Dispatch<any>,
  router: NextRouter,
  loggedIn?: boolean,
) =>
async(order: Order) => {
  // update redux state for order, transitions page to CheckoutComplete
  console.log("redux saving order: ", order)
  dispatch(Actions.reduxPayment.UPDATE_ORDER_RESPONSE(order))
  // Clear Cart
  console.log("refetching cart (cleared).....")
  dispatch(Actions.reduxCart.CLEAR_CART())
  // route to My-Downloads
  dispatch(Actions.reduxModals.TOGGLE_CHECKOUT_MODAL(false))
  if (loggedIn) {
    router.push("/my-downloads");
  } else {
    router.push(
      "/checkout/success-login/[orderId]", // href
      `/checkout/success-login/${order.id}` // as
    );
  }
}
