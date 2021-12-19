import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import {
  Colors,
  isThemeDark,
} from "layout/AppTheme";
import { styles } from "./styles";
import CaliberDropdown from "components/Fields/CaliberDropdown";
import {
  Calibers,
  CaliberGroup,
} from "typings/gqlTypes";
// gql
import { GET_CALIBERS } from "queries/calibers-queries";
import { useQuery } from "@apollo/client";
import { SelectOptionCaliber } from "typings"
import { defaultCalibersInsertInput } from "utils/calibers";
import { sortAlphabetical, compareAlphabetical } from "utils/strings"



const CaliberOmitMenu: React.FC<ReactProps> = (props) => {

  const {
    classes,
    calibersOmit,
  } = props

  // const { data } = useQuery<QData3, QVar3>(
  //   GET_CALIBERS, {
  // })

  let caliberData = defaultCalibersInsertInput

  const caliberOptionGroups = React.useMemo(() => {
    return createCaliberOptionGroups(caliberData)
  }, [caliberData])

  const initialCalibers = (calibersOmit ?? []).map(c => {
    return {
      label: c.label,
      value: c.value,
      synonyms: c.synonyms
    }
  })

  return (
    <div className={clsx(classes.innerColumn, classes.innerColumnFlexCol)}
      style={props.style}
    >
      <CaliberDropdown
        // className={classes.caliberDropdown}
        state={calibersOmit}
        menuIsOpen={true}
        menuPlacement={"bottom"} // bottom | top | auto
        isMulti={true}
        initialState={initialCalibers}
        itemLimit={8}
        height={'100%'}
        onChange={(options: SelectOptionCaliber[]) => {
          console.log("options:", options)
          if (options?.length === 0) {
            // null -> All states
            props.setCalibersOmit([])
            return
          } else {
            props.setCalibersOmit(options)
          }

          // if (options.some(o => props.calibers.find(c => c.value === o.value))) {
          //   // find if added calibersOmit are in calibers list, and
          //   // remove them from calibers list
          // }
          let newCalibers = props.calibers.filter(c => !options?.find(o => o.value === c.value))
          props.setCalibers(newCalibers)
        }}
        options={caliberOptionGroups}
        placeholder={undefined}
      />
    </div>
  );
};


interface CaliberSynonyms {
  synonyms?: string[]
}


export const createCaliberOption = (
  c: Calibers & CaliberSynonyms
): SelectOptionCaliber => {
  return {
    label: c.name,
    // value should be string so Selectable knows which options are picked
    // and can be taken out of the selectable menu
    value: c.name,
    // synonyms are a list of like-terms to send to meilie for filtering
    synonyms: c.synonyms ? [c.name, ...c.synonyms] : [c.name],
  }
}


export const createCaliberOptionGroups = (
  calibers: Calibers[],
  allCalibersOption: boolean = true
): GroupedSelectOption[] => {
  if (!calibers) {
    return []
  }

  let allCalibers = calibers
    .map(c => createCaliberOption(c))
    .sort((a, b) => compareAlphabetical(a.value, b.value))

  return [
    {
      label: "Calibers",
      options: allCalibers,
    },
  ]
}


export interface GroupedSelectOption {
  label: string;
  options: SelectOptionCaliber[]
}


interface ReactProps extends WithStyles<typeof styles> {
  calibersOmit?: SelectOptionCaliber[];
  setCalibersOmit(c: SelectOptionCaliber[]): void;
  calibers?: SelectOptionCaliber[];
  setCalibers(c: SelectOptionCaliber[]): void;
  style?: any
}

interface QData3 {
  getCalibers: Calibers[];
}
interface QVar3 {
}


export default withStyles(styles)( CaliberOmitMenu );
