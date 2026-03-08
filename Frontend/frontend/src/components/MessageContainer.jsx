import React , {useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import {useSelector , useDispatch} from "react-redux";
import {setSelectedUser, setAuthUser} from '../redux/userSlice' ;

const MessageContainer = () => {
const {selectedUser ,authUser}  = useSelector(store=>store.user);
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
      

         <div className = 'md:min-w-[550px] flex flex-col justify-center items-center' >
                <h1 className ='text-4xl text-white font-bold' > Hi </h1> 
                <h1 className= 'text-3xl text-zinc'> Let's start Conversation </h1> 

           </div>

    

     )
}
     </>


  );
};

export default MessageContainer;
