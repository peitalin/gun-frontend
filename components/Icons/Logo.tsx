import React from "react";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import DownloadIcon from "./DownloadIcon";
import Typography from "@material-ui/core/Typography";
import { Colors } from 'layout/AppTheme';



const Logo = (props: LogoProps) => {

  const colour = props.color || "#F2F2F2";
  const {
    classes,
    hideTitle = true,
    disableLogo = false,
  } = props;

  return (
    <div className={classes.logoContainer}>
      <div className={classes.logo}>
      <svg width="200px" height={logoHeight} viewBox={`0 0 200 ${logoHeight}`}>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" fontFamily="Helvetica" fontSize="36px" fontWeight="normal">
          <text id="marketplace" fill={Colors.gradientUniswapBlue1}>
            <tspan x="-2" y="50">Marketplace</tspan>
          </text>
          <text id="gun" fill={Colors.uniswapLightestGrey}>
            <tspan x="-1" y="15">Gun</tspan>
          </text>
        </g>
      </svg>
      </div>
    </div>
  )
}

interface LogoProps extends WithStyles<typeof styles> {
  color?: string;
  hideTitle?: boolean;
  disableLogo?: boolean;
}

const logoHeight = 40;

const styles = (theme: Theme) => createStyles({
  logoContainer: {
    display: "flex",
    height: logoHeight,
    flexDirection: "column",
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: logoHeight,
    width: 80,
  },
  logoText: {
    fontWeight: 300
  },
  tagline: {
    transform: "translateY(0.25rem)",
  },
  downloadIcon: {
  },
  highlight: {
    color: theme.palette.secondary.main,
  },
});

export default withStyles(styles)( Logo );
