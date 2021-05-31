import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
import { styles } from "../FeaturedProducts/stylesDesktop";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import ProductCardResponsive from "components/ProductCardResponsive";
import LoadingCards from "pageComponents/FrontPage/LoadingCards";
// GraphQL Typings
import {
  Product,
  Order_By,
  PromotedSlotsConnection,
  ProductsConnection,
} from "typings/gqlTypes";
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";




const NewProductsDesktop = (props: ReactProps) => {

  const {
    classes,
    connection,
    cardsPerRow = {
      xs: 1,
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
    },
  } = props;

  const theme = useTheme();
  // jumboXL preview card on sm screen size only, remove right margin
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))

  const products = connection?.edges?.map(
    edge => edge.node
  )

  return (
    <main className={classes.root}>

      <div className={classes.flexRow}>
        <Typography variant="h3"
          className={clsx(classes.title, classes.maxWidth)}
          gutterBottom
        >
          {props.title || "New Products"}
        </Typography>
      </div>

      <div className={classes.carouselContainer}>
        {
          products?.length > 0
          ? products?.filter(p => !!p).map((product, i) =>
              <div key={product?.id + `_${i}`}
                className={classes.productCardWrapper}
              >
                <div className={clsx(
                  smDown ? classes.flexItemMobile : classes.flexItem,
                  "staggerFadeIn",
                  classes.flexItemHover,
                )}>
                  <ProductCardResponsive
                    product={product}
                    cardsPerRow={cardsPerRow}
                  />
                </div>
              </div>
            )
          : <LoadingCards count={4} />
        }
      </div>
    </main>
  )
}


/////////// Typings //////////////

interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  cardsPerRow?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  connection: ProductsConnection;
  // sortAscending: boolean; // must be top-level
  // cause Desktop and Mobile share the same queries. Possible clash in variables
  // don't want Desktop's sortAscend: true, while Mobile is false,
  // as both queries will be sent and returned data conflicts
}

export default withStyles(styles)( NewProductsDesktop );







