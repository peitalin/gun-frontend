import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";


const UserMenuMobileDither = (props: UserMenuMobileDitherProps) => {

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  if (smDown) {
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
    zIndex: 3, // above wishlist button which has zIndex: 1
    // 3: above email inputs
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: "rgba(47, 57, 65, .85)",
  },
});

export default withStyles(styles)(UserMenuMobileDither);
