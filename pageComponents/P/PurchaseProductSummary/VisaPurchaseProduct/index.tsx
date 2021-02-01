
import React from 'react';
import { oc as option } from 'ts-optchain';
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius, BorderRadius3x } from "layout/AppTheme";
// Stripe
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
  Stripe,
  StripeElements,
  PaymentMethod,
  ConfirmCardPaymentData
} from "@stripe/stripe-js";


import {
  StripeAuthorizePaymentData,
  StripeConfirmResponse,
} from "../purchaseFunctions";
import {
  UserPrivate, ID,
  OrderStatus,
  Orders,
  Product,
  OrderMutationResponse,
  OrderCreateMutationResponse,
} from 'typings/gqlTypes';
// Components
import ErrorBounds from 'components/ErrorBounds';
import ButtonLoading from "components/ButtonLoading";
import SnackbarsSuccessErrors from "components/Snackbars/SnackbarsSuccessErrors";
// Graphql
import { useApolloClient, useLazyQuery } from '@apollo/client';
// Snackbar
import { useSnackbar } from "notistack";

import {
  CREATE_ORDER,
} from "queries/orders-mutations";




const VisaPurchaseProduct = (props: ReactProps) => {

  const stripe: Stripe = useStripe();
  const elements = useElements();
  const snackbar = useSnackbar();


  const createNewPaymentMethod = async(): Promise<PaymentMethod> => {
    // Within the context of `Elements`, this call to createPaymentMethod
    // knows from which Element to create the PaymentMethod,
    // See our createPaymentMethod documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method
    let billing_details = undefined;
    billing_details = {
      email: props.user?.email,
    }
    let { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billing_details
    })

    if (error) {
      console.error('createNewPaymentMethod error:', error)
    }
    return paymentMethod
  }



  const createOrderAndHoldFundsFirst = async({
    paymentMethodId,
    quotedPrice,
    stripeCustomerId,
  }) => {
    // creates an order on the backend, and places a hold on the users card
    // with a payment authorization (to be captured later)

    setLoading(true)
    const variant = featuredVariant;
    if (!option(props).user.id()) {
      snackbar.enqueueSnackbar(`Login to purchase.`, { variant: "info" })
      setLoading(false)
      return
    }

    let order: Orders;
    let stripeConfirmResponse: StripeConfirmResponse;

    const stripeAuthorizePaymentData: StripeAuthorizePaymentData = {
      paymentMethod: paymentMethodId,
      customerId: stripeCustomerId,
    };

    // 1. Create Order + create stripe payment intent in the backend
    const response = await aClient.mutate<MutDataCreateOrder, MutVarCreateOrder>({
      mutation: CREATE_ORDER,
      variables: {
        productId: product.id,
        productSnapshotId: product.currentSnapshot.id,
        variantId: variant.variantId,
        variantSnapshotId: variant.variantSnapshotId,
        total: variant.price,
        buyerId: props.user.id,
        sellerId: product.store.id,
        stripeAuthorizePaymentData: JSON.stringify(stripeAuthorizePaymentData),
        bidId: undefined,
      }
    });
    console.log("createOrder response: ", response.data.createOrder)

    let unconfirmedOrder = response.data.createOrder;
    let stripePaymentIntent = JSON.parse(
      response?.data?.createOrder?.stripePaymentIntent ?? "{}"
    );
    console.info("stripePaymentIntent", stripePaymentIntent)

    // // 2. confirm the payment intent on the front-end, which prompts 3DS
    // // pop-up if card needs it.
    // let stripeConfirmOptions: ConfirmCardPaymentData = {
    //   payment_method: {
    //     card: elements.getElement(CardElement),
    //     // activates 3DS prompt with test cards for newCards
    //     // otherwise Stripe 3DS is dynamic and you can set fraud detection rules
    //   }
    // }
    // stripeConfirmResponse = await stripe.confirmCardPayment(
    //   stripePaymentIntent.client_secret,
    //   stripeConfirmOptions
    // );
    // console.info("stripeConfirmResponse", stripeConfirmResponse)

    setLoading(false)

    return response.data.createOrder
  }


  // const confirmOrderSecond = async(
  //   orderId: string,
  //   paymentIntent: any,
  // ) => {

  //   setLoading(true)

  //   const stripeConfirmPaymentData: StripeConfirmPaymentData = {
  //     paymentIntent: paymentIntent,
  //   };

  //   const response = await aClient.mutate<MutDataConfirmOrder, MutVarConfirmOrder>({
  //     mutation: CONFIRM_ORDER,
  //     variables: {
  //       orderId: orderId,
  //       stripeConfirmPaymentData: JSON.stringify(stripeConfirmPaymentData)
  //     }
  //   });
  //   console.log("confirmOrder response: ", response);
  //   let order = response.data?.confirmOrder?.order;

  //   if (order.currentSnapshot.orderStatus === OrderStatus.CONFIRMED_PAYMENT_FORM_10_REQUIRED) {
  //     setData("Your order was confirmed!") // trigger success snackbar
  //     console.log('Success! order response:', order)
  //     props.handleOrderPostPurchase(order)
  //   } else {
  //     console.log("Error checking out: ", response.errors)
  //     setError("Payment failed. Please try another payment method.")
  //     // trigger error snackbar
  //   }
  //   setLoading(false)
  //   return response
  // }

  const { classes, display, disableButton } = props;

  const product = props.product;
  const featuredVariant = props.product.featuredVariant;

  const aClient = useApolloClient();

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(undefined);
  const [error, setError] = React.useState(undefined);

  return (
    <ErrorBounds name="Visa Checkout" className={props.className}>
      <div className={classes.root}>
        <div className={clsx(
          classes.formContainer,
          // showStripeElement ? "fadeInFast" : "hidden",
        )}>
          <div className={clsx(classes.flexCol)}>
            <div className={clsx(classes.creditCardContainer)}>
              <CardElement
                options={{
                  hidePostalCode: true,
                  style: {
                    base: {
                      "::placeholder": {
                        fontSize: "0.875rem",
                        fontWeight: '400',
                        color: Colors.grey,
                      },
                    },
                  }
                }}
                onReady={(el) => {
                  // el.focus()
                }}
                onChange={(event) => {
                  console.log('onChange', event)
                }}
                />
            </div>
          </div>

          <div className={classes.flexRowCenter}>
            <ButtonLoading
              onClick={
                () => createNewPaymentMethod()
                      .then(async (newPaymentMethod) => {

                        // 1. Create an order first with the backend
                        let orderResponse = await createOrderAndHoldFundsFirst({
                          quotedPrice: featuredVariant.price,
                          paymentMethodId: newPaymentMethod.id,
                          stripeCustomerId: option(props).user.stripeCustomerId(),
                        });
                        console.log("1: ORDER_MUTATION response: ", orderResponse)
                        let order = orderResponse?.unconfirmedOrder;
                        let stripePaymentIntent = JSON.parse(orderResponse?.stripePaymentIntent);
                        console.log("1b: stripe PaymentIntent: ", stripePaymentIntent)

                        snackbar.enqueueSnackbar(`Success order placed: ${order.id}`, { variant: "success" })

                        // if (option(order).id()) {
                        //   // 2. use response to make a payment, and confirm the order
                        //   // snackbar.enqueueSnackbar(`Success order: ${order.id}`, { variant: "success" })
                        //   let res = await confirmOrderSecond(order.id, stripePaymentIntent)
                        //   // 4. once payment is finalized, and order is finalized
                        //   // proceed with screen transitions, etc
                        //   console.log("2: ORDER CONFIRM RESPONSE: ", res)
                        // }

                        setLoading(false)
                        // console.log("refetching user: ", refetchUser)
                        // await refetchUser() // refetchUser downloads
                        return data
                      })
                      .catch(e => {
                        console.warn(e)
                        setError("Error processing order. Please retry.")
                        setLoading(false)
                      })
              }
              loadingIconColor={Colors.blue}
              replaceTextWhenLoading={true}
              loading={loading}
              disabled={loading || disableButton}
              variant="contained"
              color="secondary"
              className={classes.buyButton}
              style={{
                height: props.buttonHeight ? props.buttonHeight : "40px",
              }}
            >
              <span style={{ marginLeft: '0.25rem' }}>
              { props.title ? props.title : "Buy Instantly" }
              </span>
            </ButtonLoading>
          </div>


        </div>
      </div>
      <SnackbarsSuccessErrors
        data={data}
        error={error}
        successMessage={data}
        errorMessage={error}
      />
    </ErrorBounds>
  );
};

