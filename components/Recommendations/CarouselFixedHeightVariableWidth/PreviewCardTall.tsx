import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import YouTubeIcon from "components/Icons/YouTube";
// Typings
import { ProductPreviewItem, ProductCategory, Image, PriceDetails } from "typings/gqlTypes";
import { genSrcSet } from "utils/files";
import { getYouTubeVimeoImagePreview } from "utils/strings";
import PriceDisplay2 from "components/PriceDisplay2";
import DiscountBadge from "components/DiscountBadge";
import { useCardWidthHeightHook } from "utils/hooks";



const PreviewCardTall = (props: ReactProps) => {

  // const [previewLoaded, setPreviewLoaded] = React.useState(false);
  const [youTubePreview, setYouTubePreview] = React.useState("")

  const { classes, previewItem } = props;
  const image =  option(previewItem).image();
  const youTubeEmbedLink =  option(previewItem).youTubeEmbedLink();

  React.useEffect(() => {
    setYouTubePreview(getYouTubeVimeoImagePreview(youTubeEmbedLink))
    // if (process.browser) {
    //   setPreviewLoaded(s => s + 1)
    // }
  }, [])


  // // let cardWidth =  (carouselWidth / numberOfItems) - 8
  // 8px is spacing between cards
  // let cardWidth = "calc(25vw - 8px)"
  // // let cardHeight = cardWidth * 1.25 - 2
  // 2px is border

  const { cardWidth, cardHeight } = useCardWidthHeightHook(
    props.maxWidthCarousel
  );

  const cardHeightTopHalf = cardHeight * (props.topHalfFraction || 0.5);
  const cardHeightBottomHalf = cardHeight * (1 - props.topHalfFraction || 0.5);

  const title = option(props).title('').length > 48
    ? props.title.slice(0, 45) + '...'
    : option(props).title()

  if (!cardWidth || !cardHeight) {
    return <div className={classes.rootContainer}></div>
  }
  return (
    <div className={classes.rootContainer}>
      {
        props.priceDetails &&
        <DiscountBadge priceDetails={props.priceDetails}/>
      }
      <Card className={classes.card}
        classes={{
          root: classes.cardRoot
        }}
        style={{
          width: cardWidth,
        }}
      >
        <CardActionArea>
          {
            option(image).original.id()
            ? <CardMedia
                title={props.title}
                component="img"
                className={clsx(
                  props.fit ? classes.cardMediaFit : classes.cardMedia,
                )}
                style={{
                  height: cardHeightTopHalf,
                }}
                // onLoad={() => setPreviewLoaded(s => s + 1)}
                src={image.original.url}
                srcSet={genSrcSet(image)}
                sizes={`(max-width: 320px) 280px, (max-width: 480px) 440px, 800px`}
                // https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
              />
            : youTubePreview
              ? <CardMedia
                  component="img"
                  className={clsx(
                    classes.cardMedia,
                  )}
                  style={{
                    height: cardHeightTopHalf,
                  }}
                  // onLoad={() => setPreviewLoaded(s => s + 1)}
                  src={youTubePreview}
                  title={youTubePreview ? props.title : "YouTube thumbnail unavailable"}
                />
              : <div
                  className={clsx(
                    classes.cardMedia,
                    classes.emptyYouTube,
                  )}
                  style={{
                    height: cardHeightTopHalf,
                  }}
                />
          }
        </CardActionArea>
        <div
          className={classes.descriptionContainer}
          style={{
            height: cardHeightBottomHalf,
          }}
        >
          <Typography
            className={clsx(
              classes.category,
              !option(props).category.name() ? "pulse" : null
            )}
            variant="body1"
            component="div"
          >
            {option(props).category.name("Loading...")}
          </Typography>
          <Typography
            className={clsx(
              classes.title,
              !option(props).title() ? "pulse" : null
            )}
            variant="body1"
            component="div"
          >
            {option(title)(".... ".repeat(2))}
          </Typography>
          <div className={clsx(
            classes.priceAbsoluteBottom,
            !option(props).priceDetails() ? "pulse" : null
          )}>
            {
              option(props).priceDetails()
              ? <PriceDisplay2
                  priceDetails={props.priceDetails}
                  hideSavings={true}
                  quantityAvailable={props.quantityAvailable}
                  isSoldOut={props.isSoldOut}
                />
              : <span style={{ color: Colors.grey }}></span>
            }
          </div>
        </div>
      </Card>
    </div>
  );
}



interface ReactProps extends WithStyles<typeof styles> {
  previewItem: ProductPreviewItem;
  fit?: boolean; // object-fit the image
  title: string;
  tagline: string;
  category: ProductCategory;
  priceDetails: PriceDetails;
  quantityAvailable?: number;
  isSoldOut?: boolean;
  count: number;
  maxWidthCarousel?: number;
  topHalfFraction?: number;
}


// Replace hash with html-encoded %23
const patternColor = "e2e2e2";
const cardCornerRadius = 4
const backgroundColor = Colors.cream;


const styles = (theme: Theme) => createStyles({
  rootContainer: {
    lineHeight: "1rem",
    width: "100%",
    position: "relative",
  },
  card: {
    // minWidth: CARD_MIN_WIDTH,
    borderRadius: `${4}px ${4}px 0px 0px`,
    width: "100%",
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23${patternColor}' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    transition: theme.transitions.create('border', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
    borderBottom: `1px solid ${Colors.lightestGrey}`,
    // "&:hover": {
    //   borderBottom: `1px solid ${Colors.lightGrey}`,
    //   transition: theme.transitions.create('border', {
    //     easing: theme.transitions.easing.easeIn,
    //     duration: "100ms",
    //   }),
    // }
  },
  cardRoot: {
    boxShadow: 'none',
    backgroundColor: backgroundColor,
  },
  cardMedia: {
    objectFit: "cover",
    // height: CARD_HEIGHT/2,
    border: 'none',
  },
  cardMediaFit: {
    // objectFit: "contain",
    objectFit: "cover",
    // height: CARD_HEIGHT/2,
    border: 'none',
  },
  descriptionContainer: {
    padding: "1rem",
    // height: CARD_HEIGHT/2,
    backgroundColor: Colors.foregroundColor,
  },
  category: {
    textTransform: "uppercase",
    fontWeight: 600,
    fontSize: '.7rem',
    color: "#888",
    marginBottom: '0.25rem',
    lineHeight: '1rem',
  },
  title: {
    fontWeight: 600,
    color: "#444",
    marginBottom: '0.5rem',
    lineHeight: '1rem',
    maxHeight: '2rem',
    overflow: 'scroll',
  },
  tagline: {
    fontSize: '.8rem',
    color: "#aaa",
    marginBottom: '1rem',
    lineHeight: '1rem',
  },
  priceSpacer: {
    height: "40px", // 2 lines high
  },
  priceAbsoluteBottom: {
    // position: "relative",
    // position: "absolute",
    bottom: '0.5rem',
    width: 'calc(100%)',
  },
  emptyYouTube: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withStyles(styles)(PreviewCardTall);
