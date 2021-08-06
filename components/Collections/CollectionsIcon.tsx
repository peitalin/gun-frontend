import React from "react";
// styles
import clsx from 'clsx';
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, isThemeDark } from "layout/AppTheme";
// MUI
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import IconButton from "@material-ui/core/IconButton";
// Graphql
import { useMutation } from "@apollo/client";
import {
  ADD_PRODUCT_TO_COLLECTION,
  REMOVE_PRODUCT_FROM_COLLECTION
} from "queries/collections-mutations";
// redux
import { useDispatch, useSelector } from "react-redux";
import { CollectionItemId } from "reduxStore/collections-reducer";
import { UserPrivate } from "typings/gqlTypes";
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
// snackbar
import { useSnackbar } from "notistack";
import Tooltip from "@material-ui/core/Tooltip";



const CollectionIcon: React.FC<ReactProps> = (props) => {


  const {
    classes,
  } = props;

  const dispatch = useDispatch();
  const snackbar = useSnackbar()

  const [hover, setHover] = React.useState(false)

  const { collectionItemIds, user } = useSelector<GrandReduxState, ReduxState>(
    s => ({
      collectionItemIds: s.reduxCollections.collectionIds,
      user: s.reduxLogin.user
    })
  );

  const collectionItemId = {
    productId: props.productId,
    externalProductId: props.externalProductId,
  };

  const isInCollection = (collectionItemIds: CollectionItemId[]): boolean => {
    return !!collectionItemIds.find(w => {
      return w.productId === collectionItemId.productId
          || w.externalProductId === collectionItemId.externalProductId
    })
  }


  const added = React.useMemo(
    () => isInCollection(collectionItemIds),
    [collectionItemIds]
  )

  const openModal = () => {
    console.log("opening modal:", props.externalProductId)
    if (props.externalProductId) {
      dispatch(Actions.reduxCollections.SET_SELECTED_PRODUCT_EXTERNAL_PRODUCT_ID(props.externalProductId))
    }
    if (props.productId) {
      dispatch(Actions.reduxCollections.SET_SELECTED_PRODUCT_EXTERNAL_PRODUCT_ID(props.productId))
    }
    dispatch(Actions.reduxModals.TOGGLE_COLLECTIONS_MODAL(true))
  }

  return (
    <Tooltip title={added ? "Remove from collection" : "Add to collection"}>
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
            openModal()
          }
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={classes.collectionRoot}
        style={{
          top: 'calc(50% - 16px)',
          padding: '.25rem', // determines button radius size
          ...props.style
        }}
        // size="small"
      >
        {
          added
          ? <RemoveIcon classes={{
              root: classes.favoriteRootAdded,
            }}/>
          : <AddIcon classes={{
              root: classes.favoriteRoot,
            }}/>
        }
      </IconButton>
    </Tooltip>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  style?: any;
  productId?: string;
  externalProductId?: string;
  refetch?(): void; // apollo refetch collection
}
interface ReduxState {
  collectionItemIds: CollectionItemId[];
  user: UserPrivate;
}


const styles = (theme: Theme) => createStyles({
  collectionRoot: {
    position: 'absolute',
    zIndex: 1,
    right: '1rem',
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    // border: `1px solid ${Colors.black}`,
    boxShadow: BoxShadows.shadow3.boxShadow,
    transform: "scale(1.2)",
    "&:hover": {
      backgroundColor: isThemeDark(theme)
        ? Colors.uniswapMediumNavy
        : Colors.slateGrey,
      transform: "scale(1.4)",
      "& > span > svg": {
        fill: Colors.ultramarineBlueLight,
      },
    },
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
    }),
  },
  favoriteRoot: {
    width: '1rem',
    height: '1rem',
    fill: Colors.ultramarineBlue,
  },
  favoriteRootAdded: {
    width: '1rem',
    height: '1rem',
    fill: Colors.lightRed,
  },
});


export default withStyles(styles)( CollectionIcon );