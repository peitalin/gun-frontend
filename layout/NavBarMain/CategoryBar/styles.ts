import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import {
  Colors,
  Gradients,
  BoxShadows,
  BorderRadius,
  isThemeDark,
} from "layout/AppTheme";

import {
  MainBarHeight,
  MainBarHeightHomePage,
  CategoryBarHeight,
} from "../styles";

/////////////// STYLES /////////////////////
import {
  blurDark,
  blurLight,
} from "../constants";



export const styles = (theme: Theme) => createStyles({
  baseBarDashboard: {
    top: 0,
    right: 0,
    height: `${MainBarHeight }px`, // 1px for borderBottom
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  baseBarDashboardMobile: {
    zIndex: 5,
    position: 'fixed',
  },
  catBarInnerDashboardDesktop: {
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkPurple
      : Colors.slateGreyDark,
  },
  catBarInnerDashboard: {
    width: '100%',
    display: "flex",
    position: "relative",
    justifyContent: 'center',
    alignItems: "center",
    height: MainBarHeight,
  },
  // Category Bar
  categoryBarTopOffsetSmall: {
    zIndex: 5,
    // position: 'fixed',
    right: 0,
    top: `${MainBarHeight}px`,
  },
  categoryBarTopOffsetBig: {
    zIndex: 5,
    // position: 'fixed',
    right: 0,
    top: `${MainBarHeightHomePage}px`,
  },
  categoryBar: {
    height: `${CategoryBarHeight}px`, // 1px for borderBottom
    // backdropFilter: "blur(6px)",
    background: isThemeDark(theme)
      ? blurDark
      : blurLight,
    borderBottom: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapNavy}`
      : `1px solid ${Colors.slateGrey}`,
  },
  categoryBarMobile: {
    top: `${MainBarHeight}px`, // 1px for borderBottom
  },
  categoryBarShow: {
    display: "unset",
    opacity: 1,
  },
  categoryBarHidden: {
    display: "none",
    opacity: 0,
  },
  categoryBarInner: {
    zIndex: 3,
    width: '100%',
    display: "flex",
    justifyContent: 'space-between',
    maxWidth: "720px",
    alignItems: "center",
    marginLeft: '-1rem',
    height: '100%',
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
  categoryLink: {
    marginRight: '0.5rem',
    minWidth: 80,
    height: '100%',
  },
  categoryLinkAllMobile: {
    height: CategoryBarHeight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '50px',
    whiteSpace: 'nowrap',
    fontSize: '0.8rem',
    borderBottom: '2px solid rgba(0,0,0,0)',
    transition: theme.transitions.create(['border', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: '100ms',
    }),
    "&:hover": {
      color: isThemeDark(theme)
        ? Colors.purple
        : Colors.ultramarineBlueLight,
      transition: theme.transitions.create(['border', 'color'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
  categoryLinkTextMain: {
    height: '100%',
    // height: `${CategoryBarHeight}px`,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.black,
    minWidth: '50px',
    whiteSpace: 'nowrap',
    fontSize: '0.825rem',
    fontWeight: 500,
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
      color: isThemeDark(theme)
        ? Colors.purple
        : Colors.ultramarineBlueLight,
      transition: theme.transitions.create(['border', 'color'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
  categoryLinkTextSelected: {
    transition: theme.transitions.create(['border', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: '100ms',
    }),
    borderBottom: '2px solid',
    color: isThemeDark(theme)
      ? Colors.purple
      : Colors.ultramarineBlueLight,
  },
  showAllCategoriesButton: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: '1rem',
    cursor: 'pointer',
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.black,
    "&:hover": {
      color: isThemeDark(theme)
        ? Colors.purple
        : Colors.ultramarineBlueLight,
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