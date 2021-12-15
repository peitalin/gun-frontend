
import React from 'react';
import clsx from "clsx";
// Styles
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, Gradients, BorderRadius, isThemeDark } from "layout/AppTheme";
import {
  User_Licenses,
} from 'typings/gqlTypes';
// Components
import { formatJustDate } from "utils/dates";
import Select, { components } from 'react-select';



const OptionLicense = ( props ) => {

  const { classes } = props

  const license: User_Licenses = props.data?.value;

  let licenseCategory = license?.licenseCategory?.replace("Category", "");
  let expiry = formatJustDate(license?.licenseExpiry);

  return (
      <components.Option {...props}>
        <div className={classes.rowRoot}>
          <div className={classes.rowStyle}>
            <div className={classes.keyStyle}>
              License Number
            </div>
            <div className={classes.valueStyle}>
              {license?.licenseNumber}
            </div>
          </div>
          <div className={classes.rowStyle}>
            <div className={classes.keyStyle}>
              Category
            </div>
            <div className={classes.valueStyle}>
              {licenseCategory}
            </div>
          </div>
          <div className={classes.rowStyle}>
            <div className={classes.keyStyle}>
              Expiry
            </div>
            <div className={classes.valueStyle}>
              {expiry}
            </div>
          </div>
        </div>
      </components.Option>
  );
};



/////////////// Styles /////////////
const styles = (theme: Theme) => createStyles({
  rowRoot: {
    borderRadius: BorderRadius,
    // backgroundColor: isThemeDark(theme)
    //   ? Colors.uniswapDarkNavy
    //   : Colors.slateGreyDark,
    // padding: '0.25rem',
  },
  rowStyle: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "row" as 'row',
  },
  keyStyle: {
    fontWeight: 600,
    minWidth: 120,
  },
  valueStyle: {
    minWidth: 100,
  },
});

export default withStyles(styles)( OptionLicense );







