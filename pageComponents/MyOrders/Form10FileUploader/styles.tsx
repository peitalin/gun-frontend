
import { createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius, fontFam } from "layout/AppTheme";


export const styles = (theme: Theme) => createStyles({
  fileUploadRoot: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: BorderRadius,
  },
  title: {
    lineHeight: '1rem',
  },
  subtitle: {
    lineHeight: '1rem',
    color: Colors.grey,
  },
  fileUploaderErrMsgContainer: {
    position: "relative",
  },
  errorMessage: {
    position: 'absolute',
    bottom: '-0.25rem',
    right: '0.25rem',
    fontSize: '0.8rem',
    color: `${fade(theme.palette.error.light, 0.6)}`,
    fontFamily: fontFam,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  previewItemRoot: {
    marginBottom: '1rem',
    position: 'relative',
    padding: '0rem 1rem', // make upload bars shorter
  },
  iconButton: {
    background: Colors.darkGrey,
    "&:hover": {
      background: Colors.red,
    },
    color: Colors.lightGrey,
    padding: 2, // determines button size
  },
  imagePreviewIconButton: {
  },
  progressContainer: {
    width: '100%',
    bottom: '0',
    height: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  green1: {
    backgroundImage: "linear-gradient(90deg, #6CBAA3 33%, #6CBAA3 66%)"
  },
  green2: {
    backgroundImage: "linear-gradient(90deg, #65BF93  33%, #65BF93  66%)"
  },
  grey: {
    backgroundImage: "linear-gradient(90deg, #eaeaea  33%, #eaeaea  66%)"
  },
  previewIconButton: {
    position: "absolute",
    right: -8,
    top: -8,
    zIndex: 1502,
  },
  svgIcon: {
    fill: "#eaeaea",
    "&:hover": {
      fill: "#fafafa",
    },
  },
})














