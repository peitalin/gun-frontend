import React from "react";
import clsx from "clsx";
import InputBase from "@mui/material/InputBase";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import Button from '@mui/material/Button';
import { Colors, BorderRadius, fontFam } from "layout/AppTheme";
import { useFocus } from "utils/hooks";
import { styles } from "components/Fields/styles";
import ValidationErrorMsg from "./ValidationErrorMsg";
import StripeCardIcon from "components/Icons/StripeCardIcon";
import InputAdornment from '@mui/material/InputAdornment';

// text mask for credit card
import { Rifm } from 'rifm';



const TextInputCreditCard = (props: ReactProps) => {

  const ref = React.useRef();
  const focused = useFocus(ref);

  const refExpiry = React.useRef();
  const focusedExpiry = useFocus(refExpiry);
  const cardMaxDigits = 16 + 3 // +3 because of spacing between 4 digit groups

  const refCvc = React.useRef();
  const focusedCvc = useFocus(refCvc);

  const {
    errorMessage,
    touched = false,
    disabled = false,
    disableInitialValidationMessage = false,
    validationErrorMsgStyle,
    classes,
    forceShowCardError,
    setForceShowCardError,
    iconType,
    isCardValid,
    isCreditCardField,
    ...rest
  } = props;

  let errorInputColor = selectErrorColor(errorMessage, touched, focused)

  const [state, setState] = React.useState({
    iconType: undefined,
    showAdornment: true,
  })
  const [cardFilled, setCardFilled] = React.useState(false)
  const [expiryFilled, setExpiryFilled] = React.useState(false)
  // when card has 16 digits entered, it is "filled"
  const [expiry, setExpiry] = React.useState(undefined)
  const [cvc, setCVC] = React.useState(undefined)

  const formatCVC = cvcString => {
    if (!cvcString) {
      return ""
    }
    return cvcString.slice(0,3)
  }

  // mount/unmount icon for animation
  React.useEffect(() => {
    if (!(iconType === undefined && state.iconType === undefined)) {
      if (!(iconType === 'error' && state.iconType === 'error')) {
        // no animation when cards are the same
        setState(s => ({
          ...s,
          iconType: iconType,
          showAdornment: false,
        }))
        setTimeout(() => {
          setState(s => ({ ...s, showAdornment: true }))
        }, 16)
      }
    }
  }, [iconType, focused, cardFilled])

  React.useEffect(() => {
    setState(s => ({ ...s, showAdornment: false }))
    setTimeout(() => {
      setState(s => ({ ...s, showAdornment: true }))
    }, 16)
  }, [focusedExpiry])

  React.useEffect(() => {
    if (props.value && props.value.length === cardMaxDigits) {
      setCardFilled(true)
    } else {
      setCardFilled(false)
    }
    if (isCardValid && props.value.length === cardMaxDigits) {
      if (!expiryFilled) {
        if (refExpiry && refExpiry.current) {
          (refExpiry as any).current.focus()
        }
      }
    }

    if (props.value && props.value.length > 0) {
      if (forceShowCardError === true) {
        setForceShowCardError(false)
      }
    }
  }, [props.value])


  /// Expiry field side-effects

  React.useEffect(() => {
    let expiryMaxDigits = 5
    if (expiry && expiry.length >= expiryMaxDigits) {
      setExpiryFilled(true)
      if (refCvc && refCvc.current) {
        (refCvc as any).current.focus()
      }
    } else {
      setExpiryFilled(false)
    }
  }, [expiry])


  return (
    <div className={clsx(classes.root, classes.width100)}>
      <InputBase
        classes={{
          input: (!isCardValid && props.value.length === cardMaxDigits)
            || (!isCardValid && !focused && props.value.length > 0)
            ? clsx(classes.inputCC, classes.creditCardInput, classes.invalidInput)
            : clsx(classes.inputCC, classes.creditCardInput),
          // 3x 4 digits, plus space
          root: clsx(
            classes.textFieldContainerCC,
            focused && classes.textFieldContainerCCFocused,
            errorInputColor === "red" ? classes.errorInput : null,
            errorInputColor === "grey" ? classes.errorInputUntouched : null,
          ),
          multiline: classes.selectMultiline,
        }}
        startAdornment={
          isCreditCardField &&
          <InputAdornment position="start">
            <StripeCardIcon
              className={ state.showAdornment ? clsx("fadeInFast", "grow") : "hidden"}
              height={"1rem"}
              fieldType={focusedCvc ? "cvc" : "card"}
              iconType={
                (!focused && !isCardValid && props.value.length > 0)
                ? "error"
                : (!isCardValid && props.value.length === 16 + 3)
                  ? "error"
                  : (props.forceShowCardError)
                    ? "error"
                    : state.iconType
              }
            />
          </InputAdornment>
        }
        endAdornment={
          <>
            <Rifm
              // $ need to be in regexp to prevent cursor jumping on backspace
              accept={/[\d.$]/g}
              format={formatExpiry}
              value={expiry}
              onChange={value => {
                // values before currency mask
                // multiple by 100 as formik/graphql takes cents, not dollars
                // let dollars = parseNumber(value)
                // setVariablePrice(dollars)
                // updatePrice(dollars * 100)
                // multiple by 100 as formik/graphql takes cents, not dollars
              }}
            >
              {({ value, onChange }) => {
                let [month, year] = value.split("/")
                let monthActual = parseInt(month)
                let yearActual = parseInt('20' + year)
                return (
                  <>
                    <input
                      id="westpac-expiry-date-display-mask"
                      className={classes.monthInput}
                      type="text"
                      ref={refExpiry}
                      placeholder={"MM/YY"}
                      style={{
                        width: '48px',
                      }}
                      value={value}
                      onChange={(e) => { setExpiry(e.currentTarget.value) }}
                      onKeyDown={(e) => {
                        if (e.keyCode === 8) {
                          // backspace when month field is empty
                          if (month === undefined || month.length === 0) {
                            if (ref && ref.current) {
                              let current = (ref as any).current;
                              current.focus()
                              current.setSelectionRange(props.value.length, props.value.length)
                            }
                          }
                        }
                      }}
                    />
                    <input
                      id="westpac-expiry-date-month"
                      className={classes.yearInputHidden}
                      type="text"
                      value={monthActual || undefined}
                      data-quickstream-api="expiryDateMonth"
                      onChange={(e) => {}}
                      style={{}}
                    />
                    <input
                      id="westpac-expiry-date-year"
                      className={classes.yearInputHidden}
                      type="text"
                      value={yearActual || undefined}
                      data-quickstream-api="expiryDateYear"
                      onChange={(e) => {}}
                      style={{}}
                    />
                  </>
                )
              }}
            </Rifm>
            <Rifm
              accept={/[\d.$]/g}
              format={formatCVC}
              value={cvc}
              onChange={value => {
                // values before currency mask
              }}
            >
              {({ value, onChange }) => {
                return (
                  <>
                    <input
                      id="westpac-cvc-display-mask"
                      className={classes.cvcInput}
                      type="text"
                      ref={refCvc}
                      placeholder={"CVC"}
                      style={{
                        width: '30px'
                      }}
                      value={value}
                      onChange={(e) => { setCVC(e.currentTarget.value) }}
                      onKeyDown={(e) => {
                        if (e.keyCode === 8) {
                          // backspace when month field is empty
                          if (cvc === undefined || cvc.length === 0) {
                            if (refExpiry && refExpiry.current) {
                              let current = (refExpiry as any).current;
                              current.focus()
                              current.setSelectionRange(5, 5)
                              // MM/YY -> 5th position
                            }
                          }
                        }
                      }}
                      data-quickstream-api="cvn"
                    />
                  </>
                )
              }}
            </Rifm>
          </>
        }
        onKeyPress={(e) => {
          // when card length === 16, and you've backspaces back to the
          // credit card field from the month field
          if (isCardValid && props.value.length === cardMaxDigits) {
            if (!expiryFilled) {
              if (refExpiry && refExpiry.current) {
                (refExpiry as any).current.focus()
              }
            }
          }
        }}
        disabled={disabled}
        inputRef={ref}
        error={!!props.errorMessage}
        style={{ borderRadius: BorderRadius, width: '100%' }}
        rows={props.rows ? props.rows : 1}
        multiline={!!props.rows}
        {...rest}
      />

      <ValidationErrorMsg
        touched={touched}
        focused={focused}
        errorMessage={props.errorMessage}
        disableInitialValidationMessage={disableInitialValidationMessage}
        style={props.validationErrorMsgStyle}
      />
    </div>
  );
}



