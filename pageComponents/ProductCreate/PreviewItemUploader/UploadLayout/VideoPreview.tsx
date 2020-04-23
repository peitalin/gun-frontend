import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { fontFam, Colors } from "layout/AppTheme";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import YouTubeIcon from "components/Icons/YouTube";
// helpers
import { genSrcSet } from "utils/files";
import { getYouTubeVimeoImagePreview } from "utils/strings";


// VIMEO
// <iframe src="https://player.vimeo.com/video/76979871?embedparameter=value" width="640" height="360" frameborder="0" allowfullscreen></iframe>

// https://vimeo.com/ondemand/thedawnwall/288596286
// https://player.vimeo.com/video/288596286

const VideoPreview: React.FC<ReactProps> = (props) => {

  const [previewLoaded, setPreviewLoaded] = React.useState(false);

  const { classes, onClick, handleRemove, previewId } = props;
  let {
    videoUrl = "5JxgDJvqGmM",
    autoplay = false,
    rel = false,
    modest = 1,
    asThumbnail = true,
  } = props;


  let videoSrc = "";

  // Youtube
  if (videoUrl.includes('youtube.com/watch?v=')) {
    videoSrc = "https://www.youtube.com/embed/" +
      videoUrl.split('v=')[1]
      + "?autoplay=" + autoplay
      + "&rel=" + rel
      + "&modestbranding=" + modest
      + "&color=white"
  }

  // Vimeo
  if (videoUrl.includes('vimeo.com')) {
    videoSrc = `https://player.vimeo.com/video/${videoUrl.split('/').pop()}`;
  }

  return (
    <>
      <IconButton
        onClick={() => handleRemove(previewId)}
        className={classes.previewIconButton}
        classes={{ root: classes.iconButton }}
        size="small"
      >
        <ClearIcon classes={{ root: classes.svgIcon }}/>
      </IconButton>

      <YouTubeIcon height={60} width={60} disableBackground={true}/>
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
                onLoad={() => setPreviewLoaded(true)}
                image={videoSrc}
                title={props.title}
              />
          </CardActionArea>
        </Card>
      }
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  onClick?(a: any): void;
  handleRemove?(id: any): void;
  previewId?: string;
  videoUrl: string;
  autoplay?: boolean;
  rel?: boolean;
  modest?: boolean;
  asThumbnail?: boolean;
  title?: string;
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
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23dddddd' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
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
})


export default withStyles(styles)(VideoPreview);