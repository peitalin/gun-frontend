import React from "react";
// Styles
import clsx from 'clsx';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Colors, Gradients } from "layout/AppTheme";

import Typography from '@material-ui/core/Typography';
// Icons
import Visa from 'components/Icons/Visa';
import Mastercard from 'components/Icons/Mastercard';
import Paypal from 'components/Icons/Paypal';
import ApplePay from 'components/Icons/ApplePay';
import GooglePay from 'components/Icons/GooglePay';
import Amex from 'components/Icons/Amex';
import LogoCircle from "components/Icons/LogoCircle";
// Social Icons
import Facebook from 'components/Icons/Facebook';
import Instagram from 'components/Icons/Instagram';
import Twitter from 'components/Icons/Twitter';
import YouTube from 'components/Icons/YouTube';
import Pinterest from 'components/Icons/Pinterest';
import { goToModalConnect } from "utils/modals";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from 'reduxStore/grand-reducer';
import Link from "next/link";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// // Analytics
// import { analyticsEvent } from "utils/analytics";

// // ENV variables
// import getConfig from 'next/config'
// let cfg = getConfig();
// let GATEWAY_GRAPHQL_URL = cfg?.publicRuntimeConfig?.GATEWAY_GRAPHQL_URL
// let GATEWAY_GRAPHQL_WS_URL = cfg?.publicRuntimeConfig?.GATEWAY_GRAPHQL_WS_URL
// let SERVER_GATEWAY_GRAPHQL_URL = cfg?.publicRuntimeConfig?.SERVER_GATEWAY_GRAPHQL_URL
// let GATEWAY_GRAPHQL_URL="https://api.gunmarketplace.com.au/gateway/graphql"
// let GATEWAY_GRAPHQL_WS_URL="wss://api.gunmarketplace.com.au/v1/graphql"
// let SERVER_GATEWAY_GRAPHQL_URL="https://api.gunmarketplace.com.au/gateway/graphql"

let ENVS = JSON.stringify(process.env)


// for printing testing only
const URI = process.env.GATEWAY_GRAPHQL_URL;
const SERVER_URI = process.env.SERVER_GATEWAY_GRAPHQL_URL;
const WS_URI = process.env.GATEWAY_GRAPHQL_WS_URL;
// const URI = GATEWAY_GRAPHQL_URL;
// const SERVER_URI = SERVER_GATEWAY_GRAPHQL_URL;
// const WS_URI = GATEWAY_GRAPHQL_WS_URL;


