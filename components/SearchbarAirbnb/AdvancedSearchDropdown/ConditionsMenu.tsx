import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
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



const ConditionsMenu: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;


  return (
    <div className={clsx(classes.innerColumn, classes.innerColumnFlexRow)}>
      {
        conditionsDropdownItems.map((d, i) => {

          // let isDisabled = !availableConditions.includes(d)

          let allStates = d === Condition.ALL_CONDITIONS
            && props.conditions?.length === 0

          return (
            <Button
              key={d + `${i}`}
              classes={{
                root: clsx(
                  classes.buttonRoot,
                  (props.conditions?.includes(d) || allStates)
                    && classes.buttonSelected,
                  // !isDisabled && classes.activeButton,
                )
              }}
              // disabled={isDisabled}
              variant="outlined"
              onClick={() => {
                console.log("setting: ", d)
                if (d === Condition.ALL_CONDITIONS) {
                  props.setConditions([])
                  return
                }

                if (props.conditions.includes(d)) {
                  props.setConditions(props.conditions.filter(state => state !== d))
                } else {
                  props.setConditions([...props.conditions, d])
                }
            }}
            >
              {ConditionsLabels[d]}
            </Button>
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
