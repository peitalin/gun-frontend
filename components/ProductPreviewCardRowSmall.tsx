import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import { Product_Preview_Items, Product } from "typings/gqlTypes";
import { Colors, BorderRadius, isThemeDark } from "layout/AppTheme";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// helpers
import { genSrcSet } from "utils/images";
import { getYouTubeVimeoImagePreview } from "utils/links";




const ProductPreviewCardRowSmall = (props: ReactProps) => {

  const [previewLoaded, setPreviewLoaded] = React.useState(false);
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
      }}
    >
      <CardActionArea
        classes={{
          root: props.unclickable
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
              previewLoaded ? "fadeIn" : "hidden",
            )}
            classes={{
              media: (previewItem.image.original.heightInPixels
                > previewItem.image.original.widthInPixels)
                ? classes.cardMediaFit
                : classes.cardMedia
            }}
            onLoad={() => setPreviewLoaded(true)}
            src={previewItem.image.original.url}
            srcSet={genSrcSet(previewItem.image)}
            sizes={`(max-width: 320px) 280px, (max-width: 480px) 440px, 800px`}
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
              // onLoad={() => setPreviewLoaded(s => s + 1)}
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
      ? Colors.uniswapGrey
      : Colors.slateGreyDark,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    // textTransform: "uppercase",
  },
  card: {
    // borderRadius: `${BorderRadius}px`,
    borderRadius: '3px',
    boxShadow: 'none',
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.slateGreyDark,
    transition:  theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.easeIn,
      duration: 300,
    }),
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
    objectFit: "cover",
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
  cardMediaFit: {
    objectFit: "cover",
  },
});


export default withStyles(styles)(ProductPreviewCardRowSmall);
