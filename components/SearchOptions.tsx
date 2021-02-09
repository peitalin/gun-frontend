import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
import clsx from "clsx";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ClearIcon from '@material-ui/icons/Clear';
import Pagination from '@material-ui/lab/Pagination';
// GraphQL Typings
import {
  Order_By,
  Categories,
} from "typings/gqlTypes";
import { useDebouncedCallback } from 'use-debounce';
// Select Component
import dynamic from "next/dynamic";
const DropdownInput = dynamic(() => import("components/Fields/DropdownInput"), {
  loading: () => <div style={{
    height: 40,
    width: 250,
    border: `1px solid ${Colors.lightGrey}`,
    background: Colors.white,
    borderRadius: '4px',
  }}/>,
  ssr: false,
})
import { selectStyles } from "pageComponents/P/PurchaseProductSummary/ProductLicenses";
// import DropdownInput from "components/Fields/DropdownInput";
import SearchOptionsSearchFilter from "components/SearchOptionsSearchFilter";
import SearchOptionsPriceFilter from "components/SearchOptionsPriceFilter";
import SearchOptionsCategoryFilter from "components/SearchOptionsCategoryFilter";
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";




const SearchOptionsPaginator: React.FC<ReactProps> = (props) => {

  const {
    classes,
    currentCategories,
    facets,
    setSearchTerm,
    setOrderBy,
    setCategoryFacets,
    paginationParams,
    updateSetPageDelay = 256,
    disableCategories = false,
    disableSearchFilter = false,
    disablePriceFilter = false,
    disableSortby = false,
    hidePaginator = false,
  } = props;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))

  const {
    totalCount,
    overfetchBy,
    index,
    pageParam,
    setIndex,
    limit
  } = paginationParams;

  const totalPages = (totalCount * overfetchBy > 0)
    ? Math.ceil(totalCount * overfetchBy / limit)
    : 0;

  // console.log("totalCount: ", totalCount)
  // console.log("totalPages: ", totalPages)
  // console.log("overfetchBy: ", overfetchBy)

  const orderByOptions = [
    { label: "Newest", value: { createdAt: Order_By.DESC }},
    { label: "Oldest", value: { createdAt: Order_By.ASC }},
    { label: "Highest Price", value: { price: Order_By.DESC }},
    { label: "Lowest Price", value: { price: Order_By.ASC }},
  ];

  // for fast UI updates.
  const [searchTermUi, setSearchTermUi] = React.useState("");
  // for actual gql dispatch for search term
  const [debounceSetSearchTerm] = useDebouncedCallback((s: string) => {
    console.log("setting searchTerm: ", s)
    setSearchTerm(s)
  }, 128);

  // for fast UI updates
  const [pageUi, setPageUi] = React.useState(1);
  // for actual gql dispatch for pagination page
  const [debounceSetPageParam, cancel, callPending] = useDebouncedCallback(
    (page: number) => {
      if (option(paginationParams).setPageParam()) {
        paginationParams.setPageParam(page)
      }
    },
    updateSetPageDelay
  ) // debounce by 540ms

  const [debounceSetIndex] = useDebouncedCallback((index: number) => {
      setIndex(index)
    },
    updateSetPageDelay
  ) // debounce by 540ms

  const sortAlphabetically = (c1: Categories, c2: Categories): number => {
    let c1name = option(c1).name() ? c1.name.toLowerCase() : ""
    let c2name = option(c2).name() ? c2.name.toLowerCase() : ""
    return (c1name > c2name) ? 1 : -1
  }

  React.useEffect(() => {
    if (setOrderBy) {
      setOrderBy(orderByOptions[0])
    }
  }, [])

  React.useEffect(() => {
    // usually, index is updated in response to pageUi changes
    // so that paginator number UI can switch without being blocked
    // but sometimes, when setting facets or filters (searchTerm)
    // pageUI needs to be synced to
    // index (as the number of pages can shrink to 1)
    setPageUi(index+1)
    if (option(paginationParams).setPageParam()) {
      paginationParams.setPageParam(index+1)
    }
  }, [index])

  React.useEffect(() => {
    // set page UI to pageParam (which may be url queyr params)
    // only do this on initial mount once
    setPageUi(pageParam)
  }, [])


  return (
    <div className={clsx(
      classes.searchOptionsRoot,
      props.className,
      props.float && classes.searchOptionsRootFixed,
    )} style={props.style}>

      <div className={classes.topSection}
        style={props.topSectionStyles}
      >

        <div className={clsx(classes.filterSection, classes.maxWidth100vw)}
          style={{ ...props.filterSectionStyles }}
        >
          {
            !disableSearchFilter &&
            <div className={clsx(
              classes.marginBottom05,
              smDown && classes.width100Sm,
            )}>
              <SearchOptionsSearchFilter
                value={searchTermUi}
                placeholder={props.placeholder || "Search for products…"}
                onSearchTermChange={(searchTerm: string) => {
                  setSearchTermUi(searchTerm);
                  debounceSetSearchTerm(searchTerm)
                }}
              />
            </div>
          }
          {
            props.setPriceRange &&
            !disablePriceFilter &&
            <div className={classes.marginRight05}>
              <SearchOptionsPriceFilter
                setPriceRange={props.setPriceRange}
              />
            </div>
          }

          {
            !disableSortby &&
            <>
              <div className="search-expander" style={{ flexGrow: 1 }}/>
              <div className={clsx(
                  classes.dropdownContainer,
                  classes.marginRight05,
                  classes.marginLeft05,
                )}
                style={{ ...props.dropdownContainerStyle }}
              >
                <DropdownInput
                  stateShape={
                    orderByOptions[0]
                    // initial stateShape
                    // { label: "Design Templates", value: "category_123123"}
                  }
                  isSearchable={false}
                  hideCursor={true}
                  onChange={({ label, value }: SelectOption) =>
                    setTimeout(() => {
                      setOrderBy({ label, value })
                    }, 0)
                    // let UI update first for menu to close
                  }
                  options={orderByOptions}
                  placeholder={"Select a category"}
                  styles={selectStyles({ width: 200 })}
                  theme={theme => ({
                    ...theme,
                    // width: '100%',
                    maxWidth: '200px',
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: '#e2e2e2',
                      primary: '#333333',
                    }
                  })}
                />
              </div>
            </>
          }
          {
            !disableCategories &&
            <div className={clsx(
              classes.marginBottom05,
              classes.marginLeft05,
              smDown && classes.width100Sm,
            )}>
              <div style={{ ...props.categorySectionStyles }}>
                <SearchOptionsCategoryFilter
                  currentCategories={currentCategories}
                  facets={facets}
                  setCategoryFacets={setCategoryFacets}
                  dropdown={true}
                  defaultExpanded={false}
                  maxWidth={props.maxCategoryInputWidth}
                />
              </div>
            </div>
          }
        </div>

        {/* {
          !disableCategories &&
          <div className={classes.marginBottom05}>
            <div style={{ ...props.categorySectionStyles }}>
              <SearchOptionsCategoryFilter
                currentCategories={currentCategories}
                facets={facets}
                setCategoryFacets={setCategoryFacets}
                dropdown={true}
                defaultExpanded={false}
                maxWidth={props.maxCategoryInputWidth}
              />
            </div>
          </div>
        } */}
      </div>

      <div className={classes.bottomSection}
        style={props.bottomSectionStyles}
      >

        {props.children}

        <div className={clsx(classes.paginationContainer, classes.marginRight05)}>
        {
          paginationParams &&
          !hidePaginator &&
          <div className={clsx(classes.marginRight05)}>
            <Pagination
              disabled={totalCount === 0}
              count={totalPages || 1}
              page={pageUi}
              // page={index+1}
              onMouseDown={(e) => {
                // console.log("mouse down: ", e)
              }}
              onChange={(event, page) => {
                // update paginator UI first
                setPageUi(page)
                // setTimeout(() => {
                // }, 0)
                // then update pageParams (gQL request) + index change in carousel
                debounceSetPageParam(page)
                debounceSetIndex(page - 1)

              }}
            />
          </div>
        }
        </div>
      </div>

    </div>
  )
}



