import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";


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
    margin: '0rem',
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
    borderRadius: "0px 0px 4px 4px",
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
    marginTop: '0.5rem',
  },
});

export default styles;
