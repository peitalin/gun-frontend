import React from 'react';
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import { Colors } from "layout/AppTheme";

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// Components
import styles from './commonStyles';
import ErrorBounds from "components/ErrorBounds";
import Or from "layout/Login/Or";
// Router
import LockIcon from "@mui/icons-material/Lock";
// Clear
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import ButtonLoading from "components/ButtonLoading";


const LogIn = (props: ReactProps) => {

  const [email, setEmail] = React.useState(props.initialEmail);
  const [password, setPassword] = React.useState("");
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
            loadingIconColor={Colors.cream}
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
  initialEmail?: string;
}

export default withStyles(styles)(LogIn);
