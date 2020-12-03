import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Components
import Typography from "@material-ui/core/Typography";
import SendWelcomeEmail from "./1SendWelcomeEmail";
import SendPasswordResetEmail from "./2SendPasswordResetEmail";
import SendPaymentConfirmedEmails from "./3SendPaymentConfirmedEmails";
import SendRefundedEmails from "./4SendRefundedEmails";
import SendForm10SubmittedEmails from "./5SendForm10SubmittedEmails";
import SendForm10ApprovedEmails from "./6SendForm10ApprovedEmails";
import SendPayoutCompleteEmails from "./7SendPayoutCompleteEmails";



const TestEmailButton: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <div className={classes.rootTestEmails}>
      <Typography variant="h3" className={classes.headingTestEmails}>
        Send Test Emails
      </Typography>
      <SendWelcomeEmail/>
      <SendPasswordResetEmail/>
      <SendPaymentConfirmedEmails/>
      <SendRefundedEmails/>
      <SendForm10SubmittedEmails/>
      <SendForm10ApprovedEmails/>
      <SendPayoutCompleteEmails/>
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
});


export default withStyles(styles)( TestEmailButton );



