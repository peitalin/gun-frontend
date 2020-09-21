import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// Icons
import { Colors } from "layout/AppTheme";
import Link from "next/link";
import TipExpander from "./TipExpander";
import Tip from "./Tip";




const SellingTipsMobile: React.FC<ReactProps> = (props) => {
  const { classes } = props;
  return (
    <>
      <div className={clsx(classes.sellingTipsRoot, "staggerFadeIn")}>

        {props.children}

        <TipExpander title={"Why sell on Gun Marketplace"}>
          <Tip bulletType={'tick'}>
            List unlimited digital products, for free
          </Tip>
          <Tip bulletType={'tick'}>
            Set any price, from $1
          </Tip>
          <Tip bulletType={'tick'}>
            You'll receive 85% of every sale, minus a small payment processing fee
          </Tip>
          <Tip bulletType={'tick'}>
            Get paid automatically every month via PayPal
          </Tip>
          <Tip bulletType={'tick'}>
            List a product, no need to set up an entire store
          </Tip>
          <Tip bulletType={'tick'}>
            We cover server, support, and marketing costs
          </Tip>
          <Tip bulletType={'tick'}>
            The buying experience is frictionless for customers
          </Tip>
          <Tip bulletType={'tick'}>
            Build a completely automated digital business
          </Tip>
        </TipExpander>

        <TipExpander
          title={"Why sell digital products rather than physical products?"}
          defaultExpanded={false}
        >
          <Tip bulletType={'tick'}>
            Ultimate way to earn passive income, in style
          </Tip>
          <Tip bulletType={'tick'}>
            Start a business with no upfront costs
          </Tip>
          <Tip bulletType={'tick'}>
            Infinitely scalable, with no ongoing costs
          </Tip>
          <Tip bulletType={'tick'}>
            Completely automated, with no management time
          </Tip>
          <Tip bulletType={'tick'}>
            Earn money while being location-free
          </Tip>
        </TipExpander>


        <TipExpander
          title={"What digital products can I sell?"}
          defaultExpanded={false}
        >
          <div className={classes.flexCol}>
            <div className={classes.flexRow}>
              <Typography className={classes.smallText}>
                On Gun Marketplace, you can sell any type of digital asset you
                think would be valuable to others. Here are some examples:
              </Typography>
            </div>
            <br/>
            <div className={classes.flexRow}>
              <div className={classes.flexColItem}>
                {
                  thingsToSell1.map(( thing, i ) => {
                    return (
                      <Typography
                        key={i}
                        variant="caption"
                        className={classes.thingText}
                      >
                        {thing}
                      </Typography>
                    )
                  })
                }
              </div>
              <div className={classes.flexColItem}>
                {
                  thingsToSell2.map(( thing, i ) => {
                    return (
                      <Typography
                        key={i}
                        variant="caption"
                        className={classes.thingText}
                      >
                        {thing}
                      </Typography>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </TipExpander>

      </div>
    </>
  )
}

const thingsToSell1 = [
  'Photo presets',
  'Video presets',
  'Music',
  'Educational content',
  'Courses',
  'How-to guides',
  'eBooks and PDFs',
  'Audiobooks',
  'Downloadable videos',
  'Apps and software',
  'Stock photos',
  'Stock videos',
  'Stock music',
  'Sound effects',
]

const thingsToSell2 = [
  'Graphics',
  'Design Templates',
  'Web Templates',
  'Video Templates',
  'Presentation Templates',
  'Document Templates',
  'Spreadsheet Templates',
  'Fonts',
  '3D',
  'Business Resources',
  'Health and Fitness',
  'Recipes',
  'Electronic Samples',
  'And much more...',
]

interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  sellingTipsRoot: {
    paddingTop: '0rem',
    paddingRight: '0rem',
  },
  sellingTips: {
    padding: '1rem 1rem 1rem 1rem',
    marginLeft: '0rem',
    marginBottom: '1rem',
    border: '1px solid #eaeaea',
    borderRadius: '4px',
    backgroundColor: Colors.foregroundColor,
  },
  tipTitle: {
    marginBottom: '0.75rem',
  },
  bullet: {
    marginRight: '0.25rem',
  },
  helpLink: {
    marginLeft: '0.25rem',
    color: Colors.blue,
  },
  smallText: {
    fontSize: '0.8rem',
    fontWeight: 400,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  flexColItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexGrow: 1,
    flexBasis: '50%',
  },
  thingText: {
    fontSize: '0.8rem',
    fontWeight: 400,
    marginBottom: '0.5rem',
    lineHeight: '1rem',
  },
});


export default withStyles(styles)( SellingTipsMobile );