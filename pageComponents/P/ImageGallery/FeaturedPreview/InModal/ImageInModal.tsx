import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
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



const ImageInModal: React.FC<ReactProps> = (props) => {

  const [imgLoaded, setImgLoaded] = React.useState(0);

  const {
    classes,
    previewItem,
    showLoadingBar = false,
  } = props;

  const theme = useTheme();
  // const xsDown = useMediaQuery(theme.breakpoints.down("xs"));

  let loading = (!imgLoaded || !previewItem);

  React.useEffect(() => {
    // React BUG: all event fired before hydration are lost.
    // https://github.com/facebook/react/issues/15446
    if (image?.original?.url && imgLoaded === 0) {
      setImgLoaded(1)
    }
    return () => {}
  }, [])


  let image = previewItem?.image;
  // let urlSrc = image?.original?.url;
  // let srcSet = (image?.variants?.length > 0)
  //     ? genSrcSet(image)
  //     : null;

  // let imgSizes = genImgBreakpoints({
  //     xs: 400,
  //     sm: 600,
  //     md: 600,
  //     lg: 800,
  //     xl: 1200,
  // })

  return (
    <div className={classes.card}>
      <div onClick={props.onClick}
        className={clsx(
          classes.cardActionAreaWide
        )}
      >
        {
          image?.original?.url &&
          <img
            // component="img"
            className={clsx(
              // loading ? 'shimmer' : null,
              classes.cardMediaWide
            )}
            onLoad={() => setImgLoaded(s => s + 1)}
            srcSet={
              (image?.variants?.length > 0)
                ? genSrcSet(image)
                : null
            }
            src={image?.original?.url}
            sizes={genImgBreakpoints({
              xs: 400,
              sm: 400,
              md: 600,
              lg: 1200,
              xl: 1200,
            })}
          />
        }
        {
          loading &&
          showLoadingBar &&
          <LoadingBar
            absoluteTop
            color={Colors.blue}
            height={4}
            width={'100vw'}
            loading={true}
          />
        }
      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  previewItem?: Product_Preview_Items;
  onClick?(a: any): void;
  showLoadingBar?: boolean;
}

// const patternColor = fade(Colors.black, 0.9);
// const backgroundColor = Colors.black;

const styles = (theme: Theme) => createStyles({
  card: {
    borderRadius: 'unset',
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
    }),
    backgroundColor: "rgba(0,0,0,0)",
    width: "100%",
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...cardDimensionsOuter
  },
  cardActionAreaWide: {
    // height: '100%',
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    "&:hover $focusHighlight": {
      opacity: 0
    },
    ...cardDimensionsOuter
  },
  cardMediaWide: {
    objectFit: "scale-down",
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
  compareSlider: {
    width: "100%",
  },
});

const cardDimensionsOuter = {
  maxWidth: 960,
  maxHeight: 600,
}
const cardDimensions = {
  maxWidth: 960,
  maxHeight: 600,
}

export default withStyles(styles)( ImageInModal );

