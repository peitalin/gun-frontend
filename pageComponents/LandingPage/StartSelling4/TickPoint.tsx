import React from "react";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles";
import { Colors, BoxShadows } from "layout/AppTheme";
// components
import Typography from "@material-ui/core/Typography";
import Tick from "components/Icons/Tick";


const TickPoint = ({ text, classes, isDarkMode }) => {
  return (
    <div className={classes.flexRow}>
      <Tick
        className={classes.tick}
        size={32}
        color={Colors.cream}
        outerCircleColor={
          isDarkMode ? Colors.uniswapNavy : Colors.cream
        }
        innerCircleColor={
          isDarkMode ? Colors.purple : Colors.blue
        }
      />
      <Typography className={classes.tickPointText}>
        {text}
      </Typography>
    </div>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  isDarkMode: boolean
}

export const styles = (theme: Theme) => createStyles({
  flexRow:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tickPointText: {
    fontWeight: 500,
    fontSize: '1.125rem',
    marginLeft: '0.5rem',
    marginTop: "0.25rem",
    marginBottom: "0.25rem",
    color: theme.palette.type === 'dark'
      ? `${Colors.uniswapLightestGrey}`
      : `${Colors.slateGreyBlack}`,
  },
  tick: {
  },
})

export default withStyles(styles)(TickPoint);
