import React from "react";
import { useState } from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Material UI
import Dialog from "@material-ui/core/Dialog";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Components
import ProductEditPage from "./ProductEditPage";
// Typings
import { Product, ID } from "typings/gqlTypes";



const ProductEditModal: React.FC<ReactProps> = (props) => {

  const [showConfirmCloseModal, setShowConfirmCloseModal] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const { classes, asModal, product } = props;

  const dispatch = useDispatch();
  const productEditModalOpen = useSelector<GrandReduxState, boolean>(
    state => state.reduxModals.productEditModalOpen
  );

  const closeModal = () => {
    setFadeOut(true);
    dispatch(Actions.reduxProductEdit.RESET_PRODUCT_EDIT())
    setTimeout(() => {
      dispatch(Actions.reduxModals.TOGGLE_PRODUCT_EDIT_MODAL(false))
    }, 100)
  }

  if (!asModal) {
    return (
      <div className={classes.outerContainer}>
        <div className={classes.flexRowInner}>
          <ProductEditPage
            asModal={false}
            closeModal={closeModal}
            product={product}
          />
        </div>
      </div>
    )
  } else {
    return (
      <>
        <Dialog
          open={productEditModalOpen}
          onClose={() => closeModal()}
          BackdropProps={{
            classes: { root: classes.modalBackdrop }
          }}
          PaperProps={{
            classes: { root: classes.modalPaperScrollPaper }
          }}
          scroll={"body"}
        >
          <ProductEditPage
            asModal={true}
            closeModal={closeModal}
            product={product}
          />
        </Dialog>
      </>
    )
  }
}


interface ReactProps extends WithStyles<typeof styles> {
  asModal: boolean;
  product: Product;
}

const styles = (theme: Theme) => createStyles({
  modalBackdrop: {
    backgroundColor: "rgba(47, 57, 65, .85)",
  },
  modalPaperScrollPaper: {
    maxHeight: "calc(100% - 32px)",
    width: '100%',
  },
  outerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  flexRowInner: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
  },
  productColumn60: {
    flexBasis: '60%',
    flexGrow: 1,
    minWidth: 300,
  },
  productColumn40: {
    flexBasis: '40%',
    flexGrow: 1,
    minWidth: 280,
    maxWidth: 400,
  },
});


export default withStyles(styles)( ProductEditModal );
