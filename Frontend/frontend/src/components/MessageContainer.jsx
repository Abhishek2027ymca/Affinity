import React from "react";
import { FiArrowLeft, FiMessageCircle } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import SendInput from "./SendInput";
import Messages from "./Messages";
import Avatar from "./Avatar";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUser, authUser, OnLineUsers } = useSelector((store) => store.user);
  const isTyping = useSelector((store) => !!store.ui.typing[selectedUser?._id]);
  const isOnline = OnLineUsers?.includes(selectedUser?._id);

  if (!selectedUser) {
    return (
      <div className="flex w-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500/30 to-indigo-500/30 ring-1 ring-white/10">
          <FiMessageCircle className="h-10 w-10 text-violet-300" />
        </div>
        <h2 className="text-3xl font-bold text-white">Hi, {authUser?.fullName}</h2>
        <p className="mt-2 text-slate-400">Pick someone from the list to start a conversation.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      {/* header */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/5 px-4 py-3">
        <button
          onClick={() => dispatch(setSelectedUser(null))}
          aria-label="Back to chats"
          className="rounded-xl p-2 text-slate-300 hover:bg-white/10 md:hidden"
        >
          <FiArrowLeft className="h-5 w-5" />
        </button>
        <Avatar src={selectedUser.profilePhoto} name={selectedUser.fullName} online={isOnline} size="h-11 w-11" />
        <div className="min-w-0">
          <p className="truncate font-semibold text-white">{selectedUser.fullName}</p>
          <p className={`text-xs ${isTyping ? "text-violet-300" : isOnline ? "text-emerald-400" : "text-slate-500"}`}>
            {isTyping ? "typing..." : isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <Messages />
      <SendInput />
    </div>
  );
};

export default MessageContainer;
