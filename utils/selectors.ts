import { CartItem, Cart, ProductCategory } from "typings/gqlTypes";
import { createSelector } from "reselect";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { centsToDollars } from "./prices";
import { oc as option } from "ts-optchain";


// export const youTubeLinksSelector = createSelector(
//   (state: GrandReduxState) => state.reduxProductCreate.previewItems,
//   previewItems => previewItems.filter(p =>
//     p.youTubeEmbedLink !== undefined  &&
//     p.youTubeEmbedLink !== ""
//   )
// )

export const centsToDollarSelector = createSelector(
  (totalCents: number): number => totalCents,
  totalCents => centsToDollars(totalCents)
);

export const subtotalSelector = createSelector(
  (cartItems: CartItem[]): CartItem[] => cartItems,
  (cartItems: CartItem[]): number => {
    return cartItems.reduce((subtotal, item) => {
      return subtotal + option(item).product.chosenVariant.price(0)
    }, 0);
  }
)

export const numCartItemsSelector = createSelector(
  (cartItems: CartItem[]): CartItem[] => cartItems,
  (cartItems: CartItem[]): number => {
    return cartItems.length
  }
)


interface SplitCategories {
  design: ProductCategory[],
  video: ProductCategory[],
  sounds: ProductCategory[],
  musicGenres: ProductCategory[],
}

export const categorySelectors = createSelector(
  (categories: ProductCategory[]): ProductCategory[] => categories,
  (categories: ProductCategory[]): SplitCategories => {
    return {
      design: categories.filter(c => c.categoryGroup === "Design"),
      video: categories.filter(c => c.categoryGroup === "Video"),
      sounds: categories.filter(c => c.categoryGroup === "Sounds"),
      musicGenres: categories.filter(c => c.categoryGroup === "Music Genres"),
    }
  }
)


