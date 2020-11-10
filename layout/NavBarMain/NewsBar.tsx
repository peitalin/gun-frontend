import React from "react";
import { oc as option } from "ts-optchain";
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
        <Hidden mdDown>
          {/* <BreadcrumbRoutes/> */}
          <div className={classes.newsBarInner}>
            {/* <Typography className={classes.newsBarHeadline} variant="caption">
              GatSwap
            </Typography> */}
          </div>
        </Hidden>
        <Hidden lgUp>
          <div className={classes.newsBarInner}>
            {/* <Typography className={classes.newsBarHeadline} variant="caption">
              GatSwap
            </Typography> */}
          </div>
        </Hidden>
      </div>
    </nav>
  );
};

type NewsBarProps = ReactProps;

interface ReactProps extends WithStyles<typeof styles> {
}



export default withStyles(styles)( NewsBar );
