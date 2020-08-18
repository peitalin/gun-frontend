import * as React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { ID, Transaction  } from "typings/gqlTypes";
// import { MakeRefundParams, RefundReason } from "typings";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Loading from "components/Loading";
// Validation
import { FormikProps } from 'formik';
import currency from "currency.js";
const c = (s) => currency(s/100, { formatWithSymbol: true }).format()



const RefundTaxesFees = (props: ReactProps & FormikProps<FormikFields>) => {

  const { classes, tx, ...fprops } = props;
  // refund taxes and fees
  const [refundTaxes, setRefundTaxes] = React.useState(false);
  const [refundPaymentProcessingFee, setRefundPaymentProcessingFee] = React.useState(false);

  const handleRefundTaxes = () => {
    if (refundTaxes === false) {
      setRefundTaxes(true)
      fprops.setFieldValue("taxes", tx.taxes)
    } else {
      setRefundTaxes(false)
      fprops.setFieldValue("taxes", 0)
    }
  }

  const handleRefundPaymentProcessingFee = () => {
    if (refundPaymentProcessingFee === false) {
      setRefundPaymentProcessingFee(true)
      fprops.setFieldValue("paymentProcessingFee", tx.paymentProcessingFee)
    } else {
      setRefundPaymentProcessingFee(false)
      fprops.setFieldValue("paymentProcessingFee", 0)
    }
  }

  // Formik props
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
  } = fprops;

  if (!tx) {
    return <Loading inline loading={!tx}/>
  }

  return (
    <div className={clsx(classes.root, classes.flexRow)}>
      <div className={classes.flexContainer}>
        <FormGroup row className={classes.flexRow}>
          <FormControlLabel
            control={
              <Checkbox
                disabled={props.disableRefundPaymentProcessingFee}
                checked={refundPaymentProcessingFee}
                onChange={handleRefundPaymentProcessingFee}
                value="Special"
                color="primary"
              />
            }
            label={
              <div>
                {
                  props.disableRefundPaymentProcessingFee
                  ? `Refunded ${tx.paymentProcessor} Payment Processing Fees: `
                  : `Refund ${tx.paymentProcessor} Payment Processing Fee: `
                }
                <span className={classes.actualPrice}>{c(tx.paymentProcessingFee)}</span>
              </div>
            }
          />
        </FormGroup>
        <FormGroup row className={clsx(classes.flexRow, classes.marginBottom1)}>
          <FormControlLabel
            control={
              <Checkbox
                disabled={props.disableRefundTaxes}
                checked={refundTaxes}
                onChange={handleRefundTaxes}
                value="Special"
                color="primary"
              />
            }
            label={
              <div>
                {
                  props.disableRefundTaxes
                  ? "Refunded taxes: "
                  : "Refund taxes: "
                }
                <span className={classes.actualPrice}>{c(tx.taxes)}</span>
              </div>
            }
          />
        </FormGroup>
      </div>
    </div>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  tx: Transaction;
  disableRefundPaymentProcessingFee: boolean;
  disableRefundTaxes: boolean;
}
interface FormikFields {
  taxes: number;
  paymentProcessingFee: number;
}

const styles = (theme: Theme) => createStyles({
  root: {
    maxWidth: '400px',
  },
  flexContainer: {
    borderRadius: '2px',
    borderBottom: '1px solid #eaeaea',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  marginBottom1: {
    marginBottom: '1rem',
  },
  actualPrice: {
    color: Colors.secondary,
  },
});

export default withStyles(styles)( RefundTaxesFees );



