import { createStyles, Theme, fade } from "@material-ui/core/styles";
import {
  fontFam,
  Colors,
  BorderRadius,
  BorderRadius2x,
  BoxShadows,
  Gradients
} from "layout/AppTheme";


export const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    minHeight: 'calc(100vh - 32px)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  productColumn60: {
    flexBasis: '66%',
    flexGrow: 1,
    minWidth: 360,
  },
  productColumn40: {
    // flexBasis: '40%',
    flexGrow: 1,
    minWidth: 280,
  },
  coverGrey: {
    height: '100%',
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1,
    backgroundColor: "#222",
    borderRadius: BorderRadius,
  },
  disableForm: {
    opacity: 0.5
  },
  topButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  maxWidth: {
    maxWidth: 600,
    width: '100%',
  },
  pageMargin: {
    margin: '0rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  pageMarginSm: {
    margin: '0rem',
    paddingTop: '0rem',
    paddingBottom: '2rem',
    paddingLeft: '0rem',
    paddingRight: '0rem',
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
  formOuterContainer: {
    // background: "transparent",
    // border: `1px solid ${Colors.lightGrey}`,
    borderRadius: BorderRadius2x,
    // padding: '2rem',
    position: 'relative', // needed for coverGrey, position: absolute
  },
  formOuterContainerSm: {
    // background: "transparent",
    borderRadius: BorderRadius2x,
    padding: '1rem 0rem 1rem 0rem',
    position: 'relative', // needed for coverGrey, position: absolute
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
  button: {
    margin: 0,
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
  flexRowCenter: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: "wrap",
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
    width: 'calc(100% - 2rem)',
  },
  flexButtonItem: {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexGrow: 1,
    flexBasis: '30%',
    maxWidth: '150px',
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
    marginTop: '2rem',
    width: '100%',
  },
  policy: {
    width: 'calc(100% - 2rem)',
    fontWeight: 400,
    marginBottom: '1rem',
    color: Colors.grey,
    lineHeight: '1rem',
    textAlign: 'center',
  },
  createProductButtonContainer: {
    display: "flex",
    flexDirection: "column",
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
    width: '100%'
  },
  buttonRoot: {
    margin: '0.1rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.charcoal,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLighterGrey}`
      : `1px solid ${Colors.charcoal}`,
    borderRadius: '2rem',
    flexGrow: 1,
    "&:hover": {
      "& > span": {
        color: Colors.gradientUniswapBlue1,
      },
      border: `1px solid ${Colors.gradientUniswapBlue1}`,
      transition: theme.transitions.create(['color', 'border', 'background'], {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
    }
  },
  buttonSelected: {
    backgroundImage: Gradients.gradientUniswapBlue.background,
    border: `1px solid ${Colors.gradientUniswapBlue1}`,
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
      border: `1px solid ${Colors.gradientUniswapFluro2}`,
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
  stickyProductPreviewContainer: {
    position: 'sticky',
    top: '4rem',
    marginBottom: '1rem',
    marginLeft: '1rem',
    cursor: "pointer",
    // from SellingTips to product card preview
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
  },
  // Product Preview Page Modal
  modalBackdrop: {
    backgroundColor: "rgba(47, 57, 65, .85)",
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
  categoryContainer: {
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
  printFormikValues: {
    color: Colors.cream,
    "&:hover": {
      cursor: "pointer",
      color: Colors.gradientUniswapBlue1,
    }
  },
})














