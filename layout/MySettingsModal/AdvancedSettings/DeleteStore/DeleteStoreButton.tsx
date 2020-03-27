import * as React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Graphql Queries
import { useMutation } from "@apollo/react-hooks";
import { DELETE_STORE, DELETE_ACCOUNT } from "queries/deletions-mutations";
import { UserPrivate } from "typings/gqlTypes";
// Material UI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// Utility Components
import Loading from "components/Loading";
import ErrorDisplay, { GraphQLErrors } from "components/Error";
import ErrorBounds from "components/ErrorBounds";
import SnackBarA from "components/Snackbars/SnackbarA";
import ConfirmDeleteModal from "components/ConfirmDeleteModal";



const DeleteAccountButton = (props: ReactProps) => {

  const [displayErr, setDisplayErr] = React.useState(true);
  const [displaySuccess, setDisplaySuccess] = React.useState(true);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)

  const [deleteStore, {loading, data, error}] =
  useMutation<MutationData, MutationVar>(
    DELETE_STORE, {
      variables: {
        password: props.password,
      }
    }
  );

  const handleDelete = () => {
    deleteStore();
    setTimeout(() => {
      props.resetPassword()
    }, 800)
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

        <SnackBarA
          open={data !== undefined && displaySuccess}
          closeSnackbar={() => setDisplaySuccess(false)}
          message={`Successfully deleted your store.`}
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


