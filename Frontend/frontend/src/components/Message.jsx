import React from "react";
import { useSelector } from "react-redux";

function Message({message}) {

  const {selectedUser}  = useSelector(store=>store.user);

  return (
    <div>
      
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={selectedUser?.profilePhoto}
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">12:46</time>
        </div>
        <div className="chat-bubble">{message?.message}</div>
      </div>
    </div>
  );
}

export default Message;
