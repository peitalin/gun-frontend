import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import Typography from "@material-ui/core/Typography";
// import { PriceDetails } from "typings/gqlTypes";
type PriceDetails = any;
import { asCurrency as c } from "utils/prices";


const DiscountBadge: React.FC<ReactProps> = (props) => {

  const { classes, priceDetails } = props;
  const { actualPrice, basePrice } = priceDetails;

  const savingsPercent = Math.round((basePrice - actualPrice)/basePrice * 100)


  return (
    <div className={clsx(classes.root, classes.discountTag)}>
      <Typography variant={"caption"}>
        {`${savingsPercent}% OFF`}
      </Typography>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  priceDetails: PriceDetails;
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