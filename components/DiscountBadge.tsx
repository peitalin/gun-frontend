import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import Typography from "@material-ui/core/Typography";
import { asCurrency as c } from "utils/prices";


const DiscountBadge: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const { price, priceWas } = props;

  const savingsPercent = Math.round((priceWas - price)/priceWas * 100)

  if (savingsPercent < 1) {
    return (
      <div className={clsx(classes.root, 'hidden')}>
      </div>
    )
  }

  return (
    <div className={clsx(classes.root, classes.discountTag)}>
      <Typography variant={"caption"}>
        {`${savingsPercent}% OFF`}
      </Typography>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  price: number;
  priceWas: number;
}

const styles = (theme: Theme) => createStyles({
  root: {
    position: 'absolute',
    zIndex: 1,
  },
  discountTag: {
    top: '0.5rem',
    left: '0.5rem',
    display: 'flex',
    backgroundColor: 'rgba(15,15,15, 0.75)',
    color: Colors.lightGrey,
    padding: '0.2rem 0.4rem',
    borderRadius: '2px',
  },
});


export default withStyles(styles)(DiscountBadge);