import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius, isThemeDark } from "layout/AppTheme";
// Typings
import {
  Product, ID, Product_Variants, UserPrivate, ProductPreviewItem,
  SoldOutStatus,
  Bids,
  Role,
} from "typings/gqlTypes";
import { SelectedVariantProps } from "../ProductId";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Components
import ProductHeading from "./ProductHeading";
import ProductPricing from "./ProductPricing";
// UI components
import LoadingBar from "components/LoadingBar";
import Or from "components/Or";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useRouter } from "next/router";
// checkout
import { asCurrency as c } from "utils/prices";
import { soldOutStatusToDisplayMessage } from "./soldOutStatusUtils";

import VisaButtonLoading from "./VisaButtonLoadingSSR";
import dynamic from "next/dynamic";

const VisaPurchaseProduct = dynamic(() => import("./VisaPurchaseProduct"), {
  loading: (props) => <VisaButtonLoading/>,
  ssr: false,
});
// const CoinbasePay = dynamic(() => import("./CoinbasePay"), {
//   loading: (props) => <VisaButtonLoading/>,
//   ssr: false,
// });

import copy from "clipboard-copy";
import { useSnackbar } from "notistack";





const PurchaseProductSummary: React.FC<ReactProps> = (props) => {

  const {
    classes,
    selectedOption,
    // ProductLicense
    variantOptions,
    handleChangeVariantOption,
  } = props;

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  );

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const router = useRouter();

  const featuredVariant = selectedOption?.value;
  const productPrice = props.selectedBid?.offerPrice ||
    featuredVariant?.price

  const showProductInfo = featuredVariant?.variantId && props?.product?.id
  // console.log("featuredVariant", featuredVariant)

  return (
    <div className={clsx(
      classes.purchaseCheckoutSummaryRoot,
    )}>

      {
        user?.userRole === Role.PLATFORM_ADMIN &&
        <div className={classes.copyProductId}
          onClick={() => {
            snackbar.enqueueSnackbar(
              `Copied ${props.product?.id}`,
              { variant: "info" }
            )
            copy(props.product?.id)
          }}
        >
          {props.product?.id}
        </div>
      }

      <div className={clsx(classes.flexRow, classes.width100, classes.paddingBottom)}>

        <div className={classes.flexCol66}>
          {
            showProductInfo
            ? <>
                <ProductHeading product={props.product} featuredVariant={featuredVariant}/>
                <ProductPricing
                  featuredVariant={featuredVariant}
                  selectedBid={props.selectedBid}
                  soldOutStatus={props.product.soldOutStatus}
                  isSuspended={props.product.isSuspended}
                />
              </>
            : <div className={classes.loadingBarContainer}>
                <LoadingBar
                  absoluteTop
                  color={Colors.gradientUniswapBlue1}
                  height={4}
                  width={'100%'}
                  loading={true}
                />
              </div>
          }
        </div>

        <div className={clsx(
          classes.flexCol33,
          mdDown ? classes.center : classes.alignItemsCenter,
        )}>
          <div className={
            smDown ? classes.buttonContainerMobile : classes.buttonContainer
          }>
            {
              (props.product?.soldOutStatus !== SoldOutStatus.AVAILABLE)
              ? <div className={clsx(classes.maxWidth, classes.visaContainer)}>
                  <span className={classes.soldOutStatusMessage}>
                    {soldOutStatusToDisplayMessage(props.product?.soldOutStatus)}
                  </span>
                </div>
              : <div className={clsx(classes.maxWidth, classes.visaContainer)}>
                  <VisaPurchaseProduct
                    // disable on mobile
                    user={user}
                    // className={"fadeIn"}
                    product={props.product}
                    refetchProduct={props.refetchProduct}
                    title={`Buy for ${c(productPrice)} AUD`}
                    showIcon={true}
                    display={true}
                    buttonHeight={xsDown ? '40px' : '40px'}
                    selectedBid={props.selectedBid}
                    handleOrderPostPurchase={
                      (order) => {
                        console.log("routing to /orders")
                        router.push("/orders")
                      }
                    }
                  />
                  {/* <div className={classes.coinbasePayContainer}>
                    <CoinbasePay
                      price={featuredVariant.price}
                    />
                  </div> */}
                </div>
            }

          </div>
        </div>
      </div>
    </div>
  );
}



interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
  selectedOption: SelectedVariantProps;
  refetchProduct?(): void;
  variantOptions: {
    label: string;
    value: Product_Variants;
  }[];
  handleChangeVariantOption(
    selectedOption: { label: string, value: Product_Variants }
  ): void;
  selectedBid?: Bids
}



const styles = (theme: Theme) => createStyles({
  purchaseCheckoutSummaryRoot: {
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem 1rem',
    borderRadius: BorderRadius,
    background: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    border: isThemeDark(theme)
      ? `1px solid ${theme.colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    boxShadow: isThemeDark(theme)
      ? BoxShadows.shadow1.boxShadow
      : BoxShadows.shadow5.boxShadow,
    width: '100%',
    // maxWidth: '600px',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexCol66: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: "55%",
    minWidth: 312,
  },
  flexCol33: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: "30%",
    flexGrow: 1,
    // minWidth: 200, // min width of buttons
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  spacer: {
    marginBottom: '0.5rem',
    width: '100%',
  },
  maxWidth: {
    maxWidth: 340,
    width: '100%',
  },
  width100: {
    width: '100%'
  },
  button: {
    marginBottom: '0.5rem',
    width: '100%',
    minHeight: 40,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // maxWidth: '224px',
    // maxWidth: '282px', // max size before flexWraps
    minWidth: '224px',
    width: '100%',
  },
  buttonContainerMobile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 'unset',
    minWidth: '224px',
    width: '100%',
  },
  downloadButton: {
    backgroundColor: Colors.red,
    color: Colors.cream,
    "&:hover": {
      backgroundColor: fade(Colors.red, 0.9),
    },
  },
  visaContainer: {
    // zIndex: 1, // above paypal button for dropdown menu
  },
  expanderTall: {
    flexGrow: 1,
    height: '5rem',
    // transition: theme.transitions.create('height', {
    //   easing: theme.transitions.easing.easeIn,
    //   duration: "100ms",
    // }),
  },
  expanderShort: {
    flexGrow: 1,
    height: '1rem',
    // transition: theme.transitions.create('height', {
    //   easing: theme.transitions.easing.easeIn,
    //   duration: "100ms",
    // }),
  },
  paddingBottom: {
    paddingBottom: '0.5rem',
  },
  creditCardContainer: {
    margin: "0px",
    height: 38,
    // border: `2px solid ${Colors.charcoal}`,
    border: `1px solid rgba(170, 170, 170, 0.4)`,
    padding: "0.5rem",
    borderRadius: '4px',
  },
  coinbasePayContainer: {
    marginTop: "0.45rem",
  },
  soldOutStatusMessage: {
    color: isThemeDark(theme)
      ? Colors.uniswapMediumGrey
      : Colors.slateGreyDarkest
  },
  loadingBarContainer: {
    minHeight: 380,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyProductId: {
    position: "fixed",
    zIndex: 10,
    bottom: '1rem',
    left: '1rem',
    color: Colors.secondary,
    cursor: "pointer",
  },
});

export default withStyles(styles)( PurchaseProductSummary );


