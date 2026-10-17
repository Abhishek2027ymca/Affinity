import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { formatDay } from "../utils/format";

const Messages = () => {
  useGetMessages();
  const { messages } = useSelector((store) => store.message);
  const { selectedUser } = useSelector((store) => store.user);
  const isTyping = useSelector((store) => !!store.ui.typing[selectedUser?._id]);
  const listRef = useRef(null);

  // keep the newest message (or typing bubble) in view
  useEffect(() => {
    // scroll only the list itself (scrollIntoView would also move the page)
    const list = listRef.current;
    list?.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [messages?.length, isTyping]);

  if (!messages) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <span className="loading loading-dots loading-lg text-primary" />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="text-4xl">👋</p>
        <p className="mt-3 font-medium text-white">No messages yet</p>
        <p className="text-sm text-slate-500">Say hi to {selectedUser?.fullName}!</p>
      </div>
    );
  }

  return (
    <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto px-4 py-4">
      {messages.map((message, i) => {
        // show a "Today / Yesterday / date" divider when the day changes
        const newDay =
          i === 0 || new Date(message.createdAt).toDateString() !== new Date(messages[i - 1].createdAt).toDateString();
        return (
          <React.Fragment key={message._id}>
            {newDay && (
              <div className="flex justify-center py-2">
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
                  {formatDay(message.createdAt)}
                </span>
              </div>
            )}
            <Message message={message} />
          </React.Fragment>
        );
      })}

      {isTyping && (
        <div className="flex animate-fade-up items-center gap-1 pl-1">
          <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white/10 px-4 py-3">
            {[0, 1, 2].map((n) => (
              <span
                key={n}
                className="h-2 w-2 rounded-full bg-slate-300 animate-dot"
                style={{ animationDelay: `${n * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
