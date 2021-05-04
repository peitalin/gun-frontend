import React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Graphql Queries
import { useMutation, useApolloClient, ApolloError } from "@apollo/client";
import { DELETE_STORE, DELETE_ACCOUNT } from "queries/deletions-mutations";
import { UserPrivate } from "typings/gqlTypes";

// Material UI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// Utility Components
import Loading from "components/Loading";
import ErrorBounds from "components/ErrorBounds";
import { logout } from "queries/requests";
import ConfirmDeleteModal from "components/ConfirmActionModal";
import { useDispatch } from "react-redux";
import { refetchUser, setUserOnCompleted } from "layout/GetUser";
// snackbar
import { useSnackbar } from "notistack";


const DeleteAccountButton = (props: ReactProps) => {

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)

  const dispatch = useDispatch();
  const snackbar = useSnackbar()

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
        snackbar.enqueueSnackbar(
          `Successfully deleted your profile.`,
          { variant: "success" }
        )
      },
      onError: (e) => {
        snackbar.enqueueSnackbar(
          formatError(error),
          { variant: "error" }
        )
      },
    }
  );

  const apolloClient = useApolloClient();

  const handleDelete = () => {
    deleteAccount();
  }

  const formatError = (error: ApolloError) => {
    return error?.graphQLErrors?.[0]?.message ?? JSON.stringify(error)
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


