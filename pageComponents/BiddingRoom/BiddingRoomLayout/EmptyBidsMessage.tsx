import React from 'react';
// Styles
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BoxShadows, BorderRadius2x, BorderRadius } from "layout/AppTheme";
import Typography from "@mui/material/Typography";




export const EmptyBidsMessage: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <div className={classes.emptyBidsRoot}>
      <div className={classes.flexCol}>
        <Typography variant="h4" className={classes.subtitle}>
          No bids on products yet
        </Typography>
        <Typography variant="body1" className={classes.body1}>
          You will see offers on your products and be able to counter bid
          once people have placed bids on your product listings
        </Typography>
      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}


const styles = (theme: Theme) => createStyles({
  emptyBidsRoot: {
    display: "flex",
    flexDirection: "row",
    flexBasis: '100%',
    flexGrow: 1,
    flexWrap: "wrap",
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    padding: '2rem',
    minHeight: 300,
    backgroundColor: theme.palette.mode === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    border: theme.palette.mode === 'dark'
      ? `unset`
      : `1px solid ${Colors.slateGreyDarker}`,
    boxShadow: theme.palette.mode === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : 'unset',
    marginBottom: '1rem',
    borderRadius: BorderRadius,
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 440,
  },
  subtitle: {
    marginBottom: '1rem',
  },
  body1: {
    marginBottom: '1rem',
    textAlign: 'center',
  },
})


export default withStyles(styles)( EmptyBidsMessage );