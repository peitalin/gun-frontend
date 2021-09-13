import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius, isThemeDark } from "layout/AppTheme";
// Typings
import {
  OrderAdmin,
} from "typings/gqlTypes";
// Utils Components
import LoadingBar from "components/LoadingBar";
import ButtonLoading from "components/ButtonLoading";
// Material UI
import Typography from "@material-ui/core/Typography";
// Media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// snackbar
import { useSnackbar, ProviderContext } from "notistack";
// apollo
import { useApolloClient } from "@apollo/client";
import { MARK_PAYOUTS_AS_PAID } from "queries/orders-admin-mutations";
import { useMutation } from "@apollo/client";
// Grid Components
import TextInputAdorned from 'components/Fields/TextInputAdorned';
import dayjs from 'dayjs';
import { useRouter } from "next/router";




const MarkPayoutCompleteButton = (props: ReactProps) => {

  const { classes } = props;

  const aClient = useApolloClient();
  const router = useRouter();
  const snackbar = useSnackbar();

  const theme = useTheme();
  const csvLinkRef = React.useRef();
  const [accumPayouts, setAccumPayouts] = React.useState<any[]>([])
  const [payoutId, setPayoutId] = React.useState(undefined);

  const getDateNow = () => {
    let d = new Date()
    return dayjs(d).format("DD-MM-YYYY hh:mm A")
  }

  const [
    markPayoutsAsPaid,
    markPayoutsAsPaidResponse
  ] = useMutation<MutData2, MutVar2>(
    MARK_PAYOUTS_AS_PAID, {
    variables: {
      orderIds: undefined,
      payoutId: undefined,
    },
    onCompleted: () => {
      snackbar.enqueueSnackbar(`Payouts marked complete.`, { variant: "info" })
      router.push("/gov/escrow/complete")
    },
  });

  return (
    <div className={classes.flexRowSpaceBetween}>
      <div className={classes.flexColRightBottom}>
        <div className={classes.addPayoutIdBox}>
          <TextInputAdorned
            placeholder={"Enter Westpac payout ID"}
            value={payoutId}
            onChange={(e) => setPayoutId(e.target.value)}
            inputProps={{
              root: {
                width: '90%',
              },
              style: {
                width: '100%',
                minWidth: '180px',
                height: "19px",
                borderRadius: "4px 0 0 4px",
                borderRight: 'none',
              }
            }}
          />
          <ButtonLoading
            variant="outlined"
            className={classes.markPayoutCompleteButton}
            onClick={() => {
              markPayoutsAsPaid({
                variables: {
                  orderIds: props.orderIds,
                  payoutId: payoutId,
                }
              })
            }}
            loadingIconColor={Colors.blue}
            replaceTextWhenLoading={true}
            loading={markPayoutsAsPaidResponse.loading}
            disabled={!payoutId}
            color="secondary"
            style={{
              minWidth: '200px',
              height: '36px',
            }}
          >
            Mark Payouts Complete
          </ButtonLoading>
        </div>
      </div>
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  orderIds: string[]
  loading: boolean
  setLoading(a?: any): void
}

interface MutData2 {
  orders: OrderAdmin[]
}
interface MutVar2 {
  orderIds: string[];
  payoutId: string;
}

const styles = (theme: Theme) => createStyles({
  root: {
    padding: '0rem 1rem 2rem 1rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minHeight: 'calc(100vh - 90px - 120px)',
    flexGrow: 1,
  },
  flexColRightBottom: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  flexRowSpaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  blueText: {
    color: Colors.blue,
  },
  addPayoutIdBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  markPayoutCompleteButton: {
    margin: "0.5rem 0rem 0.5rem 0.5rem",
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    borderRadius: BorderRadius,
  },
});

export default withStyles(styles)( MarkPayoutCompleteButton );



