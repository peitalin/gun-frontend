import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius, BoxShadows, Colors, isThemeDark } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import TextInputUnderline from "components/Fields/TextInputUnderline";
import Switch from '@material-ui/core/Switch';
import Loading from "components/Loading";
// types
import {
  UserPrivate,
  Collection,
} from "typings/gqlTypes";
// Graphql
import { useMutation } from "@apollo/client";
import {
  CREATE_COLLECTION,
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

  const [expand, setExpand] = React.useState(false)
  const [name, setName] = React.useState("")
  const [privateCollection, setPrivateCollection] = React.useState(false)

  const {
    selectedProductExternalProductId,
    user,
  } = useSelector<GrandReduxState, ReduxState>(
    s => ({
      selectedProductExternalProductId: s.reduxCollections.selectedProductExternalProductId,
      user: s.reduxLogin.user
    })
  );

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


  return (
    <div className={clsx(classes.createCollectionContainer)}>
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
                {"Create"}
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
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}
interface ReduxState {
  selectedProductExternalProductId: string;
  user: UserPrivate;
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
  createCollectionContainer: {
    maxWidth: 400,
    overflow: 'hidden',
    // background: isThemeDark(theme)
    //   ? Colors.uniswapMediumNavy
    //   : Colors.slateGreyDark,
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
  expandColor: {
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
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
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
  },
  loading: {
    height: 20,
    width: 20,
  },
})

export default withStyles(styles)( CollectionsPage );