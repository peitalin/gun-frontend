import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, isThemeDark, BorderRadius, BorderRadius2x } from "layout/AppTheme";
// typings
import {
  UserPrivate,
  ConnectionQuery,
  NewsItemsConnection,
  NewsItemsEdge,
} from "typings/gqlTypes";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// graphql
import { useSubscription, useLazyQuery } from '@apollo/client';
import { SUBSCRIBE_NEWS_ITEMS_SORT_BY_NEW } from "queries/news-items-subscriptions";
import {
  NEWS_ITEMS_SORT_BY_HOT_CONNECTION,
  GET_HOT_NEWS_ITEMS_TODAY,
  GET_HOT_NEWS_ITEMS_YESTERDAY,
} from "queries/news-items-queries";
// Redux
import { useSelector } from "react-redux"
import { GrandReduxState } from "reduxStore/grand-reducer"

import LoadingBar from "components/LoadingBar";
import Typography from "@material-ui/core/Typography";

import NewsItemPanel from "./NewsItemPanel";
import NewsItemModalPage from "./NewsItemModalPage";
import AntTabContainer from "./AntTabComponents/AntTabContainer";
import AntTab from "./AntTabComponents/AntTab";
// Snackbar
import { useSnackbar } from "notistack";
import { useWindowWidth } from "utils/hooks";
// Material UI
import Dialog from "@material-ui/core/Dialog";
import AlignCenterLayout from 'components/AlignCenterLayout';
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
import BannerTrending from "./BannerTrending"



