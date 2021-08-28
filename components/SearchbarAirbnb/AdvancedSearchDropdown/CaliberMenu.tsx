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


let defaultCalibersInsertInput = [
  {'id': 'caliber_000000', 'name': '.17', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000003', 'name': '.204', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000004', 'name': '.219', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000005', 'name': '.22', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000013', 'name': '.220', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000014', 'name': '.222', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000015', 'name': '.22-250', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000016', 'name': '.223', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000017', 'name': '.243', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000018', 'name': '.25-06', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000019', 'name': '.256', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000020', 'name': '.257', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000021', 'name': '.260', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000022', 'name': '.264', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000023', 'name': '.270', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000024', 'name': '.280', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000026', 'name': '.300', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000032', 'name': '.30-06', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000033', 'name': '.303', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000034', 'name': '.30-30', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000035', 'name': '.308', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000036', 'name': '.31', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000037', 'name': '.32', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000038', 'name': '.325', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000039', 'name': '.338', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000041', 'name': '.35', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000042', 'name': '.350', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000043', 'name': '.357', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000044', 'name': '.36', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000045', 'name': '.375', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000047', 'name': '.38', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000049', 'name': '.380', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000050', 'name': '.40', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000051', 'name': '.408', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000052', 'name': '.416', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000054', 'name': '.44', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000058', 'name': '.444', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000059', 'name': '.44-40', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000060', 'name': '.45', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000063', 'name': '.450', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000065', 'name': '.454', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000066', 'name': '.45-70', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000067', 'name': '.458', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000069', 'name': '.460', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000070', 'name': '.480', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000071', 'name': '.50', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000072', 'name': '.500', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000074', 'name': '.54', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000075', 'name': '.58', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000076', 'name': '.69', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000077', 'name': '26 NOSLER', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000078', 'name': '5.56x45', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000079', 'name': '5mm', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000080', 'name': '6.5', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000081', 'name': '6.5', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000082', 'name': '6.5-284', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000083', 'name': '6.5-300', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000084', 'name': '6.5mm', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000085', 'name': '6.5x47', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000086', 'name': '6.5x50', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000087', 'name': '6.5x55', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000088', 'name': '6.5x68', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000089', 'name': '6mm', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000090', 'name': '6mm', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000091', 'name': '7.5x55', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000092', 'name': '7.62x39', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000093', 'name': '7.62x51', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000094', 'name': '7.62x54', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000095', 'name': '7.63x25', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000096', 'name': '7.65x53', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000097', 'name': '7.92x57', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000098', 'name': '7mm', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000099', 'name': '7mm-08', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000100', 'name': '7x57', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000101', 'name': '8mm', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000102', 'name': '8x57', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000103', 'name': '9.3x62', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000104', 'name': '9mm', 'group': 'RIMFIRE_CENTERFIRE'},
  {'id': 'caliber_000105', 'name': '.410', 'group': 'SHOTSHELL'},
  {'id': 'caliber_000106', 'name': '28 GAUGE', 'group': 'SHOTSHELL'},
  {'id': 'caliber_000107', 'name': '20 GAUGE', 'group': 'SHOTSHELL'},
  {'id': 'caliber_000108', 'name': '16 GAUGE', 'group': 'SHOTSHELL'},
  {'id': 'caliber_000109', 'name': '12 GAUGE', 'group': 'SHOTSHELL'},
  {'id': 'caliber_000110', 'name': '10 GAUGE', 'group': 'SHOTSHELL'},
  {'id': 'caliber_000111', 'name': '.177 CAL', 'group': 'PROJECTILE'},
  {'id': 'caliber_000112', 'name': '.20 CAL', 'group': 'PROJECTILE'},
  {'id': 'caliber_000113', 'name': '.22 CAL', 'group': 'PROJECTILE'},
  {'id': 'caliber_000114', 'name': '.25 CAL', 'group': 'PROJECTILE'},
  {'id': 'caliber_000115', 'name': '.257 CAL', 'group': 'PROJECTILE'},
  {'id': 'caliber_000116', 'name': '.30 CAL', 'group': 'PROJECTILE'},
  {'id': 'caliber_000117', 'name': '.357 CAL', 'group': 'PROJECTILE'},
  {'id': 'caliber_000118', 'name': '.45 CAL', 'group': 'PROJECTILE'},
  {'id': 'caliber_000119', 'name': '.50 CAL', 'group': 'PROJECTILE'}
]


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


  const caliberOptionGroups = createCaliberOptionGroups(caliberData)
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
