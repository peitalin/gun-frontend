import React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextInput from "components/Fields/TextInput";
import Typography from '@material-ui/core/Typography';
// Components
import styles from './commonStylesCompact';
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

        <Typography className={classes.title} variant="h5">
          Reset Password
        </Typography>

        <Typography variant="body1" className={classes.passwordResetSubtitle}>
          Enter the email address associated with your account
          and we will send you a link to reset your password.
        </Typography>

        <div className={classes.form}>
          <TextInput
            className={classes.textInput}
            id="reset-password-email"
            name="reset-password-email"
            required
            type={"email"}
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{ style: { width: '100%' }}}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={(e) => props.dispatchResetPassword({ email })}
          >
            Send Reset Link
          </Button>
        </div>

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
