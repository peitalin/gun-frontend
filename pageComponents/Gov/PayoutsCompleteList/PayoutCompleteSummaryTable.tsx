import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius2x, BorderRadius, Colors, isThemeDark } from "layout/AppTheme";
// Typings
import {
  OrderAdmin,
  PayeeType,
  PayoutSummary,
} from "typings/gqlTypes";
import {
  GET_COMPLETE_ORDERS_PAYOUT_SUMMARY,
} from "queries/orders-admin-queries";
// Graphql
import { useQuery, useLazyQuery } from "@apollo/client";
// Material UI
import LoadingBar from "components/LoadingBar";
import Typography from "@material-ui/core/Typography";
// Media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// snackbar
import { useSnackbar, ProviderContext } from "notistack";
// Copy and tooltip for ids when on mobile
import { formatDate } from "utils/dates";
import { asCurrency as c } from "utils/prices";



const PayoutCompleteSummaryTable = (props: ReactProps) => {

  const {
    classes,
  } = props;

  const snackbar = useSnackbar();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));


  const { data, loading } = useQuery<QData2, QVar2>(
    GET_COMPLETE_ORDERS_PAYOUT_SUMMARY, {
    variables: {
      orderIds: props.orderIds
    },
    onCompleted: () => {
    },
  });

  const payoutSummary = data?.getCompleteOrdersPayoutSummary;

  const sum = payoutSummary?.aggregate?.sum

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
        {
          loading
          ? <LoadingBar
              absoluteTop
              color={
                isThemeDark(theme)
                  ? Colors.purple
                  : Colors.ultramarineBlue
              }
              height={4}
              width={'100vw'}
              loading={loading}
              style={{ zIndex: 1 }}
            />
          : <div className={classes.flexRow}>
              {/* COLUMN 1 */}
              <div className={clsx(classes.flexCol, classes.minWidth2)}>
                <div className={classes.flexItem}>
                  <Typography variant="body1" className={classes.subtitle}>
                    Stripe
                  </Typography>
                </div>
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
                  <Typography variant="body1" className={classes.subtitle}>
                    Westpac
                  </Typography>
                </div>
                <div className={classes.flexItem}>
                  <Typography variant="body2" className={classes.id}>
                    Incoming Funds
                  </Typography>
                </div>
                <div className={classes.flexItem}>
                  <Typography variant="body2"
                    className={clsx(classes.id, classes.indent, classes.red)}>
                    - GM Fees
                  </Typography>
                </div>
                <div className={clsx(classes.flexItem, classes.topLine)}>
                  <Typography variant="body2" className={classes.id}>
                    Seller Earnings
                  </Typography>
                </div>
              </div>

              {/* COLUMN 2 */}
              <div className={classes.flexCol}>
                <div className={classes.flexItem}>
                  {/* keep empty */}
                  <Typography variant="body1" className={classes.subtitle}>
                  </Typography>
                </div>
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
                  <Typography variant="body2"
                    className={clsx(classes.idMono, classes.blue)}
                  >
                    {c(totalPayoutFromStripe)}
                  </Typography>
                </div>


                <div className={classes.divider}></div>


                <div className={classes.flexItem}>
                  {/* keep empty */}
                  <Typography variant="body1" className={classes.subtitle}>
                  </Typography>
                </div>
                <div className={classes.flexItem}>
                  <Typography variant="body2" className={classes.idMono}>
                    {c(sum?.amount)}
                  </Typography>
                </div>
                <div className={classes.flexItem}>
                  <Typography variant="body2"
                    className={clsx(classes.idMono, classes.red)}>
                    {c(platformEarnings)}
                  </Typography>
                </div>
                <div className={clsx(classes.flexItem, classes.topLine)}>
                  <Typography variant="body2"
                    className={clsx(classes.idMono, classes.green)}
                  >
                    {c(sellerEarnings)}
                  </Typography>
                </div>
              </div>
            </div>
        }
      </div>
    </main>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  orderIds: string[]
  loading: boolean
  setLoading(a?: any): void;
}

// payout summary
interface QVar2 {
  orderIds: string[]
}
interface QData2 {
  getCompleteOrdersPayoutSummary: PayoutSummary
}

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: "1rem",
  },
  payoutSummaryContainer: {
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    backgroundColor: theme.palette.type === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.cream}`,
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
  subtitle: {
    fontSize: '0.9rem',
    width: '100%',
    marginBottom: '0.25rem',
    fontWeight: 600,
    color: isThemeDark(theme)
      ? Colors.uniswapMediumGrey
      : Colors.slateGreyDarkest,
  },
  id: {
    fontWeight: 600,
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
    color: Colors.lighterRed,
  },
  blue: {
    color: Colors.ultramarineBlue,
  },
  green: {
    color: Colors.green,
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

export default withStyles(styles)( PayoutCompleteSummaryTable );



