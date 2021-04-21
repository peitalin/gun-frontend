import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, isThemeDark } from "layout/AppTheme";
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
              <div key={dealer.id} className={classes.allDealersRow}>
                <div className={classes.allDealersName}
                  onClick={() => setDealerIdOrLicenseNumber(dealer.id)}
                >
                  {`${dealer.name}`}
                </div>
                <div key={dealer.id}
                  className={classes.allDealersId}
                  onClick={() => setDealerIdOrLicenseNumber(dealer.id)}
                >
                  {`${dealer.id} - #${dealer.licenseNumber}`}
                </div>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'start',
    maxHeight: 400,
    overflow: "scroll",
    paddingTop: '1rem',
    paddingBottom: '1rem',
    background: isThemeDark(theme)
      ? Colors.uniswapNavy
      : Colors.slateGrey,
    borderRadius: BorderRadius,
  },
  allDealersInner: {
    maxWidth: 400,
  },
  allDealersRow: {
    color: theme.colors.uniswapLighterGrey,
    "&:hover": {
      color: theme.colors.blue,
    },
    margin: '0.5rem',
  },
  allDealersName: {
    fontWeight: 600,
    lineHeight: '1rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  allDealersId: {
    fontSize: '0.9rem',
    lineHeight: '1rem',
    letterSpacing: '-1px',
    fontFamily: "courier",
    fontWeight: 600,
    cursor: 'pointer',
  },
  heading: {
    fontWeight: 600,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    marginTop: '0.25rem',
    marginBottom: '0.25rem',
  },
});


export default withStyles(styles)( DisplayAllDealers );



