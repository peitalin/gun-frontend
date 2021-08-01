import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, isThemeDark } from "layout/AppTheme";
import {
  NewsItem,
  UserPrivate,
} from "typings/gqlTypes";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// MUI
import Typography from "@material-ui/core/Typography";
import NewsItemRowMedium from "./NewsItemRowMedium";



const NewsItemPanel: React.FC<ReactProps> = (props) => {


  const {
    classes,
    user,
    newsItem,
  } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className={classes.productPanelRoot}>
      <div className={classes.productCardBox}>
        <NewsItemRowMedium
          newsItem={newsItem}
          isSuspended={newsItem?.isSuspended || newsItem?.isDeleted}
          loading={props.loading}
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
  user: UserPrivate
  newsItem: NewsItem
  loading: boolean
}

interface QData {
}
interface QVar {
}


const styles = (theme: Theme) => createStyles({
  productPanelRoot: {
    width: '100%',
  },
  productCardBox: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: '100%',
  },
})


export default withStyles(styles)( NewsItemPanel );