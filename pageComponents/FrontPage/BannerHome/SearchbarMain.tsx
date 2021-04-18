import React from "react";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius4x } from "layout/AppTheme";
// MUI
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

// Search Component
import { Categories } from "typings/gqlTypes";
import SearchOptionsAirbnb from "components/SearchbarAirbnb/SearchOptionsAirbnb";
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


  const onEnterSearch = (event) => {
    // Desktop only
    if (event.key === "Enter") {
      if (mdDown) {
        snackbar.enqueueSnackbar(
          `Click search button`,
          { variant: "info" }
        )
      } else {
        let url
        if ((currentCategories ?? []).length > 0) {
          url = `/categories/${currentCategories?.[0]?.slug}`
        } else {
          url = `/categories/all`
        }
        if (searchTerm) {
          url += `?q=${encodeURIComponent(searchTerm)}`
        }
        router.push(url)
      }
    }
  }

  const onClickSearch = (event) => {
    let url
    if ((currentCategories ?? []).length > 0) {
      url = `/categories/${currentCategories?.[0]?.slug}`
    } else {
      url = `/categories/all`
    }
    if (searchTerm) {
      url += `?q=${encodeURIComponent(searchTerm)}`
    }
    router.push(url)
  }

  console.log("categories", currentCategories)

  return (
    <SearchOptionsAirbnb
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onClickSearch={onClickSearch}
      onEnterSearch={onEnterSearch}
      // facets={facets}
      // setCategoryFacets={setCategoryFacets({ facets, setFacets })}
      setCurrentCategories={setCurrentCategories}
      currentCategories={currentCategories}
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
      disablePaginators={router.pathname === "/"}
      maxCategoryInputWidth={250}
      setFocusedOuter={props.setFocusedOuter}
      style={props.style}
      filterSectionStyles={props.filterSectionStyles}
      categorySectionStyles={props.categorySectionStyles}
      dropdownContainerStyles={props.dropdownContainerStyles}
      topSectionStyles={props.topSectionStyles}
      bottomSectionStyles={props.bottomSectionStyles}
      paginatorStyles={props.paginatorStyles}
      isMobile={isMobile}
      initialDropdownCategories={props.initialDropdownCategories}
    />
  )
}



interface SearchbarProps extends WithStyles<typeof styles> {
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
