import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
// Material UI
import Typography from "@material-ui/core/Typography";
// Typings
import {
  Product,
  PromotedSlotsConnection,
  PromotedSlot,
  UserPrivate,
} from "typings/gqlTypes";

import PromotedSlotCard from "./PromotedSlotCard";
import AirCarousel from "components/AirCarousel";
import { useSnackbar } from "notistack";





const PromotionCardsMobile = (props: ReactProps) => {

  const {
    classes,
    connection,
    cardsPerRow = {
      xs: 1.5,
      sm: 1.5,
      md: 1.5, // redundant, since mobile is sm only
      lg: 1.5,
      xl: 1.5,
    },
  } = props;


  const snackbar = useSnackbar();
  const promotedSlotsEdges = connection?.edges

  return (
    <main className={classes.root}>
      <Typography variant="h3" className={classes.title} gutterBottom>
        {props.title || "Featured"}
      </Typography>

      <AirCarousel
        id={"featured-products-carousel-main"}
        // handleClickLeft={getPrevPage}
        // handleClickRight={getNextPage}
        disableButtons={true}
        scrollSnapType={"x proximity"}
      >
        {
          promotedSlotsEdges?.map((promotedSlotEdge, i) =>
            <div key={i}
              className={clsx(
                classes.marginLeft,
                !promotedSlotEdge.node?.isAvailableForPurchase && classes.grayedOut,
              )}
            >
              <PromotedSlotCard
                cardsPerRow={cardsPerRow}
                onClick={props.onClick}
                user={props.user}
                promotedSlot={promotedSlotEdge?.node}
                setCurrentPromotedSlot={props.setCurrentPromotedSlot}
                position={i}
                setPosition={props.setPosition}
              />
            </div>
          )
        }
      </AirCarousel>
    </main>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  connection: PromotedSlotsConnection;
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
  onClick(e?: any): void;
  setCurrentPromotedSlot(p: PromotedSlot): void;
  setPosition(p: number): void;
  user: UserPrivate;
}

const styles = (theme: Theme) => createStyles({
  root: {
    margin: "0rem 0rem",
    // paddingRight: '1rem', // subtract 1rem for carousel buttons: 1rem on both sides
    // paddingLeft: '1rem', // subtract 1rem for carousel buttons: 1rem on both sides
    width: '100%',
    marginBottom: '1rem',
  },
  flexRowLink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingLeft: '0.5rem', // subtract 1rem for carousel buttons: 1rem on both sides
    fontWeight: 600,
    marginBottom: "0.5rem",
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
  marginLeft: {
    marginLeft: '0.5rem',
  },
  previewImageMessageText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: "1rem",
    marginRight: "1rem",
  },
  grayedOut: {
    // filter: "grayscale(1) blur(1px)",
    filter: "grayscale(1)",
  },
});


export default withStyles(styles)( PromotionCardsMobile );







