import {
  OrderSnapshot,
  Product,
  Users,
  UserForDealers,
  UserPrivate,
  User_Licenses,
  BasicUser,
  StorePrivate,
  Store,
  OrderStatus,
} from "typings/gqlTypes";
import { getUserWhoActionedOrderStatus } from "components/Gov/createDataUtils";


export const createDataForPendingApprovalTable = ({
  id,
  createdAt,
  total,
  internationalFee,
  sellerStore,
  sellerLicense,
  buyer,
  buyerLicense,
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
  internationalFee: number,
  sellerStore: StorePrivate,
  sellerLicense: User_Licenses,
  buyer: UserPrivate,
  buyerLicense: User_Licenses,
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
    internationalFee: internationalFee,
    orderStatus: currentOrderSnapshot?.orderStatus,
    form10: currentOrderSnapshot?.form10File ?? currentOrderSnapshot?.form10Image,
    sellerStore: sellerStore,
    buyer: buyer,
    buyerLicense: buyerLicense,
    sellerLicense: sellerLicense,
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
