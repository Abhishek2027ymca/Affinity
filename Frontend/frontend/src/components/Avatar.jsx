import React, { useEffect, useState } from "react";

// square "buddy icon": the profile photo, or a grey tile with initials when there is none
const Avatar = ({ src, name = "", size = 16, className = "" }) => {
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [src]);

  if (src && !broken) {
    return (
      <img
        src={src}
        alt={name || "buddy icon"}
        onError={() => setBroken(true)}
        style={{ width: size, height: size }}
        className={`block shrink-0 object-cover ${className}`}
      />
    );
  }

  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  return (
    <span
      role="img"
      aria-label={name || "buddy icon"}
      style={{ width: size, height: size, fontSize: Math.max(7, Math.round(size * 0.4)) }}
      className={`flex shrink-0 items-center justify-center bg-win-gray font-bold leading-none text-white ${className}`}
    >
      {initials}
    </span>
  );
};

export default Avatar;
