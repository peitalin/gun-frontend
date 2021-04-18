
import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius3x, Colors } from "layout/AppTheme";
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
import ProductCardAsRow from "components/ProductCardAsRow";
import ProductRowMedium from "components/ProductRowMedium";
import IconButton from "@material-ui/core/IconButton";
import ListIcon from "@material-ui/icons/List";
import GridIcon from "@material-ui/icons/ViewModule";
// Search Component
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
import CategorySearchbar from "./CategorySearchBar";
import {
  useFacetSearchOptions,
  totalItemsInCategoriesFacets,
} from "utils/hooksFacetSearch";
import BannerCategory from "./BannerCategory";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";
import GridPreviewCardLight from "components/GridPreviewCardLight";
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

  // rowMode by default on mobile
  const [rowMode, setRowMode] = React.useState(undefined)

  React.useEffect(() => {
    if (mdDown) {
      setRowMode(true)
    } else {
      setRowMode(true)
    }
  }, [])


  const { data, loading, error } = useQuery<QueryData1, QueryVar1>(
    GET_PRODUCTS_BY_CATEGORY, {
    variables: {
      query: {
        limit: limit,
        offset: offset
      },
      // categorySlug: props.initialRouteCategory?.slug
      //   ?? (router?.query?.categorySlug as any),
      categorySlugs: categorySlugsForGql,
      // require button click to change search
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
  // console.log("totalItemsInFacet: ", totalItemsInFacet)
  // console.log("initialRouteCategory: ", props.initialRouteCategory)
  // console.log("categorySlug: ", categorySlug)
  // console.log("currentCategories: ", currentCategories)

  // check pageParam sync on url, facetHooks, and UI component
  // console.log("pageParam: ", pageParam)
  // console.log("index: ", index)
  // console.log("offset: ", offset)

  const onEnterSearch = (event) => {
    // Desktop only
    if (event.key === "Enter") {
      setPageParam(1) // reset to page 1 every time you hit search button
      setSearchTermForGql(searchTerm)
      setCategorySlugsForGql(
        currentCategories.map(c => c.slug)
      )
    }
  }

  const onClickSearch = (event) => {
    setPageParam(1) // reset to page 1 every time you hit search button
    setSearchTermForGql(searchTerm)
    setCategorySlugsForGql(
      currentCategories.map(c => c.slug)
    )
  }


  return (
    <AlignCenterLayout
      maxWidth={1160}
      className={smDown ? classes.rootSm : classes.root}
      pageRecommendationsContainerClassname={classes.greyBackground}
      withRecommendations={false}
    >

      <div className={clsx(
        classes.flexColStart,
        classes.positionRelative,
        classes.maxWidth
      )}>





        <ShowOnMobileOrDesktopSSR desktop className={classes.width100}>
          <>
            <div className={classes.bannerContainer}>
              <BannerCategory
                disableMetaHeader={disableMetaHeader}
                currentCategories={currentCategories}
              />
            </div>
            <div className={classes.searchContainer}>
              <div className={
                mdDown
                  ? classes.searchContainerInnerMobile
                  : classes.searchContainerInner
              }>
                <CategorySearchbar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  facets={facets}
                  setFacets={setFacets}
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  currentCategories={currentCategories}
                  setCurrentCategories={setCurrentCategories}
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
                  // Category Page specific callbacks
                  setCategorySlugsForGql={setCategorySlugsForGql}
                  setSearchTermForGql={setSearchTermForGql}
                  initialDropdownCategories={props.initialDropdownCategories}
                  isMobile={false}
                />
              </div>
            </div>
          </>
        </ShowOnMobileOrDesktopSSR>

        <ShowOnMobileOrDesktopSSR mobile className={classes.width100}>
          <>
            <div className={classes.bannerContainerSm}>
              <BannerCategory
                disableMetaHeader={disableMetaHeader}
                currentCategories={currentCategories}
              />
            </div>
            <div className={classes.searchContainer}>
              <div className={classes.searchContainerInnerMobile}>
                <CategorySearchbar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  facets={facets}
                  setFacets={setFacets}
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  currentCategories={currentCategories}
                  setCurrentCategories={setCurrentCategories}
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
                  // Category Page specific callbacks
                  setCategorySlugsForGql={setCategorySlugsForGql}
                  setSearchTermForGql={setSearchTermForGql}
                  initialDropdownCategories={props.initialDropdownCategories}
                  isMobile={true}
                />
              </div>
            </div>
          </>
        </ShowOnMobileOrDesktopSSR>


        <div className={
          mdDown ? classes.rowToggleContainerMobile : classes.rowToggleContainerDesktop
        }>
          <div className={classes.listOrGridContainer}>
            <IconButton
              className={classes.listOrGridButtonLeft}
              onClick={() => setRowMode(false)}
              size={"medium"}
            >
              <GridIcon className={
                !rowMode
                  ? classes.listOrGridIconSelected
                  : classes.listOrGridIcon
              }/>
            </IconButton>
            <IconButton
              className={classes.listOrGridButtonRight}
              onClick={() => setRowMode(true)}
              size={"medium"}
            >
              <ListIcon className={
                rowMode
                  ? classes.listOrGridIconSelected
                  : classes.listOrGridIcon
              }/>
            </IconButton>
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
            disableAnimation
            loading={loading}
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
                    ? mdDown
                      ? <ProductRowMedium product={product}/>
                      : <ProductCardAsRow product={product}/>
                    : <ProductCardResponsive
                        product={product}
                      />
                  }
                  {/* {
                    mdDown
                    ? <ProductCardResponsive
                        product={product}
                      />
                    : <GridPreviewCardLight
                        {...commonPreviewCardProps}
                        product={product}
                        cardsPerRow={4}
                      />
                  } */}
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
  rowToggleContainerMobile: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
  },
  rowToggleContainerDesktop: {
    width: '100%',
    padding: '0rem 1rem',
    marginBottom: '1rem',
    marginTop: '-3.75rem',
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
  },
  noProductsText: {
    color: Colors.darkGrey,
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  searchContainer: {
    position: "relative",
    maxWidth: 1160,
    // padding: '0rem 1rem 1rem 1rem',
    width: '100%',
  },
  searchContainerInner: {
    height: '3.5rem',
    marginTop: "-1rem",
    marginBottom: "2.5rem",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '1rem', // offset gridOrList buttons padding Right
  },
  searchContainerInnerMobile: {
    marginTop: "-0.5rem",
    marginBottom: "3rem",
    height: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '1rem', // offset gridOrList buttons padding Right
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
  listOrGridContainer: {
    display: "flex",
    flexDirection: "row",
    // width: '100%',
    justifyContent: "flex-end",
  },
  listOrGridButtonLeft: {
    borderRadius: `${BorderRadius3x}px 0px 0px ${BorderRadius3x}px`,
    background: theme.palette.type === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.darkWhite}`,
    "&:hover": {
      background: theme.palette.type === 'dark'
        ? `${Colors.uniswapMediumNavy}`
        : `${Colors.slateGrey}`,
    },
    borderTop: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderLeft: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderBottom: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  listOrGridButtonRight: {
    // borderRadius: BorderRadius3x,
    borderRadius: `0px ${BorderRadius3x}px ${BorderRadius3x}px 0px`,
    background: theme.palette.type === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.darkWhite}`,
    "&:hover": {
      background: theme.palette.type === 'dark'
        ? `${Colors.uniswapMediumNavy}`
        : `${Colors.slateGrey}`,
    },
    borderTop: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRight: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderBottom: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  listOrGridIconSelected: {
    borderRadius: BorderRadius3x,
    fill: theme.palette.type === 'dark'
      ? Colors.purple
      : Colors.gradientUniswapBlue1,
  },
  listOrGridIcon: {
    borderRadius: BorderRadius3x,
  },
});

export default withStyles(styles)( CategoryId );



