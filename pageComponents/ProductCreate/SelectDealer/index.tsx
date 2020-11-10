import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from '../commonStyles';
// Material UI
import Typography from "@material-ui/core/Typography";
import FormGroup from '@material-ui/core/FormGroup';
// Util components
import ErrorBounds from 'components/ErrorBounds';
import ValidationErrorMsg from "components/Fields/ValidationErrorMsg";
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
// Graphql
import { GET_ALL_DEALERS } from "queries/dealers-queries";
import { useQuery } from '@apollo/client';
// Typings
import { Dealers } from "typings/gqlTypes";
import ChooseDealerDropdown from "./ChooseDealerDropdown";
import InputNewDealer from "./InputNewDealer";



const SelectDealers = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    defaultChooseDealer = true,
    ...fprops
  } = props;

  const [chooseDealer, setChooseDealer] = React.useState(defaultChooseDealer);

  // Apollo Graphql
  const {
    loading,
    error,
    data
  } = useQuery<QueryData, null>(GET_ALL_DEALERS)

  const dealers = option(data).getAllDealers([])
      .filter(c => !!c && !!c.name)

  // console.log("dealerId: ", fprops.values.dealerId)
  // console.log("dealer: ", fprops.values.dealer)

  return (
    <ErrorBounds className={classes.positionRelative}>
      <div className={clsx(classes.formContainer)}>
        <Typography color={"primary"} variant="subtitle1">
          {
            chooseDealer
            ? "Dealer"
            : "New Dealer"
          }
        </Typography>
        <FormGroup row
          className={clsx(classes.formGroup, classes.marginTop1)}
        >
          {
            chooseDealer
            ? <ChooseDealerDropdown dealers={dealers} {...fprops}/>
            : <InputNewDealer dealers={dealers} {...fprops}/>
          }

          {/* <InputNewDealer {...fprops} /> */}

          <div className={classes.dontSeeDealerLink}
            onClick={() => {
              // currently choosing dealer from menu, switching to inputing dealer
              if (chooseDealer) {
                // clear chosen DealerId
                fprops.setFieldValue("dealerId", undefined)
                setChooseDealer(s => false)
              } else {
                // clear New Dealer inputs
                fprops.setFieldValue("dealer", {})
                setChooseDealer(s => true)
              }
            }}
          >
            {
              chooseDealer
              ? "Don't see your dealer?"
              : "Back"
            }
          </div>

        </FormGroup>
      </div>
    </ErrorBounds>
  )
}


export interface SelectOption {
  label: string;
  value: string | any;
}
interface ReactProps extends WithStyles<typeof styles> {
  defaultChooseDealer ?: boolean
}
interface QueryData {
  getAllDealers: Dealers[]
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

export default withStyles(styles)( SelectDealers );








