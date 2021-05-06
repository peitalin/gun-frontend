import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
import { styles } from "../FeaturedProducts/stylesLoading";
// Material UI
import Typography from "@material-ui/core/Typography";
import LoadingCards from "pageComponents/FrontPage/LoadingCards";
import AirCarousel from "components/AirCarousel";






const NewProductsLoading = (props: ReactProps) => {

  const {
    classes,
    cardsPerRow = {
      xs: 1.5,
      sm: 1.5,
      md: 1.5, // redundant, since mobile is sm only
      lg: 1.5,
      xl: 1.5,
    },
    numRows = 1,
  } = props;

  return (
    <main className={classes.root}>
      <Typography variant="h3" className={classes.title} gutterBottom>
        {props.title || "Featured"}
      </Typography>
      {
        [...Array(numRows).keys()].map(i =>
          <AirCarousel
            key={`new-products-carousel-main-${i}`}
            id={`new-products-carousel-main-${i}`}
            // handleClickLeft={getPrevPage}
            // handleClickRight={getNextPage}
            disableButtons={false}
            scrollSnapType={"x proximity"}
          >
            <LoadingCards
              count={6}
              flexWrapItems={false}
              cardsPerRow={cardsPerRow}
            />
          </AirCarousel>
        )
      }
    </main>
  )
}





interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  numRows?: number;
  cardsPerRow?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  // cause Desktop and Mobile share the same queries. Possible clash in variables
  // don't want Desktop's sortAscend: true, while Mobile is false,
  // as both queries will be sent and returned data conflicts
}



export default withStyles(styles)( NewProductsLoading );







