import React from "react";
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "components/Fields/styles";



const ValidationErrorMsg = (props: ReactProps) => {

  const {
    errorMessage,
    touched = false,
    focused = false,
    disableInitialValidationMessage = false,
    style,
    classes,
  } = props;

  return (
    <div className={clsx(
        touched
          ? classes.errorMessage
          : disableInitialValidationMessage
            ? classes.errorMessageBlank
            : classes.errorMessageUntouched,
        focused ? classes.errorMessageFocused : null,
      )}
      style={style}
    >
      <span className={classes.errorMessageText}>{errorMessage}</span>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  errorMessage?: string;
  touched?: boolean; // sets error colors as grey if not-touched, red if so
  focused?: boolean;
  disableInitialValidationMessage?: boolean;
  style?: any;
  [key: string]: any;
}

export default withStyles(styles)( ValidationErrorMsg );