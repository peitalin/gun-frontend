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
    marginTop: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: 400,
  },
  creatableSelect: {
    paddingBottom: '1rem',
  },
  selectMultiline: {
    padding: 0,
  },
  input: {
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${Colors.grey}`,
    borderRadius: BorderRadius,
    fontSize: "0.875rem",
    fontWeight: 400,
    width: '100%',
    padding: '0.58em',
    color: "#222",
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
    border: `1px solid ${Colors.lightPurple}`,
    '&:focus': {
      boxShadow: `${fade(Colors.lightPurple, 0.2)} 0 0 0 2px`,
      borderColor: Colors.purple,
    },
  },
  errorInputUntouched: {
    border: `1px solid ${fade(Colors.grey, 0.4)}`,
    '&:focus': {
      border: `1px solid ${Colors.grey}`,
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
    bottom: 0,
    right: '0.25rem',
    height: '1rem',
    fontSize: '0.8rem',
    fontFamily: fontFam,
    color: `${fade(theme.palette.error.light, 0.6)}`,
    // transition: theme.transitions.create('color', {
    //   easing: theme.transitions.easing.easeIn,
    //   duration: "100ms",
    // }),
  },
  errorMessageUntouched: {
    position: 'absolute',
    bottom: 0,
    right: '0.25rem',
    fontSize: '0.8rem',
    fontFamily: fontFam,
    color: `${fade(Colors.grey, 0.7)}`,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
  },
  errorMessageFocused: {
    color: `${fade(Colors.purple, 0.9)}`,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
  },
  errorMessageBlank: {
    position: 'absolute',
    bottom: 0,
    right: '0.25rem',
    fontSize: '0.8rem',
    fontFamily: fontFam,
    opacity: 0,
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
    right: '0.25rem',
    bottom: '1rem',
  },
  keywordsCountText: {
    fontSize: "0.8rem",
    fontFamily: '"Helvetica Neue",Arial,sans-serif',
    opacity: 0.25,
  },
  keywordsCountAbsolute: {
    position: 'absolute',
    right: '0.25rem',
    bottom: 0,
    // bottom: '-1.125rem',
  },
})
