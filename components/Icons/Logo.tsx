import React from "react";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import DownloadIcon from "./DownloadIcon";
import Typography from "@material-ui/core/Typography";



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
      <svg width="200px" height="60px" viewBox="0 0 200 60">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" fontFamily="Helvetica" fontSize="36px" fontWeight="normal">
          <text id="marketplace" fill="#4A90E2">
            <tspan x="-2" y="50">marketplace</tspan>
          </text>
          <text id="gun" fill="#191919">
            <tspan x="-1" y="20">gun</tspan>
          </text>
        </g>
      </svg>
      </div>
      <Typography variant="caption"
        style={{ color: colour }}
        className={classes.tagline}
      >
      {
        !hideTitle &&
        <span>Download anything,
          <span className={classes.highlight}>instantly.</span>
        </span>
      }
      </Typography>
    </div>
  )
}

interface LogoProps extends WithStyles<typeof styles> {
  color?: string;
  hideTitle?: boolean;
  disableLogo?: boolean;
}

const styles = (theme: Theme) => createStyles({
  logoContainer: {
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 32,
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
