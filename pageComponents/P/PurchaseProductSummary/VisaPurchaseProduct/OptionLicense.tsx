
import React from 'react';
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, Gradients, isThemeDark } from "layout/AppTheme";
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
    <>
      <components.Option {...props}>
        <div>
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
    </>
  );
};



/////////////// Styles /////////////
const styles = (theme: Theme) => createStyles({
  rowStyle: {
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







