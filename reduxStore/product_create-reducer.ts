import { ActionType, Actions } from './actions'
import {
  reduxProductCreateActions as A,
  AddVariantInput,
} from "./product_create-actions";
import {
  ID,
  ProductPreviewItem,
  ProductCreateInput,
  VariantsLabel,
  QuantityLabel,
} from "typings/gqlTypes";
import {
  DzuFilePreview,
  DzuPreviewOrder,
  DzuPreviewItem
} from "typings/dropzone";




////// state reducer //////////

export interface ReduxStateProductCreate {
  productCreateInput: ProductCreateInput;
  // fileIds and previewItems are replicated across all variants,
  // until we decide to allow these fields to vary between variants
  previewItems: DzuPreviewItem[],
  // for tracking/persisting previews
  dzuFiles: DzuFilePreview[],
  dzuPreviewOrder: DzuPreviewOrder[],
}

export const initialProductCreateState: ReduxStateProductCreate = {
  productCreateInput: {
    categoryId: "",
    tags: [],
    name: "",
    tagline: "",
    description: "",
    currentVariants: [
      {
        variantName: "Regular License",
        variantDescription: "Regular License for General Use",
        isDefault: true,
        priceWas: undefined,
        price: undefined,
        fileIds: [],
        previewItems: [],
        specialDeal: null,
        // specialDeal: {
        //   discountedPrice: 0,
        //   timeCondition: {
        //     start: new Date(),
        //     end: new Date(),
        //     timeExpiryRule: DiscountUnavailableRule.DISABLE_DISCOUNT,
        //   },
        //   stockLimitCondition: {
        //     quantityAvailable: 1,
        //     supplyExhaustionRule: DiscountUnavailableRule.DISABLE_DISCOUNT,
        //   },
        // }
        quantityAvailable: null
      }
    ],
    isPublished: false,
    variantsLabel: VariantsLabel.LICENSE,
    isQuantityEnabled: false,
    quantityLabel: QuantityLabel.SEATS
  },
  previewItems: [],
  dzuFiles: [],
  dzuPreviewOrder: [],
}


