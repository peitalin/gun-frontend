import { createStyles, Theme, fade } from "@material-ui/core/styles";
import { fontFam, Colors } from "layout/AppTheme";

export const styles = (theme: Theme) => createStyles({
  fileUploadRoot: {
    marginBottom: '2rem',
    width: '100%',
    position: 'relative',
    paddingBottom: '0.5rem',
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
  uploadLayout: {
    border: "2px dashed rgb(221, 221, 221)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: '0.5rem',
    padding: "1rem",
    backgroundColor: "#fefefe",
  },
  iconButton: {
    background: "rgba(24,24,24, 0.2)",
    "&:hover": {
      background: "rgba(24,24,24, 0.3)",
    },
  },
  previewIconButton: {
    position: "absolute",
    right: -5,
    top: -5,
    zIndex: 1502,
  },
  svgIcon: {
    fill: "#eaeaea",
    "&:hover": {
      fill: "#fafafa",
    },
  },
  progressContainer: {
    position: "absolute",
    width: '100%',
    bottom: '0',
  },
  blue1: {
    backgroundImage: "linear-gradient(90deg, #9999FF 0%, #2484ff 66%)"
  },
  blue2: {
    backgroundImage: "linear-gradient(90deg, #9999FF 0%, #85AFFA 66%)"
  },
  cardOuter: {
    borderRadius: "1px",
    height: "100%",
  },
  cardActionArea: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  cardMediaVideo: {
    height: "100%",
    objectFit: "cover",
    border: "none",
  },
  cardMediaWide: {
    width: "100%",
    objectFit: "cover",
  },
  textField: {
    minWidth: 300,
    width: "50%",
  },
  previewItemSubtitle: {
    marginBottom: "0.25rem",
    color: Colors.grey,
    fontSize: '0.7rem',
    fontWeight: 400,
    lineHeight: '0.9rem',
  },
  previewTitleBox: {
  },
})














