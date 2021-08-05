import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, isThemeDark, BorderRadius } from "layout/AppTheme";
import { styles } from "./TrendingFeed/styles";
// typings
import {
  ConnectionQuery,
  NewsItemsConnection,
  NewsItem,
} from "typings/gqlTypes";
// graphql
import { useSubscription, useLazyQuery } from '@apollo/client';
import { SUBSCRIBE_NEWS_ITEMS_SORT_BY_NEW } from "queries/news-items-subscriptions";
import {
  GET_HOT_NEWS_ITEMS_TODAY,
} from "queries/news-items-queries";

import TrendFeedLayout from "./TrendingFeed/TrendFeedLayout";
import TrendingFeedColumn60 from "./TrendingFeed/TrendingFeedColumn60";
import NewsItemColumn40 from "./TrendingFeed/NewsItemColumn40"



export const TrendingToday: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const [tab, setTab] = React.useState(0)
  const [openModal, setOpenModal] = React.useState(false)
  const [currentNewsItem, setCurrentNewsItem] = React.useState(undefined)

  const [
    cacheHotItems,
    setCacheHotItems
  ] = React.useState<NewsItemsConnection>(undefined)


  const { data, error } = useSubscription<SData, SVar>(
    SUBSCRIBE_NEWS_ITEMS_SORT_BY_NEW, {
      variables: {
        query: {
          limit: 20,
          offset: 0,
        }
      },
      shouldResubscribe: true,
      onSubscriptionData: ({ client, subscriptionData: { data }}) => {
        console.log('newsItems subscriptionData:', data)
      },
      onSubscriptionComplete: () => {
        console.log('newsItems subscriptions complete.')
      },
    },
  )
  // login-logOut updates userRedux which prompts resubscribes

  const [
    getHotNewsItemsToday,
    hotItemsResponse,
  ] = useLazyQuery<QData, QVar>(
    GET_HOT_NEWS_ITEMS_TODAY, {
    variables: {
      query: {
        limit: 20,
        offset: 0,
      },
    },
    onCompleted: React.useCallback(async(data) => {
      setCacheHotItems(data?.getHotNewsItemsToday)
    }, []),
    fetchPolicy: "no-cache"
  });

  React.useEffect(() => {
    if (tab === 0) {
      getHotNewsItemsToday()
    }
  }, [tab])

  let newsItemsHot = hotItemsResponse?.data?.getHotNewsItemsToday ?? cacheHotItems
  let newsItemsNew = data?.newsItemsSortByNewConnection

  return (
    <TrendFeedLayout
      tab={tab}
      setTab={setTab}
      title={"Trending Today"}
    >
      <TrendingFeedColumn60
        newsItemsHot={newsItemsHot}
        newsItemsNew={newsItemsNew}
        currentNewsItem={currentNewsItem}
        setCurrentNewsItem={setCurrentNewsItem}
        openModal={openModal}
        setOpenModal={setOpenModal}
        tab={tab}
        setTab={setTab}
        loading={hotItemsResponse.loading}
      />
      <NewsItemColumn40
        currentNewsItem={currentNewsItem}
        setCurrentNewsItem={setCurrentNewsItem}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </TrendFeedLayout>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
}

interface SData {
  newsItemsSortByNewConnection: NewsItemsConnection
}
interface SVar {
  query: ConnectionQuery
}
interface QData {
  getHotNewsItemsToday: NewsItemsConnection
}
interface QVar {
  query?: ConnectionQuery
}


export default withStyles(styles)( TrendingToday );