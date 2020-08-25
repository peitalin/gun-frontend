import * as React from "react";
import { NextPage, NextPageContext } from 'next';
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { Actions } from 'reduxStore/actions';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import {
  UserPrivate,
  ID,
  Orders,
  Transactions,
} from "typings/gqlTypes";
// import { RefundReason, MakeRefundParams } from "typings";
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
import OrderItemCard from "./OrderCard";
import RefundTaxesFees from "./RefundTaxesFees";
// Graphql
import { useQuery, useApolloClient, ApolloClient } from "@apollo/client";
import { GET_ORDER_AS_ADMIN, GET_RECENT_TRANSACTIONS } from "queries/orders-queries";
// Refund
// import { makeRefund } from "utils/requests";
import { v4 as uuidv4 } from "uuid"
// Validation
import { Formik } from 'formik';
import { validationSchemas } from "utils/validation";
import SnackBarA from "components/Snackbars/SnackbarA";
import SnackbarsSuccessErrors from "components/Snackbars/SnackbarsSuccessErrors";




const RefundOrders: React.FC<ReactOrdersFormProps> = (props) => {

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
      setErrorMsg("OrderID does not exist.")
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
  }, [])

  if (order) {
    console.log("incoming order: ", order)
  }

  const user = useSelector<GrandReduxState, UserPrivate>(
    state => option(state).reduxLogin.user()
  );

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
          // orderId: order.id,
          // refundOrderItemIds: [],
          // chargeId: order.currentSnapshot.transaction.chargeId,
          // paymentIntentId: order.currentSnapshot.transaction.paymentIntentId,
          // taxes: 0,
          // reason: RefundReason.RequestedByCustomer,
          // reasonDetail: '',
          // paypalInvoiceNumber: `${uuidv4()}`,
          // paymentProcessor: order.currentSnapshot.transaction.paymentProcessor,
        }}
        validationSchema={validationSchemas.Refund}
        onSubmit={(values, { setSubmitting }) => {
          console.log("not inmplemented")
        //   console.log('formik values: ', values);
        //   console.log("refunding order", order)
        //   makeRefund({
        //     orderId: values.orderId,
        //     refundOrderItemIds: values.refundOrderItemIds,
        //     chargeId: values.chargeId,
        //     paymentIntentId: values.paymentIntentId,
        //     taxes: values.taxes,
        //     reason: values.reason,
        //     reasonDetail: values.reasonDetail,
        //     paypalInvoiceNumber: values.paypalInvoiceNumber,
        //     paymentProcessor: values.paymentProcessor,
        //   }).then(res => {
        //     console.log(res)
        //     setLoading(false)
        //     searchOrder(values.orderId)
        //     setRefundMsg(JSON.stringify(res))
        //   }).catch(e => {
        //     console.log(e)
        //     setLoading(false)
        //     setErrorMsg(JSON.stringify(e))
        //   })
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
              disableRefundButton={
                !order.id
                // || values.refundOrderItemIds.length === 0
              }
              onClickDebugPrint={() => {
                console.log(fprops.errors)
                setLoading(true)
              }}
            >
              <div className={classes.backButton}>
                <IconButton onClick={() => setOrder(undefined)}>
                  <KeyboardArrowLeft/>
                </IconButton>
                <Typography variant="subtitle2">
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
                {/* <OrderPrices
                  order={order}
                  {...fprops}
                /> */}
              </Section>
              {/* <Section classes={classes} title={"Refund Line Items"}>
                {
                  option(order).items([]).every((o: OrderItem) => !!o.id) &&
                  option(order).items([]).every((o: OrderItem) => !!o.orderStatus) &&
                  option(order).items([]).every((o: OrderItem) => !!o.priceDetails) &&
                  order.items.map(oitem =>
                    <OrderItemCard
                      key={oitem.id}
                      orderItem={oitem}
                      total={total}
                      subtotal={subtotal}
                      {...fprops}
                    />
                  )
                }
              </Section> */}

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
            Refund Order
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
interface ReactOrdersFormProps extends WithStyles<typeof styles> {
  onSubmit(args: any): void;
  disableRefundButton: boolean;
  onClickDebugPrint(): void;
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
  refreshPaypalToken: {
    status: string;
    token: string;
  }
}
interface QueryVar3 {
}



const styles = (theme: Theme) => createStyles({
  root: {
    padding: '3rem',
    borderRadius: '2px',
    border: '1px solid #eaeaea',
    backgroundColor: Colors.foregroundColor,
    boxShadow: '0px 1px 1px 0 #e6ebf1',
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
    borderRadius: '2px',
    borderRight: `1px solid ${Colors.lightPurple}`,
    borderLeft: `1px solid ${Colors.lightPurple}`,
    borderTop: `1px solid ${Colors.lightPurple}`,
    borderBottom: `1px solid ${Colors.lightPurple}`,
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


// ////////// SSR ///////////
// interface Context extends NextPageContext {
//   apolloClient: ApolloClient<any>;
// }

// RefundOrders.getInitialProps = async (ctx: Context) => {
//     return {
//       setOrderId: undefined,
//       orderId: "",
//       searchOrder: undefined,
//       onSubmit: undefined,
//       disableRefundButton: true,
//       onClickDebugPrint: undefined,
//       errorMsg: undefined,
//     } as ReactOrdersFormProps & ReactOrdersSearchProps
// }


export default withStyles(styles)( RefundOrders );



