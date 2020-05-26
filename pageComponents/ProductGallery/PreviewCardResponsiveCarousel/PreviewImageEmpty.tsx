import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";


const PreviewImageEmpty: React.FC<ReactProps> = (props) => {

  const { classes, style } = props;

  return (
    <div
      className={clsx(
        classes.cardMedia,
        classes.emptyYouTubeVimeo,
      )}
      style={style}
    />
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  style?: any;
}

export const styles = (theme: Theme) => createStyles({
  cardMedia: {
    objectFit: "cover",
    height: '100%',
    border: 'none',
  },
  emptyYouTubeVimeo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withStyles(styles)(PreviewImageEmpty);