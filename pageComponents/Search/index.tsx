import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { NavBarHeight } from "layout/NavBarMain/styles";
import { Colors } from "layout/AppTheme";
// GraphQL
import { useQuery } from "@apollo/client";
// Typings
import { ProductsConnection, ConnectionOffsetQuery, Product } from "typings/gqlTypes";
import { SEARCH_ALL_PRODUCTS } from "queries/search-queries";
// Utils
import ErrorDisplay from "components/Error";
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
import Typography from "@material-ui/core/Typography";
// Components
import SearchListings from "pageComponents/Search/SearchListings";
import NoListings from "pageComponents/Search/NoListings";
// Router
import { useRouter } from "next/router";
// Recommendations
// import YouMayAlsoLikeMobile from "components/Recommendations/YouMayAlsoLikeMobile";
// Next
import dynamic from "next/dynamic";
// const YouMayAlsoLike = dynamic(
//   () => import("components/Recommendations/YouMayAlsoLike"), {
//     loading: () => <Loading/>,
//     ssr: false,
//   }
// );
import {
  useFacetSearchOptions,
  useEffectUpdateGridAccum,
  totalItemsInCategoriesFacets,
  PaginatorType,
} from "utils/hooksFacetSearch";
// Analytics
import { useAnalytics } from "utils/analytics";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import LoadingBar from "components/LoadingBar";
import SearchOptions from "components/SearchOptions";
import GridPaginatorGeneric from "components/GridPaginatorGeneric";
import ProductRow from "pageComponents/FrontPage/FeaturedProducts/ProductRow";



