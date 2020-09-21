import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import {
  Product, ID, Product_Variants, UserPrivate, ProductPreviewItem
} from "typings/gqlTypes";
import { SelectedVariantProps } from "../ProductId";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// useApolloClient
import { useApolloClient } from "@apollo/client";
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
import { asCurrency as c } from "utils/prices";

import { VisaButtonLoading, PaypalButtonLoading } from "./PaymentButtonLoadingSSR";
import dynamic from "next/dynamic";
const WestpacPurchaseProduct = dynamic(() => import("./WestpacPurchaseProduct"), {
  loading: (props) => <VisaButtonLoading/>,
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

        <div className={clsx(
          classes.flexCol33,
          mdDown ? classes.center : classes.alignItemsCenter,
        )}>
          <div className={
            smDown
            ? classes.buttonContainerMobile
            : classes.buttonContainer
          }>

            <div className={clsx(
              classes.maxWidth,
              classes.visaContainer,
            )}>
              {
                showVisaPay &&
                <WestpacPurchaseProduct
                  // disable on mobile
                  user={user}
                  // className={"fadeIn"}
                  product={option(props).product()}
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
  quantity?: number;
  // ProductLicense
  increaseQuantity(): void;
  decreaseQuantity(): void;
  // selectedOption: {
  //   label: string;
  //   value: Product_Variants;
  // };
  variantOptions: {
    label: string;
    value: Product_Variants;
  }[];
  handleChangeVariantOption(
    selectedOption: { label: string, value: Product_Variants }
  ): void;
}



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
  creditCardContainer: {
    margin: "0px",
    height: 38,
    // border: `2px solid ${Colors.charcoal}`,
    border: `1px solid rgba(170, 170, 170, 0.4)`,
    padding: "0.5rem",
    borderRadius: '4px',
  },
});

export default withStyles(styles)( PurchaseProductSummary );


