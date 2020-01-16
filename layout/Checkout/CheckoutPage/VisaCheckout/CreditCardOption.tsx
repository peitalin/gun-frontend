import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
// Material UI
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
// Component
import VisaIcon from "components/Icons/Visa";
// Typings
import { PaymentMethod } from "typings/gqlTypes";
import { Colors } from "layout/AppTheme";



const CreditCard = (props: ReactProps) => {

  const {
    classes,
    showExpiry = true,
  } = props;

  const pm = props.paymentMethod as PaymentMethod;


  const formatMonthYear = (m, y) => {
    if (m < 10) {
      return `0${m}/${y.slice(-2)}`
    } else {
      return `${m}/${y.slice(-2)}`
    }
  }

  return (
    <div className={classes.visaContainerOuter}>
      <div className={clsx(
          classes.visaContainerInner,
          props.selected
            ? classes.selectedCreditCardContainer
            : classes.creditCardContainer
        )}
      >
        <div className={clsx(
          classes.displayVisaRow,
        )}>
          <div className={classes.flexRow}>
            <span className={classes.visaSpacer}>
              <VisaIcon/>
            </span>
            <span className={classes.visaSpacer}>
              <Typography variant="subtitle1" className={classes.creditCardText}>
                ••••
              </Typography>
            </span>
            <span className={classes.visaSpacer}>
              <Typography variant="subtitle1" className={classes.creditCardText}>
                ••••
              </Typography>
            </span>
            <span className={classes.visaSpacer}>
              <Typography variant="subtitle1" className={classes.creditCardText}>
                ••••
              </Typography>
            </span>
            <span className={classes.visaSpacer}>
              <Typography variant="body2" className={classes.creditCardText}>
                {option(pm).last4("••••")}
              </Typography>
            </span>
          </div>
          {
            showExpiry &&
            pm && pm.expMonth && pm.expYear &&
            <div className={classes.flexRow}>
              <span className={classes.visaSpacer}>
                <Typography className={classes.expDate} variant="caption">
                  {formatMonthYear(pm.expMonth, pm.expYear)}
                </Typography>
              </span>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  paymentMethod: PaymentMethod;
  showExpiry?: boolean;
  selected?: boolean;
}

export const styles = (theme: Theme) => createStyles({
  creditCardContainer: {
    padding: '0.5rem',
    // border: "1px solid #eaeaea",
    borderRadius: "0px",
    minWidth: 200,
    width: "calc(100% - 2px)",
    background: Colors.foregroundColor,
    "&:hover": {
      background: fade(Colors.primary, 0.1),
    },
  },
  selectedCreditCardContainer: {
    padding: '0rem',
    // border: "1px solid #eaeaea",
    borderRadius: "0px",
    minWidth: 200,
    width: "calc(100% - 2px)",
    background: Colors.foregroundColor,
    "&:hover": {
      background: Colors.foregroundColor,
      // override default blue hover
    },
  },
  visaContainerOuter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  visaContainerInner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  displayVisaRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  visaSpacer: {
    marginRight: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    color: Colors.charcoal,
  },
  flexRow: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
  },
  expDate: {
    fontWeight: 600,
    color: Colors.darkerGrey,
  },
  creditCardText: {
    fontSize: '0.8rem',
    fontWeight: 600,
    lineHeight: '1rem',
  },
})

export default withStyles(styles)( CreditCard );