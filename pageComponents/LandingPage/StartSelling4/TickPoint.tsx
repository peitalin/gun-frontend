import React from "react";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BoxShadows } from "layout/AppTheme";
// components
import Typography from "@mui/material/Typography";
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
    color: theme.palette.mode === 'dark'
      ? `${Colors.uniswapLightestGrey}`
      : `${Colors.slateGreyBlack}`,
  },
  tick: {
  },
})

export default withStyles(styles)(TickPoint);
