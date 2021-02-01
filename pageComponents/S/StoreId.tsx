import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { styles } from "pageComponents/S/styles";
import { Colors, Gradients } from "layout/AppTheme";
// Typings
import {
  ID,
  ConnectionOffsetQuery,
  Product,
  Store,
  FacetsDistributionObject,
  ProductsConnection,
} from "typings/gqlTypes";
// Utils
import Typography from "@material-ui/core/Typography";
import Pagination from '@material-ui/lab/Pagination';

import ErrorDisplay from "components/Error";
import ErrorBounds from "components/ErrorBounds";
import LoadingBar from "components/LoadingBar";
// Components
import SellerBanner from "pageComponents/S/SellerBanner";
import SellerAvatarProfile from "pageComponents/S/SellerAvatarProfile";
import AlignCenterLayout from "components/AlignCenterLayout";
// Router
import { useRouter } from "next/router";
import Suspended from "./Suspended";
// Analytics
import { useAnalytics } from "utils/analytics";
// pagination
import { useQuery } from "@apollo/client";
import {
  GET_STORE_PUBLIC,
  GET_STORE_PRODUCTS_FOR_SALE_CONNECTION,
} from "queries/store-queries";
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Search Component
import SearchOptions, { SelectOption, setCategoryFacets } from "components/SearchOptions";
import {
  useFacetSearchOptions,
  useEffectUpdateGridAccum,
  totalItemsInCategoriesFacets,
} from "utils/hooksFacetSearch";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";
import PreviewCardResponsive from "pageComponents/FrontPage/PreviewCardResponsive";
import GridPreviewCardLight from "components/GridPreviewCardLight";



const StoresId: React.FC<ReactProps> = (props) => {

  const { classes, initialStore } = props;
  const router = useRouter();
  const storeIdOrSlug: string = option(router).query.storeIdOrSlug() as any;
  const storeId: string = option(router).query.storeId() as any || storeIdOrSlug;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))

  /////////////////////////////////// paginator
  let numItemsPerPage = 10;
  let overfetchBy = 1;
  // overfetch by 1x pages

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
  })


  const storeResponse = useQuery<QueryData1, QueryVar1>(
    GET_STORE_PUBLIC, {
    variables: { storeId: storeId },
    fetchPolicy: "cache-and-network",
    // fetchPolicy: "cache-first",
    ssr: true,
  });


  const { loading, error, data } = useQuery<QueryData2, QueryVar2>(
    GET_STORE_PRODUCTS_FOR_SALE_CONNECTION, {
    variables: {
      storeId: storeId,
      // these query variables are for productsForSaleConnectionConnection
      searchTerm: searchTerm ? searchTerm : "*",
      query: {
        limit: limit, // when accumulating products, accumulate offset
        offset: offset,
        orderBy: orderBy.value as any,
        // filters: `_price >= ${priceRange[0]} AND _price <= ${priceRange[1]}`,
        // facetFilters: (facets && facets.length > 0)
        //   ? [facets]
        //   : null,
      }
    },
    fetchPolicy: "cache-and-network",
    // fetchPolicy: "cache-first",
    ssr: true,
  });

  // products connection
  const store = option(storeResponse).data.store() || initialStore;
  let productsForSaleConnection = data?.getStoreProductsForSaleConnection;

  let totalItemsInFacet = totalItemsInCategoriesFacets({
    facets: facets,
    facetsDistribution: option(productsForSaleConnection).facetsDistribution(),
    productsConnection: productsForSaleConnection,
    totalCount: totalCount,
    searchTerm: searchTerm,
  })

  // console.log('store: ', store)

  if (
    store?.isSuspended === true ||
    store?.isDeleted === true
  ) {
    return (
      <ErrorBounds className={clsx(classes.root, classes.flexCol)}>
        <Suspended
          title="This page isn't available."
          subtitle="The link you used may be broken, "
          message="or the page has been removed."
        />
      </ErrorBounds>
    );
  } else if (error) {
    return (
      <ErrorBounds className={clsx(classes.root, classes.flexCol)}>
        <ErrorDisplay title={"Seller Profile"} error={error}/>
      </ErrorBounds>
    )
  } else {
    return (
      <ErrorBounds className={clsx(classes.root, classes.flexCol)}>

        {
          loading &&
          <LoadingBar
            absoluteTop
            color={Colors.gradientUniswapBlue1}
            height={4}
            width={'100vw'}
            loading={true}
          />
        }

        {
          !smDown &&
          <SellerBanner></SellerBanner>
        }

        <div className={
          smDown ? classes.margin1 : classes.translateUp60
        }>
          <SellerAvatarProfile
            store={store}
            avatarBorderStyle={{
              height: '114px',
              width: '114px',
              border: `4px solid ${Colors.slateGrey}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '100%',
              // background: Gradients.gradientPurple.background,
              background: Gradients.gradientGrey.background,
            }}
          />
        </div>

        <AlignCenterLayout
          maxWidth={1160}
          className={classes.storeProductsRoot}
          withRecommendations={true}
        >
          <SearchOptions
            facets={facets}
            setCategoryFacets={setCategoryFacets({ facets, setFacets })}
            currentCategories={currentCategories}
            setSearchTerm={setSearchTerm}
            setOrderBy={setOrderBy}
            setPriceRange={setPriceRange}
            paginationParams={{
              totalCount: totalItemsInFacet,
              overfetchBy: overfetchBy,
              limit: limit,
              pageParam: pageParam,
              setPageParam: setPageParam,
              index: index,
              setIndex: setIndex,
            }}
            updateSetPageDelay={0}
            disablePriceFilter
            maxCategoryInputWidth={250}
            topSectionStyles={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '1rem',
              paddingRight: '1rem',
              paddingLeft: '1rem',
            }}
            bottomSectionStyles={{
              marginBottom: '2rem',
            }}
          >
            <GridPaginatorGeneric<Product>
              index={index}
              connection={productsForSaleConnection as any}
              totalCount={totalCount}
              setTotalCount={setTotalCount}
              numItemsPerPage={numItemsPerPage}
              classNameRoot={classes.paginatorRoot}
            >
              {({ node: product }) => {

                const commonPreviewCardProps = {
                  listName: 'grid-paginator-list',
                  productIndex: index,
                  maxWidthOfRow: 1160,
                }
                // use GridPreviewCardLight ,its lighter and less to render
                // for large screen sizes.
                // should make a light version for smaller screens as well
                return (
                  <div className={classes.marginRight1}>
                    {
                      mdDown
                      ? <PreviewCardResponsive
                          product={product}
                        />
                      : <GridPreviewCardLight
                          {...commonPreviewCardProps}
                          product={product}
                          cardsPerRow={4}
                        />
                    }
                  </div>
                )
              }}
            </GridPaginatorGeneric>
          </SearchOptions>
        </AlignCenterLayout>
      </ErrorBounds>
    );
  }
}

interface ReactProps extends WithStyles<typeof styles> {
  initialStore: Store;
}
interface QueryData1 {
  store: Store;
}
interface QueryVar1 {
  storeId: ID;
}

interface QueryData2 {
  getStoreProductsForSaleConnection: ProductsConnection;
}
interface QueryVar2 {
  storeId: ID;
  searchTerm?: string;
  query?: ConnectionOffsetQuery;
}

export default withStyles(styles)( StoresId );



