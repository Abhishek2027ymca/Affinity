import React, { useEffect } from "react";
import {useSelector} from "react-redux";
import {useRef} from "react";
function Message({message}) {

  const scroll = useRef();
 useEffect(() => {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
}, [message]); // whenver message var. changes , useeffect will be used 
                    

  const {selectedUser}  = useSelector(store=>store.user);//!! important other than vdo addeed 


  return (
    <>
      
      <div  ref ={scroll} className="chat chat-end">
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
    </>
  );
}

export default Message;
