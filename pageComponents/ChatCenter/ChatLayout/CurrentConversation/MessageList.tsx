import React from 'react';
import { oc as option } from "ts-optchain";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Chat_Rooms, Chat_Messages, Bids, BidStatus } from "typings/gqlTypes";
// Styles
import { Colors, BoxShadows, BorderRadius2x, BorderRadius3x } from "layout/AppTheme";

import { formatDate } from "utils/dates";
import { showDateAndTime } from "utils/dates";
import ButtonLoading from "components/ButtonLoading";
import { gql } from "@apollo/client";
import { useMutation, useApolloClient } from "@apollo/client";
import { UPDATE_BID_MESSAGE } from "queries/chat-mutations";

import currency from 'currency.js';






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
        (option(props).messages([]).length > 0) &&
        props.messages.map((message, i) => {
          // console.log("=> message: ", message)
          const isMe = option(message).sender.id() === userId
          return (
            <MessageItem key={option(message).id()}
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
  const bid = m.bid;

  const [updateBidMessage, { data, loading }] = useMutation<MutData, MutVars>(
    UPDATE_BID_MESSAGE, {
      variables: {
        bidId: bid?.id,
        bidStatus: BidStatus.WITHDRAWN,
      }, // add later in sendMessage()
      onCompleted: (data) => {
        console.log(data)
      },
    }
  )

  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()

  const isBidDisabled = (b: Bids) => {
    if (b && b.bidStatus) {
      return b.bidStatus === BidStatus.WITHDRAWN
          || b.bidStatus === BidStatus.DECLINED
          || b.bidStatus === BidStatus.ACCEPTED
    } else {
      return undefined
    }
  }

  let bidDisabled = isBidDisabled(bid)
  // console.log("bid.id: ", bid?.id)

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
            __html: String(m?.content ?? "")
          }}/>
        </div>
        {
          m.bid &&
          m.bid.id &&
          <div className={classes.messageText}>
            {`Offer: ${c(m.bid.offerPrice)}`}
            <ButtonLoading
              onClick={async() => {
                console.log("bid.id: ", bid?.id)
                let response = await updateBidMessage({
                  variables: {
                    bidId: bid?.id,
                    bidStatus: BidStatus.WITHDRAWN,
                  }
                })
                console.log("res: ", response)
              }}
              loadingIconColor={Colors.blue}
              replaceTextWhenLoading={true}
              // loading={loading}
              disabled={bidDisabled}
              variant="outlined"
              color="primary"
              className={classes.bidMsgButton}
            >
              {
                bidDisabled
                ? `Offer ${bid.bidStatus}`
                : "Cancel offer"
              }
            </ButtonLoading>
          </div>
        }
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
            __html: String(m?.content ?? "")
          }}/>
        </div>
        {
          m.bid &&
          m.bid.id &&
          <div className={classes.messageText}>
            {`Offer: ${c(m.bid.offerPrice)}`}
            <ButtonLoading
              onClick={() => {
                updateBidMessage({
                  variables: {
                    bidId: bid.id,
                    bidStatus: BidStatus.ACCEPTED,
                  }
                })
              }}
              loadingIconColor={Colors.blue}
              replaceTextWhenLoading={true}
              // loading={loading}
              disabled={bidDisabled}
              variant="outlined"
              color="primary"
              className={classes.bidMsgButton}
            >
              {
                bidDisabled
                ? `Offer ${bid.bidStatus}`
                : "Accept"
              }
            </ButtonLoading>
            {
              m.bid.id &&
              !bidDisabled &&
              <ButtonLoading
                onClick={() => {
                  updateBidMessage({
                    variables: {
                      bidId: bid.id,
                      bidStatus: BidStatus.DECLINED,
                    }
                  })
                }}
                loadingIconColor={Colors.blue}
                replaceTextWhenLoading={true}
                // loading={loading}
                disabled={bidDisabled}
                variant="outlined"
                color="secondary"
                className={classes.bidMsgButton}
              >
                { "Decline" }
              </ButtonLoading>
            }
          </div>
        }
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

interface MutData {
  update_bids: {
    affected_rows: number
  }
}
interface MutVars {
  bidId: string
  bidStatus: string
}

const styles = (theme: Theme) => createStyles({
  messageWrapperNew: {
  },
  // your messages styles
  yourMessage: {
    fontSize: "16px",
    backgroundColor: Colors.white,
    margin: '1rem',
    borderRadius: '4px',
    width: '75%',
    padding: '0.5rem',
  },
  messageTime: {
    textAlign: 'right',
    paddingRight: '5px',
    fontSize: '12px',
    color: Colors.darkGrey,
  },
  messageText: {
    color: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.slateGreyBlack,
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
    margin: '1rem',
    borderRadius: BorderRadius2x,
    width: '75%',
    // stick to right side
    marginLeft: 'calc(25% - 1rem)',
    padding: '0.5rem',
  },
  myMessageTime: {
    textAlign: 'right',
    paddingRight: '5px',
    fontSize: '12px',
    color: Colors.greenCool,
  },
  myMessageText: {
    color: theme.colors.uniswapMediumGrey
  },
  myMessageNameTime: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: "0.5rem",
  },
  myMessageName: {
    color: Colors.greenCool,
  },
  bidMsgButton: {
    height: 35,
    backgroundColor: Colors.lightGrey,
    color: Colors.slateGreyBlack,
    "&:hover": {
      backgroundColor: Colors.slateGrey,
    },
  },
})


export default withStyles(styles)( MessageList );