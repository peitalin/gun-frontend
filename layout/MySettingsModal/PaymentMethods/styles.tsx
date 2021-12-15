// Styles
import { withStyles, WithStyles, createStyles, Theme, alpha } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";


export const styles = (theme: Theme) => createStyles({
  root: {
    maxWidth: "720px",
  },
  formContainer: {
    background: Colors.foregroundColor,
  },
  container: {
  },
  displaySomeVisa: {
    height: 130, // card form is 130px high.
    // must define set height for height animation
    opacity: 1,
    transition: theme.transitions.create(['height', 'opacity'], {
      easing: theme.transitions.easing.easeIn,
      duration: 100,
    }),
  },
  displayNone: {
    opacity: 0,
    height: 0,
    pointerEvents: 'none',
    transition: theme.transitions.create(['height', 'opacity'], {
      easing: theme.transitions.easing.easeIn,
      duration: 100,
    })
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    margin: '0.5rem 0rem',
  },
  link: {
    color: "#2484FF",
    cursor: 'pointer',
  },
  textField: {
    minWidth: 250,
    width: "100%",
  },
  subtitle: {
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: '1.5rem',
    marginBottom: '0.1rem',
  },
  nameOnCardInput: {
    padding: "0.6rem",
  },
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    maxHeight: "calc(100% - 32px)",
    maxWidth: '400px',
    width: '100%',
  },
  flexColModal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '2rem',
  },
  flexRowModal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2rem',
  },
  addCardContainer: {
  },
  textAlignEnd: {
    textAlign: 'end',
  },
  creditCardInputContainer: {
    margin: "0.5rem 0rem",
    border: `1px solid rgba(170, 170, 170, 0.4)`,
    background: Colors.foregroundColor,
    padding: "0.666rem 0.5rem", // matches input height for 40px
    borderRadius: "4px",
    minWidth: 250,
    width: "calc(100%)",
    '&:focus': {
      boxShadow: `${alpha('#50B5F5', 0.2)} 0 0 0 2px`,
      borderColor: Colors.blue,
      color: Colors.blue,
    },
  },
  saveCardButton: {
    minWidth: 150,
  },
});