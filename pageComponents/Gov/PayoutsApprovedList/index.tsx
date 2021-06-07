import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius, isThemeDark, BorderRadius2x } from "layout/AppTheme";
// Typings
import {
  UserPrivate,
  OrderAdmin,
  ConnectionQuery,
  PayoutSummary,
  OrdersConnection,
  PayeeType,
  OrdersGroupedByDay,
} from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import LoadingBar from "components/LoadingBar";
import PayoutApprovedSummaryTable from "./PayoutApprovedSummaryTable";
import ButtonLoading from "components/ButtonLoading";
// Material UI
import Typography from "@material-ui/core/Typography";
// Media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Grid Components
import PayoutsApprovedTable from "./PayoutsApprovedTable";
import CsvDownloaderButton from "./CsvDownloaderButton";
import MarkPayoutCompleteButton from "./MarkPayoutCompleteButton";
import { showDate } from "utils/dates";
import copy from "clipboard-copy";
import { useSnackbar } from "notistack";



const PayoutsApprovedList = (props: ReactProps) => {

  const { classes } = props;

  const snackbar = useSnackbar()
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const [loading, setLoading] = React.useState(false)

  console.log("orderIdsGroupedByDay", props.orderIdsGroupedByDay)

  return (
    <ErrorBounds className={clsx(
      classes.root,
      mdDown && classes.rootMobile,
    )}>

      <LoadingBar
        absoluteTop
        height={4}
        width={'100vw'}
        loading={loading}
        style={{ zIndex: 1 }}
      />

      <Typography variant={"h2"} className={classes.title}>
        Approved Payouts
      </Typography>
      {

        ((props.orderIdsGroupedByDay ?? []).length === 0) &&
        <div className={clsx(
          classes.noApprovedPayoutsBox,
          classes.flexCol,
        )}>
          <Typography variant="h5">
            No approved payouts currently
          </Typography>
        </div>
      }
      {
        (props.orderIdsGroupedByDay ?? []).map(( oGroup, i ) => {
          // console.log("oGroup: ", oGroup)
          return (
            <div key={i} className={classes.oGroupItem}>

              <PayoutsApprovedTable
                admin={props.admin}
                day={oGroup.day}
                orderIds={oGroup.orderIds}
                setLoading={setLoading}
              />

              <div className={classes.flexRow}>
                <div className={classes.flexCol}>
                  <CsvDownloaderButton
                    orderIds={oGroup.orderIds}
                    totalCountCsv={oGroup?.orderIds?.length}
                    loading={loading}
                    setLoading={setLoading}
                  />
                  <MarkPayoutCompleteButton
                    orderIds={oGroup.orderIds}
                    loading={loading}
                    setLoading={setLoading}
                  />
                </div>
                <div className={classes.flexCol}>
                  <PayoutApprovedSummaryTable
                    orderIds={oGroup.orderIds}
                    loading={loading}
                    setLoading={setLoading}
                  />
                </div>
              </div>
            </div>
          )
        })
      }


    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  admin: UserPrivate
  orderIdsGroupedByDay: OrdersGroupedByDay[]
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
  rootMobile: {
    padding: '0.5rem',
    paddingTop: '0rem',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  flexRowSpaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  oGroupItem: {
    width: '100%',
  },
  title: {
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
    marginTop: '2rem',
    marginBottom: '1rem',
  },
  noApprovedPayoutsBox: {
    background: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.slateGrey,
    padding: '1rem',
    borderRadius: BorderRadius2x,
    minHeight: 400,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default withStyles(styles)( PayoutsApprovedList );



