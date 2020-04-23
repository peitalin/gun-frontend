import { DzuPreviewOrder, DzuPreviewItem } from "typings/dropzone";



export const reorderPreviews = ({
  oldIndex,
  newIndex,
  dzuPreviewOrder
}): DzuPreviewOrder[] => {

  // console.log('dzuPreviewOrder', dzuPreviewOrder)
  let item = dzuPreviewOrder.find(item => item.index === oldIndex);

  if (oldIndex < newIndex) {

    return [
      // oldIndex is before newIndex, items up to oldIndex stay the same.
      ...dzuPreviewOrder.slice(0, oldIndex),
      // items between oldIndex+1 to newIndex are shifted left (-1 index)
      // [ ..., <move-item: oldIndex>, (oldIndex+1, ..., newIndex), newIndex+1 ...]
      ...dzuPreviewOrder.slice(oldIndex + 1, newIndex + 1).map(i => {
        return {
          ...i,
          index: i.index - 1, // update index
        }
      }),
      // Dragged item goes here.
      {
        ...item,
        index: newIndex,
      },
      // everything after newIndex stays the same
      ...dzuPreviewOrder.slice(newIndex + 1),
    ];

  } else if (oldIndex > newIndex) {

    return [
      // newIndex is before oldIndex, items up to newIndex stay the same.
      ...dzuPreviewOrder.slice(0, newIndex),
      // items between newIndex ~ oldIndex are shifted right (+1 index)
      // [ ..., (newIndex, ..., oldIndex-1), <move-item: oldIndex>, oldIndex+1 ...]
      ...dzuPreviewOrder.slice(newIndex, oldIndex).map(i => {
        return {
          ...i,
          index: i.index + 1,
        }
      }),
      // Dragged item goes here.
      {
        ...item,
        index: newIndex,
      },
      // everything after oldIndex stays the same
      ...dzuPreviewOrder.slice(oldIndex + 1),
    ];

  } else {

    return dzuPreviewOrder

  }
};
