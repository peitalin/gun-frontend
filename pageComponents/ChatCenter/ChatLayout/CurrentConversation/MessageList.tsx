import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Message, Bid, BidStatus } from "typings/gqlTypes";
// Styles
import { Colors, BoxShadows, BorderRadius2x, BorderRadius3x, BorderRadius } from "layout/AppTheme";

import { formatDate } from "utils/dates";
import ButtonLoading from "components/ButtonLoading";
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
        (props.messages ?? []).map((message, i) => {
          const isMe = message?.sender?.id === userId
          return (
            <MessageItem key={message?.id}
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

  const isBidDisabled = (b: Bid) => {
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
            {
              m?.sender?.license?.licenseNumber
              ? `User License: ${m.sender?.license?.licenseNumber}`
              : `Private User: ${m.sender?.id}`
            }
          </div>
          <div className={classes.myMessageTime}>
            <i>{formatDate(m.createdAt)}</i>
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
              className={clsx(
                classes.bidMsgButton,
                bidDisabled ? classes.bidMsgDisabled : classes.bidMsgRed,
              )}
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
            {
              m?.sender?.license?.licenseNumber
              ? `User License: ${m.sender?.license?.licenseNumber}`
              : `Private User: ${m.sender?.id}`
            }
          </div>
          <div className={classes.messageTime}>
            <i>{formatDate(m.createdAt)}</i>
          </div>
        </div>
        <div className={classes.messageText}>
          <span dangerouslySetInnerHTML={{
            __html: String(m?.content ?? "")
          }}/>
        </div>
        {
          m?.bid?.id &&
          <div className={classes.messageText}>
            {`Offer: ${c(m?.bid?.offerPrice)}`}
            <ButtonLoading
              className={clsx(
                classes.bidMsgButton,
                bidDisabled ? classes.bidMsgDisabled : classes.bidMsgBlue,
              )}
              onClick={() => {
                updateBidMessage({
                  variables: {
                    bidId: bid?.id,
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
            >
              {
                bidDisabled
                ? `Offer ${bid?.bidStatus}`
                : "Accept"
              }
            </ButtonLoading>
            {
              m?.bid?.id &&
              !bidDisabled &&
              <ButtonLoading
                className={clsx(
                  classes.bidMsgButton,
                  bidDisabled ? classes.bidMsgDisabled : classes.bidMsgRed,
                )}
                onClick={() => {
                  updateBidMessage({
                    variables: {
                      bidId: bid?.id,
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
  messages: Message[];
}
interface MessageItemProps extends WithStyles<typeof styles> {
  isMe?: boolean;
  message: Message;
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
    border: "unset",
    "&:hover": {
      border: "unset",
    },
    borderRadius: BorderRadius,
    color: Colors.cream,
    height: 35,
  },
  bidMsgRed: {
    backgroundColor: Colors.red,
    "&:hover": {
      backgroundColor: Colors.lightRed,
    },
  },
  bidMsgBlue: {
    backgroundColor: Colors.secondary,
    "&:hover": {
      backgroundColor: Colors.secondaryBright,
    },
  },
  bidMsgDisabled: {
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.slateGreyDarkest
      : Colors.slateGreyDarker,
    "&:hover": {
      backgroundColor: theme.palette.type === 'dark'
        ? Colors.slateGreyDarkest
        : Colors.slateGreyDarker,
    },
  },
})


export default withStyles(styles)( MessageList );