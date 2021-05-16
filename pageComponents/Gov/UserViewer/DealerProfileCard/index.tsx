import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import {
  UserPrivate,
} from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import SetDealerForm from "./SetDealerForm";
// helpers
import { Colors } from "layout/AppTheme";
import { formatDateTime } from "utils/dates";



const DealerProfileCard = (props: ReactProps) => {

  const {
    classes,
    user,
  } = props;

  return (
    <ErrorBounds className={clsx(
      classes.root,
      classes.flexRowWithBorder,
    )}>
      <div className={classes.dealerContainer}>

        <div className={classes.flexCol}>

          <Typography className={classes.fieldTitle} variant="subtitle1">
            User
          </Typography>
          <div className={classes.flexRow}>
            <Typography className={classes.fieldKey} variant="subtitle1">
              UserId:
            </Typography>
            <Typography className={classes.fieldInfo} variant="subtitle1">
              {user?.id}
            </Typography>
          </div>
          <div className={classes.flexRow}>
            <Typography className={classes.fieldKey} variant="subtitle1">
              User Email:
            </Typography>
            <Typography className={classes.fieldInfo} variant="subtitle1">
              {user.email}
            </Typography>
          </div>

          <Typography className={classes.fieldTitle} variant="subtitle1">
            Dealer Profile
          </Typography>
          <div className={classes.flexRow}>
            <Typography className={classes.fieldKey} variant="subtitle1">
              Dealer ID
            </Typography>
            <Typography className={classes.fieldInfo} variant="subtitle1">
              {`${user?.dealer?.id ?? "-"}`}
            </Typography>
          </div>
          <div className={classes.flexRow}>
            <Typography className={classes.fieldKey} variant="subtitle1">
              Name
            </Typography>
            <Typography className={classes.fieldInfo} variant="subtitle1">
              {`${user?.dealer?.name ?? "-"}`}
            </Typography>
          </div>
          <div className={classes.flexRow}>
            <Typography className={classes.fieldKey} variant="subtitle1">
              Created At
            </Typography>
            <Typography className={classes.fieldInfo} variant="subtitle1">
              {
                user?.dealer?.createdAt
                  ? formatDateTime(user?.dealer?.createdAt)
                  : "-"
              }
            </Typography>
          </div>
          <div className={classes.flexRow}>
            <Typography className={classes.fieldKey} variant="subtitle1">
              State
            </Typography>
            <Typography className={classes.fieldInfo} variant="subtitle1">
              {`${user?.dealer?.state ?? "-"}`}
            </Typography>
          </div>
          <div className={classes.flexRow}>
            <Typography className={classes.fieldKey} variant="subtitle1">
              City
            </Typography>
            <Typography className={classes.fieldInfo} variant="subtitle1">
              {`${user?.dealer?.city ?? "-"}`}
            </Typography>
          </div>
          <div className={classes.flexRow}>
            <Typography className={classes.fieldKey} variant="subtitle1">
              Postcode
            </Typography>
            <Typography className={classes.fieldInfo} variant="subtitle1">
              {`${user?.dealer?.postCode ?? "-"}`}
            </Typography>
          </div>
          <div className={classes.flexRow}>
            <Typography className={classes.fieldKey} variant="subtitle1">
              Address
            </Typography>
            <Typography className={classes.fieldInfo} variant="subtitle1">
              {`${user?.dealer?.address ?? "-"}`}
            </Typography>
          </div>
          <div className={classes.flexRow}>
            <Typography className={classes.fieldKey} variant="subtitle1">
              License Number
            </Typography>
            <Typography className={classes.fieldInfo} variant="subtitle1">
              {`${user?.dealer?.licenseNumber ?? "-"}`}
            </Typography>
          </div>

          <SetDealerForm
            dealerUserId={user?.id}
            dealerEmail={user?.email}
            searchUser={props.searchUser} // refetch user after mutation
          />

        </div>

      </div>
    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate;
  searchUser(userId: string): void;
}


const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
  },
  flexCol: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '0.5rem',
    marginTop: '0.25rem',
    marginBottom: '0.25rem',
  },
  flexRowWithBorder: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: '0rem',
  },
  dealerContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  fieldTitle: {
    fontWeight: 500,
    fontSize: '1rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.charcoal,
    marginBottom: "0.5rem",
    marginTop: "1rem",
  },
  fieldKey: {
    fontWeight: 400,
    fontSize: '0.9rem',
    width: '150px',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.charcoal,
    marginBottom: "0.5rem",
  },
  fieldInfo: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.black,
    marginBottom: "0.5rem",
  },
  fieldKeyBold: {
    fontWeight: 700,
    fontSize: '0.9rem',
    width: '150px',
    marginBottom: "0.5rem",
  },
  fieldInfoBold: {
    fontSize: '0.9rem',
    fontWeight: 700,
    marginBottom: "0.5rem",
  },
  blue: {
    color: Colors.blue,
  },
  red: {
    color: Colors.red,
  },
});

export default withStyles(styles)(DealerProfileCard);
