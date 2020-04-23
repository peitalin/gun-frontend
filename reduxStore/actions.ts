import { reduxLoginActions } from "./login-actions";
import { reduxModalsActions } from "./modals-actions";
import { reduxProductCreateActions } from "./product_create-actions";
import { reduxProductEditActions } from "./product_edit-actions";
import { reduxStoreCreateActions } from "./store_create-actions";
import { reduxWishlistActions } from "./wishlist-actions";
import { reduxFollowingStoresActions } from "./following-stores-actions";
import { reduxRefetchActions } from "./refetch-actions";

// Action type
export type ActionType<T = any> = { type: string, payload: T }

// Action Creating Functions
export const Actions = {
  reduxLogin: reduxLoginActions,
  reduxModals: reduxModalsActions,
  reduxProductCreate: reduxProductCreateActions,
  reduxProductEdit: reduxProductEditActions,
  reduxStoreCreate: reduxStoreCreateActions,
  reduxWishlist: reduxWishlistActions,
  reduxFollowingStores: reduxFollowingStoresActions,
  reduxRefetch: reduxRefetchActions,
};

