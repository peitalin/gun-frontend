
import React from 'react';
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius, BorderRadius3x, Gradients } from "layout/AppTheme";
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
import { useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
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
  const isDarkMode = useSelector<GrandReduxState, boolean>(s => {
    return s.reduxLogin.darkMode === 'dark'
  })


  const createNewPaymentMethod = async(): Promise<PaymentMethod> => {
    // Within the context of `Elements`, this call to createPaymentMethod
    // knows from which Element to create the PaymentMethod,
    // See our createPaymentMethod documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method
    let { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email: props.user?.email,
      }
    })
    if (error) {
      console.error('createNewPaymentMethod error:', error)
    }
    return paymentMethod
  }



  const createOrderAndHoldFundsFirst = async({
    paymentMethodId,
    stripeCustomerId,
  }) => {
    // creates an order on the backend, and places a hold on the users card
    // with a payment authorization (to be captured later)

    setLoading(true)
    const variant = featuredVariant;
    if (!props?.user?.id) {
      snackbar.enqueueSnackbar(`Login to purchase.`, { variant: "info" })
      setLoading(false)
      return
    }

    const stripeAuthorizePaymentData: StripeAuthorizePaymentData = {
      paymentMethod: paymentMethodId,
      customerId: stripeCustomerId,
    };

    // 1. Create Order + create stripe payment intent in the backend
    return await aClient.mutate<MutDataCreateOrder, MutVarCreateOrder>({
      mutation: CREATE_ORDER,
      variables: {
        productId: product.id,
        productSnapshotId: product.currentSnapshot.id,
        variantId: variant.variantId,
        variantSnapshotId: variant.variantSnapshotId,
        total: variant.price,
        buyerId: props.user.id,
        sellerStoreId: product.store.id,
        stripeAuthorizePaymentData: JSON.stringify(stripeAuthorizePaymentData),
        bidId: undefined,
      }
    })
    .then(response => {
      let stripePaymentIntent = JSON.parse(
        response?.data?.createOrder?.stripePaymentIntent ?? "{}"
      );
      console.log("createOrder response: ", response)
      console.info("stripePaymentIntent", stripePaymentIntent)
      return response.data.createOrder
    })
    .catch(err => {
      snackbar.enqueueSnackbar(`${err}`, { variant: "error" })
      return {} as any
    })
    .finally(() => {
      setLoading(false)
      if (typeof props.refetchProduct === "function") {
        props.refetchProduct()
      }
    })
  }

  const { classes, disableButton } = props;

  const product = props.product;
  const featuredVariant = props.product.featuredVariant;

  const aClient = useApolloClient();

  const [loading, setLoading] = React.useState(false);

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
                      color: isDarkMode
                        ? Colors.uniswapLightestGrey
                        : Colors.slateGreyBlack,
                      iconColor: isDarkMode
                        ? Colors.uniswapLightestGrey
                        : Colors.slateGreyBlack,
                      lineHeight: '1.5rem',
                      "::placeholder": {
                        fontSize: "0.875rem",
                        fontWeight: '400',
                        color: isDarkMode
                          ? Colors.uniswapLightestGrey
                          : Colors.slateGreyDarkest,
                        iconColor: isDarkMode
                          ? Colors.uniswapLightestGrey
                          : Colors.slateGreyDarkest,
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
                          paymentMethodId: newPaymentMethod.id,
                          stripeCustomerId: props?.user?.stripeCustomerId,
                        });
                        console.log("1: ORDER_MUTATION response: ", orderResponse)
                        let order = orderResponse?.unconfirmedOrder;
                        let stripePaymentIntent = JSON.parse(orderResponse?.stripePaymentIntent);
                        console.log("1b: stripe PaymentIntent: ", stripePaymentIntent)

                        snackbar.enqueueSnackbar(`Success order placed: ${order.id}`, { variant: "success" })

                        if (typeof props.handleOrderPostPurchase === "function") {
                          props.handleOrderPostPurchase(order)
                        }
                      })
                      .catch(e => {
                        console.warn(e)
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
                height: props.buttonHeight ? props.buttonHeight : "38px",
              }}
            >
              <span style={{ marginLeft: '0.25rem' }}>
                { props.title ? props.title : "Buy Instantly" }
              </span>
            </ButtonLoading>
          </div>


        </div>
      </div>
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
  product: Product;
  refetchProduct?(): void;
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
  sellerStoreId: string
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
    height: 40,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapMediumNavy
      : Colors.cream,
    // color: theme.palette.type === 'dark'
    //   ? Colors.uniswapLightestGrey
    //   : Colors.black,
    border: `1px solid rgba(170, 170, 170, 0.4)`,
    padding: "0.5rem",
    borderRadius: BorderRadius,
  },
  receiptLink: {
  },
  stripeElement: {
    boxSizing: 'border-box',
    height: '40px',
    padding: '10px 12px',
    border: '1px solid transparent',
    borderRadius: BorderRadius,
    // backgroundColor: 'white',
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
    borderRadius: BorderRadius,
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







