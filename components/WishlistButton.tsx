import React from "react";
import { oc as option } from "ts-optchain";
// styles
import clsx from 'clsx';
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Graphql
import { UserPrivate } from "typings/gqlTypes";
import { useMutation } from "@apollo/react-hooks";
import { ADD_PRODUCT_TO_WISHLIST, REMOVE_PRODUCT_FROM_WISHLIST } from "queries/wishlist-mutations";
// material-ui
import Button from "@material-ui/core/Button";
// redux
import { useDispatch, useSelector } from "react-redux";
import { WishlistItemId } from "reduxStore/wishlist-reducer";
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
// snackbar
import SnackBarA from "components/Snackbars/SnackbarA";
import Portal from "@material-ui/core/Portal";





const WishlistButtonBig: React.FC<ReactProps> = (props) => {

  const dispatch = useDispatch();
  const [showSnackbar, setShowSnackbar] = React.useState(false)

  const { wishlistItemIds, user } = useSelector<GrandReduxState, ReduxState>(
    s => ({
      wishlistItemIds: s.reduxWishlist.wishlistIds,
      user: s.reduxLogin.user
    })
  );

  const {
    classes,
  } = props;

  const wishlistItemId = {
    productId: props.productId,
    variantId: props.variantId
  };

  const isInWishlist = (): boolean => {
    return !!wishlistItemIds.find(w => {
      return w.productId == wishlistItemId.productId
          && w.variantId === wishlistItemId.variantId
    })
  }

  const [addProductToWishlist, response1] =
  useMutation<MutationData1, MutationVar1>(ADD_PRODUCT_TO_WISHLIST, {
    variables: { ...wishlistItemId },
    onCompleted: (data) => {
      if (props.refetch) {
        props.refetch()
      }
    },
    onError: () => {},
  })

  const [removeProductFromWishlist, response2] =
  useMutation<MutationData1, MutationVar1>(REMOVE_PRODUCT_FROM_WISHLIST, {
    variables: { ...wishlistItemId },
    onCompleted: (data) => {
      if (props.refetch) {
        props.refetch()
      }
    },
    onError: () => {},
  })

  const added = isInWishlist()
  if (added) {
    return (
      <>
        <Button
          classes={{
            root: classes.removeButton
          }}
          variant="outlined"
          color="secondary"
          onClick={() => {
            // let user know they are not logged in and item won't be saved
            if (!option(user).id()) {
              setShowSnackbar(true)
            } else {
              dispatch(Actions.reduxWishlist.REMOVE_WISHLIST_ITEM(wishlistItemId))
              removeProductFromWishlist()
            }
          }}
        >
          Remove from Wishlist
        </Button>
        <Portal>
          <SnackBarA
            open={!option(user).id() && showSnackbar}
            closeSnackbar={() => setShowSnackbar(false)}
            message={"Login to remember this item"}
            variant={"info"}
            autoHideDuration={3000}
          />
        </Portal>
      </>
    )
  } else {
    return (
      <>
        <Button
          classes={{
            root: classes.removeButton
          }}
          variant="outlined"
          color="primary"
          onClick={() => {
            // let user know they are not logged in and item won't be saved
            if (!option(user).id()) {
              setShowSnackbar(true)
            } else {
              dispatch(Actions.reduxWishlist.ADD_WISHLIST_ITEM(wishlistItemId))
              addProductToWishlist()
            }
          }}
        >
          Add to Wishlist
        </Button>
        <Portal>
          <SnackBarA
            open={!option(user).id() && showSnackbar}
            closeSnackbar={() => setShowSnackbar(false)}
            message={"Login to remember this item"}
            variant={"info"}
            autoHideDuration={3000}
          />
        </Portal>
      </>
    )
  }
}


interface ReactProps extends WithStyles<typeof styles> {
  style?: any;
  productId: string;
  variantId: string;
  refetch?(): void; // apollo refetch wishlist
}
interface ReduxState {
  wishlistItemIds: WishlistItemId[];
  user: UserPrivate;
}


interface MutationData1 {
}
interface MutationVar1 {
}


const styles = (theme: Theme) => createStyles({
  removeButton: {
    height: 40,
    maxHeight: 40,
    minWidth: '150px',
    marginTop: '0.5rem',
    marginRight: '0.5rem',
    // backgroundColor: "#EDF0F2",
    color: Colors.secondary,
    border: `1px solid ${Colors.secondary}`,
    "&:hover": {
      border: `1px solid ${Colors.secondaryBright}`,
    },
    maxWidth: 300,
    flexGrow: 0.5,
    width: '100%',
  },
  addButton: {
    height: 40,
    maxHeight: 40,
    minWidth: '150px',
    marginTop: '0.5rem',
    marginRight: '0.5rem',
    // backgroundColor: "#EDF0F2",
    color: Colors.black,
    border: `1px solid ${Colors.black}`,
    "&:hover": {
      border: `1px solid ${Colors.charcoal}`,
    },
    maxWidth: 300,
    flexGrow: 0.5,
    width: '100%',
  },
});


export default withStyles(styles)( WishlistButtonBig );