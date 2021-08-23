import { createStyles, Theme, fade, lighten } from "@material-ui/core/styles";
import {
  fontFam,
  Colors,
  BorderRadius,
  BorderRadius2x,
  BorderRadius4x,
  BoxShadows,
  Gradients,
  isThemeDark
} from "layout/AppTheme";


export const styles = (theme: Theme) => createStyles({
  topButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  maxWidth: {
    maxWidth: 540,
    width: '100%',
  },
  marginSm: {
    marginLeft: '1rem',
  },
  modalMargin: {
    margin: '0rem',
    paddingTop: '3rem',
    paddingBottom: '3rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
  sectionBorder: {
    // border: `1px solid ${Colors.mediumLightGrey}`,
    borderRadius: BorderRadius2x,
    padding: '2rem',
    marginBottom: '1rem',
    background: Colors.uniswapDarkNavy,
    boxShadow: BoxShadows.shadow4.boxShadow,
  },
  // sectionBorderSm: {
  //   borderRadius: '0px',
  //   padding: '1rem',
  //   marginBottom: '0rem',
  //   background: Colors.uniswapDarkNavy,
  //   // boxShadow: BoxShadows.shadow4.boxShadow,
  //   borderBottom: `1px solid ${Colors.uniswapNavy}`,
  // },
  padding1: {
    padding: '1rem',
  },
  padding2: {
    padding: '2rem',
  },
  titleBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  titleBoxSm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: '0rem 1rem'
  },
  title: {
    lineHeight: '1.5rem',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontWeight: 400,
    fontSize: '0.9rem',
    lineHeight: '1rem',
    color: Colors.grey,
  },
  orderTitle: {
    marginBottom: '1rem',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  marginBottom1: {
    marginBottom: "1rem",
  },
  formContainer: {
    position: 'relative',
  },
  container: {
    marginBottom: "0.5rem",
  },
  selecTagsRoot: {
    marginTop: '2rem',
    // marginBottom: '1rem',
  },
  tagsTitle: {
    marginBottom: '0.5rem',
  },
  formGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: "center",
  },
  dense: {
    marginTop: 0,
  },
  imageContainer: {
    width: "50%",
    height: "50%",
  },
  menu: {
    width: 200,
  },
  discountContainer: {
    marginTop: '0.5rem',
    marginRight: '0.5rem',
  },
  textField: {
    width: "100%",
    paddingBottom: '1rem',
    "&:focus-within": {
      // color: '#24A4FF',
      color: Colors.charcoal,
    },
  },
  textFieldAdorned: {
    width: "100%",
    height: 45,
    "&:focus-within": {
      color: Colors.charcoal,
    },
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  flexCol: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  flexCol50: {
    flexBasis: '40%',
    flexGrow: 1,
    margin: '0.5rem',
  },
  flexEnd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  flexItem: {
    flexGrow: 1,
    flexBasis: '20%',
  },
  variantCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionValues: {
    flexBasis: '100%',
    marginRight: '0rem',
    fontFamily: '"Segoe UI","Helvetica Neue",Arial,sans-serif',
    marginTop: '0.5rem',
  },
  errorMessage: {
    position: 'absolute',
    bottom: 0,
    right: '0.25rem',
    fontSize: '0.8rem',
    color: `${fade(theme.palette.error.light, 0.6)}`,
    fontFamily: fontFam,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  positionRelative: {
    position: 'relative',
  },

  // Buttons
  flexButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: '100%',
  },
  flexButtonSpacer: {
    marginBottom: '1rem',
    justifyContent: 'center',
    flexGrow: 1,
    flexBasis: '5%',
  },
  formIncomplete: {
    color: "#ccc",
    textAlign: "center",
    marginTop: '0.25rem',
  },
  policyBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: '100%',
  },
  policy: {
    width: 'calc(100% - 2rem)',
    maxWidth: 350,
    fontWeight: 400,
    marginBottom: '1rem',
    color: Colors.grey,
    lineHeight: '1rem',
    textAlign: 'center',
  },
  greyedOut: {
    color: Colors.grey,
    opacity: 0.6,
  },
  optionalText: {
    color: Colors.mediumGrey,
    fontWeight: 500,
    fontSize: '0.9rem',
  },
  tagsTip: {
    color: Colors.uniswapLighterGrey,
    marginTop: '0.25rem',
    fontSize: '0.7rem',
    fontWeight: 400,
    lineHeight: '0.9rem',
  },
  link: {
    color: Colors.blue,
    cursor: 'pointer',
    "&:hover": {
      color: Colors.lightBlue,
    },
  },
  // Categories
  categoryButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    // display: 'flex',
    // flexDirection: 'column',
    padding: '0px',
  },
  buttonRoot: {
    margin: '0.1rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLighterGrey}`
      : `1px solid ${Colors.slateGreyBlack}`,
    borderRadius: '2rem',
    flexGrow: 1,
    "&:hover": {
      "& > span": {
        color: Colors.gradientUniswapBlue1,
      },
      transition: theme.transitions.create(['color', 'border', 'background'], {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
    }
  },
  buttonSelected: {
    backgroundImage: Gradients.gradientUniswapBlue.background,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLighterGrey}`
      : `1px solid ${Colors.slateGreyBlack}`,
    fontSize: '0.7rem',
    color: Colors.cream,
    "& > span": {
      color: Colors.cream,
    },
    "&:hover": {
      "& > span": {
        color: Colors.cream,
      },
      backgroundImage: Gradients.gradientUniswapBlue2.background,
      transition: theme.transitions.create(['color', 'border', 'background'], {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
      backgroundPosition: '-75px',
    }
  },
  marginTop05: {
    marginTop: '0.5rem',
  },
  expansionPanelRoot: {
    width: '100%',
    padding: '0rem',
    marginLeft: '0rem',
    marginBottom: '0.5rem',
    // border: `1px solid ${Colors.lightGrey}`,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    // overrides .MuiAccordion-rounded:first-child
    // border radius
    borderRadius: `${BorderRadius}px !important`,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    transition: theme.transitions.create('border', {
      duration: "1200ms",
    }),
  },
  expansionPanelExpanded: {
    border: `1px solid ${Colors.blue}`,
    transition: theme.transitions.create('border', {
      duration: "0ms",
    }),
    '&:focus': {
      boxShadow: `${fade(Colors.blue, 0.2)} 0 0 0 2px`,
      borderColor: Colors.blue,
      color: Colors.blue,
    },
  },
  expansionPanelError: {
    border: `1px solid ${Colors.fadedRed}`,
  },
  expanderRoot: {
  },
  expandIcon: {
    marginRight: '-6px', // prevent icon shifting when expanding
  },
  expanderExpanded: {
    margin: 0,
    minHeight: '1rem',
    marginRight: '-3px', // prevent icon shifting when expanding
  },
  expanderContent: {
    minHeight: '1rem',
    margin: 0,
  },
  selectedCategoryClosed: {
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightGrey // to match uniswapLightestGrey with placeholder dim
      : Colors.uniswapMediumGrey,
    fontSize: '1rem',
    fontWeight: 400,
    transition: theme.transitions.create('color', {
      duration: "2000ms",
    }),
  },
  selectedCategoryOpen: {
    color: Colors.secondary,
    fontSize: '1rem',
    fontWeight: 400,
    transition: theme.transitions.create('color', {
      duration: "200ms",
    }),
  },
  selectedCategoryEmpty: {
    // color: Colors.uniswapLighterGrey,
    color: theme.palette.type === 'dark'
      ? Colors.uniswapMediumGrey // to match uniswapLightestGrey with placeholder dim
      : Colors.darkerGrey,
    // in TextInputa.input class
    fontSize: '1rem',
    fontWeight: 400,
  },
  uploaderSwitcherTitle: {
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  titleDim: {
    color: Colors.darkGrey,
  },
  // Product Preview Page Modal
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    maxHeight: "calc(100% - 4rem)",
    width: '100%',
    margin: 0,
  },
  fullMaxHeight: {
    maxHeight: "100%",
    width: '100%',
  },
  iconButton: {
    background: Colors.darkGrey,
    "&:hover": {
      background: Colors.blue,
    },
    color: Colors.lightGrey,
    padding: 2, // determines button size
  },
  previewIconButton: {
    position: "fixed",
    right: '1rem',
    top: '1rem',
    zIndex: 1502,
  },
  svgIcon: {
    fill: "#eaeaea",
    width: '2rem',
    height: '2rem',
    "&:hover": {
      fill: "#fafafa",
    },
  },
  descriptionRoot: {
    marginBottom: '1rem',
  },
  validationContainer: {
    position: 'relative',
    width: '100%',
    marginTop: '0.5rem',
  },
  dealerDropdown: {
    flexGrow: 1,
    minWidth: 200,
    // marginRight: '1rem',
    // marginLeft: '1rem',
    marginBottom: '0.5rem',
  },
  caliberDropdown: {
    flexGrow: 1,
    minWidth: 200,
    // marginRight: '1rem',
    // marginLeft: '1rem',
    paddingBottom: '1rem',
  },
  dontSeeDealerLink: {
    color: Colors.uniswapLighterGrey,
    textAlign: "center",
    width: "100%",
    marginTop: "1rem",
    "&:hover": {
      cursor: "pointer",
      color: Colors.gradientUniswapBlue1,
    }
  },
  marginTop1: {
    marginTop: '1rem',
    width: "100%",
  },
  marginTop2: {
    marginTop: '2rem',
    width: "100%",
  },
  printFormikValues: {
    color: Colors.cream,
    "&:hover": {
      cursor: "pointer",
      color: Colors.gradientUniswapBlue1,
    }
  },
  width100: {
    width: '100%',
  },
  licenseButtonNumber: {
    fontWeight: 600,
  },
  licenseButtonCategory: {
    fontWeight: 500,
  },
  stepperSectionText: {
    marginBottom: '1rem',
    color: isThemeDark(theme)
    ? Colors.uniswapMediumGrey
    : Colors.slateGreyLightBlack,
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: "0.5rem",
  },
  mmOrInchesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mmOrInchesText: {
    fontSize: '0.8rem',
    fontWeight: 500,
  },
  mmOrInchesTextHighlight: {
    color: Colors.ultramarineBlue,
  },
  listingTypeContainer: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  listingSpacing: {
    width: '1rem',
  },
  listingTypeButton: {
    flexBasis: 'calc(50% - 0.5rem)',
    maxWidth: 166,
    padding: '0.25rem',
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontWeight: 600,
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightestBlack,
    borderRadius: BorderRadius,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapLightNavy
      : Colors.slateGrey,
    boxShadow: BoxShadows.shadow1.boxShadow,
    transition: theme.transitions.create(['background-color', 'border', 'color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: "200ms",
    }),
    "&:hover": {
      cursor: "pointer",
      backgroundColor: isThemeDark(theme)
        ? Colors.uniswapNavy
        : Colors.slateGreyDark,
    },
    border: isThemeDark(theme)
      ? `2px solid transparent`
      : `2px solid transparent`,
  },
  listingTypeButtonSelected: {
    transition: theme.transitions.create(['background-color', 'border', 'color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: "200ms",
    }),
    boxShadow: BoxShadows.shadow1.boxShadow,
    color: isThemeDark(theme)
      ? Colors.purple
      : Colors.purple,
    border: isThemeDark(theme)
      ? `2px solid ${Colors.purple}`
      : `2px solid ${Colors.purple}`,
  },
  listingTypeButtonDisabled: {
    transition: theme.transitions.create(['background-color', 'border', 'color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: "200ms",
    }),
    boxShadow: BoxShadows.shadow1.boxShadow,
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyDarkest,
    border: isThemeDark(theme)
      ? `2px solid transparent`
      : `2px solid transparent`,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapLightNavy
      : Colors.slateGrey,
    "&:hover": {
      cursor: "unset",
      backgroundColor: isThemeDark(theme)
        ? Colors.uniswapLightNavy
        : Colors.slateGrey,
    },
  },
  textListing: {
    maxWidth: 350,
    fontSize: '0.9rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyBlack,
    lineHeight: '1.125rem',
    marginBottom: "0.5rem",
    transition: theme.transitions.create(['color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: "200ms",
    }),
  },
  testModeBorder: {
    // border: `1px solid ${Colors.purple}`,
    backgroundColor: Colors.lightYellow,
    width: '100%',
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: BorderRadius2x,
  },
})














