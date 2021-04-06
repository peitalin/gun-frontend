import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, BorderRadius2x, BoxShadows } from "layout/AppTheme";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const ResponsivePadding: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ErrorBounds className={clsx(
      classes.root,
      smDown ? classes.paddingMobile : classes.paddingDesktop,
      "fadeInFast",
      props.className,
    )} style={props.style}>
      {props.children}
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  className?: any;
  style?: any;
}


export const styles = (theme: Theme) => createStyles({
  root: {
    // borderRadius: `${BorderRadius}px`,
    // border: '1px solid #eaeaea',
    // backgroundColor: Colors.foregroundColor,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingDesktop: {
    // padding: '0rem 1rem 2rem 1rem',
    marginRight: '0.5rem',
    marginLeft: '0.5rem',
  },
  paddingMobile: {
    padding: '0rem 0.5rem 0.5rem 0.5rem',
    marginTop: '3rem', // 3rem for seller dashboard menu bar
  },
});



export default withStyles(styles)(ResponsivePadding)