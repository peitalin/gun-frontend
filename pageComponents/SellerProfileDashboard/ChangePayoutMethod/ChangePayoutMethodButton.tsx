import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Graphql Queries
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { GET_USER } from "queries/user-queries";
import { UPDATE_USER, SET_PAYOUT_METHOD } from "queries/user-mutations";
import { UserPrivate, ID, PayoutType } from "typings/gqlTypes";
// Material UI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// Utility Components
import Loading from "components/Loading";
import ErrorDisplay, { GraphQLErrors } from "components/Error";
import ErrorBounds from "components/ErrorBounds";
import SnackBarA from "components/Snackbars/SnackbarA";
// redux
import { useDispatch } from "react-redux";
import { Actions } from "reduxStore/actions";




const ChangePayoutMethodButton = (props: ReactProps) => {

  let [displayErr, setDisplayErr] = React.useState(true);
  let [displaySuccess, setDisplaySuccess] = React.useState(true);
  let { newPayoutMethodEmail } = props;
  const aClient = useApolloClient();
  const dispatch = useDispatch();

  const [setPayoutMethod, { loading, data, error }] =
  useMutation<MutationData, MutationVars>(
    SET_PAYOUT_METHOD, {
    update: (cache, { data: { setPayoutMethod: { user } } }) => {

      props.resetPayoutMethodEmail();
      // update redux user, this is the one that triggers UI update
      dispatch(Actions.reduxLogin.SET_USER({
        ...props.user,
        ...user
      }))

      try {
        // update cache as well for GET_USER query
        cache.writeQuery({
          query: GET_USER,
          data: {
            user: { ...props.user, ...user }
          },
        });
      } catch (error) {
        console.log(error)
      }
    },
    variables: {
      payoutType: PayoutType.PAYPAL,
      payoutEmail: newPayoutMethodEmail,
      payoutProcessor: "Paypal",
      payoutProcessorId: "id"
    }
  })


  if (loading) {
    return <Loading inline loading={loading} delay={"400ms"} />;
  } else if (error) {
    return <ErrorDisplay title={"ChangePayoutMethod"} error={error}/>;
  } else {
    return (
      <ErrorBounds>
        <Button
          variant={"outlined"}
          color={"primary"}
          onClick={() => setPayoutMethod()}
        >
          Save changes
        </Button>
        <SnackBarA
          open={data !== undefined && displaySuccess}
          closeSnackbar={() => setDisplaySuccess(false)}
          message={`Successfully updated your profile.`}
          variant={"success"}
          autoHideDuration={3000}
        />
        <SnackBarA
          open={error !== undefined && displayErr}
          closeSnackbar={() => setDisplayErr(false)}
          message={`Oh oh: ${JSON.stringify(error)}`}
          variant={"error"}
          autoHideDuration={3000}
        />
      </ErrorBounds>
    );
  }
};


interface ReactProps extends WithStyles<typeof styles> {
  newPayoutMethodEmail: string;
  resetPayoutMethodEmail(): void;
  user: UserPrivate;
}
interface MutationData {
  setPayoutMethod: { user: UserPrivate };
}
interface MutationVars {
  payoutType: PayoutType;
  payoutEmail: string;
  payoutProcessor: string;
  payoutProcessorId: string;
}


const styles = (theme: Theme) => createStyles({
});

export default withStyles(styles)( ChangePayoutMethodButton );


