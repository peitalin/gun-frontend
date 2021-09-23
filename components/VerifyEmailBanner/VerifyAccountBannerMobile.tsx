import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, Gradients } from "layout/AppTheme";
import { DISCORD_LINK } from 'utils/links'

// Utils Components
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
// MUI
import IconButtonCancel from "components/IconButtonCancel";



const VerifyAccountBanner: React.FC<ReactProps> = (props) => {

  const {
    classes,
    isDarkMode,
  } = props;

  const [showVerifyAccount, setShowVerifyAccount] = React.useState(true);
  const [hover, setHover] = React.useState(false);

  if (!showVerifyAccount) {
    return <div></div>
  }

  return (
    <div
      className={clsx(
        classes.betaTestBannerRoot,
        classes.padding05,
        !showVerifyAccount && classes.hideBanner
      )}
    >

      <div className={clsx(classes.rainbowBorder, classes.borderTop)}></div>
      <div className={clsx(classes.rainbowBorder, classes.borderBottom)}></div>

      {
        showVerifyAccount &&
        <div className={clsx(
            classes.maxWidthSm,
            classes.bannerTextBox,
          )}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <ErrorOutlineIcon className={classes.exclamation}/>
          <span className={classes.betaTestBannerText}>
            Please verify your account. <br/>
            Email us at <br/>
            <a href={"mailto:admin@gunmarketplace.com.au"}
              // className={hover ? classes.discordLink : null}
              className={classes.emailLink}
            >
              {"admin@gunmarketplace.com.au"}
            </a>
            <br/>
            or dm a moderator in
            <a href={DISCORD_LINK}
              target={"_blank"}
              className={hover ? classes.discordLinkHover : classes.discordLink}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              discord.
            </a>
          </span>
        </div>
      }
      {
        showVerifyAccount &&
        <div className={classes.closeButtonMobile}>
          <IconButtonCancel
            dark={isDarkMode}
            onClick={() => setShowVerifyAccount(false)}
          />
        </div>
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
    background: theme.palette.type === "dark"
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    // borderTop: theme.palette.type === 'dark'
    //   ? `2px solid ${Colors.uniswapLightNavy}`
    //   : `2px solid ${Colors.slateGreyDark}`,
    // borderBottom: theme.palette.type === 'dark'
    //   ? `2px solid ${Colors.uniswapLightNavy}`
    //   : `2px solid ${Colors.slateGreyDark}`,
    // background: `linear-gradient(90deg, rgb(206, 69, 197) 0%, rgb(85, 146, 232) 100%)`,
    // borderBottom: '2px solid',
    // borderImageSlice: 1,
    // borderImageSource: theme.palette.type === 'dark'
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
    position: "relative",
  },
  betaTestBannerText: {
    fontSize: '16px',
    "-webkit-text-fill-color": 'transparent',
    "-webkit-background-clip": 'text',
    background: `linear-gradient(90deg, rgb(206, 69, 197) 0%, rgb(85, 146, 232) 100%)`,
    display: "block", // gradient text does not work with safari when display: flex
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: "400ms",
    }),
  },
  emailLink: {
    // background: `linear-gradient(90deg, rgb(85, 146, 232) 0%, rgb(206, 69, 197) 100%)`,
    "-webkit-text-fill-color": 'transparent',
    "-webkit-background-clip": 'text',
    background: theme.palette.type === 'dark'
      ? Colors.ultramarineBlue
      : Colors.ultramarineBlue,
    cursor: "pointer",
    marginRight: '0.25rem',
  },
  discordLink: {
    // background: `linear-gradient(90deg, rgb(85, 146, 232) 0%, rgb(206, 69, 197) 100%)`,
    "-webkit-text-fill-color": 'transparent',
    "-webkit-background-clip": 'text',
    background: theme.palette.type === 'dark'
      ? Colors.ultramarineBlue
      : Colors.ultramarineBlue,
    cursor: "pointer",
    marginLeft: '0.25rem',
  },
  discordLinkHover: {
    // background: `linear-gradient(90deg, rgb(85, 146, 232) 0%, rgb(206, 69, 197) 100%)`,
    "-webkit-text-fill-color": 'transparent',
    "-webkit-background-clip": 'text',
    background: theme.palette.type === 'dark'
      ? Colors.magenta
      : Colors.magenta,
    marginLeft: '0.25rem',
  },
  rainbowBorder:{
    position: 'absolute',
    background: `linear-gradient(90deg, rgb(206, 69, 197) 0%, rgb(85, 146, 232) 100%)`,
    height: 4,
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
  exclamation: {
    height: 30,
    width: 30,
    fill: 'rgb(206, 69, 197)', // nsure
    position: 'absolute',
    left: '-2.75rem',
    top: '1rem',
  },
  hideBanner: {
    padding: 0,
    height: 0,
    transition: theme.transitions.create(['height', 'padding'], {
      easing: theme.transitions.easing.sharp,
      duration: "400ms",
    }),
  },
  closeButtonMobile: {
    position: 'absolute',
    right: '1rem',
    top: 'calc(48px - 18px)', // bar is 96px, and icon is 36px high
    // so divide both by 50% and you'll get the center position
  },
});


export default withStyles(styles)(VerifyAccountBanner);
