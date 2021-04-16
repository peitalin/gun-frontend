import React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";


const AspectRatioConstraint: React.FC<ReactProps> = (props) => {
  const {
    classes,
    height = 10,
    width = 16,
  } = props;
  return (
    <div className={classes.aspectRatioOuter}
      style={{
        paddingTop: (height && width)
          ? `${height/width*100}%`
          : null
      }}
    >
      <div className={classes.aspectRatioInner}>
        {props.children}
      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  height?: number;
  width?: number;
}


export const styles = (theme: Theme) => createStyles({
  aspectRatioOuter: {
    paddingTop: '62.5%', // 2:3 aspect ratio
    position: 'relative',
  },
  aspectRatioInner: {
    position: 'absolute',
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    top: 0,
  },
})

export default withStyles(styles)( AspectRatioConstraint );