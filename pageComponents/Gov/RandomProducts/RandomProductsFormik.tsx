import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { FormikProps } from 'formik';
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
import ButtonLoading from "components/ButtonLoading";
// Graphql
import { useApolloClient } from "@apollo/client";
// Validation
import { Formik } from 'formik';
import { validationSchemas } from "utils/validation";




function RandomProductsFormik(props: ReactProps & ReactChildren) {

  const { classes } = props;
  const aClient = useApolloClient();

  return (
    <Formik
      initialValues={{
        count: 1,
        alwaysPublish: true,
        alwaysFewestPreviews: false,
        alwaysGreatestPreviews: false,
      }}
      validationSchema={validationSchemas.RandomProductsConfig}
      onSubmit={(values, { setSubmitting }) => {
        console.log("formik onSubmit")
      }}
    >
      {(fprops) => {

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
          validateField,
          validateForm,
        } = fprops;

        // console.log('values', values)

        return (
          <ErrorBounds className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit}>
              {
                props.children({ fprops: fprops })
              }
            </form>
          </ErrorBounds>
        )
      }}
    </Formik>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
}
interface ReactChildren {
  children?(params: {
    fprops?: FormikProps<FormikFieldsRandomProductsConfig>,
  }): React.ReactNode
}
export interface FormikFieldsRandomProductsConfig {
  count: number
  alwaysPublish: boolean
  alwaysFewestPreviews: boolean
  alwaysGreatestPreviews: boolean
}



const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  form: {
    width: '100%',
  },
});


export default withStyles(styles)( RandomProductsFormik );



