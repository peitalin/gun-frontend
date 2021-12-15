import React from "react";
// Styles
import clsx from "clsx";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
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
