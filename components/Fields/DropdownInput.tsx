import React from "react";
import clsx from "clsx";
import { withStyles, WithStyles, fade } from "@material-ui/core/styles";
// Select Component
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import { Colors, fontFam } from "layout/AppTheme";
import { useFocus } from "utils/hooks";
import { styles } from "components/Fields/styles";



const DropdownInput = (props: ReactProps) => {

  const ref = React.useRef();
  // const focused = useFocus(ref);
  const {
    // Formik
    errorMessage,
    touched = false,
    // CreatableSelect
    creatable = false,
    isMulti = false,
    limit,
    classes,
    onChange,
    options,
    placeholder = "Select an option",
    ...rest
  } = props;

  let errorInputColor = selectErrorColor(errorMessage, touched)

  // // Redux State, for UI updates
  // // Keep separate from Redux updates, which have different data structure
  const [state, setState] = React.useState(props.stateShape)

  return (
    <div className={clsx(
      classes.root,
      classes.width100,
      classes.creatableSelect,
    )}>
      {
        props.creatable
        ? <CreatableSelect
            value={state}
            onMenuOpen={props.onMenuOpen}
            onChange={(e) => {
              setState(e)
              onChange(e)
            }}
            options={options}
            placeholder={placeholder}
            isMulti={isMulti}
            className={classes.optionValues}
            classes={{
              input: clsx(
                classes.input,
                errorInputColor === "red" ? classes.errorInput : null,
                errorInputColor === "grey" ? classes.errorInputUntouched : null,
              ),
              multiline: classes.selectMultiline,
            }}
            theme={theme => ({
              ...theme,
              borderRadius: 4,
              colors: {
                ...theme.colors,
                primary25: Colors.lightPurple,
                primary: Colors.blue,
              },
            })}
            styles={{
              placeholder: styles => ({
                ...styles,
                fontWeight: 400,
                fontFamily: fontFam,
                color: Colors.grey,
              }),
            }}
            inputRef={ref}
          />
        : <Select
            value={state}
            onMenuOpen={props.onMenuOpen}
            onChange={(e) => {
              setState(e)
              onChange(e)
            }}
            options={options}
            placeholder={placeholder}
            isMulti={isMulti}
            className={classes.optionValues}
            classes={{
              input: clsx(
                classes.input,
                errorInputColor === "red" ? classes.errorInput : null,
                errorInputColor === "grey" ? classes.errorInputUntouched : null,
              ),
              multiline: classes.selectMultiline,
            }}
            theme={theme => ({
              ...theme,
              borderRadius: 2,
              colors: {
                ...theme.colors,
                primary25: Colors.lightPurple,
                primary: Colors.blue,
              },
            })}
            styles={{
              placeholder: styles => ({
                ...styles,
                fontWeight: 400,
                fontFamily: fontFam,
                color: Colors.grey,
              }),
            }}
            inputRef={ref}
          />
      }
      <div className={clsx(
        touched ? classes.errorMessage : classes.errorMessageUntouched,
      )}>
        <span className={"fadeIn"}>{props.errorMessage}</span>
      </div>
      {
        limit &&
        <div className={classes.count}>
          <span className={classes.countText}>
            {`${limit.count}/${limit.max}`}
          </span>
        </div>
      }
    </div>
  )
}

const selectErrorColor = (
  errorMessage: string,
  touched: boolean,
) => {
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
  errorMessage?: string;
  touched?: boolean; // sets error colors as grey if not-touched, red if so
  stateShape: any;
  onChange(...args: any): void;
  onMenuOpen(...args: any): void;
  creatable?: boolean;
  isMulti?: boolean;
  limit?: { count: number, max: number };
  options: SelectOption[];
  placeholder: string;
  [key: string]: any;
}
export interface SelectOption {
  label: string;
  value: string | any;
}


export default withStyles(styles)( DropdownInput );