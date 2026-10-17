import React from "react";

// round profile photo with an optional green "online" dot
const Avatar = ({ src, name, online = false, size = "h-12 w-12" }) => (
  <div className={`relative shrink-0 ${size}`}>
    <img
      src={src}
      alt={name || "profile"}
      className="h-full w-full rounded-full bg-white/10 object-cover ring-2 ring-white/10"
    />
    {online && (
      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#12121f]" />
    )}
  </div>
);

export default Avatar;
