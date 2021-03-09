
import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
// GraphQL
import {
  GET_PRODUCTS_BY_CATEGORY,
 } from "queries/products-queries";
// Typings
import {
  ID,
  Product,
  ProductsConnection,
  Categories,
  ConnectionOffsetQuery,
} from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
// Router
import { useRouter } from "next/router";
// Components
import CategoryBreadcrumbs from "pageComponents/P/ProductPageLayouts/CategoryBreadcrumbs";
// MUI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PreviewCardResponsive from "pageComponents/FrontPage/PreviewCardResponsive";
import Link from "next/link";
import { BorderRadius3x, Colors } from "layout/AppTheme";
// Apollo
import { useQuery, useApolloClient } from "@apollo/client";
import { categorySelectors } from "utils/selectors";
import { useCategoriesList } from "layout/NavBarMain/CategoryBar/categoryHooks";
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Analytics
import { useAnalytics } from "utils/analytics";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import AlignCenterLayout from "components/AlignCenterLayout";
// Search Component
import SearchOptions from "pageComponents/FrontPage/BannerHome/SearchbarMain/SearchOptions";
import {
  useFacetSearchOptions,
  useEffectUpdateGridAccum,
  totalItemsInCategoriesFacets,
  PaginatorType,
} from "utils/hooksFacetSearch";
import BannerCategory from "./BannerCategory";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";
import GridPreviewCardLight from "components/GridPreviewCardLight";
// import BannerCategory from "components/Banners/BannerCategory";
import Redirect from "pageComponents/Redirect";
import { useSnackbar } from "notistack";



