
import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";


const IconButtonCancel: React.FC<ReactProps> = (props) => {

  const {
    classes,
    position = "right",
    dark = false,
  } = props;

  return (
    <IconButton
      onClick={props.onClick}
      className={
        position == "right"
          ? classes.clearButtonRight
          : classes.clearButtonLeft
      }
      classes={{
        root: dark
          ? classes.iconButtonRootDark
          : classes.iconButtonRoot
      }}
    >
      <ClearIcon classes={{
        root: dark
          ? classes.iconButtonSvgDark
          : classes.iconButtonSvg
      }}/>
    </IconButton>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  onClick?(a: any): void;
  position?: "left" | "right";
  dark?: boolean;
}

const styles = (theme: Theme) => createStyles({
  iconButtonRoot: {
    "&:hover": {
      backgroundColor: "rgba(210, 210, 210, 0.24)",
    }
  },
  iconButtonRootDark: {
    "&:hover": {
      backgroundColor: "rgba(25, 25, 25, 0.24)",
    }
  },
  iconButtonSvg: {
    fill: Colors.slateGreyLightBlack,
    height: '1.5rem',
    width: '1.5rem',
  },
  iconButtonSvgDark: {
    fill: Colors.uniswapLighterGrey,
    height: '1.5rem',
    width: '1.5rem',
  },
  clearButtonRight: {
    // position: "absolute",
    // right: "1rem",
    padding: '6px',
  },
  clearButtonLeft: {
    position: "absolute",
    left: "1rem",
    padding: '6px',
  },
});


export default withStyles(styles)( IconButtonCancel );
