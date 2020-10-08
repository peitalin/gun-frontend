import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows } from "layout/AppTheme";

// redux
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { useSelector, useDispatch } from "react-redux";
// Typings
import {
  GET_BUYER_ORDERS_CONNECTION,
  GET_SELLER_ORDERS_CONNECTION,
} from "queries/orders-queries";
// graphl
import { useMutation, useQuery } from "@apollo/client";

// Utils Components
import ErrorBounds from "components/ErrorBounds";
import Tick from "components/Icons/Tick";
// MUI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Subcomponents
import ToolTips from "pageComponents/MyOrders/ToolTips";
import OrderRowSellers from "pageComponents/MyOrders/OrderRowSellers";
import OrderRowBuyers from "pageComponents/MyOrders/OrderRowBuyers";
import PurchaseSuccessBanner from "pageComponents/MyOrders/PurchaseSuccessBanner";
import {
  UserPrivate,
  OrderStatus,
  OrdersConnection,
  Orders,
  Order_By,
  Orders_Order_By,
} from "typings/gqlTypes";
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Utils Component
import ErrorDisplay from "components/Error";
import PaginateButtons from "components/Paginators/PaginateButtons";
export const MY_DOWNLOADS_PAGINATION_COUNT = 10;
import AlignCenterLayout from "components/AlignCenterLayout";
import DescriptionLoading from "pageComponents/FrontPage/PreviewCardResponsiveCarousel/DescriptionLoading";
// Analytics
import { useRouter } from "next/router";




const MyOrders: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const router = useRouter();

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"));

  const buyerOrdersResponse = useQuery<QueryData, QueryVar>(
    GET_BUYER_ORDERS_CONNECTION, {
      variables: {
        query: {
          limit: 30,
          offset: 0,
          orderBy: { createdAt: Order_By.DESC }
        }
      },
      fetchPolicy: "network-only",
    }
  );

  const sellerOrdersResponse = useQuery<QueryData2, QueryVar2>(
    GET_SELLER_ORDERS_CONNECTION, {
      variables: {
        query: {
          limit: 10,
          offset: 0,
          orderBy: { createdAt: Order_By.DESC }
        }
      },
      fetchPolicy: "network-only",
    }
  );

  // console.log("buyer data::::: ", buyerOrdersResponse)
  // console.log("seller data::::: ", sellerOrdersResponse)

  const buyerOrdersConnection = option(buyerOrdersResponse)
    .data.user.buyerOrdersConnection() || props.initialBuyerOrders;

  const sellerOrdersConnection = option(sellerOrdersResponse)
    .data.user.sellerOrdersConnection() || props.initialSellerOrders;

  if (buyerOrdersResponse.loading || sellerOrdersResponse.loading) {
    return (
      <OrdersLayout {...props}>
        {
          [1,2,3,4,5].map(x => {
            return (
            <DescriptionLoading
              key={x}
              rowFormat
              height={xsDown ? 112 : 245}
              mobilePicHeight={xsDown ? 60 : 80}
              mobilePicWidth={xsDown ? 96 : 128}
              style={{
                marginTop: '0rem',
                marginRight: '1rem',
              }}
            />
            )
          })
        }
      </OrdersLayout>
    )
  } else if (
    !option(buyerOrdersConnection).edges[0]() &&
    !option(sellerOrdersConnection).edges[0]()
  ) {
    return (
      <OrdersLayout {...props}>
        <div className={classes.emptyItems}>
          <Typography variant="body1" className={classes.emptyItemsTitle}>
            Your saved orders will appear here
            after you make your first deposit.
          </Typography>
          <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            router.push(`/categories`)
          }}
          >
            Browse Categories
          </Button>
        </div>
      </OrdersLayout>
    )
  } else if (buyerOrdersResponse.error) {
    return (
      <ErrorDisplay title={"Orders couldn't load."}
        error={buyerOrdersResponse.error}
      />
    )
  } else if (sellerOrdersResponse.error) {
    return (
      <ErrorDisplay title={"Orders couldn't load."}
        error={sellerOrdersResponse.error}
      />
    )
  } else {
    return (
      <OrdersLayout {...props}>
        <OrdersSection
          classes={props.classes}
          title={"Your Purchases"}
        >
          {
            (option(buyerOrdersConnection).edges([]).length > 0) &&
            buyerOrdersConnection.edges.map(({ node: order }, i) => {
              return (
                <OrderRowBuyers
                  key={i}
                  order={order}
                />
              )
            })
          }
        </OrdersSection>
        <div className={classes.divider}/>
        <OrdersSection
          classes={props.classes}
          title={"Your Sales"}
        >
          {
            (option(sellerOrdersConnection).edges([]).length > 0) &&
            sellerOrdersConnection.edges.map(({ node: order }, i) => {
              return (
                <OrderRowSellers
                  key={i}
                  order={order}
                />
              )
            })
          }
        </OrdersSection>
      </OrdersLayout>
    )
  }
}


