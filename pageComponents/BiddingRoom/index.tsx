
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
import { UserPrivate } from "typings/gqlTypes";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Material UI
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import ResponsivePadding from "pageComponents/SellerDashboard/ResponsivePadding";
import AlignCenterLayout from "components/AlignCenterLayout";




const CreateBidForm: React.FC<ReactProps> = (props) => {

  const {
    classes,
    asModal = false,
  } = props

  const user = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );
  const userId = user?.id
  const theme = useTheme();

  return (
    <AlignCenterLayout
      className={classes.biddingRoomRoot}
      withRecommendations={false}
    >
      <ResponsivePadding>
        {
          userId &&
          <BiddingRoomLayout
            user={user}
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
    backgroundColor: "rgba(47, 57, 65, .85)",
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
