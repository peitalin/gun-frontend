import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius4x, BoxShadows, Colors, isThemeDark } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from '@material-ui/icons/Add';
import Dialog from "@material-ui/core/Dialog";
import MenuItem from '@material-ui/core/MenuItem';
import TextInputUnderline from "components/Fields/TextInputUnderline";
import Switch from '@material-ui/core/Switch';
import Loading from "components/Loading";
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// icons
import PublicIcon from '@material-ui/icons/Public';
import LockIcon from '@material-ui/icons/Lock';

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


const CollectionModal: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const dispatch = useDispatch();
  const snackbar = useSnackbar()

  const [expand, setExpand] = React.useState(false)
  const [name, setName] = React.useState("")
  const [privateCollection, setPrivateCollection] = React.useState(false)

  const collectionModalOpen = useSelector<GrandReduxState, boolean>(
    state => state.reduxModals.collectionsModalOpen ?? false
  );

  const closeModal = () => {
    dispatch(Actions.reduxModals.TOGGLE_COLLECTIONS_MODAL(false))
  }


  const {
    collectionItemIds,
    selectedProductId,
    user,
  } = useSelector<GrandReduxState, ReduxState>(
    s => ({
      collectionItemIds: s.reduxCollections.collectionIds,
      selectedProductId: s.reduxCollections.selectedProductId,
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
    createCollection,
    createCollectionResponse,
  ] = useMutation<MData3, MVar3>(
    CREATE_COLLECTION, {
    variables: {
      name: undefined,
      privateCollection: undefined,
    },
    onCompleted: (data) => {},
    onError: () => {},
    update: (cache, { data: { createCollection }}) => {

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
            getCollectionsByUserId: [
              ...existingCollections,
              createCollection,
            ],
          },
        });
      }
    },
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
    // if (collectionModalOpen) {
    // }
    getCollections()
  }, [])

  let collections = data?.getCollectionsByUserId;
  console.log("collections", collections)
  // console.log("selectedProductId", selectedProductId)

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

          <IconButton onClick={() => closeModal()}>
            <ClearIcon className={classes.closeIcon}/>
          </IconButton>
        </div>

        {
          (collections?.length > 0)
          ? <div className={classes.collectionsContainer}>
              <div className={classes.collectionsColumn}>
                {
                  collections.map(collection => {

                    let collectionItemEdge = collection?.itemsConnection?.edges?.find(
                      e => e.node.productId === selectedProductId
                    )

                    console.log("productInCollection: ", collectionItemEdge)
                    let productInCollection = !!collectionItemEdge?.node?.productId
                    let collectionItem = collectionItemEdge?.node

                    return (
                      <div key={collection.id} className={classes.collectionRow}>
                        <FormControlLabel
                          className={classes.confirmCheckbox}
                          control={
                            <Checkbox
                              checked={productInCollection}
                              onChange={(e) => {
                                if (!productInCollection) {
                                  addProductToCollection({
                                    variables: {
                                      userId: user?.id,
                                      productId: selectedProductId,
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

        <div className={clsx(
          expand ? classes.fieldRowHeightTall : classes.fieldRowHeightShort,
          expand && classes.expandColor,
        )}>
          <div className={clsx(
            classes.fieldRow,
            expand ? classes.fieldRowShow : classes.fieldRowHidden,
          )}>
            <TextInputUnderline
              inputRef={input => input && input.focus()}
              type="new-password"
              label="Enter Collection Name"
              placeholder="Collection name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className={classes.textField}
              inputProps={{
                className: classes.textInput
              }}
            />

            <div className={classes.privateCollection}>
              <div className={classes.privateCollectionText}>
                {
                  privateCollection
                  ? "Private Collection"
                  : "Public Collection"
                }
              </div>
              <Switch
                checked={privateCollection}
                onChange={(e) => setPrivateCollection(e.target.checked)}
              />
          </div>
          </div>
        </div>

        {
          expand
          ? <div className={classes.createCollectionButtonBox}>
              <MenuItem
                className={clsx(
                  classes.expandCreateCollection,
                )}
                onClick={() => {
                  if (!name) {
                    snackbar.enqueueSnackbar(
                      "Must provide a name",
                      { variant: "info" }
                    )
                  } else {
                    createCollection({
                      variables: {
                        name: name,
                        privateCollection: privateCollection
                      }
                    })
                    setExpand(s => !s)
                    setName("")
                    setPrivateCollection(false)
                  }
                }}
              >
                <Typography className={classes.createCollectionButtonText}>
                  {"Save Collection"}
                </Typography>
              </MenuItem>
              <MenuItem
                className={clsx(
                  classes.expandCreateCollection,
                )}
                onClick={() => setExpand(s => !s)}
              >
                <Typography className={classes.createCollectionButtonText}>
                  { "Cancel" }
                </Typography>
              </MenuItem>
            </div>
          : <div className={classes.createCollectionButtonBox}>
              <MenuItem
                className={clsx(
                  classes.expandCreateCollection,
                )}
                onClick={() => {
                  setExpand(s => !s)
                }}
              >
                {
                  createCollectionResponse?.loading
                  ? <Loading height={20} width={20} />
                  : <>
                      <AddIcon className={classes.createCollectionIcon}/>
                      <Typography className={classes.createCollectionButtonText}>
                        { "Create New Collection" }
                      </Typography>
                    </>
                }
              </MenuItem>
            </div>
        }

      </div>
    </Dialog>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}
interface ReduxState {
  collectionItemIds: CollectionItemId[];
  selectedProductId: string;
  user: UserPrivate;
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
  name: string
  privateCollection: boolean
}
interface MData3 {
  createCollection: Collection
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1rem 1rem 2rem',
  },
  collectionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem 1rem 2rem',
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    width: 'calc(100% + 16px)',
    marginLeft: '-8px',
    boxShadow: isThemeDark(theme)
      ? BoxShadows.shadowInset.boxShadow
      : BoxShadows.shadowInsetLight.boxShadow,
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
    width: 'calc(100% + 16px)',
    marginLeft: '-8px',
    padding: '2rem 2rem 1rem 2rem',
    transition: theme.transitions.create(['height'], {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
    }),
  },
  fieldRowHeightTall: {
    transition: theme.transitions.create(['height'], {
      easing: theme.transitions.easing.easeInOut,
      duration: "150ms",
    }),
    height: 150,
  },
  fieldRowHeightShort: {
    transition: theme.transitions.create(['height'], {
      easing: theme.transitions.easing.easeInOut,
      duration: "150ms",
    }),
    height: 0,
  },
  fieldRowShow: {
    height: '100%',
    transition: theme.transitions.create(['opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: "150ms",
      delay: "50ms",
    }),
    opacity: 1,
  },
  fieldRowHidden: {
    height: '100%',
    transition: theme.transitions.create(['opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: "0ms",
      delay: "0ms",
    }),
    display: "none", // must be display: none or
    // it'll be transparent but shift the modal paper
    // and mess with overflow when autofocus kicks in
    opacity: 0,
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
  expandCreateCollection: {
    display: "flex",
    justifyContent: "center",
    padding: '1rem 2rem',
    flexBasis: "50%",
    flexGrow: 1,
    fontWeight: 500,
    "&:hover": {
      "& > svg": {
        fill: isThemeDark(theme)
          ? Colors.purple
          : Colors.ultramarineBlueLight,
      },
      "& > p": {
        color: isThemeDark(theme)
          ? Colors.purple
          : Colors.ultramarineBlueLight,
      },
    },
  },
  createCollectionIcon: {
    marginRight: "0.25rem",
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
  },
  createCollectionButtonBox: {
    display: "flex",
    justifyContent: "center",
  },
  createCollectionButtonText: {
    fontWeight: 500,
  },
  expandColor: {
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
  },
  textField: {
    width: "100%",
    "&:focus-within": {
      // color: '#24A4FF',
      color: Colors.charcoal,
    },
  },
  textInput: {
  },
  privateCollection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "0.5rem",
  },
  privateCollectionText: {
    marginRight: '1rem',
    minWidth: 150,
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