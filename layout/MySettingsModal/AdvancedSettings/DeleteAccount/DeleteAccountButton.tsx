import * as React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Graphql Queries
import { useMutation, useApolloClient } from "@apollo/client";
import { DELETE_STORE, DELETE_ACCOUNT } from "queries/deletions-mutations";
// import { UserPrivate } from "typings/gqlTypes";
type UserPrivate = any;

// Material UI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// Utility Components
import Loading from "components/Loading";
import ErrorDisplay, { ErrorMessageRust, GraphQLErrors } from "components/Error";
import ErrorBounds from "components/ErrorBounds";
import SnackBarA from "components/Snackbars/SnackbarA";
import { logout } from "queries/requests";
import ConfirmDeleteModal from "components/ConfirmDeleteModal";
import { useDispatch } from "react-redux";
import { refetchUser, setUserOnCompleted } from "layout/GetUser";


const DeleteAccountButton = (props: ReactProps) => {

  const [displayErr, setDisplayErr] = React.useState(true);
  const [displaySuccess, setDisplaySuccess] = React.useState(true);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
  const dispatch = useDispatch();

  const [deleteAccount, {loading, data, error}] =
  useMutation<MutationData, MutationVar>(
    DELETE_ACCOUNT, {
      variables: {
        password: props.password,
      },
      onCompleted: async () => {
        let { data } = await refetchUser(apolloClient)()
        setUserOnCompleted(dispatch)(data)
        // logout(apolloClient, dispatch)("/")
      },
      onError: (e) => {
        console.log(e)
      },
    }
  );

  const apolloClient = useApolloClient();

  const handleDelete = () => {
    deleteAccount();
  }

  const handleErrorMsg = (e: ErrorMessageRust) => {
    if (e.message.includes("Wrong password")) {
      return "Wrong password!"
    } else {
      return JSON.stringify(e.message)
    }
  }

  if (loading) {
    return <Loading inline loading={true} delay={"400ms"} />;
  } else {
    return (
      <ErrorBounds className={props.classes.buttonContainer}>
        <Button
          variant={"contained"}
          color={"secondary"}
          disabled={props.disabled}
          onClick={() => setOpenDeleteModal(true)}
        >
          Delete Account
        </Button>

        <ConfirmDeleteModal
          title={"Do you wish to delete your Account? This is irreversible"}
          showModal={openDeleteModal}
          setShowModal={() => setOpenDeleteModal(s => !s)}
          onConfirmFunction={handleDelete}
        />

        <SnackBarA
          open={data !== undefined && displaySuccess}
          closeSnackbar={() => setDisplaySuccess(false)}
          message={`Successfully deleted your account.`}
          variant={"success"}
          autoHideDuration={3000}
        />
        <SnackBarA
          open={error !== undefined && displayErr}
          closeSnackbar={() => setDisplayErr(false)}
          message={error ? handleErrorMsg(error) : ""}
          variant={"error"}
          autoHideDuration={3000}
        />
      </ErrorBounds>
    );
  }
};

interface ReactProps extends WithStyles<typeof styles> {
  password: string;
  disabled: boolean;
  resetPassword(): void;
}

interface MutationData {
  deleteAccount: { __typename: string };
}
interface MutationVar {
  password: string;
}


const styles = (theme: Theme) => createStyles({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

export default withStyles(styles)( DeleteAccountButton );


