import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import {
  Colors,
  Gradients,
  BoxShadows,
  BorderRadius2x,
  BorderRadius3x,
  BorderRadius4x,
  BorderRadius,
  isThemeDark,
} from "layout/AppTheme";
import {
  blurDark,
  blurLight,
} from "./constants";


/////////////// STYLES /////////////////////
export const MainBarHeightHomePage = 75;
export const MainBarHeight = 56;

export const CategoryBarHeight = 30;

export const NewsBarHeight = 8;
export const NavBarHeight = MainBarHeightHomePage + CategoryBarHeight;


/// hover colors for menu buttons
export const buttonHoverDark = fade(Colors.uniswapDarkNavy, 0.7)
export const buttonHoverLight = fade(Colors.cream, 0.2)



export const styles = (theme: Theme) => createStyles({
  baseBarHomePage: {
    zIndex: 5,
    background: 'transparent',
    height: `${MainBarHeightHomePage}px`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    position: 'fixed',
    padding: '0rem',
  },
  baseBarInnerHomePage: {
    height: `${MainBarHeight}px`,
    width: '100%',
    display: "flex",
    position: "relative",
    justifyContent: 'center',
    alignItems: "center",
  },
  baseBarPadding: {
    padding: '0.5rem',
    paddingTop: '1rem',
    top: 0,
  },
  baseBarPaddingMobile: {
    background: isThemeDark(theme)
      ? Gradients.gradientBlackDitherDown.background
      : Gradients.gradientBlackDitherDown.background,
    padding: '0rem',
    paddingTop: '0rem',
    top: 0,
  },
  baseBarPaddingNone: {
    padding: '0rem',
  },
  baseBarPaddingMobileNone: {
    padding: '0rem',
    paddingTop: '1rem',
  },

  baseBarDashboard: {
    zIndex: 5,
    position: 'fixed',
    top: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  baseBarInnerDashboard: {
    width: '100%',
    display: "flex",
    position: "relative",
    justifyContent: 'center',
    alignItems: "center",
    height: `${MainBarHeight}px`,
  },
  width100: {
    width: '100%',
  },
  menuButtonsContainer: {
    display: 'flex',
    position: 'relative',
    padding: '0.5rem',
  },
  blurBackground: {
    height: '100%',
    width: '100%',
    background: isThemeDark(theme)
      ? blurDark
      : blurLight,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapMediumNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius4x,
  },
  blurBackgroundTransparent: {
    position: "absolute",
    height: '100%',
    width: '100%',
    background: isThemeDark(theme)
      ? blurDark
      : blurLight,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapMediumNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    top: 0,
    right: 0,
    borderRadius: BorderRadius4x,
  },
  blurBackgroundWideTransparent: {
  },
  blurBackgroundWide: {
    width: '100%',
    // backdropFilter: "blur(6px)",
    background: isThemeDark(theme)
      ? blurDark
      : blurLight,
  },
  blurBackgroundMobile: {
    position: "absolute",
    height: '100%',
    width: '100%',
    // backdropFilter: "blur(6px)",
    background: isThemeDark(theme)
      ? blurDark
      : blurLight,
    top: 0,
    right: 0,
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
    minWidth: 72,
    "&:hover": {
      background: theme.palette.type === 'dark'
        ? buttonHoverDark
        : buttonHoverLight,
    },
    borderRadius: BorderRadius3x,
  },
  navbarButtonSelected: {
    color: Colors.secondaryBright,
  },
  iconText: {
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
    zIndex: 1,
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

  // News Bar
  newsBar: {
    background: theme.palette.type === 'dark'
      ? Gradients.gradientUniswapFluro.background
      : Gradients.gradientSlategrey.background,
      // : Gradients.gradientBlack.background,
    height: `${NewsBarHeight}px`,
    zIndex: 6,
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
    // pointerEvents: 'none',
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
    marginRight: "0.25rem",
    minWidth: 50,
    "&:hover": {
      background: isThemeDark(theme)
        ? buttonHoverDark
        : buttonHoverLight,
    },
  },
  baseBarInnerMobile: {
    // pointerEvents: "all",
    zIndex: 3,
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingTop: '0.25rem',
    width: '100vw',
    height: MainBarHeight,
    display: "flex",
    position: "relative",
    justifyContent: 'space-between',
    alignItems: "center",
  },
  logoMobile: {
    margin: '0rem 0.5rem',
    textTransform: "capitalize",
    fontWeight: 500,
    // transform: 'scale(0.9)',
    color: Colors.charcoal,
  },
});