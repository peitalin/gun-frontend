import { Colors, BoxShadows, BorderRadius, Gradients, isThemeDark } from "layout/AppTheme";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";


export const lgUpMediaQuery = '(min-width:1024px)';
export const below1024Query = '(max-width:1024px)';
// this is the breakpoint for deciding when to apply IPAD
export const col1MinWidth = 684;
export const col2MinWidth = 340;


export const commonBorderStyle = (theme: Theme) => {
  return {
    boxShadow: isThemeDark(theme)
      ? BoxShadows.shadow1.boxShadow
      : BoxShadows.shadow5.boxShadow,
    border: isThemeDark(theme)
      ? `1px solid ${theme.colors.uniswapGrey}`
      : `unset`,
  }
}