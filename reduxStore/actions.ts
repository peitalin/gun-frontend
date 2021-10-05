import { reduxLoginActions } from "./login-actions";
import { reduxModalsActions } from "./modals-actions";
import { reduxProductCreateActions } from "./product_create-actions";
import { reduxProductEditActions } from "./product_edit-actions";
import { reduxCollectionsActions } from "./collections-actions";
import { reduxFollowingStoresActions } from "./following-stores-actions";
import { reduxRefetchActions } from "./refetch-actions";
import { reduxConversationActions } from "./conversation-actions";
import { reduxPaginatorVariablesActions } from "./paginator-variables-actions";
import { reduxImageSwapActions } from "./image_swap-actions";

// Action type
export type ActionType<T = any> = { type: string, payload: T }

// Action Creating Functions
export const Actions = {
  reduxLogin: reduxLoginActions,
  reduxModals: reduxModalsActions,
  reduxProductCreate: reduxProductCreateActions,
  reduxProductEdit: reduxProductEditActions,
  reduxCollections: reduxCollectionsActions,
  reduxFollowingStores: reduxFollowingStoresActions,
  reduxRefetch: reduxRefetchActions,
  reduxConversation: reduxConversationActions,
  reduxPaginatorVariablesActions: reduxPaginatorVariablesActions,
  reduxImageSwap: reduxImageSwapActions,
};

