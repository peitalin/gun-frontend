import React from "react";
// styles
import clsx from 'clsx';
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BoxShadows, isThemeDark } from "layout/AppTheme";
// MUI
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
// Graphql
import { useMutation } from "@apollo/client";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  UserPrivate,
  NewsItem,
  Role ,
  ExternalProductCreateInput,
} from "typings/gqlTypes";
import { GrandReduxState } from "reduxStore/grand-reducer";
// snackbar
import { useSnackbar } from "notistack";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link"



const NewsItemEditLinkIcon: React.FC<ReactProps> = (props) => {


  const {
    classes,
    externalProductId,
  } = props;

  const snackbar = useSnackbar()

  const user = useSelector<GrandReduxState, UserPrivate>(s => {
    return s.reduxLogin.user
  })

  // const [
  //   suspendNewsItem,
  //   response
  // ] = useMutation<Mdata, Mvar>(SUSPEND_UNSUSPEND_NEWS_ITEM, {
  //   variables: {
  //     newsItemId: props.newsItem?.id,
  //     isSuspended: true
  //   },
  //   onCompleted: (data) => {
  //     snackbar.enqueueSnackbar(
  //       `Suspended NewsItem ${data?.suspendUnsuspendNewsItem?.id}`,
  //       { variant: "info" }
  //     )
  //   },
  // })

  if (
    user?.userRole !== Role.PLATFORM_ADMIN
    && user?.userRole !== Role.PLATFORM_EDITOR
  ) {
    return null
  }

  return (
    <Tooltip title={"Edit News Item"}>
      <Link
        href={"/trending/edit/[externalProductId]"}
        as={`/trending/edit/${externalProductId}`}
      >
        <a>
          <IconButton
            onClick={(e) => {
              // prevent click-through to underlying product card
              e.stopPropagation();
            }}
            // onMouseEnter={() => setHover(true)}
            // onMouseLeave={() => setHover(false)}
            className={classes.suspendNewsItemRoot}
            // size="small"
            style={{
              top: 'calc(50% - 16px)',
              padding: '.25rem', // determines button radius size
              ...props.style
            }}
            size="large">
            <EditIcon classes={{
              root: classes.editRootIcon,
            }}/>
          </IconButton>
        </a>
      </Link>
    </Tooltip>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem;
  style?: any;
  externalProductId?: string
}

interface Mdata {
  editExternalProduct: NewsItem
}
interface Mvar {
  externalProductId: string
  externalProductCreateInput: ExternalProductCreateInput
}


const styles = (theme: Theme) => createStyles({
  suspendNewsItemRoot: {
    position: 'absolute',
    zIndex: 1,
    right: '1rem',
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    // border: `1px solid ${Colors.black}`,
    boxShadow: BoxShadows.shadow3.boxShadow,
    transform: "scale(1.2)",
    "&:hover": {
      backgroundColor: isThemeDark(theme)
        ? Colors.uniswapMediumNavy
        : Colors.slateGrey,
      transform: "scale(1.4)",
      "& > span > svg": {
        fill: Colors.yellow,
      },
    },
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
    }),
  },
  editRootIcon: {
    width: '1rem',
    height: '1rem',
    fill: Colors.lightRed,
  },
});


export default withStyles(styles)( NewsItemEditLinkIcon );