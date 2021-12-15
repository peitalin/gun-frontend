import React from "react";
import clsx from "clsx";
// Styles
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BoxShadows, BorderRadius, isThemeDark } from "layout/AppTheme";
// Typings
import {
  OrderAdmin,
  OrdersConnection,
  PayeeType,
  OrdersGroupedByDay,
} from "typings/gqlTypes";
// Utils Components
import DownloadIcon from "components/Icons/DownloadIcon";
import LoadingBar from "components/LoadingBar";
// Material UI
import Typography from "@mui/material/Typography";
// Media query
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// snackbar
import { useSnackbar } from "notistack";
// apollo
import { useApolloClient } from "@apollo/client";
import {
  GET_ORDERS_ADMIN_APPROVED_BY_IDS_CONNECTION,
} from "queries/orders-admin-queries";
// csv
import CsvDownloader from 'react-csv-downloader';
import dayjs from 'dayjs';
// Copy and tooltip for emails when on mobile
import Tooltip from '@mui/material/Tooltip';
import copy from "clipboard-copy";
import { useRouter } from "next/router";




const CsvDownloaderButton = (props: ReactProps) => {

  const { classes } = props;

  const aClient = useApolloClient();
  const router = useRouter();
  const snackbar = useSnackbar();

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('md'));

  const [mouseOver, setMouseOver] = React.useState(false)

  const csvLinkRef = React.useRef();
  const [accumPayouts, setAccumPayouts] = React.useState<any[]>([])

  const getDateNow = () => {
    let d = new Date()
    return dayjs(d).format("DD-MM-YYYY hh:mm A")
  }

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
    props.setLoading(true)
    // console.log('isLastPage: ', isLastPage)
    while (!isLastPage) {

      const { data, loading, errors } = await aClient.query<QueryData, QueryVar>({
        query: GET_ORDERS_ADMIN_APPROVED_BY_IDS_CONNECTION,
        variables: {
          limit: limit_,
          offset: offset_,
          orderIds: props.orderIds
        },
      })

      if (errors) {
        break
      }

      let newOrdersEdges = data?.getOrdersAdminApprovedByIdsConnection?.edges ?? []

      if (newOrdersEdges.length > 0) {

        let newOrders = newOrdersEdges
          .map(({ node: order }) => order as OrderAdmin)
          .filter(newOrder => {
            let found = accumPayouts.find(u => u.id === newOrder.id)
            return !found
          })
          .map(order => {

            let sellerPayoutItem = order.payoutItems.find(p => {
              return p.payeeType === PayeeType.STORE
            });

            // map to csv headers
            return {
              bsb: order.sellerStore?.user?.payoutMethod?.bsb,
              accountNumber: order.sellerStore?.user?.payoutMethod?.accountNumber,
              accountName: order?.sellerStore?.user?.payoutMethod?.accountName,
              description: `Order: ${order.id}`,
              amount: sellerPayoutItem.amount / 100,
            }
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
      isLastPage = (offset_ + limit_) >= data.getOrdersAdminApprovedByIdsConnection.totalCount
      console.log("limit_:", limit_)
      console.log("totalCount:", data.getOrdersAdminApprovedByIdsConnection.totalCount)
      console.log("isLastPage:", isLastPage)
      if (isLastPage) {
        break
      }
    }
    // console.log("customer data: ", accumPayouts)
    setAccumPayouts(accumPayouts)
    props.setLoading(false)
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


  return (
    <div className={classes.flexRowSpaceBetween}>
      <div className={classes.flexColRightBottom}>
        <Typography variant="body1" className={classes.emailCountCaption}>
          {
            `${props.totalCountCsv ?? 0} approved payouts awaiting action`
          }
        </Typography>
        <Tooltip title={"Export emails spreadsheet"}>
          <div className={clsx(classes.exportContainer)}
            onMouseOver={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
            onClick={
              props.totalCountCsv
                ? handleDownloadPayoutList
                : () => alert('totalCount is 0...')
            }
          >
            <DownloadIcon
              className={classes.downloadIcon}
              color={
                mouseOver
                ? Colors.blue
                : isThemeDark(theme)
                  ? Colors.uniswapLightestGrey
                  : Colors.slateGreyLightBlack
              }
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
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  orderIds: string[]
  totalCountCsv: number;
  loading: boolean
  setLoading(a?: any): void
}
// customer counts
interface QueryVar {
  limit: number
  offset: number
  orderIds: string[]
}
interface QueryData {
  getOrdersAdminApprovedByIdsConnection: OrdersConnection
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
  flexColRightBottom: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  flexRowSpaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    marginTop: '1rem',
    marginBottom: '1rem',
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
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyLightBlack,
    fontSize: '0.825rem',
    fontWeight: 500,
    marginBottom: '0.5rem',
  },
  exportContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: '1rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyLightBlack,
    "&:hover": {
      cursor: "pointer",
    },
  },
  downloadIcon: {
    fontSize: '0.825rem',
    fontWeight: 500,
    height: 15,
    width: 15,
  },
  exportCaption: {
    marginLeft: "0.25rem",
    fontSize: '0.825rem',
    fontWeight: 500,
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyLightBlack,
  },
  blueText: {
    color: Colors.blue,
  },
});

export default withStyles(styles)( CsvDownloaderButton );



