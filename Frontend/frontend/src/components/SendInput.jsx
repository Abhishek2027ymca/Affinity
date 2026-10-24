import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import api from "../api";
import { addMessage } from "../redux/messageSlice";
import { errorMessage } from "../utils/format";
import Avatar from "./Avatar";

// B / I / U formatting buttons (decorative)
const TOOLS = [
  { label: "B", title: "Bold", style: "font-bold" },
  { label: "I", title: "Italic", style: "italic" },
  { label: "U", title: "Underline", style: "underline" },
];

const SendInput = () => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const dispatch = useDispatch();
  const { selectedUser, authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const typingTimer = useRef(null);
  const selectedId = selectedUser?._id;

  const stopTyping = () => {
    clearTimeout(typingTimer.current);
    socket?.emit("stopTyping", { to: selectedId });
  };

  // different chat opened (or component left) -> clear the draft and the typing state
  useEffect(() => {
    setMessage("");
    return () => {
      clearTimeout(typingTimer.current);
      socket?.emit("stopTyping", { to: selectedId });
    };
  }, [selectedId, socket]);

  const onChangeHandler = (e) => {
    setMessage(e.target.value);
    // tell the other person we are typing, and stop 1.5s after the last keystroke
    socket?.emit("typing", { to: selectedId });
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(stopTyping, 1500);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text || sending) return;

    setSending(true);
    stopTyping();
    try {
      const res = await api.post(`/api/v1/message/send/${selectedId}`, { message: text });
      dispatch(addMessage(res.data.newMessage));
      setMessage("");
    } catch (error) {
      toast.error(errorMessage(error, "Message not sent"));
    } finally {
      setSending(false);
    }
  };

  // Enter sends, Shift+Enter starts a new line
  const onKeyDownHandler = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) onSubmitHandler(e);
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-[6px]">
      <div className="flex gap-[6px]">
        <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
          <div className="flex items-center gap-[2px]">
            {TOOLS.map((tool) => (
              <button
                key={tool.label}
                type="button"
                title={tool.title}
                aria-label={tool.title}
                className={`win-btn h-[22px] w-[23px] min-w-0 p-0 font-times text-[13px] ${tool.style}`}
              >
                {tool.label}
              </button>
            ))}
            <select defaultValue="Arial" aria-label="Font" className="win-select ml-[4px] w-[96px]">
              <option>Arial</option>
            </select>
          </div>
          <textarea
            value={message}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            maxLength={2000}
            aria-label={`Message ${selectedUser?.fullName || ""}`}
            className="win-field h-[64px] w-full resize-none font-chat text-[13px]"
            autoFocus
          />
        </div>

        {/* my buddy icon */}
        <div className="hidden shrink-0 flex-col items-center gap-[2px] sm:flex">
          <div className="win-raised p-[2px]">
            <Avatar src={authUser?.profilePhoto} name={authUser?.fullName} size={68} />
          </div>
          <button type="button" className="win-link">
            Change…
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-[6px]">
        <button type="button" className="win-btn">
          Warn
        </button>
        <button type="button" className="win-btn">
          Block
        </button>
        <button type="submit" disabled={!message.trim() || sending} className="win-btn win-btn-default font-bold">
          Send
        </button>
      </div>
    </form>
  );
};

export default SendInput;
