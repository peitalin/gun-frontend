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
import { useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";



const DropdownInput = (props: ReactProps) => {

  const ref = React.useRef(null);
  const focused = useFocus(ref);

  const isDarkMode = useSelector<GrandReduxState, boolean>(s => {
    return s.reduxLogin.darkMode === 'dark'
  })

  const {
    // Formik
    errorMessage,
    touched = false,
    disableInitialValidationMessage = false,
    // CreatableSelect
    creatable = false,
    isMulti = false,
    isSearchable = true,
    isClearable = true,
    height = 40,
    limit,
    classes,
    onChange,
    options,
    delimiter,
    validationErrorMsgStyle,
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
            isClearable={isClearable}
            isLoading={props.loading}
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
                    color: isDarkMode
                      ? Colors.uniswapLightestGrey
                      : Colors.black,
                    primary25: isDarkMode
                      ? Colors.uniswapLightNavy
                      : Colors.slateGreyBlack,
                    primary: Colors.uniswapLighterGrey,
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
                    color: isDarkMode
                      ? Colors.uniswapLightGrey
                      : Colors.slateGreyLightBlack,
                  }),
                  menu: styles => ({
                    ...styles,
                    zIndex: 10,
                    marginTop: '2px',
                    cursor: "pointer",
                    "&:hover": {
                      cursor: "pointer",
                    },
                    color: isDarkMode ? Colors.uniswapLighterGrey : Colors.charcoal,
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
            isClearable={isClearable}
            isLoading={props.loading}
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
                    color: isDarkMode
                      ? Colors.uniswapLightestGrey
                      : Colors.black,
                    primary25: isDarkMode
                      ? Colors.uniswapLightNavy
                      : Colors.slateGreyDarker,
                    primary: Colors.uniswapLighterGrey,
                  },
                })
            }
            styles={{
              input: styles => ({
                color: props.hideCursor
                  ? 'transparent'
                  : Colors.uniswapLightestGrey,
              }),
              placeholder: styles => ({
                ...styles,
                fontWeight: 400,
                fontFamily: fontFam,
                color: Colors.grey,
              }),
              singleValue: styles => ({
                color: isDarkMode ? Colors.uniswapLighterGrey : Colors.charcoal,
              }),
              indicatorSeparator: styles => ({
                ...styles,
                backgroundColor: isDarkMode ? Colors.uniswapLighterGrey : Colors.slateGreyDarker,
              }),
              indicatorsContainer: styles => ({
                ...styles,
                color: isDarkMode ? Colors.uniswapLighterGrey : Colors.charcoal,
                cursor: "pointer",
              }),
              container: styles => ({
                ...styles,
                height: height,
                borderRadius: BorderRadius,
                border: isDarkMode
                  ? `1px solid ${Colors.uniswapLighterGrey}`
                  : `1px solid ${Colors.slateGreyDarker}`,
              }),
              menu: styles => ({
                ...styles,
                zIndex: 10,
                marginTop: '2px',
                cursor: "pointer",
                "&:hover": {
                  cursor: "pointer",
                },
                color: isDarkMode ? Colors.uniswapLightestGrey : Colors.charcoal,
                background: isDarkMode
                  ? Colors.uniswapNavy
                  : Colors.slateGrey,
              }),
              control: (base, state) => ({
                ...base,
                background: isDarkMode
                  ? Colors.uniswapLightNavy
                  : Colors.slateGrey,
                // // match with the menu
                borderRadius: BorderRadius,
                height: '100%',
                // // Overwrittes the different states of border
                border: isDarkMode
                  ? `0px solid ${Colors.uniswapLighterGrey}`
                  : `0px solid ${Colors.slateGrey}`,
                // // borderColor: state.isFocused ? Colors.gradientUniswapBlue1 : "unset",
                // // Removes weird border around container
                // boxShadow: state.isFocused ? null : null,
                // "&:hover": {
                //   // Overwrittes the different states of border
                //   // borderColor: state.isFocused ? "red" : "blue"
                //   borderColors: Colors.gradientUniswapFluro1,
                // }
              }),
            }}
            inputRef={ref}
          />
      }

      <ValidationErrorMsg
        touched={touched}
        focused={focused}
        errorMessage={props.errorMessage}
        disableInitialValidationMessage={disableInitialValidationMessage}
        style={validationErrorMsgStyle}
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
  isClearable?: boolean;
  hideCursor?: boolean;
  styles?: any;
  theme?: any;
  height?: any;
  loading?: boolean;
  [key: string]: any;
}
export interface SelectOption {
  label: string;
  value: string | any;
}


export default withStyles(styles)( DropdownInput );