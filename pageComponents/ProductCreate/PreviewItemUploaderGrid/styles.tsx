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
    background: Colors.darkGrey,
    "&:hover": {
      background: Colors.red,
    },
    color: Colors.lightGrey,
    padding: 2, // determines button size
  },
  iconButtonLabel: {
    height: '0.65rem',
    width: '0.65rem',
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
  progressContainer: {
    position: "absolute",
    width: '100%',
    bottom: '0',
    borderRadius: '0px 0px 3px 3px', // looks like 4px
    // progresss bars look like 4px using 3px
    overflow: 'hidden',
  },
  progressUnfilled: {
    backgroundImage: "linear-gradient(90deg, #eee 0%, #eee 100%)"
  },
  progressFilled: {
    backgroundImage:
      `linear-gradient(90deg, ${Colors.greenCool} 0%, ${Colors.greenCoolLight} 66%)`,
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














