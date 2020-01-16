import { ActionType } from './actions'
import { reduxCartActions as A } from "./cart-actions";
import { CartItem, Cart, ID } from "typings/gqlTypes";
// cart pricing
import { calculateCartPrice } from "reduxStore/pricing/priceCalculator";

////// Cart state reducer //////////
export interface ReduxStateCart {
  cartOpen: boolean;
  cartStatus: string;
  cart: Cart;
}

const initialCartState: ReduxStateCart = {
  cartOpen: false,
  cartStatus: "",
  cart: {
    id: undefined,
    userId: undefined,
    updatedAt: undefined,
    items: [],
    subtotal: 0,
    automaticSavings: 0,
    promoCodeSavings: 0,
    taxes: 0,
    paymentProcessingFee: 0,
    total: 0,
    relevantPromoCodes: [],
  },
}

export const reduxReducerCart = (
  state: ReduxStateCart = initialCartState,
  action: ActionType
): ReduxStateCart => {

  // console.info("ReduxCart payload: ", action.payload)

  switch ( action.type ) {

    case A.UPDATE_CART().type: {
      return { ...state, cart: action.payload }
    }

    case A.CLEAR_CART().type: {
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [],
          subtotal: 0,
          automaticSavings: 0,
          promoCodeSavings: 0,
          taxes: 0,
          paymentProcessingFee: 0,
          total: 0,
          relevantPromoCodes: [],
        }
      }
    }

    case A.TOGGLE_CART_OPEN().type: {
      return { ...state, cartOpen: action.payload }
    }

    case A.ADD_CART_ITEM().type: {
      let cartItem: CartItem = action.payload;
      let existingProductIds: ID[] = state.cart.items.map(c => c.product.id);
      return {
        ...state,
        cart: calculateCartPrice({
          ...state.cart,
          items: [
            ...state.cart.items,
            ...(existingProductIds.includes(cartItem.product.id) ? [] : [cartItem])
          ]
        })
      }
    }

    case A.REMOVE_CART_ITEM().type: {
      const variantId: ID = action.payload;
      const removeIndex = state.cart.items.findIndex(item => {
        return variantId === item.product.chosenVariant.variantId
      })

      return {
        ...state,
        cart: calculateCartPrice({
          ...state.cart,
          items: [
            ...state.cart.items.slice(0, removeIndex),
            ...state.cart.items.slice(removeIndex + 1)
          ]
        })
      }
    }

    case A.SET_CART_STATUS().type: {
      return { ...state, cartStatus: action.payload }
    }

    default: {
      return state
    }
  }
}


