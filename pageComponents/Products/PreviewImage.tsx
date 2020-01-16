import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { ProductPreviewItem } from "typings/gqlTypes";
import { genSrcSet } from "utils/files";
import Loading from "components/Loading";
import LoadingBar from "components/LoadingBar";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";




const PreviewImage: React.FC<ReactProps> = (props) => {

  const [imgLoaded, setImgLoaded] = React.useState(0);
  const {
    classes,
    previewItem,
    tabletSize = false,
  } = props;
  const image = option(previewItem).image();

  const portraitMode = option(image).original.heightInPixels()
                      > option(image).original.widthInPixels()

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Card className={classes.card}
      style={
        (tabletSize)
        ? {
            height: xsDown ? '100%' : 'calc(60vw)', // tablet sizes only, not mobile
            maxHeight: 'calc(0.625 * (680px - 2rem))',
          }
        : null
      }
    >
      <CardActionArea
        onClick={props.onClick}
        classes={{
          root: !portraitMode
            ? classes.cardActionAreaWide
            : classes.cardActionAreaTall
        }}
      >
        {
          option(image).original.id()
          ? <CardMedia
              component="img"
              classes={{
                media: !portraitMode
                  ? classes.cardMediaWide
                  : (xsDown && portraitMode)
                    ? clsx(classes.cardMediaTall, classes.cardImg)
                    : classes.cardMediaTall,
              }}
              onLoad={() => setImgLoaded(s => s + 1)}
              srcSet={genSrcSet(image)}
              src={option(image).original.url()}
              // title={image.title}
              // This is the image you click to open modal
            />
          : <LoadingBar absoluteTop
              color={Colors.magenta}
              height={4}
              width={375}
              loading={true}
            />
        }
        {
          !imgLoaded &&
          <LoadingBar absoluteTop
            color={Colors.magenta}
            height={4}
            width={375}
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
  tabletSize?: boolean;
}

// const patternColor = fade(Colors.black, 0.9);
// const backgroundColor = Colors.black;

const styles = (theme: Theme) => createStyles({
  card: {
    borderRadius: "1px",
    width: "100%",
    height: '100%',
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
    }),
    // backgroundColor: "#fefefe",
  },
  cardActionAreaWide: {
    height: '100%',
    display: "flex",
    flexDirection: "row",
    // backgroundColor: backgroundColor,
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23${patternColor}' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
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
  cardImg: {
  },
});


export default withStyles(styles)( PreviewImage );

