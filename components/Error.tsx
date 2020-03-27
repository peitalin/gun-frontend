
import * as React from "react";
// import * as Sentry from "@sentry/browser";
import { oc as option } from "ts-optchain";

import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
// import JSONTree from "react-json-tree";

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
    return (
      <Paper className={props.classes.errContainer}>
        <Typography color={"primary"} variant="h4" gutterBottom>
          { props.title }
        </Typography>
        <div style={{ maxWidth: "600px" }}>
          <Typography color={"primary"}
            className={props.classes.errMessage}
            variant="h6"
            gutterBottom
          >
            Errors:
          </Typography>
          {
            option(props).error.graphQLErrors() &&
            props.error.graphQLErrors.map(err => (
              <div key={err.message}>
                <div className={props.classes.errMessage}>{ err.message }</div>
                <div className={props.classes.errLine}>
                  {"line: " + err.locations[0].line}
                </div>
                <div className={props.classes.errLine}>
                  {"column: " + err.locations[0].column}
                </div>
                {/* <JsonTree data={err}/> */}
              </div>
            ))
          }
          {
            option(props).error.networkError()
            ? <Typography color={"primary"} variant="h6" gutterBottom>
                {props.error.message}
                <p>Unable to connect to server.</p>
              </Typography>
            : <div>
                <Typography color={"primary"} variant="h6" gutterBottom>
                  Please check your internet connection.
                </Typography>
                <div className={props.classes.errMessage}>
                  {/* <JsonTree data={props}/> */}
                </div>
              </div>
          }
          <SnackbarA
            open={option(props).error.message() && this.state.displayErr === true}
            closeSnackbar={() => this.setState({ displayErr: false })}
            message={option(props).error.message() ||
              option(props).error.networkError.message()}
            variant={"error"}
            autoHideDuration={20000}
          />
        </div>
      </Paper>
    )
  }
}


// export const JsonTree = ({ data }) => (
//   <div style={{
//     fontFamily: '"Segoe UI","Helvetica Neue",Arial,sans-serif',
//     margin: "1rem",
//     padding: "0.5rem 1rem",
//     backgroundColor: "#FFFFFB",
//     border: '2px solid #213F5E',
//   }}>
//     <JSONTree
//       data={data}
//       theme={ themeJsonTree }
//       invert={false}
//     />
//   </div>
// )
// const themeJsonTree = {
//   scheme: 'embers',
//   base00: '#16130F',
//   base01: '#2C2620',
//   base02: '#433B32',
//   base03: '#5A5047',
//   base04: '#8A8075',
//   base05: '#A39A90',
//   base06: '#BEB6AE',
//   base07: '#DBD6D1',
//   base08: '#826D57',
//   base09: '#828257',
//   base0A: '#6D8257',
//   base0B: '#57826D',
//   base0C: '#576D82',
//   base0D: '#6D5782',
//   base0E: '#82576D',
//   base0F: '#825757'
// };


interface ReduxProps {
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
  errMessage: {
    paddingTop: theme.spacing(2),
    color: red[800],
    fontWeight: 'bold',
    fontFamily: '"Segoe UI","Helvetica Neue",Arial,sans-serif',
  },
  errLine: {
    color: grey[700],
    fontFamily: '"Segoe UI","Helvetica Neue",Arial,sans-serif',
  },
  errContainer: {
    padding: 20,
    margin: 20,
    backgroundColor: red[100],
    boxShadow: "1px 2px 3px 0px rgba(76,76,76,0.4)",
    borderRadius: "4px",
    border: `2px solid ${red[600]}`,
    transition: "all 100ms",
    "&:hover": {
      transition: "all 100ms",
      boxShadow: "2px 3px 4px 0px rgba(76,76,76,0.6)",
    },
  }
});

export default withStyles(styles)(ErrorDisplay);
