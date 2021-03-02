import React from "react";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius4x } from "layout/AppTheme";
import ErrorBounds from "components/ErrorBounds";
// MUI
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { useSnackbar, ProviderContext } from "notistack";

// Search Component
import SearchOptions, { SelectOption, setCategoryFacets } from "./SearchOptions";
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
  const inputRefUnfocus = React.useRef(null);

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
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
      if (inputRefUnfocus.current && inputRefUnfocus.current.focus) {
        inputRefUnfocus.current.focus()
      }
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
    if (inputRefUnfocus.current && inputRefUnfocus.current.focus) {
      inputRefUnfocus.current.focus()
    }
  }

  // console.log("totalCount: ", data?.search?.totalCount)
  // console.log('searchTerm: ', searchTerm)
  console.log('currentcategories: ', currentCategories)

  return (
    <div className={classes.searchRoot}>

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
    </div>
  )
}



interface SearchbarProps extends WithStyles<typeof styles> {
  color?: string;
}

let styles = (theme: Theme) => createStyles({
  searchRoot: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `unset`,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    borderRadius: BorderRadius4x,
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  flex: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    cursor: 'pointer',
  },
});


export default withStyles(styles)( SearchbarMain );
