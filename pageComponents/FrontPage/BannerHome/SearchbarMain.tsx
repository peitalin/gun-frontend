import React from "react";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// MUI
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

// Search Component
import { Categories, Calibers } from "typings/gqlTypes";
import SearchbarAirbnb from "components/SearchbarAirbnb";
import {
  useFacetSearchOptions,
  totalItemsInCategoriesFacets,
} from "utils/hooksFacetSearch";
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";






const SearchbarMain = (props: SearchbarProps) => {

  let {
    classes,
    isMobile = false,
  } = props;

  const router = useRouter();
  const snackbar = useSnackbar();

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))

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
    },
  } = useFacetSearchOptions({
    limit: numItemsPerPage * overfetchBy,
    overfetchBy: overfetchBy,
    // router: router,
    syncUrlParams: false,
  })

  // sync selected category in searchbar to SSR category from url bar
  React.useEffect(() => {
    if (props.initialRouteCategory) {
      setCurrentCategories([props.initialRouteCategory])
    }
  }, [props.initialRouteCategory])



  const onClickSearch = (searchTerm) => {

    let url

    url = `/new?q=${encodeURIComponent(searchTerm)}`

    if ((currentCategories ?? []).length > 0) {
      url += `&category=${currentCategories?.[0]?.slug}`
    }

    if (calibers?.length > 0) {
      url += `&caliber=${encodeURIComponent(calibers.map(c => c.label).join(','))}`
    }

    if (dealerStates?.length > 0) {
      url += `&state=${encodeURIComponent(dealerStates?.[0])}`
    }

    router.push(url)
  }


  return (
    <SearchbarAirbnb
      id={props.id}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onClickSearch={onClickSearch}
      // facets={facets}
      // setCategoryFacets={setCategoryFacets({ facets, setFacets })}
      setOrderBy={setOrderBy}
      setPriceRange={setPriceRange}
      setCurrentCategories={setCurrentCategories}
      currentCategories={currentCategories}
      dealerStates={dealerStates}
      setDealerStates={setDealerStates}
      calibers={calibers}
      setCalibers={setCalibers}
      actionTypes={actionTypes}
      setActionTypes={setActionTypes}
      // end facets
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
      // disableSearchFilter
      disableSortby
      disablePriceFilter
      // disableCategories
      disablePaginators={
        router.pathname === "/" ||
        router.pathname === "/home"
      }
      maxCategoryInputWidth={250}
      setFocusedOuter={props.setFocusedOuter}
      style={props.style}
      filterSectionStyles={props.filterSectionStyles}
      categorySectionStyles={props.categorySectionStyles}
      topSectionStyles={props.topSectionStyles}
      bottomSectionStyles={props.bottomSectionStyles}
      paginatorStyles={props.paginatorStyles}
      isMobile={isMobile}
    />
  )
}



interface SearchbarProps extends WithStyles<typeof styles> {
  id: string;
  initialRouteCategory?: Categories;
  setFocusedOuter?(b: boolean): void;
  style?: any;
  filterSectionStyles?: any;
  categorySectionStyles?: any;
  dropdownContainerStyles?: any;
  // for top section with search options + facets
  topSectionStyles?: any;
  // for bottom section, where the child components + paginators are
  bottomSectionStyles?: any;
  paginatorStyles?: any;
  isMobile: boolean;
  initialDropdownCategories: Categories[];
}

let styles = (theme: Theme) => createStyles({
});


export default withStyles(styles)( SearchbarMain );
