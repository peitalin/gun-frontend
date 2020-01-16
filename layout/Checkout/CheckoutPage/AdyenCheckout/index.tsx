
import * as React from 'react';
import { oc as option } from 'ts-optchain';
import classNames from "classnames";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Error
import ErrorBounds from 'components/ErrorBounds';
// Material UI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Loading from 'components/Loading';
import { Cart, UserPrivate, Transaction, ID, Order } from 'typings/gqlTypes';
// Graphql
import { useApolloClient } from "@apollo/react-hooks";
// Redux
import { useDispatch } from "react-redux";
import { Colors, BorderRadius } from "layout/AppTheme";



const AdyenCheckout = (props: ReactProps) => {

  const [adyen, setAdyen] = React.useState(false);
  const { classes, display, disableButton } = props;
  const [loading, setLoading] = React.useState(false);

  const aClient = useApolloClient();
  const dispatch = useDispatch();

  const handleOnChange = (state, component) => {
    console.log(state, component)
    state.isValid // True or false. Specifies if all the information that the shopper provided is valid.
    state.data // Provides the data that you need to pass in the `/payments` call.
    component // Provides the active component instance that called this event.
  }

  const handleOnAdditionalDetails = (state, component) => {
    console.log(state, component)
    state.data // Provides the data that you need to pass in the `/payments/details` call.
    component // Provides the active component instance that called this event.
  }

  const handleOnSubmit = (state, component) => {
    console.log("handleOnSubmit", state, component)
    state.isValid // True or false. Specifies if all the information that the shopper provided is valid.
    state.data // Provides the data that you need to pass in the `/payments` call.
    component // Provides the active component instance that called this event.
    // window.component = component
  }


  React.useEffect(() => {
    if (window.AdyenCheckout && display) {
      // get this response from efc-payments
      let paymentMethodsResponse = {
        "groups":[
          {
            "name": "Credit Card",
            "types": [ "visa", "mc", "amex", "cup", "diners", "discover", "maestro" ]
          }
        ],
        "paymentMethods":[
          {
            "brands": [
              "visa", "mc", "amex", "cup", "diners", "discover", "maestro"
            ],
            "details": [
              { "key": "encryptedCardNumber", "type": "cardToken" },
              { "key": "encryptedSecurityCode", "type": "cardToken" },
              { "key": "encryptedExpiryMonth", "type": "cardToken" },
              { "key": "encryptedExpiryYear", "type": "cardToken" },
              { "key": "holderName", "optional": true, "type":"text" }
            ],
            "name":"Credit Card","type":"scheme"
          },
          { "name":"PayPal", "supportsRecurring":true, "type":"paypal" },
          { "name":"POLi", "supportsRecurring": true, "type":"poli" },
          {
            "details": [
              { "key": "encryptedCardNumber", "type": "cardToken" },
              { "key": "encryptedSecurityCode", "type": "cardToken" },
              { "key": "encryptedExpiryMonth", "type": "cardToken" },
              { "key": "encryptedExpiryYear", "type": "cardToken" },
              { "key": "holderName", "optional": true, "type": "text" },
              { "key": "telephoneNumber", "optional": true, "type": "text" }
            ],
            "name": "ExpressPay", "supportsRecurring": true, "type":"cup"
          },
          { "name": "UnionPay", "supportsRecurring": true, "type": "unionpay" }
        ]
      };

      console.log("window.AdyenCheckout: ", window.AdyenCheckout)
      // Client side key for https://www.xxxxxx.net
      // ADYEN_ORIGIN_KEY="pub.v2.8015597093840223.aHR0cHM6Ly93d3cuZmlsZXdvcmtzLm5ldA.W4r1vudZPKzxUQMweY0Aev-6lB4Mqp-cA6_ulwCSeBE"
      // Client side key for https://0.0.0.0:9000
      // ADYEN_ORIGIN_KEY="pub.v2.8015597093840223.aHR0cHM6Ly8wLjAuMC4wOjkwMDA.-osEvr3ae-H5yaTnfW47_R6Zx36ffMW5qXYI_D1KycI"

      const configuration = {
          locale: "en_AU",
          environment: "test",
          originKey: "pub.v2.8015597093840223.aHR0cHM6Ly8wLjAuMC4wOjkwMDA.-osEvr3ae-H5yaTnfW47_R6Zx36ffMW5qXYI_D1KycI",
          paymentMethodsResponse: paymentMethodsResponse,
          onChange: handleOnChange,
          onAdditionalDetails: handleOnAdditionalDetails,
          showPayButton: true,
          showButton: true,
          onSubmit: handleOnSubmit,
          enableStoreDetails: true,
          amount: {             // Optional. Used to display the amount in the Pay Button.
            value: 1000,
            currency: 'EUR'
          }
      };
      const adyen = new window.AdyenCheckout(configuration);
      // window.adyen = adyen;
      console.log(document.querySelector("#adyen-button"))

      // const card = adyen.create("card").mount("#adyen-button");
      const card = adyen.create("poli").mount("#adyen-button");
      // const card = adyen.create("cup").mount("#adyen-button");
      // const card = adyen.create("unionpay").mount("#adyen-button");
      // const card = adyen.create("paypal").mount("#adyen-button");

      setAdyen(card)
      console.log("adyen: ", card)
    }
  }, [display])

  if (display === false) {
    return <div id="adyen-button"></div>
  } else {
    return (
    <ErrorBounds name="Adyen Checkout" className={props.className}>
      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.flexRowCenter}>
            <Button
              onClick={() => {
              }}
              disabled={disableButton}
              variant="contained"
              color="secondary"
              className={classes.buyButton}
            >
              Buy Now
            </Button>
            <div id="adyen-button"></div>
          </div>
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
  display: boolean;
  cart: Cart;
  disableButton: boolean;
  handleOrderPostPurchase(order: Order): void;
}
interface QueryData {
  user: UserPrivate;
}

/////////////// Styles /////////////
const styles = (theme: Theme) => createStyles({
  root: {
    position: "relative",
    marginTop: '1rem',
    marginBottom: '0.5rem',
    marginLeft: '2rem', // 2rem matches with 35px height button
    marginRight: '2rem', // 2rem matches with 35px height button
  },
  formContainer: {
    minWidth: '220px',
  },
  creditCardContainer: {
    margin: "0.5rem 0px",
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
  buyButton: {
    width: "100%",
  },
});

export default withStyles(styles)( AdyenCheckout );







