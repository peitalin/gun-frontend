import React from "react";
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
  DealerState,
  Calibers,
} from "typings/gqlTypes";
// Select Component
import DropdownInput from "components/Fields/DropdownInput";
import SearchOptionsPriceFilter from "./SearchOptionsPriceFilter";
import CategoryDropdown from './CategoryDropdown';
import AdvancedSearchDropdown from './AdvancedSearchDropdown';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
// Graphql
import { GET_CATEGORIES } from "queries/categories-queries";
import { useQuery } from '@apollo/client';
import { SelectOptionCaliber } from "typings"




const SearchbarAirbnb: React.FC<ReactProps> = (props) => {

  const {
    id,
    classes,
    searchTerm,
    setSearchTerm,
    setOrderBy,
    paginationParams,
    isMobile,
    syncUrlToCategory = false,
    disableCategoriesFilter = false,
    disableAdvancedSearch = false,
    disableCalibers = false,
    disableSearchFilter = false,
    disablePriceFilter = false,
    disableSortby = false,
    disablePaginators = false,
  } = props;

  const router = useRouter();
  // const snackbar = useSnackbar();

  const {
    totalCount,
    overfetchBy,
    index,
    pageParam,
    setIndex,
    limit
  } = paginationParams;

  // for fast UI updates
  const [pageUi, setPageUi] = React.useState(1);

  const clickBackgroundId = `search-background-${router.pathname}`


  const focusSearchOnMobile = (b: boolean) => {
    if (isMobile) {
      // clickaway listerner for mobile only
      setMobileFocused(b)
      if (props.setFocusedOuter) {
        props.setFocusedOuter(b)
      }
    }
  }

  const handleClickSearch = (searchTerm) => {
    if (props.onClickSearch) {
      props.onClickSearch(searchTerm)
    }
    focusSearchOnMobile(false)
  }

  const handleEnterSearch = (event) => {
    if (event.key === "Enter") {
      // programmatically blur input
      // don't programmatically click, pass searchTerm to the function directly
      // or searchTerm will be undefined
      let f = document.getElementById(searchBlurId)
      f.blur()
      handleClickSearch(searchTerm)
    }
  }


  React.useEffect(() => {
    if (router.query.refetch) {
      handleClickSearch(searchTerm)
    }
    // refetch=1 param is taken away after render
    // this is needed to force the mobile search bar to refetch after
    // param change
  }, [router.query, searchTerm])


  React.useEffect(() => {
    // usually, index is updated in response to pageUi changes
    // so that paginator number UI can switch without being blocked
    // but sometimes, when setting facets or filters (searchTerm)
    // pageUI needs to be synced to
    // index (as the number of pages can shrink to 1)
    setPageUi(index+1)
    if (paginationParams?.setPageParam) {
      paginationParams.setPageParam(index+1)
    }
  }, [index])

  React.useEffect(() => {
    // sync page UI to pageParam (which may be url query params)
    setPageUi(pageParam)
  }, [pageParam])


  const searchRef = React.useRef(null)
  const searchBlurId = `search-input-to-blur-on-enter-${id}`

  const [searchFocused, setSearchFocused] = React.useState(false)
  const [categoryFocused, setCategoryFocused] = React.useState(false)
  const [advancedSearchFocused, setAdvancedSearchFocused] = React.useState(false)
  const [mobileFocused, setMobileFocused] = React.useState(false)

  const focused = searchFocused
    || categoryFocused
    || advancedSearchFocused
    || mobileFocused

  // console.log('focused: ', focused)
  // console.log('advancedSearchFocused: ', advancedSearchFocused)
  // console.log('mobileFocused: ', mobileFocused)
  // console.log(`isMobile && !focused: ${isMobile && !focused}`)
  // console.log(`isMobile>>> ${isMobile}`)
  // console.log('totalCount: ', totalCount)
  // console.log('searchTerm: ', searchTerm)

  return (
    <div className={clsx(
      isMobile ? classes.searchRootMobile : classes.searchRoot,
    )}>
      <div
        className={clsx(
          isMobile
            ? classes.searchOptionsRootMobile
            : classes.searchOptionsRoot,
          (isMobile && focused) && classes.searchMobileExpanded,
          (isMobile && !focused) && classes.searchMobileNotExpanded,
          props.className,
        )}
        style={{ ...props.style }}
      >

        {
          isMobile && focused &&
          <div className={classes.clickBackgroundLayer}
            onClick={() => focusSearchOnMobile(false)}
            id={clickBackgroundId}
          />
        }

        <div className={classes.topSection} style={props.topSectionStyles}>
          <div className={clsx(classes.filterSection, classes.maxWidth100vw)}
            style={{
              flexDirection: isMobile ? "column" : "row",
              ...props.filterSectionStyles
            }}
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
                  type={"text"}
                  autoComplete={"new-password"} // this disables autofill
                  // inputRef={input => {
                  // }}
                  id={searchBlurId}
                  placeholder="Search for firearms in…"
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
                    focusSearchOnMobile(true)
                  }}
                  onBlur={e => {
                    // console.log('onBlur:', e)
                    setSearchFocused(false)
                  }}
                  onChange={e => setSearchTerm(e.target.value)}
                  onKeyPress={handleEnterSearch}
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
              !disableCategoriesFilter &&
              <CategoryDropdown
                className={clsx(
                  focused ? classes.height65 : classes.height50,
                  isMobile ? classes.searchFilterButtonMobile : classes.searchFilterButtonDesktop,
                  (isMobile && !focused) && classes.displayNoneDelayed,
                  // hide on mobile when not focused
                  categoryFocused && classes.boxShadow,
                )}
                syncUrlToCategory={syncUrlToCategory}
                currentCategories={props.currentCategories}
                setCurrentCategories={(categories) => {
                  props.setCurrentCategories(categories)
                }}
                setMobileFocused={(b: boolean) => {
                  focusSearchOnMobile(true)
                }}
                setFocused={(b: boolean) => {
                  setCategoryFocused(b)
                }}
              />
            }

            {
              !disableAdvancedSearch &&
              <AdvancedSearchDropdown
                className={clsx(
                  focused ? classes.height65 : classes.height50,
                  isMobile ? classes.searchFilterButtonMobile2 : classes.searchFilterButtonDesktop,
                  (isMobile && !focused) && classes.displayNoneDelayed,
                  // hide on mobile when not focused
                  advancedSearchFocused && classes.boxShadow,
                )}
                dealerStates={props.dealerStates}
                setDealerStates={(d) => {
                  props.setDealerStates(d)
                }}
                calibers={props.calibers}
                setCalibers={(d) => {
                  props.setCalibers(d)
                }}
                setMobileFocused={(b: boolean) => {
                  focusSearchOnMobile(true)
                }}
                setFocused={(b: boolean) => {
                  setAdvancedSearchFocused(b)
                }}
              />
            }


            {
              props.setPriceRange &&
              !disablePriceFilter &&
              <div className={clsx(
                classes.marginRight05,
                (isMobile && !focused) && classes.displayNoneDelayed,
                // hide on mobile when not focused
              )}>
                <SearchOptionsPriceFilter
                  setPriceRange={props.setPriceRange}
                />
              </div>
            }

            {props.children}

            <Button
              className={clsx(
                classes.searchButtonBluePurple,
                isMobile ? classes.searchButtonMobile : classes.searchButtonDesktop,
                (isMobile && !focused) && classes.displayNoneDelayed,
                // hide on mobile when not focused
                focused ? classes.searchButtonShort : classes.searchButtonWide,
                focused ? classes.height55 : classes.height40,
              )}
              classes={{
                label: classes.buttonLabel
              }}
              variant="text"
              color="primary"
              onClick={() => handleClickSearch(searchTerm)}
            >
              <SearchIcon className={classes.iconOuter}/>
              Search
            </Button>

          </div>
        </div>
      </div>

      {
        !disablePaginators &&
        totalCount > 0 &&
        <div className={clsx(
          classes.arrowContainer,
          classes.height50,
          // focused ? classes.height65 : classes.height50,
          isMobile && classes.marginTop,
          (isMobile && focused) && classes.displayNoneDelayed,
          // hide on mobile when menu is focused/expanded
        )}
          style={props.paginatorStyles}
        >
          <Pagination
            // size={isMobile ? "small" : "medium"}
            size={"medium"}
            classes={{
              root: classes.paginationPage,
            }}
            count={totalCount}
            disabled={totalCount === 0}
            page={pageUi}
            onMouseDown={(e) => {
              // console.log("mouse down: ", e)
            }}
            onChange={(event, page) => {
              console.log("pageee: ", page)
              // update paginator UI first
              setPageUi(page)
              if (paginationParams?.setPageParam) {
                paginationParams.setPageParam(page)
              }
              //////////////////// adding this lags page transitions
              // setIndex(page - 1)

              // then update pageParams (gQL request) + index change in carousel
              // debounceSetPageParam(page)
              // debounceSetIndex(page - 1)
            }}
          />
        </div>
      }

    </div>
  )
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
  id: string;
  // search term
  searchTerm: string;
  setSearchTerm?(searchTerm?: string): void;
  // order
  setOrderBy?(a?: SelectOption): void;
  // price range
  setPriceRange?(a?: any): void;
  currentCategories?: Categories[];
  setCurrentCategories: React.Dispatch<React.SetStateAction<Categories[]>>
  dealerStates: DealerState[],
  setDealerStates: React.Dispatch<React.SetStateAction<DealerState[]>>
  calibers: SelectOptionCaliber[],
  setCalibers: React.Dispatch<React.SetStateAction<SelectOptionCaliber[]>>
  actionTypes: string[],
  setActionTypes: React.Dispatch<React.SetStateAction<string[]>>
  paginationParams: {
    limit: number
    offset?: number
    overfetchBy: number
    pageParam: number
    setPageParam?(a?: any): void;
    totalCount: number
    index: number
    setIndex(a?: any): void;
    debounceSetIndex?(a?: any): void;
  };
  setFocusedOuter?(b: boolean): void;
  onClickSearch(searchTerm?: any): void;
  // styles overrrides
  styles?: any;
  filterSectionStyles?: any;
  categorySectionStyles?: any;
  // for top section with search options + facets
  topSectionStyles?: any;
  // for bottom section, where the child components + paginators are
  bottomSectionStyles?: any;
  paginatorStyles?: any;
  syncUrlToCategory?: boolean;
  disableCategoriesFilter?: boolean;
  disableAdvancedSearch?: boolean;
  disableCalibers?: boolean;
  disableSearchFilter?: boolean;
  disablePriceFilter?: boolean;
  disableSortby?: boolean;
  disablePaginators?: boolean;
  maxCategoryInputWidth?: any;
  placeholder?: string;
  className?: any;
  style?: any;
  isMobile: boolean;
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
  searchRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
    position: 'relative',
    flexWrap: "wrap",
  },
  searchRootMobile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
  },
  clickBackgroundLayer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
  },
  searchOptionsRoot: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    borderRadius: BorderRadius4x,
  },

  searchOptionsRootMobile: {
    display: "flex",
    opacity: 0.99,
    // opacity: 1,
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    zIndex: 1,
  },
  searchMobileExpanded: {
    // height: '100vh',
    // width: '100vw',
    // position: 'fixed',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    transition:  theme.transitions.create(['height', 'width'], {
      easing: theme.transitions.easing.easeIn,
      duration: 0,
    }),
    border: 'unset',
  },
  searchMobileNotExpanded: {
    height: '52px', // height of the SearchInput plus 2px border
    width: '262px', // width of the SearchInput plus 2px border
    transition:  theme.transitions.create(['height', 'width'], {
      easing: theme.transitions.easing.easeIn,
      delay: 300,
      duration: 300,
    }),
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius4x,
  },
  displayNoneDelayed: {
    // display: 'none',
    position: 'absolute',
    zIndex: -1,
    opacity: 0,
  },
  topSection: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: 'center',
  },
  bottomSection: {
    width: '100%',
  },
  facetSection: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    // flexWrap: "wrap",
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
  marginTop: {
    marginTop: '0.25rem',
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
    // flexWrap: "wrap",
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
      duration: "0ms",
    }),
  },
  height55: {
    height: 55,
    transition: theme.transitions.create(['width', 'height', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: "0ms",
    }),
  },
  height50: {
    height: 50,
    transition: theme.transitions.create(['width', 'height', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
      delay: 200,
    }),
  },
  height40: {
    height: 40,
    transition: theme.transitions.create(['width', 'height', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
      delay: 200,
    }),
  },
  searchShort: {
    width: 260,
    transition: theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
      delay: 200,
    }),
  },
  searchWide: {
    width: 260,
    transition: theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.sharp,
      duration: "0ms",
    }),
  },
  searchButtonShort: {
    width: 160,
    transition: theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.sharp,
      duration: "0ms",
    }),
  },
  searchButtonWide: {
    width: 160,
    transition: theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
      delay: 200,
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
    fontSize: '1rem',
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
  searchFilterButtonDesktop: {
    margin: '0rem',
  },
  searchFilterButtonMobile: {
    margin: '0.5rem',
  },
  searchFilterButtonMobile2: {
    margin: '0rem 0.5rem 0.5rem 0.5rem',
  },
  searchButtonDesktop: {
    margin: '5px',
  },
  searchButtonMobile: {
    margin: '0px',
  },
  searchButtonBluePurple: {
    color: Colors.cream,
    padding: '8px',
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
  buttonLabel: {
    fontSize: '1rem',
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
  arrowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: 50,
    marginTop: '0.5rem',
    padding: '0rem 0.25rem',
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    borderRadius: BorderRadius4x,
  },
  backButton: {
  },
  forwardButton: {
  },
  paginationPage: {
    "& > ul > li > button": {
      color: theme.palette.type === 'dark'
        ? Colors.uniswapLightestGrey
        : Colors.slateGreyBlack,
    },
  },
});


export default withStyles(styles)( SearchbarAirbnb );
