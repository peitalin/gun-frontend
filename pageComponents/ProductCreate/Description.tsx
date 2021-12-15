import React from "react";
import clsx from "clsx";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Colors, isThemeDark } from "layout/AppTheme";
import { useTheme } from "@mui/material";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { styles } from "./commonStyles";
// Typings
import { UserPrivate, Role } from "typings/gqlTypes";
// Material UI
import Typography from "@mui/material/Typography";
// Components
import Loading from "components/Loading";
import ErrorBounds from 'components/ErrorBounds';
import TextInput from "components/Fields/TextInput";

// SSR dynamic import
import { maxLengthProductDescription } from "utils/limitsAndRules";
/// Debounce
import { useDebouncedCallback } from 'use-debounce';
import RefLink, { refLinks } from "./RefLink";

// Validation
import { FormikProps, FormikErrors, FormikTouched, FormikState } from 'formik';
import ValidationErrorMsg from "components/Fields/ValidationErrorMsg";
import ProductDescription from "pageComponents/P/ProductDetails/ProductDescription";

import TextEditorCK from "components/TextEditorCK";



const Description = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    showHtml = false,
    ...fprops
  } = props;

  const theme = useTheme()

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

  const { user } = useSelector<GrandReduxState, { user: UserPrivate }>(s => {
    return { user: s.reduxLogin.user }
  })

  return (
    <ErrorBounds className={clsx(classes.descriptionRoot, classes.positionRelative)}>

      <RefLink refId={refLinks.description}/>

      <Typography
        className={classes.marginBottom1}
        color={"primary"}
        variant="subtitle1"
      >
        Description
      </Typography>

      <TextEditorCK
        errorMessage={errors.description}
        limit={{
          max: maxLengthProductDescription, // 4000 chars
        }}
        errors={fprops.errors}
        values={fprops.values}
        touched={fprops.touched}
        setFieldTouched={fprops.setFieldTouched}
        containerStyle={{
          marginBottom: '1rem',
        }}
        editorStyle={{
          // maxWidth: 'calc(100vw - 4rem)', // constrain width for mobile
          background: Colors.uniswapMediumNavy,
        }}
        {...fprops}
      />

        <ProductDescription
          productName={"Description Preview"}
          productDescription={values.description}
          titleStyle={{
            marginBottom: '0rem',
            color: isThemeDark(theme)
            ? Colors.slateGreyBlack
            : Colors.slateGreyBlack,
          }}
          containerStyle={{
            paddingTop: '1rem',
            paddingBottom: '1rem',
            marginTop: '1rem',
            border: isThemeDark(theme)
              ? `1px solid ${Colors.uniswapGrey}`
              : `1px solid ${Colors.slateGreyDarkest}`,
            backgroundColor: isThemeDark(theme)
              ? Colors.cream
              : Colors.white,
            boxShadow: "unset",
          }}
        />

    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  showHtml?: boolean;
}
interface FormikFields {
  title: string;
  description: string;
}


export default withStyles(styles)(React.memo(
  (props: ReactProps & FormikProps<FormikFields>) => <Description {...props}/>,
));

