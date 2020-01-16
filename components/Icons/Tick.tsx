import React from 'react';

const TickIcon = ({
  size,
  className,
  style,
  disableBackground,
  color,
  outerCircleColor,
  innerCircleColor,
  borderWidth,
}: TickIconProps) => {

  let tickColor = color || '#B1E2F3';
  let outerCircleColor1 = outerCircleColor || '#55BEF7';
  let innerCircleColor1 = innerCircleColor || '#50B5F5';

  return (
    <div className={className} style={{ display: 'flex', ...style }}>
      <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 126 126">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Artboard-2" transform="translate(-569.000000, -116.000000)">
            {
              !disableBackground &&
              <>
                <circle id="Oval" fill={outerCircleColor1} cx="632" cy="179"
                  r={50 + (borderWidth || 10)}></circle>
                <circle id="Oval" fill={innerCircleColor1} cx="632" cy="179" r="50"></circle>
              </>
            }
            <path d="M625.243718,186.243718 L650.487437,161 L656.243718,166.756282 L631,192 L625.025126,197.974874 L607,179.949747 L612.974874,173.974874 L625.243718,186.243718 Z"
              id="Combined-Shape" fill={tickColor}>
            </path>
          </g>
        </g>
      </svg>
    </div>
  )
};

interface TickIconProps {
  size?: number;
  className?: string;
  style?: any;
  disableBackground?: boolean;
  color?: string;
  outerCircleColor?: string;
  innerCircleColor?: string;
  borderWidth?: number;
}
export default TickIcon;