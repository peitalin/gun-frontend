import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, isThemeDark } from "layout/AppTheme";
// Apollo
import { useMutation } from '@apollo/client';
import { UPDATE_CHAT_STATUS } from "queries/chat-mutations";
import { ChatRoomStatus, Conversation, ChatRoom, UserPrivate, BidStatus } from "typings/gqlTypes";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// MUI
import Typography from "@material-ui/core/Typography";
import ProductPreviewCardRowSmall from "components/ProductPreviewCardRowSmall";
// UI components
import ButtonLoading from "components/ButtonLoading";
import ProductRowMedium from "components/ProductRowMedium";
import CreateBidFormButton from "../CreateBidFormButton";



const ProductPanel: React.FC<ReactProps> = (props) => {


  const {
    classes,
    user,
    currentConversation: conversation,
  } = props;

  const chatRoom = conversation.chatRoom

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
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const chatRoomId = chatRoom?.id
  const product = chatRoom?.product
  const featuredVariant = product?.featuredVariant
  const previewItem = featuredVariant?.previewItems?.[0]


  const buyer = chatRoom?.owner;
  const _seller = (chatRoom?.participants ?? [])
    .find(u => u.userId !== buyer?.id)
  const seller = _seller?.user;
  // chat may be archived for either buyer or seller (depending on their settings)
  const chatRoomStatus = conversation.chatRoomStatus

  const showCreateInitialBid = user.id === buyer.id
    && chatRoom?.messages?.every(msg => {
      return msg.bid?.bidStatus === BidStatus.WITHDRAWN
          || msg.bid?.bidStatus === BidStatus.DECLINED
    })
  // if every bid has been either WITHDRAWN or DECLINED
  // then let the bidder create a new initial bid
  const sellerLicense = product?.sellerLicense

  const [
    updateChatStatus,
    { data, loading, error }
  ] = useMutation<QueryData, QueryVar>(
    UPDATE_CHAT_STATUS, {
      variables: {
        chatRoomId: chatRoomId,
        chatRoomStatus: undefined,
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
      {
        chatRoom &&
        product &&
        <div className={classes.productBidsContainer}>
          <div className={classes.productCardBox}>
            <div className={mdDown ? null : classes.marginOffset}>
              <ProductRowMedium
                product={product}
                loading={loading}
                imageSize={{
                  mobile: {
                    width: 90,
                    height: 60,
                  },
                  desktop: {
                    width: 108,
                    height: 72,
                  },
                }}
              />
            </div>
            <Typography variant="h4" className={classes.productTitle}>
              {
                user.id === seller.id
                ? `Your License: ${sellerLicense?.licenseNumber}`
                : `Seller License: ${sellerLicense?.licenseNumber}`
              }
            </Typography>
          </div>

          <div className={clsx(
            classes.buttonContainer,
          )}>
            <ButtonLoading
              replaceTextWhenLoading={true}
              loading={loading}
              // disabled={loading}
              loadingIconColor={
                chatRoomStatus === ChatRoomStatus.ARCHIVED
                  ? Colors.ultramarineBlueLight
                  : Colors.yellow
              }
              variant="outlined"
              className={clsx(
                classes.archiveProductButton,
                chatRoomStatus === ChatRoomStatus.ARCHIVED
                  ? classes.blueButton
                  : classes.yellowButton
              )}
              style={{
              }}
              onClick={() => {
                updateChatStatus({
                  variables: {
                    chatRoomId: chatRoomId,
                    chatRoomStatus: getNextChatStatus(chatRoomStatus),
                    messageLimit: 40,
                  }
                })
              }}
            >
              {getNextChatStatusAction(chatRoomStatus)}
            </ButtonLoading>

            {
              showCreateInitialBid &&
              <CreateBidFormButton
                title={loading ? "Loading" : "Place another bid"}
                titleText={"Place another bid"}
                sellerUserId={
                  // if storeId, backend won't looks up the user.id for the store
                  // make sure its the store's user.id
                  product?.store?.userId
                }
                disabled={loading}
                // disabled={true}
                product={product}
                openChatAfterwards={true}
              />
            }
          </div>
        </div>
      }
    </div>
  );
};


interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate
  currentConversation: Conversation
  iOwnThisProduct: boolean
}

interface QueryData {
  updateChatStatus: ChatRoom
}
interface QueryVar {
  chatRoomId: string
  chatRoomStatus: string
  messageLimit: number
}


const styles = (theme: Theme) => createStyles({
  productPanelRoot: {
    minWidth: 320,
    width: '100%',
  },
  productBidsContainer: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: '1rem',
  },
  productCardBox: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: '100%',
    marginLeft: '1rem',
  },
  productTitle: {
    fontSize: "0.9rem",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
    textAlign: "center",
    marginBottom: '0.25rem',
  },
  buttonContainer: {
    width: '100%',
    marginTop: '0.5rem',
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderRadius: BorderRadius,
  },
  archiveProductButton: {
    width: "100%",
    maxWidth: 160,
    marginRight: '0.5rem',
    height: "40px",
    fontWeight: 500,
    color: Colors.darkWhite,
    marginBottom: '0.35rem', // paypal button annoying extra space
    borderRadius: BorderRadius,
    marginLeft: '0.5rem',
    background: 'unset',
    "&:hover": {
      background: 'unset',
    },
  },
  yellowButton: {
    color: isThemeDark(theme)
      ? Colors.uniswapMediumGrey
      : Colors.black,
    border: `1px solid ${Colors.charcoal}`,
    "&:hover": {
      color: isThemeDark(theme)
        ? Colors.uniswapLightGrey
        : Colors.slateGreyLightBlack,
      border: `1px solid ${Colors.charcoal}`,
    },
  },
  blueButton: {
    color: Colors.ultramarineBlue,
    border: `1px solid ${Colors.ultramarineBlue}`,
    "&:hover": {
      color: Colors.ultramarineBlueLight,
      border: `1px solid ${Colors.ultramarineBlueLight}`,
    },
  },
  width100: {
    width: '100%',
  },
  marginOffset: {
    width: '100%',
    marginLeft: '-1rem',
  },
})


export default withStyles(styles)( ProductPanel );