
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
import {
  UserPrivate, ID,
  Orders,
  OrderStatus,
  Product,
  PaymentMethod as EFCPaymentMethod,
} from 'typings/gqlTypes';
import { OrderMutationResponse } from "typings/gqlTypes";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Components
import CreditCard from "layout/MySettingsModal/PaymentMethods/CreditCard";
import TextInput from "components/Fields/TextInput";
import TextInputCreditCard from "components/Fields/TextInputCreditCard";
import SnackbarsSuccessErrors from "components/Snackbars/SnackbarsSuccessErrors";
// Graphql
import { GET_USER_PAYMENT_METHODS } from "queries/payment_methods-queries";
import { useApolloClient } from '@apollo/client';
// Snackbar
import { useSnackbar, ProviderContext } from "notistack";
import { WestpacError } from "typings/typings-westpac";

// text mask for credit card
import { Rifm } from 'rifm';

import {
  CREATE_ORDER,
  CONFIRM_ORDER,
} from "queries/orders-mutations";


const WestpacPurchaseProduct = (props: ReactProps) => {

  const snackbar = useSnackbar();


  const createOrderFirst = async() => {

    // setLoading(true)
    const variant = featuredVariant;
    if (!option(props).user.id()) {
      snackbar.enqueueSnackbar(`Login to purchase.`, { variant: "info" })
      setLoading(false)
      return
    }

    const response = await aClient.mutate<MutData1, MutVar1>({
      mutation: CREATE_ORDER,
      variables: {
        productId: product.id,
        productSnapshotId: product.currentSnapshot.id,
        variantId: variant.variantId,
        variantSnapshotId: variant.variantSnapshotId,
        total: variant.price,
        buyerId: props.user.id,
        sellerId: product.store.id,
        bidId: undefined,
      }
    });
    console.log("createOrder response: ", response.data.createOrder)
    return response.data.createOrder
  }

  const confirmOrderSecond = async(
    orderId: string,
    singleUseTokenId: string,
  ) => {

    const response = await aClient.mutate<MutData1, MutVar2>({
      mutation: CONFIRM_ORDER,
      variables: {
        orderId: orderId,
        singleUseTokenId: singleUseTokenId,
      }
    });
    console.log("confirmOrder response: ", response);
    // if (order.id && order.currentSnapshot.orderStatus === OrderStatus.CONFIRMED) {
    //   setData("Your order was confirmed!") // trigger success snackbar
    //   console.log('Success! order response:', order)
    //   props.handleOrderPostPurchase(order)
    // } else {
    //   if (option(stripeConfirmResponse).error.message()) {
    //     setError(`${stripeConfirmResponse.error.message}`)
    //   } else {
    //     setError("Payment failed. Please try another payment method.")
    //   }
    //   // trigger error snackbar
    // }
    return response
  }

  const handleWestpacError = (errors: WestpacError[]) => {
    let errorMsgs = errors
      .map(e => `${e.fieldName}: ${e.messages[0]}`)

    errorMsgs.forEach(msg => {
      snackbar.enqueueSnackbar(msg, { variant: "error" })
    })
    setForceShowCardError(true)
    setTimeout(() => {
      setForceShowCardError(false)
    }, 9000)
  }

  const formatCreditCard = ccString => {
    if (!ccString) {
      return ""
    }
    let cc = ccString.replace(/\s/g, '');
    let cc1 = cc.slice(0,4)
    let cc2 = cc.slice(4,8)
    let cc3 = cc.slice(8,12)
    let cc4 = cc.slice(12,16)
    let ccFinal = [cc1, cc2, cc3, cc4].filter(cc => !!cc).join(" ")
    return ccFinal
  }

  const { classes, display, disableButton } = props;

  const product = props.product;
  const featuredVariant = props.product.featuredVariant;

  const aClient = useApolloClient();

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(undefined);
  const [error, setError] = React.useState(undefined);

  // email if user is not logged in
  const [buyerName, setBuyerName] = React.useState("");
  const [creditCardNumber, setCreditCardNumber] = React.useState();
  const [cardValid, setCardValid] = React.useState(undefined);
  const [forceShowCardError, setForceShowCardError] = React.useState(false)

  React.useEffect(() => {
    if (window.QuickstreamAPI) {
      window.QuickstreamAPI.init({
        publishableApiKey: "C00221_PUB_t5uacva3itw4syqdeiyt3gd4u5e27miyvedja862r22mjep75vrh9mmhv3v6"
      })
    }
  }, [window.QuickstreamAPI])


  let westpacCreditCardId = "westpac-cc-form"
  // console.log("product: ", product)
  // console.log("user: ", props.user)

  if (display === false) {
    return <></>
  } else {
    return (
    <ErrorBounds name="Westpac Checkout" className={props.className}>
      <div className={classes.root}>
        <div className={clsx(classes.formContainer)}>
          <div className={clsx(classes.flexCol)}>

            <form
              className={classes.flexRowCenter}
              id={westpacCreditCardId}
              onSubmit={async (e) => {

                e.preventDefault()
                let ccForm = document.getElementById(westpacCreditCardId)

                window.QuickstreamAPI.creditCards
                  .validateCardNumber(ccForm, (errors, data) => {
                    // console.log("validateCardNumber errors: ", errors); // Example output: false
                    // console.log("validateCardNumber data: ", data); // Example output: false
                  })

                // 1. Create an order first with the backend
                let orderResponse = await createOrderFirst();
                let order = option(orderResponse).order();
                console.log("ORDER_MUTATION response: ", orderResponse)
                console.log("ORDER response: ", order)

                if (option(order).id()) {
                  // 2. get token from Westpac quickstream
                  window.QuickstreamAPI.creditCards
                  .getToken(ccForm, "C00221", async (errors, data) => {
                    console.log("westpac token: ", data)
                    if (errors && errors.length > 0) {
                      // 3a. handle error if error
                      handleWestpacError(errors)
                    } else {
                      // 3b. use token to make a payment, and confirm the order
                      let singleUseTokenId = data.token;
                      snackbar.enqueueSnackbar(`Success token: ${singleUseTokenId}`, { variant: "success" })
                      let res = await confirmOrderSecond(order.id, singleUseTokenId)
                      // 4. once payment is finalized, and order is finalized
                      // proceed with screen transitions, etc
                      console.log("order res: ", res)
                    }
                    setLoading(false)
                    return data
                  })
                }


              }}
            >

              <TextInput
                placeholder={"Enter name on card"}
                className={classes.inputField}
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                inputProps={{
                  style: { width: '100%' },
                  "data-quickstream-api": "cardholderName"
                }}
                data-quickstream-api="cardholderName"
              />

              <Rifm
                // $ need to be in regexp to prevent cursor jumping on backspace
                accept={/[\d.$]/g}
                format={formatCreditCard}
                value={creditCardNumber}
                onChange={value => {
                  // values before currency mask
                  // multiple by 100 as formik/graphql takes cents, not dollars
                  // let dollars = parseNumber(value)
                  // setVariablePrice(dollars)
                  // updatePrice(dollars * 100)
                  // multiple by 100 as formik/graphql takes cents, not dollars
                }}
              >
                {({ value, onChange }) => {

                  let ccForm = document.getElementById(westpacCreditCardId)
                  // console.log("#westpac-cc-form: ", ccForm)

                  window.QuickstreamAPI.creditCards
                    .validateCardNumber(ccForm, (errors, data) => {
                      // console.log("validateCardNumber: ", data); // Example output: false
                      if (data) {
                        setCardValid(data.isValid)
                      }
                    })

                  return (
                    <TextInputCreditCard
                      placeholder={"Card number"}
                      className={classes.inputField}
                      isCreditCardField={true}
                      value={value}
                      isCardValid={cardValid}
                      iconType={
                        value.startsWith("4")
                        ? "visa"
                        : value.startsWith("5")
                          ? "mastercard"
                          : value.length === 0
                            ? undefined
                            : "error"
                      }
                      onChange={(e) => setCreditCardNumber(e.target.value)}
                      inputProps={{
                        style: { width: '100%' },
                        "data-quickstream-api": "cardNumber",
                        "autoComplete": "cc-number",
                        "inputMode": "numeric",
                        "autoCorrect": "off",
                      }}
                      forceShowCardError={forceShowCardError}
                      setForceShowCardError={setForceShowCardError}
                    />
                  )
                }}
              </Rifm>


              <ButtonLoading
                type="submit"
                // onClick={async() => {
                //   setLoading(true)
                //   // await checkoutInstantly()
                // }}
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
                { props.title ? props.title : "Make Deposit" }
                </span>
              </ButtonLoading>
            </form>
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
  handleOrderPostPurchase(order: Orders): void;
  quotedPrice: number; // in cents
  product: Product;
}

interface MutData1 {
  createOrder: OrderMutationResponse;
}
interface MutVar1 {
  productId: string
  productSnapshotId: string
  variantId: string
  variantSnapshotId: string
  total: number
  buyerId: string
  sellerId: string
  bidId: string
}
interface MutVar2 {
  orderId: string
  singleUseTokenId: string
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
    fontFamily: '"Helvetica Neue",Arial,sans-serif',
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
  inputField: {
    flexGrow: 1,
    minWidth: 100,
    marginBottom: '0.5rem',
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

export default withStyles(styles)( WestpacPurchaseProduct );







