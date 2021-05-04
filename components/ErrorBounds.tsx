import React from "react";
import clsx from "clsx";
import { Colors, BorderRadius } from "layout/AppTheme";

import {
  withStyles, WithStyles, createStyles, Theme
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';


// Error boundaries wraps around a component,
// preventing errors from leaking into parent
// components (and thus crashing the entire app)
// Errors are logged and reported to sentry.io

class ErrorBounds extends React.Component<ReduxProps & ReactProps, any> {

  state = {
    error: null,
    eventId: null,
    errorInfo: {
      componentStack: undefined,
    },
    displayErr: true,
  }

  componentDidCatch(error, errorInfo) {
    // Catch unexpected/unhandled errors by setting Error Boundaries
    // These unhandled errors are sent to Sentry.io for logging
    this.setState({
      error,
      errorInfo
    });

    // // Report errors to sentry.io
    // Sentry.withScope(scope => {
    //   scope.setExtras(errorInfo)
    //   let eventId = Sentry.captureException(error);
    //   this.setState({ eventId })
    // })
  }

  render() {
    let { classes } = this.props;
    // render fallback UI if unexpected error occurs.
    if (this.state.error) {
      return (
        <div className={clsx(classes.errContainer, this.props.className)}>
          <div className={classes.errInnerContainer}>
            <Button
              variant="contained"
              color="primary"
              // onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}
            >
              {`An error occurred`}
            </Button>
          </div>
          <Typography className={classes.errHeading}>
            {"Error " + (this.props.name ? `in ${this.props.name};\n` : "")}
          </Typography>
          <Typography className={classes.errLine}>
            {this.state.errorInfo.componentStack.trim().split('\n')[0]}
          </Typography>
        </div>
      );
    } else {
      if (this.props.fragment) {
        return <>{this.props.children}</>;
      } else {
        return <div className={this.props.className} style={this.props.style}>
                {this.props.children}
              </div>
      }
    }
  }
}

interface ReduxProps {
}
interface ReactProps extends WithStyles<typeof styles> {
  fragment?: boolean;
  name?: string;
  className?: any;
  style?: any;
}

const styles = (theme: Theme) => createStyles({
  errMessage: {
    paddingTop: theme.spacing(2),
    color: red[800],
    fontWeight: 'bold',
  },
  errLine: {
    color: grey[700],
  },
  errHeading: {
    color: red[700],
  },
  errInnerContainer: {
    marginBottom: 20,
  },
  errContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
    maxWidth: 500,
    margin: 20,
    padding: 20,
    boxShadow: "1px 2px 3px 0px rgba(76,76,76,0.4)",
    borderRadius: BorderRadius,
    border: `1px solid ${Colors.red}`,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    transition: "all 100ms",
    "&:hover": {
      transition: "all 100ms",
      boxShadow: "2px 3px 3px 0px rgba(76,76,76,0.6)",
    },
  }
});

export default withStyles(styles)(ErrorBounds);
