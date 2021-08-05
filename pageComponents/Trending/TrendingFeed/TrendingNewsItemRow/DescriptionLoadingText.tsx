import React from "react";
import clsx from "clsx";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, isThemeDark } from "layout/AppTheme";


const DescriptionLoadingText = (props: DescriptionLoadingTextProps) => {

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

interface DescriptionLoadingTextProps extends WithStyles<typeof styles> {
  style?: any;
  isMobile?: boolean;
  height?: any;
  mobilePicHeight?: any;
  mobilePicWidth?: any;
  rowFormat?: boolean;
}

export const styles = (theme: Theme) => createStyles({
  descriptionContainer: {
    // paddingTop: "0.25rem",
    // margin: '0.5rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingBottom: '0.5rem',
    // height: "136px", // ensure all cards descriptions are same height
    cursor: 'pointer',
    position: 'relative', // for watchList Button position: absolute
  },
  loadingDescription: {
    color: isThemeDark(theme) ? Colors.uniswapLightGrey : Colors.slateGreyBlack,
    height: '100%',
    width: '100%',
  },
  loadingDescriptionLine1: {
    backgroundColor: isThemeDark(theme) ? Colors.uniswapGrey : Colors.slateGreyDarker,
    height: '1rem',
    width: '100%',
    borderRadius: '4px',
    opacity: 0.8,
  },
  loadingDescriptionLine2: {
    backgroundColor: isThemeDark(theme) ? Colors.uniswapGrey : Colors.slateGreyDarker,
    height: '1rem',
    marginTop: '0.75rem',
    width: '80%',
    borderRadius: '4px',
    opacity: 0.8,
  },
  loadingDescriptionLine3: {
    backgroundColor: isThemeDark(theme) ? Colors.uniswapGrey : Colors.slateGreyDarker,
    height: '1rem',
    marginTop: '0.75rem',
    width: '60%',
    borderRadius: '4px',
    opacity: 0.8,
  },
  loadingDescriptionLine4: {
    backgroundColor: isThemeDark(theme) ? Colors.uniswapGrey : Colors.slateGreyDarker,
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
    position: 'relative', // for watchList Button position: absolute
  },
  loadingDescriptionPic: {
    color: isThemeDark(theme) ? Colors.uniswapLightGrey : Colors.slateGreyBlack,
    backgroundColor: isThemeDark(theme) ? Colors.uniswapGrey : Colors.slateGreyDarker,
    borderRadius: '4px',
    height: 75,
    minWidth: 120,
    marginBottom: '0.75rem',
    marginRight: '0.75rem',
  },
  loadingDescriptionLine1Mobile: {
    backgroundColor: isThemeDark(theme) ? Colors.uniswapGrey : Colors.slateGreyDarker,
    height: '1rem',
    width: '100%',
    borderRadius: '4px',
    opacity: 0.8,
  },
  loadingDescriptionLine2Mobile: {
    backgroundColor: isThemeDark(theme) ? Colors.uniswapGrey : Colors.slateGreyDarker,
    height: '1rem',
    marginTop: '0.75rem',
    width: '80%',
    borderRadius: '4px',
    opacity: 0.8,
  },
  loadingDescriptionLine3Mobile: {
    backgroundColor: isThemeDark(theme) ? Colors.uniswapGrey : Colors.slateGreyDarker,
    height: '1rem',
    marginTop: '0.75rem',
    width: '60%',
    borderRadius: '4px',
    opacity: 0.8,
    marginBottom: '0.75rem',
  },
});

export default withStyles(styles)( DescriptionLoadingText );
