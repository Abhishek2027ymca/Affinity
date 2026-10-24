import React, { useEffect, useState } from "react";
import { formatTime } from "../utils/format";

// little yellow speech bubble for the Start button
const StartIcon = () => (
  <svg width="14" height="13" shapeRendering="crispEdges" aria-hidden="true">
    <path d="M0 0h14v10H7v1H6v1H5v1H4v-3H0z" />
    <path d="M1 1h12v8H1zM5 9h1v2H5z" fill="#ffff00" />
  </svg>
);

const Task = ({ label, active }) => (
  <button
    type="button"
    className={`win-btn h-[22px] min-w-0 max-w-[160px] flex-1 px-[6px] text-left ${
      active ? "win-pressed win-dither font-bold" : ""
    }`}
  >
    <span className="block truncate">{label}</span>
  </button>
);

// Win98 taskbar: Start, one button per open "window", and the tray clock
const Taskbar = ({ imWith }) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="win-taskbar flex h-[28px] shrink-0 items-center gap-[4px] px-[2px] pt-[2px]">
      <button type="button" className="win-btn flex h-[22px] min-w-0 items-center gap-[4px] px-[4px] font-bold">
        <StartIcon />
        Start
      </button>
      {imWith && <Task label={`IM — ${imWith}`} active />}
      <Task label="Buddy List" active={!imWith} />
      <div className="win-status ml-auto h-[22px] shrink-0 px-[10px] leading-[22px]">{formatTime(now)}</div>
    </div>
  );
};

export default Taskbar;
