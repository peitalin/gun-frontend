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
} from "typings/gqlTypes";
// Redux
import { useSelector } from "react-redux"
import { GrandReduxState } from "reduxStore/grand-reducer"

import LoadingBar from "components/LoadingBar";
import TrendingNewsItemRow from "./TrendingNewsItemRow";
import LoadMoreFeedItems from './LoadMoreFeedItems';
import LoadingTrendsPlaceholder from './LoadingTrendsPlaceholder';
import ShowOnMobileOrDesktopSSR from 'components/ShowOnMobileOrDesktopSSR';



export const TrendingFeedLayout: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  // const client = useApolloClient()
  // console.log("cache: ", client.cache)
  console.log("loading: ", props.loading)

  const [trendItemsLoaded, setTrendItemsLoaded] = React.useState(false)

  React.useEffect(() => {
    if (props.newsItemsHot && !trendItemsLoaded) {
      setTrendItemsLoaded(true)
    }
    if (props.newsItemsNew && !trendItemsLoaded) {
      setTrendItemsLoaded(true)
    }
  }, [props.newsItemsHot, props.newsItemsNew])

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
      {
        trendItemsLoaded &&
        <LoadMoreFeedItems
          tab={props.tab}
          loading={props.loading}
          fetchMoreHot={props.fetchMoreHot}
          fetchMoreNew={props.fetchMoreNew}
        />
      }
      <LoadingTrendsPlaceholder show={!trendItemsLoaded}/>
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

  return (
    <>
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
                  if (props.mobile) {
                    props.setOpenModal(true)
                  }
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
    </>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  mobile: boolean
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

export const styles = (theme: Theme) => createStyles({
  trendFeedFlex60: {
    display: "flex",
    flexDirection: "column",
    borderRadius: BorderRadius2x,
  },
  flexDesktop: {
    flexBasis: "60%",
  },
  flexMobile: {
    flexBasis: "100%",
  },
  newsItemRow: {
    display: "flex",
    flexDirection: "row",
    flexBasis: '100%',
    flexGrow: 1,
    width: '100%',
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderBottom: "0px solid transparent",
    // boxShadow: isThemeDark(theme)
    //   ? BoxShadows.shadow1.boxShadow
    //   : 'unset',
  },
  newsItemRowFirst: {
    borderRadius: `${BorderRadius2x}px ${BorderRadius2x}px ${0}px ${0}px`,
    overflow: "hidden",
  },
  newsItemRowLast: {
    // borderRadius: `0px 0px ${BorderRadius2x}px ${BorderRadius2x}px`,
    borderBottom: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    overflow: "hidden",
  },
  width100: {
    width: '100%',
  },
})


export default withStyles(styles)( TrendingFeedLayout );