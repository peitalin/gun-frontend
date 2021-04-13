import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Typings
import {
  UserPrivate,
  Order,
  OrderAdmin,
  OrderStatus,
  ConnectionQuery,
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
} from "queries/orders-admin-queries";
import { MARK_PAYOUTS_AS_PAID } from "queries/orders-mutations";
import { useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";
// Search Component
import SearchOptions, { SelectOption, setCategoryFacets } from "components/SearchOptions";
import {
  useFacetSearchOptions,
  totalItemsInCategoriesFacets,
} from "utils/hooksFacetSearch";
// Grid Components
import GridPaginatorGeneric from "components/GridPaginatorGeneric";
import TextInputAdorned from 'components/Fields/TextInputAdorned';
import PayoutsApprovedTable from "./PayoutsApprovedTable";
// csv
import CsvDownloader from 'react-csv-downloader';
import dayjs from 'dayjs';
// Copy and tooltip for emails when on mobile
import Tooltip from '@material-ui/core/Tooltip';
import copy from "clipboard-copy";
import { useRouter } from "next/router";




const PayoutsApprovedList = (props: ReactProps) => {

  const { classes } = props;

  const aClient = useApolloClient();
  const router = useRouter();
  const snackbar = useSnackbar();

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const [mouseOver, setMouseOver] = React.useState(false)
  const [loading2, setLoading2] = React.useState(false)

  const csvLinkRef = React.useRef();
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
    MARK_PAYOUTS_AS_PAID,
    {
      onCompleted: () => {
        snackbar.enqueueSnackbar(`Payouts marked complete.`, { variant: "info" })
        router.push("/gov/escrow/complete")
      },
    }
  );


  //////////////// BEGIN CSV DOWNLOAD FUNCTION ///////////////
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
          .map(({ node: order }) => order as OrderAdmin)
          .filter(newOrder => {
            let found = accumPayouts.find(u => u.id === newOrder.id)
            return !found
          })
          .map(order => {
            let bsb = order.sellerStore?.user?.payoutMethod?.bsb
            let accountNumber = order.sellerStore?.user?.payoutMethod?.accountNumber
            let accountName = order?.sellerStore?.user?.payoutMethod?.accountName
            let id = order.id
            let amount = order.total / 100
            // map to csv headers
            return {
              bsb: order.sellerStore?.user?.payoutMethod?.bsb,
              accountNumber: order.sellerStore?.user?.payoutMethod?.accountNumber,
              accountName: order?.sellerStore?.user?.payoutMethod?.accountName,
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

  const [orderIds, setOrderIds] = React.useState([])
  const [totalCountCsv, setTotalCountCsv] = React.useState(0)


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
              `${totalCountCsv} approved payouts awaiting action`
            }
          </Typography>
          <Tooltip title={"Export emails spreadsheet"}>
            <div className={clsx(classes.exportContainer)}
              onMouseOver={() => setMouseOver(true)}
              onMouseLeave={() => setMouseOver(false)}
              onClick={
                totalCountCsv
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

      <PayoutsApprovedTable
        admin={props.admin}
        setTotalCountCsv={setTotalCountCsv}
        setOrderIds={setOrderIds}
      />

    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  admin: UserPrivate
}
// customer counts
interface QueryVar {
  query: ConnectionQuery
}
interface QueryData {
  getOrdersAdminApprovedConnection: OrdersConnection
}

interface MutData2 {
  orders: OrderAdmin[]
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
    flexGrow: 1,
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
    borderBottom: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapNavy}`
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
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : 'unset',
    border: theme.palette.type === 'dark'
      ? `unset`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius,
  },
  paper: {
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    borderRadius: BorderRadius,
  },
  margin2: {
    margin: '2rem',
  },
});

export default withStyles(styles)( PayoutsApprovedList );



