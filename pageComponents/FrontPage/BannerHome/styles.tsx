// styles
import { createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, Gradients } from "layout/AppTheme";


const fontFam = 'Helvetica Neue, Arial';

export const styles = (theme: Theme) => createStyles({
  root: {
    // backgroundColor: "#fefefe",
    width: "100%",
  },
  mainTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  mainTitle: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: Colors.lightestGrey,
    lineHeight: '1.5rem',
    fontSize: '2.5rem',
  },
  mainTitleSm: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: Colors.lightestGrey,
    lineHeight: '1.2rem',
    fontSize: '1.5rem',
  },
  mainTitleMd: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: Colors.lightestGrey,
    lineHeight: '1.2rem',
    fontSize: '2rem',
  },
  mainTitleHighlight: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: Colors.secondary,
  },
  downloadIcon: {
    fill: Colors.foregroundColor,
    height: '1.5rem',
    marginRight: '0.5rem',
    width: '1.5rem',
  },
  downloadIconXs: {
    fill: Colors.foregroundColor,
    height: '1.2rem',
    marginRight: '0.5rem',
    width: '1.2rem',
  },
  subTitle: {
    marginTop: "0.25rem",
    fontSize: '0.9rem',
  },
  subline1: {
    color: Colors.lightGrey,
    fontFamily: fontFam,
    lineHeight: "1.25",
    fontWeight: 500,
    fontSize: '1.375rem', // 20px
  },
  subline1Sm: {
    color: Colors.lightGrey,
    fontFamily: fontFam,
    lineHeight: "1.25",
    fontWeight: 500,
    fontSize: '1rem', // 20px
  },
  subline1Md: {
    color: Colors.lightGrey,
    fontFamily: fontFam,
    lineHeight: "1.25",
    fontWeight: 500,
    fontSize: '1.25rem',
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
    color: Colors.cream,
    backgroundColor: Colors.secondary,
    border: `1px solid ${Colors.secondaryBright}`,
    transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
      easing: theme.transitions.easing.easeIn,
      duration: '100ms',
    }),
    "&:hover": {
      backgroundColor: Colors.secondaryBright,
      border: `1px solid ${Colors.secondaryBright}`,
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
    marginRight: '0.5rem',
    backgroundImage: Gradients.gradientUniswapFluro.background,
    border: `1px solid ${Colors.gradientUniswapFluro2}`,
    color: Colors.cream,
    minWidth: '150px',
    "&:hover": {
      backgroundImage: Gradients.gradientUniswapFluro2.background,
      border: `1px solid ${Colors.gradientUniswapFluro1}`,
      transition: theme.transitions.create(['color', 'border', 'background'], {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
      backgroundPosition: '75px',
    }
  },
  buttonBrowseCategories: {
    backgroundImage: Gradients.gradientUniswapBlueGreen.background,
    border: `1px solid ${Colors.gradientUniswapBlue1}`,
    fontSize: '0.7rem',
    color: Colors.cream,
    minWidth: "150px",
    "&:hover": {
      backgroundImage: Gradients.gradientUniswapBlueGreen2.background,
      border: `1px solid ${Colors.gradientUniswapGreen}`,
      transition: theme.transitions.create(['color', 'border', 'background'], {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
      backgroundPosition: '-75px',
    }
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

  /// Email form
  emailForm: {
  },
  emailInputBox: {
    transitionDuration: "0.15s",
    width: "100%",
    padding: "1rem",
    borderWidth: "1px",
    borderRadius: "0.25rem",
  },
  emailFormInput: {
    width: "100%",
    lineHeight: "1.375rem",
    fontSize: "1.125rem",
    textOverflow: "ellipsis",
  },
  emailButton: {
    marginTop: "1rem",
    width: "100%",
    paddingLeft: '2.5rem',
    paddingRight: '2.5rem',
    backgroundColor: "rgba(244,219,216,0.1)",
    borderColor: "rgba(244,219,216,0.1)",
    fontWeight: 600,
    padding: '.5rem 1.5rem',
    lineHeight: '1.75rem',
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    padding: '1rem',
    marginTop: "4rem",
    marginBottom: '4rem',
  },
})





