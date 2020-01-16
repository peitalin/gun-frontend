import React, { useState, useRef, useEffect } from "react";
import { dateForCountdown } from "utils/dates";
import Typography from "@material-ui/core/Typography";
import { useInterval } from "utils/hooks";
import { Colors } from "layout/AppTheme";
import clsx from 'clsx';


const CountdownBadge = (props: CountdownBadgeProps) => {

  // Setup the timer to refresh
  let [state, setState] = useState<State>({
    timeDisplay: dateForCountdown({ date: props.endDate, ssr: true })
  });

  React.useEffect(() => {
  }, [])

  // only run after hitting client-side
  useInterval(() => {
    setState({ timeDisplay: dateForCountdown({ date: props.endDate, ssr: false }) });
  }, 1000);

  if (!state.timeDisplay) {
    return (
      <Typography
        className={props.className}
        variant="body1"
        style={{...props.style}}
      >
        {""}
      </Typography>
    )
  } else {
    return (
      <Typography
        className={clsx(props.className, 'fadeInFast')}
        variant="body1"
        style={{...props.style}}
      >
        {`${state.timeDisplay}`}
      </Typography>
    )
  }
};

export interface CountdownBadgeProps {
  endDate: Date;
  className?: any;
  style?: any;
}
interface State {
  timeDisplay: string;
}

export default CountdownBadge;
