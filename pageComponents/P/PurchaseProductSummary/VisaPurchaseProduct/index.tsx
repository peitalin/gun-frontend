
import React from 'react';
import { oc as option } from 'ts-optchain';
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Error
import ErrorBounds from 'components/ErrorBounds';
// Material UI
import Button from '@material-ui/core/Button';
import ButtonLoading from "components/ButtonLoading";
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RelayDownloadIcon2 from "components/Icons/RelayDownloadIcon2";
import Loading from 'components/Loading';
// Stripe
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Stripe, PaymentMethod } from '@stripe/stripe-js';
import {
  Cart, CartItem, UserPrivate, ID,
  Transaction,
  Order, OrderStatus,
  ProductProductVariantId, PaymentMethod as EFCPaymentMethod,
} from 'typings/gqlTypes';
import { CheckoutProductsResponse, CheckoutCartResponse } from "typings";
// cleanup Stripe loggers on unmount
import { destroyStripeIFrame } from "pageComponents/P/common";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Components
import CreditCard from "layout/MySettingsModal/PaymentMethods/CreditCard";
import TextInput from "components/Fields/TextInput"
import SelectCreditCardDropdown from "./SelectCreditCardDropdown";
import SnackbarsSuccessErrors from "components/Snackbars/SnackbarsSuccessErrors";
// Graphql
import { GET_USER_PAYMENT_METHODS } from "queries/payment_methods-queries";
import { useApolloClient } from '@apollo/client';
import {
  // CHECKOUT_CART,
  CHECKOUT_PRODUCTS,
} from 'queries/orders-mutations';
// import { stripePurchaseCartless } from "pageComponents/P/CommonPurchase";




