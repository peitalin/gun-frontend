import { ActionType, Actions } from './actions'
import {
  reduxProductEditActions as A,
} from "./product_edit-actions";
import { EditVariantInput } from "./product_create-actions";
import {
  ID,
  ProductEditInput,
  ProductPreviewItemInput,
  ProductVariantEditInput,
} from "typings/gqlTypes";
import {
  DzuFilePreview,
  DzuPreviewOrder,
  DzuPreviewItem
} from "typings/dropzone";
import { ProductEditInputFrontEnd } from "typings";


///// state reducer //////////
export interface ReduxStateProductEdit {
  productEditInput: ProductEditInputFrontEnd;
  // previewItems are replicated across all variants,
  // until we decide to allow these fields to vary between variants
  dzuPreviewItems: DzuPreviewItem[],
  // for tracking/persisting previews
  dzuPreviewOrder: DzuPreviewOrder[],
}


const initialProductEditState: ReduxStateProductEdit = {
  productEditInput: {
    productId: "",
    categoryId: "",
    title: "",
    description: "<p></p>",
    condition: "",
    make: "",
    model: "",
    ammoType: "",
    actionType: "",
    caliber: "",
    serialNumber: "",
    location: "",
    magazineCapacity: "",
    barrelLength: "",
    dealerId: "",
    currentVariants: [
      {
        variantId: "variant_id",
        variantName: "Standard",
        variantDescription: "Standard variant",
        priceWas: 0,
        price: 0,
        isDefault: true,
        previewItems: [],
        quantityAvailable: null
      }
    ],
    isPublished: false,
    allowBids: true,
    sellerLicenseId: "",
  },
  dzuPreviewItems: [],
  dzuPreviewOrder: [],
}


