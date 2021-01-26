import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Typings
import { ProductsConnection, ConnectionOffsetQuery } from "typings/gqlTypes";
// Components
import dynamic from "next/dynamic";
import NewReleaseProducts from "pageComponents/FrontPage/NewReleaseProducts";
import FeaturedProducts from "pageComponents/FrontPage/FeaturedProducts";
import Loading from "components/Loading";
// import ProductCreatePage from "./ProductCreatePage";
import BannerHome from "components/BannerHome";
// Router
import { Colors, Gradients } from "layout/AppTheme";
// GraphQL
import { useQuery, useApolloClient } from "@apollo/client";

// Category Component
// import CategoryIdOrName from "pageComponents/Categories/CategoryIdOrName";
import AlignCenterLayout from "components/AlignCenterLayout";
export const MAX_WIDTH_GRID: number = 1160;
// show exactly 4 product cards in carousel + 1rem padding on left
// 270px each card (including margin of 16px) = 290



const FrontPage: React.FC<ReactProps> = (props) => {

  const {
    classes,
    initialFeaturedProducts,
  } = props;

  const aClient = useApolloClient();

  // const theme = useTheme();
  // const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  // const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  // const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.outerContainer}>

      <BannerHome />

      <AlignCenterLayout
        maxWidth={MAX_WIDTH_GRID || 1160}
        withRecommendations={true}
      >

        <FeaturedProducts
          initialFeaturedProducts={initialFeaturedProducts}
          count={4}
          cardsPerRow={{
            xs: 1.5,
            sm: 1.5,
            md: 2,
            lg: 3,
            xl: 4,
          }}
        />

        {/* <FeaturedProducts
          initialFeaturedProducts={initialFeaturedProducts}
          count={4}
          offset={2} // for demo purposes
          cardsPerRow={{
            xs: 1.5,
            sm: 1.5,
            md: 2,
            lg: 3,
            xl: 4,
          }}
        /> */}

        {/* <NewReleaseProducts
          initialProducts={undefined}
          count={32}
          title={"New Releases"}
        /> */}

      </AlignCenterLayout>

    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  initialFeaturedProducts?: ProductsConnection;
}
interface QueryData {
  productsAllConnection: ProductsConnection;
}
interface QueryVar {
  query: ConnectionOffsetQuery
}


const styles = (theme: Theme) => createStyles({
  modalBackdrop: {
    backgroundColor: "rgba(47, 57, 65, .85)",
  },
  modalPaperScrollPaper: {
    // maxHeight: "calc(100% - 32px)",
  },
  fullMaxHeight: {
    maxHeight: "100%",
    width: '100%',
  },
  outerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    // background: theme.gradients.gradientUniswapDark.background,
    // background: Gradients.gradientUniswapDark.background,
    // background: Colors.uniswapDarkNavy,
  },
  flexRowInner: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productColumn60: {
    flexBasis: '60%',
    flexGrow: 1,
    minWidth: 360,
  },
  productColumn40: {
    flexBasis: '40%',
    flexGrow: 1,
    minWidth: 280,
  },
  maxWidth: {
    maxWidth: '1160px', // 4 products per row
  },
});


export default withStyles(styles)( FrontPage );
