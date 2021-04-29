import React from "react";
import clsx from "clsx";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
// Styles
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
// Material UI
import Typography from "@material-ui/core/Typography";
import TextInput from "components/Fields/TextInput";
import DropdownInput from "components/Fields/DropdownInput";
// router
import { useRouter } from "next/router";
// Typings
import { UserPrivate, Dealer, DealerState } from "typings/gqlTypes";
import { HtmlEvent, EditStoreInput } from "typings";
// Validation
import { FormikProps } from 'formik';






const CreateDealerFields: React.FC<ReactProps & FormikProps<FormikFields>> = (props) => {

  const {
    classes,
    dealer,
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

  // Redux dispatchers
  const router = useRouter();

  const userRedux = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )

  let stateOptions = createStateOptions()
  const [selectedState, setSelectedState] = React.useState(stateOptions[0])


  const handleUpdateName = (e: HtmlEvent) => {
    let name = e.target.value;
    if (!name) {
      fprops.setFieldValue('name', "")
      // backend fails on empty string
    } else {
      fprops.setFieldValue('name', name)
    }
  };


  const handleUpdateLicenseNumber = (e: HtmlEvent) => {
    let s = e.target.value;
    if (!s) {
      fprops.setFieldValue('licenseNumber', "")
    } else {
      fprops.setFieldValue('licenseNumber', s)
    }
  };


  const handleUpdateCity = (e: HtmlEvent) => {
    let c = e.target.value;
    if (!c) {
      fprops.setFieldValue('city', "")
    } else {
      fprops.setFieldValue('city', c)
    }
  };

  const handleUpdatePostcode = (e: HtmlEvent) => {
    let c = e.target.value;
    if (!c) {
      fprops.setFieldValue('postCode', "")
    } else {
      fprops.setFieldValue('postCode', c)
    }
  };

  const handleUpdateState = (option: { label: string, value: string }) => {
    if (!option.value) {
      fprops.setFieldValue('state', "")
      setSelectedState(undefined)
    } else {
      fprops.setFieldValue('state', option.value)
      setSelectedState({
        value: option.value,
        label: option.label,
      })
    }
  };

  const handleUpdateAddress = (e: HtmlEvent) => {
    let a = e.target.value;
    if (!a) {
      fprops.setFieldValue('address', "")
      // backend fails on empty string
    } else {
      fprops.setFieldValue('address', a)
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.innerRoot}>

        <div className={clsx(classes.formContainer, "fadeInFast")}>

          <Typography variant="subtitle1" className={classes.subtitle1}>
            Dealership Name
            {
              errors.name
              ? <span className={classes.redText}>{` - ${errors.name}`}</span>
              : <span className={classes.greyText}> - public</span>
            }
          </Typography>
          <TextInput
            placeholder="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleUpdateName}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.name}
            touched={touched.name}
          />
          <div style={{ marginTop: '0.25rem' }}></div>

          <Typography variant="subtitle1" className={classes.subtitle1}>
            License Number
            {
              errors.licenseNumber
              ? <span className={classes.redText}>{` - ${errors.licenseNumber}`}</span>
              : <span className={classes.greyText}> - public</span>
            }
          </Typography>
          <TextInput
            placeholder="License Number"
            className={classes.textField}
            value={values.licenseNumber}
            onChange={handleUpdateLicenseNumber}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.licenseNumber}
            touched={touched.licenseNumber}
          />
          <div style={{ marginTop: '0.25rem' }}></div>

          <Typography variant="subtitle1" className={classes.subtitle1}>
            Postcode
            {
              errors.postCode
              ? <span className={classes.redText}>{` - ${errors.postCode}`}</span>
              : <span className={classes.greyText}> - public</span>
            }
          </Typography>
          <TextInput
            placeholder="Post Code"
            className={classes.textField}
            value={values.postCode}
            onChange={handleUpdatePostcode}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.postCode}
            touched={touched.postCode}
          />
          <div style={{ marginTop: '0.25rem' }}></div>

          <Typography variant="subtitle1" className={classes.subtitle1}>
            City
            {
              errors.city
              ? <span className={classes.redText}>{` - ${errors.city}`}</span>
              : <span className={classes.greyText}> - public</span>
            }
          </Typography>
          <TextInput
            placeholder="City"
            className={classes.textField}
            value={values.city}
            onChange={handleUpdateCity}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.city}
            touched={touched.city}
          />
          <div style={{ marginTop: '0.25rem' }}></div>

          <Typography variant="subtitle1" className={classes.subtitle1}>
            State
            {
              errors.state
              ? <span className={classes.redText}>{` - ${errors.state}`}</span>
              : <span className={classes.greyText}> - public</span>
            }
          </Typography>
          <DropdownInput
            className={classes.dropDown}
            stateShape={stateOptions[0]}
            onChange={(option: { value: string, label: string }) =>
              handleUpdateState(option)
            }
            options={stateOptions}
            placeholder={stateOptions[0]?.label}
          />
          {/* <TextInput
            placeholder="State"
            className={classes.textField}
            value={values.state}
            onChange={handleUpdateState}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.state}
            touched={touched.state}
          /> */}
          <div style={{ marginTop: '0.25rem' }}></div>

          <Typography variant="subtitle1" className={classes.subtitle1}>
            Address
            {
              errors.address
              ? <span className={classes.redText}>{` - ${errors.address}`}</span>
              : <span className={classes.greyText}> - public</span>
            }
          </Typography>
          <TextInput
            placeholder="State"
            className={classes.textField}
            value={values.address}
            onChange={handleUpdateAddress}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.address}
            touched={touched.address}
          />
          <div style={{ marginTop: '0.25rem' }}></div>
        </div>

      </div>
    </div>
  )
}

const createStateOptions = () => {
  return [
    { label: "ACT", value: DealerState.ACT },
    { label: "NSW", value: DealerState.NSW },
    { label: "NT",  value: DealerState.NT },
    { label: "QLD", value: DealerState.QLD },
    { label: "SA",  value: DealerState.SA },
    { label: "TAS", value: DealerState.TAS },
    { label: "VIC", value: DealerState.VIC },
    { label: "WA",  value: DealerState.WA },
  ]
}

interface FormikFields {
  name: string
  address: string
  city: string
  postCode: string
  state: string
  licenseNumber: string
}

interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  dealer: Dealer;
}


export default withStyles(styles)( CreateDealerFields );

