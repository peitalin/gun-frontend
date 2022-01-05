
import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius3x, Colors } from "layout/AppTheme";
// Typings
import {
  Categories,
  SortByNewsItems,
} from "typings/gqlTypes";
// Search Component
import SearchbarOpenSea from "components/SearchbarOpenSea";
import { FacetSearchParams } from "utils/hooksFacetSearch";
import RowOrCardsButtons from "./RowOrCardsButtons";
import SortByDropdown from "components/SortByDropdown";


const SearchbarOpenSeaWrapper: React.FC<ReactProps & FacetSearchParams> = (props) => {

  const {
    classes,
    isDarkMode,
    ...facetSearchParams
  } = props;

  const {
    orderBy,
    setOrderBy,
    priceRange,
    setPriceRange,
    // searchTerm,
    // setSearchTerm,
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
    conditions,
    setConditions,
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
      totalPages,
    },
  } = facetSearchParams;

  // LOCAL searchTerm for local UI updates with less UI lag
  // less re-renders on components higher up component hierarchy
  const [searchTermUi, setSearchTermUi] = React.useState("")

  const onClickSearch = (event) => {
    setPageParam(1) // reset to page 1 every time you hit search button
    props.setSearchTermForGql(searchTermUi)
  }

  return (
    <div className={clsx(
      classes.searchContainer,
      props.isMobile && classes.searchContainerMobile,
    )}>
      <div className={
        props.isMobile
        ? clsx(
            classes.searchContainerInnerMobile,
            classes.searchMobileHeight,
            "fadeIn",
            "slideFromTop",
          )
        : classes.searchContainerInner
      }>
        <SearchbarOpenSea
          id={props.id}
          searchTerm={searchTermUi}
          setSearchTerm={setSearchTermUi}
          onClickSearch={onClickSearch}
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
            debounceSetIndex: debounceSetIndex,
            totalPages: totalPages
          }}
          // disableSearchFilter
          isMobile={props.isMobile}
          disableAdornment={props.isMobile}
        />
      </div>

      <div className={classes.flexGrow}/>

      {
        !props.isMobile &&
        <RowOrCardsButtons
          rowMode={props.rowMode}
          setRowMode={props.setRowMode}
          isMobile={false}
        />
      }
      <div className={
        props.isMobile
          ? classes.positionRelativeMobile
          : classes.positionRelative
      }>
        <SortByDropdown
          isMobile={props.isMobile}
          isDarkMode={isDarkMode}
          setOrderBy={setOrderBy}
          sortByOptions={
            [
              { label: "Newest", value: SortByNewsItems.CREATED_AT_DESC },
              { label: "Oldest", value: SortByNewsItems.CREATED_AT_ASC },
              { label: "Highest $", value: SortByNewsItems.PRICE_DESC },
              { label: "Lowest $", value: SortByNewsItems.PRICE_ASC },
            ]
          }
        />
      </div>
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  id: string;
  setSearchTermForGql(s: string): void

  initialDropdownCategories: Categories[];
  isMobile: boolean;
  isDarkMode: boolean;
  rowMode: boolean
  setRowMode(a: boolean): void
}


export const styles = (theme: Theme) => createStyles({
  searchContainer: {
    position: "relative",
    width: '100%',
    left: 0,
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  searchContainerMobile: {
    flexWrap: "wrap",
  },
  positionRelative: {
    position: "relative",
  },
  positionRelativeMobile: {
    position: "relative",
    marginBottom: '0.5rem',
  },
  flexGrow: {
    flexGrow: 1,
  },
  searchContainerInner: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // paddingLeft: '1rem', // offset gridOrList buttons padding Right
    marginBottom: '0.5rem',
  },
  searchContainerInnerMobile: {
    marginBottom: "0.5rem",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '0rem', // offset gridOrList buttons padding Right
  },
  searchMobileHeight: {
    height: '100%',
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.easeInOut,
      duration: "350ms",
    }),
  },
  searchMobileHeightFocused: {
    height: 300,
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.easeInOut,
      duration: "350ms",
    }),
  },
});

export default withStyles(styles)( SearchbarOpenSeaWrapper );



