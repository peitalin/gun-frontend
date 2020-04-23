import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import {
  MainBarHeight,
  NewsBarHeight,
  CategoryBarHeight,
  CategoryBarHeightMobile,
  NavBarHeight,
} from "layout/NavBarMain/styles";


const dashboardBarColor = Colors.foregroundColor
const dashboardLinkColor = Colors.darkGrey
const dashboardLinkColorHover = Colors.secondaryBright

// const dashboardBarColor = Colors.black
// const dashboardLinkColor = Colors.slateGrey
// const dashboardLinkColorHover = Colors.lightGreen


const dashboardLinkColor2 = Colors.darkGrey
const dashboardLinkColorHover2 = Colors.secondaryBright

const dashboardMenuHeight = 50 * 7
// 7 items, 50px each


export const styles = (theme: Theme) => createStyles({
  baseBar: {
    zIndex: 5,
    backgroundColor: "#fefefe",
    // boxShadow: `0px 2px 4px -1px rgba(0,0,0,0.2),
    //   0px 1px 1px 0px rgba(0,0,0,0.12)`,
    borderBottom: '1px solid #eaeaea',
    height: `${MainBarHeight - 1}px`, // 1px for borderBottom
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  baseBarInner: {
    width: '100vw',
    display: "flex",
    position: "relative",
    justifyContent: 'center',
    alignItems: "center",
  },

  // Category Bar
  dashboardBar: {
    height: '3rem',
    background: dashboardBarColor,
    border: '0px solid',
    position: 'absolute',
    // boxShadow: "1px 1px 1px 1px rgba(22,22,22,0.2)"
    boxShadow: "0px 1px 2px 0px rgba(40,40,40,0.3)",
  },
  dashboardBarMobile: {
    height: 30,
  },
  dashboardBarInner: {
    zIndex: 3,
    width: '100%',
    display: "flex",
    justifyContent: 'space-between',
    alignItems: "center",
    padding: '0rem 1rem',
  },
  dashboardBarInnerMobile: {
    zIndex: 3,
    width: '100%',
    display: "flex",
    justifyContent: 'space-between',
    alignItems: "center",
    overflow: 'scroll',
    padding: '0rem 1rem',
  },
  dashboardLink: {
  },
  dashboardLinkTextMainHeight: {
    height: CategoryBarHeight,
    fontSize: '1rem',
  },
  dashboardLinkText: {
    fontSize: '1rem',
    fontWeight: 600,
    color: dashboardLinkColor2,
    "&:hover": {
      color: dashboardLinkColorHover2,
    },
    marginBottom: '0.25rem',
    minWidth: '50px',
    whiteSpace: 'nowrap',
  },
  dashboardSelectedLink: {
    color: Colors.charcoal,
    fontSize: '1rem',
    fontWeight: 600,
    "&:hover": {
      color: dashboardLinkColorHover,
      cursor: 'pointer',
    },
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '50px',
    whiteSpace: 'nowrap',
    marginRight: '0.5rem',
  },
  dashboardMenu: {
    top: '3rem',
    height: '100px',
    width: "100%",
    zIndex: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    background: '#fefefe',
    position: 'absolute',
    transform: `translateY(-${dashboardMenuHeight}px)`,
    opacity: 0,
  },
  expandDashboard: {
    zIndex: 3,
    transform: 'translateY(0%)',
    opacity: 1,
    transition: theme.transitions.create(['transform','opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: "100ms",
    }),
    height: dashboardMenuHeight,
  },
  expandMenu: {
    zIndex: 3,
    transform: 'translateY(0%)',
    opacity: 1,
    transition: theme.transitions.create(['transform','opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: "100ms",
    }),
    height: dashboardMenuHeight,
  },
  dashboardMenuDither: {
    height: '100vh',
    width: '100vw',
    zIndex: 2, // above wishlist button which has zIndex: 1
    position: 'fixed',
    bottom: 0,
    backgroundColor: "rgba(47, 57, 65, .85)",
  },
  dashboardOuterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dashboardInnerContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
  },
  menuItem: {
    width: '100%',
    height: 50,
    cursor: 'pointer',
    borderBottom: `1px solid ${Colors.lightGrey}`,
  },

  link: {
    color: theme.palette.grey[600],
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.grey[400],
      cursor: 'pointer',
    }
  },
  navbarButtonMobile: {
    marginRight: "1%",
  },
  baseBarInnerMobile: {
    zIndex: 3,
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    width: '100vw',
    height: MainBarHeight,
    display: "flex",
    position: "relative",
    justifyContent: 'space-between',
    alignItems: "center",
  },
  logoMobile: {
    margin: '0rem 2rem',
    textTransform: "capitalize",
    fontWeight: 500,
    // transform: 'scale(0.9)',
    color: Colors.charcoal,
  },
  buttonCreateProductContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
  },
  buttonCreateProduct: {
    marginLeft: "1rem",
  },
});