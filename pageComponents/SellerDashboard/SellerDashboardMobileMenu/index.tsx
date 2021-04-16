import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import { StorePrivate } from "typings/gqlTypes";
// Components
import SellerDropdownMenu from "./SellerDropdownMenu";



const SellerDashboardMobileMenu: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <SellerDropdownMenu />
  );
};



interface ReactProps extends WithStyles<typeof styles> {
  storePrivate: StorePrivate;
}

export default withStyles(styles)( SellerDashboardMobileMenu );
