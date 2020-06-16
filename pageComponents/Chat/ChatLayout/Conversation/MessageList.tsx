import React from 'react';
import { Colors } from "layout/AppTheme";
import { oc as option } from "ts-optchain";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Chat, Chat_Messages } from "typings/gqlTypes";

import dayjs from "dayjs";
import { showDateAndTime } from "utils/dates";


export const MessageList: React.FC<ReactProps> = (props) => {

  const {
    classes,
    userId,
    userName,
    isNew,
  } = props;

  return (
    <div className={
      isNew
      ? classes.messageWrapperNew
      : classes.messageWrapperNew
    }>
      {
        props.messages.map((message, i) => {
          console.log("=> message: ", message)
          const isMe = message.sender.id === userId
          return (
            <MessageItem key={message.id}
              classes={classes}
              isMe={isMe}
              message={message}
            />
          );
        })
      }
      <div
        style={{ "height": 0 }}
        id="lastMessage" // anchor to scroll back to
      >
      </div>
    </div>
  );
};

const MessageItem = (props: MessageItemProps) => {

  const { classes, isMe } = props;
  const m = props.message;

  if (isMe) {
    return (
      <div className={classes.myMessage}
      >
        <div className={classes.myMessageNameTime}>
          <div className={classes.myMessageName}>
            <b>{`${m.sender.firstName} ${m.sender.lastName}`}</b>
          </div>
          <div className={classes.myMessageTime}>
            <i>{showDateAndTime(m.createdAt)}</i>
          </div>
        </div>
        <div className={classes.myMessageText}>
          <span dangerouslySetInnerHTML={{
            __html: String(option(m).content(""))
          }}/>
        </div>
      </div>
    )
  } else {
    return (
      <div className={classes.yourMessage}>
        <div className={classes.messageNameTime}>
          <div className={classes.messageName}>
            <b>{`${m.sender.firstName} ${m.sender.lastName}`}</b>
          </div>
          <div className={classes.messageTime}>
            <i>{showDateAndTime(m.createdAt)}</i>
          </div>
        </div>
        <div className={classes.messageText}>
          <span dangerouslySetInnerHTML={{
            __html: String(option(m).content(""))
          }}/>
        </div>
      </div>
    )
  }
}

interface ReactProps extends WithStyles<typeof styles> {
  isNew?: boolean;
  userName?: string;
  userId: string;
  messages: Chat_Messages[];
}
interface MessageItemProps extends WithStyles<typeof styles> {
  isMe?: boolean;
  message: Chat_Messages;
}

const styles = (theme: Theme) => createStyles({
  messageWrapperNew: {
    paddingBottom: '75px',
  },
  // your messages styles
  yourMessage: {
    fontSize: "16px",
    backgroundColor: Colors.white,
    paddingLeft: '5px',
    margin: '1rem',
    borderRadius: '4px',
    width: '75%',
    padding: '5px',
  },
  messageTime: {
    textAlign: 'right',
    paddingRight: '5px',
    fontSize: '12px',
    color: '#01999b',
  },
  messageText: {
  },
  messageNameTime: {
    width: '100%',
  },
  messageName: {
    color: Colors.darkGrey,
  },
  // my messages styles
  myMessage: {
    fontSize: "16px",
    backgroundColor: "#E1F7CB",
    paddingRight: '5px',
    margin: '1rem',
    borderRadius: '4px',
    width: '75%',
    padding: '5px',
    // stick to right side
    marginLeft: 'calc(25% - 1rem)',
  },
  myMessageTime: {
    textAlign: 'right',
    paddingRight: '5px',
    fontSize: '12px',
    color: '#01999b',
  },
  myMessageText: {
  },
  myMessageNameTime: {
    width: '100%',
  },
  myMessageName: {
    color: Colors.greenCool,
  },
})


export default withStyles(styles)( MessageList );