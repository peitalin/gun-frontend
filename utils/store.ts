import { StorePrivate, UserPrivate } from "typings/gqlTypes";

export const isStoreDeleted = (store: StorePrivate) => {
  return store.isDeleted
}

export const storeDoesNotExist = (store: StorePrivate) => {
  // user who has no store/deleted store will be redirected to create a store
  return !store || (store && !store.id) || store.isDeleted
}

export const payoutDoesNotExist = (user: UserPrivate) => {
  return !user.payoutMethod?.accountName
      || !user.payoutMethod?.accountName
      || !user.payoutMethod?.accountNumber
      || !user.payoutMethod?.bsb
}

export const dealerExists = (user: UserPrivate) => {
  // user who has no store/deleted store will be redirected to create a store
  return !!user?.dealer?.id
}