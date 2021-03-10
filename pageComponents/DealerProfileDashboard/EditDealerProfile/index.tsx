import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
// Styles
import { Colors, BorderRadius, BorderRadius2x, BoxShadows } from "layout/AppTheme";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import { StorePrivate, Dealers } from "typings/gqlTypes";
// Material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import EditDealerForm from "./EditDealerForm";
import ResponsivePadding from "../ResponsivePadding";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";



const EditDealerProfile = (props: ReactProps) => {

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
  const dealerProfileEditModalOpen = useSelector<GrandReduxState, boolean>(
    state => option(state).reduxModals.dealerProfileEditModalOpen()
  );
  const dealer = useSelector<GrandReduxState, Dealers>(
    state => option(state).reduxLogin.user.dealer() as any
  );

  const closeEditDealerModal = () => {
    dispatch(Actions.reduxModals.TOGGLE_DEALER_PROFILE_EDIT_MODAL(false))
  }

  const openEditDealerModal = () => {
    dispatch(Actions.reduxModals.TOGGLE_DEALER_PROFILE_EDIT_MODAL(true))
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
            <EditDealerForm
              dealer={dealer}
              closeEditDealerModal={undefined}
            />
          </div>
        </ErrorBounds>
      </ResponsivePadding>
    );
  } else {
    return (
      <>
        <Dialog
          open={dealerProfileEditModalOpen}
          onClose={closeEditDealerModal}
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
          <EditDealerForm
            dealer={dealer}
            closeEditDealerModal={closeEditDealerModal}
          />
        </Dialog>
        <Button
          variant="outlined"
          className={classes.linkButton}
          onClick={() => openEditDealerModal()}
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
    backgroundColor: "rgba(47, 57, 65, .85)",
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


export default withStyles(styles)( EditDealerProfile );





