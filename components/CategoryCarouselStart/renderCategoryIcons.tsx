
import { BorderRadius2x, Colors, BorderRadius, isThemeDark } from "layout/AppTheme";
import CategoryRifles from "components/Icons/CategoryRifles";
import CategoryHandguns from "components/Icons/CategoryHandguns";
import CategoryShotguns from "components/Icons/CategoryShotguns";
import CategoryCombinations from "components/Icons/CategoryCombinations";


type CategorySlug = "rifles" | "handguns" | "shotguns" | "combinations";


export const renderCategoryIcon = (
  slug: string | CategorySlug,
  isDark: boolean
) => {
  switch (slug) {
    case "rifles": {
      return <CategoryRifles color={
        Colors.uniswapLightGrey
        // isDark ?  Colors.uniswapLightestGrey : Colors.slateGreyBlack
      }/>
    }
    case "handguns": {
      return <CategoryHandguns color={
        Colors.uniswapLightGrey
        // isDark ?  Colors.uniswapLightestGrey : Colors.slateGreyBlack
      }/>
    }
    case "shotguns": {
      return <CategoryShotguns color={
        Colors.uniswapLightGrey
        // isDark ?  Colors.uniswapLightestGrey : Colors.slateGreyBlack
      }/>
    }
    case "combinations": {
      return <CategoryCombinations color={
        Colors.uniswapLightGrey
        // isDark ?  Colors.uniswapLightestGrey : Colors.slateGreyBlack
      }/>
    }
    case "items": {
      return <CategoryCombinations color={
        Colors.uniswapLightGrey
        // isDark ?  Colors.uniswapLightestGrey : Colors.slateGreyBlack
      }/>
    }
    default: {
      return <CategoryRifles color={
        Colors.uniswapLightGrey
        // isDark ?  Colors.uniswapLightGrey : Colors.slateGreyDarkest
      }/>
    }
  }
}