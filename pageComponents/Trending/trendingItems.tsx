import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { PromotedList } from "typings/gqlTypes"
// Material UI
import AlignCenterLayout from 'components/AlignCenterLayout';
import BannerTrending from "./BannerTrending"
import FeaturedProducts from "pageComponents/FrontPage/FeaturedProducts";

import TrendingItemsThisWeek from "./TrendingItemsThisWeek";
import TrendingItemsLastWeek from "./TrendingItemsLastWeek";





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

      <TrendingItemsThisWeek
        limit={30}
      />

      <FeaturedProducts
        count={3}
        title={"Featured Products"}
        promotedListId={"promoted_list_0001"}
        initialPromotedList={props.initialPromotedLists?.['promoted_list_0001']}
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

      <TrendingItemsLastWeek
        limit={30}
      />

      <FeaturedProducts
        count={4}
        title={"Featured Products"}
        promotedListId={"promoted_list_0002"}
        initialPromotedList={props.initialPromotedLists?.['promoted_list_0002']}
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


    </AlignCenterLayout>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  initialPromotedLists: PromotedList[]
}


const styles = (theme: Theme) => createStyles({
  trendingItemsRoot: {
    display: 'flex',
    width: '100%',
    flexDirection: "column",
  },
})


export default withStyles(styles)( TrendingItems );