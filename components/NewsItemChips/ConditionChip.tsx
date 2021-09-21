import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius, Colors, isThemeDark, BorderRadius3x } from "layout/AppTheme";
import { Condition } from "typings";
import { getConditionScore, getConditionText } from "typings/condition";



const ConditionChip = (props: ReactProps) => {

  const { classes, condition, style } = props;

  let conditionScore = getConditionScore(condition)
  let conditionText = getConditionText(condition)

  return (
    <div
      className={clsx(
        classes.conditionChip,
        conditionScore === Condition.PERFECT && classes.green,
        conditionScore === Condition.EXCELLENT && classes.green,
        conditionScore === Condition.VERY_GOOD && classes.green,
        conditionScore === Condition.GOOD && classes.yellow,
        conditionScore === Condition.FAIR && classes.orange,
        conditionScore === Condition.POOR && classes.red,
        conditionScore === Condition.NA && classes.lightRed,
      )}
      style={style}
    >
      {conditionText}
    </div>
  );
}

// new & perfect
// excellent & very good
// good
// fair
// poor



interface ReactProps extends WithStyles<typeof styles> {
  condition: string
  style?: any
}

const styles = (theme: Theme) => createStyles({
  conditionChip: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: "0.25rem 0.75rem",
    marginTop: '0.5rem',
    marginRight: '0.5rem',
    background: isThemeDark(theme)
      ? Colors.uniswapGrey
      : Colors.slateGreyDark,
    color: Colors.uniswapBlack,
    fontSize: "0.9rem",
    borderRadius: BorderRadius,
    fontWeight: 600,
    // background: isThemeDark(theme)
    //   ? Colors.uniswapNavy
    //   : Colors.slateGreyDarker,
    // color: isThemeDark(theme)
    //   ? Colors.uniswapLightGrey
    //   : Colors.black,
  },
  blue: {
    background: Colors.blue,
  },
  lightestGreen: {
    background: Colors.lightGreen,
  },
  green: {
    background: Colors.green,
  },
  yellow: {
    background: Colors.yellow,
  },
  orange: {
    background: Colors.orange,
  },
  red: {
    background: Colors.red,
  },
  lightRed: {
    background: Colors.lighterRed,
  },
});



export default withStyles(styles)(ConditionChip)