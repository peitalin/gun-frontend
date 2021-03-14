import React from "react";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import { UserPrivate } from "typings/gqlTypes";
// Components
import DealerDropdownMenu from "./DealerDropdownMenu";



const DealerDashboardMobileMenu: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <DealerDropdownMenu />
  );
};



interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate;
}

export default withStyles(styles)( DealerDashboardMobileMenu );
