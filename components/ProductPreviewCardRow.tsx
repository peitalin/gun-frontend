import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
// import { ProductPreviewItem, Product, ProductVariant } from "typings/gqlTypes";
type ProductPreviewItem = any;
type Product = any;
type ProductVariant = any;
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// helpers
import { genSrcSet } from "utils/files";
import { getYouTubeVimeoImagePreview } from "utils/strings";




const ProductPreviewCardRow = (props: ReactProps) => {

  // const [previewLoaded, setPreviewLoaded] = React.useState(0);
  const { classes, previewItem } = props;

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
        classes={{ root: classes.cardActionArea }}
      >
      {
        option(previewItem).image.original.id()
        ? <CardMedia
            component="img"
            title={props.title}
            className={clsx(
              classes.imagePreview,
              // (previewLoaded > 0) ? classes.imagePreview : classes.imagePreviewPlaceholder,
              // (previewLoaded > 0) ? "fadeIn" : null,
            )}
            classes={{
              media: (previewItem.image.original.heightInPixels
                > previewItem.image.original.widthInPixels)
                ? classes.cardMediaFit
                : classes.cardMedia
            }}
            // onLoad={() => setPreviewLoaded(s => s + 1)}
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
        : option(previewItem).youTubeEmbedLink()
          ? <CardMedia
              component="img"
              className={clsx(
                classes.imagePreview,
                // previewLoaded ? classes.imagePreview : classes.imagePreviewPlaceholder,
                // previewLoaded ? "fadeIn" : "hidden",
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
          : <CardMedia
              component="img"
              className={clsx(
                classes.imagePreview,
                // previewLoaded ? classes.imagePreview : classes.imagePreviewPlaceholder,
                // previewLoaded ? "fadeIn" : "hidden",
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
              src={"blank"}
              title={""}
            />
      }
      </CardActionArea>
    </Card>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  previewItem: ProductPreviewItem;
  className?: any;
  title?: string;
  style?: any;
  height?: any;
  width?: any;
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
    borderRadius: "4px",
    height: '100px',
    width: '150px',
  },
  imagePreview: {
    borderRadius: "2px 0px 0px 2px",
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
  card: {
    borderRadius: "2px 0px 0px 2px",
    boxShadow: 'none',
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
  cardActionArea: {
    // background: "#f8f8f8",
    display: "flex",
    flexDirection: "row",
    height: '100%',
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23dddddd' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
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
    // width: "unset", // width: 100% before
    // transform: 'translateX(50%)',
    // boxShadow: "0px 1px 3px 1px rgba(0,0,0,0.6)",
  },
});


export default withStyles(styles)(ProductPreviewCardRow);
