import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { formatDay } from "../utils/format";

const Messages = () => {
  useGetMessages();
  const { messages } = useSelector((store) => store.message);
  const { selectedUser } = useSelector((store) => store.user);
  const listRef = useRef(null);

  // keep the newest message in view
  useEffect(() => {
    // scroll only the log itself (scrollIntoView would also move the page)
    const list = listRef.current;
    list?.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [messages?.length]);

  let content;
  if (!messages) {
    content = <p className="font-sans text-[11px] text-win-gray">Loading messages…</p>;
  } else if (messages.length === 0) {
    content = (
      <p className="font-sans text-[11px] text-win-gray">
        No messages yet. Say hi to {selectedUser?.fullName}!
      </p>
    );
  } else {
    content = messages.map((message, i) => {
      // show a "Today / Yesterday / date" divider when the day changes
      const newDay =
        i === 0 || new Date(message.createdAt).toDateString() !== new Date(messages[i - 1].createdAt).toDateString();
      return (
        <React.Fragment key={message._id}>
          {newDay && (
            <p className={`font-sans text-[11px] text-win-gray ${i === 0 ? "" : "mt-[6px]"}`}>
              —— {formatDay(message.createdAt)} ——
            </p>
          )}
          <Message message={message} />
        </React.Fragment>
      );
    });
  }

  // one sunken log; the inner div scrolls so the bevel stays put
  return (
    <div className="win-sunken min-h-0 flex-1 p-[2px]">
      <div ref={listRef} className="h-full overflow-y-auto px-[10px] py-[8px] font-chat text-[13px] leading-[1.55]">
        {content}
      </div>
    </div>
  );
};

export default Messages;
