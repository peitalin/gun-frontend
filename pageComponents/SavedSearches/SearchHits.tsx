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
import { withStyles, WithStyles, createStyles, Theme, fade, useTheme } from "@material-ui/core/styles";
// graphql
import { useMutation, useQuery } from '@apollo/client';
// typings
import {
  SavedSearchHitsConnection,
  SavedSearchHit,
} from "typings/gqlTypes";
// components
import Typography from '@material-ui/core/Typography';
import SearchHitsItem from './SearchHitsItem';
// Snackbar
import { useSnackbar } from "notistack";
import {
  GET_SAVED_SEARCH_HITS_BY_USER
} from "queries/saved-search-queries";

import {
  useFacetSearchOptions,
  totalItemsInCategoriesFacets,
} from "utils/hooksFacetSearch";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";
// Search Component
import SearchOptions, { SelectOption, setCategoryFacets } from "components/SearchOptions";



const SearchHits: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const snackbar = useSnackbar();
  const theme = useTheme()

  const numItemsPerPage = 5;
  const overfetchBy = 1;
  const initialLimit = numItemsPerPage * overfetchBy
  // overfetch by 1x pages

  //// Orders Created Paginator Hooks
  let {
    paginationParams: {
      limit: limit,
      offset: offset,
      pageParam: pageParam,
      setPageParam: setPageParam,
      index: index,
      setIndex: setIndex,
      totalCount,
      setTotalCount,
    },
  } = useFacetSearchOptions({
    limit: initialLimit,
    overfetchBy: overfetchBy,
  })

  const { data, loading, error } = useQuery<QData, QVar>(
    GET_SAVED_SEARCH_HITS_BY_USER, {
      variables: {
        limit: limit,
        offset: offset,
      },
      onCompleted: (data) => {
      },
      onError: (e) => {
        snackbar.enqueueSnackbar(
          `Error getting saved search hits: ${e}`,
          { variant: "error" }
        )
      },
  })

  const connection = data?.getSavedSearchHitsByUser

  return (
    <div className={classes.flexCol}>
      <Typography variant="h4" className={classes.title}>
        Product Search Matches
      </Typography>
      <Typography variant="h4" className={classes.subtitle}>
        These products matched your saved searches
      </Typography>

      <SearchOptions
        paginationParams={{
          totalCount: connection?.totalCount,
          overfetchBy: overfetchBy,
          limit: limit,
          pageParam: pageParam,
          setPageParam: setPageParam,
          index: index,
          setIndex: setIndex,
        }}
        updateSetPageDelay={0}
        disableSearchFilter
        disableSortby
        disablePriceFilter
        disableCategories
        maxCategoryInputWidth={250}
        topSectionStyles={{
        }}
        bottomSectionStyles={{
          paddingTop: '1rem',
          paddingBottom: '1rem',
          backgroundColor: isThemeDark(theme) ? Colors.uniswapDarkNavy : Colors.cream,
          // border: isThemeDark(theme)
          //   ? `1px solid ${Colors.uniswapNavy}`
          //   : `1px solid ${Colors.slateGreyDarker}`,
          borderRadius: BorderRadius,
        }}
      >
        <GridPaginatorGeneric<SavedSearchHit>
          index={index}
          connection={connection}
          totalCount={connection?.totalCount ?? 0}
          setTotalCount={setTotalCount}
          numItemsPerPage={numItemsPerPage}
          // className={classes.rowContainer}
          // classNameRoot={classes.gridRoot}
          gridItemClassName={classes.itemContainer}
        >
          {({ node: savedSearchHit }) => {
            return (
              <SearchHitsItem
                product={savedSearchHit.product}
                searchHitId={savedSearchHit.id}
                searchTerm={savedSearchHit.productTitle}
                categorySlug={savedSearchHit.savedSearch?.categorySlug}
                isSeen={!savedSearchHit.seen}
              />
            )
          }}
        </GridPaginatorGeneric>
      </SearchOptions>
    </div>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
}

interface QData {
  getSavedSearchHitsByUser: SavedSearchHitsConnection
}
interface QVar {
  limit?: number
  offset?: number
}



const styles = (theme: Theme) => createStyles({
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
    marginTop: "1rem",
    fontSize: "1rem",
    marginBottom: '0.5rem',
    fontWeight: 400,
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLighterBlack,
  },
  itemContainer: {
    marginRight: '1.25rem',
    marginLeft: '1.25rem',
  },
});


export default withStyles(styles)( SearchHits );
