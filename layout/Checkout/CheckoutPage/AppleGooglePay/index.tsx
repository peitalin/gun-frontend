import * as React from 'react';
import { useState, useEffect } from "react";
import { oc as option } from 'ts-optchain';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Grpahql
import { useApolloClient } from "@apollo/react-hooks";
import { GET_DOWNLOADS } from "queries/downloads-queries";
import { GET_USER } from "queries/user-queries";
// Error
import ErrorBounds from 'components/ErrorBounds';
// Material UI
import Loading from 'components/Loading';
import { Cart, UserPrivate, Edge, Download, Transaction, Order } from 'typings/gqlTypes';
// Stripe
import { PaymentRequestButtonElement } from 'react-stripe-elements';
import { StripeClient, StripePaymentMethodResponse } from "layout/Checkout/typings.stripe";
import { useDetectPaymentPlatform } from "utils/hooks";
import { destroyStripeIFrame } from "layout/Checkout/CheckoutPage/index";
import { stripePurchase } from 'layout/Checkout/CheckoutPage/CommonPurchase';




const AppleGooglePay = (props: ReactProps) => {

  const [state, setState] = useState<ReactState>({
    canMakePayment: false,
    prButton: undefined,
    loading: false,
    paymentRequest: undefined,
    strangerEmail: undefined,
  });

  // props
  const {
    classes,
    buttonId = "payment-request-button",
  } = props;

  // redux
  const {
    user,
    checkoutModalOpen,
  } = useSelector<GrandReduxState, { user: UserPrivate, checkoutModalOpen: boolean}>(
    state => ({
      user: state.reduxLogin.user,
      checkoutModalOpen: state.reduxModals.checkoutModalOpen,
    })
  );

  // hooks
  const paymentProcessor = useDetectPaymentPlatform();
  const aClient = useApolloClient();
  const dispatch = useDispatch();
  const apolloClient = useApolloClient();


  ///////////////// CREATE PAYMENT REQUEST ////////////////////
  const createPaymentRequest = async() => {

    //////////// Mounting //////////////
    const stripe: StripeClient & stripe.Stripe = props.stripe || window.Stripe;
    setState(state => ({ ...state, loading: true }))

    const paymentRequest = stripe.paymentRequest({
      country: 'US',
      currency: 'usd', // must be lowercase
      total: {
        label: 'total',
        amount: props.cart.total,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    const elements = stripe.elements();
    const prButton = elements.create('paymentRequestButton', {
      paymentRequest: paymentRequest,
      style: {
          paymentRequestButton: {
          type: 'buy',    // 'default' | 'donate' | 'buy', // default: 'default'
          theme: 'dark', // 'dark' | 'light' | 'light-outline', // default: 'dark'
          height: props.buttonHeight ? props.buttonHeight : '40px',
           // default: '40px', the width is always '100%'
        },
      }
    });
    setState(state => ({ ...state, prButton }))


    paymentRequest.canMakePayment().then(result => {
      if (result) {
        prButton.mount(`#${buttonId}`);
      } else {
        if (document && document.getElementById(buttonId)) {
          document.getElementById(buttonId).style.display = 'none';
        }
      }
      setState(state => ({
        ...state,
        canMakePayment: !!result,
        loading: false,
      }));
      console.log(`${buttonId} canMakePayment:`, result)
    }).catch(e => {
      console.log('payment request err:', e)
    });

    //////////// Event Listeners //////////////
    paymentRequest.on('token', ({complete, token, ...data}) => {
      console.log('Received Stripe token: ', token);
      console.log('Received customer information: ', data);
      setState(s => ({ ...s, strangerEmail: data.payerEmail }))
    });

    paymentRequest.on('paymentmethod', (ev) => {

      stripePurchase(apolloClient)(
        ev.paymentMethod.id,
        false,
        props.cart,
        option(user).stripeCustomerId(),
        state.strangerEmail
      ).then(order => {

        console.log("order response:", order)
        console.log('Received ApplePay Email: ', state.strangerEmail);
        if (order.id) {
          // Report to the browser that the confirmation was successful, prompting
          // it to close the browser payment method collection interface.
          ev.complete('success');
          props.handleOrderPostPurchase(order)

        } else {
          console.log("Payment failed for unknown reason, please try another payment method")
          ev.complete('fail');
        }
      })
    });
  }

  useEffect(() => {
    // on mount create the Payment Request Button
    if (props.stripe) {
      createPaymentRequest()
    }
    // On Unmount call:
    return () => destroyStripeIFrame()
  }, [props.stripe])



  ///// RENDER /////

  if (props.display === false) {
    return <></>
  } else {
    return (
    <ErrorBounds name="Visa Checkout" className={props.className}>
      <div className={classes.root}>
        <div className={classes.formContainer}>
          {/* BUTTON MOUNTED ON THIS ELEMENT */}
          <div className={classes.paymentRequestButton}
            id={buttonId}
          />
        </div>
        {
          state.paymentRequest &&
          <PaymentRequestButtonElement
            paymentRequest={state.paymentRequest}
            className="PaymentRequestButton"
            style={{
              // For details on styling the Payment Request Button, see:
              // https://stripe.com/docs/elements/payment-request-button#styling-the-element
              paymentRequestButton: {
                theme: 'light',
                height: '40px',
              },
            }}
          />
        }
      </div>
    </ErrorBounds>
    );
  }
};


interface ReactProps extends WithStyles<typeof styles> {
  className?: string;
  cart: Cart;
  display: boolean;
  stripe: StripeClient & stripe.Stripe; // provided by AsyncStripeProvider
  disableButton: boolean;
  buttonHeight?: any;
  buttonId?: string;
  handleOrderPostPurchase(order: Order): void;
}
interface ReactState {
  loading: boolean,
  canMakePayment: boolean;
  paymentRequest: stripe.paymentRequest.StripePaymentRequest;
  prButton: stripe.elements.Element;
  strangerEmail: string;
}

/////////////// Styles /////////////
const styles = (theme: Theme) => createStyles({
  root: {
    position: "relative",
    marginBottom: '0.5rem',
    // marginLeft: '2rem', // 2rem matches with 40px height button
    // marginRight: '2rem', // 2rem matches with 40px height button
  },
  formContainer: {
    position: 'relative',
  },
  paymentRequestButton: {
    width: '100%',
    // position: 'absolute',
  },
  loadingButton: {
    width: "100%",
    position: 'absolute',
  },
  spacer: {
    margin: "1rem 0px",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    padding: "0.5rem",
    borderRadius: "4px",
  },
  receiptLink: {
  },
  flexRowCenter: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center",
    alignItems: 'center',
    textAlign: 'center',
  },
  buyButton: {
    width: "100%",
    marginTop: '1rem',
    marginLeft: '1rem',
    marginRight: '1rem',
    marginBottom: '0.25rem',
  },
});


export default withStyles(styles)( AppleGooglePay );


