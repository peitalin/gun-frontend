import React from "react";
import { useCallback } from "react";
import clsx from "clsx";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from 'reduxStore/grand-reducer';
// Router
import { useRouter } from "next/router";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, BorderRadius2x, BoxShadows } from "layout/AppTheme";
// Typings
import {
  UserPrivate,
  ProductsConnection,
  StorePrivate,
  ConnectionQuery,
  Product,
  SoldOutStatus,
  Order_By,
} from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Components
import ProductRow from "pageComponents/SellerDashboard/PublishedProductsList/ProductRow";
import ProductList from "pageComponents/SellerDashboard/PublishedProductsList/ProductList";
import ProductEdit from "pageComponents/ProductEdit"
import BackTo from "components/BackTo";
import LoadingBar from "components/LoadingBar";
import ResponsivePadding from "../ResponsivePadding";
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import EmptyProductList from "pageComponents/SellerDashboard/PublishedProductsList/EmptyProductList";
// pagination
import PaginateButtons from "components/Paginators/PaginateButtons";
import { useQuery, useLazyQuery, DocumentNode } from "@apollo/client";
import { DASHBOARD_PRODUCTS_CONNECTION } from "queries/store-queries";
// Search Component
import SearchOptions, { SelectOption, setCategoryFacets } from "components/SearchOptions";
import {
  useFacetSearchOptions,
  totalItemsInIsPublishedFacet,
} from "utils/hooksFacetSearch";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";



let numItemsPerPage = 10;
let overfetchBy = 1;
export let initialDashboardVariables: {
  searchTerm: string,
  query: {
    limit: number
    offset: number
    orderBy: any
    facetFilters: string[][]
  },
} = undefined
// this is set later in the body of the React component


