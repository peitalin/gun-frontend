import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import { styles } from "./styles";
// typings
import { Categories } from "typings/gqlTypes";
import Hidden from 'components/HiddenFix';
import BannerSearchDesktop from "./BannerSearchDesktop";
import BannerSearchMobile from "./BannerSearchMobile";
import { FacetSearchParams } from "utils/hooksFacetSearch";
import CategorySearchbar from "./CategorySearchbar";
import RowOrCardsButtons from "./RowOrCardsButtons";



const BannerSearchPage = (props: ReactProps & FacetSearchParams) => {

  const {
    classes,
    disableMetaHeader,
    setCategorySlugsForGql,
    setSearchTermForGql,
    setCalibersForGql,
    setDealerStatesForGql,
    rowMode,
    setRowMode,
    ...facetSearchParams
  } = props;


  const {
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
      overfetchBy,
      totalCount,
      setTotalCount,
      pageParam,
      setPageParam,
      index,
      setIndex,
      debounceSetIndex,
    },
  } = facetSearchParams;


  // callback to expand banenr height when search input is focused in:
  // -> CategorySearchbar -> SearchbarAirbnb
  const [focusedOuter, setFocusedOuter] = React.useState(false)


  // const getBannerImageUrl = () => {
  //   // let slug = selectedCategorySlug
  //   let pathname = router.pathname
  //   if (pathname.includes("/new")) {
  //     return "/img/banner5.jpg"
  //   }
  //   if (pathname.includes("/category")) {
  //     return "/img/banner4.jpg"
  //   }
  //   if (pathname.includes("/sold")) {
  //     return "/img/banner10.jpg"
  //   }

  //   return "/img/banner5.jpg"
  //   // switch (path) {
  //   //   case "handguns": {
  //   //     return "/img/banner5.jpg"
  //   //   }
  //   //   case "rifles": {
  //   //     return "/img/banner10.jpg"
  //   //   }
  //   //   case "shotguns": {
  //   //     return "/img/banner10.jpg"
  //   //   }
  //   //   case "combination": {
  //   //     return "/img/banner4.jpg"
  //   //   }
  //   //   default: {
  //   //     return "/img/banner5.jpg"
  //   //   }
  //   // }
  // }

  let selectedCategorySlug = props.categorySlugsForGql?.[0];
  let selectedCategory = (currentCategories ?? []).find(c => c.slug === selectedCategorySlug)

  const selectedCategoryName: string = selectedCategory
    ? selectedCategory?.name
    : "All Products"

  const selectedCategoryBlurb: string = selectedCategory
    ? selectedCategory?.blurb
    : ""

  // const selectedCategorySlug: string = selectedCategory
  //   ? selectedCategory?.slug
  //   : "all"

  // const bannerImageUrl = getBannerImageUrl()
  const bannerDitherMobile = 'linear-gradient(0deg, rgba(25,25,25,0.01) 10%, rgba(25,25,25,0.01) 90%)'
  const bannerDither = 'linear-gradient(30deg, rgba(25,25,25,0.01) 10%, rgba(25,25,25,0.01) 90%)'

  return (
    <>
      {/* Mobile */}
      <Hidden lgUp implementation='css' className={classes.width100}>
        <BannerSearchMobile
          categoryName={props.bannerTitle ?? selectedCategoryName}
          blurb={props.bannerBlurb ?? selectedCategoryBlurb ?? ""}
          bannerDither={bannerDitherMobile}
          isExpanded={focusedOuter}
        >
          <CategorySearchbar
            id={"category-search-1-mobile"}
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
              totalCount: totalCount,
              setTotalCount: setTotalCount,
              pageParam: pageParam,
              setPageParam: setPageParam,
              index: index,
              setIndex: setIndex,
              debounceSetIndex: debounceSetIndex,
            }}
            // Category Page specific callbacks
            disableCategoriesFilter={props.disableCategoriesFilter}
            setCategorySlugsForGql={setCategorySlugsForGql}
            setSearchTermForGql={setSearchTermForGql}
            setCalibersForGql={setCalibersForGql}
            setDealerStatesForGql={setDealerStatesForGql}
            initialDropdownCategories={props.initialDropdownCategories}
            isMobile={true}
            setFocusedOuter={setFocusedOuter}
            focusedOuter={focusedOuter}
          />
          <RowOrCardsButtons
            rowMode={rowMode}
            setRowMode={setRowMode}
            isMobile={true}
          />
        </BannerSearchMobile>
      </Hidden>

      {/* Desktop */}
      <Hidden mdDown implementation="css" className={classes.width100}>
        <BannerSearchDesktop
          categoryName={props.bannerTitle ?? selectedCategoryName}
          blurb={props.bannerBlurb ?? selectedCategoryBlurb ?? ""}
          bannerDither={bannerDither}
        >
          <CategorySearchbar
            id={"category-search-2-desktop"}
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
              totalCount: totalCount,
              setTotalCount: setTotalCount,
              pageParam: pageParam,
              setPageParam: setPageParam,
              index: index,
              setIndex: setIndex,
              debounceSetIndex: debounceSetIndex,
            }}
            // Category Page specific callbacks
            disableCategoriesFilter={props.disableCategoriesFilter}
            setCategorySlugsForGql={setCategorySlugsForGql}
            setSearchTermForGql={setSearchTermForGql}
            setCalibersForGql={setCalibersForGql}
            setDealerStatesForGql={setDealerStatesForGql}
            initialDropdownCategories={props.initialDropdownCategories}
            isMobile={false}
            setFocusedOuter={setFocusedOuter}
            focusedOuter={focusedOuter}
          />
          <RowOrCardsButtons
            rowMode={rowMode}
            setRowMode={setRowMode}
            isMobile={false}
          />
        </BannerSearchDesktop>
      </Hidden>
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  currentCategories: Categories[]
  disableMetaHeader: boolean
  // Searchbar params
  setSearchTermForGql(s: string): void
  setCategorySlugsForGql(c: string[]): void
  categorySlugsForGql: string[]
  disableCategoriesFilter: boolean;

  setCalibersForGql(c: string[]): void
  setDealerStatesForGql(c: string[]): void

  initialDropdownCategories: Categories[];
  // row or cards toggle
  rowMode: boolean
  setRowMode(a: boolean): void
  bannerTitle?: string;
  bannerBlurb?: string;
}


export default withStyles(styles)(BannerSearchPage);






