import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
// Styles
import { Colors } from "layout/AppTheme";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import { StorePrivate, UserPrivate } from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import EditStoreForm from "./EditStoreForm";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// Redux
import { connect, useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Analytics
import { analyticsEvent } from "utils/analytics";



const EditSellerProfile = (props: ReactProps) => {

  const {
    classes,
    asModal = true,
  } = props;
  // CSS
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  // redux
  const dispatch = useDispatch();
  const sellerProfileEditModalOpen = useSelector<GrandReduxState, boolean>(
    state => option(state).reduxModals.sellerProfileEditModalOpen()
  );
  const storePrivate = useSelector<GrandReduxState, StorePrivate>(
    state => option(state).reduxLogin.user.store()
  );

  const closeEditStoreModal = () => {
    dispatch(Actions.reduxModals.TOGGLE_SELLER_PROFILE_EDIT_MODAL(false))
  }

  const openEditStoreModal = () => {
    dispatch(Actions.reduxModals.TOGGLE_SELLER_PROFILE_EDIT_MODAL(true))
  }


  // Desktop uses modal, analytics needs to watch for modal opens
  React.useEffect(() => {
    if (asModal) {
      if (sellerProfileEditModalOpen) {
        analyticsEvent("View.Store.Edit")
      }
    }
  }, [sellerProfileEditModalOpen])

  // Mobile uses checkout page, not modal. Increment view on page load
  React.useEffect(() => {
    if (!asModal) {
      analyticsEvent("View.Store.Edit")
    }
  }, [])


  if (!asModal) {
    return (
      <ErrorBounds className={clsx(
        classes.root,
        classes.asPage,
        xsDown ? classes.paddingMobile : classes.paddingDesktop,
        !smDown ? classes.minWidth500 : null,
      )}>
        <EditStoreForm
          storePrivate={storePrivate}
          closeEditStoreModal={undefined}
        />
      </ErrorBounds>
    );
  } else {
    return (
      <>
        <Dialog
          open={sellerProfileEditModalOpen}
          onClose={closeEditStoreModal}
          fullWidth={smDown}
          fullScreen={smDown}
          BackdropProps={{
            classes: {
              root: classes.modalBackdrop,
            }
          }}
          PaperProps={{
            classes: {
              root: classes.modalPaperScrollPaper
            }
          }}
          scroll={'body'}
        >
          <EditStoreForm
            storePrivate={storePrivate}
            closeEditStoreModal={closeEditStoreModal}
          />
        </Dialog>
        <Button
          variant="outlined"
          className={classes.linkButton}
          onClick={() => openEditStoreModal()}
        >
          Edit Store
        </Button>
      </>
    )
  }
}


interface ReactProps extends WithStyles<typeof styles> {
  asModal?: boolean;
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: '1rem',
    paddingTop: '2rem',
  },
  asPage: {
    border: '1px solid #eaeaea',
    borderRadius: '4px',
    backgroundColor: Colors.foregroundColor,
    boxShadow: '0px 1px 1px 0 #e6ebf1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  minWidth500: {
    minWidth: '500px',
  },
  paddingMobile: {
    padding: '2rem',
    paddingTop: '4rem',
  },
  paddingDesktop: {
    padding: '2rem',
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  modalBackdrop: {
    backgroundColor: "rgba(47, 57, 65, .85)",
  },
  modalPaperScrollPaper: {
    margin: 0,
  },
  linkButton: {
    cursor: 'pointer',
    height: 40,
    position: "relative",
    border: `1px solid ${Colors.grey}`,
    "&:hover": {
      border: `1px solid ${Colors.blue}`,
      color: Colors.blue,
    },
  },
});


export default withStyles(styles)( EditSellerProfile );





