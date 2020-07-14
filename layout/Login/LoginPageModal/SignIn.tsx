import React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { oc as option } from "ts-optchain";
import { Colors } from "layout/AppTheme";

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Typings
import { Cart } from "typings/gqlTypes";
// Components
import styles from './commonStyles';
import ErrorBounds from "components/ErrorBounds";
import Or from "components/Or";
// Router
import LockIcon from "@material-ui/icons/Lock";
// Clear
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import ButtonLoading from "components/ButtonLoading";


const SignIn = (props: ReactProps) => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const { classes } = props;

  const handleClick = (event) => {
    event.preventDefault();
    props.dispatchLogin({
      email: email,
      password: password,
    });
  }

  const toSignup = () => {
    props.setTabIndex(1)
  }

  const toForgotPassword = () => {
    props.setTabIndex(2)
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

        <Typography className={classes.title} variant="h3">
          {
            props.title
            ? props.title
            : "Login"
          }
        </Typography>

        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="sign-in-email">Email Address</InputLabel>
            <Input
              autoFocus
              name="sign-in-email"
              type={"email"}
              autoComplete="email"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">
              Password
              <LockIcon className={classes.secureCheckoutIcon}/>
            </InputLabel>

            <Input
              name="sign-in-password"
              autoComplete="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </FormControl>
          {/* <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                color="primary"
                onChange={() => setRememberMe(rememberMe => !rememberMe)}
                value=""
                inputProps={{
                  'aria-label': 'primary checkbox',
                }}
              />
            }
            classes={{
              label: classes.checkBox
            }}
            label="Remember me for a week"
          /> */}
          <ButtonLoading
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={(event) => handleClick(event)}
            loadingIconColor={Colors.blue}
            replaceTextWhenLoading={true}
            loading={props.buttonLoading}
            disabled={props.buttonLoading}
          >
            Login
          </ButtonLoading>
        </form>

        <div className={classes.preHeader}>
          <Typography variant="body1">
            <a onClick={toForgotPassword} className={classes.link}>
              Forgot Password?
            </a>
          </Typography>
        </div>

        <Or/>

        <Typography className={classes.dontHaveAccount} variant="body1">
          Don't have an account?
          <a onClick={toSignup} className={classes.link}>
            Sign up
          </a>
        </Typography>

      </div>
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  setTabIndex(tabIndex: number): void;
  dispatchLogin?(payload: { email: string, password: string }): void;
  handleToggleModal?(): void;
  title?: string;
  buttonLoading?: boolean;
}

export default withStyles(styles)(SignIn);
