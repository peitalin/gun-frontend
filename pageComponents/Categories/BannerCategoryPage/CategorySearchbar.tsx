
import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius3x, Colors } from "layout/AppTheme";
// Typings
import {
  Categories
} from "typings/gqlTypes";
// Search Component
import SearchOptionsAirbnb from "components/SearchbarAirbnb/SearchOptionsAirbnb";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
import { FacetSearchParams } from "utils/hooksFacetSearch";


const CategorySearchbar: React.FC<ReactProps & FacetSearchParams> = (props) => {

  const {
    classes,
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


  const onEnterSearch = (event) => {
    // Desktop only
    if (event.key === "Enter") {
      setPageParam(1) // reset to page 1 every time you hit search button
      props.setSearchTermForGql(searchTerm)
      props.setCategorySlugsForGql(
        currentCategories.map(c => c.slug)
      )
    }
  }

  const onClickSearch = (event) => {
    setPageParam(1) // reset to page 1 every time you hit search button
    props.setSearchTermForGql(searchTerm)
    props.setCategorySlugsForGql(
      currentCategories.map(c => c.slug)
    )
  }


  return (
    <div className={classes.searchContainer}>
      <div className={
          props.isMobile
          ? classes.searchContainerInnerMobile
          : classes.searchContainerInner
        }
        style={
          props.isMobile ? {
            height: props.focusedOuter ? 300 : null,
          } : {}
        }
      >
        <SearchOptionsAirbnb
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onClickSearch={onClickSearch}
          onEnterSearch={onEnterSearch}
          // facets={facets}
          // setCategoryFacets={setCategoryFacets({ facets, setFacets })}
          setCurrentCategories={setCurrentCategories}
          currentCategories={currentCategories}
          // this turns on category-page specific searchbar syncing
          syncUrlToCategory={false}
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
          setFocusedOuter={props.setFocusedOuter}
          updateSetPageDelay={0}
          // disableSearchFilter
          disableSortby
          disablePriceFilter
          // disableCategories
          maxCategoryInputWidth={250}
          isMobile={props.isMobile}
          initialDropdownCategories={props.initialDropdownCategories}
        />
      </div>
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  setSearchTermForGql(s: string): void
  setCategorySlugsForGql(c: string[]): void
  initialDropdownCategories: Categories[];
  isMobile: boolean;
  focusedOuter: boolean
  setFocusedOuter(b: boolean): void;
}


export const styles = (theme: Theme) => createStyles({
  searchContainer: {
    maxWidth: 1160,
    // padding: '0rem 1rem 1rem 1rem',
    width: '100%',
    bottom: '-4.25rem',
    left: 0,
  },
  searchContainerInner: {
    height: '3.5rem',
    marginTop: "-1rem",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '1rem', // offset gridOrList buttons padding Right
  },
  searchContainerInnerMobile: {
    marginTop: "-0.5rem",
    marginBottom: "1.5rem",
    height: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '1rem', // offset gridOrList buttons padding Right
  },
});

export default withStyles(styles)( CategorySearchbar );



