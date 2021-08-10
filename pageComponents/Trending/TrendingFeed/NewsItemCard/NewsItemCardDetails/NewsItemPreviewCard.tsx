import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import { Product_Preview_Items, Product } from "typings/gqlTypes";
import { Colors, BorderRadius, isThemeDark, BorderRadius2x } from "layout/AppTheme";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// helpers
import { genSrcSet } from "utils/images";
import { getYouTubeVimeoImagePreview } from "utils/links";




const NewsItemPreviewCard = (props: ReactProps) => {

  const { classes } = props;
  const previewItem = props.previewItem;

  return (
    <Card
      className={clsx(
        classes.card,
        props.className
      )}
      style={{
        height: props.height ? props.height : CARD_HEIGHT,
        width: props.width ? props.width : CARD_WIDTH,
        maxHeight: 260,
      }}
    >
      <CardActionArea
        classes={{
          root:
          props.unclickable
            ? classes.disableCardActionArea
            : classes.cardActionArea
        }}
      >
      {
        previewItem?.image?.original?.id
        ? <CardMedia
            component="img"
            title={props.title}
            className={clsx(
              classes.imagePreview,
            )}
            classes={{
              media: (previewItem.image.original.heightInPixels
                > previewItem.image.original.widthInPixels)
                ? classes.cardMediaFit
                : classes.cardMedia
            }}
            onLoad={() => props.setPreviewLoaded(true)}
            src={previewItem.image.original.url}
            // srcSet={genSrcSet(previewItem.image)}
            // sizes={`(max-width: 415px) 600px, (max-width: 1160px) 440px, 800px`}
            style={{
              ...props.style,
              height: props.height ? props.height : CARD_HEIGHT,
              width: props.width ? props.width : CARD_WIDTH,
            }}
            // style={{ backgroundImage: `url(${image.original.url})` }}
            // image={"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
            // empty 1px image. use background-image: url(image.jpg) instead
            // to prevent image re-render flashs
          />
        : previewItem?.youTubeEmbedLink
          ? <CardMedia
              component="img"
              className={clsx(
                classes.imagePreview,
              )}
              classes={{
                media: classes.cardMedia
              }}
              style={{
                ...props.style,
                height: props.height ? props.height : CARD_HEIGHT,
                width: props.width ? props.width : CARD_WIDTH,
              }}
              onLoad={() => props.setPreviewLoaded(true)}
              src={getYouTubeVimeoImagePreview(previewItem.youTubeEmbedLink)}
              title={props.title}
            />
          : <div
              className={clsx(
                classes.imagePreview,
                classes.imageMissingPreview,
              )}
              style={{
                ...props.style,
                height: props.height ? props.height : CARD_HEIGHT,
                width: props.width ? props.width : CARD_WIDTH,
              }}
            >
              No Image
            </div>
      }
      </CardActionArea>
    </Card>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  previewItem: Product_Preview_Items;
  setPreviewLoaded(b: boolean): void;
  className?: any;
  title?: string;
  style?: any;
  height?: any;
  width?: any;
  unclickable?: boolean;
}


const CARD_HEIGHT = 100;
const CARD_WIDTH = 150;

const styles = (theme: Theme) => createStyles({
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  marginRight: {
    marginRight: "1rem",
  },
  imagePreviewPlaceholder: {
    borderRadius: BorderRadius,
    height: '100px',
    width: '150px',
  },
  imagePreview: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
  imageMissingPreview: {
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.slateGreyDark,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    textDecoration: "uppercase",
  },
  card: {
    borderRadius: `${BorderRadius2x}px ${BorderRadius2x}px 0px 0px`,
    boxShadow: 'none',
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.slateGreyDark,
    // border: theme.palette.type === 'dark'
    //   ? `1px solid ${Colors.uniswapGrey}`
    //   : `1px solid ${Colors.slateGreyDarker}`,
  },
  cardActionArea: {
    display: "flex",
    flexDirection: "row",
    height: '100%',
  },
  disableCardActionArea: {
    display: "flex",
    flexDirection: "row",
    height: '100%',
    cursor: "default",
  },
  grey: {
    color: "#7C858E"
  },
  cardMedia: {
    objectFit: "contain",
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
  cardMediaFit: {
    objectFit: "contain",
  },
});


export default withStyles(styles)(NewsItemPreviewCard);
