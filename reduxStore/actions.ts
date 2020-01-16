import { reduxLoginActions } from "./login-actions";
import { reduxCartActions } from "./cart-actions";
import { reduxModalsActions } from "./modals-actions";

// Action type
export type ActionType<T = any> = { type: string, payload: T }

// Action Creating Functions
export const Actions = {
  reduxLogin: reduxLoginActions,
  reduxCart: reduxCartActions,
  reduxModals: reduxModalsActions,
};