const PublishedProductsList = (props: ReactProps) => {

  const {
    classes,
    // store,
  } = props;

  const router = useRouter();
  const dispatch = useDispatch();
  const isDarkMode = useSelector<GrandReduxState, boolean>(s => {
    return s.reduxLogin.darkMode === 'dark'
  })
  const productId = router?.query?.productId;

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

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
      index,
      setIndex,
      debounceSetIndex,
    },
    currentCategories,
    setCurrentCategories,
  } = useFacetSearchOptions({
    limit: numItemsPerPage * overfetchBy,
    overfetchBy: overfetchBy,
    syncUrlParams: true,
    router: router,
  })

  const publishedProps = {
    hideDelete: true,
    hidePublish: true,
    hideUnpublish: false,
    hideShareLinkButton: false,
    hideViewButton: false,
  };

  const unpublishedProps = {
    hideDelete: false,
    hidePublish: false,
    hideUnpublish: true,
    hideShareLinkButton: true,
    hideViewButton: true,
  };

  const [getProducts, getProductsResponse] = useLazyQuery<QueryDataDashboardProducts, QueryVar>(
    DASHBOARD_PRODUCTS_CONNECTION, {
    variables: {
      searchTerm: searchTerm ? searchTerm : "*",
      query: {
        limit: limit,
        offset: offset,
        orderBy: orderBy.value as any,
        // filters: `_price >= ${priceRange[0]} AND _price <= ${priceRange[1]}`,
        facetFilters: (facets && facets.length > 0)
          ? [facets]
          : null,
      }
    },
    onError: useCallback((e) => { console.log(e) }, []),
    onCompleted: useCallback(async (data) => { console.log(data) }, []),
    // fetchPolicy: "network-only",
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: 'cache-first',
    // fetchPolicy: "no-cache",
    // buggy, infinite request loop when using fetchPolicy: network-only
    // apollo devs are retards
    // https://github.com/apollographql/apollo-client/issues/6301
    // errorPolicy: "all",
  });

  let refetchQuery = {
    query: DASHBOARD_PRODUCTS_CONNECTION,
    variables: {
      searchTerm: searchTerm ? searchTerm : "*",
      query: {
        limit: limit,
        offset: offset,
        orderBy: orderBy.value as any,
        // filters: `_price >= ${priceRange[0]} AND _price <= ${priceRange[1]}`,
        facetFilters: (facets && facets.length > 0)
          ? [facets]
          : null,
      }
    },
  }

  initialDashboardVariables = refetchQuery.variables


  const connection: ProductsConnection =
    getProductsResponse?.data?.dashboardProductsConnection

  let totalCountInFacet = totalItemsInIsPublishedFacet({
    searchTerm: searchTerm,
    priceRange: priceRange,
    isPublished: true,
    facetsDistribution: connection?.facetsDistribution,
    productsConnection: connection,
    totalCount: totalCount,
    limitOverfetchBy: limit * overfetchBy
  })

  const refetchTheProducts = async () => {
    if (
      getProductsResponse &&
      typeof getProductsResponse.refetch === 'function'
    ) {
      await getProductsResponse.refetch()
    }
  }

  /////////// Hooks ///////////

  React.useEffect(() => {
    getProducts()
  }, [])

  // console.log("connection", connection)
  // console.log("gridAccum", gridAccum)
  // console.log("index", index)
  console.log("pageParam", pageParam)
  // console.log("totalCountInFacet", totalCountInFacet)


  if (!productId) {
    return (
      <ResponsivePadding>
        <div className={classes.goBackContainer}>
          <Typography className={classes.title} variant="h2">
            Products
          </Typography>
        </div>
        <SearchOptions
          facets={facets}
          setCategoryFacets={setCategoryFacets({ facets, setFacets })}
          currentCategories={currentCategories}
          setSearchTerm={setSearchTerm}
          setOrderBy={setOrderBy}
          setPriceRange={setPriceRange}
          filterSectionStyles={{ paddingLeft: 0 }}
          paginationParams={{
            totalCount: totalCountInFacet || totalCount,
            overfetchBy: overfetchBy,
            limit: limit,
            pageParam: pageParam,
            setPageParam: setPageParam,
            index: index,
            setIndex: setIndex,
          }}
          disablePriceFilter
          disableCategories
          dropdownContainerStyle={{ marginRight: 0 }}
          topSectionStyles={{
            padding: '1rem',
            paddingBottom: '0.5rem',
            backgroundColor: isDarkMode ? Colors.uniswapDarkNavy : Colors.cream,
            border: isDarkMode
              ? `1px solid ${Colors.uniswapNavy}`
              : `1px solid ${Colors.slateGreyDarker}`,
            // boxShadow: isDarkMode
            //   ? 'unset'
            //   : BoxShadows.shadow3.boxShadow,
            borderRadius: BorderRadius2x,
          }}
          bottomSectionStyles={{
            marginTop: "0.5rem",
            paddingBottom: '1rem',
            backgroundColor: isDarkMode ? Colors.uniswapDarkNavy : Colors.cream,
            border: isDarkMode
              ? `1px solid ${Colors.uniswapNavy}`
              : `1px solid ${Colors.slateGreyDarker}`,
            // boxShadow: isDarkMode
            //   ? 'unset'
            //   : BoxShadows.shadow3.boxShadow,
            borderRadius: BorderRadius,
          }}
        >
          <div className={classes.flexCol}>
            <div className={classes.titleBarContainer}>
              <div className={classes.titleCell1}>
                Product
              </div>
              {
                !mdDown &&
                <div className={classes.titleCell2}>
                  Status
                </div>
              }
              {
                !mdDown &&
                <div className={classes.titleCell3}>
                </div>
              }
              <LoadingBar
                absoluteBottom
                color={Colors.gradientUniswapBlue1}
                height={4}
                width={'100%'}
                loading={getProductsResponse.loading}
              />
            </div>
            <div className={
              smDown
                ? classes.productsContainerSm
                : classes.productsContainer
            }>
              {
                connection?.edges?.length === 0
                ? <div className={classes.emptyItems}>
                    <Typography variant="body1" className={classes.emptyItemsTitle}>
                      Your product listings will appear here
                      after your first upload.
                    </Typography>
                    <Button variant="outlined" color="primary"
                      onClick={() => router.push(`/sell`)}
                    >
                      Browse Products
                    </Button>
                  </div>
                : <GridPaginatorGeneric<Product>
                    index={index}
                    connection={connection}
                    totalCount={totalCount}
                    setTotalCount={setTotalCount}
                    numItemsPerPage={numItemsPerPage}
                    className={classes.flexCol}
                  >
                    {({ node: product }) => {

                      let hideEdit = product.soldOutStatus !== SoldOutStatus.AVAILABLE

                      if (product.isPublished) {
                        return (
                          <ProductRow
                            key={product.id}
                            product={product}
                            hideEdit={hideEdit}
                            loading={getProductsResponse.loading}
                            refetchProducts={refetchTheProducts}
                            refetchQuery={refetchQuery}
                            {...publishedProps}
                          />
                        )
                      } else {
                        return (
                          <ProductRow
                            key={product.id}
                            product={product}
                            hideEdit={hideEdit}
                            loading={getProductsResponse.loading}
                            refetchProducts={refetchTheProducts}
                            refetchQuery={refetchQuery}
                            {...unpublishedProps}
                          />
                        )
                      }
                    }}
                  </GridPaginatorGeneric>
              }
            </div>
          </div>
        </SearchOptions>
      </ResponsivePadding>
    )
  } else {
    return (
      <ResponsivePadding>
        <BackTo />
        <div className={clsx(classes.flexRow, classes.subtitle)}>
          <Typography variant="h4">
            Edit Product Listing
          </Typography>
        </div>
        {
          connection &&
          <EditProductPage
            productsConnection={connection}
            loading={getProductsResponse.loading}
            refetchQuery={refetchQuery}
          />
        }
      </ResponsivePadding>
    )
  }
}



