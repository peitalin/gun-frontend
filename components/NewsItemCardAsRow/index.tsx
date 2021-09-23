import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Typings
import { NewsItem, SoldOutStatus } from "typings/gqlTypes";
import NewsItemCardAsRowDesktop from "./NewsItemCardAsRowDesktop";
import NewsItemRowMedium from "components/NewsItemRowMedium";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";



const NewsItemCardAsRow = (props: ReactProps) => {

  const {
    classes,
    showExternalImages,
  } = props;

  return (
    <>
      <ShowOnMobileOrDesktopSSR desktop>
        <NewsItemCardAsRowDesktop
          newsItem={props.newsItem}
          showExternalImages={showExternalImages}
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
  showExternalImages: boolean;
}

const styles = (theme: Theme) => createStyles({
});



export default withStyles(styles)(NewsItemCardAsRow);
