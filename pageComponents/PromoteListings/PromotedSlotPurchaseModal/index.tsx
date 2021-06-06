import React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius2x, Gradients, BorderRadius, isThemeDark } from "layout/AppTheme";
import { PromotedSlot, Role } from "typings/gqlTypes";
// Material UI
import Dialog from "@material-ui/core/Dialog";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
// typings
import { UserPrivate } from "typings/gqlTypes";
// Components
import BuyPromotedSlotPage from "./BuyPromotedSlotPage";
import AdminEditSlot from "./AdminEditSlot";
/// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";





const PromotedSlotPurchaseModal: React.FC<ReactProps> = (props) => {

  const {
    classes,
    user,
  } = props;

  const dispatch = useDispatch();

  const promotedItemPurchaseModalOpen = useSelector<GrandReduxState, boolean>(
    state => state.reduxModals.promotedItemPurchaseModalOpen
  );

  const closeModal = () => {
    // unload Stripe card component first, then shut the modal
    dispatch(Actions.reduxModals.TOGGLE_PROMOTED_SLOT_PURCHASE_MODAL(false))
  }

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"))
  const isAdmin = user?.userRole === Role.PLATFORM_ADMIN

  return (
    <>
      <Dialog
        open={promotedItemPurchaseModalOpen}
        // full height
        fullScreen={mdUp ? false : true}
        fullWidth={mdUp ? false : null}
        maxWidth={"md"}
        onClose={() => closeModal()}
        BackdropProps={{
          classes: {
            root: classes.modalBackdrop,
          }
        }}
        PaperProps={{
          classes: {
            root: mdUp
              ? classes.modalPaperScrollPaper
              : classes.modalPaperScrollPaperSm
          }
        }}
        scroll="body"
      >
        <div className={classes.modalCard}>
          <div className={classes.modalCardInner}>
            <BuyPromotedSlotPage
              promotedSlot={props.currentPromotedSlot}
              user={user}
              closeModal={closeModal}
              refetch={props.refetch}
            />
          </div>
          {
            isAdmin &&
            <div className={classes.modalCardInner}>
              <AdminEditSlot
                promotedSlot={props.currentPromotedSlot}
                user={user}
              />
            </div>
          }
        </div>
      </Dialog>
    </>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate;
  currentPromotedSlot: PromotedSlot
  refetch?(): void;
}

const styles = (theme: Theme) => createStyles({
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaperSm: {
    maxHeight: "calc(100% - rem)",
    overflowY: 'visible', // let dropdown overhang modal
    borderRadius: BorderRadius2x,
  },
  modalPaperScrollPaper: {
    // maxHeight: "calc(100% - 0px)",
    width: '100%',
    maxWidth: '540px',
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.slateGreyDark,
    borderRadius: BorderRadius2x,
    overflowY: 'visible', // let dropdown overhang modal
  },
  modalCard: {
  },
  modalCardInner: {
    margin: '0.5rem',
    borderRadius: BorderRadius2x,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDark}`,
  },
});


export default withStyles(styles)( PromotedSlotPurchaseModal );
