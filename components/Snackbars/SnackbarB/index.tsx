import * as React from 'react';
// Styles
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
// Snackbar components
import Snackbar from '@material-ui/core/Snackbar';
import MessageWrapper from "./MessageWrapper";


class SnackbarB extends React.Component<ReactProps, any> {

  render() {
    let props = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={this.props.open}
        onClick={this.props.closeSnackbar}
        autoHideDuration={
          this.props.autoHideDuration
          ? this.props.autoHideDuration : 5000
        }
        // autoHide calls onClose in 4 seconds
        onClose={this.props.closeSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
      >
        <MessageWrapper
          variant={props.variant}
          className={props.classes.messageWrapper}
          message={props.message}
          onClick={this.props.closeSnackbar}
        >
          {this.props.children}
        </MessageWrapper>
      </Snackbar>
    );
  };
};


const styles = theme => ({
  messageWrapper: {
    margin: theme.spacing(1),
  },
  close: {
    padding: theme.spacing(1/2),
  },
});

interface ReactProps {
  classes?: any;
  open?: boolean;
  message?: React.ReactNode;
  variant?: string;
  closeSnackbar?(any?: any): void;
  autoHideDuration?: number;
}

export default withStyles(styles)(SnackbarB);
