import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme, useTheme } from "@material-ui/core/styles";
// Product Preview Page
import {
  Product,
  ListingType
} from "typings/gqlTypes";
import { Colors, isThemeDark } from "layout/AppTheme";
import Link from "next/link";




const RenderInstructions = (props: ReactProps) => {

  const { classes, activeStep } = props;

  if (activeStep === 0) {
    return (
      <div className={classes.root}>
        <div className={classes.heading}>
          Step 1: Select a category and your license
        </div>

        <div className={classes.title}>
          License
        </div>
        <div className={classes.text}>
          Each state has different licence categories (i.e. A, B, C, D, H)
          for different categories of firearms.
          <br/>
          Please refer to your local
          <Link href={"/help/firearm-registries"}>
            <a className={classes.link}>firearm registries</a>
          </Link>
          for more info.
        </div>

        <div className={classes.title}>
          Categories
        </div>
        <div className={classes.subtitle}>
          Rifles
        </div>
        <div className={classes.text}>
          Rifles includes firearms with rifled barrel
          (i.e. grooves and lands or ridges on the inside of the barrel).
        </div>
        <div className={classes.subtitle}>
          Shotguns
        </div>
        <div className={classes.text}>
          Shotguns includes firearms that have a smoothbore barrel
          (i.e. a barrel without rifling – lands and grooves) and fires slugs or pellets.
        </div>
        <div className={classes.subtitle}>
          Handguns
        </div>
        <div className={classes.text}>
          Handguns include revolvers and pistols.
          These firearms are designed to be held in the hand or hands of the shooter,
          and must not exceed a prescribed dimension.
        </div>
        <div className={classes.subtitle}>
          Combinations
        </div>
        <div className={classes.text}>
          Combinations includes firearms that comprises at least one rifle barrel and
          one shotgun barrel.
        </div>

      </div>
    )
  }

  if (activeStep === 1) {
    return (
      <div className={classes.root}>
        <div className={classes.heading}>
          Step 2: Choose a transferring dealer
        </div>
        <div className={classes.text}>
          The <i>transferring dealer</i> is where you are to dispose
          the firearm you are selling after a buyer has placed an order.
          Details of the sale and transfer are forwarded to the dealer for processing.
        </div>
        <div className={classes.text}>
          A receipt of the disposal is required to receive your payout.
          Receipts can be uploaded in your
          <Link href={"/orders"}>
            <a className={classes.link}>
              orders dashboard.
            </a>
          </Link>
        </div>
        <div className={classes.text}>
          As the disposer, please check with your transferring dealer for any
          private brokerage or transfer fees and charges.
        </div>
      </div>
    )
  }
  if (activeStep === 2) {
    return (
      <div className={classes.root}>
        <div className={classes.heading}>
          Step 3: Serial Number, Model, Make and Condition
        </div>

        <div className={classes.title}>
          Serial Number
        </div>
        <div className={classes.text}>
          Located on the frame of the firearm is a unique serial number.
          The serial number will consist only of letters and numbers (0-9, A-Z),
        </div>

        <div className={classes.title}>
          Make
        </div>
        <div className={classes.text}>
          The manufacturer of the firearm <br/>
          (e.g. CZ, GLOCK, ADLER, & WARWICK)
        </div>

        <div className={classes.title}>
          Model
        </div>
        <div className={classes.text}>
          The model/variant of the firearm <br/>
          (e.g. SHADOW 2, G19, A110, and WFA1-L)
        </div>

        <div className={classes.title}>
          Condition
        </div>
        <div className={classes.text}>
          <span className={classes.bold}>Perfect</span> - New condition.
        </div>
        <div className={classes.text}>
          <span className={classes.bold}>Excellent</span> – Near new condition, little use, no noticeable marring.
        </div>
        <div className={classes.text}>
          <span className={classes.bold}>Good</span> - Perfect working condition, no appreciable wearing on working surfaces, no corrosion or pitting, only minor surface dents or scratches.
        </div>
        <div className={classes.text}>
          <span className={classes.bold}>Fair</span> - Safe working condition, minor wear on surface, no broken parts, no corrosion or pitting that will interfere with functioning.
        </div>
        <div className={classes.text}>
          <span className={classes.bold}>Poor</span> - Safe working condition but well worn, perhaps requiring replacement of minor parts or adjustments.
        </div>
      </div>
    )
  }
  if (activeStep === 3) {
    return (
      <div className={classes.root}>
        <div className={classes.heading}>
          Step 4: Caliber and gun attributes
        </div>

        <div className={classes.title}>
          Action Type
        </div>
        <div className={classes.text}>
          The action type refers to how the firearm handles
          firing, reloading, and ejecting ammunition cartridges
          (e.g. Bolt action, Lever action, Break action & Semi-Automatic).
          You can find this information under its model and variant from the manufacturer.
        </div>

        <div className={classes.title}>
          Caliber
        </div>
        <div className={classes.text}>
          Caliber is the diameter of the gun barrel bore.
          You can check the caliber of the firearm by locating the model and variant
          from the manufacturer's website.
          Shotguns are classed according to gauge (e.g. .22 LR, .223 REM, & 12 GAUGE).
        </div>

        <div className={classes.title}>
          Magazine Capacity
        </div>
        <div className={classes.text}>
          The total amount of ammunition storage for the firearm magazine,
          either within the gun or externally attached (e.g. 4, 5, 10, or 15).
        </div>

        <div className={classes.title}>
          Barrel Length
        </div>
        <div className={classes.text}>
          The length of the barrel can be presented in either inches or millimeters.
          You can find more information on this from the manufacturer (e.g. 4 inches or 101.6 mm).
        </div>
      </div>
    )
  }
  if (activeStep === 4) {
    return (
      <div className={classes.root}>
        <div className={classes.heading}>
          Step 5: Description
        </div>

        <div className={classes.title}>
          Description
        </div>
        <div className={classes.text}>
          Provide as much information as you can about the product listing to give buyers more confidence in the decision.
        </div>
        <div className={classes.text}>
          Describe what it was that you enjoyed about this firearm and what made you decide to buy it initially.
        </div>
        <div className={classes.text}>
          As a reminder <b>do not share any personal information</b> such as your name, contact number or email as per our terms of services and privacy policy.
          This may result in the removal of the product listing.
        </div>
      </div>
    )
  }
  if (activeStep === 8) {
    return (
      <div className={classes.root}>
        <div className={classes.heading}>
          Step 9: Listing Type & Fees
        </div>

        <div className={classes.title}>
          Classified Ad
        </div>
        <div className={classes.text}>
          A classified ad lets you post your listing and display
          your contact information.
        </div>
        <div className={classes.text}>
          {/* Fee is $10 per listing */}
          <span className={
            (props.listingType === ListingType.CLASSIFIED || !props.listingType)
              ? classes.highlightText
              : classes.text
          }>
            Fee is free until I finish building a checkout.
            <br/>
            Price will be $10 after that.
          </span>
        </div>

        <br/>

        <div className={classes.title}>
          Escrow Listing (beta testing)
        </div>
        <div className={classes.text}>
          List a product with escrow protection on transactions.
          <a className={classes.link}
            target={"_blank"}
            href={'https://docs.gunmarketplace.com.au/escrow-overview'}
          >
            See our guide for more details.
          </a>
        </div>
        <div className={classes.text}>
          <span className={
            props.listingType === ListingType.ESCROW_ONLY
              ? classes.highlightText
              : classes.text
          }>
            Escrow listings have no fees up-front.
            <br/>
            You will be charged 3.5% after the gun is bought
            and disposed to the dealer.
          </span>
        </div>
        <div className={classes.text}>
          <b>Tip:</b> increase your price to cover the escrow fees for more expensive items.
          Some buyers will only buy listings with payment protection.
        </div>
        <div className={classes.text}>
          <b>Do not share any personal information</b> such as your name,
          contact number or email as per our terms of services.
          This may result in suspension of the product listing.
        </div>
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        <div>
          Other unhandled instructions
        </div>
        </div>
    )
  }

}

