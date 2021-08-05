import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Material UI
import AlignCenterLayout from 'components/AlignCenterLayout';
import BannerTrending from "./BannerTrending"

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
  // const windowWidth = useWindowWidth()

  return (
    <AlignCenterLayout
      className={classes.trendingRoot}
      withRecommendations={false}
      maxWidth={1160}
    >

      <BannerTrending/>

      <TrendingToday />

      <div style={{ marginTop: '2rem' }}>
        <BannerTrending/>
      </div>

      <TrendingYesterday />

      <TrendingThisWeek />

      <TrendingLastWeek />

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
    padding: '1rem',
  },
})


export default withStyles(styles)( Trending );