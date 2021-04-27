import React from "react";
import clsx from "clsx";
import { Colors, BoxShadows, BorderRadius, Gradients, isThemeDark } from "layout/AppTheme";
// Router
import Link from "next/link";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
// Typings
import { Product, UserPublic } from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
// Copy
import copy from "clipboard-copy";
// Snackbar
import { useSnackbar } from "notistack";
import ArrowDownwardIcon from '@material-ui/icons/Forward';
import Tick from "components/Icons/Tick"
import { showDate } from "utils/dates";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { useSelector } from "react-redux";




const StickyDetailsSeller = (props: ReactProps) => {

  const {
    classes,
    storeName,
    product,
    buyerId,
    seller,
  } = props;

  const snackbar = useSnackbar();

  const isDarkMode = useSelector<GrandReduxState, boolean>(s => {
    return s.reduxLogin.darkMode === 'dark'
  })

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
        classes.storeDetailsInnerContainer,
        props.below1024 ? classes.positionRelativeBox : classes.positionStickyBox,
      )}>

        <div className={classes.flexRow}>
          <Typography className={classes.title} variant="h4">
            Seller
            {/* {storeName} */}
          </Typography>
        </div>

        <div className={classes.flexRow}>

          <div className={clsx(classes.flexCol, classes.fieldKeysCol)}>
            <Typography className={classes.caption} variant="body1">
              License Number:
            </Typography>
            <Typography className={classes.caption} variant="body1">
              State:
            </Typography>
            {/* <Typography className={classes.caption} variant="body1">
              Expiry:
            </Typography> */}
          </div>

          <div className={clsx(classes.flexCol)}>
            <Typography className={classes.caption} variant="body1">
              {`${seller?.license?.licenseNumber ?? "-"}`}
            </Typography>
            <Typography className={classes.caption} variant="body1">
              {`${seller?.license?.licenseState ?? "-"}`}
            </Typography>
            {/* {
              seller?.license?.licenseExpiry &&
              <Typography className={classes.caption} variant="body1">
                {`${showDate(seller?.license?.licenseExpiry) ?? ""}`}
              </Typography>
            } */}
            {
              // seller?.license?.verified &&
              true &&
              <div className={classes.verifiedBadge}>
                Verified License
                <Tick className={classes.tick}
                  size={30}
                  color={isDarkMode ? Colors.purple : Colors.blue}
                  outerCircleColor={isDarkMode ? Colors.purple : Colors.blue}
                  innerCircleColor={isDarkMode ? Colors.uniswapNavy : Colors.slateGrey}
                />
              </div>
            }
          </div>

        </div>
      </div>
      <div className={classes.arrowDownContainer}>
        <ArrowDownwardIcon
          className={classes.arrowIcon}
        />
      </div>
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  seller: UserPublic
  buyerId: string
  product: Product
  storeName: string
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
    width: '100%',
  },
  relativeMenu: {
    position: 'relative',
    display: "flex",
    justifyContent: "center",
    width: '100%',
    borderRadius: "0px",
  },
  storeDetailsInnerContainer: {
    padding: '1rem',
    minHeight: '130px',
    width: '100%',
    // maxWidth: "600px",
    background: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    border: isThemeDark(theme)
      ? `1px solid ${theme.colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    boxShadow: isThemeDark(theme)
      ? BoxShadows.shadow1.boxShadow
      : BoxShadows.shadow5.boxShadow,
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
    alignItems: 'flex-start',
    width: '100%',
  },
  fieldKeysCol: {
    minWidth: 115,
  },
  title: {
    fontSize: '1rem',
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
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
  captionSmall: {
    fontSize: '0.8rem',
    paddingLeft: '1rem',
    color: isThemeDark(theme)
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
    fill: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyBlack,
  },
  bidButtonContainer: {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
  },
  verifiedBadge: {
    position: 'absolute',
    top: ".75rem",
    right: "0.75rem",
    borderRadius: '4px',
    fontSize: '0.875rem',
    background: isThemeDark(theme)
      ? Gradients.gradientUniswapDark.background
      : Gradients.gradientGrey2.background,
    color: isThemeDark(theme)
      ? Colors.purple
      : Colors.blue,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.purple}`
      : `1px solid ${Colors.blue}`,
    padding: '0.3rem 0.6rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },
  tick: {
    marginLeft: '0.25rem',
    height: '20px',
    width: '20px',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withStyles(styles)( StickyDetailsSeller );


