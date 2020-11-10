import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";


const DescriptionLoading = (props: DescriptionLoadingProps) => {

  const {
    classes,
    isMobile = false,
    height = 112,
    mobilePicHeight = 75,
    mobilePicWidth = 120,
    style,
  } = props;

  if (isMobile || props.rowFormat) {
    return (
      <div
        className={classes.descriptionContainerMobile}
        style={{
          minHeight: height,
          height: '100%',
          // height: "112px", // ensure all cards descriptions are same height
          ...style
        }}
      >
        <div className={clsx("pulse", classes.loadingDescriptionPic)}
          style={{
            height: mobilePicHeight,
            minWidth: mobilePicWidth
          }}
        />
        <div className={clsx(classes.loadingDescription)}>
          <div className={clsx("pulse", classes.loadingDescriptionLine1Mobile)}/>
          <div className={clsx("pulse", classes.loadingDescriptionLine2Mobile)}/>
          <div className={clsx("pulse", classes.loadingDescriptionLine3Mobile)}/>
        </div>
      </div>
    )
  } else {
    return (
      <div
        className={classes.descriptionContainer}
        style={{
          minHeight: height,
          height: '100%',
          // height: "112px", // ensure all cards descriptions are same height
          ...style
        }}
      >
        <div className={clsx(classes.loadingDescription)}>
          <div className={clsx("pulse", classes.loadingDescriptionLine1)}/>
          <div className={clsx("pulse", classes.loadingDescriptionLine2)}/>
          <div className={clsx("pulse", classes.loadingDescriptionLine3)}/>
          <div className={clsx("pulse", classes.loadingDescriptionLine4)}/>
        </div>
      </div>
    )
  }
}

interface DescriptionLoadingProps extends WithStyles<typeof styles> {
  style?: any;
  isMobile?: boolean;
  height?: any;
  mobilePicHeight?: any;
  mobilePicWidth?: any;
  rowFormat?: boolean;
}


export const styles = (theme: Theme) => createStyles({
  descriptionContainer: {
    marginTop: "0.5rem",
    // paddingTop: "0.25rem",
    // margin: '0.5rem',
    padding: '0.5rem',
    // height: "136px", // ensure all cards descriptions are same height
    cursor: 'pointer',
    position: 'relative', // for wishlist Button position: absolute
  },
  loadingDescription: {
    color: theme.colors.uniswapLightNavy,
    height: '100%',
    width: '100%',
  },
  loadingDescriptionLine1: {
    backgroundColor: theme.colors.uniswapDarkNavy,
    height: '1rem',
    width: '100%',
    borderRadius: '4px',
    opacity: 0.8,
  },
  loadingDescriptionLine2: {
    backgroundColor: theme.colors.uniswapDarkNavy,
    height: '1rem',
    marginTop: '0.75rem',
    width: '80%',
    borderRadius: '4px',
    opacity: 0.8,
  },
  loadingDescriptionLine3: {
    backgroundColor: theme.colors.uniswapDarkNavy,
    height: '1rem',
    marginTop: '0.75rem',
    width: '60%',
    borderRadius: '4px',
    opacity: 0.8,
  },
  loadingDescriptionLine4: {
    backgroundColor: theme.colors.uniswapDarkNavy,
    height: '1rem',
    marginTop: '0.75rem',
    width: '40%',
    borderRadius: '4px',
    opacity: 0.8,
    marginBottom: '1rem',
  },
  // mobile
  descriptionContainerMobile: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: "0.75rem",
    // paddingTop: "0.25rem",
    // height: "136px", // ensure all cards descriptions are same height
    height: "112px", // ensure all cards descriptions are same height
    cursor: 'pointer',
    position: 'relative', // for wishlist Button position: absolute
  },
  loadingDescriptionPic: {
    color: theme.colors.uniswapLightNavy,
    backgroundColor: theme.colors.uniswapDarkNavy,
    borderRadius: '4px',
    height: 75,
    minWidth: 120,
    marginBottom: '0.75rem',
    marginRight: '0.75rem',
  },
  loadingDescriptionLine1Mobile: {
    backgroundColor: theme.colors.uniswapDarkNavy,
    height: '1rem',
    width: '100%',
    borderRadius: '4px',
    opacity: 0.8,
  },
  loadingDescriptionLine2Mobile: {
    backgroundColor: theme.colors.uniswapDarkNavy,
    height: '1rem',
    marginTop: '0.75rem',
    width: '80%',
    borderRadius: '4px',
    opacity: 0.8,
  },
  loadingDescriptionLine3Mobile: {
    backgroundColor: theme.colors.uniswapDarkNavy,
    height: '1rem',
    marginTop: '0.75rem',
    width: '60%',
    borderRadius: '4px',
    opacity: 0.8,
    marginBottom: '0.75rem',
  },
});

export default withStyles(styles)( DescriptionLoading );
