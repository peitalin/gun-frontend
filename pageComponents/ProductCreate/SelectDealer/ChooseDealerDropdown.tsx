import React from "react";
import { createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";

// Graphql
import { GET_ALL_DEALERS } from "queries/dealers-queries";
import { useQuery } from '@apollo/client';
// Typings
import { Dealers } from "typings/gqlTypes";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
// Select Component
import DropdownInput from "components/Fields/DropdownInput";
// Util components
import ValidationErrorMsg from "components/Fields/ValidationErrorMsg";
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';



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
  let initialDealer = dealerOptions.find(d => d.value === fprops.values.dealerId)

  // console.log("dealerOptions: ", dealerOptions)
  // console.log("initialDealer: ", initialDealer)

  return (
    <>
      <DropdownInput
        className={classes.dealerDropdown}
        stateShape={initialDealer}
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


const createDealerSuggestions = (dealers: Dealers[]): SelectOption[] => {
  if (!dealers) {
    return []
  }
  return dealers.map(dealer => createDealerOption(dealer))
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








