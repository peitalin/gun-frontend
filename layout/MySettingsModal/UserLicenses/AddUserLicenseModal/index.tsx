
import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme, alpha } from "@material-ui/core/styles";
import {
  Colors,
  BoxShadows,
  BorderRadius,
  isThemeDark,
} from "layout/AppTheme";
// components
import { UserPrivate, Product } from "typings/gqlTypes";
// Material UI
import Typography from '@material-ui/core/Typography';
import Dialog from "@material-ui/core/Dialog";
// graphql
import { useMutation, useQuery } from '@apollo/client';
// components
import ButtonLoading from "components/ButtonLoading";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Snackbar
import { useSnackbar } from "notistack";
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { GrandReduxState, Actions } from 'reduxStore/grand-reducer';
import AddGunLicenseForm from './AddGunLicenseForm';



const AddUserLicenseModal: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props

  const [modalOpen, setModalOpen] = React.useState(false)

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const user = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );


  return (
    <>
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(s => false)}
        fullScreen={false}
        fullWidth={false}
        BackdropProps={{
          classes: {
            root: classes.modalBackdrop,
          }
        }}
        PaperProps={{
          classes: {
            root: mdDown
              ? classes.modalPaperScrollPaperMobile
              : classes.modalPaperScrollPaper,
          }
        }}
        scroll={"paper"}
      >
        <AddGunLicenseForm
          closeModal={() => setModalOpen(false)}
        />
      </Dialog>
      <ButtonLoading
        type="submit"
        className={props.classes.addUserLicenseModalButton}
        style={{
          ...props.buttonStyle,
        }}
        variant={"contained"}
        loadingIconColor={Colors.cream}
        replaceTextWhenLoading={true}
        // loading={loading}
        disabled={!process.browser}
        onClick={() => {
          setModalOpen(s => !s)
        }}
      >
        { props.title ? props.title : '+ Add License' }
      </ButtonLoading>
    </>
  )
};

interface ReactProps extends WithStyles<typeof styles> {
  title?: string
  disabled?: boolean
  buttonStyle?: any;
}



const styles = (theme: Theme) => createStyles({
  maxWidth: {
    maxWidth: '1160px', //
  },
  // modal classes
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaperMobile: {
    background: 'transparent',
    boxShadow: 'unset',
    margin: '0rem',
    minWidth: 360,
    overflow: "scroll", // important for dropdown
    maxHeight: "unset",
    height: '100%',
  },
  modalPaperScrollPaper: {
    background: 'transparent',
    boxShadow: 'unset',
    maxHeight: "unset",
    height: '100%',
    overflow: "scroll", // important for dropdown
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  addUserLicenseModalButton: {
    height: 40,
    width: '100%',
    maxWidth: 150,
    backgroundColor: Colors.ultramarineBlue,
    color: Colors.cream,
    "&:hover": {
      backgroundColor: alpha(Colors.ultramarineBlueDark, 0.9),
    }
  },
});


export default withStyles(styles)( AddUserLicenseModal );
