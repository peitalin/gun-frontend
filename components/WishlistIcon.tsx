import React from "react";
import { oc as option } from "ts-optchain";
// styles
import clsx from 'clsx';
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// typingsj
import { UserPrivate } from "typings/gqlTypes";
// MUI
import FavouriteBorder from "@material-ui/icons/FavoriteBorder"
import Favourite from "@material-ui/icons/Favorite"
import IconButton from "@material-ui/core/IconButton";
// Graphql
import { useMutation } from "@apollo/react-hooks";
import { ADD_PRODUCT_TO_WISHLIST, REMOVE_PRODUCT_FROM_WISHLIST } from "queries/wishlist-mutations";
// redux
import { useDispatch, useSelector } from "react-redux";
import { WishlistItemId } from "reduxStore/wishlist-reducer";
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
// snackbar
import SnackBarA from "components/Snackbars/SnackbarA";
import Portal from "@material-ui/core/Portal";



const WishlistIcon: React.FC<ReactProps> = (props) => {

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

  return (
    <IconButton
      onClick={(e) => {
        // prevent click-through to underlying product card
        e.stopPropagation();
        // let user know they are not logged in and item won't be saved
        if (!option(user).id()) {
          setShowSnackbar(true)
        } else {
          // if user is logged in, add or remove to redux
          if (added) {
            dispatch(Actions.reduxWishlist.REMOVE_WISHLIST_ITEM(wishlistItemId))
            removeProductFromWishlist()
          } else {
            dispatch(Actions.reduxWishlist.ADD_WISHLIST_ITEM(wishlistItemId))
            addProductToWishlist()
          }
        }
      }}
      className={classes.wishlistRoot}
      style={{
        top: 'calc(50% - 16px)',
        padding: '.25rem', // determines button radius size
        ...props.style
      }}
      // size="small"
    >
      {
        added
        ? <Favourite classes={{
            root: classes.favoriteRootAdded,
          }}/>
        : <FavouriteBorder classes={{
            root: classes.favoriteRoot,
          }}/>
      }
      <Portal>
        <SnackBarA
          open={!option(user).id() && showSnackbar}
          closeSnackbar={() => setShowSnackbar(false)}
          message={"Login to remember this item"}
          variant={"info"}
          autoHideDuration={3000}
        />
      </Portal>
    </IconButton>
  )
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
  wishlistRoot: {
    position: 'absolute',
    zIndex: 1,
    right: '1rem',
    background: Colors.cream,
    border: `1px solid ${Colors.darkerGrey}`,
    "&:hover": {
      background: Colors.cream,
    }
  },
  favoriteRoot: {
    width: '1rem',
    height: '1rem',
    fill: Colors.darkerGrey,
    "&:hover": {
      fill: Colors.red,
    },
  },
  favoriteRootAdded: {
    width: '1rem',
    height: '1rem',
    fill: Colors.red,
    "&:hover": {
      fill: Colors.darkerGrey,
    },
  },
});


export default withStyles(styles)( WishlistIcon );