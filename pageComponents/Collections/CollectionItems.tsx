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
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Close from '@material-ui/icons/Close';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ConfirmActionModal from "components/ConfirmActionModal";

import LoadingBar from "components/LoadingBar";
import CreateCollectionMenu from "./CreateCollectionMenu";
import ProductRowMedium from "components/ProductRowMedium";
import TextInputUnderline from "components/Fields/TextInputUnderline";

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
  ADD_PRODUCT_TO_COLLECTION,
  REMOVE_PRODUCT_FROM_COLLECTION,
} from "queries/collections-mutations";
import {
  GET_COLLECTIONS_BY_USER_ID
} from "queries/collections-queries";
import AlignCenterLayout from "components/AlignCenterLayout";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
// snackbar
import { useSnackbar } from "notistack";



const CollectionItems: React.FC<ReactProps> = (props) => {

  const {
    classes,
    collection,
  } = props;

  const snackbar = useSnackbar()
  const dispatch = useDispatch()

  const [editMode, setEditMode] = React.useState(false)
  const [editName, setEditName] = React.useState(collection?.name)
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)

  const {
    user,
  } = useSelector<GrandReduxState, ReduxState>(
    s => ({
      user: s.reduxLogin.user
    })
  );


  const [
    editCollection,
    editCollectionResponse,
  ] = useMutation<MData3, MVar3>(
    EDIT_COLLECTION, {
    variables: {
      collectionId: undefined,
      name: undefined,
      privateCollection: undefined,
    },
    onCompleted: (data) => {
      setEditMode(false)
      setEditName(data?.editCollection?.name)
    },
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

  let loadingMutation = editCollectionResponse?.loading
    || deleteCollectionResponse?.loading

  return (
    <div className={classes.CollectionItemsRoot}>

      <LoadingBar
        absoluteTop
        height={4}
        width={"100%"}
        loading={loadingMutation}
      />

      <div className={classes.collectionTitleBox}>
        {
          !editMode
          ? <div className={classes.titleSection}>
              <Typography variant="h4">
                {collection.name}
              </Typography>
              <IconButton
                className={classes.iconButton}
                onClick={() => setEditMode(s => !s)}
              >
                <EditIcon />
              </IconButton>
            </div>
          : <div className={classes.titleSection}>
              <TextInputUnderline
                inputRef={input => input && input.focus()}
                label="Edit Collection Name"
                placeholder="Collection name"
                onChange={(e) => setEditName(e.target.value)}
                value={editName}
                // className={classes.textField}
                // inputProps={{
                //   className: classes.textInput
                // }}
              />
              <div className={classes.save}
                onClick={() => {
                  if (!editName) {
                    snackbar.enqueueSnackbar("Name required", { variant: 'info'})
                  } else {
                    editCollection({
                      variables: {
                        collectionId: collection?.id,
                        name: editName,
                      }
                    })
                  }
                }}
              >
                save
              </div>
              <div className={classes.cancel}
                onClick={() => setEditMode(false)}
              >
                cancel
              </div>
            </div>
        }
        <div className={classes.titleEnd}>
          <Tooltip title={"Make Private"}>
            <LockIcon
              onClick={() => {
                editCollection({
                  variables: {
                    collectionId: collection.id,
                    privateCollection: true,
                  }
                })
              }}
              className={clsx(
                classes.privateIcon,
                collection.private
                  ? classes.privateIconHighlight
                  : classes.privateIconDim,
              )}
            />
          </Tooltip>
          <Tooltip title={"Make Public"}>
            <PublicIcon
              onClick={() => {
                editCollection({
                  variables: {
                    collectionId: collection.id,
                    privateCollection: false,
                  }
                })
              }}
              className={clsx(
                classes.privateIcon,
                !collection.private
                  ? classes.privateIconHighlight
                  : classes.privateIconDim
              )}
            />
          </Tooltip>
          <Tooltip title={"Delete Collection"}>
            <DeleteOutlineIcon
              onClick={() => {
                setOpenDeleteModal(true)
              }}
              className={clsx(
                classes.privateIcon,
                classes.deleteIcon,
              )}
            />
          </Tooltip>
          <ConfirmActionModal
            title={"Do you want to delete this collection? (Including all products in this collection)"}
            showModal={openDeleteModal}
            setShowModal={() => setOpenDeleteModal(s => !s)}
            onConfirmFunction={() => {
              deleteCollection({
                variables: {
                  collectionId: collection.id,
                }
              })
            }}
          />
        </div>
      </div>

      {
        (collection.itemsConnection?.edges?.length > 0)
        ? collection.itemsConnection?.edges?.map(({ node: citem }) => {
            return (
              <div key={citem.product?.id} className={classes.productItem}>
                <ProductRowMedium
                  product={citem?.product}
                  externalProduct={citem?.externalProduct}
                />
                <div className={classes.flexRowCollectionButtons}>
                  <Tooltip title={"Add to another collection"}>
                    <IconButton
                      className={classes.iconButton}
                      onClick={() => {
                        if (citem.product?.id) {
                          dispatch(Actions.reduxCollections.SET_SELECTED_PRODUCT_EXTERNAL_PRODUCT_ID(
                            citem?.product?.id
                          ))
                        }
                        if (citem.externalProduct?.id) {
                          dispatch(Actions.reduxCollections.SET_SELECTED_PRODUCT_EXTERNAL_PRODUCT_ID(
                            citem?.externalProduct?.id
                          ))
                        }
                        dispatch(Actions.reduxModals.TOGGLE_COLLECTIONS_MODAL(true))
                      }}
                    >
                      <PlaylistAddIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Remove from collection"}>
                    <IconButton
                      className={classes.iconButton}
                      onClick={() => {
                        removeProductFromCollection({
                          variables: {
                            collectionId: collection?.id,
                            collectionItemId: citem?.id,
                          }
                        })
                      }}
                    >
                      <Close />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            )
          })
        : <div className={classes.noProducts}>
            No products in this collection
          </div>
      }

    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  collection: Collection
}
interface ReduxState {
  user: UserPrivate;
}

interface QVar1 {
  userId: string
}
interface QData1 {
  getCollectionsByUserId: Collection[]
}


interface MVar1 {
  productId: string
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

interface MVar3 {
  collectionId: string
  name?: string
  privateCollection?: boolean
}
interface MData3 {
  editCollection: Collection
}

interface MVar4 {
  collectionId: string
}
interface MData4 {
  deleteCollection: Collection
}

export const styles = (theme: Theme) => createStyles({
  CollectionItemsRoot: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: "flex-start",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    // padding: '1rem',
    borderRadius: BorderRadius,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDark}`,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.cream,
    position: "relative",
    overflow: 'hidden',
  },
  collectionTitleBox: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '3rem',
    padding: '2rem 1rem',
    borderBottom: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDark}`,
    marginBottom: '0.5rem',
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  privateIcon: {
    height: 18,
    width: 18,
    marginLeft: '0.5rem',
    cursor: "pointer",
     marginRight: '0.25rem',
  },
  privateIconHighlight: {
    fill: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
  },
  privateIconDim: {
    fill: isThemeDark(theme)
      ? Colors.uniswapMediumGrey
      : Colors.slateGreyDarkest,
  },
  productItem: {
    // marginTop: '0.5rem',
    marginBottom: '0.5rem',
    // marginLeft: '-0.5rem',
    paddingRight: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  iconButton: {
    marginLeft: '0.5rem',
    "& > span > svg": {
      fill: isThemeDark(theme)
        ? Colors.uniswapLighterGrey
        : Colors.slateGreyDarkest,
    },
    "&:hover": {
      "& > span > svg": {
        fill: Colors.ultramarineBlueLight,
      },
    },
  },
  deleteIcon: {
    fill: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyDarkest,
    "&:hover": {
      fill: Colors.lighterRed,
    },
  },
  save: {
    cursor: "pointer",
    marginLeft: '1rem',
    marginRight: '1rem',
    "&:hover": {
      color: Colors.ultramarineBlueLight,
    },
  },
  cancel: {
    cursor: "pointer",
    "&:hover": {
      color: Colors.ultramarineBlueLight,
    },
  },
  noProducts: {
    marginTop: "1rem",
    marginBottom: "1rem",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyDarkest,
    width: '100%',
    textAlign: "center",
  },
  titleEnd: {
  },
  flexRowCollectionButtons: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },
})

export default withStyles(styles)( CollectionItems );