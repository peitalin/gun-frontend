// styles
import { Theme, alpha, lighten } from "@mui/material/styles";
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius2x, fontFam } from "layout/AppTheme";


export const styles = (theme: Theme) => createStyles({
  root: {
    // backgroundColor: "#fefefe",
  },
  bannerInnerBoxLeft: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    flexGrow: 0.4,
    paddingRight: '1rem',
  },
  bannerInnerBoxLeftSm: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    // flexGrow: 1,
    flexBasis: '60%',
  },
  bannerInnerBoxRight: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    // height: '100%',
    maxWidth: 500,
    flexBasis: '60%',
  },
  bannerInnerBoxRightSm: {
    position: "absolute",
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: '0.5rem',
    width: '100%',
    maxWidth: 600,
    flexBasis: '40%',
    // transform: 'translateY(10%)',
    paddingTop: '2rem',
    paddingBottom: '1rem',
    padding: '0.75rem',
    zIndex: 2,
  },
  bannerInnerBoxRightBlur: {
    // backdropFilter: 'blur(1px)',
    padding: '0rem',
  },
  minWidth440: {
    minWidth: 440,
  },
  minWidth400: {
    minWidth: 400,
  },
  minWidth360: {
    minWidth: 360,
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.75rem',
    lineHeight: '2rem',
  },
  mainTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  },
  mainTitle: {
    fontSize: '2.9rem',
    fontWeight: 800,
    // fontFamily: fontFam,
    color: Colors.black,
    // marginBottom: '1.5rem',
    lineHeight: '3.5rem',
    maxWidth: 500,
  },
  mainTitleXs: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: Colors.cream,
    lineHeight: '2.25rem',
    fontSize: '1.75rem',
    textAlign: "center",
    marginBottom: '0.5rem',
    // textShadow: '1px 1px 2px #444',
  },
  mainTitleHighlight: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: Colors.secondary,
  },
  downloadIcon: {
    // fill: Colors.foregroundColor,
    // height: '1.5rem',
    // marginRight: '0.5rem',
    // width: '1.5rem',
  },
  downloadIconXs: {
    // fill: Colors.foregroundColor,
    // height: '1.2rem',
    // marginRight: '0.5rem',
    // width: '1.2rem',
    width: 'calc(100vw - 3rem)',
  },
  subTitle: {
    marginTop: "0.25rem",
    fontSize: '0.9rem',
  },
  subline1: {
    color: Colors.black,
    fontFamily: fontFam,
    lineHeight: "1.4",
    fontWeight: 500,
    fontSize: '18px', // 20px
    whitespace: 'pre-line',
    maxWidth: 480,
  },
  subline1Xs: {
    color: Colors.cream,
    fontFamily: fontFam,
    lineHeight: "1.5",
    // fontWeight: 500,
    fontSize: '1rem',
    fontWeight: 500,
    // textAlign: "start",
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
    border: `1px solid ${alpha(Colors.slateGreyLightBlack, 0.8)}`,
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
    // marginTop: '-16rem',
    marginTop: '18rem',
    // marginLeft: '6rem',
    // transform: "translateY(-45%)",
  },
  searchContainer: {
    marginTop: '2rem',
  },
  storeOrLoginClass: {
    justifyContent: 'flex-start',
  },
  storeOrLoginClassButtonRoot: {
    width: '220px',
    height: 50,
  },
  storeOrLoginClassButtonLabel: {
    fontSize: '1.125rem',
    fontWeight: 700,
  },
})