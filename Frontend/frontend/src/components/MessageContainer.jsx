import React , {useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import {useSelector , useDispatch} from "react-redux";
import {setSelectedUser} from '../redux/userSlice' ;

const MessageContainer = () => {
const {selectedUser}  = useSelector(store=>store.user);
// user cleans when it getlogiut ,
const dispatch = useDispatch();



useEffect(()=>{
  return ()=> dispatch(setSelectedUser(null)) // redux
} ,[] )

  return (


    <>
    {
      selectedUser !== null ?(
   <div className = 'md:min-w-[550px] flex flex-col' >

      <div className="flex gap-2 items-center  bg-zinc-700 text-white px-4 py-2 mb-2">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src={selectedUser?.profilePhoto}
              alt="User Image"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between  gap-2 ">
            <p> {selectedUser?.fullName}</p>
          </div>
          <div />
        </div>
    </div>
     
     {/* message showcasing */}

     <Messages></Messages>
    {/* messagfe input here  */}
     <SendInput/>
     </div>) :(
      <div> hi , lets tatrt the chats </div> 
     )
}
     </>


  );
};

export default MessageContainer;
