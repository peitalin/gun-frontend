import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { Product_Preview_Items } from "typings/gqlTypes";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { generateYouTubeVimeoEmbedLink } from "utils/links";



const VideoInModal: React.FC<ReactProps> = (props) => {

  const {
    classes,
    previewItem,
  } = props;

  let videoUrl = generateYouTubeVimeoEmbedLink(
    previewItem?.youTubeEmbedLink ?? ""
  );

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Card className={classes.card}>
      <CardActionArea
        onClick={props.onClick}
        classes={{
          root: classes.cardActionAreaWide,
          focusHighlight: classes.focusHighlight,
          focusVisible: classes.focusHighlight,
        }}
      >
        {
          videoUrl &&
          <CardMedia
            component="iframe"
            classes={{
              media: classes.cardMediaWide
            }}
            image={videoUrl}
          />
        }
      </CardActionArea>
    </Card>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  previewItem?: Product_Preview_Items;
  openedModals?: string[];
  openModal?(id: string): void;
  closeModal?(id: string): void;
  onClick?(): void;
}

// const patternColor = fade(Colors.black, 0.9);
// const backgroundColor = Colors.black;

const styles = (theme: Theme) => createStyles({
  card: {
    borderRadius: "1px",
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
    }),
    backgroundColor: "rgba(0,0,0,0)",
    ...cardDimensions
  },
  cardActionAreaWide: {
    // height: '100%',
    display: "flex",
    flexDirection: "row",
    "&:hover $focusHighlight": {
      opacity: 0
    },
    ...cardDimensions
  },
  cardMediaWide: {
    objectFit: "scale-down",
    border: '0px',
    ...cardDimensions
  },
  cardImg: {
  },
  focusHighlight: {
    opacity: 0, // disable hover dither
    "&:hover": {
      opacity: 0, // disable hover dither
    }
  },
});

const cardDimensions = {
  width: 'calc(96vw)',
  height: 'calc(60vw)',
  maxWidth: 960,
  maxHeight: 600,
}

export default withStyles(styles)( VideoInModal );

