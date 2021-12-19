import React from "react";
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
// Select Component
import Select from "react-select";

import { Colors, Gradients, fontFam, BorderRadius, isThemeDark } from "layout/AppTheme";
import { useTheme } from "@material-ui/core/styles";
import { useFocus } from "utils/hooks";
import { styles } from "components/Fields/styles";
import { useSnackbar } from "notistack"



const CaliberDropdown = (props: ReactProps) => {

  const ref = React.useRef(null);
  const focused = useFocus(ref);

  const theme = useTheme();
  const isDarkMode = isThemeDark(theme)

  const {
    isMulti = false,
    isSearchable = true,
    isClearable = false,
    height = 40,
    classes,
    onChange,
    options,
    placeholder = "Select an option",
  } = props;

  // // Redux State, for UI updates
  // // Keep separate from Redux updates, which have different data structure
  // const [state, setState] = React.useState(props.initialState)
  const snackbar = useSnackbar()

  // console.log("caliber: state::::", state)

  return (
    <div className={clsx(
      classes.root,
      classes.creatableSelect,
      props.className && props.className,
    )}>
      <Select
        // inputId={props.inputId}
        value={props.state}
        onMenuOpen={props.onMenuOpen}
        onChange={(e) => {
          if (e?.length > props.itemLimit) {
            snackbar.enqueueSnackbar(
              `Cannot choose more than ${props.itemLimit}`,
              { variant: 'info'}
            )
            return
          }
          // setState(e)
          onChange(e)
        }}
        menuIsOpen={props.menuIsOpen}
        menuPlacement={props.menuPlacement ?? "auto" }
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
                : Colors.slateGreyBlack,
          }),
          placeholder: styles => ({
            ...styles,
            fontWeight: 400,
            fontFamily: fontFam,
            whiteSpace: 'nowrap',
            color: Colors.grey,
          }),
          singleValue: styles => ({
            ...styles,
            color: isDarkMode ? Colors.uniswapLighterGrey : Colors.charcoal,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: '250px',
          }),
          multiValue: styles => ({
            ...styles,
            color: isDarkMode ? Colors.cream : Colors.cream,
            backgroundColor: isDarkMode ? Colors.purple : Colors.blue,
          }),
          multiValueLabel: styles => ({
            ...styles,
            fontWeight: 500,
            color: isDarkMode ? Colors.cream : Colors.cream,
          }),
          multiValueRemove: styles => ({
            ...styles,
            cursor: "pointer",
          }),
          indicatorSeparator: styles => ({
            ...styles,
            backgroundColor: isDarkMode ? Colors.uniswapLighterGrey : Colors.slateGreyDarker,
            // display: props.hideButton ? "none" : "inherit",
            display: "none",
          }),
          indicatorsContainer: styles => ({
            ...styles,
            color: isDarkMode ? Colors.uniswapLighterGrey : Colors.charcoal,
            cursor: "pointer",
            // display: props.hideButton ? "none" : "inherit",
            display: "none",
          }),
          container: styles => ({
            ...styles,
            height: height,
            borderRadius: BorderRadius,
          }),
          menu: styles => ({
            ...styles,
            zIndex: 10,
            marginTop: '0.5rem',
            cursor: "pointer",
            "&:hover": {
              cursor: "pointer",
            },
            color: isDarkMode ? Colors.uniswapLightestGrey : Colors.charcoal,
            background: isDarkMode
              ? Colors.uniswapDarkNavy
              : Colors.cream,
            boxShadow: "unset",
            border: isDarkMode
              ? `1px solid ${Colors.uniswapGrey}`
              : `1px solid ${Colors.slateGreyDarker}`,
          }),
          menuList: styles => ({
            ...styles,
            maxHeight: '315px',
          }),
          control: (base, state) => ({
            ...base,
            cursor: "text",
            borderRadius: BorderRadius,
            height: '100%',
            background: isDarkMode
              ? Colors.uniswapDarkNavy
              : Colors.cream,
            boxShadow: "unset",
            border: isDarkMode
              ? `1px solid ${Colors.uniswapGrey}`
              : `1px solid ${Colors.slateGreyDarker}`,
          }),
          ...props.styles,
        }}
        inputRef={ref}
      />

    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  initialState: any;
  onChange(...args: any): void;
  onMenuOpen(...args: any): void;
  isMulti?: boolean;
  options: SelectOption[];
  placeholder: string;
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
  menuPlacement?: "bottom" | "top" | "auto"
  hideButton?: boolean;
  components?: any;
  itemLimit?: number;
  [key: string]: any;
}
export interface SelectOption {
  label: string;
  value: string | any;
}


export default withStyles(styles)( CaliberDropdown );