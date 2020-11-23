import React from 'react';
import { oc as option } from "ts-optchain";
import { Colors } from "layout/AppTheme";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";

import { useMutation } from '@apollo/client';
import { UPDATE_CHAT_STATUS } from "queries/chat-mutations";
import { Chat_Rooms, Chat_Users, ProductPreviewItem } from "typings/gqlTypes";
// import moment from 'moment';
import dayjs from 'dayjs'
import gql from 'graphql-tag';
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// MUI
import MenuItem from '@material-ui/core/MenuItem';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Typography from "@material-ui/core/Typography";
import ProductPreviewCardRow from "components/ProductPreviewCardRow";
import PreviewCardWide from "components/PreviewCardWide";
// UI components
import ButtonLoading from "components/ButtonLoading";
// money
import currency from "currency.js";



const ProductPanel: React.FC<ReactProps> = (props) => {

  const [state, setState] = React.useState({
    time: new Date(),
    refetch: null,
  })

  const {
    classes,
    currentConversation,
  } = props;

  const getNextChatStatus = (chatRoom: Chat_Rooms): string => {
    if (option(chatRoom).status() === "ARCHIVED") {
      return "ACTIVE"
    } else {
      return "ARCHIVED"
    }
  }

  const getNextChatStatusAction = (chatRoom: Chat_Rooms): string => {
    if (option(chatRoom).status() === "ARCHIVED") {
      return "Activate Offer"
    } else {
      return "Archive Offer"
    }
  }

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const chatRoom = option(currentConversation).chatRoom()
  const chatRoomId = option(chatRoom).id()
  const product = option(chatRoom).product()
  const featuredVariant = option(product).productVariants([]).find(v => v.isDefault)
  const previewItem = option(featuredVariant).previewItems([])[0]

  const priceDisplay = currency(option(featuredVariant).price(1)/100, { formatWithSymbol: true })

  const [
    updateChatStatus,
    { data, loading, error }
  ] = useMutation<QueryData, QueryVar>(
    UPDATE_CHAT_STATUS, {
      variables: {
        chatRoomId: chatRoomId,
        chatStatus: getNextChatStatus(option(currentConversation).chatRoom()),
      }
    }
  );

  // console.log("currentConversation: ", currentConversation)
  // console.log("product:::::", product)
  // console.log("previewItem:::::", previewItem)

  const buyer = option(chatRoom).owner();
  const _seller = option(currentConversation).chatRoom.users([])
    .find(u => u.userId !== buyer.id)

  const seller = option(_seller).user();

  return (
    <div className={classes.productPanelRoot}>
      <div>
        {
          currentConversation &&
          <div className={classes.productContainerCol}>
            <Typography variant="h4" className={classes.productTitle}>
              {
                `${option(seller).firstName()} ${option(seller).lastName()}`
              }
            </Typography>
            <PreviewCardWide
              previewItem={previewItem as any}
              title={product.currentSnapshot.title}
              tagline={product.currentSnapshot.model}
              category={product.category as any}
              price={option(featuredVariant).price()}
              // fit?: boolean; // object-fit the image
              // title: string;
              // tagline: string;
              // category: Categories;
              // price: number;
              // priceWas: number;
              // quantityAvailable?: number;
              // soldOutStatus?: boolean;
              // topHalfFraction?: number;
            />
            <div className={classes.buttonContainer}>
              <ButtonLoading
                replaceTextWhenLoading={true}
                loading={loading}
                disabled={loading}
                loadingIconColor={Colors.lightestGrey}
                style={{
                  width: "100%",
                  height: "40px",
                  fontWeight: 500,
                  color: Colors.darkWhite,
                  marginBottom: '0.35rem', // paypal button annoying extra space
                  // border: `1px solid ${Colors.red}`,
                  background: Colors.red,
                }}
                onClick={() => {
                  updateChatStatus()
                }}
              >
                {getNextChatStatusAction(currentConversation.chatRoom)}
              </ButtonLoading>
              <ButtonLoading
                replaceTextWhenLoading={true}
                loading={loading}
                disabled={loading}
                loadingIconColor={Colors.lightestGrey}
                style={{
                  width: "100%",
                  height: "40px",
                  fontWeight: 500,
                  color: Colors.white,
                  marginBottom: '0.35rem', // paypal button annoying extra space
                  backgroundColor: Colors.lightBlue
                }}
                onClick={() => {
                }}
              >
                Make an Offer
              </ButtonLoading>
              <ButtonLoading
                replaceTextWhenLoading={true}
                loading={loading}
                disabled={loading}
                loadingIconColor={Colors.lightestGrey}
                style={{
                  width: "100%",
                  height: "40px",
                  fontWeight: 500,
                  color: Colors.white,
                  marginBottom: '0.35rem', // paypal button annoying extra space
                  backgroundColor: Colors.blue
                }}
                onClick={() => {
                }}
              >
                { `Buy now for $${priceDisplay} AUD` }
              </ButtonLoading>
            </div>
          </div>
        }
      </div>
    </div>
  );
};


interface ReactProps extends WithStyles<typeof styles> {
  currentConversation?: Chat_Users
}
interface QueryData {
  update_chat: {
    returning: Chat_Rooms
  };
}
interface QueryVar {
  chatRoomId: string
  chatStatus: string
}


let headingColor = Colors.charcoal;
let listItemColor = Colors.charcoal;

const styles = (theme: Theme) => createStyles({
  productPanelRoot: {
  },
  productPanelRootMobile: {
  },
  wd75: {
    width: '25%',
    minWidth: 200,
  },
  userList: {
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
  },
  userListLi: {
    borderBottom: '1px solid #444',
    color: headingColor,
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
  mobileHeadingI: {
    marginLeft: '10px',
  },
  mobileview: {
    position: "absolute",
    right: "0px",
    bottom: "152px",
    width: "50%",
  },
  mobileUserList: {
    backgroundColor: '#4f5050',
    paddingInlineStart: '0px',
    marginBottom: 0,
  },
  onlineUserItem: {
    listStyle: "none",
  },
  menuLink: {
  },
  menuIcon: {
    color: listItemColor,
  },
  menuIconHighlighted: {
    color: Colors.blue,
  },
  menuText: {
    color: listItemColor,
    fontSize: '0.9rem',
    margin: '0.25rem',
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
  },
})


export default withStyles(styles)( ProductPanel );