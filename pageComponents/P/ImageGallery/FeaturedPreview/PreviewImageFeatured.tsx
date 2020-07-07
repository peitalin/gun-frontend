import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { ProductPreviewItem } from "typings/gqlTypes";
import { genSrcSet, genImgBreakpoints } from "utils/images";
import Loading from "components/Loading";
import LoadingBar from "components/LoadingBar";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { lgUpMediaQuery } from "../../common";



const PreviewImageFeatured: React.FC<ReactProps> = (props) => {

  const [imgLoaded, setImgLoaded] = React.useState(0);
  const {
    classes,
    previewItem,
    showLoadingBar = false,
  } = props;
  const image = option(previewItem).image();

  // const portraitMode = option(image).original.heightInPixels()
  //                     > option(image).original.widthInPixels()

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"));
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const lgUp = useMediaQuery(lgUpMediaQuery);

  let loading = (!imgLoaded || !previewItem);

  React.useEffect(() => {
    // React BUG: all event fired before hydration are lost.
    // https://github.com/facebook/react/issues/15446
    if (option(image).original.url() && imgLoaded === 0) {
      setTimeout(() => {
        setImgLoaded(1)
      }, 0)
    }
    return () => {}
  }, [])


  const chooseCardMediaStyle = () => {
    if (lgDown || !lgUp) {
      return !!urlSrc
        ? classes.cardMediaWideLgDown
        : classes.cardMediaWideLgDownLoading
    } else {
      return !!urlSrc
        ? classes.cardMediaWide
        : classes.cardMediaWideLoading
    }
  }

  let urlSrc = option(image).original.url();

  return (
    <Card
      className={classes.card}
      elevation={0} // remove box-shadow
    >
      <CardActionArea
        onClick={props.onClick}
        classes={{
          root: chooseCardMediaStyle()
        }}
      >
        {
          option(image).original.url() &&
          <CardMedia
            component="img"
            // className={!loading ? 'shimmer' : null}
            classes={{
              media: chooseCardMediaStyle()
            }}
            onLoad={() => setImgLoaded(s => s + 1)}
            src={urlSrc}
            srcSet={
              (option(image).variants([]).length > 0)
                ? genSrcSet(image)
                : null
            }
            sizes={genImgBreakpoints({
              xs: 600,
              sm: 600,
              md: 600,
              lg: 800,
              xl: 1200,
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
  previewItem?: ProductPreviewItem;
  onClick?(a: any): void;
  showLoadingBar?: boolean;
}

// const patternColor = fade(Colors.black, 0.9);
// const backgroundColor = Colors.black;

const styles = (theme: Theme) => createStyles({
  card: {
    borderRadius: "4px",
    height: '100%',
    width: '100%',
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
    }),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardActionAreaWide: {
    height: '100%',
    width: '100%',
    display: "flex",
    flexDirection: "row",
  },
  cardActionAreaTall: {
    height: '100%',
    width: '100%',
    display: "flex",
    flexDirection: "row",
  },
  cardMediaTall: {
    height: "100%",
    width: '100%',
    objectFit: "scale-down",
  },
  cardMediaWide: {
    height: '100%',
    objectFit: "scale-down",
    backgroundColor: Colors.black,
  },
  cardMediaWideLgDown: {
    height: '100%',
    objectFit: "scale-down",
    backgroundColor: Colors.black,
  },
  cardMediaWideLoading: {
    height: '100%',
    objectFit: "scale-down",
    backgroundColor: Colors.lightestGrey,
  },
  cardMediaWideLgDownLoading: {
    height: '100%',
    objectFit: "scale-down",
    backgroundColor: Colors.lightestGrey,
  },
});


export default withStyles(styles)( PreviewImageFeatured );

