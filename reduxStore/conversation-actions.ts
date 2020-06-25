
import { ReduxStateConversation } from "./conversation-reducer";
import { ActionType } from "./actions";
import {
  Chat_Users
} from "typings/gqlTypes";



export const reduxConversationActions = {

  SET_CONVERSATIONS: (payload?: Chat_Users[]): ActionType<Chat_Users[]> => ({
    type: "SET_CONVERSATIONS",
    payload: payload
  }),


  SET_CURRENT_CONVERSATION_ID: (payload?: string): ActionType<string> => ({
    type: "SET_CURRENT_CONVERSATION_ID",
    payload: payload
  }),
}
