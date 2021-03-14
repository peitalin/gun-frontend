import {
  OrderSnapshot,
  Product,
  Users,
  UserForDealers,
  UserPrivate,
  BasicUser,
  StorePrivate,
  Store,
  OrderStatus,
} from "typings/gqlTypes";
import { getUserWhoActionedOrderStatus } from "components/Gov/createDataUtils";


export const createDataForArrivingOrdersTable = ({
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
  paymentIntentStatus,
  paymentIntentId,
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
  paymentIntentStatus?: string,
  paymentIntentId?: string,
}) => {

  return {
    id: id,
    createdAt: createdAt,
    total: total,
    orderStatus: currentOrderSnapshot?.orderStatus,
    form10: currentOrderSnapshot?.form10File ?? currentOrderSnapshot?.form10Image,
    sellerStore: sellerStore,
    buyer: buyer,
    dealer: product?.currentSnapshot?.dealer,
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
        }
      }),
    payoutId: payoutId,
    payoutStatus: payoutStatus,
    paymentIntentStatus: paymentIntentStatus,
    paymentIntentId: paymentIntentId,
  };
}