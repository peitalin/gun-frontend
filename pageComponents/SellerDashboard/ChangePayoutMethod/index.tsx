import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Redux
import { connect } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import Loading from "components/Loading";
import ErrorBounds from "components/ErrorBounds";
import TextInput from "components/Fields/TextInput";
import ChangePayoutMethodButton from "./ChangePayoutMethodButton";
import Paypal from "components/Icons/Paypal";
// Typings
import { UserPrivate } from "typings/gqlTypes";
import { HtmlEvent } from "typings"



const ChangePayoutMethod = (props: ReactProps & ReduxProps) => {

  const { classes } = props;
  const [showPayoutMethodChanger, setShowPayoutMethodChanger] = React.useState(false);
  const [newBsb, setNewBsb] = React.useState("");
  const [newAccountNumber, setNewAccountNumber] = React.useState("");
  const [newAccountName, setNewAccountName] = React.useState("");

  const handleSetNewBsb = (e: HtmlEvent) => {
    let bsb = e.target.value;
    setNewBsb(bsb);
  };

  const handleSetNewAccountNumber = (e: HtmlEvent) => {
    let accNum = e.target.value;
    setNewBsb(accNum);
  };

  const handleSetNewAccountName = (e: HtmlEvent) => {
    let accName = e.target.value;
    setNewBsb(accName);
  };

  const togglePayoutMethodChanger = () => {
    setShowPayoutMethodChanger(s => !s)
    setNewBsb("")
    setNewAccountNumber("")
    setNewAccountName("")
  }

  const resetPayoutMethodChanger = () => {
    setShowPayoutMethodChanger(false)
    setNewBsb("")
    setNewAccountNumber("")
    setNewAccountName("")
  }

  if (props.compact) {
    return (
      <ErrorBounds className={classes.rootCompact}>
        <div className={clsx(classes.flexRow, classes.flexWrap)}>
          <div className={classes.flexItem}>
            <div className={classes.paypalIcon}>
              <Paypal/>
            </div>
            {
              props?.user?.payoutMethod?.bsb &&
              <Typography variant="body1" className={classes.email}>
                {props?.user?.payoutMethod?.bsb ?? "NA"}
              </Typography>
            }
            {
              props?.user?.payoutMethod?.accountNumber &&
              <Typography variant="body1" className={classes.email}>
                {props?.user?.payoutMethod?.accountNumber ?? "NA"}
              </Typography>
            }
            {
              props?.user?.payoutMethod?.accountName &&
              <Typography variant="body1" className={classes.email}>
                {props?.user?.payoutMethod?.accountName ?? "NA"}
              </Typography>
            }
          </div>
          <a className={classes.link}
            onClick={togglePayoutMethodChanger}>
            <Typography
              className={classes.showPayoutChanger}
              variant="body1"
            >
              {
                !showPayoutMethodChanger
                  ? "Change payout bank account"
                  : "Cancel"
              }
            </Typography>
          </a>
        </div>

        <div>
          {
            showPayoutMethodChanger &&
            <div>
              <Typography variant="subtitle1" className={classes.payoutTitle}>
                Enter a new bank BSB number for payouts
              </Typography>
              <form autoComplete="off">
                <TextInput
                  required
                  placeholder={props?.user?.payoutMethod?.bsb ?? "123-456"}
                  className={classes.textField}
                  value={newBsb}
                  onChange={handleSetNewBsb}
                  inputProps={{ style: { width: '100%' }}}
                />
                <TextInput
                  required
                  placeholder={props?.user?.payoutMethod?.accountNumber ?? "98-456-1122"}
                  className={classes.textField}
                  value={newAccountNumber}
                  onChange={handleSetNewAccountNumber}
                  inputProps={{ style: { width: '100%' }}}
                />
                <TextInput
                  required
                  placeholder={props?.user?.payoutMethod?.accountName ?? "Abel Smith"}
                  className={classes.textField}
                  value={newAccountName}
                  onChange={handleSetNewAccountName}
                  inputProps={{ style: { width: '100%' }}}
                />
              </form>
              <ChangePayoutMethodButton
                user={props.user}
                newBsb={newBsb}
                newAccountNumber={newAccountNumber}
                newAccountName={newAccountName}
                resetPayoutMethod={resetPayoutMethodChanger}
              />
            </div>
          }
        </div>
      </ErrorBounds>
    );
  }

  return (
    <ErrorBounds className={classes.root}>
      <Typography
        className={classes.payoutTitle}
        color={"primary"}
        variant="body1"
      >
        Current Bank Account
      </Typography>

      <div className={clsx(classes.flexRow, classes.flexWrap)}>
        <div className={classes.flexItem}>
          <div className={classes.paypalIcon}>
            <Paypal/>
          </div>
          {
            props?.user?.payoutMethod?.bsb &&
            <Typography variant="body1" className={classes.email}>
              {props?.user?.payoutMethod?.bsb ?? "NA"}
            </Typography>
          }
          {
            props?.user?.payoutMethod?.accountNumber &&
            <Typography variant="body1" className={classes.email}>
              {props?.user?.payoutMethod?.accountNumber ?? "NA"}
            </Typography>
          }
          {
            props?.user?.payoutMethod?.accountName &&
            <Typography variant="body1" className={classes.email}>
              {props.user.payoutMethod.accountName ?? "NA"}
            </Typography>
          }
        </div>
        <a className={classes.link}
          onClick={togglePayoutMethodChanger}>
          <Typography
            className={classes.showPayoutChanger}
            variant="body1"
          >
            {
              !showPayoutMethodChanger
              ? "Change payout bank account"
              : "Cancel"
            }
          </Typography>
        </a>
      </div>

      <div>
        {
          showPayoutMethodChanger &&
          <div>
            <Typography variant="subtitle1" className={classes.payoutTitle}>
              Enter your new bank account for payouts
            </Typography>
            <form autoComplete="off">
              <TextInput
                required
                placeholder={props?.user?.payoutMethod?.bsb ?? "123-456"}
                className={classes.textField}
                value={newBsb}
                onChange={handleSetNewBsb}
                inputProps={{ style: { width: '100%' }}}
              />
              <TextInput
                required
                placeholder={props?.user?.payoutMethod?.accountNumber ?? "98-456-1122"}
                className={classes.textField}
                value={newAccountNumber}
                onChange={handleSetNewAccountNumber}
                inputProps={{ style: { width: '100%' }}}
              />
              <TextInput
                required
                placeholder={props?.user?.payoutMethod?.accountName ?? "Abel Smith"}
                className={classes.textField}
                value={newAccountName}
                onChange={handleSetNewAccountName}
                inputProps={{ style: { width: '100%' }}}
              />
            </form>
            <ChangePayoutMethodButton
              user={props.user}
              newBsb={newBsb}
              newAccountNumber={newAccountNumber}
              newAccountName={newAccountName}
              resetPayoutMethod={resetPayoutMethodChanger}
            />
          </div>
        }
      </div>
    </ErrorBounds>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  compact?: boolean;
}

interface ReduxProps {
  updateUserProfile(payload: UserPrivate): void;
  user: UserPrivate;
}

//////////////// REDUX /////////////////////
const mapStateToProps = ( state: GrandReduxState ) => {
  return {
    user: state.reduxLogin.user
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    updateUserProfile: (payload: UserPrivate) => dispatch(
      Actions.reduxLogin.SET_USER(payload)
    ),
  }
}

const ChangePayoutMethodRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
)( ChangePayoutMethod )

