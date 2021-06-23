import React from "react";
// styles
import clsx from 'clsx';
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, isThemeDark } from "layout/AppTheme";
// Graphql
import { UserPrivate } from "typings/gqlTypes";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT_TO_WATCHLIST, REMOVE_PRODUCT_FROM_WATCHLIST } from "queries/watchlist-mutations";
// material-ui
import Button from "@material-ui/core/Button";
// redux
import { useDispatch, useSelector } from "react-redux";
import { WatchlistItemId } from "reduxStore/watchlist-reducer";
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
// snackbar
import { useSnackbar } from "notistack";





const WatchlistButtonBig: React.FC<ReactProps> = (props) => {

  const dispatch = useDispatch();
  const snackbar = useSnackbar()
  const [showSnackbar, setShowSnackbar] = React.useState(false)

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
  if (added) {
    return (
      <Button
        classes={{
          root: classes.removeButton
        }}
        variant="outlined"
        color="secondary"
        onClick={() => {
          // let user know they are not logged in and item won't be saved
          if (!user?.id) {
            snackbar.enqueueSnackbar(
              "Login to remember this item",
              { variant: "info"}
            )
          } else {
            dispatch(Actions.reduxWatchlist.REMOVE_WATCHLIST_ITEM(watchlistItemId))
            removeProductFromWatchlist()
          }
        }}
      >
        Remove from Watchlist
      </Button>
    )
  } else {
    return (
      <Button
        classes={{
          root: classes.removeButton
        }}
        variant="outlined"
        color="primary"
        onClick={() => {
          // let user know they are not logged in and item won't be saved
          if (!user?.id) {
            snackbar.enqueueSnackbar(
              "Login to remember this item",
              { variant: "info"}
            )
          } else {
            dispatch(Actions.reduxWatchlist.ADD_WATCHLIST_ITEM(watchlistItemId))
            addProductToWatchlist()
          }
        }}
      >
        Add to Watchlist
      </Button>
    )
  }
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
  removeButton: {
    height: 40,
    maxHeight: 40,
    minWidth: '150px',
    marginTop: '0.5rem',
    marginRight: '0.5rem',
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.slateGrey,
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
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.slateGrey,
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


export default withStyles(styles)( WatchlistButtonBig );