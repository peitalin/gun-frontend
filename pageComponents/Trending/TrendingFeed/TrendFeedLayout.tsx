import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, isThemeDark, BorderRadius, BorderRadius2x } from "layout/AppTheme";

import Typography from "@material-ui/core/Typography";
import AntTabContainer from "./AntTabComponents/AntTabContainer";
import AntTab from "./AntTabComponents/AntTab";
import ShowOnMobileOrDesktopSSR from 'components/ShowOnMobileOrDesktopSSR';


export const TrendFeedLayout: React.FC<ReactProps> = (props) => {

  const {
    classes,
    disableNewFeed = false,
  } = props;

  return (
    <>
      <ShowOnMobileOrDesktopSSR
        className={classes.trendFeedLayoutRootDesktop}
        desktop
      >
        <div className={clsx(classes.titleContainerDesktop)}>
          <Typography variant="h2" className={classes.title}>
            { props.title ?? "Trending"}
          </Typography>
          {
            !disableNewFeed &&
            <div className={classes.tabContainer}>
              <AntTabContainer
                value={props.tab}
                onChange={(event, newTab: number) => {
                  props.setTab(newTab)
                }}
                indicatorColor="primary"
                textColor="primary"
              >
                <AntTab label="Hot" />
                <AntTab label="New" />
              </AntTabContainer>
            </div>
          }
        </div>
        <div className={classes.trendFeed}>
          {props.children}
        </div>
      </ShowOnMobileOrDesktopSSR>
      <ShowOnMobileOrDesktopSSR
        className={classes.trendFeedLayoutRootMobile}
        mobile
      >
        <div className={clsx(classes.titleContainerMobile)}>
          <Typography variant="h2" className={classes.title}>
            { props.title ?? "Trending"}
          </Typography>
          <div className={classes.tabContainer}>
            {
              !disableNewFeed &&
              <AntTabContainer
                value={props.tab}
                onChange={(event, newTab: number) => {
                  props.setTab(newTab)
                }}
                indicatorColor="primary"
                textColor="primary"
              >
                <AntTab label="Hot" />
                <AntTab label="New" />
              </AntTabContainer>
            }
          </div>
        </div>
        <div className={classes.trendFeed}>
          {props.children}
        </div>
      </ShowOnMobileOrDesktopSSR>
    </>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  tab: number
  setTab(n: number): void
  disableNewFeed?: boolean
  title?: React.ReactNode
}

const styles = (theme: Theme) => createStyles({
  trendFeedLayoutRootDesktop: {
    padding: '1rem 0rem 1rem 1rem',
  },
  trendFeedLayoutRootMobile: {
    padding: '0.25rem',
    overflowX: "hidden", // prevent safari scroll over
  },
  trendFeed: {
    display: 'flex',
    width: '100%',
    flexDirection: "row",
    borderRadius: BorderRadius,
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginBottom: '0.5rem',
  },
  titleContainerDesktop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: '60%',
    marginBottom: '-2rem', // to match productCard floating offset
    // in .NewsItemCard-newsItemModalPageRootDesktop
  },
  titleContainerMobile: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: '100%',
  },
  tabContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
})


export default withStyles(styles)( TrendFeedLayout );