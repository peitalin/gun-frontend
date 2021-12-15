import React from "react";
import clsx from "clsx";
// Styles
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Typings
import {
  UserPublic,
  Order,
  OrderAdmin,
  OrderStatus,
  ConnectionQuery,
  Order_By,
  OrdersConnection,
  OrderBy,
} from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import MenuItem from "@mui/material/MenuItem";
import DownloadIcon from "components/Icons/DownloadIcon";
import LoadingBar from "components/LoadingBar";
import CancelledOrderRow from "./CancelledOrderRow";
import ButtonLoading from "components/ButtonLoading";
// Material UI
import Typography from "@mui/material/Typography";
// Media query
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// Graphql
import { useQuery, useLazyQuery } from "@apollo/client";
// snackbar
import { useSnackbar } from "notistack";
// apollo
import { useApolloClient } from "@apollo/client";
import {
  GET_ORDERS_CANCELLED_CONNECTION,
} from "queries/orders-admin-queries";
// Search Component
import SearchOptions, { SelectOption, setCategoryFacets } from "components/SearchOptions";
import {
  useFacetSearchOptions,
  totalItemsInCategoriesFacets,
} from "utils/hooksFacetSearch";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";

// csv
import dayjs from 'dayjs';



const OrdersCancelledList = (props: ReactProps) => {

  const { classes } = props;

  // const snackbar = useSnackbar();
  // const aClient = useApolloClient();

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('md'));
  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [mouseOver, setMouseOver] = React.useState(false)
  const [loading2, setLoading2] = React.useState(false)

  //////////////// END CSV DOWNLOAD FUNCTION ///////////////


  /////////////////////////////////// paginator
  let numItemsPerPage = 16;
  let overfetchBy = 1;
  // overfetch by 1x pages
  let {
    orderBy,
    setOrderBy,
    priceRange,
    setPriceRange,
    searchTerm,
    setSearchTerm,
    facets,
    setFacets,
    paginationParams: {
      limit,
      offset,
      totalCount,
      setTotalCount,
      pageParam,
      setPageParam,
      index,
      setIndex,
    },
    currentCategories,
    setCurrentCategories,
  } = useFacetSearchOptions({
    limit: numItemsPerPage * overfetchBy,
    overfetchBy: overfetchBy,
  })


  const { data, loading, error } = useQuery<QueryData, QueryVar>(
    GET_ORDERS_CANCELLED_CONNECTION, {
      variables: {
        query: {
          limit: limit,
          offset: offset,
          // orderBy: {
          //   currentSnapshot: {
          //     createdAt: OrderBy.DESC,
          //   }
          // }
        },
      },
      fetchPolicy: "no-cache",
    }
  )

  const connection = data?.getOrdersCancelledConnection;
  let noRefundsYet = !loading && connection?.edges?.length === 0


  return (
    <ErrorBounds className={clsx(
      classes.root,
      xsDown && classes.rootMobile,
    )}>

      <div className={classes.flexRowSpaceBetween}>
        <div className={classes.flexColRightBottom}>
          <Typography className={classes.title} variant="h2">
            Orders Cancelled
          </Typography>
          <Typography variant="body1" className={classes.emailCountCaption}>
            { `${connection?.totalCount ?? 0} cancelled orders` }
          </Typography>
        </div>
      </div>


      <div className={clsx(classes.paper, classes.boxShadowBorder)}>
        <div className={classes.flexRowTitle}>
          <div className={classes.flexItem}>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Order ID
            </Typography>
          </div>
          <div className={classes.flexItemWide}>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Date Cancelled
            </Typography>
          </div>
          <div className={classes.flexItem}>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Total Amount
            </Typography>
          </div>
          <div className={classes.flexItemWide}>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Email
            </Typography>
          </div>
          <div className={classes.flexItem}>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Order Status
            </Typography>
          </div>
          {/* <div className={classes.flexItem}>
            <Typography variant="subtitle1" className={classes.subtitle}>
              BSB
            </Typography>
          </div>
          <div className={classes.flexItemWide}>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Account Number
            </Typography>
          </div> */}
          <div className={classes.flexItem}>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Account Name
            </Typography>
          </div>
          <LoadingBar
            absoluteBottom
            color={Colors.secondary}
            height={4}
            width={'100%'}
            loading={loading || loading2}
          />
        </div>
        <SearchOptions
          facets={facets}
          // setCategoryFacets={setCategoryFacets({ facets, setFacets })}
          // currentCategories={currentCategories}
          setSearchTerm={setSearchTerm}
          setOrderBy={setOrderBy}
          setPriceRange={setPriceRange}
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
          disableCategories
          disablePriceFilter
          disableSearchFilter
          disableSortby
          sortByOptions={[]}
          topSectionStyles={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            display: 'flex',
            flexDirection: 'column',
          }}
          bottomSectionStyles={{
            marginBottom: '2rem',
          }}
        >
          {
            noRefundsYet
            ? <div className={classes.noCancelledOrdersBox}>
                <Typography className={classes.cancelCaption}>
                  No order cancellations yet
                </Typography>
              </div>
            : <GridPaginatorGeneric<Order>
                index={index}
                connection={connection}
                totalCount={totalCount}
                setTotalCount={setTotalCount}
                numItemsPerPage={numItemsPerPage}
                gridItemClassName={classes.gridItem}
                classNameRoot={classes.gridRoot}
              >
                {({ node , key }) => {
                  let order = node as OrderAdmin
                  return (
                    <CancelledOrderRow key={key} order={order}/>
                  )
                }}
              </GridPaginatorGeneric>
          }
        </SearchOptions>
      </div>
    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
}
// customer counts
interface QueryVar {
  query: ConnectionQuery
}
interface QueryData {
  getOrdersCancelledConnection: OrdersConnection
}


