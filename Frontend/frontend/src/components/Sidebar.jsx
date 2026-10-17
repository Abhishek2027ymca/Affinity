import React, { useState } from "react";
import { FiSearch, FiLogOut, FiMessageCircle, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { setAuthUser } from "../redux/userSlice";
import OtherUsers from "./OtherUsers";
import Avatar from "./Avatar";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { authUser, OnLineUsers } = useSelector((store) => store.user);

  // everyone online except me
  const onlineCount = (OnLineUsers || []).filter((id) => id !== authUser?._id).length;

  const logoutHandler = async () => {
    try {
      const res = await api.get("/api/v1/user/logout");
      toast.success(res.data.message);
    } catch (e) {
      console.log(e);
    } finally {
      // always leave, even if the request failed
      dispatch(setAuthUser(null));
      navigate("/login");
    }
  };

  return (
    <div className="flex h-full w-full flex-col border-r border-white/10">
      {/* brand */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500">
          <FiMessageCircle className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold leading-none text-white">Affinity</h1>
          <p className="mt-1 text-xs text-emerald-400">{onlineCount} online</p>
        </div>
      </div>

      {/* live search */}
      <div className="relative px-4 pb-3">
        <FiSearch className="pointer-events-none absolute left-7 top-1/2 h-4 w-4 -translate-y-[70%] text-slate-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="field"
          type="text"
          placeholder="Search people..."
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            aria-label="Clear search"
            className="absolute right-7 top-1/2 -translate-y-[70%] text-slate-500 hover:text-slate-300"
          >
            <FiX className="h-4 w-4" />
          </button>
        )}
      </div>

      <OtherUsers search={search} />

      {/* me + logout */}
      <div className="flex items-center gap-3 border-t border-white/10 px-4 py-3">
        <Avatar src={authUser?.profilePhoto} name={authUser?.fullName} online size="h-10 w-10" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{authUser?.fullName}</p>
          <p className="truncate text-xs text-slate-500">@{authUser?.username}</p>
        </div>
        <button
          onClick={logoutHandler}
          title="Logout"
          aria-label="Logout"
          className="rounded-xl p-2.5 text-slate-400 transition hover:bg-red-500/15 hover:text-red-400"
        >
          <FiLogOut className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
