import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";

// import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';


const paymentMethodsResponse = {
  "groups":[
    {
      "name":"Credit Card",
      "types":["visa","mc","amex","jcb"]
    }
  ],
  "paymentMethods":[
    {
      "brands":["visa","mc","amex","jcb"],
      "details":[
        {"key":"encryptedCardNumber","type":"cardToken"},
        {"key":"encryptedSecurityCode","type":"cardToken"},
        {"key":"encryptedExpiryMonth","type":"cardToken"},
        {"key":"encryptedExpiryYear","type":"cardToken"},
        {"key":"holderName","optional":true,"type":"text"}
      ],
      "name":"Credit Card","type":"scheme"
    },
    {
      "name":"POLi","supportsRecurring":true,"type":"poli"
    },
    {
      "name":"UnionPay","supportsRecurring":true,"type":"unionpay"
    }
  ]
}

const configuration = {
  paymentMethodsResponse: paymentMethodsResponse, // The `/paymentMethods` response from the server.
  clientKey: "test_2A6AQ67YFJF2LN2N5NWF3NXSH4F6OTVJ", // Web Drop-in versions before 3.10.1 use originKey instead of clientKey.
  locale: "en-US",
  countryCode: "AU",
  environment: "test",
  onSubmit: (state, dropin) => {
      // Your function calling your server to make the `/payments` request
      console.log("state", state)
      console.log("paymentMethod:", JSON.stringify(state?.data?.paymentMethod))
      //  makePayment(state.data)
      //    .then(response => {
      //      if (response.action) {
      //        // Drop-in handles the action object from the /payments response
      //        dropin.handleAction(response.action);
      //      } else {
      //        // Your function to show the final result to the shopper
      //        showFinalResult(response);
      //      }
      //    })
      //    .catch(error => {
      //      throw Error(error);
      //    });
    },
  onAdditionalDetails: (state, dropin) => {
    // Your function calling your server to make a `/payments/details` request
      console.log("state.data", state?.data)
    // makeDetailsCall(state.data)
    //   .then(response => {
    //     if (response.action) {
    //       // Drop-in handles the action object from the /payments response
    //       dropin.handleAction(response.action);
    //     } else {
    //       // Your function to show the final result to the shopper
    //       showFinalResult(response);
    //     }
    //   })
    //   .catch(error => {
    //     throw Error(error);
    //   });
 },
 paymentMethodsConfiguration: {
   card: { // Example optional configuration for Cards
     hasHolderName: true,
     holderNameRequired: true,
     enableStoreDetails: true,
     hideCVC: false, // Change this to true to hide the CVC field for stored cards
     name: 'Credit or debit card'
   }
 }
};


const AdyenPayments = (props: ReactProps) => {

  const {
    classes,
  } = props;


  const [checkout, setCheckout] = React.useState(undefined)
  const [dropin, setDropin] = React.useState(undefined)

  React.useEffect(() => {
    if (process.browser) {
      // let checkout = new AdyenCheckout(configuration);
      let checkout: any;
      let dropin = checkout.create('dropin').mount('#dropin-container');
      setCheckout(checkout)
      setDropin(dropin)

      // const card = checkout.create("card", {
      //     // Optional configuration
      //     enableStoreDetails: true,
      //     hasHolderName: true,
      //     holderNameRequired: true,
      //     billingAddressRequired: true, // Optional. Set to true to show the billing address input fields.
      //     brands: ["visa", "amex"],
      //     onBrand: (brands) => {
      //       console.log("Brands: ", brands)
      //     }, // Your function for handling onBrand event
      //     data : {
      //       holderName: 'S. Hopper'
      //     },
      //     showPayButton: true,
      //     amount: {
      //       value: 10,
      //       currency: "AUD"
      //     },
      // }).mount("#card-container");
    }
  }, [])

  return (
    <div className={classes.adyenRoot}>

      <div id="card-container"></div>

      <div id="dropin-container"></div>
    </div>
  )
}



/////////// Typings //////////////

interface ReactProps extends WithStyles<typeof styles> {
}

/////////// Styles //////////////

const styles = (theme: Theme) => createStyles({
  adyenRoot: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: "2rem",
  },
});


export default withStyles(styles)( AdyenPayments );







