import React from "react";
import clsx from "clsx";
// SSR
import { NextPage } from 'next';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, isThemeDark } from "layout/AppTheme";
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
  GET_ORDERS_ADMIN_APPROVED_CONNECTION,
  GET_ORDERS_ADMIN_APPROVED_BY_IDS_CONNECTION,
} from "queries/orders-admin-queries";
// Pagination
import ErrorDisplay from "components/ErrorDisplay";
import LoadingBar from "components/LoadingBar";
// graphl
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

import RowExpander from "./RowExpander";
import { useRouter } from "next/router";
import { useTheme } from "@material-ui/core";
import { showDate } from "utils/dates";
import copy from "clipboard-copy";
import { useSnackbar } from "notistack";

// Search Component
import SearchOptions, { SelectOption, setCategoryFacets } from "components/SearchOptions";
import {
  useFacetSearchOptions,
  totalItemsInCategoriesFacets,
} from "utils/hooksFacetSearch";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";




const PayoutsApprovedTable: NextPage<ReactProps> = (props) => {

  //
  const {
    classes,
  } = props;

  let theme = useTheme()
  let router = useRouter();
  let snackbar = useSnackbar()

  /////////////////////////////////// paginator
  let numItemsPerPage = 50;
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
      limit: limit,
      offset: offset,
      totalCount,
      setTotalCount,
      pageParam: pageParam,
      setPageParam: setPageParam,
      index: index,
      setIndex: setIndex,
    },
    // currentCategories,
    // setCurrentCategories,
  } = useFacetSearchOptions({
    limit: numItemsPerPage * overfetchBy,
    overfetchBy: overfetchBy,
  })


  const { data, loading, error } = useQuery<QueryData, QueryVar>(
    GET_ORDERS_ADMIN_APPROVED_BY_IDS_CONNECTION, {
      variables: {
        orderIds: props.orderIds,
        limit: limit,
        offset: offset,
      },
      fetchPolicy: "no-cache",
    }
  )


  let refetchQueriesParams = [
    {
      query: GET_ORDERS_ADMIN_APPROVED_BY_IDS_CONNECTION,
      variables: {
        query: {
          orderIds: props.orderIds,
          limit: limit,
          offset: offset,
        }
      },
    },
  ]

  const ordersConnection = data?.getOrdersAdminApprovedByIdsConnection


  if (loading) {
    return (
      <LoadingBar
        absoluteTop
        color={Colors.gradientUniswapBlue1}
        height={4}
        width={'100vw'}
        loading={true}
      />
    )
  } else if (data) {
    return (
      <main className={classes.root}>
        <div className={classes.flexRow}>
          {
            !loading &&
            <>
              <span onClick={() => {
                snackbar.enqueueSnackbar(
                  `Copied "Payout ${showDate(props.day)}"`,
                  { variant: "info" }
                )
                copy(`Payout ${showDate(props.day)}`)
              }}>
                <Typography className={classes.dateTitle}>
                  {`Payouts for ${showDate(props.day)}`}
                </Typography>
              </span>
              <Typography className={classes.dateTitle2}>
                {'- Estimated 2 days unbonding'}
              </Typography>
            </>
          }
        </div>
        <SearchOptions
          // facets={facets}
          // setCategoryFacets={setCategoryFacets({ facets, setFacets })}
          // currentCategories={currentCategories}
          // setSearchTerm={setSearchTerm}
          // setOrderBy={setOrderBy}
          // setPriceRange={setPriceRange}
          // placeholder={"Search for orders..."}
          paginationParams={{
            totalCount: totalCount,
            overfetchBy: overfetchBy,
            limit: limit,
            pageParam: pageParam,
            setPageParam: setPageParam,
            index: index,
            setIndex: setIndex,
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
            paddingRight: '1rem',
          }}
          bottomSectionStyles={{
            marginBottom: '1rem',
            backgroundColor: isThemeDark(theme)
              ? Colors.uniswapDarkNavy
              : Colors.cream,
            border: isThemeDark(theme)
              ? `1px solid ${Colors.uniswapNavy}`
              : `1px solid ${Colors.slateGreyDarker}`,
            borderRadius: BorderRadius,
            paddingBottom: '0.5rem',
          }}
        >
          <TitleRows
            classes={classes}
            loading={loading}
          />
          <GridPaginatorGeneric<Order>
            index={index}
            connection={ordersConnection}
            totalCount={totalCount ?? 0}
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
                  index={index}
                  initialOpen={router?.query?.orderId === order?.id}
                  refetchQueriesParams={refetchQueriesParams}
                />
              )
            }}
          </GridPaginatorGeneric>
        </SearchOptions>

      </main>
    )
  } else {
    return <ErrorDisplay title={"Payouts Approved Connections error"} />
  }
}



const TitleRows = (props: TitleRowsProps) => {
  const { classes, loading } = props;
  return (
    <div className={classes.flexRowTitle}>
      <div className={classes.flexItemPlaceholder}>
      </div>
      <div className={clsx(classes.flexItem, classes.flexItemMaxWidth120)}>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Order ID
        </Typography>
      </div>
      <div className={classes.flexItem}>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Stripe Payment ID
        </Typography>
      </div>
      <div className={classes.flexItem}>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Date
        </Typography>
      </div>
      <div className={clsx(classes.flexItem, classes.flexItemMaxWidth120)}>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Seller Payout
        </Typography>
      </div>
      <div className={classes.flexItem}>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Email
        </Typography>
      </div>
      {/* <div className={classes.flexItem}>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Account Name
        </Typography>
      </div> */}
      <LoadingBar
        absoluteBottom
        color={Colors.secondary}
        height={4}
        width={'100%'}
        loading={loading}
      />
    </div>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
  admin?: UserPrivate;
  day?: Date;
  orderIds: string[];
  setLoading(a?: boolean): void;
}
interface TitleRowsProps extends WithStyles<typeof styles> {
  loading?: boolean;
}

interface QueryData {
  getOrdersAdminApprovedByIdsConnection: OrdersConnection
}
interface QueryVar {
  orderIds: string[]
  limit: number
  offset: number
}


const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
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
  flexItemPlaceholder: {
    width: 44, // offset the row expander button
  },
  flexItem: {
    flexGrow: 1,
    flexBasis: "15%",
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    fontSize: '0.825rem',
  },
  flexItemMaxWidth120: {
    maxWidth: 120,
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
    padding: '16px 0px 16px 0px',
    // 0px so that flex-basis lines up columns with expander Rows
    paddingBottom: '1rem',
  },
  flexItemWide: {
    flexBasis: "15%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'flex-start',
    marginRight: '0.25rem',
    flexGrow: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    fontSize: '0.825rem',
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
      ? Colors.uniswapDarkNavy : Colors.cream,
    borderRadius: `0px 0px ${BorderRadius}px ${BorderRadius}px`,
    paddingBottom: '0.25rem',
  },
  dateTitle: {
    fontWeight: 600,
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
    marginTop: '1rem',
    marginBottom: '1rem',
    "&:hover": {
      color: Colors.ultramarineBlue,
      cursor: "pointer",
    },
  },
  dateTitle2: {
    marginLeft: '0.3rem',
    fontWeight: 500,
    color: isThemeDark(theme)
      ? Colors.uniswapMediumGrey
      : Colors.slateGreyDarkest,
    marginTop: '1rem',
    marginBottom: '1rem',
  },
});

export default withStyles(styles)( PayoutsApprovedTable );
