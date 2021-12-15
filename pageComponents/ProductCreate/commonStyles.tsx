import { createStyles, Theme, alpha, lighten } from "@material-ui/core/styles";
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
import { buttonWidthClassified } from "./ProductCreatePage/constants"


export const styles = (theme: Theme) => createStyles({
  sectionBorder: {
    // border: `1px solid ${Colors.mediumLightGrey}`,
    borderRadius: BorderRadius2x,
    padding: '2rem',
    marginBottom: '1rem',
    background: Colors.uniswapDarkNavy,
    boxShadow: BoxShadows.shadow4.boxShadow,
  },
  marginBottom1: {
    marginBottom: "1rem",
  },
  formContainer: {
    position: 'relative',
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
  flexCol: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'column',
    marginRight: '0.75rem',
  },
  flexStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  positionRelative: {
    position: 'relative',
  },
  // SelectTags
  optionalText: {
    color: Colors.mediumGrey,
    fontWeight: 500,
    fontSize: '0.9rem',
  },
  // SelectTags
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
  accordionButtonsBox: {
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
    // backgroundImage: Gradients.gradientUniswapBlue.background,
    backgroundColor: Gradients.gradientUniswapBlue.color1,
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
      // backgroundImage: Gradients.gradientUniswapBlue2.background,
      backgroundColor: Gradients.gradientUniswapBlue.color2,
      transition: theme.transitions.create(['color', 'border', 'background'], {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
      // backgroundPosition: '-75px',
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
      boxShadow: `${alpha(Colors.blue, 0.2)} 0 0 0 2px`,
      borderColor: Colors.blue,
      color: Colors.blue,
    },
  },
  expansionPanelError: {
    border: `1px solid ${Colors.lightRed}`,
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
  titleDim: {
    color: Colors.darkGrey,
  },
  // Listing Type: Escrow PayoutMethod Modal
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    borderRadius: BorderRadius2x,
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
  descriptionRoot: {
    marginBottom: '1rem',
  },
  validationContainer: {
    position: 'relative',
    width: '100%',
    marginTop: '0.5rem',
  },
  caliberDropdown: {
    flexGrow: 1,
    minWidth: 200,
    // marginRight: '1rem',
    // marginLeft: '1rem',
    paddingBottom: '1rem',
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
    lineHeight: '1.125rem',
    marginTop: '0.25rem',
  },
  licenseButtonCategory: {
    fontWeight: 400,
    fontSize: '0.8rem',
    lineHeight: '1.125rem',
    marginBottom: '0.25rem',
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontWeight: 600,
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
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
  listingTypeButtonLabel: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
  },
  listingLabelTop: {
    marginBottom: '-0.25rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyLightestBlack
  },
  listingLabelBottom: {
    marginTop: '-0.25rem',
    fontSize: '0.7rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyDarkest
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
    maxWidth: buttonWidthClassified,
    fontSize: '0.9rem',
    height: 54,
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyBlack,
    lineHeight: '1.125rem',
    marginBottom: "-0.5rem",
    transition: theme.transitions.create(['color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: "200ms",
    }),
  },
})



