
import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius3x, Colors, isThemeDark } from "layout/AppTheme";
// Typings
import {
  NewsItem,
  NewsItemsConnection,
  Categories,
  ConnectionQuery,
  DealerState,
  UserPrivate,
  SortByNewsItems,
} from "typings/gqlTypes";
// Router
import { useRouter } from "next/router";
// GraphQL
import {
  GET_PRODUCTS_BY_CATEGORY,
 } from "queries/products-queries";
import {
  SEARCH_NEWS_ITEMS_CONNECTION,
 } from "queries/news-items-queries";
import { useQuery } from "@apollo/client";
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Components
import Typography from "@material-ui/core/Typography";
import AlignCenterLayout from "components/AlignCenterLayout";
import NewsItemCardResponsive from "components/NewsItemCardResponsive";
import NewsItemCardAsRow from "components/NewsItemCardAsRow";
// Loading product cards
import NewsItemRowMobileLoading from "components/NewsItemCardResponsive/NewsItemRowMobileLoading";
import LoadingBar from "components/LoadingBar";
import LoadingCards from "pageComponents/FrontPage/LoadingCards";
import {
  useFacetSearchOptions,
} from "utils/hooksFacetSearch";
import BannerSearchPage from "./BannerSearchPage";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";




const SearchResults: React.FC<ReactProps> = (props) => {

  const {
    classes,
    disableMetaHeader = false,
  } = props;

  // const snackbar = useSnackbar();
  const router = useRouter();

  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"))


  /////////////////////////////////// paginator
  let numItemsPerPage = 20;
  let overfetchBy = 1;

  let {
    orderBy,
    setOrderBy,
    priceRange,
    setPriceRange,
    searchTerm,
    setSearchTerm,
    facets,
    setFacets,
    currentCategories,
    setCurrentCategories,
    dealerStates,
    setDealerStates,
    calibers,
    setCalibers,
    actionTypes,
    setActionTypes,
    conditions,
    setConditions,
    paginationParams: {
      limit,
      offset,
      totalCount,
      setTotalCount,
      pageParam,
      setPageParam,
      index,
      setIndex,
      debounceSetIndex,
    },
  } = useFacetSearchOptions({
    limit: numItemsPerPage * overfetchBy,
    overfetchBy: overfetchBy,
    initialOrderBy: SortByNewsItems.CREATED_AT_DESC,
    router: router,
    syncUrlParams: true,
  })

  const [searchTermForGql, setSearchTermForGql] = React.useState<string>(
    (router?.query?.q as any)
  )
  const [categorySlugsForGql, setCategorySlugsForGql] = React.useState(
    router?.query?.category
      ? [router.query.category as string]
      : []
  )
  const [
    dealerStatesForGql,
    setDealerStatesForGql
  ] = React.useState<string[]>(
    (dealerStates?.length > 0)
      ? dealerStates.map(s => s)
      : []
  )
  const [
    calibersForGql,
    setCalibersForGql
  ] = React.useState<string[]>(
    (calibers?.length > 0)
      ? calibers.map(c => c.value)
      : []
  )
  const [
    actionTypesForGql,
    setActionTypesForGql
  ] = React.useState<string[]>(
    router?.query?.actionType
      ? [router.query.actionType as string]
      : []
  )
  const [
    conditionsForGql,
    setConditionsForGql
  ] = React.useState<string[]>(
    (conditions?.length > 0)
      ? conditions.map(c => c)
      : []
  )
  console.log("conditionsForGql: ", conditionsForGql)

  // rowMode by default on mobile
  // const [rowMode, setRowMode] = React.useState(mdDown)
  // rowMode by default
  const [rowMode, setRowMode] = React.useState(true)


  const { data, loading, error } = useQuery<QueryData1, QueryVar1>(
    SEARCH_NEWS_ITEMS_CONNECTION, {
    variables: {
      query: {
        limit: limit,
        offset: offset,
        filter: props.filter,
      },
      // sort by newest by default
      sortBy: orderBy?.value as SortByNewsItems,
      searchTerm: searchTermForGql || "*",
      // require button click to change search with "ForGql" args
      categorySlugs: categorySlugsForGql,
      dealerStates: dealerStatesForGql,
      calibers: calibersForGql,
      actionTypes: actionTypesForGql,
      conditions: conditionsForGql,
    },
    fetchPolicy: "cache-and-network",
  });


  React.useEffect(() => {
    if (!loading && !!newsItemsConnection?.totalCount) {
      setTotalCount(newsItemsConnection?.totalCount)
    }
  }, [loading])

  const newsItemsConnection = data?.getNewsItemsSearchConnection

  // console.log("newsItemsConnection: ", newsItemsConnection)
  // console.log("totalItemsInFacet: ", totalItemsInFacet)
  // console.log("initialRouteCategory: ", props.initialRouteCategory)
  // console.log("categorySlug: ", categorySlug)
  // console.log("currentCategories: ", currentCategories)

  // check pageParam sync on url, facetHooks, and UI component
  // console.log("pageParam: ", pageParam)
  // console.log("index: ", index)
  // console.log("offset: ", offset)
  // console.log(">>>>>orderBy: ", orderBy)

  return (
    <AlignCenterLayout
      maxWidth={1160}
      className={classes.root}
      pageRecommendationsContainerClassname={classes.greyBackground}
      withRecommendations={false}
    >

      <LoadingBar
        fixed
        color={
          isThemeDark(theme)
            ? Colors.purple
            : Colors.ultramarineBlue
        }
        height={4}
        width={'100vw'}
        loading={loading}
        style={{ zIndex: 1505, top: 0, right: 0 }}
      />

      <div className={clsx(
        classes.flexColStart,
        classes.positionRelative,
        classes.maxWidth
      )}>

        <BannerSearchPage
          disableMetaHeader={disableMetaHeader}
          bannerTitle={props.bannerTitle}
          bannerBlurb={props.bannerBlurb}
          // searchbar params
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          facets={facets}
          setFacets={setFacets}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setCurrentCategories={setCurrentCategories}
          currentCategories={currentCategories}
          dealerStates={dealerStates}
          setDealerStates={setDealerStates}
          calibers={calibers}
          setCalibers={setCalibers}
          actionTypes={actionTypes}
          setActionTypes={setActionTypes}
          conditions={conditions}
          setConditions={setConditions}
          paginationParams={{
            limit: limit,
            offset: offset,
            overfetchBy: overfetchBy,
            totalCount: totalCount,
            setTotalCount: setTotalCount,
            pageParam: pageParam,
            setPageParam: setPageParam,
            index: index,
            setIndex: setIndex,
            debounceSetIndex: debounceSetIndex,
            totalPages: newsItemsConnection?.pageInfo?.totalPages
          }}
          disableCategoriesFilter={props.disableCategoriesFilter}
          categorySlugsForGql={categorySlugsForGql}
          setCategorySlugsForGql={setCategorySlugsForGql}
          setSearchTermForGql={setSearchTermForGql}
          setCalibersForGql={setCalibersForGql}
          setDealerStatesForGql={setDealerStatesForGql}
          setConditionsForGql={setConditionsForGql}
          initialDropdownCategories={props.initialDropdownCategories}
          rowMode={rowMode}
          setRowMode={setRowMode}
          sortByOptions={[
            { label: "Newest", value: SortByNewsItems.CREATED_AT_DESC },
            { label: "Oldest", value: SortByNewsItems.CREATED_AT_ASC },
            { label: "Price (High)", value: SortByNewsItems.PRICE_DESC },
            { label: "Price (Low)", value: SortByNewsItems.PRICE_ASC },
          ]}
        />


        <div className={clsx(
          classes.sectionContainer,
          lgDown ? classes.sectionPaddingLeftMobile : classes.sectionPaddingLeftDesktop
        )}>
          {
            !loading &&
            (newsItemsConnection?.edges ?? []).length === 0 &&
            <div className={clsx(
              classes.flexCol,
              classes.width100,
              classes.noProductsForSale,
            )}>
              <Typography variant="subtitle2" className={classes.noProductsText}>
                No products for sale in this category.
              </Typography>
            </div>
          }
          {

            (newsItemsConnection?.edges ?? []).length > 0 &&
            <GridPaginatorGeneric<NewsItem>
              index={index}
              connection={newsItemsConnection}
              totalCount={totalCount}
              setTotalCount={setTotalCount}
              numItemsPerPage={numItemsPerPage}
              overfetchBy={overfetchBy}
              disableAnimation
              loading={loading}
                // rowMode is initially undefined on SSR render
                // so this is the SRR initial paint for mobile and desktop.
                // after rowMode is set (with the toggle) we choose between the
                // types of product cards
              loadingComponent={
                <>
                  <ShowOnMobileOrDesktopSSR desktop>
                    <LoadingCards count={1}/>
                  </ShowOnMobileOrDesktopSSR>
                  <ShowOnMobileOrDesktopSSR mobile>
                    <NewsItemRowMobileLoading/>
                  </ShowOnMobileOrDesktopSSR>
                </>
              }
              containerStyle={{ minHeight: 284*2 }}
              gridItemClassName={
                rowMode ? classes.gridItemRow : classes.gridItemCard
              }
            >
              {({ node: newsItem }) => {
                return (
                  <div key={newsItem.id}
                    className={clsx(
                      rowMode ? classes.flexItemRows : classes.flexItemCards,
                      classes.marginRightHalf,
                    )}
                  >
                    {/* <NewsItemCardAsRow newsItem={newsItem}/> */}
                    {
                      rowMode
                        ? <NewsItemCardAsRow
                            newsItem={newsItem}
                          />
                        : <NewsItemCardResponsive
                            newsItem={newsItem}
                          />
                    }
                  </div>
                )
              }}
            </GridPaginatorGeneric>
          }

        </div>
      </div>
    </AlignCenterLayout>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  initialRouteCategory: Categories;
  initialDropdownCategories: Categories[];
  disableCategoriesFilter: boolean
  disableMetaHeader?: boolean;
  bannerTitle?: string;
  bannerBlurb?: string;
  user: UserPrivate;
  filter?: string;
}
interface QueryData1 {
  // productsByCategoryConnection: ProductsConnection
  getNewsItemsSearchConnection: NewsItemsConnection
}
interface QueryVar1 {
  query: ConnectionQuery;
  sortBy?: SortByNewsItems;
  searchTerm?: string;
  categorySlugs?: string[];
  dealerStates?: string[];
  calibers?: string[];
  actionTypes?: string[];
  conditions?: string[];
}


export const styles = (theme: Theme) => createStyles({
  root: {
    height: '100%',
    position: "relative",
  },
  positionRelative: {
    position: "relative",
  },
  maxWidth: {
    maxWidth: 1160, // 4 items per row
    width: '100%',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexColStart: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  flexItemCards: {
    marginBottom: '1rem',
  },
  flexItemRows: {
    marginBottom: '.25rem',
  },
  marginRight1: {
    marginRight: '1rem',
  },
  marginRightHalf: {
    marginRight: '0.5rem',
  },
  width100: {
    width: '100%',
  },
  sectionContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    width: '100%',
    minHeight: 600,
    marginTop: "0.5rem",
  },
  sectionPaddingLeftDesktop: {
    paddingLeft: '1rem',
  },
  sectionPaddingLeftMobile: {
    paddingLeft: '0.5rem',
  },
  title: {
    marginTop: '1rem',
    marginBottom: '0.5rem',
    color: Colors.cream,
  },
  subtitle: {
    marginBottom: '1rem',
    color: Colors.lightGrey,
  },
  greyBackground: {
    backgroundColor: Colors.lightestGrey,
    paddingBottom: '1rem',
    borderTop: `1px solid ${Colors.mediumLightGrey}`,
  },
  noProductsForSale: {
    height: 480,
    marginBottom: '1rem',
  },
  noProductsText: {
    color: Colors.darkGrey,
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  bannerContainer: {
    position: "relative",
    maxWidth: 1160,
    padding: '1rem',
    width: '100%',
  },
  bannerContainerSm: {
    position: "relative",
    maxWidth: 1160,
    padding: '0rem',
    width: '100%',
  },
  gridItemRow: {
    width: '100%',
  },
  gridItemCard: {
  },
});

export default withStyles(styles)( SearchResults );



