import { Categories } from "typings/gqlTypes";
import { createSelector } from "reselect";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { centsToDollars } from "./prices";
import { oc as option } from "ts-optchain";


export const youTubeLinksSelector = createSelector(
  (state: GrandReduxState) => state.reduxProductCreate.previewItems,
  previewItems => previewItems.filter(p =>
    p.youTubeEmbedLink !== undefined  &&
    p.youTubeEmbedLink !== ""
  )
)

export const centsToDollarSelector = createSelector(
  (totalCents: number): number => totalCents,
  totalCents => centsToDollars(totalCents)
);

interface SplitCategories {
  design: Categories[],
  video: Categories[],
  sounds: Categories[],
  musicGenres: Categories[],
}

export const categorySelectors = createSelector(
  (categories: Categories[]): Categories[] => categories,
  (categories: Categories[]): SplitCategories => {
    return {
      design: categories.filter(c => c.categoryGroup === "Design"),
      video: categories.filter(c => c.categoryGroup === "Video"),
      sounds: categories.filter(c => c.categoryGroup === "Sounds"),
      musicGenres: categories.filter(c => c.categoryGroup === "Music Genres"),
    }
  }
)


