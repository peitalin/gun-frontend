import React from "react";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import {
  Colors,
  BoxShadows,
  Gradients,
  BorderRadius,
  BorderRadius2x,
  isThemeDark
} from "layout/AppTheme";
// components
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CategoryCarouselStart2 from "./CategoryCarouselStart2";
import CardMedia from "@mui/material/CardMedia";
import { commonStyles } from "../commonStyles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AlignCenterLayout from "components/AlignCenterLayout";



const StartSelling2 = (props: ReactProps) => {

  const { classes, } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const xlUp = useMediaQuery(theme.breakpoints.up("xl"));

  return (
    <div className={mdDown ? classes.section2RootMobile : classes.section2Root}>

      <div className={classes.heresHowItWorksText}
        onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
      >
        <span>
          Here's how it works
        </span>
        <ExpandMoreIcon/>
      </div>

      <AlignCenterLayout maxWidth={640} withRecommendations={false}>


        <div className={classes.screenShotTitle}>
          Browse and filter guns across marketplaces
        </div>
        <div className={clsx(
          classes.screenShotBox,
          mdDown ? classes.screenShotBoxMobile : classes.screenShotBoxDesktop
        )}>
          <CardMedia
            component="img"
            classes={{
              media: clsx(
                mdDown ? classes.websiteMobile : classes.websiteDesktop,
                classes.website1,
                classes.imgShadow
              )
            }}
            src={"/img/start/screen7a.jpg"}
          />
          <CardMedia
            component="img"
            // className={classes.sxImage1}
            classes={{
              media: clsx(
                mdDown ? classes.websiteMobile : classes.websiteDesktop,
                classes.website2,
                classes.imgShadow
              )
            }}
            src={"/img/start/screen7b.jpg"}
          />
          <CardMedia
            component="img"
            // className={classes.sxImage1}
            classes={{
              media: clsx(
                mdDown ? classes.websiteMobile : classes.websiteDesktop,
                classes.website3,
                classes.imgShadow
              )
            }}
            src={"/img/start/screen7c.jpg"}
          />
          {
            props.isDarkMode
            ? <CardMedia
                component="img"
                className={"fadeIn"}
                classes={{ media: classes.screenShotImage }}
                // src={`/img/start/screen1-dark.jpg`}
                src={`/img/start/screen7-dark.jpg`}
              />
            : <CardMedia
                component="img"
                className={"fadeIn"}
                classes={{ media: classes.screenShotImage }}
                // src={`/img/start/screen1-light.jpg`}
                src={`/img/start/screen7-light.jpg`}
              />
          }
        </div>

        <div className={classes.categoryTitleText}>
          From a selection of brands
        </div>
        <div className={clsx(classes.categoryTitleBox)}>
          <div className={classes.polkadotBackground} ></div>
          <div className={classes.categoryBrands}>
            <div className={classes.imageBox}>
              <CardMedia
                component="img"
                // className={classes.sxImage1}
                classes={{ media: classes.imgCard }}
                src={
                  props.isDarkMode
                    ? "/img/start/brand-1-dark.png"
                    : "/img/start/brand-1-light.png"
                }
              />
            </div>
            <div className={classes.imageBox}>
              <CardMedia
                component="img"
                // className={classes.sxImage1}
                classes={{ media: classes.imgCard }}
                src={
                  props.isDarkMode
                    ? "/img/start/brand-2-dark.png"
                    : "/img/start/brand-2-light.png"
                }
              />
            </div>
            <div className={classes.imageBox}>
              <CardMedia
                component="img"
                // className={classes.sxImage1}
                classes={{ media: classes.imgCard }}
                src={
                  props.isDarkMode
                    ? "/img/start/brand-3-dark.png"
                    : "/img/start/brand-3-light.png"
                }
              />
            </div>
            <div className={classes.imageBox}>
              <CardMedia
                component="img"
                // className={classes.sxImage1}
                classes={{ media: classes.imgCard }}
                src={
                  props.isDarkMode
                    ? "/img/start/brand-4-dark.png"
                    : "/img/start/brand-4-light.png"
                }
              />
            </div>
          </div>
        </div>

      </AlignCenterLayout>
    </div>
  );
};


interface ReactProps extends WithStyles<typeof styles> {
  isDarkMode: boolean
}

let categoryPreviewCards = [
  {
    name: 'Handguns',
    imageUrl: "/img/categories-banner/handguns.jpg"
  },
  {
    name: 'Rifles',
    imageUrl: "/img/categories-banner/rifles.jpg"
  },
  {
    name: 'Shotguns',
    imageUrl: "/img/categories-banner/shotguns.jpg"
  },
  {
    name: 'Combinations',
    imageUrl: "/img/categories-banner/combinations.jpg"
  },
  {
    name: 'Pistols',
    imageUrl: "/img/categories-banner/handguns.jpg"
  },
  {
    name: 'Rifles',
    imageUrl: "/img/categories-banner/rifles.jpg"
  },
  {
    name: 'Shotguns',
    imageUrl: "/img/categories-banner/shotguns.jpg"
  },
  {
    name: 'Combinations',
    imageUrl: "/img/categories-banner/combinations.jpg"
  },
]



