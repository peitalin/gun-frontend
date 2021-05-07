import React from "react";
import clsx from "clsx";
import { Colors, BoxShadows, BorderRadius, isThemeDark } from "layout/AppTheme";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { commonBorderStyle } from "../common";
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
      process.browser && classes.borderBrowser,
      props.below1024 ? classes.normalMenu : classes.stickyMenu,
    )}>
      <div className={clsx(
        classes.flexRow,
        classes.dealerDetailsInnerContainer,
        props.below1024 ? classes.positionRelativeBox : classes.positionStickyBox,
      )}>

        <div className={classes.flexRow}>
          <div className={clsx(classes.flexCol)}>
            <Typography className={classes.title} variant="h4">
              Transferring Dealer
            </Typography>
            {/* <div>
              <Typography className={classes.subtitle} variant="body1">
                {`${dealer?.name ?? ""}`}
              </Typography>
            </div> */}
          </div>
        </div>

        <div className={classes.flexRow}>
          <div className={clsx(classes.flexCol, classes.fieldKeysCol)}>
            <Typography className={classes.caption} variant="body1">
              Name:
            </Typography>
            <Typography className={classes.caption} variant="body1">
              License Number:
            </Typography>
            <Typography className={classes.caption} variant="body1">
              State:
            </Typography>
            <Typography className={classes.caption} variant="body1">
              Address:
            </Typography>
          </div>

          <div className={clsx(classes.flexCol)}>
            <Typography className={classes.caption} variant="body1">
              {`${dealer?.name ?? ""}`}
            </Typography>
            <Typography className={classes.caption} variant="body1">
              {`${dealer?.licenseNumber ?? ""}`}
            </Typography>
            <Typography className={classes.caption} variant="body1">
              {`${dealer?.state ?? ""}`}
            </Typography>
            <Typography className={classes.caption} variant="body1">
              {`${dealer?.address ?? ""}`}
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
    borderRadius: BorderRadius,
    width: '100%',
  },
  normalMenu: {
    display: "flex",
    justifyContent: "center",
    width: '100%',
    marginBottom: "1rem",
    borderRadius: BorderRadius,
    // borderRadius: "0px",
  },
  dealerDetailsInnerContainer: {
    padding: '1rem',
    // maxWidth: "600px",
    background: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
  },
  borderBrowser: commonBorderStyle(theme),
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
  fieldKeysCol: {
    minWidth: 115,
  },
  title: {
    fontSize: '1rem',
    marginTop: "0.5rem",
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
  },
  subtitle: {
    fontSize: '0.9rem',
    fontWeight: 500,
    marginBottom: "0.5rem",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.black,
  },
  caption: {
    fontSize: '0.875rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.darkGrey,
  },
});

export default withStyles(styles)( StickyDetailsDealer );


