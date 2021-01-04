import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { Actions } from 'reduxStore/actions';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Typings
import {
  UserPrivate,
  ID,
  Orders,
  OrderStatus,
  Transactions,
  OrderMutationResponse,
} from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonLoading from "components/ButtonLoading";
import Paper from "@material-ui/core/Paper";
import TextInput from "components/Fields/TextInput";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
import OrderSummary from "./OrderSummary";
import OrderPrices from "./OrderPrices";
import OrderCard from "./OrderCard";
import RowExpander from "../PayoutsPendingApprovals/OrdersPendingApprovalTable/DataTableOrdersPending/RowExpander";
import { createData } from '../PayoutsPendingApprovals/OrdersPendingApprovalTable/DataTableOrdersPending/createData';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';

// Graphql
import { useQuery, useApolloClient, ApolloClient } from "@apollo/client";
import {
  GET_ORDER_AS_ADMIN,
  GET_RECENT_TRANSACTIONS,
} from "queries/orders-queries";
import {
  REFUND_ORDER
} from "queries/refunds-mutations";
// Refund
import { v4 as uuidv4 } from "uuid"
// Validation
import { Formik } from 'formik';
import { validationSchemas } from "utils/validation";
import SnackBarA from "components/Snackbars/SnackbarA";
import SnackbarsSuccessErrors from "components/Snackbars/SnackbarsSuccessErrors";
// Snackbar
import { useSnackbar } from "notistack";
import currency from "currency.js";
const c = (s) => currency(s/100, { formatWithSymbol: true }).format()



