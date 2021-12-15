import React from "react";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
// Components
import {
  PromotedSlot,
  UserPrivate,
} from "typings/gqlTypes";
// useMediaQuery
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { asCurrency as c } from "utils/prices";
import { isSlotExpiredYet } from "../PromotedSlotPurchaseModal/utils";




const PromotedSlotMessage = (props: ReactProps) => {

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

  const durationInHours = (promotedSlot?.durationInHours ?? 48) / 24

  if (!promotedSlot?.isAvailableForPurchase) {
    return (
      <div className={classes.previewImageMessageText}>
        {'Slot has not been made available for public sale by admins yet'}
      </div>
    )
  } else {
    if (anotherUserOwnsSlotNow) {
      return (
        <div className={classes.previewImageMessageText}>
          {"Another user currently owns this slot"}
        </div>
      )
    } else if (userOwnsSlotNow) {
      return (
        <div className={classes.previewImageMessageText}>
          {"You own this slot"} <br/>
          {"Add a product"}
        </div>
      )
    } else {
      return (
        <div className={classes.previewImageMessageText}>
          {`Buy this slot for ${durationInHours} days`} <br/>
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
    fontWeight: 600,
  },
});


export default withStyles(styles)( PromotedSlotMessage );







