import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { fontFam, Colors } from "layout/AppTheme";
// import { styles } from '../styles';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { ReducerName } from "typings/dropzone";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import YouTubeIcon from "components/Icons/YouTube";
import { DzuPreviewOrder, DzuPreviewItem } from "typings/dropzone";
// helpers
import { genSrcSet, genImgBreakpoints } from "utils/images";
import { getYouTubeVimeoImagePreview } from "utils/links";
import { extractYoutubePreview } from "utils/links";


// VIMEO
// <iframe src="https://player.vimeo.com/video/76979871?embedparameter=value" width="640" height="360" frameborder="0" allowfullscreen></iframe>

// https://vimeo.com/ondemand/thedawnwall/288596286
// https://player.vimeo.com/video/288596286

const VideoPreview: React.FC<ReactProps> = (props) => {

  const [previewLoaded, setPreviewLoaded] = React.useState(false);

  const dispatch = useDispatch();
  const actions = Actions[props.reducerName];

  const {
    classes,
    onClick,
    handleRemove,
    dzuPreview,
  } = props;

  let {
    autoplay = false,
    rel = false,
    modest = 1,
    asThumbnail = true,
  } = props;

  let { fileWithMeta } = dzuPreview;
  let videoUrl = dzuPreview.youTubeVimeoEmbedLink;
  let videoSrc = extractYoutubePreview({
    videoUrl,
    autoplay,
    rel,
    modest
  });

  const handleRemoveVideoWithRedux = () => {
    // remove DZU preview (redux) and previewItems in currentVariants
    console.log("removing youtube preview...", dzuPreview)
    handleRemove(dzuPreview.id)
    dispatch(actions.REMOVE_PREVIEW_ITEMS([dzuPreview.id]))
    dispatch(actions.REMOVE_DZU_PREVIEW_ORDER([dzuPreview.id]))
    if (fileWithMeta && fileWithMeta.remove) {
      fileWithMeta.remove()
    }
  }

  const youTubeVimeoThumbnail = getYouTubeVimeoImagePreview(dzuPreview.youTubeVimeoEmbedLink)

  return (
    <div
      // Image Preview Embedded as CSS background
      // to avoid image flickers
      style={{
        backgroundImage: `url(${youTubeVimeoThumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: '50%',
        // width: '100%',
        // height: '100%',
        height: '55px',
        width: '88px',
        position: 'relative', //for upload progress positioning
        borderRadius: '4px',
        borderTop: '1px solid #666',
        borderLeft: '1px solid #666',
        borderRight: '1px solid #666',
        borderBottom: '1px solid #666',
      }}
    >
      <IconButton
        onClick={() => handleRemoveVideoWithRedux()}
        className={classes.previewIconButton}
        classes={{ root: classes.iconButton }}
        size="small"
      >
        <ClearIcon classes={{ root: classes.svgIcon }}/>
      </IconButton>

      <YouTubeIcon width={88} height={55} disableBackground={true}/>
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: 0,
        width: '40%',
        zIndex: 2000,
        height: "50%",
      }}>
      </div>
      {
        !asThumbnail &&
        <Card className={classes.cardOuter}>
          <CardActionArea
            onClick={onClick}
            classes={{ root: classes.cardActionArea }}
          >
              <CardMedia
                component="iframe"
                // className={previewLoaded ? "fadeIn" : "hidden"}
                classes={{ media: classes.cardMediaVideo }}
                // onLoad={() => setPreviewLoaded(true)}
                image={videoSrc}
                title={props.title}
              />
          </CardActionArea>
        </Card>
      }
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  onClick?(a: any): void;
  handleRemove?(id: any): void;
  dzuPreview: DzuPreviewItem;
  autoplay?: boolean;
  rel?: boolean;
  modest?: boolean;
  asThumbnail?: boolean;
  title?: string;
  reducerName: ReducerName;
}


export const styles = (theme: Theme) => createStyles({
  imagePreviewPlaceholder: {
    borderRadius: "4px",
    height: '100px',
    width: '150px',
  },
  imagePreview: {
    borderRadius: "4px",
    height: 100,
    width: 150,
  },
  card: {
    borderRadius: "1px",
    width: "100%",
    boxShadow: 'none',
  },
  cardActionArea: {
    background: "#f8f8f8",
    display: "flex",
    flexDirection: "row",
    height: '100%',
  },
  grey: {
    color: "#7C858E"
  },
  cardOuter: {
    borderRadius: "1px",
    height: "100%",
  },
  cardMediaVideo: {
    height: "100%",
    objectFit: "cover",
    border: "none",
  },
  cardMedia: {
    objectFit: "cover",
    height: 100,
    width: 160,
  },
  cardMediaFit: {
    // objectFit: "contain",
    objectFit: "cover",
    // width: "unset", // width: 100% before
    // transform: 'translateX(50%)',
    // boxShadow: "0px 1px 3px 1px rgba(0,0,0,0.6)",
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
    zIndex: 150,
  },
  svgIcon: {
    fill: "#eaeaea",
    "&:hover": {
      fill: "#fafafa",
    },
  },
})


export default withStyles(styles)(VideoPreview);