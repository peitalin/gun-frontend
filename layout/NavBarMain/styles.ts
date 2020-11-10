import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, Gradients, BoxShadows, BorderRadius2x, BorderRadius3x } from "layout/AppTheme";


/////////////// STYLES /////////////////////
export const MainBarHeightHomePage = 150;
export const MainBarHeightDashboard = 55;

export const NewsBarHeight = 8;
export const CategoryBarHeight = 44;
export const CategoryBarHeightMobile = 30;
// export const NavBarHeight = MainBarHeight + NewsBarHeight + CategoryBarHeight;
export const NavBarHeight = MainBarHeightHomePage + NewsBarHeight;

const categoryBarColor = Colors.black
const categoryLinkColor = Colors.slateGrey
const categoryLinkColorHover = Colors.magenta

const categoryLinkColor2 = Colors.darkGrey
const categoryLinkColorHover2 = Colors.secondaryBright


export const styles = (theme: Theme) => createStyles({
  baseBarHomePage: {
    zIndex: 5,
    // background: Gradients.gradientUniswapDark.background,
    background: 'transparent',
    height: `${MainBarHeightHomePage}px`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: "absolute",
    width: '100%',
    // position: 'relative',
  },
  baseBarInnerHomePage: {
    // width: '100vw',
    width: '100%',
    display: "flex",
    position: "relative",
    justifyContent: 'center',
    alignItems: "center",
  },
  baseBarBorderBottom: {
    borderBottom: `1px solid ${Colors.uniswapLightNavy}`,
  },
  baseBarDither: {
    background: Gradients.gradientBlackDitherDown.background,
    padding: '2rem',
    paddingTop: '2rem',
    top: `${NewsBarHeight}px`,
  },
  baseBarDitherSm: {
    background: Gradients.gradientBlackDitherDown.background,
    padding: '0rem',
    paddingTop: '1rem',
    top: `${NewsBarHeight}px`,
  },
  baseBarBoxShadow: {
    boxShadow: BoxShadows.shadow1.boxShadow,
  },

  baseBarDashboard: {
    zIndex: 5,
    background: Gradients.gradientUniswapDark.background,
    // background: Colors.uniswapDarkNavy,
    height: `${MainBarHeightDashboard - 1}px`, // 1px for borderBottom
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  baseBarInnerDashboard: {
    // width: '100vw',
    width: '100%',
    display: "flex",
    position: "relative",
    justifyContent: 'center',
    alignItems: "center",
  },
  width100: {
    width: '100%',
  },

  // Main Bar
  mainBarInner: {
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
  },
  mainBarInnerHide: {
    display: "none",
    justifyContent: 'center',
    alignItems: "center",
  },
  flexStart: {
    justifyContent: "flex-start"
  },
  flexItem: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
  },
  z5000: {
    zIndex: 5000,
  },
  z5001: {
    zIndex: 5001,
  },
  navbarButton: {
    marginRight: "0.5rem",
    minWidth: '60px',
  },
  navbarButtonSelected: {
    color: Colors.secondaryBright,
  },
  iconText: {
    // background: 'linear-gradient(to right, #30CFD0 0%, #330867 100%)',
    // backgroundClip: 'text',
    // textFillColor: 'transparent',
  },
  buttonText: {
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
  },
  selectedRouteText: {
    color: Colors.secondaryBright,
  },
  cartText: {
    marginLeft: '0.5rem',
  },
  marginLeft: {
    marginLeft: '0.5rem',
  },
  marginRight: {
    marginRight: '0.5rem',
  },
  icons: {
    fill: Colors.uniswapLighterGrey,
  },
  iconsCloud: {
    fill: Colors.uniswapLighterGrey,
    marginRight: '0.25rem',
  },
  iconsSelected: {
    fill: Colors.secondaryBright,
  },
  badge: {
    color: "#fefefe",
  },
  buttonLink: {
  },
  buttonLinkLogo: {
    marginLeft: "1rem",
    marginRight: "1rem",
  },
  menuButton: {
  },
  menuButtonOpen: {
    marginLeft: 12,
    marginRight: 20,
  },
  buttonMarginRight: {
    marginRight: '0.5rem',
  },

  // Category Bar
  categoryBar: {
    height: `${CategoryBarHeight - 1}px`, // 1px for borderBottom
    // background: categoryBarColor,
    background: Gradients.gradientUniswapDark.background,
    border: '0px solid',
    // boxShadow: "1px 1px 1px 1px rgba(22,22,22,0.2)"
    boxShadow: "0px 1px 2px 0px rgba(40,40,40,0.3)",
  },
  categoryBarMobile: {
    height: 30,
  },
  categoryBarInner: {
    zIndex: 3,
    width: '100%',
    display: "flex",
    justifyContent: 'space-between',
    maxWidth: "720px",
    alignItems: "center",
    padding: '0rem 1rem',
  },
  categoryBarInnerMobile: {
    zIndex: 3,
    width: '100%',
    display: "flex",
    justifyContent: 'space-between',
    maxWidth: "720px",
    alignItems: "center",
    overflow: 'scroll',
    padding: '0rem 1rem',
  },
  categoryHeading: {
    marginBottom: "0.5rem",
  },
  categoryLinkGroups: {
    marginRight: '1rem',
  },
  categoryLink: {
  },
  categoryLinkAllMain: {
    color: categoryLinkColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '50px',
    whiteSpace: 'nowrap',
    fontSize: '0.8rem',
    marginRight: '1rem',
    borderBottom: '2px solid rgba(0,0,0,0)',
    transition: theme.transitions.create(['border', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: '100ms',
    }),
    "&:hover": {
      color: categoryLinkColorHover,
      borderBottom: '2px solid',
      transition: theme.transitions.create(['border', 'color'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
  categoryLinkTextMain: {
    color: categoryLinkColor,
    minWidth: '50px',
    whiteSpace: 'nowrap',
    fontSize: '0.8rem',
    // bottom border
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '2px solid rgba(0,0,0,0)',
    transition: theme.transitions.create(['border', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: '100ms',
    }),
    "&:hover": {
      borderBottom: '2px solid',
      color: categoryLinkColorHover,
      transition: theme.transitions.create(['border', 'color'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
  categoryLinkTextMainHeight: {
    height: CategoryBarHeight,
  },
  categoryLinkTextMainHeightMobile: {
    height: CategoryBarHeightMobile,
  },
  categoryLinkAll: {
    color: categoryLinkColor2,
    "&:hover": {
      color: categoryLinkColorHover2,
    },
    minWidth: '50px',
    whiteSpace: 'nowrap',
    fontSize: '0.8rem',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
  },
  categoryLinkText: {
    color: categoryLinkColor2,
    "&:hover": {
      color: categoryLinkColorHover2,
    },
    marginBottom: '0.25rem',
    minWidth: '50px',
    whiteSpace: 'nowrap',
    fontSize: '0.8rem',
  },
  showAllCategoriesButton: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: '1rem',
    cursor: 'pointer',
    color: categoryLinkColor,
    "&:hover": {
      color: categoryLinkColorHover,
    },
    // color: categoryLinkColor2,
    // "&:hover": {
    //   color: categoryLinkColorHover2,
    // },
  },
  categoriesMenu: {
    height: '100px',
    width: "100%",
    zIndex: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // background: categoryBarColor,
    background: Gradients.gradientUniswapDark.background,
    position: 'absolute',
    transform: 'translateY(-200%)',
    opacity: 0,
    transition: theme.transitions.create(['transform', 'opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: "200ms",
    }),
  },
  expandCategories: {
    zIndex: 3,
    transform: 'translateY(0%)',
    opacity: 1,
    transition: theme.transitions.create(['transform','opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: "200ms",
    }),
    height: 200,
  },
  expandMenu: {
    zIndex: 3,
    transform: 'translateY(0%)',
    opacity: 1,
    transition: theme.transitions.create(['transform','opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: "200ms",
    }),
    height: 200,
  },
  categoriesMenuDither: {
    height: '100vh',
    width: '100vw',
    zIndex: 2, // above wishlist button which has zIndex: 1
    position: 'fixed',
    bottom: 0,
    backgroundColor: "rgba(47, 57, 65, .85)",
  },
  categoryOuterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: '2rem',
    maxWidth: '720px',
  },
  categoryInnerContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },


  // News Bar
  newsBar: {
    // background: Gradients.gradientBlack.background,
    background: Gradients.gradientUniswapFluro.background,
    height: `${NewsBarHeight}px`,
    zIndex: 5,
    position: "relative",
  },
  newsBarInner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: '1rem',
  },
  newsBarHeadline: {
    color: Colors.uniswapDarkNavy,
  },
  link: {
    color: theme.palette.grey[600],
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.grey[400],
      cursor: 'pointer',
    }
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

  /// Mobile
  searchIconMobile: {
    width: theme.spacing(6),
    height: '100%',
    position: 'relative',
  },
  navbarButtonMobile: {
    marginRight: "0.5rem",
    minWidth: 50,
  },
  baseBarInnerMobile: {
    zIndex: 3,
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    width: '100vw',
    height: MainBarHeightDashboard,
    display: "flex",
    position: "relative",
    justifyContent: 'space-between',
    alignItems: "center",
  },
  logoMobile: {
    margin: '0rem 1rem',
    textTransform: "capitalize",
    fontWeight: 500,
    // transform: 'scale(0.9)',
    color: Colors.charcoal,
  },
});