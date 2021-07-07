import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import {
  Colors,
  Gradients,
  BoxShadows,
  BorderRadius,
  isThemeDark,
} from "layout/AppTheme";

import {
  MobileNavbarHeight,
  MainBarHeightDashboard,
  MainBarHeightHomePage,
  CategoryBarHeight,
  CategoryBarHeightMobile,
} from "../styles";

/////////////// STYLES /////////////////////
import {
  blurDark,
  blurLight,
} from "../constants";



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
    // paddingTop: NewsBarHeight,
    height: `${MainBarHeightDashboard }px`, // 1px for borderBottom
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
  categoryBarTopOffsetSmall: {
    zIndex: 5,
    position: 'fixed',
    right: 0,
    top: `${MainBarHeightDashboard + 1}px`, // 1px otherwise border overlaps
    // border + blur => shadow effect in the middle of the bar which you don't want
  },
  categoryBarTopOffsetBig: {
    zIndex: 5,
    position: 'fixed',
    right: 0,
    top: `${MainBarHeightHomePage}px`,
  },
  categoryBar: {
    height: `${CategoryBarHeight}px`, // 1px for borderBottom
    // boxShadow: BoxShadows.shadowWhite.boxShadow,
    backdropFilter: "blur(6px)",
    background: isThemeDark(theme)
      ? blurDark
      : blurLight,
    // background: isThemeDark(theme)
    //   ? Gradients.gradientUniswapDark.background
    //   : Gradients.gradientGrey2.background,
    // border: '0px solid',
    borderTop: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapDarkNavy}`
      : `1px solid ${Colors.slateGrey}`,
    borderBottom: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapDarkNavy}`
      : `1px solid ${Colors.slateGrey}`,
  },
  categoryBarMobile: {
    top: `${MobileNavbarHeight}px`, // 1px for borderBottom
    height: 30,
  },
  categoryBarShow: {
    display: "unset",
    opacity: 1,
    // transition: theme.transitions.create(['opacity'], {
    //   easing: theme.transitions.easing.easeIn,
    //   duration: '100ms',
    //   // delay: '100ms',
    // })
  },
  categoryBarHidden: {
    display: "none",
    opacity: 0,
    // transition: theme.transitions.create(['opacity'], {
    //   easing: theme.transitions.easing.easeIn,
    //   duration: '100ms',
    //   // delay: '100ms',
    // })
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
      color: isThemeDark(theme)
        ? Colors.purple
        : Colors.ultramarineBlueLight,
      borderBottom: '2px solid',
      transition: theme.transitions.create(['border', 'color'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
  categoryLinkTextMain: {
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.black,
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
      color: isThemeDark(theme)
        ? Colors.purple
        : Colors.ultramarineBlueLight,
      transition: theme.transitions.create(['border', 'color'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
  categoryLinkTextMainHeight: {
    height: `calc(${CategoryBarHeight}px)`,
  },
  categoryLinkTextMainHeightMobile: {
    height: CategoryBarHeightMobile,
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