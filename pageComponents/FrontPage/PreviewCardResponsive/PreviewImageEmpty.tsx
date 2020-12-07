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
        // only show pulse animation when its not a preview image
        // placeholder
        !props.previewImageEmptyMessage && "pulse",
      )}
      onClick={props.onClick}
      style={style}
    >
      {props.previewImageEmptyMessage}
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  style?: any;
  previewImageEmptyMessage?: string;
  onClick?(a: any): void;
}

export const styles = (theme: Theme) => createStyles({
  cardMedia: {
    objectFit: "cover",
    height: '100%',
    border: 'none',
    backgroundColor: theme.colors.uniswapNavy,
  },
  emptyYouTubeVimeo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.grey,
    fontSize: '0.9rem',
  },
});

export default withStyles(styles)(PreviewImageEmpty);