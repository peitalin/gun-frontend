import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius, BoxShadows, BorderRadius4x } from "layout/AppTheme";
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
// Select Component
import dynamic from "next/dynamic";
const DropdownInput = dynamic(() => import("components/Fields/DropdownInput"), {
  loading: () => <div style={{
    height: 50,
    width: 250,
    border: `1px solid ${Colors.lightGrey}`,
    background: Colors.white,
    borderRadius: '4px',
  }}/>,
  ssr: false,
})
// import DropdownInput from "components/Fields/DropdownInput";
import SearchOptionsPriceFilter from "./SearchOptionsPriceFilter";
import CategoryDropdown from './CategoryDropdown';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Graphql
import { GET_PRODUCT_CATEGORIES } from "queries/categories-queries";
import { useQuery } from '@apollo/client';




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


  const orderByOptions = [
    { label: "Newest", value: { createdAt: Order_By.DESC }},
    { label: "Oldest", value: { createdAt: Order_By.ASC }},
    { label: "Highest Price", value: { price: Order_By.DESC }},
    { label: "Lowest Price", value: { price: Order_By.ASC }},
  ];


  // for fast UI updates
  const [pageUi, setPageUi] = React.useState(1);


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


  // Apollo Graphql
  const categoryData = useQuery<{ getProductCategories: Categories[] }, null>(
    GET_PRODUCT_CATEGORIES
  )
  let categories = categoryData?.data?.getProductCategories
  // console.log('categories: ', categories)


  const searchRef = React.useRef(null)
  const [searchFocused, setSearchFocused] = React.useState(false)
  const [categoryFocused, setCategoryFocused] = React.useState(false)

  const focused = searchFocused || categoryFocused


  return (
    <div className={clsx(
      classes.searchOptionsRoot,
      props.className,
      focused ? classes.height65 : classes.height50,
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
              classes.searchbar,
              focused ? classes.height65 : classes.height50,
              searchFocused && classes.boxShadow,
            )}
              onClick={() => searchRef.current.focus()}
            >
              {/* note: needs the newline here to work
                // @ts-ignore */}
              <InputBase
                value={props.searchTerm}
                ref={searchRef}
                inputRef={input => {
                }}
                placeholder="Search pistols, rifles…"
                classes={{
                  root: clsx(
                    classes.inputRoot,
                    focused ? classes.searchWide : classes.searchShort,
                  ),
                  input: classes.inputInput,
                }}
                onFocus={e => {
                  // console.log('onFocus:', e)
                  setSearchFocused(true)
                }}
                onBlur={e => {
                  // console.log('onBlur:', e)
                  setSearchFocused(false)
                }}
                onChange={e => props.setSearchTerm(e.target.value)}
                onKeyPress={props.onEnter}
                startAdornment={
                  <div className={classes.searchAdornIcon}
                    onClick={() => searchRef.current.focus()}
                  >
                    <SearchIcon className={classes.searchIcon}/>
                  </div>
                }
              />
            </div>
          }

          {
            !disableCategories &&
            <CategoryDropdown
              className={
                clsx(
                  focused ? classes.height65 : classes.height50,
                  categoryFocused && classes.boxShadow,
                )
              }
              currentCategories={props.currentCategories}
              setCurrentCategories={(categories) => {
                props.setCurrentCategories(categories)
              }}
              setFocused={setCategoryFocused}
              dropDownItems={[
                {
                  name: 'All Categories',
                  id: undefined,
                  slug: undefined,
                },
                ...(categories ?? []),
                // {
                //   name: 'Pistols',
                //   id: "category_0001",
                //   slug: "pistols",
                // },
                // {
                //   name: 'Rifles',
                //   id: "category_0002",
                //   slug: "rifles",
                // },
                // {
                //   name: 'Carbines',
                //   id: "category_0003",
                //   slug: "carbines",
                // },
                // {
                //   name: 'Semi-automatics',
                //   id: "category_0004",
                //   slug: 'semi-automatics',
                // },
              ]}
            />
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

          {props.children}

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

          <Button
            className={clsx(
              classes.searchButtonBluePurple,
              focused ? classes.searchButtonShort : classes.searchButtonWide,
              focused ? classes.height55 : classes.height40,
            )}
            variant="text"
            color="primary"
            onClick={props.onClick}
          >
            <SearchIcon className={classes.iconOuter}/>
            Search
          </Button>

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



export const selectStyles = ({ width }: { width?: any }) => ({
  container: base => ({
    ...base,
    flex: 1,
    border: 'none',
    width: width || '175px',
    cursor: "pointer",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  control: styles => ({
    ...styles,
    // border: '1px solid #eaeaea',
    border: 'none',
    boxShadow: 'none',
    // background: buttonBackgroundColor,
    backgroundColor: Colors.dropDownGrey,
    '&:hover': {
      border: 'none',
      cursor: "pointer",
      backgroundColor: Colors.dropDownGreyHover,
    },
    "&:focus": {
      border: 'none',
    },
    borderRadius: '4px',
    fontFamily: '"Helvetica Neue",Arial,sans-serif',
    fontSize: '0.9rem',
    color: Colors.darkGrey,
    // fontSize: '1rem',
    width: '100%',
  }),
  singleValue: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    color: Colors.darkGrey,
  }),
  indicatorSeparator: styles => ({
    display:'none'
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? Colors.charcoal
        : isFocused
          ? Colors.lightGrey
          : Colors.dropDownGrey,
      fontFamily: '"Helvetica Neue",Arial,sans-serif',
      fontSize: '1rem',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      "&:hover": {
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      },
    };
  },
  menu: styles => ({
    ...styles,
    zIndex: 10,
    marginTop: '2px',
    cursor: "pointer",
    "&:hover": {
      cursor: "pointer",
    },
  })
});




/////////// Typings //////////////

interface ReactProps extends WithStyles<typeof styles> {
  // order
  setOrderBy?(a?: SelectOption): void;
  // search term
  searchTerm: string;
  setSearchTerm?(searchTerm?: string): void;
  // Category Facets
  setCategoryFacets?(args: { categoryName?: string, clearFacets?: boolean }): void;
  facets?: string[];
  currentCategories?: Categories[];
  setCurrentCategories: React.Dispatch<React.SetStateAction<Categories[]>>
  // price range
  setPriceRange?(a?: any): void;
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

  onClick?(a: any): any;
  onEnter?(a: any): any;
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
    flexDirection: "row",
    alignItems: 'center',
    width: '100%',
  },
  topSection: {
    width: '100%',
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


  searchbar: {
    position: 'relative',
    cursor: 'pointer',
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    "&:hover": {
      background: theme.palette.type === 'dark'
        ? Colors.uniswapGreyNavy
        : Colors.slateGreyDarker,
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius4x,
  },
  height65: {
    height: 65,
    transition: theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.sharp,
      duration: "100ms",
    }),
  },
  height55: {
    height: 55,
    transition: theme.transitions.create(['width', 'height', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: "100ms",
    }),
  },
  height50: {
    height: 50,
    transition: theme.transitions.create(['width', 'height', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: "300ms",
      delay: 300,
    }),
  },
  height40: {
    height: 40,
    transition: theme.transitions.create(['width', 'height', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: "300ms",
      delay: 300,
    }),
  },
  searchShort: {
    width: 220,
    transition: theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.sharp,
      duration: "300ms",
      delay: 300,
    }),
  },
  searchWide: {
    width: 260,
    transition: theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.sharp,
      duration: "100ms",
    }),
  },
  searchButtonShort: {
    width: 120,
    transition: theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.sharp,
      duration: "100ms",
    }),
  },
  searchButtonWide: {
    width: 140,
    transition: theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.sharp,
      duration: "300ms",
      delay: 300,
    }),
  },
  boxShadow: {
    boxShadow: BoxShadows.shadow4.boxShadow,
  },
  searchIcon: {
    fill: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.black,
  },
  inputRoot: {
    color: 'inherit',
    fontSize: '0.9rem',
  },
  inputInput: {
    width: '100%',
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    fontWeight: 500,
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black,
    transition: theme.transitions.create('width'),
  },
  searchButton: {
    padding: '8px'
  },
  searchButtonBluePurple: {
    color: Colors.cream,
    padding: '8px',
    margin: '5px',
    borderRadius: '2rem',
    // backgroundColor: Colors.secondary,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.purple
      : Colors.secondary,
    "&:hover": {
      color: Colors.cream,
      // backgroundColor: Colors.secondaryBright,
      backgroundColor: theme.palette.type === 'dark'
        ? fade(Colors.purple, 0.9)
        : Colors.secondaryBright,
    },
  },
  searchAdornIcon: {
    marginLeft: '0.75rem',
    marginTop: '0.25rem',
    pointerEvents: "none",
  },
  iconOuter: {
    fill: Colors.cream,
    marginRight: '0.1rem',
  },
});


export default withStyles(styles)( SearchOptionsPaginator );
