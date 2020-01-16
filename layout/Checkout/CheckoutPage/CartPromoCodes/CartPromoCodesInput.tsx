import React, { useState } from "react";
import {
  CartMutationResponse,
  Cart,
  ProductProductVariantId,
  Discount
} from "typings/gqlTypes";
import { useMutation, useQuery, useApolloClient } from "@apollo/react-hooks";
import { ADD_PROMO_CODE_TO_CART } from "queries/carts-mutations";
import { Actions } from "reduxStore/actions";
import { connect } from "react-redux";
import TextInput from "components/Fields/TextInput";
import { centsToDollarSelector } from "utils/selectors";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { TRY_PROMO_CODE_FOR_LOGGED_OUT_CART } from "queries/carts-queries";
import { calculateCartPrice } from "reduxStore/pricing/priceCalculator";

interface State {
  code: string;
  showAttemptIsInvalid: boolean;
}

const CartPromoCodesInput: React.FC<ReduxProps> = props => {
  const [state, setState] = useState<State>({
    code: "",
    showAttemptIsInvalid: false
  });

  const [addPromoCodeToCart, addLifecycle] = useMutation<
    MutationData,
    MutationVars
  >(ADD_PROMO_CODE_TO_CART, {
    update: (cache, { data }: { data: MutationData }) => {
      try {
        const newCart = data.addPromoCodeToCart.cart;
        setState({
          code: "",
          showAttemptIsInvalid: false
        });
        props.updateCart(newCart);
      } catch (error) {
        setState({
          ...state,
          showAttemptIsInvalid: true
        });
      }
    }
  });

  const aClient = useApolloClient();

  const tryPromoCodeForLoggedOutCart = async () => {
    const response = await aClient.query<TryPromoCodeForLoggedOutQueryData, TryPromoCodeForLoggedOutQueryVars>({
      query: TRY_PROMO_CODE_FOR_LOGGED_OUT_CART,
      variables: {
        code: state.code,
        cartProductsInfo: props.cart.items.map(item => {
          return {
            productId: item.product.id,
            variantId: item.product.chosenVariant.variantId,
            quantity: item.quantity
          }
        })
      }
    });
    const promoCodeDiscount = response.data.tryPromoCode;
    const newCart = calculateCartPrice({
      ...props.cart,
      relevantPromoCodes: [promoCodeDiscount]
    })
    setState({
      code: "",
      showAttemptIsInvalid: false
    });
    props.updateCart(newCart);
  }

  const submitPromoCode = () => {
    if (props.cart.userId) {
      addPromoCodeToCart({
        variables: {
          code: state.code
        }
      }).catch(e => {
        setState({
          ...state,
          showAttemptIsInvalid: true
        });
      });
    } else {
      tryPromoCodeForLoggedOutCart().catch(e => {
        setState({
          ...state,
          showAttemptIsInvalid: true
        });
      });
    }
  };

  let statusMessage = "";
  if (state.showAttemptIsInvalid) {
    statusMessage = "The promo code is invalid";
  } else {
    // Reflect the status of whatever is currently in the cart
    if (props.cart.promoCodeSavings > 0) {
      const savings = centsToDollarSelector(props.cart.promoCodeSavings)
        .subtotalDisplay;
      statusMessage = `You will save ${savings}`;
    } else if (props.cart.relevantPromoCodes.length > 0) {
      statusMessage = "Code is valid, but missing some requirements";
    } else {
      statusMessage = "Only one promo code can be applied";
    }
  }

  // NOTE: This is just using "errorMessage" to render the status.
  // something else that allows different colours etc may be better

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        maxWidth: 300,
      }}
    >
      <TextInput
        placeholder="Add promo code"
        onChange={e => {
          setState({
            ...state,
            code: e.currentTarget.value
          });
        }}
        onKeyPress={e => {
          if (e.key === "Enter") {
            submitPromoCode();
          }
        }}
        style={{
          width: "80%"
        }}
        value={state.code}
        onSubmit={submitPromoCode}
        errorMessage={statusMessage}
      />
    </div>
  );
};

interface ReduxProps {
  cart: Cart;
  updateCart(payload: Cart): void;
}

interface MutationData {
  addPromoCodeToCart: CartMutationResponse;
}
interface MutationVars {
  code: string;
}

interface TryPromoCodeForLoggedOutQueryVars {
  code: string;
  cartProductsInfo: ProductProductVariantId[];
}

interface TryPromoCodeForLoggedOutQueryData {
  tryPromoCode: Discount;
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
)(CartPromoCodesInput);
