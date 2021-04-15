import { createStyles, Theme, fade } from "@material-ui/core/styles";
import { fontFam, Colors, BoxShadows, BorderRadius } from "layout/AppTheme";


export const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    height: '100%',
    minHeight: 'calc(100vh - 32px)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rootSm: {
    flexGrow: 1,
    height: '100%',
    minHeight: 'calc(100vh - 32px)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: '4rem',
  },
  maxWidth: {
    maxWidth: 600,
    width: '100%',
  },
  maxWidth500: {
    maxWidth: 500,
    width: '100%',
  },
  pageMargin: {
    margin: '0rem',
    paddingTop: '0rem',
    paddingBottom: '0rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  modalMargin: {
    margin: '0rem',
    paddingTop: '5rem',
    paddingBottom: '3rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
  title: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  orderTitle: {
    marginBottom: '2rem',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  button: {
    margin: 0,
  },
  formContainer: {
    position: 'relative',
    marginBottom: "0.5rem",
    paddingBottom: '1rem',
  },
  container: {
    marginBottom: "0.5rem",
  },
  formGroup: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dense: {
    marginTop: 0,
  },
  imageContainer: {
    width: "50%",
    height: "50%",
  },
  menu: {
    width: 200,
  },
  discountContainer: {
    marginTop: '0.5rem',
    marginRight: '0.5rem',
  },
  textField: {
    width: "100%",
    marginBottom: '1rem',
    "&:focus-within": {
      color: '#24A4FF',
    },
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  flexCol: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  flexCol50: {
    flexBasis: '40%',
    flexGrow: 1,
    margin: '0.5rem',
  },
  flexEnd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  flexItem: {
    flexGrow: 1,
    flexBasis: '20%',
  },
  variantCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionValues: {
    flexBasis: '100%',
    marginRight: '0rem',
    fontFamily: '"Segoe UI","Helvetica Neue",Arial,sans-serif',
    marginTop: '0.5rem',
  },
  errorMessage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontSize: '0.8rem',
    color: `${fade(theme.palette.error.light, 0.6)}`,
    fontFamily: fontFam,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  positionRelative: {
    position: 'relative',
  },
  storeLogin: {
    position: "relative",
    margin: '1rem 0rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  storeLogin2: {
    position: "relative",
    margin: '1rem 0rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Buttons
  flexButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: '100%',
    marginTop: "2rem",
  },
  flexButtonItem: {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexGrow: 1,
    flexBasis: '30%',
    maxWidth: '150px',
  },
  flexButtonSpacer: {
    marginBottom: '1rem',
    justifyContent: 'center',
    flexGrow: 1,
    flexBasis: '5%',
  },
  formIncomplete: {
    color: "#ccc",
    textAlign: "center",
  },
  policyBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: '100%',
  },
  policy: {
    width: 'calc(100% - 4rem)',
    marginBottom: '2rem',
  },
  createProductButtonContainer: {
    display: "flex",
    flexDirection: "column",
  },
  uploaderSwitcherTitle: {
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  titleDim: {
    color: Colors.darkGrey,
  },
})














