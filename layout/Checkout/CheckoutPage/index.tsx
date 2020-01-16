import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Redux
import { useSelector, useDispatch, batch } from "react-redux";
import { Dispatch } from "redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// MUI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import SaveAlt from "@material-ui/icons/SaveAlt";
// Typings
import { Cart, UserPrivate, Transaction, CartItemPurchasableStatus, Order } from "typings/gqlTypes";
import { HtmlEvent } from "typings";
// Graphql
import { useApolloClient } from "@apollo/react-hooks";
// Components
import DisplayCartPrices from "./DisplayCartPrices";
import OrderItems from "./OrderItems";
import CartPromoCodes from "./CartPromoCodes";
import Or from "components/Or";
import TextInput from "components/Fields/TextInput"
// Payment Components
import VisaCheckout from "./VisaCheckout";
import AppleGooglePay from "./AppleGooglePay";
import PaypalCheckout from "./PaypalCheckout";
import AdyenCheckout from "./AdyenCheckout";
// Stripe Provider
import { StripeClient } from "layout/Checkout/typings.stripe";
import Login from "layout/Login";
// pricing
import { calculateCartPrice } from "reduxStore/pricing/priceCalculator";
import { asCurrency as c } from "utils/prices";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// router
import { useRouter, NextRouter } from "next/router";
import { handleOrderPostPurchase } from "./CommonPurchase";




const CheckoutPage: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const [paymentMethod, setPaymentMethod] = React.useState("visa");
  const [openLoginAtIndex, setOpenLoginAtIndex] = React.useState(-1);
  // index are tabIndexes of the login component.
  // -1 => disabled
  // 0 => login page
  // 1 => sign up page
  const [showPromoCodes, setShowPromoCodes] = React.useState(false);

  const dispatch = useDispatch();
  const aClient = useApolloClient();
  const router = useRouter();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))

  const loggedInAsEmail = option(props).user.email();
  const cartHasItems = option(props).cart.items([]).length > 0


  return (
    <ErrorBounds className={clsx(
        (xsDown && smDown)
          ? classes.rootSm
          : xsDown
            ? classes.rootXs
            :classes.root,
        // only show modal on desktop, pages on mobile
      )}
    >
      <div className={clsx(
        classes.flexCol,
        classes.maxWidth900,
      )}>

        <div className={classes.flexRowWrap}>
          <div className={clsx(
            classes.flexCol440,
            !smDown ? classes.marginRight2 : null,
          )}>

            <div className={clsx(
              classes.flexRow,
              classes.orderTitle,
              classes.spaceBetween
            )}>
              <Typography variant={"h3"} className={classes.title}>
                <SaveAlt style={{
                  width: "1.4rem",
                  height: "1.4rem",
                  marginRight: "0.25rem",
                  marginBottom: "0.25rem",
                }}/>
                Confirm Your Downloads
              </Typography>
              {
                props.asModal &&
                <IconButton onClick={props.handleCloseModal} className={classes.iconButton}>
                  <ClearIcon/>
                </IconButton>
              }
            </div>
            <div className={clsx(
              classes.flexRow,
            )}>
              <Typography variant={"subtitle2"} className={classes.subtitle}>
                One more step. You can save your files on the next page.
              </Typography>
            </div>
            {
              loggedInAsEmail
              ? <div className={classes.loginContainer}>
                  <Typography variant="subtitle1" className={classes.youreLoggedInAs}>
                    Files will save to your account: {loggedInAsEmail}
                  </Typography>
                </div>
              : (openLoginAtIndex === 0)
                ? <div className={classes.loginContainer}>
                    <div className={classes.loginContainerInner}>
                      <Login compact={true} initialTabIndex={openLoginAtIndex}/>
                    </div>
                  </div>
                : (openLoginAtIndex === 1)
                  ? <div className={classes.loginContainer}>
                      <div className={classes.loginContainerInner}>
                        <Login compact={true} initialTabIndex={openLoginAtIndex}/>
                      </div>
                    </div>
                  : <div className={classes.loginContainer}>
                      <a
                        className={classes.link}
                        onClick={() => setOpenLoginAtIndex(1)}
                      >Create Free Acount</a>
                      or
                      <a
                        className={classes.link}
                        onClick={() => setOpenLoginAtIndex(0)}
                      > Login </a>
                    </div>
            }
            <br/>
            {
              cartHasItems
              ? <div>
                  <OrderItems cart={props.cart}/>
                </div>
              : <div className={classes.shoppingCartEmptyContainer}>
                  <Typography variant="body2" className={classes.shoppingCartEmpty}>
                    Your shopping cart is empty
                  </Typography>
                    <Button
                      className={classes.shoppingCartEmptyButton}
                      variant={"outlined"}
                      onClick={props.handleCloseModal}
                    >
                      Continue Shopping
                    </Button>
                </div>
            }
          </div>

          <div className={clsx(classes.flexCol440, classes.maxWidth440)}>
            <DisplayCartPrices
              cart={props.cart}
              user={props.user}
              isVisa={paymentMethod === "visa"}
            >
              {
                cartIsPurchasable(props.cart) &&
                <>
                  {
                    xsDown &&
                    <div className={
                      smDown
                        ? classes.buttonMarginSmDown
                        : classes.buttonMargin
                    }>
                      <AppleGooglePay
                        buttonId="checkout-apple-pay-1"
                        disableButton={option(props).user.id() === undefined}
                        stripe={props.stripe}
                        cart={props.cart}
                        className={"fadeInFast"}
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
                    </div>
                  }

                  <div className={
                    smDown
                      ? classes.buttonMarginPaypalSmDown
                      : classes.buttonMarginPaypal
                  }>
                    <PaypalCheckout
                      disableButton={option(props).user.id() === undefined}
                      cart={props.cart}
                      className={"fadeInFast"}
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
                  </div>

                  <Or title={"or pay with card"} style={{
                    marginBottom: '0.5rem',
                  }}/>

                  <div className={
                    smDown
                      ? classes.buttonMarginSmDown
                      : classes.buttonMargin
                  }>
                    <VisaCheckout
                      disableButton={false}
                      stripe={props.stripe}
                      cart={props.cart}
                      user={props.user}
                      className={"fadeInFast"}
                      display={true}
                      title={`Download for ${c(props.cart.total)}`}
                      handleOrderPostPurchase={
                        handleOrderPostPurchase(
                          aClient,
                          dispatch,
                          router,
                          !!loggedInAsEmail,
                        )
                      }
                    />
                  </div>
                </>
              }
            </DisplayCartPrices>

            {
              !showPromoCodes
              ? <div className={classes.flexRowWrap}>
                  <a onClick={() => setShowPromoCodes(s => !s)}>
                    <Typography variant="body1" className={classes.link}>
                      Add Promo Code
                    </Typography>
                  </a>
                </div>
              : <CartPromoCodes
                  closePromoCodes={() => setShowPromoCodes(false)}
                />
            }

          </div>
        </div>
      </div>
    </ErrorBounds>
  );
}



