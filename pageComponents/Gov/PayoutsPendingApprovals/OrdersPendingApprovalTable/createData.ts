import {
  Order_Snapshots,
  Orders,
  Products,
  Users,
  StorePrivate,
  Stores,
  OrderStatus,
} from "typings/gqlTypes";
import { oc as option } from "ts-optchain";


export const createDataForPendingApprovalTable = ({
  id,
  createdAt,
  total,
  seller,
  buyer,
  orderSnapshots,
  product,
  currentOrderSnapshot,
  payoutId,
  payoutStatus,
}: {
  id: string,
  createdAt: Date,
  total: number,
  seller: Stores,
  buyer: Users,
  currentOrderSnapshot: Order_Snapshots,
  orderSnapshots?: Order_Snapshots[]
  product?: Products,
  payoutId?: string,
  payoutStatus?: string,
}) => {

  return {
    id: id,
    createdAt: createdAt,
    total: total,
    orderStatus: option(currentOrderSnapshot).orderStatus(),
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
      }),
    payoutId: payoutId,
    payoutStatus: payoutStatus,
  };
}

const getUserWhoActionedOrderStatus = (
  orderSnapshot: Order_Snapshots,
  buyer: Users,
  seller: Stores,
): Users => {

  let orderStatus = option(orderSnapshot).orderStatus();

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
      return option(seller).user()
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