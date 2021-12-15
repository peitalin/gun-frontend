import React from "react";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
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
