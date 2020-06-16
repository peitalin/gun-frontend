import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";

import { useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import TypingIndicator from './TypingIndicator';
import { v4 as uuidv4 } from "uuid"
import { Chat_Messages_Mutation_Response } from "typings/gqlTypes";
import Button from "@material-ui/core/Button";

import TextInput from "components/Fields/TextInput";
import dynamic from "next/dynamic";
import TextEditorPlaceholder from 'components/TextEditor/TextEditorPlaceholder';
const TextEditorSSR = dynamic(() => import('components/TextEditor'), {
  loading: () => <TextEditorPlaceholder/>,
  ssr: false
})
import { serializeHtml, initialValue, EMPTY_STATE } from 'components/TextEditor/helpers';



const INSERT_MESSAGE = gql`
mutation sendChatMessage(
  $msgId: String!
  $chatId: String!
  $senderId: String!
  $content: String!
  $previewItemId: String
) {
  insert_chat_messages(objects: [{
    id: $msgId,
    chatId: $chatId,
    content: $content,
    senderId: $senderId,
    previewItemId: $previewItemId
  }]) {
    affected_rows
    returning {
      id
      sender {
        id
        firstName
        lastName
        email
      }
      content
    }
  }
}
`;

const EMIT_TYPING_EVENT = gql`
  mutation update_users ($senderId: String!) {
    update_users (
      _set: { lastTyped: "now()" }
      where: { id: { _eq: $senderId } }
    ) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const Textbox: React.FC<ReactProps> = (props) => {

  const [state, setState] = React.useState({
    text: "",
  })

  const [description, setDescription] = React.useState(initialValue)
  const [resetSlate, setResetSlate] = React.useState(false)

  const { classes } = props;
  const apolloClient = useApolloClient();

  const handleTyping = (text) => {
    const textLength = text.length;
    if (text === EMPTY_STATE)

    if ((textLength !== 0 && textLength % 5 === 0) || textLength === 1) {
      emitTypingEvent();
    }
    setState(s => ({ ...s, text }));
  }

  const dispatchResetSlate = () => {
    setResetSlate(true)
    setInterval(() => {
      setResetSlate(false)
    }, 0)
  }

  const emitTypingEvent = async () => {
    if (props.userId) {
      console.log("emitting event")
      await apolloClient.mutate({
        mutation: EMIT_TYPING_EVENT,
        variables: {
          senderId: props.userId
        }
      }).then(res => console.log('emitted typing event', res));
    }
  }

  const sendMessage = (e) => {
    e.preventDefault();
    // serialize Slate rich-text object as html
    let htmlDescription = serializeHtml(description)
    if (!htmlDescription || htmlDescription === EMPTY_STATE) {
      return;
    }

    insertMessage({
      variables: {
        msgId: `msg_${uuidv4()}`,
        chatId: "chat_123123",
        senderId: props.userId,
        content: htmlDescription,
        // content: state.text,
        previewItemId: undefined,
      }
    }).then(res => {
      setDescription(initialValue)
      dispatchResetSlate()
    });
  }

  const [insertMessage, { data, loading }] = useMutation<MutData, MutVars>(
    INSERT_MESSAGE, {
      // variables: { }, // add later in sendMessage()
      onCompleted: ({ insert_chat_messages }) => {
        if (typeof props.mutationCallback === 'function') {
          console.log('mutationCallback is NOT function: ', props.mutationCallback)
        } else {
          console.log('mutationCallback is function')
          // props.mutationCallback({
          //   id: insert_chat_messages.returning[0].id,
          //   createdAt: insert_chat_messages.returning[0].createdAt,
          //   firstName: insert_chat_messages.returning[0].sender.firstName,
          //   content: insert_chat_messages.returning[0].content,
          // });
        }
      }
    }
  )


  // Mutation component. Add message to the state of <RenderMessages> after mutation.
  return (
    <div>
      <form onSubmit={sendMessage}>
        <div className="textboxWrapper">
          <TypingIndicator userId={props.userId} />
          <TextEditorSSR
            // errorMessage={errors.description}
            // touched={touched.description}
            onChange={(value) => {
              handleTyping(value)
              setDescription(value)
            }}
            resetSlate={resetSlate}
            // limit={{
            //   max: maxLengthProductDescription, // 2000 chars
            // }}
          />
          <Button
            variant={"outlined"}
            className={clsx(classes.sendButton, classes.typoButton)}
            onClick={sendMessage}
          >
            Send
          </Button>

          <Button
            variant={"outlined"}
            className={clsx(classes.sendButton, classes.typoButton)}
            onClick={dispatchResetSlate}
          >
            Reset slate.js
          </Button>
        </div>
      </form>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  userId: string;
  userName: string;
  scrollToNewMessage?(): void;
  numOfNewMessages?: number;
  mutationCallback?(a: any): void;
}
interface MutData {
  insert_chat_messages: Chat_Messages_Mutation_Response
}
interface MutVars {
  msgId: string
  chatId: string
  senderId: string
  content: string
  previewItemId?: string
}

const styles = (theme: Theme) => createStyles({
  sendButton: {
  },
  typoButton: {
  },
  textBox: {
  },
  typoTextbox: {
    // fontSize: '16px',
    // height: '40px',
    // width: '75%',
    // marginRight: '1%',
    // fontWeight: 300,
    // border: '1px solid #ececec',
    // borderRadius: '5px',
    // padding: 0,
    // paddingLeft: '10px',
    // display: 'inline-block',
    // backgroundColor: '#f6f6f7',
  },
})


export default withStyles(styles)( Textbox );