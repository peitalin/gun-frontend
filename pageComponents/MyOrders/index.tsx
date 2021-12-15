import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BoxShadows, BorderRadius, BorderRadius2x } from "layout/AppTheme";

// redux
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
import { useSelector, useDispatch } from "react-redux";
// Graphql Queries
import {
  GET_BUYER_ORDERS_CONNECTION,
  GET_SELLER_ORDERS_CONNECTION,
  GET_SELLER_ORDERS_ACTION_ITEMS_CONNECTION,
} from "queries/orders-queries";

// graphl
import { useLazyQuery, useQuery } from "@apollo/client";
// MUI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// Subcomponents
import OrderRowSellers from "pageComponents/MyOrders/OrderRowSellers";
import OrderRowBuyers from "pageComponents/MyOrders/OrderRowBuyers";
import LoadingBar from "components/LoadingBar";
import {
  UserPrivate,
  OrderStatus,
  OrdersConnection,
  Order,
  Order_By,
} from "typings/gqlTypes";
// CSS
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// Utils Component
import ErrorDisplay from "components/ErrorDisplay";
import AlignCenterLayout from "components/AlignCenterLayout";
// Analytics
import { useRouter } from "next/router";

// Search Component
import SearchOptions, { SelectOption, setCategoryFacets } from "components/SearchOptions";
import {
  useFacetSearchOptions,
  totalItemsInCategoriesFacets,
} from "utils/hooksFacetSearch";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";
import { useApolloClient } from "@apollo/client";


/////////////////////////////////// paginator
let numItemsPerPage = 3;
let overfetchBy = 2;
let orderBy = { createdAt: Order_By.DESC }
// initial variables for updating apollo cache elsewhere in app
export const initialVariables = {
  query: {
    limit: numItemsPerPage * overfetchBy,
    offset: 0,
    orderBy: orderBy
  },
}
let MAX_WIDTH_ORDERS_PAGER = 900




