import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
import { styles } from "../FeaturedProducts/stylesDesktop";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import ProductPreviewResponsive from "components/ProductPreviewResponsive";
import LoadingCards from "pageComponents/FrontPage/LoadingCards";
// GraphQL Typings
import {
  Product,
  Order_By,
  PromotedSlotsConnection,
  ProductPreviewsConnection,
} from "typings/gqlTypes";
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Link from "next/link";
import ArrowRight from "@material-ui/icons/ArrowRight";




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
    loading,
    showSeeMore = true,
  } = props;

  const theme = useTheme();
  // jumboXL preview card on sm screen size only, remove right margin
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))

  const productPreviews = connection?.edges?.map(
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
          productPreviews?.length > 0
          ? productPreviews?.filter(p => !!p).map((productPreview, i) =>
              <div key={productPreview?.id + `_${i}`}
                className={classes.productCardWrapper}
              >
                <div className={clsx(
                  smDown ? classes.flexItemMobile : classes.flexItem,
                  classes.flexItemHover,
                )}>
                  <ProductPreviewResponsive
                    productPreview={productPreview}
                    cardsPerRow={cardsPerRow}
                  />
                </div>
              </div>
            )
          : <LoadingCards count={4} />
        }
        {
          showSeeMore &&
          !loading &&
          connection?.edges?.length > 0 &&
          <div className={classes.seeAllLinkContainer}>
            <Link href={"/new"}>
              <a className={classes.seeAllLinkBorder}>
                See more
                <ArrowRight className={classes.sellAllIcon}/>
              </a>
            </Link>
          </div>
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
  connection: ProductPreviewsConnection;
  loading?: boolean;
  showSeeMore?: boolean;
  categorySlug?: string
  // sortAscending: boolean; // must be top-level
  // cause Desktop and Mobile share the same queries. Possible clash in variables
  // don't want Desktop's sortAscend: true, while Mobile is false,
  // as both queries will be sent and returned data conflicts
}

export default withStyles(styles)( NewProductsDesktop );







