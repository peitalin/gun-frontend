import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import {
  Product, ID, ProductVariant, UserPrivate, ProductPreviewItem, PriceDetails
} from "typings/gqlTypes";
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
import SellerProfile from "./SellerProfile";
import AddCartItemButton from "components/AddCartItemButton";
import ProductLicenses from "./ProductLicenses";
import { basePriceDetailsFactory } from "reduxStore/pricing/priceCalculator";
// UI components
import Button from "@material-ui/core/Button";
import Divider from "components/Divider";
import Or from "components/Or";
import Loading from "components/Loading";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useRouter } from "next/router";
// checkout
import { StripeClient } from "layout/Checkout/typings.stripe";
import { asCurrency as c } from "utils/prices";
import dynamic from "next/dynamic";
const PaypalCheckout = dynamic(() => import("./PaypalCheckoutPP"), {
  loading: () => <Loading inline />,
  ssr: false,
});
import AppleGooglePay from "./AppleGooglePayPP";
import VisaCheckout from "./VisaCheckoutPP";
import { handleOrderPostPurchase } from "layout/Checkout/CheckoutPage/CommonPurchase";



const PurchaseSummary: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  );
  const loggedInAsEmail = option(user).email();

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useDispatch();
  const aClient = useApolloClient();
  const router = useRouter();

  const [selectedOption, setSelectedOption] = React.useState<SelectedVariantProps>(
    {
      label: "variant",
      value: option(props).product.featuredVariant() || {
        productId: undefined,
        variantId: undefined,
        productSnapshotId: undefined,
        variantSnapshotId: undefined,
        storeId: undefined,
        createdAt: undefined,
        price: undefined,
        priceWas: undefined,
        priceDetails: basePriceDetailsFactory(0),
        variantName: undefined,
        variantDescription: undefined,
        previewItems: [],
        files: [],
        isDefault: false,
        permanentDiscountedPriceDiscountId: null,
        permanentDiscountedPriceDiscount: null,
        specialDealDiscountId: null,
        specialDealDiscount: null,
        specialDeal: null,
        relevantDiscounts: [],
        fileIds: [],
        isSoldOut: false
      } as ProductVariant,
    }
  );

  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    setSelectedOption({
      label: option(props).product.featuredVariant.variantName(),
      value: option(props).product.featuredVariant(),
    })
  }, [props.product])

  const handleChangeVariantOption = (
    selectedOption: { label: string, value: ProductVariant }
  ) => {
    setSelectedOption(selectedOption)
  };

  const chosenVariant = selectedOption.value;
  const variantOptions = option(props).product.currentVariants([]).map(v => {
    return { label: v.variantName, value: v }
  })

  const decreaseQuantity = () => {
    // decrement only if larger than 1
    setQuantity(s => s > 1 ? s - 1 : 1);
  }

  const increaseQuantity = () => {
    setQuantity(s => s + 1);
  }


  return (
    <div className={clsx(
      classes.purchaseSummaryRoot,
    )}>
      <div className={classes.flexRow}>
        <div className={classes.flexCol66}>
        {
          option(selectedOption).value.variantId() &&
          option(props).product.id() &&
          <>
            <ProductHeading product={props.product} chosenVariant={chosenVariant}/>
            <SellerProfile store={option(props).product.store()}/>
            <ProductPricing chosenVariant={chosenVariant}/>
          </>
        }
        </div>

        <div className={classes.flexCol33}>
          <div className={classes.buttonContainer}>
            <div className={classes.maxWidth}
              style={{
                zIndex: 1, // above paypal button for dropdown menu
              }}
            >
              {
                option(selectedOption).value.variantId() &&
                option(props).product.id() &&
                option(user).defaultPaymentMethod.id() &&
                !xsDown &&
                // disable on mobile
                <VisaCheckout
                  disableButton={false}
                  stripe={props.stripe}
                  user={user}
                  className={"fadeIn"}
                  productsInfo={[{
                    productId: props.product.id,
                    variantId: selectedOption.value.variantId,
                    quantity: quantity,
                  }]}
                  quotedPrice={selectedOption.value.priceDetails.actualPrice}
                  title={`Download for ${c(selectedOption.value.priceDetails.actualPrice)}`}
                  display={true}
                  buttonHeight={xsDown ? '40px' : '40px'}
                  handleOrderPostPurchase={
                    handleOrderPostPurchase(
                      aClient,
                      dispatch,
                      router,
                      !!loggedInAsEmail,
                    )
                  }
                />
              }
            </div>
            <div className={classes.maxWidth}>
              {
                option(selectedOption).value.variantId() &&
                option(props).product.id() &&
                xsDown && // only enable ApplePay on mobile sizes
                <AppleGooglePay
                  buttonId={'product-page-apple-pay-1'}
                  disableButton={false}
                  stripe={props.stripe}
                  user={user}
                  className={"fadeIn"}
                  productsInfo={[{
                    productId: props.product.id,
                    variantId: selectedOption.value.variantId,
                    quantity: quantity,
                  }]}
                  quotedPrice={selectedOption.value.priceDetails.actualPrice}
                  display={true}
                  buttonHeight={xsDown ? '40px' : '40px'}
                  handleOrderPostPurchase={
                    handleOrderPostPurchase(
                      aClient,
                      dispatch,
                      router,
                      !!loggedInAsEmail,
                    )
                  }
                />
              }
            </div>
            <div className={classes.maxWidth}>
              {
                option(selectedOption).value.variantId() &&
                option(props).product.id() &&
                <PaypalCheckout
                  disableButton={false}
                  className={"fadeInFast"}
                  productsInfo={[{
                    productId: props.product.id,
                    variantId: selectedOption.value.variantId,
                    quantity: quantity,
                  }]}
                  quotedPrice={selectedOption.value.priceDetails.actualPrice}
                  user={user}
                  display={true}
                  handleOrderPostPurchase={
                    handleOrderPostPurchase(
                      aClient,
                      dispatch,
                      router,
                      !!loggedInAsEmail,
                    )
                  }
                />
              }
            </div>
            <div className={classes.spacer}>
              <Or/>
            </div>
            <div className={classes.maxWidth}>
              <AddCartItemButton
                product={props.product}
                chosenVariantId={option(chosenVariant).variantId()}
                color={"secondary"}
                openCheckoutOnAdd={true}
                disableCaption={true}
                quantity={quantity}
                style={{
                  height: xsDown ? '40px' : '40px'
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Divider style={{ color: '#f2f2f2' }}/>
      <ProductLicenses
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        quantity={quantity}
        selectedOption={selectedOption}
        variantOptions={variantOptions}
        handleChangeVariantOption={handleChangeVariantOption}
      />
    </div>
  );
}



interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
  stripe?: StripeClient & stripe.Stripe; // provided by injectStripe()
}

