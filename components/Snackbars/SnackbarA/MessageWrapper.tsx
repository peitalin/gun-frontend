import React from 'react';
// Styles
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Colors } from "layout/AppTheme";
// Snackbar components
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// Colors
import variantIcon from "./variantIcon";


const MessageWrapper: React.FC<MessageWrapperProps> = (props) => {

  const MessageDisplay = () => {
    const { classes, message, variant } = props;
    let Icon = variantIcon[variant];

    if (!!(message as string[]).map) {
      // array of messages
      return (
        <div className={classes.message} >
          {
            !props.disableIcon &&
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
          }
          <div style={{
            display: "flex",
            flexDirection: 'column',
          }}>
          {
            (message as string[]).map(s =>
              <div key={s}>
                {s}
              </div>
            )
          }
          </div>
        </div>
      )
    } else {
      // single string message
      return (
        <div className={classes.message}>
          {
            !props.disableIcon &&
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
          }
          <span>{message}</span>
        </div>
      )
    }
  }

  const { classes, className, message, onClose, variant, onClick } = props;
  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      message={MessageDisplay()}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClick}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
    />
  )
}

interface MessageWrapperProps extends WithStyles<typeof styles> {
  className?: any;
  message?: string | string[];
  variant?: any;
  disableIcon?: boolean;
  onClose?(): void;
  onClick?(): void;
}

const styles = theme => createStyles({
  close: {
    padding: theme.spacing(1/2),
  },
  success: {
    backgroundColor: Colors.charcoal,
  },
  error: {
    backgroundColor: Colors.charcoal,
  },
  info: {
    backgroundColor: Colors.charcoal,
  },
  warning: {
    backgroundColor: Colors.charcoal,
  },
  // success: {
  //   backgroundColor: Colors.green,
  // },
  // error: {
  //   backgroundColor: Colors.red,
  // },
  // info: {
  //   backgroundColor: Colors.blue,
  // },
  // warning: {
  //   backgroundColor: Colors.yellow,
  // },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default withStyles(styles)( MessageWrapper );

