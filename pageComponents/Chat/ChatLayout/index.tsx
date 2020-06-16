import React from 'react';
import { oc as option } from "ts-optchain";
// components
import Conversation from './Conversation';
import Textbox from './Textbox'
import OnlineUsers from './OnlineUsers';
// Styles
import { Colors } from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";


export const ChatLayout: React.FC<ReactProps> = (props) => {

  const [refetch, setRefetch] = React.useState(undefined)
  const [mutationCallback, setMutationCallback] = React.useState(undefined)
  // Set mutation callback. For instantly adding messages to state after mutation
  const {
    classes,
    userId,
    userName
  } = props;

  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classes.chatLayout}>
      {
        !xsDown
        ? <div className={clsx(classes.col25, classes.wd25)}>
            <OnlineUsers
              userId={userId}
              userName={userName}
            />
          </div>
        : <div className={classes.mobileview}>
            <OnlineUsers
              userId={userId}
              userName={userName}
            />
          </div>
      }
      <div className={clsx(classes.col75, classes.wd75)}>
        <Conversation
          refetch={refetch}
          setRefetch={setRefetch}
          setMutationCallback={setMutationCallback}
          userName={userName}
          userId={userId}
        />
        <Textbox
          userName={userName}
          mutationCallback={mutationCallback}
          userId={userId}
        />
      </div>
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  userId?: string;
  userName?: string;
  refetch?(a?: any): void;
  setRefetch?(a?: any): void;
}

const styles = (theme: Theme) => createStyles({
  col25: {
    backgroundColor: Colors.charcoal,
  },
  wd25: {
    width: '25%',
  },
  col75: {
    display: 'flex',
    flexDirection: 'column',
  },
  wd75: {
    width: '75%',
  },
  chatLayout: {
    display: 'flex',
    width: '100%',
    background: Colors.lightestGrey,
    border: `1px solid ${Colors.darkWhite}`,
  },
  onlineUsersContainer: {
    background: Colors.grey,
  },
  mobileview: {
    position: "absolute",
    right: "0px",
    bottom: "152px",
    width: "50%",
  },
})


export default withStyles(styles)( ChatLayout );