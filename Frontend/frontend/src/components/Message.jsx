import React from "react";
import { useSelector } from "react-redux";
import { formatTime } from "../utils/format";

function Message({ message }) {
  const { authUser } = useSelector((store) => store.user);
  const mine = message?.senderId === authUser?._id;

  return (
    <div className={`flex animate-fade-up ${mine ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[80%] flex-col md:max-w-[65%] ${mine ? "items-end" : "items-start"}`}>
        <div
          className={`break-words rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-md ${
            mine
              ? "rounded-br-md bg-gradient-to-br from-violet-500 to-indigo-500 text-white"
              : "rounded-bl-md bg-white/10 text-slate-100"
          }`}
        >
          {message?.message}
        </div>
        <time className="mt-1 px-1 text-[11px] text-slate-500">{formatTime(message?.createdAt)}</time>
      </div>
    </div>
  );
}

export default Message;
