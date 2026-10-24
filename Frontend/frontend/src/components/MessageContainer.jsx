import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import SendInput from "./SendInput";
import Messages from "./Messages";
import Avatar from "./Avatar";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUser, OnLineUsers } = useSelector((store) => store.user);
  const isOnline = OnLineUsers?.includes(selectedUser?._id);

  if (!selectedUser) {
    return (
      <div className="flex w-full items-center justify-center p-4">
        <p className="win-sunken px-[24px] py-[16px] text-center">Select a buddy to start an IM.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col gap-[4px]">
      {/* header */}
      <div className="flex items-center gap-[6px]">
        <button
          type="button"
          onClick={() => dispatch(setSelectedUser(null))}
          aria-label="Back to buddy list"
          className="win-btn min-w-0 px-[8px] md:hidden"
        >
          Back
        </button>
        <Avatar src={selectedUser.profilePhoto} name={selectedUser.fullName} size={40} />
        <div className="min-w-0 flex-1">
          <p className="truncate">
            To: <b>{selectedUser.fullName}</b> ({selectedUser.username})
          </p>
          <p className={isOnline ? "text-[#008000]" : "text-win-gray"}>{isOnline ? "● Online" : "Offline"}</p>
        </div>
        <button type="button" className="win-btn">
          Get Info
        </button>
      </div>

      <Messages />
      <SendInput />
    </div>
  );
};

export default MessageContainer;
