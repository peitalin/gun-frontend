import * as React from 'react';
const YouTube = ({ height, width, disableBackground }: YouTubeIconProps) => (
<svg width={`${width || 40}px`} height={`${height || 40}px`} viewBox="0 0 40 40" fill="none">
  {
    !disableBackground &&
    <circle cx="20" cy="20" r="20" fill="rgba(25,25,25,0.8)" stroke="white"/>
  }
  <circle cx="20" cy="20" r="5" fill="white" stroke="white"/>
  <path d="M25.8463 12.9238H14.1537C11.8597 12.9238 10 14.7835 10 17.0776V22.9226C10 25.2166 11.8597 27.0763 14.1537 27.0763H25.8463C28.1403 27.0763 30 25.2166 30 22.9226V17.0776C30 14.7835 28.1403 12.9238 25.8463 12.9238ZM23.0371 20.2845L17.5681 22.8928C17.4224 22.9623 17.2541 22.8561 17.2541 22.6946V17.3149C17.2541 17.1511 17.4268 17.045 17.5729 17.119L23.0418 19.8904C23.2044 19.9728 23.2016 20.206 23.0371 20.2845Z"
    fill="red"/>
</svg>
)
interface YouTubeIconProps {
  height?: any;
  width?: any;
  disableBackground?: boolean;
}
export default YouTube;