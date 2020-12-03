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
  SEND_RESET_PASSWORD_EMAIL,
  CONFIRM_RESET_PASSWORD,
  SEND_TEST_PASSWORD_CHANGED_EMAIL,
  SEND_PAYOUT_DETAILS_CHANGED_EMAIL,
} from "queries/emails-mutations";



const SendPasswordResetEmail: React.FC<ReactProps> = (props) => {

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

  const sendTestResetPasswordButton = async() => {
    setLoading(true)
    try {
      const { errors, data } = await aClient.mutate<QueryData, QueryVar>({
        mutation: SEND_RESET_PASSWORD_EMAIL,
        variables: {
          email: user.email
        },
        fetchPolicy: "no-cache", // always do a network request, no caches
      })
      if (data.sendResetPasswordEmail) {
        snackbar.enqueueSnackbar(`Email send success`, { variant: "success" })
        console.log("response: ", data.sendResetPasswordEmail)
      }
    } catch(e) {
      // setErrorMsg("OrderID does not exist.")
      snackbar.enqueueSnackbar(`Email failed to send`, { variant: "error" })
      console.log("errors: ", e)
    }
    setLoading(false)
  }

  const sendTestPasswordChangedEmail = async() => {
    setLoading2(true)
    try {
      const { errors, data } = await aClient.mutate<QueryData2, QueryVar2>({
        mutation: SEND_TEST_PASSWORD_CHANGED_EMAIL,
        variables: {
          email: user.email
          // email: "admin@gunmarketplace.com.au"
        },
        fetchPolicy: "no-cache", // always do a network request, no caches
      })
      if (data.sendTestPasswordChangedEmail) {
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

  const sendPayoutDetailsChangedEmail = async() => {
    setLoading3(true)
    try {
      const { errors, data } = await aClient.mutate<QueryData3, QueryVar3>({
        mutation: SEND_PAYOUT_DETAILS_CHANGED_EMAIL,
        variables: {
          userId: user.id
        },
        fetchPolicy: "no-cache", // always do a network request, no caches
      })
      if (data.sendPayoutDetailsChangedEmail) {
        snackbar.enqueueSnackbar(`Email send success`, { variant: "success" })
        alert(JSON.stringify(data))
      }
    } catch(e) {
      // setErrorMsg("OrderID does not exist.")
      snackbar.enqueueSnackbar(`Email failed to send`, { variant: "error" })
      console.log("errors: ", e)
    }
    setLoading3(false)
  }

  return (
    <div className={classes.rootSendPassowrdReset}>
      <ButtonLoading
        variant="outlined"
        className={classes.approveButton}
        onClick={() => {
          sendTestResetPasswordButton()
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
        Test Password Reset
      </ButtonLoading>
      <ButtonLoading
        variant="outlined"
        className={classes.approveButton}
        onClick={() => {
          sendTestPasswordChangedEmail()
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
        Password Changed
      </ButtonLoading>
      <ButtonLoading
        variant="outlined"
        className={classes.approveButton}
        onClick={() => {
          sendPayoutDetailsChangedEmail()
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
        Payout Details Changed
      </ButtonLoading>
    </div>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
}
interface QueryData {
  sendResetPasswordEmail: BlankMutationResponse;
}
interface QueryVar {
}

interface QueryData2 {
  sendTestPasswordChangedEmail: BlankMutationResponse;
}
interface QueryVar2 {
}

interface QueryData3 {
  sendPayoutDetailsChangedEmail: BlankMutationResponse;
}
interface QueryVar3 {
}


const styles = (theme: Theme) => createStyles({
  rootSendPassowrdReset: {
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


export default withStyles(styles)( SendPasswordResetEmail );