const MyOrders: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const router = useRouter();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'))
  const maxWidthForOrders = mdDown ? '100%' : MAX_WIDTH_ORDERS_PAGER

  const aClient = useApolloClient();
  // console.log("aClient.cache: ", aClient?.cache)

  interface ReduxState {
    isDarkMode: boolean;
    user: UserPrivate
  }

  const {
    isDarkMode,
    user
  } = useSelector<GrandReduxState, ReduxState>(
    s => ({
      isDarkMode: s.reduxLogin.darkMode === 'dark',
      user: s.reduxLogin.user,
    })
  )

  //// BUYER ORDERS Paginator Hooks
  let {
    paginationParams: {
      limit: bLimit,
      offset: bOffset,
      pageParam: bPageParam,
      setPageParam: bSetPageParam,
      index: bIndex,
      setIndex: bSetIndex,
    },
  } = useFacetSearchOptions({
    limit: initialVariables.query.limit,
    overfetchBy: overfetchBy,
  })

  //// SELLER ORDERS Paginator Hooks
  let {
    paginationParams: {
      limit: sLimit,
      offset: sOffset,
      pageParam: sPageParam,
      setPageParam: sSetPageParam,
      index: sIndex,
      setIndex: sSetIndex,
    },
  } = useFacetSearchOptions({
    limit: initialVariables.query.limit,
    overfetchBy: overfetchBy,
  })

  //// SELLER ORDERS ACTION ITEMS Paginator Hooks
  let {
    paginationParams: {
      limit: saiLimit,
      offset: saiOffset,
      pageParam: saiPageParam,
      setPageParam: saiSetPageParam,
      index: saiIndex,
      setIndex: saiSetIndex,
    },
  } = useFacetSearchOptions({
    limit: initialVariables.query.limit,
    overfetchBy: overfetchBy,
  })


  const [
    getBuyerOrders,
    buyerOrdersResponse
  ] = useLazyQuery<QData1, QVar1>(
    GET_BUYER_ORDERS_CONNECTION, {
      variables: {
        query: {
          limit: bLimit,
          offset: bOffset,
          orderBy: orderBy,
        }
      },
      onCompleted: (data) => {
        // console.log("buyerOrders: ", data)
      },
    }
  );

  const [
    getSellerOrders,
    sellerOrdersResponse
  ] = useLazyQuery<QData2, QVar2>(
    GET_SELLER_ORDERS_CONNECTION, {
      variables: {
        query: {
          limit: sLimit,
          offset: sOffset,
          orderBy: orderBy,
        }
      },
      onCompleted: (data) => {
        // console.log("sellerOrders: ", data)
      },
    }
  );

  const [
    getSellerOrdersActionItems,
    sellerOrdersActionItemsResponse
  ] = useLazyQuery<QData3, QVar3>(
    GET_SELLER_ORDERS_ACTION_ITEMS_CONNECTION, {
      variables: {
        query: {
          limit: saiLimit,
          offset: saiOffset,
          orderBy: orderBy,
        }
      },
      // onCompleted: (data) => console.log("completed SAI", data),
      onCompleted: (data) => {
        // console.log("sellerAiOrders: ", data)
      },
    }
  );

  React.useEffect(() => {
    getBuyerOrders()
    getSellerOrders()
    getSellerOrdersActionItems()
    // console.log("user::::", user)
    // if (user?.id) {
    //   setTimeout(() => {
    //     getBuyerOrders()
    //     getSellerOrders()
    //     getSellerOrdersActionItems()
    //   }, 0)
    // }
  }, [user])

  const buyerOrdersConnection =
    buyerOrdersResponse?.data?.buyerOrdersConnection
    || props.initialBuyerOrders;

  const sellerOrdersConnection =
    sellerOrdersResponse?.data?.sellerOrdersConnection
    || props.initialSellerOrders;

  const sellerOrdersActionItemsConnection =
    sellerOrdersActionItemsResponse?.data?.sellerOrdersActionItemsConnection


  const noOrdersExist = () => {
    return !buyerOrdersConnection?.edges?.[0] &&
          !sellerOrdersConnection?.edges?.[0] &&
          !sellerOrdersActionItemsConnection?.edges?.[0]
          && !requestsAreLoading()
  }

  const requestsAreLoading = () => {
    return sellerOrdersActionItemsResponse.loading ||
          buyerOrdersResponse.loading ||
          sellerOrdersResponse.loading
  }


  // console.log("buyer data::::: ", buyerOrdersResponse?.data)
  // console.log("seller action items data::::: ", sellerOrdersResponse?.data)
  // console.log("seller data::::: ", sellerOrdersResponse?.data)


  if (noOrdersExist()) {
    return (
      <OrdersLayout
        classes={classes}
        withRecommendations={props.withRecommendations}
        maxWidthForOrders={maxWidthForOrders}
      >
        <div className={classes.emptyItems}>
          <Typography variant="body1" className={classes.emptyItemsTitle}>
            Your saved orders will appear here
            after your first purchase or sale.
          </Typography>
          <Button variant="outlined" color="primary"
            onClick={() => router.push(`/`)}
          >
            Browse Products
          </Button>
        </div>
      </OrdersLayout>
    )
  } else {
    return (
      <OrdersLayout
        classes={classes}
        withRecommendations={props.withRecommendations}
        maxWidthForOrders={maxWidthForOrders}
      >

        {
          requestsAreLoading() &&
          <LoadingBar
            absoluteTop
            color={
              isDarkMode ? Colors.purple : Colors.gradientUniswapBlue1
            }
            height={4}
            width={'100%'}
            loading={true}
          />
        }

        {
          (sellerOrdersActionItemsConnection?.totalCount > 0) &&
          <>
            <OrdersSection
              classes={props.classes}
              title={"Your Urgent Action Items"}
            >
              <SearchOptions
                paginationParams={{
                  totalCount: sellerOrdersActionItemsConnection?.totalCount,
                  overfetchBy: overfetchBy,
                  limit: saiLimit,
                  pageParam: saiPageParam,
                  setPageParam: saiSetPageParam,
                  index: saiIndex,
                  setIndex: saiSetIndex,
                }}
                updateSetPageDelay={0}
                disableSearchFilter
                disablePriceFilter
                disableCategories
                disableSortby
                sortByOptions={[]}
                maxCategoryInputWidth={250}
                topSectionStyles={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '1rem',
                  paddingRight: '1rem',
                }}
                bottomSectionStyles={{
                  marginBottom: '1rem',
                }}
              >
                <GridPaginatorGeneric<Order>
                  index={saiIndex}
                  connection={sellerOrdersActionItemsConnection}
                  totalCount={sellerOrdersActionItemsConnection?.totalCount ?? 0}
                  numItemsPerPage={numItemsPerPage}
                  className={classes.rowContainer}
                  // disableAnimation={true}
                  // classNameRoot={classes.gridRootSeller}
                  loading={
                    sellerOrdersActionItemsResponse?.loading
                    // && not index-nth page was already loaded
                  }
                  loadingComponent={
                    <OrderRowSellers order={undefined} loading={true} />
                  }
                >
                  {({ node: order, key }) => {
                    if (sellerOrdersActionItemsResponse.error && key === 0) {
                      return (
                        <ErrorDisplay title={"Orders couldn't load."}
                          error={sellerOrdersActionItemsResponse.error}
                        />
                      )
                    } else {
                      return (
                        <OrderRowSellers
                          key={order?.id}
                          order={order}
                          loading={false}
                          // loading={
                          //   sellerOrdersActionItemsResponse?.loading
                          //   // && not index-nth page was already loaded
                          // }
                          // loading={false} // determined by paginator parent
                        />
                      )
                    }
                  }}
                </GridPaginatorGeneric>
              </SearchOptions>
            </OrdersSection>
            <div className={classes.divider}/>
          </>
        }

        <OrdersSection
          classes={props.classes}
          title={"Your Purchases"}
        >
          <SearchOptions
            paginationParams={{
              totalCount: buyerOrdersConnection?.totalCount,
              overfetchBy: overfetchBy,
              limit: bLimit,
              pageParam: bPageParam,
              setPageParam: bSetPageParam,
              index: bIndex,
              setIndex: bSetIndex,
            }}
            updateSetPageDelay={0}
            disableSearchFilter
            disablePriceFilter
            disableCategories
            disableSortby
            sortByOptions={[]}
            maxCategoryInputWidth={250}
            topSectionStyles={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              display: 'flex',
              flexDirection: 'column',
              marginTop: '1rem',
              paddingRight: '1rem',
            }}
            bottomSectionStyles={{
              marginBottom: '1rem',
            }}
          >
            <GridPaginatorGeneric<Order>
              index={bIndex}
              connection={buyerOrdersConnection}
              totalCount={buyerOrdersConnection?.totalCount ?? 0}
              numItemsPerPage={numItemsPerPage}
              className={classes.rowContainer}
              // disableAnimation={true}
              // classNameRoot={classes.gridRootBuyer}
              loading={buyerOrdersResponse?.loading}
              loadingComponent={
                <OrderRowBuyers order={undefined} loading={true} />
              }
            >
              {({ node: order, key }) => {
                if (buyerOrdersResponse.error && key === 0) {
                  return (
                    <ErrorDisplay title={"Orders couldn't load."}
                      error={buyerOrdersResponse.error}
                    />
                  )
                } else {
                  return (
                    <OrderRowBuyers
                      key={order?.id}
                      order={order}
                      loading={false}
                      // loading={buyerOrdersResponse.loading}
                    />
                  )
                }
              }}
            </GridPaginatorGeneric>
          </SearchOptions>
        </OrdersSection>

        <div className={classes.divider}/>

        <OrdersSection
          classes={props.classes}
          title={"Your Sales"}
        >
          <SearchOptions
            paginationParams={{
              totalCount: sellerOrdersConnection?.totalCount,
              overfetchBy: overfetchBy,
              limit: sLimit,
              pageParam: sPageParam,
              setPageParam: sSetPageParam,
              index: sIndex,
              setIndex: sSetIndex,
            }}
            updateSetPageDelay={0}
            disableSearchFilter
            disablePriceFilter
            disableCategories
            disableSortby
            sortByOptions={[]}
            maxCategoryInputWidth={250}
            topSectionStyles={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              display: 'flex',
              flexDirection: 'column',
              marginTop: '1rem',
              paddingRight: '1rem',
            }}
            bottomSectionStyles={{
              marginBottom: '1rem',
            }}
          >
            <GridPaginatorGeneric<Order>
              index={sIndex}
              connection={sellerOrdersConnection}
              totalCount={sellerOrdersConnection?.totalCount ?? 0}
              numItemsPerPage={numItemsPerPage}
              className={classes.rowContainer}
              classNameRoot={classes.gridRootSeller}
              containerStyle={{
                maxWidth: `calc(${maxWidthForOrders}px - 2rem)`,
                // -2rem to account for 2rem padding or orders rows
                // overflows out of the paginator-grid
              }}
              // disableAnimation={true}
              overfetchBy={overfetchBy}
              loadingComponent={
                <OrderRowSellers order={undefined} loading={true} />
              }
              loading={sellerOrdersResponse?.loading}
            >
              {({ node: order, key }) => {
                if (sellerOrdersResponse.error && key === 0) {
                  return (
                    <ErrorDisplay title={"Orders couldn't load."}
                      error={sellerOrdersResponse.error}
                    />
                  )
                } else {
                  return (
                    <OrderRowSellers
                      key={order?.id}
                      order={order}
                      // loading={sellerOrdersResponse.loading}
                      loading={false}
                    />
                  )
                }
              }}
            </GridPaginatorGeneric>
          </SearchOptions>

        </OrdersSection>

      </OrdersLayout>
    )
  }
}


