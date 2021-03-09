import React from "react";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius4x } from "layout/AppTheme";
import ErrorBounds from "components/ErrorBounds";
// MUI
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

// Search Component
import { Categories } from "typings/gqlTypes";
import SearchOptions from "./SearchOptions";
import {
  useFacetSearchOptions,
  useEffectUpdateGridAccum,
  totalItemsInCategoriesFacets,
  PaginatorType,
} from "utils/hooksFacetSearch";






const SearchbarMain = (props: SearchbarProps) => {

  let { classes, color } = props;

  const router = useRouter();
  const snackbar = useSnackbar();

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

  const onEnter = (event) => {
    if (event.key === "Enter") {
      if (!searchTerm) {
        snackbar.enqueueSnackbar(
          `No search term entered!`,
          { variant: "info" }
        )
        return
      }
      let url = `/search?q=${encodeURIComponent(searchTerm)}`
      if ((currentCategories ?? []).length > 0) {
        url += `&category=${currentCategories?.[0]?.slug}`
      }
      router.push(url)
    }
  }

  const onClick = (event) => {
    if (!searchTerm) {
      snackbar.enqueueSnackbar(
        `No search term entered!`,
        { variant: "info" }
      )
      return
    }
    let url = `/search?q=${encodeURIComponent(searchTerm)}`
    if ((currentCategories ?? []).length > 0) {
      url += `&category=${currentCategories?.[0]?.slug}`
    }
    router.push(url)
  }


  // sync selected category in searchbar to SSR category from url bar
  React.useEffect(() => {
    if (props.initialRouteCategory) {
      setCurrentCategories([props.initialRouteCategory])
    }
  }, [props.initialRouteCategory])


  return (
    <SearchOptions
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onEnter={onEnter}
      onClick={onClick}
      // facets={facets}
      // setCategoryFacets={setCategoryFacets({ facets, setFacets })}
      setCurrentCategories={setCurrentCategories as any}
      currentCategories={currentCategories as any}
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
      topSectionStyles={{
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      </SearchOptions>
  )
}



interface SearchbarProps extends WithStyles<typeof styles> {
  color?: string;
  initialRouteCategory?: Categories;
}

let styles = (theme: Theme) => createStyles({
});


export default withStyles(styles)( SearchbarMain );
