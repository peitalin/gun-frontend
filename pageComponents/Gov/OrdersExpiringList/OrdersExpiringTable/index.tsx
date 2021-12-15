import React from "react";
import clsx from "clsx";
// SSR
import { NextPage, NextPageContext } from 'next';
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius } from "layout/AppTheme";
// MUI
import Typography from "@mui/material/Typography";
// Typings
import {
  OrdersConnection,
  Order,
  OrderAdmin,
  OrderStatus,
  UserPrivate,
  ConnectionQuery
} from "typings/gqlTypes";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from 'reduxStore/grand-reducer';
// graphl
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ORDERS_EXPIRING_CONNECTION_ADMIN,
} from "queries/orders-admin-queries";
// components
import LoadingBar from "components/LoadingBar";
import RowExpanderExpiringOrders from "./RowExpanderExpiringOrders";
// Search Component
import SearchOptions, { SelectOption, setCategoryFacets } from "components/SearchOptions";
import {
  useFacetSearchOptions,
  totalItemsInCategoriesFacets,
} from "utils/hooksFacetSearch";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";




const OrdersExpiringTable: NextPage<ReactProps> = (props) => {

  //
  const {
    classes,
  } = props;


  const isDarkMode = useSelector<GrandReduxState, boolean>(s => {
    return s.reduxLogin.darkMode === 'dark'
  })

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
      index: ordersExpiringIndex,
      setIndex: ordersExpiringSetIndex,
    },
    // currentCategories,
    // setCurrentCategories,
  } = useFacetSearchOptions({
    limit: numItemsPerPage * overfetchBy,
    overfetchBy: overfetchBy,
  })

  const _ordersExpiring = useQuery<QueryData, QueryVar>(
    GET_ORDERS_EXPIRING_CONNECTION_ADMIN, {
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
    _ordersExpiring?.data?.getOrdersExpiringConnectionAdmin


  return (
    <main className={classes.root}>
      <LoadingBar
        absoluteTop
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
        sortByOptions={[]}
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
          index={ordersExpiringIndex}
          connection={ordersExpiringConnection}
          totalCount={ordersExpiringConnection?.totalCount ?? 0}
          // setTotalCount={setTotalCount}
          numItemsPerPage={numItemsPerPage}
          className={classes.rowContainer}
          classNameRoot={classes.gridRoot}
        >
          {({ node }) => {

            let order = node as OrderAdmin;
            // console.log("expiring order: ", order)

            return (
              <RowExpanderExpiringOrders
                key={order.id}
                order={order}
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
          Expiry Date
        </Typography>
      </div>
      <div className={classes.flexItemSlim}>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Expiry ETA
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
  admin: UserPrivate;
}
interface TitleRowsProps extends WithStyles<typeof styles> {
}

interface QueryData {
  getOrdersExpiringConnectionAdmin: OrdersConnection
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
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLightGrey
      : Colors.black,
    marginTop: '2rem',
    marginBottom: '0.5rem',
  },
  rowContainer: {
    width: '100%',
  },
  flexRowTitle: {
    background: theme.palette.mode === 'dark'
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
    borderBottom: theme.palette.mode === 'dark'
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
    width: 32,
  },
  gridRoot: {
    background: theme.palette.mode === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    borderRadius: `0px 0px ${BorderRadius}px ${BorderRadius}px`,
    paddingBottom: '0.25rem',
  },
});

export default withStyles(styles)( OrdersExpiringTable );
