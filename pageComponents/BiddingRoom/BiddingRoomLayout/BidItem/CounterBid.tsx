import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Message, Bid, BidStatus } from "typings/gqlTypes";
// Styles
import {
  Colors,
  BoxShadows,
  BorderRadius2x,
  BorderRadius3x,
  BorderRadius,
  isThemeDark,
  Gradients,
} from "layout/AppTheme";
// gql
import { useMutation } from "@apollo/client";
import { UPDATE_BID_MESSAGE } from "queries/chat-mutations";
// format
import { useTheme } from "@material-ui/core";
import { formatNiceDate } from "utils/dates";
import { asCurrency as c } from "utils/prices";

import ConfirmActionModal from "components/ConfirmActionModal";
import ButtonLoading from "components/ButtonLoading";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import CallMissedIcon from '@material-ui/icons/CallMissed';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ReplyIcon from '@material-ui/icons/Reply';
import BlockIcon from '@material-ui/icons/Block';



const CounterBid = (props: BidProps) => {

  const {
    classes,
    bidDisabled,
    message: m,
  } = props;

  const theme = useTheme()

  const [openModal, setOpenModal] = React.useState(false)

  const [updateBidMessage, { data, loading }] = useMutation<MutData, MutVars>(
    UPDATE_BID_MESSAGE, {
      variables: {
        bidId: undefined,
        bidStatus: undefined,
      },
      onCompleted: (data) => {
        console.log(data)
      },
    }
  )

  return (
    <div className={clsx(
      classes.messageRoot,
      bidDisabled && classes.disabled
    )}>

      <CallMissedIcon
        className={classes.icon1}
      />

      <div className={clsx(classes.flexCol, classes.columnUser)}>
        <div className={classes.userAndTime}>
          You made a counter offer
        </div>
        <div className={classes.messageTime}>
          {formatNiceDate(m.createdAt)}
        </div>
      </div>

      <div className={clsx(classes.flexCol, classes.columnBid)}>
        <div>
          {`${c(m?.bid?.offerPrice)}`}
        </div>
        <div className={classes.bidStatusText}>
          {`${m?.bid?.bidStatus}`}
        </div>
      </div>

      <div className={clsx(classes.flexRow, classes.columnBidActions)}>
        <Tooltip placement={"top"}
          title={bidDisabled ? "Disabled" : "Withdraw Bid"}
        >
          <IconButton
            className={clsx(
              classes.bidMsgButton,
              bidDisabled ? classes.bidMsgDisabled : classes.bidMsgRed,
            )}
            onClick={() => setOpenModal(true)}
            disabled={bidDisabled}
          >
            <BlockIcon
              className={bidDisabled ? null : classes.bidMsgRed}
            />
          </IconButton>
        </Tooltip>
      </div>

      <ConfirmActionModal
        title={"Do you wish to withdraw this bid?"}
        showModal={openModal}
        setShowModal={() => setOpenModal(s => !s)}
        onConfirmFunction={async() => {
          let response = await updateBidMessage({
            variables: {
              bidId: m.bid.id,
              bidStatus: BidStatus.WITHDRAWN,
            }
          })
        }}
      />

    </div>
    )
}


interface BidProps extends WithStyles<typeof styles> {
  message: Message;
  bidDisabled: boolean;
}


interface MutData {
  updateBid: Bid[]
}
interface MutVars {
  bidId: string
  bidStatus: string
}

const styles = (theme: Theme) => createStyles({
  messageRoot: {
    transform: "translate(1rem, -1.5rem)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: '1rem',
    padding: '0.5rem',
    width: 'calc(100% - 4rem)',
    background: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Gradients.gradientGrey.background,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.purple}`
      : `1px solid ${Colors.blue}`,
    borderRadius: BorderRadius,
    boxShadow: isThemeDark(theme)
      ? BoxShadows.shadowWhite.boxShadow
      : BoxShadows.shadow4.boxShadow,
  },
  disabled: {
    // opacity: '0.8',
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapNavy}`
      : `1px solid ${Colors.slateGreyDarkest}`,
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  columnUser: {
    flexBasis: '30%',
    flexGrow: 1,
  },
  columnBid: {
    flexBasis: '39%', // align with TheirBid prices
    alignItems: "center",
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
  },
  columnBidActions: {
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
  },
  userAndTime: {
    lineHeight: '1.125rem',
    fontSize: '0.9rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyBlack,
      // marginBottom: '0.25rem',
  },
  userId: {
    fontSize: '0.8rem',
    textTransform: "uppercase",
    marginLeft: '0.25rem',
    fontWeight: 600,
  },
  icon1: {
    marginLeft: '0.25rem',
    marginRight: '0.75rem',
    // transform: 'scaleX(-1)',
    fill: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack
  },
  messageTime: {
    textAlign: 'right',
    paddingRight: '4px',
    fontSize: '12px',
    color: Colors.darkGrey,
  },
  bidStatusText: {
    textAlign: 'center',
    fontSize: '11px',
    fontWeight: 600,
    color: isThemeDark(theme)
      ? Colors.uniswapMediumGrey
      : Colors.slateGreyDarkest,
  },
  bidMsgButton: {
    color: Colors.cream,
    height: 36,
    width: 36,
  },
  bidMsgRed: {
    fill: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    "&:hover": {
      "& > span > svg": {
        fill: Colors.lightRed,
      }
    },
  },
  bidMsgBlue: {
    fill: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    "&:hover": {
      "& > span > svg": {
        fill: Colors.ultramarineBlueLight,
      }
    },
  },
  bidMsgPurple: {
    fill: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    "&:hover": {
      "& > span > svg": {
        fill: Colors.purple,
      }
    },
  },
  bidMsgDisabled: {
  },
})


export default withStyles(styles)(CounterBid)