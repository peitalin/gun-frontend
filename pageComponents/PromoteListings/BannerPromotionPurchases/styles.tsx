// styles
import { Theme } from "@mui/material/styles";
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius2x, isThemeDark } from "layout/AppTheme";

const fontFam = 'Helvetica Neue, Arial';

export const styles = (theme: Theme) => createStyles({
  root: {
    // backgroundColor: "#fefefe",
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
  bannerInnerBoxRightBlur: {
    padding: '0rem',
  },
  minWidth400: {
    minWidth: 400,
  },
  minWidth300: {
    minWidth: 300,
  },
  minWidth280: {
    minWidth: 280,
  },
  maxWidth600: {
    maxWidth: 600,
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
    fontSize: '2rem',
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
    lineHeight: '1.5rem',
    fontSize: '1.5rem',
    // textShadow: '1px 1px 2px #444',
  },
  mainTitleHighlight: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: Colors.secondary,
  },
  subTitle: {
    marginTop: "0.25rem",
    fontSize: '0.9rem',
  },
  subline1: {
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
    fontFamily: fontFam,
    lineHeight: "1.5",
    fontWeight: 500,
    fontSize: '18px', // 20px
    whitespace: 'pre-line',
    maxWidth: 480,
  },
  subline1Xs: {
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
    fontFamily: fontFam,
    lineHeight: "1.5",
    // fontWeight: 500,
    fontSize: '0.9rem', // 20px
    textAlign: "start",
  },
  productSectionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  buttonsContainer: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonsFlexRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: '1.2rem',
    position: 'absolute',
    top: 0,
  },
  buttonCreateAccount: {
    marginRight: '0.5rem',
    backgroundColor: Colors.cream,
    color: Colors.charcoal,
    // border: `1px solid ${Colors.secondaryBright}`,
    transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
      easing: theme.transitions.easing.easeIn,
      duration: '100ms',
    }),
    "&:hover": {
      backgroundColor: Colors.white,
      color: Colors.secondary,
      transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
  buttonPlaceholder: {
    opacity: 0,
  },
  buttonBecomeASeller: {
    backgroundColor: Colors.secondary,
    color: Colors.cream,
    width: '100%',
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
  buttonBrowseCategories: {
    backgroundColor: Colors.cream,
    color: Colors.charcoal,
    width: '100%',
    marginRight: '0.5rem',
    border: `1px solid ${Colors.slateGreyDarker}`,
    transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
      easing: theme.transitions.easing.easeIn,
      duration: '100ms',
    }),
    "&:hover": {
      backgroundColor: Colors.white,
      color: Colors.secondary,
      border: `1px solid ${Colors.lightGrey}`,
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
  mobileButtons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '1rem',
    position: 'absolute',
    top: 0,
  },
  buttonRoot: {
  },
  buttonLabel: {
    fontSize: '0.9rem',
  },
  saveAlt: {
  },
  categoryImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: 'center',
    borderRadius: BorderRadius2x,
    width: '100%',
    height: '100%',
    // maxWidth: 400,
    minWidth: 400,
  },
  categoryImageMd: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: 'center',
    borderRadius: BorderRadius2x,
    width: '100%',
    height: 300,
    transform: "translateY(-30%)",
  },
})