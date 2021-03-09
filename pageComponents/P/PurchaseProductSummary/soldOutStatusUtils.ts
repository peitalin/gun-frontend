
import {
  SoldOutStatus
} from "typings/gqlTypes";

export const soldOutStatusToDisplayMessage = (o: string) => {
  switch (o) {
    case SoldOutStatus.ABANDONED: {
      return "Product is abandoned and marked for deletion"
    }
    case SoldOutStatus.AVAILABLE: {
      return "Product is available for purchase"
    }
    case SoldOutStatus.RESERVED: {
      return "Product is currently pending sale"
    }
    case SoldOutStatus.SOLD_OUT: {
      return "Product is sold"
    }
    default: {
      return ""
    }
  }
}