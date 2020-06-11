import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import {
  Product, ID, ProductVariant, UserPrivate, ProductPreviewItem
} from "typings/gqlTypes";
import { SelectedVariantProps } from "../ProductId";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// useApolloClient
import { useApolloClient } from "@apollo/react-hooks";
// Components
import ProductHeading from "./ProductHeading";
import ProductPricing from "./ProductPricing";
import ProductLicenses from "./ProductLicenses";
// UI components
import ButtonLoading from "components/ButtonLoading";
import Loading from "components/Loading";
import LoadingBar from "components/LoadingBar";
import Or from "components/Or";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useRouter } from "next/router";
// checkout
import { Stripe } from "@stripe/stripe-js";
import { asCurrency as c } from "utils/prices";
import dynamic from "next/dynamic";
const PaypalPurchaseProduct = dynamic(() => import("./PaypalPurchaseProduct"), {
  loading: () => {
    return (
      <ButtonLoading
        replaceTextWhenLoading={true}
        loading={true}
        disabled={true}
        loadingIconColor={Colors.lightestGrey}
        style={{
          width: "100%",
          height: "40px",
          fontWeight: 500,
          marginBottom: '0.35rem', // paypal button annoying extra space
          backgroundColor: Colors.lightYellow
        }}
      />
    )
  },
  ssr: false,
});
import AppleGooglePayPurchaseProduct from "./AppleGooglePayPurchaseProduct";
const VisaPurchaseProduct = dynamic(() => import("./VisaPurchaseProduct"), {
  loading: (props) => {
    return (
      <div style={{ marginTop: '0.25rem' }}>
        <ButtonLoading
          replaceTextWhenLoading={true}
          loading={true}
          disabled={true}
          loadingIconColor={Colors.lightestGrey}
          style={{
            width: "100%",
            height: "38px",
            fontWeight: 500,
            backgroundColor: Colors.foregroundColor,
            border: `1px solid ${Colors.lightGrey}`,
          }}
        />
        <div style={{ height: '0.5rem' }}></div>
        <ButtonLoading
          replaceTextWhenLoading={true}
          loading={true}
          disabled={true}
          loadingIconColor={Colors.lightestGrey}
          style={{
            width: "100%",
            height: "38px",
            fontWeight: 500,
            backgroundColor: Colors.foregroundColor,
            border: `1px solid ${Colors.lightGrey}`,
          }}
        />
        <div style={{ height: '0.5rem' }}></div>
        <ButtonLoading
          replaceTextWhenLoading={true}
          loading={true}
          disabled={true}
          loadingIconColor={Colors.lightestGrey}
          style={{
            width: "100%",
            height: "40px",
            fontWeight: 500,
            backgroundColor: Colors.secondaryBright
          }}
        />
      </div>
    )
  },
  ssr: false,
});
// import { handleOrderPostPurchase } from "layout/Checkout/CheckoutPage/CommonPurchase";







