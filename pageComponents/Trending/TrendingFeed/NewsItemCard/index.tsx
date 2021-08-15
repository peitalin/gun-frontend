import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius2x, isThemeDark, BoxShadows } from "layout/AppTheme";
import {
  NewsItem,
  UserPrivate,
} from "typings/gqlTypes";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// MUI
import NewsItemCardDetails from "./NewsItemCardDetails";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import Portal from "@material-ui/core/Portal";



const NewsItemCard: React.FC<ReactProps> = (props) => {

  const {
    classes,
    user,
    newsItem,
  } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const [previewLoaded, setPreviewLoaded] = React.useState(false)

  return (
    <div className={clsx(
      props.isModal
        ? classes.newsItemModalPageRootMobile
        : classes.newsItemModalPageRootDesktop,
    )}>
      <IconButton
        className={clsx(
          classes.closeButton,
          props.isModal ? classes.closeButtonMobile : classes.closeButtonDesktop,
        )}
        onClick={props.closeModal}
      >
        <ClearIcon className={classes.clearIcon}/>
      </IconButton>
      <div className={clsx(
        classes.newsItemInnerContainer,
        // previewLoaded && classes.previewLoaded,
      )}>
        <NewsItemCardDetails
          newsItem={newsItem}
          user={user}
          onClick={() => {}}
          setPreviewLoaded={(b) => setPreviewLoaded(b)}
          isSuspended={newsItem?.isSuspended || newsItem?.isDeleted}
          imageSize={{
            mobile: {
              width: '100%',
              height: '100%',
            },
            desktop: {
              width: '100%',
              height: '100%',
            },
          }}
          index={props.index}
          setIndex={props.setIndex}
        />
      </div>
    </div>
  );
};


interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem
  user: UserPrivate
  closeModal(): void;
  isModal: boolean;
  index: number
  setIndex(i: number): void
}


const styles = (theme: Theme) => createStyles({
  newsItemModalPageRootDesktop: {
    position: "relative",
    paddingTop: "1rem",
  },
  newsItemModalPageRootMobile: {
    position: "relative",
    paddingTop: "0rem",
    paddingBottom: "0rem",
    paddingRight: "0rem",
    maxHeight: '100vh',
    minWidth: 360,
  },
  newsItemInnerContainer: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // boxShadow: isThemeDark(theme)
    //   ? BoxShadows.shadow1.boxShadow
    //   : "unset",
    boxShadow: BoxShadows.shadow5.boxShadow,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    // border: theme.palette.type === 'dark'
    //   ? `1px solid ${Colors.uniswapLightNavy}`
    //   : `1px solid ${Colors.slateGreyDarker}`,
    // borderRadius: `${BorderRadius2x}px ${BorderRadius2x}px 0px 0px`,
    borderRadius: `${BorderRadius2x}px`,
    overflow: "hidden",
    transition:  theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.easeInOut,
      duration: 200,
    }),
    margin: '0rem 1rem',
    marginBottom: '1rem',
    // width: '100%',
    // minWidth: 400,
  },
  closeButtonMobile: {
    // position: "absolute",
    top: '2rem',
    marginLeft: 'calc(100% - 3rem)',
  },
  closeButtonDesktop: {
    position: "absolute",
    top: '0.5rem',
    right: '0rem',
  },
  closeButton: {
    zIndex: 2,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyLightBlack,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapGrey
      : Colors.slateGreyDarker,
    "&:hover": {
      backgroundColor: isThemeDark(theme)
        ? Colors.uniswapLighterGrey
        : Colors.slateGreyDarkest,
    }
  },
  clearIcon: {
  },
})


export default withStyles(styles)( NewsItemCard );