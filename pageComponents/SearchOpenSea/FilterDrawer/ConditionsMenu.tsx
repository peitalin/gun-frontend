import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import {
  Colors,
  isThemeDark,
} from "layout/AppTheme";
import { styles } from "./styles";
// MUI
import Button from "@material-ui/core/Button";
import {
  Condition,
} from "typings/gqlTypes";
import Checkbox from '@material-ui/core/Checkbox';
import { ClassSharp } from "@material-ui/icons";




const ConditionsMenu: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const [hover, setHover] = React.useState(undefined)

  const onChange = (d: Condition) => {
    if (d === Condition.ALL_CONDITIONS) {
      props.setConditions([])
      return
    }
    if (props.conditions.includes(d)) {
      props.setConditions(props.conditions.filter(state => state !== d))
    } else {
      props.setConditions([...props.conditions, d])
    }
  }

  return (
    <div className={clsx(classes.innerColumn, classes.innerColumnFlexRow)}>
      {
        conditionsDropdownItems.map((d, i) => {

          let allConditions = d === Condition.ALL_CONDITIONS
            && props.conditions?.length === 0

          let checked = props.conditions.includes(d) || allConditions

          let highlight = hover === i

          return (
            <div key={d + `${i}`} className={classes.checkboxRow}>
              <Checkbox
                checked={checked}
                onChange={() => onChange(d)}
                classes={{
                  root: clsx(
                    classes.checkbox,
                    checked
                      ? classes.checkboxSelected
                      : null,
                    highlight && classes.hoverCheckbox,
                  )
                }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(undefined)}
              />
              <span
                className={highlight && classes.linkHover}
                onClick={() => onChange(d)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(undefined)}
              >
                {ConditionsLabels[d]}
              </span>
            </div>
          )
        })
      }
    </div>
  );
};

export const availableConditions = [
  Condition.PERFECT,
  Condition.EXCELLENT,
  Condition.VERY_GOOD,
  Condition.GOOD,
  Condition.FAIR,
  Condition.POOR,
  // Condition.NA,
  Condition.ALL_CONDITIONS,
]

export const ConditionsLabels = {
  [Condition.ALL_CONDITIONS]: "All Conditions",
  [Condition.PERFECT]: "Perfect",
  [Condition.EXCELLENT]: "Excellent",
  [Condition.VERY_GOOD]: "Very Good",
  [Condition.GOOD]: "Good",
  [Condition.FAIR]: "Fair",
  [Condition.POOR]: "Poor",
  [Condition.NA]: "NA",
}
export const conditionsDropdownItems = [
  Condition.PERFECT,
  Condition.EXCELLENT,
  Condition.VERY_GOOD,
  Condition.GOOD,
  Condition.FAIR,
  Condition.POOR,
  // Condition.NA,
  Condition.ALL_CONDITIONS,
]


interface ReactProps extends WithStyles<typeof styles> {
  conditions?: string[];
  setConditions(c: string[]): void;
}


export default withStyles(styles)( ConditionsMenu );
