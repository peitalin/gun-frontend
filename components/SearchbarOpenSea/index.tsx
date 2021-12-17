import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, alpha } from "@material-ui/core/styles";
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
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import { useRouter } from "next/router";
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
    disableSearchFilter = false,
    disablePaginators = false,
  } = props;

  const router = useRouter();
  // const snackbar = useSnackbar();
  // let y = useScrollYPosition()

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
                classes.height50,
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
                  placeholder="Search for firearms…"
                  classes={{
                    root: clsx(
                      classes.inputRoot,
                      classes.searchWide,
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


            {props.children}

            <Button
              className={clsx(
                classes.searchButtonBluePurple,
                isMobile ? classes.searchButtonMobile : classes.searchButtonDesktop,
                (isMobile && !focused) && classes.displayNoneDelayed,
                classes.searchButtonWide,
                classes.height40,
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
        <div className={clsx(
          classes.arrowContainer,
          classes.height50,
          classes.arrowContainerMobile,
          'alphaInFast',
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
              window.scrollTo({ top: 170 })

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





// export const selectStyles = ({ width }: { width?: any }) => ({
//   container: base => ({
//     ...base,
//     flex: 1,
//     border: 'none',
//     width: width || '175px',
//     cursor: "pointer",
//     "&:hover": {
//       cursor: "pointer",
//     },
//   }),
//   control: styles => ({
//     ...styles,
//     // border: '1px solid #eaeaea',
//     border: 'none',
//     boxShadow: 'none',
//     // background: buttonBackgroundColor,
//     backgroundColor: Colors.dropDownGrey,
//     '&:hover': {
//       border: 'none',
//       cursor: "pointer",
//       backgroundColor: Colors.dropDownGreyHover,
//     },
//     "&:focus": {
//       border: 'none',
//     },
//     borderRadius: '4px',
//     fontSize: '0.9rem',
//     color: Colors.darkGrey,
//     // fontSize: '1rem',
//     width: '100%',
//   }),
//   singleValue: (styles, { data, isDisabled, isFocused, isSelected }) => ({
//     color: Colors.darkGrey,
//   }),
//   indicatorSeparator: styles => ({
//     display:'none'
//   }),
//   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//     return {
//       ...styles,
//       backgroundColor: isSelected
//         ? Colors.charcoal
//         : isFocused
//           ? Colors.lightGrey
//           : Colors.dropDownGrey,
//       fontFamily: '"Helvetica Neue",Arial,sans-serif',
//       fontSize: '1rem',
//       cursor: isDisabled ? 'not-allowed' : 'pointer',
//       "&:hover": {
//         cursor: isDisabled ? 'not-allowed' : 'pointer',
//       },
//     };
//   },
//   menu: styles => ({
//     ...styles,
//     zIndex: 10,
//     marginTop: '2px',
//     cursor: "pointer",
//     "&:hover": {
//       cursor: "pointer",
//     },
//   })
// });




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
  disableSearchFilter?: boolean;
  disablePaginators?: boolean;
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
    // borderRadius: BorderRadius4x,
    borderRadius: `${BorderRadius}px ${BorderRadius4x}px ${BorderRadius4x}px ${BorderRadius}px `,
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
    // height: '100%',
    // width: '100%',
    // position: 'absolute',
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
      delay: 200,
      duration: 300,
    }),
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    // borderRadius: BorderRadius4x,
    borderRadius: `${BorderRadius}px ${BorderRadius4x}px ${BorderRadius4x}px ${BorderRadius}px `,
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
  maxWidth100vw: {
    maxWidth: '1160px',
    width: '100vw',
  },
  marginTop: {
    marginTop: '0.25rem',
  },
  filterSection: {
    width: '100%',
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // flexWrap: "wrap",
  },
  clearIcon: {
    marginLeft: '0.25rem',
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
    // borderRadius: BorderRadius4x,
    borderRadius: `${BorderRadius}px ${BorderRadius4x}px ${BorderRadius4x}px ${BorderRadius}px `,
  },
  height50: {
    height: 50,
    transition: theme.transitions.create(['width', 'height', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: "150ms",
      delay: 150,
    }),
  },
  height40: {
    height: 40,
    transition: theme.transitions.create(['width', 'height', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: "150ms",
      delay: 150,
    }),
  },
  // searchShort: {
  //   width: 260,
  //   transition: theme.transitions.create(['width', 'height'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: "150ms",
  //     delay: 150,
  //   }),
  // },
  searchWide: {
    width: 260,
    transition: theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.sharp,
      duration: "0ms",
    }),
  },
  // searchButtonShort: {
  //   width: 160,
  //   transition: theme.transitions.create(['width', 'height'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: "0ms",
  //   }),
  // },
  searchButtonWide: {
    width: 160,
    transition: theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.sharp,
      duration: "150ms",
      delay: 150,
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
        ? alpha(Colors.purple, 0.9)
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
  arrowContainerMobile: {
    position: "fixed",
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '1rem',
    zIndex: 1,
    // border: theme.palette.type === 'dark'
    //   ? `4px solid ${Colors.uniswapLightNavy}`
    //   : `4px solid ${Colors.slateGreyDarker}`,
    border: theme.palette.type === 'dark'
      ? `4px solid ${Colors.purple}`
      : `4px solid ${Colors.blue}`,
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
