import axios from "axios";

import React, { useEffect } from 'react'

const useGetMessages = async () => {
 useEffect(()=> {
    const fetchMessages = async()=>{
        
      try{
  // as message fetch is a autheticated endpoitn ,uses auth middleware

         axios.defaults.withCredentials = true ;
         
         // this id is dynamic ,, 
const res = await axios.get(`http://localhost:8080/api/v1/message/6991e7f92fa7e417b5916de6`);

      }
      catch(error){

         console.log(error);

      }
                     


    }
 } , [])
}

export default useGetMessages
