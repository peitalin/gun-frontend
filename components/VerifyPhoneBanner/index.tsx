import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, Gradients } from "layout/AppTheme";

import VerifyGunLicenseBannerDesktop from "./VerifyPhoneBannerDesktop";
import VerifyGunLicenseBannerMobile from "./VerifyPhoneBannerMobile";
import Hidden from "components/HiddenFix";

// redux
import { GrandReduxState } from "reduxStore/grand-reducer";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";



const VerifyGunLicenseBanner: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  return <>
    {/* Desktop */}
    <Hidden lgDown implementation="css">
      <VerifyGunLicenseBannerDesktop
        isDarkMode={isDarkMode}
      />
    </Hidden>
    {/* Mobile */}
    <Hidden lgUp implementation="css">
      <VerifyGunLicenseBannerMobile
        isDarkMode={isDarkMode}
      />
    </Hidden>
  </>;
}


interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  betaTestBannerRoot: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // borderTop: theme.palette.mode === 'dark'
    //   ? `2px solid ${Colors.uniswapLightNavy}`
    //   : `2px solid ${Colors.slateGreyDark}`,
    // borderBottom: theme.palette.mode === 'dark'
    //   ? `2px solid ${Colors.uniswapLightNavy}`
    //   : `2px solid ${Colors.slateGreyDark}`,
    // background: `linear-gradient(90deg, rgb(206, 69, 197) 0%, rgb(85, 146, 232) 100%)`,
    // borderBottom: '2px solid',
    // borderImageSlice: 1,
    // borderImageSource: theme.palette.mode === 'dark'
    //   ? `linear-gradient(90deg, rgb(206, 69, 197) 0%, rgb(85, 146, 232) 100%)`
    //   : `linear-gradient(90deg, rgb(206, 69, 197) 0%, rgb(85, 146, 232) 100%)`,
  },
  title: {
    marginBottom: '2rem',
    marginTop: '2rem',
  },
  bannerTextBox: {
    display: "flex",
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  betaTestBannerText: {
    "-webkit-text-fill-color": 'transparent',
    "-webkit-background-clip": 'text',
    background: `linear-gradient(90deg, rgb(206, 69, 197) 0%, rgb(85, 146, 232) 100%)`,
    display: "block", // gradient text does not work with safari when display: flex
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: "400ms",
    }),
  },
  discordLink: {
    // background: `linear-gradient(90deg, rgb(85, 146, 232) 0%, rgb(206, 69, 197) 100%)`,
    "-webkit-text-fill-color": 'transparent',
    "-webkit-background-clip": 'text',
    background: theme.palette.mode === 'dark'
      ? Colors.ultramarineBlue
      : Colors.ultramarineBlue,
  },
  rainbowBorder:{
    position: 'absolute',
    background: `linear-gradient(90deg, rgb(206, 69, 197) 0%, rgb(85, 146, 232) 100%)`,
    height: 2,
    width: '100%',
  },
  borderTop:{
    position: 'absolute',
    top: 0,
  },
  borderBottom:{
    position: 'absolute',
    bottom: 0,
  },
  padding2: {
    padding: '2rem',
    transition: theme.transitions.create('padding', {
      easing: theme.transitions.easing.sharp,
      duration: "400ms",
    }),
  },
  padding05: {
    padding: '1rem',
    transition: theme.transitions.create('padding', {
      easing: theme.transitions.easing.sharp,
      duration: "400ms",
    }),
  },
  maxWidthSm: {
    maxWidth: '340px',
    lineHeight: '1.33rem',
  },
  maxWidthLg: {
    maxWidth: '460px',
    lineHeight: '1.33rem',
  },
  tick: {
    marginRight: '1rem',
  },
  hideBanner: {
    padding: 0,
    height: 0,
    transition: theme.transitions.create(['height', 'padding'], {
      easing: theme.transitions.easing.sharp,
      duration: "400ms",
    }),
  }
});


export default withStyles(styles)(VerifyGunLicenseBanner);