export const formatExpiry = ( dateString ) => {
  if (!dateString) {
    return ""
  }
  // console.log('expiry', expiry)
  if (dateString.slice(-1) === "/") {
    let dd = dateString.replace(/\s/g, '');
    let month = dd.slice(0,2)
    return month
  } else if (dateString.includes("/")) {
    let dd = dateString.replace(/\s/g, '');
    let [month, year] = dd.split('/')
    month = month > 12 ? 12 : month
    return `${month.slice(0,2)}/${year.slice(0,2)}`
  } else if (dateString.length > 1) {
    let dd = dateString.replace(/\s/g, '');
    let month = dd.slice(0,2)
    month = month > 12 ? 12 : month
    let year = dd.slice(2,4)
    return `${month}/${year}`
  } else {
    if (dateString.startsWith('1') || dateString.startsWith('0')) {
      return dateString.replace(/\s/g, '');
    } else {
      // month cannot start with anything above '1' single digit month
      let dd = dateString.replace(/\s/g, '');
      return `0${dd}`
    }
  }
}

const selectErrorColor = (
  errorMessage: string,
  touched: boolean,
  focused: boolean,
) => {

  if (focused) {
    return "violet"
  }
  if (!touched) {
    return "grey"
  }
  if (!errorMessage) {
    return "none"
  }
  if (errorMessage && touched) {
    return "red"
  } else {
    return "none"
  }
}


interface ReactProps extends WithStyles<typeof styles> {
  onSubmit?(args: any): void;
  errorMessage?: string;
  touched?: boolean; // sets error colors as grey if not-touched, red if so
  disabled?: boolean;
  disableInitialValidationMessage?: boolean;
  validationErrorMsgStyle?: any;
  buttonWidth?: any;
  rows?: number;
  isCreditCardField?: boolean;
  isCardValid?: boolean;
  // iconType?: string | "visa" | "mastercard" | "error" | undefined;
  iconType?: string | undefined;
  value: string;
  forceShowCardError?: boolean;
  setForceShowCardError?(a: boolean): void;
  [key: string]: any;
}


export default withStyles(styles)(React.memo(
  (props: ReactProps) => <TextInputCreditCard {...props}/>,
));