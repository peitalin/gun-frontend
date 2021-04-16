import React from "react";
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
  SEND_PAYOUT_COMPLETE_SELLER_EMAIL
} from "queries/emails-mutations";



const SendPayoutCompleteEmails: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const aClient = useApolloClient();

  // state
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);

  const snackbar = useSnackbar();

  const sendPayoutCompleteSellerEmail = async() => {
    setLoading(true)
    try {
      const { errors, data } = await aClient.mutate<QueryData, QueryVar>({
        mutation: SEND_PAYOUT_COMPLETE_SELLER_EMAIL,
        variables: {
          userId: props.seller.id,
          orderId: props.orderId,
        },
        fetchPolicy: "no-cache", // always do a network request, no caches
      })
      if (data.sendPayoutCompleteSellerEmail) {
        snackbar.enqueueSnackbar(`Email send success`, { variant: "success" })
        alert(JSON.stringify(data.sendPayoutCompleteSellerEmail.status))
      }
    } catch(e) {
      snackbar.enqueueSnackbar(`Email failed to send`, { variant: "error" })
      console.log("errors: ", e)
    }
    setLoading(false)
  }


  return (
    <div className={classes.rootPayoutCompleteEmailsButtons}>
      <ButtonLoading
        variant="outlined"
        className={classes.approveButton}
        onClick={() => {
          sendPayoutCompleteSellerEmail()
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
        Payout Complete Seller
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
  sendPayoutCompleteSellerEmail: BlankMutationResponse;
}
interface QueryVar {
  userId: string
  orderId: string
}


const styles = (theme: Theme) => createStyles({
  rootPayoutCompleteEmailsButtons: {
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


export default withStyles(styles)( SendPayoutCompleteEmails );



