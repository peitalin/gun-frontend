import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, isThemeDark } from "layout/AppTheme";
import clsx from "clsx";
// Components
import {
  PromotedSlot,
  UserPrivate,
} from "typings/gqlTypes";
import { isSlotExpiredYet } from "../PromotedSlotPurchaseModal/utils";




const PromotedSlotMessageAdmin = (props: ReactProps) => {

  // random generated products won't have productId
  // and will have isRandomFiller === true
  const {
    classes,
    promotedSlot,
    user,
  } = props


  let {
    isExpired,
    expiresAt,
    anotherUserOwnsSlot,
    anotherUserOwnsSlotNow,
    userOwnsSlot,
    userOwnsSlotNow,
  } = isSlotExpiredYet(props.promotedSlot, user)


  if (!promotedSlot?.isAvailableForPurchase) {
    return (
      <div className={classes.previewImageMessageText}>
        {"Admin: Edit Slot"}
        <br/><br/>
        {'Slot not available yet. Click to edit'}
      </div>
    )
  } else {
    if (anotherUserOwnsSlotNow) {
      return (
        <div className={classes.previewImageMessageText}>
          {"Admin: Edit Slot"}
          <br/> <br/>
          {"Another user currently owns this slot"}
        </div>
      )
    } else if (userOwnsSlotNow) {
      return (
        <div className={classes.previewImageMessageText}>
          {"Admin: Edit Slot"}
          <br/> <br/>
          {"You own this slot"}
        </div>
      )
    } else {
      return (
        <div className={classes.previewImageMessageText}>
          {"Admin: Edit Slot"}
          <br/> <br/>
          {"No user owns this slot now"}
        </div>
      )
    }
  }
}


/////////// Typings //////////////

interface ReactProps extends WithStyles<typeof styles> {
  promotedSlot: PromotedSlot
  user: UserPrivate;
}


/////////// Styles //////////////

const styles = (theme: Theme) => createStyles({
  previewImageMessageText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: "1rem",
    marginRight: "1rem",
    fontWeight: 600,
  },
});


export default withStyles(styles)( PromotedSlotMessageAdmin );







