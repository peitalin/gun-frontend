import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, isThemeDark, BorderRadius, BorderRadius2x } from "layout/AppTheme";
import { styles } from "./styles";

import Typography from "@material-ui/core/Typography";
import AntTabContainer from "./AntTabComponents/AntTabContainer";
import AntTab from "./AntTabComponents/AntTab";



export const TrendFeedLayout: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  return (
    <main className={classes.trendFeedLayoutRoot}>
      <div className={clsx(classes.titleContainer)}>
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
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  tab: number
  setTab(n: number): void
  title: string
}


export default withStyles(styles)( TrendFeedLayout );