import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Components
import TextInput from "components/Fields/TextInput";
import Typography from '@material-ui/core/Typography';
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

  const [orderId, setOrderId] = React.useState("owp4wncjt");
  const [sellerEmail, setSellerEmail] = React.useState("admin@gunmarketplace.com.au");
  const [buyerEmail, setBuyerEmail] = React.useState("admin@gunmarketplace.com.au");

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
        <Typography className={classes.orderIdTitle} variant={"body1"}>
          Set Buyer Email
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
        <Typography className={classes.orderIdTitle} variant={"body1"}>
          Set Seller Email
        </Typography>
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
  },
  orderIdContainer: {
    width: '100%',
    display: "flex",
    margin: "0.5rem",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    height: '36px',
    margin: "1rem",
  },
});


export default withStyles(styles)( TestEmailButton );



