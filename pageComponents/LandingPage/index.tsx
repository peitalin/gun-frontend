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

// Components
import BannerHome from "pageComponents/LandingPage/BannerLandingPage";
import BannerGetStarted from "pageComponents/LandingPage/BannerGetStarted";
import BetaTestingBanner from "components/BetaTestingBanner";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// GraphQL
import { useQuery, useApolloClient } from "@apollo/client";
import CategoryCarouselStart from "components/CategoryCarouselStart";

import AlignCenterLayout from "components/AlignCenterLayout";
export const MAX_WIDTH_GRID: number = 1160;
// show exactly 4 product cards in carousel + 1rem padding on left
// 270px each card (including margin of 16px) = 290



const LandingPage: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const aClient = useApolloClient();

  const theme = useTheme();
  const xlUp = useMediaQuery(theme.breakpoints.up('xl'));
  // const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  // const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  let isDarkMode = useSelector<GrandReduxState, boolean>(
    s => s.reduxLogin.darkMode === 'dark'
  );
  let cPadding = 2 // category carousel padding

  return (
    <div className={classes.landingPageRoot}>

      <BannerHome />
      <BetaTestingBanner />

      <AlignCenterLayout
        maxWidth={MAX_WIDTH_GRID || 1160}
        withRecommendations={false}
      >

        <div className={classes.categoryCarouselLandingPageBox}
          style={{
            // filter: "grayscale(1)",
          }}
        >
          <div className={classes.categoryTitleBox}>
            <div className={classes.categoryTitleText}>
              Choose from a selection of brands
            </div>
          </div>
          <div className={classes.categoryTitleBox}>
            <div
              className={classes.polkadotBackground}
              style={
                xlUp
                ? {
                    width: `calc(100% - ${cPadding*2}rem)`,
                  }
                : {
                    width: `calc(100% - ${cPadding}rem)`,
                  }
              }
            ></div>
            <div className={classes.categoryBrands}>
              <div className={classes.imageBox}>Ruger</div>
              <div className={classes.imageBox}>Mauser</div>
              <div className={classes.imageBox}>HandK</div>
              <div className={classes.imageBox}>Mossberg</div>
            </div>
          </div>
          <div className={classes.categoryTitleBox}>
            <div className={classes.categoryTitleText}>
              Across these categories
            </div>
          </div>
          <CategoryCarouselStart
            // title={"Explore Categories"}
            disableTitle={true}
            categories={props.initialCategories}
            style={
              xlUp
              ? {
                  width: `calc(100% - ${cPadding*2}rem)`,
                  marginLeft: `${cPadding}rem`,
                  marginRight: `${cPadding}rem`,
                }
              : {}
            }
            cardTextStyle={{
              color: isDarkMode
                ? Colors.uniswapLighterGrey
                : Colors.slateGreyDarkest,
            }}
          />
        </div>

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
  categoryCarouselLandingPageBox: {
    marginTop: '3rem',
    marginBottom: '3rem',
  },
  categoryTitleBox: {
    position: 'relative',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
    fontSize: '1rem',
  },
  categoryTitleText: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    maxWidth: 500,
    textTransform: "uppercase",
    fontSize: '0.8rem',
    fontWeight: 600,
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyDarkest,
  },
  categoryBrands: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 500,
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  polkadotBackground: {
    background: `url(/img/bg-with-dotted.svg) no-repeat center/contain`,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  imageBox: {
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
