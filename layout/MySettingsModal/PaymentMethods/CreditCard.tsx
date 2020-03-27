import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Material UI
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
// Component
import VisaIcon from "components/Icons/Visa";
import ConfirmRemoveCardModalButton from "./ConfirmRemoveCardModalButton";
// Typings
import { PaymentMethod } from "typings/gqlTypes";
import { ID } from "typings/gqlTypes";
import { Colors } from "layout/AppTheme";



const CreditCard = (props: ReactProps) => {

  const {
    classes,
    showExpiry = false,
  } = props;
  const {
    setDefaultPaymentMethod,
    isDefaultPaymentMethod,
    removeCreditCard,
  } = props;
  const pm = props.paymentMethod as PaymentMethod;

  const [showModal, setShowModal] = React.useState(false);

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
        isDefaultPaymentMethod
          ? classes.defaultCardContainer
          : classes.creditCardContainer,
      )}>
        <div className={clsx(
          classes.displayVisaRow,
          (setDefaultPaymentMethod && removeCreditCard) ? null : classes.flexGrow1,
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
                {pm.last4}
              </Typography>
            </span>
          </div>
          {
            showExpiry &&
            <div className={classes.flexRow}>
              <span className={classes.visaSpacer}>
                <Typography className={classes.expDate} variant="caption">
                  {formatMonthYear(pm.expMonth, pm.expYear)}
                </Typography>
              </span>
            </div>
          }
        </div>
        <div className={classes.displayVisaRow}>
          {
            setDefaultPaymentMethod &&
            <span className={classes.visaSpacerXL}>
            {
              isDefaultPaymentMethod
              ? <Typography variant="body1"
                  className={classes.defaultCardCurrentLink}>
                  Current default
                </Typography>
              : <a onClick={() => setDefaultPaymentMethod(pm.id)}>
                  <Typography variant="body1"
                    className={classes.setDefaultLink}
                  >
                    Set as default
                  </Typography>
                </a>
            }
            </span>
          }
          {
            removeCreditCard &&
            <ConfirmRemoveCardModalButton
              showModal={showModal}
              setShowModal={setShowModal}
              onConfirmFunction={() => removeCreditCard(pm.id)}
            />
          }
        </div>
      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  paymentMethod: PaymentMethod;
  isDefaultPaymentMethod: boolean;
  setDefaultPaymentMethod?(pm_id: string): void;
  removeCreditCard?(payment_method_id: ID): void;
  showExpiry?: boolean;
}

export const styles = (theme: Theme) => createStyles({
  defaultCardOptionLink: {
    color: "#2484FF",
    cursor: 'pointer',
    marginRight: "1rem",
  },
  defaultCardCurrentLink: {
    color: Colors.secondary,
    cursor: 'default',
    marginRight: "1rem",
  },
  setDefaultLink: {
    color: Colors.charcoal,
    "&:hover": {
      color: Colors.blue,
      cursor: 'pointer',
    },
    cursor: 'default',
    marginRight: "1rem",
  },
  defaultCardContainer: {
    margin: "0.25rem 0rem",
    padding: "0.25rem",
    borderRadius: "4px",
    minWidth: 200,
    width: "100%",
    background: Colors.cream,
    transition: theme.transitions.create('background', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  creditCardContainer: {
    margin: "0.25rem 0rem",
    // border: "1px solid #eaeaea",
    padding: "0.25rem",
    borderRadius: "4px",
    minWidth: 200,
    width: "calc(100% - 0.5rem - 2px)",
    background: Colors.foregroundColor,
    transition: theme.transitions.create('background', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
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
  flexGrow1: {
    flexGrow: 1,
  },
  visaSpacer: {
    marginRight: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    color: Colors.charcoal,
  },
  visaSpacerXL: {
    marginRight: '1rem',
    display: 'flex',
    justifyContent: 'center',
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