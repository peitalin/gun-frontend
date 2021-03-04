import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius, BorderRadius2x } from "layout/AppTheme";

// redux
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
import { useSelector, useDispatch } from "react-redux";
// Typings
import {
  GET_BUYER_ORDERS_CONNECTION,
  GET_SELLER_ORDERS_CONNECTION,
  GET_SELLER_ORDERS_ACTION_ITEMS_CONNECTION,
} from "queries/orders-queries";

// graphl
import { useLazyQuery, useQuery } from "@apollo/client";

// Utils Components
import ErrorBounds from "components/ErrorBounds";
import Tick from "components/Icons/Tick";
// MUI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Subcomponents
import ToolTips from "pageComponents/MyOrders/ToolTips";
import OrderRowSellers from "pageComponents/MyOrders/OrderRowSellers";
import OrderRowBuyers from "pageComponents/MyOrders/OrderRowBuyers";
import PurchaseSuccessBanner from "pageComponents/MyOrders/PurchaseSuccessBanner";
import {
  UserPrivate,
  OrderStatus,
  OrdersConnection,
  Order,
  Order_By,
  Orders_Order_By,
} from "typings/gqlTypes";
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Utils Component
import ErrorDisplay from "components/Error";
import PaginateButtons from "components/Paginators/PaginateButtons";
export const MY_DOWNLOADS_PAGINATION_COUNT = 10;
import AlignCenterLayout from "components/AlignCenterLayout";
import DescriptionLoading from "pageComponents/FrontPage/PreviewCardResponsive/DescriptionLoading";
import ResponsivePadding from "pageComponents/SellerProfileDashboard/ResponsivePadding";
// Analytics
import { useRouter } from "next/router";

// Search Component
import SearchOptions, { SelectOption, setCategoryFacets } from "components/SearchOptions";
import {
  useFacetSearchOptions,
  useEffectUpdateGridAccum,
  totalItemsInCategoriesFacets,
} from "utils/hooksFacetSearch";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";



/////////////////////////////////// paginator
let numItemsPerPage = 3;
let overfetchBy = 1;




