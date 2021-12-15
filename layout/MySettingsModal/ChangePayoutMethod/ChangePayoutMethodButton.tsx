import React from "react";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors } from "layout/AppTheme";
// Graphql Queries
import { useMutation, useApolloClient, ApolloError } from "@apollo/client";
import { GET_USER } from "queries/user-queries";
import { UPDATE_USER, SET_PAYOUT_METHOD } from "queries/user-mutations";
import { UserPrivate, ID } from "typings/gqlTypes";
// Material UI
import ButtonLoading from "components/ButtonLoading";
// Utility Components
import Loading from "components/Loading";
import ErrorDisplay, { GraphQLErrors } from "components/ErrorDisplay";
import ErrorBounds from "components/ErrorBounds";
// snackbar
import { useSnackbar } from "notistack";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";



const ChangePayoutMethodButton = (props: ReactProps) => {

  let {
    newBsb,
    newAccountNumber,
    newAccountName,
  } = props;

  const snackbar = useSnackbar()
  const aClient = useApolloClient();
  const dispatch = useDispatch();

  const formatError = (error: ApolloError) => {
    let errMsg = error?.graphQLErrors?.[0]?.message ?? JSON.stringify(error)
    return errMsg
  }

  const [
    setPayoutMethod,
    { loading, data, error }
  ] = useMutation<MutationData, MutationVars>(
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
          style={{
            width: 150,
          }}
        >
          Save changes
        </ButtonLoading>
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


