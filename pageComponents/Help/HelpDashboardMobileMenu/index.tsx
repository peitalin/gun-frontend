import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
// Components
import HelpDropdownMenu from "./HelpDropdownMenu";



const HelpDashboardMobileMenu: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <HelpDropdownMenu />
  );
};



interface ReactProps extends WithStyles<typeof styles> {
}

export default withStyles(styles)( HelpDashboardMobileMenu );
