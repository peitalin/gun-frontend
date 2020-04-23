import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Utils Components
import ErrorDisplay, { GraphQLErrors } from "components/Error";
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
import SnackBarA from "components/Snackbars/SnackbarA";
// MUI
import Typography from "@material-ui/core/Typography";
import TextInput from "components/Fields/TextInput";
import Button from "@material-ui/core/Button";
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";



const ShareLinkPage: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const [shareEmails, setShareEmails] = React.useState(["bertha@gmail.com"]);

  return (
    <ErrorBounds>
      <main className={clsx(classes.root, "fadeInFast")}>
        <div className={classes.flexCol}>
          <div className={classes.productColumn}>
            <Typography color={"primary"} variant="h4" gutterBottom>
              Share A Link
            </Typography>
            <div className={classes.formContainer}>
              {
                shareEmails.map(( email, i ) => {
                  return (
                    <div key={i} className={"fadeInFast"}>
                      <form className={classes.container} noValidate autoComplete="off">
                        <TextInput
                          required
                          placeholder="rachel@live.com"
                          className={classes.textField}
                          value={email}
                          onChange={(e) => {
                            setShareEmails([
                              ...shareEmails.slice(0, i),
                              e.target.value,
                              ...shareEmails.slice(i + 1)
                            ])
                          }}
                          inputProps={{ style: { width: '100%' }}}
                        />
                        <IconButton
                          className={classes.removeButton}
                          size="small"
                          onClick={() => setShareEmails([
                              ...shareEmails.slice(0, i),
                              ...shareEmails.slice(i + 1)
                          ])}
                        >
                          <ClearIcon className={classes.removeX}/>
                        </IconButton>
                      </form>
                    </div>
                  )
                })
              }
            </div>

            <Button
              className={classes.addEmailButton}
              variant="contained"
              disabled={shareEmails.length > 4}
              onClick={() => setShareEmails([ ...shareEmails, ""])}
            >
              { (shareEmails.length > 4) ? "No more..." : "Add Another Email" }
            </Button>
          </div>

          <Button
            className={classes.sendInviteButton}
            variant="contained"
            disabled={!shareEmails.every(email => email.length > 4)}
            onClick={() => alert("dispatch emails unimplemented, and email validation")}
          >
            { (shareEmails.length < 1) ? "Enter a email first" : "Send Invite" }
          </Button>
        </div>
      </main>
    </ErrorBounds>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  root: {
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productColumn: {
    margin: '3rem',
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  textField: {
    flexGrow: 1,
    minWidth: 100,
  },
  removeButton: {
    width: 40,
    height: 40,
    margin: "0.5rem",
  },
  removeX: {
  },
  addEmailButton: {
    height: 40,
  },
  sendInviteButton: {
    height: 40,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

export default withStyles(styles)( ShareLinkPage );