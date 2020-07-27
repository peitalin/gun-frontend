import * as React from "react";
import OrderItemPreview from "./OrderItemPreview";
import { OrderItem } from "typings/gqlTypes";

// Memo => ShouldComponentUpdate
const OrderItems = React.memo(({ items }: { items: OrderItem[]}) => {
  return <>
    {
      items.map(item =>
        <OrderItemPreview item={item} key={item.id}/>
      )
    }
  </>
})

export default OrderItems;