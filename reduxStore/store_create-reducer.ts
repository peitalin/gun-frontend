import { ActionType, Actions } from './actions'
import { reduxStoreCreateActions as A } from "./store_create-actions";
import {
  ID,
} from "typings/gqlTypes";


////// state reducer //////////
export interface ReduxStateStoreCreate {
  name: string;
  profileId: ID;
  coverId: ID;
  bio: string;
  website: string;
}

const initialStoreCreateState: ReduxStateStoreCreate = {
  name: "",
  // profileId: "image_fake_profile_d2d7eb62-d8d2-45d8-9c0c-a0ceb688ec64",
  profileId: null,
  coverId: null,
  bio: null,
  website: null
}


export const reduxReducerStoreCreate = (
  state: ReduxStateStoreCreate = initialStoreCreateState,
  action: ActionType
): ReduxStateStoreCreate => {

  // console.info("ReduxStoreCreate payload: ", action.payload)

  switch ( action.type ) {

    case A.UPDATE_STORE().type: {
      return { ...state, ...action.payload }
    }

    case A.UPDATE_NAME().type: {
      return { ...state, name: action.payload }
    }

    case A.UPDATE_PROFILE_ID().type: {
      return { ...state, profileId: action.payload }
    }

    case A.UPDATE_COVER_ID().type: {
      return { ...state, coverId: action.payload }
    }

    case A.UPDATE_BIO().type: {
      return { ...state, bio: action.payload }
    }

    case A.UPDATE_WEBSITE().type: {
      return { ...state, website: action.payload }
    }

    default: {
      return state
    }
  }
}


