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
  SavedSearchesConnection,
  Saved_Searches,
} from "typings/gqlTypes";
// components
import Typography from '@material-ui/core/Typography';
import ButtonLoading from "components/ButtonLoading";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SavedSearchItem from 'pageComponents/SavedSearches/SavedSearchItem';
import ExistingSavedSearches from "pageComponents/SavedSearches/ExistingSavedSearches";
// Snackbar
import { useSnackbar } from "notistack";
import {
  INSERT_SAVED_SEARCH,
  DELETE_SAVED_SEARCH,
} from "queries/saved-search-mutations";
import {
  GET_SAVED_SEARCHES_BY_USER,
} from "queries/saved-search-queries";
// router
import { useRouter } from "next/router";
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
        categorySlug: props.categorySlug,
        dealerState: props.dealerState,
        make: props.make,
        model: props.model,
        caliber: props.caliber,
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
              totalCount: cacheData?.getSavedSearchesByUser?.totalCount,
              edges: [
                ...cacheData?.getSavedSearchesByUser?.edges,
                { node: insertSavedSearch }
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


  const formik = useFormik({
    initialValues: {
      categorySlug: props.categorySlug,
      dealerState: props.dealerState,
      make: props.make,
      model: props.model,
      caliber: props.caliber,
    },
    validationSchema: validationSchemas.SaveSearch,
    onSubmit: async (values) => {
      // createChat()
      snackbar.enqueueSnackbar(
        `Saving search`,
        { variant: "info" }
      )
      await insertSavedSearch({
        variables: {
          categorySlug: props.categorySlug,
          dealerState: props.dealerState,
          make: props.make,
          model: props.model,
          caliber: props.caliber,
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
          loading={false}
          onClickDelete={undefined}
          isHighlighted={true}
          categorySlug={props.categorySlug}
          dealerState={props.dealerState}
          make={props.make}
          model={props.model}
          caliber={props.caliber}
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
        onClick={() => {}}
      >
        { 'Save this Search' }
      </ButtonLoading>

      <ExistingSavedSearches/>

    </form>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
  categorySlug?: string
  dealerState?: string
  disabled?: boolean;
  make?: string
  model?: string
  caliber?: string
}

interface MData {
  insertSavedSearch: Saved_Searches
}
interface MVar {
  categorySlug?: string
  dealerState?: string
  make?: string
  model?: string
  caliber?: string
}
interface QData {
  getSavedSearchesByUser: SavedSearchesConnection
}
interface QVar {
  limit?: number
  offset?: number
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
});


export default withStyles(styles)( SaveSearchPage );
