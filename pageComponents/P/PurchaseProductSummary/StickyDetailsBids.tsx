import React from "react";
import clsx from "clsx";
import { Colors, BoxShadows, BorderRadius, Gradients, isThemeDark } from "layout/AppTheme";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { commonBorderStyle } from "../common";
import { useTheme } from "@material-ui/core";
// Typings
import { Product, UserPublic, Bids, BidStatus } from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import ButtonLoading from "components/ButtonLoading";
// Snackbar
import { useSnackbar } from "notistack";
// router
import { useRouter } from "next/router"

import Tick from "components/Icons/Tick"
import { formatDateTime } from "utils/dates";
import { asCurrency as c } from "utils/prices";





const StickyDetailsBid = (props: ReactProps) => {

  const {
    classes,
    userBid,
  } = props;

  const router = useRouter()
  const snackbar = useSnackbar()
  const theme = useTheme()
  const isDarkMode = isThemeDark(theme)


  console.log("bid: ", userBid)
  let offerPrice = c(userBid?.offerPrice)

  let disabledButton = userBid?.bidStatus !== BidStatus.ACCEPTED
  let thisBidIsSelected = props.userBid?.id === props.selectedBid?.id


  React.useEffect(() => {
    if (router.query?.bidId) {
      // console.log("bidId: ", router.query.bidId)
      // console.log("bid: ", userBid)
      if (router.query?.bidId === userBid?.id) {
        props.setSelectedBid(userBid)
        snackbar.enqueueSnackbar(
          `Seller accepts your bid of ${offerPrice}`,
          { variant: "success" }
        )
      }
    }
  }, [userBid])

  return (
    <div className={clsx(
      classes.bidDetailsProductPageRoot,
      props.below1024 ? classes.relativeMenu : classes.stickyMenu,
      process.browser && classes.borderBrowser,
    )}>
      <div className={clsx(
        classes.bidDetailsInnerContainer,
        props.below1024 ? classes.positionRelativeBox : classes.positionStickyBox,
      )}>

        <div className={classes.flexRow}>
          <Typography className={classes.title} variant="h4">
            {`Bid ${c(userBid?.offerPrice)} AUD`}
          </Typography>
        </div>

        <div className={classes.flexRow}>

          <div className={clsx(classes.flexCol, classes.fieldKeysCol)}>
            <Typography className={classes.caption} variant="body1">
              ID:
            </Typography>
            <Typography className={classes.caption} variant="body1">
              Date:
            </Typography>
          </div>

          <div className={clsx(classes.flexCol)}>
            <Typography className={classes.caption} variant="body1">
              {userBid?.id}
            </Typography>
            <Typography className={classes.caption} variant="body1">
              {formatDateTime(userBid?.createdAt)}
            </Typography>
            {
              (userBid?.bidStatus === BidStatus.ACCEPTED) &&
              <div className={clsx(classes.bidStatus, classes.bidGreen)}>
                Accepted
                <Tick className={classes.tick}
                  size={30}
                  color={isDarkMode ? Colors.green : Colors.blue}
                  outerCircleColor={isDarkMode ? Colors.green : Colors.blue}
                  innerCircleColor={isDarkMode ? Colors.uniswapNavy : Colors.slateGrey}
                />
              </div>
            }
            {
              userBid?.bidStatus === BidStatus.ACTIVE &&
              <div className={clsx(classes.bidStatus, classes.bidGrey)}>
                Pending Acceptance
              </div>
            }
            {
              (
                userBid?.bidStatus !== BidStatus.ACTIVE &&
                userBid?.bidStatus !== BidStatus.ACCEPTED
              ) &&
              <div className={clsx(classes.bidStatus, classes.bidRed)}>
                {userBid?.bidStatus}
              </div>
            }
          </div>

          <div className={clsx(
            classes.bidButtonContainer,
          )}>
            <ButtonLoading
              onClick={() => {
                if (thisBidIsSelected) {
                  props.setSelectedBid(undefined)
                } else {
                  props.setSelectedBid(userBid)
                }
              }}
              loadingIconColor={Colors.cream}
              replaceTextWhenLoading={true}
              // loading={loading}
              disabled={disabledButton}
              variant="outlined"
              color="secondary"
              className={
                thisBidIsSelected
                ? classes.cancelButton
                : classes.buyButton
              }
              style={{
                height: "38px",
              }}
            >
              <span style={{ marginLeft: '0.25rem' }}>
                {
                  thisBidIsSelected
                  ? "Cancel"
                  : "Select Bid"
                }
              </span>
            </ButtonLoading>
          </div>

        </div>
      </div>
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  userBid: Bids
  selectedBid: Bids
  setSelectedBid?(b?: Bids): void
  below1024: boolean
}

const styles = (theme: Theme) => createStyles({
  bidDetailsProductPageRoot: {
    position: 'relative',
    marginTop: '1rem',
  },
  stickyMenu: {
    /// Need to do position: absolute, otherwise gap appears between
    // FeaturedImgage and ProductDetails when ProductPurchaseCard is too tall
    // position: 'absolute',
    // bottom: '-7rem',
    width: '100%',
    borderRadius: BorderRadius,
  },
  relativeMenu: {
    position: 'relative',
    display: "flex",
    justifyContent: "center",
    width: '100%',
    borderRadius: BorderRadius,
    // borderRadius: "0px",
  },
  bidDetailsInnerContainer: {
    padding: '1rem',
    width: '100%',
    // maxWidth: "600px",
    background: theme.palette.type === 'dark'
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
    alignItems: 'flex-start',
    width: '100%',
  },
  fieldKeysCol: {
    minWidth: 50,
  },
  title: {
    fontSize: '1rem',
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
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
  captionSmall: {
    fontSize: '0.8rem',
    paddingLeft: '1rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightGrey
      : Colors.slateGreyDarkest,
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
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bidStatus: {
    position: 'absolute',
    top: ".75rem",
    right: "0.75rem",
    borderRadius: '4px',
    fontSize: '0.875rem',
    background: theme.palette.type === 'dark'
      ? Gradients.gradientUniswapDark.background
      : Gradients.gradientGrey2.background,
    padding: '0.3rem 0.6rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },
  bidGreen: {
    color: theme.palette.type === 'dark'
      ? Colors.green
      : Colors.blue,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.green}`
      : `1px solid ${Colors.blue}`,
  },
  bidGrey: {
    color: theme.palette.type === 'dark'
      ? Colors.uniswapMediumGrey
      : Colors.slateGreyDarker,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapMediumGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  bidRed: {
    color: theme.palette.type === 'dark'
      ? Colors.red
      : Colors.red,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.red}`
      : `1px solid ${Colors.red}`,
  },
  tick: {
    marginLeft: '0.25rem',
    height: '20px',
    width: '20px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButton: {
    marginTop: "0.5rem",
    backgroundColor: Colors.green,
    color: Colors.cream,
    border: `1px solid ${Colors.green}`,
    "&:hover": {
      backgroundColor: fade(Colors.green, 0.9),
      border: `1px solid ${fade(Colors.green, 0.9)}`,
    },
    width: "100%",
    maxWidth: 340,
    borderRadius: BorderRadius,
  },
  cancelButton: {
    marginTop: "0.5rem",
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    "&:hover": {
      backgroundColor: isThemeDark(theme)
        ? Colors.uniswapNavy
        : Colors.slateGreyDark,
      border: isThemeDark(theme)
        ? `1px solid ${Colors.uniswapGrey}`
        : `1px solid ${Colors.slateGreyDarker}`,
    },
    width: "100%",
    maxWidth: 340,
    borderRadius: BorderRadius,
  },
});

export default withStyles(styles)( StickyDetailsBid );


