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
export const buttonHoverLight = fade(Colors.slateGrey, 0.7)

export const logoBackgroundColorDark = Colors.uniswapBlack
export const logoBackgroundColorDark2 = Colors.uniswapDarkPurple
export const logoBackgroundColorDark3 = Colors.uniswapBlack

export const logoBackgroundColorLight = Colors.cream
export const logoBackgroundColorLight2 = Colors.slateGrey
export const logoBackgroundColorLight3 = Colors.cream


export const styles = (theme: Theme) => createStyles({
  baseBarHomePage: {
    zIndex: 5,
    background: 'transparent',
    // height: `${MainBarHeightHomePage}px`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    position: 'fixed',
    padding: '0rem',
    boxShadow: BoxShadows.shadow1.boxShadow,
    // on /start, /f/, /home pages, dashbar slides in and out on scroll
    transform: "translateY(0px)",
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.easeInOut,
      duration: '300ms',
    }),
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
  baseBarHidden: {
    padding: '0rem',
    transform: "translateY(-100px)",
    // display: 'none',
    // opacity: 0,
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.easeInOut,
      duration: '300ms',
    }),
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
    boxShadow: BoxShadows.shadow1.boxShadow,
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
  logoContainer: {
    height: '100%',
    display: 'flex',
    position: 'relative',
    paddingLeft: '1rem',
    backgroundColor: isThemeDark(theme)
      ? logoBackgroundColorDark3
      : logoBackgroundColorLight3,
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
      background: isThemeDark(theme)
        ? buttonHoverDark
        : buttonHoverLight,
    },
    borderRadius: BorderRadius3x,
    padding: 0,
    // height: '100%',
    height: 40,
  },
  navbarButtonLabel: {
    height: '100%',
  },
  navbarButtonSelected: {
    color: isThemeDark(theme)
      ? Colors.purple
      : Colors.ultramarineBlue,
  },
  notificationsIcon: {
    marginRight: "0.5rem",
    height: 40,
    "&:hover": {
      background: isThemeDark(theme)
        ? buttonHoverDark
        : buttonHoverLight,
    },
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
    color: isThemeDark(theme)
      ? Colors.purple
      : Colors.ultramarineBlue,
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
    paddingLeft: "1rem",
    paddingRight: "1rem",
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
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
    background: isThemeDark(theme)
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
    paddingRight: '0.5rem',
    paddingLeft: '0.5rem',
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
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});