import React from "react";
import Select from 'react-select';

// styles
import clsx from "clsx";
import { styles } from "components/Fields/styles";
import { Colors, fontFam, BorderRadius, Gradients } from "layout/AppTheme";
import { withStyles, WithStyles } from "@material-ui/core/styles";
// focus
import { useFocus } from "utils/hooks";
import ValidationErrorMsg from "./ValidationErrorMsg";
/// Debounce
const throttle = require('lodash.throttle');
const debounce = require('lodash.debounce');
// Snackbar
import { useSnackbar, ProviderContext } from "notistack";
// Redux
import { useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";




const MultiDropdownSelect = (props: ReactProps) => {

  const ref = React.useRef();
  const focused = useFocus(ref);
  const snackbar = useSnackbar();

  const isDarkMode = useSelector<GrandReduxState, boolean>(s => {
    return s.reduxLogin.darkMode === 'dark'
  })

  const {
    errorMessage,
    height = 40,
    touched = false,
    disabled = false,
    disableInitialValidationMessage = false,
    validationErrorMsgStyle,
    options,
    classes,
    ...rest
  } = props;


  const handleChange = (newValue: any, actionMeta: any) => {
    props.setTags(newValue)
  };

  let errorInputColor = selectErrorColor(errorMessage, touched, focused)

  React.useEffect(() => {
    // on unmount, clear keywords for Formik
    return () => {
      props.setTags([])
    }
  }, [])

  return (
    <>
      <Select
        defaultValue={props.initialTags}
        isMulti
        name="colors"
        options={options}
        classNamePrefix="select"

        inputRef={ref}
        isClearable={false} // remove "x" button which clears all keywords
        placeholder={props.placeholder || "Enter license categories"}
        isDisabled={props.disabled}
        isLoading={props.loading}
        // inputValue={state.inputValue}
        // onKeyDown={throttle(onKeyDown, 32)}
        onChange={handleChange}
        // onInputChange={throttle((inputValue) => {
        //   // logic for splitting on comma, and finding matching options
        //   if (inputValue && inputValue.includes(",")) {
        //     let inputValues = inputValue.split(',')
        //     handleCreate(inputValues)
        //   } else if (inputValue !== undefined) {
        //     // inputValue === "" after select+all delete
        //     setState(s => ({ ...s, inputValue: inputValue }));
        //   }
        // }, 32)}
        // value={value}
        // components={{
        //   DropdownIndicator: () => null,
        //   IndicatorSeparator: () => null,
        //   Menu: () => null,
        // }}
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
          // input: styles => ({
          //   color: props.hideCursor ? 'transparent' : Colors.uniswapLightestGrey
          // }),
          placeholder: styles => ({
            ...styles,
            fontWeight: 400,
            fontFamily: fontFam,
            color: Colors.grey,
          }),
          singleValue: styles => ({
            color: isDarkMode ? Colors.uniswapLighterGrey : Colors.charcoal,
            cursor: "pointer",
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
            // border: isDarkMode
            //   ? `1px solid ${Colors.uniswapLighterGrey}`
            //   : `1px solid ${Colors.slateGreyDarker}`,
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
              ? Colors.uniswapDarkNavy
              : Colors.slateGrey,
          }),
          control: (base, state) => ({
            ...base,
            background: isDarkMode
              ? Colors.uniswapLightNavy
              : Colors.slateGrey,
            // // match with the menu
            borderRadius: BorderRadius,
            cursor: "pointer",
            border: isDarkMode
              ? `1px solid ${Colors.uniswapLighterGrey}`
              : `1px solid ${Colors.slateGreyDarker}`,
          }),
        }}
      />

      <ValidationErrorMsg
        touched={touched}
        focused={focused}
        errorMessage={errorMessage}
        disableInitialValidationMessage={disableInitialValidationMessage}
        style={props.validationErrorMsgStyle}
      />

      {
        props.limit &&
        <div className={clsx(classes.count, classes.keywordsCountAbsolute)}>
          <span className={classes.keywordsCountText}>
            {`${props.limit.count}/${props.limit.max}`}
          </span>
        </div>
      }
    </>
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

export const createOption = (label: string): SelectOption => ({
  label,
  value: label
});

export interface SelectOption {
  label: string;
  value: string | any;
}
interface ReactProps extends WithStyles<typeof styles> {
  initialTags: SelectOption[];
  options: SelectOption[];
  setTags?(arr: any[]): void;
  loading?: boolean;
  errorMessage?: string;
  touched?: boolean; // sets error colors as grey if not-touched, red if so
  disabled?: boolean;
  placeholder?: string;
  height?: any;
  disableInitialValidationMessage?: boolean;
  validationErrorMsgStyle?: any;
  limit?: { count: number, max: number };
}
interface ReactState {
  inputValue: string;
  options: SelectOption[];
  value: SelectOption[];
}

export default withStyles(styles)( MultiDropdownSelect );







