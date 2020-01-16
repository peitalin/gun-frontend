import * as React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { oc as option } from "ts-optchain";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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
//
import Link from "next/link";



const SignUp: React.FC<ReactProps> = (props) => {

  const [state, setState] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    subscribedNewsletters: [],
    emailUpdateCount: 0,
  })

  React.useEffect(() => {
    return () => {
      // if createUser is successful, component unmounts, so reset everything.
      setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        subscribedNewsletters: [],
        emailUpdateCount: 0,
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
      subscribedNewsletters: state.subscribedNewsletters,
    });
  }

  const toSignup = () => {
    props.setTabIndex(0)
  }

  const toggleSubscribeToNewsletter = () => {
    if (state.subscribedNewsletters.length !== 0 ) {
      setState(s => ({ ...s, subscribedNewsletters: ['promotions'] }))
    } else {
      setState(s => ({ ...s, subscribedNewsletters: [] }))
    }
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
          Create an Account
        </Typography>

        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="sign-up-email">Email Address</InputLabel>
            <Input autoFocus
              name="sign-up-email"
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
              autoComplete="current-password"
              type="password"
              onChange={(e) => {
                e.persist(); // for persisting synthetic events
                setState(s => ({ ...s, password: option(e).target.value() }))
              }}
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              name="first-name"
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
              value={state.lastName}
              onChange={(e) => {
                e.persist(); // for persisting synthetic events
                setState(s => ({ ...s, lastName: option(e).target.value() }))
              }}
            />
          </FormControl>
          {/* <FormControlLabel
            classes={{
              label: classes.checkBox
            }}
            control={<Checkbox value="remember" color="primary" />}
            label="Receive discounts, updates, and promotions"
            onClick={toggleSubscribeToNewsletter}
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={(event) => handleClick(event)}
          >
            Create Account
          </Button>

          <Typography variant="caption" className={classes.termsText}>
            By signing up, I agree to the
            <Link href={"/terms-of-service"}>
              <a className={classes.link}> Terms of Service </a>
            </Link>
            and
            <Link href={"/privacy-policy"}>
              <a className={classes.link}> Privacy Policy. </a>
            </Link>
          </Typography>
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
  dispatchCreateUser?(payload: any): void;
  email?: string;
  handleToggleModal?(): void;
}

export default withStyles(styles)(SignUp);