const VisaPurchaseProduct = (props: ReactProps) => {

  const stripe: Stripe = useStripe();
  const elements = useElements();

  const createNewPaymentMethod = async(): Promise<PaymentMethod> => {
    // Within the context of `Elements`, this call to createPaymentMethod
    // knows from which Element to create the PaymentMethod,
    // See our createPaymentMethod documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method
    let billing_details = undefined;
    if (props.user) {
      billing_details = {
        email: props.user.email,
      }
    } else {
      billing_details = {
        email: strangerEmail,
      }
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

  const checkoutInstantly = async(
    selectedPaymentMethodId: ID,
    useNewCard: boolean,
  ) => {

    setLoading(true)
    // analyticsEvent("BuyNowButton.Pressed")

    // const { order, stripeConfirmResponse } = await stripePurchaseCartless(
    //   apolloClient,
    //   stripe,
    //   elements,
    // )({
    //   paymentMethodId: selectedPaymentMethodId,
    //   useNewCard: useNewCard,
    //   savePaymentMethod: savePaymentMethod && useNewCard,
    //   productsInfo: props.productsInfo,
    //   quotedPrice: props.quotedPrice,
    //   stripeCustomerId: option(props).user.stripeCustomerId(),
    //   strangerEmail: strangerEmail,
    // });

    // setLoading(false)

    // if (order.id && order.currentSnapshot.orderStatus === OrderStatus.CONFIRMED) {
    //   setData("Your order was confirmed!") // trigger success snackbar
    //   console.log('Success! order response:', order)
    //   props.handleOrderPostPurchase(order)

    //   analyticsEvent("Order.Processed", {
    //     itemCount: option(order).items.length(0),
    //     totalPrice: props.quotedPrice,
    //     paymentType: selectedPaymentMethodId, // paymentId lets us lookup specifically which
    //     // kind of payment method used.
    //     // Stripe paymentMethodIds will begin with it's own prefix, as will Paypal
    //     isLoggedOut: order.isLoggedOutPurchase,
    //     instantBuy: !order.isLoggedOutPurchase && order.isCartlessPurchase,
    //     saveCard: savePaymentMethod && useNewCard,
    //   })
    // } else {
    //   if (option(stripeConfirmResponse).error.message()) {
    //     setError(`${stripeConfirmResponse.error.message}`)
    //   } else {
    //     setError("Payment failed. Please try another payment method.")
    //   }
    //   // trigger error snackbar
    // }
  }


  const fetchUserPaymentMethods = async() => {
    let { data, loading, errors } = await apolloClient.query({
      query: GET_USER_PAYMENT_METHODS,
    });
    // redux
    dispatch(Actions.reduxLogin.SET_USER({
      ...props.user,
      ...data.user,
    }))
  }

  const { classes, display, disableButton } = props;
  const apolloClient = useApolloClient();
  const dispatch = useDispatch();
  const showProductPageStripeComponent = useSelector<GrandReduxState, boolean>(
    s => s.reduxStripe.showProductPageStripeComponent
  );

  const defaultPaymentMethodId = option(props).user.defaultPaymentMethod.id();
  const defaultPaymentMethod = option(props).user.paymentMethods([]).find(
    p => p.id === defaultPaymentMethodId
  );

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(undefined);
  const [error, setError] = React.useState(undefined);

  const [showStripeElement, setShowStripeElement] = React.useState(false);
  const [savePaymentMethod, setSavePaymentMethod] = React.useState(!!option(props).user.id());
  const [showSavePaymentMethod, setShowSavePaymentMethod] = React.useState(false);
  // email if user is not logged in
  const [strangerEmail, setStrangerEmail] = React.useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState(
    defaultPaymentMethod
  );
  const [useNewCard, setUseNewCard] = React.useState(true);

  React.useEffect(() => {
    // fetchUserPaymentMethods()
    setTimeout(() => {
      setShowStripeElement(true)
    }, 0)
    return destroyStripeIFrame
  }, [defaultPaymentMethod])


  if (display === false) {
    return <></>
  } else {
    return (
    <ErrorBounds name="Visa Checkout" className={props.className}>
      <div className={classes.root}>
        <div className={clsx(
          classes.formContainer,
          // showStripeElement ? "fadeInFast" : "hidden",
        )}>
          {
            defaultPaymentMethod &&
            option(props).user.paymentMethods() &&
            !useNewCard &&
            <div className={classes.dropdownContainer}>
              <SelectCreditCardDropdown
                selectedPaymentMethod={selectedPaymentMethod}
                setSelectedPaymentMethod={
                  (pm: EFCPaymentMethod) => setSelectedPaymentMethod(pm)
                }
                paymentMethods={props.user.paymentMethods}
                showExpiry={false}
              />
            </div>
          }
          {
            (showStripeElement && !defaultPaymentMethod ||
            showStripeElement && useNewCard) &&
            <div className={clsx(classes.flexCol)}>
              {
                !option(props).user.email() &&
                <div className={classes.flexCol}>
                  <TextInput
                    placeholder={"Enter your email address"}
                    className={classes.emailField}
                    value={strangerEmail}
                    onChange={(e) => setStrangerEmail(e.target.value)}
                    inputProps={{ style: { width: '100%' }}}
                  />
                </div>
              }
              <div className={clsx(classes.creditCardContainer)}>
                {
                  // ensure only 1 instance of StripeComponents exists in viewport
                  showProductPageStripeComponent &&
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
                      // if credit card is complete AND there is a user account
                      // then show "Save card"
                      if (event.complete && !!option(props).user.id()) {
                        setShowSavePaymentMethod(true)
                      } else {
                        setShowSavePaymentMethod(false)
                      }
                    }}
                  />
                }
              </div>
            </div>
          }

          <div className={classes.flexRowCenter}>
            <ButtonLoading
              onClick={
                option(selectedPaymentMethod).id()
                ? () => checkoutInstantly(selectedPaymentMethod.id, useNewCard)
                : () => createNewPaymentMethod()
                        .then(newPaymentMethod => {
                          checkoutInstantly(newPaymentMethod.id, useNewCard)
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
              <RelayDownloadIcon2 />
              <span style={{ marginLeft: '0.25rem' }}>
              { props.title ? props.title : "Buy Instantly" }
              </span>
            </ButtonLoading>
          </div>

          <div className={classes.flexRowCenter}>
            {
              showSavePaymentMethod &&
              <FormControlLabel
                className={classes.checkboxContainer}
                control={
                  <Checkbox
                    checked={savePaymentMethod && useNewCard}
                    onChange={() => setSavePaymentMethod(s => !s)}
                    value="Special"
                    color="primary"
                  />
                }
                label={<div className={classes.checkboxText}>{"Save card"}</div>}
              />
            }
          </div>

          {
            option(props).user.email() &&
            (option(props).user.paymentMethods.length() > 0) &&
            <div className={clsx(
              classes.flexRowCenter,
              !showSavePaymentMethod && classes.marginTop,
            )}>
              <a className={classes.link}
                onClick={() => {
                  // if currently on useNewCard menu, transition to
                  // use saved card and hide savePaymentMethod checkbox
                  if (useNewCard) {
                    setShowSavePaymentMethod(false)
                    setUseNewCard(false)
                  } else {
                    setUseNewCard(true)
                  }
                }}
              >
                {
                  useNewCard
                    ? "Use existing cards"
                    : "Use new card"
                }
              </a>
            </div>
          }
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
  }
};

interface ReactProps extends WithStyles<typeof styles> {
  display: boolean;
  disableButton?: boolean;
  user?: UserPrivate;
  className?: string;
  buttonHeight?: any;
  title?: string;
  showIcon?: boolean;
  handleOrderPostPurchase(order: Order): void;
  quotedPrice: number; // in cents
  productsInfo: ProductProductVariantId[];
}

/////////////// Styles /////////////
const styles = (theme: Theme) => createStyles({
  root: {
    position: "relative",
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
    border: `1px solid rgba(170, 170, 170, 0.4)`,
    padding: "0.5rem",
    borderRadius: '4px',
  },
  receiptLink: {
    fontFamily: '"Segoe UI","Helvetica Neue",Arial,sans-serif',
  },
  stripeElement: {
    boxSizing: 'border-box',
    height: '40px',
    padding: '10px 12px',
    border: '1px solid transparent',
    borderRadius: '4px',
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







