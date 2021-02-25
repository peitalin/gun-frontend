import {
  OrderSnapshot,
  Product,
  Users,
  UserWithRole,
  UserPrivate,
  BasicUser,
  StorePrivate,
  Store,
  OrderStatus,
} from "typings/gqlTypes";
import {
  getUserWhoActionedOrderStatus
} from "../../PayoutsPendingApprovals/OrdersPendingApprovalTable/createData";

export const createDataForExpiringTable = ({
  id,
  createdAt,
  total,
  sellerStore,
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
  sellerStore: StorePrivate,
  buyer: UserPrivate,
  currentOrderSnapshot: OrderSnapshot,
  orderSnapshots?: OrderSnapshot[]
  product?: Product,
  payoutId?: string,
  payoutStatus?: string,
}) => {

  return {
    id: id,
    createdAt: createdAt,
    total: total,
    orderStatus: currentOrderSnapshot?.orderStatus,
    form10: currentOrderSnapshot?.form10Image,
    sellerStore: sellerStore,
    product: product,
    history: (orderSnapshots ?? [])
      .slice()
      .sort((a, b) => {
        let dateA = new Date(a.createdAt).getTime()
        let dateB = new Date(b.createdAt).getTime()
        return dateB - dateA
      })
      .map(o => {

        let approver = getUserWhoActionedOrderStatus(o, buyer, sellerStore)

        return {
          date: o?.createdAt,
          approverId: approver?.id,
          approverEmail: approver?.email,
          orderStatus: o?.orderStatus,
          form10Image: o?.form10Image,
        }
      }),
    payoutId: payoutId,
    payoutStatus: payoutStatus,
  };
}
