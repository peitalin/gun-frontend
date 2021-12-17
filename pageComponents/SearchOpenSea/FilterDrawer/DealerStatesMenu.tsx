import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import {
  Colors,
  isThemeDark,
} from "layout/AppTheme";
import { styles } from "./styles";
// MUI
import Button from "@material-ui/core/Button";
import {
  DealerState,
} from "typings/gqlTypes";
import Checkbox from '@material-ui/core/Checkbox';



const DealerStatesMenu: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const [hover, setHover] = React.useState(undefined)

  const onChange = (d: DealerState) => {
    console.log("setting: ", d)
    if (d === DealerState.ALL_STATES) {
      props.setDealerStates([])
      return
    }

    if (props.dealerStates.includes(d)) {
      props.setDealerStates(props.dealerStates.filter(state => state !== d))
    } else {
      props.setDealerStates([...props.dealerStates, d])
    }
  }

  return (
    <div className={clsx(classes.innerColumn, classes.innerColumnFlexRow)}>
      {
        dealerStatesDropdownItems.map((d, i) => {

          // let isDisabled = !availableDealerStates.includes(d)

          let allStates = d === DealerState.ALL_STATES
            && props.dealerStates?.length === 0

          let checked = (props.dealerStates?.includes(d) || allStates)
          let highlight = hover === i

          return (
            <div key={d + `${i}`} className={classes.checkboxRow}>
              <Checkbox
                checked={checked}
                onChange={() => onChange(d)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(undefined)}
                classes={{
                  root: clsx(
                    classes.checkbox,
                    checked
                      ? classes.checkboxSelected
                      : null,
                    highlight && classes.hoverCheckbox,
                  ),
                }}
              />
              <span
                className={highlight && classes.linkHover}
                onClick={() => onChange(d)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(undefined)}
              >
                {DealerStatesLabels[d]}
              </span>
            </div>
          )
        })
      }
    </div>
  );
};

export const availableDealerStates = [
  DealerState.ALL_STATES,
  DealerState.ACT,
  DealerState.NSW,
  DealerState.NT,
  DealerState.QLD,
  DealerState.SA,
  DealerState.TAS,
  DealerState.VIC,
  DealerState.WA,
]

export const DealerStatesLabels = {
  [DealerState.ALL_STATES]: "All States",
  [DealerState.ACT]: "ACT",
  [DealerState.NSW]: "NSW",
  [DealerState.NT]: "NT",
  [DealerState.QLD]: "QLD",
  [DealerState.SA]: "SA",
  [DealerState.TAS]: "TAS",
  [DealerState.VIC]: "VIC",
  [DealerState.WA]: "WA",
}
export const dealerStatesDropdownItems = [
  DealerState.ACT,
  DealerState.NSW,
  DealerState.NT,
  DealerState.QLD,
  DealerState.SA,
  DealerState.TAS,
  DealerState.VIC,
  DealerState.WA,
  DealerState.ALL_STATES,
]


interface ReactProps extends WithStyles<typeof styles> {
  dealerStates?: DealerState[];
  setDealerStates(c: DealerState[]): void;
}


export default withStyles(styles)( DealerStatesMenu );
