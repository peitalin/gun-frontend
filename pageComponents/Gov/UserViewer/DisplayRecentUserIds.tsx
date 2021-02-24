import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Typings
import {
  ID,
  UserPrivate,
} from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";



const DisplayRecentUserIds = (props: DisplayRecentUserIdProps) => {
  const { classes, recentUsers, setUserId } = props;
  return (
    <div className={classes.recentUsers}>
      <div className={classes.recentUsersInner}>
        <Typography className={classes.heading} variant="subtitle2">
          Recent Users:
        </Typography>
        {
          recentUsers
          .map(user => {
            return (
              <div key={user.id}
                className={classes.recentUsersId}
                onClick={() => setUserId(user.id)}
              >
                {user.id}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

interface DisplayRecentUserIdProps extends WithStyles<typeof styles> {
  recentUsers: UserPrivate[];
  setUserId(id: ID): void;
}


const styles = (theme: Theme) => createStyles({
  recentUsers: {
    marginTop: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'start',
  },
  recentUsersInner: {
    maxWidth: 400,
  },
  recentUsersId: {
    fontFamily: "courier",
    fontWeight: 600,
    cursor: 'pointer',
    color: theme.colors.uniswapLighterGrey,
    "&:hover": {
      color: theme.colors.blue,
    },
    margin: '0.1rem',
  },
  heading: {
    marginBottom: '0.25rem',
  },
});


export default withStyles(styles)( DisplayRecentUserIds );



