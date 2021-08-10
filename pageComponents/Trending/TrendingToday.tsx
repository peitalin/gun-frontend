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
import { useSubscription, useLazyQuery, useQuery } from '@apollo/client';
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

  const limit = props.limit ?? 10
  const [offset, setOffset] = React.useState(0)

  // image gallery index
  const [index, setIndex] = React.useState(0);

  const { data, error } = useSubscription<SData, SVar>(
    SUBSCRIBE_NEWS_ITEMS_SORT_BY_NEW, {
      variables: {
        query: {
          limit: limit,
          offset: offset,
        }
      },
      shouldResubscribe: true,
      onSubscriptionData: ({ client, subscriptionData: { data }}) => {
        // console.log('newsItems subscriptionData:', data)
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
        limit: limit,
        offset: 0,
      },
    },
    onCompleted: React.useCallback(async(data) => {
      setCacheHotItems(data?.getHotNewsItemsToday)
    }, []),
  });

  React.useEffect(() => {
    if (tab === 0) {
      getHotNewsItemsToday()
    }
  }, [tab])

  let newsItemsHot = hotItemsResponse?.data?.getHotNewsItemsToday ?? cacheHotItems
    // ?? cacheHotItems
  let newsItemsNew = data?.newsItemsSortByNewConnection

  let fetchMoreHot = hotItemsResponse?.fetchMore

  // console.log('offset:', offset)
  // console.log("ddata", hotItemsResponse?.data?.getHotNewsItemsToday?.edges?.map(e => e?.node?.id))

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
        // image gallery
        index={index}
        setIndex={setIndex}
        loading={hotItemsResponse.loading}
        fetchMoreHot={async() => {

          let newOffset = offset + limit

          // NOTE: apollo cache automatically merges fetchMore in apollo.tsx
          let newData = await fetchMoreHot({
            variables: {
              query: {
                limit: limit,
                offset: newOffset,
              },
            }
          })
          // console.log("newData: ", newData)
          setCacheHotItems(s => {
            return {
              ...s,
              edges: [
                ...(s?.edges ?? []),
                ...newData.data?.getHotNewsItemsToday?.edges,
              ]
            }
          })
          setOffset(newOffset)
        }}
      />
      <NewsItemColumn40
        currentNewsItem={currentNewsItem}
        setCurrentNewsItem={setCurrentNewsItem}
        openModal={openModal}
        setOpenModal={setOpenModal}
        // image gallery
        index={index}
        setIndex={setIndex}
      />
    </TrendFeedLayout>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  limit?: number
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