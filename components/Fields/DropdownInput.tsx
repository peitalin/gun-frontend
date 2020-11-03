import React from "react";
import clsx from "clsx";
import { withStyles, WithStyles, fade } from "@material-ui/core/styles";
// Select Component
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import { Colors, Gradients, fontFam, BorderRadius } from "layout/AppTheme";
import { useFocus } from "utils/hooks";
import { styles } from "components/Fields/styles";
import ValidationErrorMsg from "./ValidationErrorMsg";



const DropdownInput = (props: ReactProps) => {

  const ref = React.useRef(null);
  const focused = useFocus(ref);

  const {
    // Formik
    errorMessage,
    touched = false,
    disableInitialValidationMessage = false,
    // CreatableSelect
    creatable = false,
    isMulti = false,
    isSearchable = true,
    limit,
    classes,
    onChange,
    options,
    delimiter,
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
      classes.creatableSelect,
      props.className && props.className,
    )}>
      {
        props.creatable
        ? <CreatableSelect
            // inputId={props.inputId}
            value={state}
            onMenuOpen={props.onMenuOpen}
            onChange={(e) => {
              setState(e)
              onChange(e)
            }}
            options={options}
            placeholder={placeholder}
            isMulti={isMulti}
            isSearchable={isSearchable}
            className={classes.optionValues}
            classes={{
              input: clsx(
                classes.input,
                errorInputColor === "red" ? classes.errorInput : null,
                errorInputColor === "grey" ? classes.errorInputUntouched : null,
              ),
              multiline: classes.selectMultiline,
            }}
            theme={
              props.theme
              ? props.theme
              : theme => ({
                  ...theme,
                  borderRadius: BorderRadius,
                  colors: {
                    ...theme.colors,
                    primary25: Colors.lightGrey,
                    primary: Colors.charcoal,
                  },
                })
            }
            delimiter={delimiter ? delimiter : ','}
            styles={
              props.styles
              ? props.styles
              : {
                input: styles => ({
                  color: props.hideCursor ? 'transparent' : Colors.black
                }),
                placeholder: styles => ({
                  ...styles,
                  fontWeight: 400,
                  fontFamily: fontFam,
                  color: Colors.darkGrey55,
                }),
                menu: styles => ({
                  ...styles,
                  zIndex: 10,
                  marginTop: '2px',
                  cursor: "pointer",
                  "&:hover": {
                    cursor: "pointer",
                  },
              })
              }
            }
            inputRef={ref}
          />
        : <Select
            // inputId={props.inputId}
            value={state}
            onMenuOpen={props.onMenuOpen}
            onChange={(e) => {
              setState(e)
              onChange(e)
            }}
            options={options}
            placeholder={placeholder}
            isMulti={isMulti}
            isSearchable={isSearchable}
            className={classes.optionValues}
            classes={{
              input: clsx(
                classes.input,
                errorInputColor === "red" ? classes.errorInput : null,
                errorInputColor === "grey" ? classes.errorInputUntouched : null,
              ),
              multiline: classes.selectMultiline,
            }}
            theme={
              props.theme
              ? props.theme
              : theme => ({
                  ...theme,
                  borderRadius: BorderRadius,
                  colors: {
                    ...theme.colors,
                    color: Colors.uniswapLightestGrey,
                    primary25: Colors.uniswapLightNavy,
                    primary: Colors.uniswapLighterGrey,
                  },
                })
            }
            styles={
              props.styles
              ? props.styles
              : {
                input: styles => ({
                  color: props.hideCursor ? 'transparent' : Colors.uniswapLightestGrey
                }),
                placeholder: styles => ({
                  ...styles,
                  fontWeight: 400,
                  fontFamily: fontFam,
                  color: Colors.grey,
                }),
                singleValue: styles => ({
                  color: Colors.uniswapLighterGrey,

                }),
                indicatorSeparator: styles => ({
                  ...styles,
                  backgroundColor: Colors.uniswapLighterGrey,
                }),
                indicatorsContainer: styles => ({
                  ...styles,
                  color: Colors.uniswapLighterGrey,
                  cursor: "pointer",
                }),
                menu: styles => ({
                  ...styles,
                  zIndex: 10,
                  marginTop: '2px',
                  cursor: "pointer",
                  "&:hover": {
                    cursor: "pointer",
                  },
                  background: Colors.uniswapDarkNavy,
                  color: Colors.uniswapLighterGrey,
                }),
                control: (base, state) => ({
                  ...base,
                  background: Colors.uniswapLightNavy,
                  // // match with the menu
                  // borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
                  // // Overwrittes the different states of border
                  border: `0px solid ${Colors.uniswapLighterGrey}`,
                  // // borderColor: state.isFocused ? Colors.gradientUniswapBlue1 : "unset",
                  // // Removes weird border around container
                  // boxShadow: state.isFocused ? null : null,
                  // "&:hover": {
                  //   // Overwrittes the different states of border
                  //   // borderColor: state.isFocused ? "red" : "blue"
                  //   borderColors: Colors.gradientUniswapFluro1,
                  // }
                }),
              }
            }
            inputRef={ref}
          />
      }

      <ValidationErrorMsg
        touched={touched}
        focused={focused}
        errorMessage={props.errorMessage}
        disableInitialValidationMessage={disableInitialValidationMessage}
      />

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
  delimiter?: string;
  disableInitialValidationMessage?: boolean;
  inputId?: string;
  className?: any;
  isSearchable?: boolean;
  hideCursor?: boolean;
  styles?: any;
  theme?: any;
  [key: string]: any;
}
export interface SelectOption {
  label: string;
  value: string | any;
}


export default withStyles(styles)( DropdownInput );