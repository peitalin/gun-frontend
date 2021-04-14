import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Typings
import {
  ID,
  Product,
} from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";



const DisplayRecentProductIds = (props: DisplayRecentProductIdProps) => {

  const {
    classes,
    recentProducts,
    setProductId
  } = props;

  return (
    <div className={classes.recentProducts}>
      <div className={classes.recentProductsInner}>
        <Typography className={classes.heading} variant="subtitle2">
          Recent Products:
        </Typography>
        {
          recentProducts
          .map(user => {
            return (
              <div key={user.id}
                className={classes.recentProductsId}
                onClick={() => setProductId(user.id)}
              >
                {user.id}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

interface DisplayRecentProductIdProps extends WithStyles<typeof styles> {
  recentProducts: Product[];
  setProductId(id: ID): void;
}


const styles = (theme: Theme) => createStyles({
  recentProducts: {
    marginTop: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'start',
  },
  recentProductsInner: {
    maxWidth: 400,
  },
  recentProductsId: {
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


export default withStyles(styles)( DisplayRecentProductIds );



