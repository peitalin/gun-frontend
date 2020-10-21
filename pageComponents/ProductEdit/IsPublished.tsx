import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Redux
import { useDispatch } from "react-redux";
import { Actions } from "reduxStore/actions";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./commonStyles";
// Material UI
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
// Select Component
import DropdownInput from "components/Fields/DropdownInput";
// Typings
import ErrorBounds from "components/ErrorBounds";
// Validation
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';



const IsPublished = (props: ReactProps & FormikProps<FormikFields>) => {

  const dispatch = useDispatch();
  const { classes, ...fprops } = props;

  const updatePublishNow = (e) => {
    let { label, value } = e;
    const isPublished = !!value;
    dispatch(Actions.reduxProductEdit.IS_PUBLISHED(isPublished))
    fprops.setFieldValue("isPublished", isPublished)
  }

  return (
    <ErrorBounds>
      <div className={clsx(classes.container)}>
        <Typography color={"primary"} variant="subtitle1">
          Publish Status
        </Typography>
        <FormGroup className={classes.formGroup} row>
          <DropdownInput
            value={fprops.values.isPublished}
            onChange={updatePublishNow}
            options={suggestionsAvailability}
            placeholder={"Make product available for sale"}
            className={classes.optionValues}
            errorMessage={fprops.errors.isPublished}
            touched={fprops.touched.isPublished}
          />
        </FormGroup>
      </div>
    </ErrorBounds>
  )
}


const suggestionsAvailability = [
  {
    label: "Publish Now",
    value: true
  },
  {
    label: "Unpublished",
    value: false
  },
]


interface ReactProps extends WithStyles<typeof styles> {
}
interface FormikFields {
  isPublished: boolean;
}

export default withStyles(styles)( IsPublished );







