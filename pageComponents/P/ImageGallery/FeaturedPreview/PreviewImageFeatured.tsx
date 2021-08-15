import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Typings
import {
  Product_Preview_Items,
} from "typings/gqlTypes";
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

  const {
    classes,
    previewItem,
    showLoadingBar = false,
  } = props;

  const image = previewItem?.image;

  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const lgUp = useMediaQuery(lgUpMediaQuery);


  const chooseCardMediaStyle = () => {
    if (lgDown || !lgUp) {
      if (props.transitioning) {
        return !!urlSrc
          ? classes.cardMediaWideLgDown
          : classes.cardMediaWideLgDownLoadingDark
      } else {
        return !!urlSrc
          ? classes.cardMediaWideLgDown
          : classes.cardMediaWideLgDownLoading
      }
    } else {
      if (props.transitioning) {
        return !!urlSrc
          ? classes.cardMediaWide
          : classes.cardMediaWideLoadingDark
      } else {
        return !!urlSrc
          ? classes.cardMediaWide
          : classes.cardMediaWideLoading
      }
    }
  }

  let urlSrc = image?.original?.url;

  let srcSet = (image?.variants?.length > 0)
      ? genSrcSet(image)
      : null;

  let imgSizes = genImgBreakpoints({
      xs: 400,
      sm: 400,
      md: 400,
      lg: 600,
      xl: 600,
  })


  const [loaded, setLoaded] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if ((ref.current?.firstChild?.firstChild as HTMLImageElement | undefined)?.complete) {
      setLoaded(true)
    }
  }, [])

  // console.log("previewItem:", previewItem)
  // console.log("image:", image)
  // console.log("image src:", urlSrc)
  // console.log("image src after:", urlSrcAfter)

  return (
    <Card
      className={clsx(classes.card, props.className)}
      elevation={0} // remove box-shadow
    >
      <CardActionArea
        onClick={props.onClick}
        classes={{
          root: chooseCardMediaStyle()
        }}
      >
        {
          urlSrc &&
          <div className={classes.widthHeight100} ref={ref}>
            <CardMedia
              component="img"
              className={
                loaded ? 'fadeInFast' : 'hidden'
              }
              classes={{
                media: chooseCardMediaStyle(),
              }}
              onLoad={() => {
                if (process.browser) {
                  setLoaded(true)
                }
              }}
              src={urlSrc}
              srcSet={srcSet}
              sizes={imgSizes}
            />
          </div>
        }
        {
          !loaded &&
          showLoadingBar &&
          <LoadingBar
            absoluteTop
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
  previewItem?: Product_Preview_Items
  onClick?(a: any): void;
  showLoadingBar?: boolean;
  className?: any;
  transitioning?: boolean; // for when transition between slide images
  // and you want to show a black fade in
}

// const objectFit = 'contain';
// const objectFit = 'cover';
const objectFit1 = 'cover';
const objectFit = 'cover';

const styles = (theme: Theme) => createStyles({
  card: {
    borderRadius: 'unset',
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
  widthHeight100: {
    width: "100%",
    height: "100%",
  },
  cardActionAreaWide: {
    height: '100%',
    width: '100%',
    display: "flex",
    flexDirection: "row",
  },
  cardMediaWide: {
    height: '100%',
    objectFit: objectFit1,
  },
  cardMediaWideLgDown: {
    height: '100%',
    // objectFit: "contain",
    objectFit: objectFit,
  },
  cardMediaWideLoading: {
    height: '100%',
    // objectFit: "contain",
    objectFit: objectFit,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.slateGreyDark,
  },
  cardMediaWideLgDownLoading: {
    height: '100%',
    // objectFit: "contain",
    objectFit: objectFit,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.slateGreyDark,
  },
  cardMediaWideLoadingDark: {
    height: '100%',
    // objectFit: "contain",
    objectFit: objectFit,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.slateGreyDark,
  },
  cardMediaWideLgDownLoadingDark: {
    height: '100%',
    // objectFit: "contain",
    objectFit: objectFit,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.slateGreyDark,
  },
});


export default withStyles(styles)( PreviewImageFeatured );

