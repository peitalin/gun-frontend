import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, lighten } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Material UI
import Button from "@material-ui/core/Button";
import TextInput from "components/Fields/TextInput";
// Snackbar
import { useSnackbar } from "notistack";
// typings
import { Dealer } from "typings/gqlTypes";
import { MutData2, MutData4 } from ".";



const SetDealerForUserButton = (props: ReactProps) => {

  const {
    classes,
  } = props;

  const maxLength = 60
  const [dealerUserIdOrEmail, setDealerUserIdOrEmail] = React.useState("")
  const snackbar = useSnackbar();

  return (
    <div className={classes.form}>
      <div className={clsx(classes.flexCol, classes.section1)}>
        <TextInput
          name="dealer.userIdOrEmail"
          placeholder="userId or email to link to dealer"
          className={classes.textField}
          value={dealerUserIdOrEmail}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              setDealerUserIdOrEmail(e.target.value)
            }
          }}
          inputProps={{ style: { width: '100%' }}}
          // errorMessage={fprops.errors?.dealer?.name}
          // touched={!!fprops.touched?.dealer?.name}
          disableInitialValidationMessage={true}
          limit={{
            max: maxLength,
            count: dealerUserIdOrEmail.length
          }}
        />
        <Button
          className={classes.buttonBlue}
          type="submit" // this sets off Form submit
          variant={"outlined"}
          color={"primary"}
          onClick={async() => {
            await props.setDealerForUser({
              dealerUserIdOrEmail: dealerUserIdOrEmail,
              dealerId: props.dealer?.id
            })
            .then(res => {
              // res.setDealerIdForUser.user
              setDealerUserIdOrEmail("")
              props.searchDealerAsAdmin(props.dealer?.id)
            })
            .catch(e => {
              snackbar.enqueueSnackbar(
                `Dealer linking to user failed with msg: ${e}`,
                { variant: "error" }
              )
            })
          }}
        >
          Link Dealer to User
        </Button>
        <div className={classes.warningText}>
          Note: this replaces the User's existing dealer profile
          <br/> even if the user already has a dealer profile.
        </div>

        <Button
          className={classes.buttonRed}
          type="submit" // this sets off Form submit
          variant={"outlined"}
          color={"primary"}
          onClick={async() => {
            await props.unlinkUsersForDealerId({
              dealerId: props.dealer?.id
            })
            .then(res => {
              // res.setDealerIdForUser.user
              setDealerUserIdOrEmail("")
              props.searchDealerAsAdmin(props.dealer?.id)
            })
            .catch(e => {
              snackbar.enqueueSnackbar(
                `Dealer linking to user failed with msg: ${e}`,
                { variant: "error" }
              )
            })
          }}
        >
          Unlink Users from Dealer
        </Button>
        <div className={classes.warningText}>
          Note: this unlinks all users for this dealer profile <br/>
          in case this dealer has multiple user accounts
        </div>
      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  setDealerForUser?({ dealerUserIdOrEmail, dealerId }): Promise<MutData2>;
  searchDealerAsAdmin(dealerId: string): void;
  unlinkUsersForDealerId({ dealerId }): Promise<MutData4>;
  dealer: Dealer
}

const styles = (theme: Theme) => createStyles({
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  section: {
    margin: '2rem',
  },
  section1: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  form: {
    width: '100%',
  },
  textField: {
    marginBottom: "1rem",
    fontSize: 14,
  },
  buttonRed: {
    maxWidth: 250,
    color: Colors.cream,
    backgroundColor: Colors.red,
    border: `1px solid ${Colors.magenta}`,
    "&:hover": {
      border: `1px solid ${Colors.pink}`,
      backgroundColor: lighten(Colors.red,0.1),
    }
  },
  buttonBlue: {
    maxWidth: 250,
    color: Colors.cream,
    backgroundColor: Colors.blue,
    border: `1px solid ${Colors.lightBlue}`,
    "&:hover": {
      border: `1px solid ${Colors.blue}`,
      backgroundColor: lighten(Colors.blue,0.1),
    }
  },
  warningText: {
    marginTop: '1rem',
    marginBottom: '1rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack
  },
});


export default withStyles(styles)( SetDealerForUserButton );



