import React from "react";
import { oc as option } from "ts-optchain";
import { useState, useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { ReduxStateProductCreate } from "reduxStore/product_create-reducer";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// Components
import ErrorBounds from 'components/ErrorBounds';
import PriceDisplayProductPage from "components/PriceDisplayProductPage";
// Typings
import { asCurrency as c } from "utils/prices";
/// Debounce
import { useDebouncedCallback } from 'use-debounce';
// Validation
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
import { ReducerName } from "typings/dropzone";
import CurrencyInput from "components/Fields/CurrencyInput";
import TextInputAdorned from 'components/Fields/TextInputAdorned';
// import CurrencyInput from 'react-currency-masked-input'
import { Rifm } from 'rifm';
import { formatCurrency, parseNumber} from "utils/currencyInput";




const PriceFields = (props: ReactProps & FormikProps<FormikFields>) => {

  const { classes, position, reducerName, ...fprops } = props;
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
  const { currentVariants } = values;

  // Redux
  const dispatch = useDispatch();
  const actions = Actions[reducerName];

  // Debounce Formik State changes to limit lag
  const [updatePrice] = useDebouncedCallback((e: any) => {
    let cents = Math.round(parseFloat(e)) // round: 200.9999 => 201
    let index = position || 0;
    if (cents) {
      dispatch(actions.UPDATE_PRICE({ price: cents, position: index }))
      fprops.setFieldValue(`currentVariants[${position}].price`, cents)
    } else {
      dispatch(actions.UPDATE_PRICE({ price: undefined, position: index }))
      fprops.setFieldValue(`currentVariants[${position}].price`, undefined)
    }
  }, 16);


  // RIFM - masking currency values
  const [variablePrice, setVariablePrice] = React.useState(
    c(option(currentVariants)[position].price()) || ''
  );
  const [variablePriceWas, setVariablePriceWas] = React.useState(
    c(option(currentVariants)[position].priceWas()) || ''
  );

  return (
    <ErrorBounds className={classes.root}>
      <div className={classes.flexRow}>
        <Rifm
          // $ need to be in regexp to prevent cursor jumping on backspace
          accept={/[\d.]/g}
          format={formatCurrency}
          value={variablePrice}
          onChange={value => {
            // values before currency mask
            // multiple by 100 as formik/graphql takes cents, not dollars
            let dollars = parseNumber(value)
            setVariablePrice(dollars)
            updatePrice(dollars * 100)
            // multiple by 100 as formik/graphql takes cents, not dollars
          }}
        >
          {({ value, onChange }) => (
            <div className={clsx(classes.flexCol50, classes.marginRight)}>
              {/* <div className={classes.priceFlexRow}>
                <Typography
                  className={classes.priceLabel}
                  variant="subtitle2"
                >
                  Now (USD)
                </Typography>
              </div> */}
              <div className={classes.container}>
                <TextInputAdorned
                  startAdornment={"$ "}
                  name={`currentVariants[${position}].price`}
                  type="currency"
                  placeholder="0.00"
                  className={classes.textField}
                  // use "" to render empty input in textinput, not 0 or undefined.
                  value={value || ""}
                  onChange={(e) => {
                    e.persist()
                    onChange(e)
                  }}
                  onBlur={handleBlur}
                  inputProps={{ style: { width: '100%', marginLeft: '0.25rem' }}}
                  errorMessage={
                    option(errors).currentVariants[position].price()
                    ? errors.currentVariants[position].price
                    : null
                  }
                  touched={option(touched).currentVariants[position].price()}
                  validationErrorMsgStyle={{
                    bottom: '-1.15rem',
                  }}
                />
              </div>
            </div>
          )}
        </Rifm>
      </div>
      <div className={classes.container}>
        Price will be displayed as:
      </div>
      <div className={classes.container}>
        <PriceDisplayProductPage
          hideSavings={
            option(currentVariants)[position].priceWas(0)
            <= option(currentVariants)[position].price(0)
          }
          price={option(currentVariants)[position].price()}
          priceWas={option(currentVariants)[position].priceWas()}
        />
      </div>
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  position: number;
  reducerName: ReducerName;
}
interface FormikFields {
  currentVariants: {
    price: number;
    priceWas?: number;
  }[];
}

export const styles = (theme: Theme) => createStyles({
  root: {
    paddingTop: '0.5rem',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  flexCol: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  flexCol50: {
    flexBasis: '40%',
    flexGrow: 1,
  },
  marginRight: {
    marginRight: '0.5rem',
  },
  flexItem: {
    flexGrow: 1,
    flexBasis: '20%',
  },
  title: {
    marginBottom: '1rem',
  },
  container: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    color: Colors.uniswapLighterGrey,
  },
  priceFlexRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceLabel: {
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    color: Colors.uniswapLighterGrey,
  },
  priceValue: {
    color: Colors.lightBlue,
    textAlign: 'end',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
  },
  priceOptional: {
    color: Colors.mediumGrey,
    textAlign: 'end',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
  },
  textField: {
    width: "100%",
    "&:focus-within": {
      color: Colors.blue,
    },
  },
})

export default withStyles(styles)( PriceFields );
