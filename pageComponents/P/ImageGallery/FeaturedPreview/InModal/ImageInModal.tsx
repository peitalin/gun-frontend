import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
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
  const image = option(previewItem).image();

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"));

  let loading = (!imgLoaded || !previewItem);

  React.useEffect(() => {
    // React BUG: all event fired before hydration are lost.
    // https://github.com/facebook/react/issues/15446
    if (option(image).original.url() && imgLoaded === 0) {
      setImgLoaded(1)
    }
    return () => {}
  }, [])

  return (
    <div className={classes.card}>
      <div onClick={props.onClick}
        className={clsx(
          classes.cardActionAreaWide
        )}
      >
        {
          option(image).original.url() &&
          <img
            // component="img"
            className={clsx(
              // loading ? 'shimmer' : null,
              classes.cardMediaWide
            )}
            onLoad={() => setImgLoaded(s => s + 1)}
            srcSet={
              (option(image).variants([]).length > 0)
                ? genSrcSet(image)
                : null
            }
            src={option(image).original.url()}
            sizes={genImgBreakpoints({
              xs: 600,
              sm: 600,
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
            color={Colors.gradientUniswapBlue1}
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
    borderRadius: "1px",
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
    // backgroundColor: backgroundColor,
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23${patternColor}' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
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