export const Trending: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const theme = useTheme()
  const snackbar = useSnackbar()
  const windowWidth = useWindowWidth()
  // const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const userRedux = useSelector<GrandReduxState, UserPrivate>(s => {
    return s.reduxLogin.user
  })

  const [tab, setTab] = React.useState(0)
  const [openModal, setOpenModal] = React.useState(false)
  const [openModal2, setOpenModal2] = React.useState(false)

  const [currentNewsItem, setCurrentNewsItem] = React.useState(undefined)
  const [currentNewsItem2, setCurrentNewsItem2] = React.useState(undefined)


  const handleTabChange = (event: React.ChangeEvent<{}>, newTab: number) => {
    setTab(newTab)
  }

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

  const [cacheNewsItemEdges, setCacheNewsItemEdges] = React.useState<NewsItemsEdge[]>(undefined)
  const [refetchNewsItems, setRefetchNewsItems] = React.useState(undefined)


  const [getNewsItemsByHot, response1] = useLazyQuery<QData2, QVar2>(
    GET_HOT_NEWS_ITEMS_TODAY, {
    variables: {
      query: {
        limit: 20,
        offset: 0,
      },
    },
    onCompleted: React.useCallback(async(data) => { }, []),
    fetchPolicy: "no-cache"
  });


  const [getNewsItemsByHot2, response2] = useLazyQuery<QData3, QVar3>(
    GET_HOT_NEWS_ITEMS_YESTERDAY, {
    variables: {
      query: {
        limit: 20,
        offset: 0,
      },
    },
    onCompleted: React.useCallback(async(data) => { }, []),
    fetchPolicy: "no-cache"
  });

  React.useEffect(() => {
    if (tab === 0) {
      getNewsItemsByHot()
    }
  }, [tab])

  React.useEffect(() => {
    getNewsItemsByHot2()
  }, [])



  React.useEffect(() => {
    if (response1.loading) {
      snackbar.enqueueSnackbar("Loading...", { variant: "info" })
    }
  }, [response1.loading])


  const newsItemEdgesToday = tab === 0
    ? response1?.data?.getHotNewsItemsToday?.edges ?? cacheNewsItemEdges
    : data?.newsItemsSortByNewConnection?.edges

  const newsItemEdgesYesterday = response2?.data?.getHotNewsItemsYesterday?.edges

  // console.log("newsItemsYesterday", newsItemEdgesYesterday)

  return (
    <AlignCenterLayout
      className={classes.trendingRoot}
      withRecommendations={false}
      maxWidth={1160}
    >

      <LoadingBar
        absoluteTop
        color={Colors.ultramarineBlue}
        height={4}
        width={'100vw'}
        loading={response1.loading}
        style={{ top: "-4px" }}
      />

      <BannerTrending/>

      <div className={clsx(classes.titleContainer)}>
        <Typography variant="h2" className={classes.title}>
          Trending Today
        </Typography>
        <div className={classes.tabContainer}>
          <AntTabContainer
            value={tab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <AntTab label="Hot" />
            <AntTab label="New" />
          </AntTabContainer>
        </div>
      </div>

      <div className={classes.trendFeed}>
        <div className={classes.trendFeedFlex60}>
          {
            newsItemEdgesToday?.map(({ node }, i) => {

              let newsItem = node

              return (
                <div key={node?.id}
                  className={clsx(
                    classes.newsItemRow,
                    i === 0 && classes.newsItemRowFirst,
                    i === (newsItemEdgesToday.length - 1) && classes.newsItemRowLast,
                  )}
                >
                  <NewsItemPanel
                    onClick={() => {
                      setCurrentNewsItem(node)
                      setOpenModal(true)
                    }}
                    newsItem={newsItem}
                    user={userRedux}
                    loading={response1.loading}
                  />
                </div>
              )
            })
          }
        </div>

        <div className={classes.trendItemFlex40}>
          <ShowOnMobileOrDesktopSSR desktop implementation="js">
            {
              currentNewsItem
              ? <NewsItemModalPage
                  newsItem={currentNewsItem}
                  user={userRedux}
                  closeModal={() => {
                    setCurrentNewsItem(undefined)
                    setOpenModal(false)
                  }}
                />
              : <div id="empty-newsItemModal"></div>
            }
          </ShowOnMobileOrDesktopSSR>
          <ShowOnMobileOrDesktopSSR mobile implementation="js">
            <Dialog
              open={openModal}
              onClose={() => setOpenModal(false)}
              BackdropProps={{
                classes: { root: classes.modalBackdrop }
              }}
              fullScreen={windowWidth < 480}
              fullWidth={false}
              maxWidth={"lg"}
              PaperProps={{
                classes: { root: classes.modalPaperScrollPaper }
              }}
            >
              <NewsItemModalPage
                newsItem={currentNewsItem}
                user={userRedux}
                closeModal={() => setOpenModal(false)}
              />
            </Dialog>
          </ShowOnMobileOrDesktopSSR>
        </div>

      </div>

      <div style={{ marginTop: '2rem' }}>
        <BannerTrending/>
      </div>


      <div className={clsx(classes.titleContainer)}>
        <Typography variant="h2" className={classes.title}>
          Trending Yesterday
        </Typography>
      </div>

      <div className={classes.trendFeed}>
        <div className={classes.trendFeedFlex60}>
          {
            newsItemEdgesYesterday?.map(({ node }, i) => {

              let newsItem = node

              return (
                <div key={node?.id}
                  className={clsx(
                    classes.newsItemRow,
                    i === 0 && classes.newsItemRowFirst,
                    i === (newsItemEdgesYesterday.length - 1) && classes.newsItemRowLast,
                  )}
                >
                  <NewsItemPanel
                    onClick={() => {
                      setCurrentNewsItem2(node)
                      setOpenModal2(true)
                    }}
                    newsItem={newsItem}
                    user={userRedux}
                    loading={response2.loading}
                  />
                </div>
              )
            })
          }
        </div>

        <div className={classes.trendItemFlex40}>
          <ShowOnMobileOrDesktopSSR desktop implementation="js">
            {
              currentNewsItem2
              ? <NewsItemModalPage
                  newsItem={currentNewsItem2}
                  user={userRedux}
                  closeModal={() => {
                    setCurrentNewsItem2(undefined)
                    setOpenModal2(false)
                  }}
                />
              : <div id="empty-newsItemModal-2"></div>
            }
          </ShowOnMobileOrDesktopSSR>
          <ShowOnMobileOrDesktopSSR mobile implementation="js">
            <Dialog
              open={openModal}
              onClose={() => setOpenModal(false)}
              BackdropProps={{
                classes: { root: classes.modalBackdrop }
              }}
              fullScreen={windowWidth < 480}
              fullWidth={false}
              maxWidth={"lg"}
              PaperProps={{
                classes: { root: classes.modalPaperScrollPaper }
              }}
            >
              <NewsItemModalPage
                newsItem={currentNewsItem}
                user={userRedux}
                closeModal={() => setOpenModal(false)}
              />
            </Dialog>
            <Dialog
              open={openModal2}
              onClose={() => setOpenModal2(false)}
              BackdropProps={{
                classes: { root: classes.modalBackdrop }
              }}
              fullScreen={windowWidth < 480}
              fullWidth={false}
              maxWidth={"lg"}
              PaperProps={{
                classes: { root: classes.modalPaperScrollPaper }
              }}
            >
              <NewsItemModalPage
                newsItem={currentNewsItem2}
                user={userRedux}
                closeModal={() => setOpenModal2(false)}
              />
            </Dialog>
          </ShowOnMobileOrDesktopSSR>
        </div>

      </div>


    </AlignCenterLayout>
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
interface QData2 {
  getHotNewsItemsToday: NewsItemsConnection
}
interface QVar2 {
  query?: ConnectionQuery
}

interface QData3 {
  getHotNewsItemsYesterday: NewsItemsConnection
}
interface QVar3 {
  query?: ConnectionQuery
}

const styles = (theme: Theme) => createStyles({
  trendingRoot: {
    display: 'flex',
    width: '100%',
    flexDirection: "column",
    padding: '1rem',
  },
  trendFeed: {
    display: 'flex',
    width: '100%',
    flexDirection: "row",
    borderRadius: BorderRadius,
  },
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    maxHeight: "calc(100% - 1rem)",
    maxWidth: '960px',
    // height: '100%',
    boxShadow: 'unset',
    background: 'transparent',
    transition:  theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.easeIn,
      duration: 300,
    }),
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  trendFeedFlex60: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "60%",
  },
  trendItemFlex40: {
    display: "flex",
    flexDirection: "column",
    minWidth: 400,
    flexBasis: "40%",
    top: "2rem",
    position: "sticky",
    height: '100%',
    marginTop: '-1rem',
  },
  title: {
    marginTop: '2rem',
    marginBottom: '1rem',
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: '60%',
  },
  tabContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
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
    borderRadius: `0px 0px ${BorderRadius2x}px ${BorderRadius2x}px`,
    borderBottom: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    overflow: "hidden",
  },
})


export default withStyles(styles)( Trending );