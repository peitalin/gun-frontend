import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { styles } from "./commonStyles";
// Material UI
import Typography from "@material-ui/core/Typography";
import DropdownInput from "components/Fields/DropdownInput";
// Components
import Loading from "components/Loading";
import ErrorBounds from 'components/ErrorBounds';
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
import {
  Calibers,
  CaliberGroup,
} from "typings/gqlTypes";
import {
  createCaliberOption,
  createCaliberOptionGroups,
  GroupedSelectOption,
} from "components/SearchbarAirbnb/AdvancedSearchDropdown/CaliberMenu";
import { SelectOptionCaliber } from "typings"
// gql
import { GET_CALIBERS } from "queries/calibers-queries";
import { useQuery } from "@apollo/client";
import { ReducerName } from "typings/dropzone";



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

  const caliberOptionGroups = createCaliberOptionGroups(data?.getCalibers, false)

  const initialCaliberProductEdit = {
    label: fprops.values?.caliber,
    value: fprops.values?.caliber,
  }
  console.log("fprops.values.caliber: ", fprops.values?.caliber)
  console.log("fprops.errors.caliber: ", fprops.errors?.caliber)
  console.log("fprops.touched.caliber: ", fprops.touched?.caliber)
  // console.log("caliberOptionsGRoups", caliberOptionGroups)


  return (
    <ErrorBounds className={classes.positionRelative}>

      <Typography color={"primary"} variant="subtitle1" gutterBottom>
        Caliber
      </Typography>
      <DropdownInput
        className={classes.caliberDropdown}
        // menuIsOpen={true}
        initialState={
          (props.reducerName === ReducerName.reduxProductEdit)
            ? initialCaliberProductEdit
            : undefined
        }
        height={45}
        onChange={(option: SelectOptionCaliber) => {
          // console.log("option: ", option)
          let caliber = option?.value
          // set validation = false for everyting until last formik update
          fprops.setFieldTouched('caliber', true, false)
          // add caliber to title for search
          fprops.setFieldValue(
            "title",
            `${fprops.values?.make} ${fprops.values?.model} ${caliber}`,
            false,
          )
          fprops.setFieldTouched('make', true, false)
          fprops.setFieldTouched('title', true, false)

          // set validation = true for last formik update
          fprops.setFieldValue("caliber", caliber, true)
        }}
        options={caliberOptionGroups}
        placeholder={undefined}
        errorMessage={errors.caliber}
        touched={!!touched.caliber}
        disableInitialValidationMessage={false}
      />

    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  reducerName?: ReducerName
}
interface FormikFields {
  caliber?: string;
  make?: string;
  model?: string;
}
interface QData3 {
  getCalibers: Calibers[];
}
interface QVar3 {
}


export default withStyles(styles)(SelectCaliber)