const styles = (theme: Theme) => createStyles({
  root: {
    padding: '2rem',
    paddingTop: '4rem',
    borderRadius: '4px',
    backgroundColor: Colors.foregroundColor,
    boxShadow: '0px 1px 1px 0 #e6ebf1',
    minWidth: 375,
  },
  rootCompact: {
    padding: '1rem 0rem',
    borderRadius: '4px',
    backgroundColor: Colors.foregroundColor,
    // minWidth: 350,
  },
  flexRow: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  flexItem: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
  },
  paypalIcon: {
    marginRight: '0.5rem',
  },
  textField: {
    marginBottom: '0.5rem',
    minWidth: 280,
    width: "100%",
  },
  link: {
    color: "#2484FF",
    cursor: 'pointer',
  },
  showPayoutChanger: {
    margin: '0.5rem 0rem 0.5rem 0rem',
    fontSize: '0.9rem',
    color: Colors.blue,
    "&:hover": {
      color: fade(Colors.blue, 0.9),
    },
  },
  email: {
    fontWeight: 600,
    fontSize: '0.9rem',
    marginRight: '1rem',
  },
  payoutTitle: {
    fontWeight: 600,
    marginBottom: '1rem',
    fontSize: '1rem',
  },
});

export default withStyles(styles)(React.memo(
  (props: ReactProps) => <ChangePayoutMethodRedux {...props}/>,
));

