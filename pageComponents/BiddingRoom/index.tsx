
import React from 'react';
// Styles
import { Colors, BoxShadows, BorderRadius2x } from "layout/AppTheme";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// graphql
import { useSubscription } from '@apollo/client';
import { useApolloClient } from "@apollo/client";
// components
import Typography from '@mui/material/Typography';
import BiddingRoomLayout from './BiddingRoomLayout';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { GrandReduxState, Actions } from 'reduxStore/grand-reducer';
import { UserPrivate, ChatRoomStatus } from "typings/gqlTypes";
// css
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// Material UI
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import ResponsivePadding from "pageComponents/SellerDashboard/ResponsivePadding";
import AlignCenterLayout from "components/AlignCenterLayout";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



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

  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newTab: number) => {
    setTab(newTab);
  };

  return (
    <AlignCenterLayout
      className={classes.biddingRoomRoot}
      withRecommendations={false}
    >
      <ResponsivePadding>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Active Bids" />
          <Tab label="Archived Bids" />
        </Tabs>
        {
          userId &&
          tab === 0 &&
          <BiddingRoomLayout
            user={user}
            chatRoomStatuses={[
              ChatRoomStatus.ACTIVE
            ]}
          />
        }
        {
          userId &&
          tab !== 0 &&
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
