import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import Loading from "components/Loading";
import ErrorDisplay, { JsonTree, GraphQLErrors } from "components/Error";
import ErrorBounds from "components/ErrorBounds";
import TextInput from "components/Fields/TextInput";
import ChangePasswordButton from "./ChangePasswordButton";
// Typings
import { HtmlEvent } from "typings";



const ChangePasswordForm = (props: ReactProps) => {

  const { classes } = props;
  const [showPasswordChanger, setShowPasswordChanger] = React.useState(false);
  // passwords
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordAgain, setNewPasswordAgain] = React.useState("");

  const handleSetCurrentPassword = (e: HtmlEvent) => {
    let pass = e.target.value;
    setCurrentPassword(pass);
  };

  const handleSetNewPassword = (e: HtmlEvent) => {
    let pass = e.target.value;
    setNewPassword(pass);
  };

  const handleSetNewPasswordAgain = (e: HtmlEvent) => {
    let pass = e.target.value;
    setNewPasswordAgain(pass);
  };

  const togglePasswordChange = () => {
    setShowPasswordChanger(show => !show)
    setCurrentPassword("")
    setNewPassword("")
    setNewPasswordAgain("")
  }

  const resetPasswordChange = () => {
    setShowPasswordChanger(false)
    setCurrentPassword("")
    setNewPassword("")
    setNewPasswordAgain("")
  }

  return (
    <ErrorBounds className={classes.root}>
      <div className={classes.flexRow}>
        <Typography variant="h4">
          Password
        </Typography>
        <a className={classes.link}
          onClick={togglePasswordChange}
        >
          {
            !showPasswordChanger
            ? <Typography
                className={clsx("fadeIn", classes.showPasswordChanger)}
                variant="subtitle2"
              >
                {"Change password"}
              </Typography>
            : <Typography
                className={clsx("fadeIn", classes.showPasswordChanger)}
                variant="subtitle2"
              >
                {"Cancel"}
              </Typography>
          }
        </a>
      </div>
      <div>
        <div className={clsx(
          classes.formContainer,
          showPasswordChanger
            ? classes.displaySomePasswordForm
            : classes.displayNone,
        )}>
          <Typography variant="body1" className={classes.passwordTitle}>
            For security, please enter your current password.
          </Typography>
          <form autoComplete="off">
            <TextInput
              required
              type="password"
              placeholder={"Enter your current password"}
              className={classes.textField}
              value={currentPassword}
              onChange={handleSetCurrentPassword}
              inputProps={{ style: { width: '100%' }}}
            />
          </form>
          <Typography variant="body1" className={classes.passwordTitle}>
            Enter your new password
          </Typography>
          <form autoComplete="off">
            <TextInput
              required
              type="password"
              placeholder={"New password"}
              className={classes.textField}
              value={newPassword}
              onChange={handleSetNewPassword}
              inputProps={{ style: { width: '100%' }}}
            />
          </form>
          <Typography variant="body1" className={classes.passwordTitle}>
            Enter your new password again to confirm
          </Typography>
          <form autoComplete="off">
            <TextInput
              required
              type="password"
              placeholder={"New password again"}
              className={classes.textField}
              value={newPasswordAgain}
              onChange={handleSetNewPasswordAgain}
              inputProps={{ style: { width: '100%' }}}
            />
          </form>
          <ChangePasswordButton
            disabled={newPassword !== newPasswordAgain || newPassword.length < 6}
            currentPassword={currentPassword}
            newPassword={newPassword}
            resetPasswordChange={resetPasswordChange}
          />
        </div>
      </div>
    </ErrorBounds>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  root: {
  },
  flexRow: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  formContainer: {
    padding: "0",
    marginTop: '0.5rem',
  },
  textField: {
    marginBottom: '1rem',
    minWidth: 250,
    width: "100%",
  },
  link: {
    color: "#2484FF",
    cursor: 'pointer',
  },
  showPasswordChanger: {
    marginBottom: '0.5rem',
    color: "#2484FF",
  },
  passwordTitle: {
    fontWeight: 600,
    lineHeight: '1.5rem',
    marginTop: '1rem',
    marginBottom: '0.1rem',
  },
  displaySomePasswordForm: {
    height: 330, // password change form is 330 high.
    // must define set height for height animation
    opacity: 1,
    transition: theme.transitions.create(['height', 'opacity'], {
      easing: theme.transitions.easing.easeIn,
      duration: 100,
    })
  },
  displayNone: {
    opacity: 0,
    height: 0,
    pointerEvents: 'none',
    transition: theme.transitions.create(['height', 'opacity'], {
      easing: theme.transitions.easing.easeIn,
      duration: 100,
    })
  },
});

export default withStyles(styles)( ChangePasswordForm );

