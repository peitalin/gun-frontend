import React from "react";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BoxShadows } from "layout/AppTheme";
// Typings
import {} from "typings/gqlTypes";
// components
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Hidden from "components/HiddenFix";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";

import StartSelling4Desktop from "./StartSelling4Desktop";
import StartSelling4Mobile from "./StartSelling4Mobile";



const StartSelling4 = (props: ReactProps) => {

  const { classes } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      <ShowOnMobileOrDesktopSSR desktop>
        <StartSelling4Desktop
          isDarkMode={props.isDarkMode}
          sectionType={props.sectionType}
        />
      </ShowOnMobileOrDesktopSSR>
      <ShowOnMobileOrDesktopSSR mobile>
        <StartSelling4Mobile
          isDarkMode={props.isDarkMode}
          sectionType={props.sectionType}
        />
      </ShowOnMobileOrDesktopSSR>
    </>
  );
};


interface ReactProps extends WithStyles<typeof styles> {
  isDarkMode: boolean
  sectionType: "notifications" | "orders"
}

export const styles = (theme: Theme) => createStyles({
})

export default withStyles(styles)(StartSelling4);
