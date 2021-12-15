
import React from 'react';
import clsx from "clsx";
// Styles
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius, BorderRadius3x, Gradients, isThemeDark } from "layout/AppTheme";
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
  StripeCreatePaymentData,
  StripeConfirmResponse,
} from "pageComponents/P/PurchaseProductSummary/VisaPurchaseProduct/purchaseTypings";
import {
  UserPrivate,
  ClassifiedAdPaymentInput,
  ProductListingMutationResponse,
} from 'typings/gqlTypes';
// Components
import ButtonLoading from "components/ButtonLoading";
// redux
import { useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
// Snackbar
import { useSnackbar } from "notistack";
import { useTheme } from '@mui/material';
import { buttonWidthClassified } from "../constants";





const VisaPurchaseProduct = (props: ReactProps) => {

  const stripe: Stripe = useStripe();
  const elements = useElements();
  const snackbar = useSnackbar();
  const theme = useTheme()
  const isDarkMode = isThemeDark(theme)

  const {
    classes,
    disableButton,
    priceInCents = 1000 // $10
  } = props

  const [internationalFee, setInternationalFee] = React.useState(0)
  const [loading, setLoading] = React.useState(false);

  interface ReduxState {
    buyer: UserPrivate
  }

  const { buyer } = useSelector<GrandReduxState, ReduxState>(s => {
    return {
      buyer: s.reduxLogin.user,
    }
  })


  const createNewPaymentMethod = async(): Promise<PaymentMethod> => {

    await props.validateForm()

    let { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email: buyer?.email,
        // phone: `${buyer?.phoneNumber?.countryCode} ${buyer?.phoneNumber?.number}`,
      }
    })
    if (paymentMethod.card?.country !== "AU") {
      console.log("non-australian card: ", paymentMethod.card?.country)
      // %2.95 Stripe international fee, an extra %1.15 on top of base $1.75 fee
      setInternationalFee(Math.ceil(0.0115 * priceInCents))
    } else {
      setInternationalFee(0)
    }

    console.log("paymentMethod: ", paymentMethod)
    if (error) {
      snackbar.enqueueSnackbar(
        `createNewPaymentMethod error: ${error}`,
        { variant: "error"}
      )
    }
    return paymentMethod
  }


  const purchaseClassifiedAndCreateProduct = async({
    paymentMethodId,
  }): Promise<ProductListingMutationResponse> => {
    // creates an order on the backend, and places a hold on the users card
    // with a payment authorization (to be captured later)

    setLoading(true)

    if (!buyer?.id) {
      snackbar.enqueueSnackbar(`Login to purchase.`, { variant: "info" })
      setLoading(false)
      return
    }

    const stripeCreatePaymentData: StripeCreatePaymentData = {
      paymentMethod: paymentMethodId,
    };

    // 1. Create Order + create stripe payment intent in the backend
    let response = await props.purchaseClassifiedAdAndCreateProductListing(
      {
        total: priceInCents,
        internationalFee: internationalFee,
        stripeCreatePaymentData: JSON.stringify(stripeCreatePaymentData),
        currency: "AUD",
      } as ClassifiedAdPaymentInput
    )

    let stripePaymentIntent = JSON.parse(
      response?.data?.purchaseClassifiedAd?.stripePaymentIntent ?? "{}"
    );
    let paymentIntent = stripePaymentIntent?.payment_intent
    // console.log("purchaseClassifiedAd response: ", response)
    console.info("paymentIntent", paymentIntent)

    if (paymentIntent?.next_action) {
      await stripe.confirmCardPayment(
        paymentIntent.client_secret
      ).then(result => {
        if (result?.error) {
          console.log("result.error: ", result?.error)
        } else {
          console.log("handleCardAction: ", result)
        }
      })
      setLoading(false)
      return response?.data?.purchaseClassifiedAd
    } else {
      setLoading(false)
      return response?.data?.purchaseClassifiedAd
    }
  }



  return (
    <div className={clsx(classes.root, props.className)}>
      <div className={clsx(
        classes.formContainer,
        classes.testMode,
      )}>
        ADMIN TESTING ONLY
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

                      // 1. Create a purchase first with the backend
                      let classifiedPurchaseResponse = await purchaseClassifiedAndCreateProduct({
                        paymentMethodId: newPaymentMethod.id,
                      });

                      console.log("1: classifiedPurchaseResponse: ", classifiedPurchaseResponse)
                      let stripePaymentIntent = JSON.parse(classifiedPurchaseResponse?.stripePaymentIntent);
                      console.log("1b: stripe PaymentIntent: ", stripePaymentIntent)

                      snackbar.enqueueSnackbar(
                        `Purchased Ad Listing`,
                        { variant: "success" }
                      )

                      if (typeof props.handlePostPurchase === "function") {
                        props.handlePostPurchase(classifiedPurchaseResponse)
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
              maxWidth: buttonWidthClassified,
              height: props.buttonHeight ? props.buttonHeight : "44px",
            }}
          >
            <span style={{ marginLeft: '0.25rem' }}>
              { props.title ? props.title : "Create Ad" }
            </span>
          </ButtonLoading>
        </div>

      </div>
    </div>
  );
};

interface ReactProps extends WithStyles<typeof styles> {
  display: boolean;
  disableButton?: boolean;
  className?: string;
  buttonHeight?: any;
  title?: string;
  validateForm(): void
  purchaseClassifiedAdAndCreateProductListing(
    a: ClassifiedAdPaymentInput
  ): any
  handlePostPurchase(p: any): void;
  priceInCents?: number
}




/////////////// Styles /////////////
const styles = (theme: Theme) => createStyles({
  root: {
    marginBottom: '1rem',
    width: '100%',
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  testMode: {
    // border: `1px solid ${Colors.purple}`,
    color: Colors.yellow,
    backgroundColor: Colors.lightYellow,
    width: '100%',
    borderRadius: BorderRadius,
  },
  formContainer: {
    width: buttonWidthClassified,
    // height: 90,
  },
  creditCardContainer: {
    margin: "0px",
    height: 44,
    backgroundColor: theme.palette.mode === 'dark'
      ? Colors.uniswapMediumNavy
      : Colors.cream,
    // color: theme.palette.mode === 'dark'
    //   ? Colors.uniswapLightestGrey
    //   : Colors.black,
    border: `1px solid rgba(170, 170, 170, 0.4)`,
    padding: "0.7rem",
    borderRadius: BorderRadius,
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
  buyButton: {
    width: "100%",
    borderRadius: BorderRadius,
  },
  emailField: {
    flexGrow: 1,
    minWidth: 100,
  },
  marginTop: {
    marginTop: '1rem',
  },
  link: {
    color: Colors.blue,
    fontSize: "0.9rem",
    cursor: 'pointer',
    "&:hover": {
      color: alpha(Colors.blue, 0.9),
    },
  },
  bidButtonContainer: {
    width: "100%",
    marginTop: "0.5rem",
  },
});

export default withStyles(styles)( VisaPurchaseProduct );