interface ReactProps extends WithStyles<typeof styles> {
  display: boolean;
  disableButton?: boolean;
  user?: UserPrivate;
  className?: string;
  buttonHeight?: any;
  title?: string;
  showIcon?: boolean;
  handleOrderPostPurchase(order: any): void;
  quotedPrice: number; // in cents
  product: Product;
}

interface MutDataCreateOrder {
  createOrder: OrderCreateMutationResponse;
}
interface MutVarCreateOrder {
  productId: string
  productSnapshotId: string
  variantId: string
  variantSnapshotId: string
  total: number
  buyerId: string
  sellerId: string
  stripeAuthorizePaymentData: string
  bidId: string
}
interface MutDataConfirmOrder {
  confirmOrder: OrderMutationResponse;
}
interface MutVarConfirmOrder {
  orderId: string
  stripeConfirmPaymentData: string
}

/////////////// Styles /////////////
const styles = (theme: Theme) => createStyles({
  root: {
    // position: "relative",
    marginTop: '.25rem',
    // marginLeft: '2rem', // 2rem matches with 40px height button
    // marginRight: '2rem', // 2rem matches with 40px height button
  },
  formContainer: {
    minWidth: '180px',
  },
  creditCardContainer: {
    margin: "0px",
    height: 38,
    // border: `2px solid ${Colors.charcoal}`,
    backgroundColor: Colors.cream,
    border: `1px solid rgba(170, 170, 170, 0.4)`,
    padding: "0.5rem",
    borderRadius: BorderRadius3x,
  },
  receiptLink: {
    fontFamily: '"Segoe UI","Helvetica Neue",Arial,sans-serif',
  },
  stripeElement: {
    boxSizing: 'border-box',
    height: '40px',
    padding: '10px 12px',
    border: '1px solid transparent',
    borderRadius: BorderRadius,
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 #e6ebf1',
    transition: 'box-shadow 150ms ease',
    "&:focus": {
      boxShadow: '0 1px 3px 0 #cfd7df',
    },
    "--invalid": {
      borderColor: "#fa755a",
    }
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0.25rem',
    marginBottom: '0.5rem',
  },
  flexRowCenter: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center",
    alignItems: 'center',
    textAlign: 'center',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "flex-end",
    width: '100%',
    margin: 0,
  },
  checkboxText: {
    fontSize: '0.875rem',
    fontWeight: 400,
    color: Colors.darkGrey,
  },
  buyButton: {
    width: "100%",
  },
  emailField: {
    flexGrow: 1,
    minWidth: 100,
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: '0.8rem',
    margin: '0.25rem 0rem',
  },
  dropdownContainer: {
    marginBottom: '0.5rem',
  },
  marginTop: {
    marginTop: '1rem',
  },
  link: {
    color: Colors.blue,
    fontSize: "0.9rem",
    cursor: 'pointer',
    "&:hover": {
      color: fade(Colors.blue, 0.9),
    },
  },
});

export default withStyles(styles)( VisaPurchaseProduct );







