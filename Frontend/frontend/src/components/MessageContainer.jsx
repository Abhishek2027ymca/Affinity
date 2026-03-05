import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";

const MessageContainer = () => {
  return (
   <div className = 'md:min-w-[550px] flex flex-col' >

      <div className="flex gap-2 items-center  bg-zinc-700 text-white px-4 py-2 mb-2">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"
              alt="user avatar"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between  gap-2 ">
            <p>Abhishek CEDS </p>
          </div>
          <div />
        </div>
    </div>
     
     {/* message showcasing */}

     <Messages></Messages>
    {/* messagfe input here  */}
     <SendInput/>
     </div>
  );
};

export default MessageContainer;
