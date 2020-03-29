import { reduxLoginActions } from "./login-actions";
import { reduxModalsActions } from "./modals-actions";

// Action type
export type ActionType<T = any> = { type: string, payload: T }

// Action Creating Functions
export const Actions = {
  reduxLogin: reduxLoginActions,
  reduxModals: reduxModalsActions,
};

