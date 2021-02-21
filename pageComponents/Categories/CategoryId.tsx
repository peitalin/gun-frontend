
import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
// GraphQL
import {
  GET_PRODUCTS_BY_CATEGORY_NEW,
 } from "queries/product-category-queries";
// Typings
import {
  ID,
  ProductCategoryOrGroup,
  Product,
  PublicProductsOrderBy,
  SearchParams,
  PublicProductsConnection,
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
import SearchOptions, { SelectOption, setCategoryFacets } from "components/SearchOptions";
import {
  useFacetSearchOptions,
  useEffectUpdateGridAccum,
  totalItemsInCategoriesFacets,
  PaginatorType,
} from "utils/hooksFacetSearch";
import CategoriesCarousel from "./CategoriesCarousel";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";
import GridPreviewCardLight from "components/GridPreviewCardLight";
import BannerCategory from "components/Banners/BannerCategory";
import Redirect from "pageComponents/Redirect";



const CategoryId: React.FC<ReactProps> = (props) => {

  const {
    classes,
    lightTheme = false,
    brickDisplay = false,
    disableBreadcrumbs = false,
    disableMetaHeader = false,
  } = props;

  const router = useRouter();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.only("sm"))
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))


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

  const { data, loading, error } = useQuery<QueryData1, QueryVar1>(
    GET_PRODUCTS_BY_CATEGORY_NEW, {
    variables: {
      nav: {
        limitOffset: {
          limit: limit,
          offset: offset
        }
      },
      categoryId: props.categoryOrCategoryGroup?.category?.id,
      categoryGroupId:
        props.categoryOrCategoryGroup?.category?.id
          ? undefined
          : props.categoryOrCategoryGroup?.categoryGroup?.id,
      // only do categoryGroupId if categoryId is missing
      search: {
        searchTerm: searchTerm || "*"
        // facetFilters: [[String]]
        // filters: String
      },
      // orderBy: orderBy.value, // OrderBy broken
    },
    fetchPolicy: "cache-and-network",
    ssr: true,
  });


  // console.log("router: ", router)
  // console.log("categories limit", limit)
  // console.log("cateogires offset", offset)

  React.useEffect(() => {
    setShowTitle(true)
  }, [])


  const categoryName: string = props.categoryOrCategoryGroup?.category?.name
    || props.categoryOrCategoryGroup?.categoryGroup?.name
    || "Missing Category"

  const categorySlug: string = props.categoryOrCategoryGroup?.category?.slug
    || props.categoryOrCategoryGroup?.categoryGroup?.slug

  let missingCategory = !categorySlug

  const blurb: string = props.categoryOrCategoryGroup?.categoryGroup?.pageConfig?.blurb
  // console.log("blurb1:", blurb)

  const categoriesMetadata = props.categoryOrCategoryGroup?.categoryGroup?.categories
  // console.log("categoriesMetadata:", categoriesMetadata)

  const bannerBackgroundImage =
    props.categoryOrCategoryGroup?.categoryGroup?.pageConfig?.bannerBackgroundImage
    || props.categoryOrCategoryGroup?.category?.pageConfig?.bannerBackgroundImage

  const bannerForegroundImage =
    props.categoryOrCategoryGroup?.categoryGroup?.pageConfig?.bannerForegroundImage
    || props.categoryOrCategoryGroup?.category?.pageConfig?.bannerForegroundImage


  const [showTitle, setShowTitle] = React.useState(false);

  const productsConnection = data?.publicProductsByCategoryNew
    || props.initialProducts;


  let totalItemsInFacet = totalItemsInCategoriesFacets({
    facets: facets,
    facetsDistribution: option(productsConnection).facetsDistribution() as any,
    productsConnection: productsConnection as any,
    totalCount: totalCount,
    searchTerm: searchTerm,
  })

  useAnalytics("View.Category.CategoryName", { categoryName: categoryName });
  // console.log("count", numItemsPerPage)
  // console.log("productsByCategoryConnectionPageBased: ", products)
  // console.log("categoryOrCategoryGroup:", props.categoryOrCategoryGroup)
  // console.log("searchTerm", searchTerm)
  // console.log("missingCategories", missingCategory)
  // console.log("data", data)

  if (missingCategory) {
    return (
      <Redirect
        message={"We don't have that category..."}
        redirectCondition={missingCategory}
        redirectDelay={0}
        redirectRoute={"/categories"}
      />
    )
  }


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
          title={`${categoryName} - Relay.shop`}
          description={`
            Shop the Relay marketplace for digital products,
            Lightroom presets, design templates, ebooks, stock assets,
            and more. Download anything instantly.
          `}
        />
      }

      <div className={clsx(
        classes.flexColStart,
        classes.positionRelative,
        classes.maxWidth
      )}>

        {
          !disableBreadcrumbs &&
          <div className={
            smDown
              ? classes.breadCrumbsContainerSm
              : classes.breadCrumbsContainer
          }>
            <CategoryBreadcrumbs
              categoryGroup={"Design"}
              categoryName={categoryName}
              categorySlug={categorySlug}
            />
          </div>
        }

        <div className={
          smDown
            ? classes.bannerContainerSm
            : classes.bannerContainer
        }>
          <BannerCategory
            categorySlug={categorySlug}
            categoryName={categoryName}
            blurb={blurb}
            bannerForegroundImage={bannerForegroundImage}
            bannerBackgroundImage={bannerBackgroundImage}
          />
        </div>

        {
          (categoriesMetadata?.length > 0) &&
          <CategoriesCarousel
            style={{
              marginTop: '2rem',
              marginBottom: '3rem',
            }}
            categoriesMetadata={categoriesMetadata}
          />
        }

        <div className={classes.sectionContainer}>

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
            disableSearchFilter={false}
            // disableSortby={!missingCategory}
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
              !loading &&
              option(productsConnection).edges([]).length === 0 &&
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
          </SearchOptions>

        </div>
      </div>
    </AlignCenterLayout>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  initialProducts: PublicProductsConnection;
  categoryOrCategoryGroup: ProductCategoryOrGroup;
  lightTheme?: boolean;
  brickDisplay?: boolean;
  title?: string;
  disableBreadcrumbs?: boolean;
  disableMetaHeader?: boolean;
}
interface QueryData1 {
  publicProductsByCategoryNew: PublicProductsConnection
}
interface QueryVar1 {
  nav?: {
    limitOffset: {
      limit?: number,
      offset?: number,
    }
  },
  categoryId?: ID;
  categoryGroupId?: ID;
  search?: SearchParams;
  orderBy?: PublicProductsOrderBy;
}


export const styles = (theme: Theme) => createStyles({
  root: {
    paddingTop: '1rem',
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
  bannerContainer: {
    maxWidth: 1160,
    padding: '1rem',
    width: '100%',
  },
  bannerContainerSm: {
    maxWidth: 1160,
    padding: '0rem',
    width: '100%',
  },
});

export default withStyles(styles)( CategoryId );