const cartIsPurchasable = (cart: Cart): boolean => {
  if (cart.items.length === 0) {
    return false;
  }
  return cart.items.some(item => {
    return item.purchasableStatus === CartItemPurchasableStatus.AVAILABLE;
  })
}


// https://github.com/stripe/react-stripe-elements/issues/99
export const destroyStripeIFrame = () => {
  let r = document.getElementsByTagName("iframe");
  let i = 0;
  while (i < r.length) {
    if (r[i].name.startsWith("__privateStripeFrame")) {
      r[i].remove()
    }
    i += 1;
  }
  // this.state.prButton.destroy('#payment-request-button');
  // let d = document.getElementById('payment-request-button');
  // d.removeChild(d.firstChild)
}


interface ReactProps extends WithStyles<typeof styles> {
  cart: Cart;
  user: UserPrivate;
  stripe?: StripeClient & stripe.Stripe; // provided by injectStripe()
  handleCloseModal(): void;
  asModal: boolean;
}

const styles = (theme: Theme) => createStyles({
  root: {
    margin: '3rem',
    display: 'flex',
    justifyContent: "center",
  },
  rootSm: {
    margin: '2rem',
  },
  rootXs: {
    margin: '2rem',
  },
  maxWidth900: {
    maxWidth: 900,
    flexGrow: 1,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexCol440: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: 'calc(50% - 1rem)',
    minWidth: 360, // min width for payment selector to see expiry date
  },
  maxWidth440: {
    maxWidth: 450,
  },
  marginRight1: {
    marginRight: '1rem',
  },
  marginRight2: {
    marginRight: '2rem',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexRowWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  loginContainer: {
    width: '100%',
    background: Colors.cream,
    border: `1px solid ${Colors.slateGrey}`,
    borderRadius: '4px',
    padding: '0.5rem 1rem',
  },
  paymentFields: {
  },
  orderTitle: {
    marginTop: '2rem',
    marginBottom: '0rem',
    position: 'relative',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  subtitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
    fontWeight: 500,
    fontSize: '0.9rem',
  },
  youreLoggedInAs: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: Colors.darkGrey,
    lineHeight: '1.1rem',
  },
  link: {
    color: Colors.blue,
    cursor: 'pointer',
    marginRight: '0.25rem',
    "&:hover": {
      color: Colors.lightBlue,
    },
  },
  iconButton: {
    position: 'absolute',
    top: '-3.5rem',
    left: '-1rem',
  },
  buttonMarginPaypal: {
    margin: "0rem 2rem 0rem 2rem",
  },
  buttonMarginPaypalSmDown: {
    margin: "0rem 0rem 0rem 0rem",
  },
  buttonMargin: {
    margin: "0rem 2rem 0rem 2rem",
  },
  buttonMarginSmDown: {
    margin: "0rem 0rem 0.5rem 0rem",
  },
  // login container
  loginContainerInner: {
    paddingTop: '0.5rem',
  },
  shoppingCartEmptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: '3rem',
    height: '13rem',
  },
  shoppingCartEmpty: {
    paddingTop: '1rem',
    marginBottom: '0.5rem'
  },
  shoppingCartEmptyButton: {
    background: Colors.foregroundColor,
    border: `1px solid ${Colors.charcoal}`,
    borderRadius: '4px',
  },
});

export default withStyles(styles)( CheckoutPage );