const MyOrders: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const router = useRouter();

  const theme = useTheme();

  //// BUYER ORDERS Paginator Hooks
  let {
    paginationParams: {
      limit: bLimit,
      offset: bOffset,
      pageParam: bPageParam,
      setPageParam: bSetPageParam,
    },
    index: bIndex,
    setIndex: bSetIndex,
  } = useFacetSearchOptions({
    limit: numItemsPerPage * overfetchBy,
    overfetchBy: overfetchBy,
  })

  //// SELLER ORDERS Paginator Hooks
  let {
    paginationParams: {
      limit: sLimit,
      offset: sOffset,
      pageParam: sPageParam,
      setPageParam: sSetPageParam,
    },
    index: sIndex,
    setIndex: sSetIndex,
  } = useFacetSearchOptions({
    limit: numItemsPerPage * overfetchBy,
    overfetchBy: overfetchBy,
  })

  //// SELLER ORDERS ACTION ITEMS Paginator Hooks
  let {
    paginationParams: {
      limit: saiLimit,
      offset: saiOffset,
      pageParam: saiPageParam,
      setPageParam: saiSetPageParam,
    },
    index: saiIndex,
    setIndex: saiSetIndex,
  } = useFacetSearchOptions({
    limit: numItemsPerPage * overfetchBy,
    overfetchBy: overfetchBy,
  })


  const [
    getBuyerOrders,
    buyerOrdersResponse
  ] = useLazyQuery<QueryData, QueryVar>(
    GET_BUYER_ORDERS_CONNECTION, {
      variables: {
        query: {
          limit: bLimit,
          offset: bOffset,
          orderBy: { createdAt: Order_By.DESC }
        }
      },
      fetchPolicy: "network-only",
    }
  );

  const [
    getSellerOrders,
    sellerOrdersResponse
  ] = useLazyQuery<QueryData2, QueryVar2>(
    GET_SELLER_ORDERS_CONNECTION, {
      variables: {
        query: {
          limit: sLimit,
          offset: sOffset,
          orderBy: { createdAt: Order_By.DESC }
        }
      },
      fetchPolicy: "network-only",
    }
  );

  const [
    getSellerOrdersACtionItems,
    sellerOrdersActionItemsResponse
  ] = useLazyQuery<QueryData3, QueryVar3>(
    GET_SELLER_ORDERS_ACTION_ITEMS_CONNECTION, {
      variables: {
        query: {
          limit: saiLimit,
          offset: saiOffset,
          orderBy: { createdAt: Order_By.DESC }
        }
      },
      fetchPolicy: "network-only",
    }
  );

  React.useEffect(() => {
    getBuyerOrders()
    // getSellerOrders()
    // getSellerOrdersACtionItems()
  }, [])

  console.log("buyer data::::: ", buyerOrdersResponse?.data)
  console.log("seller data::::: ", sellerOrdersResponse?.data)
  console.log("seller action items data::::: ", sellerOrdersResponse?.data)

  const buyerOrdersConnection = option(buyerOrdersResponse)
    .data.user.buyerOrdersConnection() || props.initialBuyerOrders;

  const sellerOrdersConnection = option(sellerOrdersResponse)
    .data.user.sellerOrdersConnection() || props.initialSellerOrders;

  const sellerOrdersActionItemsConnection = option(sellerOrdersActionItemsResponse)
    .data.user.sellerOrdersActionItemsConnection();


  const refetchTheOrders = async () => {
    let b = buyerOrdersResponse
    let s = sellerOrdersResponse
    let sai = sellerOrdersActionItemsResponse

    if (b && typeof b.refetch === 'function') {
      await b.refetch()
    }
    if (s && typeof s.refetch === 'function') {
      await s.refetch()
    }
    if (sai && typeof sai.refetch === 'function') {
      await sai.refetch()
    }
  }

  const refetchOrders = React.useCallback(() => {
    // apollo devs are retards
    // https://github.com/apollographql/react-apollo/issues/3862
    setTimeout(() => refetchTheOrders(), 0)
  }, [refetchTheOrders])

  /// if orders not refetching due to fast refresh bugs
  // React.useEffect(() => {
  //   getProducts()
  //   console.log("router.query: ", router.query)
  //   if (router?.query?.created) {
  //     if (getProductsResponse?.data?.dashboardProductsConnection?.edges) {

  //       console.log("router.query.created: ", router.query.created)
  //       let foundProduct = (connection?.edges ?? [])
  //         .find(({ node }) => node.id === router?.query?.created)

  //       console.log("foundProduct: ", foundProduct)

  //       if (!foundProduct?.node?.id) {
  //         console.log("product missing:", router.query.created)
  //         // getProducts()
  //         console.log("getProductsReponse:",  getProductsResponse)
  //         refetch()
  //       }

  //     }
  //   }
  // }, [getProductsResponse?.data])


  if (
    !option(buyerOrdersConnection).edges[0]() &&
    !option(sellerOrdersConnection).edges[0]() &&
    !option(sellerOrdersActionItemsConnection).edges[0]() &&
    !sellerOrdersResponse.loading &&
    !sellerOrdersActionItemsResponse.loading &&
    !buyerOrdersResponse.loading
  ) {
    return (
      <OrdersLayout {...props}>
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
      <OrdersLayout {...props}>



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
                disableSortby
                disablePriceFilter
                disableCategories
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
                  // classNameRoot={classes.gridRootSeller}
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
                          key={order.id}
                          order={order}
                          loading={sellerOrdersActionItemsResponse.loading}
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
            disableSortby
            disablePriceFilter
            disableCategories
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
              // classNameRoot={classes.gridRootBuyer}
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
                      key={order.id}
                      order={order}
                      loading={buyerOrdersResponse.loading}
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
            disableSortby
            disablePriceFilter
            disableCategories
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
                      key={order.id}
                      order={order}
                      loading={sellerOrdersResponse.loading}
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


const OrdersLayout: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const dispatch = useDispatch();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const md = useMediaQuery(theme.breakpoints.only('md'))
  const lg = useMediaQuery(theme.breakpoints.only('lg'))
  const xlUp = useMediaQuery(theme.breakpoints.up('xl'))

  return (
    <AlignCenterLayout
      maxWidth={960}
      withRecommendations={props.withRecommendations}
    >
      <div className={clsx(
        mdDown ? classes.flexRowRootMobile : classes.flexRowRoot,
        smDown && classes.paddingMobile,
        (md || lg) && classes.paddingIpad,
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

interface QueryData {
  user: UserPrivate
}
interface QueryVar {
}
interface QueryData2 {
  user: UserPrivate
}
interface QueryVar2 {
}
interface QueryData3 {
  user: UserPrivate
}
interface QueryVar3 {
}


interface ReactProps extends WithStyles<typeof styles> {
  initialBuyerOrders?: OrdersConnection;
  initialSellerOrders?: OrdersConnection;
  title?: string;
  withRecommendations?: boolean;
}

const styles = (theme: Theme) => createStyles({
  flexRowRoot: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: "column",
    maxWidth: 960,
    flexWrap: "wrap",
    padding: '1rem',
  },
  flexRowRootMobile: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: "column",
    maxWidth: 960,
    flexWrap: "wrap",
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
    backgroundColor: theme.palette.type === 'dark'
      ? theme.colors.uniswapDarkNavy
      : Colors.cream,
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : 'unset',
    border: theme.palette.type === 'dark'
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



