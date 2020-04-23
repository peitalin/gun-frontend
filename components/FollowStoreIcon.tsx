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
import { FOLLOW_STORE, UNFOLLOW_STORE } from "queries/following-stores-mutations";
// redux
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
// snackbar
import SnackBarA from "components/Snackbars/SnackbarA";
import Portal from "@material-ui/core/Portal";



const FollowStoreIcon: React.FC<ReactProps> = (props) => {

  const dispatch = useDispatch();
  const [showSnackbar, setShowSnackbar] = React.useState(false)

  const { followingStoresIds, user } = useSelector<GrandReduxState, ReduxState>(
    s => ({
      followingStoresIds: s.reduxFollowingStores.followingStoresIds,
      user: s.reduxLogin.user
    })
  );

  const {
    classes,
  } = props;


  const isInFollowingStores = (): boolean => {

    return !!followingStoresIds.find(fstoreId => {
      return fstoreId == props.storeId
    })
  }

  const [followStore, response1] =
  useMutation<MutationData1, MutationVar1>(FOLLOW_STORE, {
    variables: {
      storeId: props.storeId,
      query: {
        count: 25,
      }
    },
    onCompleted: (data) => {
      if (props.refetch) {
        props.refetch()
      }
    },
    onError: () => {},
  })

  const [unfollowStore, response2] =
  useMutation<MutationData1, MutationVar1>(UNFOLLOW_STORE, {
    variables: {
      storeId: props.storeId,
      query: {
        count: 25,
      }
    },
    onCompleted: (data) => {
      if (props.refetch) {
        props.refetch()
      }
    },
    onError: () => {},
  })

  const added = isInFollowingStores()
  console.log("following stores", followingStoresIds)

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
            dispatch(Actions.reduxFollowingStores.UNFOLLOW_STORE(props.storeId))
            unfollowStore()
          } else {
            dispatch(Actions.reduxFollowingStores.FOLLOW_STORE(props.storeId))
            followStore()
          }
        }
      }}
      className={classes.followingStoresRoot}
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
  storeId: string;
  refetch?(): void; // apollo refetch followingStores
}
interface ReduxState {
  followingStoresIds: string[];
  user: UserPrivate;
}


interface MutationData1 {
}
interface MutationVar1 {
}


const styles = (theme: Theme) => createStyles({
  followingStoresRoot: {
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


export default withStyles(styles)( FollowStoreIcon );