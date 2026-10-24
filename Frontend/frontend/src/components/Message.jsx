import React from "react";
import { useSelector } from "react-redux";
import { formatTime } from "../utils/format";

// one log line: "screenname (9:41 PM): text"
function Message({ message }) {
  const { authUser, selectedUser } = useSelector((store) => store.user);
  const mine = message?.senderId === authUser?._id;

  return (
    <p className="break-words">
      <b className={mine ? "text-[#ff0000]" : "text-[#0000ff]"}>{mine ? authUser?.username : selectedUser?.username}</b>{" "}
      <time className="text-[11px] text-win-gray">({formatTime(message?.createdAt)})</time>:{" "}
      <span className="whitespace-pre-wrap">{message?.message}</span>
    </p>
  );
}

export default Message;
