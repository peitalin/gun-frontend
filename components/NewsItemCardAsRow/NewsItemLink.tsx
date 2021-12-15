
import React from "react";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius } from "layout/AppTheme";
// Typings
import { NewsItem } from "typings/gqlTypes";
// next
import Link from "next/link";




const NewsItemLink: React.FC<ReactProps> = (props) => {

  const {
    classes,
    newsItem,
    disableLink = false,
  } = props;

  let internalProduct = newsItem?.product
  let externalProduct = newsItem?.externalProduct
  let productPreview = newsItem?.productPreview

  // externalProducts only
  let sourceSiteUrl = externalProduct?.sourceSiteUrl
    ?? productPreview?.sourceSiteUrl

  if (disableLink) {
    return (
      <div className={classes.flexRowLink}
      >
        {props.children}
      </div>
    )
  }

  if (sourceSiteUrl) {
    return (
      <a className={classes.flexRowLink}
        target={"_blank"}
        href={sourceSiteUrl}
      >
        {props.children}
      </a>
    )
  } else {
    return (
      <Link
        href={"/p/[productId]"}
        as={`/p/${internalProduct?.id}`}
      >
        <a className={classes.flexRowLink}>
          {props.children}
        </a>
      </Link>
    )
  }
}

interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem;
  disableLink?: boolean
}

const styles = (theme: Theme) => createStyles({
  flexRowLink: {
    "&:hover": {
      "& div": {
        color: Colors.purple,
      },
    },
    // display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: '100%',
  },
});



export default withStyles(styles)(NewsItemLink);
