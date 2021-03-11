// Typings
import {
  OrderStatus,
} from "typings/gqlTypes";


export const canBeCancelled = (ostatus: string): boolean => {
  if (ostatus === undefined) {
    return false
  }
  if (ostatus === OrderStatus.CREATED) {
    return true
  }
  if (ostatus === OrderStatus.CONFIRMED_PAYMENT_FORM_10_REQUIRED) {
    return true
  }
  if (ostatus === OrderStatus.FORM_10_SUBMITTED) {
    return true
  }
  if (ostatus === OrderStatus.FORM_10_REVISE_AND_RESUBMIT) {
    return true
  }
  return false
}