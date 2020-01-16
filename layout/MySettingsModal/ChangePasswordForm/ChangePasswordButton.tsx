import * as React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Graphql Queries
import { useMutation } from "@apollo/react-hooks";
import { CHANGE_PASSWORD } from "queries/user-mutations";
import { UserPrivate } from "typings/gqlTypes";
// Material UI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// Utility Components
import Loading from "components/Loading";
import ErrorDisplay, { JsonTree, GraphQLErrors } from "components/Error";
import ErrorBounds from "components/ErrorBounds";
import SnackBarA from "components/Snackbars/SnackbarA";



const ChangePasswordButton = (props: ReactProps) => {

  const [displayErr, setDisplayErr] = React.useState(true);
  const [displaySuccess, setDisplaySuccess] = React.useState(true);

  const [changePassword, { loading, error, data}] =
  useMutation<MutationData, MutationVar>(
    CHANGE_PASSWORD, {
      variables: {
        currentPassword: props.currentPassword,
        newPassword: props.newPassword
      }
    }
  );

  if (loading) {
    return <Loading inline loading={loading} delay={"400ms"} />;
  } else if (error) {
    return <ErrorDisplay title={"ChangePasswordButton"} error={error}/>;
  } else {
    return (
      <ErrorBounds className={props.classes.buttonContainer}>
        <Button
          variant={"contained"}
          color={"secondary"}
          disabled={props.disabled}
          onClick={() => {
            changePassword();
            setTimeout(() => {
              props.resetPasswordChange()
            }, 800)
          }}
        >
          Update Password
        </Button>
        <SnackBarA
          open={data !== undefined && displaySuccess}
          closeSnackbar={() => setDisplaySuccess(false)}
          message={`Successfully updated your password.`}
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
  currentPassword: string;
  newPassword: string;
  disabled: boolean;
  resetPasswordChange(): void;
}
interface Aprops {
  data?: { changePassword: { user: UserPrivate }},
  loading?: boolean,
  error?: GraphQLErrors,
}

interface MutationData {
  changePassword: { user: UserPrivate };
}
interface MutationVar {
  currentPassword: string;
  newPassword: string;
}

const styles = (theme: Theme) => createStyles({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

export default withStyles(styles)( ChangePasswordButton );


