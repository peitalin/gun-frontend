import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Graphql Queries
import { useMutation, useApolloClient } from "@apollo/client";
import { GET_USER } from "queries/user-queries";
import { UPDATE_USER, SET_PAYOUT_METHOD } from "queries/user-mutations";
import { UserPrivate, ID } from "typings/gqlTypes";
// Material UI
import Button from "@material-ui/core/Button";
import ButtonLoading from "components/ButtonLoading";
import Typography from "@material-ui/core/Typography";
// Utility Components
import Loading from "components/Loading";
import ErrorDisplay, { GraphQLErrors } from "components/Error";
import ErrorBounds from "components/ErrorBounds";
import SnackBarA from "components/Snackbars/SnackbarA";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";



const ChangePayoutMethodButton = (props: ReactProps) => {

  let [displayErr, setDisplayErr] = React.useState(true);
  let [displaySuccess, setDisplaySuccess] = React.useState(true);
  let {
    newBsb,
    newAccountNumber,
    newAccountName,
  } = props;
  const aClient = useApolloClient();
  const dispatch = useDispatch();


  const [setPayoutMethod, { loading, data, error }] =
  useMutation<MutationData, MutationVars>(
    SET_PAYOUT_METHOD, {

    update: (cache, { data: { setPayoutMethod }}: { data: MutationData }) => {

      props.resetPayoutMethodEmail();
      dispatch(Actions.reduxLogin.SET_USER({ ...props.user, ...setPayoutMethod.user}))

      cache.writeQuery({
        query: GET_USER,
        data: {
          user: {
            ...props.user,
            ...setPayoutMethod.user
          }
        },
      });
    },
    refetchQueries: (result) => {
      return [{ query: GET_USER, variables: {} }]
    },
    awaitRefetchQueries: true,
    variables: {
      payoutType: "BANK",
      bsb: newBsb,
      accountNumber: newAccountNumber,
      accountName: newAccountName,
    },
  })

  if (loading) {
    return <Loading inline loading={loading} delay={"400ms"} />;
  } else if (error) {
    return <ErrorDisplay title={"ChangePayoutMethod"} error={error}/>;
  } else {
    return (
      <ErrorBounds>
        <ButtonLoading
          type="submit"
          variant={"outlined"}
          color={"primary"}
          onClick={() => setPayoutMethod()}
          replaceTextWhenLoading={true}
          loading={loading}
          disabled={loading}
          loadingIconColor={Colors.blue}
          // style={{
          //   height: '40px',
          //   width: '100%',
          // }}
        >
          Save changes
        </ButtonLoading>
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
  newBsb: string;
  newAccountNumber: string;
  newAccountName: string;
  resetPayoutMethodEmail(): void;
  user: UserPrivate;
  updateUserProfile(payload: UserPrivate): void;
}
interface MutationData {
  setPayoutMethod: { user: UserPrivate };
}
interface MutationVars {
  payoutType: string;
  bsb: string;
  accountNumber: string;
  accountName: string;
}

const styles = (theme: Theme) => createStyles({
});

export default withStyles(styles)( ChangePayoutMethodButton );


