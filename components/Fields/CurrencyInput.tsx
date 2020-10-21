import React from "react"
// styles
import clsx from "clsx";
import { Colors, BorderRadius, fontFam } from "layout/AppTheme";
import { styles } from "components/Fields/styles";
// hooks
import { useFocus } from "utils/hooks";
// MUI
import { TextField } from '@material-ui/core';
import InputBase from "@material-ui/core/InputBase";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';




const CurrencyInput = (props: ReactProps) => {

  const ref = React.useRef();
  const focused = useFocus(ref);
  const {
    errorMessage,
    touched = false,
    classes,
    ...rest
  } = props;

  let errorInputColor = selectErrorColor(errorMessage, touched, focused)

  // For normal input fields
  return (
    <div className={clsx(classes.root, classes.width100)}>
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
        type="tel"
        onChange={props.onChange}
        value={props.value}
        {...rest}
      />

      <div className={clsx(
        touched ? classes.errorMessage : classes.errorMessageUntouched,
        focused ? classes.errorMessageFocused : null,
      )}>
        <span className={"fadeIn"}>{props.errorMessage}</span>
      </div>
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
  [key: string]: any;
}

export default withStyles(styles)( CurrencyInput );




