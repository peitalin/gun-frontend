import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Typings
import { ProductsConnection, CoinbaseExchangeRates } from "typings/gqlTypes";
// Router
import { Colors, Gradients } from "layout/AppTheme";
// GraphQL
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_COINBASE_EXCHANGE_RATES } from "queries/coinbase-queries";

import CoinbaseCommerceButton from 'react-coinbase-commerce';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';

import EthereumLogo from "components/Icons/Ethereum";
import CircularProgress from "@material-ui/core/CircularProgress";
// checkout
import { asCurrency as c } from "utils/prices";




const CoinbasePay: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const aClient = useApolloClient();

  const [loading, setLoading] = React.useState(false);
  const [chargeId, setChargeId] = React.useState(undefined);
  const [usdPrice, setUsdPrice] = React.useState(undefined);
  const [onHover, setOnHover] = React.useState(false);

  let loadingIconSize = 18
  let loadingIconColor = Colors.cream
  let coinbaseCommerceButtonId = 'coinbase-commerce-button-0x'

  React.useEffect(() => {

    // const response = await aClient.mutate<MutDataConfirmOrder, MutVarConfirmOrder>({
    //   mutation: CREATE_COINBASE_CHARGE_ID,
    //   variables: {
    //     orderId: orderId,
    //   }
    // });

    aClient.query<QueryData, QueryVar>({
      query: GET_COINBASE_EXCHANGE_RATES,
    }).then(res => {
      console.log("coinbase exchange rates: ", res.data.getCoinbaseExchangeRates)
      let audUsdRate = res.data.getCoinbaseExchangeRates.rates['AUD']
      let usd = props.price / audUsdRate
      setUsdPrice(usd)
    })

    let chargeId = 'LN6LMJ6G'

    // setInterval(() => {
    //   // create coinbase chargeId every 30min and refresh
    // }, 60*30)

    setChargeId(chargeId)
    let d = document.getElementById(coinbaseCommerceButtonId)
    d.addEventListener("mouseover", () => {
      setOnHover(true)
    })
    d.addEventListener("mouseleave", () => {
      setOnHover(false)
    })
    // DO NOT OVERRIDE ONCLICK
    // d.addEventListener("click", () => {
    //   console.log("clicked coinbase button: ", coinbaseCommerceButtonId)
    //   setLoading(true)
    // })
  }, [])

  interface CoinbaseMessageData {
    event: 'charge_confirmed' | 'charge_failed' | 'payment_detected'
    code: string
  }

  console.log("Coinbase chargeId: ", chargeId)
  console.log("onHover: ", onHover)

  return (
    <CoinbaseCommerceButton
      // checkoutId={chargeId}
      id={coinbaseCommerceButtonId}
      chargeId={chargeId}
      styled={true}
      disabled={!chargeId}
      onLoad={() => {
        console.log("onLoad")
        setLoading(true)
        // make a check to see if producgt is available
      }}
      onModalClosed={() => {
        console.log("onModalCLosed")
        setLoading(false)
      }}
      onPaymentDetected={(e: CoinbaseMessageData) => {
        console.log('onPaymentDeteched', e)
        // generate order +
      }}
      onChargeSuccess={(e: CoinbaseMessageData) => {
        console.log('onChargeSuccess', e)
      }}
      onChargeFailed={(e: CoinbaseMessageData) => {
        console.log('onChargeFailed', e)
      }}
      className={classes.coinbaseButton}
      wrapperStyle={{ width: '100%' }}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        borderRadius: 32,
        height: 45,
        cursor: 'pointer',
        width: "100%",
        minWidth: 200,
        background: !chargeId
          ? Gradients.gradientDarkerGrey.background
          : onHover
            ? Gradients.gradientRainbow2.background
            : Gradients.gradientPurple.background,
        backgroundColor: !chargeId
          ? Gradients.gradientDarkerGrey.background
          : onHover
            ? Gradients.gradientRainbow2.background
            : Gradients.gradientPurple.background,
        border: "none",
        transition: `background 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
        // border: `2px solid ${Colors.black}`
      }}
    >
      {
        loading
        ? <span className={"fadeInFast"}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress
              style={{
                marginLeft: '0.5rem',
                marginRight: '0.5rem',
                color: loadingIconColor,
              }}
              size={loadingIconSize}
            />
          </span>
        : <span className={"fadeInFast"}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <EthereumLogo height={30} style={{
              marginRight: '0.5rem',
              opacity: chargeId ? 1 : 0.5, //disabled
            }}/>
            <span className={classes.coinbaseButtonText} style={{
              opacity: chargeId ? 1 : 0.5, //disabled
            }}>
              {
                usdPrice
                ? `Reserve for ${c(usdPrice)} USD with Coinbase`
                : "loading USD prices"
              }
            </span>
          </span>
      }
      </CoinbaseCommerceButton>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  initialFeaturedProducts?: ProductsConnection;
  title?: string;
  price: number
}
interface QueryData {
  getCoinbaseExchangeRates?: CoinbaseExchangeRates;
}
interface QueryVar {}


const styles = (theme: Theme) => createStyles({
  coinbaseButton: {
    // transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
    //   easing: theme.transitions.easing.easeIn,
    //   duration: '100ms',
    // }),
  },
  coinbaseButtonText: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: Colors.black,
    textShadow: "none",
    fontFamily: '"Helvetica Neue",Arial,sans-serif',
  }
});


export default withStyles(styles)( CoinbasePay );
