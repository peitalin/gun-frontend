import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius, Colors } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";


const Row = ({ fieldName, fieldValue, classes }: ReactProps) => (
  <div className={classes.orderTitleRow}>
    <div className={clsx(classes.orderCol, classes.smallCol)}>
      <Typography variant="subtitle2" className={classes.orderHeader}>
        {fieldName}
      </Typography>
    </div>
    <div className={clsx(classes.orderCol, classes.largeCol)}>
      <Typography variant="subtitle2" className={classes.orderHeader}>
        {fieldValue}
      </Typography>
    </div>
  </div>
)

interface ReactProps extends WithStyles<typeof styles> {
  fieldName: String;
  fieldValue: String;
}

const styles = (theme: Theme) => createStyles({
  orderTitleRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    marginBottom: '0.25rem',
    background: fade(Colors.lightPurple, 0.1),
    "&:hover": {
      background: fade(Colors.lightPurple, 0.2),
    },
  },
  orderHeader: {
    textAlign: 'center',
    color: Colors.uniswapLightestGrey,
  },
  orderCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
    padding: '0.5rem',
    color: Colors.purple,
  },
  smallCol: {
    flexBasis: '25%',
    alignItems: 'flex-end',
    borderRadius: `${BorderRadius}px 0px 0px ${BorderRadius}`,
    // border: `1px solid ${fade(Colors.purple, 0.5)}`,
  },
  largeCol: {
    flexBasis: '75%',
    alignItems: 'flex-start',
    paddingRight: '1rem',
    borderRadius: `0px ${BorderRadius}px ${BorderRadius} 0px`,
  },
});

export default withStyles(styles)( Row );

