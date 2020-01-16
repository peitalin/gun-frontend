import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";



const Banner: React.FC<ReactProps> = (props) => {

  // const [imgLoaded, setImgLoaded] = React.useState(0);
  const { classes } = props;

  // React.useEffect(() => {
  //   // increment imgLoaded to force re-render on client-side
  //   setImgLoaded(s => s + 1)
  // }, [])

  return (
    <div className={classes.bannerContainer}
      style={{
        height: props.height ? props.height : null
      }}
    >
      <BackgroundImage
        classes={classes}
        // imgLoaded={imgLoaded > 0}
        // setImgLoaded={() => setImgLoaded(s => s + 1)}
        src={props.src}
      />
      {
        props.dither &&
        <Dither
          classes={classes}
          // imgLoaded={imgLoaded > 0}
          ditherDark={props.ditherDark}
          ditherStyle={{
            ...props.ditherStyle,
            height: props.height ? props.height : null
          }}
        />
      }
      <div className={props.classes.bannerTitlebox}
        style={{
          ...props.titleStyle,
          color: props.color ? props.color : "#282828"
        }}
      >
        {props.children}
      </div>
    </div>
  )
}

const BackgroundImage = (
  { classes, src, imgLoaded, setImgLoaded }: BackgroundImageProps
) => {
  return (
    <img
      className={clsx(
        classes.bannerBackground,
      )}
      // onLoad={() => setImgLoaded(s => s + 1)}
      src={src}
    />
  )
}

const Dither = ({ classes, imgLoaded, ditherDark, ditherStyle }: DitherProps) => {
  return (
    <>
      <div
        className={clsx(classes.dither)}
        style={{
          background: ditherDark
            ? `linear-gradient(0deg, rgba(0,0,0,0.5) 10%, rgba(0,0,0,0) 70%)`
            : `linear-gradient(0deg, rgba(255,255,255,1) 10%, rgba(255,255,255,0) 70%)`,
          ...ditherStyle
        }}
      />
      <div
        className={clsx(
          classes.ditherLinearGradient,
        )}
        style={{
          background: ditherDark
            ? `linear-gradient(0deg, rgba(0,0,0,0.5) 10%, rgba(0,0,0,0) 70%)`
            : `linear-gradient(0deg, rgba(255,255,255,1) 10%, rgba(255,255,255,0) 70%)`,
          ...ditherStyle
        }}
      />
    </>
  )
}

interface BackgroundImageProps extends WithStyles<typeof styles> {
  src?: string;
  imgLoaded?: boolean;
  setImgLoaded?(fn: (s: number) => number): void;
}
interface DitherProps extends WithStyles<typeof styles> {
  imgLoaded?: boolean;
  ditherDark?: boolean;
  ditherStyle?: any;
}
interface ReactProps extends WithStyles<typeof styles> {
  titleStyle?: any;
  ditherStyle?: any;
  color?: string;
  src?: string;
  dither?: boolean;
  ditherDark?: boolean;
  height?: number;
}

const bannerHeight = 280;
const styles = (theme: Theme) => createStyles({
  bannerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: bannerHeight,
    position: 'relative',
    overflow: 'hidden',
    // boxShadow: "0px 2px 5px -3px rgba(0,0,0,0.60)",
    backgroundColor: '#fefefe',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23e4e4e4' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
  },
  bannerTitlebox: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    color: "#444444",
  },
  bannerBackground: {
    position: 'absolute',
    // image to always fill screen
    minWidth: 1080,
    width: '100%',
    // filter: 'grayscale(1)',
  },
  dither: {
    position: 'absolute',
    width: '100%',
    height: bannerHeight,
    background: 'rgba(0,0,0,0.5)',
  },
  ditherLinearGradient: {
    position: 'absolute',
    width: '100%',
		height: bannerHeight,
    bottom: 0,
    // background: 'linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0))',
  },
});

export default withStyles(styles)( Banner );
