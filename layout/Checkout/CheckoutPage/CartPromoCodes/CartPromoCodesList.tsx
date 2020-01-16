import React from "react";
import {
  Discount,
  DiscountModifier,
  ID,
  CartMutationResponse,
  UserPrivate,
  Cart
} from "typings/gqlTypes";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { GET_USER } from "queries/user-queries";
import { REMOVE_PROMO_CODE_FROM_CART } from "queries/carts-mutations";
import { connect } from "react-redux";
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { calculateCartPrice } from "reduxStore/pricing/priceCalculator";


const CartPromoCodesList: React.FC<ReduxProps> = props => {

  const [removePromoCodeFromCart, { loading, data, error }] =
  useMutation<MutationData, MutationVar>(
    REMOVE_PROMO_CODE_FROM_CART, {
    update: (cache, { data }: { data: MutationData }) => {
      try {
        const newCart = data.removePromoCodeFromCart.cart;
        props.updateCart(newCart);
      } catch (error) {
        console.log(error);
      }
    }
  });

  const removePromoCode = async (discountId: ID) => {
    if (props.cart.id) {
      removePromoCodeFromCart({
        variables: {
          discountId: discountId
        }
      });
    } else {
      const newCart = calculateCartPrice({
        ...props.cart,
        relevantPromoCodes: []
      });
      props.updateCart(newCart);
    }
  }

  return (
    <div>
      {
        props.cart.relevantPromoCodes.map(d => (
          <CodeItem
            key={d.id}
            discount={d}
            updateCart={props.updateCart}
            removePromoCode={removePromoCode}
          />
        ))
      }
    </div>
  );
};


const CodeItem: React.FC<CodeItemProps> = props => {

  return (
    <div>
      <h4>{props.discount.promoCode}</h4>
      <IconButton
        size="small"
        onClick={() => {
          props.removePromoCode(props.discount.id);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};


interface ReduxProps {
  cart: Cart;
  updateCart(payload: Cart): void;
}
interface CodeItemProps {
  discount: Discount;
  updateCart(payload: Cart): void;
  removePromoCode(discountId: ID): void;
}
interface MutationData {
  removePromoCodeFromCart: CartMutationResponse;
}
interface MutationVar {
  discountId: ID;
}

const mapStateToProps = (state: GrandReduxState) => {
  return {
    cart: state.reduxCart.cart
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateCart: (payload: Cart) =>
      dispatch(Actions.reduxCart.UPDATE_CART(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartPromoCodesList);
