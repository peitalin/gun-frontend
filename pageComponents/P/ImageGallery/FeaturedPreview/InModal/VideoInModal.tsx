import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { Product_Preview_Items } from "typings/gqlTypes";
import { genSrcSet, genImgBreakpoints } from "utils/images";
import Loading from "components/Loading";
import LoadingBar from "components/LoadingBar";
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
    option(previewItem).youTubeEmbedLink("")
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
    // backgroundColor: backgroundColor,
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23${patternColor}' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
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

