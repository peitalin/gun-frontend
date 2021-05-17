import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Gradients, Colors, BoxShadows } from "layout/AppTheme";
// Components
import ProductCreatePage from "./ProductCreatePage";
import BannerCreateProduct from "./BannerCreateProduct";
import { useScrollYPosition } from "utils/hooks";
// Router
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AlignCenterLayout from "components/AlignCenterLayout";




const ProductCreate: React.FC<ReactProps> = (props) => {

  const { classes, children } = props;
  // const theme = useTheme();

  return (
    <div className={classes.outerContainer}>
      <div className={classes.bannerOuter}>
        <BannerCreateProduct/>
      </div>
      <AlignCenterLayout
        className={classes.justifyCenter}
        withRecommendations={false}
        maxWidth={1200}
      >
        <ProductCreatePage />
      </AlignCenterLayout>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  outerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    // backgroundColor: Colors.darkWhite,
  },
  bannerOuter: {
    position: 'relative',
    width: '100%',
  },
  justifyCenter: {
    justifyContent: "center",
  },
});


export default withStyles(styles)( ProductCreate );
