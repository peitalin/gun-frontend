import { ActionType } from './actions'
import { reduxConversationActions as A } from "./conversation-actions";
import { Chat_Users } from "typings/gqlTypes";
import { oc as option } from "ts-optchain";


////// Conversation state reducer //////////
export interface ReduxStateConversation {
  conversations: Chat_Users[];
  currentConversationId: string;
}

const initialConversationState: ReduxStateConversation = {
  conversations: [],
  currentConversationId: undefined,
}

export const reduxReducerConversation = (
  state: ReduxStateConversation = initialConversationState,
  action: ActionType
): ReduxStateConversation => {

  // console.info("ReduxConversation payload: ", action.payload)

  switch ( action.type ) {

    case A.SET_CONVERSATIONS().type: {
      return {
        ...state,
        conversations: action.payload
      }
    }

    case A.SET_CURRENT_CONVERSATION_ID().type: {
      return {
        ...state,
        currentConversationId: action.payload
      }
    }

    default: {
      return state
    }
  }
}


