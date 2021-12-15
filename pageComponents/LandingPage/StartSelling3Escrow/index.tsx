import React from "react";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BoxShadows, isThemeDark } from "layout/AppTheme";
import { commonStyles } from "../commonStyles";
// components
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import lottie from "lottie-web";


const StartSelling3Escrow = (props: ReactProps) => {

  const { classes } = props;
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'));

  let [animDesktop, setAnimDesktop] = React.useState(undefined)
  let [animMobile, setAnimMobile] = React.useState(undefined)

  React.useEffect(() => {
    if (document) {

      if (mdDown && !animMobile) {
        let animation = lottie.loadAnimation({
          container: document?.getElementById('escrow-blue-anim-mobile'), // Required
          path: 'escrow-blue-mobile.json', // Required
          renderer: 'svg', // Required
          loop: true, // Optional
          autoplay: true, // Optional
          name: "Gun Marketplace Escrow", // Name for future reference. Optional.
        })
        setAnimMobile(animation)
        console.log("animation mobile: ", animation)
      }

      if (!mdDown && !animDesktop) {
        let animation = lottie.loadAnimation({
          container: document?.getElementById('escrow-blue-anim-desktop'), // Required
          path: 'escrow-blue.json', // Required
          renderer: 'svg', // Required
          loop: true, // Optional
          autoplay: true, // Optional
          name: "Gun Marketplace Escrow", // Name for future reference. Optional.
        })
        setAnimDesktop(animation)
        console.log("animation desktop: ", animation)
      }
    }
  }, [mdDown])


  return (
    <div className={clsx(
      // props.isDarkMode
      //   ? "background-uniswap-dark"
      //   : "background-slate-grey",
      classes.section3Root,
      classes.flexRow
    )}>
      <div className={clsx(classes.section3)}>

        <ShowOnMobileOrDesktopSSR desktop className={classes.width100}>
          <Typography className={classes.title}>
            Buy and Sell in 4 steps
          </Typography>
        </ShowOnMobileOrDesktopSSR>
        <ShowOnMobileOrDesktopSSR mobile className={classes.width100}>
          <Typography className={classes.titleMobile}>
            Buy and Sell in 4 steps
          </Typography>
        </ShowOnMobileOrDesktopSSR>

        {/* width100 on desktop, or else zoom resizes svgs */}
        <ShowOnMobileOrDesktopSSR desktop className={classes.width100}>
          <div className={clsx(classes.flexRow, classes.flexWrap)}>

            <div
              style={{
                width: '100%',
                marginTop: '2rem',
                marginBottom: '4rem',
                maxWidth: 800,
                fontWeight: 700,
              }}
              id={"escrow-blue-anim-desktop"}
            />

          </div>
        </ShowOnMobileOrDesktopSSR>

        {/* no width100 on mobile */}
        <ShowOnMobileOrDesktopSSR mobile>
          <div className={clsx(classes.flexCol, classes.flexWrap)}>
            <div
              style={{
                minWidth: 580,
                borderRadius: '16px',
                fontWeight: 700,
                marginTop: '1rem',
                marginBottom: '4rem',
              }}
              id={"escrow-blue-anim-mobile"}
            />
          </div>
        </ShowOnMobileOrDesktopSSR>

      </div>
    </div>
  );
};


interface ReactProps extends WithStyles<typeof styles> {
  isDarkMode: boolean
}

export const styles = (theme: Theme) => createStyles({
  section3Root: {
    width: '100%',
    ...commonStyles(theme).border2,
  },
  section3: {
    width: '100%',
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapNavy
      : Colors.cream,
    backgroundImage: isThemeDark(theme)
      ? `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231f2a3e' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3C/g%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23dddddd' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='12' cy='12' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
    // URL encodings:
    // %3C = <
    // %3E = >
    // so that "/%3E%3C/g%3E%3C/svg%3E" is actually: /></g></svg>
    ///// original
    // backgroundImage: isThemeDark(theme)
    //   ? `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231f2a3e' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='6' cy='6' r='6'/%3E%3Ccircle cx='26' cy='26' r='6'/%3E%3C/g%3E%3C/svg%3E")`
    //   : `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e6e7ec' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='6' cy='6' r='2'/%3E%3Ccircle cx='26' cy='26' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    // backgroundColor: isThemeDark(theme)
    //   ? Colors.uniswapNavy
    //   : Colors.cream,
    fontSize: "2.25rem",
    fontWeight: 600,
    textAlign: "center",
    paddingTop: "8rem",
    paddingBottom: "0rem",
    color: theme.palette.mode === 'dark'
      ? `${Colors.uniswapLightGrey}`
      : `${Colors.slateGreyBlack}`,
    // borderRadius: '16px',
    // borderBottom: isThemeDark(theme)
    //   ? `2px solid ${Colors.uniswapLightNavy}`
    //   : `2px solid ${Colors.slateGrey}`,
  },
  titleMobile: {
    fontSize: "1.75rem",
    fontWeight: 600,
    textAlign: "center",
    paddingTop: "4rem",
    padding: '0rem 1rem',
    // backgroundColor: isThemeDark(theme)
    //   ? Colors.uniswapNavy
    //   : Colors.cream,
    color: theme.palette.mode === 'dark'
      ? `${Colors.uniswapLightGrey}`
      : `${Colors.slateGreyBlack}`,
    // borderBottom: isThemeDark(theme)
    //   ? `2px solid ${Colors.uniswapLightNavy}`
    //   : `2px solid ${Colors.slateGrey}`,
  },
  flexRow:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    overflow: 'hidden',
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  flexCol:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  flexItem: {
    flexBasis: '45%',
  },
  minWidth: {
    minWidth: 450,
  },
  minWidthMobile: {
    minWidth: 350,
  },
  imageContainer: {
    margin: '2rem',
  },
  imageContainerMobile: {
    padding: "1rem",
  },
  imgShadow: {
    boxShadow: BoxShadows.shadowStart.boxShadow,
    borderRadius: "8px",
  },
  reasonContainer: {
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: '1rem',
  },
  reasonRow: {
    marginBottom: '2rem',
  },
  reason: {
    fontSize: '1.125rem',
    fontWeight: 500,
    color: theme.palette.mode === 'dark'
      ? `${Colors.uniswapLightestGrey}`
      : `${Colors.slateGreyBlack}`,
  },
  reasonMobile: {
    fontSize: '1.125rem',
    fontWeight: 500,
    color: theme.palette.mode === 'dark'
      ? `${Colors.uniswapLightestGrey}`
      : `${Colors.slateGreyBlack}`,
  },
  bulletSize: {
    minWidth: 32,
    minHeight: 32,
  },
  bulletSizeMobile: {
    minWidth: 32,
    minHeight: 32,
  },
  numberBullet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "50%",
    color: Colors.cream,
    fontSize: "1rem",
    fontWeight: 600,
    background: theme.palette.mode === 'dark'
      ? Colors.purple
      : Colors.blue,
    border: theme.palette.mode === 'dark'
      ? `3px solid ${Colors.uniswapNavy}`
      : `3px solid ${Colors.slateGrey}`,
    marginRight: '1rem',
  },
  width100: {
    width: '100%',
  },
})


export default withStyles(styles)(StartSelling3Escrow);
