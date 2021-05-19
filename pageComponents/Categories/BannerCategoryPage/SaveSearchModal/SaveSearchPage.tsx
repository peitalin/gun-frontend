import React from 'react';
// Styles
import {
  Colors,
  isThemeDark,
  Gradients,
  BorderRadius,
  BorderRadius2x,
  BorderRadius4x,
  BoxShadows,
} from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
// graphql
import { useMutation, useQuery } from '@apollo/client';
// typings
import {
  Saved_Searches_Aggregate,
  Saved_Searches,
  BlankMutationResponse,
} from "typings/gqlTypes";
// components
import Typography from '@material-ui/core/Typography';
import ButtonLoading from "components/ButtonLoading";
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from "@material-ui/icons/Clear";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Snackbar
import { useSnackbar } from "notistack";
import {
  GET_SAVED_SEARCHES_BY_USER,
  INSERT_SAVED_SEARCH,
  DELETE_SAVED_SEARCH,
} from "queries/search-queries";
// router
import { useRouter } from "next/router";
// Formatting
import { asCurrency as c } from "utils/prices";
// Validation
import { validationSchemas } from "utils/validation";
import { useFormik } from 'formik';



const SaveSearchPage: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const snackbar = useSnackbar();
  const router = useRouter();


  const [insertSavedSearch, insertSavedSearchResponse] = useMutation<MData, MVar>(
    INSERT_SAVED_SEARCH, {
      variables: {
        searchTerm: props.searchTerm,
        categorySlug: props.categorySlug,
        caliber: props.caliber,
        dealerState: props.dealerState,
      },
      update: (cache, { data: { insertSavedSearch }}) => {

        const cacheData = cache.readQuery<QData, QVar>({
          query: GET_SAVED_SEARCHES_BY_USER,
          variables: {},
        })
        // console.log("CACHE DATA: ", cacheData)

        cache.writeQuery({
          query: GET_SAVED_SEARCHES_BY_USER,
          variables: {},
          data: {
            getSavedSearchesByUser: {
              __typename: cacheData?.getSavedSearchesByUser?.__typename,
              aggregate: cacheData?.getSavedSearchesByUser?.aggregate,
              nodes: [
                ...cacheData?.getSavedSearchesByUser?.nodes,
                insertSavedSearch
              ]
            }
          },
        })
      },
      onCompleted: () => {
        snackbar.enqueueSnackbar(
          `Search saved successfully.`,
          { variant: "success" }
        )
      },
      onError: (e) => {
        snackbar.enqueueSnackbar(
          `${e}`,
          { variant: "error" }
        )
      },
  })

  const [deleteSavedSearch, deleteSavedSearchResponse] = useMutation<MData3, MVar3>(
    DELETE_SAVED_SEARCH, {
      variables: {
        savedSearchId: undefined,
      },
      update: (cache, { data: { deleteSavedSearch }}) => {

        const cacheData = cache.readQuery<QData, QVar>({
          query: GET_SAVED_SEARCHES_BY_USER,
          variables: {},
        });
        // console.log("CACHE DATA: ", cacheData)

        cache.writeQuery({
          query: GET_SAVED_SEARCHES_BY_USER,
          variables: {},
          data: {
            getSavedSearchesByUser: {
              __typename: cacheData?.getSavedSearchesByUser?.__typename,
              aggregate: cacheData?.getSavedSearchesByUser?.aggregate,
              nodes: cacheData?.getSavedSearchesByUser?.nodes.filter(
                node => node.id !== deleteSavedSearch?.id
              ),
            }
          },
        });
      },
      onCompleted: () => {
        snackbar.enqueueSnackbar(
          `Search deleted.`,
          { variant: "success" }
        )
      },
      onError: (e) => {
        snackbar.enqueueSnackbar(
          `Error deleting search: ${e}`,
          { variant: "error" }
        )
      },
  })

  const { data, loading, error } = useQuery<QData, QVar>(
    GET_SAVED_SEARCHES_BY_USER, {
      variables: { },
      onCompleted: (data) => {
        // snackbar.enqueueSnackbar(
        //   `Retreived ${data?.getSavedSearchesByUser?.aggregate?.count} searches`,
        //   { variant: "success" }
        // )
      },
      onError: (e) => {
        snackbar.enqueueSnackbar(
          `Error getting saved searches: ${e}`,
          { variant: "error" }
        )
      },
  })

  console.log("data:::", data)


  const formik = useFormik({
    initialValues: {
      searchTerm: props.searchTerm,
      categorySlug: props.categorySlug,
      caliber: props.caliber,
      dealerState: props.dealerState,
    },
    validationSchema: validationSchemas.SaveSearch,
    onSubmit: async (values) => {
      // createChat()
      snackbar.enqueueSnackbar(
        `Saving search`,
        { variant: "info" }
      )
      console.log("formik onSubmit, searchTerm: ", values.searchTerm)
      await insertSavedSearch({
        variables: {
          searchTerm: props.searchTerm,
          categorySlug: props.categorySlug,
          caliber: props.caliber,
          dealerState: props.dealerState,
        }
      })
    },
  });

      console.log("dealerState: ", props.dealerState)

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={classes.insertSavedSearchFormRoot}
    >
      <div className={classes.flexCol}>
        <Typography variant="h4" className={classes.title}>
          Your Saved Searches
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Get notified when a new product matches your saved search
        </Typography>
      </div>

      <div className={classes.flexCol}>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Current Search Query
        </Typography>
        <SavedSearchItem
          classes={classes}
          onClickDelete={undefined}
          isHighlighted={true}
          searchTerm={props.searchTerm}
          categorySlug={props.categorySlug}
          caliber={props.caliber}
          dealerState={props.dealerState}
        />
      </div>

      <ButtonLoading
        type="submit" // submits formik
        className={classes.insertSaveSearchButton}
        style={{ }}
        variant={"contained"}
        loadingIconColor={Colors.cream}
        replaceTextWhenLoading={true}
        loading={insertSavedSearchResponse?.loading}
        disabled={!process.browser || props.disabled}
        onClick={() => { }}
      >
        { 'Save this Search' }
      </ButtonLoading>

      <div className={classes.flexCol}>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Existing Saved Searches:
        </Typography>
        {
          data?.getSavedSearchesByUser?.nodes?.map(savedSearch => {
            return (
              <SavedSearchItem
                classes={classes}
                onClickDelete={() => {
                  deleteSavedSearch({
                    variables: {
                      savedSearchId: savedSearch.id
                    }
                  })
                }}
                isHighlighted={false}
                searchTerm={savedSearch.searchTerm}
                categorySlug={savedSearch.categorySlug}
                caliber={savedSearch.caliber}
                dealerState={savedSearch.dealerState}
              />
            )
          })
        }
      </div>

    </form>
  )
}


