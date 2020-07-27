import React from "react";
import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { ProductFile, Order, ID, OrderItem } from "typings/gqlTypes";
// Material UI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// Components
import ErrorBounds from "components/ErrorBounds";
// File requests
import { google_storage_get_file_link, GSFileLink } from "queries/requests";
import RelayDownloadIcon2 from "components/Icons/RelayDownloadIcon2";
import prettyBytes from "pretty-bytes";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useApolloClient } from "@apollo/client";
// Analytics
import { useAnalytics, analyticsEvent } from "utils/analytics";






const DownloadItem: React.FC<ReactProps> = (props) => {

  const [fileLink, setFileLink] = useState({
    expiresAt: 0,
    productFileId: undefined,
    url: undefined,
  } as GSFileLink);

  const aClient = useApolloClient();

  const { classes, file, orderItemId } = props;
  const [hovered, setHovered] = React.useState(false)

  const downloadFile = async(fileId: ID, orderItemId: ID) => {
    // 1. Get signed URL to access Google Storage
    let fileLink = await google_storage_get_file_link(fileId, orderItemId, aClient);
    // console.log("fileLink:", fileLink)
    // 2. embed link into hidden <a/> tag
    setFileLink(fileLink)
  }

  React.useEffect(() => {
    // 2. Click and select the <a/> with the href to fileBlobUrl
    if (!!fileLink.url) {
      let a = document.getElementById(`download_item_${fileLink.productFileId}`);
      a.click();
      analyticsEvent("File.Downloaded", {
        productId: props.productId,
        variantId: props.variantId,
      })
      // console.log("clicked on <a/>: ", a)
    }
    // if url changes, sync <a/> url to new url
  }, [fileLink.url])

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <div className={classes.root}>

      <a id={`download_item_${fileLink.productFileId}`}
        href={fileLink.url}
        download={fileLink.productFileId}
        // not visible on screen
      />

      <ErrorBounds className={clsx(
        classes.flexRow,
        smDown ? classes.flexWrap : null,
        props.isRefunded ? classes.refundedGrayBlur : null,
      )}>

        <div className={classes.flexRowInner}>
          <div className={classes.flexItemBig}>
            <Typography variant="subtitle2" className={classes.downloadItemText}>
              {file.fileName}
            </Typography>
          </div>
          <div className={classes.flexItemMed}>
            <Typography variant="subtitle2" className={classes.downloadItemText2}>
              {file.mimeType}
            </Typography>
            <Typography variant="subtitle2" className={classes.downloadItemText2}>
              {prettyBytes(file.sizeInBytes)}
            </Typography>
          </div>
        </div>

        <Button
          variant={"outlined"}
          classes={{
            root: smDown
              ? classes.downloadButtonSm
              : classes.downloadButton
          }}
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          disabled={props.isRefunded}
          onClick={() => downloadFile(file.id, orderItemId)}
        >
          {
            !props.isRefunded &&
            <RelayDownloadIcon2
              fill={
                hovered
                  ? Colors.magenta
                  : Colors.darkGrey
              }
              className={
                hovered
                  ? classes.downloadButtonIconHovered
                  : classes.downloadButtonIcon
              }
            />
          }
          <Typography
            className={
              hovered
                ? classes.downloadButtonTextHovered
                : classes.downloadButtonText
            }
            variant={"body2"}
          >
            { props.isRefunded ? "Refunded" : "Download" }
          </Typography>
        </Button>
      </ErrorBounds>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  file: ProductFile;
  orderItemId: ID;
  productId: ID;
  variantId: ID;
  isRefunded?: boolean;
}

const styles = (theme: Theme) => createStyles({
  root: {
    // background: Colors.cream,
    padding: '0.25rem 0.25rem',
    width: "100%",
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderLeft: `4px solid ${Colors.lightestGrey}`,
    "&:hover": {
      borderLeft: `4px solid ${Colors.magenta}`,
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      }),
    },
    transition: theme.transitions.create('border', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  flexRowInner: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '0.5rem',
  },
  flexItemBig: {
    flexGrow: 1,
    flexBasis: '40%',
    marginRight: '2rem',
  },
  flexItemMed: {
    flexGrow: 1,
    flexBasis: '20%',
    marginRight: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  downloadButton: {
    height: '35px',
    minWidth: '120px',
    backgroundColor: "#EDF0F2",
    border: '1px solid #EDF0F2',
    "&:hover": {
      border: `1px solid ${Colors.magenta}`,
      // backgroundColor: fade(Colors.magenta, 0.1),
    },
    marginLeft: '0.5rem',
  },
  downloadButtonSm: {
    height: '35px',
    minWidth: '120px',
    backgroundColor: "#EDF0F2",
    border: '1px solid #EDF0F2',
    "&:hover": {
      border: '1px solid #eaeaea',
    },
    marginLeft: '0.5rem',
    flexGrow: 1,
    marginTop: '0.25rem',
  },
  minHeight: {
    minHeight: '60vh',
  },
  downloadButtonIcon: {
    color: Colors.darkGrey,
    fontSize: '0.9rem',
    marginRight: '0.1rem',
  },
  downloadButtonIconHovered: {
    color: Colors.magenta,
    fontSize: '0.9rem',
    marginRight: '0.1rem',
  },
  downloadButtonText: {
    marginLeft: '0.25rem',
    fontSize: '0.7rem',
    color: Colors.darkGrey,
    fontWeight: 600,
  },
  downloadButtonTextHovered: {
    marginLeft: '0.25rem',
    fontSize: '0.7rem',
    color: Colors.magenta,
    fontWeight: 600,
  },
  downloadItemText: {
    fontSize: "0.875rem",
    lineHeight: '1rem',
  },
  downloadItemText2: {
    fontSize: "0.875rem",
    color: Colors.grey,
    minWidth: 70,
    marginRight: '1rem',
  },
  refundedGrayBlur: {
    filter: "grayscale(1) blur(0.75px)",
  },
  refundedBlur: {
    filter: "blur(1px)",
  },
});


export default withStyles(styles)( DownloadItem );
