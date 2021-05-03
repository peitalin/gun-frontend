import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
// Components
// import PreviewCardResponsive from "pageComponents/FrontPage/PreviewCardResponsive";
import ProductCardResponsive from "components/ProductCardResponsive";
import PromotedSlotMessage from "./PromotedSlotMessage";
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




const PromotedSlotCard = (props: ReactProps) => {

  const {
    cardsPerRow,
    promotedSlot,
  } = props;

  const snackbar = useSnackbar();

  return (
    <ProductCardResponsive
      product={
        // random generated products won't have productId
        // and will have isRandomFiller === true
        !promotedSlot?.isRandomFiller
          ? promotedSlot?.product
          : undefined
      }
      cardsPerRow={cardsPerRow}
      onClick={async(e) => {
        if (!promotedSlot?.isAvailableForPurchase) {
          snackbar.enqueueSnackbar(
            "Slot has yet to be marked for sale by admins.",
            { variant: "info" }
          )
          return
        }
        if (
          !promotedSlot?.isAvailableForPurchase
          && props.user?.userRole !== Role.PLATFORM_ADMIN
        ) {
          snackbar.enqueueSnackbar(
            "Slot reserved for admins",
            { variant: "info" }
          )
          return
        }
        props.onClick(e)
        if (props?.setPosition) {
          props.setPosition(props.position);
        }
        if (props?.setCurrentPromotedSlot) {
          props.setCurrentPromotedSlot(promotedSlot);
        }
      }}
      disableLoadingAnimation={true}
      previewImageEmptyMessage={
        // random generated products won't have productId
        // and will have isRandomFiller === true
        <PromotedSlotMessage
          promotedSlot={promotedSlot}
          user={props.user}
        />
      }
    />
  )
}


/////////// Typings //////////////

interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate;
  promotedSlot: PromotedSlot
  cardsPerRow?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  onClick(e?: any): void;
  setCurrentPromotedSlot(p: PromotedSlot): void;
  position: number;
  setPosition(p: number): void;
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
  productCardWrapperXs: {
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


export default withStyles(styles)( PromotedSlotCard );







