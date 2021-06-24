import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius, BorderRadius2x, Gradients, isThemeDark } from "layout/AppTheme";
import {
  MainBarHeightDashboard,
  NewsBarHeight,
  CategoryBarHeight,
  CategoryBarHeightMobile,
  NavBarHeight,
} from "layout/NavBarMain/styles";


const dashboardLinkColorHover = Colors.secondaryBright

const dashboardLinkColor2 = Colors.darkGrey
const dashboardLinkColorHover2 = Colors.secondaryBright

const DashboardBarHeight = 48
const dashboardMenuHeight = 50 * 11
// 11 items, 50px each


export const dashboardBarStyle = (theme: Theme) => ({
  height: DashboardBarHeight,
  position: 'fixed',
  top: `${MainBarHeightDashboard + NewsBarHeight}px`, // 44px for borderBottom
  backdropFilter: "blur(6px)",
  background: isThemeDark(theme)
    ? 'rgba(18, 18, 29, 0.3)'
    : 'rgba(245, 245, 255, 0.8)',
  boxShadow: BoxShadows.shadow1.boxShadow,
  borderBottom: theme.palette.type === 'dark'
    ? `1px solid ${Colors.uniswapMediumNavy}`
    : `1px solid ${Colors.slateGreyDarkest}`,
})
export const dashboardMenuDitherStyle = (theme: Theme) => ({
  height: '100vh',
  width: '100vw',
  zIndex: 2, // above watchList button which has zIndex: 1
  position: 'fixed',
  top: `${MainBarHeightDashboard + NewsBarHeight + DashboardBarHeight}px`, // 44px for borderBottom
  backgroundColor: Colors.modalBackground,
})
export const expandMenuStyle = (theme: Theme, dashboardMenuHeight) => ({
  zIndex: 3,
  height: `calc(${dashboardMenuHeight}px + 1rem)`,
  transform: 'translateY(0%)',
  position: 'fixed',
  top: `${MainBarHeightDashboard + NewsBarHeight + DashboardBarHeight}px`, // 44px for borderBottom
  transition: theme.transitions.create(['transform'], {
    easing: theme.transitions.easing.easeInOut,
    duration: "200ms",
  }),
})


export const styles = (theme: Theme) => createStyles({
  baseBar: {
    zIndex: 5,
    backgroundColor: "#fefefe",
    height: `${MainBarHeightDashboard - 1}px`,
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
  mobileMenuRoutesRoot: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: "center",
    padding: '0.5rem 0.5rem',
    paddingTop: '0.75rem',
    width: '100%',
  },

  // Category Bar
  dashboardBar: {
    ...dashboardBarStyle(theme) as any
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
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black,
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
    width: '100%',
    zIndex: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    transform: `translateY(-${dashboardMenuHeight}px)`,
    opacity: 0,
  },
  // expandDashboard: {
  //   zIndex: 3,
  //   transform: 'translateY(0%)',
  //   opacity: 1,
  //   transition: theme.transitions.create(['transform','opacity'], {
  //     easing: theme.transitions.easing.easeIn,
  //     duration: "200ms",
  //   }),
  //   height: dashboardMenuHeight,
  // },
  expandMenu: {
    ...expandMenuStyle(theme, dashboardMenuHeight) as any
  },
  expandOpacity: {
    opacity: 1,
    transition: theme.transitions.create(['opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: "200ms",
      delay: "0ms",
    })
  },
  dashboardMenuDither: {
    ...dashboardMenuDitherStyle(theme) as any
  },
  dashboardOuterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    borderRadius: BorderRadius,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : "unset",
    // border: theme.palette.type === 'dark'
    //   ? `1px solid ${Colors.uniswapGrey}`
    //   : `1px solid ${Colors.slateGreyDark}`,
  },
  dashboardInnerContainer: {
    width: '100%',
    borderRadius: BorderRadius,
    padding: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  menuItem: {
    width: '100%',
    height: 50,
    cursor: 'pointer',
    borderBottom: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapNavy}`
      : `1px solid ${Colors.slateGreyDark}`,
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
    marginRight: "0.25rem",
  },
  baseBarInnerMobile: {
    zIndex: 3,
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    width: '100vw',
    height: MainBarHeightDashboard - 1,
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
  mobileMenuFlexitem: {
    flexGrow: 1,
    flexBasis: '40%',
    width: '100%',
    borderRadius: BorderRadius,
    height: '2.75rem', //button height
  },
  mobileMenuItemRoot: {
    minHeight: '0rem',
    padding: "0.5rem 1.25rem",
  },
  mobileMenuItemText: {
    fontWeight: 500,
  },
  mobileMenuItemTextEmph: {
    fontWeight: 500,
    color: Colors.gradientUniswapBlue1,
  },
  mobileMenuItemTextEmph2: {
    fontWeight: 500,
    color: Colors.gradientUniswapGreen,
  },
  menuLink: {
    color: Colors.charcoal,
  },
});