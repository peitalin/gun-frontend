import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BoxShadows, isThemeDark } from "layout/AppTheme";
import { DISCORD_LINK } from 'utils/links'

// redux
import { GrandReduxState } from "reduxStore/grand-reducer";
import { useSelector, useDispatch } from "react-redux";

// Utils Components
import Tick from "components/Icons/Tick";
// MUI
import Typography from "@mui/material/Typography";
// Subcomponents
import { UserPrivate } from "typings/gqlTypes";
import IconButtonCancel from "components/IconButtonCancel";
import Link from "next/link";



const BetaTestingBannerDesktop: React.FC<ReactProps> = (props) => {

  const {
    classes,
    isDarkMode,
  } = props;

  const [showBetaTesting, setShowBetaTesting] = React.useState(true);
  const [hover, setHover] = React.useState(false);

  if (!showBetaTesting) {
    return <div></div>
  }

  return (
    <div
      className={clsx(
        classes.betaTestBannerRoot,
        classes.padding2,
        !showBetaTesting && classes.hideBanner
      )}
    >

      <div className={clsx(classes.rainbowBorder, classes.borderTop)}></div>
      <div className={clsx(classes.rainbowBorder, classes.borderBottom)}></div>

      {
        showBetaTesting &&
        <Typography variant="subtitle1"
          className={clsx(
            classes.maxWidthLg,
            classes.bannerTextBox,
          )}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Tick
            className={classes.tick}
            size={30}
            color={Colors.purple}
            outerCircleColor={Colors.purple}
            innerCircleColor={
              isDarkMode ? Colors.uniswapDarkNavy : Colors.white
            }
          />
          <span className={classes.betaTestBannerText}>
            { "We're currently in live beta testing." }
            <br/>
            <Link href={DISCORD_LINK}>
              <a className={hover ? classes.discordLink : null}>
                {"Please join our Discord for updates."}
              </a>
            </Link>
          </span>
        </Typography>
      }
      {
        showBetaTesting &&
        <IconButtonCancel
          className={classes.marginLeft}
          iconClassName={classes.purpleFillSvg}
          dark={isDarkMode}
          onClick={() => setShowBetaTesting(false)}
        />
      }
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  isDarkMode: boolean
}

const styles = (theme: Theme) => createStyles({
  betaTestBannerRoot: {
    position: "relative",
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: isThemeDark(theme)
      ? BoxShadows.shadowWhite2.boxShadow
      : BoxShadows.shadow5.boxShadow,
    background: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.white,
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
    height: 3,
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
  },
  marginLeft: {
    margin: '0.5rem',
  },
  purpleFillSvg: {
    fill: Colors.purple,
  },
});


export default withStyles(styles)(BetaTestingBannerDesktop);
