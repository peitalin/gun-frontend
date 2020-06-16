import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";


export const Banner: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  return (
    <div className="banner" onClick={props.scrollToNewMessage}>
      You have {props.numOfNewMessages} new message(s)
    </div>
  );
};

interface ReactProps extends WithStyles<typeof styles> {
  scrollToNewMessage?(): void;
  numOfNewMessages?: number;
}

const styles = (theme: Theme) => createStyles({
})


export default withStyles(styles)( Banner );