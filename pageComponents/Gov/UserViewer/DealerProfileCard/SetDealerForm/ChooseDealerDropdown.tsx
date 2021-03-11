import React from "react";
import { createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { Dealers } from "typings/gqlTypes";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
// Formik
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
// Select Component
import DropdownInput from "components/Fields/DropdownInput";



const ChooseDealerDropdown = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    ...fprops
  } = props;

  const setDealerId = (newCat: SelectOption) => {
    if (!!newCat?.value) {
      fprops.setFieldValue("dealerId", newCat?.value)
    }
  }

  let dealerOptions = createDealerSuggestions(props.dealers)
  // initial stateShape
  let initialDealer = dealerOptions[0]

  // console.log("dealerOptions: ", dealerOptions)
  // console.log("initialDealer: ", initialDealer)

  return (
    <>
      <DropdownInput
        className={classes.dealerDropdown}
        stateShape={initialDealer}
        onChange={({ label, value }: SelectOption) =>
          setDealerId({ label, value })
        }
        options={dealerOptions}
        placeholder={initialDealer?.label}
      />
    </>
  )
}


const createDealerSuggestions = (dealers: Dealers[]): SelectOption[] => {
  if (!dealers) {
    return []
  }
  return [
    {
      label: "Unlink dealer from User",
      value: undefined,
    },
    ...dealers.map(dealer => createDealerOption(dealer))
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
interface ReactProps extends WithStyles<typeof styles> {
  dealers: Dealers[]
}
interface FormikFields {
  dealerId?: string;
  dealer?: {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    postCode?: string;
    licenseNumber?: string;
  };
}


export const styles = (theme: Theme) => createStyles({
  errorMsgContainer: {
    position: 'relative',
    width: '100%',
    marginTop: '0.5rem',
  },
  dealerDropdown: {
    flexGrow: 1,
    minWidth: 250,
    width: '100%',
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








