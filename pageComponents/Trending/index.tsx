import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, isThemeDark, BorderRadius } from "layout/AppTheme";
// typings
import {
  UserPrivate,
  ConnectionQuery,
  NewsItemsConnection,
} from "typings/gqlTypes";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// graphql
import { useSubscription, useLazyQuery } from '@apollo/client';
import { SUBSCRIBE_NEWS_ITEMS_SORT_BY_NEW } from "queries/news-items-subscriptions";
import { NEWS_ITEMS_SORT_BY_HOT_CONNECTION } from "queries/news-items-queries";
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { GrandReduxState, Actions } from 'reduxStore/grand-reducer';
import LoadingBar from "components/LoadingBar";
import Typography from "@material-ui/core/Typography";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NewsItemPanel from "./NewsItemPanel";
// Snackbar
import { useSnackbar } from "notistack";




const AntTabs = withStyles((theme: Theme) => createStyles({
  root: {
    // borderBottom: isThemeDark(theme)
    //   ? `1px solid ${Colors.uniswapMediumNavy}`
    //   : `1px solid ${Colors.slateGreyDark}`,
    marginRight: '-1.5rem',
    marginBottom: '0.5rem',
    minHeight: 40,
    maxHeight: 42,
  },
  indicator: {
    backgroundColor: isThemeDark(theme)
      ? Colors.purple
      : Colors.blue,
  },
}))(Tabs);


const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 60,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      '&:hover': {
        color: isThemeDark(theme) ? Colors.lightPurple : Colors.lightBlue,
        opacity: 1,
      },
      '&$selected': {
        color: isThemeDark(theme) ? Colors.purple : Colors.blue,
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: isThemeDark(theme) ? Colors.lightPurple : Colors.lightBlue,
      },
    },
    selected: {},
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface StyledTabProps {
  label?: string
  value?: number;
  onChange?: (event: React.ChangeEvent<{}>, newValue: number) => void;
}


export const Trending: React.FC<ReactProps> = (props) => {

  const {
    classes,
    user: userRedux,
  } = props;

  const theme = useTheme();
  const snackbar = useSnackbar();
  // const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newTab: number) => {
    setTab(newTab);
  };

  const { data, error } = useSubscription<QData, QVar>(
    SUBSCRIBE_NEWS_ITEMS_SORT_BY_NEW, {
      // variables: {
      //   chatRoomStatuses: chatRoomStatuses,
      //   messageLimit: userRedux?.id ? 20 : 5,
      //   // login-logOut updates userRedux which prompots resubscribes
      // },
      shouldResubscribe: true,
      onSubscriptionData: ({ client, subscriptionData: { data }}) => {
        console.log('newsItems subscriptionData:', data)
      },
      onSubscriptionComplete: () => {
        console.log('newsItems subscriptions complete.')
      },
    },
  );
  // login-logOut updates userRedux which prompts resubscribes

  const [cacheNewsItemEdges, setCacheNewsItemEdges] = React.useState(undefined)
  const [refetchNewsItems, setRefetchNewsItems] = React.useState(undefined)

  const [getNewsItemsByHot, newsItemsByHotResponse] = useLazyQuery<QData2, QVar2>(
    NEWS_ITEMS_SORT_BY_HOT_CONNECTION, {
    variables: {
      query: {
        limit: 40,
        offset: 0,
      },
    },
    onCompleted: (data) => {
      setCacheNewsItemEdges(data?.newsItemsSortByHotConnection?.edges)
      let refetchNewsItems = setTimeout(() => {
        console.log("refetching hot list...")
        getNewsItemsByHot()
      }, 30 * 1000) // 30 seconds
      console.log("refetchNewsItems: ", refetchNewsItems)
      setRefetchNewsItems(refetchNewsItems)
    },
    fetchPolicy: "no-cache"
  });
  // login-logOut updates userRedux which prompts resubscribes

  React.useEffect(() => {
    if (tab === 0) {
      getNewsItemsByHot()
    }
  }, [tab])

  React.useEffect(() => {
    if (newsItemsByHotResponse.loading) {
      snackbar.enqueueSnackbar("Loading...", { variant: "info" })
    }
  }, [newsItemsByHotResponse.loading])


  const newsItemEdges = tab === 0
    ? newsItemsByHotResponse?.data?.newsItemsSortByHotConnection?.edges ?? cacheNewsItemEdges
    : data?.newsItemsSortByNewConnection?.edges

  return (
    <main className={classes.trendingRoot}>

      <LoadingBar
        absoluteTop
        color={Colors.ultramarineBlue}
        height={4}
        width={'100vw'}
        loading={newsItemsByHotResponse.loading}
        style={{ top: "-4px" }}
      />


      <div className={classes.productList}>

        <div className={classes.titleContainer}>
          <Typography variant="h2" className={classes.title}>
            Trending Products
          </Typography>
          <div className={classes.tabContainer}>
            <AntTabs
              className={classes.antTab}
              value={tab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <AntTab label="Hot" />
              <AntTab label="New" />
            </AntTabs>
          </div>
        </div>
        {
          newsItemEdges?.map(({ node }) => {

            let newsItem = node

            return (
              <div className={classes.flexItem} key={node?.id}>
                <NewsItemPanel
                  newsItem={newsItem}
                  user={userRedux}
                  loading={newsItemsByHotResponse.loading}
                />
              </div>
            )
          })
        }
      </div>
    </main>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  user?: UserPrivate;
}

interface QData {
  newsItemsSortByNewConnection: NewsItemsConnection
}
interface QVar {
}
interface QData2 {
  newsItemsSortByHotConnection: NewsItemsConnection
}
interface QVar2 {
  query?: ConnectionQuery
}

const styles = (theme: Theme) => createStyles({
  trendingRoot: {
    display: 'flex',
    width: '100%',
    flexDirection: "column",
    borderRadius: BorderRadius,
    padding: '1rem',
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  productList: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 600,
  },
  title: {
    marginTop: '2rem',
    marginBottom: '1rem',
  },
  subtitle: {
    marginBottom: '1rem',
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  tabContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  antTab: {
  },
  flexItem: {
    display: "flex",
    flexDirection: "row",
    flexBasis: '100%',
    flexGrow: 1,
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    border: theme.palette.type === 'dark'
      ? `unset`
      : `1px solid ${Colors.slateGreyDarker}`,
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : 'unset',
    marginBottom: '0.5rem',
    borderRadius: BorderRadius,
  },
})


export default withStyles(styles)( Trending );