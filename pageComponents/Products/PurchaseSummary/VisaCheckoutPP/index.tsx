
import * as React from 'react';
import { oc as option } from 'ts-optchain';
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Error
import ErrorBounds from 'components/ErrorBounds';
// Material UI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Loading from 'components/Loading';
// Stripe
import { CardElement } from 'react-stripe-elements';
import { StripeClient, StripePaymentMethodResponse } from "layout/Checkout/typings.stripe";
import { Order, UserPrivate, ID, PaymentMethod, ProductProductVariantId, PaymentProcessor } from 'typings/gqlTypes';
// cleanup Stripe loggers on unmount
import { destroyStripeIFrame } from "layout/Checkout/CheckoutPage/index";
// Redux
import { useDispatch } from "react-redux";
import { Actions } from "reduxStore/actions";
// Components
import CreditCard from "layout/MySettingsModal/PaymentMethods/CreditCard";
import { Colors, BorderRadius } from "layout/AppTheme";
// Graphql
import { GET_USER_PAYMENT_METHODS } from "queries/payment_methods-queries";
import { useApolloClient } from '@apollo/react-hooks';

// Instant buy without being logged in
import {
  CHECKOUT_PRODUCTS,
} from "queries/orders-mutations";
import { calculateFeesAndTaxes } from "reduxStore/pricing/feesAndTaxes";
import SelectCreditCardDropdown from "layout/Checkout/CheckoutPage/VisaCheckout/SelectCreditCardDropdown";






const VisaCheckout = (props: ReactProps) => {

  const checkoutInstantly = async(paymentMethodId: ID) => {

    setLoading(true)

    interface StripePaymentProcessorData {
      paymentMethod: string;
      savePaymentMethod: boolean;
      customerId?: string;
    }
    const processorData: StripePaymentProcessorData = {
      paymentMethod: paymentMethodId,
      savePaymentMethod: savePaymentMethod,
      customerId: option(props).user.stripeCustomerId(),
    };
    const processorDataString = JSON.stringify(processorData);

    // console.log("productsInfo: ", props.productsInfo)
    // console.log("quotedPrice: ", props.quotedPrice)
    // console.log("paymentProcessorData: ", processorDataString)

    let { total, taxes, paymentFee } = calculateFeesAndTaxes(
      PaymentProcessor.STRIPE
    )(props.quotedPrice, false);

    const { data } =
    await apolloClient.mutate<MutationData, MutationVar>({
      mutation: CHECKOUT_PRODUCTS,
      variables: {
        productsInfo: props.productsInfo,
        promoCodesToAdd: [],
        quotedPrice: total,
        paymentProcessorData: processorDataString,
        anonOrderEmailAddress: option(props).user.email()
      }
    });

    setLoading(false)

    if (option(data).checkoutProducts.order.id()) {
      props.handleOrderPostPurchase(data.checkoutProducts.order)
      console.log('Success! order response:', data.checkoutProducts.order)
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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<PaymentMethod>(
    defaultPaymentMethod
  );

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
        <div className={classes.formContainer}>
          <div className={classes.flexRowCenter}>
            {
              defaultPaymentMethod &&
              <div className={classes.dropdownContainer}>
                <SelectCreditCardDropdown
                  selectedPaymentMethod={selectedPaymentMethod || defaultPaymentMethod}
                  setSelectedPaymentMethod={
                    (pm: PaymentMethod) => setSelectedPaymentMethod(pm)
                  }
                  paymentMethods={props.user.paymentMethods}
                  showExpiry={true}
                />
              </div>
            }
            <Button
              onClick={
                () => checkoutInstantly(selectedPaymentMethod.id)
              }
              disabled={disableButton}
              variant="contained"
              color="secondary"
              className={classes.buyButton}
              style={{
                height: props.buttonHeight ? props.buttonHeight : "40px",
              }}
            >
              {
                props.title ? props.title : "Buy Instantly"
              }
            </Button>
          </div>
          {
            showStripeElement &&
            !defaultPaymentMethod &&
            <div className={"fadeIn"}>
              <div className={classes.creditCardContainer}>
                <CardElement
                  onReady={(el) => el.focus()}
                  hidePostalCode={true}
                />
              </div>
              {/* <FormControlLabel
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
              /> */}
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
  className: string;
  user: UserPrivate;
  display: boolean;
  disableButton: boolean;
  stripe?: StripeClient & stripe.Stripe; // provided by AsyncStripeProvider
  quotedPrice: number; // in cents
  productsInfo: ProductProductVariantId[];
  handleOrderPostPurchase(order: Order): void;
  buttonHeight?: any;
  title?: string;
}
interface QueryData {
  user: UserPrivate;
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
  },
  formContainer: {
    minWidth: '150px',
  },
  creditCardContainer: {
    margin: "0.5rem 0px 0px 0px",
    border: `2px solid ${Colors.charcoal}`,
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
  cardContainer: {
    marginTop: '0.25rem',
    width: '100%',
  },
  dropdownContainer: {
    width: '100%',
    marginBottom: '0.5rem',
  },
});

export default withStyles(styles)( VisaCheckout );







