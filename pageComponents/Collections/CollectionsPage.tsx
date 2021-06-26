import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius, BorderRadius4x, BoxShadows, Colors, isThemeDark } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
// icons
import PublicIcon from '@material-ui/icons/Public';
import LockIcon from '@material-ui/icons/Lock';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";

import CreateCollectionMenu from "./CreateCollectionMenu";
import ProductRowMedium from "components/ProductRowMedium";
import TextInputUnderline from "components/Fields/TextInputUnderline";
import CollectionSection from "./CollectionSection";

// types
import { CollectionItemId } from "reduxStore/collections-reducer";
import {
  UserPrivate,
  CollectionItem,
  Collection,
  CollectionItemMutationResponse,
  CollectionItemsEdge,
} from "typings/gqlTypes";
// Graphql
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_COLLECTION,
  EDIT_COLLECTION,
} from "queries/collections-mutations";
import {
  GET_COLLECTIONS_BY_USER_ID
} from "queries/collections-queries";
import AlignCenterLayout from "components/AlignCenterLayout";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// snackbar
import { useSnackbar } from "notistack";



const CollectionsPage: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const snackbar = useSnackbar()
  const [editMode, setEditMode] = React.useState(false)
  const [editName, setEditName] = React.useState("")

  const {
    selectedProductId,
    user,
  } = useSelector<GrandReduxState, ReduxState>(
    s => ({
      selectedProductId: s.reduxCollections.selectedProductId,
      user: s.reduxLogin.user
    })
  );


  const [
    editCollection,
    editCollectionResponse,
  ] = useMutation<MData2, MVar2>(
    EDIT_COLLECTION, {
    variables: {
      collectionId: undefined,
      name: undefined,
      privateCollection: undefined,
    },
    onCompleted: (data) => {},
    onError: () => {},
    update: (cache, { data: { editCollection }}) => {

      const cacheData = cache.readQuery<QData1, any>({
        query: GET_COLLECTIONS_BY_USER_ID,
        variables: { userId: user?.id },
      });
      // console.log("CACHE DATA: ", cacheData)
      // only update apollo cache if cache entry exists
      if (cacheData) {
        let existingCollections = cacheData?.getCollectionsByUserId
        cache.writeQuery({
          query: GET_COLLECTIONS_BY_USER_ID,
          variables: { userId: user?.id },
          data: {
            // find and replace edited collection by id
            getCollectionsByUserId: existingCollections.map(c =>
              (c.id === editCollection.id)
                ? editCollection
                : c
            )
          },
        });
      }
    },
  })


  const [
    deleteCollection,
    deleteCollectionResponse,
  ] = useMutation<MData4, MVar4>(
    DELETE_COLLECTION, {
    variables: {
      collectionId: undefined,
    },
    onCompleted: (data) => {},
    onError: () => {},
    update: (cache, { data: { deleteCollection }}) => {

      const cacheData = cache.readQuery<QData1, any>({
        query: GET_COLLECTIONS_BY_USER_ID,
        variables: { userId: user?.id },
      });
      // console.log("CACHE DATA: ", cacheData)
      // only update apollo cache if cache entry exists
      if (cacheData) {
        let existingCollections = cacheData?.getCollectionsByUserId
        cache.writeQuery({
          query: GET_COLLECTIONS_BY_USER_ID,
          variables: { userId: user?.id },
          data: {
            // find and replace edited collection by id
            getCollectionsByUserId: existingCollections
              .filter(c => c.id !== deleteCollection.id)
          },
        });
      }
    },
  })

  const { data, loading, error } = useQuery<QData1, QVar1>(
    GET_COLLECTIONS_BY_USER_ID, {
    variables: {
      userId: user?.id,
    },
    onCompleted: (data) => {},
    onError: () => {},
    // fetchPolicy: "no-cache",
  })


  let collections = data?.getCollectionsByUserId;
  console.log("collections", collections)
  // console.log("selectedProductId", selectedProductId)

  return (
    <AlignCenterLayout
      className={classes.collectionPageRoot}
      maxWidth={1160}
      withRecommendations={false}
    >

      <div className={classes.titleRow}>
        <Typography variant="h3">
          Collections
        </Typography>
      </div>

      {
        (collections?.length > 0)
        ? <div className={classes.collectionsContainer}>
            <div className={classes.flexCol}>
              {
                collections.map(collection => {

                  // let collectionItemEdge = collection?.itemsConnection?.edges?.find(
                  //   e => e.node.productId === selectedProductId
                  // )
                  // console.log("productInCollection: ", collectionItemEdge)
                  // let productInCollection = !!collectionItemEdge?.node?.productId
                  // let collectionItem = collectionItemEdge?.node

                  return (
                    <CollectionSection
                      key={collection.id}
                      collection={collection}
                    />
                  )
                })
              }
            </div>
          </div>
        : <div className={classes.collectionsContainer}>
            <div className={classes.emptyMessage}>
              No collections found
            </div>
          </div>
      }

      <div className={classes.flexEnd}>
        <CreateCollectionMenu/>
      </div>

    </AlignCenterLayout>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}
interface ReduxState {
  selectedProductId: string;
  user: UserPrivate;
}

interface QVar1 {
  userId: string
}
interface QData1 {
  getCollectionsByUserId: Collection[]
}

interface MVar2 {
  collectionId: string
  name?: string
  privateCollection?: boolean
}
interface MData2 {
  editCollection: Collection
}

interface MVar4 {
  collectionId: string
}
interface MData4 {
  deleteCollection: Collection
}

export const styles = (theme: Theme) => createStyles({
  collectionPageRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '2rem',
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collectionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // boxShadow: isThemeDark(theme)
    //   ? BoxShadows.shadowInset.boxShadow
    //   : BoxShadows.shadowInsetLight.boxShadow,
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    // boxShadow: isThemeDark(theme)
    //   ? BoxShadows.shadowInset.boxShadow
    //   : BoxShadows.shadowInsetLight.boxShadow,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    width: '100%',
    padding: '2rem 2rem 1rem 2rem',
    transition: theme.transitions.create(['height'], {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
    }),
  },
  flexCol: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: "flex-start",
  },
  itemCol: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: "flex-start",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    padding: '1rem',
    borderRadius: BorderRadius,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDark}`,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.cream,
  },
  flexRow: {
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  privateIcon: {
    fill: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.slateGreyDarkest,
  },
  emptyMessage: {
    marginTop: '1rem',
    textAlign: "center",
    width: '100%',
  },
  loading: {
    height: 20,
    width: 20,
  },
  productItem: {
    marginTop: '0.25rem',
    marginBottom: '0.25rem',
    marginLeft: '-1rem',
  },
  flexEnd: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
})

export default withStyles(styles)( CollectionsPage );