import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import { styles } from "./styles";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
// typings
import { Categories } from "typings/gqlTypes";
import Hidden from 'components/HiddenFix';
import BannerCategoryDesktop from "./BannerCategoryDesktop";
import BannerCategoryMobile from "./BannerCategoryMobile";
import { FacetSearchParams } from "utils/hooksFacetSearch";
import CategorySearchbar from "./CategorySearchbar";
import RowOrCardsButtons from "./RowOrCardsButtons";



const BannerCategoryPage = (props: ReactProps & FacetSearchParams) => {

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


  const getBannerImageUrl = (slug) => {
    switch (slug) {
      case "handguns": {
        return "/img/banner5.jpg"
      }
      case "rifles": {
        return "/img/banner10.jpg"
      }
      case "shotguns": {
        return "/img/banner10.jpg"
      }
      case "combination": {
        return "/img/banner4.jpg"
      }
      default: {
        return "/img/banner5.jpg"
      }
    }
  }

  let selectedCategory = currentCategories?.[0];

  const selectedCategoryName: string = currentCategories?.length === 0
    ? "All Products"
    : selectedCategory?.name
  const selectedCategoryBlurb: string = currentCategories?.length === 0
    ? ""
    : selectedCategory?.blurb
  const selectedCategorySlug: string = currentCategories?.length === 0
    ? "all"
    : selectedCategory?.slug


  const bannerImageUrl = getBannerImageUrl(selectedCategorySlug)
  const bannerDitherMobile = 'linear-gradient(0deg, rgba(25,25,25,0.4) 10%, rgba(25,25,25,0.4) 90%)'
  const bannerDither = 'linear-gradient(30deg, rgba(25,25,25,0.4) 10%, rgba(25,25,25,0.4) 90%)'
  // console.log("categorySlugForGql: ", props.categorySlug)

  return (
    <>
      {/* Mobile */}
      <Hidden lgUp implementation='css' className={classes.width100}>
        <BannerCategoryMobile
          categoryName={props.bannerTitle ?? selectedCategoryName}
          blurb={props.bannerBlurb ?? selectedCategoryBlurb ?? ""}
          bannerForegroundImageUrl={bannerImageUrl}
          bannerBackgroundImageUrl={bannerImageUrl}
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
        </BannerCategoryMobile>
      </Hidden>

      {/* Desktop */}
      <Hidden mdDown implementation="css" className={classes.width100}>
        <BannerCategoryDesktop
          categoryName={props.bannerTitle ?? selectedCategoryName}
          blurb={props.bannerBlurb ?? selectedCategoryBlurb ?? ""}
          bannerForegroundImageUrl={undefined}
          bannerBackgroundImageUrl={bannerImageUrl}
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
        </BannerCategoryDesktop>
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

  setCalibersForGql(c: string[]): void
  setDealerStatesForGql(c: string[]): void

  initialDropdownCategories: Categories[];
  // row or cards toggle
  rowMode: boolean
  setRowMode(a: boolean): void
  bannerTitle?: string;
  bannerBlurb?: string;
}


export default withStyles(styles)(BannerCategoryPage);