const RefundOrders: React.FC<OrderRefundsProps> = (props) => {

  const { classes } = props;
  const aClient = useApolloClient();
 // state
  const [errorMsg, setErrorMsg] = React.useState(undefined);
  const [refundMsg, setRefundMsg] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);

  const [orderId, setOrderId] = React.useState(undefined);
  const [order, setOrder] = React.useState<Orders>(undefined);
  const [recentTx, setRecentTx] = React.useState<Transactions[]>([]);
  const [
    recentPaypalToken,
    setRecentPaypalToken
  ] = React.useState<{ status: string, token: string }>(undefined);

  const snackbar = useSnackbar();

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


  const makeRefund = async({ orderId, reason, reasonDetails }: {
    orderId: string,
    reason: string,
    reasonDetails: string,
  }) => {

    console.log("refunding orderId:", orderId);

    const { errors, data } = await aClient.mutate<QueryData3, QueryVar3>({
      mutation: REFUND_ORDER,
      variables: {
        orderId: orderId,
        reason: reason,
        reasonDetails: reasonDetails,
      }
    });

    console.log("refund response:", data);
    alert(JSON.stringify({ REFUND: data }));
    // data.refundOrder.order
    if (errors) {
      setErrorMsg(`Refund failed with msg: ${errors}`)
    }
    return data;
  }

  const canBeRefunded = (ostatus: string): boolean => {
    if (ostatus === undefined) {
      return false
    }
    if (ostatus === OrderStatus.CONFIRMED_PAYMENT_FORM_10_REQUIRED) {
      return true
    }
    if (ostatus === OrderStatus.FORM_10_REVISE_AND_RESUBMIT) {
      return true
    }
    return false
  }


  React.useEffect(() => {
    getRecentTransactions(5)
  }, [])

  if (order) {
    console.log("incoming order: ", order)
    console.log("order status:", order?.currentSnapshot?.orderStatus)
  }

  const user = useSelector<GrandReduxState, UserPrivate>(
    state => option(state).reduxLogin.user()
  );

  let canOrderBeRefunded = canBeRefunded(order?.currentSnapshot?.orderStatus)

  // if (!option(order).currentSnapshot.transaction.chargeId()) {
  if (!option(order).currentSnapshot.id()) {
    return (
      <>
        <RefundOrdersSearch
          classes={classes}
          orderId={orderId}
          setOrderId={setOrderId}
          searchOrder={searchOrder}
          errorMsg={errorMsg}
          loading={loading}
        >
          <DisplayRecentOrderIds
            classes={classes}
            recentTx={recentTx}
            setOrderId={setOrderId}
          />
          <SnackBarA
            open={!!recentPaypalToken}
            closeSnackbar={() => setRecentPaypalToken(undefined)}
            message={
              `Paypal Token Refreshed: ${option(recentPaypalToken).token()}`
            }
            autoHideDuration={9000}
            variant={"success"}
          />
        </RefundOrdersSearch>
      </>
    )
  }

  return (
    <>
      <RefundOrdersSearch
        classes={classes}
        orderId={orderId}
        setOrderId={setOrderId}
        searchOrder={searchOrder}
        errorMsg={errorMsg}
        loading={loading}
      >
        <DisplayRecentOrderIds
          classes={classes}
          recentTx={recentTx}
          setOrderId={setOrderId}
        />
      </RefundOrdersSearch>
      <Formik
        initialValues={{
          orderId: order.id,
          reason: "",
          reasonDetails: '',
        }}
        validationSchema={validationSchemas.Refund}
        onSubmit={(values, { setSubmitting }) => {
          console.log("not implemented")
          console.log('formik values: ', values);
          console.log("refunding order", order)
          makeRefund({
            orderId: values.orderId,
            reason: values.reason,
            reasonDetails: values.reasonDetails,
          }).then(res => {
            console.log(res)
            setLoading(false)
            searchOrder(values.orderId)
            setRefundMsg(JSON.stringify(res))
          }).catch(e => {
            console.log(e)
            setLoading(false)
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
          // const tx = option(order).currentSnapshot.transaction();
          const total = option(order).total(0);
          const subtotal = 0
          // const subtotal = option(tx).subtotal(0);

          console.log('values', values)

          return (
            <RefundOrdersForm
              classes={classes}
              onSubmit={handleSubmit}
              total={c(total)}
              disableRefundButton={
                !order.id ||
                !canOrderBeRefunded
              }
              onClickDebugPrint={() => {
                console.log("fprops.errors:", fprops.errors)
                setLoading(false)
              }}
            >
              <div className={classes.backButton}>
                <IconButton onClick={() => setOrder(undefined)}>
                  <KeyboardArrowLeft/>
                </IconButton>
                <Typography className={classes.goBackText} variant="subtitle2">
                  Go Back
                </Typography>
              </div>
              <Section classes={classes} title={"Order Summary"}>
                <OrderSummary
                  order={order}
                  {...fprops}
                />
              </Section>
              <Section classes={classes} title={"Order Price Breakdown"}>
                <OrderPrices
                  order={order}
                  {...fprops}
                />
              </Section>
              <Section classes={classes} title={"Refunding Order"}>
                {
                  order.id &&
                  <OrderCard
                    order={order}
                    total={total}
                    subtotal={subtotal}
                    {...fprops}
                  />
                }
              </Section>

              {
                !!order?.id &&
                <Section classes={classes} title={"Order History"}>

                  <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                      <RowExpander
                        key={order.id}
                        initialOpen={true}
                        row={
                          createData({
                            id: order.id,
                            total: order.total,
                            createdAt: order.createdAt,
                            seller: order.seller as any,
                            buyer: order.buyer,
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
                      />
                    </Table>
                  </TableContainer>
                </Section>
              }

              {
                canOrderBeRefunded &&
                <>
                  <TextInput
                    placeholder={"Enter Reason for Refund"}
                    value={values.reason}
                    onChange={(e) => fprops.setFieldValue("reason", e.target.value)}
                    disabled={!canOrderBeRefunded}
                    inputProps={{
                      root: { },
                      style: {
                        padding: '0.55rem',
                        marginBottom: "0.5rem",
                      }
                    }}
                  />
                  <TextInput
                    placeholder={"Enter Refund reason details"}
                    value={values.reasonDetails}
                    onChange={(e) => fprops.setFieldValue("reasonDetails", e.target.value)}
                    disabled={!canOrderBeRefunded}
                    inputProps={{
                      root: { },
                      style: {
                        padding: '0.55rem',
                      }
                    }}
                  />
                </>
              }

              <Loading fixed loading={loading}/>
              <SnackBarA
                open={!!refundMsg}
                closeSnackbar={() => setRefundMsg(undefined)}
                message={
                  `Created refund: ${refundMsg}`
                }
                autoHideDuration={50000}
                variant={"info"}
              />
              <SnackBarA
                open={!!errorMsg}
                closeSnackbar={() => setErrorMsg(undefined)}
                message={`Refund response: ${errorMsg}`}
                autoHideDuration={50000}
                variant={"error"}
              />
            </RefundOrdersForm>
          )
        }}
      </Formik>
    </>
  )
}



const Section: React.FC<SectionProps> = ({
  classes,
  title,
  ...props
}) => {
  return (
    <div className={clsx(classes.flexCol, classes.section1)}>
      {
        title &&
        <Typography color={"primary"} variant="h5" gutterBottom>
          {title}
        </Typography>
      }
      <div className={classes.titleSpacer}>
        {props.children}
      </div>
    </div>
  )
}

const RefundOrdersSearch: React.FC<ReactOrdersSearchProps> = (props) => {

  const {
    classes,
    orderId,
    setOrderId,
    searchOrder,
    loading,
    errorMsg,
  } = props;

  return (
    <ErrorBounds className={clsx(classes.root, classes.searchRoot)}>
      <Typography variant="h4">
        View Orders
      </Typography>

      <div className={clsx(classes.flexRow, classes.section)}>
        <Typography color={"primary"} variant="subtitle1" gutterBottom>
          Lookup Order ID:
        </Typography>
        <TextInput
          name="orderId"
          placeholder="e.g. oxxxxxxxxxxxxxx"
          className={classes.textField}
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          inputProps={{ style: { width: '100%' }}}
        />
        <Button
          className={classes.orderItemButton}
          variant={"outlined"}
          color={"primary"}
          onClick={() => searchOrder(orderId)}
        >
          Find Order
        </Button>
        {
          errorMsg &&
          <Typography color={"primary"} variant="subtitle1" gutterBottom>
            {errorMsg}
          </Typography>
        }
      </div>
      {props.children}
    </ErrorBounds>
  )
}


const RefundOrdersForm: React.FC<ReactOrdersFormProps> = (props) => {
  const {
    classes,
    onSubmit,
    disableRefundButton,
    onClickDebugPrint,
    total,
  } = props;

  return (
    <ErrorBounds className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit}>
        {props.children}
        <div className={clsx(classes.flexRow, classes.section1)}>
          <ButtonLoading
            type="submit" // this sets off Form submit
            disabled={!!disableRefundButton}
            variant={"outlined"}
            color={"primary"}
            onClick={onClickDebugPrint}
          >
            { `Refund Order: ${total}` }
          </ButtonLoading>
        </div>
      </form>
    </ErrorBounds>
  )
}

const DisplayRecentOrderIds = (props: DisplayRecentOrderIdProps) => {
  const { classes, recentTx, setOrderId } = props;
  return (
    <div className={classes.recentOrders}>
      <div className={classes.recentOrdersInner}>
        <Typography variant="subtitle2">
          Recent Orders
        </Typography>
        {
          recentTx
          .filter((tx: Transactions) => !tx.id.startsWith('re'))
          .map(tx => {
            return (
              <div
                key={tx.id}
                className={classes.recentOrderId}
                onClick={() => setOrderId(tx.orderId)}
              >
                {tx.orderId}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}


interface ReactOrdersSearchProps extends WithStyles<typeof styles> {
  setOrderId(orderId: string): void;
  orderId: string;
  searchOrder(orderId: string): void;
  errorMsg: string;
  loading: boolean;
}
interface OrderRefundsProps extends WithStyles<typeof styles> {
  onSubmit(args: any): void;
  disableRefundButton: boolean;
  onClickDebugPrint(): void;
}
interface ReactOrdersFormProps extends WithStyles<typeof styles> {
  onSubmit(args: any): void;
  disableRefundButton: boolean;
  onClickDebugPrint(): void;
  total: string;
}

interface DisplayRecentOrderIdProps extends WithStyles<typeof styles> {
  recentTx: Transactions[];
  setOrderId(id: ID): void;
}
interface SectionProps extends ReactProps {
  title: string;
}

interface ReactProps extends WithStyles<typeof styles> {
}
interface QueryData {
  getOrderAsAdmin: Orders;
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
interface QueryData3 {
  refundOrder: OrderMutationResponse;
}
interface QueryVar3 {
  orderId: string;
  reason?: string;
  reasonDetails?: string;
}



const styles = (theme: Theme) => createStyles({
  root: {
    padding: '3rem',
    borderRadius: BorderRadius,
    backgroundColor: Colors.foregroundColor,
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
  orderItemButton: {
    padding: "0.5rem 1rem",
    width: '100%',
    borderRadius: BorderRadius,
    border: `1px solid ${Colors.gradientUniswapBlue1}`,
    "&:hover": {
      border: `1px solid ${Colors.blue}`,
    },
  },
  discountRoot: {
    margin: '1rem',
    width: '100%',
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
  recentOrdersInner: {
    maxWidth: 400,
  },
  recentOrderId: {
    fontFamily: "courier",
    fontWeight: 600,
    cursor: 'pointer',
    "&:hover": {
      color: "#aaf",
    },
    margin: '0.1rem',
  },
});


export default withStyles(styles)( RefundOrders );