const PurchaseProductSummary: React.FC<ReactProps> = (props) => {

  const {
    classes,
    quantity = 1,
    selectedOption,
    // ProductLicense
    increaseQuantity,
    decreaseQuantity,
    variantOptions,
    handleChangeVariantOption,
  } = props;

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  );
  const loggedInAsEmail = option(user).email();

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();
  const aClient = useApolloClient();
  const router = useRouter();

  const chosenVariant = selectedOption.value;

  const showVisaPay =
    option(chosenVariant).variantId() &&
    !option(chosenVariant).isSoldOut() &&
    option(props).product.id() &&
    !xsDown

  const showApplePay =
    option(chosenVariant).variantId() &&
    option(props).product.id() &&
    xsDown  // only enable ApplePay on mobile sizes

  const showPaypal =
    option(chosenVariant).variantId() &&
    option(props).product.id()

  const showLicenses = true

  return (
    <div className={classes.purchaseCheckoutSummaryRoot}>
      <div className={clsx(classes.flexRow, classes.width100, classes.paddingBottom)}>

        <div className={classes.flexCol66}>
          {
            (option(chosenVariant).variantId() && option(props).product.id())
            ? <>
                <ProductHeading product={props.product} chosenVariant={chosenVariant}/>
                <ProductLicenses
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  quantity={quantity}
                  isQuantityEnabled={false} // Seats
                  selectedOption={selectedOption}
                  variantOptions={variantOptions}
                  handleChangeVariantOption={handleChangeVariantOption}
                />
                <ProductPricing chosenVariant={chosenVariant}/>
              </>
            : <div style={{
                minHeight: 380,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <LoadingBar
                  absoluteTop
                  color={Colors.magenta}
                  height={4}
                  width={'100%'}
                  loading={true}
                />
              </div>
          }
        </div>

        <div className={
          showLicenses
            ? classes.expanderShort
            : classes.expanderTall
        }/>

        <div className={clsx(
          classes.flexCol33,
          mdDown ? classes.center : classes.alignItemsCenter,
        )}>
          <div className={
            smDown
            ? classes.buttonContainerMobile
            : classes.buttonContainer
          }>

            <div className={classes.maxWidth}>
              {
                showApplePay &&
                <AppleGooglePayPurchaseProduct
                  buttonId={'product-page-apple-pay-1'}
                  disableButton={false}
                  stripe={props.stripe}
                  user={user}
                  // className={"fadeIn"}
                  productsInfo={[{
                    productId: props.product.id,
                    variantId: chosenVariant.variantId,
                    quantity: quantity,
                  }]}
                  quotedPrice={chosenVariant.price}
                  display={true}
                  buttonHeight={xsDown ? '40px' : '40px'}
                  handleOrderPostPurchase={
                    () => {}
                    // handleOrderPostPurchase(
                    //   aClient,
                    //   dispatch,
                    //   router,
                    //   !!loggedInAsEmail,
                    // )
                  }
                />
              }
            </div>
            <div className={classes.maxWidth}>
              {
                showPaypal &&
                <PaypalPurchaseProduct
                  disableButton={false}
                  // className={"fadeInFast"}
                  productsInfo={[{
                    productId: props.product.id,
                    variantId: chosenVariant.variantId,
                    quantity: quantity,
                  }]}
                  quotedPrice={chosenVariant.price}
                  user={user}
                  display={true}
                  handleOrderPostPurchase={
                    () => {}
                    // handleOrderPostPurchase(
                    //   aClient,
                    //   dispatch,
                    //   router,
                    //   !!loggedInAsEmail,
                    // )
                  }
                />
              }
            </div>


            <div className={clsx(
              classes.maxWidth,
              classes.visaContainer,
            )}>
              {
                showVisaPay &&
                <Or/>
              }
              {
                showVisaPay &&
                <VisaPurchaseProduct
                  // disable on mobile
                  user={user}
                  // className={"fadeIn"}
                  productsInfo={[{
                    productId: option(props).product.id(),
                    variantId: chosenVariant.variantId,
                    quantity: quantity,
                  }]}
                  quotedPrice={chosenVariant.price}
                  title={`Reserve for ${c(chosenVariant.price)} USD`}
                  showIcon={true}
                  display={true}
                  buttonHeight={xsDown ? '40px' : '40px'}
                  handleOrderPostPurchase={
                    () => {}
                    // handleOrderPostPurchase(
                    //   aClient,
                    //   dispatch,
                    //   router,
                    //   !!loggedInAsEmail,
                    // )
                  }
                />
              }
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}



interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
  selectedOption: SelectedVariantProps;
  stripe: Stripe;
  quantity?: number;
  // ProductLicense
  increaseQuantity(): void;
  decreaseQuantity(): void;
  isQuantityEnabled?: boolean;
  // selectedOption: {
  //   label: string;
  //   value: ProductVariant;
  // };
  variantOptions: {
    label: string;
    value: ProductVariant;
  }[];
  handleChangeVariantOption(
    selectedOption: { label: string, value: ProductVariant }
  ): void;
}

const buttonBackgroundColor = '#f6f6f6';


const styles = (theme: Theme) => createStyles({
  purchaseCheckoutSummaryRoot: {
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem 1rem',
    boxShadow: "0px 2px 10px 4px rgba(0,0,0,0.1)",
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
    paddingBottom: '1rem',
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
    zIndex: 1, // above paypal button for dropdown menu
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
});

export default withStyles(styles)( PurchaseProductSummary );


