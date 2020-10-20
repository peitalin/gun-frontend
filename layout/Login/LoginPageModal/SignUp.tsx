import React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { oc as option } from "ts-optchain";
import { Colors } from "layout/AppTheme";

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Typings
import { Cart } from "typings/gqlTypes";
import styles from './commonStyles';
import ErrorBounds from "components/ErrorBounds";
import LockIcon from "@material-ui/icons/Lock";
// Clear
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import ButtonLoading from "components/ButtonLoading";
//
import Link from "next/link";




const SignUp: React.FC<ReactProps> = (props) => {

  const [state, setState] = React.useState({
    email: props.initialEmail,
    password: "",
    firstName: "",
    lastName: "",
  })

  React.useEffect(() => {
    return () => {
      // if createUser is successful, component unmounts, so reset everything.
      setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      })
    }
  }, [])


  const handleClick = (event) => {
    event.preventDefault();
    props.dispatchCreateUser({
      email: state.email,
      password: state.password,
      firstName: state.firstName,
      lastName: state.lastName,
    });
  }

  const toSignup = () => {
    props.setTabIndex(0)
  }


  const { classes } = props;

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
            : "Create an Account"
          }
        </Typography>

        <form className={classes.form}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              name="first-name"
              autoComplete="given-name"
              value={state.firstName}
              onChange={(e) => {
                e.persist(); // for persisting synthetic events
                setState(s => ({ ...s, firstName: option(e).target.value() }))
              }}
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="last-name">Last Name</InputLabel>
            <Input
              name="last-name"
              autoComplete="family-name"
              value={state.lastName}
              onChange={(e) => {
                e.persist(); // for persisting synthetic events
                setState(s => ({ ...s, lastName: option(e).target.value() }))
              }}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="sign-up-email">Email Address</InputLabel>
            <Input
              name="sign-up-email"
              type={"email"}
              autoComplete="email"
              value={state.email}
              onChange={(e) => {
                e.persist(); // for persisting synthetic events
                setState(s => ({ ...s, email: option(e).target.value() }))
              }}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">
              Password
              <LockIcon className={classes.secureCheckoutIcon}/>
            </InputLabel>
            <Input
              name="sign-up-password"
              type="password"
              onChange={(e) => {
                e.persist(); // for persisting synthetic events
                setState(s => ({ ...s, password: option(e).target.value() }))
              }}
            />
          </FormControl>
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
            Create Account
          </ButtonLoading>
          {/* <Typography variant="caption" className={classes.termsText}>
            By signing up, I agree to the
            <a className={classes.link}
              href={"https://help.relay.shop/hc/en-us/articles/360038530771-Terms-of-Service"}
            >
              Terms of Service
            </a>
            and
            <a className={classes.link}
              href={"https://help.relay.shop/hc/en-us/articles/360038152632-Privacy-Policy"}
            >
              Privacy Policy.
            </a>
          </Typography> */}
        </form>

        <div className={classes.preHeader}>
          <Typography variant="body1">
            {"Already have an account? "}
            <a onClick={toSignup} className={classes.link}>
              Login
            </a>
          </Typography>
        </div>

      </div>
    </ErrorBounds>
  )
};

interface ReactProps extends WithStyles<typeof styles> {
  setTabIndex(tabIndex: number): void;
  dispatchCreateUser(payload: {
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  }): void;
  email?: string;
  handleToggleModal?(): void;
  title?: string;
  buttonLoading?: boolean;
  initialEmail?: string;
}

export default withStyles(styles)(SignUp);
