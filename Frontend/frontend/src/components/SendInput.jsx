import React, { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import api from "../api";
import { addMessage } from "../redux/messageSlice";
import { errorMessage } from "../utils/format";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
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

  return (
    <form onSubmit={onSubmitHandler} className="border-t border-white/10 bg-white/5 p-3 md:p-4">
      <div className="flex items-center gap-2">
        <input
          value={message}
          onChange={onChangeHandler}
          type="text"
          maxLength={2000}
          placeholder={`Message ${selectedUser?.fullName || ""}...`}
          className="field pl-4"
          autoFocus
        />
        <button
          type="submit"
          disabled={!message.trim() || sending}
          aria-label="Send message"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-lg shadow-violet-900/40 transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FiSend className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