const SavedSearchItem = (props: SavedSearchItemProps) => {

  const {
    classes,
    isHighlighted,
    searchTerm,
    categorySlug,
    caliber,
    dealerState,
  } = props

  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className={clsx(
      mdDown
        ? classes.savedSearchContainerMobile
        : classes.savedSearchContainerDesktop,
      isHighlighted
        ? classes.savedSearchBorderHighlight
        : classes.savedSearchBorder,
    )}>
      <div className={
        mdDown ? classes.savedSearchItemMobile : classes.savedSearchItemDesktop
      }>
        <span className={classes.boldText}>Search Term</span>
        <span className={classes.italicText}>"{searchTerm}"</span>
      </div>
      <div className={
        mdDown ? classes.savedSearchItemMobile : classes.savedSearchItemDesktop
      }>
        <span className={classes.boldText}>Category</span>
        <span className={classes.italicText}>{categorySlug ?? "All"}</span>
      </div>
      <div className={
        mdDown ? classes.savedSearchItemMobile : classes.savedSearchItemDesktop
      }>
        <span className={classes.boldText}>Caliber</span>
        <span className={classes.italicText}>{caliber ?? "All"}</span>
      </div>
      <div className={
        mdDown ? classes.savedSearchItemMobile : classes.savedSearchItemDesktop
      }>
        <span className={classes.boldText}>Dealer State</span>
        <span className={classes.italicText}>{dealerState ?? "All"}</span>
      </div>
      <div className={classes.savedSearchItem5}>
        {
          props.onClickDelete &&
          <IconButton
            className={classes.closeIcon}
            onClick={props.onClickDelete}
            size={"small"}
          >
            <ClearIcon/>
          </IconButton>
        }
      </div>
    </div>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  searchTerm: string
  categorySlug?: string
  caliber?: string
  dealerState?: string
  disabled?: boolean;
}
interface SavedSearchItemProps extends WithStyles<typeof styles> {
  onClickDelete(): void;
  isHighlighted: boolean;
  searchTerm: string
  categorySlug?: string
  caliber?: string
  dealerState?: string
  disabled?: boolean;
}

