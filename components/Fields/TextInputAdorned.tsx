import React from "react"
// styles
import clsx from "clsx";
import {
  fade,
  withStyles, WithStyles,
  createStyles, makeStyles, createMuiTheme,
  Theme,
} from "@material-ui/core/styles";
import { Colors, BorderRadius, fontFam } from "layout/AppTheme";
// hooks
import { useFocus } from "utils/hooks";
// MUI
import InputBase from "@material-ui/core/InputBase";
import ValidationErrorMsg from "./ValidationErrorMsg";




const TextInputAdorned = (props: ReactProps) => {

  const ref = React.useRef();
  const focused = useFocus(ref);
  const {
    errorMessage,
    validationErrorMsgStyle,
    touched = false,
    disableInitialValidationMessage = false,
    classes,
    ...rest
  } = props;

  let errorInputColor = selectErrorColor(errorMessage, touched, focused)

  // For normal input fields
  return (
    <div className={clsx(classes.root, classes.width100)}>
      <div className={clsx(classes.inputBorder)}>
        <InputBase
          classes={{
            input: clsx(
              classes.input,
              errorInputColor === "red" ? classes.errorInput : null,
              errorInputColor === "grey" ? classes.errorInputUntouched : null,
            ),
            multiline: classes.selectMultiline,
            adornedStart: classes.adornedStart,
          }}
          inputRef={ref}
          style={{ borderRadius: BorderRadius, width: '100%' }}
          type="text"
          onChange={props.onChange}
          value={props.value}
          {...rest}
        />
      </div>

      <ValidationErrorMsg
        touched={touched}
        focused={focused}
        errorMessage={props.errorMessage}
        disableInitialValidationMessage={disableInitialValidationMessage}
        style={validationErrorMsgStyle}
      />

      {
        props.limit &&
        <div className={classes.count}>
          <span className={classes.countText}>
            {`${props.limit.count}/${props.limit.max}`}
          </span>
        </div>
      }
    </div>
  )
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
  limit?: { count: number, max: number };
  buttonWidth?: any;
  // currency
  onChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    a?: any
  ): void;
  defaultValue: string;
  value: string;
  disableInitialValidationMessage?: boolean;
  validationErrorMsgStyle?: any;
  [key: string]: any;
}


export const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
  },
  width100: {
    width: '100%'
  },
  paddingBottom: {
    paddingBottom: '1rem',
  },
  optionValues: {
    flexBasis: '100%',
    marginRight: '0rem',
    fontFamily: fontFam,
    fontSize: '0.9rem',
    fontWeight: 400,
  },
  creatableSelect: {
  },
  selectMultiline: {
    padding: 0,
  },
  adornedStart: {
    fontSize: "0.9rem",
    fontWeight: 400,
    fontFamily: fontFam,
    color: Colors.uniswapLighterGrey,
    transition: theme.transitions.create(['color'], {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  input: {
    fontSize: "0.9rem",
    fontWeight: 400,
    fontFamily: fontFam,
    color: theme.palette.type === "dark"
      ? Colors.uniswapLightestGrey
      : Colors.black,
    padding: '0.5rem 0rem',
  },
  inputBorder: {
    position: 'relative',
    background: theme.palette.type === "dark"
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    border: theme.palette.type === "dark"
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius,
    width: '100%',
    padding: '0rem 0.5rem', // -> 36px in total height
    transition: theme.transitions.create(['border-color', 'box-shadow'], {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      boxShadow: `${fade('#50B5F5', 0.2)} 0 0 0 2px`,
      borderColor: Colors.blue,
      // color: Colors.blue,
      color: theme.palette.type === "dark"
        ? Colors.uniswapLightestGrey
        : Colors.black,
    },
    // '&:invalid': {
    //   boxShadow: `${fade(theme.palette.error.light, 0.2)} 0 0 0 1px`,
    //   borderColor: theme.palette.error.main,
    // },
  },
  emptyInput: {
    border: `1px solid ${Colors.mediumLightGrey}`,
    '&:focus': {
      boxShadow: `${fade(Colors.lightGrey, 0.2)} 0 0 0 2px`,
      color: theme.palette.type === "dark"
        ? Colors.uniswapLightestGrey
        : Colors.black,
    },
  },
  errorInputUntouched: {
    // border: `1px solid ${Colors.mediumLightGrey}`,
    '&:focus': {
      // boxShadow: `${fade(Colors.grey, 0.2)} 0 0 0 2px`,
      color: theme.palette.type === "dark"
        ? Colors.uniswapLightestGrey
        : Colors.black,
    },
    "&:focus-within": {
      // color: `${fade(Colors.grey, 0.1)}`,
      color: theme.palette.type === "dark"
        ? Colors.uniswapLightestGrey
        : Colors.black,
    },
  },
  errorInput: {
    // border: `1px solid ${fade(theme.palette.error.light, 0.4)}`,
    '&:focus': {
      // border: `1px solid ${theme.palette.error.light}`,
      // boxShadow: `${fade(theme.palette.error.light, 0.2)} 0 0 0 2px`,
    },
    "&:focus-within": {
      color: `${fade(theme.palette.error.light, 0.1)}`,
    },
  },
  // ".errorInput:focus"
  errorMessage: {
    position: 'absolute',
    bottom: '0.25rem',
    right: '0.25rem',
    height: '1rem',
    fontSize: '0.8rem',
    fontFamily: fontFam,
    // transition: theme.transitions.create('color', {
    //   easing: theme.transitions.easing.easeIn,
    //   duration: "100ms",
    // }),
    color: `${fade(theme.palette.error.light, 0.7)}`,
    transition: theme.transitions.create(['opacity', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: "150ms",
    }),
  },
  errorMessageUntouched: {
    position: 'absolute',
    bottom: 0,
    right: '0.25rem',
    fontSize: '12px',
    fontFamily: fontFam,
    color: theme.palette.type === "dark"
      ? Colors.uniswapLightestGrey
      : Colors.black,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
  },
  errorMessageFocused: {
    color: `${fade(Colors.lightBlue, 0.7)}`,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
  },
  errorMessageBlank: {
    position: 'absolute',
    bottom: 0,
    right: '0.25rem',
    fontSize: '0.8rem',
    fontFamily: fontFam,
    opacity: 0,
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
  },
  errorMessageText: {
    fontSize: '12px',
  },
  count: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  countText: {
    fontSize: "0.8rem",
    fontFamily: fontFam,
    opacity: 0.25,
    position: 'absolute',
    right: '0.25rem',
    bottom: '1rem',
  },
})


export default withStyles(styles)( TextInputAdorned );




