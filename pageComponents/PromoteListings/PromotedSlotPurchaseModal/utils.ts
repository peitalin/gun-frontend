import React from "react";
// Graphql Queries
import {
  UserPrivate,
  ConnectionQuery,
  ProductsConnection,
  PromotedSlot,
  PromotedList,
  Role,
  Product,
  PromotionPurchaseMutationResponse,
  SoldOutStatus,
} from "typings/gqlTypes";
import dayjs from 'dayjs';



export const createProductSuggestions = (p: Product[]): GroupedSelectOption[] => {
  if (!p) {
    return []
  }

  const isAvailableProduct = (p: Product) => {
    return (
      p.isPublished
      && p.soldOutStatus === SoldOutStatus.AVAILABLE
      && !p.isSuspended
      && !p.isDeleted
      && !p.isSoldElsewhere
    )
  }

  let availableProducts = p.filter(p => {
    return isAvailableProduct(p)
  })
  let unavailableProducts = p.filter(p => {
    return !isAvailableProduct(p)
  })

  return [
    {
      label: "Available Products",
      options: [
        ...availableProducts.map(p => createProductOption(p))
      ],
    },
    {
      label: "Sold, Abandoned, Unpublished Products",
      options: [
        ...unavailableProducts.map(p => createProductOption(p))
      ],
    },
  ]
}

const createProductOption = (p: Product) => {
  return {
    label: `${p.currentSnapshot?.title} #${p.currentSnapshot?.serialNumber}`,
    value: p?.id,
  }
}

export const isSlotExpiredYet = (
  promotedSlot: PromotedSlot,
  user: UserPrivate,
) => {

  let expiresAt = promotedSlot?.expiresAt
    ? dayjs(promotedSlot?.expiresAt)
    : undefined

  let now = dayjs(new Date())

  let isExpired = expiresAt !== undefined
    ? now.unix() > expiresAt.unix()
    : true // expired by default if expiresAt is null or undefined

  let notExpiredYet = !isExpired

  let anotherUserOwnsSlot =
    !!promotedSlot?.ownerId // owner exists
    && promotedSlot?.ownerId !== user?.id // owner is not you

  let anotherUserOwnsSlotNow = anotherUserOwnsSlot && notExpiredYet

  let userOwnsSlot = promotedSlot?.ownerId === user?.id
  let userOwnsSlotNow = userOwnsSlot && notExpiredYet

  return {
    isExpired: isExpired,
    expiresAt: expiresAt,
    userOwnsSlot: userOwnsSlot,
    userOwnsSlotNow: userOwnsSlotNow,
    anotherUserOwnsSlot: anotherUserOwnsSlot,
    anotherUserOwnsSlotNow: anotherUserOwnsSlotNow,
  }
}

export interface SelectOption {
  label: string;
  value: string | any;
}
export interface GroupedSelectOption {
  label: string;
  options: SelectOption[]
}