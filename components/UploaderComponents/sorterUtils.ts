import { DzuPreviewOrder, DzuPreviewItem } from "typings/dropzone";




export const reorderPreviews = ({
  oldIndex, // where item used to be
  newIndex, // where item is going to go
  dzuPreviewOrder
}: {
  oldIndex: number, // where item used to be
  newIndex: number, // where item is going to go
  dzuPreviewOrder: DzuPreviewOrder[]
}): DzuPreviewOrder[] => {

  // console.log('dzuPreviewOrder', dzuPreviewOrder)
  let item = dzuPreviewOrder.find(item => item.index === oldIndex);

  if (oldIndex < newIndex) {

    return [
      // oldIndex is before newIndex, items up to oldIndex stay the same.
      ...dzuPreviewOrder.slice(0, oldIndex),
      // items between oldIndex+1 to newIndex are shifted left (-1 index)
      // [ ..., <move-item: oldIndex>, (oldIndex+1, ..., newIndex), newIndex+1 ...]
      ...dzuPreviewOrder.slice(oldIndex + 1, newIndex + 1),
      // Dragged item goes here.
      {
        ...item,
        index: newIndex,
      },
      // everything after newIndex stays the same
      ...dzuPreviewOrder.slice(newIndex + 1),
    ].map((item , i) => ({ ...item, index: i }))
    // use position in list to enumerate index: i

  } else if (oldIndex > newIndex) {

    return [
      // newIndex is before oldIndex, items up to newIndex stay the same.
      // everything before newIndex stays the same
      ...dzuPreviewOrder.slice(0, newIndex),
      // Dragged item goes here.
      {
        ...item,
        index: newIndex,
      },
      // items between newIndex ~ oldIndex come after
      ...dzuPreviewOrder.slice(newIndex, oldIndex),
      // we skip the index where the item came from with oldIndex + 1
      ...dzuPreviewOrder.slice(oldIndex + 1),
    ].map((item , i) => ({ ...item, index: i }))
    // use position in list to enumerate index: i

  } else {

    return dzuPreviewOrder

  }
};

import { Dispatch } from "redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions, ActionType } from "reduxStore/actions";

interface OnSortEndInput {
  dispatch: Dispatch<ActionType<DzuPreviewOrder[]>>;
  actions: typeof Actions.reduxProductCreate | typeof Actions.reduxProductEdit;
  dzuPreviewOrder: DzuPreviewOrder[];
}

export const makeOnSortEndHandler = ({ dispatch, actions, dzuPreviewOrder }: OnSortEndInput) =>
({ oldIndex, newIndex }) => {
  // create new order from existing previews
  // console.log("oldIndex", oldIndex)
  // console.log("newIndex", newIndex)
  // console.log("dzuPreviewOrder", dzuPreviewOrder)
  let newDzuOrder = reorderPreviews({ oldIndex, newIndex, dzuPreviewOrder })
  // console.log("newDzuOrder", newDzuOrder)
  // then sort the arrays by position
  dispatch(actions.REORDER_DZU_PREVIEW_ORDER(newDzuOrder))
};

interface HandleRemoveInput {
  dispatch: Dispatch<ActionType<string[]>>;
  actions: typeof Actions.reduxProductCreate | typeof Actions.reduxProductEdit;
}

export const makeHandleRemoveHandler = ({ dispatch, actions }: HandleRemoveInput) =>
(previewId) => {
  dispatch(actions.REMOVE_PREVIEW_ITEMS([ previewId ]));
  // payload is a list of DropZone Uploader meta.id to remove, e.g.:
  // ids: ["1568296960550-0"]
  dispatch(actions.REMOVE_DZU_PREVIEW_ORDER([ previewId ]))
}

