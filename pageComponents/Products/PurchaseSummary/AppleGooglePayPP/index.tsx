import React from 'react';
import { useState, useEffect } from "react";
import { oc as option } from 'ts-optchain';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
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
import { Cart, UserPrivate, PaymentProcessor, Order, ProductProductVariantId } from 'typings/gqlTypes';
// Stripe
import { PaymentRequestButtonElement } from 'react-stripe-elements';
import { StripeClient, StripePaymentMethodResponse } from "layout/Checkout/typings.stripe";
import { useDetectPaymentPlatform } from "utils/hooks";
import { destroyStripeIFrame } from "layout/Checkout/CheckoutPage";
// Instant buy without being logged in
import {
  CHECKOUT_PRODUCTS
} from "queries/orders-mutations";
import { calculateFeesAndTaxes } from "reduxStore/pricing/feesAndTaxes";






const AppleGooglePay = (props: ReactProps) => {

  const [state, setState] = useState<ReactState>({
    canMakePayment: {
      applePay: false,
    },
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
  const aClient = useApolloClient();
  const dispatch = useDispatch();
  const apolloClient = useApolloClient();

  const { total, taxes, paymentFee } = calculateFeesAndTaxes(
    PaymentProcessor.STRIPE
  )(props.quotedPrice, false);

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
        amount: total
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
        canMakePayment: result,
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

    paymentRequest.on('paymentmethod', async(ev) => {

      interface StripePaymentProcessorData {
        paymentMethod: string;
        savePaymentMethod: boolean;
        customerId?: string;
      }
      const processorData: StripePaymentProcessorData = {
        paymentMethod: ev.paymentMethod.id,
        savePaymentMethod: false,
        customerId: option(user).stripeCustomerId(),
      };
      const processorDataString = JSON.stringify(processorData);

      // console.log("productsInfo: ", props.productsInfo)
      // console.log("quotedPrice: ", props.quotedPrice)
      // console.log("paymentProcessorData: ", processorDataString)

      const { data } = await apolloClient.mutate<MutationData, MutationVar>({
        mutation: CHECKOUT_PRODUCTS,
        variables: {
          productsInfo: props.productsInfo,
          promoCodesToAdd: [],
          quotedPrice: total,
          paymentProcessorData: processorDataString,
          anonOrderEmailAddress: option(ev).payerEmail()
        }
      });

      if (option(data).checkoutProducts.order.id()) {
        console.log('Success! order response:', data.checkoutProducts.order)
        // Report to the browser that the confirmation was successful, prompting
        // it to close the browser payment method collection interface.
        ev.complete('success');
        props.handleOrderPostPurchase(data.checkoutProducts.order)

      } else {
        console.log("Payment failed for unknown reason, please try another payment method")
        ev.complete('fail');
      }
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


  useEffect(() => {
    // stripe removes ALL paymentRequests buttons when one unmonuts.
    // So remount all the paymentRequest Buttons not in the checkout modal.
    const remountPaymentRequestButton = (seconds: number) => {
      setTimeout(() => {
        if (
          props.buttonId !== "checkout-apple-pay-1" &&
          props.stripe
        ) {
          console.log("remounting:", props.buttonId)
          createPaymentRequest()
        }
      }, seconds)
    }

    return () => {
      // remountPaymentRequestButton(200)
      remountPaymentRequestButton(300)
      // remountPaymentRequestButton(500)
      // 300ms, earlier and it may not remount
    }
  }, [checkoutModalOpen])


  ///// RENDER /////

  if (props.display === false) {
    return <></>
  } else {
    return (
    <ErrorBounds name="Visa Checkout" className={props.className}>
      <div className={classes.root}>
        <div className={classes.formContainer}>
          {/* BUTTON MOUNTED ON THIS ELEMENT */}
          {/* <div className={classes.paymentRequestButtonPlaceholder}>
            ...Loading Apple Pay
          </div> */}
          <div id={buttonId}
            className={classes.paymentRequestButton}
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
  display: boolean;
  stripe: StripeClient & stripe.Stripe; // provided by AsyncStripeProvider
  disableButton: boolean;
  buttonHeight?: any;
  buttonId?: string;
  user: UserPrivate;
  quotedPrice: number; // in cents
  productsInfo: ProductProductVariantId[];
  handleOrderPostPurchase(order: Order): void;
}
interface ReactState {
  loading: boolean,
  canMakePayment: {
    applePay?: boolean
  };
  paymentRequest: stripe.paymentRequest.StripePaymentRequest;
  prButton: stripe.elements.Element;
  strangerEmail: string;
}
interface MutationData {
  checkoutProducts: {
    order: Order;
  }
}
interface MutationVar {
  productsInfo: ProductProductVariantId[];
  promoCodesToAdd: string[];
  quotedPrice: number;
  paymentProcessorData: string;
  anonOrderEmailAddress?: string;
}

/////////////// Styles /////////////
const styles = (theme: Theme) => createStyles({
  root: {
    position: "relative",
    marginTop: '0rem',
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
    // top: 0,
  },
  paymentRequestButtonPlaceholder: {
    width: '100%',
    height: 40,
    background: "#010101",
    color: Colors.cream,
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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


