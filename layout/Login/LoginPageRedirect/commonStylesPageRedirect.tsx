import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, isThemeDark } from "layout/AppTheme";

const styles = (theme: Theme) => createStyles({
  loginRoot: {
    width: '100%',
  },
  cssMediaQuery: {
    width: '100%',
  },
  dialogPaperFull: {
    width: "calc(100% - 0.5rem)",
  },
  dialogPaper: {
    margin: '1rem',
  },
  modal: {
    position: "fixed",
    zIndex: 100,
    bottom: "20px",
    right: "20px",
  },
  flexRowEnd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: '100%',
  },
  textInput: {
    width: "100%",
    marginBottom: '0.75rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
  },
  outerContainer: {
    minWidth: 330,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: '2rem',
  },
  preHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  loginButton: {
    width: '100%',
  },
  link: {
    color: "#2484FF",
    cursor: 'pointer',
  },
  title: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  subtitle: {
    marginBottom: '0.25rem',
    width: '100%',
    fontWeight: 600,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "1rem",
    borderRadius: "0px 0px 4px 4px",
  },
  avatar: {
    margin: '1rem',
    backgroundColor: theme.palette.secondary.main,
  },
  avatarSignin: {
    margin: '1rem',
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
  },
  avatarSignup: {
    margin: '1rem',
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    // padding: '1rem 1rem 0rem 1rem',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  submit: {
    marginTop: '0.5rem',
    padding: '8px',
    width: '100%',
    height: 40,
  },
  secureCheckout: {
    color: "#bbbbbb",
  },
  secureCheckoutIcon: {
    color: "#bbbbbb",
    height: '0.8rem',
    width: '0.8rem',
    marginRight: "0.1rem",
  },
  passwordResetSubtitle: {
  },
  clearButton: {
    position: 'absolute',
    right: '1.5rem',
    top: '1.5rem',
  },
  alreadyHaveAccountText:{
    fontWeight: 600,
  },
  termsText:{
    marginTop: '1rem',
    fontWeight: 500,
  },
  marginTop1: {
    marginTop: "1rem",
  },
  fieldHeading: {
    width: '100%',
    fontWeight: 600,
    lineHeight: '1.5rem',
  },
  textField: {
    width: "100%",
    "&:focus-within": {
      color: '#24A4FF',
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
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
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
