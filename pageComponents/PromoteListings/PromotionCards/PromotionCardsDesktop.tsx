import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
import Link from "next/link";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import PromotedSlotCard from "./PromotedSlotCard";
// GraphQL Typings
import {
  Product,
  UserPrivate,
  PromotedSlotsConnection,
  PromotedSlot,
  Role,
} from "typings/gqlTypes";
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { asCurrency as c } from "utils/prices";
import { useSnackbar } from "notistack";




const PromotionCardsDesktop = (props: ReactProps) => {

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

  // const snackbar = useSnackbar();
  // const theme = useTheme();

  const promotedSlotsEdges = (connection?.edges ?? []).map(promotedItem => {
    if (promotedItem?.node?.id?.startsWith("random")) {
      return {
        ...promotedItem,
        node: {
          ...promotedItem?.node,
          product: undefined,
          productId: undefined,
        }
      }
    } else {
      return promotedItem
    }
  })

  return (
    <main className={classes.root}>

      <div className={classes.flexRow}>
        <Typography variant="h3"
          className={clsx(classes.title, classes.maxWidth)}
          gutterBottom
        >
          {props.title || "Featured"}
        </Typography>
      </div>

      <div className={classes.carouselContainer}>
        {
          promotedSlotsEdges?.map((promotedSlotEdge, i) => {
            return (
              <div key={promotedSlotEdge?.node?.id + `_${i}`}
                className={classes.productCardWrapper}
              >
                <div className={clsx(
                  classes.flexItem,
                  !promotedSlotEdge.node?.isAvailableForPurchase && classes.grayedOut,
                  "staggerFadeIn",
                  classes.flexItemHover,
                )}>
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
            </div>
            )
          })
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
  connection: PromotedSlotsConnection;
  // sortAscending: boolean; // must be top-level
  // cause Desktop and Mobile share the same queries. Possible clash in variables
  // don't want Desktop's sortAscend: true, while Mobile is false,
  // as both queries will be sent and returned data conflicts
  onClick(e?: any): void;
  setCurrentPromotedSlot(p: PromotedSlot): void;
  setPosition(p: number): void;
  user: UserPrivate;
}


/////////// Styles //////////////

const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: '1rem',
  },
  maxWidth: {
    maxWidth: '1160px',
    width: '100%',
  },
  carouselContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: 'flex-start',
    paddingLeft: '1rem', // balances 1rem margin-right on flexItems
  },
  paddingRight: {
    paddingRight: '1rem',
  },
  productCardWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '1rem',
    marginBottom: '1rem',
  },
  productCardWrapperMobile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingRight: '1rem',
  },
  title: {
    fontSize: '1.5rem',
    marginTop: "1rem",
    marginBottom: "1rem",
    marginLeft: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  flexCol: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  flexItemMobile: {
    flexGrow: 1,
    marginBottom: '1rem',
    borderRadius: `${BorderRadius}px ${BorderRadius}px 0px 0px`,
    position: 'relative',
  },
  flexItem: {
    // marginBottom: '1rem',
    // borderBottom: "1px solid #f7f7f7",
    borderRadius: `${BorderRadius}px ${BorderRadius}px 0px 0px`,
    position: 'relative',
  },
  flexItemHover: {
    "&:hover": {
      // borderBottom: `1px solid ${Colors.purple}`, // purple
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeIn,
        duration: "200ms",
      }),
    }
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


export default withStyles(styles)( PromotionCardsDesktop );







