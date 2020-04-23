import React from "react";
// Styles
import clsx from 'clsx';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Icons
import Visa from 'components/Icons/Visa';
import Mastercard from 'components/Icons/Mastercard';
import Paypal from 'components/Icons/Paypal';
import ApplePay from 'components/Icons/ApplePay';
import GooglePay from 'components/Icons/GooglePay';
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
import { Colors } from "layout/AppTheme";



const Footer: React.FC<ReactProps> = (props) => {

  const dispatch = useDispatch();
  const goToModal = goToModalConnect(dispatch);
  const { classes } = props;

  return (
    <footer>
      {props.children}
      <div className={classes.footerContainer}>
        <div className={classes.footerSubsection}>
          <div className={classes.firstBlock}>

            <div className={clsx(
              classes.firstBlockColumn,
              classes.wide
            )}>
              <Typography variant="subtitle1" className={classes.title}>
                GunMarketplace
              </Typography>
              <Typography variant="body2" className={classes.subtitle}>
                Buy and sell all firearms.
              </Typography>
            </div>

            <div className={clsx(
              classes.firstBlockColumn,
              classes.narrow
            )}>
              <Link href={'/become-a-seller'}>
                <a className={classes.link}>
                  <Typography variant="body2" className={classes.link}>
                    Become a Seller
                  </Typography>
                </a>
              </Link>
              <div onClick={() => goToModal.contactUs()}>
                <a className={classes.link}>
                  <Typography variant="body2" className={classes.link}>
                    Contact Us
                  </Typography>
                </a>
              </div>
              <Link href={'/faq'}>
                <a className={classes.link}>
                  <Typography variant="body2" className={classes.link}>
                    FAQ
                  </Typography>
                </a>
              </Link>
            </div>

            <div className={clsx(
              classes.firstBlockColumn,
              classes.widest
            )}>
              <Link href={'/refund-policy'}>
                <a className={classes.link}>
                  <Typography variant="body2" className={classes.link}>
                    Refund Policy
                  </Typography>
                </a>
              </Link>
              <Link href={'/terms-of-service'}>
                <a className={classes.link}>
                  <Typography variant="body2" className={classes.link}>
                    Terms of Service
                  </Typography>
                </a>
              </Link>
              <Link href={'/privacy-policy'}>
                <a className={classes.link}>
                  <Typography variant="body2" className={classes.link}>
                    Privacy Policy
                  </Typography>
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className={classes.footerSubsection}>
          <div className={classes.thirdBlock}>
            <div className={classes.siteFooterCredits}>
              <Typography variant="body2" className={classes.link}>
                <a
                  className={classes.link}
                  href="https://www.gunmarketplace.com.au" target="_blank">
                  Copyright © 2019 Gun Marketplace. All rights reserved.
                </a>
              </Typography>
              {/* <SocialIcons classes={classes}/> */}
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
//         <YouTube size={30}/>
//       </div>
//     </div>
//   )
// }


interface ReactProps extends WithStyles<typeof styles> {
}

const FOOTER_MAX_WIDTH = 720;
const styles = (theme: Theme) => createStyles({
  footerContainer: {
    bottom: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '0px',
    backgroundColor: "#252525",
    paddingTop: "15vh",
    color: "#cccccc",
  },
  title: {
    color: Colors.cream,
    fontWeight: 600,
  },
  subtitle: {
    color: Colors.cream,
    fontWeight: 600,
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
  },
  firstBlockColumn: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: '33%',
    margin: '0rem 0rem 2rem 0rem',
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
    borderTop: '1px solid #dadada',
    color: Colors.mediumGrey,
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    padding: '0.5rem',
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
    borderRadius: "6px",
  },
  link: {
    fontWeight: 600,
    lineHeight: '1rem',
    color: Colors.mediumGrey,
    textDecoration: 'none',
    '&:hover': {
      color: Colors.lightGrey,
      cursor: 'pointer',
    }
  },
})


export default withStyles(styles)( Footer );
