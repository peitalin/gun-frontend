import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Typings
import {
  UserPublic,
  Orders,
  OrderStatus,
  ConnectionOffsetQuery,
  PayeeType,
  Connection,
  OrdersConnection,
} from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import MenuItem from "@material-ui/core/MenuItem";
import DownloadIcon from "components/Icons/DownloadIcon";
import LoadingBar from "components/LoadingBar";
import PayoutOrderRow from "./PayoutOrderRow";
import ButtonLoading from "components/ButtonLoading";
// Material UI
import Typography from "@material-ui/core/Typography";
// Media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Analytics
import { useAnalytics } from "utils/analytics";
// Graphql
import { useQuery, useLazyQuery } from "@apollo/client";
// snackbar
import { useSnackbar, ProviderContext } from "notistack";
// apollo
import { useApolloClient } from "@apollo/client";
import {
  GET_ORDERS_ADMIN_APPROVED_CONNECTION,
} from "queries/orders-queries";
import { MARK_PAYOUT_AS_PAID } from "queries/orders-mutations";
import { useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";
// Search Component
import SearchOptions, { SelectOption, setCategoryFacets } from "components/SearchOptions";
import {
  useFacetSearchOptions,
  useEffectUpdateGridAccum,
  totalItemsInCategoriesFacets,
} from "utils/hooksFacetSearch";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";
import TextInputAdorned from 'components/Fields/TextInputAdorned';
// csv
import CsvDownloader from 'react-csv-downloader';
import dayjs from 'dayjs';
// Copy and tooltip for emails when on mobile
import Tooltip from '@material-ui/core/Tooltip';
import copy from "clipboard-copy";



const PayoutsApprovedList = (props: ReactProps) => {

  const { classes } = props;

  const snackbar = useSnackbar();
  const aClient = useApolloClient();

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const [mouseOver, setMouseOver] = React.useState(false)
  const [loading2, setLoading2] = React.useState(false)

  const csvLinkRef = React.useRef();
  const headers = [
    { label: "BSB", key: "bsb" },
    { label: "Account Number", key: "accountNumber" },
    { label: "Account Name", key: "accountName" },
    { label: "Order Description", key: "id" },
    { label: "Amount", key: "amount" },
  ];
  interface PayoutCsvRow {
    bsb: string;
    accountNumber: string;
    accountName: string;
    id: string;
    amount: number;
  }
  const [accumPayouts, setAccumPayouts] = React.useState<any[]>([])
  const [payoutId, setPayoutId] = React.useState(undefined);

  const getDateNow = () => {
    let d = new Date()
    return dayjs(d).format("DD-MM-YYYY hh:mm A")
  }

  const [
    markPayoutsAsPaid,
    markPayoutsAsPaidResponse
  ] = useMutation<MutData2, MutVar2>(
    MARK_PAYOUT_AS_PAID,
  );


  //////////////// BEING CSV DOWNLOAD FUNCTION ///////////////
  const handleDownloadPayoutList = async() => {

    let isLastPage = false;
    let limit_ = 50;
    let offset_ = 0;
    let accumPayouts: any[] = []

    snackbar.enqueueSnackbar(
      `Retrieving payouts...`,
      { variant: "info", autoHideDuration: 3500 }
    )
    setLoading2(true)
    // console.log('isLastPage: ', isLastPage)
    while (!isLastPage) {

      const { data, loading, errors } = await aClient.query<QueryData, QueryVar>({
        query: GET_ORDERS_ADMIN_APPROVED_CONNECTION,
        variables: {
          query: {
            limit: limit_,
            offset: offset_,
          },
        },
      })

      if (errors) {
        break
      }

      let newOrdersEdges = option(data).getOrdersAdminApprovedConnection.edges([])

      if (newOrdersEdges.length > 0) {

        let newOrders = newOrdersEdges
          .map(({ node: order}) => order)
          .filter(newOrder => {
            let found = accumPayouts.find(u => u.id === newOrder.id)
            return !found
          })
          .map(order => {
            let bsb = order.seller?.user?.payoutMethod?.bsb
            let accountNumber = order.seller?.user?.payoutMethod?.accountNumber
            let accountName = order?.seller?.user?.payoutMethod?.accountName
            let id = order.id
            let amount = order.total / 100
            // map to csv headers
            return {
              bsb: order.seller?.user?.payoutMethod?.bsb,
              accountNumber: order.seller?.user?.payoutMethod?.accountNumber,
              accountName: order?.seller?.user?.payoutMethod?.accountName,
              id: order.id,
              amount: order.total / 100,
            }
            // return [
            //   bsb,
            //   accountNumber,
            //   accountName,
            //   id,
            //   amount,
            // ]
          })

        console.log('newOrders: ', newOrders)

        accumPayouts = [
          ...accumPayouts,
          ...newOrders,
        ]

      } else {
        break
      }

      limit_ = limit_ + offset_
      isLastPage = (offset_ + limit_) >= data.getOrdersAdminApprovedConnection.totalCount
      console.log("limit_:", limit_)
      console.log("totalCount:", data.getOrdersAdminApprovedConnection.totalCount)
      console.log("isLastPage:", isLastPage)
      if (isLastPage) {
        break
      }
    }
    // console.log("customer data: ", accumPayouts)
    setAccumPayouts(accumPayouts)
    setLoading2(false)
    if (csvLinkRef && csvLinkRef.current) {
      console.log("csvLinkRef: ", csvLinkRef)
      setTimeout(() => {
        (csvLinkRef.current as any).click();
        setAccumPayouts([]);
      });
    }
    snackbar.enqueueSnackbar(
      'Download complete',
      { variant: "success", autoHideDuration: 4000 }
    )
  }
  //////////////// END CSV DOWNLOAD FUNCTION ///////////////


  /////////////////////////////////// paginator
  let numItemsPerPage = 50;
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
    },
    currentCategories,
    setCurrentCategories,
    index,
    setIndex,
  } = useFacetSearchOptions({
    limit: numItemsPerPage * overfetchBy,
    overfetchBy: overfetchBy,
  })


  const { data, loading, error } = useQuery<QueryData, QueryVar>(
  // const [getOrdersAdminApproved, { data, loading, error}] = useLazyQuery<QueryData, QueryVar>(
    GET_ORDERS_ADMIN_APPROVED_CONNECTION, {
      variables: {
        query: {
          limit: limit,
          offset: offset,
        },
      },
      fetchPolicy: "no-cache",
    }
  )

  const connection = option(data).getOrdersAdminApprovedConnection();
  const orderIds = option(connection).edges([]).map(({ node }) => node.id)

  let noPayoutsToBePaid = !loading &&
    option(connection).edges([]).length === 0


  return (
    <ErrorBounds className={clsx(
      classes.root,
      xsDown && classes.rootMobile,
    )}>

      <div className={classes.flexRowSpaceBetween}>
        <div className={classes.flexColRightBottom}>
          <Typography className={classes.title} variant="h2">
            Approved Payout List
          </Typography>
          <Typography variant="body1" className={classes.emailCountCaption}>
            {
              `${option(connection).totalCount(0)} approved payouts awaiting action`
            }
          </Typography>
          <Tooltip title={"Export emails spreadsheet"}>
            <div className={clsx(classes.exportContainer)}
              onMouseOver={() => setMouseOver(true)}
              onMouseLeave={() => setMouseOver(false)}
              onClick={
                option(connection).totalCount(0)
                  ? handleDownloadPayoutList
                  : () => alert('loading...')
              }
            >
              <DownloadIcon
                className={classes.relayIcon}
                color={mouseOver ? Colors.blue : Colors.darkGrey}
              />
              <Typography variant="body1"
                className={clsx(
                  classes.exportCaption,
                  mouseOver && classes.blueText,
                )}
              >
                Export
              </Typography>
            </div>
          </Tooltip>
        </div>
        <div className={classes.flexColRightBottom}>
          <div className={classes.addPayoutIdBox}>
            <TextInputAdorned
              placeholder={"Enter Westpac payout ID"}
              value={payoutId}
              onChange={(e) => setPayoutId(e.target.value)}
              inputProps={{
                root: {
                  width: '90%',
                },
                style: {
                  width: '100%',
                  minWidth: '180px',
                  height: "19px",
                  borderRadius: "4px 0 0 4px",
                  borderRight: 'none',
                }
              }}
            />
            <ButtonLoading
              variant="outlined"
              className={classes.markPayoutCompleteButton}
              onClick={() => {
                markPayoutsAsPaid({
                  variables: {
                    orderIds: orderIds,
                    payoutId: payoutId,
                  }
                })
              }}
              loadingIconColor={Colors.blue}
              replaceTextWhenLoading={true}
              loading={markPayoutsAsPaidResponse.loading}
              // disabled={!readyForApproval}
              color="secondary"
              style={{
                minWidth: '200px',
                height: '36px',
              }}
            >
              Mark Payouts Complete
            </ButtonLoading>
          </div>
        </div>
      </div>


      {/* Hidden download element programmatically clicked
      after downloading payout data */}
      <div style={{ display: "none" }}>
        <CsvDownloader
          datas={accumPayouts}
          noHeader
          filename={`GM Payouts - ${getDateNow()}.csv`}
        >
          <button ref={csvLinkRef}>
            Hidden Download Element
          </button>
        </CsvDownloader>
      </div>

      <div className={clsx(classes.paper, classes.boxShadowBorder)}>
        <div className={classes.flexRowTitle}>
          <div className={classes.flexItem}>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Order ID
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
              BSB
            </Typography>
          </div>
          <div className={classes.flexItemWide}>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Account Number
            </Typography>
          </div>
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
            noPayoutsToBePaid &&
            <div className={clsx(
              classes.paper,
              classes.customersPlaceholder,
              classes.flexCol,
              classes.customerNoEmailsBox,
            )}>
              <Typography variant="subtitle2">
                No approved payouts pending Westpac payout
              </Typography>
            </div>
          }
          <GridPaginatorGeneric<Orders>
            index={index}
            connection={connection}
            totalCount={totalCount}
            setTotalCount={setTotalCount}
            numItemsPerPage={numItemsPerPage}
            gridItemClassName={classes.gridItem}
          >
            {({ node: order, key }) => {
              console.log("node: order:", order)
              return (
                <PayoutOrderRow key={key} order={order}/>
              )
            }}
          </GridPaginatorGeneric>
        </SearchOptions>
      </div>
    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
}
// customer counts
interface QueryVar {
  query: ConnectionOffsetQuery
}
interface QueryData {
  getOrdersAdminApprovedConnection: OrdersConnection
}

