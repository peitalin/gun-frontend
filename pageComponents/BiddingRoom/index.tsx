
import React from 'react';
// Styles
import { Colors, BoxShadows, BorderRadius2x } from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// graphql
import { useSubscription } from '@apollo/client';
import { useApolloClient } from "@apollo/client";
// components
import Typography from '@material-ui/core/Typography';
import BiddingRoomLayout from './BiddingRoomLayout';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { GrandReduxState, Actions } from 'reduxStore/grand-reducer';
import { UserPrivate, ChatRoomStatus } from "typings/gqlTypes";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Material UI
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import ResponsivePadding from "pageComponents/SellerDashboard/ResponsivePadding";
import AlignCenterLayout from "components/AlignCenterLayout";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



const CreateBidForm: React.FC<ReactProps> = (props) => {

  const {
    classes,
    asModal = false,
  } = props

  const user = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );
  const userId = user?.id
  // const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AlignCenterLayout
      className={classes.biddingRoomRoot}
      withRecommendations={false}
    >
      <ResponsivePadding>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Active Bids" />
          <Tab label="Archived Bids" />
        </Tabs>
        {
          userId &&
          value === 0 &&
          <BiddingRoomLayout
            user={user}
            chatRoomStatuses={[
              ChatRoomStatus.ACTIVE
            ]}
          />
        }
        {
          userId &&
          value !== 0 &&
          <BiddingRoomLayout
            user={user}
            chatRoomStatuses={[
              ChatRoomStatus.ARCHIVED,
              ChatRoomStatus.COMPLETED
            ]}
          />
        }
      </ResponsivePadding>
    </AlignCenterLayout>
  )
};

interface ReactProps extends WithStyles<typeof styles> {
  asModal?: boolean
}


const styles = (theme: Theme) => createStyles({
  biddingRoomRoot: {
    width: '100%',
    display: 'flex',
    paddingTop: '2rem',
    flexDirection: "column",
    justifyContent: 'center',
    background: 'transparent',
  },
  chatContainer: {
    overflow: "hidden",
    // background: theme.colors.uniswapDarkNavy,
    // borderRadius: BorderRadius2x,
    // boxShadow: BoxShadows.shadow1.boxShadow,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productColumn60: {
    flexBasis: '60%',
    flexGrow: 1,
    minWidth: 360,
  },
  productColumn40: {
    flexBasis: '40%',
    flexGrow: 1,
    minWidth: 280,
  },
  maxWidth: {
    maxWidth: '1160px', // 4 products per row
  },
  // modal classes
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    // maxHeight: "calc(100% - 32px)",
    background: 'transparent',
    boxShadow: 'unset',
  },
  fullMaxHeight: {
    maxHeight: "100%",
    width: '100%',
  },
});


export default withStyles(styles)( CreateBidForm );
