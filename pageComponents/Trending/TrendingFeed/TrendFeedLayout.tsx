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
  } = props;

  return (
    <>
      <ShowOnMobileOrDesktopSSR className={classes.width100} desktop>
        <main className={classes.trendFeedLayoutRootDesktop}>
          <div className={clsx(classes.titleContainerDesktop)}>
            <Typography variant="h2" className={classes.title}>
              { props.title ?? "Trending"}
            </Typography>
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
          </div>
          <div className={classes.trendFeed}>
            {props.children}
          </div>
        </main>
      </ShowOnMobileOrDesktopSSR>
      <ShowOnMobileOrDesktopSSR className={classes.width100} mobile>
        <main className={classes.trendFeedLayoutRootMobile}>
          <div className={clsx(classes.titleContainerMobile)}>
            <Typography variant="h2" className={classes.title}>
              { props.title ?? "Trending"}
            </Typography>
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
          </div>
          <div className={classes.trendFeed}>
            {props.children}
          </div>
        </main>
      </ShowOnMobileOrDesktopSSR>
    </>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  tab: number
  setTab(n: number): void
  title: string
}

const styles = (theme: Theme) => createStyles({
  trendFeedLayoutRootDesktop: {
    padding: '1rem',
  },
  trendFeedLayoutRootMobile: {
    padding: '0.5rem',
  },
  trendFeed: {
    display: 'flex',
    width: '100%',
    flexDirection: "row",
    borderRadius: BorderRadius,
  },
  width100: {
    width: '100%',
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginTop: '2rem',
    marginBottom: '1rem',
  },
  titleContainerDesktop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: '60%',
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