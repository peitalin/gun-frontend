import React from 'react';
import clsx from 'clsx';
import { Colors, BoxShadows } from 'layout/AppTheme';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { formatDate } from "utils/dates";
// graphql




const EscrowHistoryTable = (props: ReactProps) => {

  const {
    classes,
    escrowHistory = [],
  } = props;

  return (
    <div className={classes.escrowHistoryTableRoot} >
      <div>
        <div className={classes.headerRow}>
          <div className={classes.headerCell1}>Date</div>
          <div className={classes.headerCell2}>Actioned By</div>
          <div className={classes.headerCell3}>Order Status</div>
        </div>
      </div>
      <div className={classes.scrollableTable}>
        {
          escrowHistory.map((historyRow, i) =>  {

            return (
              <div key={i} className={clsx(
                classes.bodyRow,
                (i % 2 === 0)
                  ? classes.backEven
                  : classes.backOdd,
              )}>
                <div className={classes.bodyCell1}>
                  {formatDate(historyRow.date)}
                </div>
                <div className={classes.bodyCell2}>
                  {historyRow.approverEmail}
                </div>
                <div className={classes.bodyCell3}>
                  {
                    historyRow.orderStatus
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export interface EscrowHistory {
  date: Date
  approverId: string
  approverEmail: string
  orderStatus: string
}


interface ReactProps extends WithStyles<typeof styles> {
  // escrowHistory: ReturnType<typeof createDataForArrivingOrdersTable>
  escrowHistory: EscrowHistory[]
}


const styles = (theme: Theme) => createStyles({
  escrowHistoryTableRoot: {
    borderBottom: theme.palette.type === 'dark'
      ? `4px solid ${Colors.uniswapLightNavy}`
      : `4px solid ${Colors.slateGreyDarkest}`,
  },
  scrollableTable: {
    overflow: "scroll",
    maxHeight: 300,
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colors.uniswapMediumGrey,
    color: Colors.cream,
    boxShadow: BoxShadows.shadow1.boxShadow,
  },
  headerCell1: {
    flexBasis: '25%',
    flexGrow: 1,
    padding: '0.25rem 0.5rem',
    fontWeight: 600,
    fontSize: '14px',
  },
  headerCell2: {
    flexBasis: '30%',
    flexGrow: 1,
    padding: '0.25rem 0.5rem',
    fontWeight: 600,
    fontSize: '14px',
  },
  headerCell3: {
    flexBasis: '45%',
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: '0.25rem 0.5rem',
    fontWeight: 600,
    fontSize: '14px',
  },
  bodyRow: {
    display: "flex",
    flexDirection: "row",
  },
  bodyCell1: {
    flexBasis: '25%',
    flexGrow: 1,
    padding: '0.25rem 0.5rem 0.25rem 0.5rem',
    fontSize: '0.825rem',
  },
  bodyCell2: {
    flexBasis: '30%',
    flexGrow: 1,
    padding: '0.25rem 0.5rem 0.25rem 0.5rem',
    fontSize: '0.825rem',
  },
  bodyCell3: {
    flexBasis: '45%',
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: '0.25rem 0.5rem 0.25rem 0.5rem',
    fontSize: '0.825rem',
  },
  backOdd: {
    backgroundColor: Colors.slateGreyDark,
    color: theme.palette.type === 'dark'
      ? Colors.charcoal
      : Colors.charcoal,
    "&:hover": {
      backgroundColor: Colors.slateGreyDarker,
      color: Colors.black,
    },
  },
  backEven: {
    backgroundColor: Colors.slateGrey,
    color: theme.palette.type === 'dark'
      ? Colors.charcoal
      : Colors.charcoal,
    "&:hover": {
      backgroundColor: Colors.slateGreyDarker,
      color: Colors.black,
    },
  },
});



export default withStyles(styles)( EscrowHistoryTable );