import React from "react";
import clsx from "clsx";
// SSR
import { NextPage, NextPageContext } from 'next';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, isThemeDark } from "layout/AppTheme";
import { useTheme } from "@material-ui/core";
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
import ErrorDisplay from "components/ErrorDisplay";
import LoadingBar from "components/LoadingBar";
// graphl
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

import RowExpander from "./RowExpander";
import { useRouter } from "next/router";

// Search Component
import SearchOptions, { SelectOption, setCategoryFacets } from "components/SearchOptions";
import {
  useFacetSearchOptions,
  totalItemsInCategoriesFacets,
} from "utils/hooksFacetSearch";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";
import OrderPriceBreakdown from "pageComponents/Gov/OrderViewer/OrderPriceBreakdown";




const OrdersPendingApprovalTable: NextPage<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  let router = useRouter()
  let theme = useTheme()
  const isDarkMode = isThemeDark(theme);

  /////////////////////////////////// paginator

  const numItemsPerPage = 5;
  const overfetchBy = 1;
  const initialLimit = numItemsPerPage * overfetchBy
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
      index: ordersCreatedIndex,
      setIndex: ordersCreatedSetIndex,
    },
    // currentCategories,
    // setCurrentCategories,
  } = useFacetSearchOptions({
    limit: initialLimit,
    overfetchBy: overfetchBy,
  })

  //// Pending Approval Paginator Hooks
  let {
    paginationParams: {
      limit: ordersPALimit,
      offset: ordersPAOffset,
      pageParam: ordersPAPageParam,
      setPageParam: ordersPASetPageParam,
      index: ordersPAIndex,
      setIndex: ordersPASetIndex,
    },
  } = useFacetSearchOptions({
    limit: initialLimit,
    overfetchBy: overfetchBy,
  })

  //// Admin Approved Paginator Hooks
  let {
    paginationParams: {
      limit: ordersAALimit,
      offset: ordersAAOffset,
      pageParam: ordersAAPageParam,
      setPageParam: ordersAASetPageParam,
      index: ordersAAIndex,
      setIndex: ordersAASetIndex,
    },
  } = useFacetSearchOptions({
    limit: initialLimit,
    overfetchBy: overfetchBy,
  })


  // needs to be passed down for approveForm to update cache
  const variables = {
    ordersCreated: {
      query: {
        limit: ordersCreatedLimit,
        offset: ordersCreatedOffset,
      }
    },
    ordersPendingApproval: {
      query: {
        limit: ordersPALimit,
        offset: ordersPAOffset,
      }
    },
    ordersAdminApproved: {
      query: {
        limit: ordersAALimit,
        offset: ordersAAOffset,
      }
    },
  }

  const  refetchQueriesParams = [
    {
      query: GET_ORDERS_CREATED_CONNECTION,
      variables: variables.ordersCreated,
    },
    {
      query: GET_ORDERS_PENDING_APPROVAL_CONNECTION,
      variables: variables.ordersPendingApproval,
    },
    {
      query: GET_ORDERS_ADMIN_APPROVED_CONNECTION ,
      variables: variables.ordersPendingApproval,
    },
  ]



  const _ordersCreated = useQuery<QueryData, QueryVar>(
    GET_ORDERS_CREATED_CONNECTION, {
      variables: variables.ordersCreated,
      fetchPolicy: "cache-and-network",
    }
  );

  const _ordersPendingApproval = useQuery<QueryData, QueryVar>(
    GET_ORDERS_PENDING_APPROVAL_CONNECTION, {
      variables: variables.ordersPendingApproval,
      fetchPolicy: "cache-and-network",
    }
  );

  const _ordersAdminApproved = useQuery<QueryData, QueryVar>(
    GET_ORDERS_ADMIN_APPROVED_CONNECTION, {
      variables: variables.ordersAdminApproved,
      fetchPolicy: "cache-and-network",
    }
  );


  const ordersCreatedConnection =
    _ordersCreated?.data?.getOrdersCreatedConnectionAdmin

  const ordersPendingApprovalConnection =
    _ordersPendingApproval?.data?.getOrdersPendingApprovalConnectionAdmin

  const ordersAdminApprovedConnection =
    _ordersAdminApproved?.data?.getOrdersAdminApprovedConnection


  console.log("ordersCreatedConnection:",ordersCreatedConnection)
  // console.log("ordersPendingApprovalConnection:",ordersPendingApprovalConnection)

  if (_ordersAdminApproved.loading || _ordersPendingApproval.loading) {
    return (
      <LoadingBar
        absoluteTop
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
              console.log("order>>>>>>: ", order)

              return (
                <RowExpander
                  key={order.id}
                  order={order}
                  admin={props.admin}
                  index={ordersCreatedIndex}
                  initialOpen={router?.query?.orderId === order?.id}
                  refetchQueriesParams={refetchQueriesParams}
                  variables={variables}
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
                  initialOpen={router?.query?.orderId === order?.id}
                  refetchQueriesParams={refetchQueriesParams}
                  variables={variables}
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
                  initialOpen={router?.query?.orderId === order?.id}
                  refetchQueriesParams={refetchQueriesParams}
                  variables={variables}
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
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.black,
    marginTop: '2rem',
    marginBottom: '0.5rem',
  },
  rowContainer: {
    width: '100%',
  },
  flexRowTitle: {
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    borderRadius: `${BorderRadius}px ${BorderRadius}px 0px 0px`,
    border: 'unset',
    // border: isThemeDark(theme)
    //   ? `unset`
    //   : `1px solid ${Colors.slateGreyDark}`,
    // borderBottom: isThemeDark(theme)
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
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    borderRadius: `0px 0px ${BorderRadius}px ${BorderRadius}px`,
    paddingBottom: '0.25rem',
  },
});

export default withStyles(styles)( OrdersPendingApprovalTable );