export const setCategoryFacets = (
  { facets, setFacets }: {
    facets: string[],
    setFacets: React.Dispatch<React.SetStateAction<string[]>>
  }
) => (
  { categoryName, clearFacets, singleCategory }: {
    categoryName: string,
    clearFacets: boolean,
    singleCategory?: boolean
  }
) => {

  if (clearFacets) {
    setFacets([])
  } else {

    let categoryFacet = `_categoryNameFacet:${categoryName}`
    let facetIndex = facets.findIndex(f => f === categoryFacet)

    if (singleCategory) {
      // single category facet at a time
      setFacets([categoryFacet])
    } else {
      // accumulate category facets, filter by groups of categories
      if (facetIndex >= 0) {
        // remove facetIndex from group
        setFacets([
          ...facets.slice(0, facetIndex),
          ...facets.slice(facetIndex + 1),
        ])
      } else {
        // add facetIndex to group
        setFacets([...facets, categoryFacet])
      }
    }

  }
}



/////////// Typings //////////////

interface ReactProps extends WithStyles<typeof styles> {
  // order
  setOrderBy?(a?: SelectOption): void;
  // search term
  setSearchTerm?(searchTerm?: string): void;
  // Category Facets
  setCategoryFacets?(args: { categoryName?: string, clearFacets?: boolean }): void;
  facets?: string[];
  currentCategories?: Categories[];
  // price range
  setPriceRange?(a?: any): void;
  float?: boolean;
  paginationParams: {
    limit: number
    pageParam: number
    setPageParam?(a?: any): void;
    totalCount: number
    overfetchBy: number
    index: number
    setIndex(a?: any): void;
    onPrevPage?(a?: any): void;
    onNextPage?(a?: any): void;
  };
  // styles overrrides
  filterSectionStyles?: any;
  categorySectionStyles?: any;
  dropdownContainerStyle?: any;
  // for top section with search options + facets
  topSectionStyles?: any;
  // for bottom section, where the child components + paginators are
  bottomSectionStyles?: any;
  disableCategories?: boolean;
  disableSearchFilter?: boolean;
  disablePriceFilter?: boolean;
  disableSortby?: boolean;
  maxCategoryInputWidth?: any;
  hidePaginator?: boolean;
  updateSetPageDelay?: number;
  placeholder?: string;
  className?: any;
  style?: any;
}
export interface SelectOption {
  label: string;
  value: {
    createdAt?: Order_By
    price?: Order_By
  }
}

