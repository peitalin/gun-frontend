import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { Colors } from "layout/AppTheme";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import Loading from "components/Loading";
import ErrorBounds from "components/ErrorBounds";
import TextInput from "components/Fields/TextInput";
import DeleteStoreButton from "./DeleteStoreButton";
// Typings
import { HtmlEvent } from "typings";



const DeleteStore = (props: ReactProps) => {

  const { classes } = props;
  const [showPasswordChanger, setShowPasswordChanger] = React.useState(false);
  // passwords
  const [currentPassword, setCurrentPassword] = React.useState("");

  const handleSetCurrentPassword = (e: HtmlEvent) => {
    let pass = e.target.value;
    setCurrentPassword(pass);
  };


  const togglePasswordChange = () => {
    setShowPasswordChanger(show => !show)
    setCurrentPassword("")
  }

  const resetPassword = () => {
    setShowPasswordChanger(false)
    setCurrentPassword("")
  }

  return (
    <ErrorBounds className={classes.root}>
      <br/>
      <div className={classes.flexRow}>
        <Typography variant="h4">
          Delete Store
        </Typography>
        <a className={classes.link}
          onClick={togglePasswordChange}
        >
          {
            !showPasswordChanger
            ? <Typography
                className={clsx("fadeIn", classes.showDeleteForm)}
                variant="subtitle2"
              >
                {"Delete Store"}
              </Typography>
            : <Typography
                className={clsx("fadeIn", classes.showDeleteForm)}
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
            ? classes.displayDeleteForm
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
          <div className={classes.flexRow}>
            <DeleteStoreButton
              disabled={!currentPassword}
              password={currentPassword}
              resetPassword={resetPassword}
            />
          </div>
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
    color: Colors.blue,
    cursor: 'pointer',
  },
  showDeleteForm: {
    marginBottom: '0.5rem',
    color: Colors.red,
  },
  passwordTitle: {
    fontWeight: 600,
    lineHeight: '1.5rem',
    marginTop: '1rem',
    marginBottom: '0.1rem',
  },
  displayDeleteForm: {
    height: 120, // delete form is 120 high.
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

export default withStyles(styles)( DeleteStore );

