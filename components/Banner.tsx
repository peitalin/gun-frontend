import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
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
      <ShowOnMobileOrDesktopSSR desktop>
        <BackgroundImage
          classes={classes}
          src={props.src}
          portraitMode={props.portraitMode}
          height={props.height ? props.height : bannerHeight}
          isMobile={false}
        />
      </ShowOnMobileOrDesktopSSR>
      <ShowOnMobileOrDesktopSSR mobile>
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
    // height: bannerHeight,
    position: 'relative',
    overflow: 'hidden',
    // boxShadow: "0px 2px 5px -3px rgba(0,0,0,0.60)",
    // backgroundColor: theme.colors.uniswapDarkNavy,
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23e4e4e4' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
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