const OrdersLayout: React.FC<OrdersLayoutProps> = (props) => {

  const {
    classes,
    maxWidthForOrders,
    withRecommendations,
  } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'))
  const lg = useMediaQuery(theme.breakpoints.only('lg'))
  const xlUp = useMediaQuery(theme.breakpoints.up('xl'))

  return (
    <AlignCenterLayout
      maxWidth={maxWidthForOrders}
      withRecommendations={withRecommendations}
    >
      <div className={clsx(
        mdDown ? classes.flexRowRootMobile : classes.flexRowRoot,
        mdDown && classes.paddingMobile,
        lg && classes.paddingIpad,
        xlUp && classes.paddingDesktop,
      )}>
        <Typography className={classes.title} variant="h2">
          My Orders
        </Typography>
        {props.children}
      </div>
    </AlignCenterLayout>
  )
}


const OrdersSection: React.FC<ReactProps> = (props) => {

  const {
    classes,
    title = "Your Purchases"
  } = props;

  const theme = useTheme();

  return (
    <div className={classes.ordersSectionContainer}>
      <Typography variant="h4" className={classes.heading}>
        {title}
      </Typography>
      {props.children}
    </div>
  )
}

interface QData1 {
  buyerOrdersConnection: OrdersConnection
}
interface QVar1 {
}

