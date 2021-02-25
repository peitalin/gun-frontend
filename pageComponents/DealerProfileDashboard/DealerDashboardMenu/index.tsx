import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import { StorePrivate } from "typings/gqlTypes";
// MUI
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown"
import Hidden from "@material-ui/core/Hidden";
// hooks
import Link from "next/link";
// Components
import DealerDropdownMenu from "./DealerDropdownMenu";



const DealerDashboardMenu: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <DealerDropdownMenu />
  );
};



interface ReactProps extends WithStyles<typeof styles> {
  storePrivate: StorePrivate;
}

export default withStyles(styles)( DealerDashboardMenu );
