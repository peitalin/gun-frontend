import { ActionType, Actions } from './actions'
import {
  reduxImageSwapActions as A,
} from "./image_swap-actions";
import {
  ID,
  ProductPreviewItemInput,
} from "typings/gqlTypes";
import {
  DzuPreviewOrder,
  DzuPreviewItem
} from "typings/dropzone";


///// state reducer //////////
export interface ReduxStateImageSwap {
  // previewItems are replicated across all variants,
  // until we decide to allow these fields to vary between variants
  dzuPreviewItems: DzuPreviewItem[],
  // for tracking/persisting previews
  dzuPreviewOrder: DzuPreviewOrder[],
}


const initialImageSwapState: ReduxStateImageSwap = {
  dzuPreviewItems: [],
  dzuPreviewOrder: [],
}


export const reduxReducerImageSwap = (
  state: ReduxStateImageSwap = initialImageSwapState,
  action: ActionType
): ReduxStateImageSwap => {

  // console.info("ReduxImageSwap payload: ", action.payload)

  switch ( action.type ) {


    case A.SET_PREVIEW_ITEMS().type: {

      let previewItemInputs: DzuPreviewItem[] = action.payload;

      return {
        ...state,
        dzuPreviewItems: previewItemInputs,
        dzuPreviewOrder: previewItemInputs
          .map((p, i) => ({ id: p.id, index: i }))
      }
    }

    case A.ADD_PREVIEW_ITEMS().type: {

      let inputPreviewItems: DzuPreviewItem[] = action.payload;
      let newPreviewItems = [
        ...state.dzuPreviewItems,
        ...inputPreviewItems,
      ]

      return {
        ...state,
        dzuPreviewItems: newPreviewItems
      }
    }

    case A.UPDATE_PREVIEW_ITEM().type: {

      let newPreviewItem: DzuPreviewItem = action.payload;

      let updateIndex = state.dzuPreviewItems.findIndex(p => p.id === newPreviewItem.id);

      let newPreviewItems = [
        ...state.dzuPreviewItems.slice(0, updateIndex),
        newPreviewItem,
        ...state.dzuPreviewItems.slice(updateIndex + 1),
      ]

      if (updateIndex >= 0) {
        return {
          ...state,
          dzuPreviewItems: newPreviewItems
        }
      } else {
        console.debug("previewItem not found in redux: ", newPreviewItem.id)
        return state
      }
    }

    case A.REMOVE_PREVIEW_ITEMS().type: {

      // payload is a imageId to remove
      let ids: ID[] = action.payload;
      let newPreviewItems = state.dzuPreviewItems
          .filter(item => !ids.some(id => id === item.id))

      return {
        ...state,
        dzuPreviewItems: newPreviewItems
      }
    }

    case A.REORDER_PREVIEW_ITEMS().type: {

      let previewItemsReordered: DzuPreviewItem[] =
        action.payload.sort((a, b) => a.position - b.position);

      return {
        ...state,
        dzuPreviewItems: previewItemsReordered
      }
    }

    case A.SET_DZU_PREVIEW_ORDER().type: {

      let input: DzuPreviewOrder[] = action.payload;
      return {
        ...state,
        dzuPreviewOrder: input
      }
    }

    case A.ADD_DZU_PREVIEW_ORDER().type: {

      let input: DzuPreviewOrder[] = action.payload;
      let newDzuPreviewOrder: DzuPreviewOrder[] = [
        ...state.dzuPreviewOrder,
        ...input.map(( order, i ) => {
          return {
            id: order.id,
            index: state.dzuPreviewOrder.length + i
          }
        })
      ];

      return {
        ...state,
        dzuPreviewOrder: newDzuPreviewOrder
      }
    }

    case A.UPDATE_DZU_PREVIEW_ORDER().type: {

      let updateItem: DzuPreviewOrder = action.payload;
      let updateIndex = state.dzuPreviewOrder
        .findIndex(p => p.id === updateItem.id);

      let newDzuPreviewOrder = [
        ...state.dzuPreviewOrder.slice(0, updateIndex),
        {
          ...state.dzuPreviewOrder[updateIndex],
          ...updateItem,
        },
        ...state.dzuPreviewOrder.slice(updateIndex + 1),
      ]

      return {
        ...state,
        dzuPreviewOrder: newDzuPreviewOrder
      }
    }

    case A.REMOVE_DZU_PREVIEW_ORDER().type: {
      // payload is a DropZone Uploader meta.id to remove, e.g.:
      // id: "1568296960550-0"
      let removeIds: ID[] = action.payload;
      let newDzuPreviewOrder = state.dzuPreviewOrder
          .filter(f => !removeIds.includes(f.id))
          .map((item, i) => ({ ...item, index: i}))
          // reindex using position in list,

      // console.log("NEW DZU ORDER: ", newDzuPreviewOrder)
      return {
        ...state,
        dzuPreviewOrder: newDzuPreviewOrder
      }
    }

    case A.REORDER_DZU_PREVIEW_ORDER().type: {

      let items: DzuPreviewOrder[] = action.payload
      let newItemsOrder = items.sort((a, b) => a.index - b.index);

      return {
        ...state,
        dzuPreviewOrder: newItemsOrder.map((item, i) => ({ ...item, index: i}))
        // reindex using position in list,
      }
    }

    case A.RESET_DZU_PREVIEW_ORDER().type: {
      return {
        ...state,
        dzuPreviewOrder: []
      }
    }

    case A.RESET_IMAGE_SWAP().type: {
      return initialImageSwapState
    }

    default: {
      return state
    }
  }
}


