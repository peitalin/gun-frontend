import React from "react";
// styles
import clsx from 'clsx';
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, isThemeDark } from "layout/AppTheme";
// Graphql
import { UserPrivate } from "typings/gqlTypes";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT_TO_COLLECTION, REMOVE_PRODUCT_FROM_COLLECTION } from "queries/collections-mutations";
// material-ui
import Button from "@mui/material/Button";
// redux
import { useDispatch, useSelector } from "react-redux";
import { CollectionItemId } from "reduxStore/collections-reducer";
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
// snackbar
import { useSnackbar } from "notistack";





const CollectionButtonBig: React.FC<ReactProps> = (props) => {

  const dispatch = useDispatch();
  const snackbar = useSnackbar()

  const { collectionItemIds, user } = useSelector<GrandReduxState, ReduxState>(
    s => ({
      collectionItemIds: s.reduxCollections.collectionIds,
      user: s.reduxLogin.user
    })
  );

  const {
    classes,
  } = props;

  const collectionItemId = {
    productId: props.productId,
    variantId: props.variantId
  };

  const isInCollection = (): boolean => {
    return !!collectionItemIds.find(w => {
      return w.productId == collectionItemId.productId
    })
  }

  const [addProductToCollection, response1] =
  useMutation<MData1, MVar1>(ADD_PRODUCT_TO_COLLECTION, {
    variables: { ...collectionItemId },
    onCompleted: (data) => {
      if (props.refetch) {
        props.refetch()
      }
    },
    onError: () => {},
  })

  const [removeProductFromCollection, response2] =
  useMutation<MData1, MVar1>(REMOVE_PRODUCT_FROM_COLLECTION, {
    variables: { ...collectionItemId },
    onCompleted: (data) => {
      if (props.refetch) {
        props.refetch()
      }
    },
    onError: () => {},
  })

  const added = isInCollection()
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
            dispatch(Actions.reduxCollections.REMOVE_COLLECTION_ITEM(collectionItemId))
            removeProductFromCollection()
          }
        }}
      >
        Remove from Collection
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
            dispatch(Actions.reduxCollections.ADD_COLLECTION_ITEM(collectionItemId))
            addProductToCollection()
          }
        }}
      >
        Add to Collection
      </Button>
    )
  }
}


interface ReactProps extends WithStyles<typeof styles> {
  style?: any;
  productId: string;
  variantId: string;
  refetch?(): void; // apollo refetch collection
}
interface ReduxState {
  collectionItemIds: CollectionItemId[];
  user: UserPrivate;
}


interface MData1 {
}
interface MVar1 {
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


export default withStyles(styles)( CollectionButtonBig );