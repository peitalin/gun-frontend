import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import { ProductPreviewItem } from "typings/gqlTypes";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { generateYouTubeVimeoEmbedLink } from "utils/strings";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';





const FeaturedVideo = (props: ReactProps) => {

  const [videoLoaded, setVideoLoaded] = React.useState(false)

  const {
    classes,
    previewItem,
  } = props;

  let videoUrl = generateYouTubeVimeoEmbedLink(
    option(previewItem).youTubeEmbedLink("")
  );

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <div className={classes.featuredImageContainer}>
      <Card className={classes.card}>
        <CardActionArea
          classes={{ root: classes.cardActionArea }}
        >
          <CardMedia
            component="iframe"
            classes={{
              media: classes.cardMedia
            }}
            // onLoad={() => setVideoLoaded(true)}
            image={videoUrl}
            // title={image.title}
            // This is the image you click to open modal
          />
        </CardActionArea>
      </Card>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  previewItem?: ProductPreviewItem;
  openedModals?: string[];
  openModal?(id: string): void;
  closeModal?(id: string): void;
}

const styles = (theme: Theme) => createStyles({
  featuredImageContainer: {
    overflow: 'hidden',
    width: '100%',
    background: '#f4f4f4',
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    marginBottom: "0.5rem",
    borderRadius: "2px 2px 2px 2px",
  },
  featuredImageContainerXSDown: {
    position: 'absolute',
    height: '100%',
    // top: 0,
  },
  card: {
    borderRadius: "1px",
    width: "100%",
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
    }),
  },
  cardMedia: {
    objectFit: "cover",
    width: 'calc(60vw)',
    height: 'calc(37.5vw)',  // 1rem / 1.6 = 0.625 rem
    maxWidth: 680,
    maxHeight: 425,
    border: 'none',
  },
  cardActionArea: {
    background: "#f8f8f8",
    display: "flex",
    flexDirection: "row",
  },
  cardMediaTall: {
    width: 'calc(60vw)',
    height: 'calc(37.5vw)',  // 1rem / 1.6 = 0.625 rem
    maxWidth: 680,
    maxHeight: 425,
    objectFit: "cover",
    // width: "unset",
  },
  cardMediaWide: {
    width: 'calc(60vw)',
    height: 'calc(37.5vw)',  // 1rem / 1.6 = 0.625 rem
    maxWidth: 680,
    maxHeight: 425,
    objectFit: "cover",
  },
});


export default withStyles(styles)( FeaturedVideo );

