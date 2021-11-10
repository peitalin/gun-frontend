import React from "react";
// Styles
import clsx from 'clsx';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Colors, Gradients, isThemeDark, BorderRadius4x } from "layout/AppTheme";
import Typography from '@material-ui/core/Typography';
// Social Icons
import Discord from 'components/Icons/Discord';
import Github from 'components/Icons/Github';
import Facebook from 'components/Icons/Facebook';
import Instagram from 'components/Icons/Instagram';
import Twitter from 'components/Icons/Twitter';
import YouTube from 'components/Icons/YouTube';
import Pinterest from 'components/Icons/Pinterest';
import Link from "next/link";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Tooltip from "@material-ui/core/Tooltip";
import { DISCORD_LINK } from 'utils/links'




const SocialFloatingBanner: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const theme = useTheme();
  const isDark = isThemeDark(theme)
  const color = isDark ? Colors.uniswapLightGrey : Colors.slateGreyDarkest

  return (
    <div className={classes.rootSocialFloatingBanner}>
      <div className={classes.socialInnerBar}>

        <div className={classes.beta}>
          v1.7
        </div>

        <Tooltip title={"Join our Discord chat"} placement={"top"}>
          <div className={classes.iconBox}>
            <a className={classes.link} target={"_blank"}
              href={DISCORD_LINK}
            >
              <Discord color={color}/>
            </a>
          </div>
        </Tooltip>

        <Tooltip title={"FAQ and Documentation"} placement={"top"}>
          <div className={classes.iconBox}>
            <a className={classes.link} target={"_blank"}
              href={"https://docs.gunmarketplace.com.au"}
            >
              <Github color={color}/>
            </a>
          </div>
        </Tooltip>

        <Tooltip title={"Facebook"} placement={"top"}>
          <div className={classes.iconBox}>
            <a className={classes.link} target={"_blank"}
              href={"https://www.facebook.com/gunmarketplace"}
            >
              <Facebook
                size={24}
                color={color}
              />
            </a>
          </div>
        </Tooltip>

        {/* <Tooltip title={"Instagram"} placement={"top"}>
          <div className={classes.iconBox}>
            <a className={classes.link} target={"_blank"}
              href={"https://www.instagram.com/gunmarketplace"}
            >
              <Instagram
                size={24}
                color={color}
              />
            </a>
          </div>
        </Tooltip> */}

        <Tooltip title={"Twitter"} placement={"top"}>
          <div className={classes.iconBox}>
            <a className={classes.link} target={"_blank"}
              href={"https://twitter.com/gunmarketplace"}
            >
              <Twitter color={color} />
            </a>
          </div>
        </Tooltip>

      </div>
    </div>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
}


const styles = (theme: Theme) => createStyles({
  rootSocialFloatingBanner: {
    zIndex: 2,
    width: '100%',
    display: 'flex',
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "fixed",
    bottom: '1.2rem',
    paddingRight: '6rem',
  },
  socialInnerBar: {
    // dydx
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDark}`,
    backdropFilter: 'blur(30px)',
    padding: '1rem',
    display: 'flex',
    boxAlign: 'center',
    alignItems: 'center',
    boxPack: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius4x,
  },
  link: {
    fontSize: '1rem',
  },
  beta: {
    color: Colors.uniswapLightestGrey,
    fontSize: '0.8rem',
    marginRight: "0.25rem",
  },
  iconBox: {
    width: 24,
    height: 24,
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    transition: "transform 0.3s ease-in-out 0s",
    "&:hover": {
      transform: "rotate(4deg) translateY(-3px) scale(1.3)",
      transition: "transform 0.3s ease-in-out 0s",
    },
  },
})


export default withStyles(styles)( SocialFloatingBanner );
