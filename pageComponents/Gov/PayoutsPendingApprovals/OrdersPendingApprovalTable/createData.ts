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


export const createDataForPendingApprovalTable = ({
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
    form10: currentOrderSnapshot?.form10Image,
    sellerStore: sellerStore,
    buyer: buyer,
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
    paymentIntentStatus: paymentIntentStatus,
    paymentIntentId: paymentIntentId,
  };
}

export const getUserWhoActionedOrderStatus = (
  orderSnapshot: OrderSnapshot,
  buyer: UserPrivate,
  sellerStore: StorePrivate,
): UserForDealers => {

  let orderStatus = orderSnapshot?.orderStatus;

  switch (orderStatus) {
    case OrderStatus.CREATED:  {
      return { ...buyer, __typename: "UserForDealers" } as UserForDealers
    }
    case OrderStatus.FAILED:  {
      return { ...buyer, __typename: "UserForDealers" } as UserForDealers
    }
    case OrderStatus.CONFIRMED_PAYMENT_FORM_10_REQUIRED:  {
      return { ...buyer, __typename: "UserForDealers" } as UserForDealers
    }
    case OrderStatus.FORM_10_SUBMITTED:  {
      return { ...sellerStore?.user, __typename: "UserForDealers" } as UserForDealers
    }
    case OrderStatus.FORM_10_REVISE_AND_RESUBMIT:  {
      return orderSnapshot.adminApprover
    }
    case OrderStatus.CANCELLED:  {
      return orderSnapshot.adminApprover
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