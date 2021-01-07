// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";


export const styles = (theme: Theme) => createStyles({
  root: {
    position: 'relative',
    paddingLeft: '1rem',
  },
  productColumn40: {
    margin: '1rem',
    flexBasis: '40%',
    flexGrow: 1,
    minWidth: 270,
    maxWidth: 580,
  },
  productColumn30: {
    paddingTop: '1rem',
    margin: '1rem',
    flexBasis: '30%',
    flexGrow: 1,
    minWidth: 270,
    maxWidth: 580,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  sectionContainer: {
    background: "#fefefe",
    opacity: 1,
    position: 'relative',
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  sectionContainerOpacity: {
    opacity: 0.3,
    filter: "grayscale(1)",
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  contentContainer: {
    flexBasis: '65%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '1rem 0rem 1rem 0rem',
    maxWidth: 800,
  },
  margin1: {
    margin: '1rem',
  },
  margin2: {
    margin: '2rem',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spacer: {
    marginTop: "4rem",
  },
  cornerButtonContainer: {
    position: 'absolute',
    right: '0rem',
    bottom: '0rem',
    padding: '1rem',
    // padding prevents accidental click-through to uploader
  },
  cornerButtonOutline: {
    border: '1px solid rgba(225, 225, 225, 0)',
    color: 'rgba(225, 225, 225, 0.9)',
    "&:hover": {
      border: '1px solid rgba(36, 132, 255, 0.8)',
      backgroundColor: "rgba(36, 132, 255, 0.2)",
    },
  },
  cornerButton: {
    minWidth: "164px",
  },
  noDarken: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: "RGBA(0,0,0,1)",
    opacity: 0,
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
  },
  darken: {
    backgroundColor: "RGBA(0,0,0,1)",
    opacity: 0.5,
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
  },
  // featured products titles
  title: {
    marginBottom: '1rem',
    fontSize: '1.125rem',
  },
  spaceTop: {
    marginTop: '2rem',
  },
  storeProductsRoot: {
  },
  translateUp60: {
    transform: 'translate(0px, -60px)',
  },
  marginRight1: {
    marginRight: '1rem',
  },
  minHeight560: {
    minHeight: '560px',
  },
});
