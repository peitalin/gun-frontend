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
  GET_ORDERS_EXPIRING_CONNECTION,
} from "queries/orders-queries";
// Pagination
import { ConnectionQueryProps } from "components/Paginators/usePaginatePagedQueryHook";
import ErrorDisplay from "components/Error";
import LoadingBar from "components/LoadingBar";
// formatters
import { formatDate } from "utils/dates";
import currency from "currency.js";
// graphl
import { useMutation, useQuery } from "@apollo/client";

import RowExpander from "./RowExpander";
import { createDataForExpiringTable } from "./createData";

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
  } = props;

  /////////////////////////////////// paginator
  let numItemsPerPage = 10;
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
      limit: ordersExpiringLimit,
      offset: ordersExpiringOffset,
      // totalCount,
      // setTotalCount,
      pageParam: ordersExpiringPageParam,
      setPageParam: ordersExpiringSetPageParam,
    },
    // currentCategories,
    // setCurrentCategories,
    index: ordersExpiringIndex,
    setIndex: ordersExpiringSetIndex,
  } = useFacetSearchOptions({
    limit: numItemsPerPage * overfetchBy,
    overfetchBy: overfetchBy,
  })

  const _ordersExpiring = useQuery<QueryData, QueryVar>(
    GET_ORDERS_EXPIRING_CONNECTION, {
      variables: {
        query: {
          limit: ordersExpiringLimit,
          offset: ordersExpiringOffset,
        }
      },
      fetchPolicy: "cache-and-network",
      // pollInterval: 2000,
    }
  );

  const ordersExpiringConnection =
    _ordersExpiring?.data?.getOrdersExpiringConnection


  return (
    <main className={classes.root}>
      <LoadingBar
        absoluteTop
        color={Colors.gradientUniswapBlue1}
        height={4}
        width={'100vw'}
        loading={_ordersExpiring.loading}
      />
      <Typography variant="h4" className={classes.subtitle1}>
        Expiring Orders
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
          totalCount: ordersExpiringConnection?.totalCount,
          overfetchBy: overfetchBy,
          limit: ordersExpiringLimit,
          pageParam: ordersExpiringPageParam,
          setPageParam: ordersExpiringSetPageParam,
          index: ordersExpiringIndex,
          setIndex: ordersExpiringSetIndex,
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
        <TitleRows classes={classes}/>
        <GridPaginatorGeneric<Orders>
          index={ordersExpiringIndex}
          connection={ordersExpiringConnection}
          totalCount={ordersExpiringConnection?.totalCount ?? 0}
          // setTotalCount={setTotalCount}
          numItemsPerPage={numItemsPerPage}
          className={classes.rowContainer}
          classNameRoot={classes.gridRoot}
        >
          {({ node: order }) => {

            console.log("order>>>>>>: ", order)
            const row2 = createDataForExpiringTable({
              id: order.id,
              total: order.total,
              createdAt: order.createdAt,
              seller: order.seller,
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
                index={ordersExpiringIndex}
                showApprovalButtons={false}
              />
            )
          }}
        </GridPaginatorGeneric>
      </SearchOptions>
    </main>
  )
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
          Created At
        </Typography>
      </div>
      <div className={classes.flexItemSlim}>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Expires
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
    </div>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
  admin: User;
}
interface TitleRowsProps extends WithStyles<typeof styles> {
}

interface QueryData {
  getOrdersExpiringConnection?: OrdersConnection
}
interface QueryVar {
  query?: ConnectionOffsetQuery
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
    color: Colors.uniswapLightGrey,
    marginTop: '2rem',
    marginBottom: '0.5rem',
  },
  rowContainer: {
    width: '100%',
  },
  flexRowTitle: {
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.darkWhite,
    borderRadius: `${BorderRadius}px ${BorderRadius}px 0px 0px`,
    position: "relative", // for <LoadingBar/> absolute position
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    padding: '16px', // same padding as MenuItem 16px
    paddingBottom: '1rem',
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
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
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.darkWhite,
    border: theme.palette.type === 'dark'
      ? `unset`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderTop: 'none',
    borderRadius: `0px 0px ${BorderRadius}px ${BorderRadius}px`,
    paddingBottom: '0.25rem',
  },
});

export default withStyles(styles)( OrdersPendingApprovalTable );
