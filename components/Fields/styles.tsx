
import {
  fade,
  withStyles, WithStyles,
  createStyles, makeStyles, createMuiTheme,
  Theme,
} from "@material-ui/core/styles";
import { Colors, BorderRadius, fontFam } from "layout/AppTheme";


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
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${Colors.mediumLightGrey}`,
    borderRadius: BorderRadius,
    fontSize: "16px",
    fontWeight: 400,
    width: '100%',
    padding: '0.75rem 0.5rem',
    color: Colors.charcoal,
    transition: theme.transitions.create(['border-color', 'box-shadow'], {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
    // Use the system font instead of the default Roboto font.
    fontFamily: fontFam,
    '&:focus': {
      boxShadow: `${fade('#50B5F5', 0.2)} 0 0 0 2px`,
      borderColor: Colors.blue,
      // color: Colors.blue,
      color: Colors.charcoal,
    },
    // '&:invalid': {
    //   boxShadow: `${fade(theme.palette.error.light, 0.2)} 0 0 0 1px`,
    //   borderColor: theme.palette.error.main,
    // },
  },
  emptyInput: {
    border: `1px solid ${Colors.mediumLightGrey}`,
    '&:focus': {
      boxShadow: `${fade(Colors.lightGrey, 0.2)} 0 0 0 2px`,
    },
  },
  errorInputUntouched: {
    border: `1px solid ${Colors.mediumLightGrey}`,
    '&:focus': {
      boxShadow: `${fade(Colors.grey, 0.2)} 0 0 0 2px`,
    },
    "&:focus-within": {
      color: `${fade(Colors.grey, 0.1)}`,
    },
  },
  errorInput: {
    border: `1px solid ${fade(theme.palette.error.light, 0.4)}`,
    '&:focus': {
      border: `1px solid ${theme.palette.error.light}`,
      boxShadow: `${fade(theme.palette.error.light, 0.2)} 0 0 0 2px`,
    },
    "&:focus-within": {
      color: `${fade(theme.palette.error.light, 0.1)}`,
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
    color: `${fade(theme.palette.error.light, 0.7)}`,
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
    color: `${fade(Colors.grey, 0.7)}`,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
  },
  errorMessageFocused: {
    color: `${fade(Colors.lightBlue, 0.7)}`,
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
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${Colors.grey}`,
    borderRadius: BorderRadius,
    padding: '0.58em',
    transition: theme.transitions.create(['border-color', 'box-shadow', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  textFieldContainerFocused: {
    boxShadow: `${fade('#50B5F5', 0.2)} 0 0 0 2px`,
    borderColor: Colors.blue,
    color: Colors.charcoal,
    transition: theme.transitions.create(['border-color', 'box-shadow', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  count: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  countText: {
    fontSize: "0.8rem",
    fontFamily: '"Helvetica Neue",Arial,sans-serif',
    opacity: 0.25,
    position: 'absolute',
    right: '0.5rem',
    bottom: '1.25rem',
  },
  keywordsCountText: {
    fontSize: "0.8rem",
    fontFamily: '"Helvetica Neue",Arial,sans-serif',
    opacity: 0.25,
  },
  keywordsCountAbsolute: {
    position: 'absolute',
    right: '0.5rem',
    bottom: '0.25rem',
    // bottom: '-1.125rem',
  },


  inputCC: {
    position: 'relative',
    borderRadius: BorderRadius,
    fontSize: "16px",
    fontWeight: 400,
    width: '100%',
    color: Colors.charcoal,
    transition: theme.transitions.create(['border-color', 'box-shadow'], {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
    // Use the system font instead of the default Roboto font.
    fontFamily: fontFam,
    '&:focus': {
      // boxShadow: `${fade('#50B5F5', 0.2)} 0 0 0 2px`,
      color: Colors.charcoal,
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
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${Colors.mediumLightGrey}`,
    borderRadius: BorderRadius,
    padding: '0.25rem 0.5rem',
    transition: theme.transitions.create(['border-color', 'box-shadow', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  textFieldContainerCCFocused: {
    color: Colors.charcoal,
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
    '&:focus': {
      border: 'none',
      outline: 'none',
      color: Colors.charcoal,
    },
    '&::placeholder': {
      color: Colors.mediumLightGrey,
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
    '&:focus': {
      border: 'none',
      outline: 'none',
      color: Colors.charcoal,
    },
    '&::placeholder': {
      color: Colors.mediumLightGrey,
    }
  },
})


