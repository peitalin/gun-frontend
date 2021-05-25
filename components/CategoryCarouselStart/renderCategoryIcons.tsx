
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
        isDark ?  Colors.uniswapLightGrey : Colors.black
      }/>
    }
    case "handguns": {
      return <CategoryHandguns color={
        isDark ?  Colors.uniswapLightGrey : Colors.black
      }/>
    }
    case "shotguns": {
      return <CategoryShotguns color={
        isDark ?  Colors.uniswapLightGrey : Colors.black
      }/>
    }
    case "combinations": {
      return <CategoryCombinations color={
        isDark ?  Colors.uniswapLightGrey : Colors.black
      }/>
    }
    default: {
      return <CategoryRifles color={
        isDark ?  Colors.uniswapLightGrey : Colors.black
      }/>
    }
  }
}