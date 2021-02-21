import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Router
import Link from "next/link";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
// Typings
import { Product, UserPrivate } from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
// Copy
import copy from "clipboard-copy";
// Snackbar
import { useSnackbar } from "notistack";
import CreateOfferSubscription from "./CreateOfferSubscription";
import ArrowDownwardIcon from '@material-ui/icons/Forward';




const StickyDetailsSeller = (props: ReactProps) => {

  const {
    classes,
    user,
    product,
  } = props;

  const snackbar = useSnackbar();

  const handleCopy = async (text) => {
    await copy(text);
    console.log("Copied!");
  };

  return (
    <div className={clsx(
      classes.storeDetailsProductPageRoot,
      props.below1024 ? classes.relativeMenu : classes.stickyMenu,
    )}>
      <div className={clsx(
        classes.flexRow,
        classes.storeDetailsInnerContainer,
        props.below1024 ? classes.positionRelativeBox : classes.positionStickyBox,
      )}>
        <div className={clsx(classes.flexCol, classes.referInstructions)}>
          <div>
            <Typography className={classes.title} variant="h4">
              {user?.store?.name}
            </Typography>
          </div>
          <div>
            <Typography className={classes.caption} variant="body1">
              {`License: ${user?.license?.licenseNumber}`}
            </Typography>
          </div>
          <div>
            <Typography className={classes.caption} variant="body1">
              {`Category: ${user?.license?.licenseCategory}`}
            </Typography>
          </div>
          <div>
            <Typography className={classes.caption} variant="body1">
              {`State: ${user?.license?.licenseState}`}
            </Typography>
          </div>
        </div>
      </div>
      {/* {
        user?.id &&
        <div className={classes.bidButtonContainer}>
          <CreateOfferSubscription
            userId={user.id}
            product={props?.product}
          />
        </div>
      } */}
      <div className={classes.arrowDownContainer}>
        <ArrowDownwardIcon
          className={classes.arrowIcon}
        />
      </div>
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate
  product: Product
  below1024: boolean
}

const styles = (theme: Theme) => createStyles({
  storeDetailsProductPageRoot: {
    position: 'relative',
    marginTop: '1rem',
  },
  stickyMenu: {
    /// Need to do position: absolute, otherwise gap appears between
    // FeaturedImgage and ProductDetails when ProductPurchaseCard is too tall
    // position: 'absolute',
    // bottom: '-7rem',
    width: 'calc(100%)',
  },
  relativeMenu: {
    position: 'relative',
  },
  storeDetailsInnerContainer: {
    padding: '1rem',
    maxWidth: "600px",
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    border: theme.palette.type === 'dark'
      ? `1px solid ${theme.colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  positionStickyBox: {
    borderRadius: BorderRadius,
    boxShadow: BoxShadows.shadow4.boxShadow,
  },
  positionRelativeBox: {
    borderRadius: BorderRadius,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  referInstructions: {
  },
  title: {
    fontSize: '1rem',
    marginTop: "0.25rem",
    marginBottom: "0.25rem",
  },
  caption: {
    fontSize: '12px',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.darkGrey,
  },
  arrowDownContainer: {
    position: 'absolute',
    bottom: '-2.25rem',
    right: 'calc(50% - 1.5rem)',
  },
  arrowIcon: {
    width: '3rem',
    height: '3rem',
    transform: 'rotate(90deg)',
    fill: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyBlack,
  },
  bidButtonContainer: {
    position: 'absolute',
    bottom: '0.75rem',
    right: '0.75rem',
  },
});

export default withStyles(styles)( StickyDetailsSeller );


