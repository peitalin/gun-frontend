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
  ConnectionQuery
} from "typings/gqlTypes";
import {
  GET_ORDERS_CREATED_CONNECTION,
  GET_ORDERS_PENDING_APPROVAL_CONNECTION,
  GET_ORDERS_ADMIN_APPROVED_CONNECTION,
} from "queries/orders-admin-queries";
// Pagination
import { ConnectionQueryProps } from "components/Paginators/usePaginatePagedQueryHook";
import ErrorDisplay from "components/Error";
import LoadingBar from "components/LoadingBar";
// graphl
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

import RowExpander from "./RowExpander";

// Search Component
import SearchOptions, { SelectOption, setCategoryFacets } from "components/SearchOptions";
import {
  useFacetSearchOptions,
  totalItemsInCategoriesFacets,
} from "utils/hooksFacetSearch";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";




const OrdersPendingApprovalTable: NextPage<ReactProps> = (props) => {

  //
  const {
    classes,
    month = 10,
    year = 2019,
    // setRefetchPayoutItems: undefined,
    // refetchAll: undefined,
  } = props;

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
      limit: ordersCreatedLimit,
      offset: ordersCreatedOffset,
      // totalCount,
      // setTotalCount,
      pageParam: ordersCreatedPageParam,
      setPageParam: ordersCreatedSetPageParam,
    },
    // currentCategories,
    // setCurrentCategories,
    index: ordersCreatedIndex,
    setIndex: ordersCreatedSetIndex,
  } = useFacetSearchOptions({
    limit: numItemsPerPage * overfetchBy,
    overfetchBy: overfetchBy,
  })

  //// Pending Approval Paginator Hooks
  let {
    paginationParams: {
      limit: ordersPALimit,
      offset: ordersPAOffset,
      pageParam: ordersPAPageParam,
      setPageParam: ordersPASetPageParam,
    },
    index: ordersPAIndex,
    setIndex: ordersPASetIndex,
  } = useFacetSearchOptions({
    limit: numItemsPerPage * overfetchBy,
    overfetchBy: overfetchBy,
  })

  //// Admin Approved Paginator Hooks
  let {
    paginationParams: {
      limit: ordersAALimit,
      offset: ordersAAOffset,
      pageParam: ordersAAPageParam,
      setPageParam: ordersAASetPageParam,
    },
    index: ordersAAIndex,
    setIndex: ordersAASetIndex,
  } = useFacetSearchOptions({
    limit: numItemsPerPage * overfetchBy,
    overfetchBy: overfetchBy,
  })




  const [
    getOrdersCreated,
    _ordersCreated
  ] = useLazyQuery<QueryData, QueryVar>(
    GET_ORDERS_CREATED_CONNECTION, {
      variables: {
        query: {
          limit: ordersCreatedLimit,
          offset: ordersCreatedOffset,
        }
      },
      fetchPolicy: "cache-and-network",
    }
  );

  const [
    getOrdersPendingApproval,
    _ordersPendingApproval
  ] = useLazyQuery<QueryData, QueryVar>(
    GET_ORDERS_PENDING_APPROVAL_CONNECTION, {
      variables: {
        query: {
          limit: ordersPALimit,
          offset: ordersPAOffset,
        }
      },
      fetchPolicy: "cache-and-network",
    }
  );

  const [
    getOrdersAdminApproved,
    _ordersAdminApproved,
  ] = useLazyQuery<QueryData, QueryVar>(
    GET_ORDERS_ADMIN_APPROVED_CONNECTION, {
      variables: {
        query: {
          limit: ordersAALimit,
          offset: ordersAAOffset,
        }
      },
      fetchPolicy: "cache-and-network",
    }
  );

  let refetchQueriesParams = [
    {
      query: GET_ORDERS_CREATED_CONNECTION,
      variables: {
        query: {
          limit: ordersCreatedLimit,
          offset: ordersCreatedOffset,
        }
      },
    },
    {
      query: GET_ORDERS_PENDING_APPROVAL_CONNECTION,
      variables: {
        query: {
          limit: ordersPALimit,
          offset: ordersPAOffset,
        }
      },
    },
    {
      query: GET_ORDERS_ADMIN_APPROVED_CONNECTION ,
      variables: {
        query: {
          limit: ordersAALimit,
          offset: ordersAAOffset,
        }
      },
    },
  ]



  const refetchTheOrders = async () => {
    if (
      _ordersCreated &&
      typeof _ordersCreated.refetch === 'function'
    ) {
      await _ordersCreated.refetch()
    }
    if (
      _ordersPendingApproval &&
      typeof _ordersPendingApproval.refetch === 'function'
    ) {
      await _ordersPendingApproval.refetch()
    }
    if (
      _ordersAdminApproved &&
      typeof _ordersAdminApproved.refetch === 'function'
    ) {
      await _ordersAdminApproved.refetch()
    }
  }

  const refetchOrders = React.useCallback(() => {
    // apollo devs are retards
    // https://github.com/apollographql/react-apollo/issues/3862
    console.log('force refetching orders..')
    setTimeout(() => refetchTheOrders(), 0)
  }, [refetchTheOrders])


  React.useEffect(() => {

    getOrdersCreated()
    getOrdersPendingApproval()
    getOrdersAdminApproved()

    refetchOrders()

  }, [_ordersCreated?.data])



  const ordersCreatedConnection =
    _ordersCreated?.data?.getOrdersCreatedConnectionAdmin

  const ordersPendingApprovalConnection =
    _ordersPendingApproval?.data?.getOrdersPendingApprovalConnectionAdmin

  const ordersAdminApprovedConnection =
    _ordersAdminApproved?.data?.getOrdersAdminApprovedConnection


  // console.log("ordersCreatedConnection:",ordersCreatedConnection)
  // console.log("ordersPendingApprovalConnection:",ordersPendingApprovalConnection)

  if (_ordersAdminApproved.loading || _ordersPendingApproval.loading) {
    return (
      <LoadingBar
        absoluteTop
        color={Colors.gradientUniswapBlue1}
        height={4}
        width={'100vw'}
        loading={true}
      />
    )
  } else if (_ordersPendingApproval && _ordersAdminApproved) {
    return (
      <main className={classes.root}>


        <Typography variant="h4" className={classes.subtitle1}>
          Created Orders
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
            totalCount: ordersCreatedConnection?.totalCount,
            overfetchBy: overfetchBy,
            limit: ordersCreatedLimit,
            pageParam: ordersCreatedPageParam,
            setPageParam: ordersCreatedSetPageParam,
            index: ordersCreatedIndex,
            setIndex: ordersCreatedSetIndex,
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
            index={ordersCreatedIndex}
            connection={ordersCreatedConnection}
            totalCount={ordersCreatedConnection?.totalCount ?? 0}
            // setTotalCount={setTotalCount}
            numItemsPerPage={numItemsPerPage}
            className={classes.rowContainer}
            classNameRoot={classes.gridRoot}
          >
            {({ node }) => {

              let order = node as OrderAdmin;
              // console.log("order>>>>>>: ", order)

              return (
                <RowExpander
                  key={order.id}
                  order={order}
                  admin={props.admin}
                  index={ordersCreatedIndex}
                  refetchQueriesParams={refetchQueriesParams}
                  showApprovalButtons={false}
                />
              )
            }}
          </GridPaginatorGeneric>
        </SearchOptions>





        <Typography variant="h4" className={classes.subtitle1}>
          Orders Pending Approval
        </Typography>
        <SearchOptions
          paginationParams={{
            totalCount: ordersPendingApprovalConnection?.totalCount,
            overfetchBy: overfetchBy,
            limit: ordersPALimit,
            pageParam: ordersPAPageParam,
            setPageParam: ordersPASetPageParam,
            index: ordersPAIndex,
            setIndex: ordersPASetIndex,
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
            backgroundColor: isDarkMode ? Colors.uniswapDarkNavy : Colors.cream,
            // border: isDarkMode
            //   ? `1px solid ${Colors.uniswapNavy}`
            //   : `1px solid ${Colors.slateGreyDarker}`,
            borderRadius: BorderRadius,
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
            index={ordersPAIndex}
            connection={ordersPendingApprovalConnection}
            totalCount={ordersPendingApprovalConnection?.totalCount ?? 0}
            numItemsPerPage={numItemsPerPage}
            className={classes.rowContainer}
            classNameRoot={classes.gridRoot}
          >
            {({ node }) => {

              let order = node as OrderAdmin;
              // console.log("order.paymentIntent.status>>>>>>: ", order?.paymentIntent?.status)

              return (
                <RowExpander
                  key={order.id}
                  order={order}
                  admin={props.admin}
                  index={ordersPAIndex}
                  refetchQueriesParams={refetchQueriesParams}
                  showApprovalButtons={true}
                />
              )
            }}
          </GridPaginatorGeneric>
        </SearchOptions>




        <Typography variant="h4" className={classes.subtitle1}>
          Admin Approved Orders
        </Typography>
        <SearchOptions
          paginationParams={{
            totalCount: ordersAdminApprovedConnection?.totalCount,
            overfetchBy: overfetchBy,
            limit: ordersAALimit,
            pageParam: ordersAAPageParam,
            setPageParam: ordersAASetPageParam,
            index: ordersAAIndex,
            setIndex: ordersAASetIndex,
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
            index={ordersAAIndex}
            connection={ordersAdminApprovedConnection}
            totalCount={ordersAdminApprovedConnection?.totalCount ?? 0}
            numItemsPerPage={numItemsPerPage}
            className={classes.rowContainer}
            classNameRoot={classes.gridRoot}
          >
            {({ node }) => {

              let order = node as OrderAdmin
              // console.log("order: ", order.payoutitems)

              return (
                <RowExpander
                  key={order.id}
                  order={order}
                  admin={props.admin}
                  index={ordersAAIndex}
                  refetchQueriesParams={refetchQueriesParams}
                  showApprovalButtons={true}
                />
              )
            }}
          </GridPaginatorGeneric>
        </SearchOptions>

      </main>
    )
  } else {
    return <ErrorDisplay title={"Order Connections error"} />
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
  month?: number;
  year?: number;
  admin: UserPrivate;
}
interface TitleRowsProps extends WithStyles<typeof styles> {
}

interface QueryData {
  getOrdersCreatedConnectionAdmin?: OrdersConnection
  getOrdersPendingApprovalConnectionAdmin?: OrdersConnection
  getOrdersAdminApprovedConnection?: OrdersConnection
}
interface QueryVar {
  query?: ConnectionQuery
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
    border: 'unset',
    // border: theme.palette.type === 'dark'
    //   ? `unset`
    //   : `1px solid ${Colors.slateGreyDark}`,
    // borderBottom: theme.palette.type === 'dark'
    //   ? `1px solid ${Colors.uniswapGrey}`
    //   : `1px solid ${Colors.slateGreyDark}`,
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

export default withStyles(styles)( OrdersPendingApprovalTable );