const Footer: React.FC<ReactProps> = (props) => {

  const dispatch = useDispatch();
  const goToModal = goToModalConnect(dispatch);
  const { classes } = props;
  const d = new Date();
  const year = d.getUTCFullYear()

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <footer>
      {props.children}
      <div className={classes.footerContainer}>
        <div className={classes.footerSubsection}>
          <div className={classes.firstBlock}>

            <div className={clsx(
              classes.flexColWide,
              classes.marginBottom2,
            )}>
              <div className={clsx(
                classes.title,
                mdDown ? classes.textAlignCenter : null,
              )}>
                <LogoCircle />
              </div>
              {/* <Typography variant="body2"
                className={clsx(
                  classes.subtitle,
                  mdDown ? classes.textAlignCenter : null
                )}
              >
                Supporting arms trade
              </Typography> */}
            </div>


            <div className={classes.flexRow}>
              <div className={classes.flexColItem}>

                <Link href={'/start'} prefetch={false}>
                  <a className={classes.link}>
                    <Typography variant="body2" className={classes.linkText}>
                      Create a Store
                    </Typography>
                  </a>
                </Link>
                <Link href={'/affiliates'} prefetch={false}>
                  <a className={classes.link}>
                    <Typography variant="body2" className={classes.linkText}>
                      Affiliate Program
                    </Typography>
                  </a>
                </Link>
                <Link href={"/contact-us"} prefetch={false}>
                  <a className={classes.link}>
                    <Typography variant="body2" className={classes.linkText}>
                      Contact Us
                    </Typography>
                  </a>
                </Link>
                <a
                  className={classes.link}
                  // href='https://help.relay.shop/hc/en-us'
                  target="_blank"
                >
                  <Typography variant="body2" className={classes.linkText}>
                    FAQ
                  </Typography>
                </a>
              </div>

              <div className={classes.flexColItem}>
                <a
                  // href={'https://help.relay.shop/hc/en-us/articles/360036185952-Refund-Policy'}
                  className={classes.link}
                  target={"_blank"}
                  // onClick={() => analyticsEvent("View.RefundPolicy")}
                >
                  <Typography variant="body2" className={classes.linkText}>
                    Refund Policy
                  </Typography>
                </a>
                <a
                  // href={'https://help.relay.shop/hc/en-us/articles/360038530771-Terms-of-Service'}
                  className={classes.link}
                  target={"_blank"}
                  // onClick={() => analyticsEvent("View.Terms")}
                >
                  <Typography variant="body2" className={classes.linkText}>
                    Terms of Service
                  </Typography>
                </a>
                <a
                  // href={'https://help.relay.shop/hc/en-us/articles/360038152632-Privacy-Policy'}
                  className={classes.link}
                  target={"_blank"}
                  // onClick={() => analyticsEvent("View.Privacy")}
                >
                  <Typography variant="body2" className={classes.linkText}>
                    Privacy Policy
                  </Typography>
                </a>

                <div className={classes.link}>
                  <Typography variant="body2" className={classes.linkText}>
                    {`GATEWAY_GRAPHQL_URL: ${URI}`}
                  </Typography>
                </div>
                <div className={classes.link}>
                  <Typography variant="body2" className={classes.linkText}>
                    {`SERVER_URI: ${SERVER_URI}`}
                  </Typography>
                </div>
                <div className={classes.link}>
                  <Typography variant="body2" className={classes.linkText}>
                    {`WS_URI: ${WS_URI}`}
                  </Typography>
                </div>
                <div className={classes.link}>
                  <Typography variant="body2" className={classes.linkText}>
                    {`process.env: ${ENVS}`}
                  </Typography>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className={classes.footerSubsection}>
          <div className={classes.thirdBlock}>
            <div className={clsx(
              classes.siteFooterCredits,
              mdDown ? classes.siteFooterCreditsCenter : classes.siteFooterCreditsSpaceBetween,
              smDown ? classes.textAlignCenter : null,
            )}>
              <Typography variant="body2" className={clsx(
                classes.linkText,
                classes.fontSize09,
              )}>
                { `© ${year} Gunmarketplace. All rights reserved.` }
              </Typography>
              <PaymentIcons/>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// const SocialIcons = (props) => {
//   const { classes } = props;
//   return (
//     <div className={classes.socialIcons}>
//       <div className={classes.socialIconsItem}>
//         <Instagram size={30}/>
//       </div>
//         <div className={classes.socialIconsItem}>
//         <Facebook size={30}/>
//       </div>
//       <div className={classes.socialIconsItem}>
//         <Twitter size={30}/>
//       </div>
//       <div className={classes.socialIconsItem}>
//         <Pinterest size={30}/>
//       </div>
//       <div className={classes.socialIconsItem}>
//         <YouTube height={30} width={30}/>
//       </div>
//     </div>
//   )
// }


interface ReactProps extends WithStyles<typeof styles> {
}

const FOOTER_MAX_WIDTH = 1024;
const styles = (theme: Theme) => createStyles({
  footerContainer: {
    bottom: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // background: Gradients.gradientUniswapDark.background,
    // backgroundColor: Colors.uniswapDarkNavy,
    backgroundColor: Colors.mediumBlack,
    paddingTop: "4rem",
    color: Colors.cream,
  },
  title: {
    color: Colors.cream,
    fontWeight: 400,
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: Colors.cream,
    fontWeight: 400,
    fontSize: '0.9rem',
  },
  footerSubsection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '0 10%',
  },
  firstBlock: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: FOOTER_MAX_WIDTH,
    width: '100%',
    textAlign: 'left',
    marginBottom: "3rem",
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexBasis: '33%',
    // margin: '0rem 0rem 2rem 0rem',
  },
  flexColItem: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: '45%',
    marginLeft: '1rem',
    minWidth: 130,
    // margin: '0rem 0rem 2rem 0rem',
  },
  flexColWide: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: '50%',
    minWidth: 350,
    // margin: '0rem 0rem 2rem 0rem',
  },
  narrow: {
    minWidth: "140px",
  },
  wide: {
    minWidth: "200px",
  },
  widest: {
    flexBasis: '25%',
    minWidth: "200px",
  },
  secondBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    maxWidth: FOOTER_MAX_WIDTH,
    width: '100%',
    marginBottom: '2rem',
  },
  thirdBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    maxWidth: FOOTER_MAX_WIDTH,
    width: '100%',
    marginBottom: '2rem',
  },
  siteFooterCredits: {
    marginBottom: 0,
    width: '100%',
    borderTop: `1px solid ${Colors.charcoal}`,
    color: Colors.mediumGrey,
    display: 'flex',
    flexDirection: "row",
    flexWrap: 'wrap',
    padding: '0.5rem',
    paddingTop: '1rem',
  },
  siteFooterCreditsSpaceBetween: {
    justifyContent: 'space-between',
  },
  siteFooterCreditsCenter: {
    justifyContent: 'center',
  },
  socialIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIconsItem: {
    display: 'inlineblock',
    fontSize: '0.8em',
    verticalAlign: 'top',
    marginLeft: '0.25rem',
  },
  downloadIcon: {
    height: '44px',
    marginRight: '1rem',
    border: "1px solid #888888",
    borderRadius: "4px",
  },
  link: {
    marginBottom: '1rem',
  },
  linkText: {
    fontWeight: 500,
    fontSize: '0.9rem',
    lineHeight: '1rem',
    color: Colors.mediumGrey,
    textDecoration: 'none',
    '&:hover': {
      color: Colors.lightGrey,
      cursor: 'pointer',
    }
  },
  textAlignCenter: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontSize09: {
    fontSize: '0.9rem',
    marginBottom: "1rem",
  },
  marginBottom2: {
    marginBottom: '4rem',
  },
})

export const PaymentIcons = withStyles(styles)(({ classes }: ReactProps) => {
  return (
    <div className={classes.socialIcons}>
      <div className={classes.socialIconsItem}>
        <Visa/>
      </div>
        <div className={classes.socialIconsItem}>
        <Mastercard/>
      </div>
    </div>
  )
})

export default withStyles(styles)( Footer );
