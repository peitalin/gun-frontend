import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, isThemeDark, BorderRadius } from "layout/AppTheme";
// typings
import {
  ConnectionQuery,
  NewsItemsConnection,
  NewsItem,
  ProductType,
  PromotedList,
} from "typings/gqlTypes";
// graphql
import { useSubscription, useLazyQuery } from '@apollo/client';
import { SUBSCRIBE_NEWS_ITEMS_SORT_BY_NEW } from "queries/news-items-subscriptions";
import {
  GET_HOT_NEWS_ITEMS_TODAY,
  GET_NEWS_ITEM_BY_ID,
} from "queries/news-items-queries";
import { GET_PROMOTED_LIST } from "queries/promoted_lists-queries";

import TrendFeedLayout from "./TrendingFeed/TrendFeedLayout";
import TrendingFeedColumn60 from "./TrendingFeed/TrendingFeedColumn60";
import NewsItemColumn40 from "./TrendingFeed/NewsItemColumn40"
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useRouter } from "next/router";



export const TrendingToday: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const theme = useTheme()
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

  const router = useRouter()
  let newsItemIdToFetch = router?.query?.item
  // console.log('newsItemIdToFetch:', newsItemIdToFetch)

  const [fetchMoreLoading, setFetchMoreLoading] = React.useState(false)

  interface Qvar {
    newsItemId: string
  }
  interface Qdata {
    getNewsItemById: NewsItem
  }

  const [
    getNewsItemById,
    getNewsItemByIdResponse
  ] = useLazyQuery<Qdata, Qvar>(GET_NEWS_ITEM_BY_ID, {
    variables: {
      newsItemId: newsItemIdToFetch as string
    },
  })

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
  // const [limitNew, setLimitNew] = React.useState(limit)

  // image gallery index
  const [index, setIndex] = React.useState(0);

  // const { data, error } = useSubscription<SData, SVar>(
  //   SUBSCRIBE_NEWS_ITEMS_SORT_BY_NEW, {
  //     variables: {
  //       limit: limitNew,
  //       offset: 0,
  //     },
  //     shouldResubscribe: true,
  //     onSubscriptionData: ({ client, subscriptionData: { data }}) => {
  //       console.log('newsItems subscriptionData:', data)
  //       setCacheHotItems(data?.newsItemsSortByNewConnection)
  //     },
  //     onSubscriptionComplete: () => {
  //       console.log('newsItems subscriptions complete.')
  //     },
  //   },
  // )
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

  React.useEffect(() => {
    if (newsItemIdToFetch) {
      getNewsItemById({
        variables: {
          newsItemId: newsItemIdToFetch as string
        }
      })
    }
  }, [newsItemIdToFetch])

  React.useEffect(() => {
    if (getNewsItemByIdResponse?.data?.getNewsItemById?.id) {
      setCurrentNewsItem(getNewsItemByIdResponse?.data?.getNewsItemById)
      setOpenModal(true)
    }
  }, [getNewsItemByIdResponse?.data])

  let newsItemsHot = hotItemsResponse?.data?.getHotNewsItemsToday ?? cacheHotItems
    // ?? cacheHotItems
  // let newsItemsNew = data?.newsItemsSortByNewConnection ?? cacheNewItems

  let fetchMoreHot = hotItemsResponse?.fetchMore

  // console.log('offset:', offset)
  // console.log("ddata", hotItemsResponse?.data?.getHotNewsItemsToday?.edges?.map(e => e?.node?.id))
  // console.log('getNewsItemResponse:', getNewsItemResponse)

  // React.useEffect(() => {
  //   if (currentNewsItem?.id) {
  //     // don't block UI rendering of the left-side product card
  //     setTimeout(() => {
  //       router.replace(
  //         `${router.pathname}`,
  //         `${router.pathname}?item=${currentNewsItem?.id}`,
  //         { shallow: true }
  //       )
  //     }, 0)
  //   }
  //   // set url with newsItemId do you can share the link
  //   // and it will open with the product loaded
  // }, [currentNewsItem])


  // const [getPromotedList, getPromotedListResponse] = useLazyQuery<QData2, QVar2>(
  //   GET_PROMOTED_LIST, {
  //   variables: {
  //     promotedListId: 'promoted_list_0001',
  //     limit: 4,
  //     offset: 0,
  //   },
  //   onCompleted: () => {
  //   },
  // })
  // React.useEffect(() => {
  //   getPromotedList()
  // }, [])
  // let promotedSlotsConnection = getPromotedListResponse?.data?.getPromotedList?.promotedSlotsConnection

  let promotedList = props.initialPromotedLists?.["promoted_list_0001"]
  let promotedSlotsConnection = promotedList?.promotedSlotsConnection
  // console.log("promotedSlotsConnection: ", promotedSlotsConnection)


  return (
    <TrendFeedLayout
      tab={tab}
      setTab={setTab}
      disableNewFeed={true}
      title={
        lgDown
        ? <div className={classes.trendTitleBoxMobile}>
            <span className={classes.titleMobile}>
              Trending Today
            </span>
            <span className={classes.last24hrsMobile}>
              Last 24hrs
            </span>
          </div>
        : <div className={classes.trendTitleBoxDesktop}>
            <span className={classes.titleDesktop}>
              Trending Today
            </span>
            <span className={classes.last24hrsDesktop}>
              - Last 24hrs
            </span>
          </div>
      }
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
        loading={hotItemsResponse.loading || fetchMoreLoading}
        mobile={lgDown}
        promotedSlotsConnection={promotedSlotsConnection}
        fetchMoreHot={async() => {

          let newOffset = offsetHot + limit
          setFetchMoreLoading(true)

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
          setFetchMoreLoading(false)
          setOffsetHot(newOffset)
        }}
        // fetchMoreNew={async() => {
        //   console.log('new limit: ', limitNew + 10)
        //   setLimitNew(limitNew => limitNew + 10)
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
  initialPromotedLists: PromotedList[]
}

interface SData {
  newsItemsSortByNewConnection: NewsItemsConnection
}
interface SVar {
  limit: number
  offset: number
  // query: ConnectionQuery
}
interface QData {
  getHotNewsItemsToday: NewsItemsConnection
}
interface QVar {
  query?: ConnectionQuery
}
interface QData2 {
  getPromotedList: PromotedList;
}
interface QVar2 {
  promotedListId: string,
  limit: number,
  offset: number,
}

const styles = (theme: Theme) => createStyles({
  titleDesktop: {
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.black,
  },
  titleMobile: {
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.black,
  },
  trendTitleBoxDesktop: {
    marginTop: '1rem',
    // marginBottom: '0.5rem',
  },
  trendTitleBoxMobile: {
    display: "flex",
    flexDirection: "column",
    marginTop: '1rem',
    marginBottom: '0.5rem',
  },
  last24hrsDesktop: {
    marginLeft: '0.5rem',
    fontSize: '1.2rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightestBlack,
  },
  last24hrsMobile: {
    fontSize: '1.2rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightestBlack,
  },
})

export default withStyles(styles)( TrendingToday );