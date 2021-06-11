import React from "react";
import CreatableSelect from "react-select/creatable";
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
// Snackbar
import { useSnackbar, ProviderContext } from "notistack";
// Redux
import { useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";




const KeywordDropdownInput = (props: ReactProps) => {

  const ref = React.useRef();
  const focused = useFocus(ref);
  const snackbar = useSnackbar();

  const isDarkMode = useSelector<GrandReduxState, boolean>(s => {
    return s.reduxLogin.darkMode === 'dark'
  })

  const {
    errorMessage,
    touched = false,
    disabled = false,
    disableInitialValidationMessage = false,
    validationErrorMsgStyle,
    classes,
    ...rest
  } = props;

  const [state, setState] = React.useState<ReactState>({
    inputValue: "",
    options: props.initialTags || [],
    value: props.initialTags || [],
  })

  const onKeyDown = (e) => {
    e.persist()
    if (
      e.keyCode === 188 // if key is comma,
      || e.keyCode === 13 // or enter
      || e.keyCode === 32 // or space
    ) {
      // catch comma, enter, space and break up word into tag
      e.preventDefault();
      if (state.inputValue !== "") {
        handleCreate([state.inputValue]);
      }
    } else {
      // ignore other keyCodes
    }
    // console.log(e.key, e.keyCode);
    // console.log(state.inputValue, e.key, state.inputValue + e.key);
  };


  const handleChange = (newValue: any, actionMeta: any) => {
    // console.log('handleChange:', newValue)
    // on deletion of keyword tag
    if (newValue && newValue.map) {
      setState(s => ({
        ...s,
        options: newValue,
        value: newValue
      }));
      props.setTags(newValue)
    } else {
      props.setTags([])
      setState(s => ({
        ...s,
        options: [],
        value: []
      }));
    }
  };

  const handleCreate = (inputValue: string[]) => {

    const { options, value } = state;
    let newOptions = Array.from(new Set(inputValue))
        .map(v => createOption(v))
        .filter(newOption => {
          if (
            options &&
            options.some &&
            options.some(o => o.label === newOption.label)
          ) {
            snackbar.enqueueSnackbar(
              `Tag '${newOption.label}' already exists`,
              { variant: "error" }
            )
            return false
          } else {
            return true
          }
        })

    if (newOptions.length < 1) {
      return
    }

    // console.log("tag limit: ", props.limit)
    if (props.limit.count + newOptions.length >= props.limit.max) {
      // incoming tags breach max tag limit, show warning to user
      // as we will truncate tags that exceed the limit
      snackbar.enqueueSnackbar(
        `Tag limit of ${props.limit.max} reached!`,
        { variant: "error" }
      )
    }
    if (props.limit.count >= props.limit.max) {
      // existing tag count is already at limit, return early.
      return
    }

    let limMax = props.limit.max || 10;

    if (typeof value === "object" && (value && !!value.map)) {
      setState({
        inputValue: "",
        options: [...options, ...newOptions].slice(0, limMax),
        value: [...value, ...newOptions].slice(0, limMax),
      });
      props.setTags([ ...options, ...newOptions ].slice(0, limMax))
    } else {
      setState({
        inputValue: "",
        options: [...newOptions].slice(0, limMax),
        value: [...newOptions].slice(0, limMax),
      });
      props.setTags([ newOptions ].slice(0, limMax))
    }
  };

  /////////////////////////////

  const {
    options,
    value
  } = state;

  let errorInputColor = selectErrorColor(errorMessage, touched, focused)

  React.useEffect(() => {
    // on unmount, clear keywords for Formik
    return () => {
      props.setTags([])
    }
  }, [])

  return (
    <>
      <CreatableSelect
        inputRef={ref}
        isClearable={false} // remove "x" button which clears all keywords
        isMulti
        placeholder={props.placeholder || "Enter up to 10 tags"}
        isDisabled={props.disabled}
        isLoading={props.loading}
        inputValue={state.inputValue}
        onKeyDown={throttle(onKeyDown, 32)}
        onChange={throttle(handleChange, 32)}
        onInputChange={throttle((inputValue) => {
          // logic for splitting on comma, and finding matching options
          if (inputValue && inputValue.includes(",")) {
            let inputValues = inputValue.split(',')
            handleCreate(inputValues)
          } else if (inputValue !== undefined) {
            // inputValue === "" after select+all delete
            setState(s => ({ ...s, inputValue: inputValue }));
          }
        }, 32)}
        options={options}
        value={value}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          Menu: () => null,
        }}
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
            primary25: Colors.lightPurple,
            primary: Colors.blue,
          },
          cursor: 'text',
        })}
        styles={{
          placeholder: styles => ({
            ...styles,
            fontWeight: 400,
            fontFamily: fontFam,
            color: Colors.uniswapMediumGrey,
            cursor: 'text',
          }),
          input: styles => ({
            ...styles,
            color: Colors.uniswapLightestGrey,
          }),
          control: (base, state) => ({
            ...base,
            background: Colors.uniswapMediumNavy,
            // // match with the menu
            // borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
            // // Overwrittes the different states of border
            color: Colors.uniswapLighterGrey,
            border: `1px solid ${Colors.uniswapLightNavy}`,
            // // borderColor: state.isFocused ? Colors.gradientUniswapBlue1 : "unset",
            // // Removes weird border around container
            // boxShadow: state.isFocused ? null : null,
            // "&:hover": {
            //   // Overwrittes the different states of border
            //   // borderColor: state.isFocused ? "red" : "blue"
            //   borderColors: Colors.gradientUniswapFluro1,
            // }
          }),
          indicatorSeparator: styles => ({
            ...styles,
            backgroundColor: Colors.uniswapLighterGrey,
          }),
          indicatorContainer: styles => ({
            ...styles,
            color: Colors.uniswapLighterGrey,
            cursor: "pointer",
          }),
          multiline: styles => ({
            ...styles,
            // display: 'none'
            color: Colors.cream,
          }),
          multiValue: styles => ({
            ...styles,
            // display: 'none'
            background: Colors.uniswapLighterGrey,
            color: Colors.cream,
          }),
          multiValueLabel: styles => ({
            ...styles,
            // display: 'none'
            background: Colors.uniswapLighterGrey,
            color: Colors.cream,
          }),
          multiValueRemove: styles => ({
            ...styles,
            // display: 'none'
            background: Colors.uniswapLighterGrey,
            cursor: "pointer",
            "&:hover": {
              background: Colors.red,
              color: Colors.cream,
            },
            color: Colors.cream,
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
  setTags?(arr: any[]): void;
  loading?: boolean;
  errorMessage?: string;
  touched?: boolean; // sets error colors as grey if not-touched, red if so
  disabled?: boolean;
  placeholder?: string;
  disableInitialValidationMessage?: boolean;
  validationErrorMsgStyle?: any;
  limit?: { count: number, max: number };
}
interface ReactState {
  inputValue: string;
  options: SelectOption[];
  value: SelectOption[];
}

export default withStyles(styles)( KeywordDropdownInput );







