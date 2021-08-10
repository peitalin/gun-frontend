import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, isThemeDark, BorderRadius } from "layout/AppTheme";
import { styles } from "./styles";
// typings
import {
  UserPrivate,
  NewsItemsConnection,
  NewsItem,
} from "typings/gqlTypes";
// Redux
import { useSelector } from "react-redux"
import { GrandReduxState } from "reduxStore/grand-reducer"

import LoadingBar from "components/LoadingBar";
import TrendingNewsItemRow from "./TrendingNewsItemRow";
import LoadMoreFeedItems from './LoadMoreFeedItems';



export const TrendingFeedLayout: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const userRedux = useSelector<GrandReduxState, UserPrivate>(s => {
    return s.reduxLogin.user
  })

  // const client = useApolloClient()
  // console.log("cache: ", client.cache)
  console.log("loading: ", props.loading)

  const newsItemEdges = props.tab === 0
    ? props.newsItemsHot?.edges
    : props.newsItemsNew?.edges

  return (
    <div className={classes.trendFeedFlex60}>
      <LoadingBar
        absoluteTop
        height={4}
        width={'100%'}
        loading={props.loading}
      />
      {
        newsItemEdges?.map(({ node: newsItem }, i) => {
          return (
            <div key={newsItem?.id}
              className={clsx(
                classes.newsItemRow,
                i === 0 && classes.newsItemRowFirst,
                i === (newsItemEdges.length - 1) && classes.newsItemRowLast,
              )}
            >
              <TrendingNewsItemRow
                onClick={() => {
                  props.setCurrentNewsItem(newsItem)
                  props.setOpenModal(true)
                  // reset image gallery paginator to first image
                  props.setIndex(0)
                }}
                newsItem={newsItem}
                user={userRedux}
                isSuspended={newsItem?.isSuspended || newsItem?.isDeleted}
                imageSize={{
                  mobile: {
                    width: 90,
                    height: 60,
                  },
                  desktop: {
                    width: 120,
                    height: 80,
                  },
                }}
              />
            </div>
          )
        })
      }
      <LoadMoreFeedItems
        tab={props.tab}
        loading={props.loading}
        fetchMoreHot={props.fetchMoreHot}
        fetchMoreNew={props.fetchMoreNew}
      />
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  newsItemsHot: NewsItemsConnection
  newsItemsNew: NewsItemsConnection
  currentNewsItem: NewsItem
  setCurrentNewsItem(n: NewsItem): void
  openModal: boolean
  setOpenModal(b: boolean): void
  tab: number
  setTab(t: number): void
  loading: boolean
  fetchMoreHot?(): void
  fetchMoreNew?(): void
  index: number
  setIndex(i: number): void
}


export default withStyles(styles)( TrendingFeedLayout );