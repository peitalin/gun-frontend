import React from "react";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// Graphql Queries
import { useMutation, useApolloClient, ApolloError } from "@apollo/client";
import { GET_USER } from "queries/user-queries";
import { UPDATE_USER, SET_PAYOUT_METHOD } from "queries/user-mutations";
import { UserPrivate, ID } from "typings/gqlTypes";
// Material UI
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// Utility Components
import Loading from "components/Loading";
import ErrorDisplay, { GraphQLErrors } from "components/ErrorDisplay";
import ErrorBounds from "components/ErrorBounds";
// snackbar
import { useSnackbar } from "notistack";
// redux
import { useDispatch } from "react-redux";
import { Actions } from "reduxStore/actions";




const ChangePayoutMethodButton = (props: ReactProps) => {

  let {
    newBsb,
    newAccountNumber,
    newAccountName,
  } = props;

  const aClient = useApolloClient();
  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const [setPayoutMethod, { loading, data, error }] =
  useMutation<MutationData, MutationVars>(
    SET_PAYOUT_METHOD, {
    variables: {
      payoutType: "BANK",
      bsb: newBsb,
      accountNumber: newAccountNumber,
      accountName: newAccountName,
    },
    update: (cache, { data: { setPayoutMethod: { user } } }) => {

      props.resetPayoutMethod();
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
    onCompleted: () => {
      snackbar.enqueueSnackbar(
        `Successfully updated your profile.`,
        { variant: "success" }
      )
    },
    onError: (err) => {
      snackbar.enqueueSnackbar(
        formatError(error),
        { variant: "error" }
      )
    },
  })

  const formatError = (error: ApolloError) => {
    return error?.graphQLErrors?.[0]?.message ?? JSON.stringify(error)
  }

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
      </ErrorBounds>
    );
  }
};


interface ReactProps extends WithStyles<typeof styles> {
  newBsb: string;
  newAccountNumber: string;
  newAccountName: string;
  resetPayoutMethod(): void;
  user: UserPrivate;
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


