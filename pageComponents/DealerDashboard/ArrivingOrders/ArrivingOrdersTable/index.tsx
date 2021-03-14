import React from "react";
import clsx from "clsx";
// SSR
import { NextPage, NextPageContext } from 'next';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from 'reduxStore/grand-reducer';
// MUI
import Typography from "@material-ui/core/Typography";
// Typings
import {
  UserPrivate,
  OrdersConnection,
  Order,
  OrderAdmin,
  OrderStatus,
  ConnectionOffsetQuery
} from "typings/gqlTypes";
import {
  GET_ORDERS_ARRIVING_CONNECTION_DEALER,
  GET_ORDERS_COMPLETING_CONNECTION_DEALER,
} from "queries/orders-dealer-queries";
// Pagination
import { ConnectionQueryProps } from "components/Paginators/usePaginatePagedQueryHook";
import ErrorDisplay from "components/Error";
import LoadingBar from "components/LoadingBar";
// formatters
import { formatDate } from "utils/dates";
import currency from "currency.js";
// graphl
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import RowExpander from "./RowExpander";

// Search Component
import SearchOptions, { SelectOption, setCategoryFacets } from "components/SearchOptions";
import {
  useFacetSearchOptions,
  useEffectUpdateGridAccum,
  totalItemsInCategoriesFacets,
} from "utils/hooksFacetSearch";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";




const ArrivingOrdersTable: NextPage<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const router = useRouter()

  const isDarkMode = useSelector<GrandReduxState, boolean>(s => {
    return s.reduxLogin.darkMode === 'dark'
  })

  /////////////////////////////////// paginator
  let numItemsPerPage = 5;
  let overfetchBy = 1;
  // overfetch by 1x pages

  //// Orders Created Paginator Hooks
  let {
    // orderBy,
    // setOrderBy,
    // priceRange,
    // setPriceRange,
    // searchTerm,
    // setSearchTerm,
    // facets,
    // setFacets,
    paginationParams: {
      limit: ordersArrivingLimit,
      offset: ordersArrivingOffset,
      // totalCount,
      // setTotalCount,
      pageParam: ordersArrivingPageParam,
      setPageParam: ordersArrivingSetPageParam,
    },
    // currentCategories,
    // setCurrentCategories,
    index: ordersArrivingIndex,
    setIndex: ordersArrivingSetIndex,
  } = useFacetSearchOptions({
    limit: numItemsPerPage * overfetchBy,
    overfetchBy: overfetchBy,
  })

  //// Pending Approval Paginator Hooks
  let {
    paginationParams: {
      limit: ordersCompletingLimit,
      offset: ordersCompletingOffset,
      pageParam: ordersCompletingPageParam,
      setPageParam: ordersCompletingSetPageParam,
    },
    index: ordersCompletingIndex,
    setIndex: ordersCompletingSetIndex,
  } = useFacetSearchOptions({
    limit: numItemsPerPage * overfetchBy,
    overfetchBy: overfetchBy,
  })




  const _ordersArriving = useQuery<QueryData1, QueryVar1>(
    GET_ORDERS_ARRIVING_CONNECTION_DEALER, {
      variables: {
        query: {
          limit: ordersArrivingLimit,
          offset: ordersArrivingOffset,
        }
      },
      fetchPolicy: "cache-and-network",
      pollInterval: 5000,
    }
  );

  const _ordersCompleting = useQuery<QueryData2, QueryVar2>(
    GET_ORDERS_COMPLETING_CONNECTION_DEALER, {
      variables: {
        query: {
          limit: ordersCompletingLimit,
          offset: ordersCompletingOffset,
        }
      },
      fetchPolicy: "cache-and-network",
      pollInterval: 5000,
    }
  );

  const ordersCompletingConnection =
    _ordersCompleting?.data?.getOrdersExpiringConnectionDealer



  let refetchQueriesParams = [
    {
      query: GET_ORDERS_ARRIVING_CONNECTION_DEALER,
      variables: {
        query: {
          limit: ordersArrivingLimit,
          offset: ordersArrivingOffset,
        }
      },
    },
    {
      query: GET_ORDERS_COMPLETING_CONNECTION_DEALER,
      variables: {
        query: {
          limit: ordersCompletingLimit,
          offset: ordersCompletingOffset,
        }
      },
    },
  ]


  const ordersArrivingConnection =
    _ordersArriving?.data?.getOrdersArrivingConnectionDealer

  // console.log("ordersArrivingConnection:",ordersArrivingConnection)
  // console.log("ordersPendingApprovalConnection:",ordersPendingApprovalConnection)

  if (_ordersArriving.loading) {
    return (
      <LoadingBar
        absoluteTop
        color={Colors.gradientUniswapBlue1}
        height={4}
        width={'100vw'}
        loading={true}
      />
    )
  } else if (ordersArrivingConnection) {
    return (
      <main className={classes.root}>

        <Typography variant="h4" className={classes.subtitle1}>
          Arriving Orders
        </Typography>
        <SearchOptions
          // facets={facets}
          // setCategoryFacets={setCategoryFacets({ facets, setFacets })}
          // currentCategories={currentCategories}
          // setSearchTerm={setSearchTerm}
          // setOrderBy={setOrderBy}
          // setPriceRange={setPriceRange}
          // placeholder={"Search for orders..."}
          paginationParams={{
            totalCount: ordersArrivingConnection?.totalCount,
            overfetchBy: overfetchBy,
            limit: ordersArrivingLimit,
            pageParam: ordersArrivingPageParam,
            setPageParam: ordersArrivingSetPageParam,
            index: ordersArrivingIndex,
            setIndex: ordersArrivingSetIndex,
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
            backgroundColor: isDarkMode ? Colors.uniswapDarkNavy : Colors.cream,
            border: isDarkMode
              ? `1px solid ${Colors.uniswapNavy}`
              : `1px solid ${Colors.slateGreyDarker}`,
            borderRadius: BorderRadius,
            paddingBottom: '0.5rem',
          }}
        >
          <TitleRows classes={classes}/>
          <GridPaginatorGeneric<Order>
            index={ordersArrivingIndex}
            connection={ordersArrivingConnection}
            totalCount={ordersArrivingConnection?.totalCount ?? 0}
            // setTotalCount={setTotalCount}
            numItemsPerPage={numItemsPerPage}
            className={classes.rowContainer}
            classNameRoot={classes.gridRoot}
          >
            {({ node }) => {

              let order = node as OrderAdmin;
              console.log("arriving order >>>>>>: ", order)

              return (
                <RowExpander
                  key={order.id}
                  order={order}
                  admin={props.dealer}
                  index={ordersArrivingIndex}
                  initialOpen={router?.query?.orderId === order?.id}
                  refetchQueriesParams={refetchQueriesParams}
                  showApprovalButtons={false}
                />
              )
            }}
          </GridPaginatorGeneric>
        </SearchOptions>


      </main>
    )
  } else {
    return (
      <ErrorDisplay
        title={"Arriving Order Connections error"}
        error={_ordersArriving?.error}
      />
    )
  }
}



