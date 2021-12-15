
import { alpha, Theme } from "@mui/material/styles";
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius, fontFam, Gradients, isThemeDark } from "layout/AppTheme";

const textColor = Colors.uniswapLightestGrey

export const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
  },
  width100: {
    width: '100%'
  },
  paddingBottom: {
    paddingBottom: '1rem',
  },
  optionValues: {
    height: '100%',
    flexBasis: '100%',
    marginRight: '0rem',
    fontFamily: '"Helvetica Neue",Arial,sans-serif',
    fontSize: '0.9rem',
    fontWeight: 400,
  },
  creatableSelect: {
  },
  selectMultiline: {
    padding: 0,
  },
  input: {
    position: 'relative',
    background: theme.palette.mode === "dark"
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    border: theme.palette.mode === "dark"
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    color: theme.palette.mode === "dark"
      ? Colors.uniswapLightestGrey
      : Colors.black,
    borderRadius: BorderRadius,
    fontSize: "16px",
    fontWeight: 400,
    width: '100%',
    padding: '0.75rem 0.5rem',
    transition: theme.transitions.create(['border-color', 'box-shadow'], {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
    // Use the system font instead of the default Roboto font.
    fontFamily: fontFam,
    '&:focus': {
      boxShadow: `${alpha('#50B5F5', 0.2)} 0 0 0 2px`,
      borderColor: Colors.blue,
      color: Colors.blue,
    },
  },
  emptyInput: {
    // border: `1px solid ${Colors.uniswapLightNavy}`,
    '&:focus': {
      boxShadow: `${alpha(Colors.lightGrey, 0.2)} 0 0 0 2px`,
    },
  },
  errorInputUntouched: {
    // border: `1px solid ${Colors.uniswapLightNavy}`,
    '&:focus': {
      boxShadow: `${alpha(Colors.grey, 0.2)} 0 0 0 2px`,
    },
    "&:focus-within": {
      color: `${alpha(Colors.grey, 0.1)}`,
    },
  },
  errorInput: {
    border: `1px solid ${alpha(theme.palette.error.light, 0.8)}`,
    '&:focus': {
      border: `1px solid ${theme.palette.error.light}`,
      boxShadow: `${alpha(theme.palette.error.light, 0.2)} 0 0 0 2px`,
    },
    "&:focus-within": {
      color: `${alpha(theme.palette.error.light, 0.1)}`,
    },
  },
  errorInputUnderline: {
    '&:focus': {
      border: `1px solid ${theme.palette.error.light}`,
      boxShadow: `${alpha(theme.palette.error.light, 0.2)} 0 0 0 2px`,
    },
    "&:focus-within": {
      color: `${alpha(theme.palette.error.light, 0.1)}`,
    },
  },
  // ".errorInput:focus"
  errorMessage: {
    position: 'absolute',
    right: '0.25rem',
    bottom: 0,
    height: '1rem',
    fontSize: '0.8rem',
    fontFamily: fontFam,
    // transition: theme.transitions.create('color', {
    //   easing: theme.transitions.easing.easeIn,
    //   duration: "100ms",
    // }),
    color: `${alpha(theme.palette.error.light, 0.8)}`,
    transition: theme.transitions.create(['opacity', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: "150ms",
    }),
  },
  errorMessageUntouched: {
    position: 'absolute',
    bottom: '0rem',
    right: '0.25rem',
    fontSize: '12px',
    fontFamily: fontFam,
    color: `${alpha(Colors.grey, 0.7)}`,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
  },
  errorMessageFocused: {
    color: `${alpha(Colors.lightBlue, 0.7)}`,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
  },
  errorMessageBlank: {
    position: 'absolute',
    bottom: 0,
    right: '0.5rem',
    fontSize: '0.8rem',
    fontFamily: fontFam,
    opacity: 0,
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
  },
  errorMessageText: {
    fontSize: '12px',
  },
  textFieldContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
    background: theme.palette.mode === "dark"
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    border: theme.palette.mode === "dark"
      ? `1px solid ${Colors.grey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius,
    padding: '0.58em',
    transition: theme.transitions.create(['border-color', 'box-shadow', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  textFieldContainerFocused: {
    boxShadow: `${alpha('#50B5F5', 0.2)} 0 0 0 2px`,
    borderColor: Colors.blue,
    color: theme.palette.mode === "dark"
      ? Colors.uniswapLightestGrey
      : Colors.black,
    transition: theme.transitions.create(['border-color', 'box-shadow', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  count: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    color: theme.palette.mode === "dark"
      ? Colors.uniswapLightestGrey
      : Colors.black,
  },
  countText: {
    fontSize: "0.8rem",
    fontFamily: '"Helvetica Neue",Arial,sans-serif',
    opacity: 0.25,
    position: 'absolute',
    right: '0.5rem',
    bottom: '1.25rem',
    color: theme.palette.mode === "dark"
      ? Colors.uniswapLightestGrey
      : Colors.black,
  },
  keywordsCountText: {
    fontSize: "0.8rem",
    fontFamily: '"Helvetica Neue",Arial,sans-serif',
    opacity: 0.25,
    color: theme.palette.mode === "dark"
      ? Colors.uniswapLightestGrey
      : Colors.black,
  },
  keywordsCountAbsolute: {
    position: 'absolute',
    right: '0.5rem',
    bottom: '0.25rem',
    color: theme.palette.mode === "dark"
      ? Colors.uniswapLightestGrey
      : Colors.black,
    // bottom: '-1.125rem',
  },


  inputCC: {
    position: 'relative',
    borderRadius: BorderRadius,
    fontSize: "16px",
    fontWeight: 400,
    width: '100%',
    color: theme.palette.mode === "dark"
      ? Colors.uniswapLightestGrey
      : Colors.black,
    transition: theme.transitions.create(['border-color', 'box-shadow'], {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
    // Use the system font instead of the default Roboto font.
    fontFamily: fontFam,
    '&:focus': {
      // boxShadow: `${fade('#50B5F5', 0.2)} 0 0 0 2px`,
      color: Colors.blue,
    },
    // '&:invalid': {
    //   boxShadow: `${fade(theme.palette.error.light, 0.2)} 0 0 0 1px`,
    //   borderColor: theme.palette.error.main,
    // },
  },
  textFieldContainerCC: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
    background: theme.palette.mode === "dark"
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    border: theme.palette.mode === "dark"
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius,
    padding: '0.25rem 0.5rem',
    transition: theme.transitions.create(['border-color', 'box-shadow', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  textFieldContainerCCFocused: {
    color: theme.palette.mode === "dark"
      ? Colors.uniswapLightestGrey
      : Colors.black,
    transition: theme.transitions.create(['border-color', 'box-shadow', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  creditCardInput: {
    minWidth: 150,
  },
  invalidInput: {
    color: Colors.red,
    transition: theme.transitions.create(['color'], {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  monthInput: {
    border: 'none',
    fontSize: '0.75rem',
    fontWeight: 600,
    background: theme.palette.mode === "dark"
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    color: theme.palette.mode === "dark"
      ? Colors.uniswapLightestGrey
      : Colors.black,
    '&:focus': {
      border: 'none',
      outline: 'none',
      color: theme.palette.mode === "dark"
        ? Colors.uniswapLightestGrey
        : Colors.black,
    },
    '&::placeholder': {
      color: Colors.uniswapLighterGrey,
    }
  },
  yearInputHidden: {
    border: 'none',
    display: "none",
  },
  cvcInput: {
    border: 'none',
    fontSize: '0.75rem',
    fontWeight: 600,
    background: theme.palette.mode === "dark"
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    color: Colors.uniswapLighterGrey,
    '&:focus': {
      border: 'none',
      outline: 'none',
      color: theme.palette.mode === "dark"
        ? Colors.uniswapLightestGrey
        : Colors.black,
    },
    '&::placeholder': {
      color: Colors.uniswapLighterGrey,
    }
  },
  adornedStart: {
    fontSize: "0.9rem",
    fontWeight: 400,
    fontFamily: fontFam,
    color: Colors.black,
  },
  inputUnderline: {
    position: 'relative',
    borderRadius: BorderRadius,
    fontSize: "16px",
    fontWeight: 400,
    width: '100%',
    color: textColor,
    transition: theme.transitions.create(['border-color', 'box-shadow'], {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
    // Use the system font instead of the default Roboto font.
    fontFamily: fontFam,
    '&:focus': {
      boxShadow: `${alpha('#50B5F5', 0.2)} 0 0 0 2px`,
      borderColor: Colors.blue,
      color: Colors.blue,
    },
    // '&:invalid': {
    //   boxShadow: `${fade(theme.palette.error.light, 0.2)} 0 0 0 1px`,
    //   borderColor: theme.palette.error.main,
    // },
  },
  inputUnderlineErrorFocused: {
    '& > [class*="Mui-error"]': {
      "&:after": {
        borderBottomColor: Colors.blue,
      }
    }
  },
  cssOutlinedInput: {
  },
})


