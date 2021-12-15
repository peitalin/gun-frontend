import { Theme, alpha } from "@mui/material/styles";
import createStyles from '@mui/styles/createStyles';
import {
  Colors,
  BorderRadius,
  BorderRadius2x,
  isThemeDark,
  BoxShadows,
} from "layout/AppTheme";


export const styles = (theme: Theme) => createStyles({
  featuredImageRoot: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    // borderRadius: BorderRadius,
    backgroundColor: theme.palette.mode === 'dark'
      ? Colors.black
      : Colors.lightestGrey,
  },
  featuredImageRootPromoted: {
    borderRadius: BorderRadius2x,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.purple}`
      : "unset",
    boxShadow: isThemeDark(theme)
      ? BoxShadows.shadowWhite.boxShadow
      : BoxShadows.shadow2.boxShadow,
  },
  // featuredImageRootXSDown: {
  //   position: 'absolute',
  //   height: '100%',
  // },
  featuredImageRootXSDown: {
    maxWidth: 'calc(101vw)', // extra 1 vw to hide border
    // position: 'absolute',
    height: '100%',
    marginBottom: "0rem",
  },

  // FEATURED MODAL
  imageInModalContainer: {
    display: 'flex',
  },
  imageInModal: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  paper: {
    outline: 'none',
  },
  paperLoaded: {
    width: '100%',
  },
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaperSm: {
  },
  modalPaperScrollPaper: {
    backgroundColor: 'rgba(0,0,0,0)',
    boxShadow: 'unset',
    // pointerEvents: 'none', // click-through image to close modal
    // position: 'fixed',
    // allow click through on portrait images to close modal
  },
  videoInModalContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /// Featured Video
  card: {
    borderRadius: '0px',
    width: "100%",
    height: '100%',
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
    }),
  },
  cardMedia: {
    objectFit: "cover",
    width: '100%',
    height: '100%',
    border: 'none',
  },
  cardActionArea: {
    width: '100%',
    height: '100%',
    display: "flex",
    flexDirection: "row",
  },
  closeButtonModal: {
    position: "fixed",
    top: '0.5rem',
    right: '0.5rem',
    background: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.slateGreyDarkest,
    "&:hover": {
      background: isThemeDark(theme)
        ? Colors.uniswapLighterGrey
        : Colors.slateGreyDark,
    },
  },
})














