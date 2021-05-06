
import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius3x, Colors, isThemeDark } from "layout/AppTheme";
// Typings
import {
  ID,
  Product,
  ProductsConnection,
  Categories,
  ConnectionQuery,
} from "typings/gqlTypes";
// Router
import { useRouter } from "next/router";
// GraphQL
import {
  GET_PRODUCTS_BY_CATEGORY,
 } from "queries/products-queries";
import { useQuery, useApolloClient } from "@apollo/client";
// categories
import { categorySelectors } from "utils/selectors";
import { useCategoriesList } from "layout/NavBarMain/CategoryBar/categoryHooks";
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Components
import Typography from "@material-ui/core/Typography";
import AlignCenterLayout from "components/AlignCenterLayout";
import Switch from '@material-ui/core/Switch';
import ProductCardResponsive from "components/ProductCardResponsive";
import ProductRowMedium from "components/ProductRowMedium";
import ProductCardAsRow from "components/ProductCardAsRow";
// Loading product cards
import ProductRowMobileLoading from "components/ProductCardResponsive/ProductRowMobileLoading";
import LoadingBar from "components/LoadingBar";
import LoadingCards from "pageComponents/FrontPage/LoadingCards";
import {
  useFacetSearchOptions,
  totalItemsInCategoriesFacets,
} from "utils/hooksFacetSearch";
import BannerCategoryPage from "./BannerCategoryPage";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";
import GridPreviewCardLight from "components/GridPreviewCardLight";
import { useSnackbar } from "notistack";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";



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


  /////////////////////////////////// paginator
  let numItemsPerPage = 12;
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
    currentCategories,
    setCurrentCategories,
    dealerStates,
    setDealerStates,
    calibers,
    setCalibers,
    actionTypes,
    setActionTypes,
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
    router: router,
    syncUrlParams: true,
  })

  const [searchTermForGql, setSearchTermForGql] = React.useState<string>(
    (router?.query?.q as any)
  )
  const [categorySlugsForGql, setCategorySlugsForGql] = React.useState(
    props.initialRouteCategory?.slug
      ? [props.initialRouteCategory?.slug]
      : []
  )
  const [dealerStatesForGql, setDealerStatesForGql] = React.useState([])
  const [calibersForGql, setCalibersForGql] = React.useState([])
  const [actionTypesForGql, setActionTypesForGql] = React.useState([])

  // rowMode by default on mobile
  const [rowMode, setRowMode] = React.useState(mdDown)

  React.useEffect(() => {
    setRowMode(mdDown)
  }, [mdDown])


  const { data, loading, error } = useQuery<QueryData1, QueryVar1>(
    GET_PRODUCTS_BY_CATEGORY, {
    variables: {
      query: {
        limit: limit,
        offset: offset,
      },
      // categorySlug: props.initialRouteCategory?.slug ?? (router?.query?.categorySlug as any),
      categorySlugs: categorySlugsForGql,
      // require button click to change search
      dealerStates: dealerStates,
      calibers: calibers,
      actionTypes: actionTypes,
      searchTerm: searchTermForGql || "*",
      // require button click to change search
    },
    fetchPolicy: "cache-and-network",
    ssr: true,
  });


  // sync selected category in searchbar to SSR category from url bar
  React.useEffect(() => {
    setCurrentCategories([props.initialRouteCategory])
  }, [props.initialRouteCategory])

  React.useEffect(() => {
    if (!loading && !!productsConnection?.totalCount) {
      setTotalCount(productsConnection?.totalCount)
    }
  }, [loading])

  const productsConnection = data?.productsByCategoryConnection
    || props.initialProducts;


  let totalItemsInFacet = totalItemsInCategoriesFacets({
    facets: facets,
    facetsDistribution: productsConnection?.facetsDistribution as any,
    productsConnection: productsConnection as any,
    totalCount: totalCount,
    searchTerm: searchTermForGql,
  })
  // console.log("productsConnection: ", productsConnection)
  // console.log("totalItemsInFacet: ", totalItemsInFacet)
  // console.log("initialRouteCategory: ", props.initialRouteCategory)
  // console.log("categorySlug: ", categorySlug)
  // console.log("currentCategories: ", currentCategories)

  // check pageParam sync on url, facetHooks, and UI component
  // console.log("pageParam: ", pageParam)
  // console.log("index: ", index)
  // console.log("offset: ", offset)

  return (
    <AlignCenterLayout
      maxWidth={1160}
      className={classes.root}
      pageRecommendationsContainerClassname={classes.greyBackground}
      withRecommendations={false}
    >

      <LoadingBar
        absoluteTop
        color={
          isThemeDark(theme)
            ? Colors.purple
            : Colors.ultramarineBlue
        }
        height={4}
        width={'100vw'}
        loading={loading}
        style={{ zIndex: 1 }}
      />

      <div className={clsx(
        classes.flexColStart,
        classes.positionRelative,
        classes.maxWidth
      )}>

        <BannerCategoryPage
          disableMetaHeader={disableMetaHeader}
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
          paginationParams={{
            limit: limit,
            offset: offset,
            overfetchBy: overfetchBy,
            totalCount: Math.ceil(totalItemsInFacet / numItemsPerPage),
            setTotalCount: setTotalCount,
            pageParam: pageParam,
            setPageParam: setPageParam,
            index: index,
            setIndex: setIndex,
            debounceSetIndex: debounceSetIndex,
          }}
          setCategorySlugsForGql={setCategorySlugsForGql}
          setSearchTermForGql={setSearchTermForGql}
          initialDropdownCategories={props.initialDropdownCategories}
          rowMode={rowMode}
          setRowMode={setRowMode}
        />


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
                  <ProductRowMobileLoading/>
                </ShowOnMobileOrDesktopSSR>
              </>
            }
            containerStyle={{ minHeight: 284*2 }}
            gridItemClassName={
              rowMode ? classes.gridItemRow : classes.gridItemCard
            }
          >
            {({ node: product }) => {

              return (
                <div key={product.id}
                  className={clsx(
                    rowMode ? classes.flexItemRows : classes.flexItemCards,
                    classes.marginRight1,
                  )}
                >
                  {
                    rowMode
                      ? <ProductCardAsRow product={product}/>
                      : <ProductCardResponsive product={product} />
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
  initialDropdownCategories: Categories[];
  disableBreadcrumbs?: boolean;
  disableMetaHeader?: boolean;
}
interface QueryData1 {
  productsByCategoryConnection: ProductsConnection
}
interface QueryVar1 {
  query: ConnectionQuery;
  categorySlugs?: string[];
  dealerStates?: string[];
  calibers?: string[];
  actionTypes?: string[];
  searchTerm?: string;
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
    paddingLeft: '1rem',
    width: '100%',
    minHeight: 600,
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

export default withStyles(styles)( CategoryId );



