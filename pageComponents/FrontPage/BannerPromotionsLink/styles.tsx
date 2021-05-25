// styles
import { createStyles, Theme, fade, lighten } from "@material-ui/core/styles";
import { Colors, BorderRadius2x, fontFam, BorderRadius, isThemeDark } from "layout/AppTheme";


export const styles = (theme: Theme) => createStyles({
  rootDesktop: {
    padding: '0rem 1rem',
  },
  rootMobile: {
    padding: '0rem 0rem',
  },
  bannerInnerBoxLeft: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    flexGrow: 1,
    paddingRight: '1rem',
  },
  bannerInnerBoxLeftSm: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    flexGrow: 1,
    flexBasis: '60%',
  },
  bannerInnerBoxRight: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    maxWidth: 600,
    flexBasis: '45%',
  },
  bannerInnerBoxRightSm: {
    position: "absolute",
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: '2.5rem',
    width: '100%',
    maxWidth: 600,
    flexBasis: '45%',
    // transform: 'translateY(20%)',
    padding: '1rem',
  },
  bannerInnerBoxRightMobile: {
    padding: '0rem',
  },
  minWidth300: {
    minWidth: 300,
  },
  mainTitleContainerMobile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: '1rem',
  },
  mainTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  mainTitle: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.black,
    lineHeight: '1.5rem',
  },
  mainTitleXs: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.black,
    lineHeight: '1.2rem',
    fontSize: '1.5rem',
    // textShadow: '1px 1px 2px #444',
  },
  subline1: {
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
    fontFamily: fontFam,
    lineHeight: "1.5",
    fontWeight: 500,
    fontSize: '18px',
    maxWidth: 480,
  },
  buttonGoToPromotions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    color: Colors.cream,
    width: '100%',
    maxWidth: 180,
    // borderRadius: BorderRadius,
    // border: `0px solid ${Colors.charcoal}`,
    transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
      easing: theme.transitions.easing.easeIn,
      duration: '100ms',
    }),
    "&:hover": {
      color: Colors.cream,
      // border: `1px solid ${Colors.secondaryBright}`,
      backgroundColor: Colors.secondaryBright,
      transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
  minWidth160: {
    minWidth: 160,
  },
  minWidth184: {
    minWidth: 184,
  },
  width100: {
    width: '100%',
  },
  buttonHeightMobile: {
    height: 40,
  },
  buttonHeightDesktop: {
    height: 44,
  },
  buttonFontSizeDesktop: {
    fontSize: '1rem',
  },
  buttonRoot: {
  },
  buttonLabel: {
    fontSize: '0.9rem',
  },

  buttonBox: {
    marginTop: '1rem',
    maxWidth: 200,
  },
})