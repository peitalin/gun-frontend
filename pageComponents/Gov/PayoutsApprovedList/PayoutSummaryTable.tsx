import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius2x, BorderRadius, Colors } from "layout/AppTheme";
// Typings
import {
  OrderAdmin,
  PayeeType,
  PayoutSummary,
} from "typings/gqlTypes";
// Utils Components
import MenuItem from "@material-ui/core/MenuItem";
// Material UI
import Typography from "@material-ui/core/Typography";
// Media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// snackbar
import { useSnackbar, ProviderContext } from "notistack";
// Copy and tooltip for ids when on mobile
import Tooltip from '@material-ui/core/Tooltip';
import { formatDate } from "utils/dates";
import { asCurrency as c } from "utils/prices";



const PayoutSummaryTable = (props: ReactProps) => {

  const {
    classes,
    payoutSummary
  } = props;

  const sum = payoutSummary?.aggregate?.sum

  const snackbar = useSnackbar();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));


  let platformEarnings = (payoutSummary?.nodes ?? [])
    .filter(payoutItem => payoutItem.payeeType === PayeeType.PLATFORM)
    .reduce(( acc, p ) => p.amount + acc, 0)

  let sellerEarnings = (payoutSummary?.nodes ?? [])
    .filter(payoutItem => payoutItem.payeeType === PayeeType.STORE)
    .reduce(( acc, p ) => p.amount + acc, 0)

  let totalEarnings = (sum?.amount ?? 0) + (sum?.paymentProcessingFee ?? 0)
  let totalPayoutFromStripe = totalEarnings - sum?.paymentProcessingFee

  return (
    <main className={classes.root}>
      <div className={classes.payoutSummaryContainer}>
        <div className={classes.flexRow}>

          {/* COLUMN 1 */}
          <div className={clsx(classes.flexCol, classes.minWidth2)}>
            <div className={classes.flexItem}>
              <Typography variant="body2" className={classes.id}>
                Total Earnings
              </Typography>
            </div>
            <div className={classes.flexItem}>
              <Typography variant="body2"
                className={clsx(classes.id, classes.indent, classes.red)}>
                - Stripe Fees
              </Typography>
            </div>
            <div className={clsx(classes.flexItem, classes.topLine)}>
              <Typography variant="body2" className={classes.id}>
                Subtotal
              </Typography>
            </div>

            <div className={classes.divider}></div>

            <div className={classes.flexItem}>
              <Typography variant="body2" className={classes.id}>
                Seller Earnings
              </Typography>
            </div>
            <div className={classes.flexItem}>
              <Typography variant="body2" className={classes.id}>
                GM Earnings
              </Typography>
            </div>
            <div className={clsx(classes.flexItem, classes.topLine)}>
              <Typography variant="body2" className={classes.id}>
                Total Payout
              </Typography>
            </div>
          </div>

          {/* COLUMN 2 */}
          <div className={classes.flexCol}>
            <div className={classes.flexItem}>
              <Typography variant="body2" className={classes.idMono}>
                {c(totalEarnings)}
              </Typography>
            </div>
            <div className={classes.flexItem}>
              <Typography variant="body2"
                className={clsx(classes.idMono, classes.red)}>
                {c(sum?.paymentProcessingFee)}
              </Typography>
            </div>
            <div className={clsx(classes.flexItem, classes.topLine)}>
              <Typography variant="body2" className={classes.idMono}>
                {c(totalPayoutFromStripe)}
              </Typography>
            </div>


            <div className={classes.divider}></div>


            <div className={classes.flexItem}>
              <Typography variant="body2" className={classes.idMono}>
                {c(sellerEarnings)}
              </Typography>
            </div>
            <div className={classes.flexItem}>
              <Typography variant="body2" className={classes.idMono}>
                {c(platformEarnings)}
              </Typography>
            </div>
            <div className={clsx(classes.flexItem, classes.topLine)}>
              <Typography variant="body2" className={classes.idMono}>
                {c(sum?.amount)}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  payoutSummary: PayoutSummary
  loading: boolean
}

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  payoutSummaryContainer: {
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    padding: '1.5rem',
    borderRadius: BorderRadius,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
  },
  minWidth2: {
    minWidth: 120,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  flexItem: {
    flexGrow: 1,
    flexBasis: "8%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: 'center',
    paddingRight: '0.5rem',
  },
  title: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  customerName: {
    color: Colors.charcoal,
    fontWeight: 600,
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    width: '100%',
    textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    // overflow: 'scroll',
    // maxWidth: 200,
    // width: '30vw', // 20vw, max 150px
  },
  id: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginBottom: "0.25rem",
    width: '100%', // 20vw, max 150px
    // need to set width in VW for ellipsis
  },
  idMono: {
    fontFamily: "Courier",
    fontWeight: 600,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginBottom: "0.25rem",
    textAlign: "end",
    width: '100%', // 20vw, max 150px
    // need to set width in VW for ellipsis
  },
  indent: {
    marginLeft: '0.5rem',
  },
  red: {
    color: Colors.lightRed,
  },
  topLine: {
    marginTop: "0.10rem",
    paddingTop: "0.10rem",
    borderTop: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightGrey}`
      : `1px solid ${Colors.slateGreyBlack}`,
  },
  divider: {
    marginTop: "1rem",
    paddingTop: "1rem",
  },
});

export default withStyles(styles)( PayoutSummaryTable );



