import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./commonStyles";
// Material UI
import Typography from "@material-ui/core/Typography";
import TextInputAdorned from "components/Fields/TextInputAdorned";
import TextInput from "components/Fields/TextInput";
import DropdownInput from "components/Fields/DropdownInput";
// Components
import Loading from "components/Loading";
import ErrorBounds from 'components/ErrorBounds';
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
import {
  maxLengthTitle,
} from "utils/limitsAndRules";
import {
  Calibers,
  CaliberGroup,
} from "typings/gqlTypes";
import {
  createCaliberOption,
  createCaliberOptionGroups,
  SelectOption,
  GroupedSelectOption,
} from "components/SearchbarAirbnb/AdvancedSearchDropdown/CaliberMenu";
// gql
import { GET_CALIBERS } from "queries/calibers-queries";
import { useQuery } from "@apollo/client";



const SelectCaliber = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    ...fprops
  } = props;

  // Formik props
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = fprops;


  const { data } = useQuery<QData3, QVar3>(
    GET_CALIBERS, {
  })

  const caliberOptionGroups = createCaliberOptionGroups(data?.getCalibers)

  const initialCaliber = {
    label: caliberOptionGroups?.[0]?.options?.[0]?.label ?? "All Calibers",
    value: caliberOptionGroups?.[0]?.options?.[0]?.value,
  }

  const [caliberOption, setCaliberOption] = React.useState(initialCaliber)
  console.log("fprops.values.caliber: ", fprops.values?.caliber)
  // console.log("caliberOptionsGRoups", caliberOptionGroups)

  return (
    <ErrorBounds className={classes.positionRelative}>

      <Typography color={"primary"} variant="subtitle1" gutterBottom>
        Caliber
      </Typography>
      <DropdownInput
        className={classes.caliberDropdown}
        // menuIsOpen={true}
        stateShape={caliberOption}
        height={45}
        onChange={(option: SelectOption) => {
          console.log("option: ", option)
          setCaliberOption(option)
          fprops.setFieldValue("caliber", option?.value)
          fprops.setFieldTouched('caliber', true)
        }}
        options={caliberOptionGroups}
        placeholder={initialCaliber}
        errorMessage={errors.caliber}
        touched={!!touched.caliber}
        disableInitialValidationMessage={true}
      />

    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}
interface FormikFields {
  caliber?: string;
}
interface QData3 {
  getCalibers: Calibers[];
}
interface QVar3 {
}


export default withStyles(styles)(SelectCaliber)
