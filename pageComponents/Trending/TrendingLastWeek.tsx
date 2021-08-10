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
} from "typings/gqlTypes";
// graphql
import { useLazyQuery } from '@apollo/client';
import {
  GET_HOT_NEWS_ITEMS_LAST_WEEK,
} from "queries/news-items-queries";

import TrendFeedLayout from "./TrendingFeed/TrendFeedLayout";
import TrendingFeedColumn60 from "./TrendingFeed/TrendingFeedColumn60";
import NewsItemColumn40 from "./TrendingFeed/NewsItemColumn40"


export const TrendingLastWeek: React.FC<ReactProps> = (props) => {

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
  const [
    cacheNewItems,
    setCacheNewItems
  ] = React.useState<NewsItemsConnection>(undefined)


  const limit = props.limit ?? 10
  const [offsetHot, setOffsetHot] = React.useState(0)
  const [offsetNew, setOffsetNew] = React.useState(0)

  // image gallery index
  const [index, setIndex] = React.useState(0);

  const [
    getHotNewsItemsLastWeek,
    hotItemsResponse,
  ] = useLazyQuery<QData, QVar>(
    GET_HOT_NEWS_ITEMS_LAST_WEEK, {
    variables: {
      query: {
        limit: limit,
        offset: 0,
      },
      sortByDate: false,
    },
    onCompleted: React.useCallback(async(data) => {
      setCacheHotItems(data?.getHotNewsItemsLastWeek)
    }, []),
  });

  const [
    getNewNewsItemsLastWeek,
    newItemsResponse,
  ] = useLazyQuery<QData, QVar>(
    GET_HOT_NEWS_ITEMS_LAST_WEEK, {
    variables: {
      query: {
        limit: limit,
        offset: 0,
      },
      sortByDate: true,
    },
    onCompleted: React.useCallback(async(data) => {
      setCacheNewItems(data?.getHotNewsItemsLastWeek)
    }, []),
  });

  React.useEffect(() => {
    if (tab === 0) {
      getHotNewsItemsLastWeek()
    } else {
      getNewNewsItemsLastWeek()
    }
  }, [tab])

  let newsItemsHot = hotItemsResponse?.data?.getHotNewsItemsLastWeek ?? cacheHotItems
  let newsItemsNew = newItemsResponse?.data?.getHotNewsItemsLastWeek ?? cacheNewItems

  let fetchMoreNew = newItemsResponse?.fetchMore
  let fetchMoreHot = hotItemsResponse?.fetchMore

  return (
    <TrendFeedLayout
      tab={tab}
      setTab={setTab}
      title={"Trending Last Week"}
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

          let newOffset = offsetHot + limit

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
                ...newData.data?.getHotNewsItemsLastWeek?.edges,
              ]
            }
          })
          setOffsetHot(newOffset)
        }}
        fetchMoreNew={async() => {

          let newOffset = offsetNew + limit

          // NOTE: apollo cache automatically merges fetchMore. See apollo.tsx
          let newData = await fetchMoreNew({
            variables: {
              query: {
                limit: limit,
                offset: newOffset,
              },
            }
          })
          // console.log("newData: ", newData)
          setCacheNewItems(s => {
            return {
              ...s,
              edges: [
                ...(s?.edges ?? []),
                ...newData.data?.getHotNewsItemsLastWeek?.edges,
              ]
            }
          })
          setOffsetNew(newOffset)
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

interface QData {
  getHotNewsItemsLastWeek: NewsItemsConnection
}
interface QVar {
  query?: ConnectionQuery
  sortByDate?: boolean
}


export default withStyles(styles)( TrendingLastWeek );