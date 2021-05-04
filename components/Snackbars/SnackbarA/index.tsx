import React from 'react';
// Styles
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
// Snackbar components
import Snackbar from '@material-ui/core/Snackbar';
import MessageWrapper from "./MessageWrapper";


class SnackbarA extends React.Component<ReactProps, any> {

  render() {
    let props = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.props.open}
        onClick={this.props.closeSnackbar}
        autoHideDuration={
          this.props.autoHideDuration
          ? this.props.autoHideDuration : 4000
        }
        // autoHide calls onClose in 4 seconds
        onClose={this.props.closeSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
      >
        <MessageWrapper
          variant={props.variant}
          className={props.classes.margin}
          message={props.message}
          disableIcon={props.disableIcon || false}
          onClick={this.props.closeSnackbar}
        />
      </Snackbar>
    );
  };
};


const styles = theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  close: {
    padding: theme.spacing(1/2),
  },
});

interface ReactProps {
  classes?: any;
  open?: boolean;
  message?: string | string[];
  variant?: string;
  disableIcon?: boolean;
  closeSnackbar?(any?: any): void;
  autoHideDuration?: number;
}

export default withStyles(styles)(SnackbarA);
