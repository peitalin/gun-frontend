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





export const Trending: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  // const theme = useTheme()
  // const snackbar = useSnackbar()

  return (
    <AlignCenterLayout
      className={classes.trendingRoot}
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

      <TrendingToday limit={10}/>


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

      <TrendingYesterday limit={10}/>

      <div style={{
        marginTop: '1rem',
        marginBottom: '0rem',
      }}>
        <BannerTrending
          headingDesktop={"Buy a promotion"}
          headingMobile={"Promote your listing on the front page"}
          subheadingDesktop={"Promote your product on the front page"}
          link={'/promoted-listings'}
          buttonText={"Go Now"}
        />
      </div>

      <TrendingThisWeek limit={10}/>

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

      <TrendingLastWeek limit={30}/>

    </AlignCenterLayout>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
}


const styles = (theme: Theme) => createStyles({
  trendingRoot: {
    display: 'flex',
    width: '100%',
    flexDirection: "column",
  },
})


export default withStyles(styles)( Trending );