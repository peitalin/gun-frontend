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
  SEND_TEST_WELCOME_EMAIL,
  SEND_RESET_PASSWORD_EMAIL,
} from "queries/user-queries";



const TestEmailButton: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const aClient = useApolloClient();
 // state
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);

  const snackbar = useSnackbar();

  const sendTestWelcomeEmail = async() => {
    // setLoading1(true)
    try {
      const { errors, data } = await aClient.mutate<QueryData, QueryVar>({
        mutation: SEND_TEST_WELCOME_EMAIL,
        variables: {},
        fetchPolicy: "no-cache", // always do a network request, no caches
      })
      if (data.sendTestWelcomeEmail) {
        snackbar.enqueueSnackbar(`Email send success`, { variant: "success" })
      }
    } catch(e) {
      // setErrorMsg("OrderID does not exist.")
      snackbar.enqueueSnackbar(`Email failed to send`, { variant: "error" })
    }
    // setLoading1(false)
  }


  const sendTestResetPasswordButton = async() => {
    // setLoading2(true)
    try {
      const { errors, data } = await aClient.mutate<QueryData, QueryVar>({
        mutation: SEND_RESET_PASSWORD_EMAIL,
        variables: {},
        fetchPolicy: "no-cache", // always do a network request, no caches
      })
      if (data.sendTestWelcomeEmail) {
        snackbar.enqueueSnackbar(`Email send success`, { variant: "success" })
      }
    } catch(e) {
      // setErrorMsg("OrderID does not exist.")
      snackbar.enqueueSnackbar(`Email failed to send`, { variant: "error" })
    }
    // setLoading2(false)
  }

  return (
    <>
      <ButtonLoading
        variant="outlined"
        className={classes.approveButton}
        onClick={() => {
          sendTestWelcomeEmail()
        }}
        loadingIconColor={Colors.blue}
        replaceTextWhenLoading={true}
        loading={loading1}
        disabled={loading1}
        color="secondary"
        style={{
          width: '240px',
          height: '36px',
        }}
      >
        Send Test Email
      </ButtonLoading>
      <ButtonLoading
        variant="outlined"
        className={classes.approveButton}
        onClick={() => {
          sendTestResetPasswordButton()
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
        Send Test Password Reset
      </ButtonLoading>
    </>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
}
interface QueryData {
  sendTestWelcomeEmail: BlankMutationResponse;
}
interface QueryVar {
}


const styles = (theme: Theme) => createStyles({
  approveButton: {
    height: '36px',
    margin: "0.5rem 0.5rem 0.5rem 0.5rem",
  },
});


export default withStyles(styles)( TestEmailButton );



