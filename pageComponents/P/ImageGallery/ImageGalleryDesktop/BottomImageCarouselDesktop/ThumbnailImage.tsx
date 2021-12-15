import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme, alpha } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
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



const ThumbnailImage: React.FC<ReactProps> = (props) => {

  const [imgLoaded, setImgLoaded] = React.useState(0);
  const {
    classes,
    previewItem,
    carouselSize = false,
    showLoadingBar = false,
  } = props;
  const image = previewItem?.image;


  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"));

  let loading = (!imgLoaded || !previewItem);
  // console.log("previewItem", previewItem)
  // console.log("imgLoaded", imgLoaded)
  // console.log("loading", loading)

  React.useEffect(() => {
    // React BUG: all event fired before hydration are lost.
    // https://github.com/facebook/react/issues/15446
    if (image?.original?.url && imgLoaded === 0) {
      setImgLoaded(1)
    }
    return () => {}
  }, [])

  return (
    <Card className={classes.card}>
      <CardActionArea
        onClick={props.onClick}
        // classes={{
        //   root: !portraitMode
        //     ? classes.cardActionAreaWide
        //     : classes.cardActionAreaTall
        // }}
        classes={{
          root: classes.cardActionAreaWide
        }}
      >
        {
          image?.original?.url &&
          <CardMedia
            component="img"
            // className={loading ? 'shimmer' : null}
            // classes={{
            //   media: !portraitMode
            //     ? classes.cardMediaWide
            //     : (xsDown && portraitMode)
            //       ? clsx(classes.cardMediaTall, classes.cardImg)
            //       : classes.cardMediaTall,
            // }}
            classes={{
              media: classes.cardMediaWide
              // media: carouselSize
              //     ? classes.cardMediaWide80
              //     : classes.cardMediaWide

            }}
            onLoad={() => setImgLoaded(s => s + 1)}
            src={image?.original?.url}
            srcSet={
              (image?.variants?.length > 0)
                ? genSrcSet(image)
                : null
            }
            sizes={genImgBreakpoints({
              xs: 100,
              sm: 100,
              md: 100,
              lg: 100,
              xl: 100,
            })}
          />
        }
        {
          loading &&
          showLoadingBar &&
          <LoadingBar
            absoluteTop
            color={Colors.magenta}
            height={4}
            width={'100vw'}
            loading={true}
          />
        }
      </CardActionArea>
    </Card>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  previewItem?: Product_Preview_Items;
  onClick?(a: any): void;
  carouselSize?: boolean;
  showLoadingBar?: boolean;
}

// const patternColor = alpha(Colors.black, 0.9);
// const backgroundColor = Colors.black;

const styles = (theme: Theme) => createStyles({
  card: {
    width: "100%",
    height: '100%',
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.slateGrey,
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
    }),
    boxShadow: "unset",
  },
  cardActionAreaWide: {
    height: '100%',
    display: "flex",
    flexDirection: "row",
  },
  cardActionAreaTall: {
    height: '100%',
    display: "flex",
    flexDirection: "row",
    // backgroundColor: backgroundColor,
  },
  cardMediaTall: {
    // width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  cardMediaWide: {
    width: "100%",
    height: "100%",
    // objectFit: "scale-down",
    objectFit: "cover",
  },
  cardMediaWide80: {
    width: "80px",
    height: '50px',
    objectFit: "cover",
  },
  cardImg: {
  },
});


export default withStyles(styles)( ThumbnailImage );

