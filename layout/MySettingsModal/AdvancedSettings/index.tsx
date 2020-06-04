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
import DeleteStore from "./DeleteStore";
import DeleteAccount from "./DeleteAccount";
// Typings
import { HtmlEvent } from "typings";
// import { UserPrivate } from "typings/gqlTypes";
type UserPrivate = any;



const AdvancedSettings = (props: ReactProps) => {

  const { classes } = props;
  const [showAdvancedSettings, setShowAdvancedSettings] = React.useState(false);

  return (
    <ErrorBounds className={classes.root}>
      <div className={classes.flexRow}>
        <Typography variant="h4">
          Advanced Settings
        </Typography>
        <a className={classes.link}
          onClick={() => setShowAdvancedSettings(s => !s)}
        >
          {
            showAdvancedSettings
            ? <Typography
                className={clsx("fadeIn", classes.showDeleteForm)}
                variant="subtitle2"
              >
                {"Cancel"}
              </Typography>
            : <Typography
                className={clsx("fadeIn", classes.showDeleteForm)}
                variant="subtitle2"
              >
                {"Show Advanced Settings"}
              </Typography>
          }
        </a>
      </div>
      <div>
        <div className={clsx(
          classes.formContainer,
          showAdvancedSettings
            ? classes.displayAdvancedSettings
            : classes.displayNone,
        )}>
          {
            option(props).user.store.id() &&
            <DeleteStore />
          }
          <DeleteAccount />
        </div>
      </div>
    </ErrorBounds>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate
  goBack?(): void;
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
    color: Colors.blue,
  },
  passwordTitle: {
    fontWeight: 600,
    lineHeight: '1.5rem',
    marginTop: '1rem',
    marginBottom: '0.1rem',
  },
  displayAdvancedSettings: {
    height: 330, // delete form is 300 high.
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

export default withStyles(styles)( AdvancedSettings );

