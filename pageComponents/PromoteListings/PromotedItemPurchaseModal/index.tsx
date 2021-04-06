import React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius2x, Gradients, BorderRadius } from "layout/AppTheme";
import { PromotedListItem } from "typings/gqlTypes";
// Material UI
import Dialog from "@material-ui/core/Dialog";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Components
import BuyPromotedItemPage from "./BuyPromotedItemPage";
/// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";





const PromotedItemPurchaseModal: React.FC<ReactProps> = (props) => {

  const {
    classes,
    asModal = true,
  } = props;

  const dispatch = useDispatch();

  const promotedItemPurchaseModalOpen = useSelector<GrandReduxState, boolean>(
    state => state.reduxModals.promotedItemPurchaseModalOpen
  );

  const goBack = () => {
    // unload Stripe card component first, then shut the modal
    dispatch(Actions.reduxModals.TOGGLE_PROMOTED_ITEM_PURCHASE_MODAL(false))
  }

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"))

  console.log("currentPromotedListItem: ", props.currentPromotedListItem)

  if (!asModal && process.browser) {
    return (
      <BuyPromotedItemPage
        goBack={goBack}
        asModal={asModal}
        promotedListItem={props.currentPromotedListItem}
        position={props.position}
        refetch={props.refetch}
      />
    )
  } else {
    return (
      <>
        <Dialog
          open={promotedItemPurchaseModalOpen}
          // full height
          fullScreen={mdUp ? false : true}
          fullWidth={mdUp ? false : null}
          maxWidth={"md"}
          onClose={() => goBack()}
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
          <BuyPromotedItemPage
            promotedListItem={props.currentPromotedListItem}
            position={props.position}
            goBack={goBack}
            refetch={props.refetch}
          />
        </Dialog>
      </>
    )
  }
}

interface ReactProps extends WithStyles<typeof styles> {
  asModal?: boolean;
  currentPromotedListItem: PromotedListItem
  position: number;
  refetch?(): void;
}

const styles = (theme: Theme) => createStyles({
  modalBackdrop: {
    backgroundColor: "rgba(47, 57, 65, .85)",
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
  },
});


export default withStyles(styles)( PromotedItemPurchaseModal );
