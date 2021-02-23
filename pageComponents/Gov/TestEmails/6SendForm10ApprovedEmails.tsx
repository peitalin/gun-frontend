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
  SEND_FORM10_APPROVED_BUYER_EMAIL,
  SEND_FORM10_APPROVED_SELLER_EMAIL,
} from "queries/emails-mutations";

import TextInput from "components/Fields/TextInput";
import Typography from '@material-ui/core/Typography';


const SendForm10ApprovedEmails: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const aClient = useApolloClient();

  // state
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);

  const snackbar = useSnackbar();

  const sendForm10ApprovedBuyerEmail = async() => {
    setLoading(true)
    try {
      const { errors, data } = await aClient.mutate<QueryData, QueryVar>({
        mutation: SEND_FORM10_APPROVED_BUYER_EMAIL,
        variables: {
          userId: props.buyer.id,
          orderId: props.orderId,
        },
        fetchPolicy: "no-cache", // always do a network request, no caches
      })
      if (data.sendForm10ApprovedBuyerEmail) {
        snackbar.enqueueSnackbar(`Email send success`, { variant: "success" })
        alert(JSON.stringify(data.sendForm10ApprovedBuyerEmail.status))
      }
    } catch(e) {
      // setErrorMsg("OrderID does not exist.")
      snackbar.enqueueSnackbar(`Email failed to send`, { variant: "error" })
      console.log("errors: ", e)
    }
    setLoading(false)
  }

  const sendForm10ApprovedSellerEmail = async() => {
    setLoading2(true)
    try {
      const { errors, data } = await aClient.mutate<QueryData2, QueryVar2>({
        mutation: SEND_FORM10_APPROVED_SELLER_EMAIL,
        variables: {
          userId: props.seller.id,
          orderId: props.orderId,
        },
        fetchPolicy: "no-cache", // always do a network request, no caches
      })
      if (data.sendForm10ApprovedSellerEmail) {
        snackbar.enqueueSnackbar(`Email send success`, { variant: "success" })
        alert(JSON.stringify(data.sendForm10ApprovedSellerEmail.status))
      }
    } catch(e) {
      // setErrorMsg("OrderID does not exist.")
      snackbar.enqueueSnackbar(`Email failed to send`, { variant: "error" })
      console.log("errors: ", e)
    }
    setLoading2(false)
  }


  return (
    <div className={classes.rootForm10ApprovedEmailsButtons}>

      <ButtonLoading
        variant="outlined"
        className={classes.approveButton}
        onClick={() => {
          sendForm10ApprovedBuyerEmail()
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
        Form10Approved Buyer
      </ButtonLoading>
      <ButtonLoading
        variant="outlined"
        className={classes.approveButton}
        onClick={() => {
          sendForm10ApprovedSellerEmail()
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
        Form10Approved Seller
      </ButtonLoading>
    </div>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
  orderId: string
  buyer: UserPrivate;
  seller: UserPrivate;
}
interface QueryData {
  sendForm10ApprovedBuyerEmail: BlankMutationResponse;
}
interface QueryVar {
  userId: string
  orderId: string
}

interface QueryData2 {
  sendForm10ApprovedSellerEmail: BlankMutationResponse;
}
interface QueryVar2 {
  userId: string
  orderId: string
}



const styles = (theme: Theme) => createStyles({
  rootForm10ApprovedEmailsButtons: {
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


export default withStyles(styles)( SendForm10ApprovedEmails );



