import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";

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
import { serializeHtml, EMPTY_ELEM } from 'components/TextEditor/helpersSerializers';
import { initialValue } from 'components/TextEditor/helpersElements';
import { customAlphabet } from 'nanoid'
const ID_ALPHABET = "123456789bcdfghjklmnpqrstvwxyz";
const ID_LENGTH = 8;
const nanoid = customAlphabet(ID_ALPHABET, ID_LENGTH)

import {
  INSERT_BID_MESSAGE,
  INSERT_MESSAGE,
  EMIT_TYPING_EVENT,
} from "queries/chat-mutations";

import TextInputAdorned from 'components/Fields/TextInputAdorned';
import { Rifm } from 'rifm';
import { formatCurrency, parseNumber} from "utils/currencyInput";
// Typings
import { asCurrency as c } from "utils/prices";
/// Debounce
import { useDebouncedCallback } from 'use-debounce';



export const Textbox: React.FC<ReactProps> = (props) => {

  const [description, setDescription] = React.useState(initialValue)
  const [resetSlate, setResetSlate] = React.useState(false)
  const [showBidMenu, setShowBidMenu] = React.useState(false)
  const [offerPrice, setOfferPrice] = React.useState(undefined)

  const { product, classes } = props;
  const apolloClient = useApolloClient();

  // const handleTyping = (text) => {
  //   const textLength = text.length;
  //   if (text === EMPTY_ELEM)

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
    if (!htmlDescription || htmlDescription === EMPTY_ELEM) {
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
    if (!htmlDescription || htmlDescription === EMPTY_ELEM) {
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
      variantId: props.product.productVariants[0].variantId,
      variantSnapshotId: props.product.productVariants[0].variantSnapshotId,
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

  // Debounce Formik State changes to limit lag
  const [updatePrice] = useDebouncedCallback((e: any) => {
    let cents = Math.round(parseFloat(e)) // round: 200.9999 => 201
    console.log('cents: ', cents)
    if (cents) {
      setOfferPrice(cents)
    } else {
      // setOfferPrice(undefined)
    }
  }, 16);


  // RIFM - masking currency values
  const [displayedPrice, setDisplayedPrice] = React.useState(
    c(0) || ''
  );

  // Mutation component. Add message to the state of <RenderMessages> after mutation.
  return (
    <form onSubmit={sendMessage}>
      <div className={classes.textboxWrapper}>
        <TypingIndicator userId={props.userId} />
        <div className={classes.textEditorWrapper}>

          <Rifm
            // $ need to be in regexp to prevent cursor jumping on backspace
            accept={/[\d.]/g}
            format={formatCurrency}
            value={displayedPrice}
            onChange={value => {
              // values before currency mask
              // multiple by 100 as formik/graphql takes cents, not dollars
              let dollars = parseNumber(value)
              setDisplayedPrice(dollars)
              updatePrice(dollars * 100)
              // multiple by 100 as formik/graphql takes cents, not dollars
            }}
          >
            {({ value, onChange }) => (
              <TextInputAdorned
                startAdornment={"$ "}
                name={'bid'}
                type="currency"
                // placeholder="0.00"
                placeholder={"Enter a bid"}
                className={classes.inputField}
                value={value || ""}
                onChange={(e) => {
                  e.persist()
                  onChange(e)
                }}
                inputProps={{ style: { width: '100%', marginLeft: '0.25rem' }}}
                // errorMessage={
                //   errors?.currentVariants?.[position]?.price
                //   ? errors.currentVariants[position].price
                //   : null
                // }
                // touched={touched?.currentVariants?.[position]?.price}
                // validationErrorMsgStyle={{
                //   bottom: '-1.15rem',
                // }}
              />
            )}
          </Rifm>


          <TextEditorSSR
            onChange={(value) => {
              setDescription(value)
            }}
            resetSlate={resetSlate}
            className={classes.textEditorRoot}
            placeholder={"Send a message"}
            editorStyle={{
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
    bottom: 8,
    right: 8,
  },
  sendBidButton: {
    position: 'absolute',
    bottom: 8,
    left: 8,
  },
  typoButton: {
    position: 'absolute',
    bottom: 8,
    right: '5rem',
  },
  textBox: {
  },
  textboxWrapper: {
    position: 'relative',
  },
  textEditorRoot: {
    background: theme.palette.type === 'dark'
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    borderRadius: BorderRadius,
  },
  textEditorWrapper: {
    height: '100%',
    marginTop: '0.5rem',
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