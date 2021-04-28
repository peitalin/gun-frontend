import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
// Typings
import { Product } from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "components/Divider";
import SnackbarA from "components/Snackbars/SnackbarA";
// Components
import { Colors } from "layout/AppTheme";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";




const Redirect = (props: ReactProps) => {

  const { classes, message } = props;
  const router = useRouter();
  const snackbar = useSnackbar()

  React.useEffect(() => {
    if (props.redirectCondition) {
      setTimeout(() => {
        router.push(props.redirectRoute)
      }, props.redirectDelay || 1000)
    }
    snackbar.enqueueSnackbar(
      props.snackBarMessage || "Redirecting to login...",
      { variant: "info" }
    );
  })

  return (
    <div className={classes.flexRow} style={{ height: '75vh'}}>
      <div className={classes.flexCol}>
        <Typography variant="h4">
          <span>{props.message}</span>
        </Typography>
      </div>
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  message?: string;
  snackBarMessage?: string;
  redirectCondition: boolean;
  redirectDelay?: number;
  redirectRoute: string;
}

const styles = (theme: Theme) => createStyles({
  root: {
    margin: '2rem 1rem',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  title: {
    marginBottom: '1rem',
  },
  link: {
    color: Colors.blue,
    "&:hover": {
      color: Colors.secondaryBright,
    }
  },
});

export default withStyles(styles)( Redirect );