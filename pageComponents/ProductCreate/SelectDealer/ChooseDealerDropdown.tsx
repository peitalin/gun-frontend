import React from "react";
import { Theme } from "@mui/material/styles";
import createStyles from '@mui/styles/createStyles';
import { Colors, isThemeDark } from "layout/AppTheme";
// Typings
import { Dealers, DealerState } from "typings/gqlTypes";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
// Select Component
import DropdownInput from "components/Fields/DropdownInput";
// Util components
import ValidationErrorMsg from "components/Fields/ValidationErrorMsg";
import { FormikProps } from 'formik';



const ChooseDealerDropdown = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    defaultExpanded = false,
    ...fprops
  } = props;

  const setDealerId = (newCat: DealerOption) => {
    fprops.setFieldValue("dealerId", newCat?.value?.dealerId)
    /// location is ununsed field
    // fprops.setFieldValue("location", newCat?.value?.dealerState)
  }

  let dealerOptions = createDealerSuggestions(props.dealers)
  // initial initialState
  let initialDealer = createDealerOption(
    (props.dealers ?? []).find(d => d.id === fprops.values?.dealerId)
  )

  // console.log("dealerOptions: ", dealerOptions)
  // console.log("initialDealer: ", initialDealer)
  // console.log("fprops.values.dealerId: ", fprops.values?.dealerId)

  return (
    <>
      <DropdownInput
        className={classes.dealerDropdown}
        initialState={initialDealer}
        disableAutocomplete={true}
        isClearable={true}
        menuPortalTarget={document?.body} // solves z-index problems
        onChange={(option: DealerOption) =>
          setDealerId({
            label: option?.label,
            value: option?.value,
          })
        }
        options={dealerOptions}
        placeholder={initialDealer?.label ?? "Select a dealer"}
      />

      <div className={classes.errorMsgContainer}>
        <ValidationErrorMsg
          touched={fprops.touched.dealerId}
          focused={false}
          errorMessage={fprops.errors.dealerId}
          disableInitialValidationMessage={false}
          style={{
            top: '-0.75rem',
            right: '0.25rem',
          }}
        />
      </div>

    </>
  )
}


const createDealerSuggestions = (dealers: Dealers[]): GroupedSelectOption[] => {

  if (!dealers) {
    return []
  }

  // return dealers.map(dealer => createDealerOption(dealer))


  // 8 states
  let ACTdealers = dealers.filter(d => d.state === DealerState.ACT)
  let NSWdealers = dealers.filter(d => d.state === DealerState.NSW)
  let NTdealers = dealers.filter(d => d.state === DealerState.NT)
  let QLDdealers = dealers.filter(d => d.state === DealerState.QLD)
  let SAdealers = dealers.filter(d => d.state === DealerState.SA)
  let TASdealers = dealers.filter(d => d.state === DealerState.TAS)
  let VICdealers = dealers.filter(d => d.state === DealerState.VIC)
  let WAdealers = dealers.filter(d => d.state === DealerState.WA)


  return [
    {
      label: "ACT",
      options: [
        ...ACTdealers.map(d => createDealerOption(d))
      ],
    },
    {
      label: "NSW",
      options: [
        ...NSWdealers.map(d => createDealerOption(d))
      ],
    },
    {
      label: "NT",
      options: [
        ...NTdealers.map(d => createDealerOption(d))
      ],
    },
    {
      label: "QLD",
      options: [
        ...QLDdealers.map(d => createDealerOption(d))
      ],
    },
    {
      label: "SA",
      options: [
        ...SAdealers.map(d => createDealerOption(d))
      ],
    },
    {
      label: "TAS",
      options: [
        ...TASdealers.map(d => createDealerOption(d))
      ],
    },
    {
      label: "VIC",
      options: [
        ...VICdealers.map(d => createDealerOption(d))
      ],
    },
    {
      label: "WA",
      options: [
        ...WAdealers.map(d => createDealerOption(d))
      ],
    },
  ]
}



const createDealerOption = (dealer: Dealers): DealerOption => {
  if (!dealer) {
    return undefined
  } else {
    return {
      label: `${dealer?.name}, ${dealer?.postCode} #${dealer?.licenseNumber}`,
      value: {
        dealerId: dealer?.id,
        dealerState: dealer?.state
      },
    }
  }
}

// export interface SelectOption {
//   label: string;
//   value: string | any;
// }
interface DealerOption {
  label: string
  value: {
    dealerId: string
    dealerState: string
  }
}
export interface GroupedSelectOption {
  label: string;
  options: DealerOption[]
}


interface ReactProps extends WithStyles<typeof styles> {
  defaultExpanded?: boolean
  dealers: Dealers[]
}
interface FormikFields {
  dealerId?: string;
  // location?: string;
  // dealer?: {
  //   name?: string;
  //   address?: string;
  //   city?: string;
  //   state?: string;
  //   postCode?: string;
  //   licenseNumber?: string;
  // };
}


export const styles = (theme: Theme) => createStyles({
  errorMsgContainer: {
    position: 'relative',
    width: '100%',
    marginTop: '0.5rem',
  },
  dealerDropdown: {
    flexGrow: 1,
    minWidth: 200,
    // marginRight: '1rem',
    // marginLeft: '1rem',
    marginBottom: '0.5rem',
  },
  stateLocation: {
    fontSize: "1rem",
    fontWeight: 500,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,

  },
})

export default withStyles(styles)( ChooseDealerDropdown );








