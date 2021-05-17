import React from "react";
import { Colors, BorderRadius, BoxShadows, BorderRadius2x } from "layout/AppTheme";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";





const PreventDragDropContainer: React.FC<PreventDragDropContainerProps> = (props) => {

  const { classes, children } = props;

  return (
    <div
      className={classes.preventDragDropContainer}
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onDrop={(e) => {
        console.log("ahh! you missed the dropzone")
        e.preventDefault()
      }}
    >
      {children}
    </div>
  )
}



interface PreventDragDropContainerProps extends WithStyles<typeof styles> {
}

export const styles = (theme: Theme) => createStyles({
  preventDragDropContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: "wrap",
  },
})








export default withStyles(styles)( PreventDragDropContainer );