const SearchResults = (props: ReactProps) => {

  const { classes } = props;
  const router = useRouter();

  // /// for testing only
  // const qQuery = decodeURIComponent(router.query.q as string);
  // const pageQuery = decodeURIComponent(router.query.page as string);
  console.log("pathname: ", router.pathname)
  // console.log("query: ", initialSearchTerm)
  // console.log("page: ", initialPageParam)


  /////////////////////////////////// paginator
  let numItemsPerPage = 40;
  let overfetchBy = 1;
  // overfetch by 2x pages

  let {
    orderBy,
    setOrderBy,
    priceRange,
    setPriceRange,
    searchTerm,
    setSearchTerm,
    facets,
    setFacets,
    paginationParams: {
      limit,
      offset,
      totalCount,
      setTotalCount,
      pageParam,
      setPageParam,
    },
    currentCategories,
    setCurrentCategories,
    index,
    setIndex,
  } = useFacetSearchOptions({
    limit: numItemsPerPage * overfetchBy,
    overfetchBy: overfetchBy,
    router: router,
    paginatorType: PaginatorType.page,
  })

  const { loading, data, error } = useQuery<QueryData, QueryVar>(
    SEARCH_ALL_PRODUCTS, {
    variables: {
      // searchTerm: searchTerm || " ", // if no search term, don't error, return all.
      searchTerm: searchTerm,
      query: {
        limit: limit,
        offset: offset,
      }
    },
    ssr: true,
  });

  useAnalytics("View.Search", { searchTerm: searchTerm });
  const searchResultsConnection = data?.search || props.initialSearch;

  // console.log("searchTerm: ", searchTerm)
  React.useEffect(() => {
    setTotalCount(data?.search?.totalCount)
  }, [data?.search?.totalCount])

  // console.log("totalCount: ", data?.search?.totalCount)
  // console.log('data: ', data)

  if (error) {
    if (error.message.includes("searchTerm")) {
      return (
        <div className={clsx(classes.root, classes.flexColSpaceBetween)}>
          <div className={clsx(classes.flexCol, classes.maxWidth)}>
            <div className={classes.titleContainer}>
              <Typography variant='h5'>No search term provided...</Typography>
            </div>
          </div>
        </div>
      )
    } else {
      return <ErrorDisplay title={"Search Results"} error={error}/>;
    }
  } else {
    return (
      <div className={clsx(
        classes.root,
        classes.flexColSpaceBetween,
        classes.positionRelative,
      )}>
        {
          loading &&
          <LoadingBar
            absoluteTop
            color={Colors.magenta}
            height={4}
            width={'100vw'}
            loading={true}
          />
        }
        <div className={clsx(
          classes.flexCol,
          classes.maxWidth,
          classes.padding1,
        )}>
          <div className={classes.titleContainer}>
            <Typography variant="h4" className={classes.title}>
              {"Search results for "}
              <span className={classes.searchTerm}>{searchTerm}</span>
            </Typography>
          </div>
          <ErrorBounds className={classes.sectionContainer}>
            <SearchOptions
              facets={facets}
              // setCategoryFacets={setCategoryFacets({ facets, setFacets })}
              currentCategories={currentCategories}
              setSearchTerm={setSearchTerm}
              setOrderBy={setOrderBy}
              setPriceRange={setPriceRange}
              paginationParams={{
                totalCount: totalCount,
                overfetchBy: overfetchBy,
                limit: limit,
                pageParam: pageParam,
                setPageParam: setPageParam,
                index: index,
                setIndex: setIndex,
              }}
              updateSetPageDelay={0}
              disableCategories={true}
              disablePriceFilter={true}
              disableSearchFilter={true}
              disableSortby={true} // disable for now
              topSectionStyles={{
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
              bottomSectionStyles={{
                marginTop: '1rem',
                marginBottom: '2rem',
                width: '100%',
              }}
              filterSectionStyles={{
                justifyContent: "flex-start"
              }}
            >
              {
                (searchResultsConnection?.edges?.length === 0 && !loading) &&
                <NoListings/>
              }
              <GridPaginatorGeneric<Product>
                index={index}
                connection={searchResultsConnection}
                totalCount={totalCount}
                setTotalCount={setTotalCount}
                numItemsPerPage={numItemsPerPage}
                overfetchBy={overfetchBy}
                // disableAnimation
                loading={loading}
                loadingComponent={
                  <ProductRow
                    product={undefined}
                  />
                }
                containerStyle={{ minHeight: 284*2 }}
                gridItemClassName={classes.gridItem}
              >
                {({ node: product }) => {

                  return (
                    <ProductRow
                      key={product.id}
                      product={product}
                    />
                  )
                }}
              </GridPaginatorGeneric>
            </SearchOptions>
          </ErrorBounds>
        </div>

        {/* <Hidden mdUp>
          <YouMayAlsoLikeMobile/>
        </Hidden>
        <Hidden smDown>
          <YouMayAlsoLike
            // initialProducts={initialProductsLimitedRelease}
            title={"You may also like"}
            maxWidth={1160}
          />
        </Hidden> */}
      </div>
    );
  }
}

interface ReactProps extends WithStyles<typeof styles> {
  initialSearch?: ProductsConnection;
}
interface QueryData {
  search: ProductsConnection;
}
interface QueryVar {
  searchTerm: string;
  query: ConnectionOffsetQuery;
}

const styles = (theme: Theme) => createStyles({
  root: {
    minHeight: `calc(100vh - ${NavBarHeight || 150}px)`,
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
  maxWidth: {
    maxWidth: 1024,
    width: '100%',
  },
  padding1: {
    padding: '1rem',
  },
  positionRelative: {
    position: 'relative',
  },
  titleContainer: {
    display: 'flex',
    // shrinks classes.title width to own container
  },
  title: {
    marginBottom: "1rem",
    textDecoration: "underline solid #f4f4f4",
    transition: theme.transitions.create('text-decoration', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
    "&:hover": {
      textDecoration: `underline solid ${theme.palette.primary.light}`,
      transition: theme.transitions.create('text-decoration', {
        easing: theme.transitions.easing.easeIn,
        duration: "200ms",
      }),
    }
  },
  searchTerm: {
    color: Colors.secondary,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexColSpaceBetween: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '100%',
  },
  marginRight1: {
    marginRight: '1rem',
  },
  sectionContainer: {
    opacity: 1,
    position: 'relative',
    width: '100%',
    marginBottom: "2rem",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
});

export default withStyles(styles)( SearchResults );



