import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
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
import ButtonLoading from "components/ButtonLoading";
import PayoutCompleteSummaryTable from "./PayoutCompleteSummaryTable";
// Material UI
import Typography from "@material-ui/core/Typography";
// Media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Grid Components
import PayoutsCompleteTable from "./PayoutsCompleteTable";
import { showDate, getDateWithOffset } from "utils/dates";
import { useRouter } from "next/router";
import copy from "clipboard-copy";
import { useSnackbar } from "notistack";

import { useQuery } from "@apollo/client";
import {
  GET_COMPLETE_ORDER_IDS_GROUPED_BY_DAY,
} from "queries/orders-admin-queries";

import dayjs from 'dayjs'
import DateFnsUtils from '@date-io/dayjs';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';






const PayoutsCompleteList = (props: ReactProps) => {

  const { classes } = props;

  const snackbar = useSnackbar()
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));


  let defaultBefore = new Date() // now
  let defaultAfter = getDateWithOffset(7) // 7 days ago

  const [beforeDate, setBeforeDate] = React.useState<Date>(defaultBefore)
  const [afterDate, setAfterDate] = React.useState<Date>(defaultAfter)
  // button click required to dispatch GQL call
  const [beforeDateGql, setBeforeDateGql] = React.useState<Date>(defaultBefore)
  const [afterDateGql, setAfterDateGql] = React.useState<Date>(defaultAfter)


  const handleBeforeDateChange = (date) => {
    // console.log("incoming date:", date)
    let d = new Date(date)
    d.setHours(0)
    d.setSeconds(0)
    d.setMinutes(0)
    console.log("before date:", d)
    setBeforeDate(d)
  };

  const handleAfterDateChange = (date) => {
    let d = new Date(date)
    d.setHours(0)
    d.setSeconds(0)
    d.setMinutes(0)
    console.log("after date:", d)
    setAfterDate(d)
  };


  const { data, loading } = useQuery<QData, QVar>(
    GET_COMPLETE_ORDER_IDS_GROUPED_BY_DAY, {
    variables: {
      before: beforeDateGql,
      after: afterDateGql,
    },
  })

  let orderIdsGroupedByDay = data?.getCompleteOrderIdsGroupedByDay;
  console.log("orderIdsGroupedByDay", orderIdsGroupedByDay)

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
        Completed Payouts
      </Typography>

      <div className={classes.datePickerBox}>
        <Typography variant={"h5"} className={classes.subTitle}>
          Show payouts between
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className={classes.datePickerInnerBox}>
            <Typography variant={"h5"} className={classes.dateTitle}>
              Start
            </Typography>
            <KeyboardDatePicker
              autoOk={true}
              disableToolbar
              InputAdornmentProps={{
                classes: { root: classes.dateLabel }
              }}
              variant="inline"
              format="DD/MM/YYYY"
              // margin="normal"
              id="date-picker-inline"
              // label="License Expiry"
              value={afterDate}
              maxDate={new Date("1/1/3000")}
              onChange={handleAfterDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change after date',
              }}
            />
          </div>
          <div className={classes.datePickerInnerBox}>
            <Typography variant={"h5"} className={classes.dateTitle}>
              End
            </Typography>
            <KeyboardDatePicker
              autoOk={true}
              disableToolbar
              InputAdornmentProps={{
                classes: { root: classes.dateLabel }
              }}
              variant="inline"
              format="DD/MM/YYYY"
              // margin="normal"
              id="date-picker-inline"
              // label="License Expiry"
              value={beforeDate}
              maxDate={new Date("1/1/3000")}
              onChange={handleBeforeDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change before date',
              }}
            />
          </div>
        </MuiPickersUtilsProvider>
        <ButtonLoading
          className={classes.searchButton}
          loading={loading}
          loadingIconColor={Colors.cream}
          replaceTextWhenLoading={true}
          onClick={() => {
            setAfterDateGql(afterDate)
            setBeforeDateGql(beforeDate)
          }}
        >
          Search Payouts
        </ButtonLoading>
      </div>

      {

        ((orderIdsGroupedByDay ?? []).length === 0) &&
        !loading &&
        <div className={clsx(
          classes.noApprovedPayoutsBox,
          classes.flexCol,
        )}>
          <Typography variant="h5">
            No completed payouts currently
          </Typography>
        </div>
      }
      {
        (orderIdsGroupedByDay ?? []).map(oGroup => {
          console.log("oGroup2: ", oGroup)
          return (
            <>
              <PayoutsCompleteTable
                admin={props.admin}
                day={oGroup.day}
                orderIds={oGroup.orderIds}
              />
              {
                !loading &&
                <div className={classes.flexRow}>
                  <div className={classes.flexCol}>
                    <PayoutCompleteSummaryTable
                      orderIds={oGroup.orderIds}
                    />
                  </div>
                </div>
              }
            </>
          )
        })
      }


    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  admin: UserPrivate
  // orderIdsGroupedByDay: OrdersGroupedByDay[]
}

interface QData {
  getCompleteOrderIdsGroupedByDay: OrdersGroupedByDay[]
}
interface QVar {
  before: Date
  after: Date
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
  subTitle: {
  },
  datePickerBox: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "1rem",
    marginBottom: "1rem",
    width: '100%',
  },
  datePickerInnerBox: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: "0.25rem",
    marginBottom: "0.25rem",
  },
  dateTitle: {
    marginRight: '1rem',
    fontWeight: 500,
  },
  datePicker: {
  },
  dateLabel: {
    "& button > span > svg": {
      fill: isThemeDark(theme)
        ? Colors.uniswapLightGrey
        : Colors.slateGreyBlack,
      "&:hover": {
        fill: isThemeDark(theme)
          ? Colors.ultramarineBlue
          : Colors.ultramarineBlue,
      }
    }
  },
  searchButton: {
    maxWidth: 250,
    marginTop: "1rem",
    color: Colors.cream,
    backgroundColor: Colors.ultramarineBlue,
    "&:hover": {
      backgroundColor: Colors.ultramarineBlueLight,
    },
  },
});

export default withStyles(styles)( PayoutsCompleteList );



