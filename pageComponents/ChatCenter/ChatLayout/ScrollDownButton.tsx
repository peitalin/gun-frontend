import React from 'react';
// Styles
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows } from "layout/AppTheme";
// components
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from "@material-ui/core/IconButton";


export const ScrollDownButton: React.FC<ReactProps> = (props) => {

  const {
    classes,
    chatDivId,
  } = props;

  const [hover, setHover] = React.useState(false)

  // scroll to bottom
  const scrollToBottom = () => {
    let lastMsgElem = document.getElementById(chatDivId);
    if (lastMsgElem) {
      lastMsgElem.scrollTo({
        top: lastMsgElem.scrollHeight,
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      } as any);
    }
  }

  return (
    <IconButton
      onClick={scrollToBottom}
      className={clsx(
        classes.previewIconButton,
        props.isBottom ? classes.bottom : classes.notBottom
      )}
      classes={{
        root: classes.iconButton
      }}
      size="small"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ArrowDownwardIcon classes={{
        root: clsx(
          hover ? classes.svgIconHover : classes.svgIcon,
          props.isBottom ? classes.svgIconBottom : classes.svgIconNotBottom,
        )
      }}/>
    </IconButton>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  chatDivId: string;
  isBottom?: boolean;
}


const styles = (theme: Theme) => createStyles({
  iconButton: {
    fill: Colors.white,
    background: Colors.white,
    "&:hover": {
      background: Colors.blue,
      // "span > svg > path": {
      //   fill: "#fafafa",
      // }
    },
    boxShadow: BoxShadows.shadow1.boxShadow,
    color: Colors.lightGrey,
    padding: 4, // determines button size
  },
  previewIconButton: {
    position: "absolute",
    right: '0.75rem',
    bottom: '10.5rem',
  },
  svgIcon: {
    fill: Colors.grey,
    transform: 'rotate(720deg)',
    transition: theme.transitions.create(['transform', 'opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: 300
    })
  },
  svgIconHover: {
    fill: "#fafafa",
    transform: 'rotate(0deg)',
    transition: theme.transitions.create(['transform', 'opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: 300
    })
  },
  bottom: {
    transform: 'translateY(50px)',
    opacity: 0,
    transition: theme.transitions.create(['transform', 'opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: 300
    })
  },
  notBottom: {
    opacity: 1,
    transform: 'translateY(0px)',
    transition: theme.transitions.create(['transform', 'opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: 300
    })
  },
  // separate rotation animation from translateY, so drop shadow
  // doesn't rotate as well
  svgIconBottom: {
    transform: 'rotate(720deg)',
    transition: theme.transitions.create(['transform', 'opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: 550
    })
  },
  svgIconNotBottom: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create(['transform', 'opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: 550
    })
  },
})


export default withStyles(styles)( ScrollDownButton );