import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// media query
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Colors } from "layout/AppTheme";


const UserMenuMobileDither = (props: UserMenuMobileDitherProps) => {

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const smDown = useMediaQuery(theme.breakpoints.down('md'));
  const lgDown = useMediaQuery(theme.breakpoints.down('xl'));

  if (lgDown) {
    return (
      <div
        className={clsx(
          props.classes.mobileMenuDitherRoot,
          props.className,
          'fadeInFast'
        )}
        onClick={() => props.setMobileMenuOpen(s => false)}
      >
      </div>
    )
  } else {
    return <div className={props.className}/>
  }
}

interface UserMenuMobileDitherProps extends WithStyles<typeof styles> {
  className?: any;
  setMobileMenuOpen(f: (s: boolean) => boolean): void;
}

const styles = (theme: Theme) => createStyles({
  mobileMenuDitherRoot: {
    height: '100vh',
    width: '100vw',
    zIndex: 3, // above watchlist button which has zIndex: 1
    // 3: above email inputs
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: Colors.modalBackground,
    // backgroundColor: "rgba(47, 57, 65, .85)",
  },
});

export default withStyles(styles)(UserMenuMobileDither);
