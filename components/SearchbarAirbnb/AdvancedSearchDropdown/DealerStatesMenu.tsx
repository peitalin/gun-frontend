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
  DealerState,
} from "typings/gqlTypes";



const DealerStatesMenu: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  let dealerStatesDropdownItems = [
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

  console.log("props.dealerStates", props.dealerStates)

  return (
    <div className={clsx(classes.innerColumn, classes.innerColumnFlexRow)}>
      {
        dealerStatesDropdownItems.map((d, i) => {

          let isDisabled = d !== DealerState.QLD
                && d !== DealerState.ALL_STATES

          let allStates = d === DealerState.ALL_STATES
            && props.dealerStates?.length === 0

          return (
            <Button
              key={d + `${i}`}
              classes={{
                root: clsx(
                  classes.buttonRoot,
                  (props.dealerStates?.includes(d) || allStates)
                    && classes.buttonSelected,
                  !isDisabled && classes.activeButton,
                )
              }}
              disabled={isDisabled}
              variant="outlined"
              onClick={() => {
                console.log("setting: ", d)
                if (d === DealerState.ALL_STATES) {
                  props.setDealerStates([])
                } else {
                  props.setDealerStates([d])
                }
              }}
            >
              {DealerStatesLabels[d]}
            </Button>
          )
        })
      }
    </div>
  );
};


const DealerStatesLabels = {
  [DealerState.ALL_STATES]: "All States",
  [DealerState.ACT]: "ACT",
  [DealerState.NSW]: "NSW",
  [DealerState.NT]: "NT",
  [DealerState.QLD]: "QLD",
  [DealerState.SA]: "SA",
  [DealerState.TAS]: "TAS",
  [DealerState.VIC]: "VIC",
  [DealerState.WA]: "WS",
}


interface ReactProps extends WithStyles<typeof styles> {
  dealerStates?: DealerState[];
  setDealerStates(c: DealerState[]): void;
}


export default withStyles(styles)( DealerStatesMenu );
