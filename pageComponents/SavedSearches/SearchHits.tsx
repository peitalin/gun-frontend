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
import { withStyles, WithStyles, createStyles, Theme, useTheme } from "@material-ui/core/styles";
// graphql
import { useMutation, useQuery } from '@apollo/client';
// typings
import {
  SavedSearchHitsConnection,
  SavedSearchHit,
  ProductPreviewItem,
} from "typings/gqlTypes";
// components
import Typography from '@material-ui/core/Typography';
import SearchHitsItem from './SearchHitsItem';
import SearchHitsItemLoading from './SearchHitsItemLoading';
// Snackbar
import { useSnackbar } from "notistack";
import {
  GET_SAVED_SEARCH_HITS_BY_USER
} from "queries/saved-search-queries";

import {
  useFacetSearchOptions,
} from "utils/hooksFacetSearch";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";
// Search Component
import SearchOptions, { SelectOption, setCategoryFacets } from "components/SearchOptions";






const SearchHits: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const snackbar = useSnackbar();
  const theme = useTheme()

  // overfetch by 1x pages
  const numItemsPerPage = 5;
  const overfetchBy = 1;
  const initialLimit = numItemsPerPage * overfetchBy

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

  const [loading2, setLoading2] = React.useState(false)

  const { data, loading, error } = useQuery<SearchHitsQData, SearchHitsQVar>(
    GET_SAVED_SEARCH_HITS_BY_USER, {
      variables: {
        limit: limit,
        offset: offset,
      },
      onCompleted: (data) => {
        setLoading2(false)
      },
      onError: (e) => {
        snackbar.enqueueSnackbar(
          `Error getting saved search hits: ${e}`,
          { variant: "error" }
        )
      },
  })

  // prevent flash of empty items due to GridPaginator rerender
  React.useEffect(() => {
    setLoading2(true)
  }, [offset])

  const connection = data?.getSavedSearchHitsByUser

  return (
    <div className={classes.flexCol}>
      <Typography variant="h4" className={classes.title}>
        Product Search Matches
      </Typography>
      <Typography variant="h4" className={classes.subtitle}>
        These products matched your saved searches (last 2 weeks)
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
        disablePriceFilter
        disableCategories
        disableSortby
        sortByOptions={[]}
        maxCategoryInputWidth={250}
        topSectionStyles={{
        }}
        bottomSectionStyles={{
          paddingTop: '1rem',
          paddingBottom: '1rem',
          // backgroundColor: isThemeDark(theme) ? Colors.uniswapDarkNavy : Colors.cream,
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
          loading={loading || loading2}
          loadingComponent={
            <SearchHitsItemLoading />
          }
          emptyComponent={
            <div className={classes.emptyBox}>
              No Saved Search Hits
            </div>
          }
          // className={classes.rowContainer}
          // classNameRoot={classes.gridRoot}
          loadingComponentClassName={classes.loadingComponentClassname}
          gridItemClassName={classes.itemContainer}
        >
          {({ node: savedSearchHit }) => {

            // console.log("SearchHIT:", savedSearchHit)

            // let make = hit.product?.currentSnapshot?.make
            //   ?? hit.externalProduct?.currentExternalProductSnapshot?.make
            // let model = hit.product?.currentSnapshot?.model
            //   ?? hit.externalProduct?.currentExternalProductSnapshot?.model
            // let caliber = hit.product?.currentSnapshot?.caliber
            //   ?? hit.externalProduct?.currentExternalProductSnapshot?.caliber

            let previewItem = savedSearchHit?.product?.featuredVariant?.previewItems?.[0]
              ?? savedSearchHit?.externalProduct?.currentExternalProductSnapshot?.previewItems?.[0]


            let productTitle = savedSearchHit?.productTitle
              ?? savedSearchHit?.product?.currentSnapshot?.title


            return (
              <SearchHitsItem
                product={savedSearchHit.product}
                previewItem={previewItem}
                productTitle={productTitle}
                externalLink={
                  savedSearchHit?.externalProduct?.sourceSiteUrl
                }
                searchHitId={savedSearchHit.id}
                make={savedSearchHit.savedSearch?.model}
                model={savedSearchHit.savedSearch?.make}
                caliber={savedSearchHit.savedSearch?.caliber}
                categorySlug={savedSearchHit.savedSearch?.categorySlug}
                isSeen={savedSearchHit.seen}
                limit={limit}
                offset={offset}
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

export interface SearchHitsQData {
  getSavedSearchHitsByUser: SavedSearchHitsConnection
}
export interface SearchHitsQVar {
  limit?: number
  offset?: number
  unseenOnly?: boolean
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
    width: '100%',
    marginRight: '1.25rem',
    marginLeft: '1.25rem',
  },
  loadingComponentClassname: {
    width: '100%',
    marginRight: '1.25rem',
    marginLeft: '1.25rem',
  },
  emptyBox: {
    background: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    width: '100%',
    height: '100%',
    minHeight: 300,
    borderRadius: BorderRadius,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLighterBlack,
  },
});


export default withStyles(styles)( SearchHits );
