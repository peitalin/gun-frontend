// styles
import { createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, Gradients, fontFam, isThemeDark, BorderRadius2x, BoxShadows } from "layout/AppTheme";



export const styles = (theme: Theme) => createStyles({
  root: {
    // backgroundColor: "#fefefe",
    width: "100%",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: '1rem',
    marginTop: "8rem",
    marginBottom: '2rem',
    height: '5rem', // so search expansion doesnt move title heading
  },
  mainTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
    width: '100%',
    position: "relative",
  },
  mainTitle: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: isThemeDark(theme)
      ? Colors.cream
      : Colors.black,
    lineHeight: '3rem',
    fontSize: '2.5rem',
  },
  mainTitleSm: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: isThemeDark(theme)
      ? Colors.cream
      : Colors.black,
    lineHeight: '2rem',
    fontSize: '1.75rem',
    marginBottom: "0.25rem",
    textAlign: "center",
  },
  subline1: {
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLighterBlack,
    fontFamily: fontFam,
    lineHeight: "1.5",
    fontWeight: 500,
    fontSize: '1.5rem', // 20px
  },
  subline1Sm: {
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLighterBlack,
    fontFamily: fontFam,
    lineHeight: "1.5",
    fontWeight: 500,
    fontSize: '1.125rem', // 20px
    textAlign: "center",
  },
  buttonsFlexRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: '1rem',
  },
  buttonBecomeASeller: {
    backgroundImage: Gradients.gradientUniswapFluro.background,
    color: Colors.cream,
    minWidth: '150px',
    backgroundPosition: '0px',
    transition: theme.transitions.create(['border', 'box-shadow'], {
      easing: theme.transitions.easing.easeInOut,
      duration: "200ms",
    }),
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapDarkNavy}`
      : `1px solid ${Colors.slateGreyDark}`,
    "&:hover": {
      transition: theme.transitions.create(['border', 'box-shadow'], {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
      border: `1px solid ${Colors.black}`,
      boxShadow: isThemeDark(theme)
        ? BoxShadows.shadowWhite.boxShadow
        : BoxShadows.shadow1.boxShadow,
    },
  },
  minWidth160: {
    minWidth: 160,
  },
  minWidth184: {
    minWidth: 184,
  },
  buttonHeightMobile: {
    height: 44,
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
  bannerInnerBoxRight: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    // height: '100%',
    // maxWidth: 480,
    // flexBasis: '60%',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0rem',
    left: '0rem',
    // filter: 'blur(1.5px)',
    // bottom: 0,
    // right: 0,
  },
  flexRiflesRow: {
    flexBasis: '50%',
    flexGrow: 1,
    flexWrap: 'wrap',
    transition: theme.transitions.create(['filter'], {
      easing: theme.transitions.easing.easeInOut,
      duration: "400ms",
    }),
    // filter: "blur(1px)",
  },
  backgroundBlur: {
    filter: "blur(6px)",
    transition: theme.transitions.create(['filter'], {
      easing: theme.transitions.easing.easeInOut,
      duration: "400ms",
    }),
  },
  flexRiflesCol: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    width: '100%',
  },
})





