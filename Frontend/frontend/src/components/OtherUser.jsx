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
    <div className="pl-[14px]">
      <button
        onClick={() => dispatch(setSelectedUser(user))}
        className={`flex h-[18px] w-full items-center gap-[4px] px-[2px] text-left outline-1 outline-offset-[-1px] focus-visible:outline-dotted ${
          isSelected
            ? "bg-win-navy text-white outline-dotted outline-white"
            : `outline-black ${isOnline ? "" : "text-win-gray"}`
        }`}
      >
        <Avatar src={user.profilePhoto} name={user.fullName} size={16} className={isOnline ? "" : "opacity-50"} />
        <span className="min-w-0 flex-1 truncate">{user.fullName}</span>
        {isTyping && <span className={`italic ${isSelected ? "text-[#dfdfdf]" : "text-win-gray"}`}>typing…</span>}
        {unread > 0 && <span className="font-bold text-[#ff0000]">({unread > 99 ? "99+" : unread})</span>}
      </button>
    </div>
  );
};

export default OtherUser;
