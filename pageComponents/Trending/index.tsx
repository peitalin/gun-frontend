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

import { useScrollYPosition } from "utils/hooks";





export const Trending: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  let defaultShow = process.browser
  let y = useScrollYPosition()

  const [showYesterday, setShowYesterday] = React.useState(false)
  const [showThisWeek, setShowThisWeek] = React.useState(false)
  const [showFeatured2, setShowFeatured2] = React.useState(false)
  const [showLastWeek, setShowLastWeek] = React.useState(false)

  // const theme = useTheme()
  // const snackbar = useSnackbar()
  // console.log("Y: ", y)

  React.useEffect(() => {
    if (y > 2000 && !showYesterday) {
      // console.log("showingYesterday")
      setShowYesterday(true)
    }
    if (y > 4000 && !showThisWeek) {
      // console.log("showingThisWeek")
      setShowThisWeek(true)
    }
    if (y > 8000 && !showLastWeek) {
      // console.log("showingFeatured2")
      setShowFeatured2(true)
    }
    if (y > 8000 && !showLastWeek) {
      // console.log("showingLastWeek")
      setShowLastWeek(true)
    }
  }, [y])

  return (
    <AlignCenterLayout
      className={classes.trendingRoot}
      withRecommendations={false}
      maxWidth={1160}
    >

      <BannerTrending
        headingDesktop={"Browse used guns for sale"}
        headingMobile={"Browse used guns for sale"}
        subheadingDesktop={"List your gun for sale on the front page"}
        link={'/sell'}
        buttonText={"Get Started"}
      />

      <TrendingToday
        limit={20}
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

      {
        showYesterday &&
        <TrendingYesterday
          limit={20}
        />
      }

      <div style={{
        marginTop: '1rem',
        marginBottom: '0rem',
      }}>
        <BannerTrending
          headingDesktop={"Buy a promotion"}
          headingMobile={"Promote listings on the news feed"}
          subheadingDesktop={"Promote your listings on the news feed"}
          link={'/promotions'}
          buttonText={"Go Now"}
        />
      </div>

      {
        showThisWeek &&
        <TrendingThisWeek
          limit={20}
        />
      }

      {
        showFeatured2 &&
        <FeaturedProducts
          count={4}
          title={"Trending Products"}
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
      }

      {
        showLastWeek &&
        <TrendingLastWeek
          limit={30}
        />
      }

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