const EditProductPage = (props: {
  productsConnection: ProductsConnection,
  loading: boolean,
  refetchQuery: { query: any, variables: any }
}) => {

  const { productsConnection, loading } = props;
  const router = useRouter();

  return <>
  {
    productsConnection.edges
    .filter(({ node: product }) => product.id === router.query.productId)
    .map(({ node: product }) =>
      <div key={product.id}>
        <ProductRow
          product={product}
          loading={loading}
          refetchQuery={props.refetchQuery}
        />
        <ProductEdit
          asModal={false}
          product={product}
        />
      </div>
    )
  }
  </>
}

interface ReactProps extends WithStyles<typeof styles> {
  store?: StorePrivate;
}

interface QueryVar {
  searchTerm?: string;
  query?: ConnectionQuery;
}
export interface QueryDataDashboardProducts {
  // user: UserPrivate;
  dashboardProductsConnection: ProductsConnection;
}



export const styles = (theme: Theme) => createStyles({
  searchHeader: {
    backgroundColor: Colors.foregroundColor,
    // border: `1px solid `,
    padding: '0.5rem 0rem 0.5rem 1rem',
    marginBottom: '.15rem',
    borderRadius: `${BorderRadius}px ${BorderRadius}px 0px 0px`,
  },
  root: {
    // borderRadius: `${BorderRadius}px`,
    // border: '1px solid #eaeaea',
    // backgroundColor: Colors.foregroundColor,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingDesktop: {
    padding: '0rem 1rem 2rem 1rem',
  },
  paddingMobile: {
    padding: '0rem 0.5rem 0.5rem 0.5rem',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  spaceTop: {
    marginTop: '2rem',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  subtitle: {
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  goBackContainer: {
    display: 'flex',
    position: 'relative',
    width: '100%',
  },
  iconButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
    "&:hover": {
      cursor: "pointer",
      color: Colors.purple,
      transition: theme.transitions.create('color', {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      }),
    },
  },
  iconButton: {
    marginRight: '0.5rem',
  },
  pad1rem: {
    padding: '1rem',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    marginBottom: '1rem',
    marginTop: '1rem',
  },
  contentContainer: {
    flexBasis: '70%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    maxWidth: 800,
  },
  marginTopBottom: {
    margin: '1rem 0rem 1rem 0rem',
  },
  titleBarContainer: {
    position: "relative", // for <LoadingBar/>: absolute position
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  titleCell1: {
    color: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLighterGrey}`
      : `1px solid ${Colors.charcoal}`,
    flexBasis: '60%',
    flexGrow: 1,
    padding: '0.5rem',
    borderBottom: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDark}`,
    justifyContent: 'flex-start',
    minWidth: 300,
    fontSize: "0.825rem",
    fontWeight: 600,
  },
  titleCell2: {
    color: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLighterGrey}`
      : `1px solid ${Colors.charcoal}`,
    flexBasis: '10%',
    flexGrow: 1,
    padding: '0.5rem',
    paddingLeft: '0rem',
    borderBottom: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDark}`,
    justifyContent: 'flex-start',
    minWidth: 100,
    fontSize: "0.825rem",
    fontWeight: 600,
  },
  titleCell3: {
    color: Colors.uniswapLighterGrey,
    flexBasis: '30%',
    flexGrow: 1,
    padding: '0.5rem',
    borderBottom: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDark}`,
    justifyContent: 'flex-start',
    minWidth: 150,
    fontSize: "0.825rem",
    fontWeight: 600,
  },
  productsContainer: {
    padding: '1rem',
    minHeight: '620px'
  },
  productsContainerSm: {
    padding: '1rem',
    minHeight: '1085px'
  },
  emptyItems: {
    minHeight: 300,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
    borderRadius: BorderRadius,
    backgroundColor: theme.palette.type === 'dark'
      ? theme.colors.uniswapDarkNavy
      : Colors.cream,
    width: '100%',
    padding: '3rem',
  },
  emptyItemsTitle: {
    marginBottom: '1rem',
  },
});



export default withStyles(styles)(PublishedProductsList)