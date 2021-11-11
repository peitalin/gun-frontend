import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius2x, BorderRadius, Colors, Gradients, isThemeDark } from "layout/AppTheme";
import { commonStyles } from "./commonStyles";
// styles
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// GraphQL
import { useQuery, useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";

import AlignCenterLayout from "components/AlignCenterLayout";
export const MAX_WIDTH_GRID: number = 1160;

// Components
import BetaTestingBanner from "components/BetaTestingBanner";
import BannerStart from "./BannerStart";
import StartSelling2 from "./StartSelling2"
import StartSelling3Escrow from "./StartSelling3Escrow"
import StartSelling4 from "./StartSelling4"
// import StartSellingTestimonials from "./StartSellingTestimonials"
import StartSellingPricing from "./StartSellingPricing"
import BannerEnd from "./BannerEnd"



const LandingPageEscrow: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const theme = useTheme();
  // const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  let isDarkMode = theme.palette.type === 'dark'

  return (
    <div className={classes.landingPageRoot}>

      {/* <BannerHome /> */}
      <BannerStart
        isDarkMode={isDarkMode}
        title={
          <span>
            Buy and sell firearms simply and safely
          </span>
        }
        subtitle={
          <span>
            Featuring a secure payment system
            that protects you
            every step of the transfer process
          </span>
        }
      />

      {/* <div className={classes.betaTestingBannerBox}>
        <BetaTestingBanner />
      </div> */}

      <AlignCenterLayout
        maxWidth={'unset'}
        withRecommendations={false}
      >

        <StartSelling2 isDarkMode={isDarkMode}/>
        <StartSelling3Escrow isDarkMode={isDarkMode}/>

        <StartSelling4
          isDarkMode={isDarkMode}
          sectionType={"orders"}
        />

        <StartSellingPricing isDarkMode={isDarkMode}/>

        <BannerEnd
          isDarkMode={isDarkMode}
          title={
            <span>
              Get Launch Updates
            </span>
          }
          subtitle={
            <span>
              We are currently in private launch.
              Please sign up and get whitelisted
            </span>
          }
        />

      </AlignCenterLayout>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
}


const styles = (theme: Theme) => createStyles({
  landingPageRoot: {
    width: '100%',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    background: isThemeDark(theme)
      ? Colors.black1A
      : Colors.black1A,
  },
  betaTestingBannerBox: {
    overflow: 'hidden',
    ...commonStyles(theme).border1,
    borderRadius: BorderRadius,
  },
  fullMaxHeight: {
    maxHeight: "100%",
    width: '100%',
  },
  flexRowInner: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productColumn60: {
    flexBasis: '60%',
    flexGrow: 1,
    minWidth: 360,
  },
  productColumn40: {
    flexBasis: '40%',
    flexGrow: 1,
    minWidth: 280,
  },
  maxWidth: {
    maxWidth: '1160px', // 4 products per row
  },
});


export default withStyles(styles)( LandingPageEscrow );
