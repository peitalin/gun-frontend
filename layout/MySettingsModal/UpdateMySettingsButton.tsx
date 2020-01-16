import * as React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Graphql Queries
import { useMutation } from "@apollo/react-hooks";
import { GET_USER } from "queries/user-queries";
import { UPDATE_USER } from "queries/user-mutations";
import { UserPrivate } from "typings/gqlTypes";
import { EditUserProfileInput } from "typings";
// Material UI
import Button from "@material-ui/core/Button";
// Utility Components
import Loading from "components/Loading";
import ErrorDisplay from "components/Error";
import SnackBarA from "components/Snackbars/SnackbarA";
// Redux
import { useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";



const UpdateMySettingsButton = (props: ReactProps) => {

  let [displayErr, setDisplayErr] = React.useState(true);
  let [displaySuccess, setDisplaySuccess] = React.useState(true);
  const { userProfile } = props;
  const reduxUser = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );

  const [editUserProfile, { loading, data, error }] =
  useMutation<MutationData, EditUserProfileInput>(
    UPDATE_USER, {
    variables: {
      ...userProfile
    },
    onError: (err) => console.log(err),
    update: (cache, { data: { editUserProfile: { user } } }) => {
      try {
        cache.writeQuery({
          query: GET_USER,
          data: {
            user: { ...reduxUser, ...user }
          },
        });
      } catch (error) {
        console.log(error)
      }
    }
  })

  if (loading) {
    return <Loading inline loading={loading} delay={"400ms"} />;
  } else if (error) {
    return <ErrorDisplay title="MySettings" error={error}/>;
  }
  return (
    <>
      <Button
        variant={"contained"}
        color={"primary"}
        disabled={props.disabled}
        onClick={() => {
          editUserProfile({
            variables: {
              ...userProfile
            }
          });
          props.resetProfileEditForm();
        }}
      >
        Save your changes
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
    </>
  );
};

interface ReactProps extends WithStyles<typeof styles> {
  userProfile: EditUserProfileInput;
  resetProfileEditForm(): void;
  disabled: boolean;
}
interface MutationData {
  editUserProfile: { user: UserPrivate };
}


const styles = (theme: Theme) => createStyles({
});


export default withStyles(styles)( UpdateMySettingsButton );


