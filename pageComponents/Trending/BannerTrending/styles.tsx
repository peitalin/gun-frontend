// styles
import { Theme, alpha, lighten } from "@mui/material/styles";
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius2x, fontFam, BorderRadius, isThemeDark } from "layout/AppTheme";


export const styles = (theme: Theme) => createStyles({
  rootDesktop: {
    padding: '1rem 1rem 0rem 1rem',
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
    maxWidth: 720,
    flexBasis: '45%',
  },
  bannerInnerBoxRightSm: {
    position: "absolute",
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: '2.5rem',
    width: '100%',
    maxWidth: 800,
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
      ? Colors.black
      : Colors.cream,
    lineHeight: '1.5rem',
  },
  mainTitleXs: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: isThemeDark(theme)
      ? Colors.black
      : Colors.cream,
    lineHeight: '1.5rem',
    fontSize: '1.5rem',
    // textShadow: '1px 1px 2px #444',
  },
  subline1: {
    color: isThemeDark(theme)
      ? Colors.black
      : Colors.cream,
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
    // backgroundColor: Colors.secondary,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkPurple
      : Colors.black,
    color: Colors.cream,
    width: '100%',
    maxWidth: 180,
    padding: 0,
    // borderRadius: BorderRadius,
    // border: `0px solid ${Colors.charcoal}`,
    transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
      easing: theme.transitions.easing.easeIn,
      duration: '200ms',
    }),
    "&:hover": {
      color: Colors.cream,
      backgroundColor: isThemeDark(theme)
        ? lighten(Colors.uniswapDarkPurple, 0.05)
        : lighten(Colors.black, 0.05),
      transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
        easing: theme.transitions.easing.easeIn,
        duration: '200ms',
      })
    },
  },
  minWidth160: {
    minWidth: 160,
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
  buttonLabelDesktop: {
    fontSize: '1rem',
    height: '100%',
  },
  buttonLabel: {
    fontSize: '0.9rem',
  },

  buttonBox: {
    marginTop: '1rem',
    maxWidth: 180,
  },
})