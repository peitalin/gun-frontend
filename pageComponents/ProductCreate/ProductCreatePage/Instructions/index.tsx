import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme, useTheme } from "@material-ui/core/styles";
// MUI
import Typography from "@material-ui/core/Typography";
;
// Product Preview Page
import Tooltip from '@material-ui/core/Tooltip';
import ButtonLoading from 'components/ButtonLoading';
import { Colors, isThemeDark } from "layout/AppTheme";




const RenderInstructions = (props: ReactProps) => {

  const { classes, activeStep } = props;

  if (activeStep === 0) {
    return (
      <div className={classes.root}>
        <Typography className={classes.title}>
          Qld
        </Typography>
        <Typography className={classes.title}>
          Category A
        </Typography>
        <Typography className={classes.subtitle}>
          Rimfire rifles, single or double barrel shotguns, paintball guns, air rifles, and powerheads.
        </Typography>
        <Typography className={classes.title}>
          Category B
        </Typography>
        <Typography className={classes.subtitle}>
          Centre-fire rifles (other than semi-automatic), shotgun/rifle combinations.
          Lever action shotguns with a magazine capacity of no more than five rounds.
        </Typography>
        <Typography className={classes.title}>
          Category C
        </Typography>
        <Typography className={classes.subtitle}>
          Semi-automatic or pump action shotguns (under 6 rounds) and semi-automatic rimfire rifles (under 11 rounds).
        </Typography>
        <Typography className={classes.title}>
          Category D
        </Typography>
        <Typography className={classes.subtitle}>
          Semi-automatic centre-fire rifles, semi-automatic shotguns (over 5 rounds) and semi-automatic rimfire rifles (over 10 rounds).
          Lever action shotguns with a magazine capacity of more than five rounds.
        </Typography>
        <Typography className={classes.title}>
          Category H
        </Typography>
        <Typography className={classes.subtitle}>
          Handguns
        </Typography>
        <Typography className={classes.title}>
          Category M
        </Typography>
        <Typography className={classes.subtitle}>
          Crossbows, certain knives and other hand held items capable of causing bodily harm.
        </Typography>
      </div>
    )
  }

  if (activeStep === 1) {
    return (
      <div className={classes.root}>
        <Typography>
          Title, Serial Number, and Action Type
        </Typography>
      </div>
    )
  }
  if (activeStep === 2) {
    return (
      <div className={classes.root}>
        <Typography>
          Choose a transferring dealer
        </Typography>
      </div>
    )
  }
  if (activeStep === 3) {
    return (
      <div className={classes.root}>
        <Typography>
          Gun Attributes
        </Typography>
      </div>
    )
  }
  if (activeStep === 4) {
    return (
      <div className={classes.root}>
        <Typography>
          Condition
        </Typography>
      </div>
    )
  }
  if (activeStep === 5) {
    return (
      <div className={classes.root}>
        <Typography>
          Description
        </Typography>
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        <Typography>
          Other unhandled instructions
        </Typography>
      </div>
    )
  }

}

interface ReactProps extends WithStyles<typeof styles> {
  activeStep: number
}



const styles = (theme: Theme) => createStyles({
  root: {
    padding: '1rem',
  },
  title: {
    marginTop: "0.5rem",
    fontWeight: 600,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
  },
  subtitle: {
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
  },
})

export default withStyles(styles)(RenderInstructions);

