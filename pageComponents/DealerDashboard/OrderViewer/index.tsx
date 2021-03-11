import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Redux
import { useSelector } from "react-redux";
import { GrandReduxState } from 'reduxStore/grand-reducer';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
// Typings
import {
  UserPrivate,
  ID,
  Order,
  OrderAdmin,
  OrderStatus,
  Transactions,
  OrderMutationResponse,
} from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextInput from "components/Fields/TextInput";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// Utils Components
import Loading from "components/Loading";
import OrderSummary from "./OrderSummary";
import OrderPriceBreakdown from "./OrderPriceBreakdown";
import ProductCard from "./ProductCard";
import RowExpander from "../ArrivingOrders/ArrivingOrdersTable/RowExpander";
import { createDataForPendingApprovalTable } from '../ArrivingOrders/ArrivingOrdersTable/createData';
import { canBeCancelled } from "pageComponents/Gov/OrderViewer/cancelHelpers";
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
// Components
import OrderViewerSection from "./OrderViewerSection";
import OrderSearch from "./OrderSearch";
import CancelOrderForm from "./CancelOrderForm";
import DisplayRecentOrderIds from "./DisplayRecentOrderIds";

// Graphql
import { useQuery, useApolloClient } from "@apollo/client";
import {
  GET_ORDER_AS_ADMIN,
  GET_RECENT_TRANSACTIONS,
} from "queries/orders-admin-queries";
import {
  CANCEL_ORDER_AND_PAYMENT,
} from "queries/refunds-mutations";
// Validation
import { Formik } from 'formik';
import { validationSchemas } from "utils/validation";
import SnackBarA from "components/Snackbars/SnackbarA";
// Snackbar
import { useSnackbar } from "notistack";
import currency from "currency.js";
const c = (s) => currency(s/100, { formatWithSymbol: true }).format()
// router
import { useRouter } from "next/router";



const OrderViewer: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const aClient = useApolloClient();
 // state
  const [errorMsg, setErrorMsg] = React.useState(undefined);
  const [cancelledPaymentMsg, setCancelMsg] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);

  const [orderId, setOrderId] = React.useState(undefined);
  const [order, setOrder] = React.useState<OrderAdmin>(undefined);
  const [recentTx, setRecentTx] = React.useState<Transactions[]>([]);

  const snackbar = useSnackbar();
  const router = useRouter();


  const searchOrder = async(orderId: ID) => {
    try {
      const { loading, errors, data } = await aClient.query<QueryData, QueryVar>({
        query: GET_ORDER_AS_ADMIN,
        variables: { orderId: orderId },
        fetchPolicy: "no-cache", // always do a network request, no caches
      })
      if (data.getOrderAsAdmin) {
        setOrder(data.getOrderAsAdmin)
        setErrorMsg(undefined)
      }
    } catch(e) {
      // setErrorMsg("OrderID does not exist.")
      snackbar.enqueueSnackbar(`OrderID does not exist`, { variant: "error" })
    }
  }

  const getRecentTransactions = async(count: number) => {
    try {
      const { loading, errors, data } = await aClient.query<QueryData2, QueryVar2>({
        query: GET_RECENT_TRANSACTIONS,
        variables: { count: count },
      })
      if (data.getRecentTransactions) {
        console.log("recent tx: ", data.getRecentTransactions);
        setRecentTx(data.getRecentTransactions)
        setErrorMsg(undefined)
      }
    } catch(e) {
      setErrorMsg("Transactions do not exist.")
    }
  }


  React.useEffect(() => {
    getRecentTransactions(5)
    if (!!router?.query?.orderId) {
      let orderId: string = router?.query?.orderId as any
      setOrderId(orderId)
      searchOrder(orderId)
    }
  }, [])


  if (!option(order).currentSnapshot.id()) {
    return (
      <div className={clsx(classes.orderViewerRoot, classes.sectionPaper)}>
        <OrderSearch
          orderId={orderId}
          setOrderId={setOrderId}
          searchOrder={searchOrder}
          errorMsg={errorMsg}
          loading={loading}
        >
          <DisplayRecentOrderIds
            recentTx={recentTx}
            setOrderId={setOrderId}
          />
        </OrderSearch>
      </div>
    )
  }

  return (
    <div className={classes.orderViewerRoot}>
      <div className={classes.sectionPaper}>
        <OrderSearch
          orderId={orderId}
          setOrderId={setOrderId}
          searchOrder={searchOrder}
          errorMsg={errorMsg}
          loading={loading}
        >
          <DisplayRecentOrderIds
            recentTx={recentTx}
            setOrderId={setOrderId}
          />
        </OrderSearch>
      </div>


      <div className={classes.sectionPaper}>
        <div className={classes.backButton}>
          <IconButton onClick={() => setOrder(undefined)}>
            <KeyboardArrowLeft/>
          </IconButton>
          <Typography className={classes.goBackText} variant="subtitle2">
            Go Back
          </Typography>
        </div>

        <OrderViewerSection classes={classes} title={"Order Summary"}>
          <OrderSummary
            order={order}
          />
        </OrderViewerSection>
        <OrderViewerSection classes={classes} title={"Order History"}>

          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <RowExpander
                key={order.id}
                initialOpen={true}
                row={
                  createDataForPendingApprovalTable({
                    id: order.id,
                    total: order.total,
                    createdAt: order.createdAt,
                    sellerStore: order.sellerStore as any,
                    buyer: order.buyer as any,
                    currentOrderSnapshot: order.currentSnapshot,
                    orderSnapshots: order.orderSnapshots,
                    product: order.product,
                    payoutId: order?.payoutItems?.[0]?.payoutId,
                    payoutStatus: order?.payoutItems?.[0]?.payoutStatus,
                  })
                }
                admin={undefined}
                index={0}
                refetchQueriesParams={undefined}
                showApprovalButtons={false}
              />
            </Table>
          </TableContainer>
        </OrderViewerSection>
        <OrderViewerSection classes={classes} title={"Product Details"}>
          {
            order.id &&
            <ProductCard
              order={order}
              product={order.product as any}
              store={order.sellerStore as any}
            />
          }
        </OrderViewerSection>
        <OrderViewerSection title={"Price Breakdown"}>
          <OrderPriceBreakdown
            order={order}
          />
          <Loading fixed loading={loading}/>
        </OrderViewerSection>
      </div>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  onSubmit(args: any): void;
  onClickDebugPrint(): void;
}

interface QueryData {
  getOrderAsAdmin: OrderAdmin;
}
interface QueryVar {
  orderId: ID;
}
interface QueryData2 {
  getRecentTransactions: Transactions[];
}
interface QueryVar2 {
  count: number;
}




const styles = (theme: Theme) => createStyles({
  orderViewerRoot: {
    marginTop: '2rem',
    marginRight: '1rem',
  },
  sectionPaper: {
    padding: '3rem',
    marginBottom: '2rem',
    borderRadius: BorderRadius,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDark}`,
    backgroundColor: theme.palette.type === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.cream}`,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  section: {
    margin: '2rem',
  },
  section1: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  textField: {
    marginBottom: '0.5rem',
  },
  titleSpacer: {
    marginBottom: '0.5rem',
    marginTop: '0.5rem',
  },
  goBackText: {
    marginLeft: '0.5rem',
  },
  form: {
    width: '100%',
  },
  actualPrice: {
    color: Colors.secondary,
  },
  backButton: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
  },
  recentOrders: {
    marginTop: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'start',
  },
});


export default withStyles(styles)( OrderViewer );



