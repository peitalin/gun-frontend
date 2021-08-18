import {
  OrderSnapshot,
  Product,
  Users,
  UserWithMobileNumber,
  UserPrivate,
  BasicUser,
  StorePrivate,
  Store,
  OrderStatus,
} from "typings/gqlTypes";



export const getUserWhoActionedOrderStatus = (
  orderSnapshot: OrderSnapshot,
  buyer: UserPrivate,
  sellerStore: StorePrivate,
): UserWithMobileNumber => {

  let orderStatus = orderSnapshot?.orderStatus;

  switch (orderStatus) {
    case OrderStatus.CREATED:  {
      return { ...buyer, __typename: "UserWithMobileNumber" } as UserWithMobileNumber
    }
    case OrderStatus.FAILED:  {
      return { ...buyer, __typename: "UserWithMobileNumber" } as UserWithMobileNumber
    }
    case OrderStatus.CONFIRMED_PAYMENT_FORM_10_REQUIRED:  {
      return { ...buyer, __typename: "UserWithMobileNumber" } as UserWithMobileNumber
    }
    case OrderStatus.FORM_10_SUBMITTED:  {
      return { ...sellerStore?.user, __typename: "UserWithMobileNumber" } as UserWithMobileNumber
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