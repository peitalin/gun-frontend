import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, isThemeDark, BorderRadius2x } from "layout/AppTheme";
// typings
import {
  UserPrivate,
  NewsItemsConnection,
  NewsItem,
  PromotedSlotsConnection,
  PromotedSlotsEdge,
  NewsItemsEdge,
} from "typings/gqlTypes";
// Redux
import { useSelector } from "react-redux"
import { GrandReduxState } from "reduxStore/grand-reducer"

import LoadingBar from "components/LoadingBar";
import TrendingNewsItemRow from "./TrendingNewsItemRow";
import LoadMoreFeedItems from './LoadMoreFeedItems';
import LoadingTrendsPlaceholder from './LoadingTrendsPlaceholder';
import { useRouter } from "next/router";



export const TrendingFeedColumn60: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  // const client = useApolloClient()
  // console.log("cache: ", client.cache)
  // console.log("loading: ", props.loading)

  return (
    <main className={clsx(
      classes.trendFeedFlex60,
      props.mobile ? classes.flexMobile : classes.flexDesktop,
    )}>
      <LoadingBar
        absoluteTop
        height={4}
        width={'100%'}
        loading={props.loading}
      />
      <TrendFeedItems
        {...props}
        mobile={props.mobile}
      />
      <LoadMoreFeedItems
        tab={props.tab}
        loading={props.loading}
        fetchMoreHot={props.fetchMoreHot}
        fetchMoreNew={props.fetchMoreNew}
      />
    </main>
  );
}


const TrendFeedItems: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const userRedux = useSelector<GrandReduxState, UserPrivate>(s => {
    return s.reduxLogin.user
  })

  const newsItemEdges = props.tab === 0
    ? props.newsItemsHot?.edges
    : props.newsItemsNew?.edges

  if (!newsItemEdges?.length) {
    return (
      <LoadingTrendsPlaceholder show={true}/>
    )
  }

  const wrapPromotedSlotAsNewsItem = (p: PromotedSlotsEdge): NewsItemsEdge => {
    return {
      node: {
        id: `${p.node?.id}`, // promoted_slot_0001_0001
        createdAt: p.node?.createdAt,
        updatedAt: new Date(),
        productId: p.node?.product?.id,
        externalProductId: undefined,
        sourceSite: "www.gunmarketplace.com.au",
        product: p.node?.product,
        isSuspended: false,
        isDeleted: false,
        score: undefined,
      }
    }
  }

  // let promotedSlots: NewsItemsEdge[] = React.useMemo(() => {
  //   return (props.promotedSlotsConnection?.edges ?? [])
  //     .map(p => wrapPromotedSlotAsNewsItem(p))
  // }, [props.promotedSlotsConnection])

  let promotedSlots: NewsItemsEdge[] = (props.promotedSlotsConnection?.edges ?? [])
      .map(p => wrapPromotedSlotAsNewsItem(p))

  let newsItemsWithPromotionsEdges = [
    ...newsItemEdges.slice(0,5),
    ...promotedSlots.slice(0,1),
    ...newsItemEdges.slice(5,10),
    ...promotedSlots.slice(1,2),
    ...newsItemEdges.slice(10,15),
    ...promotedSlots.slice(2,3),
    ...newsItemEdges.slice(15,20),
    ...promotedSlots.slice(3,4),
    ...newsItemEdges.slice(20),
  ]

  return (
    <>
      {
        newsItemsWithPromotionsEdges?.map(({ node: newsItem }, i) => {

          let isFirstItem = i === 0
          let isLastItem = i === (newsItemEdges?.length - 1)
          let isMiddleItem = !isFirstItem && !isLastItem

          return (
            <div key={`${newsItem?.id}-${i}`}
              className={clsx(
                isFirstItem && classes.newsItemRowFirst,
                isMiddleItem && classes.newsItemRow,
                isLastItem && classes.newsItemRowLast,
              )}
            >
              <TrendingNewsItemRow
                onClick={() => {
                  if (props.mobile) {
                    props.setOpenModal(true)
                  }
                  props.setCurrentNewsItem(newsItem)
                  // reset image gallery paginator to first image
                  props.setIndex(0)

                }}
                newsItem={newsItem}
                user={userRedux}
                isSuspended={newsItem?.isSuspended || newsItem?.isDeleted}
                imageSize={{
                  mobile: {
                    width: 114,
                    height: 76,
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
    </>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  mobile: boolean
  newsItemsHot: NewsItemsConnection
  newsItemsNew?: NewsItemsConnection
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
  promotedSlotsConnection?: PromotedSlotsConnection
}

export const styles = (theme: Theme) => createStyles({
  trendFeedFlex60: {
    display: "flex",
    flexDirection: "column",
    borderRadius: BorderRadius2x,
    boxShadow: BoxShadows.shadow4.boxShadow,
  },
  flexDesktop: {
    flexBasis: "60%",
    position: "relative",
    overflowX: "hidden",
    marginBottom: '1rem',
  },
  flexMobile: {
    flexBasis: "100%",
    position: "relative",
    overflowX: "hidden",
    marginBottom: '1rem',
  },
  newsItemRow: {
    display: "flex",
    flexDirection: "row",
    flexBasis: '100%',
    flexGrow: 1,
    width: '100%',
    borderTop: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDark}`,
    // borderBottom: "0px solid transparent",
    // borderLeft: "0px solid transparent",
    // borderRight: "0px solid transparent",
    // boxShadow: isThemeDark(theme)
    //   ? BoxShadows.shadow1.boxShadow
    //   : 'unset',
  },
  newsItemRowFirst: {
    display: "flex",
    flexDirection: "row",
    flexBasis: '100%',
    flexGrow: 1,
    width: '100%',
    borderRadius: `${BorderRadius2x}px ${BorderRadius2x}px ${0}px ${0}px`,
    // border: isThemeDark(theme)
    //   ? `1px solid ${Colors.uniswapLightNavy}`
    //   : `1px solid ${Colors.slateGreyDark}`,
    border: "0px solid transparent",
    // borderBottom: "0px solid transparent",
    // borderLeft: "0px solid transparent",
    // borderRight: "0px solid transparent",
    // overflow: "hidden",
  },
  newsItemRowLast: {
    display: "flex",
    flexDirection: "row",
    flexBasis: '100%',
    flexGrow: 1,
    width: '100%',
    borderTop: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDark}`,
    borderBottom: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDark}`,
    borderLeft: "0px solid transparent",
    borderRight: "0px solid transparent",
  },
  width100: {
    width: '100%',
  },
})



export default withStyles(styles)(TrendingFeedColumn60)