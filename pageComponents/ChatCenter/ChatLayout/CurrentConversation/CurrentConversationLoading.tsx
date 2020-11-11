import React from 'react';
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Styles
import { styles } from "."
import { Colors, BoxShadows, BorderRadius2x, BorderRadius } from "layout/AppTheme";



export const CurrentConversationLoading: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <div className={classes.chatBoxScrollable}>
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
}


export default withStyles(styles)( CurrentConversationLoading );