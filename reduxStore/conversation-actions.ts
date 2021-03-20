
import { ReduxStateConversation } from "./conversation-reducer";
import { ActionType } from "./actions";
import { Conversation } from "typings/gqlTypes";



export const reduxConversationActions = {

  SET_CONVERSATIONS: (payload?: Conversation[]): ActionType<Conversation[]> => ({
    type: "SET_CONVERSATIONS",
    payload: payload
  }),


  SET_CURRENT_CONVERSATION_ID: (payload?: string): ActionType<string> => ({
    type: "SET_CURRENT_CONVERSATION_ID",
    payload: payload
  }),
}
