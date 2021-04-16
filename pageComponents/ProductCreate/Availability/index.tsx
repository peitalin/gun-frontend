import React from "react";
import { useState } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { AddVariantInput, EditVariantInput } from "reduxStore/product_create-actions";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// Components
import ErrorBounds from 'components/ErrorBounds';
// Typings
import { ProductVariantInput } from "typings/gqlTypes";
import { ReducerName } from "typings/dropzone";
// Material UI
import Typography from "@material-ui/core/Typography";
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
// Components
import Or from "components/Or";
import License from "./AvailabilityForm";
// Validation
import { FormikProps } from 'formik';



const PricingLicenses = (props: ReactProps & FormikProps<FormikFields>) => {

  // props and state
  const { classes, reducerName, currentVariants, ...fprops } = props;
  const dispatch = useDispatch();
  const actions = createActions(reducerName);

  const [licensesOpen, setLicensesOpen] = React.useState(false);

  const toggleVariants = event => {
    setLicensesOpen(s => !s);
  };

  React.useEffect(() => {
    // fprops.setFieldValue("quantity", [
    //   ...currentVariants
    // ])
  }, [])


  return (
    <ErrorBounds className={classes.root}>
      <div className={classes.flexRow}>
        <Typography
          className={classes.title}
          variant="h3"
          gutterBottom
        >
          Availability
        </Typography>
        <div className={classes.switchContainer}>
          <Typography variant="subtitle2">
            Limited Release
          </Typography>
          <Switch
            checked={licensesOpen}
            onChange={toggleVariants}
            color="secondary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          {
            licensesOpen &&
            <div>
            </div>
          }
        </div>
      </div>
    </ErrorBounds>
  )
}


const initialVariant: AddVariantInput = {
  variantName: "",
  variantDescription: "",
  price: 100,
  priceWas: undefined,
  isDefault: false,
}

interface ReactProps extends WithStyles<typeof styles> {
  reducerName: ReducerName;
  currentVariants: ProductVariantInput[];
}
interface variantNameArgs {
  variantName: string;
  position: number;
}
interface variantDescArgs {
  variantDescription: string;
  position: number;
}
interface FormikFields {
  currentVariants: {
    variantName: string;
    variantDescription: string;
    price: number;
    priceWas: number;
  }[];
}



const createActions = (reducerName: ReducerName) => {
  complainIfMissingReduxActions(reducerName)
  return {
    updateVariantName: (payload: variantNameArgs) => {
      return Actions[reducerName].UPDATE_VARIANT_NAME(payload)
    },
    updateVariantDescription: (payload: variantDescArgs) => {
      return Actions[reducerName].UPDATE_VARIANT_DESCRIPTION(payload)
    },
    addVariant: (payload: EditVariantInput[] | AddVariantInput[]) => {
      if (reducerName === ReducerName.reduxProductCreate) {
        return Actions[ReducerName.reduxProductCreate]
          .ADD_VARIANTS(payload as AddVariantInput[])
      } else {
        return Actions[ReducerName.reduxProductEdit]
          .ADD_VARIANTS(payload as EditVariantInput[])
      }
    },
    removeVariant: (payload: number) => {
      return Actions[reducerName].REMOVE_VARIANT(payload)
    },
    setDefaultVariant: (position: number) => {
      return Actions[reducerName].SET_IS_DEFAULT(position)
    },
  }
}


const complainIfMissingReduxActions = (reducerName: string) => {
  if (!Actions[reducerName]) {
    console.warn("Actions[reducerName] does not exist for reducer: ", reducerName)
  } else {
    // console.log("reducerName", reducerName)
  }
}


export const styles = (theme: Theme) => createStyles({
  root: {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  container: {
    marginBottom: "1rem",
  },
  textField: {
    width: "100%",
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
  },
  flexCol: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  label: {
    width: '100%',
  },
  optionName: {
    flexBasis: '33%',
    margin: '0px',
    marginRight: '1rem'
  },
  optionValues: {
    flexBasis: '66%',
    marginRight: '1rem'
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  addLicenseButton: {
    border: `0px solid ${Colors.lightPurple}`,
    color: Colors.purple,
    height: 35,
    "&:hover": {
      backgroundColor: Colors.lightPurple,
      color: Colors.backgroundColor,
    }
  },
  title: {
    marginBottom: '1rem',
  },
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
})



export default withStyles(styles)( PricingLicenses );




