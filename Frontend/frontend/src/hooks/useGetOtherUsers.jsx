import React from "react";
import axios from "axios";
import { useEffect } from "react"
import {useDispatch} from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUsers = () => {
  // we sue useeffect
  const  dispatch = useDispatch()

  
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true ;// very import line other wise you will get CORS error 
        const res = await axios.get('http://localhost:8080/api/v1/user/');
        console.log(res);
        // now store these in store of redux 
        
        dispatch(setOtherUsers(res.data)) ///  iske andar jo bhejenge vo asit is action .paload of setither user  mein jaayega 


      } catch (e) {
        console.log(e);
      }

    };
    fetchOtherUsers(); // jaise heen homeseceren par vist akru ,  data fetch ho jaaye
  }, []);
};

export default useGetOtherUsers;
