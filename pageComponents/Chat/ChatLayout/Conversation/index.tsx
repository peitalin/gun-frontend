import React from 'react';
// Styles
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";

import { useQuery, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// typings
import { Chat, Chat_Messages } from "typings/gqlTypes";
import Button from "@material-ui/core/Button";
// components
import Banner from './Banner';
import MessageList from './MessageList';

// https://github.com/hasura/graphql-engine/blob/master/community/sample-apps/realtime-chat/src/components/RenderMessages.js

const FETCH_MESSAGES = gql`
  # query ($last_received_id: Int, $last_received_ts: createdAttz){
  #   message (
  #     order_by: {createdAt:asc}
  #     where: {
  #       _and: {
  #         id: {
  #           _neq: $last_received_id
  #         },
  #         createdAt: {
  #           _gte: $last_received_ts
  #         }
  #       }

  #     }
  #   ) {
  #     id
  #     text
  #     userName
  #     createdAt
  #   }
  # }
  subscription MessageAdded {
    chatMessages: chat_messages(
      order_by: { createdAt: asc },
      limit: 10
    ) {
      id
      chatId
      createdAt
      sender {
        id
        firstName
        lastName
      }
      content
      previewItem {
        id
      }
    }
  }
`;


export const Conversation: React.FC<ReactProps> = (props) => {

  const {
    classes,
    userId,
    userName,
    chatDivId = 'chat123'
  } = props;

  const [state, setState] = React.useState({
    messages: [] as Chat_Messages[],
    newMessages: [] as Chat_Messages[],
    numMessagesBefore: 0,
    error: null,
    refetch: null,
    loading: null,
    bottom: false,
  });
  const { messages, newMessages, bottom } = state;


  // get appropriate query variables
  const getLastReceivedVars = () => {
    const { messages, newMessages } = state;
    if (newMessages.length === 0) {
      if (messages.length !== 0) {
        return {
          last_received_id: messages[messages.length - 1].id,
          last_received_ts: messages[messages.length - 1].createdAt
        }
      } else {
        return {
          last_received_id: -1,
          last_received_ts: "2018-08-21T19:58:46.987552+00:00"
        }
      }
    } else {
      return {
        last_received_id: newMessages[newMessages.length - 1].id,
        last_received_ts: newMessages[newMessages.length - 1].createdAt
      }
    }
  }

  // add new (unread) messages to state
  const addNewMessages = (messages) => {
    const newMessages = [...state.newMessages];
    messages.forEach((m) => {
      // do not add new messages from self
      if (m.userName !== props.userName) {
        newMessages.push(m);
      }
    });
    setState(s => ({ ...s, newMessages }))
  }

  // add old (read) messages to state
  const addOldMessages = (messages) => {
    const oldMessages = [ ...state.messages, ...messages];
    setState(s => ({ ...s, messages: oldMessages, newMessages: [] }))
  }

  // add message to state when text is entered
  const mutationCallback = (message) => {
    const messages = [ ...state.messages, ...state.newMessages ];
    messages.push(message);
    setState(s => ({ ...s, messages, newMessages: [] }));
  }

  // custom refetch to be passed to parent for refetching on event occurance
  const refetch2 = async() => {
    if (!state.loading) {
      const resp = await state.refetch(getLastReceivedVars());
      if (resp.data) {
        if (!isViewScrollable()) {
          addOldMessages(resp.data.message);
        } else {
          if (state.bottom) {
            addOldMessages(resp.data.message);
          } else {
            addNewMessages(resp.data.message);
          }
        }
      }
    }
  }

  // scroll to bottom
  const scrollToBottom = () => {
    let lastMsgElem = document.getElementById('lastMessage');
    if (lastMsgElem) {
      lastMsgElem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      } as any);
    }
  }

  // scroll to the new message
  const scrollToNewMessage = () => {
    document.getElementById('newMessage')
      .scrollIntoView({ behavior: "instant" } as any);
  }

  // scroll handler
  const handleScroll = (e) => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.getElementById(chatDivId);
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      setState(s => ({ ...s, bottom: true }))
    } else {
      if (state.bottom) {
        setState(s => ({ ...s, bottom: false }))
      }
    }
  }

  // check if the view is scrollable
  const isViewScrollable = () => {
    const isInViewport = (elem) => {
      const bounding = elem.getBoundingClientRect();
      return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };
    if (document.getElementById('lastMessage')) {
      return !isInViewport(document.getElementById('lastMessage'));
    }
    return false;
  }

  const { data, loading, error } = useSubscription<QueryData, QueryVar>(
    FETCH_MESSAGES, {
      variables: {}
      // variables: getLastReceivedVars()
    }
  );

  const renderMessages = () => {
    if (loading) {
      return null;
    }
    if (error) {
      return "Error: " + error;
    }
    // set refetch in local state to make a custom refetch
    // if (!state.refetch) {
    //   // setState(s => ({
    //   //   ...s,
    //   //   refetch: refetch
    //   // }));
    // }
    const receivedMessages = data.chatMessages;
    // load all messages to state in the beginning
    if (receivedMessages.length !== 0) {
      if (messages.length === 0) {
        addOldMessages(receivedMessages);
      }
    }
    // return null; real rendering happens below
    return null;
  }


  React.useEffect(() => {
    // set mutation callback to update messages in state after mutation
    props.setMutationCallback(mutationCallback);
    // add scroll listener on mount
    window.addEventListener("scroll", handleScroll);

    // remove scroll listener on unmount
    () => window.removeEventListener("scroll", handleScroll);
  }, [])


  React.useEffect(() => {
    if (option(data).chatMessages([]).length > 0) {
      setState(s => ({ ...s, numMessagesBefore: data.chatMessages.length }))
      scrollToBottom();
    }
  }, [ data, loading ])


  return (
    <div id={chatDivId} className={classes.chatBox}>
      { renderMessages() }
      {
        // show "unread messages" banner if not at bottom
        // (!bottom && newMessages.length > 0 && isViewScrollable()) ?
        true
        ? <Banner
            scrollToNewMessage={scrollToNewMessage}
            numOfNewMessages={newMessages.length}
          />
        : null
      }

      <Button
       onClick={scrollToBottom}
      >
        Scroll To bottom
      </Button>


      {
        // Show old/new message separation
        data && data.chatMessages &&
        <>
          <div
            id="newMessage"
            className={clsx(
              classes.oldNewSeparator,
            )}
          >
            {
              newMessages.length !== 0 ?
              "New messages" :
              null
            }
          </div>

          { /* render new messages */}
          <MessageList
            messages={data.chatMessages}
            isNew={true}
            userName={userName}
            userId={userId}
          />
          { /* Bottom div to scroll to */}
          <div
            style={{ "height": 0 }}
            id="newMessage" // anchor to scroll back to
          >
          </div>
        </>
      }
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  userId: string;
  userName?: string;
  chatDivId?: string;
  setRefetch?(refetch: any): void;
  refetch?(): any;
  setMutationCallback?(a?: any): any;
}

interface QueryData {
  chatMessages: Chat_Messages[];
}
interface QueryVar {
  // query: ConnectionOffsetQuery
}


const styles = (theme: Theme) => createStyles({
  oldNewSeparator: {
    fontSize: '18px',
    textAlign: 'center',
    marginBottom: '15px',
  },
  wd75: {
    width: '75%',
  },
  chatBox: {
    width: '100%',
    height: '50vh',
    overflow: 'scroll',
  },
  chatWrapper: {
    display: 'flex',
  },
})


export default withStyles(styles)( Conversation );