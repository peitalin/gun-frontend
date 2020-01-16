import React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
// Components
import styles from './commonStyles';
import ErrorBounds from "components/ErrorBounds";
// Clear
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";



const ResetPassword = (props: ReactProps) => {

  const [email, setEmail] = React.useState("");
  const { classes } = props;

  const toLogin = () => {
    props.setTabIndex(0)
  }

  return (
    <ErrorBounds className={classes.outerContainer}>
      <div className={classes.paper}>

        <IconButton
          className={classes.clearButton}
          onClick={props.handleToggleModal}
          size="medium"
        >
          <ClearIcon/>
        </IconButton>

        <Typography className={classes.title} variant="h5">
          Reset Password
        </Typography>

        <Typography variant="body1" className={classes.passwordResetSubtitle}>
          Enter the email address associated with your account
          and we will send you a link to reset your password.
        </Typography>

        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="sign-in-email">Email Address</InputLabel>
            <Input autoFocus
              id="reset-password-email"
              name="reset-password-email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={(e) => props.dispatchResetPassword({ email })}
          >
            Send Reset Link
          </Button>
        </form>

        <br/>
        <div className={classes.preHeader}>
          <Typography variant="body1">
            <a onClick={toLogin} className={classes.link}>
              Back to Login
            </a>
          </Typography>
        </div>

      </div>
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  setTabIndex(tabIndex: number): void;
  dispatchResetPassword(payload: { email: string }): void;
  handleToggleModal?(): void;
}

export default withStyles(styles)( ResetPassword );
