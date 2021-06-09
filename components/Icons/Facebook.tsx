
import React from 'react';
const Facebook = ({ size, color }: {
  size?: any,
  color?: any,
}) => (
<svg
  width={`${size || 40}px`}
  height={`${size || 40}px`}
  viewBox="0 0 40 40"
  fill={ color ?? "#fff" }
>
  <circle cx="20" cy="20" r="19"
    fill={"transparent"}
    strokeWidth={2}
    stroke={color ?? "#fff"}
  />
  <path d="M17.63 20.7949V30H21.5751V20.7949H24.2051L24.952 17.5416H21.5751V15.3192C21.5751 14.4092 22.0721 13.4282 23.3792 13.4282H24.9533V10.0026L22.5824 10C19.2238 10 17.63 11.9988 17.63 14.8445V17.5403H15V20.7949H17.63Z"
    fill={ color ?? "#fff" }
  />
</svg>
)
export default Facebook;