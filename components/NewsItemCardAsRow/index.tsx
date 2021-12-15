import React from "react";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius } from "layout/AppTheme";
// Typings
import { NewsItem, SoldOutStatus } from "typings/gqlTypes";
import NewsItemCardAsRowDesktop from "./NewsItemCardAsRowDesktop";
import NewsItemRowMedium from "components/NewsItemRowMedium";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";



const NewsItemCardAsRow = (props: ReactProps) => {

  const {
    classes,
  } = props;

  return (
    <>
      <ShowOnMobileOrDesktopSSR desktop>
        <NewsItemCardAsRowDesktop
          newsItem={props.newsItem}
        />
      </ShowOnMobileOrDesktopSSR>
      <ShowOnMobileOrDesktopSSR mobile>
        <NewsItemRowMedium
          newsItem={props.newsItem}
        />
      </ShowOnMobileOrDesktopSSR>
    </>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem;
}

const styles = (theme: Theme) => createStyles({
});



export default withStyles(styles)(NewsItemCardAsRow);
