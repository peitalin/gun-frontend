import React from "react";
import { oc as option } from "ts-optchain";
import { Colors, BorderRadius, BoxShadows, BorderRadius2x } from "layout/AppTheme";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";





const StoreOrLoginContainer: React.FC<StoreOrLoginContainerProps> = (props) => {

  const { classes, children } = props;
  // CSS media queries
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div
      className={clsx(
        classes.storeOrLoginContainer,
        "prevent-accidental-drag-drop-product-create-form"
      )}
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onDrop={(e) => {
        console.log("ahh! you missed the dropzone")
        e.preventDefault()
      }}
    >
      <div className={clsx(
        classes.maxWidth,
        !smDown && classes.pagePadding1,
      )}>
        <div className={clsx(
          classes.storeOrLoginInnerContainer,
          smDown ? classes.pagePaddingSm : classes.pagePadding2
        )}>
          {children}
        </div>
      </div>
    </div>
  )
}



interface StoreOrLoginContainerProps extends WithStyles<typeof styles> {
}

export const styles = (theme: Theme) => createStyles({
  storeOrLoginContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: "wrap",
  },
  storeOrLoginInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: "wrap",
    borderRadius: BorderRadius2x,
    background: Colors.uniswapDarkNavy,
    boxShadow: BoxShadows.shadow4.boxShadow,
  },
  maxWidth: {
    maxWidth: 600,
    width: '100%',
  },
  pagePadding1: {
    padding: '1rem 1rem 0rem 1rem',
  },
  pagePadding2: {
    padding: '1rem',
  },
  pagePaddingSm: {
    background: Colors.uniswapDarkNavy,
    margin: '0rem 0rem 0rem 0rem',
    padding: '1rem',
  },
})








export default withStyles(styles)( StoreOrLoginContainer );