interface MData {
  insertSavedSearch: Saved_Searches
}
interface MVar {
  searchTerm: string
  categorySlug?: string
  caliber?: string
  dealerState?: string
}
interface QData {
  getSavedSearchesByUser: Saved_Searches_Aggregate
}
interface QVar {
  limit?: number
  offset?: number
}

interface MData3 {
  deleteSavedSearch: Saved_Searches
}
interface MVar3 {
  savedSearchId?: string
}


const styles = (theme: Theme) => createStyles({
  insertSavedSearchFormRoot: {
    width: '100%',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    minWidth: 330,
    borderRadius: BorderRadius4x,
    background: isThemeDark(theme)
      ? Gradients.gradientUniswapDark.background
      : Gradients.gradientGrey.background,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapDarkNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '0.5rem',
    width: '100%',
  },
  title: {
    marginTop: "1.25rem",
    fontSize: "1.25rem",
    marginBottom: '0.5rem',
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
  },
  subtitle: {
    fontSize: "1rem",
    marginTop: '1rem',
    fontWeight: 600,
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyLightBlack,
  },
  insertSaveSearchButton: {
    width: 160,
    height: 40,
    marginTop: "1rem",
    marginBottom: "1rem",
    borderRadius: BorderRadius4x,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.purple
      : Colors.ultramarineBlue,
    color: Colors.cream,
    "&:hover": {
      backgroundColor: theme.palette.type === 'dark'
        ? fade(Colors.purple, 0.9)
        : fade(Colors.ultramarineBlueDark, 0.9),
    }
  },
  bidInputWrapper: {
    margin: '1rem',
  },
  inputField: {
    flexGrow: 1,
    minWidth: 100,
  },
  savedSearchContainerDesktop: {
    position: "relative",
    display: 'flex',
    flexDirection: 'row',
    borderRadius: BorderRadius2x,
    padding: '0.5rem 1rem',
    marginTop: '0.5rem',
  },
  savedSearchContainerMobile: {
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    borderRadius: BorderRadius2x,
    padding: '0.5rem 1rem',
    marginTop: '0.5rem',
  },
  savedSearchBorder: {
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapMediumGrey}`
      : `1px solid ${Colors.slateGreyDarkest}`,
  },
  savedSearchBorderHighlight: {
    border: isThemeDark(theme)
      ? `1px solid ${Colors.purple}`
      : `1px solid ${Colors.ultramarineBlue}`,
    boxShadow: isThemeDark(theme)
      ? BoxShadows.shadowWhite.boxShadow
      : BoxShadows.shadow4.boxShadow,
  },
  savedSearchItemDesktop: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minWidth: 100,
    marginRight: '0.5rem',
  },
  savedSearchItemMobile: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    minWidth: 80,
    marginRight: '0.5rem',
    justifyContent: "space-between",
  },
  savedSearchItem5: {
    position: 'absolute',
    top: 'calc(50% - 16px)', // iconButton height is 32px, divide by 2
    right: '-1rem',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  boldText: {
    fontWeight: 600,
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyBlack,
  },
  italicText: {
    fontStyle: 'italic',
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
  },
  closeIcon: {
    width: 32,
    height: 32,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapGrey
      : Colors.slateGreyDarker,
    "&:hover": {
      background: theme.palette.type === 'dark'
        ? Colors.uniswapMediumGrey
        : Colors.slateGreyDarkest,
    },
  },
  closeIconButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: '0rem',
    top: '0rem',
  },
});


export default withStyles(styles)( SaveSearchPage );
