import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { styles } from "./styles";
// MUI
import Typography from "@material-ui/core/Typography";
// import BreadcrumbRoutes from "../BreadcrumbRoutes";
import Hidden from "@material-ui/core/Hidden";



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
