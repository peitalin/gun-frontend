import React from "react";
import clsx from "clsx";
// SSR
import { NextPage, NextPageContext } from 'next';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// MUI
import Typography from "@material-ui/core/Typography";
// Typings
import {
  UserPrivate,
  OrdersConnection,
  Orders,
  User,
  OrderStatus,
  ConnectionOffsetQuery
} from "typings/gqlTypes";
import {
  GET_ORDERS_CREATED_CONNECTION,
  GET_ORDERS_PENDING_APPROVAL_CONNECTION,
  GET_ORDERS_ADMIN_APPROVED_CONNECTION,
} from "queries/orders-queries";
// Pagination
import { ConnectionQueryProps } from "components/Paginators/usePaginatePagedQueryHook";
import ErrorDisplay from "components/Error";
import LoadingBar from "components/LoadingBar";
// formatters
import dayjs from 'dayjs';
import currency from "currency.js";
// graphl
import { useMutation, useQuery } from "@apollo/client";

import RowExpander from "./RowExpander";
import { createData } from "./createData";

// Search Component
import SearchOptions, { SelectOption, setCategoryFacets } from "components/SearchOptions";
import {
  useFacetSearchOptions,
  useEffectUpdateGridAccum,
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

  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()
  const asTime = (d: Date) => dayjs(d).format("YYYY-MM-DD HH:mm:ss")
  const [count, setCount] = React.useState(10);

  const [itemsPerPage, setItemsPerPage] = React.useState(3);



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




  const _ordersCreated = useQuery<QueryData, QueryVar>(
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

  const _ordersPendingApproval = useQuery<QueryData, QueryVar>(
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

  const _ordersAdminApproved = useQuery<QueryData, QueryVar>(
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


  const ordersCreatedConnection =
    _ordersCreated?.data?.getOrdersCreatedConnectionAdmin

  const ordersPendingApprovalConnection =
    _ordersPendingApproval?.data?.getOrdersPendingApprovalConnectionAdmin

  const ordersAdminApprovedConnection =
    _ordersAdminApproved?.data?.getOrdersAdminApprovedConnection



  if (_ordersAdminApproved.loading || _ordersPendingApproval.loading) {
    return (
      <LoadingBar
        absoluteTop
        color={Colors.magenta}
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
          updateSetPageDelay={150}
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
          <TitleRows classes={classes}/>
          <GridPaginatorGeneric<Orders>
            index={ordersCreatedIndex}
            connection={ordersCreatedConnection}
            totalCount={ordersCreatedConnection?.totalCount ?? 0}
            // setTotalCount={setTotalCount}
            numItemsPerPage={numItemsPerPage}
            className={classes.rowContainer}
            classNameRoot={classes.gridRoot}
          >
            {({ node: order }) => {

              // console.log("order: ", order.payoutitems)
              const row2 = createData({
                id: order.id,
                total: order.total,
                createdAt: order.createdAt,
                seller: order.seller as any,
                buyer: order.buyer,
                currentOrderSnapshot: order.currentSnapshot,
                orderSnapshots: order.orderSnapshots,
                product: order.product,
                payoutId: order?.payoutItems?.[0]?.payoutId,
                payoutStatus: order?.payoutItems?.[0]?.payoutStatus,
              })

              return (
                <RowExpander
                  key={order.id}
                  row={row2}
                  admin={props.admin}
                  index={ordersCreatedIndex}
                  refetchQueriesParams={refetchQueriesParams}
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
          updateSetPageDelay={150}
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
          <TitleRows classes={classes}/>
          <GridPaginatorGeneric<Orders>
            index={ordersPAIndex}
            connection={ordersPendingApprovalConnection}
            totalCount={ordersPendingApprovalConnection?.totalCount ?? 0}
            numItemsPerPage={numItemsPerPage}
            className={classes.rowContainer}
            classNameRoot={classes.gridRoot}
          >
            {({ node: order }) => {

              // console.log("order: ", order.payoutItems)
              const row2 = createData({
                id: order.id,
                total: order.total,
                createdAt: order.createdAt,
                seller: order.seller as any,
                buyer: order.buyer,
                currentOrderSnapshot: order.currentSnapshot,
                orderSnapshots: order.orderSnapshots,
                product: order.product,
                payoutId: order?.payoutItems?.[0]?.payoutId,
                payoutStatus: order?.payoutItems?.[0]?.payoutStatus,
              })

              return (
                <RowExpander
                  key={order.id}
                  row={row2}
                  admin={props.admin}
                  index={ordersPAIndex}
                  refetchQueriesParams={refetchQueriesParams}
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
          updateSetPageDelay={150}
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
          <TitleRows classes={classes}/>
          <GridPaginatorGeneric<Orders>
            index={ordersAAIndex}
            connection={ordersAdminApprovedConnection}
            totalCount={ordersAdminApprovedConnection?.totalCount ?? 0}
            numItemsPerPage={numItemsPerPage}
            className={classes.rowContainer}
            classNameRoot={classes.gridRoot}
          >
            {({ node: order }) => {

              // console.log("order: ", order.payoutitems)
              const row2 = createData({
                id: order.id,
                total: order.total,
                createdAt: order.createdAt,
                seller: order.seller as any,
                buyer: order.buyer,
                currentOrderSnapshot: order.currentSnapshot,
                orderSnapshots: order.orderSnapshots,
                product: order.product,
                payoutId: order?.payoutItems?.[0]?.payoutId,
                payoutStatus: order?.payoutItems?.[0]?.payoutStatus,
              })

              return (
                <RowExpander
                  key={order.id}
                  row={row2}
                  admin={props.admin}
                  index={ordersAAIndex}
                  refetchQueriesParams={refetchQueriesParams}
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
  admin: User;
}
interface TitleRowsProps extends WithStyles<typeof styles> {
}

interface QueryData {
  getOrdersCreatedConnectionAdmin?: OrdersConnection
  getOrdersPendingApprovalConnectionAdmin?: OrdersConnection
  getOrdersAdminApprovedConnection?: OrdersConnection
}
interface QueryVar {
  query?: ConnectionOffsetQuery
}


const styles = (theme: Theme) => createStyles({
  root: {
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '0.5rem',
  },
  flexRowStart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
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
  spaceBetween: {
    justifyContent: "space-between",
  },
  link: {
    fontSize: "0.8rem",
    color: "#2484FF",
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  width100: {
    width: '100%',
  },
  dateInputContainer: {
    margin: '1rem',
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
  },
  monthSelect: {
    padding: '1rem',
  },
  yearSelect: {
    padding: '1rem',
  },
  createPayoutsButton: {
    height: 40,
  },
  subtitle1: {
    color: Colors.uniswapLightGrey,
    marginTop: '2rem',
    marginBottom: '0.5rem',
  },
  rowContainer: {
    width: '100%',
  },
  flexRowTitle: {
    backgroundColor: Colors.uniswapDarkNavy,
    borderRadius: `${BorderRadius}px ${BorderRadius}px 0px 0px`,
    position: "relative", // for <LoadingBar/> absolute position
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    padding: '16px', // same padding as MenuItem 16px
    paddingBottom: '1rem',
    borderBottom: `1px solid ${Colors.uniswapGrey}`,
  },
  flexItemWide: {
    flexBasis: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'flex-start',
    paddingRight: '0.5rem',
    marginRight: '0.5rem',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    flexGrow: 1,
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
    backgroundColor: theme.colors.uniswapDarkNavy,
    borderRadius: `0px 0px ${BorderRadius}px ${BorderRadius}px`,
    paddingBottom: '0.25rem',
  },
});

export default withStyles(styles)( OrdersPendingApprovalTable );
