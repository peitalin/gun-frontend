import React from "react";
import { createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { Dealers } from "typings/gqlTypes";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
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

  const setDealerId = (newCat: SelectOption) => {
    fprops.setFieldValue("dealerId", newCat?.value)
    // if (!!newCat?.value) {
    //   fprops.setFieldValue("dealerId", newCat?.value)
    // } else {
    // }
  }

  let dealerOptions = createDealerSuggestions(props.dealers)
  // initial stateShape
  let initialDealer = undefined

  // console.log("dealerOptions: ", dealerOptions)
  // console.log("initialDealer: ", initialDealer)

  return (
    <>
      <DropdownInput
        className={classes.dealerDropdown}
        stateShape={initialDealer}
        disableAutocomplete={true}
        menuPortalTarget={document?.body} // solves z-index problems
        onChange={(option: SelectOption) =>
          setDealerId({
            label: option?.label,
            value: option?.value,
          })
        }
        options={dealerOptions}
        placeholder={initialDealer?.label}
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
  let ACTdealers = dealers.filter(d => d.state === "ACT")
  let NSWdealers = dealers.filter(d => d.state === "NSW")
  let NTdealers = dealers.filter(d => d.state === "NT")
  let QLDdealers = dealers.filter(d => d.state === "QLD")
  let SAdealers = dealers.filter(d => d.state === "SA")
  let TASdealers = dealers.filter(d => d.state === "TAS")
  let VICdealers = dealers.filter(d => d.state === "VIC")
  let WAdealers = dealers.filter(d => d.state === "WA")


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


const createDealerOption = (dealer: Dealers) => {
  return {
    label: `${dealer.name}, ${dealer.postCode} #${dealer.licenseNumber}`,
    value: dealer.id,
  }
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
  defaultExpanded?: boolean
  dealers: Dealers[]
}
interface FormikFields {
  dealerId?: string;
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
  dontSeeDealerLink: {
    color: Colors.uniswapLighterGrey,
    "&:hover": {
      cursor: "pointer",
      color: Colors.gradientUniswapBlue1,
    }
  },
})

export default withStyles(styles)( ChooseDealerDropdown );








