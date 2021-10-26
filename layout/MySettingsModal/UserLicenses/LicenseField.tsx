import React from 'react';
// Styles
import {
  Colors,
  isThemeDark,
  Gradients,
  BorderRadius,
  BorderRadius2x,
  BorderRadius4x,
  BoxShadows,
} from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
// typings
// import { } from "typings/gqlTypes";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";





const LicenseField = (props: ReactProps) => {

  const {
    classes,
    heading,
    value
  } = props

  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className={
      mdDown ? classes.licenseItemMobile : classes.licenseItemDesktop
    }>
      <span className={classes.boldText}>{heading}</span>
      <span className={classes.italicText}>
        {value}
      </span>
    </div>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  heading: React.ReactNode
  value: React.ReactNode
}



const styles = (theme: Theme) => createStyles({
  licenseItemDesktop: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minWidth: 100,
    marginRight: '0.5rem',
  },
  licenseItemMobile: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    minWidth: 80,
    marginRight: '0.5rem',
    justifyContent: "space-between",
  },
  boldText: {
    fontWeight: 600,
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyBlack,
  },
  italicText: {
    fontStyle: 'italic',
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
  },
  defaultLicense: {
    position: "absolute",
    bottom: '0rem',
    right: '1rem',
    fontSize: "0.8rem",
    color: isThemeDark(theme)
      ? `${Colors.purple}`
      : `${Colors.ultramarineBlue}`,
  },
});


export default withStyles(styles)( LicenseField );
