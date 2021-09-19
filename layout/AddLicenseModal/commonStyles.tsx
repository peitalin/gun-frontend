import { withStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius4x, BorderRadius, Colors, isThemeDark } from "layout/AppTheme";

const emailInputMaxWidth = 350;


const styles = (theme: Theme) => createStyles({
  loginRoot: {
    width: '100%',
  },
  cssMediaQuery: {
    width: '100%',
  },
  dialogPaperFull: {
    width: "100%",
  },
  dialogPaper: {
    borderRadius: `${BorderRadius4x}px`,
  },
  modal: {
    position: "fixed",
    zIndex: 100,
    bottom: "20px",
    right: "20px",
  },
  outerContainer: {
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    marginTop: '2rem',
    margin: '1rem',
    color: theme.palette.type === 'dark'
      ? `${Colors.uniswapLightGrey}`
      : `${Colors.uniswapGrey}`,
  },
  subtitle: {
    marginBottom: '0.25rem',
    width: '100%',
  },
  preHeader: {
    marginBottom: "1rem",
    marginTop: "1rem",
  },
  loginButton: {
    // cursor: 'pointer',
    width: "100%",
  },
  marginRightHalf: {
    marginRight: '0.5rem',
  },
  link: {
    color: Colors.blue,
    "&:hover": {
      color: Colors.lightBlue,
    },
    cursor: 'pointer',
    margin: '0rem 0.2rem',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "2rem",
    backgroundColor: theme.palette.type === 'dark'
      ? theme.colors.uniswapDarkNavy
      : theme.colors.darkWhite,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  avatarSignin: {
    margin: theme.spacing(1),
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
  },
  avatarSignup: {
    margin: theme.spacing(1),
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
  },
  checkBox: {
    fontSize: "0.8rem",
    fontWeight: 400,
    lineHeight: "1rem",
  },
  form: {
    // width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    minWidth: '320px',
  },
  submit: {
    marginTop: theme.spacing(1),
    height: 40,
    borderRadius: BorderRadius,
  },
  labelBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  secureCheckoutIcon: {
    height: '0.8rem',
    width: '0.8rem',
    marginRight: "0.1rem",
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
  },
  marginBottom: {
    marginBottom: '1rem',
  },
  passwordResetSubtitle: {
    maxWidth: 400,
  },
  termsText: {
    lineHeight: '1rem',
    marginTop: '0.5rem',
  },
  clearButton: {
    position: 'absolute',
    right: '1.5rem',
    top: '1.5rem',
  },
  dontHaveAccount: {
    color: theme.palette.type === 'dark'
      ? `${Colors.uniswapLightGrey}`
      : `${Colors.uniswapGrey}`,
    marginTop: '0.5rem',
  },
  // for mobile menu, unlogged in user
  mobileMenuFlexitem: {
    flexGrow: 1,
    flexBasis: '40%',
    width: '100%',
    borderRadius: BorderRadius,
  },
  mobileMenuItemRoot: {
    minHeight: '0rem',
    padding: "0.5rem 1.25rem",
  },
  textInputRoot: {
    backgroundColor: Colors.white,
    borderRadius: '4px',
    // marginLeft: '0.5rem',
    // marginRight: '0.5rem',
    marginBottom: '0.5rem',
    width: '100%',
    maxWidth: emailInputMaxWidth,
    // height: 40,
  },
  textInputInput: {
    backgroundColor: Colors.white,
    // height: 40,
    padding: '0.72rem',
    borderRadius: '4px',
    fontSize: '1rem',
    minWidth: 220,
  },
  textFocused: {
    outline: 'none',
  },
  maxWidthEmailPrefillButton: {
    maxWidth: emailInputMaxWidth,
  },
  maxWidthEmailPrefillButtonSm: {
    maxWidth: emailInputMaxWidth,
  },
  emailPrefillFlexCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    width: "100%",
    "&:focus-within": {
      color: '#24A4FF',
    },
  },
  fieldHeading: {
    fontWeight: 600,
    lineHeight: '1.5rem',
    marginTop: '1rem',
    marginBottom: '0.1rem',
  },
  datePickButton: {
    width: "100%",
    borderRadius: BorderRadius,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.ultramarineBlue}`
      : `1px solid ${Colors.ultramarineBlue}`,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.ultramarineBlue
      : Colors.ultramarineBlue,
    color: theme.palette.type === 'dark'
      ? Colors.slateGrey
      : Colors.cream,
    "&:hover": {
      // backgroundColor: theme.palette.type === 'dark'
      //   ? Colors.uniswapMediumNavy
      //   : Colors.slateGreyDark,
      // border: theme.palette.type === 'dark'
      //   ? `1px solid ${Colors.uniswapLighterGrey}`
      //   : `1px solid ${Colors.slateGreyDarkest}`,
      border: theme.palette.type === 'dark'
        ? `1px solid ${Colors.ultramarineBlue}`
        : `1px solid ${Colors.ultramarineBlue}`,
      backgroundColor: theme.palette.type === 'dark'
        ? Colors.ultramarineBlue
        : Colors.ultramarineBlue,
    },
  },
  miniTitle: {
    fontSize: '1rem',
    fontWeight: 500,
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
    marginTop: '2rem',
  },
  dateLabel: {
    "& button > span > svg": {
      fill: isThemeDark(theme)
        ? Colors.uniswapLightGrey
        : Colors.slateGreyBlack,
      "&:hover": {
        fill: isThemeDark(theme)
          ? Colors.ultramarineBlue
          : Colors.ultramarineBlue,
      }
    }
  },
  dateInput: {
    fontSize: '0.9rem',
  },
  phoneNumberContainer: {
    position: "relative",
    width: '100%',
    marginTop: "0.5rem",
    "& > div": {
      width: '100%',
    }
  },
  helpIcon: {
    position: "absolute",
    right: '0rem',
    top: '0rem',
    cursor: "pointer"
  },
});

export default styles;
