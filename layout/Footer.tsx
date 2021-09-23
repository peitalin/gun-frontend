import React from "react";
// Styles
import clsx from 'clsx';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Colors, Gradients, isThemeDark } from "layout/AppTheme";
import { UserPrivate, Role } from "typings/gqlTypes";
import Typography from '@material-ui/core/Typography';
// Icons
import Visa from 'components/Icons/Visa';
import Mastercard from 'components/Icons/Mastercard';
// import Paypal from 'components/Icons/Paypal';
// import ApplePay from 'components/Icons/ApplePay';
// import GooglePay from 'components/Icons/GooglePay';
// import Amex from 'components/Icons/Amex';
import LogoCircle from "components/Icons/LogoCircle";
import { DISCORD_LINK } from 'utils/links'
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from 'reduxStore/grand-reducer';
import Link from "next/link";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AlignCenterLayout from "components/AlignCenterLayout";

// for printing testing only
const URI = process.env.GATEWAY_GRAPHQL_URL;
const SERVER_URI = process.env.SERVER_GATEWAY_GRAPHQL_URL;
const WS_URI = process.env.GATEWAY_GRAPHQL_WS_URL;
const NODE_ENV = process.env.NODE_ENV;
const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY




const Footer: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const d = new Date();
  const year = d.getUTCFullYear()

  const { user, isDarkMode } = useSelector<GrandReduxState, ReduxState>(state => {
    return {
      user: state.reduxLogin.user,
      isDarkMode: state.reduxLogin.darkMode === "dark"
    }
  })

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <footer className={classes.footerContainer}>
      <AlignCenterLayout
        maxWidth={1160}
        withRecommendations={false}
      >
        {props.children}
        <div className={classes.footerSubsection}>
          <div className={classes.firstBlock}>

            <div className={clsx(
              classes.flexColWide,
              classes.marginBottom2,
            )}>
              <div className={clsx(
                classes.title,
                // mdDown ? classes.textAlignCenter : classes.desktopLeftMargin,
              )}>
                <LogoCircle
                  color={isDarkMode ? Colors.cream : Colors.slateGreyDarkest}
                />
              </div>
            </div>


            <div className={classes.flexRow}>
              <div className={classes.flexColItem}>

                <Link href={'/create-store'} prefetch={false}>
                  <a className={classes.link}>
                    <Typography variant="body2" className={classes.linkText}>
                      Create a Store
                    </Typography>
                  </a>
                </Link>
                <Link href={DISCORD_LINK} prefetch={false}>
                  <a className={classes.link}>
                    <Typography variant="body2" className={classes.linkText}>
                      Contact Us
                    </Typography>
                  </a>
                </Link>
              </div>

              <div className={classes.flexColItem}>
                <Link href={'/help/firearm-registries'} prefetch={false}>
                  <a className={classes.link}>
                    <Typography variant="body2" className={classes.linkText}>
                      Firearm registries
                    </Typography>
                  </a>
                </Link>
                <Link href={'/help/terms'} prefetch={false}>
                  <a className={classes.link} >
                    <Typography variant="body2" className={classes.linkText}>
                      Terms of Service
                    </Typography>
                  </a>
                </Link>
                <Link href={'/help/privacy'} prefetch={false}>
                  <a className={classes.link}>
                    <Typography variant="body2" className={classes.linkText}>
                      Privacy Policy
                    </Typography>
                  </a>
                </Link>

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
                classes.allRightsReservedText,
                !mdDown && classes.desktopLeftMargin,
              )}>
                { `© ${year} Gun Marketplace. All rights reserved.` }
              </Typography>
              <PaymentIcons/>
            </div>
          </div>
        </div>

        {
          user?.userRole === Role.PLATFORM_ADMIN &&
          <div className={classes.footerSubsection}>
            <div className={classes.flexColApiLinks}>
              <div className={classes.apiLink}>
                <Typography variant="body2" className={classes.apiLinkHeading}>
                  {`GATEWAY_GRAPHQL_URL: `}
                </Typography>
                <Typography variant="body2" className={classes.apiLinkText}>
                  {`${URI}`}
                </Typography>
              </div>
              <div className={classes.apiLink}>
                <Typography variant="body2" className={classes.apiLinkHeading}>
                  {`SERVER_URI: `}
                </Typography>
                <Typography variant="body2" className={classes.apiLinkText}>
                  {`${SERVER_URI}`}
                </Typography>
              </div>
              <div className={classes.apiLink}>
                <Typography variant="body2" className={classes.apiLinkHeading}>
                  {`WS_URI: `}
                </Typography>
                <Typography variant="body2" className={classes.apiLinkText}>
                  {`${WS_URI}`}
                </Typography>
              </div>
              <div className={classes.apiLink}>
                <Typography variant="body2" className={classes.apiLinkHeading}>
                  {`NODE_ENV: `}
                </Typography>
                <Typography variant="body2" className={classes.apiLinkText}>
                  {`${NODE_ENV}`}
                </Typography>
              </div>
              <div className={classes.apiLink}>
                <Typography variant="body2" className={classes.apiLinkHeading}>
                  {`STRIPE_PUBLIC_KEY: `}
                </Typography>
                <Typography variant="body2" className={classes.apiLinkText}>
                  {`${STRIPE_PUBLIC_KEY?.slice(0,15)}...`}
                </Typography>
              </div>
            </div>
          </div>
        }
      </AlignCenterLayout>
    </footer>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
}
interface ReduxState {
  user: UserPrivate;
  isDarkMode: boolean;
}


