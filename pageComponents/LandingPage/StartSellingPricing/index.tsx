import React, { useState } from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius, BorderRadius2x } from "layout/AppTheme";
// Typings
import {} from "typings/gqlTypes";
// components
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "components/HiddenFix";
import AspectRatioConstraint from "components/AspectRatioConstraint";



const StartSellingPricing = (props: ReactProps) => {

  const { classes, isDarkMode } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <div className={clsx(
      classes.section6Root,
      mdDown ? classes.paddingRootMobile : classes.paddingRoot,
    )}>
      <div className={clsx(classes.section6, classes.flexCol)}>

        <Typography className={
          mdDown ? classes.titleMobile : classes.titleDesktop
        }>
          A fee model that puts gun collectors first
        </Typography>

        <div className={classes.paymentCard}>

          <div className={classes.paymentCardTitleBox}>
            <div className={classes.productCardIcon}>
              <svg viewBox="0 0 48 48">
                <path fill={isDarkMode ? Colors.purple : Colors.ultramarineBlue}
                  className="hover-fillLight"
                  d="M24 0c13.255 0 24 10.745 24 24S37.255 48 24 48 0 37.255 0 24 10.745 0 24 0z"
                />
                <path fill={isDarkMode ? Colors.lightPurple : Colors.lightBlue}
                  d="M39.558 30.977c-6.23 6.225-16.304 6.194-22.535-.03l13.975-13.962c-6.232-6.224-16.335-6.224-22.567 0-4.043 4.04-5.456 9.712-4.247 14.896l-.654.174a21.89 21.89 0 0 1-1.536-8.61c.284-11.806 10.003-21.35 21.823-21.446 6.15-.05 11.72 2.42 15.744 6.438 6.23 6.226 6.23 16.318 0 22.542z"
                />
                <path fill={isDarkMode ? Colors.uniswapNavy : Colors.cream}
                  className="hover-fillDark"
                  d="M33.653 21.413c1.43 5.336-1.735 10.82-7.068 12.25-5.332 1.43-10.814-1.736-12.242-7.072-1.43-5.334 1.735-10.82 7.068-12.25 5.334-1.43 10.815 1.738 12.244 7.074z"
                />
              </svg>
            </div>
            <h3 className={
              mdDown ? classes.titleMobile : classes.titleDesktop
            }>
              Pricing
            </h3>
          </div>

          <div className="product-card-content">
            <div className="product-card-split">
              <div>
                <div className={
                  mdDown ? classes.subtitleMobile : classes.subtitleDesktop
                }>
                  A flat 3.5% fee for each successful transfer
                </div>

                <ul className={
                  mdDown ? classes.paymentListMobile : classes.paymentListDesktop
                }>
                  <li className={
                    mdDown ? classes.paymentItemsMobile : classes.paymentItemsDesktop
                  }>
                    1.75% fee for credit card processing
                  </li>
                  <li className={
                    mdDown ? classes.paymentItemsMobile : classes.paymentItemsDesktop
                  }>
                    1.75% Gun Markpletace fee
                  </li>
                  <li className={
                    mdDown ? classes.paymentItemsMobile : classes.paymentItemsDesktop
                  }>
                    No additional bank transfer fees
                  </li>
                  <li className={
                    mdDown ? classes.paymentItemsMobile : classes.paymentItemsDesktop
                  }>
                    No fees for creating user accounts
                  </li>
                  <li className={
                    mdDown ? classes.paymentItemsMobile : classes.paymentItemsDesktop
                  }>
                    No fees for creating listings
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>


      </div>
    </div>
  );
};


interface ReactProps extends WithStyles<typeof styles> {
  isDarkMode: boolean
}

export const styles = (theme: Theme) => createStyles({
  section6Root: {
    width: '100%',
    borderTop: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarkest}`,
    borderBottom: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarkest}`,
    backgroundColor: theme.palette.type === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.slateGrey}`,
  },
  section6: {
    width: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paddingRoot: {
    paddingTop: '6rem',
    paddingBottom: '6rem',
  },
  paddingRootMobile: {
    paddingTop: '4rem',
    paddingBottom: '6rem',
  },
  marginRight: {
    marginRight: '1.5rem',
  },
  titleDesktop: {
    fontSize: "2rem",
    fontWeight: 700,
    textAlign: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
    padding: "0rem 1rem",
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
  },
  titleMobile: {
    fontSize: "1.5rem",
    fontWeight: 700,
    textAlign: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
    padding: "0rem 1.5rem",
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
  },
  flexRow:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flexCol:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  flexItem:{
    flexBasis: '50%',
    margin: '1rem 0rem',
  },

  paymentCard: {
    display: "flex",
    flexDirection: "column",
  },
  paymentCardTitleBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  subtitleDesktop: {
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: '1rem',
  },
  subtitleMobile: {
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
    fontSize: "1.125rem",
    fontWeight: 600,
    marginBottom: '1rem',
  },
  productCardIcon: {
    height: 40,
    width: 40,
  },
  paymentListDesktop: {
    textAlign: "start",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    fontSize: '1.1rem',
    lineHeight: '2rem',
  },
  paymentListMobile: {
    textAlign: "start",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    fontSize: '1.1rem',
    lineHeight: '1.75rem',
  },
  paymentItemsMobile: {
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightestBlack,
    fontSize: "1.125rem",
    fontWeight: 400
  },
  paymentItemsDesktop: {
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightestBlack,
    fontSize: "1.125rem",
    fontWeight: 400
  },
})

export default withStyles(styles)(StartSellingPricing);
