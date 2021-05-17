import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import {
  Colors,
  Gradients,
  BoxShadows,
  BorderRadius,
  isThemeDark,
} from "layout/AppTheme";

import { NewsBarHeight, MainBarHeightDashboard } from "../styles";

/////////////// STYLES /////////////////////
export const CategoryBarHeight = 44;
export const CategoryBarHeightMobile = 30;

const categoryLinkColor = Colors.slateGrey
const categoryLinkColorHover = Colors.gradientUniswapBlue1

const categoryLinkColor2 = Colors.darkGrey
const categoryLinkColorHover2 = Colors.secondaryBright


export const styles = (theme: Theme) => createStyles({
  baseBarDashboard: {
    zIndex: 5,
    position: 'fixed',
    top: 0,
    right: 0,
    // background: theme.palette.type === 'dark'
    //   ? Gradients.gradientUniswapDarkRotated.background
    //   : Gradients.gradientGrey2.background,
    // background: Colors.uniswapDarkNavy,
    paddingTop: NewsBarHeight,
    height: `${MainBarHeightDashboard + NewsBarHeight}px`, // 1px for borderBottom
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  baseBarInnerDashboard: {
    // width: '100vw',
    width: '100%',
    display: "flex",
    position: "relative",
    justifyContent: 'center',
    alignItems: "center",
  },
  // Category Bar
  categoryBar: {
    height: `${CategoryBarHeight - 1}px`, // 1px for borderBottom
    // background: categoryBarColor,
    background: theme.palette.type === 'dark'
      ? Gradients.gradientUniswapDark.background
      : Gradients.gradientGrey2.background,
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
  },
  categoriesMenu: {
    height: '100px',
    width: "100%",
    zIndex: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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
    zIndex: 2, // above watchList button which has zIndex: 1
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
});