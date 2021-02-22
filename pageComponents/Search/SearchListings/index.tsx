import React from "react";
import clsx from "clsx";
// Router
import Link from "next/link";
// Styles
import { Colors } from "layout/AppTheme";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import { ProductsConnection, Product } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// Components
import ProductRow from "pageComponents/FrontPage/FeaturedProducts/ProductRow";




const SearchListings = (props: ReactProps) => {

  const {
    classes,
    productsConnection,
  } = props;

  return (
    <ErrorBounds>
      {
        productsConnection &&
        <div className={clsx(classes.flexRow)}>
        {
          productsConnection.edges.map((edge, i) => {

            let product = edge.node;

            return (
              <div className={classes.flexItem} key={`${product.id}_${i}`}>
                <ProductRow
                  product={product}
                />
              </div>
            )
          })
        }
        </div>
      }
    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  productsConnection: ProductsConnection;
}


export const styles = (theme: Theme) => createStyles({
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flexItem: {
    width: '100%',
    marginTop: '1rem',
    borderBottom: `1px solid ${Colors.lightestGrey}`,
    "&:hover": {
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeIn,
        duration: "200ms",
      }),
    }
  },
  spaceTop: {
    marginTop: '2rem',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  marginHalf: {
    margin: '0.5rem',
  },
});


export default withStyles(styles)( SearchListings );

