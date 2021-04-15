import React from "react";
import clsx from "clsx";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles";
import { Colors, BoxShadows } from "layout/AppTheme";
// Typings
import {} from "typings/gqlTypes";
// components
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "components/HiddenFix";

import StartSelling4Desktop from "./StartSelling4Desktop";
import StartSelling4Mobile from "./StartSelling4Mobile";



const StartSelling4 = (props: ReactProps) => {

  const { classes } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Hidden lgDown implementation="css" className={classes.startSelling4Root}>
        <StartSelling4Desktop
          isDarkMode={props.isDarkMode}
          />
      </Hidden>
      <Hidden xlUp implementation="css" className={classes.startSelling4Root}>
        <StartSelling4Mobile
          isDarkMode={props.isDarkMode}
        />
      </Hidden>
    </>
  );
};


interface ReactProps extends WithStyles<typeof styles> {
  isDarkMode: boolean
}

export const styles = (theme: Theme) => createStyles({
  startSelling4Root: {
    width: '100%',
  },
})

export default withStyles(styles)(StartSelling4);