export const reduxReducerProductEdit = (
  state: ReduxStateProductEdit = initialProductEditState,
  action: ActionType
): ReduxStateProductEdit => {

  // console.info("ReduxProductEdit payload: ", action.payload)

  switch ( action.type ) {

    case A.UPDATE_PRODUCT_EDIT().type: {
      return {
        ...state,
        productEditInput: {
          ...state.productEditInput,
          ...action.payload
        }
      }
    }

    case A.UPDATE_TITLE().type: {
      return {
        ...state,
        productEditInput: {
          ...state.productEditInput,
          title: action.payload
        }
      }
    }

    case A.UPDATE_DESCRIPTION().type: {
      return {
        ...state,
        productEditInput: {
          ...state.productEditInput,
          description: action.payload
        }
      }
    }

    case A.UPDATE_CATEGORY_ID().type: {
      return {
        ...state,
        productEditInput: {
          ...state.productEditInput,
          categoryId: action.payload
        }
      }
    }

    case A.IS_PUBLISHED().type: {
      return {
        ...state,
        productEditInput: {
          ...state.productEditInput,
          isPublished: action.payload
        }
      }
    }

    /////// Variants ///////

    case A.ADD_VARIANTS().type: {

      let newVariants: EditVariantInput[] = action.payload
      let { dzuPreviewItems } = state;

      return {
        ...state,
        productEditInput: {
          ...state.productEditInput,
          currentVariants: [
            ...state.productEditInput.currentVariants,
            ...newVariants.map(v => {
              return {
                price: 0,
                priceWas: 0,
                variantDescription: "",
                variantName: "",
                isDefault: false,
                previewItems: dzuPreviewItems,
                quantityAvailable: null,
                ...v,
              }
            })
          ]
        }
      }
    }

    case A.REMOVE_VARIANT().type: {

      let position = action.payload
      let { currentVariants } = state.productEditInput;

      return {
        ...state,
        productEditInput: {
          ...state.productEditInput,
          currentVariants: [
            ...currentVariants.slice(0, position),
            ...currentVariants.slice(position + 1)
          ]
        }
      }
    }

    case A.SET_IS_DEFAULT().type: {

      let position = action.payload
      let { currentVariants } = state.productEditInput;

      return {
        ...state,
        productEditInput: {
          ...state.productEditInput,
          currentVariants: [
            ...currentVariants.map((variant, i) => {
              if (i === position) {
                return { ...variant, isDefault: true }
              } else {
                return { ...variant, isDefault: false }
              }
            })
          ]
        }
      }
    }

    case A.UPDATE_PRICE().type: {

      let { price, position }: { price: number, position: number } = action.payload
      let variant = state.productEditInput.currentVariants[position]
      let { currentVariants } = state.productEditInput;

      return {
        ...state,
        productEditInput: {
          ...state.productEditInput,
          currentVariants: [
            ...currentVariants.slice(0, position),
            { ...variant, price: price },
            ...currentVariants.slice(position + 1)
          ]
        }
      }
    }

    case A.UPDATE_PRICE_WAS().type: {

      let { priceWas, position }: { priceWas: number, position: number } = action.payload
      let variant = state.productEditInput.currentVariants[position]
      let { currentVariants } = state.productEditInput;

      return {
        ...state,
        productEditInput: {
          ...state.productEditInput,
          currentVariants: [
            ...currentVariants.slice(0, position),
            { ...variant, priceWas: priceWas },
            ...currentVariants.slice(position + 1)
          ]
        }
      }
    }

    case A.UPDATE_VARIANT_NAME().type: {
      let {
        variantName,
        position
      }: { variantName: string, position: number } = action.payload

      let variant = state.productEditInput.currentVariants[position]
      let { currentVariants } = state.productEditInput;

      return {
        ...state,
        productEditInput: {
          ...state.productEditInput,
          currentVariants: [
            ...currentVariants.slice(0, position),
            { ...variant, variantName: variantName },
            ...currentVariants.slice(position + 1)
          ]
        }
      }
    }

    case A.UPDATE_VARIANT_DESCRIPTION().type: {
      let {
        variantDescription,
        position
      }: { variantDescription: string, position: number } = action.payload

      let variant = state.productEditInput.currentVariants[position]
      let { currentVariants } = state.productEditInput;

      return {
        ...state,
        productEditInput: {
          ...state.productEditInput,
          currentVariants: [
            ...currentVariants.slice(0, position),
            { ...variant, variantDescription: variantDescription },
            ...currentVariants.slice(position + 1)
          ]
        }
      }
    }

    case A.SET_PREVIEW_ITEMS().type: {

      let previewItemInputs: DzuPreviewItem[] = action.payload;
      let { currentVariants } = state.productEditInput;

      return {
        ...state,
        productEditInput: {
          ...state.productEditInput,
          currentVariants: currentVariants.map(variant => {
            return {
              ...variant,
              previewItems: previewItemInputs.map((f, i) => {
                return {
                  id: f.id,
                  position: i,
                  imageId: f.fileId,
                  youTubeVimeoEmbedLink: f.youTubeVimeoEmbedLink,
                }
              })
            }
          })
        },
        dzuPreviewItems: previewItemInputs,
        dzuPreviewOrder: previewItemInputs
          .map((p, i) => ({ id: p.id, index: i }))
      }
    }

    case A.ADD_PREVIEW_ITEMS().type: {

      let { currentVariants } = state.productEditInput;

      let inputPreviewItems: DzuPreviewItem[] = action.payload;
      let newPreviewItems = [
        ...state.dzuPreviewItems,
        ...inputPreviewItems,
      ]

      return {
        ...state,
        productEditInput: {
          ...state.productEditInput,
          currentVariants: currentVariants.map(variant => {
            return {
              ...variant,
              previewItems: newPreviewItems.map((f, i) => {
                return {
                  id: f.id,
                  position: i,
                  imageId: f.fileId,
                  youTubeVimeoEmbedLink: f.youTubeVimeoEmbedLink,
                }
              })
            }
          })
        },
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
          productEditInput: {
            ...state.productEditInput,
            currentVariants: state.productEditInput.currentVariants.map(variant => {
              return {
                ...variant,
                previewItems: newPreviewItems.map((f, i) => {
                  return {
                    id: f.id,
                    position: i,
                    imageId: f.fileId,
                    youTubeVimeoEmbedLink: f.youTubeVimeoEmbedLink,
                  }
                })
              }
            })
            // update every variant to match
          },
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

        console.log('removeing', ids)

      return {
        ...state,
        productEditInput: {
          ...state.productEditInput,
            currentVariants: state.productEditInput.currentVariants.map(variant => {
              return {
                ...variant,
                previewItems: newPreviewItems.map((f, i) => {
                  return {
                    id: f.id,
                    position: i,
                    imageId: f.fileId,
                    youTubeVimeoEmbedLink: f.youTubeVimeoEmbedLink,
                  }
                })
              }
            })
            // update every variant to match
        },
        dzuPreviewItems: newPreviewItems
      }
    }

    case A.REORDER_PREVIEW_ITEMS().type: {

      let previewItemsReordered: DzuPreviewItem[] =
        action.payload.sort((a, b) => a.position - b.position);

      let { currentVariants } = state.productEditInput;

      return {
        ...state,
        productEditInput: {
          ...state.productEditInput,
          currentVariants: currentVariants.map(variant => {
            return {
              ...variant,
              previewItems: previewItemsReordered.map((f, i) => {
                return {
                  id: f.id,
                  position: i,
                  imageId: f.fileId,
                  youTubeVimeoEmbedLink: f.youTubeVimeoEmbedLink,
                }
              })
            }
          })
        },
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

    case A.RESET_PRODUCT_EDIT().type: {
      return initialProductEditState
    }

    default: {
      return state
    }
  }
}


