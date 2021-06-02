import React from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
import { ReduxStateProductCreate } from "reduxStore/product_create-reducer";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
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
  const [variablePrice, setVariablePrice] = React.useState("");
  // initial value of "" will makethe price field start off empty

  return (
    <ErrorBounds className={classes.root}>
      <div className={classes.flexRow}>
        <Rifm
          // $ need to be in regexp to prevent cursor jumping on backspace
          accept={/[\d.]/g}
          value={variablePrice} // value if formatted with formatCurrency
          format={formatCurrency}
          onChange={value => {
            // values before currency mask
            // multiple by 100 as formik/graphql takes cents, not dollars
            let dollars = parseNumber(value)
            setVariablePrice(dollars)
            updatePrice(dollars * 100)
            // multiply by 100 as formik/graphql takes cents, not dollars
          }}
        >
          {({ value, onChange }) => {
            return (
              <div className={clsx(classes.flexCol50, classes.marginRight)}>
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
                    onFocus={() => {
                      if (typeof props.setActiveStep === 'function') {
                        props.setActiveStep(7)
                      }
                    }}
                    onBlur={handleBlur}
                    inputProps={{ style: { width: '100%', marginLeft: '0.25rem' }}}
                    errorMessage={
                      (errors?.currentVariants?.[position] as any)?.price
                      ? (errors.currentVariants[position] as any)?.price
                      : null
                    }
                    touched={touched?.currentVariants?.[position]?.price}
                    validationErrorMsgStyle={{
                      bottom: '-1.15rem',
                    }}
                  />
                </div>
              </div>
            )
          }}
        </Rifm>
      </div>
      <div className={classes.container}>
        Price will be displayed as:
      </div>
      <div className={classes.container}>
        <PriceDisplayProductPage
          price={currentVariants?.[position]?.price}
          priceWas={currentVariants?.[position]?.priceWas}
          isSuspended={false}
        />
      </div>
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  position: number;
  reducerName: ReducerName;
  // stepper
  setActiveStep?(a?: any): void
}
interface FormikFields {
  currentVariants: {
    price: number;
    priceWas?: number;
  }[];
}

export const styles = (theme: Theme) => createStyles({
  root: {
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

export default withStyles(styles)(React.memo(
  (props: ReactProps & FormikProps<FormikFields>) => <PriceFields {...props} />,
));
