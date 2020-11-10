import React from "react";
import clsx from "clsx";
import InputBase from "@material-ui/core/InputBase";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { Colors, BorderRadius, fontFam } from "layout/AppTheme";
import { useFocus } from "utils/hooks";
import { styles } from "components/Fields/styles";
import ValidationErrorMsg from "./ValidationErrorMsg";



const TextInput = (props: ReactProps) => {

  const ref = React.useRef();
  const focused = useFocus(ref);
  const [mouseOver, setMouseOver] = React.useState(false)

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

  // for YouTube Link, any input with a submit button next to it.
  if (props.onSubmit) {
    return (
      <div className={clsx(
        classes.root,
        classes.width100
      )}>
        <InputBase
          classes={{
            input: clsx(
              classes.input,
              errorInputColor === "red" ? classes.errorInput : null,
              errorInputColor === "grey" ? classes.errorInputUntouched : null,
            ),
            multiline: classes.selectMultiline,
          }}
          style={{
            // borderRadius: `${BorderRadius}px 0px 0px ${BorderRadius}px`,
            borderRadius: BorderRadius,
            width: '100%',
            height: '0.55rem',
          }}
          inputRef={ref}
          error={!!props.errorMessage}
          disabled={disabled}
          {...rest}
        />
        <Button
          style={{
            // borderRadius: `0px ${BorderRadius}px ${BorderRadius}px 0px`,
            borderRadius: BorderRadius,
            marginLeft: '0.25rem',
            backgroundColor:
              mouseOver
                ? Colors.gradientUniswapBlue1
                : Colors.uniswapLightNavy,
            color: Colors.uniswapLightestGrey,
            padding: '0.335rem',
            fontSize: "18px",
            height: '38px',
            width: props.buttonWidth ? props.buttonWidth : "4rem",
            // "&:hover": {
            //   backgroundColor: Colors.gradientUniswapBlue1,
            //   color: Colors.uniswapLightestGrey,
            // }
          }}
          onMouseOver={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
          onClick={props.onSubmit}
          {...props.submitButtonProps}
        > Add </Button>

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
  } else {
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
          }}
          disabled={disabled}
          inputRef={ref}
          error={!!props.errorMessage}
          style={{
            borderRadius: BorderRadius,
            width: '100%',
          }}
          {...rest}
        />

        <ValidationErrorMsg
          touched={touched}
          focused={focused}
          errorMessage={props.errorMessage}
          disableInitialValidationMessage={disableInitialValidationMessage}
          style={props.validationErrorMsgStyle}
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
  limit?: { count: number, max: number };
  buttonWidth?: any;
  disableInitialValidationMessage?: boolean;
  validationErrorMsgStyle?: any;
  [key: string]: any;
}

export default withStyles(styles)(TextInput);