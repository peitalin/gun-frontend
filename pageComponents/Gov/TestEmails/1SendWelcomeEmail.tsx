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
  SEND_WELCOME_EMAIL,
  SEND_RESET_PASSWORD_EMAIL,
} from "queries/emails-mutations";



const SendWelcome: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const aClient = useApolloClient();
 // state
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);

  const snackbar = useSnackbar();

  const sendWelcomeEmail = async() => {
    // setLoading1(true)
    try {
      const { errors, data } = await aClient.mutate<QueryData, QueryVar>({
        mutation: SEND_WELCOME_EMAIL,
        variables: {},
        fetchPolicy: "no-cache", // always do a network request, no caches
      })
      if (data.sendWelcomeEmail) {
        snackbar.enqueueSnackbar(`Email send success`, { variant: "success" })
        alert(JSON.stringify(data))
      }
    } catch(e) {
      // setErrorMsg("OrderID does not exist.")
      snackbar.enqueueSnackbar(`Email failed to send`, { variant: "error" })
    }
    // setLoading1(false)
  }

  return (
    <div className={classes.rootWelcome}>
      <ButtonLoading
        variant="outlined"
        className={classes.approveButton}
        onClick={() => {
          sendWelcomeEmail()
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
    </div>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
}
interface QueryData {
  sendWelcomeEmail: BlankMutationResponse;
}
interface QueryVar {
}


const styles = (theme: Theme) => createStyles({
  rootWelcome: {
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


export default withStyles(styles)( SendWelcome );



