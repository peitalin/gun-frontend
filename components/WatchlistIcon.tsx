import React from "react";
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
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT_TO_WATCHLIST, REMOVE_PRODUCT_FROM_WATCHLIST } from "queries/watchlist-mutations";
// redux
import { useDispatch, useSelector } from "react-redux";
import { WatchlistItemId } from "reduxStore/watchlist-reducer";
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
// snackbar
import { useSnackbar } from "notistack";



const WatchlistIcon: React.FC<ReactProps> = (props) => {

  const dispatch = useDispatch();
  const snackbar = useSnackbar()

  const { watchlistItemIds, user } = useSelector<GrandReduxState, ReduxState>(
    s => ({
      watchlistItemIds: s.reduxWatchlist.watchlistIds,
      user: s.reduxLogin.user
    })
  );

  const {
    classes,
  } = props;

  const watchlistItemId = {
    productId: props.productId,
    variantId: props.variantId
  };

  const isInWatchlist = (): boolean => {
    return !!watchlistItemIds.find(w => {
      return w.productId == watchlistItemId.productId
          && w.variantId === watchlistItemId.variantId
    })
  }

  const [addProductToWatchlist, response1] =
  useMutation<MutationData1, MutationVar1>(ADD_PRODUCT_TO_WATCHLIST, {
    variables: { ...watchlistItemId },
    onCompleted: (data) => {
      if (props.refetch) {
        props.refetch()
      }
    },
    onError: () => {},
  })

  const [removeProductFromWatchlist, response2] =
  useMutation<MutationData1, MutationVar1>(REMOVE_PRODUCT_FROM_WATCHLIST, {
    variables: { ...watchlistItemId },
    onCompleted: (data) => {
      if (props.refetch) {
        props.refetch()
      }
    },
    onError: () => {},
  })

  const added = isInWatchlist()

  return (
    <IconButton
      onClick={(e) => {
        // prevent click-through to underlying product card
        e.stopPropagation();
        // let user know they are not logged in and item won't be saved
        if (!user?.id) {
          snackbar.enqueueSnackbar(
            "Login to remember this item",
            { variant: "info"}
          )
        } else {
          // if user is logged in, add or remove to redux
          if (added) {
            dispatch(Actions.reduxWatchlist.REMOVE_WATCHLIST_ITEM(watchlistItemId))
            removeProductFromWatchlist()
          } else {
            dispatch(Actions.reduxWatchlist.ADD_WATCHLIST_ITEM(watchlistItemId))
            addProductToWatchlist()
          }
        }
      }}
      className={classes.watchlistRoot}
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
    </IconButton>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  style?: any;
  productId: string;
  variantId: string;
  refetch?(): void; // apollo refetch watchlist
}
interface ReduxState {
  watchlistItemIds: WatchlistItemId[];
  user: UserPrivate;
}


interface MutationData1 {
}
interface MutationVar1 {
}


const styles = (theme: Theme) => createStyles({
  watchlistRoot: {
    position: 'absolute',
    zIndex: 1,
    right: '1rem',
    background: Colors.cream,
    border: `1px solid ${Colors.black}`,
    "&:hover": {
      background: Colors.cream,
    }
  },
  favoriteRoot: {
    width: '1rem',
    height: '1rem',
    fill: Colors.black,
    "&:hover": {
      fill: Colors.red,
    },
  },
  favoriteRootAdded: {
    width: '1rem',
    height: '1rem',
    fill: Colors.red,
    "&:hover": {
      fill: Colors.black,
    },
  },
});


export default withStyles(styles)( WatchlistIcon );