interface MutData2 {
  orders: Orders[]
}
interface MutVar2 {
  orderIds: string[];
  payoutId: string;
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
    position: "relative",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    padding: '16px', // same padding as MenuItem 16px
    paddingBottom: '1rem',
    borderBottom: `1px solid ${Colors.uniswapNavy}`,
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
  customersPlaceholder: {
    minHeight: 200,
  },
  boxShadowBorder: {
    boxShadow: BoxShadows.shadow1.boxShadow,
    borderRadius: BorderRadius,
  },
  paper: {
    // border: `1px solid ${Colors.uniswapNavy}`,
    backgroundColor: Colors.foregroundColor,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 420,
  },
  customerNoEmailsBox: {
    borderRadius: '0px',
    border: `0px solid ${Colors.uniswapNavy}`,
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
  exportContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
    color: Colors.darkGrey,
    "&:hover": {
      cursor: "pointer",
    },
  },
  relayIcon: {
    fontSize: '0.825rem',
    fontWeight: 500,
    height: 15,
    width: 15,
    marginRight: '0.15rem',
  },
  exportCaption: {
    marginLeft: "0.25rem",
    fontSize: '0.825rem',
    fontWeight: 500,
    color: Colors.darkGrey,
  },
  blueText: {
    color: Colors.blue,
  },
  gridItem: {
    width: '100%',
  },
  addPayoutIdBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  markPayoutCompleteButton: {
    margin: "0.5rem 0.5rem 0.5rem 0.5rem",
    backgroundColor: Colors.foregroundColor,
  },
});

export default withStyles(styles)( PayoutsApprovedList );



