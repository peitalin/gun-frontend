import React from "react";
// styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, isThemeDark } from "layout/AppTheme";
import { styles } from "./styles";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
// typings
import Hidden from 'components/HiddenFix';
import BannerCreateProductDesktop from "./BannerCreateProductDesktop";
import BannerCreateProductMobile from "./BannerCreateProductMobile";
import { useTheme } from "@mui/material";



const BannerCreateProduct: React.FC<ReactProps> = (props) => {

  const {
    classes,
    disableMetaHeader = false,
  } = props;

  const theme = useTheme()

  const bannerImageUrl = undefined
  const bannerImageUrlMobile = undefined

  const bannerDitherMobile = isThemeDark(theme)
    ? 'linear-gradient(0deg, rgba(25,25,25,0.3) 10%, rgba(25,25,25,0.3) 90%)'
    : 'linear-gradient(0deg, rgba(25,25,25,0.01) 10%, rgba(25,25,25,0.01) 90%)'

  const bannerDither = isThemeDark(theme)
    ? 'linear-gradient(30deg, rgba(25,25,25,0.3) 10%, rgba(25,25,25,0.3) 90%)'
    : 'linear-gradient(30deg, rgba(25,25,25,0.01) 10%, rgba(25,25,25,0.01) 90%)'


  return <>
    {
      !disableMetaHeader &&
      <MetaHeadersPage
        title={`Upload Product Listings`}
        description={`List your products`}
      />
    }

    {/* Mobile */}
    <Hidden mdUp implementation='css' className={classes.width100}>
      <BannerCreateProductMobile
        bannerForegroundImageUrl={undefined}
        bannerBackgroundImageUrl={bannerImageUrlMobile}
        bannerDither={bannerDitherMobile}
      />
    </Hidden>
    {/* Desktop */}
    <Hidden mdDown implementation="css" className={classes.width100}>
      <BannerCreateProductDesktop
        bannerForegroundImageUrl={undefined}
        bannerBackgroundImageUrl={bannerImageUrl}
        bannerDither={bannerDither}
      />
    </Hidden>
  </>;
}


interface ReactProps extends WithStyles<typeof styles> {
  disableMetaHeader?: boolean
}


export default withStyles(styles)(BannerCreateProduct);






