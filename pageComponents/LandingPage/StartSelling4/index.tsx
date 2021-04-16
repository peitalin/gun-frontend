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
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";

import StartSelling4Desktop from "./StartSelling4Desktop";
import StartSelling4Mobile from "./StartSelling4Mobile";



const StartSelling4 = (props: ReactProps) => {

  const { classes } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <ShowOnMobileOrDesktopSSR desktop>
        <StartSelling4Desktop
          isDarkMode={props.isDarkMode}
        />
      </ShowOnMobileOrDesktopSSR>
      <ShowOnMobileOrDesktopSSR mobile>
        <StartSelling4Mobile
          isDarkMode={props.isDarkMode}
        />
      </ShowOnMobileOrDesktopSSR>
    </>
  );
};


interface ReactProps extends WithStyles<typeof styles> {
  isDarkMode: boolean
}

export const styles = (theme: Theme) => createStyles({
})

export default withStyles(styles)(StartSelling4);
