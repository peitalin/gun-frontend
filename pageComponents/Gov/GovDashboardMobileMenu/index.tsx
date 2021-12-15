import React from "react";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import { styles } from "./styles";
// Components
import GovDropdownMenu from "./GovDropdownMenu";



const GovDashboardMobileMenu: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <GovDropdownMenu />
  );
};



interface ReactProps extends WithStyles<typeof styles> {
}

export default withStyles(styles)( GovDashboardMobileMenu );