const styles = (theme: Theme) => createStyles({
  root: {
    padding: '0rem 1rem 2rem 1rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minHeight: 'calc(100vh - 90px - 120px)',
  },
  rootMobile: {
    padding: '0.5rem',
    paddingTop: '0rem',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexColRightBottom: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
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
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  flexRowSpaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  flexItemWidest: {
    flexGrow: 1,
    flexBasis: "25%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: 'center',
    paddingRight: '0.5rem',
  },
  flexItemWide: {
    flexBasis: "15%",
    // width: '50%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'flex-start',
    paddingRight: '0.5rem',
    flexGrow: 1,
  },
  flexItem: {
    flexGrow: 1,
    flexBasis: "8%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: 'center',
    paddingRight: '0.5rem',
  },
  title: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  boxShadowBorder: {
    boxShadow: BoxShadows.shadow1.boxShadow,
    borderRadius: BorderRadius,
  },
  paper: {
    background: theme.palette.mode === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.darkWhite,
    boxShadow: theme.palette.mode === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : 'unset',
    border: theme.palette.mode === 'dark'
      ? `unset`
      : `1px solid ${Colors.slateGreyDarker}`,
    paddingBottom: '0.25rem',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 420,
  },
  noCancelledOrdersBox: {
    borderRadius: '0px',
    border: '0px solid #eaeaea',
    background: theme.palette.mode === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.darkWhite,
    padding: '2rem',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 420,
  },
  subtitle: {
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  email: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    // maxWidth: 150,
    width: '100%', // 20vw, max 150px
    // need to set width in VW for ellipsis
  },
  emailCountCaption: {
    color: Colors.darkGrey,
    fontSize: '0.825rem',
    fontWeight: 500,
    marginBottom: '1rem',
  },
  cancelCaption: {
    margin: '1rem',
  },
  gridItem: {
    width: '100%',
  },
  gridRoot: {
    minHeight: 400,
  },
});

export default withStyles(styles)( OrdersCancelledList );



