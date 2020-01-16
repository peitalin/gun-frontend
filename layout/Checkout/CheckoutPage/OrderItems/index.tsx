import React from "react";
import OrderItemPreview from "./OrderItemPreview";
import { Cart } from "typings/gqlTypes";

// Memo => ShouldComponentUpdate
const OrderItems = React.memo(({ cart }: { cart: Cart}) => {
  return <>
    {
      !!cart && !!cart.items &&
      cart.items.map(item =>
        <OrderItemPreview cartItem={item} key={item.id}/>
      )
    }
  </>
})

export default OrderItems;