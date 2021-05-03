import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import {
  PromotedSlot,
  UserPrivate,
} from "typings/gqlTypes";
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { asCurrency as c } from "utils/prices";




const PromotedSlotMessage = (props: ReactProps) => {

  // random generated products won't have productId
  // and will have isRandomFiller === true
  const {
    classes,
    promotedSlot,
    user,
  } = props

  if (!promotedSlot?.isAvailableForPurchase) {
    return (
      <div className={classes.previewImageMessageText}>
        {'Slot has not been made available for public sale by admins yet'}
      </div>
    )
  } else {
    if (promotedSlot?.ownerId === user?.id) {
      return (
        <div className={classes.previewImageMessageText}>
          {"You own this slot"} <br/>
          {"Add a product"}
        </div>
      )
    } else {
      return (
        <div className={classes.previewImageMessageText}>
          {"Buy this slot for 2 days"} <br/>
          {`${c(promotedSlot?.reservePrice)}`}
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
  },
});


export default withStyles(styles)( PromotedSlotMessage );







