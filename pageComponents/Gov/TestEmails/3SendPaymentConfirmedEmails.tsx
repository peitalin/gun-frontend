import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { Actions } from 'reduxStore/actions';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Typings
import {
  UserPrivate,
  ID,
  BlankMutationResponse,
} from "typings/gqlTypes";
// Material UI
import ButtonLoading from "components/ButtonLoading";
// Graphql
import { useQuery, useApolloClient, ApolloClient } from "@apollo/client";
// Snackbar
import { useSnackbar } from "notistack";
import currency from "currency.js";
import {
  SEND_CONFIRMED_PAYMENT_ADMIN_EMAIL,
  SEND_CONFIRMED_PAYMENT_BUYER_EMAIL,
  SEND_CONFIRMED_PAYMENT_SELLER_EMAIL,
} from "queries/emails-mutations";



const SendConfirmedPaymentEmails: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const aClient = useApolloClient();
  const { user } = useSelector<GrandReduxState, { user: UserPrivate }>(s => {
    return { user: s.reduxLogin.user }
  })
  // state
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [loading3, setLoading3] = React.useState(false);

  const snackbar = useSnackbar();

  const sendConfirmedPaymentBuyerEmail = async() => {
    setLoading(true)
    try {
      const { errors, data } = await aClient.mutate<QueryData, QueryVar>({
        mutation: SEND_CONFIRMED_PAYMENT_BUYER_EMAIL,
        variables: {
          userId: user.id
        },
        fetchPolicy: "no-cache", // always do a network request, no caches
      })
      if (data.sendConfirmedPaymentBuyerEmail) {
        snackbar.enqueueSnackbar(`Email send success`, { variant: "success" })
        alert(JSON.stringify(data))
      }
    } catch(e) {
      // setErrorMsg("OrderID does not exist.")
      snackbar.enqueueSnackbar(`Email failed to send`, { variant: "error" })
      console.log("errors: ", e)
    }
    setLoading(false)
  }

  const sendConfirmedPaymentSellerEmail = async() => {
    setLoading2(true)
    try {
      const { errors, data } = await aClient.mutate<QueryData2, QueryVar2>({
        mutation: SEND_CONFIRMED_PAYMENT_SELLER_EMAIL,
        variables: {
          userId: user.id
        },
        fetchPolicy: "no-cache", // always do a network request, no caches
      })
      if (data.sendConfirmedPaymentSellerEmail) {
        snackbar.enqueueSnackbar(`Email send success`, { variant: "success" })
        alert(JSON.stringify(data))
      }
    } catch(e) {
      // setErrorMsg("OrderID does not exist.")
      snackbar.enqueueSnackbar(`Email failed to send`, { variant: "error" })
      console.log("errors: ", e)
    }
    setLoading2(false)
  }

  const sendConfirmedPaymentAdminEmail = async() => {
    setLoading3(true)
    try {
      const { errors, data } = await aClient.mutate<QueryData3, QueryVar3>({
        mutation: SEND_CONFIRMED_PAYMENT_ADMIN_EMAIL,
        variables: {
          // default email is admin@gunmarketplace.com.au set in notify-service
        },
        fetchPolicy: "no-cache", // always do a network request, no caches
      })
      if (data.sendConfirmedPaymentAdminEmail) {
        snackbar.enqueueSnackbar(`Email send success`, { variant: "success" })
        console.log("response: ", data)
      }
    } catch(e) {
      // setErrorMsg("OrderID does not exist.")
      snackbar.enqueueSnackbar(`Email failed to send`, { variant: "error" })
      console.log("errors: ", e)
    }
    setLoading3(false)
  }

  return (
    <div className={classes.rootConfirmedPaymentEmailsButtons}>
      <ButtonLoading
        variant="outlined"
        className={classes.approveButton}
        onClick={() => {
          sendConfirmedPaymentBuyerEmail()
        }}
        loadingIconColor={Colors.blue}
        replaceTextWhenLoading={true}
        loading={loading}
        disabled={loading}
        color="secondary"
        style={{
          width: '240px',
          height: '36px',
        }}
      >
        Confirmed Payment Buyer
      </ButtonLoading>
      <ButtonLoading
        variant="outlined"
        className={classes.approveButton}
        onClick={() => {
          sendConfirmedPaymentSellerEmail()
        }}
        loadingIconColor={Colors.blue}
        replaceTextWhenLoading={true}
        loading={loading2}
        disabled={loading2}
        color="secondary"
        style={{
          width: '240px',
          height: '36px',
        }}
      >
        Confirmed Payment Seller
      </ButtonLoading>
      <ButtonLoading
        variant="outlined"
        className={classes.approveButton}
        onClick={() => {
          sendConfirmedPaymentAdminEmail()
        }}
        loadingIconColor={Colors.blue}
        replaceTextWhenLoading={true}
        loading={loading3}
        disabled={loading3}
        color="secondary"
        style={{
          width: '240px',
          height: '36px',
        }}
      >
        Confirmed Payment Admin
      </ButtonLoading>
    </div>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
}
interface QueryData {
  sendConfirmedPaymentBuyerEmail: BlankMutationResponse;
}
interface QueryVar {
  userId: string
}

interface QueryData2 {
  sendConfirmedPaymentSellerEmail: BlankMutationResponse;
}
interface QueryVar2 {
  userId: string
}

interface QueryData3 {
  sendConfirmedPaymentAdminEmail: BlankMutationResponse;
}
interface QueryVar3 {
}


const styles = (theme: Theme) => createStyles({
  rootConfirmedPaymentEmailsButtons: {
    margin: "1rem 0rem",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  approveButton: {
    height: '36px',
    margin: "0.5rem 0.5rem 0.5rem 0.5rem",
  },
});


export default withStyles(styles)( SendConfirmedPaymentEmails );