const TitleRows = (props: TitleRowsProps) => {
  const { classes } = props;
  return (
    <div className={classes.flexRowTitle}>
      <div className={classes.iconWidth}>
      </div>
      <div className={classes.flexItemTiny}>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Order ID
        </Typography>
      </div>
      <div className={classes.flexItemSlim}>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Date
        </Typography>
      </div>
      <div className={classes.flexItemTiny}>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Amount
        </Typography>
      </div>
      <div className={classes.flexItemSlim}>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Status
        </Typography>
      </div>
      <div className={classes.flexItemSlim}>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Seller
        </Typography>
      </div>
    </div>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
  dealer: UserPrivate;
}
interface TitleRowsProps extends WithStyles<typeof styles> {
}

interface QueryVar1 {
  query?: ConnectionOffsetQuery
}
interface QueryData1 {
  getOrdersArrivingConnectionDealer?: OrdersConnection
}
interface QueryVar2 {
  query?: ConnectionOffsetQuery
}
interface QueryData2 {
  getOrdersExpiringConnectionDealer?: OrdersConnection
}


const styles = (theme: Theme) => createStyles({
  root: {
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '0.5rem',
  },
  flexItem: {
    flexGrow: 0.5,
    flexBasis: "33%",
  },
  subtitle1: {
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightGrey
      : Colors.black,
    marginTop: '2rem',
    marginBottom: '0.5rem',
  },
  rowContainer: {
    width: '100%',
  },
  flexRowTitle: {
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    borderRadius: `${BorderRadius}px ${BorderRadius}px 0px 0px`,
    borderBottom: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDark}`,
    position: "relative", // for <LoadingBar/> absolute position
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    padding: '16px', // same padding as MenuItem 16px
    paddingBottom: '1rem',
  },
  flexItemSlim: {
    flexGrow: 1,
    flexBasis: "5%",
    minWidth: 40,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: 'center',
    paddingRight: '0.5rem',
    marginRight: '0.5rem',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  flexItemTiny: {
    flexBasis: "10%",
    minWidth: 60,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: 'center',
    paddingRight: '0.5rem',
    marginRight: '0.5rem',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  subtitle: {
    fontWeight: 600,
    fontSize: '0.825rem',
    textTransform: "capitalize",
  },
  iconWidth: {
    width: 44,
  },
  gridRoot: {
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy : Colors.cream,
    borderRadius: `0px 0px ${BorderRadius}px ${BorderRadius}px`,
    paddingBottom: '0.25rem',
  },
});

export default withStyles(styles)( ArrivingOrdersTable );