interface SelectedVariantProps {
  label: string;
  value: ProductVariant;
}

const buttonBackgroundColor = '#f6f6f6';


const styles = (theme: Theme) => createStyles({
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexCol66: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: "55%",
    marginRight: '1rem',
    minWidth: 250,
  },
  flexCol33: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: "40%",
    flexGrow: 1,
    minWidth: 200, // min width of buttons
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  purchaseSummaryRoot: {
    borderRadius: '2px',
    padding: '0.5rem 0rem',
  },
  subtitle1: {
    marginTop: '1rem',
  },
  variantSelector: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    padding: '0rem 0rem',
    width: '100%',
  },
  spacer: {
    marginBottom: '0.5rem',
    width: '100%',
  },
  maxWidth: {
    maxWidth: 300,
    width: '100%',
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
    paddingBottom: '1rem',
  },
  licenseContainer: {
  },
  // tips
  tipTitle: {
    marginBottom: '0rem',
  },
  bullet: {
    marginRight: '0.25rem',
  },
  tip: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '0rem',
  },
  numberPoint: {
    height: 15,
    width: 15,
    marginRight: '0.5rem',
    backgroundColor: 'rgba(200,200,200,0)',
    border: `2px solid ${Colors.green}`,
  },
  quantityMenu: {
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '1rem',
    padding: '0rem 1rem',
    background: buttonBackgroundColor,
  },
  seatsButton: {
    margin: "0.25rem",
    fontSize: '1.2rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    color: Colors.blue,
    cursor: 'pointer',
    "&:hover": {
      color: Colors.secondaryBright,
    },
  },
  seatsNumber: {
    margin: "0.25rem",
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  applePayButton: {
    background: "#191919",
  },
});

export default withStyles(styles)( PurchaseSummary );


