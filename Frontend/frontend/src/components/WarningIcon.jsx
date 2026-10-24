import React from "react";

// Win98 "!" warning triangle
const WarningIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 31 31" aria-hidden="true" className="shrink-0">
    <path d="M15.5 1L30 29H1Z" fill="#000" />
    <path d="M15.5 4.3L27.5 27.5H3.5Z" fill="#ffff00" />
    <path d="M14 10h3v10h-3zM14 22h3v3h-3z" fill="#000" />
  </svg>
);

export default WarningIcon;
