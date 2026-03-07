import React from 'react';
import { IoSend } from "react-icons/io5";
import { useState } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';

const SendInput =   () => {

  const [message, setMessage] = useState("") ;
  const dispatch = useDispatch();
  // oid of my selescted user 
  const {selectedUser} = useSelector(store=>store.user)

   const onSubmitHandler = async (e) => {
    e.preventDefault(); // an event
    
    try{
const res = await axios.post(`http://localhost:8080/api/v1/message/send/${selectedUser?._id}` , {message}, {headers :{
  'Content-Type' : 'application/json'
                        
}, withCredentials:true 
})
console.log(res);
    }
    catch(e){
    console.log(e);
    
    }


   }


  return (
    <form  onSubmit ={onSubmitHandler}   className='px-4 my-3'>
      <div className='w-full relative'>
        <input
        value= {message}
        onChange ={(e)  => setMessage(e.target.value)}
          type="text"
          placeholder='Send a message...'
          className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'
        />
        <button 
          type= "submit"
          className='absolute flex inset-y-0 end-0 items-center pr-4'
        >
          
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;