const styles = (theme: Theme) => createStyles({
  footerContainer: {
    bottom: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.black1A,
    // background: isThemeDark(theme)
    //   ? Gradients.gradientBlack.background
    //   : Gradients.gradientGrey2Rotated.background,
    paddingTop: "6rem",
    color: Colors.cream,
  },
  title: {
    color: isThemeDark(theme)
      ? Colors.cream
      : Colors.slateGreyDarkest,
    fontWeight: 400,
    marginBottom: '0.5rem',
  },
  desktopLeftMargin: {
    marginLeft: '2rem',
  },
  subtitle: {
    color: isThemeDark(theme)
      ? Colors.cream
      : Colors.slateGreyDarkest,
    fontWeight: 400,
    fontSize: '0.9rem',
  },
  footerSubsection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '0rem 1rem',
  },
  firstBlock: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // maxWidth: FOOTER_MAX_WIDTH,
    width: '100%',
    textAlign: 'left',
    marginBottom: "2rem",
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
    // maxWidth: FOOTER_MAX_WIDTH,
    width: '100%',
    marginBottom: '2rem',
  },
  thirdBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // maxWidth: FOOTER_MAX_WIDTH,
    width: '100%',
    marginRight: '2rem',
  },
  siteFooterCredits: {
    marginBottom: 0,
    width: '100%',
    // borderTop: isThemeDark(theme)
    //   ? `1px solid ${Colors.charcoal}`
    //   : `1px solid ${Colors.slateGrey}`,
    color: isThemeDark(theme)
      ? Colors.mediumGrey
      : Colors.slateGreyDarkest,
    display: 'flex',
    flexDirection: "row",
    flexWrap: 'wrap',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  siteFooterCreditsSpaceBetween: {
    justifyContent: 'space-between',
    alignItems: "center",
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
  link: {
    marginBottom: '1rem',
  },
  linkText: {
    fontWeight: 500,
    fontSize: '0.9rem',
    lineHeight: '1rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyDarkest,
    textDecoration: 'none',
    '&:hover': {
      color: Colors.secondaryBright,
      cursor: 'pointer',
    }
  },
  textAlignCenter: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  allRightsReservedText: {
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
  },
  marginBottom2: {
    marginBottom: '4rem',
  },
  flexColApiLinks: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: '45%',
    minWidth: 130,
    margin: '1rem 0rem',
  },
  apiLink: {
    marginBottom: '1rem',
  },
  apiLinkText: {
    fontWeight: 500,
    fontSize: '0.9rem',
    lineHeight: '1rem',
    color: isThemeDark(theme)
      ? Colors.uniswapGrey
      : Colors.slateGreyDarkest,
    textDecoration: 'none',
    '&:hover': {
      color: Colors.secondaryBright,
      cursor: 'pointer',
    }
  },
  apiLinkHeading: {
    fontWeight: 500,
    fontSize: '0.9rem',
    lineHeight: '1rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyDarkest,
    textDecoration: 'none',
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
