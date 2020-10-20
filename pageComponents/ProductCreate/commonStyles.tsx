import { createStyles, Theme, fade } from "@material-ui/core/styles";
import { fontFam, Colors, BorderRadius, BoxShadows } from "layout/AppTheme";

export const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    height: '100%',
    minHeight: 'calc(100vh - 32px)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  productColumn55: {
    flexBasis: '55%',
    flexGrow: 1,
    minWidth: 360,
  },
  productColumn35: {
    flexBasis: '35%',
    flexGrow: 1,
    minWidth: 300,
    maxWidth: 400,
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
    borderRadius: '4px',
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
    paddingBottom: '2rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  pageMarginSm: {
    background: Colors.foregroundColor,
    margin: '0rem',
    paddingTop: '0.5rem',
    paddingBottom: '2rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
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
    background: Colors.uniswapDarkNavy,
    border: `1px solid ${Colors.uniswapLightNavy}`,
    borderRadius: '4px',
    padding: '2rem',
    position: 'relative', // needed for coverGrey, position: absolute
  },
  formOuterContainerSm: {
    background: Colors.uniswapDarkNavy,
    borderRadius: '4px',
    padding: '1rem',
    position: 'relative', // needed for coverGrey, position: absolute
  },
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
  button: {
    margin: 0,
  },
  formContainer: {
    position: 'relative',
    marginBottom: "0.5rem",
    paddingBottom: '1rem',
  },
  container: {
    marginBottom: "0.5rem",
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
    width: '100%',
  },
  policy: {
    width: 'calc(100% - 2rem)',
    fontWeight: 400,
    marginBottom: '2rem',
    lineHeight: '1rem',
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
    color: Colors.grey,
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
  descriptionRoot: {
    marginBottom: '2rem',
  },

  // Categories
  categoryButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonRoot: {
    margin: '0.1rem',
    color: Colors.darkerGrey,
    border: `1px solid ${Colors.mediumLightGrey}`,
    borderRadius: '2rem',
    flexGrow: 1,
  },
  buttonSelected: {
    background: Colors.secondary,
    color: Colors.cream,
    borderRadius: '2rem',
    "&:hover": {
      background: fade(Colors.secondary, 0.8),
      color: Colors.cream,
    },
  },
  marginTop05: {
    marginTop: '0.5rem',
  },
  expansionPanelRoot: {
    width: '100%',
    padding: '0rem',
    marginLeft: '0rem',
    border: `1px solid ${Colors.mediumLightGrey}`,
    // overrides .MuiExpansionPanel-rounded:first-child
    // border radius
    borderRadius: `${BorderRadius}px !important`,
    backgroundColor: Colors.foregroundColor,
    transition: theme.transitions.create('border', {
      duration: "1200ms",
    }),
  },
  expansionPanelExpanded: {
    border: `1px solid ${Colors.white}`,
    transition: theme.transitions.create('border', {
      duration: "0ms",
    }),
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
    color: Colors.charcoal,
    fontSize: '1rem',
    transition: theme.transitions.create('color', {
      duration: "2000ms",
    }),
  },
  selectedCategoryOpen: {
    color: Colors.secondary,
    fontSize: '1rem',
    transition: theme.transitions.create('color', {
      duration: "200ms",
    }),
  },
  selectedCategoryEmpty: {
    color: Colors.grey,
    fontSize: '1rem',
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
    top: '1rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    // from SellingTips to product card preview
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
  },
  selectTagsRoot: {
    marginTop: '2rem',
    // marginBottom: '1rem',
  },
  tagsTitle: {
    marginBottom: '0.5rem',
  },
})

