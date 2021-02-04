import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
import { ID, Orders, UserPrivate, Transactions } from "typings/gqlTypes";
import {
  GET_ORDER_AS_ADMIN,
  GET_RECENT_TRANSACTIONS,
} from "queries/orders-queries";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { Actions } from 'reduxStore/actions';
// Graphql
import { useQuery, useApolloClient, ApolloClient } from "@apollo/client";
// Snackbar
import { useSnackbar } from "notistack";
// Components
import TextInput from "components/Fields/TextInput";
import Typography from '@material-ui/core/Typography';
import ButtonLoading from "components/ButtonLoading";
import DisplayRecentOrderIds from "pageComponents/Gov/OrderViewer/DisplayRecentOrderIds";
//
import SendWelcomeEmail from "./1SendWelcomeEmail";
import SendPasswordResetEmail from "./2SendPasswordResetEmail";
import SendPaymentConfirmedEmails from "./3SendPaymentConfirmedEmails";
import SendRefundedEmails from "./4SendRefundedEmails";
import SendForm10SubmittedEmails from "./5SendForm10SubmittedEmails";
import SendForm10ApprovedEmails from "./6SendForm10ApprovedEmails";
import SendPayoutCompleteEmails from "./7SendPayoutCompleteEmails";



const TestEmailButton: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const aClient = useApolloClient();
  const snackbar = useSnackbar();

  const user = useSelector<GrandReduxState, UserPrivate>(s => {
    return s.reduxLogin.user
  })

  const [orderId, setOrderId] = React.useState("");
  const [sellerEmail, setSellerEmail] = React.useState("");
  const [buyerEmail, setBuyerEmail] = React.useState("");
  const [order, setOrder] = React.useState<Orders>(undefined);
  const [recentTx, setRecentTx] = React.useState<Transactions[]>([]);

  const searchOrder = async(orderId: string) => {
    try {
      const { loading, errors, data } = await aClient.query<QueryData, QueryVar>({
        query: GET_ORDER_AS_ADMIN,
        variables: { orderId: orderId },
        fetchPolicy: "no-cache", // always do a network request, no caches
      })
      if (data.getOrderAsAdmin) {
        let order = data.getOrderAsAdmin;
        setOrder(order)
        setSellerEmail(order.seller.user.email)
        setBuyerEmail(order.buyer.email)
      }
    } catch(e) {
      // setErrorMsg("OrderID does not exist.")
      snackbar.enqueueSnackbar(`OrderID does not exist`, { variant: "error" })
    }
  }

  const getRecentTransactions = async(count: number) => {
    const { loading, errors, data } = await aClient.query<QueryData2, QueryVar2>({
      query: GET_RECENT_TRANSACTIONS,
      variables: { count: count },
    })
    if (data.getRecentTransactions) {
      console.log("recent tx: ", data.getRecentTransactions);
      setRecentTx(data.getRecentTransactions)
    }
  }


  React.useEffect(() => {
    getRecentTransactions(5)
  },[])

  return (
    <div className={classes.rootTestEmails}>

      <div className={classes.orderIdContainer}>
        <div className={classes.headingContainer}>
          <Typography variant="h3" className={classes.headingTestEmails}>
            Send Test Emails
          </Typography>
        </div>
        <Typography className={classes.orderIdTitle} variant={"body1"}>
          Set Order ID
        </Typography>
        <TextInput
          type="text"
          placeholder={"OrderId"}
          className={classes.textField}
          value={orderId}
          onChange={(e) => {
            let newOrderId = e.target.value
            console.log("e.target.value: ", newOrderId)
            setOrderId(newOrderId)
          }}
          inputProps={{ style: { width: '100%'  }}}
        />

        <ButtonLoading
          className={classes.orderItemButton}
          variant={"outlined"}
          color={"primary"}
          onClick={() => searchOrder(orderId)}
        >
          Find Order
        </ButtonLoading>

        <DisplayRecentOrderIds
          recentTx={recentTx}
          setOrderId={setOrderId}
        />

      </div>

      <div className={classes.orderIdContainer}>

        <div className={classes.headingContainer}>
          <Typography className={classes.heading} variant={"body1"}>
            Order
          </Typography>
          <Typography className={classes.infoText} variant={"body1"}>
            OrderId: {orderId}
          </Typography>
          <Typography className={classes.infoText} variant={"body1"}>
            Buyer Email: {buyerEmail}
          </Typography>
          <Typography className={classes.infoText} variant={"body1"}>
            Seller Email: {sellerEmail}
          </Typography>
        </div>

        <SendWelcomeEmail />
        <SendPasswordResetEmail
          user={user}
        />
        <SendPaymentConfirmedEmails
          orderId={orderId}
          buyer={order?.buyer}
          seller={order?.seller?.user}
        />
        <SendRefundedEmails
          orderId={orderId}
          buyer={order?.buyer}
          seller={order?.seller?.user}
        />
        <SendForm10SubmittedEmails
          orderId={orderId}
          buyer={order?.buyer}
          seller={order?.seller?.user}
        />
        <SendForm10ApprovedEmails
          orderId={orderId}
          buyer={order?.buyer}
          seller={order?.seller?.user}
        />
        <SendPayoutCompleteEmails
          orderId={orderId}
          buyer={order?.buyer}
          seller={order?.seller?.user}
        />
      </div>
    </div>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  userEmail: string;
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

const styles = (theme: Theme) => createStyles({
  rootTestEmails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: '80vh',
  },
  headingContainer: {
    paddingTop: '2rem',
    padding: '1rem',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headingTestEmails: {
    marginBottom: '2rem',
  },
  heading: {
    fontWeight: 600,
    fontSize: '1.2rem',
    marginBottom: "0.25rem",
  },
  infoText: {
    minWidth: 100,
    maxWidth: 500,
    width: '100%',
    textAlign: 'start',
    marginBottom: "0.25rem",
  },
  orderIdTitle: {
    minWidth: 100,
    maxWidth: 500,
    marginBottom: "0.25rem",
  },
  orderIdContainer: {
    width: '100%',
    display: "flex",
    margin: "0.5rem",
    padding: "1rem",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: Colors.uniswapDarkNavy,
    boxShadow: BoxShadows.shadow1.boxShadow,
    borderRadius: BorderRadius,
  },
  textField: {
    height: '36px',
    margin: "0.5rem",
    maxWidth: 300,
  },
  orderItemButton: {
    padding: "0.5rem 1rem",
    marginBottom: "1rem",
    width: '100%',
    maxWidth: 300,
    borderRadius: BorderRadius,
    border: `1px solid ${Colors.gradientUniswapBlue1}`,
    "&:hover": {
      border: `1px solid ${Colors.blue}`,
    },
  },
});


export default withStyles(styles)( TestEmailButton );



