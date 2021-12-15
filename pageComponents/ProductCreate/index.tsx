import React from "react";
// Styles
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Gradients, Colors, BoxShadows } from "layout/AppTheme";
// Components
import ProductCreatePage from "./ProductCreatePage";
import BannerCreateProduct from "./BannerCreateProduct";
// Router
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
