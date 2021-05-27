
import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import {
  Colors,
  BoxShadows,
  BorderRadius2x,
  BorderRadius3x,
  BorderRadius,
  isThemeDark,
  BorderRadius4x,
} from "layout/AppTheme";
import { useSelector } from "react-redux";
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
import SaveSearchPage from './SaveSearchPage';
import { GrandReduxState } from 'reduxStore/grand-reducer';



const SavedSearchModal: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props

  const [modalOpen, setModalOpen] = React.useState(false)

  const theme = useTheme();
  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(s => false)}
        fullScreen={false}
        fullWidth={mdDown}
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
        scroll={"body"}
      >
        <SaveSearchPage
          disabled={!props.searchTerm}
          searchTerm={props.searchTerm}
          categorySlug={props.categorySlug}
          caliber={props.caliber}
          dealerState={props.dealerState}
        />
      </Dialog>
      <ButtonLoading
        type="submit"
        className={props.classes.saveSearchModalButton}
        style={{
          ...props.buttonStyle,
        }}
        variant={"contained"}
        loadingIconColor={Colors.cream}
        replaceTextWhenLoading={true}
        // loading={loading}
        disabled={
          !process.browser
          || !props.searchTerm
          || !user?.id
        }
        // disabled={disabled}
        onClick={() => {
          setModalOpen(s => !s)
        }}
      >
        { !user?.id ? "Login to Save Search" : 'Save search' }
      </ButtonLoading>
    </>
  )
};

interface ReactProps extends WithStyles<typeof styles> {
  disabled?: boolean
  buttonStyle?: any;
  // args
  searchTerm: string
  categorySlug?: string
  caliber?: string
  dealerState?: string
}



const styles = (theme: Theme) => createStyles({
  root: {
    paddingTop: '1rem',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    background: 'transparent',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  maxWidth: {
    maxWidth: '1160px', //
  },
  // modal classes
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaperMobile: {
    // maxHeight: "calc(100% - 32px)",
    background: 'transparent',
    boxShadow: 'unset',
    margin: '0rem',
    borderRadius: BorderRadius4x,
    maxHeight: "100%",
    minWidth: 360,
  },
  modalPaperScrollPaper: {
    // maxHeight: "calc(100% - 32px)",
    background: 'transparent',
    boxShadow: 'unset',
    margin: '0rem',
    borderRadius: BorderRadius4x,
  },
  saveSearchModalButton: {
    height: 40,
    width: '100%',
    maxWidth: 180,
    borderRadius: BorderRadius3x,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.purple
      : Colors.ultramarineBlue,
    color: Colors.cream,
    "&:hover": {
      backgroundColor: theme.palette.type === 'dark'
        ? fade(Colors.purple, 0.9)
        : fade(Colors.blue, 0.9),
    }
  },
});


export default withStyles(styles)( SavedSearchModal );