export const reduxReducerProductCreate = (
  state: ReduxStateProductCreate = initialProductCreateState,
  action: ActionType
): ReduxStateProductCreate => {

  // console.info("ReduxProductCreate payload: ", action.payload)

  switch ( action.type ) {

    case A.UPDATE_PRODUCT_CREATE().type: {
      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
          ...action.payload
        }
      }
    }

    case A.UPDATE_NAME().type: {
      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
          name: action.payload
        }
      }
    }

    case A.UPDATE_TAGLINE().type: {
      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
          tagline: action.payload
        }
      }
    }

    case A.UPDATE_DESCRIPTION().type: {
      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
          description: action.payload
        }
      }
    }

    case A.UPDATE_CATEGORY_ID().type: {
      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
          categoryId: action.payload
        }
      }
    }

    case A.UPDATE_STORE_ID().type: {
      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput
        }
      }
    }

    case A.UPDATE_TAGS().type: {
      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
          tags: action.payload
        }
      }
    }

    case A.PUBLISH_IMMEDIATELY().type: {
      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
          isPublished: action.payload
        }
      }
    }

    /////// Variants ///////

    case A.ADD_VARIANTS().type: {

      let newVariants: AddVariantInput[] = action.payload
      let { fileIds, previewItems } = state.productCreateInput.currentVariants[0];

      let newCurrentVariants = [
        ...state.productCreateInput.currentVariants,
        ...newVariants.map(v => {
          return {
            price: 0,
            priceWas: 0,
            variantDescription: "",
            variantName: "",
            isDefault: false,
            fileIds: fileIds,
            previewItems: previewItems,
            specialDeal: null,
            quantityAvailable: null,
            ...v,
          }
        })
      ]

      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
          currentVariants: newCurrentVariants
        }
      }
    }

    case A.REMOVE_VARIANT().type: {

      let position = action.payload
      let { currentVariants } = state.productCreateInput;

      let newVariants;
      if (currentVariants[position].isDefault) {
        newVariants = [
          ...currentVariants.slice(0, position),
          ...currentVariants.slice(position + 1)
        ]
        // if deleting a variant which isDefault, first variant is now default
        newVariants = [
          { ...newVariants[0], isDefault: true },
          ...newVariants.slice(1)
        ]
      } else {
        newVariants = [
          ...currentVariants.slice(0, position),
          ...currentVariants.slice(position + 1)
        ]
      }

      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
          currentVariants: newVariants
        }
      }
    }

    case A.SET_IS_DEFAULT().type: {

      let position = action.payload

      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
          currentVariants: [
            ...state.productCreateInput.currentVariants.map((variant, i) => {
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
      let variant = state.productCreateInput.currentVariants[position]

      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
          currentVariants: [
            ...state.productCreateInput.currentVariants.slice(0, position),
            { ...variant, price: price },
            ...state.productCreateInput.currentVariants.slice(position + 1)
          ]
        }
      }
    }

    case A.UPDATE_PRICE_WAS().type: {

      let { priceWas, position }: { priceWas: number, position: number } = action.payload
      let variant = state.productCreateInput.currentVariants[position]

      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
          currentVariants: [
            ...state.productCreateInput.currentVariants.slice(0, position),
            { ...variant, priceWas: priceWas },
            ...state.productCreateInput.currentVariants.slice(position + 1)
          ]
        }
      }
    }

    case A.UPDATE_VARIANT_NAME().type: {
      let {
        variantName,
        position
      }: { variantName: string, position: number } = action.payload

      let variant = state.productCreateInput.currentVariants[position]

      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
          currentVariants: [
            ...state.productCreateInput.currentVariants.slice(0, position),
            { ...variant, variantName: variantName },
            ...state.productCreateInput.currentVariants.slice(position + 1)
          ]
        }
      }
    }

    case A.UPDATE_VARIANT_DESCRIPTION().type: {
      let {
        variantDescription,
        position
      }: { variantDescription: string, position: number } = action.payload

      let variant = state.productCreateInput.currentVariants[position]

      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
          currentVariants: [
            ...state.productCreateInput.currentVariants.slice(0, position),
            { ...variant, variantDescription: variantDescription },
            ...state.productCreateInput.currentVariants.slice(position + 1)
          ]
        }
      }
    }

    //// FILE AND PREVIEW UPLOAD ITEMS

    case A.SET_PREVIEW_ITEMS().type: {

      let previewItemInputs: DzuPreviewItem[] = action.payload;
      let { currentVariants } = state.productCreateInput;

      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
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
        previewItems: previewItemInputs
      }
    }

    case A.ADD_PREVIEW_ITEMS().type: {

      let inputPreviewItems: DzuPreviewItem[] = action.payload;
      let newPreviewItems = [
        ...state.previewItems,
        ...inputPreviewItems,
      ]

      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
          currentVariants: state.productCreateInput.currentVariants.map(variant => {
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
        previewItems: newPreviewItems
      }
    }


    case A.UPDATE_PREVIEW_ITEM().type: {

      let newPreviewItem: DzuPreviewItem = action.payload;

      let updateIndex = state.previewItems.findIndex(p => p.id === newPreviewItem.id);

      let newPreviewItems = [
        ...state.previewItems.slice(0, updateIndex),
        newPreviewItem,
        ...state.previewItems.slice(updateIndex + 1),
      ]

      if (updateIndex >= 0) {
        return {
          ...state,
          productCreateInput: {
            ...state.productCreateInput,
            currentVariants: state.productCreateInput.currentVariants.map(variant => {
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
          previewItems: newPreviewItems
        }
      } else {
        console.debug("previewItem not found in redux: ", newPreviewItem.id)
        return state
      }
    }

    case A.REMOVE_PREVIEW_ITEMS().type: {
      // payload is a imageId to remove
      let ids: ID[] = action.payload;
      let newPreviewItems = state.previewItems
          .filter(item => !ids.some(id => id === item.id))

      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
            currentVariants: state.productCreateInput.currentVariants.map(variant => {
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
        previewItems: newPreviewItems
      }
    }

    case A.REORDER_PREVIEW_ITEMS().type: {

      let previewItemsReordered: DzuPreviewItem[] =
        action.payload.sort((a, b) => a.position - b.position);

      let { currentVariants } = state.productCreateInput;

      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
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
        previewItems: previewItemsReordered
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

      return {
        ...state,
        dzuPreviewOrder: newDzuPreviewOrder
      }
    }

    case A.REORDER_DZU_PREVIEW_ORDER().type: {

      let items: DzuPreviewOrder[] = action.payload;
      let newItemsOrder = items.sort((a, b) => a.index - b.index);

      return {
        ...state,
        dzuPreviewOrder: newItemsOrder
      }
    }

    case A.RESET_DZU_PREVIEW_ORDER().type: {
      return {
        ...state,
        dzuPreviewOrder: []
      }
    }

    case A.ADD_DZU_FILES().type: {

      let newDzuFiles: DzuFilePreview[] = [...state.dzuFiles, ...action.payload];

      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
          currentVariants: state.productCreateInput.currentVariants.map(variant => {
            return {
              ...variant,
              fileIds: newDzuFiles.map(f => f.fileId)
            }
          })
        },
        dzuFiles: newDzuFiles
      }
    }

    case A.REMOVE_DZU_FILES().type: {
      // payload is a DropZone Uploader meta.id to remove, e.g.:
      // id: "1568296960550-0"
      let removeIds: ID[] = action.payload;
      let newDzuFiles = state.dzuFiles.filter(f => !removeIds.includes(f.id))

      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
          currentVariants: state.productCreateInput.currentVariants.map(variant => {
            return {
              ...variant,
              fileIds: newDzuFiles.map(f => f.fileId)
            }
          })
        },
        dzuFiles: newDzuFiles
      }
    }

    case A.RESET_DZU_FILES().type: {
      return {
        ...state,
        productCreateInput: {
          ...state.productCreateInput,
          currentVariants: state.productCreateInput.currentVariants.map(variant => {
            return {
              ...variant,
              fileIds: []
            }
          })
        },
        dzuFiles: []
      }
    }

    case A.RESET_PRODUCT_CREATE().type: {
      return initialProductCreateState
    }

    default: {
      return state
    }
  }
}


