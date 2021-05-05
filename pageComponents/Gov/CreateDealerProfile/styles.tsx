import { createStyles, Theme } from "@material-ui/core/styles";
import { Colors, Gradients, BoxShadows, BorderRadius2x, BorderRadius } from "layout/AppTheme";


export const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  formRoot: {
    minWidth: '350px',
    maxWidth: '540px',
  },
  formBordersDesktop: {
    width: '100%',
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : 'unset',
    border: theme.palette.type === 'dark'
      ? 'unset'
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius2x,
  },
  formBordersMobile: {
    background: 'transparent',
    boxShadow: 'unset',
    border: 'unset',
  },
  maxWidth720: {
    width: '100%',
    maxWidth: 720,
  },
  container: {
    marginBottom: "1rem",
  },
  button: {
    padding: '0.5rem 1rem',
    height: 40,
    width: '100%',
    borderRadius: BorderRadius,
  },
  buttonText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: Colors.cream,
    fontSize: "0.875rem",
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: "0.9rem",
    fontWeight: 600,
    marginBottom: '0.5rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black,
  },
  subtitle2: {
    fontSize: "0.8rem",
    fontWeight: 500,
    marginBottom: '0.25rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black,
    marginTop: "0.25rem",
  },
  subtitle3: {
    fontSize: "0.7rem",
    fontWeight: 500,
    marginBottom: '0.5rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black,
  },
  subtitle4: {
    fontSize: "0.7rem",
    fontWeight: 500,
    marginBottom: '0.5rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black,
    marginTop: "0.5rem",
  },
  formGroup: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paperMarginDesktop: {
    margin: '0rem',
    padding: '4rem',
    width: '100%',
  },
  paperMarginMobile: {
    margin: '0rem',
    padding: '1rem',
    width: '100%',
  },
  dropDown: {
    zIndex: 1,
    width: "100%",
    "&:focus-within": {
      color: '#24A4FF',
    },
  },
  textField: {
    width: "100%",
    "&:focus-within": {
      color: '#24A4FF',
    },
  },
  spacer: {
    padding: '1rem',
  },
  padding1: {
    padding: '1rem',
  },
  padding2: {
    padding: '0rem 1rem 1rem 1rem',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  flexColMargin: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
    width: '100%',
  },
  flexItem: {
    flexGrow: 1,
    flexBasis: '20%',
  },
  flexButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  flexButtonItem: {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexGrow: 1,
    flexBasis: '30%',
  },
  margin1: {
    margin: '0.75rem 0rem',
    width: '100%',
  },
  marginTop2: {
    marginTop: '2rem',
  },
  uploadContainer: {
    marginBottom: '1rem',
    width: '100%',
  },
  link: {
    color: Colors.blue,
    "&:hover": {
      cursor: "pointer",
      color: Colors.lightBlue,
    },
    marginTop: '0.5rem',
  },
  bioLength: {
    fontSize: '0.8rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black,
  },
  avatarSignin: {
    margin: theme.spacing(1),
    color: '#fff',
  },
  accountCreatedRoot: {
    // height: '100%',
    overflow: 'hidden',
  },
  linkContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  url: {
    marginLeft: '0.2rem',
  },
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    height: 'unset',
  },
  loginContainer: {
    paddingTop: '4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column",
    maxWidth: 400,
  },
  storeExists: {
    marginBottom: '1rem',
  },
  loggedInText: {
    color: Colors.charcoal,
    marginRight: '0.25rem',
  },
  loggedInEmail: {
    color: Colors.charcoal,
    marginRight: '1rem',
    fontWeight: 600,
  },
  logout: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    fontSize: '0.9rem',
    marginRight: '1rem',
    marginTop: '0.5rem',
    fontWeight: 600,
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
  },

  innerRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: "0.5rem",
    width: '100%',
    maxWidth: 400,
  },
  width100: {
    width: '100%',
    position: 'relative',
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: '1rem',
  },
  title2: {
    fontSize: "1.1rem",
    fontWeight: 600,
    marginTop: '1.5rem',
    marginBottom: '0.5rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.charcoal,
  },
  // avatar image
  greyText: {
    color: theme.palette.type === 'dark'
      ? Colors.uniswapGrey
      : Colors.slateGreyDarkest,
  },
  redText: {
    color: Colors.lightRed,
    maxHeight: '1rem',
  },
  marginBottomHalf: {
    marginBottom: '0.5rem',
  },
  backButton: {
  },
})














