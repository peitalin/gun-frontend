import { reduxLoginActions } from "./login-actions";
import { reduxModalsActions } from "./modals-actions";
import { reduxProductCreateActions } from "./product_create-actions";
import { reduxProductEditActions } from "./product_edit-actions";
import { reduxWatchlistActions } from "./watchlist-actions";
import { reduxFollowingStoresActions } from "./following-stores-actions";
import { reduxRefetchActions } from "./refetch-actions";
import { reduxConversationActions } from "./conversation-actions";
import { reduxPaginatorVariablesActions } from "./paginator-variables-actions";

// Action type
export type ActionType<T = any> = { type: string, payload: T }

// Action Creating Functions
export const Actions = {
  reduxLogin: reduxLoginActions,
  reduxModals: reduxModalsActions,
  reduxProductCreate: reduxProductCreateActions,
  reduxProductEdit: reduxProductEditActions,
  reduxWatchlist: reduxWatchlistActions,
  reduxFollowingStores: reduxFollowingStoresActions,
  reduxRefetch: reduxRefetchActions,
  reduxConversation: reduxConversationActions,
  reduxPaginatorVariablesActions: reduxPaginatorVariablesActions,
};

