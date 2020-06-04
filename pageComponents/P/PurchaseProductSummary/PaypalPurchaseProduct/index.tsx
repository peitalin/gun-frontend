import * as React from "react";
import * as ReactDOM from "react-dom";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
// Styles
import {
  withStyles, createStyles, WithStyles, Theme
} from "@material-ui/core/styles";
// Components
import ErrorBounds from "components/ErrorBounds";
import SnackbarsSuccessErrors from "components/Snackbars/SnackbarsSuccessErrors";
// Payments
import {
  Cart,
  UserPrivate,
  Order, OrderStatus,
  ProductProductVariantId,
  ID,
  PaymentProcessor,
} from 'typings/gqlTypes';
import { PaypalOnApproveData, PaypalResponse } from "typings/typings-paypal";
import { centsToDollarSelector } from "utils/selectors";
import { useApolloClient } from "@apollo/react-hooks";
// Instant buy without being logged in
import {
  CHECKOUT_PRODUCTS_FOR_FRONTEND_PAYMENT,
  CONFIRM_ORDER_AFTER_FRONTEND_PAYMENT
} from "queries/orders-mutations";
// import { calculateFeesAndTaxes } from "reduxStore/pricing/feesAndTaxes";




const PaypalPurchaseProduct: React.FC<ReactProps> = (props) => {

  const [state, setState] = React.useState({
    PaypalButton: undefined,
  })
  const [data, setData] = React.useState(undefined);
  const [error, setError] = React.useState(undefined);

  const apolloClient = useApolloClient();

  // const { total, taxes, paymentFee } = calculateFeesAndTaxes(
  //   PaymentProcessor.NOPAYMENTFEES
  // )(props.quotedPrice, false);
  let total = props.quotedPrice;


  React.useEffect(() => {
    // Render the Paypal Button after loading Paypal script
    if (window.paypal) {
      // load paypal if one doesn't already exist only
      loadPaypal()
      // try reload Paypal button again in case "zoid destroyed all"
      setTimeout(() => loadPaypal(), 1000)
      setTimeout(() => loadPaypal(), 2000)
      setTimeout(() => loadPaypal(), 4000)
    }
    // on unMount
    return () => {}
  }, [])


  const loadPaypal = () => {
    if (
      !document.querySelector('.paypal-container > div > div > iframe')
    ) {
      // load paypal if one doesn't already exist only
      console.log("loading paypal button...")
      setState(s => ({
        ...s,
        PaypalButton: window.paypal.Buttons.driver("react", {React, ReactDOM}),
      }));
    }
  }

  // 1. create order
  const createOrder = async (data, actions) => {
    // console.log("createOrder data:", data);
    // console.log("createOrder actions:", actions);

    const {
      subtotalPaypal,
      subtotalCents
    } = centsToDollarSelector(total);

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
    console.log('paypal on approve: ', data);

    try {

      // Handle the logged-out case
      const { data } = await apolloClient.mutate<MutationData, MutationVar>({
        mutation: CHECKOUT_PRODUCTS_FOR_FRONTEND_PAYMENT,
        variables: {
          productsInfo: props.productsInfo,
          promoCodesToAdd: [],
          quotedPrice: total
        }
      })

      console.log("data: ", data);
      let pendingOrder = data.checkoutProductsForFrontendPayment.order;
      console.log("pendingOrderId: ", pendingOrder.id);
      // Hang on to the pending order ID for referencing later when the payment occurs
      // // Fail if we don't have an order to pay for
      if (!option(pendingOrder).id()) {
        setError("Payment failed, please try another payment method!")
        throw new Error("No pending order to approve!")
      }

      // Execute Paypal transaction
      let paypalResponse: PaypalResponse = await actions.order.capture();
      const processorDataString = JSON.stringify(paypalResponse);

      const response = await apolloClient.mutate({
        mutation: CONFIRM_ORDER_AFTER_FRONTEND_PAYMENT,
        variables: {
          orderId: option(pendingOrder).id(),
          paymentProcessorData: processorDataString,
          anonOrderEmailAddress: option(paypalResponse).payer.email_address()
        }
      })

      let order = option(response).data.confirmOrderAfterFrontendPayment.order();
      console.log("order:", order)

      if (option(order).currentSnapshot.orderStatus() === OrderStatus.CONFIRMED) {
        setData("Your order was confirmed!") // trigger success snackbar
        // post purchase cleanup, also sets tabIndex to transition to CheckoutComplete page
        props.handleOrderPostPurchase(order);

      } else {
        setError("Payment failed, please try another payment method!")
      }
    } catch (e) {
      console.log(e)
      console.log("Unexpected token J in JSON? => Probably a deserialization error")
      console.log("Check payment service knows how to parse paypal_response")
      setError("Payment failed, please try another payment method!")
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
    setError("Payment was cancelled!")
  }

  const onError = (data, actions) => {
    setError("Payment failed, please try another payment method!")
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
        <div className="paypal-container" style={{
          position: 'relative',
          zIndex: 1,
        }}>
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
      </ErrorBounds>
      <SnackbarsSuccessErrors
        data={data}
        error={error}
        successMessage={data}
        errorMessage={error}
      />
    </div>
  );
};


interface ReactProps extends WithStyles<typeof styles> {
  display?: boolean;
  className?: string;
  disableButton: boolean;
  buttonHeight?: number;
  quotedPrice: number; // in cents
  productsInfo: ProductProductVariantId[];
  user: UserPrivate;
  handleOrderPostPurchase(order: Order): void;
}

interface MutationData {
  checkoutProductsForFrontendPayment: {
    order: Order
  }
}
interface MutationVar {
  productsInfo: ProductProductVariantId[];
  promoCodesToAdd: string[];
  quotedPrice: number;
}

const styles = (theme: Theme) => createStyles({
  root: {
    position: "relative",
    marginTop: '0rem',
    marginBottom: '0rem',
    // marginLeft: '2rem', // 2rem matches with 40px height button
    // marginRight: '2rem', // 2rem matches with 40px height button
  },
});

export default withStyles(styles)( PaypalPurchaseProduct );