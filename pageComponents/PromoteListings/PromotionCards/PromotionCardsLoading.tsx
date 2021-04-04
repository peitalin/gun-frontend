import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
// Material UI
import Typography from "@material-ui/core/Typography";
import LoadingCards from "pageComponents/FrontPage/LoadingCards";
import AirCarousel from "components/AirCarousel";






const PromotionCardsLoading = (props: ReactProps) => {

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
            key={`featured-products-carousel-main-${i}`}
            id={`featured-products-carousel-main-${i}`}
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

const styles = (theme: Theme) => createStyles({
  root: {
    margin: "0rem 0rem",
    paddingRight: '1rem', // subtract 1rem for carousel buttons: 1rem on both sides
    paddingLeft: '1rem', // subtract 1rem for carousel buttons: 1rem on both sides
    width: '100%',
  },
  flexRowLink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    // paddingLeft: '0.5rem', // subtract 1rem for carousel buttons: 1rem on both sides
    color: Colors.slateGreyDarkest,
    fontWeight: 600,
    marginBottom: "1rem",
    marginTop: "2rem",
  },
  flexCol: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  flexItem: {
    borderRadius: `${BorderRadius}px`,
    position: 'relative',
  },
  flexItemHoverNull: {
    "&:hover": {
      borderBottom: `2px solid ${Colors.lightGrey}`,
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeIn,
        duration: "200ms",
      }),
    }
  },
  paginateButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minWidth: {
    minWidth: 'calc(100vw - 2rem)',
  },
  divider: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  // dividerFeaturedProduct: {
  //   border: `2px solid ${Colors.lightGrey}`,
  // },
});


export default withStyles(styles)( PromotionCardsLoading );







