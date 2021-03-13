
import React from "react";
// import * as Sentry from "@sentry/browser";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

// Material UI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";
// Components
import SnackbarA from "components/Snackbars/SnackbarA";


class ErrorDisplay extends React.Component<ReactProps, any> {

  state = {
    displayErr: true,
  }

  componentDidCatch(error, errorInfo) {
    // Catch unexpected/unhandled errors by setting Error Boundaries
    // These unhandled errors are sent to Sentry.io for logging
    this.setState({ error });
    // Sentry.withScope(scope => {
    //   scope.setExtras(errorInfo);
    //   const eventId = Sentry.captureException(error);
    //   this.setState({ eventId })
    // })
  }

  render() {

    let props = this.props;
    let classes = props.classes;
    // console.log("err: ", JSON.stringify(props.error))

    return (
      <Paper className={classes.errContainer}>
        <Typography className={classes.errTitle} variant="h4">
          { props.title }
        </Typography>
        <div style={{ maxWidth: "600px" }}>
          {
            (props.error?.graphQLErrors ?? []).map(err => (
              <div key={err.message}>
                <div className={classes.errMessage}>{ err.message }</div>
                <div className={classes.errLine}>
                  in resolver:
                </div>
                <div className={classes.errPath}>{ err.path }</div>
                <div className={classes.errLine}>
                  {"line: " + err?.locations?.[0]?.line}
                </div>
                <div className={classes.errLine}>
                  {"column: " + err?.locations?.[0]?.column}
                </div>
              </div>
            ))
          }
          {
            ((props.error?.networkError?.result?.errors ?? []).length === 0)
            ? <div>
                <div className={classes.errMessage}>
                  { props.error?.message }
                </div>
                <div className={classes.errLine}>
                  <span>Unable to connect to server.</span>
                </div>
                <div className={classes.errLine}>
                  <span>Please check your internet connection.</span>
                </div>
              </div>
            : <div>
                <div className={classes.errMessage}>
                  { props.error?.message }
                </div>
                <div className={classes.errLine}>
                  <span>Unable to connect to server.</span>
                </div>
                <div className={classes.errLine}>
                  <span>Gunmarketplace's backend server has a bug:</span>
                </div>
              </div>
          }
          {
            (props.error?.networkError?.result?.errors ?? []).map(err => (
              <div key={err.message}>
                <div className={classes.errMessage}>{ err.message }</div>
              </div>
            ))
          }
          <SnackbarA
            open={props?.error?.message && this.state.displayErr === true}
            closeSnackbar={() => this.setState({ displayErr: false })}
            message={props?.error?.message ||
              props?.error?.networkError?.message}
            variant={"error"}
            autoHideDuration={20000}
          />
        </div>
      </Paper>
    )
  }
}




interface ReactProps {
  enqueueSnackbar?(args?: any, variables?: { variant: any }): any;
  title?: string;
  error?: GraphQLErrors | any;
  classes?: any;
}

export interface GraphQLErrors {
  graphQLErrors?: ReadonlyArray<ErrorMessage>;
  message?: string;
  networkError?: any;
}
export interface ErrorMessage {
  message?: string;
  locations?: Array<ErrorLocation>;
}
export interface ErrorMessageRust {
  message?: string;
  file?: string;
}
interface ErrorLocation {
  line?: number;
  column?: number;
}

const styles = (theme: Theme) => createStyles({
  errTitle: {
    color: grey[800],
    fontSize: '1.25rem',
    fontFamily: '"Helvetica Neue",Arial,sans-serif',
  },
  errMessage: {
    paddingTop: theme.spacing(2),
    color: red[800],
    fontWeight: 'bold',
    fontFamily: '"Helvetica Neue",Arial,sans-serif',
  },
  errPath: {
    color: red[800],
    fontWeight: 'bold',
    fontSize: '1rem',
    fontFamily: '"Helvetica Neue",Arial,sans-serif',
  },
  errLine: {
    fontSize: '0.9rem',
    color: grey[700],
    fontFamily: '"Helvetica Neue",Arial,sans-serif',
  },
  errContainer: {
    padding: '2rem 2rem',
    margin: '1rem',
    borderRadius: '2rem',
    backgroundColor: red[100],
    boxShadow: "1px 2px 3px 0px rgba(76,76,76,0.4)",
    border: `3px solid ${red[600]}`,
    transition: "all 100ms",
    "&:hover": {
      transition: "all 100ms",
      boxShadow: "2px 3px 4px 0px rgba(76,76,76,0.6)",
    },
  }
});

export default withStyles(styles)(ErrorDisplay);
