import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, Gradients } from "layout/AppTheme";
// Typings
import { Categories, PageConfig } from "typings/gqlTypes";
// redux
import { useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
// styles
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// GraphQL
import { useQuery, useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";

import AlignCenterLayout from "components/AlignCenterLayout";
export const MAX_WIDTH_GRID: number = 1160;
// show exactly 4 product cards in carousel + 1rem padding on left
// 270px each card (including margin of 16px) = 290

import CategoryCarouselStart2 from "./StartSelling2/CategoryCarouselStart2";
// import CategoryCarouselStart from "components/CategoryCarouselStart";
// Components
import BetaTestingBanner from "components/BetaTestingBanner";
import BannerStart from "./BannerStart";
import StartSelling2 from "./StartSelling2"
import StartSelling3 from "./StartSelling3"
import StartSelling4 from "./StartSelling4"
// import StartSellingTestimonials from "./StartSellingTestimonials"
import StartSellingPricing from "./StartSellingPricing"
import BannerEnd from "./BannerEnd"



const LandingPage: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const aClient = useApolloClient();
  const router = useRouter();

  const theme = useTheme();
  const xlUp = useMediaQuery(theme.breakpoints.up('xl'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  // const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  let isDarkMode = useSelector<GrandReduxState, boolean>(
    s => s.reduxLogin.darkMode === 'dark'
  );


  let cPadding = 2 // category carousel padding

  return (
    <div className={classes.landingPageRoot}>

      {/* <BannerHome /> */}
      <BannerStart isDarkMode={isDarkMode}/>
      <BetaTestingBanner />

      <AlignCenterLayout
        maxWidth={'unset'}
        withRecommendations={false}
      >

        <StartSelling2 isDarkMode={isDarkMode}/>
        <StartSelling3 isDarkMode={isDarkMode}/>
        <StartSelling4 isDarkMode={isDarkMode}/>
        <StartSellingPricing isDarkMode={isDarkMode}/>
        <BannerEnd isDarkMode={isDarkMode}/>

      </AlignCenterLayout>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  initialCategories: Categories[]
}


const styles = (theme: Theme) => createStyles({
  landingPageRoot: {
    width: '100%',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
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


export default withStyles(styles)( LandingPage );
