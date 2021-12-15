import React from "react";
// Styles
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { BorderRadius2x, BorderRadius, Colors, Gradients, isThemeDark } from "layout/AppTheme";
import { commonStyles } from "./commonStyles";
// styles
import { useTheme } from "@mui/material/styles";

import AlignCenterLayout from "components/AlignCenterLayout";
export const MAX_WIDTH_GRID: number = 1160;
// show exactly 4 product cards in carousel + 1rem padding on left
// 270px each card (including margin of 16px) = 290

// Components
import BannerStart from "./BannerStart";
import StartSelling2 from "./StartSelling2"
import StartSelling4 from "./StartSelling4"
// import StartSellingTestimonials from "./StartSellingTestimonials"
import StartSellingPricing from "./StartSellingPricing"
import BannerEnd from "./BannerEnd"



const LandingPageStart: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const theme = useTheme();
  // const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  let isDarkMode = theme.palette.mode === 'dark'

  return (
    <div className={classes.landingPageRoot}>

      {/* <BannerHome /> */}
      <BannerStart
        isDarkMode={isDarkMode}
        title={
          <span>
            Browse used guns
            <br/>
            across the market
          </span>
        }
        subtitle={
          <span>
            Start listing your items today
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


        <StartSelling4
          isDarkMode={isDarkMode}
          sectionType={"notifications"}
        />

        {/* <StartSellingPricing isDarkMode={isDarkMode}/> */}

        <BannerEnd
          isDarkMode={isDarkMode}
          title={
            <span>
              Get Started Now
            </span>
          }
          subtitle={
            <span>
              Currently in private launch
              <br/>
              Please sign up and get access
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


export default withStyles(styles)( LandingPageStart );
