import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius, Colors } from "layout/AppTheme";



const PositionIndicator: React.FC<ReactProps> = (props) => {

  const {
    classes,
    selectedDot = 0,
    numberOfItems = 0,
  } = props;

  return (
    <div className={classes.root}>
      {
        (numberOfItems > 0) &&
        [...new Array(numberOfItems).keys()].map(n => {
          if (selectedDot === n) {
            return (
              <div
                key={n}
                className={clsx(
                  classes.selectedDot,
                  classes.dot,
                )}
              />
            )
          } else {
            return (
              <div
                key={n}
                className={classes.dot}
              />
            )
          }
        })
      }
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  numberOfItems?: number;
  selectedDot?: number;
}

const styles = (theme: Theme) => createStyles({
  root: {
    color: '#222',
    position: 'absolute',
    bottom: '0.75rem',
    left: 0,
    zIndex: 5000,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    width: '100%',
  },
  dot: {
    // background: Colors.grey,
    // background: Colors.yellow,
    boxShadow: `1px 1px 1px 1px rgba(2,2,2,0.4)`,
    border: `1px solid ${Colors.cream}`,
    borderRadius: "50%",
    height: 6,
    width: 6,
    background: Colors.lightGrey,
    marginRight: '0.4rem',
  },
  selectedDot: {
    // background: Colors.cream,
    background: Colors.charcoal,
    // background: Colors.lightYellow,
    boxShadow: `1px 1px 1px 1px rgba(2,2,2,0.4)`,
  },
})

export default withStyles(styles)( PositionIndicator );