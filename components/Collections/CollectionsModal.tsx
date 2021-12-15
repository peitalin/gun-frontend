import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { BorderRadius4x, BoxShadows, Colors, isThemeDark } from "layout/AppTheme";
// Material UI
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
// icons
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';

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
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import {
  CREATE_COLLECTION,
  DELETE_COLLECTION,
  ADD_PRODUCT_TO_COLLECTION,
  REMOVE_PRODUCT_FROM_COLLECTION,
} from "queries/collections-mutations";
import {
  GET_COLLECTIONS_BY_USER_ID
} from "queries/collections-queries";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// snackbar
import { useSnackbar } from "notistack";
import CreateCollectionMenuExpander from "./CreateCollectionMenuExpander";
import LoadingBar from "components/LoadingBar";


const CollectionModal: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const dispatch = useDispatch();
  const snackbar = useSnackbar()

  const collectionModalOpen = useSelector<GrandReduxState, boolean>(
    state => state.reduxModals.collectionsModalOpen ?? false
  );

  const closeModal = () => {
    dispatch(Actions.reduxModals.TOGGLE_COLLECTIONS_MODAL(false))
  }


  const {
    collectionItemIds,
    selectedProductExternalProductId,
    user,
  } = useSelector<GrandReduxState, ReduxState>(
    s => ({
      collectionItemIds: s.reduxCollections.collectionIds,
      selectedProductExternalProductId: s.reduxCollections.selectedProductExternalProductId,
      user: s.reduxLogin.user
    })
  );


  const [
    addProductToCollection,
    response1
  ] = useMutation<MData1, MVar1>(
    ADD_PRODUCT_TO_COLLECTION, {
    variables: {
      productId: undefined,
      externalProductId: undefined,
      collectionId: undefined,
      userId: user?.id,
    },
    onCompleted: (data) => {
    },
    onError: (err) => {
      if (err?.message.match(/[Uu]nique/g)) {
        snackbar.enqueueSnackbar(
          "Item already in this collection",
          { variant: "error" }
        )
      } else {
        snackbar.enqueueSnackbar(
          `${err?.message}`,
          { variant: "error" }
        )
      }
    },
    update: (cache, { data: { addProductToCollection }}) => {

      const cacheData = cache.readQuery<QData1, any>({
        query: GET_COLLECTIONS_BY_USER_ID,
        variables: { userId: user?.id },
      });
      console.log("CACHE DATA: ", cacheData)
      // only update apollo cache if cache entry exists
      if (cacheData) {

        let existingCollections = cacheData?.getCollectionsByUserId
        let updatedCollection = existingCollections?.map(c => {
          // find the collection which you added product to,
          // and update that connection
          if (c.id === addProductToCollection.collectionId) {
            return {
              ...c,
              itemsConnection: {
                ...c.itemsConnection,
                edges: [
                  ...c.itemsConnection?.edges,
                  { node: addProductToCollection.collectionItem } as CollectionItemsEdge
                ]
              }
            }
          } else {
            return c
          }
        })

        cache.writeQuery({
          query: GET_COLLECTIONS_BY_USER_ID,
          variables: { userId: user?.id },
          data: {
            getCollectionsByUserId: updatedCollection,
          },
        });
      }
    }
  })

  const [
    removeProductFromCollection,
    response2
  ] = useMutation<MData2, MVar2>(
    REMOVE_PRODUCT_FROM_COLLECTION, {
    variables: {
      collectionId: undefined,
      collectionItemId: undefined,
    },
    onCompleted: (data) => {
    },
    onError: () => {},
    update: (cache, { data: { removeProductFromCollection }}) => {

      const cacheData = cache.readQuery<QData1, any>({
        query: GET_COLLECTIONS_BY_USER_ID,
        variables: { userId: user?.id },
      });
      // console.log("CACHE DATA: ", cacheData)
      // only update apollo cache if cache entry exists
      if (cacheData) {

        let existingCollections = cacheData?.getCollectionsByUserId
        let updatedCollection = existingCollections?.map(c => {
          // find the collection which you added product to,
          // and update that connection
          if (c.id === removeProductFromCollection.collectionId) {
            return {
              ...c,
              itemsConnection: {
                ...c.itemsConnection,
                edges: c.itemsConnection?.edges?.filter(({ node }) => {
                  return node.id !== removeProductFromCollection?.collectionItem?.id
                }),
              }
            }
          } else {
            return c
          }
        })

        cache.writeQuery({
          query: GET_COLLECTIONS_BY_USER_ID,
          variables: { userId: user?.id },
          data: {
            getCollectionsByUserId: updatedCollection,
          },
        });
      }
    }
  })


  const [
    getCollections,
    { data, loading, error }
  ] = useLazyQuery<QData1, QVar1>(
    GET_COLLECTIONS_BY_USER_ID, {
    variables: {
      userId: user?.id,
    },
    onCompleted: (data) => {},
    onError: () => {},
    // fetchPolicy: "no-cache",
  })

  React.useEffect(() => {
    // fetch collections 3seconds later after page loads
    setTimeout(() => {
      getCollections()
    }, 3000)
  }, [])

  React.useEffect(() => {
    // fetch collections when opening addToCollections modal
    if (collectionModalOpen && !data?.getCollectionsByUserId) {
      getCollections()
    }
  }, [collectionModalOpen])

  let collections = data?.getCollectionsByUserId;
  // console.log("collections", collections)
  // console.log("selectedProductExternalProductId", selectedProductExternalProductId)
  let loadingMutation = response1?.loading || response2?.loading

  return (
    <Dialog
      open={collectionModalOpen}
      onClose={closeModal}
      // full height
      fullScreen={false}
      fullWidth={false}
      scroll="paper"
      BackdropProps={{
        classes: { root: classes.modalBackdrop }
      }}
      PaperProps={{
        classes: { root: classes.modalPaperScrollPaper }
      }}
    >
      <div className={classes.collectionModalRoot}>

        <div className={classes.titleRow}>
          <Typography variant="h5">
            Save to...
          </Typography>

          <IconButton onClick={() => closeModal()} size="large">
            <ClearIcon className={classes.closeIcon}/>
          </IconButton>
          {
            loadingMutation &&
            <LoadingBar
              absoluteBottom
              height={'4px'}
              width={'100%'}
            />
          }
        </div>

        {
          (collections?.length > 0)
          ? <div className={classes.collectionsContainer}>
              <div className={classes.collectionsColumn}>
                {
                  collections.map(collection => {

                    let collectionItemEdge = collection?.itemsConnection?.edges?.find(
                      e => e.node.productId === selectedProductExternalProductId
                        || e.node.externalProductId === selectedProductExternalProductId
                    )

                    let productInCollection = !!collectionItemEdge?.node?.productId
                      || !!collectionItemEdge?.node?.externalProductId
                    // console.log("productInCollection: ", productInCollection)

                    let collectionItem = collectionItemEdge?.node
                    // console.log("collectionItem: ", collectionItem)

                    let isExternal = selectedProductExternalProductId?.startsWith('external_')

                    return (
                      <div key={collection.id} className={classes.collectionRow}>
                        <FormControlLabel
                          className={classes.confirmCheckbox}
                          disabled={!selectedProductExternalProductId}
                          control={
                              <Checkbox
                                checked={productInCollection}
                                onChange={(e) => {
                                  if (!productInCollection) {
                                    // let productId =
                                    addProductToCollection({
                                      variables: {
                                        userId: user?.id,
                                        productId: isExternal
                                          ? null
                                          : selectedProductExternalProductId,
                                        externalProductId: isExternal
                                          ? selectedProductExternalProductId
                                          : null,
                                        collectionId: collection?.id,
                                      }
                                    })
                                  } else {
                                    removeProductFromCollection({
                                      variables: {
                                        collectionId: collection?.id,
                                        collectionItemId: collectionItem?.id,
                                      }
                                    })
                                  }
                                }}
                                name="addProductToCollection"
                              />
                          }
                          label={`${collection.name}`}
                        />
                        {
                          collection.private
                          ? <LockIcon className={classes.privateIcon}/>
                          : <PublicIcon className={classes.privateIcon}/>
                        }
                      </div>
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

        <CreateCollectionMenuExpander/>

      </div>
    </Dialog>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
}
interface ReduxState {
  collectionItemIds: CollectionItemId[];
  selectedProductExternalProductId: string;
  user: UserPrivate;
}

interface MVar1 {
  productId: string
  externalProductId: string
  userId: string
  collectionId: string
}
interface MData1 {
  addProductToCollection: CollectionItemMutationResponse
}

interface MVar2 {
  collectionId: string
  collectionItemId: string
}
interface MData2 {
  removeProductFromCollection: CollectionItemMutationResponse
}


interface QVar1 {
  userId: string
}
interface QData1 {
  getCollectionsByUserId: Collection[]
}

export const styles = (theme: Theme) => createStyles({
  modalButtons: {
    minWidth: 150,
  },
  title: {
    textAlign: "center",
  },
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    maxHeight: "calc(100% - 32px)",
    maxWidth: '400px',
    width: '100%',
    borderRadius: BorderRadius4x,
  },
  collectionModalRootInner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  collectionModalRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  titleRow: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1rem 1rem 2rem',
  },
  collectionsContainer: {
    position: "relative",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '1rem 2rem 1rem 2rem',
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    width: 'calc(100% + 16px)',
    marginLeft: '-8px',
    maxHeight: 240,
    alignItems: "flex-start",
    overflow: "scroll",
    boxShadow: isThemeDark(theme)
      ? BoxShadows.shadowInset.boxShadow
      : BoxShadows.shadowInsetLight.boxShadow,
  },
  closeIcon: {
    fill: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
  },
  collectionsColumn: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: "flex-start",
  },
  collectionRow: {
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  privateCollection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "0.5rem",
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
  confirmCheckbox: {
    marginTop: '0.5rem',
  },
})

export default withStyles(styles)( CollectionModal );