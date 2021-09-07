import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Material UI
import AlignCenterLayout from 'components/AlignCenterLayout';
import BannerTrending from "./BannerTrending"
import FeaturedProducts from "pageComponents/FrontPage/FeaturedProducts";

import TrendingToday from "./TrendingToday";
import TrendingYesterday from "./TrendingYesterday";
import TrendingThisWeek from "./TrendingThisWeek";
import TrendingLastWeek from "./TrendingLastWeek";
import { ProductType } from 'typings/gqlTypes';





export const TrendingItems: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  // const theme = useTheme()
  // const snackbar = useSnackbar()

  return (
    <AlignCenterLayout
      className={classes.trendingItemsRoot}
      withRecommendations={false}
      maxWidth={1160}
    >

      <BannerTrending
        headingDesktop={"List your products"}
        headingMobile={"List your products"}
        subheadingDesktop={"Feature your product on the front page"}
        link={'/sell'}
        buttonText={"Get Started"}
      />

      <TrendingToday
        limit={20}
        productType={ProductType.ITEM}
      />


      <FeaturedProducts
        count={4}
        title={"Featured Products"}
        promotedListId={"promoted_list_0001"}
        cardsPerRow={
            {
              xs: 1.5,
              sm: 1.5,
              md: 2,
              lg: 3,
              xl: 4,
            }
        }
      />

      <TrendingYesterday
        limit={15}
        productType={ProductType.ITEM}
      />

      <div style={{
        marginTop: '1rem',
        marginBottom: '0rem',
      }}>
        <BannerTrending
          headingDesktop={"Buy a promotion"}
          headingMobile={"Promote your listing on the front page"}
          subheadingDesktop={"Promote your product on the front page"}
          link={'/promotions'}
          buttonText={"Go Now"}
        />
      </div>

      <TrendingThisWeek
        limit={20}
        productType={ProductType.ITEM}
      />

      <FeaturedProducts
        count={4}
        title={"Featured Products"}
        promotedListId={"promoted_list_0002"}
        cardsPerRow={
          {
            xs: 1.5,
            sm: 1.5,
            md: 2,
            lg: 3,
            xl: 4,
          }
        }
      />

      <TrendingLastWeek
        limit={30}
        productType={ProductType.ITEM}
      />

    </AlignCenterLayout>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
}


const styles = (theme: Theme) => createStyles({
  trendingItemsRoot: {
    display: 'flex',
    width: '100%',
    flexDirection: "column",
  },
})


export default withStyles(styles)( TrendingItems );