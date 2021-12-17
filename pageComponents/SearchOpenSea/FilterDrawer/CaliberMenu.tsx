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



const CaliberMenu: React.FC<ReactProps> = (props) => {

  const {
    classes,
    calibers,
  } = props

  const { data } = useQuery<QData3, QVar3>(
    GET_CALIBERS, {
  })

  // let caliberData = data?.getCalibers
  let caliberData = defaultCalibersInsertInput

  const caliberOptionGroups = React.useMemo(() => {
    return createCaliberOptionGroups(caliberData)
  }, [caliberData])

  const initialCalibers = (calibers ?? []).map(c => {
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
            props.setCalibers([])
            return
          } else {
            props.setCalibers(options)
          }
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

  // let rimfire = calibers.filter(c => {
  //   return c.group === CaliberGroup.RIMFIRE_CENTERFIRE
  // }).map(c => createCaliberOption(c))
  //   .sort((a, b) => compareAlphabetical(a.value, b.value))

  // let projectile = calibers.filter(c => {
  //   return c.group === CaliberGroup.PROJECTILE
  // }).map(c => createCaliberOption(c))
  //   .sort((a, b) => compareAlphabetical(a.value, b.value))

  // let shotshell = calibers.filter(c => {
  //   return c.group === CaliberGroup.SHOTSHELL
  // }).map(c => createCaliberOption(c))
  //   .sort((a, b) => compareAlphabetical(a.value, b.value))

  return [
    {
      label: "Calibers",
      options: allCalibers,
    },

    /// ONLY if you want caliber groups
    // {
    //   label: "Rimfire / Centerfire",
    //   options: rimfire,
    //   // options: allCalibersOption
    //   //   ? [
    //   //       { label: "All Calibers", value: undefined },
    //   //       ...rimfire,
    //   //     ]
    //   //   : [ ...rimfire ]
    //     // All calibers only for filtering search, not for creating products
    // },
    // {
    //   label: "Projectile",
    //   options: [
    //     ...projectile,
    //   ],
    // },
    // {
    //   label: "Shotshell",
    //   options: [
    //     ...shotshell,
    //   ],
    // },
  ]
}


export interface GroupedSelectOption {
  label: string;
  options: SelectOptionCaliber[]
}


interface ReactProps extends WithStyles<typeof styles> {
  calibers?: SelectOptionCaliber[];
  setCalibers(c: SelectOptionCaliber[]): void;
  style?: any
}

interface QData3 {
  getCalibers: Calibers[];
}
interface QVar3 {
}


export default withStyles(styles)( CaliberMenu );
