import { ActionType } from './actions'
import { reduxCollectionsActions as A } from "./collections-actions";
import { CollectionItem, ID, Connection, CollectionItemsConnection } from "typings/gqlTypes";


////// Collection state reducer //////////
export interface ReduxStateCollections {
  collectionIds: CollectionItemId[];
  selectedProductExternalProductId: string;
}

export interface CollectionItemId {
  productId?: ID;
  externalProductId?: ID;
}

const initialCollectionState: ReduxStateCollections = {
  collectionIds: [],
  selectedProductExternalProductId: undefined,
}

export const reduxReducerCollections = (
  state: ReduxStateCollections = initialCollectionState,
  action: ActionType
): ReduxStateCollections => {

  // console.info("ReduxCollection payload: ", action.payload)

  switch ( action.type ) {

    case A.SET_SELECTED_PRODUCT_EXTERNAL_PRODUCT_ID().type: {
      console.log("SET SELECLTED: ", action.payload)
      return {
        ...state,
        selectedProductExternalProductId: action.payload
      }
    }

    case A.CLEAR_COLLECTIONS().type: {
      return {
        ...state,
        collectionIds: []
      }
    }

    case A.SET_COLLECTIONS().type: {
      const collection: CollectionItemsConnection = action.payload;
      return {
        ...state,
        collectionIds: (collection?.edges ?? []).map(w => {
          return {
            productId: w?.node?.product?.id,
            externalProductId: w?.node?.externalProduct?.id,
          }
        })
      }
    }

    case A.ADD_COLLECTION_ITEM().type: {

      const collectionItem: CollectionItemId = action.payload;
      const alreadyExists = state.collectionIds.findIndex(w => {
        return collectionItem.productId === w.productId
      }) >= 0; // -1 if not found

      return {
        ...state,
        collectionIds: [
          ...state.collectionIds,
          ...(alreadyExists ? [] : [collectionItem])
        ]
      }
    }

    case A.REMOVE_COLLECTION_ITEM().type: {

      const collectionItem: CollectionItemId = action.payload;
      const newCollection = state.collectionIds.filter(w => {
        return collectionItem.productId !== w.productId
            || collectionItem.externalProductId !== w.externalProductId
      })

      return {
        ...state,
        collectionIds: newCollection
      }
    }

    default: {
      return state
    }
  }
}


