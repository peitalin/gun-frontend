import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import {
  UserPrivate,
  ID,
  User_Licenses,
} from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
// Material UI
import Typography from "@material-ui/core/Typography";
import Loading from "components/Loading";
// helpers
import { formatDateTime } from "utils/dates";
import { Colors } from "layout/AppTheme";
// validation
import { FormikProps } from 'formik';
import UserLicenseRowCard from "layout/MySettingsModal/UserLicenses/UserLicenseRowCard";
import Tooltip from "@material-ui/core/Tooltip";




const UserProfileDetails = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    user,
    ...fprops
  } = props;


  let countryCode = user?.phoneNumber?.countryCode;
  let phoneNumber = user?.phoneNumber?.number;
  let phoneNumberFull = !!phoneNumber
    ? `${countryCode} ${phoneNumber}`
    : "NA"


  React.useEffect(() => {
    fprops.setFieldValue("userId", user?.id)
    fprops.setFieldValue("verified", user?.defaultLicense?.verified)
  }, [user])

  let hasVerifiedLicense = user.licenses?.some(l => l.verified)

  return (
    <ErrorBounds className={clsx(
      classes.root,
      classes.flexRowWithBorder,
    )}>
      <div className={classes.orderItemsContainer}>

        <div className={classes.flexCol}>
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
                Name:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {user?.firstName + " " + user?.lastName}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                User Email:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {user?.email}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Created At
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {formatDateTime(user?.createdAt)}
              </Typography>
            </div>

            <Typography className={classes.fieldTitle} variant="subtitle1">
              Phone Number
            </Typography>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                User Phone Number:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {phoneNumberFull}
              </Typography>
            </div>

            <Typography className={classes.fieldTitle} variant="subtitle1">
              User Licence
            </Typography>

            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                License Number:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {user?.defaultLicense?.licenseNumber}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                License State:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {user?.defaultLicense?.licenseState ?? "NA"}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                License Expiry:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {formatDateTime(user?.defaultLicense?.licenseExpiry)}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                License Category:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {user?.defaultLicense?.licenseCategory ?? "NA"}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={clsx(
                classes.fieldKeyBold,
                hasVerifiedLicense
                  ? classes.blue
                  : classes.red
              )} variant="subtitle1">
                License Verified (at least one):
              </Typography>
              <Typography className={clsx(
                classes.fieldInfoBold,
                hasVerifiedLicense
                  ? classes.blue
                  : classes.red
              )} variant="subtitle1">
                {`${hasVerifiedLicense}`}
              </Typography>
            </div>

            {
              (user?.licenses ?? []).map(license => {
                return (
                  <Tooltip title={"Choose this license to approve"} key={license?.id}>
                    <div
                      className={classes.licenseSelector}
                      onClick={() => {
                        console.log("setting license: ", license?.id)
                        props.setSelectedLicense(license)
                      }}
                    >
                      <UserLicenseRowCard
                        isHighlighted={false}
                        user={user}
                        license={license}
                      />
                    </div>
                  </Tooltip>
                )
              })
            }

            <Typography className={classes.fieldTitle} variant="subtitle1">
              Store
            </Typography>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Store ID
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {`${user?.store?.id}`}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Store Name
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {`${user?.store?.name}`}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                isSuspended
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {`${!!user?.store?.isSuspended}`}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                isDeleted
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {`${!!user?.store?.isDeleted}`}
              </Typography>
            </div>

          </div>
        </div>

      </div>
    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate;
  setSelectedLicense(a?: User_Licenses): void;
}
interface FormikFields {
  userId: ID;
  verified: boolean;
}


const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexCol: {
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
  orderItemsContainer: {
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
  licenseSelector: {
    "&:hover": {
      cursor: "pointer",
    },
  },
});

export default withStyles(styles)(UserProfileDetails);
