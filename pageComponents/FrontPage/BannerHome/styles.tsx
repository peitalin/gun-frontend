// styles
import { createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, Gradients, fontFam } from "layout/AppTheme";



export const styles = (theme: Theme) => createStyles({
  root: {
    // backgroundColor: "#fefefe",
    width: "100%",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
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
    color: Colors.lightestGrey,
    lineHeight: '3rem',
    fontSize: '2.5rem',
  },
  mainTitleSm: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: Colors.lightestGrey,
    lineHeight: '2rem',
    fontSize: '1.75rem',
    marginBottom: "0.25rem",
    textAlign: "center",
  },
  mainTitleMd: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: Colors.lightestGrey,
    lineHeight: '1.5rem',
    fontSize: '2rem',
    marginBottom: "0.25rem",
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
    color: Colors.lightGrey,
    fontFamily: fontFam,
    lineHeight: "1.5",
    fontWeight: 500,
    fontSize: '1.5rem', // 20px
  },
  subline1Sm: {
    color: Colors.lightGrey,
    fontFamily: fontFam,
    lineHeight: "1.5",
    fontWeight: 500,
    fontSize: '1.125rem', // 20px
    textAlign: "center",
  },
  subline2: {
    color: Colors.grey,
    fontWeight: 400,
  },
  subline3: {
    color: Colors.grey,
    fontWeight: 500,
  },
  buttonsFlexRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: '1rem',
  },
  buttonBecomeASeller: {
    backgroundImage: theme.palette.type === 'dark'
      ? Gradients.gradientUniswapFluro.background
      : Gradients.gradientUniswapBlueGreen.background,
    // border: theme.palette.type === 'dark'
    //   ? `1px solid ${Colors.gradientUniswapFluro1}`
    //   : `1px solid ${Colors.gradientUniswapBlue1}`,
    color: Colors.cream,
    minWidth: '150px',
    "&:hover": {
      backgroundImage: theme.palette.type === 'dark'
        ? Gradients.gradientUniswapFluro2.background
        : Gradients.gradientUniswapBlueGreen2.background,
      // border: theme.palette.type === 'dark'
      //   ? `1px solid ${Colors.gradientUniswapFluro2}`
      //   : `1px solid ${Colors.gradientUniswapBlueGreen}`,
      transition: theme.transitions.create(['color', 'border', 'background'], {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
      backgroundPosition: '75px',
    }
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
})





