import React from "react";
import clsx from "clsx";
// Graphql Queries
import {
  UserPrivate,
  PromotedSlot,
} from "typings/gqlTypes";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, Gradients } from "layout/AppTheme";

import {
  isSlotExpiredYet,
} from "./utils";




const PromoteSlotStatus = (props: ReactProps) => {

  const {
    classes,
    user,
  } = props;

  let {
    expiresAt,
    anotherUserOwnsSlotNow,
    userOwnsSlotNow,
  } = isSlotExpiredYet(props.promotedSlot, user)

  return (
    <div className={classes.helpMessages}>
      <div className={classes.helpMessage1}>
        {
          userOwnsSlotNow
          ? "You own this slot."
          : anotherUserOwnsSlotNow
            ? "Another user currently owns this slot."
            : "This slot can be purchased."
        }
      </div>
      <div className={classes.helpMessage2}>
      {
        // if someone currently owns slot
        (expiresAt === undefined)
          ? ``
          : (userOwnsSlotNow || anotherUserOwnsSlotNow)
            // and he currently owns the slot
            ? <>
                <span> Ownership valid until: </span>
                <span className={classes.time}>
                  {`${expiresAt?.format("YYYY-MM-DD HH:mm a")}`}
                </span>
              </>
            // or he no longer owns it
            : <>
                <span> Ownership expired: </span>
                <span className={classes.timeExpired}>
                  {`${expiresAt?.format("YYYY-MM-DD HH:mm a")}`}
                </span>
              </>
      }
      </div>
    </div>
  );
}



interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate;
  promotedSlot: PromotedSlot
}


const styles = (theme: Theme) => createStyles({
  helpMessages: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: '2.5rem',
    marginBottom: '2.5rem',
  },
  helpMessage1: {
    color: Colors.blue,
    width: '100%',
    textAlign: 'center',
  },
  helpMessage2: {
    color: Colors.blue,
    width: '100%',
    textAlign: 'center',
  },
  time: {
    color: Colors.green,
    fontWeight: 600,
  },
  timeExpired: {
    color: Colors.red,
    fontWeight: 600,
  },
});

export default withStyles(styles)( PromoteSlotStatus );

