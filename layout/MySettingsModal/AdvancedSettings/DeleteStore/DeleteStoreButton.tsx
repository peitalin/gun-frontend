import React from "react";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// Graphql Queries
import { useMutation, useApolloClient, ApolloError } from "@apollo/client";
import { DELETE_STORE, DELETE_ACCOUNT } from "queries/deletions-mutations";
import { UserPrivate } from "typings/gqlTypes";
// Material UI
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// Utility Components
import Loading from "components/Loading";
import ErrorDisplay, { GraphQLErrors } from "components/ErrorDisplay";
import ErrorBounds from "components/ErrorBounds";
import ConfirmDeleteModal from "components/ConfirmActionModal";
// snackbar
import { useSnackbar } from "notistack";
// Redux
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { useDispatch } from "react-redux";
import { refetchUser, setUserOnCompleted } from "layout/GetUser";



const DeleteAccountButton = (props: ReactProps) => {

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)

  const dispatch = useDispatch();
  const apolloClient = useApolloClient();
  const snackbar = useSnackbar()

  const [deleteStore, {loading, data, error}] =
  useMutation<MutationData, MutationVar>(
    DELETE_STORE, {
      variables: {
        password: props.password,
      },
      onCompleted: async () => {
        let { data } = await refetchUser(apolloClient)()
        setUserOnCompleted(dispatch)(data)
        setOpenDeleteModal(false)
        dispatch(Actions.reduxModals.TOGGLE_STORE_PAYOUT_CREATE_MODAL(false))
        // logout(apolloClient, dispatch)("/")
        snackbar.enqueueSnackbar(
          `Successfully deleted your store.`,
          { variant: "success" }
        )
      },
      onError: (err) => {
        snackbar.enqueueSnackbar(
          formatError(error),
          { variant: "error" }
        )
      },
    }
  );

  const handleDelete = () => {
    deleteStore();
    setTimeout(() => {
      props.resetPassword()
    }, 800)
  }

  const formatError = (error: ApolloError) => {
    return error?.graphQLErrors?.[0]?.message ?? JSON.stringify(error)
  }

  if (loading) {
    return <Loading inline loading={true} delay={"400ms"} />;
  } else if (error) {
    return (
      <ErrorDisplay
        title={"Delete Store"}
        error={error}
      />
    );
  } else {
    return (
      <ErrorBounds className={props.classes.buttonContainer}>
        <Button
          variant={"contained"}
          color={"secondary"}
          disabled={props.disabled}
          onClick={() => setOpenDeleteModal(true)}
        >
          Delete Store
        </Button>

        <ConfirmDeleteModal
          title={"Do you wish to delete your Store? This is irreversible"}
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
  deleteStore: { __typename: string };
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


