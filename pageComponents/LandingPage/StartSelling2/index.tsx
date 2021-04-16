import React from "react";
import clsx from "clsx";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius3x } from "layout/AppTheme";
// components
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CategoryCarouselStart2 from "./CategoryCarouselStart2";
import CardMedia from "@material-ui/core/CardMedia";



const StartSelling2 = (props: ReactProps) => {

  const { classes, } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const xlUp = useMediaQuery(theme.breakpoints.up("xl"));

  return (
    <div className={classes.section2Root}>
      <div className={classes.categoryTitleText}>
        Choose from a selection of brands
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
      <div className={classes.categoryTitleText}>
        Across multiple categories
      </div>
      <CategoryCarouselStart2
        style={{
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
        categoriesPreviewCard={
          mdDown
          ? [
              ...categoryPreviewCards.slice(2),
              ...categoryPreviewCards.slice(0,2),
              // reorder so that Video Luts is in the middle on small screens
            ]
          : [
              ...categoryPreviewCards,
              ...categoryPreviewCards,
              ...categoryPreviewCards,
              // duplicate a few times over for large screens
            ]
        }
      />
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
    // borderTop: theme.palette.type === 'dark'
    //   ? `1px solid ${Colors.uniswapGrey}`
    //   : `1px solid ${Colors.slateGreyDarkest}`,
    // borderBottom: theme.palette.type === 'dark'
    //   ? `1px solid ${Colors.uniswapGrey}`
    //   : `1px solid ${Colors.slateGreyDarkest}`,
    backgroundColor: theme.palette.type === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.cream}`,
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
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black1A,
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
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
    background: theme.palette.type === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.cream}`,
    backgroundImage: theme.palette.type === 'dark'
    ? `radial-gradient(${Colors.uniswapMediumNavy} 10%, transparent 0), radial-gradient(${Colors.uniswapMediumNavy} 10%, transparent 0)`
    : `radial-gradient(${Colors.slateGrey} 10%, transparent 0), radial-gradient(${Colors.slateGrey} 10%, transparent 0)`,
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
})


export default withStyles(styles)(StartSelling2);
