import { createStyles, Theme } from "@material-ui/core/styles";
import { Colors, Gradients, BoxShadows, BorderRadius2x } from "layout/AppTheme";


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
    background: Colors.uniswapDarkNavy,
    boxShadow: BoxShadows.shadow1.boxShadow,
    borderRadius: BorderRadius2x,
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
    marginBottom: '0.25rem',
    color: Colors.uniswapLightestGrey,
  },
  subtitle2: {
    fontSize: "0.8rem",
    fontWeight: 500,
    marginBottom: '0.25rem',
    color: Colors.uniswapLightestGrey,
    marginTop: "0.25rem",
  },
  subtitle3: {
    fontSize: "0.7rem",
    fontWeight: 500,
    marginBottom: '0.5rem',
    color: Colors.uniswapLighterGrey,
  },
  subtitle4: {
    fontSize: "0.7rem",
    fontWeight: 500,
    marginBottom: '0.5rem',
    color: Colors.uniswapLighterGrey,
    marginTop: "0.5rem",
  },
  formGroup: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paperMargin: {
    margin: '0rem',
    padding: '4rem',
    width: '100%',
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
    color: Colors.uniswapLighterGrey,
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
    backgroundColor: "rgba(47, 57, 65, .85)",
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
  // avatar image
  avatarErrorMsg: {
    position: "absolute", // nested under width100 position: relative
    bottom: '1rem',
  },
  // avatar outline circle
  avatar: {
    width: 90,
    height: 90,
    border: "1px solid #fafafa",
    boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.5)",
    marginTop: '1rem',
    marginBottom: '0.5rem',
  },
  avatarEdit: {
    transform: "scale(1.2)",
    transition: theme.transitions.create('transform, border', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
    border: "3px solid #fafafa",
    marginBottom: "1.5rem",
    "&:hover": {
      border: "3px solid #24A4FF",
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      }),
    }
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
    color: Colors.uniswapLighterGrey,
  },
  // avatar image
  greyText: {
    color: Colors.uniswapLighterGrey,
  },
  redText: {
    color: Colors.lightRed,
    maxHeight: '1rem',
  },
  addItemButtonLi: {
    marginBottom: '1rem',
  },
  addItemButton: {
    padding: "0.5rem 1rem",
    marginBottom: "0.25rem",
  },
  addItemButtonText: {
    textAlign: 'center',
  },
  storeNameCopyContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '1rem',
    width: '100%',
    maxWidth: 400,
  },
  storeNameCopyButton: {
    borderRadius: '0px 4px 4px 0px',
    borderTop: '1px solid rgba(36, 132, 255, 0.7)',
    borderRight: '1px solid rgba(36, 132, 255, 0.7)',
    borderBottom: '1px solid rgba(36, 132, 255, 0.7)',
    borderLeft: '1px solid rgba(36, 132, 255, 0.7)',
    color: "rgba(36, 132, 255, 0.8)",
    backgroundColor: "rgba(36, 132, 255, 0.1)",
  },
  storeNameCopy: {
    width: '100%',
    height: 35,
    fontSize: '0.9rem',
    color: Colors.grey,
    border: '1px solid #ced4da',
    borderRight: '0px solid rgba(36, 132, 255, 0.7)',
    borderRadius: '4px 0px 0px 4px',
    padding: '0rem 0.5rem',
    outline: 'none',
  },
  marginBottomHalf: {
    marginBottom: '0.5rem',
  },
})














