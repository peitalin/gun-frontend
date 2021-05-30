import React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// Material UI
import Dialog from "@material-ui/core/Dialog";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Components
import ProductEditPage from "./ProductEditPage";
import ErrorBounds from 'components/ErrorBounds';
import BackTo from "components/BackTo";
import Typography from "@material-ui/core/Typography";
// Typings
import { Product, ID } from "typings/gqlTypes";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const ProductEditModal: React.FC<ReactProps> = (props) => {

  const [fadeOut, setFadeOut] = React.useState(false);
  const { classes, asModal, product } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

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
      <ErrorBounds className={clsx(
        classes.pageRoot,
        mdDown ? classes.paddingMobile : classes.paddingDesktop,
      )}>
        <div className={classes.outerContainer}>
          <div className={classes.flexRowInner}>
            <ProductEditPage
              asModal={false}
              closeModal={closeModal}
              product={product}
            />
          </div>
        </div>
      </ErrorBounds>
    )
  } else {
    return (
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
    )
  }
}


interface ReactProps extends WithStyles<typeof styles> {
  asModal: boolean;
  product: Product;
}

const styles = (theme: Theme) => createStyles({
  pageRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingDesktop: {
    padding: '2rem 2rem 2rem 2rem',
  },
  paddingMobile: {
    padding: '2rem 0.5rem 2rem 0.5rem',
  },
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
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
  title: {
  },
});


export default withStyles(styles)( ProductEditModal );
