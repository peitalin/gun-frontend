import * as React from "react";
import * as ReactDOM from "react-dom";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
// Redux
import { connect } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { ReduxStatePayment } from "reduxStore/payment-reducer";
// Styles
import {
  withStyles, createStyles, WithStyles, Theme
} from "@material-ui/core/styles";
// Components
import ErrorBounds from "components/ErrorBounds";
// MUI
import Button from "@material-ui/core/Button";
// Payments
import {
  Cart,
  UserPrivate,
  Order,
  ProductProductVariantId,
  ID
} from 'typings/gqlTypes';
import { CheckoutCartForFrontendPaymentResponse, ConfirmOrderAfterFrontendPaymentResponse, CheckoutProductsForFrontendPaymentResponse } from "typings";
import { PaypalOnApproveData, PaypalResponse } from "layout/Checkout/typings.paypal";
import {
  CHECKOUT_CART_FOR_FRONTEND_PAYMENT,
  CHECKOUT_PRODUCTS_FOR_FRONTEND_PAYMENT,
  CONFIRM_ORDER_AFTER_FRONTEND_PAYMENT
} from "queries/orders-mutations";
import { centsToDollarSelector } from "utils/selectors";
import { useApolloClient } from "@apollo/react-hooks";




const PaypalCheckout: React.FC<ReactProps> = (props) => {

  const [state, setState] = React.useState({
    PaypalButton: undefined,
  })

  const apolloClient = useApolloClient();


  React.useEffect(() => {
    // Render the Paypal Button after loading Paypal script
    if (window.paypal) {
      loadPaypal()
    } else {
      document.querySelector('#paypal-js')
        .addEventListener('load', loadPaypal);
    }

    // on unMount
    return document.querySelector('#paypal-js')
            .removeEventListener('load', loadPaypal);
  }, [])


  const loadPaypal = () => {
    setState(s => ({
      ...s,
      PaypalButton: window.paypal.Buttons.driver("react", {React, ReactDOM}),
    }));
  }

  // 1. create order
  const createOrder = async (data, actions) => {
    // console.log("createOrder data:", data);
    // console.log("createOrder actions:", actions);
    const {
      subtotalPaypal,
      subtotalCents
    } = centsToDollarSelector(props.cart.total);

    if (subtotalCents === 0) {
      alert("Nothing in your cart!");
      return
    } else {
      // 2. Paypal.createOrder
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: subtotalPaypal
          }
        }]
      })
    }
  }


  // 2. on approve
  const onApprove = async(
    data: PaypalOnApproveData,
    actions,
  ) => {

    try {
      // Handle the case where we're logged-in (have a real cart)
      const cart = props.cart;
      let pendingOrder: Order;

      if (cart.id) {
        const request = {
          mutation: CHECKOUT_CART_FOR_FRONTEND_PAYMENT,
          variables: {
            quotedPrice: cart.total
          }
        };
        const response: CheckoutCartForFrontendPaymentResponse = await apolloClient.mutate(request)
        pendingOrder = response.data.checkoutCartForFrontendPayment.order;
      }

      // Handle the logged-out case
      else {
        const productsInfo: ProductProductVariantId[] = cart.items.map(item => {
          return {
            productId: item.product.id,
            variantId: item.product.chosenVariant.variantId,
            quantity: item.quantity
          }
        });
        const request = {
          mutation: CHECKOUT_PRODUCTS_FOR_FRONTEND_PAYMENT,
          variables: {
            productsInfo: productsInfo,
            promoCodesToAdd: cart.relevantPromoCodes.map(d => d.promoCode),
            quotedPrice: cart.total
          }
        };
        const response: CheckoutProductsForFrontendPaymentResponse = await apolloClient.mutate(request)
        pendingOrder = response.data.checkoutProductsForFrontendPayment.order;
      }

      console.log("pendingOrder: ", pendingOrder);
      console.log("pendingOrderId: ", pendingOrder.id);
      // Hang on to the pending order ID for referencing later when the payment occurs
      // // Fail if we don't have an order to pay for
      if (!option(pendingOrder).id()) {
        throw new Error("No pending order to approve!")
      }

      // Execute Paypal transaction
      let paypalResponse: PaypalResponse = await actions.order.capture();

      const processorDataString = JSON.stringify(paypalResponse);
      const request = {
        mutation: CONFIRM_ORDER_AFTER_FRONTEND_PAYMENT,
        variables: {
          orderId: option(pendingOrder).id(),
          paymentProcessorData: processorDataString,
          anonOrderEmailAddress: option(paypalResponse).payer.email_address()
        }
      };
      const response: ConfirmOrderAfterFrontendPaymentResponse = await apolloClient.mutate(request)
      const order = response.data.confirmOrderAfterFrontendPayment.order;

      console.log('confirmed order:', order)
      // post purchase cleanup, also sets tabIndex to transition to CheckoutComplete page
      props.handleOrderPostPurchase(order);
    } catch (e) {
      console.log(e)
      console.log("Unexpected token J in JSON? => Probably a deserialization error")
      console.log("Check payment service knows how to parse paypal_response")
    }
  }

  const onAuthorize = (data, actions) => {
    console.log("onAuthorize.")
    return actions.payment.tokenizePayment(data)
      .then(function (payload) {
        console.log("payload:", payload)
        // Submit `payload.nonce` to your server.
      });
  }

  const onCancel = (data) => {
    console.log('checkout.js payment cancelled', JSON.stringify(data));
  }

  const onError = (data, actions) => {
    alert(JSON.stringify(data))
    console.error('error data:', data);
    console.error('error actions: ', actions);
  }

  const { classes } = props;
  const { PaypalButton } = state;


  return (
    <div
      className={clsx(
        classes.root,
        props.className
        )}
      style={{
        display: (props.display === false) ? "none" : "block",
      }}
    >
      <ErrorBounds name="PaypalCheckout">
        <div id="paypal-button-container"/>
        <div className="paypal-container">
          <div className={clsx(props.coverButton ? classes.goofBox : null)}>
            {
              PaypalButton &&
              <PaypalButton
                // payment={(data, actions) => payment(data, actions)}
                onAuthorize={(data, actions) => onAuthorize(data, actions)}
                createOrder={async(data, actions) => await createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
                onError={(data, actions) => onError(data, actions)}
                commit={true}
                vault={true} // use Paypal Vault to store payment methods
                style={{
                  color: "gold",
                  layout: "horizontal",
                  fundingicons: "true",
                  label: '',
                  tagline: "false",
                  // size: "medium",
                  height: props.buttonHeight
                    ? props.buttonHeight
                    : 40,
                }}
                // funding={{
                //   allowed: [ window.paypal.FUNDING.CARD ],
                //   disallowed: [ window.paypal.FUNDING.CREDIT ]
                // }}
                //
                // https://developer.paypal.com/docs/checkout/reference/customize-sdk/
              />
            }
          </div>
          {
            props.coverButton &&
            <div id="goofProofButton">
              <Button
                disabled={props.disableButton}
                className={classes.goofProofButton}
                variant="contained"
                color="secondary"
              >
                <div className="goofs">
                  Buy Instantly with Paypal
                </div>
              </Button>
            </div>
          }
        </div>
      </ErrorBounds>
    </div>
  );
};


interface ReactProps extends WithStyles<typeof styles> {
  display?: boolean;
  cart: Cart;
  className?: string;
  coverButton?: boolean;
  disableButton: boolean;
  buttonHeight?: number;
  handleOrderPostPurchase(order: Order): void;
}

const styles = (theme: Theme) => createStyles({
  root: {
    position: "relative",
    marginTop: '0rem',
    marginBottom: '0.25rem',
    // marginLeft: '2rem', // 2rem matches with 40px height button
    // marginRight: '2rem', // 2rem matches with 40px height button
  },
  goofProofButton: {
    height: '40px', // matches with 2rem width paypal button margin
    width: "100%",
    position: "relative",
    boxShadow: `0px 2px 4px -1px rgba(0,0,0,0.2),
    0px 1px 1px 0px rgba(0,0,0,0.12)`,
  },
  goofBox: {
    position: "absolute",
    width: '100%', // Same size as Checkout Button
    opacity: 0,
    zIndex: 100,
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
    "&:hover": {
      opacity: 1,
      transition: theme.transitions.create('opacity', {
        easing: theme.transitions.easing.easeIn,
        duration: "200ms",
      }),
    },
  },
});

export default withStyles(styles)( PaypalCheckout );