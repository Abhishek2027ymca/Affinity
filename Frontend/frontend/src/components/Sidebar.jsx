import React, { useState } from "react";
import { useSelector } from "react-redux";
import OtherUsers from "./OtherUsers";
import Avatar from "./Avatar";
import useLogout from "../hooks/useLogout";
import { selectOnlineCount } from "../redux/userSlice";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { authUser } = useSelector((store) => store.user);
  const onlineCount = useSelector(selectOnlineCount);
  const logoutHandler = useLogout();

  return (
    <div className="flex h-full w-full flex-col gap-[4px]">
      <div className="flex h-[18px] items-center justify-between px-[2px]">
        <h1 className="font-bold">Buddy List</h1>
        <span>{onlineCount} online</span>
      </div>

      {/* live search; Esc clears it */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && setSearch("")}
        className="win-field w-full"
        type="text"
        placeholder="Find a buddy…"
        aria-label="Find a buddy"
      />

      <OtherUsers search={search} />

      {/* me + sign off */}
      <div className="win-status flex h-auto items-center gap-[6px] p-[4px]">
        <Avatar src={authUser?.profilePhoto} name={authUser?.fullName} size={28} />
        <div className="min-w-0">
          <p className="truncate font-bold">{authUser?.fullName}</p>
          <p className="truncate text-win-gray">@{authUser?.username} · Available</p>
        </div>
      </div>
      <div className="flex gap-[4px]">
        <button type="button" className="win-btn min-w-0 flex-1">
          Away
        </button>
        <button type="button" onClick={logoutHandler} className="win-btn min-w-0 flex-1">
          Sign Off
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
