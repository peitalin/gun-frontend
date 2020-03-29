import * as React from "react";
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
        <h2>GM</h2>
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
    width: 64,
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
