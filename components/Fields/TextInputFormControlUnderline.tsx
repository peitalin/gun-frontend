import React from "react";
import clsx from "clsx";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { useFocus } from "utils/hooks";
import { styles } from "components/Fields/styles";

import ValidationErrorMsg from "./ValidationErrorMsg";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';



const TextInputFormControlUnderline: React.FC<ReactProps> = (props) => {

  const ref = React.useRef();
  const focused = useFocus(ref);

  const {
    errorMessage,
    touched = false,
    disabled = false,
    validationErrorMsgStyle,
    disableInitialValidationMessage = false,
    classes,
    ...rest
  } = props;

  let errorInputColor = selectErrorColor(errorMessage, touched, focused)

  return (
    <FormControl margin="dense" fullWidth>
      <InputLabel>
        {props.inputLabel}
      </InputLabel>
      <Input
        // classes={{
        //   input: clsx(
        //     errorInputColor === "red" ? classes.errorInput : null,
        //     errorInputColor === "grey" ? classes.errorInputUntouched : null,
        //   ),
        // }}
        disabled={disabled}
        autoComplete={props.autoComplete}
        autoFocus={props.autoFocus}
        inputRef={ref}
        error={!!props.errorMessage && props.touched}
        {...rest}
      />

      { props.children }

      <ValidationErrorMsg
        touched={touched}
        focused={focused}
        errorMessage={props.errorMessage}
        disableInitialValidationMessage={disableInitialValidationMessage}
        style={validationErrorMsgStyle}
      />
    </FormControl>
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
  disabled?: boolean;
  buttonWidth?: any;
  disableInitialValidationMessage?: boolean;
  validationErrorMsgStyle?: any;
  autoComplete?: any;
  autoFocus?: any;
  [key: string]: any;
}

export default withStyles(styles)(TextInputFormControlUnderline);