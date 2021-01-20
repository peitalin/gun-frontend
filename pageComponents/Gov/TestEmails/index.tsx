import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import { ID, Orders } from "typings/gqlTypes";
import {
  GET_ORDER_AS_ADMIN,
  GET_RECENT_TRANSACTIONS,
} from "queries/orders-queries";
// Graphql
import { useQuery, useApolloClient, ApolloClient } from "@apollo/client";
// Snackbar
import { useSnackbar } from "notistack";
// Components
import TextInput from "components/Fields/TextInput";
import Typography from '@material-ui/core/Typography';
import ButtonLoading from "components/ButtonLoading";
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

  const [orderId, setOrderId] = React.useState("owp4wncjt");
  const [sellerEmail, setSellerEmail] = React.useState("admin@gunmarketplace.com.au");
  const [buyerEmail, setBuyerEmail] = React.useState("admin@gunmarketplace.com.au");
  const [order, setOrder] = React.useState<Orders>(undefined);

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

  React.useEffect(() => {

  },[])

  return (
    <div className={classes.rootTestEmails}>
      <Typography variant="h3" className={classes.headingTestEmails}>
        Send Test Emails
      </Typography>

      <div className={classes.orderIdContainer}>
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

        <Typography className={classes.orderIdTitle} variant={"body1"}>

          OrderId: {orderId}
        </Typography>
        <Typography className={classes.orderIdTitle} variant={"body1"}>
          Buyer Email: {buyerEmail}
        </Typography>
        <Typography className={classes.orderIdTitle} variant={"body1"}>
          Seller Email: {sellerEmail}
        </Typography>
        <TextInput
          type="text"
          placeholder={"OrderId"}
          className={classes.textField}
          value={buyerEmail}
          onChange={(e) => {
            let newBuyerEmail = e.target.value
            console.log("e.target.value: ", newBuyerEmail)
            setBuyerEmail(newBuyerEmail)
          }}
          inputProps={{ style: { width: '100%'  }}}
        />
        <TextInput
          type="text"
          placeholder={"OrderId"}
          className={classes.textField}
          value={sellerEmail}
          onChange={(e) => {
            let newEmail = e.target.value
            console.log("e.target.value: ", newEmail)
            setSellerEmail(newEmail)
          }}
          inputProps={{ style: { width: '100%'  }}}
        />
      </div>

      <SendWelcomeEmail/>
      <SendPasswordResetEmail/>
      <SendPaymentConfirmedEmails
        orderId={orderId}
      />
      <SendRefundedEmails
        orderId={orderId}
        buyerEmail={buyerEmail}
      />
      <SendForm10SubmittedEmails
        orderId={orderId}
        sellerEmail={sellerEmail}
      />
      <SendForm10ApprovedEmails
        orderId={orderId}
      />
      <SendPayoutCompleteEmails
        orderId={orderId}
      />
    </div>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
}

interface QueryData {
  getOrderAsAdmin: Orders;
}
interface QueryVar {
  orderId: ID;
}

const styles = (theme: Theme) => createStyles({
  rootTestEmails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2rem",
  },
  headingTestEmails: {
    marginBottom: '2rem',
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "4rem",
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



