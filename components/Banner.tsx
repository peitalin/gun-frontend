import React from "react";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// CSS
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
import Image from "next/image";


const Banner: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <div className={clsx(
      classes.bannerContainer,
      props.className,
      // "fadeInFast"
    )}
      style={{
        height: props.height ? props.height : bannerHeight,
        ...props.bannerContainerStyles,
      }}
    >
      <ShowOnMobileOrDesktopSSR implementation="css" desktop>
        <BackgroundImage
          classes={classes}
          src={props.src}
          portraitMode={props.portraitMode}
          height={props.height ? props.height : bannerHeight}
          isMobile={false}
        />
      </ShowOnMobileOrDesktopSSR>
      <ShowOnMobileOrDesktopSSR implementation="css" mobile>
        <BackgroundImage
          classes={classes}
          src={props.src}
          portraitMode={props.portraitMode}
          height={props.height ? props.height : bannerHeight}
          isMobile={true}
        />
      </ShowOnMobileOrDesktopSSR>
      {
        props.renderBackgroundComponent &&
        props.renderBackgroundComponent()
      }
      {
        // dither is in front of renderBackgroundComponent
        props.dither &&
        <Dither
          classes={classes}
          // imgLoaded={imgLoaded > 0}
          ditherDark={props.ditherDark}
          ditherStyle={{
            ...props.ditherStyle,
            height: props.height ? props.height : bannerHeight
          }}
        />
      }
      <div className={clsx(
        props.classes.bannerTitlebox,
        // props.classes.maxWidth
      )}
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
  { classes, src, height, title, isMobile, portraitMode }: BackgroundImageProps
) => {

  if (src) {
    return (
      // <img
      //   className={classes.bannerBackground}
      //   style={{
      //     width: portraitMode ? '100%' : 'unset',
      //     height: isMobile ? "unset" : "100%",
      //     // image to always fill screen on desktop
      //     minWidth: isMobile ? "unset" : 1160,
      //     top: 0,
      //     left: 0,
      //   }}
      //   // onLoad={() => setImgLoaded(s => s + 1)}
      //   src={src}
      // />
      <Image
        className={clsx(
          "fadeIn",
          classes.bannerBackground
        )}
        alt={title}
        layout={"fill"}
        objectFit={"cover"}
        // onLoad={() => setLoaded(true)}
        src={src}
      />
    )
  } else {
    return (
      <div
        className={classes.bannerBackground}
        style={{
          height: isMobile
            ? 'unset'
            : height
              ? height
              : bannerHeight,
          width: isMobile ? '100%' : 'unset',
          // image to always fill screen on desktop
          minWidth: isMobile ? "unset" : 1160,
          top: 0,
          left: 0,
        }}
      />
    )
  }
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
  src: string;
  portraitMode: boolean;
  height: string | number;
  isMobile: boolean;
  title?: string;
}
interface DitherProps extends WithStyles<typeof styles> {
  imgLoaded?: boolean;
  ditherDark?: boolean;
  ditherStyle?: any;
}
interface ReactProps extends WithStyles<typeof styles> {
  className?: any;
  titleStyle?: any;
  ditherStyle?: any;
  portraitMode?: boolean;
  color?: string;
  src?: string;
  dither?: boolean;
  ditherDark?: boolean;
  height?: number;
  bannerContainerStyles?: any;
  renderBackgroundComponent?: () => React.ReactNode;
}

const bannerHeight = 280;

const styles = (theme: Theme) => createStyles({
  bannerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  maxWidth: {
    maxWidth: 'calc(1160px + 2rem)', // 2rem offset for paddingwhen screen
    // size is less than 1160px (so banner heading has a left margin)
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
    // width: '100%',
    // filter: 'grayscale(1)',
  },
  dither: {
    position: 'absolute',
    width: '100%',
    // height: bannerHeight,
    background: 'rgba(0,0,0,0.5)',
    bottom: 0,
  },
  ditherLinearGradient: {
    position: 'absolute',
    width: '100%',
		// height: bannerHeight,
    bottom: 0,
    // background: 'linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0))',
  },
});

export default withStyles(styles)( Banner );
