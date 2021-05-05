
import React from 'react';
// Styles
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
// typings
import { Chat_Rooms, Chat_Messages } from "typings/gqlTypes";
// components
import Typography from '@material-ui/core/Typography';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { GrandReduxState, Actions } from 'reduxStore/grand-reducer';
import { UserPrivate } from "typings/gqlTypes";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Material UI
import Button from "@material-ui/core/Button";
import Link from "next/link";


const OpenChatButton: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props

  return (
    <Link href={"/offers"}>
      <a>
        <Button
          className={classes.chatButton}
          variant="text"
          color={"primary"}
          {...props.buttonProps}
        >
          { props.title ? props.title : "Offers" }
        </Button>
      </a>
    </Link>
  )
};

interface ReactProps extends WithStyles<typeof styles> {
  asModal?: boolean
  title?: string
  chatRoomId?: string
  productId?: string
  buttonProps?: any;
}



const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
  },
  chatContainer: {
    overflow: "hidden",
    boxShadow: BoxShadows.shadow1.boxShadow,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  },
  fullMaxHeight: {
    maxHeight: "100%",
    width: '100%',
  },
  chatButton: {
    width: '100%',
    height: 40,
    borderRadius: BorderRadius,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.purple
      : Colors.green,
    color: Colors.cream,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.purple}`
      : `1px solid ${Colors.green}`,
    "&:hover": {
      border: theme.palette.type === 'dark'
        ? `1px solid ${Colors.purple}`
        : `1px solid ${Colors.green}`,
      backgroundColor: theme.palette.type === 'dark'
        ? fade(Colors.purple, 0.9)
        : fade(Colors.green, 0.9),
    }
  },
});


export default withStyles(styles)( OpenChatButton );
