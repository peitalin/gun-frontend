import {
  Order_Snapshots,
  Orders,
  Products,
  User,
  OrderStatus,
  Image,
} from "typings/gqlTypes";
import { oc as option } from "ts-optchain";


export const createData = ({
  id,
  createdAt,
  total,
  seller,
  buyer,
  orderSnapshots,
  product,
  currentOrderSnapshot,
}: {
  id: string,
  createdAt: Date,
  total: number,
  seller: User,
  buyer: User,
  currentOrderSnapshot: Order_Snapshots,
  orderSnapshots?: Order_Snapshots[]
  product?: Products,
}) => {

  return {
    id: id,
    createdAt: createdAt,
    total: total,
    orderStatus: currentOrderSnapshot.orderStatus,
    form10: option(currentOrderSnapshot).form10Image(),
    seller: seller,
    product: product,
    history: orderSnapshots
      .slice()
      .sort((a, b) => {
        let dateA = new Date(a.createdAt).getTime()
        let dateB = new Date(b.createdAt).getTime()
        return dateB - dateA
      })
      .map(o => {

        let approver = getUserWhoActionedOrderStatus(o, buyer, seller)

        return {
          date: option(o).createdAt(),
          approverId: option(approver).id(),
          approverEmail: option(approver).email(),
          orderStatus: option(o).orderStatus(),
          form10Image: option(o).form10Image(),
        }
      })
  };
}

const getUserWhoActionedOrderStatus = (
  orderSnapshot: Order_Snapshots,
  buyer: User,
  seller: User,
): User => {

  let orderStatus = orderSnapshot.orderStatus;

  switch (orderStatus) {
    case OrderStatus.CREATED:  {
      return buyer
    }
    case OrderStatus.FAILED:  {
      return buyer
    }
    case OrderStatus.CONFIRMED_PAYMENT_FORM_10_REQUIRED:  {
      return buyer
    }
    case OrderStatus.FORM_10_SUBMITTED:  {
      return seller
    }
    case OrderStatus.ADMIN_APPROVED:  {
      return orderSnapshot.adminApprover
    }
    case OrderStatus.COMPLETE:  {
      return orderSnapshot.adminApprover
    }
    case OrderStatus.REFUNDED:  {
      return orderSnapshot.adminApprover
    }
  }

}