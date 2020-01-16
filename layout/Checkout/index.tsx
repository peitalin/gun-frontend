import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Graphql
import { GET_USER } from "queries/user-queries";
import { useApolloClient } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
// utils
import { Cart, UserPrivate, Transaction, Order } from "typings/gqlTypes";
import ErrorBounds from "components/ErrorBounds";
// Components
import CheckoutPage from "./CheckoutPage";
// Stripe
import { injectStripe } from 'react-stripe-elements';
const CheckoutPageInjected = injectStripe(CheckoutPage);
// Router
import { useRouter } from "next/router";
// Css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const CheckoutModal: React.FC<ReactProps> = (props) => {

  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const handleCloseModal = () => {
    if (xsDown) {
      // go back from /checkout page on mobile
      router.back()
    } else {
      // otherwise toggle checkout modal on desktop
      dispatch(Actions.reduxModals.TOGGLE_CHECKOUT_MODAL(false))
    }
  }

  const {
    classes,
    asModal = true,
  } = props;

  const {
    checkoutModalOpen,
    cart,
    user,
    order,
  } = useSelector<GrandReduxState, ReduxState>(state => ({
    checkoutModalOpen: state.reduxModals.checkoutModalOpen,
    cart: state.reduxCart.cart,
    user: state.reduxLogin.user,
    order: state.reduxPayment.order,
  }));

  const { data, loading, error, refetch } = useQuery<QueryData>(
    GET_USER, {
    errorPolicy: "all", // propagate errors from backend to Snackbar
    fetchPolicy: 'network-only', // do not write to cache
    ssr: false,
  });
  // this call to User will read from cache since the <GetUser> component
  // in /layout/index.tsx already makes the same request.
  // This will however, give us the refetch() function to tie into hooks
  // so that anytime a new order is updated in redux, we can refetch the cart
  // and sync client cart to backend carts.

  const refreshCart = async(data) => {
    if (option(data).user.cart()) {
      dispatch(Actions.reduxCart.UPDATE_CART(data.user.cart))
    }
  }

  React.useEffect(() => {
    // refetch user cart anytime (completed) orders changes
    if (refetch) {
      refetch()
    }
  }, [order])

  React.useEffect(() => {
    // refresh cart anytime data.user updates
    refreshCart(data)
  }, [option(data).user()])

  React.useEffect(() => {
    if (!router.query.skipRefreshCart) {
      // refresh cart on mount
      refreshCart(data)
    }
  }, [])


  if (asModal) {
    return (
      <ErrorBounds>
        <Dialog
          open={checkoutModalOpen}
          onClose={handleCloseModal}
          fullScreen={smDown}
          fullWidth={false}
          BackdropProps={{
            classes: { root: classes.modalBackdrop }
          }}
          PaperProps={{
            classes: { root: classes.modalPaperScrollPaper }
          }}
          scroll={'body'}
        >
          <CheckoutPageInjected
            cart={cart}
            user={user}
            handleCloseModal={handleCloseModal}
            asModal={asModal}
          />
        </Dialog>
      </ErrorBounds>
    )
  } else {
    return (
      <ErrorBounds>
        <CheckoutPageInjected
          cart={cart}
          user={user}
          handleCloseModal={handleCloseModal}
          asModal={asModal}
        />
      </ErrorBounds>
    )
  }
}


interface ReactProps extends WithStyles<typeof styles> {
  asModal?: boolean;
}
interface ReduxState {
  checkoutModalOpen: boolean;
  cart: Cart;
  user?: UserPrivate;
  order: Order;
}
interface QueryData {
  user: UserPrivate;
}

const styles = (theme: Theme) => createStyles({
  modalBackdrop: {
    backgroundColor: "rgba(47, 57, 65, .85)",
  },
  modalPaperScrollPaper: {
    maxWidth: '1000px',
  },
});


export default withStyles(styles)( CheckoutModal );
