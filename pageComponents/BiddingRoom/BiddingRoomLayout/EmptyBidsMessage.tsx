import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius2x, BorderRadius } from "layout/AppTheme";
import Typography from "@material-ui/core/Typography";




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
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    border: theme.palette.type === 'dark'
      ? `unset`
      : `1px solid ${Colors.slateGreyDarker}`,
    boxShadow: theme.palette.type === 'dark'
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