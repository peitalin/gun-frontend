import React from "react";
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
import RowExpander from "../OrdersPendingApprovals/OrdersPendingApprovalTable/RowExpander";
import { createDataForPendingApprovalTable } from '../OrdersPendingApprovals/OrdersPendingApprovalTable/createData';
import { canBeCancelled } from "pageComponents/Gov/OrderViewer/cancelHelpers";
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
// Components
import OrderViewerSection from "./OrderViewerSection";
import OrderSearch from "./OrderSearch";
import CancelOrderForm from "./CancelOrderForm";
import DisplayRecentOrderIds from "./DisplayRecentOrderIds";

// Graphql
import { useMutation, useApolloClient } from "@apollo/client";
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
// Snackbar
import { useSnackbar } from "notistack";
import currency from "currency.js";
const c = (s) => currency(s/100, { formatWithSymbol: true }).format()
// router
import { useRouter } from "next/router";



const OrderViewer: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const aClient = useApolloClient();
  const snackbar = useSnackbar();
  const router = useRouter();

 // state
  const [errorMsg, setErrorMsg] = React.useState(undefined);
  const [cancelledPaymentMsg, setCancelMsg] = React.useState(undefined);
  // const [loading, setLoading] = React.useState(false);

  const [orderId, setOrderId] = React.useState(undefined);
  const [order, setOrder] = React.useState<OrderAdmin>(undefined);
  const [recentTx, setRecentTx] = React.useState<Transactions[]>([]);


  const [
    cancelOrderAndPayment,
    { data, loading, error }
  ] = useMutation<MutData3, MutVar3>(
    CANCEL_ORDER_AND_PAYMENT, {
    variables: {
      orderId: orderId,
      markProductAbandoned: undefined,
    },
    onCompleted: (data) => {
      console.log("payment cancel response:", data);
      alert(JSON.stringify({
        CANCEL_ORDER_AND_PAYMENT: data?.cancelOrderAndPayment
      }));
    }
  });


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


  const makeCancelledPayment = async({ orderId, markProductAbandoned }: {
    orderId: string,
    markProductAbandoned: boolean,
  }) => {

    console.log("cancelling orderId:", orderId);
    await cancelOrderAndPayment({
      variables: {
        orderId: orderId,
        markProductAbandoned: markProductAbandoned,
      }
    })
    // data.refundOrder.order
    if (error) {
      let errMsg = error.graphQLErrors?.[0]?.message;
      snackbar.enqueueSnackbar(
        `Payment authorization cancel failed with msg: ${errMsg}`,
        { variant: "error" }
      )
    }
    return data;
  }


  React.useEffect(() => {
    getRecentTransactions(5)
    if (!!router?.query?.orderId) {
      let orderId: string = router?.query?.orderId as any
      setOrderId(orderId)
      searchOrder(orderId)
    }
  }, [])

  if (order) {
    console.log("incoming order: ", order)
    console.log("order status:", order?.currentSnapshot?.orderStatus)
  }

  const user = useSelector<GrandReduxState, UserPrivate>(
    state => state?.reduxLogin?.user
  );

  let canOrderBeCancelled = canBeCancelled(order?.currentSnapshot?.orderStatus)

  if (!order?.currentSnapshot?.id) {
    return (
      <>
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
      </>
    )
  }

  return (
    <>
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
      <Formik
        initialValues={{
          orderId: order.id,
          markProductAbandoned: true,
        }}
        validationSchema={validationSchemas.PaymentCancel}
        onSubmit={(values, { setSubmitting }) => {
          console.log("not implemented")
          console.log('formik values: ', values);
          console.log("cancelling order", order)
          makeCancelledPayment({
            orderId: values.orderId,
            markProductAbandoned: values.markProductAbandoned,
          }).then(res => {
            console.log(res)
            searchOrder(values.orderId)
            setCancelMsg(JSON.stringify(res))
          }).catch(e => {
            console.log(e)
            setErrorMsg(JSON.stringify(e))
          })
        }}
      >
        {(fprops) => {

          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            validateField,
            validateForm,
          } = fprops;

          // order details
          const total = order?.total ?? 0
          const subtotal = 0

          console.log('values', values)

          return (
            <CancelOrderForm
              onSubmit={handleSubmit}
              total={c(total)}
              loading={loading}
              disableCancelOrderButton={
                !order.id ||
                !canOrderBeCancelled
              }
              onClickDebugPrint={() => {
                console.log("fprops.errors:", fprops.errors)
              }}
              {...fprops}
            >
              <div className={classes.backButton}>
                <IconButton onClick={() => setOrder(undefined)}>
                  <KeyboardArrowLeft/>
                </IconButton>
                <Typography className={classes.goBackText} variant="subtitle2">
                  Go Back
                </Typography>
              </div>
              <OrderViewerSection title={"Order Summary"}>
                <OrderSummary
                  order={order}
                  {...fprops}
                />
              </OrderViewerSection>
              {
                !!order?.id &&
                <OrderViewerSection title={"Order History"}>

                  <TableContainer
                    component={Paper}
                  >
                    <Table
                      aria-label="collapsible table"
                      component={'div'}
                    >
                      <RowExpander
                        key={order?.id}
                        initialOpen={true}
                        order={order}
                        admin={undefined}
                        index={0}
                        refetchQueriesParams={undefined}
                        showApprovalButtons={false}
                      />
                    </Table>
                  </TableContainer>
                </OrderViewerSection>
              }
              <OrderViewerSection title={"Product Details"}>
                {
                  order.id &&
                  <ProductCard
                    order={order}
                    product={order.product as any}
                    store={order.sellerStore as any}
                    total={total}
                    subtotal={subtotal}
                    {...fprops}
                  />
                }
              </OrderViewerSection>
              <OrderViewerSection title={"Price Breakdown"}>
                <OrderPriceBreakdown
                  order={order}
                  {...fprops}
                />
              </OrderViewerSection>

              <Loading fixed loading={loading}/>
            </CancelOrderForm>
          )
        }}
      </Formik>
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  onSubmit(args: any): void;
  disableCancelOrderButton: boolean;
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
interface MutData3 {
  cancelOrderAndPayment: OrderMutationResponse;
}
interface MutVar3 {
  orderId: string;
  markProductAbandoned?: boolean;
}



const styles = (theme: Theme) => createStyles({
  root: {
    padding: '3rem',
    borderRadius: BorderRadius,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.darkWhite,
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : 'unset',
    border: theme.palette.type === 'dark'
      ? `unset`
      : `1px solid ${Colors.slateGreyDarker}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchRoot: {
    marginBottom: '2rem',
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



