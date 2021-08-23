
import React from 'react';
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
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
  UserPrivate, ID,
  OrderStatus,
  Orders,
  Product,
  BlankMutationResponse,
  Bids,
  PromotionPurchaseMutationResponse,
  PromotedSlot,
} from 'typings/gqlTypes';
// Components
import ErrorBounds from 'components/ErrorBounds';
import ButtonLoading from "components/ButtonLoading";
// redux
import { useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
// Graphql
import { useApolloClient, useLazyQuery } from '@apollo/client';
import { useQuery, useMutation } from "@apollo/client";
// Snackbar
import { useSnackbar } from "notistack";
import {
  PURCHASE_PROMOTION
} from "queries/promoted_lists-mutations";
import { useTheme } from '@material-ui/core';


const VisaPurchaseProduct = (props: ReactProps) => {

  const stripe: Stripe = useStripe();
  const elements = useElements();
  const snackbar = useSnackbar();
  const theme = useTheme()
  const isDarkMode = isThemeDark(theme)

  const { classes, disableButton } = props;

  const [internationalFee, setInternationalFee] = React.useState(0)
  const product = props.product;
  const purchasePrice = props.selectedBid?.offerPrice
    || props.promotedSlot?.reservePrice

  console.log("purchasePirce: ", purchasePrice)

  const [loading, setLoading] = React.useState(false);

  interface ReduxState {
    buyer: UserPrivate
  }

  const { buyer } = useSelector<GrandReduxState, ReduxState>(s => {
    return {
      buyer: s.reduxLogin.user,
    }
  })


  const [
    purchasePromotion,
    { data, loading: loading1, error}
  ] = useMutation<MData1, MVar1>(
    PURCHASE_PROMOTION, {
    variables: {
      promotedSlotId: undefined,
      productId: undefined,
      total: undefined,
      internationalFee: undefined,
      buyerId: buyer?.id,
      stripeCreatePaymentData: undefined,
      currency: "AUD",
      bidId: undefined,
    },
    onError: React.useCallback((e) => {
      console.warn(e)
      if (e?.message?.includes("duplicate")) {
        // promoted_slots_promoted_list_id_product_id_key
        snackbar.enqueueSnackbar(
          `This list already has that product. Payment cancelled.`,
          { variant: "error" }
        )
      } else {
        snackbar.enqueueSnackbar(`${e}`, { variant: "error" })
        snackbar.enqueueSnackbar(
          `Payment cancelled, please try an Australian card`,
          { variant: "info" }
        )
      }
    }, []),
    onCompleted: React.useCallback(async (data) => {
      console.log(data)
      if (typeof props.refetch === "function") {
        props.refetch()
      }
    }, []),
  });



  const createNewPaymentMethod = async(): Promise<PaymentMethod> => {

    if (!props.promotedSlot.isAvailableForPurchase) {
      snackbar.enqueueSnackbar(
        "This slot can't be bought",
        { variant: "info" }
      )
      throw new Error("This slot can't be bought")
    }

    let { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email: buyer?.email,
        // name: `${buyer?.firstName} ${buyer.lastName}`,
        // phone: `${buyer?.phoneNumber?.countryCode} ${buyer?.phoneNumber?.number}`,
      }
    })
    if (paymentMethod.card?.country !== "AU") {
      console.log("non-australian card: ", paymentMethod.card?.country)
      // %2.95 Stripe international fee, an extra %1.15 on top of base $1.75 fee
      setInternationalFee(Math.ceil(0.0115 * purchasePrice))
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


  const makePromotionPurchase = async({
    paymentMethodId,
  }): Promise<PromotionPurchaseMutationResponse> => {
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
    let response = await purchasePromotion({
      variables: {
        promotedSlotId: props.promotedSlot?.id,
        productId: product.id,
        total: purchasePrice,
        internationalFee: internationalFee,
        buyerId: buyer.id,
        stripeCreatePaymentData: JSON.stringify(stripeCreatePaymentData),
        currency: "AUD",
        // bidId: props.selectedBid?.id,
      }
    })

    let stripePaymentIntent = JSON.parse(
      response?.data?.purchasePromotion?.stripePaymentIntent ?? "{}"
    );
    let paymentIntent = stripePaymentIntent?.payment_intent
    // console.log("purchasePromotion response: ", response)
    console.info("paymentIntent", paymentIntent)

    if (paymentIntent.next_action) {
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
      return response?.data?.purchasePromotion
    } else {
      setLoading(false)
      return response?.data?.purchasePromotion
    }
  }



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

                        // 1. Create a purchase first with the backend
                        let promotionPurchaseResponse = await makePromotionPurchase({
                          paymentMethodId: newPaymentMethod.id,
                        });

                        console.log("1: PROMOTION_PURCHASE response: ", promotionPurchaseResponse)
                        let stripePaymentIntent = JSON.parse(promotionPurchaseResponse?.stripePaymentIntent);
                        console.log("1b: stripe PaymentIntent: ", stripePaymentIntent)

                        snackbar.enqueueSnackbar(
                          `Purchased slot: ${promotionPurchaseResponse.promotionPurchase.id}`,
                          { variant: "success" }
                        )

                        if (typeof props.handlePostPurchase === "function") {
                          props.handlePostPurchase(promotionPurchaseResponse)
                        }
                      })
                      .catch(e => {
                        console.warn(e)
                        setLoading(false)
                      })
              }
              loadingIconColor={Colors.blue}
              replaceTextWhenLoading={true}
              loading={loading || loading1}
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
  className?: string;
  buttonHeight?: any;
  title?: string;
  showIcon?: boolean;
  handlePostPurchase(p: any): void;
  product: Product;
  promotedSlot: PromotedSlot;
  refetch?(): void;
  selectedBid?: Bids;
}

interface MVar1 {
  promotedSlotId: string
  productId: string
  total: number
  internationalFee: number
  buyerId: string
  stripeCreatePaymentData: string
  currency?: string
  bidId?: string
}
interface MData1 {
  purchasePromotion: PromotionPurchaseMutationResponse
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
  marginTop: {
    marginTop: '1rem',
  },
});

export default withStyles(styles)( VisaPurchaseProduct );







