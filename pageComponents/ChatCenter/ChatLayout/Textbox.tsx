import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";

import { useMutation, useApolloClient } from "@apollo/client";
import gql from 'graphql-tag';
import TypingIndicator from './TypingIndicator';
import { v4 as uuidv4 } from "uuid"
import { Chat_Messages_Mutation_Response, Products } from "typings/gqlTypes";
import Button from "@material-ui/core/Button";
import TextInput from "components/Fields/TextInput";

import dynamic from "next/dynamic";
import TextEditorPlaceholder from 'components/TextEditor/TextEditorPlaceholder';
const TextEditorSSR = dynamic(() => import('components/TextEditor'), {
  loading: () => <TextEditorPlaceholder/>,
  ssr: false
})
import { serializeHtml, initialValue, EMPTY_STATE } from 'components/TextEditor/helpers';
import { customAlphabet } from 'nanoid'
const ID_ALPHABET = "123456789bcdfghjklmnpqrstvwxyz";
const ID_LENGTH = 8;
const nanoid = customAlphabet(ID_ALPHABET, ID_LENGTH)



const INSERT_MESSAGE = gql`
  mutation sendChatMessage(
    $msgId: String!
    $chatRoomId: String!
    $senderId: String!
    $content: String!
    $previewItemId: String
  ) {
    insert_chat_messages(objects: [{
      id: $msgId,
      chatRoomId: $chatRoomId,
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

const INSERT_BID_MESSAGE = gql`
  mutation sendBidMessage(
    $msgId: String!
    $chatRoomId: String!
    $senderId: String!
    $content: String!
    $bidId: String!
    $productId: String!
    $productSnapshotId: String!
    $variantId: String!
    $variantSnapshotId: String!
    $offerPrice: Int!
    $bidStatus: String!
  ) {
    insert_chat_messages(objects: [{
      id: $msgId,
      chatRoomId: $chatRoomId,
      content: $content,
      senderId: $senderId,
      bidId: $bidId,
    }]) {
      affected_rows
    }

    insert_bids(objects: [{
      id: $bidId,
      productId: $productId,
      productSnapshotId: $productSnapshotId,
      variantId: $variantId,
      variantSnapshotId: $variantSnapshotId,
      offerPrice: $offerPrice,
      bidStatus: $bidStatus
    }]) {
      affected_rows
    }
  }
`;


const UPDATE_BID_MESSAGE = gql`
  mutation updateBid(
    $bidStatus: String!
  ) {

    update_bids(objects: [{
      id: $bidId,
      offerPrice: $offerPrice,
      bidStatus: $bidStatus
    }]) {
      affected_rows
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

  const [description, setDescription] = React.useState(initialValue)
  const [resetSlate, setResetSlate] = React.useState(false)
  const [showBidMenu, setShowBidMenu] = React.useState(false)
  const [offerPrice, setOfferPrice] = React.useState(undefined)

  const { product, classes } = props;
  const apolloClient = useApolloClient();

  // const handleTyping = (text) => {
  //   const textLength = text.length;
  //   if (text === EMPTY_STATE)

  //   if ((textLength !== 0 && textLength % 5 === 0) || textLength === 1) {
  //     emitTypingEvent();
  //   }
  //   setState(s => ({ ...s, text }));
  // }

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
    console.log("chatRoomId: ", props.chatRoomId)

    insertMessage({
      variables: {
        msgId: `msg_${uuidv4()}`,
        chatRoomId: props.chatRoomId,
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


  const sendBidMessage = (e) => {
    e.preventDefault();
    // serialize Slate rich-text object as html
    let htmlDescription = serializeHtml(description)
    if (!htmlDescription || htmlDescription === EMPTY_STATE) {
      return;
    }
    console.log("chatRoomId: ", props.chatRoomId)
    let variables = {
      msgId: `msg_${nanoid()}`,
      chatRoomId: props.chatRoomId,
      senderId: props.userId,
      content: htmlDescription,
      // content: state.text,
      bidId: `bid_${nanoid()}`,
      productId: props.product.id,
      productSnapshotId: props.product.currentSnapshotId,
      variantId: props.product.product_variants[0].variantId,
      variantSnapshotId: props.product.product_variants[0].variantSnapshotId,
      offerPrice: offerPrice,
      bidStatus: "CREATED",
    }
    console.log("viarables: ", variables)

    insertBidMessage({
      variables: variables
    }).then(res => {
      setDescription(initialValue)
      dispatchResetSlate()
    });
  }


  const [insertMessage, msgMutationResponse] = useMutation<MutData, MutVars>(
    INSERT_MESSAGE, {
      // variables: { }, // add later in sendMessage()
    }
  )

  const [insertBidMessage, bidMutationResponse] = useMutation<MutData, MutVarsBid>(
    INSERT_BID_MESSAGE, {
      // variables: { }, // add later in sendMessage()
      onCompleted: (data) => {
        console.log(data)
      },
    }
  )


  // Mutation component. Add message to the state of <RenderMessages> after mutation.
  return (
    <div>
      <form onSubmit={sendMessage}>
        <div className={classes.textboxWrapper}>
          <TypingIndicator userId={props.userId} />
          <div className={classes.textEditorWrapper}>

            <TextInput
              placeholder={"Enter a bid"}
              className={classes.inputField}
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              inputProps={{
                style: { width: '100%' },
              }}
            />

            <TextEditorSSR
              // errorMessage={errors.description}
              // touched={touched.description}
              onChange={(value) => {
                setDescription(value)
              }}
              resetSlate={resetSlate}
              // limit={{
              //   max: maxLengthProductDescription, // 2000 chars
              // }}
              editorStyle={{
                border: 'unset',
                // borderTop: '2px solid rgba(170, 170, 170, 0.4)',
                borderTop: '2px solid #fff',
                borderRadius: '0px',
              }}
            />

            <Button
              variant={"outlined"}
              className={clsx(classes.sendButton)}
              onClick={sendMessage}
            >
              Send
            </Button>

            <Button
              variant={"outlined"}
              className={clsx(classes.sendBidButton)}
              onClick={sendBidMessage}
              // onClick={() => {
              //   setShowBidMenu(s => !s)
              // }}
            >
              Create Bid
            </Button>

            <Button
              variant={"outlined"}
              className={clsx(classes.typoButton)}
              onClick={dispatchResetSlate}
            >
              Reset slate.js
            </Button>
          </div>
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
  chatRoomId: string;
  product: Products;
}
interface MutData {
  insert_chat_messages: Chat_Messages_Mutation_Response
}
interface MutVars {
  msgId: string
  chatRoomId: string
  senderId: string
  content: string
  previewItemId?: string
}
interface MutVarsBid {
  msgId: string
  chatRoomId: string
  senderId: string
  content: string
  // previewItemId?: string
  bidId: string
  productId: string
  productSnapshotId: string
  variantId: string
  variantSnapshotId: string
  offerPrice: number
  bidStatus: string
}

const styles = (theme: Theme) => createStyles({
  sendButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
  },
  sendBidButton: {
    position: 'absolute',
    bottom: 4,
    left: '0rem',
  },
  typoButton: {
    position: 'absolute',
    bottom: 4,
    right: '5rem',
  },
  textBox: {
  },
  textboxWrapper: {
    position: 'relative',
  },
  textEditorWrapper: {
    background: Colors.white,
    height: '100%',
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
  inputField: {
    flexGrow: 1,
    minWidth: 100,
    marginBottom: '0.5rem',
  },
})


export default withStyles(styles)( Textbox );