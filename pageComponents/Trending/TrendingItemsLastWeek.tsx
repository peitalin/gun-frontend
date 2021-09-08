import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, isThemeDark, BorderRadius } from "layout/AppTheme";
// typings
import {
  ConnectionQuery,
  NewsItemsConnection,
  ProductType,
} from "typings/gqlTypes";
// graphql
import { useLazyQuery } from '@apollo/client';
import {
  GET_HOT_MISC_ITEMS_LAST_WEEK,
} from "queries/news-items-queries";

import TrendFeedLayout from "./TrendingFeed/TrendFeedLayout";
import TrendingFeedColumn60 from "./TrendingFeed/TrendingFeedColumn60";
import NewsItemColumn40 from "./TrendingFeed/NewsItemColumn40"
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";


export const TrendingItemsLastWeek: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;


  const theme = useTheme()
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

  const [tab, setTab] = React.useState(0)
  const [openModal, setOpenModal] = React.useState(false)
  const [currentNewsItem, setCurrentNewsItem] = React.useState(undefined)
  const [fetchMoreLoading, setFetchMoreLoading] = React.useState(false)

  const [
    cacheHotItems,
    setCacheHotItems
  ] = React.useState<NewsItemsConnection>(undefined)
  // const [
  //   cacheNewItems,
  //   setCacheNewItems
  // ] = React.useState<NewsItemsConnection>(undefined)


  const limit = props.limit ?? 10
  const [offsetHot, setOffsetHot] = React.useState(0)
  // const [offsetNew, setOffsetNew] = React.useState(0)

  // image gallery index
  const [index, setIndex] = React.useState(0);

  const [
    getHotNewsItemsLastWeek,
    hotItemsResponse,
  ] = useLazyQuery<QData, QVar>(
    GET_HOT_MISC_ITEMS_LAST_WEEK, {
    variables: {
      query: {
        limit: limit,
        offset: 0,
      },
      sortByDate: false,
    },
    onCompleted: React.useCallback(async(data) => {
      setCacheHotItems(data?.getHotMiscItemsLastWeek)
    }, []),
  });

  // const [
  //   getNewNewsItemsLastWeek,
  //   newItemsResponse,
  // ] = useLazyQuery<QData, QVar>(
  //   GET_HOT_NEWS_ITEMS_LAST_WEEK, {
  //   variables: {
  //     query: {
  //       limit: limit,
  //       offset: 0,
  //     },
  //     sortByDate: true,
  //   },
  //   onCompleted: React.useCallback(async(data) => {
  //     setCacheNewItems(data?.getHotNewsItemsLastWeek)
  //   }, []),
  // });

  React.useEffect(() => {
    getHotNewsItemsLastWeek()
    // if (tab === 0) {
    //   getHotNewsItemsLastWeek()
    // } else {
    //   getNewNewsItemsLastWeek()
    // }
  }, [tab])

  let newsItemsHot = hotItemsResponse?.data?.getHotMiscItemsLastWeek ?? cacheHotItems
  // let newsItemsNew = newItemsResponse?.data?.getHotNewsItemsLastWeek ?? cacheNewItems

  let fetchMoreHot = hotItemsResponse?.fetchMore
  // let fetchMoreNew = newItemsResponse?.fetchMore

  return (
    <TrendFeedLayout
      tab={tab}
      setTab={setTab}
      title={"Trending Last Week"}
      disableNewFeed={true}
    >
      <TrendingFeedColumn60
        newsItemsHot={newsItemsHot}
        // newsItemsNew={newsItemsNew}
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
        mobile={lgDown}
        fetchMoreHot={async() => {

          let newOffset = offsetHot + limit
          setFetchMoreLoading(true)

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
                ...newData.data?.getHotMiscItemsLastWeek?.edges,
              ]
            }
          })
          setFetchMoreLoading(false)
          setOffsetHot(newOffset)
        }}
        // fetchMoreNew={async() => {

        //   let newOffset = offsetNew + limit
        //   setFetchMoreLoading(true)

        //   // NOTE: apollo cache automatically merges fetchMore. See apollo.tsx
        //   let newData = await fetchMoreNew({
        //     variables: {
        //       query: {
        //         limit: limit,
        //         offset: newOffset,
        //       },
        //     }
        //   })
        //   // console.log("newData: ", newData)
        //   setCacheNewItems(s => {
        //     return {
        //       ...s,
        //       edges: [
        //         ...(s?.edges ?? []),
        //         ...newData.data?.getHotNewsItemsLastWeek?.edges,
        //       ]
        //     }
        //   })
        //   setFetchMoreLoading(false)
        //   setOffsetNew(newOffset)
        // }}
      />
      <NewsItemColumn40
        currentNewsItem={currentNewsItem}
        setCurrentNewsItem={setCurrentNewsItem}
        openModal={openModal}
        setOpenModal={setOpenModal}
        mobile={lgDown}
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
  getHotMiscItemsLastWeek: NewsItemsConnection
}
interface QVar {
  query?: ConnectionQuery
  sortByDate?: boolean
}

const styles = (theme: Theme) => createStyles({
})


export default withStyles(styles)( TrendingItemsLastWeek );