import React from "react";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import { Colors, BorderRadius } from "layout/AppTheme";
import Typography from "@mui/material/Typography";
import { asCurrency as c } from "utils/prices";


const DiscountBadge: React.FC<ReactProps> = (props) => {

  const {
    classes,
    price,
    priceWas,
    mobile = false,
  } = props;

  const savingsPercent = Math.round((priceWas - price)/priceWas * 100)

  // must be over 5% to display discount
  if (savingsPercent < 5) {
    return (
      <div className={clsx(classes.root, 'hidden')}>
      </div>
    )
  }


  const calcNumFire = (savingsPercent) => {
    if (savingsPercent > 30) {
      return "🔥🔥🔥"
    } else if (savingsPercent > 20) {
      return "🔥🔥"
    } else {
      return "🔥"
    }
  }

  let numFire = React.useMemo(() => calcNumFire(savingsPercent), [savingsPercent])

  return (
    <div className={clsx(
      classes.root,
      'fadeIn',
      mobile ? classes.discountTagSm : classes.discountTag
    )}>
      <Typography className={
        mobile ? classes.discountTextSm : classes.discountText
      }>
        {`${numFire} ${savingsPercent}% OFF`}
      </Typography>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  price: number;
  priceWas: number;
  mobile?: boolean;
}

const backgroundColor = 'rgba(235,45,65, 0.75)'
// const backgroundColor = 'rgba(15,15,15, 0.75)'


const styles = (theme: Theme) => createStyles({
  root: {
    position: 'absolute',
    zIndex: 1,
    pointerEvents: "none", // click through badge
  },
  discountTag: {
    top: '0.3rem',
    left: '0.3rem',
    display: 'flex',
    padding: '0.2rem 0.4rem',
    borderRadius: BorderRadius,
    backgroundColor: backgroundColor,
  },
  discountText: {
    fontWeight: 600,
    fontSize: '0.8rem',
    color: Colors.white,
  },
  discountTagSm: {
    top: '0.15rem',
    left: '0.15rem',
    display: 'flex',
    backgroundColor: backgroundColor,
    padding: '0.2rem 0.4rem',
    borderRadius: BorderRadius,
  },
  discountTextSm: {
    fontWeight: 600,
    fontSize: '0.7rem',
    color: Colors.white,
  },
});


export default withStyles(styles)(DiscountBadge);