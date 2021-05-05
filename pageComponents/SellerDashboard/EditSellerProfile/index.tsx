import React from "react";
import clsx from "clsx";
// Styles
import { Colors, BorderRadius, BorderRadius2x, BoxShadows } from "layout/AppTheme";
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
import ResponsivePadding from "../ResponsivePadding";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// Redux
import { connect, useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";



const EditSellerProfile = (props: ReactProps) => {

  const {
    classes,
    asModal = true,
  } = props;
  // CSS
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const md = useMediaQuery(theme.breakpoints.only('md'))
  const lg = useMediaQuery(theme.breakpoints.only('lg'))
  const xlUp = useMediaQuery(theme.breakpoints.up('xl'))

  // redux
  const dispatch = useDispatch();
  const sellerProfileEditModalOpen = useSelector<GrandReduxState, boolean>(
    state => state?.reduxModals?.sellerProfileEditModalOpen
  );
  const storePrivate = useSelector<GrandReduxState, StorePrivate>(
    state => state?.reduxLogin?.user?.store
  );

  const closeEditStoreModal = () => {
    dispatch(Actions.reduxModals.TOGGLE_SELLER_PROFILE_EDIT_MODAL(false))
  }

  const openEditStoreModal = () => {
    dispatch(Actions.reduxModals.TOGGLE_SELLER_PROFILE_EDIT_MODAL(true))
  }


  if (!asModal) {
    return (
      <ResponsivePadding>
        <ErrorBounds className={clsx(
          classes.root,
          classes.asPage,
          smDown && classes.paddingMobile,
          (md || lg) && classes.paddingIpad,
          xlUp && classes.paddingDesktop,
          !smDown ? classes.minWidth500 : null,
        )}>
          <div className={classes.storeEditMenu}>
            <EditStoreForm
              storePrivate={storePrivate}
              closeEditStoreModal={undefined}
            />
          </div>
        </ErrorBounds>
      </ResponsivePadding>
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
  },
  asPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeEditMenu: {
    maxWidth: 540,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  minWidth500: {
    minWidth: '500px',
  },
  paddingMobile: {
    paddingTop: '2rem',
  },
  paddingIpad: {
    paddingTop: '5rem',
  },
  paddingDesktop: {
    paddingTop: '2rem',
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    margin: 0,
    background: 'unset', // remove default color in material-ui
    // for border radius
  },
  linkButton: {
    cursor: 'pointer',
    height: 40,
    position: "relative",
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.black}`,
    color: theme.palette.type === 'dark'
      ? `${Colors.uniswapLightNavy}`
      : `${Colors.black}`,
    borderRadius: BorderRadius,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.sharp,
      duration: "100ms",
    }),
    "&:hover": {
      border: `1px solid ${Colors.blue}`,
      color: Colors.blue,
      "& > span": {
        color: Colors.blue,
      },
    },
  },
});


export default withStyles(styles)( EditSellerProfile );





