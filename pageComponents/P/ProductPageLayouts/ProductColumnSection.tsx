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


const ProductColumnSection: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const lgUp = useMediaQuery(lgUpMediaQuery);

  if (!!props.isMobileRow) {
    // implementation="css" made images render
    // wasn't hiding this component on sm, md, lg, xl screen sizes
    // switch to javascript xsDown check
    if (xsDown) {
      return (
        <div className={classes.productColumnMobile}>
          <>{props.children}</>
        </div>
      )
    } else {
      return null
    }
  }

  if (props.isTopRow) {
    return (
      <div className={classes.productColumn}>
        <>{props.children}</>
      </div>
    )
  }

  if (props.isBottomRow) {
    return (
      <div className={classes.productColumn}>
        <>{props.children}</>
      </div>
    )
  } else {
    return (
      <>{props.children}</>
    )
  }
}


interface ReactProps extends WithStyles<typeof styles> {
  isTopRow?: boolean;
  isBottomRow?: boolean;
  isMobileRow?: boolean;
}


const styles = (theme: Theme) => createStyles({
  productColumnMobile: {
    padding: '0rem',
    flexBasis: '60vw',
    flexGrow: 1,
  },
  //
  productColumn: {
    // in line with previewImages which are 60vw wide, 37.5vw tall (16:10)
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',

    // outlineOffset: '-2px',
    // outline: '2px dashed #28A',
  },
});


export default withStyles(styles)( ProductColumnSection );
