import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";


export const Banner: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  return (
    <div className={classes.newMessagesBanner}
      onClick={props.scrollToNewMessage}
    >
      <Typography variant="caption" className={classes.newMessagesBannerText}>
        You have {props.numOfNewMessages} new message(s)
      </Typography>
    </div>
  );
};

interface ReactProps extends WithStyles<typeof styles> {
  scrollToNewMessage?(): void;
  numOfNewMessages?: number;
}

const styles = (theme: Theme) => createStyles({
  newMessagesBanner: {
    padding: '1rem 0rem 0rem 0rem',
  },
  newMessagesBannerText: {
  },
})


export default withStyles(styles)( Banner );