const CategoryId: React.FC<ReactProps> = (props) => {

  const {
    classes,
    disableBreadcrumbs = false,
    disableMetaHeader = false,
  } = props;

  const snackbar = useSnackbar();
  const router = useRouter();

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.only("sm"))
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))


  /////////////////////////////////// paginator
  let numItemsPerPage = 24;
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

  const [searchTermForGql, setSearchTermForGql] = React.useState(undefined)

  const { data, loading, error } = useQuery<QueryData1, QueryVar1>(
    GET_PRODUCTS_BY_CATEGORY, {
    variables: {
      query: {
        limit: limit,
        offset: offset
      },
      categorySlug: props.initialRouteCategory?.slug
        ?? (router?.query?.categorySlug as any),
      searchTerm: searchTermForGql || "*",
    },
    fetchPolicy: "cache-and-network",
    ssr: true,
  });


  const onEnter = (event) => {
    if (event.key === "Enter") {
      setSearchTermForGql(searchTerm)
    }
  }

  const onClick = (event) => {
    setSearchTermForGql(searchTerm)
  }

  const categoryName: string = props.initialRouteCategory?.name
  const categoryBlurb: string = props.initialRouteCategory?.blurb
  const categorySlug: string = props.initialRouteCategory?.slug

  // sync selected category in searchbar to SSR category from url bar
  React.useEffect(() => {
    setCurrentCategories([props.initialRouteCategory])
  }, [props.initialRouteCategory])

  const productsConnection = data?.productsByCategoryConnection
    || props.initialProducts;


  let totalItemsInFacet = totalItemsInCategoriesFacets({
    facets: facets,
    facetsDistribution: option(productsConnection).facetsDistribution() as any,
    productsConnection: productsConnection as any,
    totalCount: totalCount,
    searchTerm: searchTerm,
  })


  return (
    <AlignCenterLayout
      maxWidth={1160}
      className={smDown ? classes.rootSm : classes.root}
      pageRecommendationsContainerClassname={classes.greyBackground}
      withRecommendations={false}
    >
      {
        !disableMetaHeader &&
        <MetaHeadersPage
          title={`${categoryName}`}
          description={`Search categories of firearms`}
        />
      }

      <div className={clsx(
        classes.flexColStart,
        classes.positionRelative,
        classes.maxWidth
      )}>


        <div className={
          smDown
            ? classes.bannerContainerSm
            : classes.bannerContainer
        }>
          <BannerCategory
            categoryName={categoryName}
            categorySlug={categorySlug}
            categoryBlurb={categoryBlurb}
          />
        </div>

        <div className={classes.searchContainer}>
          <div className={classes.searchContainerInner}>
            <SearchOptions
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onEnter={onEnter}
              onClick={onClick}
              // facets={facets}
              // setCategoryFacets={setCategoryFacets({ facets, setFacets })}
              setCurrentCategories={setCurrentCategories as any}
              currentCategories={currentCategories as any}
              // this turns on category-page specifc searchbar
              isCategoriesPage={true}
              setOrderBy={setOrderBy}
              setPriceRange={setPriceRange}
              placeholder={"Search for products..."}
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
              // disableSearchFilter
              disableSortby
              disablePriceFilter
              // disableCategories
              hidePaginator
              maxCategoryInputWidth={250}
            />
          </div>
        </div>

        <div className={classes.sectionContainer}>
          {
            !loading &&
            (productsConnection?.edges ?? []).length === 0 &&
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
          <GridPaginatorGeneric<Product>
            index={index}
            connection={productsConnection}
            totalCount={totalCount}
            setTotalCount={setTotalCount}
            numItemsPerPage={numItemsPerPage}
            overfetchBy={overfetchBy}
            // disableAnimation
            loading={loading}
            containerStyle={{ minHeight: 284*2 }}
            // gridItemClassName={classes.gridItem}
          >
            {({ node: product }) => {

              const commonPreviewCardProps = {
                listName: 'grid-category-paginator-list',
                productIndex: index,
                maxWidthOfRow: 1160,
              }

              return (
                <div key={product.id}
                  className={clsx(
                    classes.flexItem,
                    classes.marginRight1,
                  )}
                >
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

        </div>
      </div>
    </AlignCenterLayout>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  initialProducts: ProductsConnection;
  initialRouteCategory: Categories;
  disableBreadcrumbs?: boolean;
  disableMetaHeader?: boolean;
}
interface QueryData1 {
  productsByCategoryConnection: ProductsConnection
}
interface QueryVar1 {
  query: ConnectionOffsetQuery;
  categorySlug?: ID;
  searchTerm?: string;
}


export const styles = (theme: Theme) => createStyles({
  root: {
    height: '100%',
  },
  rootSm: {
    paddingTop: '0rem',
    height: '100%',
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
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  flexItem: {
    marginBottom: '1rem',
  },
  marginRight1: {
    marginRight: '1rem',
  },
  width100: {
    width: '100%',
  },
  sectionContainer: {
    // background: "#fefefe",
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingLeft: '1rem',
    width: '100%',
    minHeight: 600,
  },
  tagContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: 'wrap',
    margin: '0rem 1rem 1rem 0rem',
  },
  buttonRoot: {
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    background: fade(Colors.cream, 1),
    // border: `1xp solid ${Colors.charcoal}`,
    border: 'none',
    // borderRadius: '2rem',
    transition:  theme.transitions.create(['background', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: 200,
    }),
    "&:hover": {
      // background: Colors.lightGrey,
      background: Colors.charcoal,
      color: Colors.white,
      transition:  theme.transitions.create(['background', 'color'], {
        easing: theme.transitions.easing.easeIn,
        duration: 200,
      })
    },
  },
  buttonSelected: {
    background: Colors.darkGrey,
    color: Colors.cream,
    "&:hover": {
      background: Colors.darkerGrey,
      color: Colors.red,
      transition:  theme.transitions.create('background', {
        easing: theme.transitions.easing.easeIn,
        duration: 100,
      })
    },
  },
  breadCrumbsContainer: {
  },
  breadCrumbsContainerSm: {
    position: "absolute",
    top: '1rem',
    zIndex: 1,
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
  titleDark: {
    marginTop: '1rem',
    marginBottom: '1rem',
    color: Colors.charcoal,
    //dark background, light fonts
  },
  subtitleDark: {
    marginBottom: '1rem',
    color: Colors.charcoal,
    //dark background, light fonts
  },
  greyBackground: {
    backgroundColor: Colors.lightestGrey,
    paddingBottom: '1rem',
    borderTop: `1px solid ${Colors.mediumLightGrey}`,
  },
  noProductsForSale: {
    height: 480,
  },
  noProductsText: {
    color: Colors.darkGrey,
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  searchContainer: {
    position: "relative",
    maxWidth: 1160,
    padding: '0rem 1rem 1rem 1rem',
    width: '100%',
  },
  searchContainerInner: {
    marginTop: "-2rem",
    marginBottom: "2rem",
    height: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default withStyles(styles)( CategoryId );



