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
  const [value, setValue] = React.useState("");
  const router = useRouter();

  const snackbar = useSnackbar();
  const inputRefUnfocus = React.useRef(null);

  const onEnter = (event) => {
    if (event.key === "Enter") {
      if (!value) {
        snackbar.enqueueSnackbar(
          `No search term entered!`,
          { variant: "info" }
        )
        return
      }
      router.push(`/search?q=${encodeURIComponent(value)}`)
      if (inputRefUnfocus.current && inputRefUnfocus.current.focus) {
        inputRefUnfocus.current.focus()
      }
    }
  }

  const onClick = (event) => {
    if (!value) {
      snackbar.enqueueSnackbar(
        `No search term entered!`,
        { variant: "info" }
      )
      return
    }
    router.push(`/search?q=${encodeURIComponent(value)}`)
    if (inputRefUnfocus.current && inputRefUnfocus.current.focus) {
      inputRefUnfocus.current.focus()
    }
  }

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


  // console.log("totalCount: ", data?.search?.totalCount)
  console.log('value: ', value)

  return (
    <div className={classes.searchRoot}>

      <SearchOptions
        value={value}
        setValue={setValue}
        onEnter={onEnter}
        onClick={onClick}
        // facets={facets}
        setCategoryFacets={setCategoryFacets({ facets, setFacets })}
        // currentCategories={currentCategories}
        setSearchTerm={setSearchTerm}
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
    background: Colors.cream,
    borderRadius: BorderRadius4x,
  },
  flex: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    cursor: 'pointer',
  },
});


export default withStyles(styles)( SearchbarMain );
