import React from "react";
import { Colors, BorderRadius, BoxShadows, BorderRadius2x } from "layout/AppTheme";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// CSS
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";





const PreventDragDropContainer: React.FC<PreventDragDropContainerProps> = (props) => {

  const { classes, children } = props;

  return (
    <div
      className={clsx(
        classes.preventDragDropContainer,
        props.className,
      )}
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
  className?: any;
}

export const styles = (theme: Theme) => createStyles({
  preventDragDropContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: "wrap",
    width: '100%',
  },
})








export default withStyles(styles)( PreventDragDropContainer );
