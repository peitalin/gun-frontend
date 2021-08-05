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
    <div className={classes.newsItemModalPageRoot}>
      <IconButton
        className={classes.closeButton}
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
              width: 90,
              height: 60,
            },
            desktop: {
              width: 120,
              height: 80,
            },
          }}
        />
      </div>
    </div>
  );
};


interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem
  user: UserPrivate
  closeModal(): void;
}


const styles = (theme: Theme) => createStyles({
  newsItemModalPageRoot: {
    position: "relative",
    padding: "1rem",
    paddingBottom: "0rem",
    paddingRight: "0rem",
  },
  newsItemInnerContainer: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: "2rem",
    borderRadius: BorderRadius2x,
    boxShadow: isThemeDark(theme)
      ? BoxShadows.shadow1.boxShadow
      : "unset",
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    transition:  theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.easeInOut,
      duration: 150,
    }),
    width: '100%',
    minWidth: '300px',
  },
  closeButton: {
    position: "absolute",
    top: '0.5rem',
    right: '-0.5rem',
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