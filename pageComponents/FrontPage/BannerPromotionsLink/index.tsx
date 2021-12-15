import React from "react";
// styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, isThemeDark } from "layout/AppTheme";
import { styles } from "./styles";
// typings
import Hidden from 'components/HiddenFix';
import BannerPromotionsLinkDesktop from "./BannerPromotionsLinkDesktop";
import BannerPromotionsLinkMobile from "./BannerPromotionsLinkMobile";
// CSS
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



const BannerPromotionsLink: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const theme = useTheme();
  const isDarkMode = isThemeDark(theme)

  // const bannerImageUrl = "/img/banner10.jpg"

  const bannerDitherMobile = isDarkMode
    ? 'linear-gradient(130deg, rgba(25,25,25,0.2) 10%, rgba(25,25,25,0.4) 90%)'
    : 'linear-gradient(130deg, rgba(245,245,245,0.2) 10%, rgba(245,245,245,0.4) 90%)'

  const bannerDither = isDarkMode
    ? 'linear-gradient(130deg, rgba(25,25,25,0.2) 10%, rgba(25,25,25,0.4) 90%)'
    : 'linear-gradient(130deg, rgba(245,245,245,0.2) 10%, rgba(245,245,245,0.4) 90%)'
  // console.log("categorySlugForGql: ", props.categorySlug)

  return <>
    {/* Mobile */}
    <Hidden mdUp implementation='css' className={classes.width100}>
      <BannerPromotionsLinkMobile
        bannerForegroundImageUrl={undefined}
        bannerBackgroundImageUrl={undefined}
        bannerDither={bannerDitherMobile}
      />
    </Hidden>
    {/* Desktop */}
    <Hidden mdDown implementation="css" className={classes.width100}>
      <BannerPromotionsLinkDesktop
        bannerForegroundImageUrl={undefined}
        bannerBackgroundImageUrl={undefined}
        bannerDither={bannerDither}
      />
    </Hidden>
  </>;
}


interface ReactProps extends WithStyles<typeof styles> {
}


export default withStyles(styles)(BannerPromotionsLink);






