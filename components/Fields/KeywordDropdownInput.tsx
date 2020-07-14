import React from "react";
import CreatableSelect from "react-select/creatable";
// styles
import clsx from "clsx";
import { styles } from "components/Fields/styles";
import { Colors, fontFam } from "layout/AppTheme";
import { withStyles, WithStyles } from "@material-ui/core/styles";
// focus
import { useFocus } from "utils/hooks";
import ValidationErrorMsg from "./ValidationErrorMsg";
import SnackBarA from "components/Snackbars/SnackbarA";
/// Debounce
const throttle = require('lodash.throttle');
const debounce = require('lodash.debounce');



const KeywordDropdownInput = (props: ReactProps) => {

  const ref = React.useRef();
  const focused = useFocus(ref);

  const {
    errorMessage,
    touched = false,
    disabled = false,
    disableInitialValidationMessage = false,
    classes,
    ...rest
  } = props;

  const [state, setState] = React.useState<ReactState>({
    inputValue: "",
    options: props.initialTags || [],
    value: props.initialTags || [],
  })
  const [displayErr, setDisplayErr] = React.useState("")

  const onKeyDown = (e) => {
    e.persist()
    if (
      e.keyCode === 188 // if key is comma,
      || e.keyCode === 13 // or enter
      || e.keyCode === 32 // or space
    ) {

      e.preventDefault();
      if (state.inputValue !== "") {
        handleCreate(state.inputValue);
      }

    } else if (
      ((e.keyCode < 91) && (e.keyCode > 47))  // a-z 0-9
      || (e.keyCode > 95 && e.keyCode < 106)  // numpad numbers
      || e.keyCode === 189 // dash
    ) {

      setState(s => ({ ...s, inputValue: state.inputValue + e.key }));

    } else if (e.keyCode === 8) {

      // backspace
      setState(s => ({ ...s, inputValue: state.inputValue.slice(0,-1) }));

    } else {
      // ignore other keyCodes
    }
    // console.log(state.inputValue, e.key, state.inputValue + e.key);
  };

  const handleChange = (newValue: any, actionMeta: any) => {
    // console.log('new value', newValue)
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

  const handleCreate = (inputValue: any) => {

    if (props.limit.count >= props.limit.max) {
      console.log("tag limit reached!: ", props.limit)
      return
    }

    const { options, value } = state;
    const newOption = createOption(inputValue);

    if (
      options &&
      options.some &&
      options.some(o => o.label === newOption.label)
    ) {
      setDisplayErr(`Tag '${newOption.label}' already exists`)
      return
    }

    if (typeof value === "object" && (value && !!value.map)) {
      setState({
        inputValue: "",
        options: [...options, newOption],
        value: [...value, newOption]
      });
      props.setTags([ ...options, newOption ])
    } else {
      setState({
        inputValue: "",
        options: [newOption],
        value: [newOption]
      });
      props.setTags([ newOption ])
    }
  };

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
        onCreateOption={throttle(handleCreate, 32)}
        options={options}
        value={value}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          Menu: () => null,
        }}
        className={classes.optionValues}
        classes={{
          input: classes.input,
          root: clsx(
            classes.textFieldContainer,
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
          cursor: 'text',
        })}
        styles={{
          placeholder: styles => ({
            ...styles,
            fontWeight: 400,
            fontFamily: fontFam,
            color: Colors.grey,
            cursor: 'text',
          }),
          // multiValueRemove: styles => ({
          //   ...styles,
          //   display: 'none'
          // })
        }}
      />

      <ValidationErrorMsg
        touched={touched}
        focused={focused}
        errorMessage={errorMessage}
        disableInitialValidationMessage={disableInitialValidationMessage}
      />

      <SnackBarA
        open={!!displayErr}
        closeSnackbar={() => setDisplayErr("")}
        message={displayErr}
        variant={"info"}
        autoHideDuration={4000}
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
  limit?: { count: number, max: number };
}
interface ReactState {
  inputValue: string;
  options: SelectOption[];
  value: SelectOption[];
}

export default withStyles(styles)( KeywordDropdownInput );







