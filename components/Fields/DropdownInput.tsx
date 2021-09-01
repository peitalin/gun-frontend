import React from "react";
import clsx from "clsx";
import { withStyles, WithStyles, fade } from "@material-ui/core/styles";
// Select Component
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import { Colors, Gradients, fontFam, BorderRadius, isThemeDark } from "layout/AppTheme";
import { useTheme } from "@material-ui/core/styles";
import { useFocus } from "utils/hooks";
import { styles } from "components/Fields/styles";
import ValidationErrorMsg from "./ValidationErrorMsg";
import { useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
import { useSnackbar } from "notistack"



const DropdownInput = (props: ReactProps) => {

  const ref = React.useRef(null);
  const focused = useFocus(ref);

  const isDarkMode = useSelector<GrandReduxState, boolean>(s => {
    return s.reduxLogin.darkMode === 'dark'
  })

  const theme = useTheme();

  const {
    // Formik
    errorMessage,
    touched = false,
    disableInitialValidationMessage = false,
    // CreatableSelect
    creatable = false,
    isMulti = false,
    isSearchable = true,
    isClearable = false,
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
  const [state, setState] = React.useState(props.initialState)
  const snackbar = useSnackbar()


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
              console.log('e: "', e)
              if (e?.length > props.itemLimit) {
                snackbar.enqueueSnackbar(
                  `Cannot choose more than ${props.itemLimit}`,
                  { variant: 'info'}
                )
                return
              }
              setState(e)
              onChange(e)
            }}
            menuIsOpen={props.menuIsOpen}
            menuPlacement="auto"
            options={options}
            placeholder={placeholder}
            isMulti={isMulti}
            isSearchable={isSearchable}
            isClearable={isClearable}
            isLoading={props.loading}
            menuPortalTarget={props.menuPortalTarget}
            autoComplete={
              props.disableAutocomplete
              ? "new-password"
              : undefined
            } // this disables autofill
            className={classes.optionValues}
            classes={{
              input: clsx(
                classes.input,
                errorInputColor === "red" ? classes.errorInput : null,
                errorInputColor === "grey" ? classes.errorInputUntouched : null,
              ),
              multiline: classes.selectMultiline,
            }}
            components={props.components}
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
                    color: props.hideCursor
                      ? 'transparent'
                      : isThemeDark(theme)
                        ? Colors.uniswapLightGrey
                        : Colors.slateGreyBlack
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
                    color: isDarkMode ? Colors.uniswapLightestGrey : Colors.charcoal,
                    background: isDarkMode
                      ? Colors.uniswapMediumNavy
                      : Colors.slateGrey,
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
              // console.log('e: "', e)
              if (e?.length > props.itemLimit) {
                snackbar.enqueueSnackbar(
                  `Cannot choose more than ${props.itemLimit}`,
                  { variant: 'info'}
                )
                // setState(e.slice(0, props.itemLimit))
                // onChange(e.slice(0, props.itemLimit))
                return
              }
              setState(e)
              onChange(e)
            }}
            menuIsOpen={props.menuIsOpen}
            menuPlacement="auto"
            options={options}
            placeholder={placeholder}
            isMulti={isMulti}
            isSearchable={isSearchable}
            isClearable={isClearable}
            isLoading={props.loading}
            menuPortalTarget={props.menuPortalTarget}
            autoComplete={
              props.disableAutocomplete
              ? "new-password"
              : undefined
            } // this disables autofill
            className={classes.optionValues}
            classes={{
              input: clsx(
                classes.input,
                errorInputColor === "red" ? classes.errorInput : null,
                errorInputColor === "grey" ? classes.errorInputUntouched : null,
              ),
              multiline: classes.selectMultiline,
            }}
            components={props.components}
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
                  : isThemeDark(theme)
                    ? Colors.uniswapLightGrey
                    : Colors.slateGreyBlack
              }),
              placeholder: styles => ({
                ...styles,
                fontWeight: 400,
                fontFamily: fontFam,
                whiteSpace: 'nowrap',
                color: Colors.grey,
              }),
              singleValue: styles => ({
                color: isDarkMode ? Colors.uniswapLighterGrey : Colors.charcoal,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: '250px',
              }),
              indicatorSeparator: styles => ({
                ...styles,
                backgroundColor: isDarkMode ? Colors.uniswapLighterGrey : Colors.slateGreyDarker,
                display: props.hideButton ? "none" : "inherit",
              }),
              indicatorsContainer: styles => ({
                ...styles,
                color: isDarkMode ? Colors.uniswapLighterGrey : Colors.charcoal,
                cursor: "pointer",
                display: props.hideButton ? "none" : "inherit",
              }),
              container: styles => ({
                ...styles,
                height: height,
                borderRadius: BorderRadius,
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
                  ? Colors.uniswapMediumNavy
                  : Colors.slateGrey,
              }),
              control: (base, state) => ({
                ...base,
                background: isDarkMode
                  ? Colors.uniswapMediumNavy
                  : Colors.slateGrey,
                // // match with the menu
                cursor: "text",
                borderRadius: BorderRadius,
                height: '100%',
                border: isDarkMode
                  ? `1px solid ${Colors.uniswapMediumGrey}`
                  : `1px solid ${Colors.slateGreyDarker}`,
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
  initialState: any;
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
  disableAutocomplete?: boolean;
  menuPortalTarget?: any;
  menuIsOpen?: any;
  hideButton?: boolean;
  components?: any;
  itemLimit?: number;
  [key: string]: any;
}
export interface SelectOption {
  label: string;
  value: string | any;
}


export default withStyles(styles)( DropdownInput );