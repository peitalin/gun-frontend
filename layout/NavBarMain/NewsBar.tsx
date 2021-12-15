import React from "react";
// Styles
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { styles } from "./styles";
// MUI
import Typography from "@mui/material/Typography";
// import BreadcrumbRoutes from "../BreadcrumbRoutes";
import Hidden from "@mui/material/Hidden";



const NewsBar = (props: NewsBarProps) => {

  const { classes } = props;

  return (
    <nav className={clsx(
      classes.baseBarDashboard,
      classes.newsBar,
    )}>
      <div className={classes.baseBarInnerDashboard}>
      </div>
    </nav>
  );
};

type NewsBarProps = ReactProps;

interface ReactProps extends WithStyles<typeof styles> {
}



export default withStyles(styles)( NewsBar );