const OrdersLayout: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const dispatch = useDispatch();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <ErrorBounds className={"fadeInFast"}>
      {/* {
        claimOrders &&
        claimOrders.length > 0 &&
        <PurchaseSuccessBanner />
      } */}
      <AlignCenterLayout
        maxWidth={960}
        className={clsx(classes.marginTop2)}
        withRecommendations
      >
        <div className={clsx(classes.flexRowOuter)}>
          <Typography className={classes.title} variant="h3">
            My Orders
          </Typography>
        </div>
        <div className={clsx(classes.flexRowOuter)}>
          <div className={classes.productColumn60}>
            {props.children}
          </div>
          <div className={classes.productColumn20}>
            <ToolTips/>
          </div>
        </div>
      </AlignCenterLayout>
    </ErrorBounds>
  )
}


const OrdersSection: React.FC<ReactProps> = (props) => {

  const {
    classes,
    title = "Your Purchases"
  } = props;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <div className={classes.ordersSectionContainer}>
      <Typography variant="h4" className={classes.heading}>
        {title}
      </Typography>
      {props.children}
    </div>
  )
}

interface QueryData {
  user: UserPrivate
}
interface QueryVar {
}
interface QueryData2 {
  user: UserPrivate
}
interface QueryVar2 {
}

// interface MutationData {
//   order: Order;
// }
// interface MutationVar {
// }


interface ReactProps extends WithStyles<typeof styles> {
  initialBuyerOrders?: OrdersConnection;
  initialSellerOrders?: OrdersConnection;
  title?: string;
}

const styles = (theme: Theme) => createStyles({
  flexRowOuter: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: 960,
    flexWrap: "wrap",
  },
  productColumn60: {
    flexBasis: '60%',
    flexGrow: 1,
    minWidth: 330,
    marginBottom: '1rem',
  },
  productColumn20: {
    flexBasis: '20%',
    flexGrow: 1,
    minWidth: 280,
    maxWidth: 400,
  },
  title: {
    marginBottom: '2rem',
    marginTop: '2rem',
  },
  heading: {
    marginBottom: '1rem',
    marginTop: '1rem',
  },
  toolTip1: {
    padding: '1.5rem 2rem',
    marginLeft: '1rem',
    marginBottom: '1rem',
    border: '1px solid #eaeaea',
    borderRadius: '4px',
    backgroundColor: '#FCFCFE'
  },
  toolTip2: {
    padding: '1.5rem 2rem',
    marginLeft: '1rem',
    marginBottom: '1rem',
    border: '1px solid #eaeaea',
    borderRadius: '2px',
    backgroundColor: '#FCFCFE'
  },
  pageRecommendationsContainer: {
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
  },
  pageRecommendations: {
    marginTop: '1rem',
    padding: '1rem',
  },
  purchaseSuccessText: {
    color: Colors.cream,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginTop2: {
    marginTop: '2rem',
  },
  padding2: {
    padding: '2rem',
  },
  padding1: {
    padding: '1rem',
  },
  padding05: {
    padding: '0.5rem',
  },
  purchaseSuccessBackground: {
    width: '100%',
    background: Colors.green,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tick: {
    marginRight: '0.5rem',
  },
  clearButton: {
    position: "absolute",
    right: "1rem",
  },
  emptyItems: {
    minHeight: 300,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
    border: `1px solid ${Colors.lightGrey}`,
    borderRadius: '4px',
    width: '100%',
    padding: '3rem',
  },
  emptyItemsTitle: {
    marginBottom: '1rem',
  },
  divider: {
    width: '100%',
    borderBottom: `1px solid ${Colors.slateGrey}`,
  },
  ordersSectionContainer: {
    marginTop: "1rem",
  },
});


export default withStyles(styles)(MyOrders);



