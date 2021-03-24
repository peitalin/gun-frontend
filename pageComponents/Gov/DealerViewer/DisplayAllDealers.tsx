import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Typings
import {
  Dealer,
  UserPrivate,
} from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";



const DisplayAllDealers = (props: ReactProps) => {
  const { classes, allDealers, setDealerIdOrLicenseNumber } = props;
  return (
    <div className={classes.allDealersRoot}>
      <div className={classes.allDealersInner}>
        <Typography className={classes.heading} variant="subtitle2">
          List of Dealers:
        </Typography>
        {
          allDealers
          .map(dealer => {
            return (
              <div key={dealer.id}
                className={classes.allDealersId}
                onClick={() => setDealerIdOrLicenseNumber(dealer.id)}
              >
                {`${dealer.id} #${dealer.licenseNumber}`}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  allDealers: Dealer[];
  setDealerIdOrLicenseNumber(idOrLicenseNumber: string): void;
}


const styles = (theme: Theme) => createStyles({
  allDealersRoot: {
    marginTop: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'start',
  },
  allDealersInner: {
    maxWidth: 400,
  },
  allDealersId: {
    fontFamily: "courier",
    fontWeight: 600,
    cursor: 'pointer',
    color: theme.colors.uniswapLighterGrey,
    "&:hover": {
      color: theme.colors.blue,
    },
    margin: '0.1rem',
  },
  heading: {
    marginBottom: '0.25rem',
  },
});


export default withStyles(styles)( DisplayAllDealers );



