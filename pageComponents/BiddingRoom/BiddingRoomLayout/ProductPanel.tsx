import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Apollo
import { useMutation } from '@apollo/client';
import { UPDATE_CHAT_STATUS } from "queries/chat-mutations";
import { Conversation, ChatRoomStatus, ChatRoom, UserPrivate } from "typings/gqlTypes";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// MUI
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Typography from "@material-ui/core/Typography";
import ProductPreviewCardRowSmall from "components/ProductPreviewCardRowSmall";
// UI components
import ButtonLoading from "components/ButtonLoading";



const ProductPanel: React.FC<ReactProps> = (props) => {


  const {
    classes,
    user,
    currentChatRoom: chatRoom,
  } = props;

  const getNextChatStatus = (chatRoomStatus: ChatRoomStatus): string => {
    switch (chatRoomStatus) {
      case ChatRoomStatus.ARCHIVED: {
        return ChatRoomStatus.ACTIVE
      }
      case ChatRoomStatus.ACTIVE: {
        return ChatRoomStatus.ARCHIVED
      }
      default: {
        return ChatRoomStatus.COMPLETED
      }
    }
  }

  const getNextChatStatusAction = (chatRoomStatus: ChatRoomStatus): string => {
    switch (chatRoomStatus) {
      case ChatRoomStatus.ARCHIVED: {
        return "Activate Offer"
      }
      case ChatRoomStatus.ACTIVE: {
        return "Archive Offer"
      }
      case ChatRoomStatus.COMPLETED: {
        return "Purchase Complete"
      }
      default: {
        return "Purchase Complete"
      }
    }
  }

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const chatRoomId = chatRoom?.id
  const product = chatRoom?.product
  const featuredVariant = product?.featuredVariant
  const previewItem = featuredVariant?.previewItems?.[0]


  const buyer = chatRoom?.owner;
  const _seller = (chatRoom?.participants ?? [])
    .find(u => u.userId !== buyer?.id)
  const seller = _seller?.user;
  // chat may be archived for either buyer or seller (depending on their settings)
  const chatStatus = user?.id === seller?.id
    ? chatRoom?.sellerChatStatus
    : chatRoom?.buyerChatStatus

  const [
    updateChatStatus,
    { data, loading, error }
  ] = useMutation<QueryData, QueryVar>(
    UPDATE_CHAT_STATUS, {
      variables: {
        chatRoomId: chatRoomId,
        chatStatus: undefined,
        isSeller: undefined,
        messageLimit: 40,
      }
    }
  );

  // console.log("currentConversation: ", currentConversation)
  // console.log("product:::::", product)
  // console.log("previewItem:::::", previewItem)
  // console.log("archiving offer:::::", data)

  return (
    <div className={classes.productPanelRoot}>
      <div>
        {
          chatRoom &&
          product &&
          <div className={classes.productContainerCol}>
            <Typography variant="h4" className={classes.productTitle}>
              {
                `Seller: ${seller?.license?.licenseNumber}`
              }
            </Typography>
            <ProductPreviewCardRowSmall
              previewItem={previewItem as any}
              title={product.currentSnapshot.title}
              // model={product.currentSnapshot.model}
              // category={product.category as any}
              // price={featuredVariant?.price}
            />
            <div className={classes.buttonContainer}>
              <ButtonLoading
                replaceTextWhenLoading={true}
                loading={loading}
                disabled={loading}
                loadingIconColor={Colors.lightestGrey}
                className={clsx(
                  classes.archiveProductButton,
                  props.iOwnThisProduct
                  ? chatRoom?.sellerChatStatus === ChatRoomStatus.ARCHIVED
                    ? classes.blueButton
                    : classes.redButton
                  : chatRoom?.buyerChatStatus === ChatRoomStatus.ARCHIVED
                    ? classes.blueButton
                    : classes.redButton
                )}
                style={{
                }}
                onClick={() => {
                  updateChatStatus({
                    variables: {
                      chatRoomId: chatRoomId,
                      chatStatus: getNextChatStatus(chatStatus),
                      isSeller: props.iOwnThisProduct,
                      messageLimit: 40,
                    }
                  })
                }}
              >
                {getNextChatStatusAction(chatStatus)}
              </ButtonLoading>
            </div>
          </div>
        }
      </div>
    </div>
  );
};


interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate
  currentChatRoom: ChatRoom
  iOwnThisProduct: boolean
}

interface QueryData {
  updateChatStatus: ChatRoom
}
interface QueryVar {
  chatRoomId: string
  chatStatus: string
  isSeller: boolean
  messageLimit: number
}


let headingColor = Colors.charcoal;
let listItemColor = Colors.charcoal;

const styles = (theme: Theme) => createStyles({
  productPanelRoot: {
  },
  heading: {
    fontWeight: 600,
    padding: '15px 10px',
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: Colors.blue,
    color: headingColor,
    borderBottom: `4px solid ${Colors.white}`,
  },
  mobileHeading: {
    fontSize: '14px',
    backgroundColor: '#222',
    color: headingColor,
    fontWeight: 600,
    marginBottom: 0,
    padding: '5px',
  },
  productContainerCol: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: '1rem',
  },
  productTitle: {
    marginBottom: '1rem',
    textAlign: "center",
  },
  buttonContainer: {
    width: '100%',
    marginTop: '0.5rem',
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BorderRadius,
  },
  archiveProductButton: {
    width: "100%",
    height: "40px",
    fontWeight: 500,
    color: Colors.darkWhite,
    marginBottom: '0.35rem', // paypal button annoying extra space
    // border: `1px solid ${Colors.red}`,
    borderRadius: BorderRadius,
  },
  redButton: {
    background: Colors.red,
    "&:hover": {
      background: Colors.lightRed,
    },
  },
  blueButton: {
    background: Colors.ultramarineBlue,
    "&:hover": {
      background: Colors.ultramarineBlueLight,
    },
  },
})


export default withStyles(styles)( ProductPanel );