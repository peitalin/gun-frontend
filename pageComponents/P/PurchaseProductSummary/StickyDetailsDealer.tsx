import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
// Typings
import { Dealers } from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
// Copy
import copy from "clipboard-copy";
// Snackbar
import { useSnackbar } from "notistack";




const StickyDetailsDealer = (props: ReactProps) => {

  const {
    classes,
    dealer
  } = props;

  const snackbar = useSnackbar();

  const handleCopy = async (text) => {
    await copy(text);
    console.log("Copied!");
  };

  return (
    <div className={clsx(
      classes.dealerDetailsProductPageRoot,
      props.below1024 ? classes.normalMenu : classes.stickyMenu,
    )}>
      <div className={clsx(
        classes.flexRow,
        classes.dealerDetailsInnerContainer,
        props.below1024 ? classes.positionRelativeBox : classes.positionStickyBox,
      )}>
        <div className={clsx(classes.flexCol, classes.referInstructions)}>
          <div>
            <Typography className={classes.title} variant="h4">
              Transferring Dealer
            </Typography>
          </div>
          <div>
            <Typography className={classes.subtitle} variant="body1">
              {`${dealer?.name ?? ""}`}
            </Typography>
          </div>
          <div>
            <Typography className={classes.caption} variant="body1">
              {`License Number: ${dealer?.licenseNumber ?? ""}`}
            </Typography>
          </div>
          <div>
            <Typography className={classes.caption} variant="body1">
              {`State: ${dealer?.state ?? ""}`}
            </Typography>
          </div>
          <div>
            <Typography className={classes.caption} variant="body1">
              {`Postcode: ${dealer?.postCode ?? ""}`}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  dealer: Dealers
  below1024: boolean
}

const styles = (theme: Theme) => createStyles({
  dealerDetailsProductPageRoot: {
    marginTop: '1rem',
  },
  stickyMenu: {
    /// Need to do position: absolute, otherwise gap appears between
    // FeaturedImgage and ProductDetails when ProductPurchaseCard is too tall
    // position: 'absolute',
    // bottom: '-7rem',
    width: '100%',
  },
  normalMenu: {
    display: "flex",
    justifyContent: "center",
    width: '100%',
    marginBottom: "1rem",
    borderRadius: "0px",
  },
  dealerDetailsInnerContainer: {
    padding: '1rem',
    // maxWidth: "600px",
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    border: theme.palette.type === 'dark'
      ? `1px solid ${theme.colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    boxShadow: BoxShadows.shadow4.boxShadow,
  },
  positionStickyBox: {
    borderRadius: BorderRadius,
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
    width: '100%',
  },
  referInstructions: {
  },
  title: {
    fontSize: '1rem',
    marginTop: "0.5rem",
  },
  subtitle: {
    fontSize: '0.9rem',
    fontWeight: 500,
    marginBottom: "0.5rem",
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black,
  },
  caption: {
    fontSize: '0.875rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.darkGrey,
  },
});

export default withStyles(styles)( StickyDetailsDealer );


