
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
    },
  } = facetSearchParams;


  const onClickSearch = (event) => {
    setPageParam(1) // reset to page 1 every time you hit search button
    props.setSearchTermForGql(searchTerm)
    props.setDealerStatesForGql(dealerStates)
    props.setConditionsForGql(conditions)
    // console.log("options:", calibers)
    // let flatCalibers = (calibers ?? []).flatMap(c => c.synonyms)
    let flatCalibers = (calibers ?? []).flatMap(c => c.value)
    // console.log("flat options:", flatCalibers)
    // flatten list of lists of caliber synonyms
    props.setCalibersForGql(flatCalibers)

    props.setCategorySlugsForGql(
      currentCategories?.map(c => c.slug) ?? []
    )
  }

  return (
    <div className={classes.searchContainer}>
      <div className={
        props.isMobile
        ? props.focusedOuter
          ? clsx(
            classes.searchContainerInnerMobile,
            classes.searchMobileHeightFocused,
            "fadeIn",
          )
          : clsx(
            classes.searchContainerInnerMobile,
            classes.searchMobileHeight,
            "fadeIn",
            "slideFromTop",
          )
        : classes.searchContainerInner
      }>

        {/* mobile */}

        {/* <SearchbarOpenSea
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
          conditions={conditions}
          setConditions={setConditions}
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
          setConditionsForGql={setConditionsForGql}
          initialDropdownCategories={props.initialDropdownCategories}
          isMobile={true}
          setFocusedOuter={setFocusedOuter}
          focusedOuter={focusedOuter}
        />

        <div className={classes.positionRelative}>
          <RowOrCardsButtons
            rowMode={rowMode}
            setRowMode={setRowMode}
            isMobile={true}
          />
          <SortByDropdown
            isMobile={true}
            isDarkMode={isDarkMode}
            setOrderBy={setOrderBy}
            sortByOptions={props.sortByOptions}
          />
        </div> */}

        <SearchbarOpenSea
          id={props.id}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
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
          }}
          // disableSearchFilter
          isMobile={props.isMobile}
        />
      </div>

      <div className={classes.flexGrow}/>

      <RowOrCardsButtons
        rowMode={props.rowMode}
        setRowMode={props.setRowMode}
        isMobile={false}
      />
      <div className={classes.positionRelative}>
        <SortByDropdown
          isMobile={false}
          isDarkMode={isDarkMode}
          setOrderBy={setOrderBy}
          sortByOptions={[
            { label: "Newest", value: SortByNewsItems.CREATED_AT_DESC },
            { label: "Oldest", value: SortByNewsItems.CREATED_AT_ASC },
            { label: "Price (High)", value: SortByNewsItems.PRICE_DESC },
            { label: "Price (Low)", value: SortByNewsItems.PRICE_ASC },
          ]}
        />
      </div>
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  id: string;
  setSearchTermForGql(s: string): void
  setCategorySlugsForGql(c: string[]): void

  disableCategoriesFilter: boolean
  setCalibersForGql(c: string[]): void
  setDealerStatesForGql(c: string[]): void
  setConditionsForGql(c: string[]): void

  initialDropdownCategories: Categories[];
  isMobile: boolean;
  focusedOuter: boolean
  setFocusedOuter(b: boolean): void;
  isDarkMode: boolean;
  rowMode: boolean
  setRowMode(a: boolean): void
}


export const styles = (theme: Theme) => createStyles({
  searchContainer: {
    // padding: '0rem 1rem 1rem 1rem',
    width: '100%',
    left: 0,
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  positionRelative: {
    position: "relative",
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
    marginTop: "-0.5rem",
    marginBottom: "1.5rem",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '0rem', // offset gridOrList buttons padding Right
  },
  searchMobileHeight: {
    height: '2rem',
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



