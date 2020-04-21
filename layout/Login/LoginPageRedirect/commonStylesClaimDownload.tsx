import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

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
    marginBottom: '0.5rem',
  },
  outerContainer: {
    minWidth: 330,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
    padding: '1rem 1rem 0rem 1rem',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
});


export default styles;
