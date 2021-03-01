import React from "react";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import ErrorBounds from "components/ErrorBounds";
// MUI
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { useSnackbar, ProviderContext } from "notistack";

// Search Component
import SearchOptions, { SelectOption, setCategoryFacets } from "components/SearchOptions";
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
  // console.log('data: ', data)

  return (
    <div className={classes.searchRoot}>
      <div className={classes.searchbar}>
        {/* note: needs the newline here to work
          // @ts-ignore */}
        <InputBase
          value={value}
          inputRef={input => {
            // input.blur()
          }}
          placeholder="Search pistols, rifles…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={e => setValue(e.target.value)}
          onKeyPress={onEnter}
          startAdornment={
            // <SearchAdornmentButton
            //   classes={classes}
            //   onClick={onClick}
            //   color={color}
            // />
            <div className={classes.searchAdornIcon}>
              <SearchIcon style={{ fill: color || "#242424" }}/>
            </div>
          }
        />
      </div>
      <Button
        className={classes.searchButtonRed}
        variant="text"
        color="primary"
        onClick={onClick}
      >
        Search
      </Button>

      <SearchOptions
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
        disableSearchFilter
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
          marginTop: '1rem',
          paddingRight: '1rem',
        }}
        bottomSectionStyles={{
          marginBottom: '1rem',
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
    width: '100%',
    maxWidth: 400,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  flex: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    cursor: 'pointer',
  },
  searchbar: {
    width: '100%',
    position: 'relative',
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.lightGrey}`
      : `1px solid ${Colors.lightGrey}`,
    // borderRadius: `${BorderRadius}px 0px 0px ${BorderRadius}px`,
    borderRadius: `${BorderRadius}px ${BorderRadius}px ${BorderRadius}px ${BorderRadius}px`,
    // backgroundColor: "rgba(152,152,152,0.1)",
    // '&:hover': {
    //   backgroundColor: "rgba(152,152,152,0.05)",
    // },
  },
  searchIcon: {
    width: theme.spacing(6),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    fontSize: '0.9rem',
    width: '100%',
    color: Colors.slateGrey,
  },
  inputInput: {
    width: '100%',
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    transition: theme.transitions.create('width'),
  },
  searchButton: {
    padding: '8px'
  },
  searchButtonRed: {
    color: Colors.cream,
    padding: '8px',
    width: 100,
    marginLeft: "0.5rem",
    borderRadius: `${BorderRadius}px`,
    backgroundColor: Colors.secondary,
    "&:hover": {
      color: Colors.cream,
      backgroundColor: Colors.secondaryBright,
    },
  },
  searchAdornIcon: {
    marginLeft: '0.75rem',
    marginTop: '0.25rem',
  },
});


export default withStyles(styles)( SearchbarMain );
