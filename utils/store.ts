import { StorePrivate, UserPrivate } from "typings/gqlTypes";

export const isStoreDeleted = (store: StorePrivate) => {
  return store.name === "Deleted Store"
}

export const storeDoesNotExist = (store: StorePrivate) => {
  // user who has no store/deleted store will be redirected to create a store
  return !store || (store && !store.id) || isStoreDeleted(store)
}

export const dealerExists = (user: UserPrivate) => {
  // user who has no store/deleted store will be redirected to create a store
  return !!user?.dealer?.id
}