interface QData2 {
  sellerOrdersConnection: OrdersConnection
}
interface QVar2 {
}

interface QData3 {
  sellerOrdersActionItemsConnection: OrdersConnection
}
interface QVar3 {
}


interface ReactProps extends WithStyles<typeof styles> {
  initialBuyerOrders?: OrdersConnection;
  initialSellerOrders?: OrdersConnection;
  title?: string;
  withRecommendations?: boolean;
}
interface OrdersLayoutProps extends WithStyles<typeof styles> {
  maxWidthForOrders: any;
  withRecommendations?: boolean;
}

const styles = (theme: Theme) => createStyles({
  flexRowRoot: {
    padding: '1rem',
  },
  flexRowRootMobile: {
    padding: '0.5rem',
  },
  productColumn60: {
    flexBasis: '60%',
    flexGrow: 1,
    minWidth: 330,
    marginBottom: '1rem',
  },
  productColumn20: {
    flexBasis: '20%',
    flexGrow: 1,
    minWidth: 280,
    maxWidth: 400,
  },
  title: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  heading: {
    marginTop: '1rem',
  },
  toolTip1: {
    padding: '1.5rem 2rem',
    marginLeft: '1rem',
    marginBottom: '1rem',
    border: `1px solid ${Colors.uniswapNavy}`,
    borderRadius: BorderRadius,
    backgroundColor: Colors.uniswapDarkNavy,
    boxShadow: BoxShadows.shadow1.boxShadow,
  },
  toolTip2: {
    padding: '1.5rem 2rem',
    marginLeft: '1rem',
    marginBottom: '1rem',
    border: `1px solid ${Colors.uniswapNavy}`,
    borderRadius: BorderRadius,
    backgroundColor: Colors.uniswapDarkNavy,
    boxShadow: BoxShadows.shadow1.boxShadow,
  },
  pageRecommendationsContainer: {
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
  },
  pageRecommendations: {
    marginTop: '1rem',
    padding: '1rem',
  },
  purchaseSuccessText: {
    color: Colors.cream,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginTop2: {
    marginTop: '2rem',
  },
  padding2: {
    padding: '2rem',
  },
  padding1: {
    padding: '1rem',
  },
  padding05: {
    padding: '0.5rem',
  },
  paddingMobile: {
    paddingTop: '4rem',
  },
  paddingIpad: {
    paddingTop: '4rem',
  },
  paddingDesktop: {
    paddingTop: '2rem',
  },
  purchaseSuccessBackground: {
    width: '100%',
    background: Colors.green,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tick: {
    marginRight: '0.5rem',
  },
  clearButton: {
    position: "absolute",
    right: "1rem",
  },
  emptyItems: {
    minHeight: 300,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
    borderRadius: BorderRadius,
    backgroundColor: theme.palette.mode === 'dark'
      ? theme.colors.uniswapDarkNavy
      : Colors.cream,
    boxShadow: theme.palette.mode === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : 'unset',
    border: theme.palette.mode === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDark}`,
    width: '100%',
    padding: '3rem',
  },
  emptyItemsTitle: {
    marginBottom: '1rem',
  },
  divider: {
    width: '100%',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  ordersSectionContainer: {
    marginTop: "1rem",
  },
  rowContainer: {
  },
  gridRootBuyer: {
    // backgroundColor: theme.colors.uniswapDarkNavy,
    minHeight: (116 + 10) * numItemsPerPage,
    // 116px + 10px padding * number of rows
    borderRadius: `0px 0px ${BorderRadius}px ${BorderRadius}px`,
    paddingBottom: '0.25rem',
  },
  gridRootSeller: {
    // backgroundColor: theme.colors.uniswapDarkNavy,
    minHeight: (220 + 10) * numItemsPerPage,
    // 116px + 10px padding * number of rows
    borderRadius: `0px 0px ${BorderRadius}px ${BorderRadius}px`,
    paddingBottom: '0.25rem',
  },
});


export default withStyles(styles)(MyOrders);



