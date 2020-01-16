
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
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Loading from 'components/Loading';
// Stripe
import { CardElement } from 'react-stripe-elements';
import { StripeClient, StripePaymentMethodResponse } from "../../typings.stripe";
import { Cart, CartItem, UserPrivate, ID, Transaction, Order, ProductProductVariantId, PaymentMethod } from 'typings/gqlTypes';
import { CheckoutProductsResponse, CheckoutCartResponse } from "typings";
// cleanup Stripe loggers on unmount
import { destroyStripeIFrame } from "../index";
// Redux
import { useDispatch } from "react-redux";
import { Actions } from "reduxStore/actions";
// Components
import CreditCard from "layout/MySettingsModal/PaymentMethods/CreditCard";
import TextInput from "components/Fields/TextInput"
import SelectCreditCardDropdown from "./SelectCreditCardDropdown";
// Graphql
import { GET_USER_PAYMENT_METHODS } from "queries/payment_methods-queries";
import { useApolloClient } from '@apollo/react-hooks';
import {
  CHECKOUT_CART,
  CHECKOUT_PRODUCTS,
} from 'queries/orders-mutations';
import { stripePurchase } from '../CommonPurchase';







const VisaCheckout = (props: ReactProps) => {

  const createNewPaymentMethod = async(): Promise<StripePaymentMethodResponse> => {
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
    let { paymentMethod, error } = await props.stripe.createPaymentMethod('card', {
      // card: Stripe Elements tokenises card details
      billing_details: billing_details
    });
    if (error) {
      console.error(error)
    }
    return paymentMethod
  }

  interface StripePaymentProcessorData {
    paymentMethod: string;
    savePaymentMethod: boolean;
    customerId?: string;
  }

  const checkoutInstantly = async(cart: Cart, paymentMethodId: ID) => {

    setLoading(true)
    const order = await stripePurchase(apolloClient)(
      paymentMethodId,
      savePaymentMethod,
      cart,
      option(props).user.stripeCustomerId(),
      strangerEmail
    );

    setLoading(false)
    if (order.id) {
      console.log('Success! order response:', order)
      props.handleOrderPostPurchase(order)
    } else {
      alert("Payment failed for unknown reason, please try another payment method")
    }
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

  const defaultPaymentMethodId = option(props).user.defaultPaymentMethod.id();
  const defaultPaymentMethod = option(props).user.paymentMethods([]).find(
    p => p.id === defaultPaymentMethodId
  );


  const [loading, setLoading] = React.useState(false);
  const [showStripeElement, setShowStripeElement] = React.useState(false);
  const [savePaymentMethod, setSavePaymentMethod] = React.useState(false);
  // email if user is not logged in
  const [strangerEmail, setStrangerEmail] = React.useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState(
    defaultPaymentMethod
  );
  const [useNewCard, setUseNewCard] = React.useState(false);


  React.useEffect(() => {
    fetchUserPaymentMethods()
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
          showStripeElement ? "fadeInFast" : "hidden",
        )}>
          {
            defaultPaymentMethod &&
            !useNewCard &&
            <div className={classes.dropdownContainer}>
              <SelectCreditCardDropdown
                selectedPaymentMethod={selectedPaymentMethod || defaultPaymentMethod}
                setSelectedPaymentMethod={
                  (pm: PaymentMethod) => setSelectedPaymentMethod(pm)
                }
                paymentMethods={props.user.paymentMethods}
              />
            </div>
          }
          {
            (showStripeElement && !defaultPaymentMethod ||
            showStripeElement && useNewCard) &&
            <div className={clsx("fadeInFast", classes.flexCol)}>
              <Typography variant="subtitle2" className={classes.subtitle2}>
                Card Number
              </Typography>
              <div className={clsx(classes.creditCardContainer)}>
                <CardElement
                  hidePostalCode={true}
                  onReady={(el) => {
                    // el.focus()
                  }}
                />
              </div>
              {/* {
                option(props).user.email() &&
                !defaultPaymentMethod &&
                <FormControlLabel
                  className={classes.checkboxContainer}
                  control={
                    <Checkbox
                      checked={savePaymentMethod}
                      onChange={() => setSavePaymentMethod(s => !s)}
                      value="Special"
                      color="primary"
                    />
                  }
                  label={<div>{"Save card after purchase"}</div>}
                />
              } */}
              {
                !option(props).user.email() &&
                <div className={classes.flexCol}>
                  <Typography variant="subtitle2" className={classes.subtitle2}>
                    Email
                  </Typography>
                  <TextInput
                    placeholder={"Email to receive downloads"}
                    className={classes.emailField}
                    value={strangerEmail}
                    onChange={(e) => setStrangerEmail(e.target.value)}
                    inputProps={{ style: { width: '100%' }}}
                  />
                </div>
              }
            </div>
          }

          <div className={classes.flexRowCenter}>
            <Button
              onClick={
                option(selectedPaymentMethod).id()
                ? () => checkoutInstantly(props.cart, selectedPaymentMethod.id)
                : () => createNewPaymentMethod()
                        .then(newPaymentMethod => {
                          console.log("newPaymentMethod", newPaymentMethod)
                          checkoutInstantly(props.cart, newPaymentMethod.id)
                        })
                        .catch(e => console.warn(e))
              }
              disabled={disableButton}
              variant="contained"
              color="secondary"
              className={classes.buyButton}
              style={{
                height: props.buttonHeight ? props.buttonHeight : "40px",
              }}
            >
              <SaveAltIcon/>
              {
                props.title ? props.title : "Buy Instantly"
              }
            </Button>
          </div>

          {
            option(props).user.email() &&
            <div className={clsx(
              classes.flexRowCenter,
              classes.marginTop,
            )}>
              <a onClick={() => setUseNewCard(s => !s)} className={classes.link}>
                {
                  useNewCard
                    ? "Use existing cards"
                    : "Use New Card"
                }
              </a>
            </div>
          }
        </div>
      </div>
      {
        loading && <Loading fixed loading={true}/>
      }
    </ErrorBounds>
    );
  }
};

interface ReactProps extends WithStyles<typeof styles> {
  cart: Cart;
  user: UserPrivate;
  notLoggedInEmail?: string; // for non-logged in users
  display: boolean;
  disableButton: boolean;
  className?: string;
  stripe?: StripeClient & stripe.Stripe; // provided by AsyncStripeProvider
  handleOrderPostPurchase(order: Order): void;
  buttonHeight?: any;
  title?: string;
}
interface QueryData {
  user: UserPrivate;
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
    minWidth: '180px',
  },
  creditCardContainer: {
    margin: "0px",
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
    marginTop: '0.5rem',
    marginBottom: '0.25rem',
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
    justifyContent: "center",
    margin: 0,
  },
  buyButton: {
    width: "100%",
  },
  emailField: {
    flexGrow: 1,
    minWidth: 100,
  },
  subtitle2: {
    fontWeight: 600,
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

export default withStyles(styles)( VisaCheckout );







