import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Next
import Hidden from "components/HiddenFix";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { lgUpMediaQuery } from "../common";


const ProductRowSection: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const theme = useTheme();
  const lgUp = useMediaQuery(lgUpMediaQuery);

  if (props.isMobileRow) {
    return (
      <Hidden smUp
        className={classes.productRowMobile}
        implementation="css"
      >
        <>{props.children}</>
      </Hidden>
    )
  }

  if (props.isTopRow) {
    return (
      <div className={classes.productRow}>
        <>{props.children}</>
      </div>
    )
  }

  if (props.isBottomRow) {
    return (
      <div className={classes.productRow}>
        <>{props.children}</>
      </div>
    )
  } else {
    return (
      <div className={classes.productRow40}>
        <>{props.children}</>
      </div>
    )
  }
}


interface ReactProps extends WithStyles<typeof styles> {
  isTopRow?: boolean;
  isBottomRow?: boolean;
  isMobileRow?: boolean;
}


const styles = (theme: Theme) => createStyles({
  productRowMobile: {
    padding: '0rem',
    flexBasis: '60vw',
    flexGrow: 1,
  },
  //
  productRow: {
    // in line with previewImages which are 60vw wide, 37.5vw tall (16:10)
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',

    // outlineOffset: '-2px',
    // outline: '2px dashed #28A',
  },
  productRow40: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',

    // outlineOffset: '-2px',
    // outline: '2px dashed #28A',
  },
  productRow40LgUp: {
    margin: '0rem 0rem 1rem 0',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',

    // outlineOffset: '-2px',
    // outline: '2px dashed #28A',
  },
});


export default withStyles(styles)( ProductRowSection );
