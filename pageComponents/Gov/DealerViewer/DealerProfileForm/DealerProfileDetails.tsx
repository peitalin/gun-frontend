import React from "react";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// Typings
import {
  Dealer,
  UserPrivate,
} from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
// Material UI
import Typography from "@mui/material/Typography";
import Loading from "components/Loading";
// helpers
import { formatDateTime } from "utils/dates";
import { Colors } from "layout/AppTheme";
// validation
import { FormikProps } from 'formik';
import Link from "next/link";
import Tooltip from '@mui/material/Tooltip';




const DealerProfileDetails = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    dealer,
    ...fprops
  } = props;

  let user: UserPrivate = dealer?.user as any;

  let countryCode = user?.phoneNumber?.countryCode;
  let phoneNumber = user?.phoneNumber?.number;
  let phoneNumberFull = !!phoneNumber
    ? `${countryCode} ${phoneNumber}`
    : "NA"


  React.useEffect(() => {
    fprops.setFieldValue("dealerId", dealer?.id)
  }, [dealer])

  return (
    <ErrorBounds className={clsx(
      classes.root,
      classes.flexRowWithBorder,
    )}>
      <div className={classes.orderItemsContainer}>

        <div className={classes.flexCol}>
          <div className={classes.flexCol}>

            <Typography className={classes.fieldTitle} variant="subtitle1">
              Dealer
            </Typography>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Dealer ID:
              </Typography>
              <Link href="/gov/dealers/[dealerId]"
                as={`/gov/dealers/${dealer?.id}`} // as
              >
                <a>
                  <Tooltip placement="top" title={"Edit Dealer Profile"}>
                    <Typography
                      className={clsx(
                        classes.fieldInfo,
                        classes.dealerEditLink,
                      )}
                      variant="subtitle1"
                    >
                      {dealer?.id}
                    </Typography>
                  </Tooltip>
                </a>
              </Link>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Name:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {dealer?.name ?? "-"}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                License Number:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {dealer?.licenseNumber ?? "-"}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                City:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {dealer?.city ?? "-"}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                State:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {dealer?.state ?? "-"}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Postcode
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {dealer?.postCode ?? "-"}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Address:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {dealer?.address ?? "-"}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Created At
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {formatDateTime(dealer?.createdAt)}
              </Typography>
            </div>

            <Typography className={classes.fieldTitle} variant="subtitle1">
              User Profile
            </Typography>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                User Phone Number:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {phoneNumberFull ?? "-"}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                User Email:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {user?.email ?? "-"}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                User ID:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {user?.id ?? "-"}
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
                {user?.defaultLicense?.licenseNumber ?? "-"}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                License State:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {user?.defaultLicense?.licenseState ?? "-"}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                License Expiry:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {
                  user?.defaultLicense?.licenseExpiry
                  ? formatDateTime(user?.defaultLicense?.licenseExpiry)
                  : "-"
                }
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                License Category:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {user?.defaultLicense?.licenseCategory ?? "-"}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={clsx(
                classes.fieldKeyBold,
                user?.defaultLicense?.verified ? classes.blue : classes.red
              )} variant="subtitle1">
                License Verified:
              </Typography>
              <Typography className={clsx(
                classes.fieldInfoBold,
                user?.defaultLicense?.verified ? classes.blue : classes.red
              )} variant="subtitle1">
                {`${user?.defaultLicense?.verified}`}
              </Typography>
            </div>


          </div>
        </div>

      </div>
    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  dealer: Dealer;
}
interface FormikFields {
  dealerId: string;
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
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.charcoal,
    marginBottom: "0.5rem",
    marginTop: "1rem",
  },
  fieldKey: {
    fontWeight: 400,
    fontSize: '0.9rem',
    width: '150px',
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.charcoal,
    marginBottom: "0.5rem",
  },
  fieldInfo: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.black,
    marginBottom: "0.5rem",
  },
  dealerEditLink: {
    color: Colors.ultramarineBlue,
    fontSize: '0.9rem',
    fontWeight: 500,
    marginBottom: "0.5rem",
    "&:hover": {
      color: Colors.ultramarineBlueLight
    },
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

export default withStyles(styles)(DealerProfileDetails);
