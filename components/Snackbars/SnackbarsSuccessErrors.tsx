import React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import SnackBarA from "components/Snackbars/SnackbarA";




const SnackbarsSuccessErrors = (props: ReactProps) => {

  const {
    data,
    error,
    successMessage,
    errorMessage,
    autoHideDuration = 5000,
  } = props;

  const [displayErr, setDisplayErr] = React.useState(true);
  const [displaySuccess, setDisplaySuccess] = React.useState(true);

  // re-use snackbars for multiple reset retries
  React.useEffect(() => {
    if (error) { setDisplayErr(true) }
    if (data) { setDisplaySuccess(true) }
    return () => {}
  }, [data, error])

  return (
    <div>
      <SnackBarA
        open={data !== undefined && displaySuccess}
        closeSnackbar={() => setDisplaySuccess(false)}
        message={successMessage || ""}
        variant={"success"}
        autoHideDuration={autoHideDuration}
      />
      <SnackBarA
        open={error !== undefined && displayErr}
        closeSnackbar={() => setDisplayErr(false)}
        message={errorMessage || ""}
        variant={"error"}
        autoHideDuration={autoHideDuration}
      />
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  data: any;
  error: any;
  successMessage?: string;
  errorMessage?: string;
  autoHideDuration?: number;
}

const styles = (theme: Theme) => createStyles({
  root: {
  },
});

export default withStyles(styles)( SnackbarsSuccessErrors );