/////////// Styles //////////////

const styles = (theme: Theme) => createStyles({
  searchOptionsRoot: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: 'center',
    width: '100%',
  },
  searchOptionsRootFixed: {
    position: 'fixed',
    top: '0rem',
    background: '#fff',
    padding: '1rem',
    zIndex: 100,
    boxShadow: BoxShadows.shadow1.boxShadow,
  },
  topSection: {
    width: '100%',
    paddingRight: '1rem',
  },
  bottomSection: {
    width: '100%',
  },
  facetSection: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: 'center',
  },
  maxWidth100vw: {
    maxWidth: '1160px',
    width: '100vw',
  },
  marginLeft1: {
    marginLeft: '1rem',
  },
  marginRight05: {
    marginRight: '0.5rem',
  },
  marginLeft05: {
    marginLeft: '0.5rem',
  },
  width100Sm: {
    width: '100%',
  },
  marginBottom05: {
    marginBottom: '0.5rem',
  },
  filterSection: {
    width: '100%',
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flexWrap: "wrap",
  },
  dropdownContainer: {
    // flexBasis: '30%',
    // width: '100%',
    minWidth: 130,
    marginRight: '0rem',
    marginBottom: '0.5rem',
    // marginLeft: '1rem',
    display: 'flex',
    justifyContent: 'center',
    // justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  buttonRoot: {
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    background: fade(Colors.slateGrey, 0.4),
    border: 'none',
    borderRadius: '2rem',
    transition:  theme.transitions.create(['background', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: 200,
    }),
    "&:hover": {
      // background: Colors.lightGrey,
      background: Colors.charcoal,
      color: Colors.white,
      transition:  theme.transitions.create(['background', 'color'], {
        easing: theme.transitions.easing.easeIn,
        duration: 200,
      })
    },
  },
  buttonSelected: {
    background: Colors.darkGrey,
    color: Colors.cream,
    "&:hover": {
      background: Colors.charcoal,
      color: Colors.white,
      transition:  theme.transitions.create('background', {
        easing: theme.transitions.easing.easeIn,
        duration: 100,
      })
    },
  },
  clearIcon: {
    marginLeft: '0.25rem',
  },
  paginationContainer: {
    flexBasis: '100%',
    // marginRight: '1rem',
    // marginLeft: '1rem',
    display: 'flex',
    // justifyContent: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

});


// export default withStyles(styles)( SearchOptionsPaginator );

export default withStyles(styles)(React.memo(
  (props: ReactProps) => <SearchOptionsPaginator {...props}/>,
  (prevProps, nextProps) => {

    // let prevLength = option(prevProps).productsForSaleConnection.edges([]).length
    // let nextLength = option(nextProps).productsForSaleConnection.edges([]).length

    let stopRerender = false;
    // let rerender =  prevLength < nextLength
    //     && prevProps.index !== nextProps.index
    //     && prevProps.itemsPerGrid !== nextProps.itemsPerGrid
    let pTotalCount = option(prevProps).paginationParams.totalCount()
    let nTotalCount = option(nextProps).paginationParams.totalCount()

    if (pTotalCount > 0 && nTotalCount === undefined) {
      stopRerender = true
    }

    // console.log("PREV paginationParams: ", prevProps.paginationParams)
    // console.log("NEXT paginationParams: ", nextProps.paginationParams)

    // if true, don't re-render
    return stopRerender
  },
))