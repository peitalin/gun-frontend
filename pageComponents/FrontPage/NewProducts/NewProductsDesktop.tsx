import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
import { styles } from "../FeaturedProducts/stylesDesktop";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import NewsItemCardResponsive from "components/NewsItemCardResponsive";
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
import { createNewsItemForProductPreview } from "typings/transformers";



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

  const newsItemPreviews = connection?.edges?.map(edge => createNewsItemForProductPreview(edge.node))
  console.log('nnnn', newsItemPreviews)

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
          newsItemPreviews?.length > 0
          ? newsItemPreviews?.filter(p => !!p).map((newsItem, i) =>
              <div key={newsItem?.id + `_${i}`}
                className={classes.productCardWrapper}
              >
                <div className={clsx(
                  smDown ? classes.flexItemMobile : classes.flexItem,
                  classes.flexItemHover,
                )}>
                  <NewsItemCardResponsive
                    newsItem={newsItem}
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







