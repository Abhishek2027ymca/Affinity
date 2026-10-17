import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import Avatar from "./Avatar";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, OnLineUsers } = useSelector((store) => store.user);
  const unread = useSelector((store) => store.ui.unread[user._id] || 0);
  const isTyping = useSelector((store) => !!store.ui.typing[user._id]);

  const isOnline = OnLineUsers?.includes(user._id);
  const isSelected = selectedUser?._id === user._id;

  return (
    <button
      onClick={() => dispatch(setSelectedUser(user))}
      className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
        isSelected ? "bg-violet-500/20 ring-1 ring-violet-400/30" : "hover:bg-white/5"
      }`}
    >
      <Avatar src={user.profilePhoto} name={user.fullName} online={isOnline} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{user.fullName}</p>
        {isTyping ? (
          <p className="truncate text-xs font-medium text-violet-300">typing...</p>
        ) : (
          <p className="truncate text-xs text-slate-500">{isOnline ? "Online" : `@${user.username}`}</p>
        )}
      </div>
      {unread > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-500 px-1.5 text-xs font-bold text-white">
          {unread > 99 ? "99+" : unread}
        </span>
      )}
    </button>
  );
};

export default OtherUser;
