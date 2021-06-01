import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import {
  Colors,
  isThemeDark,
} from "layout/AppTheme";
import { styles } from "./styles";
import DropdownInput from "components/Fields/DropdownInput";
import {
  Calibers,
  CaliberGroup,
} from "typings/gqlTypes";
// gql
import { GET_CALIBERS } from "queries/calibers-queries";
import { useQuery } from "@apollo/client";



const CaliberMenu: React.FC<ReactProps> = (props) => {

  const {
    classes,
    calibers,
  } = props

  const { data } = useQuery<QData3, QVar3>(
    GET_CALIBERS, {
  })

  const caliberOptionGroups = createCaliberOptionGroups(data?.getCalibers)
  const initialCaliber = {
    label: calibers?.[0],
    value: calibers?.[0],
  }

  return (
    <div className={clsx(classes.innerColumn, classes.innerColumnFlexCol)}>
      <DropdownInput
        // className={classes.dealerDropdown}
        menuIsOpen={true}
        initialState={initialCaliber}
        onChange={(option: SelectOption) => {
          if (!option.value) {
            // null -> All states
            props.setCalibers([])
          } else {
            props.setCalibers([option.value])
          }
        }}
        options={caliberOptionGroups}
        placeholder={initialCaliber}
      />
    </div>
  );
};


export const createCaliberOption = (c: Calibers): SelectOption => {
  return {
    label: c.name,
    value: c.name,
  }
}

export const createCaliberOptionGroups = (
  calibers: Calibers[],
  allCalibersOption: boolean = true
): GroupedSelectOption[] => {
  if (!calibers) {
    return []
  }

  let rimfire = calibers.filter(c => {
    return c.group === CaliberGroup.RIMFIRE_CENTERFIRE
  }).map(c => createCaliberOption(c))

  let projectile = calibers.filter(c => {
    return c.group === CaliberGroup.PROJECTILE
  }).map(c => createCaliberOption(c))

  let shotshell = calibers.filter(c => {
    return c.group === CaliberGroup.SHOTSHELL
  }).map(c => createCaliberOption(c))

  return [
    {
      label: "Rimfire / Centerfire",
      options: allCalibersOption
        ? [
            { label: "All Calibers", value: undefined },
            ...rimfire,
          ]
        : [ ...rimfire ]
        // All calibers only for filtering search, not for creating products
    },
    {
      label: "Projectile",
      options: [
        ...projectile,
      ],
    },
    {
      label: "Shotshell",
      options: [
        ...shotshell,
      ],
    },
  ]
}


export interface SelectOption {
  label: string;
  value: string | any;
}
export interface GroupedSelectOption {
  label: string;
  options: SelectOption[]
}


interface ReactProps extends WithStyles<typeof styles> {
  calibers?: string[];
  setCalibers(c: string[]): void;
}

interface QData3 {
  getCalibers: Calibers[];
}
interface QVar3 {
}


export default withStyles(styles)( CaliberMenu );
