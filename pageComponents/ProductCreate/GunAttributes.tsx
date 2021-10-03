import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { styles } from "./commonStyles";
// Material UI
import Typography from "@material-ui/core/Typography";
import TextInputAdorned from "components/Fields/TextInputAdorned";
import TextInput from "components/Fields/TextInput";
// Components
import Loading from "components/Loading";
import ErrorBounds from 'components/ErrorBounds';
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
import {
  maxLengthTitle,
} from "utils/limitsAndRules";
import RefLink, { refLinks } from "./RefLink";
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';
import { formatCurrency, parseNumber} from "utils/currencyInput";
import { number } from "yup";



const GunAttributes = (props: ReactProps & FormikProps<FormikFields>) => {

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

  const [barrelDisplay, setBarrelDisplay] = React.useState({
    value: fprops.values.barrelLength,
    unit: BarrelUnit.mm
  } as { value: string, unit: BarrelUnit })
  // this will dispaly either millimieteres or inches
  // but formik will always convert and record barrel lenght in millimeters

  const convertInchesToMilli = (inches: number) => {
    // multiple inches by 25.4 to get millimeters
    return inches * 25.4
  }
  const convertMilliToInches = (mm: number) => {
    // divide by 25.4 to get inches
    return mm / 25.4
  }

  const toggleMilliToInches = () => {
    // clear values when switching from mm to inches
    // ofrce user to re-input the length
    if (!barrelDisplay.value) {
      if (barrelDisplay.unit === BarrelUnit.inches) {
        setBarrelDisplay({ value: "", unit: BarrelUnit.mm })
      } else {
        setBarrelDisplay({ value: "", unit: BarrelUnit.inches })
      }
    } else {
      if (barrelDisplay.unit === BarrelUnit.inches) {
        setBarrelDisplay({ value: "", unit: BarrelUnit.mm })
        fprops.setFieldValue("barrelLength", undefined)
      } else {
        setBarrelDisplay({ value: "", unit: BarrelUnit.inches })
        fprops.setFieldValue("barrelLength", undefined)
      }
    }
  }

  // console.log("barrelDisplay", barrelDisplay)
  // console.log("fprops.values.barrelLength: ", fprops.values?.barrelLength)

  return (
    <ErrorBounds className={classes.positionRelative}>

      <Typography color={"primary"} variant="subtitle1" gutterBottom>
        Magazine Capacity
      </Typography>
      <TextInputAdorned
        name="magazine-capacity"
        placeholder="Number of bullets"
        className={classes.textFieldAdorned}
        value={values.magazineCapacity}
        onChange={(e) => {
          if (e.target.value.length <= maxLengthTitle) {
            let n = parseInt(e.target.value ?? 0)
            if (0 < n && n < 100) {
              fprops.setFieldValue("magazineCapacity", `${n}`)
            } else if (n >= 100) {
              fprops.setFieldValue("magazineCapacity", `${99}`)
            } else {
              fprops.setFieldValue("magazineCapacity", "")
            }
          }
          fprops.setFieldTouched('magazineCapacity', true)
        }}
        // endAdornment={
        //   <InputAdornment position="end">
        //     {"bullets"}
        //   </InputAdornment>
        // }
        inputProps={{ style: { width: '100%' }}}
        errorMessage={props.errors.magazineCapacity}
        touched={!!touched.magazineCapacity}
        disableInitialValidationMessage={true}
        // limit={{
        //   max: maxLengthTitle,
        //   count: values?.magazineCapacity?.length
        // }}
      />

      <div className={classes.headingContainer}>
        <Typography color={"primary"} variant="subtitle1" gutterBottom>
          Barrel Length
        </Typography>
        <div className={classes.mmOrInchesContainer}>
          <span className={clsx(
            classes.mmOrInchesText,
            barrelDisplay.unit === BarrelUnit.mm && classes.mmOrInchesTextHighlight,
          )}>
            mm
          </span>
          <span className={classes.mmOrInchesText}
            style={{ margin: '0rem 0.2rem'}}
          >
            /
          </span>
          <span className={clsx(
            classes.mmOrInchesText,
            barrelDisplay.unit === BarrelUnit.inches && classes.mmOrInchesTextHighlight,
          )}>
            inches
          </span>
          <Switch
            checked={barrelDisplay.unit === BarrelUnit.inches}
            onChange={toggleMilliToInches}
            color="secondary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </div>
      </div>
      <TextInputAdorned
        name="barrel-length"
        placeholder="Barrel Length"
        className={classes.textFieldAdorned}
        value={barrelDisplay.value}
        onChange={(e) => {
          if (e.target.value.length <= maxLengthTitle) {

            let n: string = parseNumber(e.target.value ?? 0)
            let n2: number = parseFloat(n)
            // console.log("n : ", n)
            // console.log("n2 : ", n2)

            if (n) {
              if (barrelDisplay.unit === BarrelUnit.inches) {
                let barrelLengthInMM = convertInchesToMilli(n2)
                setBarrelDisplay({ value: n, unit: BarrelUnit.inches })
                fprops.setFieldValue("barrelLength", `${barrelLengthInMM}`)
              } else {
                setBarrelDisplay({ value: n, unit: BarrelUnit.mm })
                fprops.setFieldValue("barrelLength", `${n}`)
              }
            } else {
              fprops.setFieldValue("barrelLength", "")
              setBarrelDisplay({ value: undefined, unit: barrelDisplay.unit })
            }
          }
          fprops.setFieldTouched('barrelLength', true)
        }}
        endAdornment={
          <InputAdornment position="end">
            {`${barrelDisplay.unit}`}
          </InputAdornment>
        }
        inputProps={{ style: { width: '100%' }}}
        errorMessage={props.errors.barrelLength}
        touched={!!touched.barrelLength}
        disableInitialValidationMessage={true}
        // limit={{
        //   max: maxLengthTitle,
        //   count: values?.barrelLength?.length
        // }}
      />
    </ErrorBounds>
  )
}

enum BarrelUnit {
  mm = "mm",
  inches = "inches",
}


interface ReactProps extends WithStyles<typeof styles> {
}
interface FormikFields {
  magazineCapacity?: string;
  barrelLength?: string;
}


export default withStyles(styles)(GunAttributes)
