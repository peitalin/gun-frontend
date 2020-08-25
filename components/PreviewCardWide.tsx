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
import { Product_Preview_Items, Categories } from "typings/gqlTypes";
import { genSrcSet } from "utils/files";
import { getYouTubeVimeoImagePreview } from "utils/strings";
import PriceDisplayMain from "components/PriceDisplayMain";



const PreviewCardWide = (props: ReactProps) => {

  // const [previewLoaded, setPreviewLoaded] = React.useState(0);
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


  const cardWidth = '100%';
  const cardHeight = 380 - 32; // subtract 2 rem
  const cardHeightTopHalf = cardHeight * (props.topHalfFraction || 0.5);
  const cardHeightBottomHalf = cardHeight * (1 - props.topHalfFraction || 0.5);


  const title = option(props).title('').length > 50
    ? props.title.slice(0, 50) + '...'
    : option(props).title("")

  return (
    <div className={clsx(classes.rootContainer)}>
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
            option(image).original.url()
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
        <div className={classes.descriptionContainer}>
          <Typography
            className={clsx(
              classes.category,
              !option(props).category.name() ? "pulse" : null
            )}
            variant="body1"
            component="div"
          >
            {option(props).category.name()}
          </Typography>
          <Typography
            className={clsx(
              classes.title,
              !option(props).title() ? "pulse" : null
            )}
            variant="body1"
            component="div"
          >
            {title}
          </Typography>
          <div className={clsx(
            classes.priceAbsoluteBottom,
            !option(props).price() ? "pulse" : null
          )}>
            {
              option(props).price()
              ? <PriceDisplayMain
                  price={props.price}
                  priceWas={props.priceWas}
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
  previewItem: Product_Preview_Items;
  fit?: boolean; // object-fit the image
  title: string;
  tagline: string;
  category: Categories;
  price: number;
  priceWas?: number;
  quantityAvailable?: number;
  isSoldOut?: boolean;
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
    borderRadius: `${cardCornerRadius}px ${cardCornerRadius}px 0px 0px`,
    width: "100%",
    backgroundColor: Colors.lightestGrey,
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${patternColor}' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='2'/%3E%3Ccircle cx='13' cy='13' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23${patternColor}' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    // borderBottom: "1px solid #f2f2f2",
    // transition: theme.transitions.create('border', {
    //   easing: theme.transitions.easing.easeIn,
    //   duration: "100ms",
    // }),
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
  },
  cardMedia: {
    objectFit: "cover",
    border: 'none',
  },
  cardMediaFit: {
    // objectFit: "contain",
    objectFit: "cover",
    border: 'none',
  },
  descriptionContainer: {
    paddingTop: "0.7rem",
    padding: "0.5rem",
    backgroundColor: Colors.foregroundColor,
  },
  category: {
    textTransform: "uppercase",
    fontWeight: 600,
    fontSize: '0.875rem',
    color: Colors.darkGrey,
    marginBottom: '0.4rem',
    lineHeight: '1rem',
  },
  title: {
    fontWeight: 600,
    color: "#444",
    marginBottom: '0.4rem',
    lineHeight: '1.25rem',
    fontSize: '1.125rem'
  },
  tagline: {
    fontSize: '.8rem',
    color: "#aaa",
    marginBottom: '0.4rem',
    lineHeight: '1rem',
  },
  priceSpacer: {
    height: "40px", // 2 lines high
  },
  priceAbsoluteBottom: {
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

export default withStyles(styles)(PreviewCardWide);