interface ReactProps extends WithStyles<typeof styles> {
  activeStep: number
  listingType: ListingType
}



const styles = (theme: Theme) => createStyles({
  root: {
    padding: '1rem',
  },
  heading: {
    marginTop: "0.5rem",
    marginBottom: "1rem",
    fontSize: '1.125rem',
    lineHeight: '1.25rem',
    fontWeight: 600,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.black,
  },
  title: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    fontSize: '1rem',
    fontWeight: 600,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.black,
  },
  subtitle: {
    fontSize: '0.9rem',
    fontWeight: 600,
    lineHeight: '1.125rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyBlack,
  },
  text: {
    fontSize: '0.9rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyBlack,
    lineHeight: '1.125rem',
    marginBottom: "0.5rem",
    transition: theme.transitions.create(['color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: "200ms",
    }),
  },
  bold: {
    fontWeight: 500,
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyBlack,
  },
  highlightText: {
    transition: theme.transitions.create(['color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: "200ms",
    }),
    color: isThemeDark(theme)
      ? Colors.purple
      : Colors.purple,
  },
  link: {
    marginLeft: '0.25rem',
    marginRight: '0.25rem',
    color: Colors.ultramarineBlue,
    "&:hover": {
      color: Colors.ultramarineBlueLight,
    },
  },
})

export default withStyles(styles)(RenderInstructions);

