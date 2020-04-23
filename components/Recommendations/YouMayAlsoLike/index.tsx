import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import clsx from "clsx";
// Graphql
import {
  GET_RECOMMENDED_PRODUCTS,
  GET_DEALS_ENDING_SOON_PRODUCTS,
  GET_LIMITED_RELEASE_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
} from "queries/products-queries";
// Typings
import { Product, ProductsConnection, WishlistItem } from "typings/gqlTypes";
// Paginator hooks
import { ConnectionQueryProps } from "components/Paginators/usePaginateQueryHook";
import NewReleaseProducts from "pageComponents/ProductGallery/NewReleaseProducts";
import YouMayAlsoLikeRecommendations from "./YouMayAlsoLikeRecommendations";



const YouMayAlsoLike = (props: ReactProps) => {

  const { classes, title, initialProducts } = props;
  const count = 8;

  return (
    <div className={classes.recommendationsContainer}
      style={{ maxWidth: props.maxWidth }}
    >
      <YouMayAlsoLikeRecommendations
        count={count}
        title={title}
      />
    </div>
  )
}





interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  initialProducts?: ProductsConnection;
  maxWidth?: number;
}
interface QueryVar {
  connectionQuery: ConnectionQueryProps;
}
interface QueryData {
  productsRecommendedConnection: ProductsConnection
}

export const cardCornerRadius = 4;

const styles = (theme: Theme) => createStyles({
  recommendationsContainer: {
    marginTop: '2rem',
    width: '100%',
  },
});


export default withStyles(styles)( YouMayAlsoLike );







