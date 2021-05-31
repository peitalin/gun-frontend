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
import { styles } from "../../ArrivingOrders/ArrivingOrdersTable"
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
  GET_ORDERS_ARRIVING_CONNECTION_DEALER,
  GET_ORDERS_COMPLETING_CONNECTION_DEALER,
} from "queries/orders-dealer-queries";
// Pagination
import ErrorDisplay from "components/ErrorDisplay";
import LoadingBar from "components/LoadingBar";
// formatters
import { formatDateTime } from "utils/dates";
import currency from "currency.js";
// graphl
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import RowExpander from "./RowExpander";
import { TitleRows } from "../../ArrivingOrders/ArrivingOrdersTable";

// Search Component
import SearchOptions, { SelectOption, setCategoryFacets } from "components/SearchOptions";
import {
  useFacetSearchOptions,
  totalItemsInCategoriesFacets,
} from "utils/hooksFacetSearch";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";




const CompletingOrdersTable: NextPage<ReactProps> = (props) => {

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

  let {
    paginationParams: {
      limit: ordersCompletingLimit,
      offset: ordersCompletingOffset,
      pageParam: ordersCompletingPageParam,
      setPageParam: ordersCompletingSetPageParam,
      index: ordersCompletingIndex,
      setIndex: ordersCompletingSetIndex,
    },
  } = useFacetSearchOptions({
    limit: numItemsPerPage * overfetchBy,
    overfetchBy: overfetchBy,
  })

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
    _ordersCompleting?.data?.getOrdersCompletingConnectionDealer


  let refetchQueriesParams = [
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


  if (_ordersCompleting.loading) {
    return (
      <LoadingBar
        absoluteTop
        color={Colors.gradientUniswapBlue1}
        height={4}
        width={'100vw'}
        loading={true}
      />
    )
  } else if (ordersCompletingConnection) {
    return (
      <main className={classes.root}>

        <Typography variant="h4" className={classes.subtitle1}>
          Orders Completing
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
            totalCount: ordersCompletingConnection?.totalCount,
            overfetchBy: overfetchBy,
            limit: ordersCompletingLimit,
            pageParam: ordersCompletingPageParam,
            setPageParam: ordersCompletingSetPageParam,
            index: ordersCompletingIndex,
            setIndex: ordersCompletingSetIndex,
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
            index={ordersCompletingIndex}
            connection={ordersCompletingConnection}
            totalCount={ordersCompletingConnection?.totalCount ?? 0}
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
                  index={ordersCompletingIndex}
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
        title={"Orders Completing Connections error"}
        error={_ordersCompleting?.error}
      />
    )
  }
}






interface ReactProps extends WithStyles<typeof styles> {
  dealer: UserPrivate;
}
interface TitleRowsProps extends WithStyles<typeof styles> {
}
interface QueryVar2 {
  query?: ConnectionQuery
}
interface QueryData2 {
  getOrdersCompletingConnectionDealer?: OrdersConnection
}



export default withStyles(styles)( CompletingOrdersTable );