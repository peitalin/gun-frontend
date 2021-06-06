import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, isThemeDark } from "layout/AppTheme";
import clsx from "clsx";
// Components
import ProductCardResponsive from "components/ProductCardResponsive";
import PromotedSlotMessage from "./PromotedSlotMessage";
import PromotedSlotMessageAdmin from "./PromotedSlotMessageAdmin";
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
import { isSlotExpiredYet } from "../PromotedSlotPurchaseModal/utils";




const PromotedSlotCard = (props: ReactProps) => {

  const {
    cardsPerRow,
    promotedSlot,
    classes,
  } = props;

  const snackbar = useSnackbar();

  let isAdmin = props.user?.userRole === Role.PLATFORM_ADMIN

  const [hover, setHover] = React.useState(false)


  let {
    isExpired,
    expiresAt,
    anotherUserOwnsSlot,
    anotherUserOwnsSlotNow,
    userOwnsSlot,
    userOwnsSlotNow,
  } = isSlotExpiredYet(promotedSlot, props.user)


  return (
    <div className={classes.promotedSlotRoot}>
      {
        isAdmin &&
        <div className={clsx(
          classes.messageBox,
          hover && classes.hoverMessageBox,
        )}>
          <div className={clsx(
            classes.messageBoxDither,
            hover && classes.hoverDither,
          )}>
            <PromotedSlotMessageAdmin
              promotedSlot={promotedSlot}
              user={props.user}
            />
          </div>
        </div>
      }
      <ProductCardResponsive
        product={
          // random generated products won't have productId
          // and will have isRandomFiller === true
          (promotedSlot?.isRandomFiller || (isExpired && !isAdmin))
            ? undefined
            : promotedSlot?.product
          // When product is expired admin sees the products he picks for the slot
          // but other buyers will only see a blank buyable slot
        }
        cardsPerRow={cardsPerRow}
        disableLoadingAnimation={true}
        onClick={async(e) => {
          if (
            !promotedSlot?.isAvailableForPurchase
            && !isAdmin
          ) {
            snackbar.enqueueSnackbar(
              "Slot is not for sale right now.",
              { variant: "info" }
            )
            if (!isExpired) {
              snackbar.enqueueSnackbar(
                "Existing products will still be shown until slot expires",
                { variant: "info" }
              )
            }
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
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        previewImageEmptyMessage={
          // random generated products won't have productId
          // and will have isRandomFiller === true
          <PromotedSlotMessage
            promotedSlot={promotedSlot}
            user={props.user}
          />
        }
      />
    </div>
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
  promotedSlotRoot: {
    position: "relative",
  },
  maxWidth: {
    maxWidth: '1160px',
    width: '100%',
  },
  messageBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    height: '100%',
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius,
    cursor: "pointer",
    pointerEvents: "none",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyDark,
    transition: theme.transitions.create('backdrop-filter', {
      easing: theme.transitions.easing.easeOut,
      duration: "400ms",
    }),
  },
  hoverMessageBox: {
    backdropFilter: "blur(6px)",
    transition: theme.transitions.create('backdrop-filter', {
      easing: theme.transitions.easing.easeOut,
      duration: "400ms",
    }),
    "& > div > div ": {
      color: Colors.ultramarineBlue,
    },
  },
  messageBoxDither: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    paddingTop: "1rem",
    height: '100%',
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(22,22,22,0.7)",
    borderRadius: BorderRadius,
  },
  hoverDither: {
    backgroundColor: "rgba(22,22,22,0.2)",
  },
  grayedOut: {
    // filter: "grayscale(1) blur(1px)",
    filter: "grayscale(1)",
  },
});


export default withStyles(styles)( PromotedSlotCard );







