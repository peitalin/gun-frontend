import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius, Colors, isThemeDark, BorderRadius3x } from "layout/AppTheme";
// Router
import Link from "next/link";
// Material UI
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import LaunchIcon from '@material-ui/icons/Launch';



const StateChip = (props: ReactProps) => {

  const {
    classes,
    state,
  } = props;

  const theme = useTheme();

  if (!state) {
    return <div className={classes.stateLink}></div>
  }

  return (
    <div className={clsx(classes.stateLink, props.className)}
      style={props.style}
    >
      <div className={clsx(
        classes.stateType,
        classes.stateTypeColor,
      )}>
        {state ?? ""}
      </div>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  state: string
  className?: any;
  style?: any;
}


const styles = (theme: Theme) => createStyles({
  stateLink: {
    marginTop: '0.5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stateType: {
    padding: "0.25rem 0.75rem",
    width: '100%',
    color: Colors.black,
    "& > a > svg": {
      fill: Colors.black,
    },
    // "&:hover > a > svg": {
    //   fill: Colors.ultramarineBlue,
    // },
    // "&:hover": {
    //   color: Colors.ultramarineBlue,
    // },
    transition:  theme.transitions.create(['color', 'fill'], {
      easing: theme.transitions.easing.easeInOut,
      duration: 200,
    }),
    // cursor: "pointer",
    fontSize: "0.8rem",
    borderRadius: BorderRadius,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 600,
  },
  stateTypeColor: {
    background: isThemeDark(theme)
      ? Colors.uniswapNavy
      : Colors.slateGreyDarker,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.black,
    width: 60,
  },
});



export default withStyles(styles)(StateChip)