export const styles = (theme: Theme) => createStyles({
  section2Root: {
    paddingTop: '6rem',
    paddingBottom: '6rem',
    position: 'relative',
    ...commonStyles(theme).border1,
    background: isThemeDark(theme)
      ? Gradients.gradientUniswapDark2.background
      : Colors.cream,
  },
  section2RootMobile: {
    paddingTop: '6rem',
    paddingBottom: '6rem',
    position: 'relative',
    // backgroundColor: isThemeDark(theme)
    //   ? Colors.uniswapDarkNavy
    //   : Colors.cream,
    ...commonStyles(theme).border1,
    background: isThemeDark(theme)
      ? Gradients.gradientUniswapDark2.background
      : Colors.cream,
  },
  categoryTitleBox: {
    position: 'relative',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    fontSize: '1rem',
  },
  categoryTitleText: {
    display: 'flex',
    width: '100%',
    textAlign: 'center',
    flexDirection: "column",
    justifyContent: 'center',
    textTransform: "uppercase",
    fontSize: '0.8rem',
    fontWeight: 600,
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black1A,
    marginTop: '1.5rem',
    marginBottom: '0rem',
  },
  heresHowItWorksText: {
    position: 'absolute',
    "&:hover": {
      cursor: "pointer",
      color: Colors.ultramarineBlue
    },
    top: '1.5rem',
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    fontWeight: 700,
    fontSize: '1rem',
    marginBottom: '1rem',
    color: theme.palette.mode === 'dark'
      ? Colors.cream
      : Colors.black1A,
  },
  categoryBrands: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    width: '100%',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  polkadotBackground: {
    // background: `url(/img/bg-with-dotted.svg) no-repeat center/contain`,
    width: '100%',
    height: '100%',
    position: 'absolute',
    // polkadot
    // background: theme.palette.mode === 'dark'
    //   ? `${Colors.uniswapDarkNavy}`
    //   : `${Colors.cream}`,
    // backgroundImage: theme.palette.mode === 'dark'
    // ? `radial-gradient(${Colors.uniswapMediumNavy} 10%, transparent 0), radial-gradient(${Colors.uniswapMediumNavy} 10%, transparent 0)`
    // : `radial-gradient(${Colors.slateGrey} 10%, transparent 0), radial-gradient(${Colors.slateGrey} 10%, transparent 0)`,
    backgroundSize: "30px 30px",
    backgroundPosition: "0px 5px, 15px 20px",
  },
  imageBox: {
    height: '100%',
    width: "100%",
    flexBasis: '20%',
    maxWidth: 120,
    marginLeft: '1rem',
    marginRight: '1rem',
    filter: 'grayscale(1)',
  },
  imgCard: {
    height: '100%',
    minHeight: 68,
    width: "100%",
    objectFit: "contain",
  },
  screenShotBox: {
    position: 'relative',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: '100%',
    marginTop: "6.5rem",
  },
  screenShotBoxMobile: {
    marginTop: "4.5rem",
  },
  screenShotBoxDesktop: {
    marginTop: "6.5rem",
  },
  screenShotTitle: {
    display: 'flex',
    width: '100%',
    textAlign: 'center',
    flexDirection: "column",
    justifyContent: 'center',
    textTransform: "uppercase",
    fontSize: '0.8rem',
    fontWeight: 600,
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black1A,
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
  },
  screenShotImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: 'center',
    borderRadius: BorderRadius2x,
    width: '100%',
    height: '100%',
    maxWidth: 600,
    minWidth: 320,
    marginTop: '0rem',
    marginBottom: '1rem',
    // boxShadow: BoxShadows.shadowStart.boxShadow,
  },
  website1: {
    position: "absolute",
    top: '-6rem',
    left: '5%',
    transform: "rotate(-10deg)",
  },
  website2: {
    position: "absolute",
    top: '-6rem',
    left: '35%',
    transform: "rotate(-10deg)",
  },
  website3: {
    position: "absolute",
    top: '-6rem',
    left: '65%',
    transform: "rotate(-10deg)",
  },
  websiteMobile: {
    width: '100%',
    maxWidth: '30vw',
    marginTop: '2rem',
  },
  websiteDesktop: {
    width: '100%',
    maxWidth: 200,
  },
  imgShadow: {
    boxShadow: BoxShadows.shadowStart.boxShadow,
    zIndex: 4,
    borderRadius: BorderRadius,
  },
})


export default withStyles(styles)(StartSelling2);
