import React from 'react';
import { Colors } from "layout/AppTheme";

const Shield = ({
  backgroundColor = Colors.cream,
  foregroundColor = Colors.ultramarineBlue,
  width = 20,
  height = 20,
}: ReactProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 54 66"
    >
      <g id="shield-i"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g transform="translate(2.000362, 3.000000)">
          <g transform="translate(-0.000362, 0.000000)"
            stroke={foregroundColor}
            fill={backgroundColor}
            strokeLinecap="round"
            strokeWidth="6"
          >
            <path d="M49,10 C39.9686226,10.0914235 31.2944562,6.4771875 25,0 C18.7055438,6.4771875 10.0313774,10.0914235 1,10 C1,10 -1.1,46 25,60 C51.1,46 49,10 49,10 Z"
            />
          </g>
          <g transform="translate(24.999638, 9.000000)"></g>
          <path
            d="M25.5008666,9 C29.8207203,13.5340313 35.7737573,16.0639965 41.9719464,16 C41.9719464,16 43.4131659,41.2 25.5008666,51 C25.3318826,50.9075472 25.1646211,50.8137237 24.9990646,50.7185638 L25.000672,9.50888799 C25.1697177,9.34218258 25.3364747,9.17254242 25.5008666,9 Z"
            fill={foregroundColor}
          />
        </g>
      </g>
    </svg>
  )
}

interface ReactProps {
  width?: number;
  height?: number;
  foregroundColor?: string;
  backgroundColor?: string;
}
export default Shield;

